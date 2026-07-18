const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const root = path.resolve(__dirname, '..');
const envFile = path.join(root, '.env');
const envText = fs.readFileSync(envFile, 'utf8');
const env = envText.split(/\r?\n/).reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) acc[match[1]] = match[2].trim();
  return acc;
}, {});

console.log('GITHUB_USERNAME=', env.GITHUB_USERNAME);
console.log('GITHUB_TOKEN length=', env.GITHUB_TOKEN ? env.GITHUB_TOKEN.length : 0);
console.log('EMAIL=', env.EMAIL);
console.log('EMAIL_PASSWORD length=', env.EMAIL_PASSWORD ? env.EMAIL_PASSWORD.length : 0);

(async () => {
  try {
    const githubUrl = `https://api.github.com/users/${env.GITHUB_USERNAME}/repos?sort=updated&per_page=3`;
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'portfolio-vercel-react',
    };
    if (env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
    }

    const githubRes = await fetch(githubUrl, { headers });
    console.log('GitHub fetch status:', githubRes.status, githubRes.statusText);
    const githubBody = await githubRes.text();
    console.log('GitHub body preview:', githubBody.slice(0, 1200));
  } catch (err) {
    console.error('GitHub fetch error:', err);
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: env.EMAIL,
        pass: env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const ok = await transporter.verify();
    console.log('SMTP verify ok:', ok);
  } catch (err) {
    console.error('SMTP verify failed:', err && err.message ? err.message : err);
  }
})();