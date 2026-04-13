import { NAP_AM } from './lunar';

const STEMS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const BRANCHES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export function getCuc(yearStem: string, menhBranchIndex: number) {
  const yearStemIndex = STEMS.indexOf(yearStem);
  if (yearStemIndex === -1) return { value: 3, name: "Mộc Tam Cục" }; // fallback

  // 1. Find the Stem of the Mệnh house (Ngũ Hổ Độn)
  // Dần (index 2) is the starting month.
  const danStemIndex = ((yearStemIndex % 5) * 2 + 2) % 10;
  const menhStemIndex = (danStemIndex + (menhBranchIndex - 2 + 12) % 12) % 10;

  // 2. Calculate Nạp Âm element of the Mệnh house
  const stemVal = Math.floor(menhStemIndex / 2) + 1;
  const branchVal = Math.floor((menhBranchIndex % 6) / 2);
  let sum = stemVal + branchVal;
  if (sum > 5) sum -= 5;
  
  // sum mapping: 1=Kim, 2=Thủy, 3=Hỏa, 4=Thổ, 5=Mộc
  // Cục mapping: Kim(4), Thủy(2), Hỏa(6), Thổ(5), Mộc(3)
  const cucMap = { 1: 4, 2: 2, 3: 6, 4: 5, 5: 3 };
  const cucNameMap = { 1: "Kim Tứ Cục", 2: "Thủy Nhị Cục", 3: "Hỏa Lục Cục", 4: "Thổ Ngũ Cục", 5: "Mộc Tam Cục" };
  
  return { 
    value: cucMap[sum as keyof typeof cucMap], 
    name: cucNameMap[sum as keyof typeof cucNameMap] 
  };
}

const STAR_BRIGHTNESS: Record<string, string[]> = {
  "Tử Vi": ["B", "Đ", "M", "B", "V", "M", "M", "Đ", "V", "B", "V", "B"],
  "Thiên Cơ": ["M", "H", "Đ", "M", "B", "B", "M", "H", "Đ", "M", "B", "B"],
  "Thái Dương": ["H", "H", "V", "M", "M", "M", "M", "Đ", "B", "H", "H", "H"],
  "Vũ Khúc": ["V", "M", "B", "H", "M", "B", "V", "M", "B", "H", "M", "B"],
  "Thiên Đồng": ["V", "H", "H", "M", "B", "Đ", "H", "H", "H", "B", "B", "Đ"],
  "Liêm Trinh": ["B", "Đ", "M", "H", "V", "H", "B", "Đ", "M", "H", "V", "H"],
  "Thiên Phủ": ["M", "M", "M", "B", "M", "Đ", "V", "M", "M", "B", "M", "Đ"],
  "Thái Âm": ["V", "M", "H", "H", "H", "H", "H", "B", "Đ", "M", "M", "M"],
  "Tham Lang": ["V", "M", "B", "H", "M", "H", "V", "M", "B", "H", "M", "H"],
  "Cự Môn": ["V", "H", "M", "M", "H", "B", "V", "H", "M", "M", "H", "B"],
  "Thiên Tướng": ["V", "M", "M", "H", "V", "Đ", "V", "M", "M", "H", "V", "Đ"],
  "Thiên Lương": ["M", "Đ", "M", "V", "M", "H", "M", "Đ", "M", "V", "M", "H"],
  "Thất Sát": ["M", "M", "M", "H", "H", "B", "M", "M", "M", "H", "H", "B"],
  "Phá Quân": ["M", "V", "H", "H", "M", "H", "M", "V", "H", "H", "M", "H"]
};

