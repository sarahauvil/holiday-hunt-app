export type CharmId =
  | 'ghost'
  | 'gift'
  | 'hat'
  | 'yulelog'
  | 'snowglobe'
  | 'cocoa'
  | 'reindeer'
  | 'gingerbread'
  | 'candycane'
  | 'holly'
  | 'keys'
  | 'balldrop'
  | 'clock'
  | 'fu'
  | 'diya'
  | 'shimekazari'

export type Station = {
  id: string
  title: string
  owners: string
  blurb: string
  charm: CharmId
  charmLabel: string
  challenge: {
    prompt: string
    hint: string
    /** Accepted answers (lowercase, trimmed). Edit freely. */
    answers: string[]
  }
  assets: {
    video?: string
    pdf?: string
    docx?: string
    pptx?: string
    cover?: string
  }
}

/** Facilitator final passphrase — case-insensitive match. */
export const FINAL_PASSPHRASE = 'FIREPLACE'

export const FINAL_RIDDLE =
  'After Glühwein by the Dom, where do mittens dry and cocoa stay warm?'

export const stations: Station[] = [
  {
    id: 'ghostwriter',
    title: 'GhostwrAIter',
    owners: 'Oliwia & Ronja',
    blurb:
      'GhostwrAIter helps teams draft and refine content with AI — explore how consumer health IT uses generative writing support.',
    charm: 'ghost',
    charmLabel: 'Christmas ghost',
    challenge: {
      prompt: 'GhostwrAIter is mainly about which kind of support?',
      hint: 'Think writing…',
      answers: ['content generation', 'content', 'writing', 'ai writing', 'generation'],
    },
    assets: {
      video: '/stations/ghostwriter/video.mp4',
      pdf: '/stations/ghostwriter/slides.pdf',
      docx: '/stations/ghostwriter/notes.docx',
      pptx: '/stations/ghostwriter/deck.pptx',
    },
  },
  {
    id: 'myorders',
    title: 'Elevate MyOrders',
    owners: 'Dhiraj & Lakshmi',
    blurb:
      'Elevate MyOrders improves the ordering experience — learn what the team is elevating for customers and colleagues.',
    charm: 'gift',
    charmLabel: 'Gift',
    challenge: {
      prompt: 'What experience is the Elevate MyOrders team improving?',
      hint: 'It is in the name…',
      answers: ['orders', 'ordering', 'myorders', 'my orders', 'order experience'],
    },
    assets: {
      video: '/stations/myorders/video.mp4',
      pdf: '/stations/myorders/slides.pdf',
      docx: '/stations/myorders/notes.docx',
      pptx: '/stations/myorders/deck.pptx',
    },
  },
  {
    id: 'gap',
    title: 'Gap Detective',
    owners: 'Luke H',
    blurb:
      'Gap Detective finds holes in processes and data so teams can close them before they become problems.',
    charm: 'clock',
    charmLabel: 'Old clock',
    challenge: {
      prompt: 'What does Gap Detective help teams find?',
      hint: 'Look closely…',
      answers: ['gaps', 'gap', 'holes', 'process gaps', 'data gaps'],
    },
    assets: {
      video: '/stations/gap/video.mp4',
      pdf: '/stations/gap/slides.pdf',
      docx: '/stations/gap/notes.docx',
      pptx: '/stations/gap/deck.pptx',
    },
  },
  {
    id: 'forge',
    title: 'FORGE',
    owners: 'Rafal',
    blurb:
      'FORGE is building capabilities that help IT forge stronger tools and workflows across initiatives.',
    charm: 'snowglobe',
    charmLabel: 'Snow globe',
    challenge: {
      prompt: 'FORGE is focused on helping teams do what with tools and workflows?',
      hint: 'The project name is a verb…',
      answers: ['forge', 'build', 'building', 'create', 'strengthen'],
    },
    assets: {
      video: '/stations/forge/video.mp4',
      pdf: '/stations/forge/slides.pdf',
      docx: '/stations/forge/notes.docx',
      pptx: '/stations/forge/deck.pptx',
    },
  },
  {
    id: 'orbit',
    title: 'OrbitOne',
    owners: 'Damian',
    blurb:
      'OrbitOne brings work into one orbit — discover how it connects people and platforms.',
    charm: 'fu',
    charmLabel: '福 decoration',
    challenge: {
      prompt: 'OrbitOne aims to bring work into how many orbits?',
      hint: 'Count carefully…',
      answers: ['one', '1', 'a single', 'single'],
    },
    assets: {
      video: '/stations/orbit/video.mp4',
      pdf: '/stations/orbit/slides.pdf',
      docx: '/stations/orbit/notes.docx',
      pptx: '/stations/orbit/deck.pptx',
    },
  },
  {
    id: 'llm',
    title: 'LLM Optimization',
    owners: 'Chris Mrosk',
    blurb:
      'LLM optimization makes large language model usage faster, cheaper, and more reliable for real products.',
    charm: 'cocoa',
    charmLabel: 'Cocoa',
    challenge: {
      prompt: 'This initiative focuses on optimizing what?',
      hint: 'Three letters…',
      answers: ['llm', 'llms', 'large language models', 'language models', 'models'],
    },
    assets: {
      video: '/stations/llm/video.mp4',
      pdf: '/stations/llm/slides.pdf',
      docx: '/stations/llm/notes.docx',
      pptx: '/stations/llm/deck.pptx',
    },
  },
  {
    id: 'pilot',
    title: 'Cross-Divisional IT Pilot',
    owners: 'Chris Beckers',
    blurb:
      'A cross-divisional IT pilot exploring how teams across Consumer Health collaborate on shared technology bets.',
    charm: 'diya',
    charmLabel: 'Diwali lamp',
    challenge: {
      prompt: 'This pilot spans across what organizational boundaries?',
      hint: 'More than one…',
      answers: ['divisions', 'divisional', 'cross-divisional', 'cross divisional', 'departments'],
    },
    assets: {
      video: '/stations/pilot/video.mp4',
      pdf: '/stations/pilot/slides.pdf',
      docx: '/stations/pilot/notes.docx',
      pptx: '/stations/pilot/deck.pptx',
    },
  },
  {
    id: 'elevit',
    title: 'Elevit & D2C Commerce',
    owners: 'Michael / Maiyuan',
    blurb:
      'Elevit meets Direct-to-Consumer commerce — learn how digital storefronts connect brands with customers.',
    charm: 'shimekazari',
    charmLabel: 'Shimekazari',
    challenge: {
      prompt: 'D2C in this initiative stands for Direct to …?',
      hint: 'Who buys?',
      answers: ['consumer', 'consumers', 'customer', 'customers'],
    },
    assets: {
      video: '/stations/elevit/video.mp4',
      pdf: '/stations/elevit/slides.pdf',
      docx: '/stations/elevit/notes.docx',
      pptx: '/stations/elevit/deck.pptx',
    },
  },
  {
    id: 'keys',
    title: 'Keys',
    owners: 'Diana',
    blurb:
      'Keys unlocks access, identity, and secure pathways so teams can open the right doors without losing the keys to the kingdom.',
    charm: 'keys',
    charmLabel: 'Keys',
    challenge: {
      prompt: 'What does the Keys stall help teams unlock?',
      hint: 'Think access…',
      answers: ['access', 'keys', 'identity', 'secure access', 'doors', 'pathways'],
    },
    assets: {
      video: '/stations/keys/video.mp4',
      pdf: '/stations/keys/slides.pdf',
      docx: '/stations/keys/notes.docx',
      pptx: '/stations/keys/deck.pptx',
    },
  },
]

export function getStation(id: string): Station | undefined {
  return stations.find((s) => s.id === id)
}

export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function checkStationAnswer(station: Station, value: string): boolean {
  const normalized = normalizeAnswer(value)
  return station.challenge.answers.some(
    (a) => normalized === a || normalized.includes(a) || a.includes(normalized),
  )
}

export function checkFinalPassphrase(value: string): boolean {
  const normalized = normalizeAnswer(value).replace(/[\s_-]+/g, '')
  return normalized === FINAL_PASSPHRASE.toLowerCase()
}
