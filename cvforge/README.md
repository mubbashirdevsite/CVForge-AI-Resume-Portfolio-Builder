# CVForge AI — Resume & Portfolio Builder

> AI-powered resume builder aur portfolio generator — pure HTML, CSS, aur JavaScript mein.

---

## 📁 File Structure

```
cvforge/
├── index.html    → Poora UI structure (HTML)
├── style.css     → Sab styling, dark/light mode, responsive design
├── script.js     → Sab interactivity aur logic (Vanilla JS)
└── README.md     → Yeh file
```

---

## 🚀 Kaise Chalayein (How to Run)

**Option 1 — Direct Open:**
`index.html` file browser mein directly open kar lo. Koi server ki zaroorat nahi.

**Option 2 — VS Code Live Server:**
1. VS Code mein folder open karo
2. Live Server extension install karo
3. `index.html` par right-click → **Open with Live Server**

**Option 3 — Local HTTP Server (Python):**
```bash
cd cvforge
python -m http.server 3000
# Browser mein jao: http://localhost:3000
```

---

## ✨ Features

### 🗂 Dashboard
- Stats cards: Resumes, Downloads, Portfolio Views, ATS Score
- Saved resumes grid with Edit / Download buttons
- Quick Actions shortcut buttons

### 📝 Resume Builder
- **Personal Information** — Name, Email, Phone, Location, LinkedIn, GitHub
- **Professional Summary** — Manual ya AI se generate karo
- **Work Experience** — Job title, company, duration, description
- **Education** — Degree, university, CGPA
- **Skills** — Add/remove skills, AI suggestions
- **Certifications** — Certificate name, issuer, year
- **Languages** — Native aur other languages
- **Projects** — Project name, tech stack, GitHub link
- **Live Preview Panel** — Real-time CV preview sidebar mein

### 🤖 AI Tools
| Tool | Kya Karta Hai |
|------|---------------|
| Professional Summary | AI se bio generate karta hai |
| JD Optimizer | Job description ke hisab se CV optimize karta hai |
| Grammar & Tone | Writing quality improve karta hai |
| Skill Suggestions | Role ke hisab se skills suggest karta hai |

> **Note:** Ye demo mein simulated responses hain. Real AI ke liye OpenAI API connect karo (neeche dekho).

### 🎨 Templates
- 4 templates: **Nova** (Modern), **Clarity** (Minimal), **Apex** (Corporate), **Vivid** (Creative)
- 8 preset colors + custom color picker

### 🌐 Portfolio Generator
- Live portfolio URL display
- Section toggles: Hero, Projects, Skills, Contact Form, Social Links, Blog
- Copy URL button

### 📤 Export & Share
- PDF Download (jsPDF se connect hone par kaam karega)
- Print option (browser print dialog)
- Share Link
- Portfolio URL copy
- **JSON Export** — Resume data download hoga `.json` file mein ✅ (ye kaam karta hai)
- LinkedIn Import (future feature)

### 🌙 Dark / Light Mode
- Toggle button topbar mein
- CSS variables se seamless switch

---

## 🔌 Real AI Connect Karna (OpenAI)

`script.js` mein `AI_RESPONSES` object ko replace karo real API call se:

```javascript
async function callOpenAI(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY",
    },
    body: JSON.stringify({
      model:    "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.choices[0].message.content;
}
```

---

## 🧰 Recommended Next Steps

| Feature | Tech |
|---------|------|
| User Auth (Signup/Login/Google) | Firebase Authentication |
| Resume Data Save/Load | Firebase Firestore |
| Real PDF Export | jsPDF + html2canvas |
| Real AI | OpenAI API (GPT-4o) |
| Deploy | Vercel / Firebase Hosting |
| Mobile App | Convert to React Native / PWA |

---

## 📦 Dependencies

Koi npm package install karne ki zaroorat **nahi** — ye pure Vanilla HTML/CSS/JS hai.

Sirf ek Google Fonts CDN link hai `index.html` mein:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono&display=swap" rel="stylesheet" />
```
Internet connection chahiye font load karne ke liye. Offline ke liye fonts download karke locally link karo.

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (Variables, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | DM Sans, DM Mono (Google Fonts) |
| Future AI | OpenAI API |
| Future Backend | Firebase |
| Future PDF | jsPDF |

---

## 📱 Responsive Breakpoints

| Screen | Layout |
|--------|--------|
| Desktop (>1100px) | Full 2-column resume layout |
| Tablet (900px) | Stacked layout, 2-column grids |
| Mobile (<640px) | Single column, collapsed sidebar |

---

## 🙏 Credits

Designed & built by **Ahmed Khan** using CVForge AI platform.

---

*CVForge AI © 2026 — Apna career apne haath mein.*
