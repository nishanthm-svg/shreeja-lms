// ============================================================================
// Admin portal views: employee roster, employee detail drill-down (with a
// per-lesson completion checklist), add employee form. Rendered/wired by
// app.js's router (case "admin"/"admin-employee"/"admin-new-employee"),
// following the same render-synchronous-shell-then-wire-async pattern as the
// rest of the app — these pages need a network round trip app.js's other
// render functions don't, so each render*() here returns an immediate shell
// with a loading placeholder, and the matching wire*() (called as the
// router's afterRender) fetches data and fills it in.
// ============================================================================
import { MODULES } from "./data.js";
import { api } from "./api.js";

const DATE_LOCALES = { en: "en-IN", te: "te-IN", ta: "ta-IN", kn: "kn-IN" };

function formatDate(iso, lang) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(DATE_LOCALES[lang] || "en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return iso;
  }
}

// ============================================================================
// Roster
// ============================================================================
export function renderAdminDashboard(ctx) {
  const { u, escapeHtml, renderTopbar } = ctx;
  return `
    ${renderTopbar({ showBack: false })}
    <div class="page">
      <div class="admin-header">
        <div>
          <h1>${u("adminDashboardTitle")}</h1>
          <p>${u("adminDashboardTagline")}</p>
        </div>
      </div>
      <div class="admin-toolbar">
        <input type="text" class="admin-search" id="admin-search" placeholder="${escapeHtml(u("adminSearchPlaceholder"))}" />
        <button type="button" class="btn btn-primary" id="admin-add-btn">${escapeHtml(u("adminAddEmployeeButton"))}</button>
        <button type="button" class="btn btn-outline" id="admin-export-btn">${escapeHtml(u("adminExportCsvButton"))}</button>
      </div>
      <div class="admin-table-wrap" id="admin-table-wrap">
        <div class="admin-empty">…</div>
      </div>
    </div>
  `;
}

