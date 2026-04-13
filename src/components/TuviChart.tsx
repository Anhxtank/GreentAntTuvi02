import React, { useState, useEffect } from 'react';
import { getCanColor, getChiColor, getNapAmColor, getStarColor, getStarElement, ELEMENT_COLORS } from '../utils/lunar';
import { STAR_MEANINGS, MINOR_STAR_MEANINGS } from '../utils/starMeanings';
import { HOUSE_EXPLANATIONS, DIEP_DUNG_LABELS, getDiepDungMeaning, TRUC_MEANINGS, getTrucName } from '../utils/houseMeanings';
import { THAP_NHI_HUYEN_DO, getLayoutName, STAR_YIN_YANG, getEncounterMeaning } from '../utils/thapNhiHuyenDo';
import { ScrollPicker } from './ScrollPicker';

import { TuviCell } from './TuviCell';
import { TuviCenter } from './TuviCenter';

const HOUSES = [
  "MỆNH", "HUYNH ĐỆ", "PHU THÊ", "TỬ NỮ", 
  "TÀI BẠCH", "TẬT ÁCH", "THIÊN DI", "GIAO HỮU", 
  "QUAN LỘC", "ĐIỀN TRẠCH", "PHÚC ĐỨC", "PHỤ MẪU"
];

const ANIMALS = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];
const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const CLOCKWISE_HOUSES = [
  "MỆNH", "PHỤ", "PHÚC", "ĐIỀN", 
  "QUAN", "NÔ", "DI", "TẬT", 
  "TÀI", "TỬ", "PHU", "HUYNH"
];

// Coordinates for the inner edges of the cells to prevent lines from overlapping the cells
const getInnerCoord = (chi: number) => {
  switch (chi) {
    case 5: return { x: 26, y: 26 };
    case 6: return { x: 37.5, y: 26 };
    case 7: return { x: 62.5, y: 26 };
    case 8: return { x: 74, y: 26 };
    case 9: return { x: 74, y: 37.5 };
    case 10: return { x: 74, y: 62.5 };
    case 11: return { x: 74, y: 74 };
    case 0: return { x: 62.5, y: 74 };
    case 1: return { x: 37.5, y: 74 };
    case 2: return { x: 26, y: 74 };
    case 3: return { x: 26, y: 62.5 };
    case 4: return { x: 26, y: 37.5 };
    default: return { x: 50, y: 50 };
  }
};

const tamHopGroups = [
  [8, 0, 4],
  [2, 6, 10],
  [5, 9, 1],
  [11, 3, 7]
];

const nhiHopPairs: Record<number, number> = {
  0: 1, 1: 0,   // Tý - Sửu
  2: 11, 11: 2, // Dần - Hợi
  3: 10, 10: 3, // Mão - Tuất
  4: 9, 9: 4,   // Thìn - Dậu
  5: 8, 8: 5,   // Tỵ - Thân
  6: 7, 7: 6    // Ngọ - Mùi
};

const tuTuyetPairs: Record<number, number> = {
  0: 5, 5: 0,   // Tý - Tỵ
  11: 6, 6: 11, // Hợi - Ngọ
  2: 9, 9: 2,   // Dần - Dậu
  3: 8, 8: 3    // Mão - Thân
};

export interface CachCuc {
  name: string;
  description: string;
  type: 'cat' | 'hung' | 'dacthu';
}

export interface HinhTinhResult {
  sao: string;
  yNghia: string;
  matchedBoSao: string[];
  isFromSaoColumn?: boolean;
}

export interface CenterData {
  name: string;
  gender: string;
  solarDate: string;
  lunarDate: string;
  batTu: string;
  menhNapAm: string;
  cucName: string;
  solarTerm: string;
  viewYear: string;
  age: number;
  yearStem?: string;
  chuMenh?: string;
  chuThan?: string;
  luuDaiVan?: string;
  laiNhanPos?: number;
  giapCung?: { name: string; description: string; type: 'cat' | 'hung' | 'dacthu' }[];
  cachCuc?: CachCuc[];
  hinhTinh?: HinhTinhResult[];
  raw?: {
    hour: string;
    minute: string;
  };
  fullChartData?: {
    stars: string[][];
    goodStars: string[][];
    badStars: string[][];
    cellCans: string[];
    cellNapAms: string[];
    daiVan: string[];
    trangSinh: string[];
    tuHoa: string[][];
    tuHoaCung: string[][];
    phiHoa: string[][];
    tuan: number[];
    triet: number[];
    menhPos: number;
    thanPos: number;
    laiNhanPos?: number;
  };
}

