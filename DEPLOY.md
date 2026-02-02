# 🚀 Quick Deploy to Vercel

## Prerequisites

- ✅ Code pushed to GitHub
- ✅ Server converted to ES6 modules
- ✅ Vercel account ([signup here](https://vercel.com))
- ⚠️ PostgreSQL database (see Step 1)

## Step 1: Set Up Database (Choose One)

### Option A: Supabase (Recommended - Free)

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Name**: `quiz-app`
   - **Database Password**: Create strong password (save it!)
   - **Region**: Choose closest to you
4. Wait ~2 minutes for setup
5. Go to **Settings → Database**
6. Copy **Connection Pooling URI** (not the regular URI)
7. Format: `postgresql://postgres.[ref]:[PASSWORD]@[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1`

### Option B: Vercel Postgres

1. Deploy to Vercel first (skip to Step 2)
2. In Vercel Dashboard → **Storage → Create Database → Postgres**
3. Follow prompts (automatically sets DATABASE_URL)

## Step 2: Deploy to Vercel

### Via Vercel Dashboard (Easiest)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select: `Dheeppthashree/quiz_app`
4. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `cd quiz-app-fullstack/client && npm install && npm run build`
   - **Output Directory**: `quiz-app-fullstack/client/dist`
   - **Install Command**: `npm install`

5. **Environment Variables** - Click "Add" for each:

   ```
   DATABASE_URL = [Your Supabase connection string from Step 1]
   NODE_ENV = production
   ```

6. Click **"Deploy"**

### Via Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd "c:\Users\dheep\Downloads\quiz app"
vercel

# Follow prompts, then deploy to production
vercel --prod
```

After deploying, add environment variables:

```bash
vercel env add DATABASE_URL
# Paste your database URL when prompted
```

## Step 3: Run Database Migration

```bash
# Set DATABASE_URL temporarily (use your actual URL)
$env:DATABASE_URL="your-supabase-connection-string"

# Navigate to server directory
cd "c:\Users\dheep\Downloads\quiz app\quiz-app-fullstack\server"

# Generate Prisma client
npx prisma generate

# Run migration
npx prisma migrate deploy
```

Or migrate via Prisma Studio:

```bash
npx prisma db push
```

## Step 4: Test Your Deployment

Visit your Vercel URL (e.g., `https://quiz-app-xyz.vercel.app`)

Test:

- ✅ Homepage loads
- ✅ Enter name and start quiz
- ✅ Answer questions
- ✅ View results
- ✅ Check leaderboard

## Troubleshooting

### Build Fails

**Error**: `Cannot find module 'xyz'`

- Solution: Check all dependencies are in package.json
- Run locally: `cd quiz-app-fullstack/client && npm run build`

### Database Connection Error

**Error**: `Can't reach database server`

- Verify DATABASE_URL in Vercel dashboard
- Check Supabase project is active
- Ensure using Connection Pooling URI (not direct connection)

### API Routes 404

- Check vercel.json routing configuration
- Verify build completed successfully
- Check Vercel function logs in dashboard

### Cold Starts

- First request may be slow (normal for serverless)
- Upgrade to Vercel Pro for better performance

## What's Deployed?

✅ **Frontend**: React app with voice controls, keyboard shortcuts
✅ **Backend**: Express API as serverless functions
✅ **Database**: PostgreSQL (Supabase/Vercel)
✅ **Features**: Quiz, scoring, leaderboard, analytics

## Next Steps

- 🌐 **Custom Domain**: Add in Vercel settings
- 📊 **Analytics**: Enable Vercel Analytics
- 🔍 **Monitoring**: Set up error tracking
- 🚀 **Performance**: Add caching headers

---

**Need Help?**

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Check deployment logs in Vercel dashboard
