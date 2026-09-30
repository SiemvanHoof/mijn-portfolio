export type Entry = { period: string; role: string; company: string; place: string };

export const about = {
  // Je leeftijd wordt hieruit berekend en gaat elk jaar op deze datum omhoog
  birthDate: "2007-07-03",

  heading: ["Jong, nieuwsgierig", "en altijd aan het bouwen."],

  intro:
    "ICT-student uit Veldhoven. Ik ontwerp en bouw websites voor ondernemers die online willen laten zien wie ze zijn.",

  portrait: "https://picsum.photos/seed/portrait/900/1125?grayscale",

  // {age} wordt vervangen door je leeftijd
  lead: "Ik ben Siem, {age} jaar, en ik maak websites voor kleinere bedrijven: persoonlijk, overzichtelijk en tot in de details goed afgewerkt.",

  bio: [
    "Computers trokken me altijd al. Tijdens een open dag bij het Summa College wist ik het eigenlijk meteen: dit wil ik doen. In mijn tweede jaar twijfelde ik even, maar ik ben doorgegaan, en daar ben ik nu blij om. Na mijn mbo-opleiding ICT stroom ik via een versneld traject in bij het tweede jaar van het hbo aan Fontys.",
    "Tijdens mijn stage bij Questo in Veldhoven werkte ik als webdeveloper aan echte websites voor klanten, zoals die van Moduglass en Brecon. Omdat alles vrijwel direct online staat, leerde ik daar om secuur te werken en fouten snel te vinden en op te lossen. Daar maakte ik ook kennis met Next.js, de techniek waarmee deze site gebouwd is.",
    "Ik ontwerp én bouw, en dat wil ik ook blijven doen. Ik werk het liefst voor kleinere bedrijven: korte lijnen, persoonlijk contact en een website waar je echt iets aan hebt. Mijn doel is om zo een eigen klantenkring op te bouwen, en later misschien een eigen bedrijf te beginnen.",
    "Naast mijn studie werk ik bij Verma in Veldhoven, voetbal ik met vrienden bij DBS en speel ik tennis in de seniorencompetitie bij VLTC. En ik blijf leren: elke nieuwe taal of techniek betekent weer meer dat ik kan maken.",
  ],

  services: [
    {
      title: "Web design",
      text: "Van eerste schets tot uitgewerkt ontwerp in Figma, inclusief hoe alles beweegt.",
      items: ["Websites & landingspagina's", "Ontwerp in Figma", "Structuur & gebruiksgemak", "Animaties"],
    },
    {
      title: "Development",
      text: "Snelle websites die er op elk scherm goed uitzien, in WordPress of Next.js.",
      items: ["Next.js & React", "WordPress", "Responsive op elk scherm", "Snel & goed vindbaar"],
    },
  ],

  tools: [
    "Figma",
    "HTML & CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "GSAP",
    "WordPress",
  ],
  toolsNote: "En er komt steeds meer bij: ik leer graag nieuwe talen en technieken, zodat ik meer kan maken.",

  experience: [
    { period: "aug. 2025 — jan. 2026", role: "Stage softwareontwikkelaar", company: "Questo", place: "Veldhoven" },
    { period: "mei 2023 — nu", role: "Productiemedewerker (parttime)", company: "Verma Warehouse Experts", place: "Veldhoven" },
    { period: "okt. 2022 — jul. 2023", role: "Vakkenvuller (parttime)", company: "Albert Heijn", place: "Veldhoven" },
    { period: "okt. 2021 — aug. 2022", role: "Postbode (parttime)", company: "Spotta", place: "Veldhoven" },
  ] as Entry[],

  education: [
    { period: "Straks", role: "HBO ICT, versneld traject (instroom jaar 2)", company: "Fontys", place: "" },
    { period: "Nu", role: "MBO ICT, niveau 4", company: "Summa College", place: "" },
  ] as Entry[],
};