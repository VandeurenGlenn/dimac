export type RouteMeta = {
  title: string
  description: string
  path: string
}

export const routeMeta: Record<string, RouteMeta> = {
  home: {
    title: 'Aannemer in Diest | Totaalrenovatie & Woningscan | Dimac',
    description:
      'Dimac is uw aannemer in regio Diest voor totaalrenovaties en nieuwbouw. Start met een woningscan en krijg duidelijkheid voor u verbouwt.',
    path: '/'
  },
  about: {
    title: 'Over Dimac | Aannemer regio Diest | Dimac',
    description:
      'Leer Dimac kennen als lokale bouwpartner voor renovatie, nieuwbouw en technieken in regio Diest, met een duidelijke aanpak en één aanspreekpunt.',
    path: '/about'
  },
  services: {
    title: 'Aannemer Diest | Renovatie en bouw van A tot Z | Dimac',
    description:
      'Dimac realiseert renovatie, nieuwbouw, technieken en afwerking in regio Diest. Eén aanspreekpunt voor uw volledige project.',
    path: '/services'
  },
  woningscan: {
    title: 'Woningscan regio Diest | Inzicht vóór renovatie of aankoop | Dimac',
    description:
      'Laat een woningscan uitvoeren door Dimac in ruime regio Diest. Inclusief rapport, concreet advies en verrekening bij uitvoering.',
    path: '/woningscan'
  },
  totaalrenovatie: {
    title: 'Totaalrenovatie Diest | Renovatie van A tot Z | Dimac',
    description:
      'Dimac realiseert totaalrenovaties in regio Diest. Van afbraak tot afwerking met één aanspreekpunt en duidelijke aanpak.',
    path: '/totaalrenovatie'
  },
  nieuwbouw: {
    title: 'Nieuwbouw Diest | Woning bouwen van A tot Z | Dimac',
    description:
      'Dimac realiseert nieuwbouwwoningen in regio Diest. Van fundering tot afwerking met één aanspreekpunt en duidelijke aanpak.',
    path: '/nieuwbouw'
  },
  badkamerrenovatie: {
    title: 'Badkamer renovatie Diest | Volledige renovatie van A tot Z | Dimac',
    description:
      'Dimac realiseert badkamer renovaties in regio Diest. Van leidingen tot afwerking met één aanspreekpunt en kwalitatieve uitvoering.',
    path: '/badkamerrenovatie'
  },
  keukenrenovatie: {
    title: 'Keuken renovatie Diest | Volledige keukenrenovatie | Dimac',
    description:
      'Dimac realiseert keuken renovaties in regio Diest. Van voorbereiding tot afwerking met één aanspreekpunt en functionele oplossingen.',
    path: '/keukenrenovatie'
  },
  elektriciteit: {
    title: 'Elektriciteit in renovatie en nieuwbouw | Dimac Diest',
    description:
      'Dimac integreert elektriciteit binnen bouw- en renovatieprojecten in regio Diest, correct afgestemd binnen het geheel.',
    path: '/elektriciteit'
  },
  sanitair: {
    title: 'Sanitair in renovatie en nieuwbouw | Dimac Diest',
    description:
      'Dimac integreert sanitair binnen bouw- en renovatieprojecten in regio Diest, correct afgestemd binnen het geheel.',
    path: '/sanitair'
  },
  werkwijze: {
    title: 'Werkwijze Dimac | Van analyse tot oplevering | Dimac',
    description:
      'Ontdek hoe Dimac renovatie- en bouwprojecten in regio Diest aanpakt: van eerste analyse en woningscan tot uitvoering en oplevering.',
    path: '/werkwijze'
  },
  reviews: {
    title: 'Reviews Dimac | Ervaringen van klanten | Dimac',
    description:
      'Lees hoe klanten Dimac ervaren voor renovatie, badkamers, keukens en totaalprojecten in regio Diest.',
    path: '/reviews'
  },
  technieken: {
    title: 'Technieken in renovatie en nieuwbouw | Dimac Diest',
    description:
      'Dimac bundelt elektriciteit, sanitair en energiezuinige technieken binnen één renovatie- of nieuwbouwtraject in regio Diest.',
    path: '/technieken'
  },
  dakwerken: {
    title: 'Dakwerken Diest | Renovatie en herstelling | Dimac',
    description:
      'Dimac voert dakwerken uit in regio Diest, van renovatie en herstelling tot isolatie en afwerking van platte en hellende daken.',
    path: '/dakwerken'
  },
  'hernieuwbare-energie': {
    title: 'Hernieuwbare energie Diest | Energiezuinige installaties | Dimac',
    description:
      'Dimac integreert hernieuwbare energie in bouw- en renovatieprojecten in regio Diest, met oog voor rendement en correcte afstemming.',
    path: '/hernieuwbare-energie'
  },
  afwerking: {
    title: 'Afwerking woning Diest | Gyproc, schilder en vloerwerken | Dimac',
    description:
      'Dimac verzorgt de afwerking van woningen in regio Diest, van gyproc en schilderwerken tot vloeren en detailafwerking.',
    path: '/afwerking'
  },
  gyprocwerken: {
    title: 'Gyproc werken Diest | Strakke binnenafwerking | Dimac',
    description:
      'Dimac realiseert gyproc werken in regio Diest voor plafonds, scheidingswanden en nette binnenafwerking.',
    path: '/gyprocwerken'
  },
  schilderwerken: {
    title: 'Schilderwerken Diest | Verzorgde afwerking | Dimac',
    description:
      'Dimac verzorgt schilderwerken in regio Diest met aandacht voor voorbereiding, detail en een duurzaam eindresultaat.',
    path: '/schilderwerken'
  },
  vloerwerken: {
    title: 'Vloerwerken Diest | Tegels, vinyl en parket | Dimac',
    description:
      'Dimac realiseert vloerwerken in regio Diest voor renovatie en nieuwbouw, met correcte plaatsing en verzorgde afwerking.',
    path: '/vloerwerken'
  },
  realizations: {
    title: 'Realisaties regio Diest | Renovatieprojecten | Dimac',
    description:
      'Bekijk realisaties van Dimac in regio Diest en ontdek hoe renovatie, technieken en afwerking samenkomen in echte projecten.',
    path: '/realizations'
  },
  contact: {
    title: 'Contacteer Dimac | Offerte of woningscan | Dimac',
    description:
      'Vraag een offerte aan of plan een woningscan bij Dimac. Actief in en rond Diest voor renovatie, bouw en technieken.',
    path: '/contact'
  },
  'aannemer-diest': {
    title: 'Aannemer Diest | Renovatie en bouw op maat | Dimac',
    description:
      'Op zoek naar een aannemer in Diest? Dimac begeleidt totaalrenovaties, nieuwbouw en technische werken met één aanspreekpunt.',
    path: '/aannemer-diest'
  },
  'aannemer-herk-de-stad': {
    title: 'Aannemer Herk-de-Stad | Renovatie en totaalprojecten | Dimac',
    description:
      'Dimac begeleidt renovatie- en bouwprojecten in Herk-de-Stad met duidelijke opvolging, technische coördinatie en kwalitatieve uitvoering.',
    path: '/aannemer-herk-de-stad'
  },
  'aannemer-paal': {
    title: 'Aannemer Paal | Renovatie en bouwprojecten | Dimac',
    description:
      'Dimac is actief in Paal voor renovatie, nieuwbouw, badkamers, keukens en technieken met één vast aanspreekpunt.',
    path: '/aannemer-paal'
  },
  admin: {
    title: 'Dimac Admin',
    description: 'Beheeromgeving voor Dimac.',
    path: '/admin'
  },
  'keepit-preview': {
    title: 'Dimac Preview',
    description: 'Preview omgeving voor Dimac.',
    path: '/keepit-preview'
  }
}
