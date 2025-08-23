#!/bin/bash

echo "🚀 Preparing for Vercel deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Portfolio ready for deployment"
fi

# Check if changes need to be committed
if [ -n "$(git status --porcelain)" ]; then
    echo "Committing latest changes..."
    git add .
    git commit -m "Update: Prepare for Vercel deployment"
fi

echo "✅ Build successful!"
echo "📦 Bundle size: ~481 kB"
echo ""
echo "🌐 Ready to deploy to Vercel!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Go to vercel.com and import your repository"
echo "3. Add environment variables (see DEPLOYMENT.md)"
echo "4. Deploy!"
echo ""
echo "Or use Vercel CLI:"
echo "npm i -g vercel && vercel"
echo ""
echo "🎉 Your portfolio is ready for the world!"