import { useState, useRef, useCallback } from 'react';
import { AETHERMOOR, type Territory } from '../data/mapData';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface FantasyMapProps {
  onTerritorySelect?: (territory: Territory) => void;
  selectedTerritory?: string | null;
  highlightedTerritories?: string[];
}

const CITY_COLORS: Record<string, string> = {
  capital: '#fbbf24',
  town: '#e2e8f0',
  fortress: '#f87171',
  port: '#38bdf8',
};

export default function FantasyMap({ onTerritorySelect, selectedTerritory, highlightedTerritories = [] }: FantasyMapProps) {
  const [hoveredTerritory, setHoveredTerritory] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; territory: Territory } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(z => Math.min(z * 1.4, 5));
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.4, 0.5));
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(z => Math.min(Math.max(z * delta, 0.5), 5));
  }, []);

  const handleTerritoryHover = (territory: Territory, e: React.MouseEvent) => {
    setHoveredTerritory(territory.id);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10,
        territory,
      });
    }
  };

  const handleTerritoryLeave = () => {
    setHoveredTerritory(null);
    setTooltip(null);
  };

  const handleTerritoryClick = (territory: Territory) => {
    onTerritorySelect?.(territory);
  };

  const getTerritoryOpacity = (territory: Territory) => {
    if (selectedTerritory === territory.id) return 1;
    if (hoveredTerritory === territory.id) return 0.9;
    if (highlightedTerritories.length > 0 && highlightedTerritories.includes(territory.id)) return 0.85;
    if (highlightedTerritories.length > 0) return 0.4;
    return 0.7;
  };

  const getTerritoryStroke = (territory: Territory) => {
    if (selectedTerritory === territory.id) return '#fbbf24';
    if (hoveredTerritory === territory.id) return '#ffffff';
    return 'rgba(0,0,0,0.6)';
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
      {/* Map Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
        <button onClick={handleZoomIn} className="p-2 bg-slate-900/90 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors backdrop-blur-sm">
          <ZoomIn size={16} />
        </button>
        <button onClick={handleZoomOut} className="p-2 bg-slate-900/90 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors backdrop-blur-sm">
          <ZoomOut size={16} />
        </button>
        <button onClick={handleReset} className="p-2 bg-slate-900/90 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors backdrop-blur-sm">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-3 left-3 z-20 px-2 py-1 bg-slate-900/80 border border-slate-700 rounded text-[10px] text-slate-400 font-mono backdrop-blur-sm">
        {Math.round(zoom * 100)}%
      </div>

      {/* Region label */}
      <div className="absolute top-3 left-3 z-20">
        <h3 className="text-sm font-bold text-slate-300 tracking-wide">{AETHERMOOR.name}</h3>
        <p className="text-[10px] text-slate-500">{AETHERMOOR.territories.length} territories</p>
      </div>

      {/* SVG Map */}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 520"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          transition: isPanning ? 'none' : 'transform 0.1s ease-out',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <defs>
          {/* Ocean pattern */}
          <pattern id="oceanPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#0c1929" />
            <circle cx="20" cy="20" r="0.5" fill="#1e3a5f" opacity="0.3" />
            <circle cx="5" cy="10" r="0.3" fill="#1e3a5f" opacity="0.2" />
            <circle cx="35" cy="30" r="0.4" fill="#1e3a5f" opacity="0.25" />
          </pattern>

          {/* Grid lines */}
          <pattern id="gridPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" strokeWidth="0.3" opacity="0.3" />
          </pattern>

          {/* Glow filter for selected territories */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Drop shadow for territory labels */}
          <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.8" />
          </filter>

          {/* Compass rose gradient */}
          <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ocean background */}
        <rect x="0" y="0" width="1000" height="520" fill="url(#oceanPattern)" />
        <rect x="0" y="0" width="1000" height="520" fill="url(#gridPattern)" />

        {/* Bathymetry lines (depth contours) */}
        {[50, 120, 200, 300].map((offset, i) => (
          <ellipse
            key={i}
            cx="500"
            cy="260"
            rx={450 - offset}
            ry={240 - offset * 0.5}
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="0.5"
            opacity={0.15 + i * 0.05}
          />
        ))}

        {/* Territories */}
        {AETHERMOOR.territories.map((territory) => (
          <g key={territory.id}>
            {/* Territory shape */}
            <path
              d={territory.path}
              fill={territory.color}
              fillOpacity={getTerritoryOpacity(territory)}
              stroke={getTerritoryStroke(territory)}
              strokeWidth={selectedTerritory === territory.id ? 2.5 : hoveredTerritory === territory.id ? 2 : 1}
              filter={selectedTerritory === territory.id ? 'url(#glow)' : undefined}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={(e) => handleTerritoryHover(territory, e)}
              onMouseLeave={handleTerritoryLeave}
              onClick={() => handleTerritoryClick(territory)}
            />

            {/* Territory name label */}
            <text
              x={territory.label.x}
              y={territory.label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={territory.name.length > 16 ? 8 : 9.5}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              filter="url(#textShadow)"
              className="pointer-events-none select-none"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            >
              {territory.name}
            </text>

            {/* Cities */}
            {territory.cities.map((city, ci) => {
              const color = CITY_COLORS[city.type];
              return (
                <g key={ci}>
                  {/* City dot */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={city.type === 'capital' ? 4 : 2.5}
                    fill={color}
                    stroke="#000"
                    strokeWidth="0.8"
                    className="pointer-events-none"
                  />
                  {/* City name */}
                  <text
                    x={city.x + (city.x > 500 ? 6 : -6)}
                    y={city.y - 6}
                    textAnchor={city.x > 500 ? 'start' : 'end'}
                    fill={color}
                    fontSize="6"
                    fontWeight="500"
                    fontFamily="system-ui, sans-serif"
                    filter="url(#textShadow)"
                    className="pointer-events-none select-none"
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </g>
        ))}

        {/* Compass Rose */}
        <g transform="translate(930, 460)">
          <circle cx="0" cy="0" r="28" fill="url(#compassGlow)" />
          <circle cx="0" cy="0" r="22" fill="none" stroke="#475569" strokeWidth="0.5" />
          <line x1="0" y1="-20" x2="0" y2="20" stroke="#94a3b8" strokeWidth="0.8" />
          <line x1="-20" y1="0" x2="20" y2="0" stroke="#94a3b8" strokeWidth="0.8" />
          <polygon points="0,-18 -4,-6 4,-6" fill="#fbbf24" />
          <polygon points="0,18 -4,6 4,6" fill="#64748b" />
          <text x="0" y="-24" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold" fontFamily="system-ui">N</text>
          <text x="0" y="32" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="system-ui">S</text>
          <text x="28" y="3" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="system-ui">E</text>
          <text x="-28" y="3" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="system-ui">W</text>
        </g>

        {/* Scale bar */}
        <g transform="translate(30, 490)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#64748b" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#64748b" strokeWidth="1" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke="#64748b" strokeWidth="1" />
          <text x="40" y="12" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="system-ui">500 leagues</text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 shadow-xl backdrop-blur-sm min-w-[180px]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tooltip.territory.color }} />
              <span className="text-xs font-bold text-white">{tooltip.territory.name}</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">{tooltip.territory.description}</p>
            <div className="flex gap-3 mt-1.5 text-[10px] text-slate-500">
              <span>Pop: {tooltip.territory.population}</span>
              <span>Gov: {tooltip.territory.government}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
