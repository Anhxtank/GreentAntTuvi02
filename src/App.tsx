import React, { useState, useEffect, useRef } from 'react';
import { toBlob } from 'html-to-image';
import { getAllCanChi, getCurrentSolarTermPeriod, solarToLunar, getBranchIndex } from '@baostudio/viet-lunar';
import { NAP_AM, getCanColor, getChiColor, getNapAmColor } from './utils/lunar';
import { TuviChart, CenterData, ChartTheme } from './components/TuviChart';
import { getCuc, getMajorStars, getDaiVan, getTrangSinh, getMinorStars, getTuanTriet, getTuHoa, getTuHoaCung, getNguyetHan, getChuMenh, getChuThan, getLuuDaiVanLocation, getRelativeHouseLabels, getTieuVanLocation, getDauQuanLocation, HOUSE_NAMES, getLaiNhanCung } from './utils/tuvi';
import { detectCachCuc, detectGiapCung } from './utils/cachcuc';
import { detectHinhTinh } from './utils/hinhTinh';
import { Chatbot, ChatbotRef } from './components/Chatbot';
import { GoogleGenAI } from '@google/genai';
import { ELEMENT_COLORS } from './utils/lunar';
import { Settings, Palette, RotateCcw } from 'lucide-react';
import { ThapNhiHuyenDoWidget } from './components/ThapNhiHuyenDoWidget';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface SavedChart {
  id: string;
  name: string;
  gender: 'Nam' | 'Nữ';
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  viewYear: string;
  timestamp: number;
}

function getMenhThan(month: number, hourChi: number) {
  const monthPos = (2 + (month - 1)) % 12;
  const menhPos = (monthPos - hourChi + 12) % 12;
  const thanPos = (monthPos + hourChi) % 12;
  return { menhPos, thanPos };
}