export interface ChartTheme {
  backgroundColor: string;
  lineColor: string;
  cellBackgroundColor: string;
  textColor: string;
  elementColors: Record<string, string>;
}

interface TuviChartProps {
  menhPos: number;
  thanPos: number;
  stars: string[][];
  centerData: CenterData;
  cellCans: string[];
  cellNapAms: string[];
  daiVan: string[];
  trangSinh: string[];
  goodStars: string[][];
  badStars: string[][];
  luuGoodStars: string[][];
  luuBadStars: string[][];
  tuHoa: string[][];
  tuHoaCung: string[][];
  phiHoa: string[][];
  nguyetHan: { month: number, canChi: string }[];
  tuan: number[];
  triet: number[];
  daiVanLabels?: string[];
  luuNienLabels?: string[];
  tieuVanLabels?: string[];
  theme?: ChartTheme;
  selectedStar?: { name: string; chi: number } | null;
  onSelectedStarChange?: (star: { name: string; chi: number } | null) => void;
}

export const TuviChart = React.memo(({ 
  menhPos, thanPos, stars, centerData, cellCans, cellNapAms, 
  daiVan, trangSinh, goodStars, badStars, luuGoodStars, luuBadStars, 
  tuHoa, tuHoaCung, phiHoa, nguyetHan, tuan, triet, 
  daiVanLabels, luuNienLabels, tieuVanLabels, theme,
  selectedStar: externalSelectedStar,
  onSelectedStarChange
}: TuviChartProps) => {
  const [selectedChi, setSelectedChi] = useState<number | null>(null);
  const [selectedCachCuc, setSelectedCachCuc] = useState<CachCuc | null>(null);
  const [internalSelectedStar, setInternalSelectedStar] = useState<{ name: string; chi: number } | null>(null);
  const [isStarModalOpen, setIsStarModalOpen] = useState(false);
  
  const selectedStar = externalSelectedStar !== undefined ? externalSelectedStar : internalSelectedStar;
  const setSelectedStar = (star: { name: string; chi: number } | null) => {
    if (onSelectedStarChange) {
      onSelectedStarChange(star);
    } else {
      setInternalSelectedStar(star);
    }
    if (star) {
      setIsStarModalOpen(true);
    } else {
      setIsStarModalOpen(false);
    }
  };

  const [selectedHouseModal, setSelectedHouseModal] = useState<string | null>(null);
  const [selectedDiepDungIdx, setSelectedDiepDungIdx] = useState<number>(0);
  const [selectedMiniCell, setSelectedMiniCell] = useState<number | null>(null);
  const [hoveredChi, setHoveredChi] = useState<number | null>(null);
  const [lapCucPos, setLapCucPos] = useState<number | null>(null);
  const [showHouseDetail, setShowHouseDetail] = useState<boolean>(false);

  // Default to menhPos on mount or when menhPos changes
  useEffect(() => {
    setSelectedChi(menhPos);
  }, [menhPos]);

  const activeChi = hoveredChi !== null ? hoveredChi : selectedChi;

  const activeTamHopGroup = activeChi !== null 
    ? tamHopGroups.find(g => g.includes(activeChi)) || []
    : [];
    
  const activeXungChieu = activeChi !== null ? (activeChi + 6) % 12 : null;
  const activeNhiHop = activeChi !== null ? nhiHopPairs[activeChi] : null;
  const activeTuTuyet = activeChi !== null ? tuTuyetPairs[activeChi] : null;

  const tuViPos = stars.findIndex(cellStars => cellStars.some(s => s.startsWith('Tử Vi')));
  const layoutName = tuViPos !== -1 ? getLayoutName(tuViPos) : null;

  const getGridPos = (chi: number) => {
    switch (chi) {
      case 5: return { col: 1, row: 1 };
      case 6: return { col: 2, row: 1 };
      case 7: return { col: 3, row: 1 };
      case 8: return { col: 4, row: 1 };
      case 9: return { col: 4, row: 2 };
      case 10: return { col: 4, row: 3 };
      case 11: return { col: 4, row: 4 };
      case 0: return { col: 3, row: 4 };
      case 1: return { col: 2, row: 4 };
      case 2: return { col: 1, row: 4 };
      case 3: return { col: 1, row: 3 };
      case 4: return { col: 1, row: 2 };
      default: return { col: 1, row: 1 };
    }
  };

  const renderTuanTriet = () => {
    const pairs = [
      { indices: [0, 1], pos: { left: '50%', top: '87.5%' } },
      { indices: [2, 3], pos: { left: '12.5%', top: '75%' } },
      { indices: [4, 5], pos: { left: '12.5%', top: '25%' } },
      { indices: [6, 7], pos: { left: '50%', top: '12.5%' } },
      { indices: [8, 9], pos: { left: '87.5%', top: '25%' } },
      { indices: [10, 11], pos: { left: '87.5%', top: '75%' } },
    ];

    return pairs.map((pair, idx) => {
      const hasTuan = tuan.includes(pair.indices[0]);
      const hasTriet = triet.includes(pair.indices[0]);
      
      if (!hasTuan && !hasTriet) return null;

      return (
        <div 
          key={`tt-${idx}`}
          className="absolute z-30 flex flex-col gap-0.5 items-center justify-center"
          style={{ 
            left: pair.pos.left, 
            top: pair.pos.top,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {hasTuan && <div className="bg-black text-white text-size-9 px-1 rounded-sm capitalize cursor-help hover:opacity-70 transition-opacity" onClick={(e) => { e.stopPropagation(); setSelectedStar({ name: "Tuần", chi: pair.indices[0] }); }}>Tuần</div>}
          {hasTriet && <div className="bg-black text-white text-size-9 px-1 rounded-sm capitalize cursor-help hover:opacity-70 transition-opacity" onClick={(e) => { e.stopPropagation(); setSelectedStar({ name: "Triệt", chi: pair.indices[0] }); }}>Triệt</div>}
        </div>
      );
    });
  };

  const renderCell = (chi: number) => {
    const houseIdx = (menhPos - chi + 12) % 12;
    const houseName = HOUSES[houseIdx];
    const isThan = chi === thanPos;
    
    const isSelected = chi === selectedChi;
    const isHovered = chi === hoveredChi;
    const isTamHop = activeTamHopGroup.includes(chi);
    const isXungChieu = chi === activeXungChieu;
    const isNhiHop = chi === activeNhiHop;
    const isTuTuyet = chi === activeTuTuyet;
    
    const lapCucIdx = lapCucPos !== null ? (chi - lapCucPos + 12) % 12 : -1;
    const lapCucName = lapCucIdx !== -1 ? CLOCKWISE_HOUSES[lapCucIdx] : null;

    return (
      <TuviCell
        key={chi}
        chi={chi}
        houseName={houseName}
        isThan={isThan}
        cellStars={stars[chi] || []}
        cellGoodStars={goodStars[chi] || []}
        cellBadStars={badStars[chi] || []}
        cellLuuGoodStars={luuGoodStars[chi] || []}
        cellLuuBadStars={luuBadStars[chi] || []}
        cellTuHoa={tuHoa[chi] || []}
        cellTuHoaCung={tuHoaCung[chi] || []}
        cellPhiHoa={phiHoa[chi] || []}
        cellNguyetHan={nguyetHan[chi]}
        isSelected={isSelected}
        isHovered={isHovered}
        isTamHop={isTamHop}
        isXungChieu={isXungChieu}
        isNhiHop={isNhiHop}
        isTuTuyet={isTuTuyet}
        lapCucIdx={lapCucIdx}
        lapCucName={lapCucName}
        lapCucPos={lapCucPos}
        daiVanAge={daiVan[chi]}
        daiVanLabel={daiVanLabels ? daiVanLabels[chi] : undefined}
        luuNienLabel={luuNienLabels ? luuNienLabels[chi] : undefined}
        cellCan={cellCans[chi]}
        cellNapAm={cellNapAms[chi]}
        trangSinh={trangSinh[chi]}
        onSelect={(c: number) => {
          setSelectedChi(c);
          setShowHouseDetail(true);
        }}
        onHover={setHoveredChi}
        onHouseClick={(name: string) => {
          setSelectedHouseModal(name);
          setSelectedDiepDungIdx(0);
        }}
        onLapCucClick={(c: number) => setLapCucPos(c === lapCucPos ? null : c)}
        onStarClick={(name: string, c: number) => {
          if (STAR_MEANINGS[name] || MINOR_STAR_MEANINGS[name]) {
            setSelectedStar({ name, chi: c });
            setSelectedMiniCell(null);
          }
        }}
        onBoSaoClick={() => {}}
      />
    );
  };

  return (
    <div className="relative w-full aspect-square landscape:max-lg:aspect-[4/3] portrait:max-lg:aspect-[3/4] border-2 border-black bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
        {renderCell(5)}
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
        
        {renderCell(4)}
        <TuviCenter centerData={centerData} onCachCucClick={setSelectedCachCuc} />
        {renderCell(9)}
        
        {renderCell(3)}
        {renderCell(10)}
        
        {renderCell(2)}
        {renderCell(1)}
        {renderCell(0)}
        {renderCell(11)}
      </div>

      {renderTuanTriet()}

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {activeTamHopGroup.length === 3 && (
          <g className="animate-in fade-in duration-500">
            {/* Outer glow for depth */}
            <polygon 
              points={`
                ${getInnerCoord(activeTamHopGroup[0]).x}%,${getInnerCoord(activeTamHopGroup[0]).y}% 
                ${getInnerCoord(activeTamHopGroup[1]).x}%,${getInnerCoord(activeTamHopGroup[1]).y}% 
                ${getInnerCoord(activeTamHopGroup[2]).x}%,${getInnerCoord(activeTamHopGroup[2]).y}%
              `}
              fill="rgba(59, 130, 246, 0.03)"
              stroke="rgba(59, 130, 246, 0.15)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            {/* Main animated line */}
            <polygon 
              points={`
                ${getInnerCoord(activeTamHopGroup[0]).x}%,${getInnerCoord(activeTamHopGroup[0]).y}% 
                ${getInnerCoord(activeTamHopGroup[1]).x}%,${getInnerCoord(activeTamHopGroup[1]).y}% 
                ${getInnerCoord(activeTamHopGroup[2]).x}%,${getInnerCoord(activeTamHopGroup[2]).y}%
              `}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="10 5"
              className={`animate-tam-hop transition-all duration-500 ${hoveredChi !== null ? 'stroke-[2.5] opacity-100' : 'opacity-60'}`}
            />
            {/* Vertices dots */}
            {activeTamHopGroup.map(chi => {
              const coord = getInnerCoord(chi);
              return (
                <circle 
                  key={chi}
                  cx={`${coord.x}%`}
                  cy={`${coord.y}%`}
                  r={hoveredChi === chi ? "4" : "3"}
                  fill="#3b82f6"
                  className={`transition-all duration-300 ${hoveredChi !== null ? 'animate-pulse' : ''}`}
                  filter="url(#glow)"
                />
              );
            })}
          </g>
        )}

        {/* Xung Chieu Line */}
        {activeChi !== null && activeXungChieu !== null && (
          <g className="animate-in fade-in duration-500">
            <line 
              x1={`${getInnerCoord(activeChi).x}%`}
              y1={`${getInnerCoord(activeChi).y}%`}
              x2={`${getInnerCoord(activeXungChieu).x}%`}
              y2={`${getInnerCoord(activeXungChieu).y}%`}
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              opacity={hoveredChi !== null ? "0.6" : "0.3"}
              className="transition-opacity duration-300"
            />
          </g>
        )}

        {/* Nhi Hop Line */}
        {activeChi !== null && activeNhiHop !== null && (
          <g className="animate-in fade-in duration-500">
            <line 
              x1={`${getInnerCoord(activeChi).x}%`}
              y1={`${getInnerCoord(activeChi).y}%`}
              x2={`${getInnerCoord(activeNhiHop).x}%`}
              y2={`${getInnerCoord(activeNhiHop).y}%`}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity={hoveredChi !== null ? "0.6" : "0.3"}
              className="transition-opacity duration-300"
            />
          </g>
        )}
      </svg>

      {/* House Detail Modal */}
      {showHouseDetail && selectedChi !== null && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#F5F2ED] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-300 border border-[#E5E2DD] font-sans text-[#1A1A1A]">
            {/* Header */}
            <div className="p-6 flex justify-between items-start border-b border-[#E5E2DD] bg-white/50">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-sans font-bold text-[#1A1A1A]">{ANIMALS[selectedChi]}</div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-[#1A1A1A]">
                    CUNG {HOUSES[(menhPos - selectedChi + 12) % 12]}
                  </h3>
                  <p className="text-xs font-mono uppercase mt-1 text-[#1A1A1A]/60">
                    {cellCans[selectedChi]} {BRANCHES[selectedChi]} - {cellNapAms[selectedChi]}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowHouseDetail(false)}
                className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Meaning Section */}
              <section>
                <h4 className="text-xs font-sans font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-[#E5E2DD] pb-1">Ý nghĩa cung vị</h4>
                <div className="text-sm text-[#1A1A1A] leading-relaxed space-y-3 font-sans font-light italic">
                  <p>{HOUSE_EXPLANATIONS[HOUSES[(menhPos - selectedChi + 12) % 12]]}</p>
                  {(() => {
                    const houseName = HOUSES[(menhPos - selectedChi + 12) % 12];
                    const trucName = getTrucName(houseName);
                    if (trucName && TRUC_MEANINGS[trucName]) {
                      return (
                        <div className="mt-4 pt-4 border-t border-[#E5E2DD]">
                          <strong className="text-[#1A1A1A] block mb-2 text-xs uppercase tracking-wider font-sans font-bold not-italic">{TRUC_MEANINGS[trucName].title}</strong>
                          <p>{TRUC_MEANINGS[trucName].content}</p>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/50 border-t border-[#E5E2DD] flex justify-end">
              <button 
                onClick={() => setShowHouseDetail(false)}
                className="px-8 py-2.5 bg-[#1A1A1A] text-[#F5F2ED] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md font-sans"
              >
                ĐÓNG
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cach Cuc Modal */}
      {selectedCachCuc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className={`rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 font-sans border ${
            selectedCachCuc.type === 'cat' 
              ? 'bg-[#1A1A1A] border-gray-800 text-[#F5F2ED]' 
              : 'bg-[#F5F2ED] border-[#E5E2DD] text-[#1A1A1A]'
          }`}>
            <div className={`p-6 flex justify-between items-start border-b ${
              selectedCachCuc.type === 'cat' ? 'border-white/10 bg-white/5' : 'border-[#E5E2DD] bg-white/50'
            }`}>
              <h3 className="text-sm font-bold uppercase tracking-widest leading-tight font-sans">
                {selectedCachCuc.name}
              </h3>
              <button 
                onClick={() => setSelectedCachCuc(null)}
                className={`p-1 transition-colors ${
                  selectedCachCuc.type === 'cat' 
                    ? 'text-white/40 hover:text-white' 
                    : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-sm font-normal leading-relaxed">
                {selectedCachCuc.description.toLowerCase().replace(/(^\s*\p{L}|[.!?]\s*\p{L})/gu, c => c.toUpperCase())}
              </p>
            </div>
            <div className={`p-6 border-t flex justify-end ${
              selectedCachCuc.type === 'cat' ? 'border-white/10 bg-white/5' : 'border-[#E5E2DD] bg-white/50'
            }`}>
              <button
                onClick={() => setSelectedCachCuc(null)}
                className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md font-sans ${
                  selectedCachCuc.type === 'cat'
                    ? 'bg-[#F5F2ED] text-[#1A1A1A] hover:bg-white'
                    : 'bg-[#1A1A1A] text-[#F5F2ED] hover:bg-black'
                }`}
              >
                ĐÓNG
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Star Meaning Modal */}
      {isStarModalOpen && selectedStar && (STAR_MEANINGS[selectedStar.name] || MINOR_STAR_MEANINGS[selectedStar.name]) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          {STAR_MEANINGS[selectedStar.name] ? (
            <div 
              className="rounded-2xl w-full max-w-md max-h-[90vh] shadow-2xl border animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col font-sans"
              style={{ 
                backgroundColor: ELEMENT_COLORS[getStarElement(selectedStar.name)],
                borderColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <div className="p-6 flex justify-between items-start border-b border-white/10 bg-black/10">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white font-sans leading-tight">
                  CHÍNH TINH: {selectedStar.name} {STAR_YIN_YANG[selectedStar.name] ? `(${STAR_YIN_YANG[selectedStar.name]})` : ''}
                </h3>
                <div className="text-xs font-medium text-white/80 uppercase tracking-wider mt-1.5 font-sans">
                  Hóa khí: {STAR_MEANINGS[selectedStar.name].hoaKhi}
                </div>
                {STAR_MEANINGS[selectedStar.name].haoVi && STAR_MEANINGS[selectedStar.name].vi && (
                  <div className="text-xs font-medium text-white/80 uppercase tracking-wider mt-1 font-sans">
                    Hào {STAR_MEANINGS[selectedStar.name].haoVi} {STAR_MEANINGS[selectedStar.name].vi}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setIsStarModalOpen(false)}
                className="p-1 text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                <div className="text-xs font-bold text-white uppercase tracking-widest mb-4 text-center border-b border-white/10 pb-2 font-sans">
                  Tại cung {HOUSES[(menhPos - selectedStar.chi + 12) % 12]}
                </div>
                
                {HOUSES[(menhPos - selectedStar.chi + 12) % 12] === "TẬT ÁCH" ? (
                  <div className="flex flex-col gap-2 items-center text-center">
                    <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest font-sans">Bộ phận cơ thể</div>
                    <div className="text-sm text-white font-medium leading-relaxed">
                      {[
                        STAR_MEANINGS[selectedStar.name].meanings["TẬT ÁCH"]?.left,
                        STAR_MEANINGS[selectedStar.name].meanings["TẬT ÁCH"]?.right
                      ].filter(Boolean).join(" - ")}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest font-sans">Cát / Thuận</div>
                      <div className="text-sm text-white font-medium leading-relaxed">
                        {STAR_MEANINGS[selectedStar.name].meanings[HOUSES[(menhPos - selectedStar.chi + 12) % 12]]?.left || "---"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 border-l border-white/10 pl-5">
                      <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest text-right font-sans">Hung / Nghịch</div>
                      <div className="text-sm text-white font-medium leading-relaxed text-right">
                        {STAR_MEANINGS[selectedStar.name].meanings[HOUSES[(menhPos - selectedStar.chi + 12) % 12]]?.right || "---"}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thập Nhị Huyền Đồ section */}
              {layoutName && THAP_NHI_HUYEN_DO[layoutName]?.[selectedStar.name] && (() => {
                const selectedCellStars = stars[selectedStar.chi] || [];
                const selectedMajorStars = selectedCellStars
                  .map(s => s.split(' (')[0].trim())
                  .filter(s => STAR_MEANINGS[s]);
                
                return (
                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <div className="text-xs font-bold text-white uppercase tracking-widest mb-4 text-center border-b border-white/10 pb-2 font-sans">
                      {layoutName}
                    </div>
                    
                    {/* Central Meaning */}
                    <div className="flex flex-col gap-4 mb-5">
                      {(() => {
                        const groupedCentralMeanings = selectedMajorStars.reduce((acc, starName) => {
                          const starData = THAP_NHI_HUYEN_DO[layoutName]?.[starName];
                          if (!starData) return acc;
                          const key = `${starData.central.cat}|${starData.central.hung}`;
                          if (!acc[key]) {
                            acc[key] = {
                              stars: [starName],
                              cat: starData.central.cat,
                              hung: starData.central.hung
                            };
                          } else {
                            acc[key].stars.push(starName);
                          }
                          return acc;
                        }, {} as Record<string, { stars: string[], cat: string, hung: string }>);

                        return Object.values(groupedCentralMeanings).map((group, idx) => (
                          <div key={group.stars.join('-')} className={idx > 0 ? "pt-4 border-t border-white/10" : ""}>
                            {selectedMajorStars.length > 1 && (
                              <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest font-sans mb-3 text-center">
                                {group.stars.join(' - ')}
                              </div>
                            )}
                            {group.hung && group.cat !== group.hung ? (
                              <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest font-sans">Cát / Thuận</div>
                                  <div className="text-sm text-white font-medium leading-relaxed">
                                    {group.cat}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2 border-l border-white/10 pl-5">
                                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest text-right font-sans">Hung / Nghịch</div>
                                  <div className="text-sm text-white font-medium leading-relaxed text-right">
                                    {group.hung}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-2 items-center text-center">
                                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest font-sans">Chủ Về</div>
                                <div className="text-sm text-white font-medium leading-relaxed">
                                  {group.cat}
                                </div>
                              </div>
                            )}
                          </div>
                        ));
                      })()}
                    </div>

                    {/* Mini Chart */}
                  <div className="grid grid-cols-4 grid-rows-4 gap-1 aspect-square bg-white/5 p-1 rounded-lg relative">
                    {[5, 6, 7, 8, 4, 9, 3, 10, 2, 1, 0, 11].map(chi => {
                      const pos = getGridPos(chi);
                      const cellStars = stars[chi] || [];
                      const majorStars = cellStars
                        .map(s => s.split(' (')[0].trim())
                        .filter(s => STAR_MEANINGS[s]);
                      const isSelected = selectedMiniCell === chi;
                      
                      return (
                        <div 
                          key={chi}
                          onClick={() => setSelectedMiniCell(chi)}
                          className={`flex flex-col items-center justify-start p-1 border rounded cursor-pointer transition-colors ${
                            isSelected ? 'bg-white/30 border-white' : 'bg-white/10 border-white/20 hover:bg-white/20'
                          }`}
                          style={{ gridColumn: pos.col, gridRow: pos.row }}
                        >
                          <div className="text-[7px] text-white/60 uppercase font-sans">{daiVan[chi]}</div>
                          <div className="flex flex-col items-center gap-0.5 mt-0.5 w-full">
                            {majorStars.length > 0 ? (() => {
                              const combinedStars = majorStars.join(' - ');
                              const encounterData = getEncounterMeaning(layoutName, selectedStar.name, majorStars);
                              return (
                                <div className="flex flex-col items-center w-full">
                                  <div className="text-[8px] font-bold text-white uppercase text-center leading-tight font-sans">
                                    {combinedStars}
                                  </div>
                                  {encounterData && (
                                    (!encounterData.hung || encounterData.cat === encounterData.hung) ? (
                                      <div className="flex w-full justify-center mt-0.5 px-0.5">
                                        <div className="text-[6px] text-white/80 text-center leading-none w-full font-sans">
                                          <span className="text-[5px] text-white/40 block mb-0.5">CHỦ VỀ</span>
                                          {encounterData.cat}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex w-full justify-between mt-0.5 px-0.5">
                                        <div className="text-[6px] text-white/80 text-left leading-none w-1/2 pr-0.5 border-r border-white/20 font-sans">
                                          <span className="text-[5px] text-white/40 block mb-0.5">CÁT</span>
                                          {encounterData.cat}
                                        </div>
                                        <div className="text-[6px] text-white/80 text-right leading-none w-1/2 pl-0.5 font-sans">
                                          <span className="text-[5px] text-white/40 block mb-0.5">HUNG</span>
                                          {encounterData.hung}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              );
                            })() : (
                              <div className="flex flex-col items-center w-full mt-1">
                                <div className="text-[7px] font-medium text-white/40 uppercase text-center leading-tight font-sans">
                                  VÔ CHÍNH DIỆU
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Center Area of Mini Chart */}
                    <div className="col-span-2 row-span-2 col-start-2 row-start-2 flex flex-col items-center justify-center text-center p-1 pointer-events-none overflow-hidden">
                      <div className="flex flex-col gap-1 w-full h-full justify-center">
                        {(() => {
                          const groupedMiniChartMeanings = selectedMajorStars.reduce((acc, starName) => {
                            const starData = THAP_NHI_HUYEN_DO[layoutName]?.[starName];
                            const miniChartData = starData?.miniChart?.[BRANCHES[selectedStar.chi]];
                            
                            const title = miniChartData?.title;
                            const cat = miniChartData?.cat || starData?.central?.cat;
                            const hung = miniChartData?.hung || starData?.central?.hung;
                            
                            if (!cat) return acc;
                            
                            const key = `${title || ''}|${cat}|${hung}`;
                            if (!acc[key]) {
                              acc[key] = {
                                stars: [starName],
                                title: title,
                                cat: cat,
                                hung: hung
                              };
                            } else {
                              acc[key].stars.push(starName);
                            }
                            return acc;
                          }, {} as Record<string, { stars: string[], title?: string, cat: string, hung: string }>);

                          return Object.values(groupedMiniChartMeanings).map((group, idx) => {
                            const displayTitle = group.title || group.stars.join(' - ');
                            return (
                              <div key={group.stars.join('-')} className={`flex flex-col items-center w-full ${idx > 0 ? 'pt-1.5 border-t border-white/10 mt-1' : ''}`}>
                                <div className="text-[8px] font-bold text-white uppercase tracking-widest mb-1 w-full whitespace-pre-line font-sans leading-tight">
                                  {displayTitle}
                                </div>
                                {group.hung && group.cat !== group.hung ? (
                                  <div className="grid grid-cols-[1fr_1px_1fr] w-full gap-1.5 items-start">
                                    <div className="flex flex-col items-center">
                                      <div className="text-[5px] text-white/40 uppercase font-sans mb-0.5">CÁT</div>
                                      <div className="text-[6px] text-white/90 uppercase leading-tight font-sans text-center line-clamp-2">
                                        {group.cat}
                                      </div>
                                    </div>
                                    <div className="w-px h-full bg-white/10 self-stretch"></div>
                                    <div className="flex flex-col items-center">
                                      <div className="text-[5px] text-white/40 uppercase font-sans mb-0.5">HUNG</div>
                                      <div className="text-[6px] text-white/90 uppercase leading-tight font-sans text-center line-clamp-2">
                                        {group.hung}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <div className="text-[5px] text-white/40 uppercase font-sans mb-0.5">CHỦ VỀ</div>
                                    <div className="text-[6px] text-white/90 uppercase leading-tight font-sans text-center line-clamp-2">
                                      {group.cat}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Selected Cell Text */}
                    {selectedMiniCell !== null && (
                      <div className="mt-4 text-center text-xs text-white font-medium italic bg-white/10 p-3 rounded-lg font-sans">
                        {(() => {
                          const cellStars = stars[selectedMiniCell] || [];
                          const majorStars = cellStars
                            .map(s => s.split(' (')[0].trim())
                            .filter(s => STAR_MEANINGS[s]);
                          
                          if (majorStars.length === 0) {
                            return `Đại vận ${daiVan[selectedMiniCell]} Vô Chính Diệu`;
                          }
                          
                          const combinedStars = majorStars.join(' - ');
                          const combinedBaseStars = selectedMajorStars.join(' - ');
                          const baseStarForLookup = selectedMajorStars[0];
                          
                          const encounterData = getEncounterMeaning(layoutName, baseStarForLookup, majorStars);
                          let encounterText = `${combinedBaseStars} gặp ${combinedStars}`;
                          
                          if (encounterData) {
                            if (!encounterData.hung || encounterData.cat === encounterData.hung) {
                              encounterText = `${combinedBaseStars} gặp ${combinedStars} chủ về ${encounterData.cat}`;
                            } else {
                              encounterText = `${combinedBaseStars} gặp ${combinedStars} ${encounterData.cat} hay ${encounterData.hung}?`;
                            }
                          }
                          
                          return (
                            <div className="flex flex-col gap-1">
                              <div className="text-white/60 text-[10px] uppercase not-italic mb-1">Đại vận {daiVan[selectedMiniCell]}</div>
                              <div>{encounterText}</div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="p-6 border-t border-white/10 bg-black/10 flex justify-end">
              <button
                onClick={() => setIsStarModalOpen(false)}
                className="bg-white text-black px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-md font-sans"
              >
                ĐÓNG
              </button>
            </div>
          </div>
          ) : (
            <div 
              className="rounded-2xl w-full max-w-sm max-h-[90vh] shadow-2xl border animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col font-sans"
              style={{ 
                backgroundColor: '#2A2A2A',
                borderColor: 'rgba(255,255,255,0.1)'
              }}
            >
              <div className="p-6 flex justify-between items-start border-b border-white/10 bg-black/20">
                <div className="flex flex-col">
                  <h3 className="text-sm font-sans font-light uppercase tracking-widest text-white leading-tight">
                    PHỤ TINH: <span className="font-bold" style={{ color: getStarColor(selectedStar.name) }}>{selectedStar.name}</span>
                  </h3>
                </div>
                <button 
                  onClick={() => setIsStarModalOpen(false)}
                  className="p-1 text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="text-xs font-sans font-bold text-white uppercase tracking-widest mb-3 text-center border-b border-white/10 pb-2">
                    Ý NGHĨA
                  </div>
                  <div className="text-sm text-white/90 font-sans font-light italic leading-relaxed text-center">
                    {MINOR_STAR_MEANINGS[selectedStar.name]}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end">
                <button
                  onClick={() => setIsStarModalOpen(false)}
                  className="bg-white text-black px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-md font-sans"
                >
                  ĐÓNG
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* House Meaning Modal */}
      {selectedHouseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#F5F2ED] rounded-2xl w-full max-w-md max-h-[90vh] shadow-2xl border border-[#E5E2DD] animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col font-sans text-[#1A1A1A]">
            <div className="p-6 flex justify-between items-start border-b border-[#E5E2DD] bg-white/50">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A] font-sans leading-tight">
                CUNG {selectedHouseModal}
              </h3>
              <button 
                onClick={() => setSelectedHouseModal(null)}
                className="p-1 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Explanation */}
              <div className="bg-white/50 p-5 rounded-xl border border-[#E5E2DD]">
                <p className="text-sm font-sans font-light text-[#1A1A1A] leading-relaxed italic">
                  {HOUSE_EXPLANATIONS[selectedHouseModal] || "---"}
                </p>
              </div>

              {/* Diep Dung Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-center text-[#1A1A1A] border-y border-[#E5E2DD] py-2">
                  CUNG VỊ ĐIỆP DỤNG
                </h4>
                
                <div className="flex flex-col gap-4">
                  <div className="w-full max-w-[200px] mx-auto">
                    <ScrollPicker
                      options={DIEP_DUNG_LABELS.map(l => ({ value: l.value, label: l.label }))}
                      value={selectedDiepDungIdx}
                      onChange={(val) => setSelectedDiepDungIdx(Number(val))}
                    />
                  </div>

                  <div className="bg-[#1A1A1A] text-[#F5F2ED] p-5 rounded-xl shadow-lg min-h-[80px] flex items-center justify-center text-center">
                    <p className="text-xs font-sans font-bold uppercase tracking-widest leading-relaxed">
                      {getDiepDungMeaning(selectedHouseModal, selectedDiepDungIdx)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#E5E2DD] bg-white/50 flex justify-end">
              <button
                onClick={() => setSelectedHouseModal(null)}
                className="bg-[#1A1A1A] text-[#F5F2ED] px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md font-sans"
              >
                ĐÓNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
