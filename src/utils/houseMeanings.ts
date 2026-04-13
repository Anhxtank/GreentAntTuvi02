export const TRUC_MEANINGS: Record<string, { title: string, content: string }> = {
  "Tử Điền": {
    title: "Trục Tử Điền",
    content: "Còn gọi là tuyến đào hoa, tuyến vui chơi giải trí, giải trí, vui chơi kho tiền; có liên quan nhiều với cách vui chơi giải trí và tình trạng tích lũy của kho tiền của mệnh chủ. Cung Tử Nữ là con cái ngay trước mắt; còn cung Điền Trạch là con cái trong tương lai (tức con cháu). Cung Điền Trạch không tốt, khó có được con cháu tốt (dương trạch chủ yếu quyết định tình trạng tốt xấu và thành bại của con cháu, âm trạch chủ yếu quyết định tính cách và địa vị của con cháu).\n\nVí dụ: cung Tử bạn không tốt, nguyên nhân có liên quan với cung Điền Trạch còn cung Điền Trạch không tốt sẽ khiến con cháu không lành. Cho nên người có cung Tử không tốt có thể dùng biện pháp sửa chữa phong thủy nhà ở và mộ phần tổ tiên để cải thiện."
  },
  "Tài Phúc": {
    title: "Trục Tài Phúc",
    content: "Còn gọi là tuyến tiền bạc, tuyến yêu thích; có liên quan nhiều với tình hình tiền bạc và thị hiếu hưởng thụ của mệnh chủ. Cung Tài Bạch là tiền bạc hiện tại, tiền bạc trong tầm tay; còn cung Phúc Đức là nguồn đế kiếm tiền và cách sử dụng sau khi kiếm được tiền. Cung Tài Bạch không tốt thì không có cơ sở để hưởng thụ vật chất; cung Phúc Đức không tốt thì ảnh hưởng nguồn tiền đến.\n\nVí dụ: Cung Tài Bạch không tốt thì không có tiền bạc để hưởng thụ, tinh thần sẽ buồn phiền đau khổ; nếu cung Phúc Đức không tốt thì nguồn để kiếm tiền ít, ảnh hưởng đến thu nhập. Cho nên lúc xem bản cung, cần phải chú ý tham khảo đối cung."
  },
  "Mệnh Di": {
    title: "Trục Mệnh Di",
    content: "Còn gọi là tuyến sinh mệnh, tuyến hoạt động; có liên quan nhiều với sinh mệnh và hoạt động của mệnh chủ. Cung Mệnh là nhân tố bên trong, bản thân, tình trạng hiện tại và bản địa; còn cung Thiên Di là hoạt động bên ngoài xã hội, tình trạng vị lai và nơi xa. Cung Mệnh mạnh hơn cung Thiên Di thì nên phát triển ở bản địa, cung Thiên Di mạnh hơn cung Mệnh thì nên phát triển ở nơi xa.\n\nVí dụ: Mệnh xấu thì ra ngoài, di xấu thì ở quê."
  },
  "Huynh Nô": {
    title: "Trục Huynh Nô",
    content: "Còn gọi là tuyến thành tựu, tuyến tiêu xài, tuyến trợ lực, tuyến tình cảm; có liên quan nhiều với tình hình được trợ lực và tiêu xài chi xuất của mệnh chủ. Cung Huynh Đệ chủ yếu là quan hệ anh em trong nội bộ gia đình, quan hệ giao tế lúc ban đâu; còn cung Nô Bộc là quan hệ bạn bè bên ngoài, quan hệ giao tế trong tương lai hoặc quan hệ giao tế mở rộng."
  },
  "Phu Quan": {
    title: "Trục Phu Quan",
    content: "Còn gọi là tuyến sự nghiệp, tuyến yêu đương, tuyến hôn nhân; có liên quan nhiều với sự nghiệp và hôn nhân của mệnh chủ. Cung Phu Thê là sự nghiệp nội tại thời gian gần đây; còn cung Quan Lộc là sự nghiệp bên ngoài trong tương lai. Cung Phu Thê không tốt cũng sẽ ảnh hưởng đến sự nghiệp của mệnh chủ."
  },
  "Phụ Tật": {
    title: "Trục Phụ Tật",
    content: "Còn gọi là tuyến danh tiếng, tuyến chính trị, tuyến đầu óc, có liên quan nhiều với tình trạng văn thư, học hành, di truyền, tài trí, tiếng tăm, tật bệnh. Cha mẹ là nền tảng của một người, vì vậy nếu nền tảng là phú quý, thì cuộc sống lúc nhỏ tuổi của mệnh chủ khá tốt đẹp, cuộc sống của mệnh chủ có liên quan rất lớn với cha mẹ. Cung Tật Ách là tố chất của cơ thể mệnh chủ; tố chất của cơ thể chịu ảnh hưởng di truyền của cung Phụ Mẫu. Hai cung đối của cùng một tuyến có mối quan hệ khá mật thiết, có thể chiếu ứng lẫn nhau, ảnh hưởng lẫn nhau, kiềm chế lẫn nhau, như hình với bóng. Bản cung không tốt mà đối cung tốt, có thể được bổ cứu; nếu bản cung và đối cung đều không tốt thì không cách nào bổ cứu nhau.\n\nVí dụ: Cung Phụ Mẫu không tốt sẽ làm cho bản cung Thân hoặc cung Mệnh chủ được di truyền không tốt, cơ thể không khỏe mạnh; nếu người có cung Tật Ách không tốt sẽ dễ sinh bệnh, khiến cha mẹ phải lao tâm khổ tứ, hao tốn tiền bạc."
  }
};

