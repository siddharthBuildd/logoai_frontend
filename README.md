# 🎨 LogoAI Frontend

A modern, responsive React application for AI-powered logo generation and enhancement with a beautiful user interface.

## ✨ Features

- **Logo Generation**: Create logos from text descriptions
- **Logo Enhancement**: Improve existing logos with AI
- **Reference-Based Generation**: Upload reference images for better results
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Beautiful UI components with shadcn/ui
- **Real-time Preview**: Instant logo generation and preview

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running (logoai_backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd logoai_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   echo "VITE_API_URL=http://localhost:3001/api" > .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:5173`

## 📱 Pages & Features

### 🏠 Home Page
- Hero section with call-to-action
- Features showcase
- Services overview
- Modern landing page design

### 🎨 Logo Generator
- Text-to-logo generation
- Style and color customization
- Real-time preview
- Download generated logos

### ✨ Logo Enhancer
- Upload existing logos
- AI-powered enhancement
- Before/after comparison
- Multiple enhancement options

### 📚 Reference-Based Generation
- Upload reference images
- Generate similar logos
- Style matching
- Custom modifications

### ℹ️ Additional Pages
- About Us
- Contact Us
- Help Center
- Privacy Policy
- Terms of Service
- Blog
- Careers

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── ui/            # UI components (shadcn/ui)
├── pages/              # Page components
├── services/           # API services
├── hooks/              # Custom React hooks
├── lib/                # Utilities
└── assets/            # Static assets
```

## 🎨 UI Components

Built with **shadcn/ui** components:
- Buttons, Cards, Forms
- Dialogs, Dropdowns, Tabs
- Navigation, Breadcrumbs
- Loading states, Toasts
- And many more...

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:3001/api |

### Vite Configuration

The project uses Vite for fast development and optimized builds:
- Hot Module Replacement (HMR)
- TypeScript support
- Path aliases configured
- Optimized production builds

## 🚀 Deployment

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variables
5. Deploy automatically on push

### Vercel
1. Connect your repository to Vercel
2. Framework preset: Vite
3. Set environment variables
4. Deploy automatically on push

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Configure custom domain if needed

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Components

1. Create component in appropriate directory
2. Export from index file if needed
3. Add to routing if it's a page
4. Style with Tailwind CSS

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow shadcn/ui design system
- Maintain responsive design
- Use CSS variables for theming

## 📦 Build & Optimization

The build process includes:
- TypeScript compilation
- Code splitting
- Asset optimization
- Tree shaking
- Minification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Test your changes
5. Submit a pull request

## 🎯 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with code splitting
- **Loading**: Fast initial load with lazy loading
- **Responsive**: Mobile-first design

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the component documentation
- Review the API integration guide

---

**Built with ❤️ for beautiful logo creation experiences**