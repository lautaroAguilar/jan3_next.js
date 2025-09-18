# JAN3 Next.js Migration

This project is a migration of the JAN3 Ghost theme to a Next.js application, using Ghost as a headless CMS.

## 🚀 Project Status

### ✅ Completed Phases

1. **Setup Next.js project structure and dependencies** 
   - ✅ Next.js 14+ with TypeScript and Tailwind CSS
   - ✅ Ghost Content API integration
   - ✅ Essential dependencies installed (Chart.js, Framer Motion, etc.)

2. **Configure Ghost Content API integration**
   - ✅ Ghost API client setup (`src/lib/ghost.ts`)
   - ✅ TypeScript interfaces for Ghost content
   - ✅ Utility functions for fetching posts, pages, tags, authors
   - ✅ Environment variables configuration

3. **Create core layout components and page structure**
   - ✅ Main Layout component (`src/components/layout/Layout.tsx`)
   - ✅ Header with mobile/desktop variants
   - ✅ Footer with social links and navigation
   - ✅ Navigation component with Ghost CMS integration
   - ✅ Language chooser placeholder
   - ✅ Basic homepage template

### 🔄 Next Phases

4. **Migrate homepage (index.hbs) functionality** - *In Progress*
5. **Create blog post and page templates** - *Pending*
6. **Implement financial charts and custom pages** - *Pending*
7. **Setup styling system and responsive design** - *Pending*
8. **Implement internationalization (i18n)** - *Pending*
9. **Add search, forms, and interactive features** - *Pending*
10. **Setup SEO, metadata, and performance optimizations** - *Pending*
11. **Configure deployment and environment setup** - *Pending*
12. **Testing and quality assurance** - *Pending*

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- Ghost CMS instance (local or hosted)
- Ghost Content API key

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env.local` and update:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Ghost CMS configuration:
   ```env
   GHOST_URL=http://localhost:2368
   GHOST_CONTENT_API_KEY=your-content-api-key-here
   SITE_URL=http://localhost:3000
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
   RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   ├── Header.tsx    # Header with nav
│   │   ├── Footer.tsx    # Footer component
│   │   ├── Navigation.tsx # Navigation component
│   │   └── LanguageChooser.tsx # Language selector
│   ├── ui/               # UI components
│   ├── forms/            # Form components
│   └── charts/           # Chart components
├── lib/                  # Utility functions
│   ├── ghost.ts          # Ghost CMS client
│   └── utils.ts          # Common utilities
└── types/                # TypeScript type definitions
```

## 🎨 Original Theme Features

The original JAN3 Ghost theme includes:

- **Multi-language support** with custom i18n system
- **Financial charts** (ETF flows, Bitcoin models, etc.)
- **Complex responsive design** with mobile/desktop variants  
- **Custom page templates** (20+ specialized pages)
- **Video backgrounds and image carousels**
- **Contact forms with reCAPTCHA integration**
- **Search functionality and newsletter subscriptions**
- **Parallax effects and animations**

## 🔧 Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Styling:** Tailwind CSS
- **CMS:** Ghost (Headless)
- **Language:** TypeScript
- **Charts:** Chart.js + react-chartjs-2
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **SEO:** Next SEO
- **Data Processing:** PapaParse (for CSV)

## 📖 Ghost CMS Integration

The project uses Ghost as a headless CMS with the following integration points:

- **Posts:** Blog articles and news
- **Pages:** Static pages (About, Contact, etc.)
- **Tags:** Content categorization
- **Authors:** Author profiles
- **Settings:** Site configuration
- **Navigation:** Primary and secondary menus

### Getting Your Ghost API Key

1. Go to your Ghost Admin panel
2. Navigate to **Settings → Integrations**
3. Click **Add custom integration**
4. Copy the **Content API Key**
5. Update your `.env.local` file

## 🚧 Development Notes

### Current Status
- Basic layout and navigation are functional
- Ghost CMS integration is configured but optional (gracefully fails if not configured)
- Mobile-responsive header and footer implemented
- Homepage shows connection status to Ghost CMS

### Known Issues
- Language chooser is a placeholder (will be implemented with i18n)
- Search functionality not yet implemented
- Financial charts need migration from original theme
- Styling needs refinement to match original design

### Testing
Without Ghost CMS configured, the site will show:
- Default navigation and branding
- "Ghost CMS not configured" message
- All layout components should render correctly

With Ghost CMS configured, the site will show:
- Dynamic navigation from Ghost
- Site title and branding from Ghost settings
- "Connected to Ghost CMS" confirmation message

## 🤝 Contributing

This is a migration project from the original JAN3 Ghost theme to Next.js. The goal is to maintain feature parity while gaining the benefits of a modern React-based architecture.

## 📄 License

MIT - Same as the original JAN3 Ghost theme
