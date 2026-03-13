# DMV Sound Lab Node.js Website

A lightweight Express website for **dmvsoundlab.com** with a built-in contact form that can send inquiries to your business email.

## What's included
- Responsive single-page marketing site
- Contact form using Nodemailer
- Environment-variable based SMTP setup
- Ready for GitHub and Hostinger deployment

## Local setup
```bash
npm install
cp .env.example .env
npm run dev
```
Open `http://localhost:3000`

## Deploy to Hostinger from GitHub
Hostinger's current Node.js Web Apps Hosting supports connecting a GitHub repository, automatic builds/deployments, and Node.js versions 18.x, 20.x, 22.x, and 24.x. You can start the deployment flow in hPanel, choose **Connect GitHub**, select the repo and branch, then configure environment variables during deployment. citeturn799969search0turn799969search3turn799969search9

### Suggested deployment steps
1. Create a new GitHub repo.
2. Push this project.
3. In Hostinger hPanel, start a **Node.js Web App**.
4. Choose **Connect GitHub** and select the repo/branch.
5. Set the build command to `npm install` if Hostinger doesn't auto-detect it.
6. Set the start command to `npm start`.
7. Add the variables from `.env.example` into Hostinger's environment variables screen.
8. Point `dmvsoundlab.com` to the deployed site in Hostinger.

## GitHub quick start
```bash
git init
git add .
git commit -m "Initial DMV Sound Lab website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/dmvsoundlab.git
git push -u origin main
```

## Email setup
This site sends contact form submissions with SMTP. Use the SMTP settings from your email provider, such as Google Workspace, Titan Mail, or Zoho Mail.

At minimum, set:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `FROM_EMAIL`
- `CONTACT_TO`

## Customize content
Edit the copy in `server.js` and styles in `public/styles.css`.
