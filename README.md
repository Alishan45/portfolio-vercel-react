# Ali Shan - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, featuring AI/ML projects, GitHub integration, and a contact form with email functionality.

## 🚀 Features

- **Modern Design**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Dark/Light Mode**: Fully functional theme switching with system preference detection
- **3D Earth Animation**: Interactive Three.js Earth component in the hero section
- **GitHub Integration**: Automatic fetching and display of GitHub repositories
- **Contact Form**: Working contact form with email notifications using Nodemailer and EmailJS fallback
- **Firebase Integration**: Reviews system powered by Firestore
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Optimized**: Proper meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Database**: Firebase Firestore
- **Email**: Nodemailer + EmailJS
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your environment variables in `.env.local`

5. Run the development server:
```bash
npm run dev
```

## 🌍 Environment Variables

### Required for Email Functionality
- `EMAIL`: Your Gmail address
- `EMAIL_PASSWORD`: Gmail App Password
- `NEXT_PUBLIC_SEND_EMAIL`: Recipient email address

### Required for GitHub Integration
- `GITHUB_USERNAME`: Your GitHub username
- `GITHUB_TOKEN`: GitHub Personal Access Token

### Required for Firebase
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Optional (EmailJS Fallback)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## 🚀 Deployment on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

The project is optimized for Vercel with:
- Proper API routes configuration
- Serverless function optimization
- Static asset optimization
- Environment variable handling

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── contexts/              # React contexts
├── data/                  # Static data
├── lib/                   # Library configurations
├── styles/                # Additional styles
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

## 🎨 Features Overview

### Theme System
- Light/Dark/System modes
- Persistent theme selection
- Smooth transitions
- System preference detection

### Contact Form
- Form validation
- Email notifications
- Auto-reply system
- Fallback email service
- Success/Error handling

### GitHub Integration
- Automatic repository fetching
- Repository filtering
- Language detection
- Star/Fork counts
- Topic tags

### 3D Earth Component
- Interactive Three.js Earth
- Mouse interaction
- Texture loading
- Performance optimized

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

Ali Shan - [LinkedIn](https://www.linkedin.com/in/ali-shan-542246235/) - [GitHub](https://github.com/Alishan45)

---

Built with ❤️ by Ali Shan# portfolio-vercel-react