export function getMajorStars(lunarDay: number, cuc: number) {
  let step, diff;
  const remainder = lunarDay % cuc;
  
  if (remainder === 0) {
    step = lunarDay / cuc;
  } else {
    step = Math.floor(lunarDay / cuc) + 1;
  }
  
  diff = step * cuc - lunarDay;
  
  let basePos = step + 1; // Dần is index 2, base is step + 1
  let tvPos;
  
  if (diff % 2 === 0) {
    tvPos = (basePos + diff) % 12;
  } else {
    tvPos = (basePos - diff + 12) % 12;
  }

  const tpPos = (16 - tvPos) % 12;

  const stars = Array(12).fill(null).map(() => [] as string[]);
  
  const addStar = (pos: number, name: string) => {
    const brightness = STAR_BRIGHTNESS[name]?.[pos] || "";
    stars[pos].push(`${name} (${brightness})`);
  };

  // Tử Vi group (counter-clockwise)
  addStar(tvPos, "Tử Vi");
  addStar((tvPos - 1 + 12) % 12, "Thiên Cơ");
  addStar((tvPos - 3 + 12) % 12, "Thái Dương");
  addStar((tvPos - 4 + 12) % 12, "Vũ Khúc");
  addStar((tvPos - 5 + 12) % 12, "Thiên Đồng");
  addStar((tvPos - 8 + 12) % 12, "Liêm Trinh");

  // Thiên Phủ group (clockwise)
  addStar(tpPos, "Thiên Phủ");
  addStar((tpPos + 1) % 12, "Thái Âm");
  addStar((tpPos + 2) % 12, "Tham Lang");
  addStar((tpPos + 3) % 12, "Cự Môn");
  addStar((tpPos + 4) % 12, "Thiên Tướng");
  addStar((tpPos + 5) % 12, "Thiên Lương");
  addStar((tpPos + 6) % 12, "Thất Sát");
  addStar((tpPos + 10) % 12, "Phá Quân");

  return stars;
}

export function getDaiVan(menhPos: number, cucValue: number, isThuan: boolean): string[] {
  const daiVan = Array(12).fill("");
  for (let i = 0; i < 12; i++) {
    const pos = isThuan ? (menhPos + i) % 12 : (menhPos - i + 12) % 12;
    const start = cucValue + i * 10;
    daiVan[pos] = `${start}-${start + 9}`;
  }
  return daiVan;
}

const TRANG_SINH = ["Tràng Sinh", "Mộc Dục", "Quan Đới", "Lâm Quan", "Đế Vượng", "Suy", "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"];

export function getTrangSinh(cucValue: number, isThuan: boolean): string[] {
  let startPos = 0;
  if (cucValue === 2 || cucValue === 5) startPos = 8; // Thân
  else if (cucValue === 3) startPos = 11; // Hợi
  else if (cucValue === 4) startPos = 5; // Tỵ
  else if (cucValue === 6) startPos = 2; // Dần

  const result = Array(12).fill("");
  for (let i = 0; i < 12; i++) {
    const pos = isThuan ? (startPos + i) % 12 : (startPos - i + 12) % 12;
    result[pos] = TRANG_SINH[i];
  }
  return result;
}

function getMinorStarBrightness(star: string, chi: number): string {
  if (star === "Kình Dương") return [4, 10, 1, 7].includes(chi) ? "Đ" : "H";
  if (star === "Đà La") return [2, 8, 5, 11].includes(chi) ? "Đ" : "H";
  if (star === "Hỏa Tinh" || star === "Linh Tinh") return [2, 3, 4, 5, 6].includes(chi) ? "Đ" : "H";
  if (star === "Địa Không" || star === "Địa Kiếp") return [5, 11, 2, 8].includes(chi) ? "Đ" : "H";
  if (star === "Văn Xương" || star === "Văn Khúc") return [4, 10, 1, 7, 5, 11].includes(chi) ? "Đ" : "H";
  return "";
}

