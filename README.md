# Sircosia - Story Magic 🪄📖

AI-powered story generator for kids aged 3-12. English & French.

## Quick Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
cd sircosia-deploy
git init
git add .
git commit -m "Initial commit"
```
Then create a repo on github.com and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/sircosia.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `sircosia` repo
4. In "Environment Variables", add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key from https://console.anthropic.com/
5. Click "Deploy"
6. Wait ~60 seconds — your site is live!

### Step 3: Connect your GoDaddy domain
1. In Vercel dashboard → your project → Settings → Domains
2. Add `sircosia.com`
3. Vercel will show you DNS records to add
4. Go to GoDaddy → DNS Management for sircosia.com
5. Add the records Vercel tells you (usually a CNAME or A record)
6. Wait 5-30 minutes for DNS to propagate
7. Done! sircosia.com is live 🎉

## Local Development
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your Anthropic API key
npm run dev
```
Open http://localhost:3000

## Tech Stack
- Next.js 14 (React)
- Tailwind CSS
- Claude API (Anthropic) for story generation
- Browser Speech API for voice input & read-aloud
- localStorage for saving stories on device
