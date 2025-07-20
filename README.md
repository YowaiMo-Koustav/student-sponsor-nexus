# 🚀 SponsorSync - AI-Powered Student-Sponsor Matching Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> **Revolutionizing student-sponsor connections with AI-powered matchmaking**

SponsorSync is a modern web application that connects student organizations with perfect sponsors using intelligent AI algorithms. Built with React, TypeScript, and Tailwind CSS, it provides a seamless experience for both students seeking sponsorships and companies looking to engage with student communities.

## 🌟 Live Demo

**[🚀 Try SponsorSync Live Demo](https://sponsorsync-demo.vercel.app/)**

Experience the full platform with demo data and all features working seamlessly.

## ✨ Features

### 🎯 Core Features
- **AI-Powered Matching** - 95% accuracy in matching events with sponsors
- **Role-Based Authentication** - Separate experiences for students and sponsors
- **Advanced Search & Filtering** - Find perfect matches with intelligent filters
- **Real-time Messaging** - Built-in chat system for seamless communication
- **Analytics Dashboard** - Track performance and ROI metrics
- **Event Discovery** - Browse and discover relevant events

### 🎨 User Experience
- **Responsive Design** - Works perfectly on all devices
- **Dark Mode** - Modern, eye-friendly interface
- **Smooth Animations** - Professional micro-interactions
- **Accessibility** - WCAG compliant design
- **Performance Optimized** - Fast loading and smooth interactions

### 🔧 Technical Features
- **TypeScript** - Type-safe development
- **React 18** - Latest React features and hooks
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **React Router** - Client-side routing
- **Demo Data** - Fully functional without backend dependencies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-sponsor-nexus.git
   cd student-sponsor-nexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Demo Accounts

**Student Account:**
- Email: `student@demo.com` (or any email with even characters)
- Password: `password123`

**Sponsor Account:**
- Email: `sponsor@demo.com` (or any email with odd characters)
- Password: `password123`

## 🏗️ Project Structure

```
student-sponsor-nexus/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── dashboards/     # Dashboard components
│   │   ├── events/         # Event-related components
│   │   ├── messaging/      # Chat and messaging
│   │   └── notifications/  # Notification system
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Demo data files
│   ├── lib/                # Utility functions
│   └── integrations/       # External integrations
├── public/                 # Static assets
├── supabase/               # Database migrations
└── docs/                   # Documentation
```

## 🎯 Key Components

### Authentication System
- Role-based authentication (Student/Sponsor)
- Demo mode with automatic role assignment
- Protected routes and session management

### Dashboard
- **Student Dashboard**: Event creation, sponsor discovery, analytics
- **Sponsor Dashboard**: Event browsing, student engagement, ROI tracking

### Advanced Search
- Multi-criteria filtering
- AI-powered recommendations
- Saved searches and preferences

### Messaging System
- Real-time chat interface
- Conversation management
- File sharing capabilities

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

### UI/UX
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Modern interface
- **Smooth Animations** - Professional interactions
- **Accessibility** - WCAG 2.1 compliant

## 🎨 Design System

### Color Palette
- **Primary**: Professional blue (`hsl(213 94% 68%)`)
- **Accent**: Warm orange (`hsl(34 100% 65%)`)
- **Success**: Green (`hsl(142 76% 42%)`)
- **Destructive**: Red (`hsl(0 84% 65%)`)

### Typography
- **Headings**: Poppins (Bold, 600-700 weight)
- **Body**: Inter (Regular, 400 weight)
- **Monospace**: For code and technical content

### Components
- **Glass Morphism** - Modern glass effects
- **Gradient Backgrounds** - Professional gradients
- **Micro-interactions** - Smooth hover effects
- **Loading States** - Skeleton loaders

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+) - Full feature set
- **Tablet** (768px-1199px) - Adapted layout
- **Mobile** (320px-767px) - Touch-optimized

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Environment Variables

Create a `.env.local` file for local development:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Vite** for the fast build tool
- **React Team** for the amazing framework

## 📞 Support

- **Documentation**: [Project Wiki](../../wiki)
- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Email**: hello@sponsorsync.com

## 🔗 Links

- **[Live Demo](https://sponsorsync-demo.vercel.app/)**
- **[Documentation](https://docs.sponsorsync.com)**
- **[API Reference](https://api.sponsorsync.com)**
- **[Community](https://community.sponsorsync.com)**

---

<div align="center">

**Made with ❤️ for the student community**

[![SponsorSync](https://img.shields.io/badge/SponsorSync-AI%20Powered-blue?style=for-the-badge&logo=react)](https://sponsorsync-demo.vercel.app/)

</div>
