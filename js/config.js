const STORAGE_KEY = 'ALGO_FLOW_QUEST_FINAL_SAVE';
let gameState = {
  player: { name: "Siswa", class: "7-A", level: 1, xp: 0, totalScore: 0, coins: 0 },
  levelsProgress: {},
  achievements: [],
  storyProgress: { introSeen: false, bossDefeatedSeen: [], endingSeen: false },
  adaptiveProfile: { currentDifficulty: 'NORMAL', adaptiveScore: 70, levelAttempts: {}, consecutiveErrors: 0 },
  learningAssessment: { competencies: {}, totalAttempted: 0, totalCorrect: 0, totalTimeSeconds: 0 },
  learningAnalytics: { studentId: "STU_DEFAULT", sessionLogs: [] },
  freePlayStats: { sessionsPlayed: 0, correctAnswers: 0, wrongAnswers: 0 },
  stats: { levelsCompleted: 0, quizzesTotal: 0, quizzesCorrect: 0, totalPlayTimeSeconds: 0 },
  current: { levelId: 1, lives: 3, score: 0, selectedQuizOption: null, usedHint: false, timerSeconds: 0, timerInterval: null }
};
