# Quick Reference - What to Edit to Customize

## 🎯 Fastest Way to Get Your Portfolio Live

### 1️⃣ Edit Member Names & Info (5 minutes)

**File**: `src/data/members/surajgola.json`, `member2.json`, `member3.json`, `member4.json`

Replace placeholder values:
- `"name": "Suraj Gola"` → Your actual name
- `"role": "Full Stack Developer"` → Your role
- `"objective": "..."` → Your professional goal
- `"about": "..."` → Your bio

### 2️⃣ Add Your Photos (5 minutes)

**Folder**: `public/images/members/`

1. Prepare your photos (400x600px, JPG format)
2. Name them: `surajgola.jpg`, `member2.jpg`, etc.
3. Drop them in the folder
4. Photos auto-appear in portfolio

### 3️⃣ Update Team Name & Colors (2 minutes)

**File**: `src/config/teamConfig.js`

```javascript
// Change these:
teamName: 'YourTeamName',
hackathonName: 'YourHackathonName',

// Change colors (optional):
THEME = {
  primary: '#00d4ff',     // Main color (currently: cyan)
  secondary: '#ff006e',   // Hover color (currently: pink)
  accent: '#8338ec',      // Detail color (currently: purple)
}
```

### 4️⃣ Test Locally (1 minute)

```bash
npm run dev
```
Visit: `http://localhost:5174/`

### 5️⃣ Deploy (5 minutes)

```bash
npm run build
```

Then upload `dist/` folder to:
- Vercel (recommended - drag & drop easy)
- Netlify (same - drag & drop)
- Any web hosting

---

## 📋 Files to Edit (In Priority Order)

| Priority | File | What to Change | Time |
|----------|------|----------------|------|
| 🔴 #1 | `src/data/members/member2.json` | Name, objective, skills, projects | 10 min |
| 🔴 #2 | `src/data/members/member3.json` | Same as above | 10 min |
| 🔴 #3 | `src/data/members/member4.json` | Same as above | 10 min |
| 🔴 #4 | `src/config/teamConfig.js` | Team name, hackathon name, colors | 2 min |
| 🟡 #5 | `public/images/members/` | Add 4 member photos | 5 min |
| 🟢 #6 | `src/config/animationConfig.js` | Animation speeds (optional) | 2 min |

**Total Time to Live**: ~39 minutes (mostly editing)

---

## 🎨 Color Codes (Copy & Paste)

Need different colors? Try these:

**Tech Blue Theme**:
```javascript
primary: '#0066ff',    // Blue
secondary: '#00ff88',  // Green
accent: '#ff00ff',     // Magenta
```

**Sunset Theme**:
```javascript
primary: '#ff6b35',    // Orange
secondary: '#f7931e',  // Gold
accent: '#c1272d',     // Red
```

**Neon Theme**:
```javascript
primary: '#0ff0fc',    // Bright cyan
secondary: '#ff006e',  // Hot pink
accent: '#ffbe0b',     // Yellow
```

**Professional Theme**:
```javascript
primary: '#2563eb',    // Professional blue
secondary: '#7c3aed',  // Purple
accent: '#0f766e',     // Teal
```

Just paste into `src/config/teamConfig.js` under `THEME = { ... }`

---

## 📸 Image Specifications

### Member Photos
- **Size**: 400 × 600 px (portrait)
- **Format**: JPG or PNG
- **Quality**: High (professional photo)
- **Folder**: `public/images/members/`
- **Names**: `surajgola.jpg`, `member2.jpg`, etc.

### Project Images
- **Size**: 500 × 400 px (landscape)
- **Format**: JPG or PNG
- **Folder**: `public/images/projects/`
- **Optional**: Only if adding custom projects

---

## ✏️ Text Content to Customize

### For Each Member:

```
Objective (1-2 sentences):
"I am passionate about... and driven by..."

About (2-3 sentences):
"I'm a first-year student who loves... I'm experienced in..."

Skills Categories (Examples):
- Frontend: React, JavaScript, CSS, Tailwind
- Backend: Python, Flask, MongoDB
- Tools: Git, VS Code, Figma
- Soft Skills: Leadership, Problem-solving, Communication

Projects:
- Name: "Project Name"
- Description: "What it does and why it's cool"
- Tech: List of technologies used
- Links: Demo link & GitHub repo

Experience:
- Type: "hackathon" or "project"
- Title: "Hackathon/Project Name"
- Organization: "Hackathon/Organization Name"
- Date: "2025"
- Description: "What you built and learned"

Certificates:
- Title: "Certificate Name"
- Issuer: "Organization that issued it"
- Date: "2025"
```

---

## 🚀 Deployment Checklist

Before deploying, make sure:

- [ ] All 4 member files filled with real data
- [ ] Team name updated in `teamConfig.js`
- [ ] Member photos added to `public/images/members/`
- [ ] Tested in browser: `npm run dev`
- [ ] Tested all 4 member pages (click member names)
- [ ] Tested on mobile (responsive check)
- [ ] No console errors (F12 → Console tab)

---

## 📞 Common Issues & Fixes

### Photos Not Showing?
1. Check file is in `public/images/members/`
2. Filename matches ID (e.g., `surajgola.jpg` for `surajgola`)
3. Try refreshing: `Ctrl+Shift+R`

### Member Page Not Loading?
1. Make sure JSON file exists
2. Check ID in `teamConfig.js` matches filename (without .json)
3. Look for error in browser console (F12)

### Colors Not Changed?
1. Make sure you edited `src/config/teamConfig.js`
2. Save the file
3. Refresh browser: `Ctrl+Shift+R`
4. Check that color values are hex codes like `#00ff00`

### Animations Too Fast/Slow?
Edit `src/config/animationConfig.js`:
```javascript
DURATION_MEDIUM: 600,  // Change 600 to bigger (slower) or smaller (faster)
```

---

## 🎓 Learning Resources

Want to understand the code better?

- **Animation Details**: See comments in `src/utils/animationHelpers.js`
- **Component Structure**: Look at files in `src/components/`
- **Styling**: Check `src/styles/` folder
- **Animation Docs**: https://animejs.com/
- **React Docs**: https://react.dev/

---

## ⚡ Pro Tips

1. **Icons in JSON**: Use emoji! (e.g., "🎯 Goal", "💻 Coding")
2. **Short Names**: On mobile, keep skill/tech names short
3. **High-Quality Content**: Good bios/descriptions matter more than animations
4. **Real Links**: Add working GitHub/demo links (makes great impression)
5. **Recent Projects**: Show your best/most recent work first

---

## 📌 Key Paths to Remember

```
Project Root
├─ src/data/members/          ← Edit member JSON files here
├─ src/config/teamConfig.js   ← Change team name & colors here
├─ public/images/members/     ← Drop member photos here
├─ public/images/projects/    ← Drop project images here
└─ public/resumes/            ← Drop resume PDFs here
```

---

## 🎉 You're All Set!

Follow the checklist above and your portfolio will be live in under 1 hour!

For detailed guides, see:
- `CUSTOMIZATION.md` - Comprehensive customization guide
- `README_SETUP.md` - Full project documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical details
