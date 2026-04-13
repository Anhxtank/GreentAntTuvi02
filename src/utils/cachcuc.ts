export interface GiapCung {
  name: string;
  description: string;
  type: 'cat' | 'hung' | 'dacthu';
}

export function detectGiapCung(menhPos: number, majorStars: string[][], goodStars: string[][], badStars: string[][]): GiapCung[] {
  const results: GiapCung[] = [];
  
  const parseName = (s: string) => s.split(' (')[0].trim();
  const getMajorAt = (pos: number) => (majorStars[pos] || []).map(parseName);
  const getMinorAt = (pos: number) => [...(goodStars[pos] || []), ...(badStars[pos] || [])].map(parseName);
  const getAllAt = (pos: number) => [...getMajorAt(pos), ...getMinorAt(pos)];

  const leftPos = (menhPos - 1 + 12) % 12;
  const rightPos = (menhPos + 1) % 12;
  const leftStars = getAllAt(leftPos);
  const rightStars = getAllAt(rightPos);

  // Helper to check if two stars are in left and right positions (order doesn't matter)
  const hasPair = (star1: string, star2: string) => {
    return (leftStars.includes(star1) && rightStars.includes(star2)) || 
           (leftStars.includes(star2) && rightStars.includes(star1));
  };

  // Helper to check if a star from group1 is on one side and a star from group2 is on the other
  const hasGroupPair = (group1: string[], group2: string[]) => {
    const leftHasG1 = group1.some(s => leftStars.includes(s));
    const rightHasG2 = group2.some(s => rightStars.includes(s));
    const leftHasG2 = group2.some(s => leftStars.includes(s));
    const rightHasG1 = group1.some(s => rightStars.includes(s));
    
    return (leftHasG1 && rightHasG2) || (leftHasG2 && rightHasG1);
  };

  const locStars = ["Hóa Lộc", "Lộc Tồn", "LỘC TỒN"];

  // 1. Tử vi & Hóa lộc/Lộc tồn
  if (hasGroupPair(["Tử Vi"], locStars)) {
    results.push({ name: "Tử vi / Hóa lộc (Lộc tồn)", description: "Quý cách: Cao quý, thông tuệ, đức hạnh và thành công rực rỡ", type: 'cat' });
  }
  // 2. Thiên phủ & Hóa lộc/Lộc tồn
  if (hasGroupPair(["Thiên Phủ"], locStars)) {
    results.push({ name: "Thiên phủ / Hóa lộc (Lộc tồn)", description: "Quý cách: Cao quý, thông tuệ, đức hạnh và thành công rực rỡ", type: 'cat' });
  }
  // 3. Thiên khôi & Hóa lộc/Lộc tồn
  if (hasGroupPair(["Thiên Khôi", "THIÊN KHÔI"], locStars)) {
    results.push({ name: "Thiên khôi / Hóa lộc (Lộc tồn)", description: "Quý cách: Cao quý, thông tuệ, đức hạnh và thành công rực rỡ", type: 'cat' });
  }
  // 4. Thiên việt & Hóa lộc/Lộc tồn
  if (hasGroupPair(["Thiên Việt", "THIÊN VIỆT"], locStars)) {
    results.push({ name: "Thiên việt / Hóa lộc (Lộc tồn)", description: "Quý cách: Cao quý, thông tuệ, đức hạnh và thành công rực rỡ", type: 'cat' });
  }
  // 5. Thiên quan & Hóa lộc/Lộc tồn
  if (hasGroupPair(["Thiên Quan", "THIÊN QUAN"], locStars)) {
    results.push({ name: "Thiên quan / Hóa lộc (Lộc tồn)", description: "Quý cách: Cao quý, thông tuệ, đức hạnh và thành công rực rỡ", type: 'cat' });
  }
  // 6. Thiên phúc & Hóa lộc/Lộc tồn
  if (hasGroupPair(["Thiên Phúc", "THIÊN PHÚC"], locStars)) {
    results.push({ name: "Thiên phúc / Hóa lộc (Lộc tồn)", description: "Quý cách: Cao quý, thông tuệ, đức hạnh và thành công rực rỡ", type: 'cat' });
  }
  // 7. Quyền & Khoa
  if (hasGroupPair(["Hóa Quyền", "Quyền"], ["Hóa Khoa", "Khoa"])) {
    results.push({ name: "Hóa Quyền / Hóa Khoa", description: "Hiếm cách: Cao quý, thông tuệ, đức hạnh và thành công rực rỡ", type: 'cat' });
  }
  // 8. Địa Không & Địa kiếp
  if (hasPair("ĐỊA KHÔNG", "ĐỊA KIẾP") || hasPair("Địa Không", "Địa Kiếp")) {
    results.push({ name: "Địa Không / Địa kiếp", description: "Người có cuộc sống nghèo hèn", type: 'hung' });
  }
  // 9. Thái Dương & Thái Âm
  if (hasPair("Thái Dương", "Thái Âm")) {
    results.push({ name: "Thái Dương / Thái Âm", description: "Người thông minh, sáng dạ", type: 'cat' });
  }
  // 10. Văn xương & Văn khúc
  if (hasPair("VĂN XƯƠNG", "VĂN KHÚC") || hasPair("Văn Xương", "Văn Khúc")) {
    results.push({ name: "Văn xương / Văn khúc", description: "Quý cách: Cao quý, thông tuệ, đức hạnh và thành công rực rỡ", type: 'cat' });
  }
  // 11. Kình Dương & Đà La
  if (hasPair("KÌNH DƯƠNG", "ĐÀ LA") || hasPair("Kình Dương", "Đà La")) {
    results.push({ name: "Kình Dương / Đà La", description: "Người có số ăn mày", type: 'hung' });
  }

  return results;
}

