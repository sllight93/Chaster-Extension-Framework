export const sampleConf = {
  config: {
    _doc: {
      difficulty:
        "Ein Array von Objekten, die jeweils einen Schwierigkeitsgrad definieren. Jedes Objekt muss die Eigenschaften 'type' (String) und 'weight' (Integer) enthalten. Erlaubte Typen: 'invert', 'double', 'double_invert_jackpot', 'nothing'.",
      votes_target: "Integer. Gibt die Zielanzahl der Stimmen an.",
      count_only_loggedin:
        "Boolean. Wenn true, werden nur Stimmen von angemeldeten Usern gezählt.",
      split: "Integer. Gibt an, wie etwas (z.B. Punkte oder Aufgaben) aufgeteilt wird.",
      daily_quota: "Integer. Legt das tägliche Kontingent fest.",
      punish_mult: "Float. Definiert den Strafmultiplikator."
    },
    difficulty: [
      { type: "invert", weight: 20 },
      { type: "double", weight: 20 },
      { type: "double_invert", weight: 35 },
      { type: "jackpot", weight: 1 },
      { type: "nothing", weight: 320 }
    ],
    votes_target: 300,
    count_only_loggedin: true,
    split: 50,
    daily_quota: 20,
    punish_mult: 1.0,
  },
  metadata: {
    reasonsPreventingUnlocking: [
      "Not enough votes collected. Get more shared link votes to unlock!"
    ],
    homeActions: [
      {
        slug: "notEnoughVotesQuota",
        title: "Daily quota not reached!",
        description: "Let people vote for your lock to prevent punishment!",
        icon: "fa-link",
        badge: "12"
      }
    ]
  },
  data: {
    votes: {
      total: 132,
      eligible: 104,
      today: 8
    }
  }
};

export const sampleKeyholder = {
  name: "MissLisa",
  avatarUrl: "https://cdn01.chaster.app/app/uploads/avatars/3EoHpAI5PzW4rGKN.jpg"
};

export const sampleWearer = {
  name: "Lara Light",
  avatarUrl: "https://cdn01.chaster.app/app/uploads/avatars/7aksQ1eP8241HQPQ.jpg"
};

export const sampleCountdownTime = "02:05:22:59";