# AI Product Builder Setup Guide

## Overview
The AI Product Builder uses OpenAI's GPT models to automatically parse Amazon product information and create structured product pages. When the AI service is unavailable, it falls back to basic text analysis.

## Environment Variables Setup

### 1. Create Environment File
Create a `.env` file in your project root directory:

```bash
# Local Vite env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenAI API Key (for AI service)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

### 3. Restart Development Server
After adding the environment variables, restart your development server:

```bash
npm run dev
```

## How It Works

### With AI Service (Recommended)
- Automatically extracts product details, features, and specifications
- Generates realistic product descriptions
- Creates structured product data
- Provides enhanced user experience

### Fallback Mode (No API Key)
- Creates basic products from text input
- Uses keyword analysis for categorization
- Generates default features and descriptions
- Still fully functional for basic product creation

## Troubleshooting

### Common Issues

1. **"JSON.parse: unexpected end of data"**
   - This usually means the AI service is not responding
   - Check if your API key is valid
   - Verify environment variables are loaded
   - Check browser console for detailed error messages

2. **"AI service temporarily unavailable"**
   - OpenAI API might be experiencing issues
   - Check your internet connection
   - Verify API key permissions
   - Try again in a few moments

3. **"Could not extract product information"**
   - Product text might be incomplete
   - Try copying more complete product information
   - Check if the text contains product details

### Debug Mode
The application now includes comprehensive logging. Check your browser console for detailed information about:
- Image upload progress
- AI service calls
- Product creation steps
- Error details

## Features

- **Image Upload**: Support for product and review images
- **Automatic Parsing**: AI-powered product information extraction
- **Fallback Mode**: Works even without AI service
- **Real-time Feedback**: Progress indicators and status messages
- **Error Handling**: User-friendly error messages and recovery options

## Support
If you continue to experience issues:
1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Ensure your OpenAI API key has sufficient credits
4. Try using the fallback mode for immediate functionality