export interface CachCuc {
  name: string;
  description: string;
  type: 'cat' | 'hung' | 'dacthu';
}

export function detectCachCuc(menhPos: number, majorStars: string[][], goodStars: string[][], badStars: string[][]): CachCuc[] {
  const results: CachCuc[] = [];
  
  // Helper to parse star name (remove brightness like " (M)")
  const parseName = (s: string) => s.split(' (')[0].trim();
  
  // Helper to get all stars at a position
  const getMajorAt = (pos: number) => (majorStars[pos] || []).map(parseName);
  const getMinorAt = (pos: number) => [...(goodStars[pos] || []), ...(badStars[pos] || [])].map(parseName);
  const getAllAt = (pos: number) => [...getMajorAt(pos), ...getMinorAt(pos)];
  
  // Tam Hop positions
  const tamHop = [menhPos, (menhPos + 4) % 12, (menhPos + 8) % 12];
  const xungChieu = (menhPos + 6) % 12;
  const quanTrong = [...tamHop, xungChieu];
  
  const allMajorStars = quanTrong.flatMap(pos => getMajorAt(pos));
  const allMinorStars = quanTrong.flatMap(pos => getMinorAt(pos));
  const allStars = quanTrong.flatMap(pos => getAllAt(pos));
  
  const menhMajorStars = getMajorAt(menhPos);
  const menhMinorStars = getMinorAt(menhPos);
  const menhAllStars = getAllAt(menhPos);

  const leftPos = (menhPos - 1 + 12) % 12;
  const rightPos = (menhPos + 1) % 12;
  const leftStars = getAllAt(leftPos);
  const rightStars = getAllAt(rightPos);

  // Ám hợp mapping
  const amHopMap: Record<number, number> = {
    0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6
  };
  const amHopPos = amHopMap[menhPos];
  const amHopStars = getAllAt(amHopPos);

  // 1. Tam kỳ gia hội cách
  if (allStars.includes("Hóa Lộc") && allStars.includes("Hóa Quyền") && allStars.includes("Hóa Khoa")) {
    results.push({ name: "Tam kỳ gia hội cách", description: "Hóa Lộc, Hóa Quyền, Hóa Khoa hội hợp tại cung Mệnh. Chủ về công danh phú quý, danh vọng lẫy lừng, được ví như bậc tể tướng điều hòa âm dương", type: 'cat' });
  }

  // 2. Văn quế, văn hoa cách
  if ((menhPos === 1 || menhPos === 7) && menhMinorStars.includes("VĂN XƯƠNG") && menhMinorStars.includes("VĂN KHÚC")) {
    results.push({ name: "Văn quế, văn hoa cách", description: "Mệnh an tại Sửu hoặc Mùi có Văn Xương, Văn Khúc cùng tọa thủ. Người này phong lưu nho nhã, thông minh tuấn tú, có tài an bang tế thế", type: 'cat' });
  }

  // 3. Cự phùng tứ sát cách
  if (menhPos === 8 && menhMajorStars.includes("Cự Môn") && (menhMinorStars.includes("KÌNH DƯƠNG") || menhMinorStars.includes("ĐÀ LA") || menhMinorStars.includes("HỎA TINH") || menhMinorStars.includes("LINH TINH"))) {
    results.push({ name: "Cự phùng tứ sát cách", description: "Cự Môn lạc hãm thủ cung Thân, tứ sát (Kình, Đà, Hỏa, Linh) thủ cung Mệnh. Chủ về cuộc đời nhiều sóng gió, trắc trở, dễ lưu lạc phương xa", type: 'hung' });
  }

  // 4. Đan trì quế trì cách
  if ((menhMajorStars.includes("Thái Dương") && (menhPos === 4 || menhPos === 5)) || (menhMajorStars.includes("Thái Âm") && (menhPos === 10 || menhPos === 9))) {
    results.push({ name: "Đan trì quế trì cách", description: "Nhật Nguyệt miếu vượng (Thái Dương tại Thìn/Tị, Thái Âm tại Tuất/Dậu). Rất có lợi cho việc cầu danh, đỗ đạt sớm, \"một bước lên mây\"", type: 'cat' });
  }

  // 5. Tả hữu đồng cung cách
  if (menhMinorStars.includes("TẢ PHÙ") && menhMinorStars.includes("HỮU BẬT")) {
    results.push({ name: "Tả hữu đồng cung cách", description: "Tả Phụ và Hữu Bật cùng tọa thủ cung Mệnh. Chủ về người đôn hậu, được nhiều trợ giúp từ đồng sự hoặc người dưới quyền", type: 'cat' });
  }

  // 6. Tử Phủ đồng cung cách
  if ((menhPos === 2 || menhPos === 8) && menhMajorStars.includes("Tử Vi") && menhMajorStars.includes("Thiên Phủ")) {
    results.push({ name: "Tử Phủ đồng cung cách", description: "Tử Vi và Thiên Phủ cùng ở Dần hoặc Thân. Là cách cục phú quý song toàn nhưng nội tâm thường mâu thuẫn giữa tính sáng tạo (Tử Vi) và bảo thủ (Thiên Phủ)", type: 'cat' });
  }

  // 7. Phủ Tướng triều viên cách
  if (!menhMajorStars.includes("Thiên Phủ") && !menhMajorStars.includes("Thiên Tướng") && allMajorStars.includes("Thiên Phủ") && allMajorStars.includes("Thiên Tướng")) {
    results.push({ name: "Phủ Tướng triều viên cách", description: "Thiên Phủ và Thiên Tướng hội chiếu cung Mệnh. Chủ về người tính tình công chính, phú quý song toàn, được nhiều người ngưỡng mộ", type: 'cat' });
  }

  // 8. Thiên Phủ triều viên cách
  if ((menhPos === 4 || menhPos === 10) && menhMajorStars.includes("Thiên Phủ")) {
    results.push({ name: "Thiên Phủ triều viên cách", description: "Thiên Phủ nhập miếu tại Thìn hoặc Tuất (đồng cung Liêm Trinh). Chủ về quan cao chức trọng, phúc quý song toàn, nữ mệnh thì hiền thục", type: 'cat' });
  }

  // 9. Quân thần khánh hội cách
  if (menhMajorStars.includes("Tử Vi") && menhMinorStars.includes("TẢ PHÙ") && menhMinorStars.includes("HỮU BẬT")) {
    results.push({ name: "Quân thần khánh hội cách", description: "Tử Vi cùng Tả Phụ, Hữu Bật tại cung Mệnh. Chủ về được nhiều quý nhân phò trợ, quần chúng hưởng ứng, phú quý trọn đời", type: 'cat' });
  }

  // 10. Cơ Nguyệt Đồng Lương cách
  if (["Thiên Cơ", "Thái Âm", "Thiên Đồng", "Thiên Lương"].every(s => allMajorStars.includes(s))) {
    results.push({ name: "Cơ Nguyệt Đồng Lương cách", description: "Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương hội tại Mệnh, Tài, Quan. Có tài hoạch định, tư vấn, hợp làm việc trong cơ quan nhà nước hoặc chuyên môn kỹ thuật", type: 'cat' });
  }

  // 11. Cơ Lương gia hội cách
  if ((menhPos === 4 || menhPos === 10) && menhMajorStars.includes("Thiên Cơ") && menhMajorStars.includes("Thiên Lương")) {
    results.push({ name: "Cơ Lương gia hội cách", description: "Thiên Cơ và Thiên Lương tại Thìn hoặc Tuất. Người có kiến thức uyên bác, mưu lược cao cường, hợp với chính trị hoặc binh nghiệp", type: 'cat' });
  }

  // 12. Văn Lương chấn kỷ cách
  if (menhPos === 6 && menhMajorStars.includes("Thiên Lương") && getAllAt(0).includes("VĂN KHÚC")) {
    results.push({ name: "Văn Lương chấn kỷ cách", description: "Thiên Lương tại Ngọ, Văn Khúc tại Tý cùng chiếu. Chủ về quyền cao chức trọng, cương trực, có sự nghiệp lớn tại triều đình", type: 'cat' });
  }

  // 13. Cự Nhật đồng cung cách
  if ((menhPos === 2 || menhPos === 8) && menhMajorStars.includes("Thái Dương") && menhMajorStars.includes("Cự Môn")) {
    results.push({ name: "Cự Nhật đồng cung cách", description: "Thái Dương và Cự Môn tại Dần hoặc Thân. Có tài hùng biện, chí tiến thủ, dễ nổi tiếng nhưng cũng hay gặp thị phi", type: 'cat' });
  }

  // 14. Kim sán quang huy cách
  if (menhPos === 6 && menhMajorStars.includes("Thái Dương")) {
    results.push({ name: "Kim sán quang huy cách", description: "Thái Dương trấn Mệnh tại Ngọ. Một đời cực hiển quý, giàu sang, uy quyền lớn", type: 'cat' });
  }

  // 15. Nhật chiếu lôi môn cách
  if (menhPos === 3 && menhMajorStars.includes("Thái Dương") && menhMajorStars.includes("Thiên Lương")) {
    results.push({ name: "Nhật chiếu lôi môn cách", description: "Thái Dương và Thiên Lương tại Mão. Tính tình thẳng thắn, lãnh đạo nổi trội, giàu lòng nghĩa hiệp, sớm thành đạt", type: 'cat' });
  }

  // 16. Dương Lương Xương Lộc cách
  if (menhPos === 3 && menhMajorStars.includes("Thái Dương") && menhMajorStars.includes("Thiên Lương") && menhMinorStars.includes("VĂN XƯƠNG") && menhMinorStars.includes("LỘC TỒN")) {
    results.push({ name: "Dương Lương Xương Lộc cách", description: "Thái Dương, Thiên Lương tại Mão có Văn Xương và Lộc Tồn. Đặc biệt tốt cho thi cử, học hành xuất sắc, đỗ đầu bảng vàng", type: 'cat' });
  }

  // 17. Minh châu xuất hải cách
  if (menhPos === 7 && menhMajorStars.length === 0 && getAllAt(3).includes("Thái Dương") && getAllAt(11).includes("Thái Âm")) {
    results.push({ name: "Minh châu xuất hải cách", description: "Mệnh tại Mùi vô chính diệu, Nhật tại Mão và Nguyệt tại Hợi chiếu về. Người quang minh lỗi lạc, tài hoa, công danh rộng mở, danh tiếng vang xa", type: 'cat' });
  }

  // 18. Nguyệt lãng thiên môn cách
  if (menhPos === 11 && menhMajorStars.includes("Thái Âm")) {
    results.push({ name: "Nguyệt lãng thiên môn cách", description: "Thái Âm trấn Mệnh tại Hợi. Chủ về đại phú hoặc đại quý, thông minh tài trí, dung mạo thanh tú", type: 'cat' });
  }

  // 19. Nhật nguyệt tịnh minh cách
  if (menhMajorStars.length === 0 && allMajorStars.includes("Thái Dương") && allMajorStars.includes("Thái Âm")) {
    results.push({ name: "Nhật nguyệt tịnh minh cách", description: "Nhật Nguyệt miếu vượng cùng chiếu về cung Mệnh. Tuổi trẻ học cao nổi tiếng, công danh thịnh đạt, quan cao chức trọng", type: 'cat' });
  }

  // 20. Nguyệt Sinh Thương hải cách
  if (menhPos === 0 && menhMajorStars.includes("Thiên Đồng") && menhMajorStars.includes("Thái Âm")) {
    results.push({ name: "Nguyệt Sinh Thương hải cách", description: "Thiên Đồng và Thái Âm tại Tý. Tướng mạo thanh tú, lịch thiệp, có học vấn cao và tiền tài danh vọng", type: 'cat' });
  }

  // 21. Thọ Tinh nhập miếu cách
  if (menhPos === 6 && menhMajorStars.includes("Thiên Lương")) {
    results.push({ name: "Thọ Tinh nhập miếu cách", description: "Thiên Lương trấn Mệnh tại Ngọ. Chủ về chính trực, thọ cao, phúc lộc song toàn, được mọi người kính trọng", type: 'cat' });
  }

  // 22. Anh tinh nhập miếu cách
  if ((menhPos === 0 || menhPos === 6) && menhMajorStars.includes("Phá Quân")) {
    results.push({ name: "Anh tinh nhập miếu cách", description: "Phá Quân tại Tý hoặc Ngọ. Người quyết đoán, dũng cảm, có khả năng lãnh đạo, hợp với nghiệp võ hoặc kinh doanh mạo hiểm", type: 'cat' });
  }

  // 23. Thạch trung ẩn ngọc cách
  if ((menhPos === 0 || menhPos === 6) && menhMajorStars.includes("Cự Môn")) {
    results.push({ name: "Thạch trung ẩn ngọc cách", description: "Cự Môn tại Tý hoặc Ngọ. Có lý tưởng cao xa, tài hoa xuất chúng, sau gian khổ sẽ đạt thành tựu rực rỡ (ngọc ẩn trong đá)", type: 'cat' });
  }

  // 24. Thất sát triều đẩu cách
  if ([0, 6, 2, 8].includes(menhPos) && menhMajorStars.includes("Thất Sát")) {
    results.push({ name: "Thất sát triều đẩu cách", description: "Thất Sát tại Tý, Ngọ, Dần, Thân. Người có mưu lược, năng lực sáng tạo, nghiệp võ hiển quý hoặc là nhân tài kinh doanh đại phú", type: 'cat' });
  }

  // 25. Mã đầu đới tiễn cách
  if (menhPos === 6 && menhMinorStars.includes("KÌNH DƯƠNG") && (menhMajorStars.includes("Thiên Đồng") || menhMajorStars.includes("Thái Âm") || menhMajorStars.includes("Tham Lang"))) {
    results.push({ name: "Mã đầu đới tiễn cách", description: "Kình Dương tại Ngọ đồng cung với Thiên Đồng, Thái Âm hoặc Tham Lang. Chủ về hiển đạt nghiệp võ, trấn giữ biên cương, trung niên phát đạt bất ngờ", type: 'cat' });
  }

  // 26. Cự Cơ đồng lâm cách
  if ((menhPos === 3 || menhPos === 9) && menhMajorStars.includes("Thiên Cơ") && menhMajorStars.includes("Cự Môn")) {
    results.push({ name: "Cự Cơ đồng lâm cách", description: "Thiên Cơ và Cự Môn tại Mão (tốt hơn Dậu). Học vấn cực cao, danh tiếng lẫy lừng, đại phú quý", type: 'cat' });
  }

  // 27. Thiên Ất củng mệnh cách
  const diPos = (menhPos + 6) % 12;
  const diStars = getAllAt(diPos);
  if ((menhMinorStars.includes("THIÊN KHÔI") || diStars.includes("THIÊN KHÔI")) && (menhMinorStars.includes("THIÊN VIỆT") || diStars.includes("THIÊN VIỆT"))) {
    results.push({ name: "Thiên Ất củng mệnh cách", description: "Thiên Khôi và Thiên Việt ở các cung Mệnh, Thân, Thiên Di. Văn chương xuất chúng, thường được quý nhân phò trợ, gặp dữ hóa lành", type: 'cat' });
  }

  // 28. Quyền Lộc tuần phùng cách
  if (allStars.includes("Hóa Lộc") && allStars.includes("Hóa Quyền")) {
    results.push({ name: "Quyền Lộc tuần phùng cách", description: "Hóa Lộc và Hóa Quyền cùng tại cung Mệnh hoặc hội chiếu. Công danh tiền tài song toàn, một đời bình ổn", type: 'cat' });
  }

  // 29. Khoa Quyền Lộc giáp cách
  const leftRightStars = [...leftStars, ...rightStars];
  if (leftRightStars.includes("Hóa Lộc") && leftRightStars.includes("Hóa Quyền") && leftRightStars.includes("Hóa Khoa")) {
    results.push({ name: "Khoa Quyền Lộc giáp cách", description: "Hóa Lộc, Quyền, Khoa kẹp hai bên cung Mệnh. Một đời yên ổn, chức vị tài lộc song toàn", type: 'cat' });
  }

  // 30. Song Lộc giáp mệnh cách
  if (leftRightStars.includes("LỘC TỒN") && leftRightStars.includes("Hóa Lộc")) {
    results.push({ name: "Song Lộc giáp mệnh cách", description: "Lộc Tồn và Hóa Lộc kẹp hai bên cung Mệnh. Chủ về phú quý", type: 'cat' });
  }

  // 31. Tham Vũ đồng hành cách
  if ([4, 10, 1, 7].includes(menhPos) && menhMajorStars.includes("Tham Lang") && menhMajorStars.includes("Vũ Khúc")) {
    results.push({ name: "Tham Vũ đồng hành cách", description: "Tham Lang và Vũ Khúc tại bốn cung Mộ (Thìn, Tuất, Sửu, Mùi). Chủ về nghèo trước giàu sau (tiền bần hậu phú), sau 30 tuổi mới phát đạt", type: 'cat' });
  }

  // 32. Tam hợp Hỏa Linh cách
  if (allMajorStars.includes("Tham Lang") && allMinorStars.includes("HỎA TINH")) {
    results.push({ name: "Tam hợp Hỏa Linh cách", description: "Tham Lang gặp Hỏa Tinh tại Mệnh hoặc tam phương. Đại phú quý, lập công lớn trong binh nghiệp hoặc phát tài nhanh chóng trong kinh doanh", type: 'cat' });
  }

  // 33. Tham Linh triều viên cách
  if (allMajorStars.includes("Tham Lang") && allMinorStars.includes("LINH TINH")) {
    results.push({ name: "Tham Linh triều viên cách", description: "Tham Lang gặp Linh Tinh. Phúc khí long dong, anh hùng cái thế, lập chiến công tại biên cương", type: 'cat' });
  }

  // 34. Quý tinh giáp mệnh cách
  if ((leftStars.includes("Tử Vi") && rightStars.includes("Thiên Phủ")) || (leftStars.includes("Thiên Phủ") && rightStars.includes("Tử Vi")) ||
      (leftStars.includes("Thái Dương") && rightStars.includes("Thái Âm")) || (leftStars.includes("Thái Âm") && rightStars.includes("Thái Dương")) ||
      (leftStars.includes("TẢ PHÙ") && rightStars.includes("HỮU BẬT")) || (leftStars.includes("HỮU BẬT") && rightStars.includes("TẢ PHÙ")) ||
      (leftStars.includes("VĂN XƯƠNG") && rightStars.includes("VĂN KHÚC")) || (leftStars.includes("VĂN KHÚC") && rightStars.includes("VĂN XƯNG"))) {
    results.push({ name: "Quý tinh giáp mệnh cách", description: "Các cặp sao quý (Tử Phủ, Nhật Nguyệt, Tả Hữu, Xương Khúc) kẹp hai bên Mệnh. Chủ về giàu sang, an lành, được quý nhân giúp đỡ", type: 'cat' });
  }

  // 35. Liêm Trinh Văn Vũ cách
  if ((menhPos === 2 || menhPos === 8) && menhMajorStars.includes("Liêm Trinh") && allMinorStars.includes("VĂN XƯƠNG") && allMajorStars.includes("Vũ Khúc")) {
    results.push({ name: "Liêm Trinh Văn Vũ cách", description: "Liêm Trinh miếu tại Dần Thân gặp Văn Xương, Vũ Khúc. Văn võ song toàn, một đời giàu có dồi dào phúc khí", type: 'cat' });
  }

  // 36. Phụ củng Văn tinh cách
  if (menhMinorStars.includes("VĂN XƯƠNG") && allMinorStars.includes("TẢ PHÙ")) {
    results.push({ name: "Phụ củng Văn tinh cách", description: "Văn Xương tại Mệnh được Tả Phụ cùng chiếu. Người mẫn tiệp tài hoa, chức vụ cao, trọng vọng", type: 'cat' });
  }

  // 37. Quyền tinh triều viên cách
  if ((menhPos === 8 || menhPos === 7) && menhMajorStars.includes("Liêm Trinh")) {
    results.push({ name: "Quyền tinh triều viên cách", description: "Liêm Trinh tại Thân hoặc Mùi. Tuổi trẻ thành tựu vang dội, phát tài nhanh, danh tiếng lừng lẫy", type: 'cat' });
  }

  // 38. Quyền Sát hóa Lộc cách
  if (allMajorStars.includes("Thất Sát") && allStars.includes("Hóa Lộc") && allStars.includes("Hóa Quyền") && (allMinorStars.includes("KÌNH DƯƠNG") || allMinorStars.includes("ĐÀ LA") || allMinorStars.includes("HỎA TINH") || allMinorStars.includes("LINH TINH"))) {
    results.push({ name: "Quyền Sát hóa Lộc cách", description: "Sát tinh nhập miếu hội cùng Thất Sát, Hóa Lộc, Hóa Quyền. Tính cách cương cường, anh hùng, thành công lớn sau nhiều gian nan nguy hiểm", type: 'cat' });
  }

  // 39. Lộc hợp uyên ương cách
  if (menhMinorStars.includes("LỘC TỒN") && menhAllStars.includes("Hóa Lộc")) {
    results.push({ name: "Lộc hợp uyên ương cách", description: "Lộc Tồn và Hóa Lộc cùng tại cung Mệnh. Một đời tài vận hanh thông, bậc cự phú hoặc quan chức cao cấp", type: 'cat' });
  }

  // 40. Song Lộc triều viên cách
  if (!menhMinorStars.includes("LỘC TỒN") && !menhAllStars.includes("Hóa Lộc") && allMinorStars.includes("LỘC TỒN") && allStars.includes("Hóa Lộc")) {
    results.push({ name: "Song Lộc triều viên cách", description: "Lộc Tồn và Hóa Lộc hội chiếu về cung Mệnh. Phú quý chất ngất, được người đời kính trọng", type: 'cat' });
  }

  // 41. Lộc Mã bội ấn cách
  if (menhMinorStars.includes("LỘC TỒN") && menhMinorStars.includes("THIÊN MÃ") && menhMajorStars.includes("Thiên Tướng")) {
    results.push({ name: "Lộc Mã bội ấn cách", description: "Lộc, Thiên Mã cùng Thiên Tướng miếu vượng trấn Mệnh", type: 'cat' });
  }

  // 42. Lộc Mã giao trì cách
  if ((allMinorStars.includes("LỘC TỒN") || allStars.includes("Hóa Lộc")) && allMinorStars.includes("THIÊN MÃ")) {
    results.push({ name: "Lộc Mã giao trì cách", description: "Lộc Tồn (hoặc Hóa Lộc) hội Thiên Mã. Thường phát tài tại quê người, bôn ba vất vả nhưng trở thành cự phú", type: 'cat' });
  }

  // 43. Tướng tinh đắc địa cách
  if (menhMajorStars.includes("Vũ Khúc")) {
    results.push({ name: "Tướng tinh đắc địa cách", description: "Vũ Khúc miếu vượng hội cát tinh. Chức trọng quyền cao, uy phong lẫm liệt, có tài mưu lược", type: 'cat' });
  }

  // 44. Nhật Nguyệt chiếu bích cách
  const dienTrachPos = (menhPos + 3) % 12;
  const dienTrachStars = getAllAt(dienTrachPos);
  if ((dienTrachPos === 1 || dienTrachPos === 7) && dienTrachStars.includes("Thái Dương") && dienTrachStars.includes("Thái Âm")) {
    results.push({ name: "Nhật Nguyệt chiếu bích cách", description: "Nhật Nguyệt tại Sửu Mùi đóng cung Điền Trạch. Chủ về giàu có tột bậc về bất động sản, đất đai, thừa kế gia sản lớn", type: 'cat' });
  }

  // 45. Tài Lộc giáp Mã cách
  if (menhMinorStars.includes("THIÊN MÃ") && leftRightStars.includes("Vũ Khúc") && leftRightStars.includes("Hóa Lộc")) {
    results.push({ name: "Tài Lộc giáp Mã cách", description: "Thiên Mã tại Mệnh, hai bên kẹp Vũ Khúc và Hóa Lộc. Người ham đầu cơ, mạo hiểm, nghèo trước sướng sau", type: 'cat' });
  }

  // 46. Minh Lộc ám Lộc cách
  if ((menhAllStars.includes("Hóa Lộc") && amHopStars.includes("LỘC TỒN")) || (menhMinorStars.includes("LỘC TỒN") && amHopStars.includes("Hóa Lộc"))) {
    results.push({ name: "Minh Lộc ám Lộc cách", description: "Hóa Lộc (hoặc Lộc Tồn) tại Mệnh, sao Lộc còn lại nằm ở cung ám hợp. Phú quý như gấm thêm hoa", type: 'cat' });
  }

  // 47. Khoa minh Lộc ám cách
  if (menhAllStars.includes("Hóa Khoa") && amHopStars.includes("LỘC TỒN")) {
    results.push({ name: "Khoa minh Lộc ám cách", description: "Hóa Khoa tại Mệnh, Lộc Tồn tại cung ám hợp. Chủ về quyền cao chức trọng (làm đến Tam Đài)", type: 'cat' });
  }

  // 48. Hình Tù giáp ấn cách
  if (menhMajorStars.includes("Thiên Tướng") && (menhMajorStars.includes("Liêm Trinh") || allMajorStars.includes("Liêm Trinh")) && menhMinorStars.includes("KÌNH DƯƠNG")) {
    results.push({ name: "Hình Tù giáp ấn cách", description: "Liêm Trinh (Tù), Thiên Tướng (Ấn) gặp Kình Dương (Hình). Cách cục này dễ liên quan đến pháp luật, kiện tụng hoặc tai họa hình thương", type: 'hung' });
  }

  // 49. Linh Xương Đà Vũ cách
  if (allStars.includes("LINH TINH") && allStars.includes("VĂN XƯƠNG") && allStars.includes("ĐÀ LA") && allStars.includes("Vũ Khúc")) {
    results.push({ name: "Linh Xương Đà Vũ cách", description: "Gồm Linh Tinh, Văn Xương, Đà La và Vũ Khúc hội hợp. Chủ về tai nạn sông nước, bế tắc, phá sản hoặc tự tử", type: 'hung' });
  }

  // 50. Dương Đà giáp Kỵ cách
  if (menhAllStars.includes("Hóa Kỵ") && ((leftStars.includes("KÌNH DƯƠNG") && rightStars.includes("ĐÀ LA")) || (leftStars.includes("ĐÀ LA") && rightStars.includes("KÌNH DƯƠNG")))) {
    results.push({ name: "Dương Đà giáp Kỵ cách", description: "Sao Hóa Kỵ tại Mệnh bị Kình Dương và Đà La kìm kẹp hai bên. Chủ về cuộc đời bần tiện, nhiều tai họa, dễ bị tiểu nhân hãm hại", type: 'hung' });
  }

  // 51. Lộ thượng mai thi cách
  if (menhMajorStars.includes("Liêm Trinh") && menhMajorStars.includes("Thất Sát") && (menhMinorStars.includes("KÌNH DƯƠNG") || menhMinorStars.includes("ĐÀ LA") || menhMinorStars.includes("HỎA TINH") || menhMinorStars.includes("LINH TINH"))) {
    results.push({ name: "Lộ thượng mai thi cách", description: "Liêm Trinh và Thất Sát đồng cung gặp Tứ Sát (Kình, Đà, Hỏa, Linh). Chủ về tai nạn bất ngờ, nguy hiểm trên đường đi, chết xa nhà", type: 'hung' });
  }

  return results;
}