export function getMinorStars(month: number, hourChi: number, yearStem: string, yearBranch: string, isThuan: boolean, lunarDay: number, menhPos: number, thanPos: number, transitYearStem: string, transitYearBranch: string) {
  const goodStars: string[][] = Array(12).fill(null).map(() => []);
  const badStars: string[][] = Array(12).fill(null).map(() => []);
  const luuGoodStars: string[][] = Array(12).fill(null).map(() => []);
  const luuBadStars: string[][] = Array(12).fill(null).map(() => []);
  
  const addGood = (pos: number, name: string) => {
    if (isNaN(pos) || pos < 0 || pos >= 12) return;
    const b = getMinorStarBrightness(name, pos);
    goodStars[pos].push(b ? `${name} (${b})` : name);
  };
  const addBad = (pos: number, name: string) => {
    if (isNaN(pos) || pos < 0 || pos >= 12) return;
    const b = getMinorStarBrightness(name, pos);
    badStars[pos].push(b ? `${name} (${b})` : name);
  };
  const addLuuGood = (pos: number, name: string) => {
    if (isNaN(pos) || pos < 0 || pos >= 12) return;
    luuGoodStars[pos].push(name);
  };
  const addLuuBad = (pos: number, name: string) => {
    if (isNaN(pos) || pos < 0 || pos >= 12) return;
    luuBadStars[pos].push(name);
  };

  // Tả Phù, Hữu Bật
  addGood((4 + month - 1) % 12, "Tả Phù");
  addGood((10 - month + 1 + 12) % 12, "Hữu Bật");

  // Văn Xương, Văn Khúc
  const vanXuongPos = (10 - hourChi + 12) % 12;
  const vanKhucPos = (4 + hourChi) % 12;
  addGood(vanXuongPos, "Văn Xương");
  addGood(vanKhucPos, "Văn Khúc");

  const stemIdx = STEMS.indexOf(yearStem);
  const branchIdx = BRANCHES.indexOf(yearBranch);

  // Khôi Việt
  const khoiVietMap = [
    [1, 7], [0, 8], [11, 9], [11, 9], [1, 7], [0, 8], [1, 7], [6, 2], [3, 5], [3, 5]
  ];
  if (stemIdx !== -1) {
    addGood(khoiVietMap[stemIdx][0], "Thiên Khôi");
    addGood(khoiVietMap[stemIdx][1], "Thiên Việt");
  }

  // Lộc Tồn, Kình Dương, Đà La
  const locTonMap = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
  let locTonPos = -1;
  if (stemIdx !== -1) {
    locTonPos = locTonMap[stemIdx];
    addGood(locTonPos, "Lộc Tồn");
    addBad((locTonPos + 1) % 12, "Kình Dương");
    addBad((locTonPos - 1 + 12) % 12, "Đà La");
  }

  // Không Kiếp
  addBad((11 - hourChi + 12) % 12, "Địa Không");
  addBad((11 + hourChi) % 12, "Địa Kiếp");

  // Hỏa Linh
  if (branchIdx !== -1) {
    let hoaStart = 0, linhStart = 0;
    if ([2, 6, 10].includes(branchIdx)) { hoaStart = 1; linhStart = 3; } // Dần Ngọ Tuất
    else if ([8, 0, 4].includes(branchIdx)) { hoaStart = 2; linhStart = 10; } // Thân Tý Thìn
    else if ([5, 9, 1].includes(branchIdx)) { hoaStart = 3; linhStart = 10; } // Tỵ Dậu Sửu
    else if ([11, 3, 7].includes(branchIdx)) { hoaStart = 9; linhStart = 10; } // Hợi Mão Mùi

    const hoaPos = (hoaStart + hourChi) % 12;
    const linhPos = isThuan ? (linhStart + hourChi) % 12 : (linhStart - hourChi + 12) % 12;
    addBad(hoaPos, "Hỏa Tinh");
    addBad(linhPos, "Linh Tinh");
  }

  // Vòng Thái Tuế
  if (branchIdx !== -1) {
    const thaiTueStars = ["Thái Tuế", "Thiếu Dương", "Tang Môn", "Thiếu Âm", "Quan Phù", "Tử Phù", "Tuế Phá", "Long Đức", "Bạch Hổ", "Phúc Đức", "Điếu Khách", "Trực Phù"];
    const thaiTueGood = ["Thiếu Dương", "Thiếu Âm", "Long Đức", "Phúc Đức"];
    for (let i = 0; i < 12; i++) {
      const pos = (branchIdx + i) % 12;
      const star = thaiTueStars[i];
      if (thaiTueGood.includes(star)) addGood(pos, star);
      else addBad(pos, star);
    }
  }

  // Vòng Lộc Tồn (Bác Sĩ)
  if (locTonPos !== -1) {
    const bacSiStars = ["Bác Sĩ", "Lực Sĩ", "Thanh Long", "Tiểu Hao", "Tướng Quân", "Tấu Thư", "Phi Liêm", "Hỷ Thần", "Bệnh Phù", "Đại Hao", "Phục Binh", "Quan Phủ"];
    const bacSiGood = ["Bác Sĩ", "Lực Sĩ", "Thanh Long", "Tướng Quân", "Tấu Thư", "Hỷ Thần"];
    for (let i = 0; i < 12; i++) {
      const pos = isThuan ? (locTonPos + i) % 12 : (locTonPos - i + 12) % 12;
      const star = bacSiStars[i];
      if (bacSiGood.includes(star)) addGood(pos, star);
      else addBad(pos, star);
    }
  }

  // Các sao phụ tinh khác
  if (branchIdx !== -1) {
    const maMap: Record<number, number> = { 0: 2, 4: 2, 8: 2, 1: 11, 5: 11, 9: 11, 2: 8, 6: 8, 10: 8, 3: 5, 7: 5, 11: 5 };
    addGood(maMap[branchIdx], "Thiên Mã");

    addBad((6 - branchIdx + 12) % 12, "Thiên Khốc");
    addBad((6 + branchIdx) % 12, "Thiên Hư");

    addGood((4 + branchIdx) % 12, "Long Trì");
    const phuongCacPos = (10 - branchIdx + 12) % 12;
    addGood(phuongCacPos, "Phượng Các");
    addGood(phuongCacPos, "Giải Thần");

    const hoaCaiMap: Record<number, number> = { 0: 4, 4: 4, 8: 4, 1: 1, 5: 1, 9: 1, 2: 10, 6: 10, 10: 10, 3: 7, 7: 7, 11: 7 };
    addGood(hoaCaiMap[branchIdx], "Hoa Cái");

    const kiepSatMap: Record<number, number> = { 0: 5, 4: 5, 8: 5, 1: 2, 5: 2, 9: 2, 2: 11, 6: 11, 10: 11, 3: 8, 7: 8, 11: 8 };
    addBad(kiepSatMap[branchIdx], "Kiếp Sát");

    const daoHoaMap: Record<number, number> = { 0: 9, 4: 9, 8: 9, 1: 6, 5: 6, 9: 6, 2: 3, 6: 3, 10: 3, 3: 0, 7: 0, 11: 0 };
    addGood(daoHoaMap[branchIdx], "Đào Hoa");

    const hongLoanPos = (3 - branchIdx + 12) % 12;
    addGood(hongLoanPos, "Hồng Loan");
    addGood((hongLoanPos + 6) % 12, "Thiên Hỷ");
    
    const coThanMap: Record<number, number> = { 11: 2, 0: 2, 1: 2, 2: 5, 3: 5, 4: 5, 5: 8, 6: 8, 7: 8, 8: 11, 9: 11, 10: 11 };
    const quaTuMap: Record<number, number> = { 11: 10, 0: 10, 1: 10, 2: 1, 3: 1, 4: 1, 5: 4, 6: 4, 7: 4, 8: 7, 9: 7, 10: 7 };
    addBad(coThanMap[branchIdx], "Cô Thần");
    addBad(quaTuMap[branchIdx], "Quả Tú");

    addBad((branchIdx + 1) % 12, "Thiên Không");
    
    addGood((menhPos + branchIdx) % 12, "Thiên Tài");
    addGood((thanPos + branchIdx) % 12, "Thiên Thọ");
  }

  const thienDieuPos = (1 + month - 1) % 12;
  addBad((9 + month - 1) % 12, "Thiên Hình");
  addBad(thienDieuPos, "Thiên Diêu");
  addGood(thienDieuPos, "Thiên Y");

  addGood((vanXuongPos + lunarDay - 2 + 12) % 12, "Ân Quang");
  addGood((vanKhucPos - lunarDay + 2 + 12) % 12, "Thiên Quý");

  const taPhuPos = (4 + month - 1) % 12;
  const huuBatPos = (10 - month + 1 + 12) % 12;
  addGood((taPhuPos + lunarDay - 1) % 12, "Tam Thai");
  addGood((huuBatPos - lunarDay + 1 + 12) % 12, "Bát Tọa");

  addGood((vanKhucPos + 2) % 12, "Đài Phụ");
  addGood((vanKhucPos - 2 + 12) % 12, "Phong Cáo");

  // Vòng Tướng Tinh
  if (branchIdx !== -1) {
    const tuongTinhStartMap: Record<number, number> = {
      2: 6, 6: 6, 10: 6, // Dần Ngọ Tuất -> Ngọ (6)
      8: 0, 0: 0, 4: 0,  // Thân Tý Thìn -> Tý (0)
      5: 9, 9: 9, 1: 9,  // Tỵ Dậu Sửu -> Dậu (9)
      11: 3, 3: 3, 7: 3  // Hợi Mão Mùi -> Mão (3)
    };
    const tuongTinhPos = tuongTinhStartMap[branchIdx];
    
    if (tuongTinhPos !== undefined) {
        const vongTuongTinh = [
          { name: "Tướng Tinh", type: "good" },
          { name: "Phan An", type: "good" },
          { name: "Thiên Mã", type: "good" }, // Đã có
          { name: "Tức Thần", type: "bad" },
          { name: "Hoa Cái", type: "good" }, // Đã có
          { name: "Kiếp Sát", type: "bad" }, // Đã có
          { name: "Tai Sát", type: "bad" },
          { name: "Thiên Sát", type: "bad" },
          { name: "Chỉ Bối", type: "bad" },
          { name: "Đào Hoa", type: "good" }, // Đã có
          { name: "Nguyệt Đức", type: "good" },
          { name: "Thiên Đức", type: "good" }
        ];
        
        const existingStars = ["Thiên Mã", "Hoa Cái", "Kiếp Sát", "Đào Hoa"];
        
        for(let i=0; i<12; i++) {
          const star = vongTuongTinh[i];
          if (existingStars.includes(star.name)) continue;
          
          const pos = (tuongTinhPos + i) % 12;
          if (star.type === "good") addGood(pos, star.name);
          else addBad(pos, star.name);
        }
    }
  }

  // Lưu Stars
  const tBranchIdx = BRANCHES.indexOf(transitYearBranch);
  const tStemIdx = STEMS.indexOf(transitYearStem);
  
  if (tBranchIdx !== -1) {
    addLuuBad(tBranchIdx, "L.Thái Tuế");
    addLuuBad((tBranchIdx + 2) % 12, "L.Tang Môn");
    addLuuBad((tBranchIdx + 8) % 12, "L.Bạch Hổ");
    addLuuBad((6 - tBranchIdx + 12) % 12, "L.Thiên Khốc");
    addLuuBad((6 + tBranchIdx) % 12, "L.Thiên Hư");
    const maMap: Record<number, number> = { 0: 2, 4: 2, 8: 2, 1: 11, 5: 11, 9: 11, 2: 8, 6: 8, 10: 8, 3: 5, 7: 5, 11: 5 };
    if (maMap[tBranchIdx] !== undefined) {
      addLuuGood(maMap[tBranchIdx], "L.Thiên Mã");
    }
  }
  
  if (tStemIdx !== -1) {
    const tLocTonPos = locTonMap[tStemIdx];
    addLuuGood(tLocTonPos, "L.Lộc Tồn");
    addLuuBad((tLocTonPos + 1) % 12, "L.Kình Dương");
    addLuuBad((tLocTonPos - 1 + 12) % 12, "L.Đà La");
  }

  return { goodStars, badStars, luuGoodStars, luuBadStars };
}

