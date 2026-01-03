# CV Builder

A CV builder I made to help users with job applications. 
Build your CV, customize it how you want, and download it as a PDF.

<img width="1201" height="1015" alt="2025-12-31_16-12" src="https://github.com/user-attachments/assets/72f43215-d506-4410-bad6-aa8ffb6aef2b" />

## Live Demo 🔗

https://cvbuilderr-swart.vercel.app/

## Features 🚀

- **Smart sorting** - Your work experience automatically shows up with the most recent stuff first, and positions within each company are sorted the same way
- **Download as PDF** - Get a clean PDF with selectable text (so it works with ATS systems)
- **Customizable sections order** - Rearrange your CV sections however you want
- **Customize bullet points** - Pick from different bullet point styles (circles, squares, triangles, diamonds) for your responsibilities
- **Nothing gets lost** - Everything saves to localStorage so you can close the tab and come back later
- **Works on mobile** - Responsive design that works on any screen size
- **Accessibility built in** - Added ARIA attributes and semantic HTML for screen readers

## Built with 👨‍💻

- React 19  <img width="18" height="18" alt="image" src="https://github.com/user-attachments/assets/8b5e6a21-c262-49a6-b4e8-08ab5073fa9d" />
- Vite  <img width="18" height="18" alt="image" src="https://github.com/user-attachments/assets/e7bd7dd6-2187-4d1b-8af4-3ee77a1a957d" />
- CSS Modules  <img width="18" height="18" alt="image" src="https://github.com/user-attachments/assets/13a46468-a7a0-42f9-87fd-0ba32f6e4bce" />

- Immer for state management ⚡
- @react-pdf/renderer for PDF generation 📜
- Context API for global state 🌎

## Running it locally
```bash
git clone https://github.com/stefanmrvic/cv_builder.git
cd cv_builder
npm install
npm run dev
```

## How to use it

1. Fill in your personal info
2. Add your work experience - you can nest companies, positions, and responsibilities
3. Add education and skills
4. Head to the Customize tab to reorder sections and change bullet styles
5. Download your CV as a PDF

## Stuff I will add very 🔜

- Different CV templates
- Saving multiple CVs to Node.js backend
- Redux for state management

## The tricky parts ‎ (╭ರ_•́)

The sorting algorithm was fun to figure out - making sure everything displays in the correct order with recent stuff first. But managing all the nested and global state was the real challenge. Luckily, useImmer helped with its syntax for deeply nested updates (companies → positions → responsibilities → sub-points). Way cleaner than passing setState callbacks everywhere.

PDF generation with @react-pdf/renderer was a nightmare. I built the entire CV layout first, then discovered their library doesn't support Context API. Had to drill props several layers deep just to pass the data through. Lesson learned: research libraries more thoroughly before committing to them.

---

I Made this while job hunting. Hope it helps someone else too. Good luck! 🍀
