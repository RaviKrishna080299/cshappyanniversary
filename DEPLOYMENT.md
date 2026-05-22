# Deployment Guide: cshappyanniversary.com with Netlify

Your project is now ready to be deployed to the internet with your custom domain using **Netlify**!

## Step 1: Verify GitHub Repository

✅ You've already completed this! Your code is pushed to GitHub.

Check that your repository is **public** and on the **main** branch.

## Step 2: Connect to Netlify

1. Go to [Netlify.com](https://www.netlify.com)
2. Click **Sign up** (or log in if you have an account)
3. Choose **Sign up with GitHub**
4. Authorize Netlify to access your GitHub account
5. Click **Import an existing project**
6. Select your repository (e.g., `cshappyanniversary`)
7. Click **Deploy site**

Netlify will automatically:
- Detect your Vite configuration
- Run `npm run build`
- Deploy your `dist` folder
- Assign you a temporary URL (e.g., `https://xxxxx.netlify.app`)

**Wait for the build to complete** (you'll see a green success message)

## Step 3: Register Your Domain

### Free Options:
- **Freenom**: Free `.tk`, `.ml`, `.ga`, `.cf` domains → https://www.freenom.com
- **Example**: `cshappyanniversary.tk`

### Budget Options:
- **GoDaddy**: $2.99/year (first year) → https://www.godaddy.com
- **Namecheap**: $8.88/year → https://www.namecheap.com

1. Choose your registrar and search for your domain
2. Complete the purchase
3. Keep your registrar tab open for Step 4

## Step 4: Connect Custom Domain to Netlify

### Via Netlify DNS (Easiest - Only works for new domain registrations):
1. In your Netlify site settings: **Domain management** → **Add a domain**
2. Enter your domain (e.g., `cshappyanniversary.com`)
3. Netlify will show nameservers to add to your registrar

### Via CNAME Record (Works with any registrar):
1. In your Netlify site settings: **Domain management** → **Add a domain**
2. Enter your domain
3. Get your Netlify subdomain name
4. Go to your domain registrar's DNS settings
5. Add a CNAME record:
   - **Name**: `www`
   - **Value**: `YOUR_SITE.netlify.app`
   - **TTL**: 3600

6. For root domain (@), update to point to Netlify's load balancer IP (Netlify provides this)

## Step 5: Enable HTTPS

1. In Netlify site settings: **Domain management**
2. Under "HTTPS" section, click **Verify DNS configuration**
3. Netlify automatically provisions an SSL certificate (usually within minutes)

## Step 6: Verify Everything Works

1. Wait 5-15 minutes for DNS to propagate
2. Visit `https://cshappyanniversary.com` (or your chosen domain)
3. You should see your deployed application!

**If it doesn't work:**
- Clear your browser cache or use incognito mode
- Check DNS: `nslookup cshappyanniversary.com`
- Verify Netlify shows a green "Connected" status
- Check Netlify's Deploy log for build errors

## Step 7: Future Updates

Every time you push to the `main` branch on GitHub, Netlify automatically rebuilds and redeploys!

To update your site:
```bash
# Make your changes locally
git add .
git commit -m "Your commit message"
git push origin main
```

Watch the deploy in real-time on your Netlify dashboard.

## Netlify Benefits

✅ **Free tier includes:**
- Automatic HTTPS with Let's Encrypt
- Continuous deployment from Git
- 300 build minutes/month (more than enough!)
- Fast CDN globally
- Environment variables support
- Branch deployments for testing

## Advanced: Set Environment Variables

If you need API keys or secrets:
1. Netlify Dashboard → Site settings → **Build & deploy** → **Environment**
2. Add your variables
3. They're automatically available during builds

They won't be exposed to the browser (secure!).

---

## Troubleshooting

**Issue: Domain not connecting**
- Wait 15-30 minutes for DNS to propagate
- Clear your browser cache or use incognito mode
- Verify DNS records with: `nslookup cshappyanniversary.com`

**Issue: 404 Page Not Found**
- Check that the GitHub Actions workflow completed successfully
- Verify the dist folder was created with `npm run build`

**Issue: HTTPS not working**
- Go to GitHub Pages settings and uncheck/recheck "Enforce HTTPS"
- Wait a few minutes for the certificate to be issued

## Need Help?

- GitHub Pages Docs: https://docs.github.com/en/pages
- Domain DNS Help: Contact your domain registrar's support
