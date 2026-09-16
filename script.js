const SAVE_KEY = 'campus-chaos-save-v1';

const STAT_META = {
  aura: ['Aura', '🔥'], network: ['Réseau', '🤝'], alcoholism: ['Alcoolisme', '🍺'],
  legend: ['Légende', '👑'], intelligence: ['Intelligence', '🧠']
};

const events = {
  'arrival-people': { arc: 'ARRIVÉE · ÉTAPE 01', icon: '🎒', mood: 'social', title: 'Tu arrives dans ta nouvelle école.', description: 'Le bâtiment est immense, les gens ont déjà des surnoms et quelqu’un t’a ajouté à un groupe WhatsApp nommé « promo finale 3 ». Tu connais déjà du monde ?', choices: [
    choice('Je connais déjà des gens', 'La légende familiale avait donc un épisode précédent.', { network: 9, aura: 3 }, 'arrival-time', { promo: 8, knowsPeople: true }),
    choice('Je ne connais absolument personne', 'Terrain vierge. Potentiel maximal. Panique raisonnable.', { aura: 5, intelligence: 2 }, 'arrival-time', { knowsPeople: false, tag: 'solo-start' })
  ] },
  'arrival-time': { arc: 'ARRIVÉE · ÉTAPE 02', icon: '🗓️', mood: 'calm', title: 'Quand arrives-tu ?', description: 'La rentrée est lundi. Tu as encore le choix entre t’installer comme une personne organisée ou apparaître dans le hall avec une valise et une barre de céréales.', choices: [
    choice('Plusieurs jours avant', '', { network: 7, aura: 2, energy: -3 }, 'wei-bungalow', { promo: 4, tag: 'early-bird' }),
    choice('La veille des cours', '', { network: 3 }, 'wei-bungalow', { promo: 2 }),
    choice('Le matin même', '', { aura: -2, energy: 5 }, 'wei-bungalow', { lastMinute: true, tag: 'last-minute' })
  ] },
  'wei-bungalow': { arc: 'WEI · JOUR 01', icon: '🏕️', mood: 'social', title: 'Le bungalow est déjà une négociation diplomatique.', description: 'Il reste quatre lits, trois matelas suspects et un étudiant de 2A qui dit « faites comme chez vous ». Avec qui tu t’installes ?', choices: [
    choice('Mes nouveaux potes', '', { network: 6, aura: 2 }, 'wei-activity', { promo: 5 }),
    choice('Des gens de ma promo', '', { network: 9 }, 'wei-activity', { promo: 9 }),
    choice('Des inconnus', '', { aura: 5, legend: 2 }, 'wei-activity', { promo: 4, tag: 'bold-choice' }),
    choice('Je prends ce qu’on me donne', '', { energy: 3 }, 'wei-activity')
  ] },
  'wei-activity': { arc: 'WEI · JOUR 02', icon: '🏃', mood: 'chaos', title: 'La course en sac est officiellement devenue un enjeu de réputation.', description: 'Ton groupe part vers le terrain. Un drapeau est impliqué. Personne ne connaît les règles, ce qui n’empêche pas la compétition.', choices: [
    choice('Participer à fond', '', { aura: 7, network: 4, legend: 3, energy: -6 }, 'wei-before', { promo: 3 }),
    choice('Participer normalement', '', { aura: 3, network: 3, energy: -2 }, 'wei-before'),
    choice('Rester au bungalow', '', { energy: 7, aura: -2 }, 'wei-before')
  ] },
  'wei-before': { arc: 'WEI · AVANT-SOIRÉE', icon: '🥤', mood: 'chaos', title: 'Le before commence avant que le soleil ait pris sa décision.', description: 'On te tend un gobelet sans te demander ton prénom. Au loin, quelqu’un négocie une enceinte contre deux tickets restaurant.', choices: [
    choice('Rester sobre', '', { energy: 5, intelligence: 1, aura: 1 }, 'wei-night'),
    choice('Boire quelques verres', '', { alcoholism: 6, network: 5, aura: 3, energy: -5 }, 'wei-night', { promo: 3 }),
    choice('Faire la soirée à fond', '', { alcoholism: 13, network: 7, legend: 6, aura: 5, energy: -12 }, 'wei-night', { promo: 4, tag: 'wei-main-character' })
  ] },
  'wei-night': { arc: 'WEI · SOIRÉE', icon: '🎤', mood: 'social', title: 'Quelqu’un lance un karaoké sans micro.', description: 'La chanson est fausse, l’énergie est vraie. Une 2A te regarde comme si tu devais maintenant prendre une décision historique.', choices: [
    choice('Monter chanter', '', { aura: 8, legend: 8, energy: -7 }, 'wei-after', { promo: 5, highlight: 'Karaoké héroïque au WEI' }),
    choice('Danser au premier rang', '', { aura: 5, network: 6, alcoholism: 3, energy: -6 }, 'wei-after', { promo: 4 }),
    choice('Observer depuis le canapé', '', { intelligence: 1, energy: 2 }, 'wei-after')
  ] },
  'wei-after': { arc: 'WEI · 04:30', icon: '🌅', mood: 'chaos', title: 'Des 2A proposent de continuer.', description: 'Tu as déjà perdu la notion du temps, mais pas le sens des opportunités. Le soleil se lève dans quatre heures.', choices: [
    choice('Rentrer dormir', '', { energy: 12, intelligence: 1 }, 'arrival-finish'),
    choice('Continuer avec ma promo', '', { network: 7, legend: 4, alcoholism: 4, energy: -9 }, 'arrival-finish', { promo: 7, highlight: 'After avec la promo à 4h30' }),
    choice('Suivre les 2A', '', { network: 4, legend: 9, aura: 3, alcoholism: 5, energy: -14 }, 'arrival-finish', { upperYears: 12, highlight: 'Adopté par les 2A après le WEI', tag: 'upper-year-ally' })
  ] },
  'arrival-finish': { arc: 'PREMIÈRE IMPRESSION', icon: '✨', mood: 'calm', title: 'Ton nom commence à circuler.', description: 'Le WEI est terminé. Tu n’as pas encore compris où sont les amphis, mais plusieurs personnes savent déjà qui tu es. La semaine des défis arrive.', choices: [choice('Passer à la semaine des défis', 'Le bouton « continuer » est devenu une philosophie de vie.', {}, 'challenge-barathon')] },
  'challenge-barathon': { arc: 'DÉFIS · 01 / 03', icon: '🍻', mood: 'social', title: 'Un barathon est organisé avec toute la promo.', description: 'Le défi est culturel, sportif et vaguement logistique. Ton téléphone affiche déjà 14 notifications.', choices: [
    choice('Participer', '', { network: 6, legend: 4, alcoholism: 7, money: -8, energy: -7 }, 'challenge-ricard', { promo: 5, challenge1: true, tag: 'barathon' }),
    choice('Ne pas participer', '', { energy: 5, intelligence: 1 }, 'challenge-ricard', { challenge1: false })
  ] },
  'challenge-ricard': { arc: 'DÉFIS · 02 / 03', icon: '🥃', mood: 'chaos', title: 'Un 2A te propose un Ricard avant les cours.', description: '« T’es chaud pour le défi ? » Tu ne sais pas encore ce que c’est. Tu réponds oui mentalement, ce qui est déjà une forme d’engagement.', choices: [
    choice('Accepter', '', { legend: 5, alcoholism: 5, energy: -8, intelligence: -2 }, 'challenge-help', { upperYears: 8, challenge2: true, tag: 'legendary-breakfast' }),
    choice('Refuser avec dignité', '', { intelligence: 2, aura: 2 }, 'challenge-help', { challenge2: false })
  ] },
  'challenge-help': { arc: 'DÉFIS · 03 / 03', icon: '🧠', mood: 'academic', title: 'Une personne cherche de l’aide pour sa présentation.', description: 'Tu as 20 minutes, une salle sans prises et une équipe qui confond Canva et Excel. Le défi est-il social ou académique ? Oui.', choices: [
    choice('Sauver la présentation', '', { intelligence: 4, network: 5, aura: 3, energy: -6 }, 'year-end', { promo: 4, challenge3: true, highlight: 'Sauvetage d’une présentation impossible' }),
    choice('Aller en cours', '', { intelligence: 2, energy: 1 }, 'year-end', { challenge3: false })
  ] },
  'year-end': { arc: 'FIN DU PROLOGUE', icon: '🏆', mood: 'calm', title: 'Le campus a commencé à te reconnaître.', description: 'L’année est prête à s’ouvrir : sport, campagnes associatives, soirées et décisions beaucoup trop importantes prises sur un parking.', choices: [choice('Voir mon bilan de départ', '', {}, null)] }
};