export const KHAM_THIEN_TU_HOA: Record<string, string[]> = {
  "Giáp": ["Liêm Trinh", "Phá Quân", "Vũ Khúc", "Thái Dương"],
  "Ất": ["Thiên Cơ", "Thiên Lương", "Tử Vi", "Thái Âm"],
  "Bính": ["Thiên Đồng", "Thiên Cơ", "Văn Xương", "Liêm Trinh"],
  "Đinh": ["Thái Âm", "Thiên Đồng", "Thiên Cơ", "Cự Môn"],
  "Mậu": ["Tham Lang", "Thái Âm", "Hữu Bật", "Thiên Cơ"],
  "Kỷ": ["Vũ Khúc", "Tham Lang", "Thiên Lương", "Văn Khúc"],
  "Canh": ["Thái Dương", "Vũ Khúc", "Thái Âm", "Thiên Đồng"],
  "Tân": ["Cự Môn", "Thái Dương", "Văn Khúc", "Văn Xương"],
  "Nhâm": ["Thiên Lương", "Tử Vi", "Tả Phù", "Vũ Khúc"],
  "Quý": ["Phá Quân", "Cự Môn", "Thái Âm", "Tham Lang"]
};

export function getTuHoa(yearStem: string, stars: string[][], goodStars: string[][], badStars: string[][]): string[][] {
  const tuHoa: string[][] = Array(12).fill(null).map(() => []);
  const TU_HOA_NAMES = ["Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ"];
  
  const targets = KHAM_THIEN_TU_HOA[yearStem];
  if (!targets) return tuHoa;

  for (let i = 0; i < 4; i++) {
    const target = targets[i].toUpperCase();
    for (let chi = 0; chi < 12; chi++) {
      const allStarsInCell = [...stars[chi], ...goodStars[chi], ...badStars[chi]];
      if (allStarsInCell.some(s => s.toUpperCase().startsWith(target))) {
        tuHoa[chi].push(TU_HOA_NAMES[i]);
        break;
      }
    }
  }
  return tuHoa;
}

