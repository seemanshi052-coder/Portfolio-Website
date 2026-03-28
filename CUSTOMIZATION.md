# TodFodCoders Portfolio Website - Customization Guide

Welcome to your interactive team portfolio website! This guide will help you customize all aspects of the portfolio.

## Quick Start

1. **Install Dependencies**: Already done! All packages are installed.
2. **Start Dev Server**: Run `npm run dev` to start the development server at http://localhost:5174
3. **Edit Member Data**: Update JSON files in `src/data/members/`
4. **Customize Branding**: Edit `src/config/teamConfig.js` for team name, colors, and links
5. **Add Images**: Place member photos in `public/images/members/` and resume PDFs in `public/resumes/`

---

## Editing Member Data

All member information is stored in JSON files. Each file follows the same structure:

### File Location
- `src/data/members/surajgola.json`
- `src/data/members/member2.json`
- `src/data/members/member3.json`
- `src/data/members/member4.json`

### JSON Structure

```json
{
  "id": "unique-member-id",
  "name": "Member Name",
  "role": "Job Title or Role",
  "imageUrl": "/images/members/membername.jpg",
  "resumeUrl": "/resumes/membername-resume.pdf",
  "objective": "Your professional objective or mission statement...",
  "about": "Brief bio about yourself...",
  "skills": [
    {
      "category": "Frontend",
      "items": ["React", "JavaScript", "CSS", "Tailwind CSS"]
    },
    {
      "category": "Backend",
      "items": ["Node.js", "Python", "MongoDB"]
    }
  ],
  "projects": [
    {
      "id": "unique-project-id",
      "title": "Project Name",
      "description": "What your project does and why it's important...",
      "techStack": ["Tech1", "Tech2", "Tech3"],
      "imageUrl": "/images/projects/project-name.jpg",
      "demoLink": "https://demo-link.com",
      "repoLink": "https://github.com/username/repo",
      "date": "2025"
    }
  ],
  "experience": [
    {
      "id": "exp-1",
      "type": "hackathon",
      "title": "Hackathon Project Name",
      "organization": "Hackathon Name",
      "date": "2025",
      "description": "What you built and learned...",
      "highlight": true
    }
  ],
  "certificates": [
    {
      "id": "cert-1",
      "title": "Certificate Name",
      "issuer": "Organization Name",
      "date": "2025",
      "credentialUrl": "https://link-to-credential.com"
    }
  ]
}
```

### Field Explanations

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (will be used in URL) |
| `name` | string | Full name of team member |
| `role` | string | Job title or specialized role |
| `imageUrl` | string | Path to profile photo (recommended: 400x600px) |
| `resumeUrl` | string | Path to PDF resume for download |
| `objective` | string | Professional objective (2-3 sentences) |
| `about` | string | Personal bio and background |
| `skills` | array | Grouped skills by category |
| `projects` | array | Portfolio projects with details |
| `experience` | array | Work experience, hackathons, internships |
| `certificates` | array | Certifications and achievements |

---

## Adding Images

### Member Photos
- **Location**: `public/images/members/`
- **Recommended Size**: 400px wide × 600px tall (3:4 aspect ratio)
- **Format**: JPG or PNG
- **Naming**: `memberid.jpg` (e.g., `surajgola.jpg`)

### Project Images
- **Location**: `public/images/projects/`
- **Recommended Size**: 500px × 400px
- **Format**: JPG or PNG
- **Naming**: `project-name.jpg`

### Adding Images
1. Place image files in the appropriate folder
2. Update the `imageUrl` field in the JSON with the filename
3. Images will automatically display when you save

---

## Customizing Colors & Branding

### Edit File: `src/config/teamConfig.js`

```javascript
export const TEAM_CONFIG = {
  teamName: 'Your Team Name',           // Change team name here
  teamDescription: 'Your description',   // Landing page subtitle
  hackathonName: 'Hackathon Name',      // Event name
  hackathonYear: 2025,                  // Event year
  hackathonDescription: 'Description of the hackathon or event...',
  
  members: [
    // Update member list here
    { id: 'surajgola', name: 'Suraj Gola', slug: 'surajgola' },
    { id: 'member2', name: 'Member 2 Name', slug: 'member2' },
    // ... more members
  ],
};

export const THEME = {
  primary: '#00d4ff',      // Main color (cyan)
  secondary: '#ff006e',    // Accent color (pink)
  accent: '#8338ec',       // Tertiary color (purple)
  // ... more colors
};
```

### Change Color Scheme

To change the entire color theme:

1. Open `src/config/teamConfig.js`
2. Update the color values in `THEME` object:
   - `primary`: Main brand color (used for borders, highlights)
   - `secondary`: Accent color (used for hover states)
   - `accent`: Tertiary color (used for depth)
