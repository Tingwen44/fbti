// FBTI App — Main Logic

// ─── State ───────────────────────────────────────────────
const State = {
  sessionId: null,
  currentQ: 0,
  answers: [],
  scores: { S: 0, I: 0, L: 0, T: 0, A: 0, G: 0, R: 0, E: 0 },
  startTime: null,
  result: null,
  isEasterEgg: false,
  deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
};

// ─── Session ─────────────────────────────────────────────
function genUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function initSession() {
  State.sessionId = sessionStorage.getItem('fbti_sid') || genUUID();
  sessionStorage.setItem('fbti_sid', State.sessionId);
}

// ─── API ─────────────────────────────────────────────────
async function trackEvent(type) {
  try {
    await fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: State.sessionId,
        event_type: type,
        device_type: State.deviceType,
        referrer: document.referrer || null
      })
    });
  } catch (e) { /* silent fail */ }
}

async function submitResult(personality) {
  try {
    await fetch('/api/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: State.sessionId,
        personality: personality.code,
        personality_name: personality.name,
        scores: State.scores,
        time_spent: Math.round((Date.now() - State.startTime) / 1000),
        device_type: State.deviceType
      })
    });
  } catch (e) { /* silent fail */ }
}

// ─── Views ───────────────────────────────────────────────
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    window.scrollTo(0, 0);
  }
}

// ─── Landing ─────────────────────────────────────────────
function initLanding() {
  trackEvent('page_view_landing');

  // Animate floating tags
  const tags = document.querySelectorAll('.float-tag');
  tags.forEach((tag, i) => {
    tag.style.animationDelay = `${i * 0.4}s`;
  });

  document.getElementById('btn-start').addEventListener('click', startQuiz);
}

// ─── Quiz ────────────────────────────────────────────────
function startQuiz() {
  State.currentQ = 0;
  State.answers = [];
  State.scores = { S: 0, I: 0, L: 0, T: 0, A: 0, G: 0, R: 0, E: 0 };
  State.startTime = Date.now();
  State.isEasterEgg = false;

  trackEvent('quiz_start');
  showView('view-quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[State.currentQ];
  const total = QUESTIONS.length;
  const progress = ((State.currentQ) / total) * 100;

  // Progress bar
  document.getElementById('progress-bar').style.width = progress + '%';
  document.getElementById('q-num').textContent = `${State.currentQ + 1} / ${total}`;

  // Special badge for Q25
  const specialBadge = document.getElementById('special-badge');
  if (q.isSpecial) {
    specialBadge.style.display = 'flex';
    specialBadge.textContent = q.emoji + ' 彩蛋题';
  } else {
    specialBadge.style.display = 'none';
  }

  // Question text
  const qEl = document.getElementById('question-text');
  qEl.style.opacity = 0;
  qEl.textContent = q.question;
  setTimeout(() => { qEl.style.opacity = 1; }, 50);

  // Options
  const optContainer = document.getElementById('options-container');
  optContainer.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.style.animationDelay = `${idx * 0.08}s`;
    btn.innerHTML = `<span class="opt-label">${opt.label}</span><span class="opt-text">${opt.text}</span>`;
    btn.addEventListener('click', () => selectAnswer(opt, btn));
    optContainer.appendChild(btn);
  });
}

function selectAnswer(opt, btn) {
  // Prevent double click
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  btn.classList.add('selected');

  // Accumulate scores
  const s = opt.score || {};
  Object.keys(s).forEach(k => { State.scores[k] = (State.scores[k] || 0) + s[k]; });

  // Check easter egg
  if (opt.special === 'easter_egg') {
    State.isEasterEgg = true;
    trackEvent('easter_egg_trigger');
  }

  State.answers.push({ q: State.currentQ + 1, choice: opt.label });

  // Next question after brief delay
  setTimeout(() => {
    State.currentQ++;
    if (State.currentQ >= QUESTIONS.length) {
      finishQuiz();
    } else {
      // Slide transition
      const container = document.getElementById('quiz-card');
      container.classList.add('slide-out');
      setTimeout(() => {
        container.classList.remove('slide-out');
        renderQuestion();
      }, 200);
    }
  }, 320);
}

// ─── Loading ─────────────────────────────────────────────
function finishQuiz() {
  trackEvent('quiz_complete');
  showView('view-loading');
  runLoading();
}

function runLoading() {
  const texts = LOADING_TEXTS;
  const el = document.getElementById('loading-text');
  let i = 0;

  const interval = setInterval(() => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = texts[i % texts.length];
      el.style.opacity = 1;
    }, 200);
    i++;
  }, 600);

  // Calculate result
  let personality;
  if (State.isEasterEgg) {
    personality = EASTER_EGG;
  } else {
    const code = calcPersonality(State.scores);
    personality = PERSONALITIES[code];
  }

  State.result = personality;

  setTimeout(() => {
    clearInterval(interval);
    submitResult(personality);
    trackEvent('result_view');
    showView('view-result');
    renderResult(personality);
  }, 2800);
}

