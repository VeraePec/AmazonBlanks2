#!/bin/bash

echo "🚀 Starting deployment process..."

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    # Attempt non-interactive Netlify deploy if credentials are present
    if [ -n "$NETLIFY_AUTH_TOKEN" ] && [ -n "$NETLIFY_SITE_ID" ]; then
        echo "☁️  NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID detected — deploying to Netlify..."
        if command -v netlify >/dev/null 2>&1; then
            NETLIFY_CMD="netlify"
        else
            NETLIFY_CMD="npx netlify-cli"
        fi
        $NETLIFY_CMD deploy --prod --dir "dist" --site "$NETLIFY_SITE_ID" --message "Auto deploy $(date '+%Y-%m-%d %H:%M:%S')"
        if [ $? -eq 0 ]; then
            echo "✅ Netlify deploy complete."
            echo ""
            echo "🔎 If you need the site URL, check your Netlify dashboard for this site (Site settings → Site information)."
            exit 0
        else
            echo "⚠️ Netlify deploy failed. Falling back to manual instructions below."
            echo ""
        fi
    else
        echo "ℹ️  NETLIFY_AUTH_TOKEN and/or NETLIFY_SITE_ID not found — skipping auto-deploy."
        echo ""
    fi

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
    echo "🔐 To enable one-command deploys next time (non-interactive):"
    echo "   export NETLIFY_AUTH_TOKEN=\"<your_token>\"   # From Netlify User settings → Applications → Personal access tokens"
    echo "   export NETLIFY_SITE_ID=\"<your_site_id>\"    # From Site settings → Site information → API ID"
    echo "   ./deploy.sh"
    echo ""
    echo "📁 Your built files are in the 'dist' folder"
    echo "📋 Check DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 