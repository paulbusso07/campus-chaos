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
    choice('Ne pas participer au jeu à boire', '', { energy: 5, intelligence: 1, aura: -4 }, 'wei-night'),
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

const fixedVariants = {
  'arrival-people': [
    { title: 'Le portail s’ouvre sur une promo déjà organisée.', description: 'Tu vois des groupes se former autour de tote bags et de cafés hors de prix. Tu as déjà des alliés ?', labels: ['J’ai quelques contacts', 'Je débarque totalement seul'] },
    { title: 'Ton premier cours commence dans douze minutes.', description: 'Tu ne sais pas encore où est la salle, mais tu as repéré trois personnes qui ont l’air aussi perdues que toi.', labels: ['Je vais vers les gens', 'Je fais semblant de connaître le campus'] },
    { title: 'Le groupe de promo compte déjà 187 messages.', description: 'Quelqu’un propose un apéro, quelqu’un demande le lien de l’emploi du temps et quelqu’un a répondu avec un GIF de Cyril Hanouna.', labels: ['Je me présente directement', 'Je reste en mode fantôme'] }
  ],
  'arrival-time': [
    { title: 'Tu poses tes valises quand ?', description: 'L’école t’a envoyé trois mails de bienvenue et une carte dont le nord semble purement théorique.', labels: ['J’arrive très tôt', 'J’arrive juste à temps', 'J’arrive quand tout le monde est déjà installé'] },
    { title: 'Combien de temps te faut-il pour prétendre être intégré ?', description: 'La vraie rentrée est lundi, mais les premiers groupes se créent dès maintenant.', labels: ['Je m’installe en avance', 'J’arrive la veille', 'Je tente le speedrun de rentrée'] },
    { title: 'Ton logement est prêt. Enfin, normalement.', description: 'Il ne manque qu’une lampe, deux draps et une idée claire de ce que tu fais ici.', labels: ['Je prends de l’avance', 'Je viens le week-end', 'Je débarque le matin même'] }
  ],
  'wei-bungalow': [
    { title: 'Le bungalow devient le premier vote de ta carrière sociale.', description: 'Il reste un lit près de la prise, un lit près de la fenêtre et un lit dont personne ne veut expliquer l’histoire.', labels: ['Je rejoins les gens que je connais', 'Je me mélange à la promo', 'Je tente le bungalow inconnu', 'Je laisse le destin choisir'] },
    { title: 'Répartition des chambres : premier grand test démocratique.', description: 'Une personne tient une liste. Une autre tient un marqueur. Les deux pensent être présidentes du BDE.', labels: ['Je choisis mon équipe', 'Je vais vers les gens sérieux', 'Je m’incruste chez des inconnus', 'Je prends la dernière place'] },
    { title: 'Le WEI commence par une guerre des matelas.', description: 'Tu peux dormir avec tes futurs meilleurs amis, avec des gens que tu n’as jamais vus ou dans une zone officiellement non cartographiée.', labels: ['Je sécurise mes potes', 'Je vise le réseau de promo', 'Je prends le risque social', 'Je ne négocie pas'] }
  ],
  'wei-activity': [
    { title: 'Le staff annonce une activité dont les règles sont secrètes.', description: 'Il y a des sacs, un sifflet et un prix qui ressemble à un panier de snacks.', labels: ['Je joue comme si ma vie en dépendait', 'Je participe sans me blesser', 'Je prétends avoir une réunion'] },
    { title: 'Ton équipe te réclame sur le terrain.', description: 'Tu n’as jamais pratiqué ce sport, mais personne ne l’a demandé avant de te donner un dossard.', labels: ['Je deviens capitaine', 'Je fais acte de présence', 'Je disparais stratégiquement'] },
    { title: 'Un défi collectif démarre dans cinq minutes.', description: 'Les 2A promettent que ce sera « incroyable ». Les 3A regardent déjà depuis une chaise.', labels: ['Je fonce', 'Je fais le minimum syndical', 'Je garde mon énergie'] }
  ],
  'wei-before': [
    { title: 'Le gobelet officiel du WEI circule déjà.', description: 'Un jeu à boire est lancé. Les règles changent à chaque tour, ce qui semble arranger tout le monde.', labels: ['Je refuse le jeu à boire', 'Je prends quelques verres', 'Je deviens le programme de la soirée'] },
    { title: 'Le before commence avec une playlist très contestable.', description: 'Quelqu’un distribue des verres, quelqu’un distribue des conseils et personne ne distribue d’eau.', labels: ['Je garde les idées claires', 'Je trinque raisonnablement', 'Je me donne complètement'] },
    { title: 'Un 2A te tend un verre en disant : « fais-moi confiance ».', description: 'C’est exactement la phrase qui précède les meilleures histoires et les pires lendemains.', labels: ['Je passe mon tour', 'Je suis le mouvement', 'Je mets la soirée en mode légende'] }
  ],
  'wei-night': [
    { title: 'Le DJ officieux cherche quelqu’un pour sauver la soirée.', description: 'La sono grésille, le micro ne marche pas et une personne chante déjà sans invitation.', labels: ['Je prends le micro', 'Je lance la danse', 'Je deviens commentateur officiel'] },
    { title: 'Une battle de danse vient de naître sans autorisation.', description: 'Tu ne connais ni les participants ni la musique, mais tu connais déjà le risque réputationnel.', labels: ['Je participe', 'Je motive les autres', 'Je reste en observateur'] },
    { title: 'Le karaoké tourne au procès collectif.', description: 'Quelqu’un accuse quelqu’un d’autre d’avoir massacré une chanson. Tu peux intervenir ou documenter le drame.', labels: ['Je chante pour défendre l’honneur', 'Je mets l’ambiance', 'Je garde les preuves'] }
  ],
  'wei-after': [
    { title: 'Il est 4h30 et le concept de sommeil est attaqué.', description: 'Les 2A proposent un dernier détour. Ton énergie vient de déposer une plainte.', labels: ['Je choisis mon lit', 'Je reste avec ma promo', 'Je suis les anciens'] },
    { title: 'Le soleil se lève sur une décision discutable.', description: 'Tu peux rentrer maintenant, prolonger la soirée ou découvrir un lieu dont personne ne prononce le nom.', labels: ['Je sauve demain', 'Je prolonge avec les miens', 'Je gagne le réseau des 2A'] },
    { title: 'Dernier appel avant la disparition collective.', description: 'Un groupe part chercher de la nourriture. Un autre veut refaire le monde. Un troisième a perdu ses chaussures.', labels: ['Je rentre vivant', 'Je pars manger avec la promo', 'Je suis le groupe le plus mystérieux'] }
  ],
  'challenge-barathon': [
    { title: 'La promo lance une tournée des bars.', description: 'Le trajet n’est pas cartographié, mais il comprend déjà trop d’étapes et un classement.', labels: ['Je fais la tournée', 'Je décline poliment'] },
    { title: 'Défi du soir : trouver le meilleur comptoir du quartier.', description: 'Le jury est composé de ta promo et d’une personne qui prétend avoir un diplôme en ambiance.', labels: ['Je participe au jury', 'Je reste raisonnable'] },
    { title: 'Un barathon apparaît dans ton agenda sans ton consentement.', description: 'Le groupe affirme que c’est obligatoire. Le groupe affirme aussi beaucoup de choses.', labels: ['Je tente l’aventure', 'Je protège mon foie'] }
  ],
  'challenge-ricard': [
    { title: 'Un 2A te propose un défi liquide avant le cours.', description: 'Le cours est à 8h. Le défi serait à 7h42. Les mathématiques ne sont clairement pas le sujet.', labels: ['J’accepte le défi', 'Je refuse proprement'] },
    { title: 'Petit-déjeuner alternatif : le verre de l’amitié.', description: 'Personne ne sait qui a inventé cette tradition, mais tout le monde connaît déjà son prénom.', labels: ['Je tente le rite de passage', 'Je garde mon petit-déjeuner classique'] },
    { title: 'Ton parrain potentiel écrit : « t’es chaud ? »', description: 'Tu ne sais pas encore ce que c’est. Le message contient trois points d’exclamation.', labels: ['Je réponds oui', 'Je réponds que j’ai une âme'] }
  ],
  'challenge-help': [
    { title: 'Une équipe te recrute pour une mission PowerPoint.', description: 'Il reste une slide, aucune image et un titre écrit en Comic Sans.', labels: ['Je sauve le projet', 'Je vais en cours'] },
    { title: 'Un exposé collectif menace de devenir un crime visuel.', description: 'Tu as 20 minutes pour choisir entre aider, conseiller ou observer la catastrophe depuis le fond.', labels: ['Je prends les commandes', 'Je laisse les autres apprendre'] },
    { title: 'Le groupe de travail vient de perdre son fichier final.', description: 'Il reste un brouillon nommé « vraiment_final_2 ». La situation réclame un héros ou une personne ponctuelle.', labels: ['Je récupère la présentation', 'Je respecte mon emploi du temps'] }
  ]
};

