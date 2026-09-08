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
        <button type="button" class="btn btn-outline" id="admin-bulk-add-btn">${escapeHtml(u("adminBulkAddButton"))}</button>
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
  const bulkAddBtn = document.getElementById("admin-bulk-add-btn");
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
  bulkAddBtn.addEventListener("click", () => navigate("#/admin/bulk-add-employees"));
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

// ============================================================================
// Bulk add employees — paste a CSV of Name,Email (e.g. exported from a roster
// spreadsheet) and create every account, one at a time, with live progress.
// A temporary password is generated per account; the final results — every
// name, email and generated password — can be downloaded as a CSV so the
// admin can distribute credentials. Reuses api.adminCreateEmployee exactly
// like the single Add Employee form, just looped.
// ============================================================================
function generateTempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let pw = "";
  for (let i = 0; i < 10; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseBulkCsv(text) {
  const rows = [];
  const seen = new Set();
  text.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const parts = trimmed.split(",").map((p) => p.trim().replace(/^"|"$/g, ""));
    if (parts.length < 2) return;
    const [name, email] = parts;
    if (!name || !email) return;
    if (name.toLowerCase() === "name" && email.toLowerCase() === "email") return; // header row
    if (!EMAIL_RE.test(email)) return;
    const key = email.toLowerCase();
    if (seen.has(key)) return; // duplicate within this batch
    seen.add(key);
    rows.push({ name, email });
  });
  return rows;
}

function renderBulkEntryFormHtml(ctx) {
  const { u, escapeHtml } = ctx;
  return `
    <h2>${escapeHtml(u("adminBulkAddTitle"))}</h2>
    <p class="sub">${escapeHtml(u("adminBulkAddInstructions"))}</p>
    <div class="field">
      <label for="bulk-add-textarea">${escapeHtml(u("adminBulkAddTextareaLabel"))}</label>
      <textarea id="bulk-add-textarea" rows="12" style="width:100%; font-family:'Courier New',monospace; font-size:12.5px; padding:10px 12px; border:1.5px solid var(--gray-300); border-radius:9px;" placeholder="Name,Email"></textarea>
    </div>
    <div id="bulk-add-error"></div>
    <div class="btn-row">
      <button type="button" class="btn btn-primary" id="bulk-add-preview-btn">${escapeHtml(u("adminBulkAddPreviewButton"))}</button>
      <button type="button" class="btn btn-outline" id="bulk-add-cancel-btn">${escapeHtml(u("adminCancelButton"))}</button>
    </div>
  `;
}

export function renderBulkAddEmployees(ctx) {
  const { u, renderTopbar } = ctx;
  return `
    ${renderTopbar({ showBack: true, backHash: "#/admin", title: u("adminDashboardTitle") })}
    <div class="page">
      <div class="admin-form-box" style="max-width:640px;" id="bulk-add-container">
        ${renderBulkEntryFormHtml(ctx)}
      </div>
    </div>
  `;
}

