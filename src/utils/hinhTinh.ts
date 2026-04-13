import { HINH_TINH_DATA } from '../data/hinhTinh';

export interface HinhTinhResult {
  sao: string;
  yNghia: string;
  matchedBoSao: string[];
  isFromSaoColumn?: boolean;
}

const CHINH_TINH = [
  "Tử Vi", "Thiên Cơ", "Thái Dương", "Vũ Khúc", "Thiên Đồng", "Liêm Trinh", 
  "Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương", 
  "Thất Sát", "Phá Quân"
];

export function detectHinhTinh(menhPos: number, majorStars: string[][], goodStars: string[][], badStars: string[][], tuan: number[], triet: number[]): HinhTinhResult[] {
  const results: HinhTinhResult[] = [];
  
  const parseName = (s: string) => s.split(' (')[0].trim();
  const getMajorAt = (pos: number) => (majorStars[pos] || []).map(parseName);
  const getMinorAt = (pos: number) => {
    const stars = [...(goodStars[pos] || []), ...(badStars[pos] || [])].map(parseName);
    // Tuần và Triệt chỉ tính tại vị trí đóng (Mệnh), không tính đối cung, tam hợp
    if (pos === menhPos) {
      if (tuan.includes(pos)) stars.push("Tuần");
      if (triet.includes(pos)) stars.push("Triệt");
    }
    return stars;
  };
  const getAllAt = (pos: number) => [...getMajorAt(pos), ...getMinorAt(pos)];

  const menhStars = getAllAt(menhPos);
  
  const tamHop = [menhPos, (menhPos + 4) % 12, (menhPos + 8) % 12];
  const xungChieu = (menhPos + 6) % 12;
  const quanTrong = [...tamHop, xungChieu]; // Mệnh, Tam hợp, Xung chiếu
  
  const allQuanTrongStars = quanTrong.flatMap(pos => getAllAt(pos));

  for (const item of HINH_TINH_DATA) {
    let matched = false;
    let matchedBoSao: string[] = [];
    let saoName = "";
    let isFromSaoColumn = false;

    // 2. Mệnh có chứa sao trong cột Sao
    if (item.sao && menhStars.includes(item.sao)) {
      matched = true;
      saoName = item.sao;
      isFromSaoColumn = true;
    }

    // 3. Đối cung, đồng cung, tam hợp có xuất hiện sao trong cột Bộ sao
    if (item.boSao && item.boSao.length > 0) {
      // Bỏ qua các bộ sao hoàn toàn là chính tinh
      const isAllChinhTinh = item.boSao.every(s => CHINH_TINH.includes(s));
      
      if (isAllChinhTinh && item.boSao.length === 2) {
        // Trường hợp 2 chính tinh cùng đóng tại cung Mệnh
        const bothInMenh = item.boSao.every(s => menhStars.includes(s));
        if (bothInMenh) {
          matched = true;
          matchedBoSao = item.boSao;
          saoName = item.boSao.join(" - ");
          isFromSaoColumn = true; // Treat as from Sao column to prioritize
        }
      } else if (!isAllChinhTinh) {
        // Nếu bộ sao có chứa Tuần hoặc Triệt, thì TẤT CẢ các sao trong bộ đó phải nằm ở Mệnh
        const hasTuanTriet = item.boSao.includes("Tuần") || item.boSao.includes("Triệt");
        
        if (hasTuanTriet) {
          const allInMenh = item.boSao.every(s => menhStars.includes(s));
          if (allInMenh) {
            matched = true;
            matchedBoSao = item.boSao;
            if (!saoName) {
              saoName = item.boSao.join(' + ');
            }
          }
        } else {
          // Check if ALL stars in the boSao array are present in Mệnh, Tam hợp, Xung chiếu
          const allPresent = item.boSao.every(s => allQuanTrongStars.includes(s));
          if (allPresent) {
            matched = true;
            matchedBoSao = item.boSao;
            if (!saoName) {
              saoName = item.boSao.join(' + ');
            }
          }
        }
      }
    }

    if (matched) {
      // Avoid duplicates if same meaning is added
      if (!results.some(r => r.yNghia === item.yNghia)) {
        results.push({
          sao: saoName,
          yNghia: item.yNghia,
          matchedBoSao,
          isFromSaoColumn
        });
      }
    }
  }

  // Lọc bỏ các sao đơn lẻ nếu chúng nằm trong bộ 2 chính tinh ở Mệnh
  const bo2ChinhTinh = results.filter(r => r.matchedBoSao.length === 2 && r.matchedBoSao.every(s => CHINH_TINH.includes(s)));
  const starsToIgnore = bo2ChinhTinh.flatMap(r => r.matchedBoSao);
  
  let finalResults = results.filter(r => {
    if (r.matchedBoSao.length === 0 && starsToIgnore.includes(r.sao)) {
      return false; // Bỏ qua sao đơn lẻ
    }
    return true;
  });

  // Lọc bỏ các bộ sao con nếu có bộ sao lớn hơn (>= 3 sao) đã thỏa mãn
  finalResults = finalResults.filter((r1, index, self) => {
    // Nếu là kết quả từ cột Sao hoặc không có bộ sao, giữ nguyên
    if (r1.isFromSaoColumn && r1.matchedBoSao.length === 0) return true;
    if (r1.matchedBoSao.length === 0) return true;

    // Kiểm tra xem r1 có phải là tập con của một bộ sao lớn hơn (>= 3 sao) nào đó không
    const isSubsetOfLarger = self.some(r2 => {
      if (r1 === r2) return false;
      if (r2.matchedBoSao.length < 3) return false; // Chỉ xét bị bao hàm bởi bộ >= 3 sao
      if (r2.matchedBoSao.length <= r1.matchedBoSao.length) return false;
      
      // Kiểm tra tất cả các sao của r1 đều nằm trong r2
      return r1.matchedBoSao.every(star => r2.matchedBoSao.includes(star));
    });

    return !isSubsetOfLarger;
  });

  // Ưu tiên hiển thị các sao ở cột Sao lên đầu
  finalResults.sort((a, b) => {
    if (a.isFromSaoColumn && !b.isFromSaoColumn) return -1;
    if (!a.isFromSaoColumn && b.isFromSaoColumn) return 1;
    return 0;
  });

  return finalResults;
}
