# 🚀 Supabase Setup Guide for Cross-Browser Product Sync

This guide will help you set up Supabase to enable **real cross-browser and cross-device synchronization** for your Amazon product store.

## 🎯 What This Fixes

- ✅ **Cross-Browser Sync**: Products created in Chrome will appear in Safari, Firefox, etc.
- ✅ **Cross-Device Sync**: Products created on your laptop will appear on your phone
- ✅ **Real-time Updates**: Changes sync automatically within 10 seconds
- ✅ **Production Ready**: Works on Netlify and any hosting platform
- ✅ **Offline Support**: Local storage fallback when internet is unavailable

## 📋 Prerequisites

- A Supabase account (free tier is sufficient)
- Your Netlify deployment or local development environment

## 🔧 Step 1: Create a Supabase Project

1. **Go to [supabase.com](https://supabase.com)** and sign up/login
2. **Click "New Project"**
3. **Choose your organization** (create one if needed)
4. **Enter project details:**
   - Name: `amazon-store-sync` (or whatever you prefer)
   - Database Password: Generate a strong password and save it
   - Region: Choose the closest to your users
5. **Click "Create new project"**
6. **Wait for setup to complete** (takes 2-3 minutes)

## 🗄️ Step 2: Set Up the Database Schema

1. **In your Supabase dashboard, go to the SQL Editor**
2. **Copy the entire contents** of the `supabase-schema.sql` file from your project
3. **Paste it into the SQL Editor** and click "Run"
4. **You should see:** "Success. No rows returned" - this means the tables were created successfully

## 🔑 Step 3: Get Your API Keys

1. **In your Supabase dashboard, go to Settings → API**
2. **Copy the following values:**
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 🌐 Step 4: Configure Environment Variables

### For Local Development:

1. **Create/edit your `.env` file** in the project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Replace the values** with your actual Supabase URL and key

### For Netlify Production:

1. **Go to your Netlify dashboard**
2. **Select your site → Site settings → Environment variables**
3. **Add these variables:**
   - **Variable name:** `VITE_SUPABASE_URL`
   - **Value:** Your Supabase project URL
   - **Click "Create"**
   
   - **Variable name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon key
   - **Click "Create"**

4. **Redeploy your site** for the changes to take effect

## ✅ Step 5: Test the Setup

### Local Testing:

1. **Restart your development server:**
```bash
npm run dev
```

2. **Open your browser console** and look for:
```
✅ Supabase configured - using Supabase mode
☁️ Event broadcasted to cloud successfully
```

3. **Create a product** - you should see sync messages in the console

### Production Testing:

1. **Deploy to Netlify** with the environment variables set
2. **Open your site in multiple browsers** (Chrome, Safari, Firefox)
3. **Create a product in one browser**
4. **Check the other browsers** - the product should appear within 10 seconds

### Cross-Device Testing:

1. **Open your site on your phone**
2. **Create a product on your computer**
3. **Refresh your phone** - the product should be there!

## 🔍 Troubleshooting

### "Supabase not configured" Error:
- Check that your environment variables are set correctly
- Make sure variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- For Netlify, redeploy after adding environment variables

### Products Not Syncing:
- Check browser console for error messages
- Verify your Supabase project is active (not paused)
- Check your internet connection
- Look for any CORS errors in the console

### Database Errors:
- Make sure you ran the SQL schema correctly
- Check that RLS (Row Level Security) policies are in place
- Verify the tables exist in your Supabase dashboard under Database → Tables

## 📊 Monitoring Your Sync

You can monitor sync activity in your Supabase dashboard:

1. **Go to Database → Tables**
2. **Check the `products` table** for your synced products
3. **Check the `sync_events` table** for sync activity
4. **Use the views:**
   - `recent_products` - Shows latest products
   - `recent_sync_events` - Shows sync activity

## 🚀 Performance Tips

- **Sync happens every 10 seconds** automatically
- **Manual sync** when tab becomes visible
- **Immediate sync** when creating/updating products
- **Offline fallback** to local storage when no internet

## 🛡️ Security Notes

- The setup uses **public anon keys** which is safe for this use case
- **Row Level Security (RLS)** is enabled on all tables
- All operations are **client-side authenticated**
- No sensitive data is exposed through the API

## ✨ What's Next?

Once set up, your product sync will work automatically:

- Products created in **any browser** will sync to **all browsers**
- Works across **different devices** connected to the internet
- **Real-time updates** without page refresh
- **Offline support** with automatic sync when back online

You'll see sync status indicators in the UI and detailed logging in the browser console.
