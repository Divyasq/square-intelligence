# GitHub Pages Deployment Guide

## 🚨 CRITICAL DEPLOYMENT CHECKLIST

### **ALWAYS Follow These Steps in Order:**

1. **Make Code Changes**
   ```bash
   # Edit source files as needed
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Copy Dist Files to Root**
   ```bash
   cp -r dist/* .
   ```

4. **🔥 CRITICAL: Fix Asset Paths in index.html**
   
   **ALWAYS change these paths from ABSOLUTE to RELATIVE:**
   
   ❌ **WRONG (Absolute paths - will break on GitHub Pages):**
   ```html
   <link rel="icon" type="image/svg+xml" href="/assets/vite-xxx.svg" />
   <script type="module" crossorigin src="/assets/index-xxx.js"></script>
   <link rel="stylesheet" href="/assets/index-xxx.css">
   ```
   
   ✅ **CORRECT (Relative paths - will work on GitHub Pages):**
   ```html
   <link rel="icon" type="image/svg+xml" href="./assets/vite-xxx.svg" />
   <script type="module" crossorigin src="./assets/index-xxx.js"></script>
   <link rel="stylesheet" href="./assets/index-xxx.css">
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

6. **Wait 1-2 Minutes**
   - GitHub Pages needs time to update
   - Check site after deployment

## 🚨 COMMON MISTAKES TO AVOID

### **Styling Breaks (404 CSS errors)**
- **Cause**: Using absolute paths `/assets/` instead of relative `./assets/`
- **Fix**: Always change `/assets/` to `./assets/` in index.html after copying from dist

### **JavaScript 404 Errors**
- **Cause**: Using absolute paths `/assets/` for JS files
- **Fix**: Always change `/assets/` to `./assets/` for all asset references

### **Icon/SVG Not Loading**
- **Cause**: Using absolute path `/assets/` for favicon
- **Fix**: Change to `./assets/` for favicon as well

## 📝 DEPLOYMENT COMMAND SEQUENCE

```bash
# 1. Build
npm run build

# 2. Copy files
cp -r dist/* .

# 3. Fix paths (CRITICAL STEP)
# Manually edit index.html to change:
# - /assets/ → ./assets/ (for ALL asset references)

# 4. Deploy
git add .
git commit -m "Deploy with fixed asset paths"
git push origin main
```

## 🎯 WHY THIS IS NECESSARY

- **GitHub Pages serves from**: `https://username.github.io/repository-name/`
- **Absolute paths try to load from**: `https://username.github.io/assets/` (WRONG)
- **Relative paths correctly load from**: `https://username.github.io/repository-name/assets/` (CORRECT)

## 🔍 HOW TO VERIFY DEPLOYMENT

1. **Check the live site**: https://divyasq.github.io/financial-suite/
2. **Look for styling**: Should have proper colors, layout, sidebar
3. **Check console**: Should have no 404 errors for CSS/JS files
4. **Test navigation**: All links should work without errors

## 🚨 IF STYLING IS BROKEN

**Symptoms:**
- Page looks unstyled (basic HTML appearance)
- Console shows 404 errors for CSS files
- Navigation appears as basic buttons instead of styled sidebar

**Quick Fix:**
1. Check `index.html` on GitHub Pages
2. Look for `/assets/` paths (these are wrong)
3. Change them to `./assets/` paths
4. Commit and push the fix

---

**Remember: ALWAYS fix asset paths from absolute to relative after copying dist files!**