function choice(label, detail, effects, next, extras = {}) { return { label, detail, effects, next, extras }; }
function newGame(name, school) { return { name, school: school || 'École supérieure', stats: { aura: 40, network: 28, alcoholism: 12, legend: 7, intelligence: 55, energy: 76, money: 55 }, network: { promo: 20, upperYears: 8 }, flags: {}, tags: [], highlights: [], decisions: [], event: 'arrival-people' }; }
function clamp(value) { return Math.max(0, Math.min(100, value)); }
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
function getAlcoholLabel(value) { return value <= 20 ? 'raisonnable' : value <= 40 ? 'bon vivant' : value <= 60 ? 'habitué' : value <= 80 ? 'gros fêtard' : 'légende des soirées'; }
function getStatMeta(key) { return STAT_META[key] || ({ energy: ['Énergie', '⚡'], money: ['Budget', '💶'] }[key] || [key, '⚡']); }
function apply(choiceData) {
  const before = { ...state.stats };
  Object.entries(choiceData.effects).forEach(([key, amount]) => { if (key in state.stats) state.stats[key] = clamp(state.stats[key] + amount); });
  Object.entries(choiceData.extras).forEach(([key, value]) => { if (key === 'tag') state.tags.push(value); else if (key === 'highlight') state.highlights.push(value); else if (key === 'promo' || key === 'upperYears') state.network[key] = clamp(state.network[key] + value); else state.flags[key] = value; });
  state.decisions.push(choiceData.label); state.lastChanges = {};
  Object.keys(state.stats).forEach((key) => { if (state.stats[key] !== before[key]) state.lastChanges[key] = { before: before[key], after: state.stats[key], delta: state.stats[key] - before[key] }; });
  state.event = choiceData.next; save(); render();
}

