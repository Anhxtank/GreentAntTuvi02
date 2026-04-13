import React, { useState } from 'react';
import { THAP_NHI_HUYEN_DO, getLayoutName, getEncounterMeaning } from '../utils/thapNhiHuyenDo';
import { STAR_MEANINGS } from '../utils/starMeanings';
import { ChartTheme } from './TuviChart';
import { ELEMENT_COLORS, getStarElement } from '../utils/lunar';
import { X } from 'lucide-react';

const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

interface Props {
  stars: string[][];
  theme: ChartTheme;
  selectedStar: { name: string; chi: number };
  daiVan: string[];
}

export const ThapNhiHuyenDoWidget: React.FC<Props> = ({ stars, theme, selectedStar, daiVan }) => {
  const [zoomedView, setZoomedView] = useState<number | 'center' | null>(null);

  const tuViPos = stars.findIndex(cellStars => cellStars.some(s => s.startsWith('Tử Vi')));
  if (tuViPos === -1) return null;

  const layoutName = getLayoutName(tuViPos);

  if (!layoutName || !THAP_NHI_HUYEN_DO[layoutName]?.[selectedStar.name]) {
    return null;
  }

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

  const selectedCellStars = stars[selectedStar.chi] || [];
  const selectedMajorStars = selectedCellStars
    .map(s => s.split(' (')[0].trim())
    .filter(s => STAR_MEANINGS[s]);

  const bgColor = ELEMENT_COLORS[getStarElement(selectedStar.name)];

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

  return (
    <div 
      className="rounded-xl p-5 shadow-sm border font-sans relative"
      style={{ 
        backgroundColor: bgColor,
        borderColor: 'rgba(0,0,0,0.1)'
      }}
    >
      <div className="text-sm font-bold text-white uppercase tracking-widest mb-1 text-center font-sans">
        THẬP NHỊ HUYỀN ĐỒ
      </div>
      <div className="text-xs font-bold text-white/80 uppercase tracking-widest mb-4 text-center border-b border-white/20 pb-2">
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
            <div key={group.stars.join('-')} className={idx > 0 ? "pt-4 border-t border-white/20" : ""}>
              {selectedMajorStars.length > 1 && (
                <div className="text-[10px] font-bold text-white/90 uppercase tracking-widest font-sans mb-3 text-center">
                  {group.stars.join(' - ')}
                </div>
              )}
              {group.hung && group.cat !== group.hung ? (
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest font-sans">Cát / Thuận</div>
                    <div className="text-sm text-white font-medium leading-relaxed">
                      {group.cat}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 border-l border-white/20 pl-5">
                    <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest text-right font-sans">Hung / Nghịch</div>
                    <div className="text-sm text-white font-medium leading-relaxed text-right">
                      {group.hung}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 items-center text-center">
                  <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest font-sans">Chủ Về</div>
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
      <div className="grid grid-cols-4 grid-rows-4 gap-1 aspect-square bg-black/10 p-1 rounded-lg relative">
        {[5, 6, 7, 8, 4, 9, 3, 10, 2, 1, 0, 11].map(chi => {
          const pos = getGridPos(chi);
          const cellStars = stars[chi] || [];
          const majorStars = cellStars
            .map(s => s.split(' (')[0].trim())
            .filter(s => STAR_MEANINGS[s]);
          const isSelected = zoomedView === chi;
          
          let hasConclusion = false;
          if (majorStars.length > 0) {
            hasConclusion = selectedMajorStars.some(baseStar => {
              const data = getEncounterMeaning(layoutName, baseStar, majorStars);
              return data && (data.cat?.trim() || data.hung?.trim());
            });
          }
          
          return (
            <div 
              key={chi}
              onClick={() => hasConclusion ? setZoomedView(chi) : undefined}
              className={`flex flex-col items-center justify-start p-1 border rounded transition-colors ${
                hasConclusion 
                  ? 'cursor-pointer bg-white/10 border-white/20 hover:bg-white/30' 
                  : 'bg-black/5 border-white/5 opacity-60'
              } ${isSelected ? 'ring-2 ring-white' : ''}`}
              style={{ gridColumn: pos.col, gridRow: pos.row }}
            >
              <div className="text-[7px] text-white/70 uppercase font-sans">{daiVan[chi]}</div>
              <div className="flex flex-col items-center gap-0.5 mt-0.5 w-full">
                {majorStars.length > 0 ? (() => {
                  const combinedStars = majorStars.join(' - ');
                  const encounterData = getEncounterMeaning(layoutName, selectedStar.name, majorStars);
                  return (
                    <div className="flex flex-col items-center w-full">
                      <div className="text-[8px] font-bold text-white uppercase text-center leading-tight font-sans">
                        {combinedStars}
                      </div>
                      {encounterData && (encounterData.cat?.trim() || encounterData.hung?.trim()) && (
                        (!encounterData.hung || encounterData.cat === encounterData.hung) ? (
                          <div className="flex w-full justify-center mt-0.5 px-0.5">
                            <div className="text-[6px] text-white/90 text-center leading-none w-full font-sans">
                              <span className="text-[5px] text-white/50 block mb-0.5">CHỦ VỀ</span>
                              {encounterData.cat}
                            </div>
                          </div>
                        ) : (
                          <div className="flex w-full justify-between mt-0.5 px-0.5">
                            <div className="text-[6px] text-white/90 text-left leading-none w-1/2 pr-0.5 border-r border-white/20 font-sans">
                              <span className="text-[5px] text-white/50 block mb-0.5">CÁT</span>
                              {encounterData.cat}
                            </div>
                            <div className="text-[6px] text-white/90 text-right leading-none w-1/2 pl-0.5 font-sans">
                              <span className="text-[5px] text-white/50 block mb-0.5">HUNG</span>
                              {encounterData.hung}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  );
                })() : (
                  <div className="flex flex-col items-center w-full mt-1">
                    <div className="text-[7px] font-medium text-white/50 uppercase text-center leading-tight font-sans">
                      VÔ CHÍNH DIỆU
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Center Area of Mini Chart */}
        <div 
          className="col-span-2 row-span-2 col-start-2 row-start-2 flex flex-col items-center justify-center text-center p-1 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors rounded"
          onClick={() => setZoomedView('center')}
        >
          <div className="flex flex-col gap-1 w-full h-full justify-center">
            {Object.values(groupedMiniChartMeanings).map((group, idx) => {
              const displayTitle = group.title || group.stars.join(' - ');
              return (
                <div key={group.stars.join('-')} className={`flex flex-col items-center w-full ${idx > 0 ? 'pt-1.5 border-t border-white/20 mt-1' : ''}`}>
                  <div className="text-[8px] font-bold text-white uppercase tracking-widest mb-1 w-full whitespace-pre-line font-sans leading-tight">
                    {displayTitle}
                  </div>
                  {group.hung && group.cat !== group.hung ? (
                    <div className="grid grid-cols-[1fr_1px_1fr] w-full gap-1.5 items-start">
                      <div className="flex flex-col items-center">
                        <div className="text-[5px] text-white/50 uppercase font-sans mb-0.5">CÁT</div>
                        <div className="text-[6px] text-white uppercase leading-tight font-sans text-center line-clamp-2">
                          {group.cat}
                        </div>
                      </div>
                      <div className="w-px h-full bg-white/20 self-stretch"></div>
                      <div className="flex flex-col items-center">
                        <div className="text-[5px] text-white/50 uppercase font-sans mb-0.5">HUNG</div>
                        <div className="text-[6px] text-white uppercase leading-tight font-sans text-center line-clamp-2">
                          {group.hung}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-[5px] text-white/50 uppercase font-sans mb-0.5">CHỦ VỀ</div>
                      <div className="text-[6px] text-white uppercase leading-tight font-sans text-center line-clamp-2">
                        {group.cat}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedView !== null && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setZoomedView(null)}
        >
          <div 
            className="rounded-2xl w-full max-w-md shadow-2xl border animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col font-sans"
            style={{ backgroundColor: bgColor, borderColor: 'rgba(255,255,255,0.2)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/20 flex justify-between items-center bg-black/20">
              <h3 className="font-bold text-white uppercase tracking-widest text-sm">
                {zoomedView === 'center' ? 'Nội Dung Trung Cung' : `Cung ${BRANCHES[zoomedView]} - Đại vận ${daiVan[zoomedView]}`}
              </h3>
              <button onClick={() => setZoomedView(null)} className="text-white/60 hover:text-white p-1">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh] bg-black/10">
              {zoomedView === 'center' ? (
                <div className="flex flex-col gap-6">
                  {Object.values(groupedMiniChartMeanings).map((group, idx) => {
                    const displayTitle = group.title || group.stars.join(' - ');
                    return (
                      <div key={group.stars.join('-')} className={`flex flex-col items-center w-full ${idx > 0 ? 'pt-6 border-t border-white/20' : ''}`}>
                        <div className="text-sm font-bold text-white uppercase tracking-widest mb-4 w-full whitespace-pre-line font-sans text-center">
                          {displayTitle}
                        </div>
                        {group.hung && group.cat !== group.hung ? (
                          <div className="grid grid-cols-2 w-full gap-6 items-start">
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-white/50 uppercase font-bold font-sans mb-2">CÁT / THUẬN</div>
                              <div className="text-sm text-white leading-relaxed font-sans text-center">
                                {group.cat}
                              </div>
                            </div>
                            <div className="flex flex-col items-center border-l border-white/20 pl-6">
                              <div className="text-xs text-white/50 uppercase font-bold font-sans mb-2">HUNG / NGHỊCH</div>
                              <div className="text-sm text-white leading-relaxed font-sans text-center">
                                {group.hung}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className="text-xs text-white/50 uppercase font-bold font-sans mb-2">CHỦ VỀ</div>
                            <div className="text-sm text-white leading-relaxed font-sans text-center">
                              {group.cat}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {(() => {
                    const cellStars = stars[zoomedView] || [];
                    const majorStars = cellStars
                      .map(s => s.split(' (')[0].trim())
                      .filter(s => STAR_MEANINGS[s]);
                    
                    const combinedStars = majorStars.join(' - ');
                    const combinedBaseStars = selectedMajorStars.join(' - ');
                    const baseStarForLookup = selectedMajorStars[0];
                    
                    const encounterData = getEncounterMeaning(layoutName, baseStarForLookup, majorStars);
                    if (!encounterData || (!encounterData.cat?.trim() && !encounterData.hung?.trim())) return null;
                    
                    return (
                      <div key={combinedBaseStars} className="bg-white/10 p-5 rounded-xl border border-white/10">
                        <div className="text-sm font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-3 text-center">
                          {combinedBaseStars} gặp {combinedStars}
                        </div>
                        {(!encounterData.hung || encounterData.cat === encounterData.hung) ? (
                          <div className="flex flex-col gap-2 items-center text-center">
                            <div className="text-xs text-white/50 uppercase font-bold">Chủ về</div>
                            <div className="text-sm text-white leading-relaxed">{encounterData.cat}</div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                              <div className="text-xs text-white/50 uppercase font-bold">Cát / Thuận</div>
                              <div className="text-sm text-white leading-relaxed">{encounterData.cat}</div>
                            </div>
                            <div className="flex flex-col gap-2 border-l border-white/10 pl-5">
                              <div className="text-xs text-white/50 uppercase font-bold text-right">Hung / Nghịch</div>
                              <div className="text-sm text-white leading-relaxed text-right">{encounterData.hung}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
