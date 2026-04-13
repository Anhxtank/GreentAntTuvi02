export type LayoutName = 
  | "TỬ VI TÝ - NGỌ"
  | "TỬ VI SỬU - MÙI"
  | "TỬ VI DẦN - THÂN"
  | "TỬ VI MÃO - DẬU"
  | "TỬ VI THÌN - TUẤT"
  | "TỬ VI TỴ - HỢI";

export interface HuyenDoMeaning {
  cat: string;
  hung: string;
}

export interface MiniChartMeaning {
  title?: string;
  cat?: string;
  hung?: string;
}

export interface StarHuyenDo {
  central: HuyenDoMeaning;
  miniChart?: Record<string, MiniChartMeaning>;
  encounters: Record<string, HuyenDoMeaning>;
}

export function getEncounterMeaning(layoutName: string, baseStar: string, encounterStars: string[]): HuyenDoMeaning | null {
  if (!encounterStars || encounterStars.length === 0) return null;

  const combinedName = encounterStars.join(' - ');

  // 1. Check if hardcoded combined
  let hardcoded = THAP_NHI_HUYEN_DO[layoutName]?.[baseStar]?.encounters?.[combinedName];
  if (hardcoded) return hardcoded;

  // Check if hardcoded first star
  hardcoded = THAP_NHI_HUYEN_DO[layoutName]?.[baseStar]?.encounters?.[encounterStars[0]];
  if (hardcoded) return hardcoded;

  return null;
}