export function wireBulkAddEmployees(ctx) {
  const { u, escapeHtml, navigate } = ctx;
  const container = document.getElementById("bulk-add-container");

  function showEntryForm() {
    container.innerHTML = renderBulkEntryFormHtml(ctx);
    document.getElementById("bulk-add-cancel-btn").addEventListener("click", () => navigate("#/admin"));
    document.getElementById("bulk-add-preview-btn").addEventListener("click", () => {
      const text = document.getElementById("bulk-add-textarea").value;
      const rows = parseBulkCsv(text);
      const errorEl = document.getElementById("bulk-add-error");
      if (rows.length === 0) {
        errorEl.innerHTML = `<div class="auth-error">${escapeHtml(u("adminBulkAddNoRows"))}</div>`;
        return;
      }
      showPreview(rows);
    });
  }

  function showPreview(rows) {
    const rowsHtml = rows
      .map(
        (r) => `
        <div class="admin-lesson-row">
          <div class="admin-lesson-title">${escapeHtml(r.name)}</div>
          <div class="admin-lesson-extra">${escapeHtml(r.email)}</div>
        </div>`
      )
      .join("");
    container.innerHTML = `
      <h2>${escapeHtml(u("adminBulkAddPreviewTitle", { n: rows.length }))}</h2>
      <p class="sub">${escapeHtml(u("adminBulkAddPreviewHint"))}</p>
      <div class="admin-lesson-list" style="max-height:340px; overflow-y:auto; padding-left:0;">${rowsHtml}</div>
      <div class="btn-row" style="margin-top:16px;">
        <button type="button" class="btn btn-primary" id="bulk-add-create-btn">${escapeHtml(u("adminBulkAddCreateButton"))}</button>
        <button type="button" class="btn btn-outline" id="bulk-add-back-btn">${escapeHtml(u("adminCancelButton"))}</button>
      </div>
    `;
    document.getElementById("bulk-add-back-btn").addEventListener("click", showEntryForm);
    document.getElementById("bulk-add-create-btn").addEventListener("click", () => runCreation(rows));
  }

  async function runCreation(rows) {
    const results = rows.map((r) => ({ ...r, password: generateTempPassword(), status: "pending" }));

    function renderProgress(doneCount) {
      const rowsHtml = results
        .map((r) => {
          const badgeClass = r.status === "created" ? "active" : "inactive";
          const label =
            r.status === "created"
              ? u("adminBulkAddRowCreated")
              : r.status === "failed"
              ? u("adminBulkAddRowFailed")
              : u("adminBulkAddRowPending");
          return `
          <div class="admin-lesson-row">
            <div class="admin-lesson-title">${escapeHtml(r.name)} <span class="admin-lesson-extra">${escapeHtml(r.email)}</span></div>
            <div class="admin-lesson-status"><span class="status-pill ${badgeClass}">${escapeHtml(label)}</span></div>
          </div>`;
        })
        .join("");
      container.innerHTML = `
        <h2>${escapeHtml(u("adminBulkAddCreatingProgress", { done: doneCount, total: results.length }))}</h2>
        <div class="mini-bar" style="margin-bottom:14px;"><div style="width:${Math.round((doneCount / results.length) * 100)}%"></div></div>
        <div class="admin-lesson-list" style="max-height:400px; overflow-y:auto; padding-left:0;">${rowsHtml}</div>
      `;
    }

    renderProgress(0);
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      try {
        await api.adminCreateEmployee(r.email, r.name, r.password);
        r.status = "created";
      } catch (e) {
        r.status = "failed";
        r.error = e.message;
      }
      renderProgress(i + 1);
    }
    showDone(results);
  }

  function showDone(results) {
    const created = results.filter((r) => r.status === "created").length;
    const failed = results.length - created;
    const rowsHtml = results
      .map((r) => {
        const badgeClass = r.status === "created" ? "active" : "inactive";
        const label = r.status === "created" ? u("adminBulkAddRowCreated") : u("adminBulkAddRowFailed");
        const extra = r.status === "created" ? r.password : r.error || "";
        return `
        <div class="admin-lesson-row">
          <div class="admin-lesson-title">${escapeHtml(r.name)} <span class="admin-lesson-extra">${escapeHtml(r.email)} · ${escapeHtml(extra)}</span></div>
          <div class="admin-lesson-status"><span class="status-pill ${badgeClass}">${escapeHtml(label)}</span></div>
        </div>`;
      })
      .join("");
    container.innerHTML = `
      <h2>${escapeHtml(u("adminBulkAddDoneTitle", { created, failed }))}</h2>
      <div class="admin-lesson-list" style="max-height:400px; overflow-y:auto; padding-left:0; margin-bottom:16px;">${rowsHtml}</div>
      <div class="btn-row">
        <button type="button" class="btn btn-success" id="bulk-add-download-btn">${escapeHtml(u("adminBulkAddDownloadButton"))}</button>
        <button type="button" class="btn btn-outline" id="bulk-add-done-back-btn">${escapeHtml(u("adminBulkAddDoneBackButton"))}</button>
      </div>
    `;
    document.getElementById("bulk-add-done-back-btn").addEventListener("click", () => navigate("#/admin"));
    document.getElementById("bulk-add-download-btn").addEventListener("click", () => downloadBulkResultsCsv(results, u));
  }

  showEntryForm();
}

function downloadBulkResultsCsv(results, u) {
  const header = [u("adminTableName"), u("adminTableEmail"), u("adminTablePassword"), u("adminTableStatus")];
  const rows = results.map((r) => [
    r.name,
    r.email,
    r.status === "created" ? r.password : "",
    r.status === "created" ? u("adminBulkAddRowCreated") : u("adminBulkAddRowFailed") + (r.error ? `: ${r.error}` : ""),
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "shreeja-lms-bulk-employees.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
