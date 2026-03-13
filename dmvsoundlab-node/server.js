require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderPage(message = '') {
  const notice = message
    ? `<div class="notice" role="status">${escapeHtml(message)}</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DMV Sound Lab | Recording, Mixing & Creative Audio</title>
  <meta name="description" content="DMV Sound Lab helps artists, podcasters, and brands with recording, mixing, mastering, and creative audio production." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header class="hero">
    <nav class="nav container">
      <div class="brand">DMV Sound Lab</div>
      <div class="nav-links">
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">DMV audio production studio</p>
        <h1>Clean sound. Sharp mixes. Fast turnaround.</h1>
        <p class="lead">A modern audio studio for artists, podcasters, video creators, and businesses that need premium sound without the runaround.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#contact">Book a session</a>
          <a class="button button-secondary" href="mailto:info@dmvsoundlab.com">Email info@dmvsoundlab.com</a>
        </div>
        <ul class="trust-row">
          <li>Recording</li>
          <li>Mixing</li>
          <li>Mastering</li>
          <li>Podcast audio</li>
        </ul>
      </div>
      <div class="card studio-card">
        <p class="card-label">Why clients hire us</p>
        <div class="metric"><span>48 hrs</span><small>Typical turnaround on edits</small></div>
        <div class="metric"><span>1 place</span><small>Recording, cleanup, mix, and delivery</small></div>
        <div class="metric"><span>Built for</span><small>Independent artists, podcasts, and local brands</small></div>
      </div>
    </div>
  </header>

  <main>
    <section class="section container" id="services">
      <div class="section-heading">
        <p class="eyebrow">Services</p>
        <h2>Everything needed to sound release-ready</h2>
      </div>
      <div class="grid three-up">
        <article class="card service-card">
          <h3>Recording Sessions</h3>
          <p>Capture vocals, voiceovers, interviews, and live takes in a comfortable, focused environment.</p>
        </article>
        <article class="card service-card">
          <h3>Mixing & Mastering</h3>
          <p>Balance, polish, and finalize your sound so it translates across streaming platforms, cars, and headphones.</p>
        </article>
        <article class="card service-card">
          <h3>Podcast & Content Audio</h3>
          <p>Cleanup, leveling, intros, edits, and export packages for creators who need professional results quickly.</p>
        </article>
      </div>
    </section>

    <section class="section section-dark" id="process">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Process</p>
          <h2>Simple workflow, fewer delays</h2>
        </div>
        <div class="grid steps">
          <article class="step"><span>01</span><h3>Tell us what you need</h3><p>Send a quick note with your project type, deadline, and goals.</p></article>
          <article class="step"><span>02</span><h3>Get booked fast</h3><p>We confirm scope, timing, and the best setup for your session or delivery.</p></article>
          <article class="step"><span>03</span><h3>Receive polished audio</h3><p>Approved files are delivered in the formats you need for streaming, socials, or client handoff.</p></article>
        </div>
      </div>
    </section>

    <section class="section container" id="contact">
      <div class="section-heading">
        <p class="eyebrow">Contact</p>
        <h2>Request a quote or session</h2>
      </div>
      ${notice}
      <div class="contact-layout">
        <form class="card contact-form" method="post" action="/contact">
          <label>
            Name
            <input name="name" type="text" required maxlength="80" />
          </label>
          <label>
            Email
            <input name="email" type="email" required maxlength="120" />
          </label>
          <label>
            Service
            <select name="service" required>
              <option value="">Choose one</option>
              <option>Recording Session</option>
              <option>Mixing & Mastering</option>
              <option>Podcast Editing</option>
              <option>Brand / Commercial Audio</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Project details
            <textarea name="message" rows="6" required maxlength="2000" placeholder="What are you working on? Deadline? Preferred session date?"></textarea>
          </label>
          <input type="text" name="company" class="hp-field" tabindex="-1" autocomplete="off" />
          <button class="button button-primary" type="submit">Send inquiry</button>
        </form>
        <aside class="card contact-card">
          <h3>Email</h3>
          <p><a href="mailto:info@dmvsoundlab.com">info@dmvsoundlab.com</a></p>
          <h3>Availability</h3>
          <p>Studio sessions by appointment. Remote mix and edit projects welcome.</p>
          <h3>Best for</h3>
          <p>Artists, podcasters, agencies, event recaps, and local businesses across the DMV.</p>
        </aside>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-row">
      <p>© <span id="year"></span> DMV Sound Lab. All rights reserved.</p>
      <a href="mailto:info@dmvsoundlab.com">info@dmvsoundlab.com</a>
    </div>
  </footer>

  <script>
    document.getElementById('year').textContent = new Date().getFullYear();
  </script>
</body>
</html>`;
}

app.get('/', (_req, res) => {
  res.send(renderPage());
});

app.post('/contact', async (req, res) => {
  const { name = '', email = '', service = '', message = '', company = '' } = req.body;

  if (company) {
    return res.status(200).send(renderPage('Thanks. Your message was received.'));
  }

  if (!name.trim() || !email.trim() || !service.trim() || !message.trim()) {
    return res.status(400).send(renderPage('Please complete all fields.'));
  }

  const transportReady = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  if (!transportReady) {
    return res.status(200).send(renderPage('Form is working, but email sending is not configured yet. Add SMTP settings in Hostinger first.'));
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const toAddress = process.env.CONTACT_TO || process.env.SMTP_USER;
    const fromAddress = process.env.FROM_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      to: toAddress,
      from: fromAddress,
      replyTo: email,
      subject: `New DMV Sound Lab inquiry: ${service}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`,
      html: `
        <h2>New DMV Sound Lab inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `
    });

    return res.status(200).send(renderPage('Thanks. Your inquiry has been sent.'));
  } catch (error) {
    console.error(error);
    return res.status(500).send(renderPage('We could not send your message right now. Please email info@dmvsoundlab.com directly.'));
  }
});

app.listen(port, () => {
  console.log(`DMV Sound Lab app listening on port ${port}`);
});