// ─── Result ──────────────────────────────────────────────
function renderResult(p) {
  // Header
  document.getElementById('res-code').textContent   = p.code;
  document.getElementById('res-name').textContent   = p.name;
  document.getElementById('res-en').textContent     = p.englishName;
  document.getElementById('res-quote').textContent  = `"${p.quote}"`;
  document.getElementById('res-desc').textContent   = p.description;

  // Image
  const imgEl = document.getElementById('res-img');
  if (p.image) {
    imgEl.src = `/assets/images/${p.image}`;
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }

  // Card color theme
  const card = document.getElementById('res-header');
  card.style.background = `linear-gradient(155deg, ${p.color} 0%, ${adjustColor(p.color, 20)} 100%)`;
  document.getElementById('res-code').style.color   = p.accentColor;
  document.getElementById('res-accent').style.color = p.accentColor;

  // Easter egg badge
  const badge = document.getElementById('easter-badge');
  if (p.isEasterEgg) {
    badge.style.display = 'flex';
    badge.textContent = p.easterEggMsg;
  } else {
    badge.style.display = 'none';
  }

  // Strengths
  const strEl = document.getElementById('res-strengths');
  strEl.innerHTML = (p.strengths || []).map(s => `<li>${s}</li>`).join('');

  // Weaknesses
  const wkEl = document.getElementById('res-weaknesses');
  wkEl.innerHTML = (p.weaknesses || []).map(w => `<li>${w}</li>`).join('');

  // Said
  const saidEl = document.getElementById('res-said');
  saidEl.innerHTML = (p.said || []).map(s => `<p class="said-line">${s}</p>`).join('');

  // Strategy & archetype
  document.getElementById('res-strategy').textContent = p.strategy || '';
  document.getElementById('res-archetype').textContent = p.archetype || '';

  // Dimensions chart
  renderDimensions(p);

  // Animate entrance
  document.querySelectorAll('.res-section').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });
}

function renderDimensions(p) {
  const dims = p.dimensions || {};
  const container = document.getElementById('dim-chart');
  container.innerHTML = '';

  const LABELS = {
    S: '系统', I: '直觉',
    L: '长线', T: '短线',
    A: '激进', G: '保守',
    R: '理性', E: '感性'
  };
  const PAIRS = [['S','I'],['L','T'],['A','G'],['R','E']];

  PAIRS.forEach(([a, b]) => {
    const valA = dims[a] || (100 - (dims[b] || 50));
    const valB = dims[b] || (100 - valA);
    const pct = Math.round(valA / (valA + valB) * 100);

    const row = document.createElement('div');
    row.className = 'dim-row';
    row.innerHTML = `
      <span class="dim-lbl lbl-left">${LABELS[a]}</span>
      <div class="dim-track">
        <div class="dim-fill" style="width:${pct}%;background:${State.result.accentColor}"></div>
      </div>
      <span class="dim-lbl lbl-right">${LABELS[b]}</span>
    `;
    container.appendChild(row);
  });
}

function adjustColor(hex, amount) {
  try {
    const num = parseInt(hex.replace('#',''), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0xff) + amount);
    const b = Math.min(255, (num & 0xff) + amount);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  } catch { return hex; }
}

// ─── Share Card ───────────────────────────────────────────
document.getElementById('btn-share')?.addEventListener('click', async () => {
  trackEvent('share_card_generate');
  const p = State.result;
  if (!p) return;

  // Build share card HTML
  const shareCard = document.getElementById('share-card');
  document.getElementById('sc-code').textContent  = p.code;
  document.getElementById('sc-name').textContent  = p.name;
  document.getElementById('sc-quote').textContent = `"${p.quote}"`;
  document.getElementById('sc-code').style.color  = p.accentColor;
  shareCard.style.background = `linear-gradient(155deg, ${p.color}, ${adjustColor(p.color, 30)})`;

  const scImg = document.getElementById('sc-img');
  if (p.image) { scImg.src = `/assets/images/${p.image}`; scImg.style.display='block'; }
  else { scImg.style.display = 'none'; }

  shareCard.style.display = 'flex';

  // Use html2canvas if available, else fallback
  if (typeof html2canvas !== 'undefined') {
    try {
      const canvas = await html2canvas(shareCard, { scale: 2, useCORS: true, backgroundColor: null });
      shareCard.style.display = 'none';
      const link = document.createElement('a');
      link.download = `FBTI-${p.code}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      shareCard.style.display = 'none';
      alert('生成失败，请截图保存 🙏');
    }
  } else {
    shareCard.style.display = 'none';
    showShareModal(p);
  }
});

function showShareModal(p) {
  const modal = document.getElementById('share-modal');
  document.getElementById('sm-code').textContent  = p.code;
  document.getElementById('sm-name').textContent  = p.name;
  document.getElementById('sm-quote').textContent = `"${p.quote}"`;
  document.getElementById('sm-code').style.color  = p.accentColor;
  modal.style.display = 'flex';
  modal.querySelector('.modal-bg').addEventListener('click', () => { modal.style.display = 'none'; });
}

// ─── Retest ──────────────────────────────────────────────
document.getElementById('btn-retest')?.addEventListener('click', () => {
  trackEvent('retest');
  showView('view-landing');
  // Reset session for new test
  State.sessionId = genUUID();
  sessionStorage.setItem('fbti_sid', State.sessionId);
});

// ─── Init ─────────────────────────────────────────────────
initSession();
initLanding();
