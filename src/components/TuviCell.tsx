import React from 'react';
import { getCanColor, getChiColor, getNapAmColor, getStarColor } from '../utils/lunar';
import { BRANCHES } from '../utils/tuvi';
import { STAR_YIN_YANG } from '../utils/thapNhiHuyenDo';

export const UPPERCASE_STARS = ["TẢ PHÙ", "HỮU BẬT", "VĂN XƯƠNG", "VĂN KHÚC", "THIÊN KHÔI", "THIÊN VIỆT", "KÌNH DƯƠNG", "ĐÀ LA", "HỎA TINH", "LINH TINH", "ĐỊA KHÔNG", "ĐỊA KIẾP", "LỘC TỒN"];
const ANIMALS = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];

export const TuviCell = React.memo(({ 
  chi, houseName, isThan, cellStars, cellGoodStars, cellBadStars, cellLuuGoodStars, cellLuuBadStars, 
  cellTuHoa, cellTuHoaCung, cellPhiHoa, cellNguyetHan, 
  isSelected, isHovered, isTamHop, isXungChieu, isNhiHop, isTuTuyet, 
  lapCucIdx, lapCucName, lapCucPos, 
  daiVanAge, daiVanLabel, luuNienLabel, 
  cellCan, cellNapAm, trangSinh, 
  onSelect, onHover, onHouseClick, onLapCucClick, onStarClick, onBoSaoClick,
  theme
}: any) => {
  const isHighlighted = isSelected || isHovered || isTamHop || isXungChieu || isNhiHop || isTuTuyet;
  const isVoChinhDieu = cellStars.length === 0;
  
  let bgColor = theme?.cellBackgroundColor || 'bg-slate-50';
  let borderColor = 'border-gray-300 border-dashed';
  let zIndex = 'z-0';
  let shadow = '';

  if (isSelected) {
    bgColor = theme?.cellBackgroundColor ? 'opacity-90' : 'bg-slate-100';
    borderColor = 'border-black border-dashed';
    zIndex = 'z-20';
    shadow = 'shadow-md scale-[1.02]';
  } else if (isTamHop) {
    bgColor = theme?.cellBackgroundColor ? 'opacity-80' : 'bg-blue-50/50';
    borderColor = 'border-blue-400 border-dashed';
    zIndex = 'z-10';
  } else if (isXungChieu) {
    bgColor = theme?.cellBackgroundColor ? 'opacity-80' : 'bg-red-50/50';
    borderColor = 'border-red-400 border-dashed';
    zIndex = 'z-10';
  } else if (isNhiHop) {
    bgColor = theme?.cellBackgroundColor ? 'opacity-80' : 'bg-emerald-50/50';
    borderColor = 'border-emerald-400 border-dashed';
    zIndex = 'z-10';
  } else if (isTuTuyet) {
    bgColor = theme?.cellBackgroundColor ? 'opacity-80' : 'bg-amber-50/50';
    borderColor = 'border-amber-400 border-dashed';
    zIndex = 'z-10';
  }
  
  const allGoodStars = [
    ...cellGoodStars.map((s: string) => ({ name: s, isLuu: false })),
    ...cellLuuGoodStars.map((s: string) => ({ name: s, isLuu: true }))
  ];
  const allBadStars = [
    ...cellBadStars.map((s: string) => ({ name: s, isLuu: false })),
    ...cellLuuBadStars.map((s: string) => ({ name: s, isLuu: true }))
  ];

  const cellStyle = theme?.cellBackgroundColor ? { backgroundColor: theme.cellBackgroundColor } : {};
  const textColor = theme?.textColor || 'text-black';

  return (
    <div 
      onClick={() => onSelect(chi)}
      onMouseEnter={() => onHover(chi)}
      onMouseLeave={() => onHover(null)}
      className={`flex flex-col relative p-2 cursor-pointer transition-all duration-300 ease-out border ${bgColor} ${borderColor} ${zIndex} ${shadow}`}
      style={cellStyle}
    >
      {/* Top: House Name, Than, Can Chi, Nap Am */}
      <div className={`flex justify-between items-start w-full font-mono leading-tight tracking-tighter transition-opacity duration-300 ${isHighlighted ? `${textColor} opacity-100` : 'text-gray-500 opacity-80'}`}>
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex items-center gap-1">
            <div 
              className={`text-size-11 uppercase cursor-help hover:underline decoration-dotted underline-offset-2 ${isHighlighted ? 'font-bold' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onHouseClick(houseName);
              }}
            >
              {houseName}
            </div>
            <button 
              className={`text-[7px] px-1 py-0.5 rounded-sm font-sans font-bold transition-colors ${
                lapCucPos === chi 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700'
              }`}
              style={lapCucPos === chi && theme?.textColor ? { backgroundColor: theme.textColor, color: theme.backgroundColor } : {}}
              onClick={(e) => {
                e.stopPropagation();
                onLapCucClick(chi);
              }}
            >
              {lapCucName || "LẬP CỰC"}
            </button>
          </div>
          {/* Dai Van Label - Top Left under House Name */}
          {daiVanLabel && (
            <div 
              className={`text-size-9 capitalize tracking-tighter ${daiVanLabel.includes('Dv.Mệnh') ? 'bg-black text-white px-1 rounded-sm' : ''}`}
              style={daiVanLabel.includes('Dv.Mệnh') ? (theme?.textColor ? { backgroundColor: theme.textColor, color: theme.backgroundColor } : { backgroundColor: 'black', color: 'white' }) : { color: theme?.textColor || 'black' }}
            >
              {daiVanLabel}
            </div>
          )}
          {isThan && <div className="text-size-11 uppercase border border-current px-0.5">THÂN</div>}
        </div>
        
        <div className="flex flex-col items-end text-right gap-0.5">
          <div className="text-size-9 capitalize flex items-center gap-1">
            {/* Luu Nien Label - Top Right next to Can Chi */}
            {luuNienLabel && (
              <span 
                className={`text-size-9 capitalize tracking-tighter ${luuNienLabel.includes('L.Mệnh') ? 'bg-black text-white px-1 rounded-sm' : ''}`}
                style={luuNienLabel.includes('L.Mệnh') ? (theme?.textColor ? { backgroundColor: theme.textColor, color: theme.backgroundColor } : { backgroundColor: 'black', color: 'white' }) : { color: theme?.textColor || 'black' }}
              >
                {luuNienLabel}
              </span>
            )}
            <span style={{ color: getCanColor(cellCan, theme?.elementColors) }}>{cellCan.toLowerCase()}</span>{' '}
            <span style={{ color: getChiColor(BRANCHES[chi], theme?.elementColors) }}>{BRANCHES[chi].toLowerCase()}</span>
          </div>
          <div className="text-size-9 capitalize" style={{ color: getNapAmColor(cellNapAm, theme?.elementColors) }}>
            {cellNapAm.toLowerCase()}
          </div>
        </div>
      </div>

      {/* Middle: Major Stars (UPPERCASE) */}
      <div className={`flex flex-col justify-start items-center gap-0.5 mt-2 z-10 transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-80'}`}>
        {cellStars.length > 0 ? (
          <>
            {cellStars.map((star: string, idx: number) => {
              const [name, brightness] = star.split(' (');
              const cleanName = name.trim();
              const cleanBrightness = brightness ? `(${brightness}` : '';
              const yy = STAR_YIN_YANG[cleanName] ? `(${STAR_YIN_YANG[cleanName]})` : '';
              return (
                <div 
                  key={idx} 
                  className="font-sans font-bold text-size-11 uppercase tracking-tight text-center cursor-help hover:opacity-70 transition-opacity" 
                  style={{ color: getStarColor(cleanName, theme?.elementColors) }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStarClick(cleanName, chi);
                  }}
                >
                  {cleanName} {yy} <span className="text-size-9 font-normal">{cleanBrightness}</span>
                </div>
              );
            })}
          </>
        ) : (
          <div className="font-sans font-medium text-size-9 uppercase tracking-widest text-gray-400 text-center opacity-60">
            Vô Chính Diệu
          </div>
        )}
      </div>

      {/* Minor & Luu Stars */}
      <div className={`flex-1 flex w-full justify-between items-start mt-1 z-10 transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-80'} overflow-hidden`}>
        {/* Cát tinh (Left) - 1 or 2 columns based on screen */}
        <div className="grid grid-cols-1 landscape:max-lg:grid-cols-2 lg:grid-cols-1 gap-x-1 gap-y-0 items-start content-start text-left w-[48%]">
          {allGoodStars.map((star: any, idx: number) => {
            const [name, brightness] = star.name.split(' (');
            const cleanName = name.trim();
            const cleanBrightness = brightness ? `(${brightness}` : '';
            const isUpper = UPPERCASE_STARS.includes(cleanName.toUpperCase());
            return (
              <div 
                key={idx} 
                className={`font-sans text-size-9 tracking-tight truncate cursor-help hover:opacity-70 transition-opacity ${isUpper ? 'uppercase' : 'capitalize'} ${star.isLuu ? 'italic' : ''}`} 
                style={{ color: getStarColor(cleanName, theme?.elementColors) }}
                onClick={(e) => {
                  e.stopPropagation();
                  onStarClick(cleanName, chi);
                }}
              >
                {isUpper ? cleanName.toUpperCase() : cleanName.toLowerCase()} <span className="font-normal uppercase">{cleanBrightness}</span>
              </div>
            );
          })}
        </div>
        {/* Hung/Sát tinh (Right) - 1 or 2 columns based on screen */}
        <div className="grid grid-cols-1 landscape:max-lg:grid-cols-2 lg:grid-cols-1 gap-x-1 gap-y-0 items-start content-start text-right w-[48%]">
          {allBadStars.map((star: any, idx: number) => {
            const [name, brightness] = star.name.split(' (');
            const cleanName = name.trim();
            const cleanBrightness = brightness ? `(${brightness}` : '';
            const isUpper = UPPERCASE_STARS.includes(cleanName.toUpperCase());
            return (
              <div 
                key={idx} 
                className={`font-sans text-size-9 tracking-tight truncate cursor-help hover:opacity-70 transition-opacity ${isUpper ? 'uppercase' : 'capitalize'} ${star.isLuu ? 'italic' : ''}`} 
                style={{ color: getStarColor(cleanName, theme?.elementColors) }}
                onClick={(e) => {
                  e.stopPropagation();
                  onStarClick(cleanName, chi);
                }}
              >
                {isUpper ? cleanName.toUpperCase() : cleanName.toLowerCase()} <span className="font-normal uppercase">{cleanBrightness}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tứ Hóa & Tự Hóa & Phi Hóa */}
      {(cellTuHoa.length > 0 || cellTuHoaCung.length > 0 || cellPhiHoa.length > 0) && (
        <div className={`w-full flex flex-col items-center gap-0 mt-0.5 z-10 transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-80'}`}>
          {cellTuHoa.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 w-full">
              {cellTuHoa.map((star: string, idx: number) => (
                <div 
                  key={`th-${idx}`} 
                  className="font-sans text-size-9 font-semibold capitalize tracking-tight cursor-help hover:opacity-70 transition-opacity" 
                  style={{ color: getStarColor(star, theme?.elementColors) }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStarClick(star, chi);
                  }}
                >
                  {star.toLowerCase()}
                </div>
              ))}
            </div>
          )}
          {cellTuHoaCung.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 w-full">
              {cellTuHoaCung.map((star: string, idx: number) => (
                <div 
                  key={`thc-${idx}`} 
                  className="font-sans text-size-9 font-semibold capitalize tracking-tight cursor-help hover:opacity-70 transition-opacity" 
                  style={{ color: getStarColor(star, theme?.elementColors) }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStarClick(star, chi);
                  }}
                >
                  {star.toLowerCase()}
                </div>
              ))}
            </div>
          )}
          {cellPhiHoa.length > 0 && (
            <div className="flex flex-col landscape:max-lg:flex-row landscape:max-lg:flex-wrap justify-center items-center gap-0 landscape:max-lg:gap-1 w-full">
              {cellPhiHoa.map((star: string, idx: number) => (
                <div key={`ph-${idx}`} className="font-sans text-size-8 text-gray-500 tracking-tight whitespace-nowrap">
                  {star}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom: Nguyet Han, Dai Van, Trang Sinh, Animal */}
      <div className="absolute bottom-1 left-1 right-1 flex justify-between items-end pointer-events-none z-10">
        <div className="flex flex-col items-start gap-0.5">
          {cellNguyetHan && (
            <div className="text-size-9 font-medium tracking-tight flex flex-row portrait:max-lg:flex-col gap-0.5 portrait:max-lg:gap-0">
              <span className="text-gray-600">T{cellNguyetHan.month}</span>
              <div className="flex gap-0.5">
                <span className="capitalize" style={{ color: getCanColor(cellNguyetHan.canChi.split(' ')[0]) }}>
                  {cellNguyetHan.canChi.split(' ')[0].toLowerCase()}
                </span>
                <span className="capitalize" style={{ color: getChiColor(cellNguyetHan.canChi.split(' ')[1]) }}>
                  {cellNguyetHan.canChi.split(' ')[1].toLowerCase()}
                </span>
              </div>
            </div>
          )}
          {daiVanAge && (
            <div className="text-size-7 font-bold text-black bg-gray-200/50 px-1 rounded">
              {daiVanAge}
            </div>
          )}
        </div>
        <div 
          className="text-size-9 font-medium text-gray-500 uppercase tracking-tighter pointer-events-auto cursor-help hover:opacity-70 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            if (trangSinh) {
              onStarClick(trangSinh, chi);
            }
          }}
        >
          {trangSinh}
        </div>
      </div>
      
      <div className="absolute bottom-1 right-1 text-size-2xl grayscale opacity-[0.03] pointer-events-none z-0">
        {ANIMALS[chi]}
      </div>
    </div>
  );
});