export function getTuHoaCung(cellCans: string[], stars: string[][], goodStars: string[][], badStars: string[][], menhPos: number) {
  const tuHoaCung: string[][] = Array(12).fill(null).map(() => []);
  const phiHoa: string[][] = Array(12).fill(null).map(() => []);
  const TU_HOA_NAMES = ["Lộc", "Quyền", "Khoa", "Kỵ"];
  const HOUSE_NAMES_SHORT = [
    "Mệnh", "Huynh", "Phu", "Tử", 
    "Tài", "Tật", "Di", "Nô", 
    "Quan", "Điền", "Phúc", "Phụ"
  ];

  const starPositions: Record<string, number> = {};
  for (let chi = 0; chi < 12; chi++) {
    const allStars = [...stars[chi], ...goodStars[chi], ...badStars[chi]];
    for (const star of allStars) {
      const cleanName = star.split(' (')[0].trim().toUpperCase();
      starPositions[cleanName] = chi;
    }
  }

  for (let chi = 0; chi < 12; chi++) {
    const can = cellCans[chi];
    const targets = KHAM_THIEN_TU_HOA[can];
    if (!targets) continue;

    for (let i = 0; i < 4; i++) {
      const targetStar = targets[i].toUpperCase();
      const targetPos = starPositions[targetStar];
      
      if (targetPos !== undefined) {
        if (targetPos === chi) {
          tuHoaCung[chi].push(`${TU_HOA_NAMES[i]} tự hóa`);
        } else {
          // Calculate house name relative to Menh
          // HOUSES in TuviChart are: Mệnh, Huynh, Phu, Tử, Tài, Tật, Di, Nô, Quan, Điền, Phúc, Phụ
          // This corresponds to counter-clockwise positions from Menh: 0, 1, 2...
          // But 'chi' increases clockwise.
          // So if Menh is at menhPos.
          // Target is at targetPos.
          // Distance (counter-clockwise) = (menhPos - targetPos + 12) % 12.
          const houseIdx = (menhPos - targetPos + 12) % 12;
          const houseName = HOUSE_NAMES_SHORT[houseIdx];
          phiHoa[chi].push(`${TU_HOA_NAMES[i]} \u2192 ${houseName}`);
        }
      }
    }
  }

  return { tuHoaCung, phiHoa };
}

