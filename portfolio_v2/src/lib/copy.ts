/**
 * FASE 6 — Copy
 *
 * Todas as strings visíveis do produto vivem aqui, e só aqui. O método do `10`
 * é este: extrair tudo para uma lista, ler as frases seguidas, e reescrever —
 * incoerências de voz só são visíveis quando as frases estão lado a lado.
 *
 * Regras aplicadas:
 *  - voz do produto, não de uma pessoa: os erros não pedem desculpa nem fazem piadas
 *  - sentence case, voz ativa, botões sem ponto final
 *  - o botão diz o que vai acontecer ("Try again", nunca "Submit" nem "OK")
 *  - erro = o que aconteceu + o que fazer a seguir
 *  - estado vazio = o que é isto + uma ação
 */
export const copy = {
  nav: {
    skipToContent: "Skip to content",
    home: "Home",
    blog: "Blog",
    about: "About",
    label: "Main",
    toLight: "Switch to the light theme",
    toDark: "Switch to the dark theme",
    email: "Email me",
  },

  home: {
    greeting: (firstName: string) => `${firstName} Afonso`,
    role: "Software Engineer",
    sayHello: "Say hello",
    work: "Work",
    previousRoles: "Previous roles",
    recentWork: "Recent work",
    noProjectsTitle: "Nothing listed yet",
    noProjectsBody: "The work isn't public yet. Ask me about it directly.",
    noProjectsAction: "Say hello",
  },

  about: {
    title: "About me",
    skills: "Skills and technologies",
    experience: "Experience",
    education: "Education",
    resume: "Download the CV",
  },

  blog: {
    eyebrow: "Blog",
    title: "Notes and essays",
    intro: "Occasional writing on engineering, design and the craft of shipping.",
    emptyTitle: "Nothing published yet",
    emptyBody: "I write when there's something worth the reading. The work is a better place to start.",
    emptyAction: "See the work",
    backToBlog: "Back to blog",
    notFoundTitle: "This post isn't here",
    notFoundBody: "It was either removed or never published. The rest of the writing still is.",
  },

  project: {
    backToWork: "Back to work",
    milestones: "Milestones",
    milestonesLabel: "42 Porto milestones",
    highlights: "Highlights",
    viewProject: "View project",
    upcomingTitle: "Still ahead",
    upcomingBody: "This milestone hasn't started. The finished ones are the first three.",
    upcomingAction: "Go to M1",
    notFoundTitle: "This project isn't here",
    notFoundBody: "It was either renamed or is no longer listed. The current work still is.",
  },

  states: {
    loading: "Loading",
    errorEyebrow: "Error",
    errorTitle: "The portfolio didn't load",
    errorBody:
      "The API that serves this content didn't answer. It's usually back within a few seconds.",
    errorRetry: "Try again",
    errorRetrying: "Retrying…",
    /** Ao fim de três tentativas, deixa de sugerir o que já não vai resultar. */
    errorGiveUpBody:
      "It's still not answering. Reach me on LinkedIn and I'll send you the work directly.",
    errorGiveUpAction: "Reach me on LinkedIn",
    errorDetail: (message: string) => `Detail: ${message}`,
  },

  notFound: {
    eyebrow: "404",
    title: "Page not found",
    body: "This address doesn't lead anywhere. Everything else does.",
    action: "Go home",
  },

  footer: {
    github: "GitHub",
    linkedin: "LinkedIn",
    rights: (year: number) => `© ${year} All rights reserved`,
  },

  present: "Present",
} as const;