function getEvent(eventId) {
  if (scenarioById[eventId]) return scenarioById[eventId];
  const baseEvent = events[eventId];
  if (!baseEvent) return null;
  const variants = fixedVariants[eventId];
  if (!variants) return baseEvent;
  if (state.selectedVariants[eventId] === undefined) state.selectedVariants[eventId] = Math.floor(Math.random() * variants.length);
  const variant = variants[state.selectedVariants[eventId]];
  return { ...baseEvent, title: variant.title, description: variant.description, choices: baseEvent.choices.map((item, index) => ({ ...item, label: variant.labels[index] || item.label })) };
}

function choice(label, detail, effects, next, extras = {}) { return { label, detail, effects, next, extras }; }
const scenarioBank = [];
const scenarioPlaces = ['la cafétéria', 'le foyer', 'un amphi vide', 'le parking', 'la file du RU', 'le groupe WhatsApp', 'le local associatif', 'la laverie du campus', 'le couloir des salles de cours', 'la soirée de promo', 'le terrain de sport', 'le bureau de la scolarité'];
const scenarioObjects = ['un gobelet beaucoup trop grand', 'un badge qui ne t’appartient pas', 'un PowerPoint nommé FINAL_v7', 'une enceinte sans chargeur', 'un panier de frites', 'un message vocal de 4 minutes', 'un formulaire administratif', 'un ballon qui rebondit mal', 'une photo compromettante', 'une liste BDE mystérieuse'];
const scenarioVerbs = ['réparer', 'cacher', 'partager', 'expliquer', 'récupérer', 'dénoncer', 'improviser avec', 'négocier autour de', 'courir après', 'faire semblant de comprendre'];
const scenarioTwists = ['avant le premier cours', 'pendant que tout le monde te regarde', 'avec une deadline dans 8 minutes', 'alors que tu n’as plus de batterie', 'devant une personne de 3A', 'après un vote très contestable', 'avec un public qui filme', 'juste avant le déjeuner'];
const scenarioReactions = ['Tu prends une décision parfaitement raisonnable dans un contexte qui ne l’est pas.', 'Tu pensais vivre une journée normale. Le campus avait visiblement d’autres projets.', 'Personne ne sait comment tu en es arrivé là, mais tout le monde a une opinion.', 'Tu gagnes une anecdote et perds quelques minutes de ta vie que tu ne reverras jamais.', 'La situation était évitable. C’est précisément ce qui la rend intéressante.'];
for (let index = 0; index < 240; index += 1) {
  const place = scenarioPlaces[index % scenarioPlaces.length];
  const object = scenarioObjects[(index * 3) % scenarioObjects.length];
  const verb = scenarioVerbs[(index * 5) % scenarioVerbs.length];
  const mood = index % 4 === 0 ? 'academic' : index % 3 === 0 ? 'chaos' : 'social';
  const id = `random-${index + 1}`;
  scenarioBank.push({ id, arc: 'IMPRÉVU · CAMPUS', icon: ['🎲', '🌀', '📣', '🧃'][index % 4], mood, title: `Quelqu’un te demande de ${verb} ${object} ${scenarioTwists[index % scenarioTwists.length]}.`, description: `La scène se déroule à ${place}. Tu avais prévu de faire autre chose, mais personne ne t’a demandé ton avis.`, choices: [
    choice('J’aide, évidemment', 'Tu dis oui avant d’avoir compris la question.', { aura: 2 + index % 4, network: 1 + index % 5, energy: -(index % 4) }, null, { randomMoment: true }),
    choice('Je transforme ça en opportunité', 'Une phrase très ambitieuse pour une situation très bancale.', { legend: 1 + index % 5, network: 2 + index % 4, alcoholism: index % 5 === 0 ? 2 : 0, energy: -(1 + index % 5) }, null, { randomMoment: true, tag: 'improviser' }),
    choice('Je passe mon chemin', 'La sagesse est parfois une porte de sortie. Parfois seulement.', { aura: -(1 + index % 4), intelligence: index % 3 === 0 ? 2 : -1, energy: 3, network: -((index % 3) + 1) }, null, { randomMoment: true })
  ], reaction: scenarioReactions[index % scenarioReactions.length] });
}
const scenarioById = Object.fromEntries(scenarioBank.map((scenario) => [scenario.id, scenario]));
function randomScenarioId() {
  const unused = scenarioBank.filter((scenario) => !state.usedScenarios.includes(scenario.id));
  const pool = unused.length ? unused : scenarioBank;
  return pool[Math.floor(Math.random() * pool.length)].id;
}
function randomizeEffects(effects) {
  return Object.fromEntries(Object.entries(effects).map(([key, amount]) => {
    if (!amount) return [key, amount];
    const scale = 0.65 + Math.random() * 0.75;
    const surprise = Math.random() < 0.16 ? -1 : 1;
    const varied = Math.round(amount * scale * surprise);
    return [key, varied === 0 ? (amount > 0 ? 1 : -1) : varied];
  }));
}
function averageScore() { return Math.round(Object.keys(STAT_META).reduce((total, key) => total + state.stats[key], 0) / Object.keys(STAT_META).length); }
function averageLabel(score) { return score >= 85 ? 'légende absolue' : score >= 70 ? 'profil très solide' : score >= 55 ? 'étudiant caméléon' : score >= 40 ? 'survivant crédible' : 'personnage secondaire attachant'; }
function reactionFor(choiceData) {
  const reactions = {
    'Je connais déjà des gens': 'Tu arrives avec un carnet d’adresses déjà pré-rempli. Même le vigile connaît moins de monde que toi.',
    'Je ne connais absolument personne': 'Personne ne connaît ton prénom. Excellente nouvelle : tu peux encore prétendre que tu sais ce que tu fais.',
    'Le matin même': 'Tu débarques avec une valise, trois minutes de marge et la confiance d’une personne qui n’a clairement pas regardé le plan du campus.',
    'Ne pas participer au jeu à boire': 'Pas fun ! Tout le monde est déchiré sauf toi. Tu passes un mauvais moment à regarder des gens applaudir un gobelet.',
    'Boire quelques verres': 'Tu as bu juste ce qu’il fallait pour devenir intéressant, mais pas assez pour oublier où tu as posé ton téléphone.',
    'Faire la soirée à fond': 'Tu ne participes plus à la soirée : tu es devenu un élément du décor. Quelqu’un vient de te prendre en photo avec une plante.',
    'Rester au bungalow': 'Pendant que les autres courent en sac, tu développes une relation très sérieuse avec un matelas taché.',
    'Monter chanter': 'Tu chantes faux, mais avec une telle conviction que la promo décide de te laisser le micro imaginaire.',
    'Observer depuis le canapé': 'Tu n’as pas chanté. Tu as tout vu. Dans six mois, tu seras la seule personne à connaître la vraie version de l’histoire.',
    'Suivre les 2A': 'Tu suis les 2A. Félicitations : tu viens de gagner un réseau et de perdre le concept de demain matin.',
    'Ne pas participer': 'Tu refuses le barathon. Ton foie applaudit, mais le groupe WhatsApp vient de te retirer son invitation morale.',
    'Accepter': 'Tu acceptes le Ricard avant les cours. Le petit-déjeuner vient officiellement de changer de catégorie.',
    'Refuser avec dignité': 'Tu refuses avec dignité. Une 2A te respecte, deux autres pensent que tu es en échange universitaire.',
    'Aller en cours': 'Tu vas en cours pendant que les autres sauvent une présentation. Pour une fois, le syllabus ressemble à un choix raisonnable.',
  };
  return choiceData.reaction || reactions[choiceData.label] || 'Tu assumes ton choix avec une assurance remarquable, surtout maintenant que tout le monde l’a vu.';
}
function newGame(name, school) { return { name, school: school || 'École supérieure', stats: { aura: 40, network: 28, alcoholism: 12, legend: 7, intelligence: 55, energy: 76, money: 55 }, network: { promo: 20, upperYears: 8 }, flags: {}, tags: [], highlights: [], decisions: [], usedScenarios: [], selectedVariants: {}, randomNext: null, event: 'arrival-people' }; }
function clamp(value) { return Math.max(0, Math.min(100, value)); }
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
function getAlcoholLabel(value) { return value <= 20 ? 'raisonnable' : value <= 40 ? 'bon vivant' : value <= 60 ? 'habitué' : value <= 80 ? 'gros fêtard' : 'légende des soirées'; }
function getStatMeta(key) { return STAT_META[key] || ({ energy: ['Énergie', '⚡'], money: ['Budget', '💶'] }[key] || [key, '⚡']); }
function apply(choiceData) {
  const before = { ...state.stats };
  const currentRandomId = state.event && state.event.startsWith('random-') ? state.event : null;
  const variedEffects = randomizeEffects(choiceData.effects);
  Object.entries(variedEffects).forEach(([key, amount]) => { if (key in state.stats) state.stats[key] = clamp(state.stats[key] + amount); });
  Object.entries(choiceData.extras).forEach(([key, value]) => { if (key === 'tag') state.tags.push(value); else if (key === 'highlight') state.highlights.push(value); else if (key === 'promo' || key === 'upperYears') state.network[key] = clamp(state.network[key] + value); else state.flags[key] = value; });
  state.decisions.push(choiceData.label); state.lastChanges = {};
  Object.keys(state.stats).forEach((key) => { if (state.stats[key] !== before[key]) state.lastChanges[key] = { before: before[key], after: state.stats[key], delta: state.stats[key] - before[key] }; });
  const destination = choiceData.next || state.randomNext || null;
  let nextEvent = destination;
  if (currentRandomId) {
    state.randomNext = null;
  } else if (destination && Math.random() < 0.7) {
    nextEvent = randomScenarioId();
    state.randomNext = destination;
    if (!state.usedScenarios.includes(nextEvent)) state.usedScenarios.push(nextEvent);
  }
  const randomReaction = currentRandomId ? scenarioById[currentRandomId].reaction : '';
  state.recap = { choice: choiceData.label, reaction: randomReaction || reactionFor(choiceData), next: nextEvent, changes: state.lastChanges };
  state.event = null; save(); render();
}