export const getTrucName = (houseName: string): string => {
  switch (houseName) {
    case "TỬ NỮ":
    case "ĐIỀN TRẠCH":
      return "Tử Điền";
    case "TÀI BẠCH":
    case "PHÚC ĐỨC":
      return "Tài Phúc";
    case "MỆNH":
    case "THIÊN DI":
      return "Mệnh Di";
    case "HUYNH ĐỆ":
    case "GIAO HỮU":
      return "Huynh Nô";
    case "PHU THÊ":
    case "QUAN LỘC":
      return "Phu Quan";
    case "PHỤ MẪU":
    case "TẬT ÁCH":
      return "Phụ Tật";
    default:
      return "";
  }
};

export const HOUSE_EXPLANATIONS: Record<string, string> = {
  "MỆNH": " Là (chủ soái) trên bàn cờ, đại diện cho cái Tôi tinh thần, bao gồm tính cách, giá trị quan, tư tưởng và tướng mạo tổng thể",
  "HUYNH ĐỆ": "Thể hiện tình cảm với anh chị em, năng lực lãnh đạo và cũng là cung vị xem về cha mẹ của người phối ngẫu",
  "PHU THÊ": "Phản ánh thái độ về tình cảm, đặc điểm người phối ngẫu và chất lượng đời sống hôn nhân",
  "TỬ NỮ": "Xem về con cái (đặc biệt là con trai), năng lực sinh dục, cùng mối quan hệ với cấp dưới hoặc công ty con",
  "TÀI BẠCH": "Thể hiện dòng tiền mặt lưu động, khả năng quản lý tài chính và các ngành nghề có thể kiếm ra tiền",
  "TẬT ÁCH": "Đại diện cho cái Tôi về mặt thể xác, thể hiện tình trạng sức khỏe, các loại bệnh tật và tai nạn phát sinh từ cơ thể",
  "THIÊN DI": "Là cái Tôi biểu hiện ra bên ngoài, phản ánh năng lực giao tiếp, các mối quan hệ đối ngoại và vận trình phát triển khi ra ngoài xã hội hoặc du lịch",
  "GIAO HỮU": "Cho biết về bạn bè, cộng sự và khả năng chọn lựa người giao tiếp hoặc người trợ thủ",
  "QUAN LỘC": "Chỉ con đường sự nghiệp, học vấn, khả năng thăng tiến và đặc tính công việc phù hợp với cá nhân",
  "ĐIỀN TRẠCH": "Đại diện cho bất động sản, hoàn cảnh nơi ở và những sự cố bất ngờ (số kiếp tự)",
  "PHÚC ĐỨC": "Xem về khả năng hưởng thụ, sở thích cá nhân và vận hạn khi về già. Đây cũng là cung vị đặc biệt quan trọng để xem về hôn nhân của nữ mệnh",
  "PHỤ MẪU": "Cho biết số mệnh của cha mẹ, duyên phận với người lớn tuổi (cấp trên, thầy cô) và các yếu tố di truyền (tướng mạo)"
};