let state = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
if (state?.lastChanges) {
  Object.entries(state.lastChanges).forEach(([key, change]) => {
    if (typeof change === 'number') state.lastChanges[key] = { before: state.stats[key] - change, after: state.stats[key], delta: change };
  });
}
function render() { document.getElementById('app').innerHTML = state ? gameScreen() : startScreen(); bind(); }
function startScreen() { return `<main class="start-screen"><div class="start-grid"><div class="start-copy"><div class="brand-lockup"><span class="brand-mark">CC</span><span>Campus Chaos</span></div><p class="eyebrow">SIMULATION SOCIALE · 1A</p><h1>Ta scolarité.<br><em>Ton chaos.</em></h1><p>Fais des choix discutables, rencontre les bonnes personnes et deviens la légende que personne n’avait demandée.</p><div class="start-stamps"><span>⚡ parties courtes</span><span>🤝 histoires uniques</span><span>📱 mobile friendly</span></div></div><form class="setup-card" id="start-form"><p class="eyebrow">NOUVELLE PARTIE</p><h2>Qui es-tu sur le campus ?</h2><label>Ton prénom<input name="name" autofocus placeholder="Paul, Clara, Sam..." required></label><label>Ton école <span>(optionnel)</span><input name="school" placeholder="École supérieure"></label><button class="primary-button">Entrer dans la légende →</button><small>La partie se sauvegarde automatiquement dans ce navigateur.</small></form></div></main>`; }
function statRows() { return Object.entries(STAT_META).map(([key, meta]) => { const change = state.lastChanges?.[key]; return `<div class="stat-row"><div class="stat-main"><span class="stat-icon">${meta[1]}</span><span class="stat-label">${meta[0]}</span><strong>${state.stats[key]}<small>/100</small></strong>${change ? `<span class="delta ${change.delta > 0 ? 'positive' : 'negative'}">${change.delta > 0 ? '+' : ''}${change.delta}</span>` : ''}</div><div class="stat-track"><i style="width:${state.stats[key]}%"></i></div></div>`; }).join(''); }
function gameScreen() { const event = events[state.event]; if (!event) return endScreen(); return `<main class="app-shell"><header class="topbar"><div class="brand-lockup"><span class="brand-mark">CC</span><span>Campus Chaos</span></div><div class="topbar-actions"><span class="save-status">▣ sauvegarde auto</span><button class="icon-button" id="reset">↻</button></div></header><div class="game-layout"><aside class="profile-panel"><div class="profile-heading"><div class="avatar">${state.name[0].toUpperCase()}</div><div><p class="eyebrow">ÉTUDIANT·E · 1A</p><h1>${state.name}</h1><p class="school-name">${state.school}</p></div></div><div class="month-row"><span>ANNÉE 1A</span><strong>SEPTEMBRE</strong></div><div class="stats-list">${statRows()}</div><div class="energy-strip"><span>⚡ énergie</span><strong>${state.stats.energy}</strong><div class="energy-bar"><i style="width:${state.stats.energy}%"></i></div></div><div class="profile-footnote">✦ <span>Alcoolisme : <strong>${getAlcoholLabel(state.stats.alcoholism)}</strong></span></div></aside><section class="play-area"><div class="progress-line"><span>1A · ${event.arc}</span><span>${state.decisions.length + 1} décisions</span></div>${state.lastChanges && Object.keys(state.lastChanges).length ? recap() : ''}<article class="event-card mood-${event.mood}"><div class="event-art"><span>${event.icon}</span><div class="art-noise"></div></div><div class="event-copy"><p class="eyebrow">${event.arc}</p><h2>${event.title}</h2><p class="event-description">${event.description}</p></div><div class="choices">${event.choices.map((item, index) => `<button class="choice-button" data-choice="${index}"><span class="choice-index">${String.fromCharCode(65 + index)}</span><span class="choice-content"><strong>${item.label}</strong>${item.detail ? `<small>${item.detail}</small>` : ''}</span><span>→</span></button>`).join('')}</div></article><div class="bottom-note">♧ <span>Chaque décision ouvre une version différente de ta vie sur le campus.</span></div></section></div></main>`; }
function recap() { return `<div class="recap-banner"><div><p class="eyebrow">RÉCAP DE TON CHOIX</p><strong>Voici ce que cette décision change.</strong><div class="recap-deltas">${Object.entries(state.lastChanges).map(([key, change]) => { const meta = getStatMeta(key); return `<span class="${change.delta > 0 ? 'positive' : 'negative'}"><b>${meta[1]} ${meta[0]}</b> ${change.before} → ${change.after} (${change.delta > 0 ? '+' : ''}${change.delta})</span>`; }).join('')}</div></div><button id="clear-recap">Étape suivante →</button></div>`; }
function endScreen() { const highlights = state.highlights.length ? state.highlights : ['Arrivée dans une nouvelle école', 'Premières décisions prises avec aplomb']; const challenges = ['challenge1', 'challenge2', 'challenge3'].filter((key) => state.flags[key] === true).length; return `<main class="end-screen"><div class="end-card"><p class="eyebrow">BILAN DE TON PROLOGUE</p><h1>${state.name} <span>· FIN DU DÉPART</span></h1><div class="end-grid"><div class="final-stats">${Object.entries(STAT_META).map(([key, meta]) => `<div><span>${meta[1]} ${meta[0]}</span><strong>${state.stats[key]}</strong></div>`).join('')}</div><div class="highlights"><p class="eyebrow">MOMENTS MARQUANTS</p>${highlights.map((item) => `<p>✦ ${item}</p>`).join('')}<p class="eyebrow challenge-label">DÉFIS RÉALISÉS</p><strong class="big-number">${challenges}/3</strong></div></div><div class="end-actions"><button class="primary-button" id="reset">Rejouer une autre vie ↻</button><span>🏆 La 2A arrive bientôt.</span></div></div></main>`; }
function bind() { document.getElementById('start-form')?.addEventListener('submit', (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); state = newGame(data.get('name'), data.get('school')); save(); render(); }); document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => apply(events[state.event].choices[button.dataset.choice]))); document.getElementById('clear-recap')?.addEventListener('click', () => { state.lastChanges = {}; save(); render(); }); document.querySelectorAll('#reset').forEach((button) => button.addEventListener('click', () => { localStorage.removeItem(SAVE_KEY); state = null; render(); })); }
render();