let state = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
if (state && !Array.isArray(state.usedScenarios)) state.usedScenarios = [];
if (state && !state.selectedVariants) state.selectedVariants = {};
if (state && state.randomNext === undefined) state.randomNext = null;
if (state?.lastChanges) {
  Object.entries(state.lastChanges).forEach(([key, change]) => {
    if (typeof change === 'number') state.lastChanges[key] = { before: state.stats[key] - change, after: state.stats[key], delta: change };
  });
}
function render() { document.getElementById('app').innerHTML = state ? (state.recap ? recapScreen() : gameScreen()) : startScreen(); bind(); }
function startScreen() { return `<main class="start-screen"><div class="start-grid"><div class="start-copy"><div class="brand-lockup"><span class="brand-mark">CC</span><span>Campus Chaos</span></div><p class="eyebrow">SIMULATION SOCIALE · 1A</p><h1>Ta scolarité.<br><em>Ton chaos.</em></h1><p>Fais des choix discutables, rencontre les bonnes personnes et deviens la légende que personne n’avait demandée.</p><div class="start-stamps"><span>⚡ parties courtes</span><span>🤝 histoires uniques</span><span>📱 mobile friendly</span></div></div><form class="setup-card" id="start-form"><p class="eyebrow">NOUVELLE PARTIE</p><h2>Qui es-tu sur le campus ?</h2><label>Ton prénom<input name="name" autofocus placeholder="Paul, Clara, Sam..." required></label><label>Ton école <span>(optionnel)</span><input name="school" placeholder="École supérieure"></label><button class="primary-button">Entrer dans la légende →</button><small>La partie se sauvegarde automatiquement dans ce navigateur.</small></form></div></main>`; }
function statRows() { return Object.entries(STAT_META).map(([key, meta]) => { const change = state.lastChanges?.[key]; return `<div class="stat-row"><div class="stat-main"><span class="stat-icon">${meta[1]}</span><span class="stat-label">${meta[0]}</span><strong>${state.stats[key]}<small>/100</small></strong>${change ? `<span class="delta ${change.delta > 0 ? 'positive' : 'negative'}">${change.delta > 0 ? '+' : ''}${change.delta}</span>` : ''}</div><div class="stat-track"><i style="width:${state.stats[key]}%"></i></div></div>`; }).join(''); }
function gameScreen() { const event = getEvent(state.event); if (!event) return endScreen(); return `<main class="app-shell"><header class="topbar"><div class="brand-lockup"><span class="brand-mark">CC</span><span>Campus Chaos</span></div><div class="topbar-actions"><span class="save-status">▣ sauvegarde auto</span><button class="icon-button" id="reset">↻</button></div></header><div class="game-layout"><aside class="profile-panel"><div class="profile-heading"><div class="avatar">${state.name[0].toUpperCase()}</div><div><p class="eyebrow">ÉTUDIANT·E · 1A</p><h1>${state.name}</h1><p class="school-name">${state.school}</p></div></div><div class="month-row"><span>ANNÉE 1A</span><strong>SEPTEMBRE</strong></div><div class="stats-list">${statRows()}</div><div class="energy-strip"><span>⚡ énergie</span><strong>${state.stats.energy}</strong><div class="energy-bar"><i style="width:${state.stats.energy}%"></i></div></div><div class="profile-footnote">✦ <span>Alcoolisme : <strong>${getAlcoholLabel(state.stats.alcoholism)}</strong></span></div></aside><section class="play-area"><div class="progress-line"><span>1A · ${event.arc}</span><span>${state.decisions.length + 1} décisions</span></div><article class="event-card mood-${event.mood}"><div class="event-art"><span>${event.icon}</span><div class="art-noise"></div></div><div class="event-copy"><p class="eyebrow">${event.arc}</p><h2>${event.title}</h2><p class="event-description">${event.description}</p></div><div class="choices">${event.choices.map((item, index) => `<button class="choice-button" data-choice="${index}"><span class="choice-index">${String.fromCharCode(65 + index)}</span><span class="choice-content"><strong>${item.label}</strong>${item.detail ? `<small>${item.detail}</small>` : ''}</span><span>→</span></button>`).join('')}</div></article><div class="bottom-note">♧ <span>Chaque décision ouvre une version différente de ta vie sur le campus.</span></div></section></div></main>`; }
function recapScreen() { return `<main class="recap-screen"><div class="recap-card"><p class="eyebrow">ÉTAPE INTERMÉDIAIRE · CONSÉQUENCES</p><div class="recap-icon">🧾</div><h1>Tu as choisi :<br><em>« ${state.recap.choice} »</em></h1><p class="recap-story">${state.recap.reaction}</p><div class="recap-deltas">${Object.entries(state.recap.changes).map(([key, change]) => { const meta = getStatMeta(key); return `<div class="recap-stat ${change.delta > 0 ? 'positive' : 'negative'}"><span>${meta[1]} <b>${meta[0]}</b></span><strong>${change.before} → ${change.after}</strong><small>(${change.delta > 0 ? '+' : ''}${change.delta})</small></div>`; }).join('')}</div><button class="primary-button" id="clear-recap">Continuer vers la prochaine étape →</button></div></main>`; }
function endScreen() { const highlights = state.highlights.length ? state.highlights : ['Arrivée dans une nouvelle école', 'Premières décisions prises avec aplomb']; const challenges = ['challenge1', 'challenge2', 'challenge3'].filter((key) => state.flags[key] === true).length; const score = averageScore(); return `<main class="end-screen"><div class="end-card"><p class="eyebrow">BILAN DE TON PROLOGUE</p><h1>${state.name} <span>· FIN DU DÉPART</span></h1><div class="average-score"><span>NOTE MOYENNE DU CAMPUS</span><strong>${score}<small>/100</small></strong><em>${averageLabel(score)}</em></div><div class="end-grid"><div class="final-stats">${Object.entries(STAT_META).map(([key, meta]) => `<div><span>${meta[1]} ${meta[0]}</span><strong>${state.stats[key]}/100</strong></div>`).join('')}</div><div class="highlights"><p class="eyebrow">MOMENTS MARQUANTS</p>${highlights.map((item) => `<p>✦ ${item}</p>`).join('')}<p class="eyebrow challenge-label">DÉFIS RÉALISÉS</p><strong class="big-number">${challenges}/3</strong><p class="random-count">${state.usedScenarios.length} imprévus rencontrés</p></div></div><div class="end-actions"><button class="primary-button" id="reset">Rejouer une autre vie ↻</button><span>🏆 La 2A arrive bientôt.</span></div></div></main>`; }
function bind() { document.getElementById('start-form')?.addEventListener('submit', (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); state = newGame(data.get('name'), data.get('school')); save(); render(); }); document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => apply(getEvent(state.event).choices[button.dataset.choice]))); document.getElementById('clear-recap')?.addEventListener('click', () => { state.event = state.recap.next; state.recap = null; state.lastChanges = {}; save(); render(); }); document.querySelectorAll('#reset').forEach((button) => button.addEventListener('click', () => { localStorage.removeItem(SAVE_KEY); state = null; render(); })); }
render();