export type Section = { label: string; paragraphs: string[] };
export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  tags: string[];
  summary: string;
  cover: string;
  sections: Section[];
  stats: Stat[];
  quote: { text: string; author: string };
  gallery: string[];
};

const img = (seed: string, w = 1600, h = 1000) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const summary =
  "Een nieuwe website voor een merk dat klaar was voor de volgende stap: rustiger, scherper en volledig afgestemd op de mensen die het wil bereiken.";

// ── Placeholderinhoud, gedeeld door alle projecten ──
const details = (seed: string, client: string) => ({
  sections: [
    {
      label: "De vraag",
      paragraphs: [
        `${client} is in een paar jaar uitgegroeid van een klein team tot een bedrijf met klanten door heel Nederland. De website was in die tijd steeds verder uitgebreid met nieuwe pagina's, losse campagnes en tijdelijke oplossingen. Het resultaat was een site die vooral liet zien hoe het bedrijf gegroeid was, niet waar het nu voor staat.`,
        "Bezoekers haakten af voordat ze bij de belangrijkste informatie kwamen, en het team besteedde veel tijd aan het bijhouden van pagina's die nauwelijks bezocht werden. Ook op mobiel, waar inmiddels het grootste deel van de bezoekers vandaan komt, voelde de site traag en rommelig.",
        "De vraag was daarom tweeledig: een site die het merk weer helder en zelfverzekerd neerzet, én een technische basis die snel is, goed vindbaar en eenvoudig door het team zelf te beheren.",
      ],
    },
    {
      label: "Onderzoek",
      paragraphs: [
        "Voordat er ook maar één scherm werd ontworpen, ben ik in gesprek gegaan met het team, een aantal klanten en de mensen die dagelijks met de site werken. Wat zoeken bezoekers écht? Waar lopen ze vast? En welke vragen komen er steeds opnieuw binnen via mail en telefoon?",
        "Daarnaast heb ik de bestaande site doorgelicht: bezoekersdata, laadtijden, zoekwoorden en de structuur van alle pagina's. Daaruit bleek dat bijna de helft van de pagina's samen maar een paar procent van het bezoek trok, terwijl de pagina's die het meest bezocht werden juist het minst duidelijk waren.",
        "Die inzichten vormden de basis voor een nieuwe structuur: minder pagina's, een logischere volgorde en een duidelijke route van eerste indruk naar contact.",
      ],
    },
    {
      label: "Ontwerp",
      paragraphs: [
        "In het ontwerp draait alles om rust en richting. Veel witruimte, een sterke typografische basis en een beperkt kleurenpalet zorgen ervoor dat de inhoud het werk kan doen. Elk scherm heeft één duidelijk doel, en alles wat daar niet aan bijdraagt is weggelaten.",
        "Beweging speelt een bescheiden maar belangrijke rol. Animaties begeleiden de bezoeker door de pagina: ze laten zien wat bij elkaar hoort, waar de aandacht naartoe moet en wat er gebeurt na een klik. Nooit als decoratie, altijd met een functie.",
        "Het ontwerp is in een aantal rondes samen met het team aangescherpt. Door vroeg klikbare prototypes te delen, konden we keuzes testen op echte schermen in plaats van op losse plaatjes, en waren discussies over details snel beslecht.",
      ],
    },
    {
      label: "Development",
      paragraphs: [
        "De site is gebouwd met Next.js, zodat pagina's vooraf worden klaargezet en vrijwel direct laden. Beelden worden automatisch in het juiste formaat geleverd, afhankelijk van het scherm waarop ze bekeken worden.",
        "De animaties zijn gemaakt met GSAP en zo opgezet dat ze soepel draaien, ook op oudere telefoons. Voor bezoekers die in hun instellingen hebben aangegeven minder beweging te willen, schakelt de site automatisch over naar een rustige versie.",
        "Tot slot is alles gebouwd met het team in gedachten: teksten, projecten en beelden zijn eenvoudig aan te passen, zonder dat daar een ontwikkelaar voor nodig is.",
      ],
    },
    {
      label: "Resultaat",
      paragraphs: [
        "Binnen een paar weken na de lancering waren de eerste resultaten al zichtbaar. Bezoekers blijven langer, bekijken meer pagina's en vinden sneller de informatie die ze zoeken. Het aantal aanvragen via de site is flink gestegen.",
        "Minstens zo belangrijk: het team is weer trots op de site. Nieuwe projecten en updates staan er in een paar minuten op, en de site groeit nu mee met het bedrijf in plaats van erachteraan te lopen.",
      ],
    },
  ],
  stats: [
    { value: "+48%", label: "Meer aanvragen" },
    { value: "1.2s", label: "Gemiddelde laadtijd" },
    { value: "6 wk", label: "Van briefing tot live" },
  ],
  quote: {
    text: "Er is niet alleen een mooie website gemaakt, er is ook echt meegedacht over wat wij nodig hadden. Het voelt eindelijk alsof onze site bij ons past: rustig, duidelijk en precies wat we willen uitstralen.",
    author: `Naam Achternaam, Marketing bij ${client}`,
  },
  gallery: [
    img(`${seed}-a`, 1000, 1250),
    img(`${seed}-b`, 900, 1200),
    img(`${seed}-c`, 1000, 1250),
    img(`${seed}-d`, 1600, 1000),
  ],
});

// ── Placeholderprojecten: vervang later door je eigen werk ──
export const projects: Project[] = [
  {
    slug: "project-een",
    title: "Project Een",
    client: "Klant A",
    year: "2026",
    role: "Design & development",
    tags: ["Web design", "Development"],
    summary,
    cover: img("proj-1", 1200, 900),
    ...details("proj-1", "Klant A"),
  },
  {
    slug: "project-twee",
    title: "Project Twee",
    client: "Klant B",
    year: "2026",
    role: "Web design",
    tags: ["Web design"],
    summary,
    cover: img("proj-2", 1200, 900),
    ...details("proj-2", "Klant B"),
  },
  {
    slug: "project-drie",
    title: "Project Drie",
    client: "Klant C",
    year: "2025",
    role: "Web design",
    tags: ["Web design"],
    summary,
    cover: img("proj-3", 1200, 900),
    ...details("proj-3", "Klant C"),
  },
  {
    slug: "project-vier",
    title: "Project Vier",
    client: "Klant D",
    year: "2025",
    role: "Development",
    tags: ["Development", "Motion"],
    summary,
    cover: img("proj-4", 1200, 900),
    ...details("proj-4", "Klant D"),
  },
  {
    slug: "project-vijf",
    title: "Project Vijf",
    client: "Klant E",
    year: "2025",
    role: "Art direction",
    tags: ["Art direction"],
    summary,
    cover: img("proj-5", 1200, 900),
    ...details("proj-5", "Klant E"),
  },
  {
    slug: "project-zes",
    title: "Project Zes",
    client: "Klant F",
    year: "2024",
    role: "Design & development",
    tags: ["Web design", "Development"],
    summary,
    cover: img("proj-6", 1200, 900),
    ...details("proj-6", "Klant F"),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);