export const THAP_NHI_HUYEN_DO: Record<string, Record<string, StarHuyenDo>> = {
  "TỬ VI TÝ - NGỌ": {
    "Thái Âm": { 
      central: { cat: "Thu Liễm", hung: "Phát Xạ" }, 
      miniChart: {
        "Tỵ": {
          title: "Nguyệt Lãng Thiên Môn",
          cat: "Nội liễm, Trầm lặng, Thủ đoạn",
          hung: "Phô trương, Hư danh, Trống rỗng"
        }
      },
      encounters: {
                "Cự Môn": { cat: "Hoạch lợi", hung: "Thị phi" },
        "Liêm Trinh": { cat: "Phát triển", hung: "Duy trì" },
        "Thiên Tướng": { cat: "Thuận lợi", hung: "Biến động" },
        "Thiên Lương": { cat: "Cất nhắc", hung: "Tiếng tăm" },
        "Thất Sát": { cat: "Phát triển", hung: "Tường hòa" },
        "Thiên Đồng": { cat: "Hoạch lợi", hung: "Thị phi" },
        "Vũ Khúc": { cat: "Thuận lợi", hung: "Biến động" },
        "Thái Dương": { cat: "Cất nhắc", hung: "Tiếng tăm" },
        "Phá Quân": { cat: "Hanh thông", hung: "Thuận ý" },
        "Thiên Cơ": { cat: "Sáng nghiệp", hung: "Thuận ý" },
        "Tử Vi": { cat: "", hung: "" },
        "Thiên Phủ": { cat: "Phát triển", hung: "Duy trì" },
        "Thái Âm": { cat: "Danh vọng", hung: "Danh vọng" },
        "Tham Lang": { cat: "Hành động", hung: "Sắc dục" }
      } },
    "Tham Lang": { 
      central: { cat: "Tích Cực", hung: "Tiêu Cực" }, 
      miniChart: {
        "Ngọ": {
          cat: "Ham muốn, Dục vọng, Bất chấp",
          hung: "Dửng dưng, Lạnh nhạt, Buông bỏ"
        }
      },
      encounters: {
         "Cự Môn": { cat: "Rối ren", hung: "U ám" },
        "Liêm Trinh": { cat: "Hanh thông", hung: "Hanh thông" },
        "Thiên Tướng": { cat: "Trắc trở", hung: "Nỗ lực" },
        "Thiên Lương": { cat: "Tranh đoạt", hung: "Hành động" },
        "Thất Sát": { cat: "Biến động", hung: "Biến chuyển" },
        "Thiên Đồng": { cat: "Rối ren", hung: "U ám" },
        "Vũ Khúc": { cat: "Trắc trở", hung: "Nỗ lực" },
        "Thái Dương": { cat: "Tranh đoạt", hung: "Hành động" },
        "Phá Quân": { cat: "Tiệm tiến", hung: "Áp lực" },
        "Thiên Cơ": { cat: "Bôn ba", hung: "Lao tâm" },
        "Tử Vi": { cat: "Đắc ý", hung: "Đắc ý" },
        "Thiên Phủ": { cat: "Hanh thông", hung: "Hanh thông" },
        "Thái Âm": { cat: "Hành động", hung: "Tiến triển" },
        "Tham Lang": { cat: "", hung: "" }
      } },
    "Thiên Đồng": {
      central: { cat: "Xán Lạn", hung: "Âm Ấm" }, 
      miniChart: {
        "Mùi": {
          cat: "Lạc quan, Tự tin, Bình đạm",
          hung: "Bi quan, Tự ti, Khổ tâm"
        }
      },
      encounters: {
        "Cự Môn": { cat: "", hung: "" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Trắc trở", hung: "Nỗ lực" },
        "Thiên Lương": { cat: "Xán lạn", hung: "Áp lực" },
        "Thất Sát": { cat: "Biến động", hung: "Biến chuyển" },
        "Thiên Đồng": { cat: "", hung: "" },
        "Vũ Khúc": { cat: "Tiệm tiến", hung: "Hành động" },
        "Thái Dương": { cat: "Xán lạn", hung: "Áp lực" },
        "Phá Quân": { cat: "", hung: "" },
        "Thiên Cơ": { cat: "Bôn ba", hung: "Lao tâm" },
        "Tử Vi": { cat: "Đắc ý", hung: "Đắc ý" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Âm": { cat: "Hành động", hung: "Tiến triển" },
        "Tham Lang": { cat: "", hung: "" }
       } },
    "Cự Môn": { 
      central: { cat: "Xán Lạn", hung: "Âm Ấm" }, 
      encounters: {
        "Cự Môn": { cat: "", hung: "" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Trắc trở", hung: "Nỗ lực" },
        "Thiên Lương": { cat: "Xán lạn", hung: "Áp lực" },
        "Thất Sát": { cat: "Biến động", hung: "Biến chuyển" },
        "Thiên Đồng": { cat: "", hung: "" },
        "Vũ Khúc": { cat: "Tiệm tiến", hung: "Hành động" },
        "Thái Dương": { cat: "Xán lạn", hung: "Áp lực" },
        "Phá Quân": { cat: "", hung: "" },
        "Thiên Cơ": { cat: "Bôn ba", hung: "Lao tâm" },
        "Tử Vi": { cat: "Đắc ý", hung: "Đắc ý" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Âm": { cat: "Hành động", hung: "Tiến triển" },
        "Tham Lang": { cat: "", hung: "" }
      } },
    "Vũ Khúc": { 
      central: { cat: "Uyển Chuyển", hung: "Thất Thường" }, 
      miniChart: {
        "Thân": {
          cat: "Cương liệt, Linh hoạt",
          hung: "Nhu nhược, Cứng nhắc, Yếu đuối"
        }
      },
      encounters: {
       "Cự Môn": { cat: "Rối ren", hung: "U ám" },
        "Liêm Trinh": { cat: "Hanh thông", hung: "Lao tâm" },
        "Thiên Tướng": { cat: "", hung: "" },
        "Thiên Lương": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thất Sát": { cat: "Biến động", hung: "Trắc trở" },
        "Thiên Đồng": { cat: "Rối ren", hung: "U ám" },
        "Vũ Khúc": { cat: "", hung: "" },
        "Thái Dương": { cat: "Hanh thông", hung: "Trắc trở" },
        "Phá Quân": { cat: "Tiệm tiến", hung: "Áp lực" },
        "Thiên Cơ": { cat: "Bôn ba", hung: "Lao tâm" },
        "Tử Vi": { cat: "Đắc ý", hung: "Rắc rối" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Âm": { cat: "Hành động", hung: "Kích động" },
        "Tham Lang": { cat: "Trắc trở", hung: "Nỗ lực" }  
      } },
    "Thiên Tướng": { 
      central: { cat: "Uyển Chuyển", hung: "Thất Thường" }, 
      miniChart: {
        "Thân": {
          cat: "Cương liệt, Linh hoạt",
          hung: "Nhu nhược, Cứng nhắc, Yếu đuối"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Rối ren", hung: "U ám" },
        "Liêm Trinh": { cat: "Hanh thông", hung: "Lao tâm" },
        "Thiên Tướng": { cat: "", hung: "" },
        "Thiên Lương": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thất Sát": { cat: "Biến động", hung: "Trắc trở" },
        "Thiên Đồng": { cat: "Rối ren", hung: "U ám" },
        "Vũ Khúc": { cat: "", hung: "" },
        "Thái Dương": { cat: "Hanh thông", hung: "Trắc trở" },
        "Phá Quân": { cat: "Tiệm tiến", hung: "Áp lực" },
        "Thiên Cơ": { cat: "Bôn ba", hung: "Lao tâm" },
        "Tử Vi": { cat: "Đắc ý", hung: "Rắc rối" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Âm": { cat: "Hành động", hung: "Kích động" },
        "Tham Lang": { cat: "Trắc trở", hung: "Nỗ lực" }  
      } },
    "Thái Dương": { 
      central: { cat: "Tường Hòa", hung: "Khắc Kỵ" }, 
      miniChart: {
        "Mão": {
          title: "Nhật Xuất Lôi Môn\nDương Lương Xương Lộc",
          cat: "Bình thản, Cầu tiến, Bao dung",
          hung: "Xung động, Tranh chấp, Khác biệt"
        },
        "Dậu": {
          cat: "Bình thản, Cầu tiến, Bao dung",
          hung: "Xung động, Tranh chấp, Khác biệt"
        }
      },
      encounters: {
         "Cự Môn": { cat: "Khai sáng", hung: "Hao tổn" },
        "Liêm Trinh": { cat: "Cạnh tranh", hung: "Tranh chấp" },
        "Thiên Tướng": { cat: "Trở ngại", hung: "Nạn tai" },
        "Thiên Lương": { cat: "", hung: "" },
        "Thất Sát": { cat: "Tiến bộ", hung: "Biến động" },
        "Thiên Đồng": { cat: "Khai sáng", hung: "Hao tổn" },
        "Vũ Khúc": { cat: "Trở ngại", hung: "Nạn tai" },
        "Thái Dương": { cat: "", hung: "" },
        "Phá Quân": { cat: "Hanh thông", hung: "Bị động" },
        "Thiên Cơ": { cat: "Phát triển", hung: "Lận đận" },
        "Tử Vi": { cat: "Độc lập", hung: "Yếu nhược" },
        "Thiên Phủ": { cat: "Cạnh tranh", hung: "Tranh chấp" },
        "Thái Âm": { cat: "Hành động", hung: "Kích động" },
        "Tham Lang": { cat: "Đắc ý", hung: "Trắc trở" }  
      } },
    "Thiên Lương": { 
      central: { cat: "Tường Hòa", hung: "Khắc Kỵ" }, 
      miniChart: {
        "Mão": {
          title: "Nhật Xuất Lôi Môn\nDương Lương Xương Lộc",
          cat: "Bình thản, Cầu tiến, Bao dung",
          hung: "Xung động, Tranh chấp, Khác biệt"
        },
        "Dậu": {
          cat: "Bình thản, Cầu tiến, Bao dung",
          hung: "Xung động, Tranh chấp, Khác biệt"
        }
      },
      encounters: {
                 "Cự Môn": { cat: "Khai sáng", hung: "Hao tổn" },
        "Liêm Trinh": { cat: "Cạnh tranh", hung: "Tranh chấp" },
        "Thiên Tướng": { cat: "Trở ngại", hung: "Nạn tai" },
        "Thiên Lương": { cat: "", hung: "" },
        "Thất Sát": { cat: "Tiến bộ", hung: "Biến động" },
        "Thiên Đồng": { cat: "Khai sáng", hung: "Hao tổn" },
        "Vũ Khúc": { cat: "Trở ngại", hung: "Nạn tai" },
        "Thái Dương": { cat: "", hung: "" },
        "Phá Quân": { cat: "Hanh thông", hung: "Bị động" },
        "Thiên Cơ": { cat: "Phát triển", hung: "Lận đận" },
        "Tử Vi": { cat: "Độc lập", hung: "Yếu nhược" },
        "Thiên Phủ": { cat: "Cạnh tranh", hung: "Tranh chấp" },
        "Thái Âm": { cat: "Hành động", hung: "Kích động" },
        "Tham Lang": { cat: "Đắc ý", hung: "Trắc trở" }  
      } },
    "Thất Sát": { 
      central: { cat: "Lý Tưởng", hung: "Huyễn Tưởng" }, 
      miniChart: {
        "Tuất": {
          cat: "Bình thản, Cầu tiến, Bao dung",
          hung: "Xung động, Tranh chấp, Khác biệt"
        }
      },
      encounters: {
                         "Cự Môn": { cat: "Cô độc", hung: "Trầm luân" },
        "Liêm Trinh": { cat: "Bình ổn", hung: "Mù quáng" },
        "Thiên Tướng": { cat: "Trở ngại", hung: "Nạn tai" },
        "Thiên Lương": { cat: "Áp lực", hung: "Vọng động" },
        "Thất Sát": { cat: "", hung: "" },
        "Thiên Đồng": { cat: "Cô độc", hung: "Trầm luân" },
        "Vũ Khúc": { cat: "Trở ngại", hung: "Nạn tai" },
        "Thái Dương": { cat: "Áp lực", hung: "Vọng động" },
        "Phá Quân": { cat: "Hành động", hung: "Bất mãn" },
        "Thiên Cơ": { cat: "Tiệm tiến", hung: "Trở ngại" },
        "Tử Vi": { cat: "Độc lập", hung: "Kích động" },
        "Thiên Phủ": { cat: "Bình ổn", hung: "Mù quáng" },
        "Thái Âm": { cat: "Hành động", hung: "Kích động" },
        "Tham Lang": { cat: "Theo đuổi", hung: "Trắc trở" }  
      } },
    "Thiên Cơ": { 
      central: { cat: "Kế Hoạch", hung: "Mưu Mô" }, 
          miniChart: {
        "Hợi": {
          title: "Nguyệt lãng Thiên Môn",
          cat: "Hoạch định, Chính danh",
          hung: "Tính toán, Thủ đoạn"
        }
      },
      encounters: {
                          "Cự Môn": { cat: "Vất vả", hung: "Hao tổn" },
        "Liêm Trinh": { cat: "Bình ổn", hung: "Mù quáng" },
        "Thiên Tướng": { cat: "Trở ngại", hung: "Nạn tai" },
        "Thiên Lương": { cat: "Cơ hội", hung: "Tranh chấp" },
        "Thất Sát": { cat: "Tiệm tiến", hung: "Biến động" },
        "Thiên Đồng": { cat: "Vất vả", hung: "Hao tổn" },
        "Vũ Khúc": { cat: "Trở ngại", hung: "Nạn tai" },
        "Thái Dương": { cat: "Cơ hội", hung: "Tranh chấp" },
        "Phá Quân": { cat: "Cẩn trọng", hung: "Sai lầm" },
        "Thiên Cơ": { cat: "", hung: "" },
        "Tử Vi": { cat: "Khó nhọc", hung: "Lao tâm" },
        "Thiên Phủ": { cat: "Đè nén", hung: "Thích nghi" },
        "Thái Âm": { cat: "Hành động", hung: "Kích động" },
        "Tham Lang": { cat: "Thận trọng", hung: "Thị phi" }        
      } },
    "Tử Vi": { 
      central: { cat: "Vật Chất", hung: "Tinh Thần" }, 
      miniChart: {
        "Tý": {
          title: "Cực hướng Ly Minh",
          cat: "Thú vui, Hưởng thụ, Tổ chức",
          hung: "Độc đoán, Cá tính, Quyết liệt"
        }
      },
      encounters: {
                                 "Cự Môn": { cat: "Hoạch lợi", hung: "Thị phi" },
        "Liêm Trinh": { cat: "Phát triển", hung: "Duy trì" },
        "Thiên Tướng": { cat: "Thuận lợi", hung: "Biến động" },
        "Thiên Lương": { cat: "Cất nhắc", hung: "Tiếng tăm" },
        "Thất Sát": { cat: "Phát triển", hung: "Tường hòa" },
        "Thiên Đồng": { cat: "Hoạch lợi", hung: "Thị phi" },
        "Vũ Khúc": { cat: "Thuận lợi", hung: "Biến động" },
        "Thái Dương": { cat: "Cất nhắc", hung: "Tiếng tăm" },
        "Phá Quân": { cat: "Hanh thông", hung: "Thuận ý" },
        "Thiên Cơ": { cat: "Sáng nghiệp", hung: "Thuận ý" },
        "Tử Vi": { cat: "", hung: "" },
        "Thiên Phủ": { cat: "Phát triển", hung: "Duy trì" },
        "Thái Âm": { cat: "Danh vọng", hung: "Danh vọng" },
        "Tham Lang": { cat: "Hành động", hung: "Sắc dục" }         
      } 
    },
    "Phá Quân": { 
      central: { cat: "Thuận Tòng", hung: "Phản Kháng" }, 
       miniChart: {
        "Dần": {
          cat: "Cương trực, Quật cường, Hào sảng",
          hung: "Sỗ sàng, Tranh đấu, Mạo hiểm"
        }
      },
      encounters: {
                                 "Cự Môn": { cat: "Khó khăn", hung: "Trắc trở" },
        "Liêm Trinh": { cat: "Phát triển", hung: "Duy trì" },
        "Thiên Tướng": { cat: "Thuận lợi", hung: "Biến động" },
        "Thiên Lương": { cat: "Cất nhắc", hung: "Tiếng tăm" },
        "Thất Sát": { cat: "Phát triển", hung: "Tường hòa" },
        "Thiên Đồng": { cat: "Khó khăn", hung: "Trắc trở" },
        "Vũ Khúc": { cat: "Thuận lợi", hung: "Biến động" },
        "Thái Dương": { cat: "Cất nhắc", hung: "Tiếng tăm" },
        "Phá Quân": { cat: "", hung: "" },
        "Thiên Cơ": { cat: "Biến động", hung: "Sai lầm" },
        "Tử Vi": { cat: "Ổn trọng", hung: "Bình hòa" },
        "Thiên Phủ": { cat: "Phát triển", hung: "Duy trì" },
        "Thái Âm": { cat: "Hanh thông", hung: "Áp lực" },
        "Tham Lang": { cat: "Hành động", hung: "Hoạch phát" }         
      } 
    },
    "Liêm Trinh": { 
      central: { cat: "Lý Trí", hung: "Cảm Tình" }, 
       miniChart: {
        "Thìn": {
          cat: "Lý tính, Cẩn trọng, Giữ gìn",
          hung: "Tình cảm, Trinh tiết, Liêm chính"
        }
      },
      encounters: {
                                 "Cự Môn": { cat: "Phát triển", hung: "U ám" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Trắc trở", hung: "Rối ren" },
        "Thiên Lương": { cat: "Danh lợi", hung: "Bình hòa" },
        "Thất Sát": { cat: "Biến động", hung: "Trở ngại" },
        "Thiên Đồng": { cat: "Phát triển", hung: "U ám" },
        "Vũ Khúc": { cat: "Trắc trở", hung: "Rối ren" },
        "Thái Dương": { cat: "Danh lợi", hung: "Bình hòa" },
        "Phá Quân": { cat: "Tiệm tiến", hung: "Tổn thương" },
        "Thiên Cơ": { cat: "Phát triển", hung: "Cảm tính" },
        "Tử Vi": { cat: "Đắc ý", hung: "Thuận lợi" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Âm": { cat: "Hanh thông", hung: "Khổ tâm" },
        "Tham Lang": { cat: "Hành động", hung: "Tiến triển" }
      } 
    },
    "Thiên Phủ": { 
      central: { cat: "Lý Trí", hung: "Cảm Tình" }, 
      miniChart: {
        "Thìn": {
          cat: "Lý tính, Cẩn trọng, Giữ gìn",
          hung: "Tình cảm, Trinh tiết, Liêm chính"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Phát triển", hung: "U ám" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Trắc trở", hung: "Rối ren" },
        "Thiên Lương": { cat: "Danh lợi", hung: "Bình hòa" },
        "Thất Sát": { cat: "Biến động", hung: "Trở ngại" },
        "Thiên Đồng": { cat: "Phát triển", hung: "U ám" },
        "Vũ Khúc": { cat: "Trắc trở", hung: "Rối ren" },
        "Thái Dương": { cat: "Danh lợi", hung: "Bình hòa" },
        "Phá Quân": { cat: "Tiệm tiến", hung: "Tổn thương" },
        "Thiên Cơ": { cat: "Phát triển", hung: "Cảm tính" },
        "Tử Vi": { cat: "Đắc ý", hung: "Thuận lợi" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Âm": { cat: "Hanh thông", hung: "Khổ tâm" },
        "Tham Lang": { cat: "Hành động", hung: "Tiến triển" }
      } 
    }
  },
  "TỬ VI DẦN - THÂN": {
    "Cự Môn": { 
      central: { cat: "Thâm Trầm", hung: "Xung Động" },
      miniChart: {
        "Tỵ": {
          title: "Nội ngoại bất nhất",
        }
      }, 
      encounters: {
        "Cự Môn": { cat: "", hung: "" },
        "Liêm Trinh": { cat: "Bất lợi", hung: "Thị phi" },
        "Thiên Tướng": { cat: "Bất lợi", hung: "Thị phi" },
        "Thiên Lương": { cat: "Thủ đoạn", hung: "Bất hòa" },
        "Thất Sát": { cat: "Nắm quyền", hung: "Trở ngại" },
        "Thiên Đồng": { cat: "Đắc lợi", hung: "Tranh chấp" },
        "Vũ Khúc": { cat: "Mưu lợi", hung: "Tự ngạo" },
        "Thái Dương": { cat: "(Giải ám)", hung: "(Giải ám)" },
        "Phá Quân": { cat: "Kết oán", hung: "Đổi mới" },
        "Thiên Cơ": { cat: "Cẩn trọng", hung: "Trở ngại" },
        "Tử Vi": { cat: "Thăng tiến", hung: "Biến động" },
        "Thiên Phủ": { cat: "Thăng tiến", hung: "Biến động" },
        "Thái Âm": { cat: "Phát đạt", hung: "Đắc ý" },
        "Tham Lang": { cat: "Bộc phát", hung: "Tích cực" }
      } 
    },
    "Liêm Trinh": { 
      central: { cat: "Cương Nghị", hung: "Yếu Nhược" }, 
      miniChart: {
        "Ngọ": {
          cat: "Thích ứng, Đối mặt",
          hung: "Nhọc tâm, Đổ lỗi"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Khổ tâm", hung: "Khổ tâm" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "", hung: "" },
        "Thiên Lương": { cat: "Cứng nhắc", hung: "Áp lực" },
        "Thất Sát": { cat: "Nắm quyền", hung: "Trở ngại" },
        "Thiên Đồng": { cat: "Bình ổn", hung: "Tường hòa" },
        "Vũ Khúc": { cat: "Trắc trở", hung: "Duy trì" },
        "Thái Dương": { cat: "Trở mình", hung: "Ổn định" },
        "Phá Quân": { cat: "Phát huy", hung: "Đổi mới" },
        "Thiên Cơ": { cat: "Mềm mỏng", hung: "Lao tâm" },
        "Tử Vi": { cat: "Cương liệt", hung: "Biến động" },
        "Thiên Phủ": { cat: "Cương liệt", hung: "Biến động" },
        "Thái Âm": { cat: "Ổn trọng", hung: "Tường hòa" },
        "Tham Lang": { cat: "Bộc phát", hung: "Tường hòa" }
      } 
    },
    "Thiên Tướng": { 
      central: { cat: "Cương Nghị", hung: "Yếu Nhược" }, 
      miniChart: {
        "Ngọ": {
          cat: "Thích ứng, Đối mặt",
          hung: "Nhọc tâm, Đổ lỗi"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Khổ tâm", hung: "Khổ tâm" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "", hung: "" },
        "Thiên Lương": { cat: "Cứng nhắc", hung: "Áp lực" },
        "Thất Sát": { cat: "Nắm quyền", hung: "Trở ngại" },
        "Thiên Đồng": { cat: "Bình ổn", hung: "Tường hòa" },
        "Vũ Khúc": { cat: "Trắc trở", hung: "Duy trì" },
        "Thái Dương": { cat: "Trở mình", hung: "Ổn định" },
        "Phá Quân": { cat: "Phát huy", hung: "Đổi mới" },
        "Thiên Cơ": { cat: "Mềm mỏng", hung: "Lao tâm" },
        "Tử Vi": { cat: "Cương liệt", hung: "Biến động" },
        "Thiên Phủ": { cat: "Cương liệt", hung: "Biến động" },
        "Thái Âm": { cat: "Ổn trọng", hung: "Tường hòa" },
        "Tham Lang": { cat: "Bộc phát", hung: "Tường hòa" }
      } 
    },
    "Thiên Lương": { 
      central: { cat: "Chính Trực", hung: "Tinh Xảo" }, 
      miniChart: {
        "Mùi": {
          cat: "Kỷ luật, Khắc kỷ",
          hung: "Soi mói, Tiêu chuẩn kép"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Sáng nghiệp", hung: "Thuận ý" },
        "Liêm Trinh": { cat: "Bất hòa", hung: "Thị phi" },
        "Thiên Tướng": { cat: "Bất hòa", hung: "Thị phi" },
        "Thiên Lương": { cat: "", hung: "" },
        "Thất Sát": { cat: "Thị phi", hung: "Thuận ý" },
        "Thiên Đồng": { cat: "Nền móng", hung: "Gian khó" },
        "Vũ Khúc": { cat: "Phát triển", hung: "Duy trì" },
        "Thái Dương": { cat: "Danh vọng", hung: "Lộng hành" },
        "Phá Quân": { cat: "Phòng thủ", hung: "Đổi mới" },
        "Thiên Cơ": { cat: "Đầu não", hung: "Cô độc" },
        "Tử Vi": { cat: "Gánh vác", hung: "Biến động" },
        "Thiên Phủ": { cat: "Gánh vác", hung: "Biến động" },
        "Thái Âm": { cat: "Cất nhắc", hung: "Hư danh" },
        "Tham Lang": { cat: "Bộc phát", hung: "Tường hòa" }
      } 
    },
    "Thất Sát": { 
      central: { cat: "Uy Quyền", hung: "Cao Ngạo" }, 
      miniChart: {
        "Thân": {
          cat: "Nể sợ",
          hung: "Bất phục",
          title: "Nội ngoại bất nhất",
        }
      },
      encounters: {
        "Cự Môn": { cat: "Khó khăn", hung: "Trở ngại" },
        "Liêm Trinh": { cat: "Bất hòa", hung: "Áp lực" },
        "Thiên Tướng": { cat: "Bất hòa", hung: "Áp lực" },
        "Thiên Lương": { cat: "Cô lập", hung: "Bất hòa" },
        "Thất Sát": { cat: "Nể sợ", hung: "Cô độc" },
        "Thiên Đồng": { cat: "Được lòng", hung: "Tranh chấp" },
        "Vũ Khúc": { cat: "Trọng trách", hung: "Gánh vác" },
        "Thái Dương": { cat: "Khó khăn", hung: "Vất vả" },
        "Phá Quân": { cat: "Đình trệ", hung: "Xích mích" },
        "Thiên Cơ": { cat: "Gánh vác", hung: "Vất vả" },
        "Tử Vi": { cat: "Sáng tạo", hung: "Biến động" },
        "Thiên Phủ": { cat: "Sáng tạo", hung: "Biến động" },
        "Thái Âm": { cat: "Thuận lợi", hung: "Biến động" },
        "Tham Lang": { cat: "Rắc rối", hung: "Trở ngại" }
      } 
    },
    "Thiên Đồng": { 
      central: { cat: "Sung Mãn", hung: "Nóng Vội" }, 
                  miniChart: {
        "Dậu": {
          cat: "Tay trắng làm nên",
          hung: "Trầm luân, Bất đắc chí"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Trở mình", hung: "Thị phi" },
        "Liêm Trinh": { cat: "Ổn trọng", hung: "Trầm kẻm" },
        "Thiên Tướng": { cat: "Ổn trọng", hung: "Trầm kẻm" },
        "Thiên Lương": { cat: "Tu thân", hung: "Trầm luân" },
        "Thất Sát": { cat: "Bất lợi", hung: "Phóng túng" },
        "Thiên Đồng": { cat: "", hung: "" },
        "Vũ Khúc": { cat: "Sáng sủa", hung: "Ổn định" },
        "Thái Dương": { cat: "Hanh thông", hung: "Phấn khởi" },
        "Phá Quân": { cat: "Phát đạt", hung: "Toại ý" },
        "Thiên Cơ": { cat: "Gánh vác", hung: "Vất vả" },
        "Tử Vi": { cat: "Sáng tạo", hung: "Trầm ổn" },
        "Thiên Phủ": { cat: "Sáng tạo", hung: "Trầm ổn" },
        "Thái Âm": { cat: "Phát lợi", hung: "Sai lầm" },
        "Tham Lang": { cat: "Mở rộng", hung: "Lao tâm" }
      } 
    },
    "Vũ Khúc": { 
      central: { cat: "Phấn Đấu", hung: "Chần Chờ" }, 
                        miniChart: {
        "Tuất": {
          cat: "Tay trắng làm nên",
          hung: "Trầm luân, Bất đắc chí"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Rắc rối", hung: "Phòng thủ" },
        "Liêm Trinh": { cat: "Gánh vác", hung: "Cẩn trọng" },
        "Thiên Tướng": { cat: "Gánh vác", hung: "Cẩn trọng" },
        "Thiên Lương": { cat: "Tu thân", hung: "Trầm luân" },
        "Thất Sát": { cat: "Cơ hội", hung: "Tự ngạo" },
        "Thiên Đồng": { cat: "Khai sáng", hung: "Biến động" },
        "Vũ Khúc": { cat: "", hung: "" },
        "Thái Dương": { cat: "Sinh cơ", hung: "Tuyệt xứ phùng sinh" },
        "Phá Quân": { cat: "Phát đạt", hung: "Tranh giành" },
        "Thiên Cơ": { cat: "Mở rộng", hung: "Nhu nhược" },
        "Tử Vi": { cat: "Sáng tạo", hung: "Nhất thời" },
        "Thiên Phủ": { cat: "Sáng tạo", hung: "Nhất thời" },
        "Thái Âm": { cat: "Biến động", hung: "Sai lầm" },
        "Tham Lang": { cat: "Thuận lợi", hung: "Lao tâm" }
      } 
    },
    "Thái Dương": { 
      central: { cat: "Tích Cực", hung: "Tiêu Cực" }, 
                              miniChart: {
        "Hợi": {
          cat: "Linh cảm",
          hung: "Thờ ơ"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Chuyển biến", hung: "Phòng thủ" },
        "Liêm Trinh": { cat: "Tốt lành", hung: "Áp lực" },
        "Thiên Tướng": { cat: "Tốt lành", hung: "Áp lực" },
        "Thiên Lương": { cat: "Dương cương", hung: "Thị phi" },
        "Thất Sát": { cat: "Biến động", hung: "Biến động" },
        "Thiên Đồng": { cat: "Khai sáng", hung: "Thất chí" },
        "Vũ Khúc": { cat: "Thử thách", hung: "Cơ hội" },
        "Thái Dương": { cat: "", hung: "" },
        "Phá Quân": { cat: "Thời cơ", hung: "Trôi nổi" },
        "Thiên Cơ": { cat: "Thử thách", hung: "Phó mặc" },
        "Tử Vi": { cat: "Then chốt", hung: "Trắc trở" },
        "Thiên Phủ": { cat: "Then chốt", hung: "Trắc trở" },
        "Thái Âm": { cat: "Hanh thông", hung: "Tường hòa" },
        "Tham Lang": { cat: "Thuận lợi", hung: "Nhọc tâm" }
      } 
    },
    "Phá Quân": {
       central: { cat: "Quả Cảm", hung: "Ngang Ngược" }, 
                                     miniChart: {
        "Tý": {
          cat: "Đối mặt, Mục tiêu",
          hung: "Phá hoại, Càn rỡ"
        }
      },
       encounters: {
        "Cự Môn": { cat: "Tiệm tiến", hung: "Phòng thủ" },
        "Liêm Trinh": { cat: "Tốt lành", hung: "Áp lực" },
        "Thiên Tướng": { cat: "Tốt lành", hung: "Áp lực" },
        "Thiên Lương": { cat: "Phòng thủ", hung: "Gian nan" },
        "Thất Sát": { cat: "Biến động", hung: "Phá hoại" },
        "Thiên Đồng": { cat: "Ưu phiền", hung: "Thất chí" },
        "Vũ Khúc": { cat: "Thử thách", hung: "Tự hủy" },
        "Thái Dương": { cat: "Gian khó", hung: "Trôi nổi" },
        "Phá Quân": { cat: "", hung: "" },
        "Thiên Cơ": { cat: "Cơ hội", hung: "Định hướng" },
        "Tử Vi": { cat: "Đối mặt", hung: "Tự ngạo" },
        "Thiên Phủ": { cat: "Đối mặt", hung: "Tự ngạo" },
        "Thái Âm": { cat: "Cẩn trọng", hung: "Tường hòa" },
        "Tham Lang": { cat: "Chuyển biến", hung: "Nhọc tâm" }
      } 
    },
    "Thiên Cơ": { 
      central: { cat: "Tiến Bộ", hung: "Thụt Lùi" }, 
                                           miniChart: {
        "Sửu": {
          cat: "Tích cực, Kiên nhẫn",
          hung: "E dè, Hạn chế"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Thăng tiến", hung: "Chuyển biến" },
        "Liêm Trinh": { cat: "Tài năng", hung: "Cơ hội" },
        "Thiên Tướng": { cat: "Tài năng", hung: "Cơ hội" },
        "Thiên Lương": { cat: "Thành tựu", hung: "Thị phi" },
        "Thất Sát": { cat: "Biến động", hung: "Phá tán" },
        "Thiên Đồng": { cat: "Hưng thịnh", hung: "Cẩn trọng" },
        "Vũ Khúc": { cat: "Phát đạt", hung: "Biến động" },
        "Thái Dương": { cat: "Vươn mình", hung: "Thị phi" },
        "Phá Quân": { cat: "Sóng gió", hung: "Khắc khổ" },
        "Thiên Cơ": { cat: "", hung: "" },
        "Tử Vi": { cat: "Mạo hiểm", hung: "Cơ hội" },
        "Thiên Phủ": { cat: "Mạo hiểm", hung: "Cơ hội" },
        "Thái Âm": { cat: "Yên ổn", hung: "Tiệm tiến" },
        "Tham Lang": { cat: "Đột phá", hung: "Không bền" }
      } 
    },
    "Tử Vi": { 
      central: { cat: "Chủ Động", hung: "Bị Động" }, 
                                                 miniChart: {
        "Dần": {
          cat: "Toàn diện",
          hung: "Lỡ thời"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Thăng tiến", hung: "Biến động" },
        "Liêm Trinh": { cat: "Giữ gìn", hung: "Đình trệ" },
        "Thiên Tướng": { cat: "Giữ gìn", hung: "Đình trệ" },
        "Thiên Lương": { cat: "Ổn trọng", hung: "Thụt lùi" },
        "Thất Sát": { cat: "Khai sáng", hung: "Thử thách" },
        "Thiên Đồng": { cat: "Rối rắm", hung: "Đào hoa sát" },
        "Vũ Khúc": { cat: "Quyết liệt", hung: "Gian truân" },
        "Thái Dương": { cat: "Danh vọng", hung: "Thỏa lòng" },
        "Phá Quân": { cat: "Mục tiêu", hung: "Thận trọng" },
        "Thiên Cơ": { cat: "Khai sáng", hung: "Cố chấp" },
        "Tử Vi": { cat: "", hung: "" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Âm": { cat: "Cẩn trọng", hung: "Đắc ý" },
        "Tham Lang": { cat: "Lý tưởng", hung: "Phân vân" }
      } 
    },
    "Thiên Phủ": { 
      central: { cat: "Chủ Động", hung: "Bị Động" }, 
                                                 miniChart: {
        "Dần": {
          cat: "Toàn diện",
          hung: "Lỡ thời"
        }
      },
      encounters: {
        "Cự Môn": { cat: "Thăng tiến", hung: "Biến động" },
        "Liêm Trinh": { cat: "Giữ gìn", hung: "Đình trệ" },
        "Thiên Tướng": { cat: "Giữ gìn", hung: "Đình trệ" },
        "Thiên Lương": { cat: "Ổn trọng", hung: "Thụt lùi" },
        "Thất Sát": { cat: "Khai sáng", hung: "Thử thách" },
        "Thiên Đồng": { cat: "Rối rắm", hung: "Đào hoa sát" },
        "Vũ Khúc": { cat: "Quyết liệt", hung: "Gian truân" },
        "Thái Dương": { cat: "Danh vọng", hung: "Thỏa lòng" },
        "Phá Quân": { cat: "Mục tiêu", hung: "Thận trọng" },
        "Thiên Cơ": { cat: "Khai sáng", hung: "Cố chấp" },
        "Tử Vi": { cat: "", hung: "" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Âm": { cat: "Cẩn trọng", hung: "Đắc ý" },
        "Tham Lang": { cat: "Lý tưởng", hung: "Phân vân" }
      } 
    },
    "Thái Âm": { 
      central: { cat: "Kiên Cường", hung: "Bạc Nhược" },
                                                       miniChart: {
        "Mão": {
          cat: "Toàn diện",
          hung: "Lỡ thời"
        }
      }, 
      encounters: {
        "Cự Môn": { cat: "Khai vận", hung: "Thị phi|Tốt" },
        "Liêm Trinh": { cat: "Đắc ý", hung: "U ám" },
        "Thiên Tướng": { cat: "Đắc ý", hung: "U ám" },
        "Thiên Lương": { cat: "Ổn trọng", hung: "Sai lầm" },
        "Thất Sát": { cat: "Biến đổi", hung: "Chuyển xấu" },
        "Thiên Đồng": { cat: "Rối rắm", hung: "Thất chí" },
        "Vũ Khúc": { cat: "Phát đạt", hung: "Gian truân" },
        "Thái Dương": { cat: "Phát triển", hung: "Rối rắm" },
        "Phá Quân": { cat: "Biến đổi", hung: "Chuyển xấu" },
        "Thiên Cơ": { cat: "Thăng|Giáng", hung: "Tích sức" },
        "Tử Vi": { cat: "Gây dựng", hung: "Dằn vặt" },
        "Thiên Phủ": { cat: "Gây dựng", hung: "Dằn vặt" },
        "Thái Âm": { cat: "", hung: "" },
        "Tham Lang": { cat: "Biến đổi", hung: "Chuyển xấu" }
      } 
    },
    "Tham Lang": { 
      central: { cat: "Kiên Nhẫn", hung: "Nóng Vội" }, 
                                                             miniChart: {
        "Thìn": {
                    title: "Hoạch phát hoạch phá",
        }
      }, 
      encounters: {
        "Cự Môn": { cat: "Trở mình", hung: "Thoái chí" },
        "Liêm Trinh": { cat: "Sáng nghiệp", hung: "Nhất thời" },
        "Thiên Tướng": { cat: "Sáng nghiệp", hung: "Nhất thời" },
        "Thiên Lương": { cat: "Ổn trọng", hung: "Thụt lùi" },
        "Thất Sát": { cat: "Cạnh tranh", hung: "Cạnh tranh" },
        "Thiên Đồng": { cat: "Mở rộng", hung: "Cẩn trọng" },
        "Vũ Khúc": { cat: "Hành động", hung: "Phòng thủ" },
        "Thái Dương": { cat: "Danh vọng", hung: "Thị phi" },
        "Phá Quân": { cat: "Đa dụng", hung: "Lỡ thời" },
        "Thiên Cơ": { cat: "Cạnh tranh", hung: "Áp lực" },
        "Tử Vi": { cat: "Sáng tạo", hung: "Cát xứ tàng hung" },
        "Thiên Phủ": { cat: "Sáng tạo", hung: "Cát xứ tàng hung" },
        "Thái Âm": { cat: "Cẩn trọng", hung: "Đắc ý" },
        "Tham Lang": { cat: "", hung: "" }
      } 
    },
  },
  "TỬ VI MÃO - DẬU": {
    "Thiên Tướng": { 
      central: { cat: "Khai Sáng", hung: "Cộng Sự" }, 
                                                                   miniChart: {
        "Tỵ": {
                    title: "Sáng tạo|Kiên nhẫn",
          cat: "IQ",
          hung: "EQ"
        }
      }, 
      encounters: {
        "Cự Môn": { cat: "", hung: "" },
        "Liêm Trinh": { cat: "Phần phát", hung: "Vượt khó" },
        "Thiên Tướng": { cat: "Khai triển", hung: "Thị phi" },
        "Thiên Lương": { cat: "Cô độc", hung: "Tranh đoạt" },
        "Thất Sát": { cat: "Phần phát", hung: "Vượt khó" },
        "Thiên Đồng": { cat: "Phòng thủ", hung: "Thị phi" },
        "Vũ Khúc": { cat: "Vươn mình", hung: "Hãm hại" },
        "Thái Dương": { cat: "Hanh thông", hung: "Sóng gió" },
        "Phá Quân": { cat: "Vươn mình", hung: "Hãm hại" },
        "Thiên Cơ": { cat: "Quấy nhiễu", hung: "khó khăn" },
        "Tử Vi": { cat: "Khai triển", hung: "Khổ tâm" },
        "Thiên Phủ": { cat: "Cát lợi", hung: "An lành" },
        "Thái Âm": { cat: "Quấy nhiễu", hung: "Khó khăn" },
        "Tham Lang": { cat: "Khai triển", hung: "Khổ tâm" },
      } 
    },
    "Thiên Lương": { 
      central: { cat: "Dung Hòa", hung: "Cô Khắc" },
                                                                         miniChart: {
        "Ngọ": {
          cat: "Niềm nở, Cộng đồng",
          hung: "Lạnh nhạt, Độc lập"
        }
      },  
      encounters: {
        "Cự Môn": { cat: "Thăng tiến", hung: "Thị phi" },
        "Liêm Trinh": { cat: "Nhẹ nhàng", hung: "Thất bại" },
        "Thiên Tướng": { cat: "Bình ổn", hung: "Ly tán" },
        "Thiên Lương": { cat: "", hung: "" },
        "Thất Sát": { cat: "Nhẹ nhàng", hung: "Thất bại" },
        "Thiên Đồng": { cat: "Thành tựu", hung: "Kích phát" },
        "Vũ Khúc": { cat: "Vươn mình", hung: "Chướng ngại" },
        "Thái Dương": { cat: "Hanh thông", hung: "Sóng gió" },
        "Phá Quân": { cat: "Vươn mình", hung: "Chướng ngại" },
        "Thiên Cơ": { cat: "Đắc chí", hung: "Tiệm tiến" },
        "Tử Vi": { cat: "Khai triển", hung: "Bài xích" },
        "Thiên Phủ": { cat: "Cát lợi", hung: "An lành" },
        "Thái Âm": { cat: "Đắc chí", hung: "Tiệm tiến" },
        "Tham Lang": { cat: "Khai triển", hung: "Bài xích" },
      } 
    },
    "Liêm Trinh": { 
      central: { cat: "Phấn Chấn", hung: "Cường Bạo" },
                                                                         miniChart: {
        "Mùi": {
                    title: "Hùng Tú Kiền Nguyên",
          cat: "Mạnh mẽ",
          hung: "Trắc trở"
        }
      },  
      encounters: {
        "Cự Môn": { cat: "Trắc trở", hung: "Thị phi" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Nền tảng", hung: "Xây dựng" },
        "Thiên Lương": { cat: "Trợ lực", hung: "Ly tán" },
        "Thất Sát": { cat: "", hung: "" },
        "Thiên Đồng": { cat: "Phát đạt", hung: "Gập ghềnh" },
        "Vũ Khúc": { cat: "Sáng lập", hung: "Bôn ba" },
        "Thái Dương": { cat: "Danh vọng", hung: "Sóng gió" },
        "Phá Quân": { cat: "Sáng lập", hung: "Bôn ba" },
        "Thiên Cơ": { cat: "Bình ổn", hung: "Bất ổn" },
        "Tử Vi": { cat: "Khai sáng", hung: "Bài xích" },
        "Thiên Phủ": { cat: "Cát lợi", hung: "An lành" },
        "Thái Âm": { cat: "Bình ổn", hung: "Bất ổn" },
        "Tham Lang": { cat: "Khai sáng", hung: "Bài xích" },
      } 
    },
    "Thất Sát": { 
      central: { cat: "Phấn Chấn", hung: "Cường Bạo" }, 
                                                                         miniChart: {
        "Mùi": {
                    title: "Hùng Tú Kiền Nguyên",
          cat: "Mạnh mẽ",
          hung: "Trắc trở"
        }
      },  
      encounters: {
        "Cự Môn": { cat: "Trắc trở", hung: "Thị phi" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Nền tảng", hung: "Xây dựng" },
        "Thiên Lương": { cat: "Trợ lực", hung: "Ly tán" },
        "Thất Sát": { cat: "", hung: "" },
        "Thiên Đồng": { cat: "Phát đạt", hung: "Gập ghềnh" },
        "Vũ Khúc": { cat: "Sáng lập", hung: "Bôn ba" },
        "Thái Dương": { cat: "Danh vọng", hung: "Sóng gió" },
        "Phá Quân": { cat: "Sáng lập", hung: "Bôn ba" },
        "Thiên Cơ": { cat: "Bình ổn", hung: "Bất ổn" },
        "Tử Vi": { cat: "Khai sáng", hung: "Bài xích" },
        "Thiên Phủ": { cat: "Cát lợi", hung: "An lành" },
        "Thái Âm": { cat: "Bình ổn", hung: "Bất ổn" },
        "Tham Lang": { cat: "Khai sáng", hung: "Bài xích" },
      } 
    },
    "Thiên Đồng": { 
      central: { cat: "Khoáng Đạt", hung: "Đoản Chí" },
                                                                               miniChart: {
        "Tuất": {
          cat: "Bền bỉ, Dài hạn",
          hung: "Nửa vời, Ngắn hạn"
        }
      },   
      encounters: {
        "Cự Môn": { cat: "Trắc trở", hung: "Thị phi" },
        "Liêm Trinh": { cat: "Ổn trọng", hung: "Tiêu cực" },
        "Thiên Tướng": { cat: "Cẩn trọng", hung: "Trắc trở" },
        "Thiên Lương": { cat: "Bình ổn", hung: "Thử thách" },
        "Thất Sát": { cat: "Ổn trọng", hung: "Tiêu cực" },
        "Thiên Đồng": { cat: "", hung: "" },
        "Vũ Khúc": { cat: "Giáo dục", hung: "Giáo dục" },
        "Thái Dương": { cat: "Phiền lụy", hung: "Sóng gió" },
        "Phá Quân": { cat: "Giáo dục", hung: "Giáo dục" },
        "Thiên Cơ": { cat: "Sáng nghiệp", hung: "Tự mãn" },
        "Tử Vi": { cat: "Danh lợi", hung: "Hưởng thụ" },
        "Thiên Phủ": { cat: "Trầm ổn", hung: "Áp lực" },
        "Thái Âm": { cat: "Sáng nghiệp", hung: "Tự mãn" },
        "Tham Lang": { cat: "Danh lợi", hung: "Hưởng thụ" },
      } 
    },
    "Vũ Khúc": { 
      central: { cat: "Thích Ứng", hung: "Ngoan Cố" }, 
      miniChart: {
        "Hợi": {
          cat: "Khai sáng, Xoay sở",
          hung: "Ảo tưởng, Vọng động"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Cẩn trọng", hung: "Trắc trở" },
        "Thiên Lương": { cat: "Bình ổn", hung: "Thử thách" },
        "Liêm Trinh": { cat: "Ôn trọng", hung: "Tiêu cực" },
        "Thất Sát": { cat: "Ôn trọng", hung: "Tiêu cực" },
        "Cự Môn": { cat: "Rắc rối", hung: "Thị phi" },
        "Thiên Đồng": { cat: "Bền bỉ", hung: "Nửa vời, Ngắn hạn" },
        "Tử Vi": { cat: "Phiền lụy", hung: "Trầm luân" },
        "Tham Lang": { cat: "Phiền lụy", hung: "Trầm luân" },
        "Thiên Cơ": { cat: "Chậm rãi", hung: "Đả kích" },
        "Thái Âm": { cat: "Chậm rãi", hung: "Đả kích" },
        "Thiên Phủ": { cat: "Sáng lập", hung: "Phòng thủ" },
        "Thái Dương": { cat: "Cơ duyên", hung: "Vượt khó" },
        "Vũ Khúc": { cat: "Áp lực", hung: "Ảo tưởng" },
        "Phá Quân": { cat: "Áp lực", hung: "Ảo tưởng" }
      }
    },
    "Phá Quân": { 
      central: { cat: "Thích Ứng", hung: "Ngoan Cố" }, 
      miniChart: {
        "Hợi": {
          cat: "Khai sáng, Xoay sở",
          hung: "Ảo tưởng, Vọng động"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Cẩn trọng", hung: "Trắc trở" },
        "Thiên Lương": { cat: "Bình ổn", hung: "Thử thách" },
        "Liêm Trinh": { cat: "Ôn trọng", hung: "Tiêu cực" },
        "Thất Sát": { cat: "Ôn trọng", hung: "Tiêu cực" },
        "Cự Môn": { cat: "Rắc rối", hung: "Thị phi" },
        "Thiên Đồng": { cat: "Bền bỉ", hung: "Nửa vời, Ngắn hạn" },
        "Tử Vi": { cat: "Phiền lụy", hung: "Trầm luân" },
        "Tham Lang": { cat: "Phiền lụy", hung: "Trầm luân" },
        "Thiên Cơ": { cat: "Chậm rãi", hung: "Đả kích" },
        "Thái Âm": { cat: "Chậm rãi", hung: "Đả kích" },
        "Thiên Phủ": { cat: "Sáng lập", hung: "Phòng thủ" },
        "Thái Dương": { cat: "Cơ duyên", hung: "Vượt khó" },
        "Vũ Khúc": { cat: "Áp lực", hung: "Ảo tưởng" },
        "Phá Quân": { cat: "Áp lực", hung: "Ảo tưởng" }
      }
    },
    "Thái Dương": { 
      central: { cat: "Trầm Ổn", hung: "Hư Phù" }, 
      miniChart: {
        "Tý": {
          cat: "Vững vàng, Thực tế",
          hung: "Bồng bột, Mộng tưởng"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Cạnh tranh", hung: "Trắc trở" },
        "Thiên Lương": { cat: "Tiến triển", hung: "Ổn định" },
        "Liêm Trinh": { cat: "Tiến triển", hung: "Ổn định" },
        "Thất Sát": { cat: "Tiến triển", hung: "Ổn định" },
        "Cự Môn": { cat: "Tiến triển", hung: "Ổn trọng" },
        "Thiên Đồng": { cat: "Phát đạt", hung: "Trầm luân" },
        "Tử Vi": { cat: "Cạnh tranh", hung: "Trôi nổi" },
        "Tham Lang": { cat: "Cạnh tranh", hung: "Trôi nổi" },
        "Thiên Cơ": { cat: "Đắc lợi", hung: "Cạnh tranh" },
        "Thái Âm": { cat: "Đắc lợi", hung: "Cạnh tranh" },
        "Thiên Phủ": { cat: "Cơ hội", hung: "Thương tâm" },
        "Thái Dương": { cat: "", hung: "" },
        "Vũ Khúc": { cat: "Vất vả", hung: "Biến động" },
        "Phá Quân": { cat: "Vất vả", hung: "Biến động" }
      }
    },
    "Thiên Phủ": { 
      central: { cat: "Khiêm Hòa", hung: "Khiếp Nhược" }, 
      miniChart: {
        "Sửu": {
          cat: "Ngoài mềm trong cứng, Nguyên tắc",
          hung: "Ngoài cứng trong mềm, Tùy tiện"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Áp lực", hung: "Trắc trở" },
        "Thiên Lương": { cat: "Lộ tài", hung: "Thị phi" },
        "Liêm Trinh": { cat: "Đắc ý", hung: "Tiến thủ" },
        "Thất Sát": { cat: "Đắc ý", hung: "Tiến thủ" },
        "Cự Môn": { cat: "Đình trệ", hung: "Hoành phá" },
        "Thiên Đồng": { cat: "Sóng gió", hung: "Lụy tình" },
        "Tử Vi": { cat: "Phát huy", hung: "Hoạch phá" },
        "Tham Lang": { cat: "Phát huy", hung: "Hoạch phá" },
        "Thiên Cơ": { cat: "Nền tảng", hung: "Rối rắm" },
        "Thái Âm": { cat: "Nền tảng", hung: "Rối rắm" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Dương": { cat: "Tích cực", hung: "Tu dưỡng" },
        "Vũ Khúc": { cat: "Tạo lập", hung: "Chuyển biến" },
        "Phá Quân": { cat: "Tạo lập", hung: "Chuyển biến" }
      }
    },
    "Thiên Cơ": { 
      central: { cat: "Lý Tính", hung: "Tâm Trạng" }, 
      miniChart: {
        "Dần": {
          cat: "Sách lược, IQ",
          hung: "Nghệ thuật, EQ"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Xung động", hung: "Tự đắc" },
        "Thiên Lương": { cat: "Soi mói", hung: "Thủ đoạn" },
        "Liêm Trinh": { cat: "Cát lợi", hung: "Cơ hội" },
        "Thất Sát": { cat: "Cát lợi", hung: "Cơ hội" },
        "Tử Vi": { cat: "Nền móng", hung: "Phát triển" },
        "Tham Lang": { cat: "Nền móng", hung: "Phát triển" },
        "Thiên Đồng": { cat: "Bình ổn", hung: "Lụy tình" },
        "Vũ Khúc": { cat: "Phát triển", hung: "Do dự" },
        "Phá Quân": { cat: "Phát triển", hung: "Do dự" },
        "Thái Dương": { cat: "Tích cực", hung: "Cởi mở" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thiên Cơ": { cat: "", hung: "" },
        "Thái Âm": { cat: "", hung: "" },
        "Cự Môn": { cat: "Bài xích", hung: "Thương tâm" },
      } 
    },
    "Thái Âm": { 
      central: { cat: "Lý Tính", hung: "Tâm Trạng" }, 
      miniChart: {
        "Dần": {
          cat: "Sách lược, IQ",
          hung: "Nghệ thuật, EQ"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Xung động", hung: "Tự đắc" },
        "Thiên Lương": { cat: "Soi mói", hung: "Thủ đoạn" },
        "Liêm Trinh": { cat: "Cát lợi", hung: "Cơ hội" },
        "Thất Sát": { cat: "Cát lợi", hung: "Cơ hội" },
        "Tử Vi": { cat: "Nền móng", hung: "Phát triển" },
        "Tham Lang": { cat: "Nền móng", hung: "Phát triển" },
        "Thiên Đồng": { cat: "Bình ổn", hung: "Lụy tình" },
        "Vũ Khúc": { cat: "Phát triển", hung: "Do dự" },
        "Phá Quân": { cat: "Phát triển", hung: "Do dự" },
        "Thái Dương": { cat: "Tích cực", hung: "Cởi mở" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thiên Cơ": { cat: "", hung: "" },
        "Thái Âm": { cat: "", hung: "" },
        "Cự Môn": { cat: "Bài xích", hung: "Thương tâm" },
      } 
    },
    "Tử Vi": { 
      central: { cat: "Dục Vật", hung: "Dục Tình" }, 
      miniChart: {
        "Mão": {
                    title: "Khắc chế dục vọng, Che lấp dục vọng, Phát tiết dục vọng, Chủ động|Không từ thủ đoạn",
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Phụ trợ", hung: "Sắc dục" },
        "Thiên Lương": { cat: "Bất lợi, Hao tán", hung: "Bất lợi, Hao tán" },
        "Liêm Trinh": { cat: "Đột phá", hung: "Thu lợi" },
        "Thất Sát": { cat: "Đột phá", hung: "Thu lợi" },
        "Thiên Đồng": { cat: "Đào hoa", hung: "Trắc trở" },
        "Vũ Khúc": { cat: "Vươn mình", hung: "Thị phi" },
        "Phá Quân": { cat: "Vươn mình", hung: "Thị phi" },
        "Thiên Cơ": { cat: "Quấy nhiễu", hung: "Khó khăn" },
        "Thái Âm": { cat: "Quấy nhiễu", hung: "Khó khăn" },
        "Thiên Phủ": { cat: "Thu hoạch", hung: "Cát lành" },
        "Thái Dương": { cat: "Sóng gió", hung: "Thị phi" },
        "Tử Vi": { cat: "", hung: "" },
        "Tham Lang": { cat: "", hung: "" },
                "Cự Môn": { cat: "Khai Triển", hung: "Khổ tâm" },
      } 
    },
    "Tham Lang": { 
      central: { cat: "Dục Vật", hung: "Dục Tình" }, 
      miniChart: {
        "Mão": {
                    title: "Khắc chế dục vọng, Che lấp dục vọng, Phát tiết dục vọng, Chủ động|Không từ thủ đoạn",
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Phụ trợ", hung: "Sắc dục" },
        "Thiên Lương": { cat: "Bất lợi, Hao tán", hung: "Bất lợi, Hao tán" },
        "Liêm Trinh": { cat: "Đột phá", hung: "Thu lợi" },
        "Thất Sát": { cat: "Đột phá", hung: "Thu lợi" },
        "Thiên Đồng": { cat: "Đào hoa", hung: "Trắc trở" },
        "Vũ Khúc": { cat: "Vươn mình", hung: "Thị phi" },
        "Phá Quân": { cat: "Vươn mình", hung: "Thị phi" },
        "Thiên Cơ": { cat: "Quấy nhiễu", hung: "Khó khăn" },
        "Thái Âm": { cat: "Quấy nhiễu", hung: "Khó khăn" },
        "Thiên Phủ": { cat: "Thu hoạch", hung: "Cát lành" },
        "Thái Dương": { cat: "Sóng gió", hung: "Thị phi" },
        "Tử Vi": { cat: "", hung: "" },
        "Tham Lang": { cat: "", hung: "" },
                "Cự Môn": { cat: "Khai Triển", hung: "Khổ tâm" },
      } 
    },
    "Cự Môn": { 
      central: { cat: "Kích Phát", hung: "Kìm Hãm" }, 
      miniChart: {
        "Thìn": {
          cat: "Rõ ràng, Tiến thủ",
          hung: "Mờ ám, Thất chí, Thị phi"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Khai triển", hung: "Thị phi" },
        "Thiên Lương": { cat: "Cô độc", hung: "Tranh đoạt" },
        "Liêm Trinh": { cat: "Phấn phát", hung: "Vượt khó" },
        "Thất Sát": { cat: "Phấn phát", hung: "Vượt khó" },
        "Tử Vi": { cat: "Khai triển", hung: "Khổ tâm" },
        "Tham Lang": { cat: "Khai triển", hung: "Khổ tâm" },
        "Thiên Đồng": { cat: "Phòng thủ", hung: "Thị phi" },
        "Thiên Cơ": { cat: "Quấy nhiễu", hung: "Khó khăn" },
        "Thái Âm": { cat: "Quấy nhiễu", hung: "Khó khăn" },
        "Thiên Phủ": { cat: "Cát lợi", hung: "An lành" },
        "Thái Dương": { cat: "Hanh thông", hung: "Sóng gió" },
        "Vũ Khúc": { cat: "Vươn mình", hung: " Hãm hại" },
        "Phá Quân": { cat: "Vươn mình", hung: " Hãm hại" },
                        "Cự Môn": { cat: "", hung: "" },
      } 
    }
  },
  "TỬ VI TỴ - HỢI": {
    "Tử Vi": { 
      central: { cat: "Uy Quyền", hung: "Bá Quyền" }, 
      miniChart: {
        "Tỵ": { 
          title: "Quyền lực|Vật chất", 
          cat: "Chính quy, Hòa hợp, Tiệm tiến",
          hung: "Bất quy tắc, Cực đoan, Lận đận"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Đột phá", hung: "Ổn trọng" },
        "Thiên Lương": { cat: "Tự lập", hung: "Cô độc" },
        "Liêm Trinh": { cat: "Tạo dựng", hung: "Trắc trở" },
        "Thất Sát": { cat: "", hung: "" },
        "Tử Vi": { cat: "", hung: "" },
        "Tham Lang": { cat: "Hưng thịnh", hung: "Cạnh tranh" },
        "Thiên Đồng": { cat: "Bình hòa", hung: "Sóng gió" },
        "Thiên Cơ": { cat: "Tự lập", hung: "Cô độc" },
        "Thái Âm": { cat: "Bình hòa", hung: "Sóng gió" },
        "Thiên Phủ": { cat: "Hanh thông", hung: "Cẩn trọng" },
        "Thái Dương": { cat: "Tiệm tiến", hung: "Bất an" },
        "Vũ Khúc": { cat: "Hưng thịnh", hung: "Cạnh tranh" },
        "Phá Quân": { cat: "Tạo dựng", hung: "Trắc trở" },
        "Cự Môn": { cat: "Tiệm tiến", hung: "Bất an" },
      } 
    },
    "Thất Sát": { 
      central: { cat: "Uy Quyền", hung: "Bá Quyền" }, 
      miniChart: {
        "Tỵ": { 
          title: "Quyền lực|Vật chất", 
          cat: "Chính quy, Hòa hợp, Tiệm tiến",
          hung: "Bất quy tắc, Cực đoan, Lận đận"
        }
      },
      encounters: {
        "Thiên Tướng": { cat: "Đột phá", hung: "Ổn trọng" },
        "Thiên Lương": { cat: "Tự lập", hung: "Cô độc" },
        "Liêm Trinh": { cat: "Tạo dựng", hung: "Trắc trở" },
        "Thất Sát": { cat: "", hung: "" },
        "Tử Vi": { cat: "", hung: "" },
        "Tham Lang": { cat: "Hưng thịnh", hung: "Cạnh tranh" },
        "Thiên Đồng": { cat: "Bình hòa", hung: "Sóng gió" },
        "Thiên Cơ": { cat: "Tự lập", hung: "Cô độc" },
        "Thái Âm": { cat: "Bình hòa", hung: "Sóng gió" },
        "Thiên Phủ": { cat: "Hanh thông", hung: "Cẩn trọng" },
        "Thái Dương": { cat: "Tiệm tiến", hung: "Bất an" },
        "Vũ Khúc": { cat: "Hưng thịnh", hung: "Cạnh tranh" },
        "Phá Quân": { cat: "Tạo dựng", hung: "Trắc trở" },
        "Cự Môn": { cat: "Tiệm tiến", hung: "Bất an" },
      } 
    },
    "Liêm Trinh": { 
      central: { cat: "Phụng Công", hung: "Tư Lợi" }, 
      miniChart: {
        "Dậu": { title: "Mạnh mẽ|Khai sáng", 
        cat: "Chí cao, Hòa hợp", 
        hung: "Lợi nhỏ|Tư tâm" },
      },
      encounters: {
        "Thiên Tướng": { cat: "Cát lợi", hung: "Giữ gìn" },
        "Thiên Lương": { cat: "Trắc trở", hung: "Hoạch phát" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thất Sát": { cat: "Tạo dựng", hung: "Tàng hung" },
        "Tử Vi": { cat: "Tạo dựng", hung: "Tàng hung" },
        "Tham Lang": { cat: "Danh lợi", hung: "Trắc trở" },
        "Thiên Đồng": { cat: "Tiệm tiến", hung: "Đột phá" },
        "Thiên Cơ": { cat: "Trắc trở", hung: "Hoạch phát" },
        "Thái Âm": { cat: "Tiệm tiến", hung: "Đột phá" },
        "Thiên Phủ": { cat: "Thử thách", hung: "Cẩn trọng" },
        "Thái Dương": { cat: "Ổn định", hung: "Thất thường" },
        "Vũ Khúc": { cat: "Danh lợi", hung: "Trắc trở" },
        "Phá Quân": { cat: "", hung: "" },
        "Cự Môn": { cat: "Ổn định", hung: "Thất thường" },
      } 
    },
    "Phá Quân": { 
      central: { cat: "Phụng Công", hung: "Tư Lợi" }, 
      miniChart: {
        "Dậu": { title: "Mạnh mẽ|Khai sáng", 
        cat: "Chí cao, Hòa hợp", 
        hung: "Lợi nhỏ|Tư tâm" },
      },
      encounters: {
        "Thiên Tướng": { cat: "Cát lợi", hung: "Giữ gìn" },
        "Thiên Lương": { cat: "Trắc trở", hung: "Hoạch phát" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Thất Sát": { cat: "Tạo dựng", hung: "Tàng hung" },
        "Tử Vi": { cat: "Tạo dựng", hung: "Tàng hung" },
        "Tham Lang": { cat: "Danh lợi", hung: "Trắc trở" },
        "Thiên Đồng": { cat: "Tiệm tiến", hung: "Đột phá" },
        "Thiên Cơ": { cat: "Trắc trở", hung: "Hoạch phát" },
        "Thái Âm": { cat: "Tiệm tiến", hung: "Đột phá" },
        "Thiên Phủ": { cat: "Thử thách", hung: "Cẩn trọng" },
        "Thái Dương": { cat: "Ổn định", hung: "Thất thường" },
        "Vũ Khúc": { cat: "Danh lợi", hung: "Trắc trở" },
        "Phá Quân": { cat: "", hung: "" },
        "Cự Môn": { cat: "Ổn định", hung: "Thất thường" },
      } 
    },
    "Thiên Phủ": { 
      central: { cat: "Tường Hòa", hung: "Quyền Thuật" }, 
      miniChart: {
        "Hợi": { 
          title: "Quyền lực | Dục vọng", 
          cat: "Thiết thực, Ổn định", 
          hung: "Mưu toan, Biến thiên" 
        }
      },
      encounters: {
        "Tử Vi": { cat: "Rối ren", hung: "Lao tâm" },
        "Thất Sát": { cat: "Rối ren", hung: "Lao tâm" },
        "Thiên Cơ": { cat: "Phòng thủ", hung: "Tàng hung" },
        "Thiên Lương": { cat: "Phòng thủ", hung: "Tàng hung" },
        "Thiên Tướng": { cat: "Hanh thông", hung: "Thị phi" },
        "Cự Môn": { cat: "Tiệm tiến", hung: "Thị phi" },
        "Thái Dương": { cat: "Tiệm tiến", hung: "Thị phi" },
        "Vũ Khúc": { cat: "Cơ hội", hung: "Mưu đồ" },
        "Tham Lang": { cat: "Cơ hội", hung: "Mưu đồ" },
        "Thiên Đồng": { cat: "Ổn định", hung: "Trắc trở" },
        "Thái Âm": { cat: "Ổn định", hung: "Trắc trở" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Liêm Trinh": { cat: "Thử thách", hung: "Cẩn trọng" },
        "Phá Quân": { cat: "Thử thách", hung: "Cẩn trọng" }
      } 
    },
    "Thiên Đồng": { 
      central: { cat: "Tích Cực", hung: "Tiêu Cực" }, 
      miniChart: {
        "Tý": { title: "Phấn đấu | Thờ ơ", cat: "Phấn đấu", hung: "Thờ ơ" }
      },
      encounters: {
        "Tử Vi": { cat: "Cô độc", hung: "Muộn phiền" },
        "Thất Sát": { cat: "Cô độc", hung: "Muộn phiền" },
        "Thiên Cơ": { cat: "Thuận lợi", hung: "Bình ổn" },
        "Thiên Lương": { cat: "Thuận lợi", hung: "Bình ổn" },
        "Thiên Tướng": { cat: "Cẩn trọng", hung: "Áp lực" },
        "Cự Môn": { cat: "Hưng phát", hung: "Thuận ý" },
        "Thái Dương": { cat: "Hưng phát", hung: "Thuận ý" },
        "Vũ Khúc": { cat: "Tiến triển", hung: "Trắc trở" },
        "Tham Lang": { cat: "Tiến triển", hung: "Trắc trở" },
        "Thiên Đồng": { cat: "", hung: "" },
        "Thái Âm": { cat: "", hung: "" },
        "Thiên Phủ": { cat: "Trở ngại", hung: "Đình trệ" },
        "Liêm Trinh": { cat: "Sáng lập", hung: "Đột phá" },
        "Phá Quân": { cat: "Sáng lập", hung: "Đột phá" }
      } 
    },
    "Thái Âm": { 
      central: { cat: "Tích Cực", hung: "Tiêu Cực" }, 
      miniChart: {
        "Tý": { title: "Phấn đấu | Thờ ơ", cat: "Phấn đấu", hung: "Thờ ơ" }
      },
      encounters: {
        "Tử Vi": { cat: "Cô độc", hung: "Muộn phiền" },
        "Thất Sát": { cat: "Cô độc", hung: "Muộn phiền" },
        "Thiên Cơ": { cat: "Thuận lợi", hung: "Bình ổn" },
        "Thiên Lương": { cat: "Thuận lợi", hung: "Bình ổn" },
        "Thiên Tướng": { cat: "Cẩn trọng", hung: "Áp lực" },
        "Cự Môn": { cat: "Hưng phát", hung: "Thuận ý" },
        "Thái Dương": { cat: "Hưng phát", hung: "Thuận ý" },
        "Vũ Khúc": { cat: "Tiến triển", hung: "Trắc trở" },
        "Tham Lang": { cat: "Tiến triển", hung: "Trắc trở" },
        "Thiên Đồng": { cat: "", hung: "" },
        "Thái Âm": { cat: "", hung: "" },
        "Thiên Phủ": { cat: "Trở ngại", hung: "Đình trệ" },
        "Liêm Trinh": { cat: "Sáng lập", hung: "Đột phá" },
        "Phá Quân": { cat: "Sáng lập", hung: "Đột phá" }
      } 
    },
    "Vũ Khúc": { 
      central: { cat: "Dục Vọng", hung: "Dã Tâm" }, 
      miniChart: {
        "Sửu": { 
          title: "Khát vọng | Mạnh mẽ", 
          cat: "Động lực, Tiết chế", 
          hung: "Tham vọng, Tốn nhân lợi kỷ" 
        }
      },
      encounters: {
        "Tử Vi": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thất Sát": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thiên Cơ": { cat: "Cơ hội", hung: "Bất ổn" },
        "Thiên Lương": { cat: "Cơ hội", hung: "Bất ổn" },
        "Thiên Tướng": { cat: "Cẩn trọng", hung: "Nạn tai" },
        "Cự Môn": { cat: "Phát triển", hung: "Tranh giành" },
        "Thái Dương": { cat: "Phát triển", hung: "Tranh giành" },
        "Vũ Khúc": { cat: "", hung: "" },
        "Tham Lang": { cat: "", hung: "" },
        "Thiên Đồng": { cat: "Gập ghềnh", hung: "Hao tổn" },
        "Thái Âm": { cat: "Gập ghềnh", hung: "Hao tổn" },
        "Thiên Phủ": { cat: "Thuận ý", hung: "Hành động" },
        "Liêm Trinh": { cat: "Thăng tiến", hung: "Tàng hung" },
        "Phá Quân": { cat: "Thăng tiến", hung: "Tàng hung" }
      } 
    },
    "Tham Lang": { 
      central: { cat: "Dục Vọng", hung: "Dã Tâm" }, 
      miniChart: {
        "Sửu": { 
          title: "Khát vọng | Mạnh mẽ", 
          cat: "Động lực, Tiết chế", 
          hung: "Tham vọng, Tốn nhân lợi kỷ" 
        }
      },
      encounters: {
        "Tử Vi": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thất Sát": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thiên Cơ": { cat: "Cơ hội", hung: "Bất ổn" },
        "Thiên Lương": { cat: "Cơ hội", hung: "Bất ổn" },
        "Thiên Tướng": { cat: "Cẩn trọng", hung: "Nạn tai" },
        "Cự Môn": { cat: "Phát triển", hung: "Tranh giành" },
        "Thái Dương": { cat: "Phát triển", hung: "Tranh giành" },
        "Vũ Khúc": { cat: "", hung: "" },
        "Tham Lang": { cat: "", hung: "" },
        "Thiên Đồng": { cat: "Gập ghềnh", hung: "Hao tổn" },
        "Thái Âm": { cat: "Gập ghềnh", hung: "Hao tổn" },
        "Thiên Phủ": { cat: "Thuận ý", hung: "Hành động" },
        "Liêm Trinh": { cat: "Thăng tiến", hung: "Tàng hung" },
        "Phá Quân": { cat: "Thăng tiến", hung: "Tàng hung" }
      } 
    },
    "Thái Dương": { 
      central: { cat: "Đắc Trợ", hung: "Cô Lập" }, 
      miniChart: {
        "Dần": { 
          title: "Khát vọng | Mạnh mẽ", 
          cat: "Động lực, Tham vọng", 
          hung: "Tiết chế, Tốn nhân lợi kỷ" 
        }
      },
      encounters: {
        "Tử Vi": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thất Sát": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thiên Cơ": { cat: "Cơ hội", hung: "Cạnh tranh" },
        "Thiên Lương": { cat: "Cơ hội", hung: "Cạnh tranh" },
        "Thiên Tướng": { cat: "Tiệm tiến", hung: "Bất trắc" },
        "Cự Môn": { cat: "", hung: "" },
        "Thái Dương": { cat: "", hung: "" },
        "Vũ Khúc": { cat: "Phát triển", hung: "Hoạch phát" },
        "Tham Lang": { cat: "Phát triển", hung: "Hoạch phát" },
        "Thiên Đồng": { cat: "Trọng dụng", hung: "Hao tổn" },
        "Thái Âm": { cat: "Trọng dụng", hung: "Hao tổn" },
        "Thiên Phủ": { cat: "Thuận ý", hung: "Cẩn trọng" },
        "Liêm Trinh": { cat: "Thăng tiến", hung: "Bất lợi" },
        "Phá Quân": { cat: "Thăng tiến", hung: "Bất lợi" }
      } 
    },
    "Cự Môn": { 
      central: { cat: "Đắc Trợ", hung: "Cô Lập" }, 
      miniChart: {
        "Dần": { 
          title: "Khát vọng | Mạnh mẽ", 
          cat: "Động lực, Tham vọng", 
          hung: "Tiết chế, Tốn nhân lợi kỷ" 
        }
      },
      encounters: {
        "Tử Vi": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thất Sát": { cat: "Hanh thông", hung: "Trắc trở" },
        "Thiên Cơ": { cat: "Cơ hội", hung: "Cạnh tranh" },
        "Thiên Lương": { cat: "Cơ hội", hung: "Cạnh tranh" },
        "Thiên Tướng": { cat: "Tiệm tiến", hung: "Bất trắc" },
        "Cự Môn": { cat: "", hung: "" },
        "Thái Dương": { cat: "", hung: "" },
        "Vũ Khúc": { cat: "Phát triển", hung: "Hoạch phát" },
        "Tham Lang": { cat: "Phát triển", hung: "Hoạch phát" },
        "Thiên Đồng": { cat: "Trọng dụng", hung: "Hao tổn" },
        "Thái Âm": { cat: "Trọng dụng", hung: "Hao tổn" },
        "Thiên Phủ": { cat: "Thuận ý", hung: "Cẩn trọng" },
        "Liêm Trinh": { cat: "Thăng tiến", hung: "Bất lợi" },
        "Phá Quân": { cat: "Thăng tiến", hung: "Bất lợi" }
      } 
    },
    "Thiên Tướng": { 
      central: { cat: "Chính Trực", hung: "Cảm Tính" }, 
      miniChart: {
        "Mão": { 
          title: "Biến đổi | Tâm trạng", 
          cat: "Hữu nghị, Trọng tình", 
          hung: "Cân bằng, Ba phải" 
        }
      },
      encounters: {
        "Tử Vi": { cat: "Tiệm tiến", hung: "Trắc trở" },
        "Thất Sát": { cat: "Tiệm tiến", hung: "Trắc trở" },
        "Thiên Cơ": { cat: "Rèn luyện", hung: "Hoạch phát" },
        "Thiên Lương": { cat: "Rèn luyện", hung: "Hoạch phát" },
        "Thiên Tướng": { cat: "", hung: "" },
        "Cự Môn": { cat: "Trắc trở", hung: "Khắc kỵ" },
        "Thái Dương": { cat: "Trắc trở", hung: "Khắc kỵ" },
        "Vũ Khúc": { cat: "Phát triển", hung: "Thị phi" },
        "Tham Lang": { cat: "Phát triển", hung: "Thị phi" },
        "Thiên Đồng": { cat: "Sóng gió", hung: "Tranh chấp" },
        "Thái Âm": { cat: "Sóng gió", hung: "Tranh chấp" },
        "Thiên Phủ": { cat: "Khó khăn", hung: "Tổn thất" },
        "Liêm Trinh": { cat: "Tiệm tiến", hung: "Bất lợi" },
        "Phá Quân": { cat: "Tiệm tiến", hung: "Bất lợi" }
      } 
    },
    "Thiên Cơ": { 
      central: { cat: "Mẫn Tiệp", hung: "Khó Khan" }, 
      miniChart: {
        "Thìn": { 
          title: "Mẫn cảm | Kỷ luật", 
          cat: "Quyết đoán, Nghiêm khắc", 
          hung: "Sáng suốt, Lạnh lùng" 
        }
      },
      encounters: {
        "Tử Vi": { cat: "Tiệm tiến", hung: "Sóng gió" },
        "Thất Sát": { cat: "Tiệm tiến", hung: "Sóng gió" },
        "Thiên Cơ": { cat: "", hung: "" },
        "Thiên Lương": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Trợ lực", hung: "Trở ngại" },
        "Cự Môn": { cat: "Xung đột", hung: "Điều hòa" },
        "Thái Dương": { cat: "Xung đột", hung: "Điều hòa" },
        "Vũ Khúc": { cat: "Cạnh tranh", hung: "Thị phi" },
        "Tham Lang": { cat: "Cạnh tranh", hung: "Thị phi" },
        "Thiên Đồng": { cat: "Điều hòa", hung: "Biến thiên" },
        "Thái Âm": { cat: "Điều hòa", hung: "Biến thiên" },
        "Thiên Phủ": { cat: "Rực rỡ", hung: "Tráo trở" },
        "Liêm Trinh": { cat: "Khó khăn", hung: "Nạn tai" },
        "Phá Quân": { cat: "Khó khăn", hung: "Nạn tai" }
      } 
    },
    "Thiên Lương": { 
      central: { cat: "Mẫn Tiệp", hung: "Khó Khan" }, 
      miniChart: {
        "Thìn": { 
          title: "Mẫn cảm | Kỷ luật", 
          cat: "Quyết đoán, Nghiêm khắc", 
          hung: "Sáng suốt, Lạnh lùng" 
        }
      },
      encounters: {
        "Tử Vi": { cat: "Tiệm tiến", hung: "Sóng gió" },
        "Thất Sát": { cat: "Tiệm tiến", hung: "Sóng gió" },
        "Thiên Cơ": { cat: "", hung: "" },
        "Thiên Lương": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Trợ lực", hung: "Trở ngại" },
        "Cự Môn": { cat: "Xung đột", hung: "Điều hòa" },
        "Thái Dương": { cat: "Xung đột", hung: "Điều hòa" },
        "Vũ Khúc": { cat: "Cạnh tranh", hung: "Thị phi" },
        "Tham Lang": { cat: "Cạnh tranh", hung: "Thị phi" },
        "Thiên Đồng": { cat: "Điều hòa", hung: "Biến thiên" },
        "Thái Âm": { cat: "Điều hòa", hung: "Biến thiên" },
        "Thiên Phủ": { cat: "Rực rỡ", hung: "Tráo trở" },
        "Liêm Trinh": { cat: "Khó khăn", hung: "Nạn tai" },
        "Phá Quân": { cat: "Khó khăn", hung: "Nạn tai" }
      } 
    }
  },
  "TỬ VI THÌN - TUẤT": {
    "Thiên Lương": { 
      central: { cat: "An Ổn", hung: "Trôi Nổi" }, 
      miniChart: {
        "Tỵ": { 
          title: "Hiếu động - Trôi dạt", 
          cat: "Tự kìm nén, Giải ách", 
          hung: "Chìm nổi, Lận đận" 
        }
      },
      encounters: {
        "Thất Sát": { cat: "Cơ hội", hung: "Tàng hung" },
        "Liêm Trinh": { cat: "Vững vàng", hung: "Tranh đoạt" },
        "Tử Vi": { cat: "Phá - Lập", hung: "Vô thường" },
        "Thiên Tướng": { cat: "Phá - Lập", hung: "Vô thường" },
        "Thiên Cơ": { cat: "Hư không", hung: "" },
        "Cự Môn": { cat: "Hư không", hung: "" },
        "Phá Quân": { cat: "Tốt lành", hung: "Chuyển biến" },
        "Tham Lang": { cat: "Phát đạt", hung: "Tổn thất" },
        "Thái Dương": { cat: "Cát khánh", hung: "Tàng hung" },
        "Thái Âm": { cat: "Cát khánh", hung: "Tàng hung" },
        "Vũ Khúc": { cat: "Đắc ý", hung: "Lao lực" },
        "Thiên Phủ": { cat: "Đắc ý", hung: "Lao lực" },
        "Thiên Đồng": { cat: "Phát phúc", hung: "An lành" }
      } 
    },
    "Thất Sát": { 
      central: { cat: "Quyền Uy", hung: "Khắc Kỵ" }, 
      miniChart: {
        "Ngọ": { 
          title: "Hùng Tú Kiền Nguyên", 
          cat: "Ổn trọng, Áp đặt", 
          hung: "Cứng nhắc, Lận đận" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Cô độc", hung: "Ly tán" },
        "Thất Sát": { cat: "", hung: "" },
        "Liêm Trinh": { cat: "Hưng phát", hung: "Bất trắc" },
        "Tử Vi": { cat: "Ổn trọng", hung: "Trắc trở" },
        "Thiên Tướng": { cat: "Ổn trọng", hung: "Trắc trở" },
        "Thiên Cơ": { cat: "Thị phi", hung: "Tranh chấp" },
        "Cự Môn": { cat: "Thị phi", hung: "Tranh chấp" },
        "Phá Quân": { cat: "Hanh thông", hung: "Lận đận" },
        "Tham Lang": { cat: "Thu lợi", hung: "Thuận ý" },
        "Thái Dương": { cat: "Ổn trọng", hung: "Hòa hoãn" },
        "Thái Âm": { cat: "Ổn trọng", hung: "Hòa hoãn" },
        "Vũ Khúc": { cat: "Thành quả", hung: "Sóng gió" },
        "Thiên Phủ": { cat: "Thành quả", hung: "Sóng gió" },
        "Thiên Đồng": { cat: "Thu lợi", hung: "Bất ổn" }
      } 
    },
    "Liêm Trinh": { 
      central: { cat: "Thiết Thực", hung: "Mẫn Cảm" }, 
      miniChart: {
        "Thân": { 
          title: "Tinh thần - Ảo tưởng", 
          cat: "Thực tế, Cân nhắc", 
          hung: "Cơ hội, Sáng tạo, Phát huy" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Lao lực", hung: "Hư hao" },
        "Thất Sát": { cat: "Hưng phát", hung: "Bất trắc" },
        "Liêm Trinh": { cat: "", hung: "" },
        "Tử Vi": { cat: "Tinh thần", hung: "" },
        "Thiên Tướng": { cat: "Tinh thần", hung: "" },
        "Thiên Cơ": { cat: "Thị phi", hung: "Biến động" },
        "Cự Môn": { cat: "Thị phi", hung: "Biến động" },
        "Phá Quân": { cat: "Sáng tạo", hung: "Phát huy" },
        "Tham Lang": { cat: "Thu lợi", hung: "Tàng hung" },
        "Thái Dương": { cat: "Rối ren", hung: "Thị phi" },
        "Thái Âm": { cat: "Rối ren", hung: "Thị phi" },
        "Vũ Khúc": { cat: "Phát triển", hung: "Lao tâm" },
        "Thiên Phủ": { cat: "Phát triển", hung: "Lao tâm" },
        "Thiên Đồng": { cat: "Cẩn trọng", hung: "Phòng thủ" }
      } 
    },
    "Phá Quân": { 
      central: { cat: "Điều Hòa", hung: "Thiên Lệch" }, 
      miniChart: {
        "Tuất": { 
          title: "Sóng gió", 
          cat: "Thực tế, Vất vả", 
          hung: "Chí cao, Tài đoản, Bất hòa" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Duy trì", hung: "Phòng thủ" },
        "Thất Sát": { cat: "Hưng phát", hung: "Gian truân" },
        "Liêm Trinh": { cat: "Xây dựng", hung: "Rối ren" },
        "Tử Vi": { cat: "Bất lợi", hung: "Hình khắc" },
        "Thiên Tướng": { cat: "Bất lợi", hung: "Hình khắc" },
        "Thiên Cơ": { cat: "Rối rắm", hung: "Thị phi" },
        "Cự Môn": { cat: "Rối rắm", hung: "Thị phi" },
        "Phá Quân": { cat: "", hung: "" },
        "Tham Lang": { cat: "Cẩn trọng", hung: "Tàng hung" },
        "Thái Dương": { cat: "Cô độc", hung: "Vất vả" },
        "Thái Âm": { cat: "Cô độc", hung: "Vất vả" },
        "Vũ Khúc": { cat: "Phòng thủ", hung: "Tai ách" },
        "Thiên Phủ": { cat: "Phòng thủ", hung: "Tai ách" },
        "Thiên Đồng": { cat: "Bôn ba", hung: "Trắc trở" }
      } 
    },
    "Thiên Đồng": { 
      central: { cat: "Kiên Cường", hung: "Bạc Nhược" }, 
      miniChart: {
        "Hợi": { 
          title: "Tinh thần", 
          cat: "Kiên định, Hành động", 
          hung: "Lo sợ, Cam chịu" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Vất vả", hung: "Trôi nổi" },
        "Thất Sát": { cat: "Thực tế", hung: "Tiêu cực" },
        "Liêm Trinh": { cat: "Hanh thông", hung: "Rối ren" },
        "Tử Vi": { cat: "Cứng rắn", hung: "Hình khắc" },
        "Thiên Tướng": { cat: "Cứng rắn", hung: "Hình khắc" },
        "Thiên Cơ": { cat: "Phát triển", hung: "Sóng gió" },
        "Cự Môn": { cat: "Phát triển", hung: "Sóng gió" },
        "Phá Quân": { cat: "Bôn ba", hung: "Trắc trở" },
        "Tham Lang": { cat: "Tốt lành", hung: "Phát triển" },
        "Thái Dương": { cat: "Gian nan", hung: "Khổ tâm" },
        "Thái Âm": { cat: "Gian nan", hung: "Khổ tâm" },
        "Vũ Khúc": { cat: "Hưng phát", hung: "Lầm lỗi" },
        "Thiên Phủ": { cat: "Hưng phát", hung: "Lầm lỗi" },
        "Thiên Đồng": { cat: "", hung: "" }
      } 
    },
    "Vũ Khúc": { 
      central: { cat: "Quản Tài", hung: "Sinh Tài" }, 
      miniChart: {
        "Tý": { 
          title: "Quản lý | Hành động", 
          cat: "Phòng thủ, Tiệm tiến", 
          hung: "Tấn công, Hao tài" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Lý tưởng", hung: "Hư hao" },
        "Thất Sát": { cat: "Hưng phát", hung: "Trắc trở" },
        "Liêm Trinh": { cat: "Tiệm tiến", hung: "Lao tâm" },
        "Tử Vi - Thiên Tướng": { cat: "Hưng phát", hung: "Cẩn trọng" },
        "Thiên Cơ - Cự Môn": { cat: "Tiệm tiến", hung: "Biến động" },
        "Phá Quân": { cat: "Chậm rãi", hung: "Hao phá" },
        "Tham Lang": { cat: "Thu lợi", hung: "Phát triển" },
        "Thái Dương - Thái Âm": { cat: "Phát triển", hung: "Phòng thủ" },
        "Vũ Khúc - Thiên Phủ": { cat: "", hung: "" },
        "Thiên Đồng": { cat: "Cẩn trọng", hung: "Trắc trở" }
      } 
    },
    "Thiên Phủ": { 
      central: { cat: "Quản Tài", hung: "Sinh Tài" }, 
      miniChart: {
        "Tý": { 
          title: "Quản lý | Hành động", 
          cat: "Phòng thủ, Tiệm tiến", 
          hung: "Tấn công, Hao tài" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Lý tưởng", hung: "Hư hao" },
        "Thất Sát": { cat: "Hưng phát", hung: "Trắc trở" },
        "Liêm Trinh": { cat: "Tiệm tiến", hung: "Lao tâm" },
        "Tử Vi - Thiên Tướng": { cat: "Hưng phát", hung: "Cẩn trọng" },
        "Thiên Cơ - Cự Môn": { cat: "Tiệm tiến", hung: "Biến động" },
        "Phá Quân": { cat: "Chậm rãi", hung: "Hao phá" },
        "Tham Lang": { cat: "Thu lợi", hung: "Phát triển" },
        "Thái Dương - Thái Âm": { cat: "Phát triển", hung: "Phòng thủ" },
        "Vũ Khúc - Thiên Phủ": { cat: "", hung: "" },
        "Thiên Đồng": { cat: "Cẩn trọng", hung: "Trắc trở" }
      } 
    },
    "Thái Dương": { 
      central: { cat: "Sáng Láng", hung: "Trầm Uất" }, 
      miniChart: {
        "Sửu": { 
          title: "Tích cực | Tiêu cực", 
          cat: "Hòa hợp", 
          hung: "Khi sáng khi tối" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Thử thách", hung: "Trắc trở" },
        "Thất Sát": { cat: "Hưng phát", hung: "Bất an" },
        "Liêm Trinh": { cat: "Ổn trọng", hung: "Lao tâm" },
        "Tử Vi - Thiên Tướng": { cat: "Tiệm tiến", hung: "Lao lực" },
        "Thiên Cơ - Cự Môn": { cat: "Biến động", hung: "Lo lắng" },
        "Phá Quân": { cat: "Sáng tạo", hung: "Biến động" },
        "Tham Lang": { cat: "Hanh thông", hung: "Khó khăn" },
        "Thái Dương - Thái Âm": { cat: "", hung: "" },
        "Vũ Khúc - Thiên Phủ": { cat: "Phát triển", hung: "Khổ tâm" },
        "Thiên Đồng": { cat: "Hanh thông", hung: "Gian nan" }
      } 
    },
    "Thái Âm": { 
      central: { cat: "Sáng Láng", hung: "Trầm Uất" }, 
      miniChart: {
        "Sửu": { 
          title: "Tích cực | Tiêu cực", 
          cat: "Hòa hợp", 
          hung: "Khi sáng khi tối" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Thử thách", hung: "Trắc trở" },
        "Thất Sát": { cat: "Hưng phát", hung: "Bất an" },
        "Liêm Trinh": { cat: "Ổn trọng", hung: "Lao tâm" },
        "Tử Vi - Thiên Tướng": { cat: "Tiệm tiến", hung: "Lao lực" },
        "Thiên Cơ - Cự Môn": { cat: "Biến động", hung: "Lo lắng" },
        "Phá Quân": { cat: "Sáng tạo", hung: "Biến động" },
        "Tham Lang": { cat: "Hanh thông", hung: "Khó khăn" },
        "Thái Dương - Thái Âm": { cat: "", hung: "" },
        "Vũ Khúc - Thiên Phủ": { cat: "Phát triển", hung: "Khổ tâm" },
        "Thiên Đồng": { cat: "Hanh thông", hung: "Gian nan" }
      } 
    },
    "Tham Lang": { 
      central: { cat: "Dục Vật", hung: "Dục Tình" }, 
      miniChart: {
        "Dần": { 
          title: "Đấu trí - Khéo léo", 
          cat: "Giao tế", 
          hung: "" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Thử thách", hung: "Trở ngại" },
        "Thất Sát": { cat: "Khai vận", hung: "Bất an" },
        "Liêm Trinh": { cat: "Phát đạt", hung: "Hư hao" },
        "Tử Vi - Thiên Tướng": { cat: "Trở ngại", hung: "Hưng phát" },
        "Thiên Cơ - Cự Môn": { cat: "Cẩn trọng", hung: "Trắc trở" },
        "Phá Quân": { cat: "Thử thách", hung: "Trắc trở" },
        "Tham Lang": { cat: "", hung: "" },
        "Thái Dương - Thái Âm": { cat: "Bất ổn", hung: "Bình ổn" },
        "Vũ Khúc - Thiên Phủ": { cat: "Phát triển", hung: "Khổ tâm" },
        "Thiên Đồng": { cat: "Hanh thông", hung: "Tàng hung" }
      } 
    },
    "Thiên Cơ": { 
      central: { cat: "Vững Vàng", hung: "Trôi Nổi" }, 
      miniChart: {
        "Mão": { 
          title: "Cơ Cự Kỵ Thiên Di", 
          cat: "", 
          hung: "" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Khai sáng", hung: "Trôi dạt" },
        "Thất Sát": { cat: "Hành động", hung: "Vất vả" },
        "Liêm Trinh": { cat: "Rối ren", hung: "Hư hao" },
        "Tử Vi - Thiên Tướng": { cat: "Trở ngại", hung: "Giữ gìn" },
        "Thiên Cơ - Cự Môn": { cat: "", hung: "" },
        "Phá Quân": { cat: "Rắc rối", hung: "Hao tán" },
        "Tham Lang": { cat: "Thay đổi", hung: "Đại biến" },
        "Thái Dương - Thái Âm": { cat: "Sóng gió", hung: "Bất trắc" },
        "Vũ Khúc - Thiên Phủ": { cat: "Chìm nổi", hung: "Nạn tai" },
        "Thiên Đồng": { cat: "Xoay chuyển", hung: "Trắc trở" }
      } 
    },
    "Cự Môn": { 
      central: { cat: "Vững Vàng", hung: "Trôi Nổi" }, 
      miniChart: {
        "Mão": { 
          title: "Cơ Cự Kỵ Thiên Di", 
          cat: "", 
          hung: "" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Khai sáng", hung: "Trôi dạt" },
        "Thất Sát": { cat: "Hành động", hung: "Vất vả" },
        "Liêm Trinh": { cat: "Rối ren", hung: "Hư hao" },
        "Tử Vi - Thiên Tướng": { cat: "Trở ngại", hung: "Giữ gìn" },
        "Thiên Cơ - Cự Môn": { cat: "", hung: "" },
        "Phá Quân": { cat: "Rắc rối", hung: "Hao tán" },
        "Tham Lang": { cat: "Thay đổi", hung: "Đại biến" },
        "Thái Dương - Thái Âm": { cat: "Sóng gió", hung: "Bất trắc" },
        "Vũ Khúc - Thiên Phủ": { cat: "Chìm nổi", hung: "Nạn tai" },
        "Thiên Đồng": { cat: "Xoay chuyển", hung: "Trắc trở" }
      } 
    },
    "Tử Vi": { 
      central: { cat: "Hữu Tình", hung: "Vô Tình" }, 
      miniChart: {
        "Thìn": { 
          title: "Nhiệt thành | Nóng vội", 
          cat: "Sốt sắng", 
          hung: "Bất chấp" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Bất ổn", hung: "Cất nhắc" },
        "Thất Sát": { cat: "Thăng tiến", hung: "Trắc trở" },
        "Liêm Trinh": { cat: "Rắc rối", hung: "Khổ tâm" },
        "Tử Vi - Thiên Tướng": { cat: "", hung: "" },
        "Thiên Cơ - Cự Môn": { cat: "Khai triển", hung: "Độc lập" },
        "Phá Quân": { cat: "Ổn định", hung: "Rối ren" },
        "Tham Lang": { cat: "Cát lợi", hung: "Vô tình" },
        "Thái Dương - Thái Âm": { cat: "Khổ tâm", hung: "Bất lợi" },
        "Vũ Khúc - Thiên Phủ": { cat: "Hanh thông", hung: "Sóng gió" },
        "Thiên Đồng": { cat: "Bình ổn", hung: "Được lợi" }
      } 
    },
    "Thiên Tướng": { 
      central: { cat: "Hữu Tình", hung: "Vô Tình" }, 
      miniChart: {
        "Thìn": { 
          title: "Nhiệt thành | Nóng vội", 
          cat: "Sốt sắng", 
          hung: "Bất chấp" 
        }
      },
      encounters: {
        "Thiên Lương": { cat: "Bất ổn", hung: "Cất nhắc" },
        "Thất Sát": { cat: "Thăng tiến", hung: "Trắc trở" },
        "Liêm Trinh": { cat: "Rắc rối", hung: "Khổ tâm" },
        "Tử Vi - Thiên Tướng": { cat: "", hung: "" },
        "Thiên Cơ - Cự Môn": { cat: "Khai triển", hung: "Độc lập" },
        "Phá Quân": { cat: "Ổn định", hung: "Rối ren" },
        "Tham Lang": { cat: "Cát lợi", hung: "Vô tình" },
        "Thái Dương - Thái Âm": { cat: "Khổ tâm", hung: "Bất lợi" },
        "Vũ Khúc - Thiên Phủ": { cat: "Hanh thông", hung: "Sóng gió" },
        "Thiên Đồng": { cat: "Bình ổn", hung: "Được lợi" }
      } 
    }
  },
  "TỬ VI SỬU - MÙI": {
    "Liêm Trinh": { 
      central: { cat: "Vật Dục", hung: "Tình Dục" }, 
      miniChart: {
        "Tỵ": { 
          cat: "Thực dụng, 1234", 
          hung: "Trao đổi, Nghệ thuật" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "", hung: "" },
        "Cự Môn": { cat: "Sóng gió", hung: "Đau khổ" },
        "Thiên Tướng": { cat: "Hanh thông", hung: "Động lộc" },
        "Đồng Lương": { cat: "Hanh thông", hung: "Động lộc" },
        "Thái Âm": { cat: "Đánh đổi", hung: "Đánh đổi" },
        "Vũ Sát": { cat: "Bất ổn", hung: "Đánh đổi" },
        "Thiên Phủ": { cat: "Được - mất", hung: "Lầm lỡ" },
        "Thái Dương": { cat: "Công danh", hung: "Hung họa" },
        "Tử Phá": { cat: "Sáng tạo", hung: "Liều lĩnh" },
        "Thiên Cơ": { cat: "Nguyên tắc", hung: "Quyết đoán" }
      } 
    },
    "Tham Lang": { 
      central: { cat: "Vật Dục", hung: "Tình Dục" }, 
      miniChart: {
        "Tỵ": { 
          cat: "Thực dụng, 1234", 
          hung: "Trao đổi, Nghệ thuật" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "", hung: "" },
        "Cự Môn": { cat: "Sóng gió", hung: "Đau khổ" },
        "Thiên Tướng": { cat: "Hanh thông", hung: "Động lộc" },
        "Đồng Lương": { cat: "Hanh thông", hung: "Động lộc" },
        "Thái Âm": { cat: "Đánh đổi", hung: "Đánh đổi" },
        "Vũ Sát": { cat: "Bất ổn", hung: "Đánh đổi" },
        "Thiên Phủ": { cat: "Được - mất", hung: "Lầm lỡ" },
        "Thái Dương": { cat: "Công danh", hung: "Hung họa" },
        "Tử Phá": { cat: "Sáng tạo", hung: "Liều lĩnh" },
        "Thiên Cơ": { cat: "Nguyên tắc", hung: "Quyết đoán" }
      } 
    },
    "Cự Môn": { 
      central: { cat: "Nội Liễm", hung: "Nghi Kỵ" }, 
      miniChart: {
        "Ngọ": { 
          title: "Thạch Trung Ẩn Ngọc", 
          cat: "Thâm tàng", 
          hung: "Xảo quyệt" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Tiết khí", hung: "Nghi tình" },
        "Cự Môn": { cat: "", hung: "" },
        "Thiên Tướng": { cat: "Tốt lành", hung: "Ám muội" },
        "Đồng Lương": { cat: "Vững vàng", hung: "Đổ vỡ" },
        "Thái Âm": { cat: "Phát đạt", hung: "Trở ngại" },
        "Vũ Sát": { cat: "Duy trì", hung: "Bất ổn" },
        "Thiên Phủ": { cat: "Hoạch lợi", hung: "Bất hòa" },
        "Thái Dương": { cat: "Đại Súc", hung: "Tiểu Súc" },
        "Tử Phá": { cat: "Thị phi", hung: "Đổ vỡ" },
        "Thiên Cơ": { cat: "Hao", hung: "Tán" }
      } 
    },
    "Thiên Tướng": { 
      central: { cat: "Ưu Nhã", hung: "Dung Tục" }, 
      miniChart: {
        "Mùi": { 
          title: "Thạch Trung Ẩn Ngọc", 
          cat: "Thâm tàng", 
          hung: "Xảo quyệt" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Hỷ - Hạn", hung: "Đào hoa sát" },
        "Cự Môn": { cat: "Cát lợi", hung: "Chia xa" },
        "Thiên Tướng": { cat: "", hung: "" },
        "Đồng Lương": { cat: "Lạc quan", hung: "Chìm đắm" },
        "Thái Âm": { cat: "Cát - Hung", hung: "Hao - Tán" },
        "Vũ Sát": { cat: "Lận đận", hung: "Đổ vỡ" },
        "Thiên Phủ": { cat: "Được - Mất", hung: "Phá tán" },
        "Thái Dương": { cat: "Đường", hung: "Lột xác, Gây lụy" },
        "Tử Phá": { cat: "Cất nhắc", hung: "Bỏ rơi" },
        "Thiên Cơ": { cat: "Nắm quyền", hung: "Đắc ý" }
      } 
    },
    "Thiên Đồng": { 
      central: { cat: "Nguyên Tắc", hung: "Lãng Mạn" }, 
      miniChart: {
        "Thân": { 
          title: "Phúc thọ tươi vui", 
          cat: "Đáng tin, Cứng nhắc", 
          hung: "Nhàn tản, Tư lợi" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Quyền", hung: "Tiêu pha" },
        "Cự Môn": { cat: "Tiêu cực", hung: "Vui vẻ" },
        "Thiên Tướng": { cat: "Lạc quan", hung: "Tai Ách" },
        "Đồng Lương": { cat: "", hung: "" },
        "Thái Âm": { cat: "Phát đạt", hung: "Nhàn tản" },
        "Vũ Sát": { cat: "Lộc Quyền", hung: "Nóng nảy" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Dương": { cat: "Tỏa sáng", hung: "Tự do" },
        "Tử Phá": { cat: "Khai sáng", hung: "Bỏ rơi" },
        "Thiên Cơ": { cat: "Tích cực", hung: "Thông suốt" }
      } 
    },
    "Thiên Lương": { 
      central: { cat: "Nguyên Tắc", hung: "Lãng Mạn" }, 
      miniChart: {
        "Thân": { 
          title: "Phúc thọ tươi vui", 
          cat: "Đáng tin, Cứng nhắc", 
          hung: "Nhàn tản, Tư lợi" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Quyền", hung: "Tiêu pha" },
        "Cự Môn": { cat: "Tiêu cực", hung: "Vui vẻ" },
        "Thiên Tướng": { cat: "Lạc quan", hung: "Tai Ách" },
        "Đồng Lương": { cat: "", hung: "" },
        "Thái Âm": { cat: "Phát đạt", hung: "Nhàn tản" },
        "Vũ Sát": { cat: "Lộc Quyền", hung: "Nóng nảy" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Dương": { cat: "Tỏa sáng", hung: "Tự do" },
        "Tử Phá": { cat: "Khai sáng", hung: "Bỏ rơi" },
        "Thiên Cơ": { cat: "Tích cực", hung: "Thông suốt" }
      } 
    },
    "Vũ Khúc": { 
      central: { cat: "Quyết Đoán", hung: "Nông cạn" }, 
      miniChart: {
        "Dậu": { 
          cat: "Sáng suốt, Hữu tình", 
          hung: "Chắp vá, Tuyệt tình" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Chuyển biến", hung: "Sai lầm" },
        "Cự Môn": { cat: "Thành tựu", hung: "Đổ vỡ" },
        "Thiên Tướng": { cat: "Áp lực", hung: "Đổ vỡ" },
        "Đồng Lương": { cat: "Thất chí", hung: "Đắm chìm" },
        "Thái Âm": { cat: "Đánh đổi", hung: "Đền bù" },
        "Vũ Sát": { cat: "", hung: "" },
        "Thiên Phủ": { cat: "Xui xẻo", hung: "Nạn tai" },
        "Thái Dương": { cat: "Tỏa sáng", hung: "Thị phi" },
        "Tử Phá": { cat: "Chuyển biến", hung: "Cạnh tranh, Phá tài" },
        "Thiên Cơ": { cat: "Sáng suốt", hung: "Hữu tình, Tuyệt tình" }
      } 
    },
    "Thất Sát": { 
      central: { cat: "Quyết Đoán", hung: "Nông Cạn" }, 
      miniChart: {
        "Dậu": { 
          cat: "Sáng suốt, Hữu tình", 
          hung: "Chắp vá, Tuyệt tình" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Chuyển biến", hung: "Sai lầm" },
        "Cự Môn": { cat: "Thành tựu", hung: "Đổ vỡ" },
        "Thiên Tướng": { cat: "Áp lực", hung: "Đổ vỡ" },
        "Đồng Lương": { cat: "Thất chí", hung: "Đắm chìm" },
        "Thái Âm": { cat: "Đánh đổi", hung: "Đền bù" },
        "Vũ Sát": { cat: "", hung: "" },
        "Thiên Phủ": { cat: "Xui xẻo", hung: "Nạn tai" },
        "Thái Dương": { cat: "Tỏa sáng", hung: "Thị phi" },
        "Tử Phá": { cat: "Chuyển biến", hung: "Cạnh tranh, Phá tài" },
        "Thiên Cơ": { cat: "Sáng suốt", hung: "Hữu tình, Tuyệt tình" }
      } 
    },
    "Thái Dương": { 
      central: { cat: "Độc Lập", hung: "Phiến Toái" }, 
      miniChart: {
        "Tuất": { 
          cat: "Tỏa sáng, Ấm áp", 
          hung: "Trắc trở, Lạnh nhạt" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Áp lực", hung: "Tổn thất" },
        "Cự Môn": { cat: "Cát lợi", hung: "Thị phi" },
        "Thiên Tướng": { cat: "Thuận ý", hung: "Bôn ba" },
        "Đồng Lương": { cat: "Sáng nghiệp", hung: "Đào hoa / Lỗi" },
        "Thái Âm": { cat: "Cát lợi", hung: "Muộn phiền" },
        "Vũ Sát": { cat: "Khai vận", hung: "Đổ vỡ" },
        "Thiên Phủ": { cat: "Kho dầy", hung: "Kho lỡ" },
        "Thái Dương": { cat: "", hung: "" },
        "Tử Phá": { cat: "Tự lập", hung: "Bất lực" },
        "Thiên Cơ": { cat: "Sáng suốt", hung: "Gánh vác" }
      } 
    },
    "Thiên Cơ": { 
      central: { cat: "Cương", hung: "Nhu" }, 
      miniChart: {
        "Hợi": { 
          cat: "Tỏa sáng, Khai sáng", 
          hung: "Tư lợi, Phòng thủ" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Hoạch lợi", hung: "Tổn thất" },
        "Cự Môn": { cat: "Cát lợi", hung: "Thị phi" },
        "Thiên Tướng": { cat: "Thuận ý", hung: "Bài xích" },
        "Đồng Lương": { cat: "Sáng nghiệp", hung: "Đào hoa / Lỗi" },
        "Thái Âm": { cat: "Phát triển", hung: "Muộn phiền" },
        "Vũ Sát": { cat: "Khai vận", hung: "Đổ vỡ" },
        "Thiên Phủ": { cat: "Bất mãn", hung: "Tích lũy" },
        "Thái Dương": { cat: "Sáng suốt", hung: "Rối ren" },
        "Tử Phá": { cat: "Sáng tạo", hung: "Bất hòa" },
        "Thiên Cơ": { cat: "", hung: "" }
      } 
    },
    "Tử Vi": { 
      central: { cat: "An Định", hung: "Bất Ổn" }, 
      miniChart: {
        "Sửu": { 
          cat: "Khai sáng, Ấm áp", 
          hung: "Phản kháng, Lạnh nhạt" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Phát triển", hung: "Tổn thất" },
        "Cự Môn": { cat: "Áp lực", hung: "Trắc trở" },
        "Thiên Tướng": { cat: "Thuận ý", hung: "Bài xích" },
        "Đồng Lương": { cat: "Rối ren", hung: "Chuyển xấu" },
        "Thái Âm": { cat: "Biến chuyển", hung: "Vượt khó" },
        "Vũ Sát": { cat: "Khai vận", hung: "Vất vả" },
        "Thiên Phủ": { cat: "Chuyển biến", hung: "Thu lợi" },
        "Thái Dương": { cat: "Hanh thông", hung: "Danh vọng" },
        "Tử Phá": { cat: "", hung: "" },
        "Thiên Cơ": { cat: "Động lực", hung: "Trợ giúp" }
      } 
    },
    "Phá Quân": { 
      central: { cat: "An Định", hung: "Bất Ổn" }, 
      miniChart: {
        "Sửu": { 
          cat: "Khai sáng, Ấm áp", 
          hung: "Phản kháng, Lạnh nhạt" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Phát triển", hung: "Tổn thất" },
        "Cự Môn": { cat: "Áp lực", hung: "Trắc trở" },
        "Thiên Tướng": { cat: "Thuận ý", hung: "Bài xích" },
        "Đồng Lương": { cat: "Rối ren", hung: "Chuyển xấu" },
        "Thái Âm": { cat: "Biến chuyển", hung: "Vượt khó" },
        "Vũ Sát": { cat: "Khai vận", hung: "Vất vả" },
        "Thiên Phủ": { cat: "Chuyển biến", hung: "Thu lợi" },
        "Thái Dương": { cat: "Hanh thông", hung: "Danh vọng" },
        "Tử Phá": { cat: "", hung: "" },
        "Thiên Cơ": { cat: "Động lực", hung: "Trợ giúp" }
      } 
    },
    "Thiên Phủ": { 
      central: { cat: "Vững Vàng", hung: "Cẩn Thận" }, 
      miniChart: {
        "Mão": { 
          cat: "Tỏa sáng, Ấm áp", 
          hung: "Tư lợi, Lạnh nhạt" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Khó khăn", hung: "Tổn thất" },
        "Cự Môn": { cat: "Áp lực", hung: "Thị phi" },
        "Thiên Tướng": { cat: "Thuận ý", hung: "Bài xích" },
        "Đồng Lương": { cat: "Rối ren", hung: "Chuyển xấu" },
        "Thái Âm": { cat: "Tài khí", hung: "Tổn thất" },
        "Vũ Sát": { cat: "Khai vận", hung: "Vất vả" },
        "Thiên Phủ": { cat: "", hung: "" },
        "Thái Dương": { cat: "Hư hao", hung: "Lao tâm" },
        "Tử Phá": { cat: "Chuyển biến", hung: "Chìm nổi" },
        "Thiên Cơ": { cat: "Biến động", hung: "Bất ổn" }
      } 
    },
    "Thái Âm": { 
      central: { cat: "Mục Tiêu", hung: "Mù Quáng" }, 
      miniChart: {
        "Thìn": { 
          cat: "Vượt bậc, Sai lầm", 
          hung: "Trói buộc, Hư danh" 
        }
      },
      encounters: {
        "Liêm Trinh - Tham Lang": { cat: "Sáng lập", hung: "Yếu đuối" },
        "Cự Môn": { cat: "Vượt bậc", hung: "Hư danh" },
        "Thiên Tướng": { cat: "Trói buộc", hung: "Hư danh" },
        "Đồng Lương": { cat: "Ổn trọng", hung: "Bất an" },
        "Thái Âm": { cat: "", hung: "" },
        "Vũ Sát": { cat: "Sóng gió", hung: "Tai biến" },
        "Thiên Phủ": { cat: "Thị phi", hung: "Vô tri" },
        "Thái Dương": { cat: "Tranh chấp", hung: "Liên lụy" },
        "Tử Phá": { cat: "Khai sáng", hung: "Bôn ba" },
        "Thiên Cơ": { cat: "Lo lắng", hung: "Muộn phiền" }
      } 
    }
  }
};

export function getLayoutName(tuViPos: number): LayoutName {
  const pairs: Record<number, LayoutName> = {
    0: "TỬ VI TÝ - NGỌ", 6: "TỬ VI TÝ - NGỌ",
    1: "TỬ VI SỬU - MÙI", 7: "TỬ VI SỬU - MÙI",
    2: "TỬ VI DẦN - THÂN", 8: "TỬ VI DẦN - THÂN",
    3: "TỬ VI MÃO - DẬU", 9: "TỬ VI MÃO - DẬU",
    4: "TỬ VI THÌN - TUẤT", 10: "TỬ VI THÌN - TUẤT",
    5: "TỬ VI TỴ - HỢI", 11: "TỬ VI TỴ - HỢI",
  };
  return pairs[tuViPos];
}

export const STAR_YIN_YANG: Record<string, string> = {
  "Tử Vi": "-",
  "Thiên Cơ": "-",
  "Thái Dương": "+",
  "Vũ Khúc": "-",
  "Thiên Đồng": "+",
  "Liêm Trinh": "-",
  "Thiên Phủ": "+",
  "Thái Âm": "-",
  "Tham Lang": "+",
  "Cự Môn": "-",
  "Thiên Tướng": "+",
  "Thiên Lương": "+",
  "Thất Sát": "+",
  "Phá Quân": "-"
};
