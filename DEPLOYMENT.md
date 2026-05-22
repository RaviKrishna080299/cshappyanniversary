# Deployment Guide: cshappyanniversary.com

Your project is now ready to be deployed to the internet with your custom domain!

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in (create an account if needed)
2. Click the **+** icon in the top right → **New repository**
3. Name your repository (e.g., `cshappyanniversary` or `lensar-webar`)
4. Choose **Public** (required for GitHub Pages free tier)
5. Click **Create repository**

## Step 2: Push Your Code to GitHub

After creating the repository, follow the commands GitHub shows you. Typically:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - Select **GitHub Actions** as the source
4. GitHub will automatically detect and use the deploy workflow we created
5. Wait for the first deployment to complete (you'll see a checkmark in the Actions tab)

## Step 4: Register Your Domain

Choose where to buy your domain:
- **Affordable & Popular**: Namecheap, GoDaddy, Google Domains
- **Recommended**: Namecheap (good pricing, excellent support)

1. Search for `cshappyanniversary.com`
2. Complete the purchase
3. (Keep the registrar tab open for the next step)

## Step 5: Configure DNS for Custom Domain

After purchasing, you need to point your domain to GitHub Pages:

### Option A: Using GitHub's Nameservers (Easiest)
1. In your domain registrar, change the nameservers to:
   - `ns-1930.awsdns-49.com`
   - `ns-1366.awsdns-43.com`
   - `ns-1521.awsdns-54.org`
   - `ns-504.awsdns-63.net`
   (These are examples; GitHub will provide specific ones)

2. In GitHub repository → Settings → Pages:
   - Enter `cshappyanniversary.com` in the "Custom domain" field
   - Check "Enforce HTTPS"
   - GitHub will verify and create the DNS records

### Option B: Using CNAME Record (Works with most registrars)
1. In your domain registrar's DNS settings
2. Add a CNAME record:
   - **Name**: `www`  (or leave blank for root domain)
   - **Value**: `YOUR_USERNAME.github.io`
   - **TTL**: 3600

3. For the root domain (@), add an A record pointing to:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

4. In GitHub repository → Settings → Pages:
   - Enter `cshappyanniversary.com` in the "Custom domain" field
   - Check "Enforce HTTPS"

## Step 6: Verify Everything Works

1. Wait 5-15 minutes for DNS to propagate
2. Visit `https://cshappyanniversary.com` in your browser
3. You should see your deployed application!
4. If it doesn't work, check:
   - ✓ GitHub Pages shows "active" status
   - ✓ DNS records are correctly configured (use `nslookup` or online DNS checker)
   - ✓ HTTPS is enabled

## Step 7: Future Updates

Every time you push to the `main` branch, the application automatically rebuilds and deploys (thanks to the GitHub Actions workflow we created).

To update your site:
```bash
# Make your changes locally
git add .
git commit -m "Your commit message"
git push
```

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
