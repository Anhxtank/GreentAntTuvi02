export const NAP_AM: Record<string, string> = {
  "Giáp Tý": "Hải trung kim", "Ất Sửu": "Hải trung kim",
  "Bính Dần": "Lư trung hỏa", "Đinh Mão": "Lư trung hỏa",
  "Mậu Thìn": "Đại lâm mộc", "Kỷ Tỵ": "Đại lâm mộc",
  "Canh Ngọ": "Lộ bàng thổ", "Tân Mùi": "Lộ bàng thổ",
  "Nhâm Thân": "Kiếm phong kim", "Quý Dậu": "Kiếm phong kim",
  "Giáp Tuất": "Sơn đầu hỏa", "Ất Hợi": "Sơn đầu hỏa",
  "Bính Tý": "Giản hạ thủy", "Đinh Sửu": "Giản hạ thủy",
  "Mậu Dần": "Thành đầu thổ", "Kỷ Mão": "Thành đầu thổ",
  "Canh Thìn": "Bạch lạp kim", "Tân Tỵ": "Bạch lạp kim",
  "Nhâm Ngọ": "Dương liễu mộc", "Quý Mùi": "Dương liễu mộc",
  "Giáp Thân": "Tuyền trung thủy", "Ất Dậu": "Tuyền trung thủy",
  "Bính Tuất": "Ốc thượng thổ", "Đinh Hợi": "Ốc thượng thổ",
  "Mậu Tý": "Tích lịch hỏa", "Kỷ Sửu": "Tích lịch hỏa",
  "Canh Dần": "Tùng bách mộc", "Tân Mão": "Tùng bách mộc",
  "Nhâm Thìn": "Trường lưu thủy", "Quý Tỵ": "Trường lưu thủy",
  "Giáp Ngọ": "Sa trung kim", "Ất Mùi": "Sa trung kim",
  "Bính Thân": "Sơn hạ hỏa", "Đinh Dậu": "Sơn hạ hỏa",
  "Mậu Tuất": "Bình địa mộc", "Kỷ Hợi": "Bình địa mộc",
  "Canh Tý": "Bích thượng thổ", "Tân Sửu": "Bích thượng thổ",
  "Nhâm Dần": "Kim bạch kim", "Quý Mão": "Kim bạch kim",
  "Giáp Thìn": "Phúc đăng hỏa", "Ất Tỵ": "Phúc đăng hỏa",
  "Bính Ngọ": "Thiên hà thủy", "Đinh Mùi": "Thiên hà thủy",
  "Mậu Thân": "Đại trạch thổ", "Kỷ Dậu": "Đại trạch thổ",
  "Canh Tuất": "Thoa xuyến kim", "Tân Hợi": "Thoa xuyến kim",
  "Nhâm Tý": "Tang đố mộc", "Quý Sửu": "Tang đố mộc",
  "Giáp Dần": "Đại khê thủy", "Ất Mão": "Đại khê thủy",
  "Bính Thìn": "Sa trung thổ", "Đinh Tỵ": "Sa trung thổ",
  "Mậu Ngọ": "Thiên thượng hỏa", "Kỷ Mùi": "Thiên thượng hỏa",
  "Canh Thân": "Thạch lựu mộc", "Tân Dậu": "Thạch lựu mộc",
  "Nhâm Tuất": "Đại hải thủy", "Quý Hợi": "Đại hải thủy"
};

export const ELEMENT_COLORS: Record<string, string> = {
  "Mộc": "#36422C", // Douglas Fir
  "Hỏa": "#4E0000", // Red Inferno
  "Thổ": "#54392D", // Potting Soil
  "Kim": "#581C87", // Purple (User requested)
  "Thủy": "#13273F", // Mystic Navy
};

export function getCanElement(can: string): string {
  if (["Giáp", "Ất"].includes(can)) return "Mộc";
  if (["Bính", "Đinh"].includes(can)) return "Hỏa";
  if (["Mậu", "Kỷ"].includes(can)) return "Thổ";
  if (["Canh", "Tân"].includes(can)) return "Kim";
  if (["Nhâm", "Quý"].includes(can)) return "Thủy";
  return "Kim";
}

export function getChiElement(chi: string): string {
  if (["Dần", "Mão"].includes(chi)) return "Mộc";
  if (["Tỵ", "Ngọ"].includes(chi)) return "Hỏa";
  if (["Thìn", "Tuất", "Sửu", "Mùi"].includes(chi)) return "Thổ";
  if (["Thân", "Dậu"].includes(chi)) return "Kim";
  if (["Hợi", "Tý"].includes(chi)) return "Thủy";
  return "Kim";
}

