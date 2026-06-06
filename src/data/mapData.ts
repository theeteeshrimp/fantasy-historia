// Fantasy world map data — stylized strategy-game territories
// Coordinates are in a 1000x600 viewBox

export interface Territory {
  id: string;
  name: string;
  color: string;
  capital: string;
  population: string;
  government: string;
  description: string;
  // SVG path for the territory shape
  path: string;
  // Label position (x, y)
  label: { x: number; y: number };
  // Cities / points of interest
  cities: { name: string; x: number; y: number; type: 'capital' | 'town' | 'fortress' | 'port' }[];
}

export interface MapRegion {
  id: string;
  name: string;
  territories: Territory[];
}

// The main continent — "Aethermoor"
export const AETHERMOOR: MapRegion = {
  id: 'aethermoor',
  name: 'The Continent of Aethermoor',
  territories: [
    {
      id: 'eldoria',
      name: 'Kingdom of Eldoria',
      color: '#6366f1',
      capital: 'Crystalspire',
      population: '2.4M',
      government: 'Constitutional Monarchy',
      description: 'The most powerful human kingdom, ruled from the crystalline towers of Crystalspire. Known for its arcane academies and disciplined legions.',
      path: 'M 120,80 L 200,60 L 280,70 L 320,120 L 310,180 L 260,220 L 200,230 L 140,200 L 100,150 Z',
      label: { x: 205, y: 145 },
      cities: [
        { name: 'Crystalspire', x: 210, y: 130, type: 'capital' },
        { name: 'Ironhold', x: 160, y: 170, type: 'fortress' },
        { name: 'Westmarch', x: 130, y: 110, type: 'town' },
      ],
    },
    {
      id: 'frostmarches',
      name: 'Frostmarch Clans',
      color: '#94a3b8',
      capital: 'Winterheim',
      population: '890K',
      government: 'Tribal Confederation',
      description: 'Hardy northern clans who worship the Frost Father. Their berserker warriors are feared across the continent.',
      path: 'M 280,70 L 380,40 L 460,50 L 500,90 L 490,140 L 440,170 L 380,160 L 320,120 Z',
      label: { x: 400, y: 100 },
      cities: [
        { name: 'Winterheim', x: 410, y: 90, type: 'capital' },
        { name: 'Frostwatch', x: 470, y: 70, type: 'fortress' },
        { name: 'Icehaven', x: 350, y: 60, type: 'town' },
      ],
    },
    {
      id: 'sylvanmere',
      name: 'Sylvanmere Elven Dominion',
      color: '#22c55e',
      capital: 'Aelindra',
      population: '1.1M',
      government: 'Elder Council',
      description: 'Ancient elven forests where the trees themselves are sentient. The elves guard the old magic that predates all civilizations.',
      path: 'M 100,150 L 140,200 L 200,230 L 220,280 L 180,330 L 120,340 L 70,300 L 60,230 Z',
      label: { x: 140, y: 260 },
      cities: [
        { name: 'Aelindra', x: 150, y: 250, type: 'capital' },
        { name: 'Moonwell', x: 110, y: 300, type: 'town' },
        { name: 'Thornwall', x: 190, y: 290, type: 'fortress' },
      ],
    },
    {
      id: 'drakkenheim',
      name: 'Drakkenheim Empire',
      color: '#ef4444',
      capital: 'Ashenspire',
      population: '3.2M',
      government: 'Imperial Autocracy',
      description: 'A militaristic empire of dragon-blooded nobles. Their war-mages ride drakes into battle and their forges never cool.',
      path: 'M 320,120 L 380,160 L 440,170 L 500,200 L 520,260 L 480,310 L 400,320 L 340,280 L 310,180 Z',
      label: { x: 420, y: 230 },
      cities: [
        { name: 'Ashenspire', x: 430, y: 220, type: 'capital' },
        { name: 'Drakegate', x: 490, y: 260, type: 'fortress' },
        { name: 'Emberport', x: 360, y: 270, type: 'port' },
        { name: 'Ironforge', x: 380, y: 190, type: 'town' },
      ],
    },
    {
      id: 'khazmodan',
      name: 'Khazmodan Holds',
      color: '#f59e0b',
      capital: 'Deepdelve',
      population: '1.8M',
      government: 'Clan Meritocracy',
      description: 'Underground dwarven kingdoms rich in mithril and adamantine. Their runemasters craft artifacts of immense power.',
      path: 'M 200,230 L 260,220 L 310,180 L 340,280 L 300,340 L 240,360 L 180,330 L 220,280 Z',
      label: { x: 260, y: 290 },
      cities: [
        { name: 'Deepdelve', x: 260, y: 280, type: 'capital' },
        { name: 'Runeforge', x: 230, y: 330, type: 'town' },
        { name: 'Stonewall', x: 300, y: 310, type: 'fortress' },
      ],
    },
    {
      id: 'verdania',
      name: 'Verdania Free Cities',
      color: '#14b8a6',
      capital: 'Goldhaven',
      population: '1.5M',
      government: 'Merchant Republic',
      description: 'A loose confederation of wealthy city-states that control the southern trade routes. Their fleets dominate the seas.',
      path: 'M 60,230 L 70,300 L 120,340 L 180,330 L 240,360 L 260,420 L 200,460 L 120,450 L 60,400 L 40,320 Z',
      label: { x: 150, y: 380 },
      cities: [
        { name: 'Goldhaven', x: 160, y: 370, type: 'capital' },
        { name: 'Seabreeze', x: 100, y: 420, type: 'port' },
        { name: 'Silkmarket', x: 220, y: 400, type: 'town' },
        { name: 'Brightwater', x: 80, y: 350, type: 'port' },
      ],
    },
    {
      id: 'shadowfen',
      name: 'Shadowfen Wastes',
      color: '#6b21a8',
      capital: 'Duskhollow',
      population: '340K',
      government: 'Warlord Domain',
      description: 'A blighted swampland ruled by necromancers and dark cultists. The undead legions of the Lich-Kings march from here.',
      path: 'M 440,170 L 500,200 L 560,180 L 620,200 L 640,260 L 600,310 L 520,330 L 480,310 L 520,260 Z',
      label: { x: 560, y: 250 },
      cities: [
        { name: 'Duskhollow', x: 560, y: 240, type: 'capital' },
        { name: 'Bonegate', x: 610, y: 220, type: 'fortress' },
        { name: 'Rotmoor', x: 500, y: 290, type: 'town' },
      ],
    },
    {
      id: 'sunfire',
      name: 'Sunfire Sultanate',
      color: '#f97316',
      capital: 'Solara',
      population: '2.1M',
      government: 'Theocratic Sultanate',
      description: 'Desert nomads united under the Sun God\'s chosen. Their fire mages and camel cavalry are unmatched in the wastes.',
      path: 'M 500,90 L 580,60 L 680,70 L 740,110 L 750,180 L 700,220 L 620,200 L 560,180 L 520,160 L 490,140 Z',
      label: { x: 640, y: 140 },
      cities: [
        { name: 'Solara', x: 640, y: 130, type: 'capital' },
        { name: 'Sandspire', x: 710, y: 100, type: 'fortress' },
        { name: 'Oasistown', x: 560, y: 110, type: 'town' },
        { name: 'Duneport', x: 720, y: 170, type: 'port' },
      ],
    },
    {
      id: 'stormreach',
      name: 'Stormreach Isles',
      color: '#0ea5e9',
      capital: 'Tempest Keep',
      population: '670K',
      government: 'Admiralty Council',
      description: 'Island chain ruled by sea-kings and storm-callers. Their navy controls the straits between the continents.',
      path: 'M 780,80 L 840,60 L 900,80 L 920,140 L 880,180 L 820,170 L 780,130 Z',
      label: { x: 850, y: 120 },
      cities: [
        { name: 'Tempest Keep', x: 850, y: 110, type: 'capital' },
        { name: 'Wavebreak', x: 890, y: 150, type: 'port' },
        { name: 'Stormwatch', x: 800, y: 90, type: 'fortress' },
      ],
    },
    {
      id: 'goblinmarch',
      name: 'Goblinmarch',
      color: '#84cc16',
      capital: 'Scrapheap',
      population: '4.5M',
      government: 'Khanate',
      description: 'Vast underground warrens teeming with goblins, hobgoblins, and bugbears. Their numbers are their greatest weapon.',
      path: 'M 340,280 L 400,320 L 480,310 L 520,330 L 540,390 L 480,430 L 400,440 L 340,400 L 300,340 Z',
      label: { x: 430, y: 370 },
      cities: [
        { name: 'Scrapheap', x: 430, y: 360, type: 'capital' },
        { name: 'Tunnelmouth', x: 370, y: 400, type: 'fortress' },
        { name: 'Mushroom Warrens', x: 490, y: 390, type: 'town' },
      ],
    },
  ],
};

export const ALL_TERRITORIES = AETHERMOOR.territories;

export function getTerritoryById(id: string): Territory | undefined {
  return ALL_TERRITORIES.find(t => t.id === id);
}
