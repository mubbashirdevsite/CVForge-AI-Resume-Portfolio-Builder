// ==========================================
//   CVForge AI — script.js
// ==========================================

// ---- State ----
const state = {
  darkMode: true,
  activePage: "dashboard",
  sidebarCollapsed: false,
  selectedTemplate: 1,
  skills: ["JavaScript", "React", "CSS"],
  summary: "",
};

const SKILL_SUGGESTIONS = [
  "React", "Node.js", "TypeScript", "Python",
  "AWS", "Docker", "Figma", "GraphQL",
  "PostgreSQL", "Machine Learning",
];

const AI_RESPONSES = {
  summary:
    "Results-driven software engineer with 5+ years of experience building scalable web applications. " +
    "Proven expertise in React, Node.js, and cloud architecture. Passionate about clean code, " +
    "user-centric design, and delivering high-impact solutions.",
  jd:
    "✓ Added keywords: 'scalable systems', 'cross-functional teams', 'Agile/Scrum'.\n" +
    "✓ Reordered skills to match JD priorities.\n" +
    "✓ ATS score improved from 72% → 91%.",
  grammar:
    "Improved version:\n" +
    "\"Spearheaded the development of a high-performance e-commerce platform, " +
    "reducing page load time by 40% and increasing conversion rates by 25%.\"",
};

// ==========================================
//   NAVIGATION
// ==========================================
function navigateTo(pageId) {
  state.activePage = pageId;

  // Update nav buttons
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === pageId);
  });

  // Update pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === `page-${pageId}`);
  });

  // Update page title
  const titles = {
    dashboard: "Dashboard",
    resume:    "Resume Builder",
    portfolio: "Portfolio",
    templates: "Templates",
    ai:        "AI Tools",
    export:    "Export",
  };
  document.getElementById("pageTitle").textContent = titles[pageId] || pageId;
}

// Sidebar nav buttons
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => navigateTo(btn.dataset.page));
});

// "data-goto" shortcut buttons (dashboard quick actions / card header)
document.querySelectorAll("[data-goto]").forEach((btn) => {
  btn.addEventListener("click", () => navigateTo(btn.dataset.goto));
});

// ==========================================
//   SIDEBAR TOGGLE
// ==========================================
document.getElementById("menuToggle").addEventListener("click", () => {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  document.getElementById("sidebar").classList.toggle("collapsed", state.sidebarCollapsed);
});

// ==========================================
//   DARK / LIGHT MODE
// ==========================================
const themeToggle = document.getElementById("themeToggle");

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.darkMode ? "dark" : "light");
  themeToggle.textContent = state.darkMode ? "☀ Light" : "☾ Dark";
}

themeToggle.addEventListener("click", () => {
  state.darkMode = !state.darkMode;
  applyTheme();
});

applyTheme();

// ==========================================
//   SKILLS — Resume Builder
// ==========================================
function renderSkills() {
  // Tags in Resume Builder
  const tagsEl = document.getElementById("skillsTags");
  if (tagsEl) {
    tagsEl.innerHTML = state.skills
      .map(
        (s) =>
          `<span class="skill-tag">
            ${s}
            <button class="remove-skill" data-skill="${s}">×</button>
          </span>`
      )
      .join("");

    tagsEl.querySelectorAll(".remove-skill").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.skills = state.skills.filter((sk) => sk !== btn.dataset.skill);
        renderSkills();
      });
    });
  }

  // Suggestions in Resume Builder
  const suggestEl = document.getElementById("skillsSuggestions");
  if (suggestEl) {
    suggestEl.innerHTML = SKILL_SUGGESTIONS.filter(
      (s) => !state.skills.includes(s)
    )
      .slice(0, 7)
      .map(
        (s) =>
          `<button class="suggest-btn" data-skill="${s}">+ ${s}</button>`
      )
      .join("");

    suggestEl.querySelectorAll(".suggest-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        addSkill(btn.dataset.skill);
      });
    });
  }

  // Skills in AI Tools page
  const aiSkillsEl = document.getElementById("aiSkillsSuggestions");
  if (aiSkillsEl) {
    aiSkillsEl.innerHTML = SKILL_SUGGESTIONS.map((s) => {
      const added = state.skills.includes(s);
      return `<button class="suggest-btn ${added ? "added" : ""}" data-skill="${s}">
        ${added ? "✓ " : "+ "}${s}
      </button>`;
    }).join("");

    aiSkillsEl.querySelectorAll(".suggest-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        addSkill(btn.dataset.skill);
        renderSkills();
      });
    });
  }

  // Live preview skills
  renderPreviewSkills();
}