export function getNguyetHan(month: number, hourChi: number, transitYearStem: string, transitYearBranch: string) {
  const nguyetHan: { month: number, canChi: string }[] = Array(12).fill(null);
  
  const transitYearBranchIdx = BRANCHES.indexOf(transitYearBranch);
  const transitYearStemIdx = STEMS.indexOf(transitYearStem);
  
  const dauQuanPos = (transitYearBranchIdx - (month - 1) + hourChi + 12) % 12;
  
  // Month 1 stem is determined by "Ngũ Hổ Độn" from the year stem.
  // Giáp Kỷ chi niên Bính tác thủ => Year Stem index 0 (Giáp) or 5 (Kỷ) -> Month 1 Stem is Bính (index 2).
  // (0 % 5) * 2 + 2 = 2. Correct.
  const month1StemIdx = (transitYearStemIdx % 5) * 2 + 2;

  for (let chi = 0; chi < 12; chi++) {
    // Calculate which month falls into this 'chi' position relative to Dau Quan
    // Dau Quan is always Month 1.
    // So if chi == dauQuanPos, it is Month 1.
    // if chi == dauQuanPos + 1, it is Month 2.
    const m = (chi - dauQuanPos + 12) % 12 + 1;
    
    // Calculate Can Chi for month 'm'
    const mStemIdx = (month1StemIdx + m - 1) % 10;
    const mBranchIdx = (m + 1) % 12; // Month 1 is Dần (2), Month 2 is Mão (3)...
    
    const mCanChi = `${STEMS[mStemIdx]} ${BRANCHES[mBranchIdx]}`;
    
    nguyetHan[chi] = { month: m, canChi: mCanChi };
  }
  
  return nguyetHan;
}

