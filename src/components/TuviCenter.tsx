import React from 'react';
import { getCanColor, getChiColor, getNapAmColor } from '../utils/lunar';
import { CachCuc } from '../utils/cachcuc';

interface CenterDataProps {
  centerData: {
    name: string;
    gender: string;
    age: number;
    viewYear: string;
    chuMenh?: string;
    chuThan?: string;
    luuDaiVan?: string;
    solarDate: string;
    lunarDate: string;
    batTu: string;
    menhNapAm: string;
    cucName: string;
    cachCuc?: CachCuc[];
  };
  onCachCucClick: (cc: CachCuc) => void;
  theme?: any;
}

export const TuviCenter = React.memo(({ centerData, onCachCucClick, theme }: CenterDataProps) => {
  const textColor = theme?.textColor || 'text-black';
  const subTextColor = theme?.textColor ? 'opacity-70' : 'text-gray-500';

  return (
    <div 
      className={`col-span-2 row-span-2 relative z-0 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 text-center border border-gray-200 ${theme?.cellBackgroundColor ? '' : 'bg-white'}`}
      style={theme?.cellBackgroundColor ? { backgroundColor: theme.cellBackgroundColor } : {}}
    >
      {/* Center Info Area */}
      <div className="w-full h-full flex flex-col justify-center items-center space-y-1 sm:space-y-3 md:space-y-4 overflow-y-auto hide-scrollbar">
        
        <div className="space-y-1">
          <h2 className={`text-size-11 font-sans font-bold uppercase tracking-widest`} style={{ color: theme?.textColor || 'black' }}>
            {centerData.name || 'CHƯA NHẬP TÊN'}
          </h2>
          <div className={`text-size-9 font-mono uppercase tracking-widest ${subTextColor}`} style={theme?.textColor ? { color: theme.textColor } : {}}>
            {centerData.gender} - {centerData.age} tuổi
          </div>
          <div className={`text-size-9 font-mono uppercase tracking-widest ${subTextColor}`} style={theme?.textColor ? { color: theme.textColor } : {}}>
            Năm xem: {centerData.viewYear}
          </div>
          <div className={`text-size-9 font-mono uppercase tracking-widest ${subTextColor}`} style={theme?.textColor ? { color: theme.textColor } : {}}>
            Chủ Mệnh: {centerData.chuMenh} - Chủ Thân: {centerData.chuThan}
          </div>
          {centerData.luuDaiVan && (
            <div className={`text-size-9 font-mono uppercase tracking-widest ${subTextColor}`} style={theme?.textColor ? { color: theme.textColor } : {}}>
              {centerData.luuDaiVan}
            </div>
          )}
        </div>

        <div className="w-12 h-px" style={{ backgroundColor: theme?.textColor || 'black' }}></div>

        <div className={`grid grid-cols-2 gap-x-2 md:gap-x-8 gap-y-0.5 md:gap-y-2 text-size-9 font-mono`} style={{ color: theme?.textColor || 'black' }}>
          <div className={`${subTextColor} capitalize`}>Dương lịch:</div>
          <div className="text-left">{centerData.solarDate}</div>
          
          <div className={`${subTextColor} capitalize`}>Âm lịch:</div>
          <div className="text-left">{centerData.lunarDate}</div>
        </div>

        <div className="w-12 h-px" style={{ backgroundColor: theme?.textColor || 'black' }}></div>

        <div className="text-size-11 font-mono font-bold tracking-wide capitalize flex gap-1">
          {centerData.batTu.split(' - ').map((part, idx) => {
            const [can, chi] = part.split(' ');
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span style={{ color: theme?.textColor || 'black' }}>-</span>}
                <span>
                  <span style={{ color: getCanColor(can, theme?.elementColors) }}>{can.toLowerCase()}</span>{' '}
                  <span style={{ color: getChiColor(chi, theme?.elementColors) }}>{chi.toLowerCase()}</span>
                </span>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex gap-3 text-size-9 font-mono font-medium border px-3 py-1.5 rounded" style={{ borderColor: theme?.textColor || 'black' }}>
          <div className="capitalize" style={{ color: getNapAmColor(centerData.menhNapAm, theme?.elementColors) }}>{centerData.menhNapAm.toLowerCase()}</div>
          <div className="w-px" style={{ backgroundColor: theme?.textColor || 'black' }}></div>
          <div className="capitalize" style={{ color: theme?.textColor || 'black' }}>{centerData.cucName.toLowerCase()}</div>
        </div>

        {centerData.cachCuc && centerData.cachCuc.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {centerData.cachCuc.map((cc, idx) => (
              <button
                key={idx}
                onClick={() => onCachCucClick(cc)}
                className={`text-size-8 px-2 py-0.5 rounded font-sans font-bold uppercase tracking-tighter transition-colors ${
                  cc.type === 'cat' 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {cc.name}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
});