3. All colors will automatically update across the site

Or edit CSS variables in `src/styles/globals.css`:
```css
:root {
  --primary: #00d4ff;
  --secondary: #ff006e;
  --accent: #8338ec;
  /* ... */
}
```

---

## Customizing Animations

### Animation Speed & Easing

Edit `src/config/animationConfig.js`:

```javascript
export const ANIMATION_CONFIG = {
  // Timing (in milliseconds)
  DURATION_SHORT: 300,      // Change for quick animations
  DURATION_MEDIUM: 600,     // Change for medium pace
  DURATION_LONG: 1000,      // Change for slow animations

  // Scroll parallax settings
  SCROLL: {
    PARALLAX_INTENSITY: 0.5, // How much hero image moves (0-1)
    FADE_IN_THRESHOLD: 0.2,  // When content appears
    SLIDE_UP_DISTANCE: 50,   // Pixels to slide up
  },

  // Custom cursor settings
  CURSOR: {
    FOLLOW_SPEED: 0.3,   // How quickly cursor follows (0-1)
    SIZE_NORMAL: 30,     // Normal cursor size (px)
    SIZE_HOVER: 50,      // Hover cursor size (px)
  },
};
```

### Disable Custom Cursor

If you want to disable the custom cursor:
1. Open `src/App.jsx`
2. Remove or comment out the `<CustomCursor />` line

### Modify Section Animations

Each section uses anime.js for animations. To change animation behavior:

1. Open the section component (e.g., `src/components/sections/SkillsSection.jsx`)
2. Find the `useEffect` hook with the `anime` call
3. Modify the `duration`, `easing`, or other animation properties

Example:
```javascript
anime({
  targets: '.skill-tag',
  opacity: [0, 1],
  duration: 600,      // Change this value (milliseconds)
  easing: 'easeOutCubic',  // Try: 'easeOutQuad', 'easeOutBounce', etc.
  delay: anime.stagger(100), // Change delay between items
})
```

---

## Updating Member Names in Routes

If you want to change a member's ID (used in the URL):

1. Open `src/data/members/index.js`
2. Change the import and export names
3. Update `src/config/teamConfig.js` with the new ID
4. Make sure the JSON filename matches the ID

Example:
```javascript
// Before
import surajgola from './surajgola.json'
export const MEMBERS = { surajgola }

// After
import john_doe from './john_doe.json'
export const MEMBERS = { john_doe }
```

Then the route will be: `/john_doe`

---

## Adding New Team Members

1. Create a new JSON file in `src/data/members/` (e.g., `newmember.json`)
2. Copy the structure from an existing file
3. Fill in the member's information
4. Add the member to `src/config/teamConfig.js`:
   ```javascript
   members: [
     // ... existing members
     { id: 'newmember', name: 'New Member Name', slug: 'newmember' },
   ]
   ```
5. Update `src/data/members/index.js` to import the new file
6. Add a profile photo to `public/images/members/newmember.jpg`

---

## Environment Variables

Currently, the site uses no environment variables (all data is static). If you want to add external features in the future:

1. Create a `.env.local` file in the project root
2. Add your variables (e.g., `VITE_API_URL=...`)
3. Access them in JavaScript as `import.meta.env.VITE_API_URL`

---

## Building for Production

Run the build command to create an optimized version:

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy to Vercel, Netlify, GitHub Pages, or any web host.

---

## Common Issues

### Images Not Showing
- Check that the image file exists in `public/images/` folder
- Verify the `imageUrl` path is correct (case-sensitive on Linux/Mac)
- Make sure the filename matches exactly

### Animations Not Working
- Ensure anime.js is properly installed: `npm list animejs`
- Check browser console for JavaScript errors
- Try clearing browser cache (Ctrl+Shift+Delete)

### Routes Not Working
- Make sure member ID in URL matches the `id` in the JSON file
- Verify the member is listed in `TEAM_CONFIG.members`
- Check that imports in `src/data/members/index.js` are correct

### Colors Not Updating
- Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear cache if running older version
- Check that you've saved the config file

---

## Next Steps

1. ✅ Replace placeholder member names with real names
2. ✅ Add member profile photos to `public/images/members/`
3. ✅ Fill in detailed member information in JSON files
4. ✅ Update team name and hackathon details in `teamConfig.js`
5. ✅ Add team social media links (if needed)
6. ✅ Test on mobile devices
7. ✅ Deploy to Vercel or Netlify

---

## Need Help?

- Check the component files for detailed comments
- Refer to [anime.js documentation](https://animejs.com/) for animation options
- Look at existing examples in the code for patterns

Happy customizing! 🎉
