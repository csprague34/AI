'use client';

import { useState } from 'react';

const QUESTIONS = [
  {
    question: 'What is the term for a female peregrine falcon used in falconry?',
    options: ['Tiercel', 'Falcon', 'Eyas', 'Haggard'],
    answer: 1,
    explanation: 'In falconry, "falcon" refers specifically to the female peregrine. The male is called a "tiercel" (meaning one-third smaller).',
  },
  {
    question: 'What is a young hawk taken from the nest before it can fly called?',
    options: ['Passager', 'Haggard', 'Eyas', 'Imprint'],
    answer: 2,
    explanation: 'An "eyas" (or eyass) is a nestling hawk taken from the nest. A "passager" is a hawk trapped during its first migration.',
  },
  {
    question: 'What is the leather leg strap used to tether a hawk called?',
    options: ['Jess', 'Bewit', 'Leash', 'Creance'],
    answer: 0,
    explanation: 'A "jess" is the short leather strap attached to each leg of a hawk. The leash attaches to the jesses via a swivel.',
  },
  {
    question: 'Which of these is the correct term for a male peregrine falcon?',
    options: ['Falcon', 'Tiercel', 'Saker', 'Lanner'],
    answer: 1,
    explanation: 'The male peregrine is called a "tiercel" (from the Latin "tertius," meaning third), as it is roughly one-third smaller than the female.',
  },
  {
    question: 'What is the long training line used when teaching a hawk to fly to the fist called?',
    options: ['Jess', 'Leash', 'Creance', 'Lure'],
    answer: 2,
    explanation: 'A "creance" is a long, light line attached to a hawk during early training so it cannot fly away while learning to return to the falconer.',
  },
  {
    question: 'What does it mean when a hawk "mantles"?',
    options: [
      'Spreads its wings over prey to hide it',
      'Rouses and shakes its feathers',
      'Flies in high circles above the falconer',
      'Refuses to return to the fist',
    ],
    answer: 0,
    explanation: 'Mantling is when a hawk spreads its wings and tail over a kill to shield it from other predators — an instinctive protective behavior.',
  },
  {
    question: 'What is the small hood placed over a hawk\'s head to keep it calm called?',
    options: ['Bewit', 'Hood', 'Bate', 'Mews'],
    answer: 1,
    explanation: 'A "hood" covers the hawk\'s eyes to keep it calm and prevent distraction. Different styles exist (Dutch, Anglo-Indian, Bahraini, etc.).',
  },
  {
    question: 'What is the term for a wild-caught adult hawk?',
    options: ['Eyas', 'Passager', 'Haggard', 'Ramage'],
    answer: 2,
    explanation: 'A "haggard" is a hawk that was trapped as a fully independent adult. It is considered the hardest type to train.',
  },
  {
    question: 'What piece of equipment is swung to call a hawk back to the falconer?',
    options: ['Creance', 'Lure', 'Perch', 'Swivel'],
    answer: 1,
    explanation: 'A "lure" — often a padded weight dressed with feathers and attached to a cord — is swung to call the hawk back and simulate prey.',
  },
  {
    question: 'Which UNESCO list recognizes falconry as intangible cultural heritage?',
    options: [
      'World Heritage Sites',
      'Representative List of Intangible Cultural Heritage',
      'Memory of the World Register',
      'Creative Cities Network',
    ],
    answer: 1,
    explanation: 'In 2016, UNESCO inscribed falconry on its Representative List of the Intangible Cultural Heritage of Humanity, submitted by 18 countries.',
  },
  {
    question: 'What is the minimum age to become a licensed apprentice falconer?',
    options: ['10 years old', '12 years old', '14 years old', '18 years old'],
    answer: 1,
    explanation: 'You must be at least 12 years old to be licensed as an apprentice falconer under federal regulations.',
  },
  {
    question: 'How long must an apprentice falconer be sponsored before advancing to General class?',
    options: ['1 year', 'At least 2 years', '3 years', '5 years'],
    answer: 1,
    explanation: 'Apprentices must be sponsored by a General or Master falconer for at least 2 years before they can advance to General class.',
  },
  {
    question: 'How many raptors may an apprentice falconer possess at one time?',
    options: ['One', 'Two', 'Three', 'Unlimited'],
    answer: 0,
    explanation: 'Apprentices may possess only one raptor at a time, and may only take one raptor from the wild per year.',
  },
  {
    question: 'What federal law protects migratory birds including raptors used in falconry?',
    options: ['Endangered Species Act', 'Migratory Bird Treaty Act', 'Lacey Act', 'Wildlife Protection Act'],
    answer: 1,
    explanation: 'The Migratory Bird Treaty Act of 1918 protects most raptors. Falconry is a regulated exception allowing take and possession.',
  },
  {
    question: 'Which species may an apprentice falconer NOT possess?',
    options: ['American kestrel', 'Red-tailed hawk', 'Golden eagle', 'Red-shouldered hawk'],
    answer: 2,
    explanation: 'Apprentices cannot possess golden eagles. Only Master falconers with proper permits may possess eagles.',
  },
  {
    question: 'After how many years as a General falconer can one advance to Master falconer?',
    options: ['2 years', '3 years', '5 years', '7 years'],
    answer: 2,
    explanation: 'A General falconer must have at least 5 years of experience before advancing to Master class.',
  },
  {
    question: 'Which owl is legal for falconry in California?',
    options: ['Barn owl', 'Spotted owl', 'Great-horned owl', 'Burrowing owl'],
    answer: 2,
    explanation: 'The Great-horned Owl is one of two owls currently legal for falconry in California.',
  },
  {
    question: 'What is the "Barred Owl" notable for in the context of California falconry?',
    options: [
      'It is the most commonly flown raptor',
      'It is an intrusive species allowed for use in falconry in California',
      'It is protected and cannot be used',
      'It is only allowed for Master falconers',
    ],
    answer: 1,
    explanation: 'The Barred Owl is an intrusive species displacing the Spotted Owl. It is allowed for use in falconry in California.',
  },
  {
    question: 'What is a "passager"?',
    options: [
      'A hawk bred in captivity',
      'A wild hawk under one year old caught during migration',
      'An adult wild hawk',
      'A hawk released after training',
    ],
    answer: 1,
    explanation: 'A passager (or passage hawk) is a wild hawk less than a year old, captured when migrating or following the migratory pattern of prey.',
  },
  {
    question: 'What does "bate" mean in falconry?',
    options: [
      'Feeding the hawk above flying weight',
      'The act of jumping off the fist and beating wings while tethered',
      'Trimming the beak or talons',
      'Calling the hawk from a tree',
    ],
    answer: 1,
    explanation: '"Bate" is when a hawk jumps off the fist and beats its wings while tethered — caused by wildness, boredom, or anger.',
  },
  {
    question: 'What is the Arabic word "abba" used in falconry?',
    options: [
      'A type of hunting perch',
      'A cloak used to safely immobilize raptors',
      'The call used to summon a falcon',
      'A trap made of netting',
    ],
    answer: 1,
    explanation: '"Abba" (Arabic for "cloak") is a safe way to immobilize raptors for beak trimming or keeping a freshly trapped bird calm.',
  },
  {
    question: 'What is a "bal-chatri" trap?',
    options: [
      'A net that falls over a hawk',
      'A cage trap with live bait and nooses that catch a raptor by the feet',
      'A lure made from real quarry feathers',
      'A leather hood variant',
    ],
    answer: 1,
    explanation: 'A bal-chatri is a cage-like trap with live bait and monofilament nooses that catch the raptor by the feet.',
  },
  {
    question: 'What is a "dho-gazza"?',
    options: [
      'A portable field perch',
      'A vertical net that falls onto a hawk attacking a live bird',
      'A type of traditional jess',
      'A raptor feeding sack',
    ],
    answer: 1,
    explanation: 'A dho-gazza is a square or rectangular net suspended vertically next to a live bird, secured loosely to fall onto a hawk that attacks the bird.',
  },
  {
    question: 'What is "bumblefoot"?',
    options: [
      'A hawk that refuses to hunt',
      'Inflammation and bacterial invasion of the feet',
      'Stress marks on tail feathers',
      'A hood that fits too tightly',
    ],
    answer: 1,
    explanation: 'Bumblefoot is inflammation and bacterial invasion of the soft tissue, joints, and bones of the feet — a common raptor health issue.',
  },
  {
    question: 'What is "aspergillosis" in raptors?',
    options: [
      'A behavioral disorder from improper imprinting',
      'A respiratory disease caused by the fungus aspergillus',
      'Feather damage from molting stress',
      'An eye infection from UV exposure',
    ],
    answer: 1,
    explanation: 'Aspergillosis is a respiratory disease caused by the fungus aspergillus, dangerous and common in captive raptors.',
  },
  {
    question: 'What is "frounce" in falconry?',
    options: [
      'A type of hunting slip',
      'A canker or sore in the mouth and throat',
      'Feathers lost during molting',
      'A reward tidbit',
    ],
    answer: 1,
    explanation: 'Frounce is a canker or sore in the mouth and throat, usually seen as a colored coating on the tongue.',
  },
  {
    question: 'What is an "accipiter"?',
    options: [
      'A hawk of short wings and a long tail',
      'A soaring hawk with broad wings',
      'A hawk in its first year of life',
      'A falcon of the genus Falco',
    ],
    answer: 0,
    explanation: 'An accipiter is a hawk of the genus Accipiter, characterized by short wings and a long tail. Examples: Sharp-shinned, Cooper\'s, and Goshawk.',
  },
  {
    question: 'What is the "cere" on a raptor?',
    options: [
      'The sharp curved beak tip',
      'The bare waxy area between the beak and the crown',
      'The membrane covering the eye',
      'The leg scale pattern used for identification',
    ],
    answer: 1,
    explanation: 'The cere is the bare, waxy area between the beak and the crown of the raptor. It is often brightly colored in falcons.',
  },
  {
    question: 'What is a "casting" in falconry?',
    options: [
      'Throwing the hawk off the fist',
      'An oval wad of indigestible matter regurgitated by the hawk',
      'The act of swinging the lure',
      'Two hawks flown together',
    ],
    answer: 1,
    explanation: 'A casting is an ovoid wad of indigestible animal matter (feathers, bones) that a hawk regurgitates several hours after eating.',
  },
  {
    question: 'What is "yarak"?',
    options: [
      'The Arabic term for a male goshawk',
      'An Eastern word meaning a shortwing is ready and keen to hunt',
      'The act of a hawk striking prey without binding',
      'A method of trimming talons',
    ],
    answer: 1,
    explanation: '"In yarak" (Eastern origin, applied to shortwings) means the hawk is keen, fit, and ready to hunt quarry.',
  },
  {
    question: 'What is "waiting-on" in longwing falconry?',
    options: [
      'Keeping the hawk on the fist until quarry is spotted',
      'A longwing circling high above the falconer waiting for quarry to be flushed',
      'Training the hawk to return to the lure',
      'The period when a hawk is put up to molt',
    ],
    answer: 1,
    explanation: '"Waiting-on" is when a longwing circles high above the falconer, holding its position (pitch) until the falconer flushes quarry.',
  },
  {
    question: 'What is a "stoop" in falconry?',
    options: [
      'A perch used in the mews',
      'A steep dive toward prey from height',
      'When a hawk refuses to fly',
      'The act of hooding a hawk in the field',
    ],
    answer: 1,
    explanation: 'A stoop is a steep, high-speed dive toward prey from the hawk\'s pitch — the peregrine\'s signature hunting strike.',
  },
  {
    question: 'What is "manning" in falconry training?',
    options: [
      'Teaching the hawk to fly to the lure',
      'Getting the hawk accustomed to people, sights, and sounds',
      'The process of removing wild-caught hawks from traps',
      'Flying two hawks together for training',
    ],
    answer: 1,
    explanation: 'Manning is the process of getting a newly acquired hawk accustomed to the presence of people, animals, and everyday sights and sounds.',
  },
  {
    question: 'What does "rouse" mean when a hawk does it?',
    options: [
      'Attempts to fly away from the fist',
      'Stands all feathers on end and gives a rattling shake — a sign of well-being',
      'Spreads wings over food to protect it',
      'Calls loudly to attract the falconer',
    ],
    answer: 1,
    explanation: '"Rouse" is when a hawk stands all its feathers on end and gives a rattling shake. It signals contentment and well-being.',
  },
  {
    question: 'What is a "cadge"?',
    options: [
      'A portable perch used for carrying multiple hawks in the field',
      'The swivel connecting jesses to the leash',
      'A trap used to catch passage hawks',
      'The leather strap used to carry the lure',
    ],
    answer: 0,
    explanation: 'A cadge is a portable perch used for carrying hawks in the field. The person who carries it is called a "cadger."',
  },
  {
    question: 'What is telemetry used for in falconry?',
    options: [
      'Measuring a hawk\'s weight before a hunt',
      'Radio location of falconry raptors that fly out of sight',
      'Recording flight speed during stoops',
      'Monitoring feather growth during molt',
    ],
    answer: 1,
    explanation: 'Telemetry is the contemporary method of radio-locating falconry raptors when they fly out of sight or become lost.',
  },
  {
    question: 'What does it mean to "imp" a feather?',
    options: [
      'To trim an overgrown talon',
      'To mend a broken feather by grafting in a new piece with an imping needle',
      'To mark a feather for identification',
      'To apply waterproofing oil to flight feathers',
    ],
    answer: 1,
    explanation: '"Imping" is the traditional technique of repairing broken feathers by joining the broken shaft to a new feather section using an imping needle.',
  },
  {
    question: 'What is the "mews"?',
    options: [
      'The portable perch used in the field',
      'The place where a hawk is kept, especially during molt',
      'The long line used during training',
      'The lure made from quarry feathers',
    ],
    answer: 1,
    explanation: 'The mews is the place where a hawk is housed and traditionally where it is put to molt. It is the hawk\'s primary home.',
  },
  {
    question: 'What is a "bewit" used for?',
    options: [
      'Attaching bells to a hawk\'s legs',
      'Tethering the hawk to a perch',
      'Restraining a newly trapped hawk',
      'Covering the hawk\'s eyes during transport',
    ],
    answer: 0,
    explanation: 'Bewits are short thin strips of leather by which bells are fastened to the hawk\'s legs so the falconer can hear the hawk in the field.',
  },
  {
    question: 'What is "flying weight" in falconry?',
    options: [
      'The weight of equipment the hawk carries',
      'The weight at which a hawk is healthy and hungry enough to hunt and respond to the falconer',
      'The maximum weight a hawk can carry as prey',
      'The hawk\'s weight at the end of molt season',
    ],
    answer: 1,
    explanation: 'Flying weight is the weight at which a hawk is healthy enough to fly and hunt, yet sufficiently hungry to respond to the falconer and pursue quarry.',
  },
];

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    background: 'linear-gradient(160deg, #1a1208 0%, #2c1f0a 100%)',
  },
  card: {
    background: '#fdf6e3',
    borderRadius: 16,
    padding: '40px 36px',
    maxWidth: 640,
    width: '100%',
    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#5c3a00',
    margin: 0,
    letterSpacing: 1,
  },
  subtitle: {
    color: '#8a6030',
    marginTop: 6,
    fontSize: 14,
  },
  progress: {
    fontSize: 13,
    color: '#a07840',
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    background: '#e8d9b8',
    borderRadius: 3,
    margin: '12px 0 28px',
    overflow: 'hidden',
  },
  progressFill: (pct) => ({
    height: '100%',
    width: `${pct}%`,
    background: '#b8620a',
    borderRadius: 3,
    transition: 'width 0.4s ease',
  }),
  question: {
    fontSize: 19,
    color: '#3a2400',
    marginBottom: 20,
    lineHeight: 1.5,
  },
  optionBtn: (state) => ({
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '12px 16px',
    marginBottom: 10,
    borderRadius: 10,
    border: '2px solid',
    borderColor:
      state === 'correct' ? '#2a7c1a' :
      state === 'wrong'   ? '#b22222' :
      state === 'reveal'  ? '#2a7c1a' :
                            '#d4b87a',
    background:
      state === 'correct' ? '#d4f5cc' :
      state === 'wrong'   ? '#fddcdc' :
      state === 'reveal'  ? '#d4f5cc' :
                            '#fff9ee',
    color:
      state === 'correct' ? '#1a5c0e' :
      state === 'wrong'   ? '#8b1a1a' :
      state === 'reveal'  ? '#1a5c0e' :
                            '#3a2400',
    fontSize: 15,
    cursor: state === 'idle' ? 'pointer' : 'default',
    transition: 'background 0.2s, border-color 0.2s',
    fontFamily: 'Georgia, serif',
  }),
  explanation: {
    background: '#f0e6cc',
    border: '1px solid #d4b87a',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 14,
    color: '#5c3a00',
    lineHeight: 1.6,
    marginTop: 4,
  },
  nextBtn: {
    marginTop: 20,
    width: '100%',
    padding: '13px',
    background: '#b8620a',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    letterSpacing: 0.5,
  },
  resultSection: {
    textAlign: 'center',
  },
  score: {
    fontSize: 56,
    fontWeight: 700,
    color: '#b8620a',
    margin: '8px 0',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#8a6030',
  },
  verdict: (pct) => ({
    fontSize: 20,
    fontWeight: 600,
    color: pct >= 80 ? '#2a7c1a' : pct >= 50 ? '#b8620a' : '#b22222',
    margin: '16px 0 8px',
  }),
  restartBtn: {
    marginTop: 24,
    padding: '13px 32px',
    background: '#b8620a',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
  },
};

