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
