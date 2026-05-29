// Simple JSON file-based storage — no native deps needed
const fs   = require('fs');
const path = require('path');

const DATA_DIR  = path.join(__dirname);
const EV_FILE   = path.join(DATA_DIR, 'events.jsonl');
const RES_FILE  = path.join(DATA_DIR, 'results.jsonl');

// Ensure files exist
if (!fs.existsSync(EV_FILE))  fs.writeFileSync(EV_FILE,  '');
if (!fs.existsSync(RES_FILE)) fs.writeFileSync(RES_FILE, '');

// Append one JSON line
function append(file, obj) {
  fs.appendFileSync(file, JSON.stringify({ ...obj, ts: new Date().toISOString() }) + '\n');
}

// Read all lines from a file
function readAll(file) {
  try {
    return fs.readFileSync(file, 'utf8')
      .split('\n')
      .filter(Boolean)
      .map(l => JSON.parse(l));
  } catch { return []; }
}

function insertEvent({ session_id, event_type, device_type, referrer }) {
  append(EV_FILE, { session_id, event_type, device_type: device_type||'unknown', referrer: referrer||null });
}

function insertResult({ session_id, personality, personality_name, scores, time_spent, device_type }) {
  const s = scores || {};
  append(RES_FILE, {
    session_id, personality, personality_name,
    score_s: s.S||0, score_i: s.I||0, score_l: s.L||0, score_t: s.T||0,
    score_a: s.A||0, score_g: s.G||0, score_r: s.R||0, score_e: s.E||0,
    time_spent: time_spent||0, device_type: device_type||'unknown'
  });
}

function getStats() {
  const events  = readAll(EV_FILE);
  const results = readAll(RES_FILE);

  const count = (arr, key, val) => arr.filter(e => e[key] === val).length;

  const totalVisits    = count(events, 'event_type', 'page_view_landing');
  const totalStarts    = count(events, 'event_type', 'quiz_start');
  const totalCompletes = count(events, 'event_type', 'quiz_complete');
  const totalShares    = count(events, 'event_type', 'share_card_generate');
  const easterEggs     = count(events, 'event_type', 'easter_egg_trigger');

  const avgTime = results.length
    ? Math.round(results.reduce((a, r) => a + (r.time_spent||0), 0) / results.length)
    : 0;

  // Device breakdown
  const devMap = {};
  events.filter(e => e.event_type === 'page_view_landing').forEach(e => {
    devMap[e.device_type] = (devMap[e.device_type]||0) + 1;
  });

  // Personality distribution
  const pMap = {};
  results.forEach(r => {
    if (!pMap[r.personality]) pMap[r.personality] = { personality: r.personality, personality_name: r.personality_name, count: 0 };
    pMap[r.personality].count++;
  });
  const topPersonalities = Object.values(pMap)
    .sort((a,b) => b.count - a.count)
    .slice(0, 5)
    .map(p => ({ ...p, pct: totalCompletes > 0 ? Math.round(p.count/totalCompletes*100)+'%' : '0%' }));

  return {
    total_visits: totalVisits,
    total_starts: totalStarts,
    total_completes: totalCompletes,
    completion_rate: totalStarts > 0 ? Math.round(totalCompletes/totalStarts*100)+'%' : '0%',
    share_rate: totalCompletes > 0 ? Math.round(totalShares/totalCompletes*100)+'%' : '0%',
    easter_egg_triggers: easterEggs,
    avg_time_spent: avgTime,
    device_breakdown: devMap,
    top_personalities: topPersonalities
  };
}

function getAllResults() {
  const results = readAll(RES_FILE);
  const total   = results.length;
  const pMap    = {};
  results.forEach(r => {
    if (!pMap[r.personality]) pMap[r.personality] = { personality: r.personality, personality_name: r.personality_name, count: 0 };
    pMap[r.personality].count++;
  });
  return {
    total,
    distribution: Object.values(pMap)
      .sort((a,b) => b.count - a.count)
      .map(p => ({ ...p, pct: total > 0 ? (p.count/total*100).toFixed(1)+'%' : '0%' }))
  };
}

module.exports = { insertEvent, insertResult, getStats, getAllResults };