function verdict(pct) {
  if (pct === 100) return 'Perfect score — Master Falconer!';
  if (pct >= 80) return 'Excellent — Journeyman Falconer';
  if (pct >= 60) return 'Good — Apprentice Falconer';
  if (pct >= 40) return 'Keep studying — Novice';
  return 'Back to the mews for more practice!';
}

export default function FalconryQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[current];
  const answered = selected !== null;

  function choose(idx) {
    if (answered) return;
    setSelected(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  function optionState(idx) {
    if (!answered) return 'idle';
    if (idx === q.answer) return selected === idx ? 'correct' : 'reveal';
    if (idx === selected) return 'wrong';
    return 'idle';
  }

  const pct = Math.round((score / QUESTIONS.length) * 100);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Falconry Quiz</h1>
          {!done && (
            <>
              <p style={styles.subtitle}>The Ancient Art of Hunting with Birds of Prey</p>
              <p style={styles.progress}>
                Question {current + 1} of {QUESTIONS.length} &nbsp;|&nbsp; Score: {score}
              </p>
            </>
          )}
        </div>

        {!done ? (
          <>
            <div style={styles.progressBar}>
              <div style={styles.progressFill((current / QUESTIONS.length) * 100)} />
            </div>

            <p style={styles.question}>{q.question}</p>

            {q.options.map((opt, idx) => (
              <button
                key={idx}
                style={styles.optionBtn(optionState(idx))}
                onClick={() => choose(idx)}
              >
                {opt}
              </button>
            ))}

            {answered && (
              <>
                <div style={styles.explanation}>{q.explanation}</div>
                <button style={styles.nextBtn} onClick={next}>
                  {current + 1 >= QUESTIONS.length ? 'See Results' : 'Next Question'}
                </button>
              </>
            )}
          </>
        ) : (
          <div style={styles.resultSection}>
            <p style={styles.scoreLabel}>Your final score</p>
            <p style={styles.score}>{score}/{QUESTIONS.length}</p>
            <p style={styles.scoreLabel}>{pct}% correct</p>
            <p style={styles.verdict(pct)}>{verdict(pct)}</p>
            <button style={styles.restartBtn} onClick={restart}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