export function getStarElement(star: string): string {
  let s = star.toUpperCase();
  if (s.startsWith("L.")) s = s.substring(2);

  // Tứ Hóa overrides
  // Lộc -> Kim (except Lộc Tồn)
  if ((s.includes("LỘC") || s.includes("LOC")) && !s.includes("LỘC TỒN") && !s.includes("LOC TON")) return "Kim";
  
  // Quyền -> Hỏa
  if (s.includes("QUYỀN") || s.includes("QUYEN")) return "Hỏa";
  
  // Khoa -> Mộc
  if (s.includes("KHOA")) return "Mộc";
  
  // Kỵ -> Thủy
  if (s.includes("KỴ") || s.includes("KY")) return "Thủy";

  if (["TỬ VI", "THIÊN PHỦ", "TẢ PHÙ", "PHÚC ĐỨC", "LỘC TỒN", "BỆNH PHÙ", "THIÊN KHỐC", "THIÊN HƯ", "THIÊN TÀI", "THIÊN THỌ", "TAM THAI", "BÁT TỌA", "ĐÀI PHỤ", "PHONG CÁO", "ÂN QUANG", "THIÊN QUÝ", "GIẢI THẦN", "HOA CÁI"].includes(s)) return "Thổ";
  if (["THIÊN CƠ", "THIÊN LƯƠNG", "TANG MÔN", "TƯỚNG QUÂN", "THIÊN MÃ", "ĐÀO HOA"].includes(s)) return "Mộc";
  if (["THÁI DƯƠNG", "LIÊM TRINH", "THIÊN KHÔI", "THIÊN VIỆT", "HỎA TINH", "LINH TINH", "ĐỊA KHÔNG", "ĐỊA KIẾP", "THÁI TUẾ", "THIẾU DƯƠNG", "QUAN PHÙ", "TỬ PHÙ", "TUẾ PHÁ", "ĐIẾU KHÁCH", "LỰC SĨ", "TIỂU HAO", "PHI LIÊM", "HỶ THẦN", "ĐẠI HAO", "PHỤC BINH", "QUAN PHỦ", "THIÊN HÌNH", "THIÊN KHÔNG", "KIẾP SÁT"].includes(s)) return "Hỏa";
  if (["VŨ KHÚC", "THẤT SÁT", "VĂN XƯƠNG", "KÌNH DƯƠNG", "ĐÀ LA", "BẠCH HỔ", "TRỰC PHÙ", "TẤU THƯ"].includes(s)) return "Kim";
  if (["THIÊN ĐỒNG", "THÁI ÂM", "THAM LANG", "CỰ MÔN", "THIÊN TƯỚNG", "PHÁ QUÂN", "HỮU BẬT", "VĂN KHÚC", "THIẾU ÂM", "LONG ĐỨC", "BÁC SĨ", "THANH LONG", "THIÊN DIÊU", "THIÊN Y", "HỒNG LOAN", "THIÊN HỶ", "LONG TRÌ", "PHƯỢNG CÁC", "CÔ THẦN", "QUẢ TÚ"].includes(s)) return "Thủy";
  return "Kim";
}

export function getCanColor(can: string, elementColors: Record<string, string> = ELEMENT_COLORS): string {
  return elementColors[getCanElement(can)] || ELEMENT_COLORS[getCanElement(can)];
}

export function getChiColor(chi: string, elementColors: Record<string, string> = ELEMENT_COLORS): string {
  return elementColors[getChiElement(chi)] || ELEMENT_COLORS[getChiElement(chi)];
}

export function getStarColor(star: string, elementColors: Record<string, string> = ELEMENT_COLORS): string {
  return elementColors[getStarElement(star)] || ELEMENT_COLORS[getStarElement(star)];
}

export function getNapAmColor(napAm: string, elementColors: Record<string, string> = ELEMENT_COLORS): string {
  if (!napAm) return "#6B7280";
  const lower = napAm.toLowerCase();
  if (lower.includes("kim")) return elementColors["Kim"] || ELEMENT_COLORS["Kim"];
  if (lower.includes("mộc")) return elementColors["Mộc"] || ELEMENT_COLORS["Mộc"];
  if (lower.includes("thủy")) return elementColors["Thủy"] || ELEMENT_COLORS["Thủy"];
  if (lower.includes("hỏa")) return elementColors["Hỏa"] || ELEMENT_COLORS["Hỏa"];
  if (lower.includes("thổ")) return elementColors["Thổ"] || ELEMENT_COLORS["Thổ"];
  return "#6B7280";
}
