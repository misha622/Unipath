<div align="center">

<br/>

```
██╗   ██╗███╗   ██╗██╗██████╗  █████╗ ████████╗██╗  ██╗
██║   ██║████╗  ██║██║██╔══██╗██╔══██╗╚══██╔══╝██║  ██║
██║   ██║██╔██╗ ██║██║██████╔╝███████║   ██║   ███████║
██║   ██║██║╚██╗██║██║██╔═══╝ ██╔══██║   ██║   ██╔══██║
╚██████╔╝██║ ╚████║██║██║     ██║  ██║   ██║   ██║  ██║
 ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
```

**Find your perfect university program — anywhere in the world.**

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.0-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

[**🔍 Explore Programs**](#features) · [**🚀 Quick Start**](#quick-start) · [**🤝 Contribute**](#contributing)

<br/>

</div>

---

## What is UniPath?

UniPath is an open-source platform that aggregates admission requirements, deadlines, and tuition costs for university programs worldwide. No paywalls, no sign-ups required — just honest data to help students make the best decision for their future.

> Built for the student who knows what they want but doesn't know where to start.

---

## ✨ Features

### 🔎 Smart Explore
Filter **62+ programs** across 21 countries by country, degree level, budget, and scholarship availability — instantly, with no page reloads.

### 🧙 Application Wizard
A guided 3-step flow that asks about your budget, preferred field, and goals, then surfaces the programs that match — like a personalised university counsellor.

### 📊 Side-by-Side Comparison
Put up to three programs next to each other to compare tuition, IELTS requirements, deadlines, and scholarship availability at a glance.

### 🎓 Scholarship Radar
Toggle to scholarship-only mode and see only programs with confirmed funding. Currently **42 out of 62** programs offer scholarships.

### ⏰ Deadline Countdown
Every program card shows a live countdown to its application deadline, colour-coded from green → orange → red as the date approaches.

### 📄 Program Detail Pages
Each program has a dedicated page with full info on tuition, duration, GPA/IELTS requirements, and a direct link to apply.

---

## 🗂️ Database Snapshot

| Stat | Value |
|---|---|
| Total programs | 62 |
| Countries covered | 21 |
| Free programs (€0 tuition) | 8 |
| Programs with scholarships | 42 |
| Degree levels | Bachelor · Master · PhD |
| Deadline range | 2027 |

**Countries:** Germany · Netherlands · France · Spain · Italy · Sweden · Norway · Finland · Denmark · Austria · Belgium · Switzerland · Czech Republic · Poland · Hungary · Japan · South Korea · China · USA · Canada · Australia

**Fields:** Computer Science · Engineering · Business · Medicine · Law · Psychology · Arts · Architecture · Biology · Economics · Physics · AI · Cybersecurity · Bioinformatics · Finance · and more

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/misha622/Unipath.git
cd Unipath

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# → fill in your Supabase URL and anon key

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🗺️ Project Structure

```
unipath/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── explore/            # Program catalogue with filters
│   │   ├── wizard/             # Guided selection flow
│   │   ├── compare/            # Side-by-side comparison
│   │   ├── dashboard/          # Saved programs (authenticated)
│   │   ├── auth/               # Sign in / sign up
│   │   └── uni/[slug]/         # Individual program detail page
│   │
│   ├── components/
│   │   ├── filters/            # FilterBar component
│   │   ├── layout/             # Header & Footer
│   │   ├── ui/                 # Button, Card, Badge, Skeleton
│   │   ├── uni/                # UniHeader, TabNow, TabVisa, TabLife
│   │   └── wizard/             # StepFinance, StepSubject, ResultsPanel
│   │
│   ├── data/
│   │   └── programs.ts         # ← Static database of 62 programs
│   │
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   └── utils.ts            # formatCurrency, daysUntil, deadlineColor
│   │
│   └── types/
│       └── index.ts            # TypeScript types (Program, University, etc.)
│
├── public/
│   ├── favicon.ico
│   └── og-image.jpg
│
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Backend / Auth | [Supabase](https://supabase.com/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🤝 Contributing

Contributions are very welcome — especially data contributions (new programs) and UI improvements.

### Adding programs

Programs live in [`src/data/programs.ts`](src/data/programs.ts). Each entry follows this schema:

```ts
{
  id: 'unique-string',
  university: 'Full university name',
  country: 'Country in English',
  city: 'City',
  program: 'Program name',
  degree: 'Bachelor' | 'Master' | 'PhD',
  costPerYear: 0,              // 0 if free
  currency: 'EUR',
  ielts: 6.5,                  // minimum IELTS score
  gpa: 3.5,                    // minimum GPA
  deadline: '2027-MM-DD',
  scholarship: true | false,
  duration: 'X years',
  description: 'One-sentence description in English.'
}
```

### Steps

```bash
# 1. Fork the repo and create a branch
git checkout -b feat/add-programs-japan

# 2. Make your changes
# 3. Commit with a clear message
git commit -m "feat: add 5 Japanese university programs"

# 4. Open a Pull Request
```

Please verify that program data (deadlines, costs, requirements) is accurate as of the time of submission and cite the official university source in your PR description.

---

## 📋 Roadmap

- [ ] Supabase-backed dynamic data with nightly refresh
- [ ] User accounts — save favourite programs
- [ ] Email reminders 30 / 7 days before deadline
- [ ] AI-powered program matching (natural language input)
- [ ] Mobile app (React Native)
- [ ] More programs: 200+ target for v1.0
- [ ] Visa guide tab per country

---

## 📄 License

UniPath is open source under the [MIT License](LICENSE).  
Data is provided for informational purposes only. Always verify requirements directly with the university.

---

<div align="center">

Made with ☕ by [misha622](https://github.com/misha622)

*If UniPath helped you find your program, leave a ⭐ — it means a lot.*

</div>