function addSkill(skill) {
  if (!state.skills.includes(skill)) {
    state.skills.push(skill);
    renderSkills();
  }
}

function renderPreviewSkills() {
  const el = document.getElementById("previewSkills");
  if (el) {
    el.innerHTML = state.skills
      .map((s) => `<span class="cv-skill-tag">${s}</span>`)
      .join("");
  }
}

renderSkills();

// ==========================================
//   AI — Resume Builder page (Generate Summary)
// ==========================================
const genSummaryBtn = document.getElementById("genSummaryBtn");
const summaryText   = document.getElementById("summaryText");

if (genSummaryBtn) {
  genSummaryBtn.addEventListener("click", () => {
    genSummaryBtn.disabled = true;
    genSummaryBtn.textContent = "✦ Generating...";

    setTimeout(() => {
      state.summary = AI_RESPONSES.summary;
      summaryText.value = state.summary;

      // Update live preview
      const previewSummary = document.getElementById("previewSummary");
      if (previewSummary) previewSummary.textContent = state.summary;

      genSummaryBtn.disabled = false;
      genSummaryBtn.textContent = "✦ Generate with AI";
    }, 1800);
  });
}

// Sync summary textarea to live preview
if (summaryText) {
  summaryText.addEventListener("input", () => {
    const previewSummary = document.getElementById("previewSummary");
    if (previewSummary) previewSummary.textContent = summaryText.value || "Your professional summary will appear here...";
  });
}

// ==========================================
//   AI TOOLS PAGE
// ==========================================
function setupAiBtn(btnId, resultId, type) {
  const btn    = document.getElementById(btnId);
  const result = document.getElementById(resultId);
  if (!btn || !result) return;

  const originalText = btn.textContent;

  btn.addEventListener("click", () => {
    btn.disabled = true;
    btn.textContent = "⟳ Processing...";
    result.classList.remove("visible");

    setTimeout(() => {
      result.textContent = AI_RESPONSES[type] || "AI response ready.";
      result.classList.add("visible");
      btn.disabled = false;
      btn.textContent = originalText;
    }, 1800);
  });
}

setupAiBtn("aiSummaryBtn",  "aiSummaryResult",  "summary");
setupAiBtn("aiJdBtn",       "aiJdResult",       "jd");
setupAiBtn("aiGrammarBtn",  "aiGrammarResult",  "grammar");

// ==========================================
//   TEMPLATES
// ==========================================
document.querySelectorAll(".template-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".template-card").forEach((c) =>
      c.classList.remove("selected")
    );
    card.classList.add("selected");
    state.selectedTemplate = parseInt(card.dataset.id);
  });
});

// ==========================================
//   PORTFOLIO — Toggle Switches
// ==========================================
document.querySelectorAll(".toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isOn = toggle.dataset.on === "true";
    toggle.dataset.on = String(!isOn);
    toggle.classList.toggle("on", !isOn);
  });
});

// Copy portfolio URL
const copyUrlBtn = document.getElementById("copyUrlBtn");
if (copyUrlBtn) {
  copyUrlBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("https://cvforge.ai/u/ahmed-khan").then(() => {
      copyUrlBtn.textContent = "✓ Copied!";
      setTimeout(() => (copyUrlBtn.textContent = "⧉ Copy"), 2000);
    }).catch(() => {
      copyUrlBtn.textContent = "✓ Copied!";
      setTimeout(() => (copyUrlBtn.textContent = "⧉ Copy"), 2000);
    });
  });
}

// ==========================================
//   EXPORT — JSON Download
// ==========================================
const exportJsonBtn = document.getElementById("exportJsonBtn");
if (exportJsonBtn) {
  exportJsonBtn.addEventListener("click", () => {
    const data = {
      name:      "Ahmed Khan",
      email:     "ahmed@email.com",
      phone:     "+92 300 1234567",
      location:  "Karachi, Pakistan",
      summary:   state.summary,
      skills:    state.skills,
      template:  state.selectedTemplate,
      exported:  new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href     = url;
    a.download = "cvforge-resume.json";
    a.click();
    URL.revokeObjectURL(url);
  });
}

// ==========================================
//   INIT
// ==========================================
navigateTo("dashboard");
