export interface Experience {
  role: string
  company: string
  dates: string
  clients: string | null
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Super',
    dates: 'October 2025 - Present',
    clients: null,
    bullets: [
      'Delivered a strategic World Cup web initiative across four product pages ahead of schedule, closing feature gaps with native platforms and contributing to revenue growth reported by the business.',
      'Build real-time sports statistics and analytics features using Vue 3, React and TypeScript, integrating REST APIs and Server-Sent Events.',
      'Own delivery from technical refinement through deployment, agreeing API contracts with backend engineers and splitting larger initiatives into tasks for other developers.',
      'Improve maintainability through refactoring, Vitest unit tests and technical debt reduction; conduct code reviews and mentor junior colleagues.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'eDreams ODIGEO',
    dates: 'January 2024 - October 2025',
    clients: null,
    bullets: [
      'Built React components for a redesigned Prime subscription purchase journey, spanning fare comparison during flight selection, benefit messaging and checkout.',
      'Investigated a poorly understood legacy flow and jointly planned its refactoring with another senior engineer. Used a month of usage tracking and validation with Product to identify obsolete variants for removal.',
      'Separated shared business logic and API calls from experimental interfaces, allowing original and redesigned flows to coexist and supporting subsequent experiments.',
      'Helped maintain conversion while reducing page load time and bundle size, with validation supported by Product analytics and monitoring through FullStory and Grafana.',
    ],
  },
  {
    role: 'Senior Full-Stack Developer',
    company: 'Talan',
    dates: 'January 2023 - January 2024',
    clients: 'Clients: major energy company and international broadcasting organisation',
    bullets: [
      'Planned implementation of an electricity-pricing application for grid operators. Established its FastAPI/Python and React/TypeScript foundations, implemented complex backend and frontend functionality, and guided two junior engineers.',
      'Proposed and built a FastAPI project template with CI/CD, observability and Swagger documentation, reducing setup work for new APIs; used for at least one additional API.',
      'Introduced structured logging and Datadog dashboards for errors and response times within a logs-only environment. Delivered workshops that supported adoption of observability across existing APIs.',
      'Worked with the energy client’s technical lead and Talan management to plan deliveries and resolve technical issues.',
      'Reverse-engineered workflows and service interactions in a minimally documented Java application for broadcasting control-room operators. Shared the initial analysis with another senior engineer, then drove Angular implementation alongside a junior developer, delivering substantial portions tested by the client.',
    ],
  },
  {
    role: 'Senior Frontend Developer',
    company: 'Mercado Libre',
    dates: 'July 2021 - November 2022',
    clients: null,
    bullets: [
      'Helped expand post-purchase insurance offers beyond extended warranties to include theft, accidental damage and life insurance in selected markets, collaborating with Product, UX and the technical lead from refinement through production.',
      'Developed React interfaces with client-side and server-side rendering, and Node.js endpoints that transformed backend responses for frontend consumption.',
      'Proposed and helped deliver Pandora, a shared React component library adopted by all InsurTech teams. Configured Storybook and adapted existing components for reuse, improving UI consistency across squads.',
      'Maintained unit tests, monitored releases and participated in on-call rotations.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'San Cristóbal',
    dates: 'January 2020 - July 2021',
    clients: null,
    bullets: [
      'Built the Angular frontend for a supplier invoice portal from scratch, collaborating with two backend-focused senior engineers and contributing selected .NET Core changes.',
      'Helped replace an email-based process with automated invoice processing, reducing accounting workload and enabling eligible invoices to pass validation and enter payment processing automatically.',
      'Evaluated open-source and commercial OCR options and presented trade-offs to architects. Integrated the selected open-source solution for form completion and added a side-by-side PDF viewer to simplify corrections and reduce supplier data entry.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Accenture',
    dates: 'August 2018 - January 2020',
    clients: null,
    bullets: [
      'Contributed to migrating an accounting-system module from a monolith to an Angular application backed by .NET Core microservices.',
      'Configured an Azure DevOps CI/CD pipeline and collaborated with UX on implementation feasibility.',
    ],
  },
]

export const earlierExperience = [
  {
    role: 'Support / Functional Analyst',
    company: 'Pfizer',
    dates: 'August 2016 - August 2018',
    description:
      'Supported international Kronos implementations and upgrades, including impact analysis and configuration changes for payroll teams.',
  },
  {
    role: 'QA Automation Engineer',
    company: 'Accenture',
    dates: 'August 2014 - September 2016',
    description:
      'Developed automated regression tests using HP UFT, ALM and VBScript; mentored new team members.',
  },
]

export const skills = [
  {
    name: 'Frontend',
    items: [
      'React',
      'Vue 3',
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS/SCSS',
      'Storybook',
    ],
  },
  {
    name: 'Backend and integration',
    items: [
      'Node.js',
      'Python',
      'FastAPI',
      'C#',
      '.NET Core',
      'REST APIs',
      'Server-Sent Events',
      'SQL',
    ],
  },
  {
    name: 'Testing and delivery',
    items: ['Vitest', 'unit testing', 'Git', 'Azure DevOps', 'CI/CD', 'code review'],
  },
  {
    name: 'Observability',
    items: ['Datadog', 'Grafana', 'FullStory', 'structured logging', 'production monitoring'],
  },
]