function renderRosterTable(employees, ctx) {
  const { u, escapeHtml, lang } = ctx;
  if (employees.length === 0) {
    return `<div class="admin-empty">${escapeHtml(u("adminNoEmployees"))}</div>`;
  }
  const rows = employees
    .map((emp) => {
      const lastActive = formatDate(emp.lastActivityAt, lang) || u("adminNeverActive");
      return `
      <tr class="clickable" data-employee-id="${escapeHtml(emp.id)}">
        <td class="name-cell">${escapeHtml(emp.displayName)}</td>
        <td class="login-id-cell">${escapeHtml(emp.loginId)}</td>
        <td>
          <div class="admin-progress-cell">
            <div class="mini-bar"><div style="width:${emp.overallPercent}%"></div></div>
            <div class="pct-label">${emp.overallPercent}%</div>
          </div>
        </td>
        <td>${emp.modulesCompleted}/${emp.totalModules}</td>
        <td>${escapeHtml(lastActive)}</td>
        <td><span class="status-pill ${emp.active ? "active" : "inactive"}">${escapeHtml(emp.active ? u("adminStatusActive") : u("adminStatusInactive"))}</span></td>
      </tr>`;
    })
    .join("");
  return `
    <table class="admin-table">
      <thead>
        <tr>
          <th>${escapeHtml(u("adminTableName"))}</th>
          <th>${escapeHtml(u("adminTableLoginId"))}</th>
          <th>${escapeHtml(u("adminTableProgress"))}</th>
          <th>${escapeHtml(u("adminTableModules"))}</th>
          <th>${escapeHtml(u("adminTableLastActive"))}</th>
          <th>${escapeHtml(u("adminTableStatus"))}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function downloadCsv(employees) {
  const header = ["Name", "Login ID", "Overall %", "Modules Completed", "Total Modules", "Last Active", "Status"];
  const rows = employees.map((emp) => [
    emp.displayName,
    emp.loginId,
    emp.overallPercent,
    emp.modulesCompleted,
    emp.totalModules,
    emp.lastActivityAt || "",
    emp.active ? "Active" : "Inactive",
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "shreeja-lms-employees.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function wireAdminDashboard(ctx) {
  const { u, navigate } = ctx;
  const wrap = document.getElementById("admin-table-wrap");
  const searchInput = document.getElementById("admin-search");
  const addBtn = document.getElementById("admin-add-btn");
  const exportBtn = document.getElementById("admin-export-btn");
  let lastLoaded = [];

  async function loadEmployees(search) {
    wrap.innerHTML = `<div class="admin-empty">…</div>`;
    try {
      const res = await api.adminListEmployees(search);
      lastLoaded = res.employees;
      wrap.innerHTML = renderRosterTable(res.employees, ctx);
      wrap.querySelectorAll("tr[data-employee-id]").forEach((row) => {
        row.addEventListener("click", () => {
          navigate("#/admin/employee/" + row.getAttribute("data-employee-id"));
        });
      });
    } catch (e) {
      wrap.innerHTML = `<div class="admin-empty">${e.message}</div>`;
    }
  }

  let debounceTimer = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => loadEmployees(searchInput.value.trim()), 250);
  });
  addBtn.addEventListener("click", () => navigate("#/admin/new-employee"));
  exportBtn.addEventListener("click", () => downloadCsv(lastLoaded));

  loadEmployees("");
}

// ============================================================================
// Employee detail
// ============================================================================
export function renderEmployeeDetail(employeeId, ctx) {
  const { u, renderTopbar } = ctx;
  return `
    ${renderTopbar({ showBack: true, backHash: "#/admin", title: u("adminDashboardTitle") })}
    <div class="page">
      <div id="admin-detail-container">
        <div class="admin-empty">…</div>
      </div>
    </div>
  `;
}

function renderDetailContent(data, ctx) {
  const { u, t, escapeHtml, lang } = ctx;
  const { employee, progress } = data;
  const lastActive = formatDate(employee.lastActivityAt, lang) || u("adminNeverActive");

  const moduleRows = MODULES.filter((m) => m.available)
    .map((mod) => {
      const lessonStates = mod.lessons.map((lesson) => (progress[mod.id] && progress[mod.id][lesson.id]) || null);
      const completed = lessonStates.filter((s) => s && s.completed).length;
      const pct = mod.lessons.length ? Math.round((completed / mod.lessons.length) * 100) : 0;

      const lessonRows = mod.lessons
        .map((lesson, idx) => {
          const state = (progress[mod.id] && progress[mod.id][lesson.id]) || null;
          const prevState = idx > 0 ? (progress[mod.id] && progress[mod.id][mod.lessons[idx - 1].id]) || null : null;
          const locked = idx > 0 && !(prevState && prevState.completed);
          let statusHtml;
          if (state && state.completed) {
            const completedOn = formatDate(state.completedAt || state.lastAttemptAt, lang);
            statusHtml = `
              <span class="status-pill active">${escapeHtml(u("adminLessonStatusComplete"))}</span>
              <span class="admin-lesson-extra">${escapeHtml(u("adminLessonScoreLabel", { score: state.bestScore }))}${
              completedOn ? " · " + escapeHtml(u("adminLessonCompletedOnLabel", { date: completedOn })) : ""
            }</span>`;
          } else if (locked) {
            statusHtml = `<span class="status-pill inactive">${escapeHtml(u("adminLessonStatusLocked"))}</span>`;
          } else {
            statusHtml = `<span class="status-pill inactive">${escapeHtml(u("adminLessonStatusNotStarted"))}</span>`;
          }
          return `
            <div class="admin-lesson-row">
              <div class="admin-lesson-title">${escapeHtml(t(lesson.title))}</div>
              <div class="admin-lesson-status">${statusHtml}</div>
            </div>`;
        })
        .join("");

      return `
        <details class="admin-module-details">
          <summary class="admin-module-progress-row">
            <span class="admin-chevron">›</span>
            <div class="label">${escapeHtml(u("adminModuleLabel", { n: mod.number }))}: ${escapeHtml(t(mod.title))}</div>
            <div class="mini-bar"><div style="width:${pct}%"></div></div>
            <div class="count">${escapeHtml(u("adminLessonsCompleteLabel", { completed, total: mod.lessons.length }))}</div>
          </summary>
          <div class="admin-lesson-list">${lessonRows}</div>
        </details>`;
    })
    .join("");

  return `
    <div class="admin-detail-box">
      <div class="admin-detail-header">
        <h2>${escapeHtml(employee.displayName)}</h2>
        <span class="status-pill ${employee.active ? "active" : "inactive"}">${escapeHtml(employee.active ? u("adminStatusActive") : u("adminStatusInactive"))}</span>
      </div>
      <div class="admin-detail-meta">${escapeHtml(employee.loginId)} · ${escapeHtml(u("adminTableLastActive"))}: ${escapeHtml(lastActive)}</div>
      <div class="admin-detail-overall">
        <div class="ring" style="--pct:${employee.overallPercent}" data-label="${employee.overallPercent}%"></div>
        <div style="font-weight:700;">${escapeHtml(u("adminOverallLabel"))}: ${employee.completedLessons}/${employee.totalLessons}</div>
      </div>
      <div class="admin-expand-hint">${escapeHtml(u("adminExpandModuleHint"))}</div>
      ${moduleRows}
    </div>
    <div class="btn-row">
      <button type="button" class="btn btn-outline" id="admin-reset-pw-btn">${escapeHtml(u("adminResetPasswordButton"))}</button>
      <button type="button" class="btn btn-danger" id="admin-toggle-active-btn">${escapeHtml(
        employee.active ? u("adminDeactivateButton") : u("adminReactivateButton")
      )}</button>
    </div>
    <div id="admin-reset-pw-form" style="display:none; margin-top:16px;">
      <div class="admin-form-box">
        <h2>${escapeHtml(u("adminResetPasswordPromptTitle"))}</h2>
        <p class="sub">${escapeHtml(u("adminResetPasswordPromptSub"))}</p>
        <div id="admin-reset-error"></div>
        <div class="btn-row">
          <button type="button" class="btn btn-primary" id="admin-reset-save-btn">${escapeHtml(u("adminSendResetEmailButton"))}</button>
          <button type="button" class="btn btn-outline" id="admin-reset-cancel-btn">${escapeHtml(u("adminCancelButton"))}</button>
        </div>
      </div>
    </div>
  `;
}

export function wireEmployeeDetail(employeeId, ctx) {
  const { u, navigate } = ctx;
  const container = document.getElementById("admin-detail-container");

  async function load() {
    container.innerHTML = `<div class="admin-empty">…</div>`;
    try {
      const data = await api.adminGetEmployee(employeeId);
      container.innerHTML = renderDetailContent(data, ctx);
      wireActions(data);
    } catch (e) {
      container.innerHTML = `<div class="admin-empty">${e.message}</div>`;
    }
  }

  function wireActions(data) {
    const resetBtn = document.getElementById("admin-reset-pw-btn");
    const resetForm = document.getElementById("admin-reset-pw-form");
    const resetCancel = document.getElementById("admin-reset-cancel-btn");
    const resetSave = document.getElementById("admin-reset-save-btn");
    const toggleBtn = document.getElementById("admin-toggle-active-btn");

    resetBtn.addEventListener("click", () => {
      resetForm.style.display = resetForm.style.display === "none" ? "block" : "none";
    });
    resetCancel.addEventListener("click", () => {
      resetForm.style.display = "none";
    });
    resetSave.addEventListener("click", async () => {
      const errorEl = document.getElementById("admin-reset-error");
      errorEl.innerHTML = "";
      try {
        const res = await api.adminResetPassword(employeeId);
        errorEl.innerHTML = `<div class="auth-note">${u("adminResetEmailSentNote", { email: res.email })}</div>`;
      } catch (e) {
        errorEl.innerHTML = `<div class="auth-error">${e.message}</div>`;
      }
    });
    toggleBtn.addEventListener("click", async () => {
      try {
        await api.adminDeactivate(employeeId);
        load();
      } catch (e) {
        // no-op — the button stays as-is if this fails
      }
    });
  }

  load();
}

// ============================================================================
// Add employee
// ============================================================================
export function renderNewEmployeeForm(ctx) {
  const { u, escapeHtml, renderTopbar } = ctx;
  return `
    ${renderTopbar({ showBack: true, backHash: "#/admin", title: u("adminDashboardTitle") })}
    <div class="page">
      <div class="admin-form-box">
        <h2>${escapeHtml(u("adminNewEmployeeTitle"))}</h2>
        <div id="new-emp-error"></div>
        <form id="new-emp-form">
          <div class="field">
            <label for="new-emp-name">${escapeHtml(u("adminDisplayNameLabel"))}</label>
            <input type="text" id="new-emp-name" required />
          </div>
          <div class="field">
            <label for="new-emp-login">${escapeHtml(u("loginIdLabel"))}</label>
            <input type="email" id="new-emp-login" required />
            <div class="hint">${escapeHtml(u("adminLoginIdHint"))}</div>
          </div>
          <div class="field">
            <label for="new-emp-password">${escapeHtml(u("adminTempPasswordLabel"))}</label>
            <input type="text" id="new-emp-password" minlength="6" required />
            <div class="hint">${escapeHtml(u("adminTempPasswordHint"))}</div>
          </div>
          <div class="btn-row">
            <button type="submit" class="btn btn-primary" id="new-emp-submit">${escapeHtml(u("adminCreateButton"))}</button>
            <button type="button" class="btn btn-outline" id="new-emp-cancel">${escapeHtml(u("adminCancelButton"))}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function wireNewEmployeeForm(ctx) {
  const { u, navigate } = ctx;
  const form = document.getElementById("new-emp-form");
  const errorEl = document.getElementById("new-emp-error");
  const submitBtn = document.getElementById("new-emp-submit");
  document.getElementById("new-emp-cancel").addEventListener("click", () => navigate("#/admin"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.innerHTML = "";
    const displayName = document.getElementById("new-emp-name").value.trim();
    const loginId = document.getElementById("new-emp-login").value.trim();
    const tempPassword = document.getElementById("new-emp-password").value;
    submitBtn.disabled = true;
    submitBtn.textContent = u("adminCreating");
    try {
      await api.adminCreateEmployee(loginId, displayName, tempPassword);
      navigate("#/admin");
    } catch (err) {
      errorEl.innerHTML = `<div class="auth-error">${err.message}</div>`;
      submitBtn.disabled = false;
      submitBtn.textContent = u("adminCreateButton");
    }
  });
}