export const DIEP_DUNG_LABELS = [
  { value: 0, label: "MỆNH" },
  { value: 1, label: "PHỤ" },
  { value: 2, label: "PHÚC" },
  { value: 3, label: "ĐIỀN" },
  { value: 4, label: "QUAN" },
  { value: 5, label: "NÔ" },
  { value: 6, label: "DI" },
  { value: 7, label: "TẬT" },
  { value: 8, label: "TÀI" },
  { value: 9, label: "TỬ" },
  { value: 10, label: "PHU" },
  { value: 11, label: "BÀO" }
];

const DIEP_DUNG_DATA: Record<string, Record<number, string>> = {
  "MỆNH": {
    0: "Cung Mệnh là xem tính tình và cử chỉ bên ngoài, mệnh cách cao thấp, tiên thiên vận thế, đối đãi với người thân, sự nghiệp có thích hợp hay không?",
    1: "Cá tính và cách đối đãi của cha mẹ, công danh, học nghiệp, sự chiếu cố của cha mẹ thời ấu thơ, cuộc sống bình lặng hoặc gập ghềnh, tài trí và di truyền.",
    2: "Phúc ấm, tạo hóa quan niệm, lý tưởng, tập quán thị hiếu mưu lược của người đó, xem tính tình có cởi mở không?",
    3: "Gia vận tốt hay xấu, gia vận và tài khố của lục thân.",
    4: "Hành vi, sự nghiệp và tiền đồ của người đó ra sao.",
    5: "Quan hệ của bản thân với người khác, xem độ thành tựu người đó.",
    6: "Mệnh ở bên ngoài mặt, ngoại duyên, gặp gỡ, có quý nhân bên ngoài hay không, hoạt động xuất ngoại.",
    7: "Khí chất, tâm thái, biểu tình, chứng bệnh, sức khỏe.",
    8: "Tình hình tiền tài của một người.",
    9: "Cá tính, hành vi của con cái và các đối đãi ứng xử giữa cha và con.",
    10: "Phối ngẫu là người tốt hay xấu.",
    11: "Cá tính và hành vi của anh em và mẹ."
  },
  "HUYNH ĐỆ": {
    0: "Cá tính và hành vi của anh em.",
    1: "Giao tiếp của mẹ hoặc anh em, cách giao tiếp, đầu tư.",
    2: "Tư tưởng quan niệm của anh em, phúc phần, thị hiếu, xem các đối đãi cha mẹ và anh em.",
    3: "Tài khố, gia vận, sinh sản của anh em.",
    4: "Tình hình sự nghiệp và vận thế của anh em.",
    5: "Ích lợi và tổn hại và tiềm ẩn vấn đề khi giao tiếp với bạn bè.",
    6: "Mối quan hệ nhân duyên, quan hệ xã hội, quý nhân, họa phúc của người đó.",
    7: "Sức khỏe thân thể, bệnh tật, khí chất của Huynh Đệ.",
    8: "Vấn đề kiếm tiền của anh em.",
    9: "Thành tựu của anh em, xem anh em và quan hệ với bạn bè tốt hay xấu.",
    10: "Phối ngẫu của anh chị em có cá tính, hành vi và đối xử với mọi người.",
    11: "Cung Giao Hữu"
  },
  "PHU THÊ": {
    0: "Cá tính và hành vi của phối ngẫu.",
    1: "Bố mẹ của cô dâu, quan hệ cấu thành gia đình và phối ngẫu, cử chỉ và hành động bên ngoài của phối ngẫu, lý tưởng, khả năng và thị hiếu của anh em nhà phối ngẫu, tình hình hoạt động sự nghiệp bên ngoài phối ngẫu.",
    2: "Tư duy sâu sắc của phối ngẫu, quan niệm, thị hiếu, tuổi thọ.",
    3: "Cá nhân và cơ cấu công lập hoặc tình hình đối đãi quan viên, xem tài sản của phối ngẫu.",
    4: "Khởi trạng vận thế của phối ngẫu, tình hình sự nghiệp, cách đối đãi vợ chồng.",
    5: "Bạn bè khác giới, vì là cung Giao Hữu của phối ngẫu cũng là vị trí phối ngẫu của Giao Hữu, tình hình quan hệ của phối ngẫu và ẩn tàng những họa phúc vô hình.",
    6: "Nhân duyên với phối ngẫu, quan hệ với người khác.",
    7: "Khí chất, thân thể, sức khỏe của phối ngẫu.",
    8: "Nguồn gốc tiền tài của phối ngẫu và cách sử dụng.",
    9: "Quan hệ giao tiếp của phối ngẫu, tính đào đào hoa của phối ngẫu ở bên ngoài.",
    10: "Tình hình quan hệ đối đãi vợ chồng với nhau, vì đó do cung Mệnh hoặc cung Phu Thê tuyệt đối không được gặp sao kỵ hoặc xung với cung Tài Bạch, nhập hoặc xung ắt cần thay đổi cách đối đãi, chia nhà, biến đổi hôn nhân.",
    11: "Anh em của phối ngẫu về cá tính, hành vi và đối xử với mọi người."
  },
  "TỬ NỮ": {
    0: "Cá tính và hành vi của con cái.",
    1: "Công danh, học lực của con cái.",
    2: "Tư tưởng, thị hiếu, sở thích, quan niệm hưởng thụ, phúc phận, nguồn tiền tài, tuổi thọ của con cái.",
    3: "Tình trạng gia đình, gia vận, “kho tiền”, tình trạng sản nghiệp của con cái.",
    4: "Học lực, vận thế sự nghiệp, hành vi của con cái.",
    5: "Tình hình hợp tác của mệnh tạo.",
    6: "Quan hệ giao tế, tình trạng hoạt động ở bên ngoài của con cái.",
    7: "Tính khí, khuynh hướng tình dục, tình trạng sức khỏe của con cái.",
    8: "Xem tài vận (có hay không?, nhiều hay ít), quan hệ hợp tác của con cái.",
    9: "Con cái, nhân duyên đào hoa, quan hệ giao tế, tình hình hợp tác đầu tư, hoạt động giải trí bên ngoài của con cái.",
    10: "Người phối ngẫu (con dâu, con rể), tình duyên của con cái.",
    11: "Hành vi, tình hình hoạt động, giao du bạn bè, thành tựu của con cái. Tình trạng tác động của mệnh tạo với mối quan hệ ngang vai."
  },
  "TÀI BẠCH": {
    0: "Thực lực kiếm tiền của bản thân.",
    1: "Giấy tờ khế ước công văn tổn hay ích.",
    2: "Phúc khí kiếm tiền, xem cách tiêu tiền.",
    3: "Tài khố, tài lực xem tình hình tài khoản ở ngân hàng.",
    4: "Công danh của Tài Bạch, cũng tức là xem tình hình kiếm tiền.",
    5: "Người đó chi tiêu ở bên ngoài cùng với tập quán.",
    6: "Tài lực của người đó, hạn chế của tài bạch.",
    7: "Thành tựu ở lĩnh vực tiền tài.",
    8: "Cách thu chi tiền tài lỗ lãi. Thực hư của tài chính và tài lực.",
    9: "Cách sử dụng của cải tiền bạc.",
    10: "Tài vận của người và tình hình tài chính.",
    11: "Thành tựu ở lĩnh vực tiền tài."
  },
  "TẬT ÁCH": {
    0: "Bản chất của thân thể tốt hay xấu, tình hình sức khỏe.",
    1: "Ẩn tàng bệnh tật, còn tiềm ẩn số kiếp trong cuộc đời một người.",
    2: "Phúc khí, thụ hưởng, tính nết thái độ của bản thân, cho nên nói cung Tử Nữ là Đào Hoa vị.",
    3: "Thuộc công xưởng của thân thể, là xem tình hình sức khỏe thể chất của thân thể và tính năng lực.",
    4: "Khí thế và vận thế tốt xấu, cần xem cung vị số kiếp sức khỏe người đó.",
    5: "Người đó có sự biến đổi tính tình và cử chỉ.",
    6: "Vấn đề di chuyển người đó như thế nào.",
    7: "Nhân cách của người đó ở tầng sâu, ẩn tàng chứng bệnh.",
    8: "Tồn kho, tài lực và thu chi.",
    9: "Hình tượng, cử chỉ và hành vi của cá nhân.",
    10: "Tình hình họa phúc tai kiếp của việc xuất ngoại.",
    11: "Khí chất, bệnh tình, thân thể, sức khỏe của người."
  },
  "THIÊN DI": {
    0: "Một người ở bên ngoài tiếp xúc giao lưu, nhân duyên, gặp gỡ, quý nhân và không gian hoạt động v.v...",
    1: "Cử chỉ và hành vi bên ngoài của người đó.",
    2: "Phúc phần xuất ngoại, xem được mất tổn hại việc kiếm tiền.",
    3: "Hoàn cảnh xuất ngoại, chỗ ở, chỗ trọ, có nhà cao cửa rộng vợ đẹp con ngoan hay không?",
    4: "Công việc, năng lực cư xử của người đó ở bên ngoài.",
    5: "Nhân duyên và quan hệ giao tiếp ở bên ngoài.",
    6: "Họa phúc tổn ích của người này khi xuất ngoại.",
    7: "Quan niệm cảm xúc, hình tượng bên ngoài và sức khỏe.",
    8: "Cách tiêu tiền của người này ở bên ngoài.",
    9: "Hoạt động giao tiếp ở bên ngoài, cùng với xem có việc Đào Hoa không?",
    10: "Vận thế ở bên ngoài, là cung vị quan sát kiếp số ở bên ngoài.",
    11: "Quan hệ đối đãi ở bên ngoài và nhân quản, cùng với tình hình cát hung họa phúc của khi xuất ngoại."
  },
  "GIAO HỮU": {
    0: "Tính cách ưu điểm và nhược điểm của bạn bè đồng sự.",
    1: "Công danh, cử chỉ của cha mẹ và bạn bè.",
    2: "Đồng sự, bạn bè, đồng nghiệp, quan niệm của khách hàng, suy nghĩ phép tắc và thị hiếu.",
    3: "Công việc của bạn bè, tài chính của bạn bè, tình hình gia đình.",
    4: "Tình hình tốt hay xấu của bạn bè, đồng sự, đồng nghiệp, sở dĩ cung Tử Nữ là Cổ Đông vị, hợp tác đồng tư với bạn bè có được thành công hay không cần xem hóa tượng của cung Tử Nữ.",
    5: "Tình bạn bè của bản thân và tình hình kiếp nạn của bạn bè.",
    6: "Hoạt động hành vi bên ngoài của bạn bè, cũng là quan sát sự hỗ trợ người này và bạn bè.",
    7: "Tố chất của bạn bè kết giao, và tình hình bạn bè, cũng là thành tựu bạn bè, đồng sự.",
    8: "Tài vật của bè bạn, cùng với xem sự nghiệp tổn ích cát hung của cá nhân.",
    9: "Cách chơi bời của bạn bè, phương pháp giao tiếp.",
    10: "Phối ngẫu của bạn bè và bạn bè khác giới.",
    11: "Người bạn đồng hành, đồng sự, đồng nghiệp và bạn bè có tổn hại hay ích lợi thế nào."
  },
  "QUAN LỘC": {
    0: "Sự nghiệp vận thế và năng lực làm việc, tình hình doanh nghiệp lỗ lãi.",
    1: "Công việc và sự nghiệp tốt hay xấu, có được hỗ trợ hay không, cũng tức là xem tình hình nhân viên.",
    2: "Phúc phần, phúc lợi đầu tư của công việc sự nghiệp, cảm hứng, lý tưởng.",
    3: "Tình hình phát sinh trong nhà máy xí nghiệp. Xem tình hình quản lý nội bộ tại công xưởng hoặc công ty.",
    4: "Sự nghiệp vận thế và năng lực làm việc, tình hình doanh nghiệp lỗ lãi.",
    5: "Công ty của con, phần công ty của sự nghiệp và nâng đỡ sự nghiệp, quan sát gia đình.",
    6: "Công việc và sự nghiệp ngoài ra còn tiềm lực và năng lực, xem danh vị được mất, xem sự nghiệp có những nhân tố tốt xấu, tình hình hoạt động ở bên ngoài, xem quý nhân và tình hình giao tiếp,",
    7: "Thể chất tốt xấu của công việc và sự nghiệp.",
    8: "Tình hình tài sản, tài vụ của sự nghiệp.",
    9: "Quan hệ nhân viên trong xí nghiệp hoặc bạn đồng sự trong công việc, bạn hợp tác làm ăn.",
    10: "Đối tác cung việc, qua lại ngân hàng và ích lợi tổn hại đối với cồn việc của bản thân.",
    11: "Cách quản lý và nhân sự ở công ty, xí nghiệp, cùng với tình hình đầu tư lỗ lãi."
  },
  "ĐIỀN TRẠCH": {
    0: "Kho khố, gia sản tài nguyên, khả năng sinh sản.",
    1: "Giáo dục, hoàn cảnh gia đình tốt hay xấu.",
    2: "Gia sản tăng giảm, phúc phần gia đình.",
    3: "Kho khố, gia sản tài nguyên, khả năng sinh sản.",
    4: "Tình hình gia vận cát hung.",
    5: "Gia thế và xuất thân của phối ngẫu.",
    6: "Hoàn cảnh cuộc sống, thọ yểu.",
    7: "Cuộc sống sinh hoạt, đối đãi của lục thân, gia vận.",
    8: "Tài lực, giá trị bất động sản của gia đình.",
    9: "Giao tiếp, hoạt động, chi tiêu của gia đình.",
    10: "Thể chất gia đình, xem gia đình có hạnh không hay không? Cũng là xem thân thể của phối ngẫu là cung Điền Trạch, gia đình thế nào? có hạnh phúc hay không?",
    11: "Hoàn cảnh gia đình, ấn tượng của gia đình với người, tình hình hoạt động của gia đình ở bên ngoài."
  },
  "PHÚC ĐỨC": {
    0: "Phúc khí căn bản của một người.",
    1: "Sức khỏe và tì khí của cha.",
    2: "Nhân quả tiền kiếp, xem tạo hóa tốt xấu.",
    3: "Thành bại của lý tưởng, để tìm ra những phương pháp phù hợp hơn.",
    4: "Người đó phúc phần, tuổi thọ dày mỏng và ý nguyện công việc cá nhân.",
    5: "Hoạt động tư duy, đối tượng quan hệ đối với nhau.",
    6: "Thành tựu của thực tế và thực tiễn trong lý tưởng.",
    7: "Tạo hóa của tiên thiên, thất tình lục dục, thị hiếu, nghiệp chướng, tuổi thọ và tâm lý của người này.",
    8: "Độ dày mỏng của phúc phần.",
    9: "Tình hình chấp hành và thành hay bại của lý tưởng, tham vọng và thị hiếu.",
    10: "Có được hưởng thụ hay không? Đạt thành lý tưởng kiếm tiền được như thế nào? Có được thành công sự nghiệp rồi mới có gia đình. Gọi là “Thê Tài, Thê Tài Tài”, cũng là chỉ có phối ngẫu làm tăng lý tưởng kiếm tiền nuôi gia đình.",
    11: "Tư duy bản chất của một cá nhân và khuynh hướng tư tưởng."
  },
  "PHỤ MẪU": {
    0: "Cá tính, mệnh cách và hành vi của cha mẹ, xem tâm lý tính tình, biểu hiện, tướng mạo.",
    1: "Ông nội về cá tính, hành vi, mệnh cách.",
    2: "Thị hiếu, phúc phần và hứng thú của cha mẹ cùng với khả năng cầu học.",
    3: "Tình hình cầu học tốt hay xấu.",
    4: "Tai ách của người đó và tuổi thọ của cha mẹ.",
    5: "Thành tựu họa phúc của cha, tuổi thọ của mẹ.",
    6: "Tình hình nhân duyên, hoạt động ở bên ngoài của cha.",
    7: "Sức khỏe và tì khí của cha.",
    8: "Khả năng kiếm tiền cách tiêu tiền của cha.",
    9: "Quan hệ của cha, đào hoa, tình hình đầu tư.",
    10: "Anh em bạn bè của cha mẹ tốt hay xấu cùng với xem tình hình cuộc sống của cha mẹ.",
    11: "Anh em của cha mẹ, cũng là tình hình chú, bác, cũng là xem tầng thứ và phân loại của cấu thành gia đình thường qua lại với nhau."
  }
};

export const getDiepDungMeaning = (houseName: string, relativeIdx: number): string => {
  const base = houseName.toUpperCase();
  return DIEP_DUNG_DATA[base]?.[relativeIdx] || "";
};
