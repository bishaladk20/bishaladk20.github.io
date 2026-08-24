document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Hero log stream (systems drawn from real resume content) ---------- */
const users = ['j.chen', 'm.okafor', 's.patel', 'r.diaz', 'a.novak', 'svc-provisioning', 't.suzuki'];
const resources = [
  'SailPoint IIQ:certification',
  'CyberArk:PSM-session',
  'Workday:JML-sync',
  'ServiceNow:access-request',
  'Active Directory:group-add',
  'Azure AD:conditional-access',
  'Epic:clinical-role'
];

function pad(n) { return n.toString().padStart(2, '0'); }

function randomEntry() {
  const now = new Date();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const user = users[Math.floor(Math.random() * users.length)];
  const resource = resources[Math.floor(Math.random() * resources.length)];
  const roll = Math.random();
  let status, detail;
  if (roll < 0.55) {
    status = 'ALLOW';
    detail = `policy matched — ${resource}`;
  } else if (roll < 0.8) {
    status = 'STEP-UP';
    detail = `MFA challenge required — ${resource}`;
  } else {
    status = 'DENY';
    detail = `SOD conflict flagged — ${resource}`;
  }
  return { time, user, status, detail };
}

const stream = document.getElementById('logStream');
const MAX_LINES = 11;

function addLine() {
  const e = randomEntry();
  const line = document.createElement('div');
  line.className = 'log-line';
  line.innerHTML = `<span class="log-time">${e.time}</span><span class="log-status status-${e.status}">${e.status}</span><span class="log-detail">${e.user} → ${e.detail}</span>`;
  stream.appendChild(line);
  while (stream.children.length > MAX_LINES) {
    stream.removeChild(stream.firstChild);
  }
  stream.scrollTop = stream.scrollHeight;
}

for (let i = 0; i < 8; i++) addLine();
setInterval(addLine, 1400);

/* ---------- Expandable experience details ---------- */
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    const isOpen = target.classList.toggle('open');
    btn.textContent = isOpen ? 'Hide details' : 'Show details';
  });
});

/* ---------- Animated stat counters (run once, on scroll into view) ---------- */
const statEls = document.querySelectorAll('#statGrid dt');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;
  statEls.forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ---------- Scroll reveal for sections ---------- */
const revealTargets = document.querySelectorAll('.section-inner > *');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      if (entry.target.closest('#about')) animateStats();
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));
