# ChefGPT - Kitchen Intelligence Platform

A modern AI-powered culinary assistant application built with React, TypeScript, and Vite. ChefGPT provides real-time analytics, feedback management, compliance tracking, and intelligent chat capabilities for kitchen operations.

## ✨ Features

- **🤖 Agentic Chat** - AI-powered conversational interface for menu planning, waste reduction, and procurement
- **📊 Dashboard** - Real-time analytics with charts for food waste, guest demographics, daily covers, and more
- **📋 Compliance & Safety** - HACCP inspection tracking, safety checks, and compliance reporting
- **📚 Knowledge Base** - RAG-powered document management for recipes, playbooks, and data sources
- **🌓 Theme Support** - Dark and light mode themes

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router DOM

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher) or [yarn](https://yarnpkg.com/)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chef-gpt/client
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
   
   Navigate to `http://localhost:5173` to view the application.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript compile + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🔐 Demo Credentials

For testing purposes, use the following credentials:

- **Email:** `chef@restaurant.com`
- **Password:** `password123`

Or click the **Demo** button to skip login.

## 📁 Project Structure

```
src/
├── component/          # Reusable UI components
│   ├── Compliance/     # Safety & compliance module
│   ├── Conversation/   # Chat interface
│   ├── Dashboard/      # Analytics dashboard
│   ├── Graph/          # Chart components
│   ├── Header/         # App header
│   ├── Knowledge/      # Knowledge base module
│   ├── Modal/          # Modal components
│   └── SideBar/        # Navigation sidebar
├── context/            # React context providers
├── helper/             # Utility functions & constants
├── mock-data/          # Sample data for development
├── page/               # Page components
│   ├── Log-in/         # Authentication page
│   ├── Main/           # Main app layout
│   └── PageLoader/     # Loading screen
├── router/             # Route configurations
├── type/               # TypeScript type definitions
├── App.tsx             # Root component
├── main.tsx            # Application entry point
└── global.css          # Global styles & Tailwind config
```

## 🎨 Theming

The app supports dark and light themes that automatically sync with your browser/system preferences:

- Theme is detected via `prefers-color-scheme` media query
- Automatically switches when you change your OS/browser theme settings
- Default theme is dark mode

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Culinary Intelligence
