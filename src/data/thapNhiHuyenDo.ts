export interface HuyenDoInteraction {
  catThuan: string[];
  hungNghich: string[];
}

export interface HuyenDoData {
  center: HuyenDoInteraction;
  houses: {
    [chi: number]: HuyenDoInteraction; // 0: Tý, 1: Sửu, ..., 11: Hợi
  };
}

export type LayoutType = 'TyNgo' | 'SuuMui' | 'DanThan' | 'MaoDau' | 'ThinTuat' | 'TiHoi';

export const THAP_NHI_HUYEN_DO: Record<LayoutType, Record<string, HuyenDoData>> = {
  TyNgo: {},
  SuuMui: {},
  DanThan: {
    "Thất Sát": {
      center: {
        catThuan: ["NỂ SỢ / BẤT PHỤC"],
        hungNghich: ["CÔ ĐỘC"]
      },
      houses: {
        5: { // Tị (Cự Môn)
          catThuan: ["KHÓ KHĂN"],
          hungNghich: ["TRỞ NGẠI"]
        }
      }
    }
  },
  MaoDau: {},
  ThinTuat: {},
  TiHoi: {}
};