export function getTuanTriet(yearStem: string, yearBranch: string) {
  const stemIdx = STEMS.indexOf(yearStem);
  const branchIdx = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"].indexOf(yearBranch);
  
  let triet: number[] = [];
  if (stemIdx === 0 || stemIdx === 5) triet = [8, 9];
  else if (stemIdx === 1 || stemIdx === 6) triet = [6, 7];
  else if (stemIdx === 2 || stemIdx === 7) triet = [4, 5];
  else if (stemIdx === 3 || stemIdx === 8) triet = [2, 3];
  else if (stemIdx === 4 || stemIdx === 9) triet = [0, 1];

  const head = (branchIdx - stemIdx + 12) % 12;
  const tuan = [(head - 1 + 12) % 12, (head - 2 + 12) % 12];

  return { tuan, triet };
}

export function getChuMenh(yearBranch: string): string {
  const map: Record<string, string> = {
    "Tý": "Tham Lang",
    "Sửu": "Cự Môn", "Hợi": "Cự Môn",
    "Dần": "Lộc Tồn", "Tuất": "Lộc Tồn",
    "Mão": "Văn Khúc", "Dậu": "Văn Khúc",
    "Thìn": "Liêm Trinh", "Thân": "Liêm Trinh",
    "Tỵ": "Vũ Khúc", "Mùi": "Vũ Khúc",
    "Ngọ": "Phá Quân"
  };
  return map[yearBranch] || "";
}

export function getChuThan(yearBranch: string): string {
  const map: Record<string, string> = {
    "Tý": "Hỏa Tinh", "Ngọ": "Hỏa Tinh",
    "Sửu": "Thiên Tướng", "Mùi": "Thiên Tướng",
    "Dần": "Thiên Lương", "Thân": "Thiên Lương",
    "Mão": "Thiên Đồng", "Dậu": "Thiên Đồng",
    "Thìn": "Văn Xương", "Tuất": "Văn Xương",
    "Tỵ": "Thiên Cơ", "Hợi": "Thiên Cơ"
  };
  return map[yearBranch] || "";
}

export function getLuuDaiVanLocation(menhPos: number, cucValue: number, isThuan: boolean, age: number) {
  if (age < cucValue) return null;
  
  const daiVanIdx = Math.floor((age - cucValue) / 10);
  const daiVanStartAge = cucValue + daiVanIdx * 10;
  
  // Position of the current Dai Van (10-year)
  const daiVanPos = isThuan ? (menhPos + daiVanIdx) % 12 : (menhPos - daiVanIdx + 12) % 12;
  
  // Position of the Luu Dai Van (1-year within the 10-year)
  // Starts at daiVanPos at daiVanStartAge
  // Moves 1 house per year in the same direction as Dai Van
  const offset = age - daiVanStartAge;
  const luuDaiVanPos = isThuan ? (daiVanPos + offset) % 12 : (daiVanPos - offset + 12) % 12;
  
  return { daiVanPos, luuDaiVanPos, daiVanStartAge };
}

