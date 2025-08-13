#!/bin/bash

echo "🚀 Starting deployment process..."

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Go to https://netlify.com"
    echo "2. Sign up/login"
    echo "3. Drag the 'dist' folder to Netlify"
    echo "4. Your site will be live instantly!"
    echo ""
    echo "🌐 For custom domain:"
    echo "1. In Netlify dashboard → Domain settings"
    echo "2. Add your custom domain"
    echo "3. Configure DNS at your domain registrar"
    echo ""
    echo "📁 Your built files are in the 'dist' folder"
    echo "📋 Check DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 