export default function App() {
  const [name, setName] = useState('');
  const [debouncedName, setDebouncedName] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedName(name), 300);
    return () => clearTimeout(timer);
  }, [name]);

  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  
  const [year, setYear] = useState('1987');
  const [month, setMonth] = useState('01');
  const [day, setDay] = useState('09');
  const [hour, setHour] = useState('18');
  const [minute, setMinute] = useState('30');
  const [viewYear, setViewYear] = useState(new Date().getFullYear().toString());
  const [savedCharts, setSavedCharts] = useState<SavedChart[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    tienthien: { content: string[]; advice: string[] };
    career: { content: string[]; advice: string[] };
    marriage: { content: string[]; advice: string[] };
    vanhan: { content: string[]; advice: string[] };
  } | null>(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [selectedStar, setSelectedStar] = useState<{ name: string; chi: number } | null>(null);
  const [theme, setTheme] = useState<ChartTheme>(() => {
    const saved = localStorage.getItem('tuvi_chart_theme');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved theme', e);
      }
    }
    return {
      backgroundColor: '#ffffff',
      lineColor: '#3b82f6',
      cellBackgroundColor: '#f8fafc',
      textColor: '#000000',
      elementColors: { ...ELEMENT_COLORS }
    };
  });

  useEffect(() => {
    localStorage.setItem('tuvi_chart_theme', JSON.stringify(theme));
  }, [theme]);
  
  const chatbotRef = useRef<ChatbotRef | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const loadChart = (chart: SavedChart) => {
    setName(chart.name);
    setDebouncedName(chart.name);
    setGender(chart.gender);
    setYear(chart.year);
    setMonth(chart.month);
    setDay(chart.day);
    setHour(chart.hour);
    setMinute(chart.minute);
    setViewYear(chart.viewYear);

    // Move the selected chart to the top of the list
    setSavedCharts(prev => {
      const otherCharts = prev.filter(c => c.id !== chart.id);
      const updated = [chart, ...otherCharts];
      localStorage.setItem('tuvi_saved_charts', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem('tuvi_saved_charts');
    let charts: SavedChart[] = [];
    if (saved) {
      try {
        charts = JSON.parse(saved);
        setSavedCharts(charts);
      } catch (e) {
        console.error('Failed to parse saved charts', e);
      }
    }

    // Load from URL parameters
    const params = new URLSearchParams(window.location.search);
    const pName = params.get('name');
    if (pName) {
      setName(pName);
      setDebouncedName(pName);
      const pGender = params.get('gender');
      if (pGender === 'Nam' || pGender === 'Nữ') setGender(pGender as 'Nam' | 'Nữ');
      const pYear = params.get('year');
      if (pYear) setYear(pYear);
      const pMonth = params.get('month');
      if (pMonth) setMonth(pMonth);
      const pDay = params.get('day');
      if (pDay) setDay(pDay);
      const pHour = params.get('hour');
      if (pHour) setHour(pHour);
      const pMinute = params.get('minute');
      if (pMinute) setMinute(pMinute);
      const pViewYear = params.get('viewYear');
      if (pViewYear) setViewYear(pViewYear);
    } else if (charts.length > 0) {
      // If no URL params, load the first saved chart
      loadChart(charts[0]);
    }
  }, []);

  const handleOpenSummary = async () => {
    setShowAnalysisModal(true);
    
    const messages = chatbotRef.current?.getMessages() || [];
    if (messages.length < 2) return; // Not enough context to summarize

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return;
    }

    setIsSummarizing(true);
    setSummaryData(null);
    try {
      const prompt = `
        Dựa trên nội dung cuộc đàm đạo về Tử Vi dưới đây, hãy tóm tắt các kết quả luận đoán quan trọng nhất thành một đối tượng JSON.
        Yêu cầu:
        1. Ngôn ngữ: Tiếng Việt, gần gũi, dễ hiểu. Tuyệt đối không dùng thuật ngữ học thuật (như Tứ Hóa, Phi Cung, Tự Hóa...).
        2. Tập trung vào KẾT QUẢ và LỜI KHUYÊN thực tế. Sử dụng các câu từ mang tính đúc kết, giàu hình ảnh.
        3. Chia nhỏ các ý thành danh sách (array of strings). Mỗi ý không quá 20 từ.
        4. Cấu trúc JSON:
        {
          "tienthien": { "content": ["kết quả 1", "kết quả 2"], "advice": ["lời khuyên 1"] },
          "career": { "content": [...], "advice": [...] },
          "marriage": { "content": [...], "advice": [...] },
          "vanhan": { "content": [...], "advice": [...] }
        }
        5. Nếu một hạng mục chưa được đề cập, hãy để mảng rỗng [].
        
        Nội dung đàm đạo:
        ${messages.map(m => `${m.role === 'user' ? 'Người dùng' : 'Chuyên gia'}: ${m.text}`).join('\n')}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (text) {
        try {
          const data = JSON.parse(text);
          setSummaryData(data);
        } catch (parseError) {
          console.error("Failed to parse summary JSON:", parseError);
          // Fallback or error message in UI could be added here
        }
      }
    } catch (error) {
      console.error("Summary error:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const saveChart = () => {
    const newChart: SavedChart = {
      id: Date.now().toString(),
      name: debouncedName || 'Chưa đặt tên',
      gender,
      year,
      month,
      day,
      hour,
      minute,
      viewYear,
      timestamp: Date.now(),
    };
    const updated = [newChart, ...savedCharts];
    setSavedCharts(updated);
    localStorage.setItem('tuvi_saved_charts', JSON.stringify(updated));
  };

  const deleteChart = (id: string) => {
    const updated = savedCharts.filter(c => c.id !== id);
    setSavedCharts(updated);
    localStorage.setItem('tuvi_saved_charts', JSON.stringify(updated));
  };

  const downloadChart = async () => {
    if (!chartRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      // Small delay to ensure UI updates if needed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const blob = await toBlob(chartRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      
      if (!blob) throw new Error('Failed to create blob');

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `La_So_Tu_Vi_${debouncedName || 'Chua_Dat_Ten'}.jpg`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (e) {
      console.error('Failed to download chart', e);
      alert('Không thể tải lá số. Vui lòng thử lại hoặc chụp màn hình.');
    } finally {
      setIsDownloading(false);
    }
  };

  const lunarData = React.useMemo(() => {
    try {
      const y = parseInt(year, 10);
      const m = parseInt(month, 10);
      const d = parseInt(day, 10);
      const h = parseInt(hour, 10);
      const vYear = parseInt(viewYear, 10);
      
      if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h) && !isNaN(vYear)) {
        const solarDate = { year: y, month: m, day: d };
        const lunarDate = solarToLunar(solarDate);
        const canChi = getAllCanChi(solarDate, h);
        const solarTerm = getCurrentSolarTermPeriod(solarDate);
        
        const hourChi = getBranchIndex(canChi.hour!.branch);
        const { menhPos, thanPos } = getMenhThan(lunarDate.month, hourChi);
        
        const cuc = getCuc(canChi.year.stem, menhPos);
        const stars = getMajorStars(lunarDate.day, cuc.value);
        
        const menhNapAm = NAP_AM[`${canChi.year.stem} ${canChi.year.branch}`];

        const STEMS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
        const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        
        const yearStemIdx = STEMS.indexOf(canChi.year.stem);
        const danStemIndex = ((yearStemIdx % 5) * 2 + 2) % 10;
        
        const cellCans = Array(12).fill('');
        const cellNapAms = Array(12).fill('');
        
        for (let i = 0; i < 12; i++) {
          const stemIdx = (danStemIndex + i - 2 + 10) % 10;
          cellCans[i] = STEMS[stemIdx];
          cellNapAms[i] = NAP_AM[`${cellCans[i]} ${BRANCHES[i]}`];
        }

        // Determine Âm Dương Nam Nữ
        const isDuongYear = ["Giáp", "Bính", "Mậu", "Canh", "Nhâm"].includes(canChi.year.stem);
        const isNam = gender === 'Nam';
        const isThuan = (isDuongYear && isNam) || (!isDuongYear && !isNam);

        const daiVan = getDaiVan(menhPos, cuc.value, isThuan);
        const trangSinh = getTrangSinh(cuc.value, isThuan);
        
        const currentYear = vYear;
        const transitYearStem = STEMS[((currentYear - 4) % 10 + 10) % 10];
        const transitYearBranch = BRANCHES[((currentYear - 4) % 12 + 12) % 12];
        
        const { goodStars, badStars, luuGoodStars, luuBadStars } = getMinorStars(lunarDate.month, hourChi, canChi.year.stem, canChi.year.branch, isThuan, lunarDate.day, menhPos, thanPos, transitYearStem, transitYearBranch);
        const { tuan, triet } = getTuanTriet(canChi.year.stem, canChi.year.branch);
        const tuHoa = getTuHoa(canChi.year.stem, stars, goodStars, badStars);
        const { tuHoaCung, phiHoa } = getTuHoaCung(cellCans, stars, goodStars, badStars, menhPos);
        const nguyetHan = getNguyetHan(lunarDate.month, hourChi, transitYearStem, transitYearBranch);

        const chuMenh = getChuMenh(canChi.year.branch);
        const chuThan = getChuThan(canChi.year.branch);
        
        const age = currentYear - lunarDate.year + 1;
        const luuDaiVanInfo = getLuuDaiVanLocation(menhPos, cuc.value, isThuan, age);
        const laiNhanPos = getLaiNhanCung(canChi.year.stem, cellCans);
        
        let daiVanLabels = Array(12).fill("");
        if (luuDaiVanInfo) {
          // Pass isThuan to getRelativeHouseLabels to control direction
          // Dương Nam/Âm Nữ (isThuan=true) -> Clockwise
          // Âm Nam/Dương Nữ (isThuan=false) -> Counter-Clockwise
          daiVanLabels = getRelativeHouseLabels(luuDaiVanInfo.daiVanPos, "Dv", isThuan);
        }
        
        // Calculate Luu Nien labels using the Thái Tuế method (Year Branch position)
        const luuNienLabels = Array(12).fill("");
        if (luuDaiVanInfo) {
          const birthYearNum = lunarDate.year;
          // Show 12 years centered around the current viewYear (currentYear)
          // Range: currentYear - 6 to currentYear + 5
          for (let i = -6; i <= 5; i++) {
            const y = currentYear + i;
            const a = y - birthYearNum + 1;
            if (a <= 0) continue; // Skip years before birth
            
            // Position for year 'y' is its branch index (Thái Tuế method)
            const pos = ((y - 4) % 12 + 12) % 12;
            
            // House name relative to current age (age)
            const houseIdx = (a - age + 120) % 12;
            let houseName = HOUSE_NAMES[houseIdx];
            if (houseName === "Huynh") houseName = "Bào";
            
            luuNienLabels[pos] = `L.${houseName} ${y}`;
          }
        }

        const tieuVanInfo = getTieuVanLocation(transitYearBranch, gender);
        const tieuVanLabels = getRelativeHouseLabels(tieuVanInfo.pos, "Tv", tieuVanInfo.isThuan);

        const centerData: CenterData = {
          name: debouncedName,
          gender: `${isDuongYear ? 'Dương' : 'Âm'} ${gender}`,
          solarDate: `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${y}`,
          lunarDate: `${lunarDate.day.toString().padStart(2, '0')}/${lunarDate.month.toString().padStart(2, '0')}/${lunarDate.year}`,
          batTu: `${canChi.hour!.stem} ${canChi.hour!.branch} - ${canChi.day.stem} ${canChi.day.branch} - ${canChi.month.stem} ${canChi.month.branch} - ${canChi.year.stem} ${canChi.year.branch}`,
          menhNapAm,
          cucName: cuc.name,
          solarTerm: solarTerm?.name || '---',
          viewYear: `${currentYear} (${transitYearStem} ${transitYearBranch})`,
          age: age,
          yearStem: canChi.year.stem,
          chuMenh,
          chuThan,
          luuDaiVan: luuDaiVanInfo ? `Đại vận ${luuDaiVanInfo.daiVanStartAge}-${luuDaiVanInfo.daiVanStartAge+9} tại ${BRANCHES[luuDaiVanInfo.daiVanPos]} - Lưu niên tại ${transitYearBranch}` : "",
          laiNhanPos,
          giapCung: detectGiapCung(menhPos, stars, goodStars, badStars),
          cachCuc: detectCachCuc(menhPos, stars, goodStars, badStars),
          hinhTinh: detectHinhTinh(menhPos, stars, goodStars, badStars, tuan, triet),
          raw: {
            hour,
            minute
          },
          fullChartData: {
            stars,
            goodStars,
            badStars,
            cellCans,
            cellNapAms,
            daiVan,
            trangSinh,
            tuHoa,
            tuHoaCung,
            phiHoa,
            tuan,
            triet,
            menhPos,
            thanPos,
            laiNhanPos
          }
        };

        return {
          lunarDate,
          canChi,
          solarTerm,
          menhPos,
          thanPos,
          stars,
          centerData,
          cellCans,
          cellNapAms,
          daiVan,
          trangSinh,
          goodStars,
          badStars,
          luuGoodStars,
          luuBadStars,
          tuHoa,
          tuHoaCung,
          phiHoa,
          nguyetHan,
          tuan,
          triet,
          daiVanLabels,
          luuNienLabels,
          tieuVanLabels
        };
      }
    } catch (e) {
      console.error("Error calculating chart:", e);
      // Ignore invalid dates
    }
    return null;
  }, [year, month, day, hour, minute, debouncedName, gender, viewYear]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Input Form */}
        <div className="lg:col-span-4 space-y-6">
          {/* Real-time Date Display */}
          <div className="bg-black text-white rounded-xl p-4 shadow-lg border border-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-condensed font-bold uppercase tracking-[0.2em] text-gray-400">Lịch Dương Hôm Nay</p>
                <p className="text-sm font-condensed font-bold uppercase tracking-widest">
                  {new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-condensed font-bold text-purple-400 animate-pulse">LIVE</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-black">
            <h1 className="text-lg font-sans font-bold text-black mb-6 uppercase tracking-widest text-center border-b border-black pb-4">
              Lập Lá Số Tử Vi
            </h1>

            <div className="space-y-5">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-gray-500">
                  Tên đương số
                </label>
                <input
                  type="text"
                  placeholder="NHẬP TÊN..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm font-mono font-medium text-black focus:outline-none focus:border-black transition-all uppercase placeholder:text-gray-300"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-gray-500">
                  Giới tính
                </label>
                <div className="flex bg-gray-100 p-1 rounded">
                  <button
                    onClick={() => setGender('Nam')}
                    className={`flex-1 py-1.5 rounded-sm text-[11px] font-sans font-bold uppercase tracking-wider transition-colors ${
                      gender === 'Nam' ? 'bg-white text-black shadow-sm border border-black' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Nam
                  </button>
                  <button
                    onClick={() => setGender('Nữ')}
                    className={`flex-1 py-1.5 rounded-sm text-[11px] font-sans font-bold uppercase tracking-wider transition-colors ${
                      gender === 'Nữ' ? 'bg-white text-black shadow-sm border border-black' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Nữ
                  </button>
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-3 pt-2">
                <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 w-full block pb-1">
                  Dương lịch
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-400">Ngày sinh</label>
                    <input 
                      type="date" 
                      value={`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          const [y, m, d] = val.split('-');
                          setYear(y);
                          setMonth(parseInt(m, 10).toString());
                          setDay(parseInt(d, 10).toString());
                        }
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm font-mono font-medium text-black focus:outline-none focus:border-black transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-400">Giờ sinh</label>
                    <input 
                      type="time" 
                      value={`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          const [h, min] = val.split(':');
                          setHour(parseInt(h, 10).toString());
                          setMinute(parseInt(min, 10).toString());
                        }
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm font-mono font-medium text-black focus:outline-none focus:border-black transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* View Year */}
              <div className="space-y-1 pt-2 border-t border-gray-100">
                <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-gray-500 mt-2 block">
                  NĂM XEM HẠN (Âm lịch)
                </label>
                <input 
                  type="number" 
                  value={viewYear}
                  onChange={(e) => setViewYear(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm font-mono font-medium text-black focus:outline-none focus:border-black transition-all"
                />
              </div>
              
              {lunarData?.solarTerm && (
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-gray-500">Tiết Khí</span>
                  <span className="text-[10px] font-mono font-medium text-black bg-gray-100 px-2 py-1 rounded border border-gray-200 uppercase">
                    {lunarData.solarTerm.name}
                  </span>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <button
                  onClick={saveChart}
                  className="flex-1 bg-black text-white py-2.5 rounded text-[11px] font-sans font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Lưu Lá Số
                </button>
                <button
                  onClick={downloadChart}
                  disabled={isDownloading}
                  className={`flex-1 bg-white text-black border border-black py-2.5 rounded text-[11px] font-sans font-bold uppercase tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2 ${
                    isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                      Đang tải...
                    </>
                  ) : (
                    'Tải Lá Số'
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Saved Charts List */}
          {savedCharts.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-black">
              <h2 className="text-sm font-sans font-bold text-black mb-4 uppercase tracking-widest border-b border-black pb-2">
                Lá Số Đã Lưu
              </h2>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {savedCharts.map(chart => (
                  <div key={chart.id} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded hover:border-black transition-colors group">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => loadChart(chart)}
                    >
                      <div className="text-xs font-bold text-black uppercase">{chart.name}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {chart.gender} • {chart.day}/{chart.month}/{chart.year} {chart.hour}:{chart.minute}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteChart(chart.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                      title="Xóa lá số"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Thap Nhi Huyen Do Widget */}
          {lunarData && selectedStar && (
            <ThapNhiHuyenDoWidget 
              stars={lunarData.stars} 
              theme={theme} 
              selectedStar={selectedStar}
              daiVan={lunarData.daiVan}
            />
          )}
        </div>

        {/* Right Main Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {lunarData ? (
            <div className="flex flex-col gap-6">
              <div ref={chartRef} className="bg-white p-4 rounded-xl shadow-sm border border-black">
                <TuviChart 
                  {...lunarData}
                  centerData={lunarData.centerData}
                  theme={theme}
                  selectedStar={selectedStar}
                  onSelectedStarChange={setSelectedStar}
                />
              </div>

              {/* Theme Editor Trigger */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowThemeModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-gray-50 transition-all text-xs font-bold uppercase tracking-widest active:scale-95"
                >
                  <Palette size={16} />
                  Tùy chỉnh màu sắc
                </button>
              </div>

              {/* Gợi ý giải đoán */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
                <div className="mb-6 border-b-2 border-black pb-2">
                  <h2 className="text-base font-sans font-bold text-black uppercase tracking-widest mb-1">
                    Gợi ý giải đoán
                  </h2>
                  <p className="text-xs font-light text-gray-500 italic">
                    Đây chỉ là gợi ý đối với một số bộ sao không mang tính giải đoán.
                  </p>
                </div>

                {/* Hình tính */}
                <div className="mb-8">
                  <h3 className="text-sm font-sans font-bold text-black mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">
                    Hình tính
                  </h3>
                  <div className="space-y-4">
                    {lunarData.centerData.hinhTinh && lunarData.centerData.hinhTinh.length > 0 ? (
                      lunarData.centerData.hinhTinh.map((item, idx) => {
                        const hinhThaiMatch = item.yNghia.match(/Hình thái:\s*(.*?)(?=Tâm tính:|$)/i);
                        const tamTinhMatch = item.yNghia.match(/Tâm tính:\s*(.*?)(?=Hình thái:|$)/i);
                        
                        const hinhThai = hinhThaiMatch ? hinhThaiMatch[1].trim() : "";
                        const tamTinh = tamTinhMatch ? tamTinhMatch[1].trim() : "";
                        const chung = (!hinhThai && !tamTinh) ? item.yNghia : "";

                        return (
                          <div key={idx} className="border-l-4 border-[#54392D] pl-4 py-2 mb-2 bg-[#54392D]/5 rounded-r-lg">
                            <h4 className="font-sans font-bold text-black text-size-11 uppercase tracking-wider flex items-center gap-2 mb-2">
                              {item.sao}
                            </h4>
                            {chung ? (
                              <p className="text-gray-700 text-size-10 leading-relaxed font-sans">{chung}</p>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {hinhThai && (
                                  <div>
                                    <span className="text-size-9 font-sans font-bold text-[#4E0000] uppercase tracking-wider block mb-1">Hình thái</span>
                                    <p className="text-gray-700 text-size-10 leading-relaxed font-sans">{hinhThai}</p>
                                  </div>
                                )}
                                {tamTinh && (
                                  <div>
                                    <span className="text-size-9 font-sans font-bold text-[#13273F] uppercase tracking-wider block mb-1">Tâm tính</span>
                                    <p className="text-gray-700 text-size-10 leading-relaxed font-sans">{tamTinh}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-sm italic font-sans">Chưa có thông tin hình tính cho lá số này.</p>
                    )}
                  </div>
                </div>

                {/* Giáp cung */}
                {lunarData.centerData.giapCung && lunarData.centerData.giapCung.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-sans font-bold text-black mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">
                      Giáp cung
                    </h3>
                    <div className="space-y-4">
                      {lunarData.centerData.giapCung.map((giap, idx) => (
                        <div key={idx} className={`border-l-4 pl-4 py-2 bg-gray-50 rounded-r-lg ${giap.type === 'cat' ? 'border-[#36422C]' : giap.type === 'hung' ? 'border-[#4E0000]' : 'border-[#13273F]'}`}>
                          <h4 className="font-sans font-bold text-black text-size-11 uppercase tracking-wider flex items-center gap-2">
                            Giáp cung: {giap.name}
                          </h4>
                          <p className="text-gray-700 text-size-10 mt-1.5 leading-relaxed font-medium font-sans">{giap.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cách cục */}
                <div>
                  <h3 className="text-sm font-sans font-bold text-black mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">
                    Cách cục
                  </h3>
                  <div className="space-y-4">
                    {lunarData.centerData.cachCuc && lunarData.centerData.cachCuc.length > 0 ? (
                      lunarData.centerData.cachCuc.map((cach, idx) => (
                        <div key={idx} className={`border-l-4 pl-4 py-2 bg-gray-50 rounded-r-lg ${cach.type === 'cat' ? 'border-[#36422C]' : cach.type === 'hung' ? 'border-[#4E0000]' : 'border-[#13273F]'}`}>
                          <h4 className="font-sans font-bold text-black text-size-11 uppercase tracking-wider flex items-center gap-2">
                            {cach.name}
                            <span className={`text-size-8 px-1.5 py-0.5 rounded font-sans font-bold uppercase tracking-widest ${cach.type === 'cat' ? 'bg-[#36422C] text-white' : cach.type === 'hung' ? 'bg-[#4E0000] text-white' : 'bg-[#13273F] text-white'}`}>
                              {cach.type === 'cat' ? 'Cát' : cach.type === 'hung' ? 'Hung' : 'Đặc thù'}
                            </span>
                          </h4>
                          <p className="text-gray-700 text-size-10 mt-1.5 leading-relaxed font-sans">{cach.description}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm italic font-sans">Chưa có gợi ý cách cục đặc biệt cho lá số này.</p>
                    )}
                  </div>
                </div>

                {/* Luận giải chi tiết */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
                  <h3 className="text-[10px] font-sans font-bold text-gray-400 mb-4 uppercase tracking-[0.4em] text-center">
                    LUẬN GIẢI CHI TIẾT
                  </h3>
                  <button
                    onClick={handleOpenSummary}
                    className="group relative px-5 py-2.5 bg-white border border-black text-black rounded-lg font-sans font-bold text-[10px] uppercase tracking-widest overflow-hidden transition-all hover:bg-black hover:text-white active:scale-95 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      XEM BẢN TÓM TẮT LUẬN GIẢI
                    </span>
                  </button>
                  <p className="mt-3 text-gray-400 text-[8px] font-sans italic uppercase tracking-wider">
                    * Nhấp để hệ thống tóm tắt các ý chính từ Chuyên gia
                  </p>
                </div>

                {/* Theme Customization Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-200">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Palette className="text-blue-600" size={20} />
                <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Tùy chỉnh màu sắc</h3>
              </div>
              <button onClick={() => setShowThemeModal(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <Settings size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* General Colors */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Màu sắc chung</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Nền lá số</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={theme.backgroundColor} 
                        onChange={(e) => setTheme(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0"
                      />
                      <span className="text-[10px] font-mono text-gray-400 uppercase">{theme.backgroundColor}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Nền ô cung</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={theme.cellBackgroundColor} 
                        onChange={(e) => setTheme(prev => ({ ...prev, cellBackgroundColor: e.target.value }))}
                        className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0"
                      />
                      <span className="text-[10px] font-mono text-gray-400 uppercase">{theme.cellBackgroundColor}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Màu chữ chính</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={theme.textColor} 
                        onChange={(e) => setTheme(prev => ({ ...prev, textColor: e.target.value }))}
                        className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0"
                      />
                      <span className="text-[10px] font-mono text-gray-400 uppercase">{theme.textColor}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Màu đường kẻ</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={theme.lineColor} 
                        onChange={(e) => setTheme(prev => ({ ...prev, lineColor: e.target.value }))}
                        className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0"
                      />
                      <span className="text-[10px] font-mono text-gray-400 uppercase">{theme.lineColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Element Colors */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Màu sắc Ngũ Hành</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.elementColors).map(([element, color]) => (
                    <div key={element} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-600 uppercase">{element}</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="color" 
                          value={color} 
                          onChange={(e) => setTheme(prev => ({ 
                            ...prev, 
                            elementColors: { ...prev.elementColors, [element]: e.target.value } 
                          }))}
                          className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0"
                        />
                        <span className="text-[10px] font-mono text-gray-400 uppercase">{color}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => setTheme({
                  backgroundColor: '#ffffff',
                  lineColor: '#3b82f6',
                  cellBackgroundColor: '#f8fafc',
                  textColor: '#000000',
                  elementColors: { ...ELEMENT_COLORS }
                })}
                className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
              >
                <RotateCcw size={14} />
                Khôi phục mặc định
              </button>
              <button 
                onClick={() => setShowThemeModal(false)}
                className="px-6 py-2 bg-black text-white text-[10px] font-bold rounded-lg hover:bg-gray-800 transition-all active:scale-95 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none uppercase tracking-widest"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Summary Modal */}
                {showAnalysisModal && (
                  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/30 backdrop-blur-[2px] animate-in fade-in duration-300">
                    <div className="bg-white rounded-xl w-full max-w-4xl max-h-[85vh] shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in zoom-in duration-300">
                      <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-black text-white rounded">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-black">BẢN TÓM TẮT LUẬN GIẢI</h3>
                            <p className="text-[8px] font-sans text-gray-400 mt-0.5 uppercase tracking-tighter">Phân tích đa hệ thống • Trí tuệ nhân tạo</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setShowAnalysisModal(false)}
                          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-5">
                        {isSummarizing ? (
                          <div className="h-64 flex flex-col items-center justify-center gap-4">
                            <div className="w-8 h-8 border-3 border-gray-100 border-t-black rounded-full animate-spin"></div>
                            <p className="text-[10px] font-sans font-bold text-gray-400 animate-pulse uppercase tracking-widest">Đang tinh lọc dữ liệu...</p>
                          </div>
                        ) : (
                          <div className="prose prose-sm max-w-none">
                            <div className="overflow-x-auto rounded-lg border border-gray-100">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-gray-50/50">
                                    <th className="p-3 border-b border-gray-100 text-[9px] font-sans font-bold uppercase tracking-widest text-gray-400 w-1/4">Hạng mục</th>
                                    <th className="p-3 border-b border-gray-100 text-[9px] font-sans font-bold uppercase tracking-widest text-gray-400 w-1/2">Nội dung luận đoán</th>
                                    <th className="p-3 border-b border-gray-100 text-[9px] font-sans font-bold uppercase tracking-widest text-gray-400">Lưu ý / Lời khuyên</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                  {[
                                    { id: 'tienthien', label: 'Bản Mệnh (Tiên Thiên)', color: 'text-white', bg: 'bg-[#54392D]' }, // Thổ
                                    { id: 'career', label: 'Sự nghiệp & Tài lộc', color: 'text-white', bg: 'bg-[#4E0000]' }, // Hỏa
                                    { id: 'marriage', label: 'Nhân duyên & Gia đạo', color: 'text-white', bg: 'bg-[#36422C]' }, // Mộc
                                    { id: 'vanhan', label: 'Vận hạn (Thời vận)', color: 'text-white', bg: 'bg-[#13273F]' } // Thủy
                                  ].map((item) => {
                                    const data = summaryData?.[item.id as keyof typeof summaryData];
                                    return (
                                      <tr key={item.id}>
                                        <td className={`p-3 text-size-10 font-sans font-bold ${item.color} ${item.bg}`}>{item.label}</td>
                                        <td className="p-3 text-size-11 font-sans text-gray-700 leading-relaxed">
                                          {data && data.content.length > 0 ? (
                                            <ul className="list-disc list-inside space-y-1">
                                              {data.content.map((point, idx) => <li key={idx}>{point}</li>)}
                                            </ul>
                                          ) : (
                                            <span className="text-gray-300 italic">Chưa có dữ liệu...</span>
                                          )}
                                        </td>
                                        <td className="p-3 text-size-10 font-sans text-gray-500 italic">
                                          {data && data.advice.length > 0 ? (
                                            <ul className="list-none space-y-1">
                                              {data.advice.map((adv, idx) => <li key={idx} className="flex gap-1.5"><span>•</span>{adv}</li>)}
                                            </ul>
                                          ) : (
                                            <span className="text-gray-300 italic">Hãy hỏi Chuyên gia...</span>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            
                            <div className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-100">
                              <h4 className="flex items-center gap-2 text-gray-800 font-sans font-bold text-[9px] mb-1.5 uppercase tracking-widest">
                                <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Lời nhắn hệ thống
                              </h4>
                              <p className="text-gray-400 text-[10px] font-sans leading-relaxed italic">
                                "Bản tóm tắt này được trí tuệ nhân tạo tổng hợp dựa trên nội dung đàm đạo thực tế. Nội dung sẽ chi tiết hơn khi cuộc đàm đạo kéo dài."
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-4 border-t border-gray-100 bg-white flex justify-center">
                        <button
                          onClick={() => setShowAnalysisModal(false)}
                          className="px-8 py-2 bg-black text-white rounded-full text-[9px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all"
                        >
                          ĐÓNG BẢN TÓM TẮT
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full aspect-square border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-white/50">
              <span className="text-slate-400 font-medium">Đang tính toán lá số...</span>
            </div>
          )}
        </div>

      </div>
      <Chatbot 
        centerData={lunarData?.centerData} 
        onRef={(ref) => chatbotRef.current = ref}
      />
    </div>
  );
}