export function getLaiNhanCung(yearStem: string, cellCans: string[]) {
  return cellCans.indexOf(yearStem);
}

export function getTuHoaNamSinh(yearStem: string) {
  return KHAM_THIEN_TU_HOA[yearStem] || [];
}

export const HOUSE_NAMES = ["Mệnh", "Phụ", "Phúc", "Điền", "Quan", "Nô", "Di", "Tật", "Tài", "Tử", "Phu", "Huynh"];

export function getTieuVanLocation(viewYearBranch: string, gender: 'Nam' | 'Nữ') {
  const branchIdx = BRANCHES.indexOf(viewYearBranch);
  
  // 1. Determine the starting position based on the Triangle (Tam Hợp) of the View Year
  // Dần Ngọ Tuất (2, 6, 10) -> Thìn (4)
  // Thân Tý Thìn (8, 0, 4) -> Tuất (10)
  // Tỵ Dậu Sửu (5, 9, 1) -> Mùi (7)
  // Hợi Mão Mùi (11, 3, 7) -> Sửu (1)
  
  let startPos = 0;
  if ([2, 6, 10].includes(branchIdx)) startPos = 4;
  else if ([8, 0, 4].includes(branchIdx)) startPos = 10;
  else if ([5, 9, 1].includes(branchIdx)) startPos = 7;
  else if ([11, 3, 7].includes(branchIdx)) startPos = 1;
  
  // 2. Determine direction: Nam Thuận, Nữ Nghịch
  const isThuan = gender === 'Nam';
  
  // 3. The "Tiểu Vận" for the view year is at 'startPos'.
  // But wait, the standard way is:
  // The 'startPos' is where the Year Branch (e.g. Tý) is placed?
  // Or is it where "Tiểu Vận" starts?
  // Usually, we label the house at 'startPos' as the "Tiểu Vận" for the year.
  // And relative houses flow from there.
  
  // Let's return the position and direction.
  return { pos: startPos, isThuan };
}

export function getDauQuanFixed(yearBranch: string, month: number, hourChi: number) {
  const yearBranchIdx = BRANCHES.indexOf(yearBranch);
  // Formula: Year Branch (Counter-Clockwise to Month) -> (Clockwise to Hour)
  // Start at yearBranchIdx.
  // Count Reverse to Month: - (month - 1)
  // Count Forward to Hour: + hourChi
  const pos = (yearBranchIdx - (month - 1) + hourChi + 120) % 12;
  return pos;
}

export function getDauQuanLocation(month: number, hourChi: number, transitYearBranch: string) {
  return getDauQuanFixed(transitYearBranch, month, hourChi);
}

export function getRelativeHouseLabels(anchorPos: number, prefix: string, isThuan: boolean = false) {
  const labels = Array(12).fill("");
  for (let i = 0; i < 12; i++) {
    // Standard Tu Vi house layout is Counter-Clockwise (Nghịch) from the anchor
    // If isThuan (Clockwise):
    // i == anchorPos -> Mệnh (idx 0)
    // i == anchorPos + 1 -> Phụ (idx 1)
    // idx = (i - anchorPos + 12) % 12
    
    // If !isThuan (Counter-Clockwise):
    // i == anchorPos -> Mệnh (idx 0)
    // i == anchorPos - 1 -> Phụ (idx 1)
    // idx = (anchorPos - i + 12) % 12
    
    let houseIdx;
    if (isThuan) {
      houseIdx = (i - anchorPos + 12) % 12;
    } else {
      houseIdx = (anchorPos - i + 12) % 12;
    }
    
    labels[i] = `${prefix}.${HOUSE_NAMES[houseIdx]}`;
  }
  return labels;
}
