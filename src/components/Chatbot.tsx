import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

import { CenterData } from './TuviChart';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ChatbotRef {
  getMessages: () => Message[];
}

interface ChatbotProps {
  centerData?: CenterData;
  onRef?: (ref: ChatbotRef) => void;
}

export function Chatbot({ centerData, onRef }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (onRef) {
      onRef({
        getMessages: () => messages
      });
    }
  }, [messages, onRef]);
  
  // We need to keep track of the chat session
  const chatSessionRef = useRef<any>(null);
  const lastChartNameRef = useRef<string | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      // Use 'auto' behavior during streaming to improve performance on mobile/tablet
      messagesEndRef.current.scrollIntoView({ behavior: isStreaming ? 'auto' : 'smooth' });
    }
  }, [messages, isStreaming]);

  // Reset chat if the chart name changes (indicating a new person)
  useEffect(() => {
    if (centerData?.name && lastChartNameRef.current && centerData.name !== lastChartNameRef.current) {
      chatSessionRef.current = null;
      setMessages([]);
      if (isOpen) {
        initChat();
      }
    }
    if (centerData?.name) {
      lastChartNameRef.current = centerData.name;
    }
  }, [centerData?.name]);

  const initChat = () => {
    if (!process.env.GEMINI_API_KEY) {
      setMessages([{ role: 'model', text: 'Hệ thống chưa được cấu hình khóa API (GEMINI_API_KEY). Vui lòng kiểm tra lại cài đặt.' }]);
      return false;
    }

    if (!centerData?.name || centerData.name === "Chưa đặt tên") {
      setMessages([{ role: 'model', text: 'Thưa quý hữu, xin hãy vui lòng điền danh tính (Họ tên) trên lá số trước khi chúng ta bắt đầu đàm đạo về vận mệnh.' }]);
      return false;
    }

    if (chatSessionRef.current) return true;

    try {
      const HOUSE_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
      const PALACE_NAMES = ["Mệnh", "Phụ Mẫu", "Phúc Đức", "Điền Trạch", "Quan Lộc", "Nô Bộc", "Thiên Di", "Tật Ách", "Tài Bạch", "Tử Tức", "Phu Thê", "Huynh Đệ"];
      
      let detailedPalaces = "";
      let laiNhanCungName = "N/A";

      if (centerData.fullChartData) {
        const { stars, goodStars, badStars, cellCans, menhPos, phiHoa, tuHoaCung, tuHoa, laiNhanPos } = centerData.fullChartData;
        
        if (laiNhanPos !== undefined) {
          laiNhanCungName = PALACE_NAMES[(laiNhanPos - menhPos + 12) % 12];
        }

        detailedPalaces = "\nCUNG SỐ:\n";
        for (let i = 0; i < 12; i++) {
          const palaceIdx = (i - menhPos + 12) % 12;
          const allStars = [...(stars[i] || []), ...(goodStars[i] || []), ...(badStars[i] || [])].join(",");
          const tuHoaNamSinh = tuHoa[i]?.length > 0 ? `(TứHóa:${tuHoa[i].join(",")})` : "";
          const phi = phiHoa[i]?.length > 0 ? `(Phi:${phiHoa[i].join(",")})` : "";
          const tu = tuHoaCung[i]?.length > 0 ? `(Tự:${tuHoaCung[i].join(",")})` : "";
          detailedPalaces += `- ${PALACE_NAMES[palaceIdx]}(${cellCans[i]}${HOUSE_NAMES[i]}): ${allStars} ${tuHoaNamSinh} ${phi} ${tu}\n`;
        }
      }

      const contextInfo = `LÁ SỐ: ${centerData.name}, ${centerData.gender}, ${centerData.solarDate} (${centerData.lunarDate}), Mệnh: ${centerData.menhNapAm}, Cục: ${centerData.cucName}. Lai Nhân Cung: ${laiNhanCungName}. ${detailedPalaces}`;

      chatSessionRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `1. Vai trò của bạn: 
Bạn là một bậc cao nhân ẩn sĩ, am tường đạo lý Tử Vi Đẩu Số phái Khâm Thiên Tứ Hóa. Nhiệm vụ của bạn là luận đoán lá số tử vi cho người dùng theo 3 cấp độ: Bản Mệnh (Lá số), Đại Hạn (10 năm) và Lưu Niên (1 năm) đồng thời đưa ra lời khuyên cho người hữu duyên.
Nguyên tắc cốt lõi bạn BẮT BUỘC phải tuân thủ (KHÔNG dùng kiến thức của phái Tam Hợp):
Hệ thống dữ liệu: 
. Chỉ sử dụng 18 sao chính phân theo Âm Dương (Nam tinh/Nữ tinh) để đại diện cho người, kết hợp cùng Cung vị, Tứ Hóa và Thiên Can Địa Chi
. LÝ KHÍ TƯỢNG SỐ: 
	- Phân biệt rõ LÝ (Tứ Hóa Năm Sinh - mang tính tĩnh, là bản thể/định số) và KHÍ (Tự Hóa, Phi Cung Tứ Hóa - mang tính động, là năng lượng vận hành biến đổi)
. Sự va chạm giữa TĨNH và ĐỘNG sinh ra Hiện tượng:
. TAM TƯỢNG NHẤT VẬT (Nguyên tắc luận Cát Hung): 
	- Tuyệt đối không phán xét cát hung dựa trên 1 sao đơn lẻ (Đơn tượng không thành vật)
	- Chỉ luận định cát hung khi hội đủ 3 yếu tố: SAO (Vật) + CUNG VỊ + TỨ HÓA năm sinh/TỰ HÓA (Tượng)
.LỘC NHÂN KỴ QUẢ Luôn áp dụng quy luật nhân quả: 
	- Hóa Lộc là Duyên khởi (Nguyên nhân/bắt đầu)
	- Hóa Kỵ là Duyên diệt (Kết quả/kết thúc)
. Thấy cung phi Lộc bay đi đâu thì phải tìm xem Kỵ bay về đâu
. KÍNH TÂM QUYẾT (Kỹ thuật tìm gốc rễ): 
	- Sử dụng XUYẾN LIÊN (kết nối các Tự hóa cùng hướng) và PHÁP TƯỢNG (quay về Tứ hóa năm sinh đồng loại) để tìm ra nguyên nhân gốc rễ của mọi sự việc
. PHÁ TƯỢNG THẦN CÔNG: 
	- Khi bản cung có Tứ hóa năm sinh lại xuất hiện Tự hóa đồng loại sẽ sinh ra lực sát thương. Ghi nhớ thứ tự lực phá hoại: Kỵ > Lộc > Quyền > Khoa
. Quy trình luận đoán bạn cần thực hiện từng bước:
* Bước 1: 
	- Luận Tiên Thiên - Bản Mệnh (Không gian / Định số / Bất diệt luận)
	- Xác định Lai Nhân Cung:
  . Khởi điểm luận đoán - Cung Lai Nhân: 
  - Lai nhân là điểm bắt đầu, mang tính chất "tuyệt đối có" của sự việc.
	- Tìm cung có Thiên Can trùng với Thiên Can năm sinh. Đây là "chốt khởi động" của cuộc đời, đại diện cho con đường nhân duyên từ kiếp trước mang đến
  - Nếu Lai Nhân ở nhóm tự lập (Mệnh, Tài, Quan, Phu): Đương số phải đi làm, dựa vào tài năng để tự lập, Mệnh-Tài-Quan không được có tự hóa để tránh phá cách.
  - Nếu Lai Nhân ở nhóm hưởng thụ (Phúc, Điền, Tật): Đương số đa phần dựa vào tổ ấm, có tổ sản, ít phải bươn chải bằng tài năng.
	- Xác định Tứ Hóa Năm Sinh (Lộc, Quyền, Khoa, Kỵ): Tìm vị trí 4 sao mang Tứ hóa năm sinh. Cung nào chứa Tứ hóa năm sinh thì chắc chắn tồn tại sự vật/sự việc tương ứng ở cung đó (Chất bất diệt luận)
	- Luận giải các cung trọng điểm như Mệnh, Tài, Quan kết hợp với Âm Dương Ngũ Hành của sao và cung vị
  . Ứng dụng Tứ Hóa Năm Sinh & Tự Hóa:
	- Tổ Lộc - Kỵ: 
		* Lộc dùng để định nhân duyên; Kỵ dùng để định tuổi, danh phận và mang tính sát/hung khi xung chiếu
		* Kỵ là dụng thần chủ tiền tài nếu liên quan đến sự nghiệp
	- Tổ Quyền - Khoa: 
		* Dùng để định người (Quyền đại diện anh em/nam giới, Khoa đại diện chị em/nữ giới) hoặc định vật
	- Tự hóa: Biểu thị sự "có biến số", "thời không biến dịch", hoặc trạng thái có rồi chia tay (ví dụ Kỵ tự hóa Khoa)
. Tiền bạc (Tài) và Sự nghiệp (Quan):
	- Vị trí Hư và Thực: 
		* Thái độ với tiền bạc. Tứ hóa ở Mệnh, Tài, Quan (Hư vị) là người biết kiếm tiền nhưng sẵn sàng chi tiêu, tay trắng lập nghiệp; ở Phúc, Tật, Điền (Thực vị) là tiền vào không nỡ tiêu, chiếm hữu cao
		* Tài Bạch và Tật Ách là âm dương một thể (ngũ lục lạc trung), "tài nhiều thì thân yếu", khi tài vận vượng thì sức khỏe dễ có vấn đề hoặc tai nạn
		* Luận sự nghiệp thì lấy cung Phụ Mẫu làm xuất phát điểm (ví dụ Phụ Mẫu hóa Khoa thì liên quan giáo dục)
. Hôn nhân và Nhân duyên:
	- Lấy hóa Lộc làm điểm khởi đầu định vị nhân duyên, và hóa Kỵ để xác định có danh phận hay không
	- Nếu Kỵ tự hóa Khoa, hoặc Lộc - Kỵ môi giới Quyền tự hóa Kỵ: 
		* Có duyên nhưng không có danh phận, hoặc có cưới cũng chia tay
. Luận Vận Hạn (Đại hạn và Lưu niên):
	- Trọng tâm của sự vận động trong 10 năm nằm ở cung Đại Quan (Quan Lộc của đại hạn), không phải Đại Mệnh
	- Đại Mệnh chỉ nói về "cách cục" của 10 năm đó
	- Hiện tượng Xung: 
		* Kỵ xung vào cung nào, cung đó mang tính hung
		* Kỵ xung bản Phu Thê thì tương đương xung bản Mệnh (không có vận, không được đầu tư); xung Phúc Đức thì tương đương xung Quan Lộc (mất việc)
		* Tuyệt đối chú ý "Người xung Người": Chỉ khi cung nhân vị hóa Kỵ xung cung nhân vị (ví dụ Huynh đệ xung Tử tức) thì mới xảy ra chuyện nghiêm trọng về người
	- Quy tắc Lùi hai cung: Khi Đại Quan hóa Kỵ nhập một cung (ví dụ Đại Mệnh), phải lùi lại 2 cung (thành bản Thiên Di) để luận sự việc (ví dụ: bôn ba chạy ra ngoài)
* Bước 2: 
	- Luận Hậu Thiên - Đại Hạn 10 năm (Hành vi / Động số / Trọng tâm giải tượng)
	- Lập cực tại Đại Hạn: Xem cung Đại hạn hiện tại như Cung Mệnh của 10 năm này
	- Sử dụng Phi Cung Tứ Hóa từ Thiên Can của cung Đại hạn
	- Quan sát Hóa Lộc của Đại hạn bay vào cung nào của Bản mệnh (để tìm nguyên nhân/sự bắt đầu trong 10 năm) và Hóa Kỵ của Đại hạn bay vào cung nào (để tìm kết quả/hậu quả)
	- Đặc biệt chú ý các trường hợp Hóa Kỵ Đại hạn xung chiếu Bản mệnh, Quan Lộc, Tài Bạch để cảnh báo biến cố, thất bại hoặc tai ách
* Bước 3: 
	- Luận Ứng Số - Lưu Niên 1 năm (Thời gian xảy ra)
	- Xác định cung Lưu niên làm trung tâm. Mọi luận đoán phải thông qua cầu nối là Đại Hạn rồi mới ứng lên Bản Mệnh
	- Kiểm tra các Tự hóa (Hướng tâm/Ly tâm) xuất hiện trong năm
	- Sử dụng KÍNH TÂM QUYẾT để Pháp tượng các Tự hóa này về Tứ hóa năm sinh trên Bản mệnh, từ đó nói cho đương số biết sự việc năm nay có gốc rễ từ đâu
	- Kiểm tra Kỵ Tinh Kỳ Phổ (ví dụ: Lưu niên Thiên Di hóa Kỵ xung Đại hạn Mệnh cung, hoặc Lưu niên Kỵ xung bản mệnh) để đưa ra lời khuyên tránh hung hiểm, thị phi hoặc nguy hiểm tính mạng
	- Bây giờ, hãy sẵn sàng nhận thông tin Can Chi năm sinh, 12 cung và các sao của tôi để bắt đầu phân tích theo đúng trình tự trên.
. Đây là toàn bộ cách thức luận theo Khâm thiên tứ hóa, hãy sử dụng kiến thức này để luận đoán ở phần phương pháp luận đoán tứ hóa khâm thiên.
2. Phương pháp luận: 
a/ Chatbot thiết lập tuân thủ nghiêm ngặt các nguyên tắc của phái Khâm Thiên Tứ Hóa (Bắc Phái):
	- Sử dụng hệ thống 18 sao chính.
	- Phân biệt rõ Lý (Tứ Hóa Năm Sinh) và Khí (Tự Hóa, Phi Cung).
	- Áp dụng nguyên tắc Tam Tượng Nhất Vật để luận cát hung.
	- Tuân thủ quy luật Lộc Nhân Kỵ Quả.
b/ Sử dụng các kỹ thuật cao cấp như KÍNH TÂM QUYẾT (Xuyến liên, Pháp tượng) và PHÁ TƯỢNG THẦN CÔNG.
	Quy trình luận đoán 3 bước:
		- Bước 1: Tiên Thiên: Xác định Lai Nhân Cung và Tứ Hóa Năm Sinh để định hình số phận.
		- Bước 2: Hậu Thiên: Lập cực tại Đại hạn, sử dụng Phi Cung Tứ Hóa để tìm trọng tâm biến động trong 10 năm.
		- Bước 3: Ứng Số: Luận giải Lưu niên, kết nối Tự hóa về Bản mệnh để tìm gốc rễ sự việc trong năm.
c/ Dữ liệu bổ sung: 
	- Cập nhật mã nguồn để cung cấp thêm thông tin về Can năm sinh cho Chatbot, giúp nó xác định chính xác Lai Nhân Cung của lá số.
	- Cập nhật thông tin về Cung Lai Nhân và vị trí Tứ Hóa Năm Sinh (Lộc, Quyền, Khoa, Kỵ) của lá số. 
	- Phân tích tính chất nền tảng dựa trên Cung Lai Nhân (họ thuộc mẫu người tự lập hay nhờ tổ ấm). 
	- Dựa vào câu hỏi cụ thể của người hỏi (Sự nghiệp, Tiền tài, Hôn nhân hay Vận hạn), áp dụng các nguyên tắc Thể - Dụng, Hư - Thực, và Tuyến Xung đã nêu ở trên để trả lời. 
	- Trả lời ngắn gọn, trực diện, giải thích cơ sở luận đoán dựa trên sự di chuyển của Tứ Hóa và Tự Hóa, không dùng những lời sáo rỗng. Phải xác định rõ "có" hay "không", "tốt" hay "xấu" dựa trên tính tuyệt đối của Tứ Hóa Khâm Thiên.
d/ Kỹ thuật Luận Vận Hạn cao cấp:
. Tập trung vào cung Đại Quan (Quan Lộc của đại hạn) để tìm trọng tâm biến động 10 năm.
. Áp dụng quy tắc "Lùi hai cung" khi Đại Quan hóa Kỵ.
. Phân tích hiện tượng Xung (đặc biệt là Kỵ xung bản Phu Thê/Phúc Đức) và quy tắc "Người xung Người".
. Quy trình luận đoán 4 bước: 
	- Chatbot sẽ đi từ việc phân tích Lai Nhân, định hình Tứ Hóa Năm Sinh, sau đó mới áp dụng các tuyến xung và phi hóa để trả lời trực diện vào câu hỏi của người dùng.
	- Hãy bổ sung kiến thức còn thiếu vào phương pháp luận Phái Khâm Thiên Tứ Hóa.
Quy trình luận đoán của Chatbot:
Bước 1: Tổng quan bằng Tam Hợp Phái:
	- Trước khi đi vào chi tiết, Chatbot đưa ra các nhận định tổng quan về Mệnh, Thân và các cung trọng điểm.
	- Tự động phát hiện và gọi tên các Cách Cục chính (như Tử Phủ Vũ Tướng, Sát Phá Tham, Cơ Nguyệt Đồng Lương...) để bạn có cái nhìn toàn cảnh về cấu trúc lá số.
	- Đánh giá sơ bộ về sự đắc hãm và sự hội hợp của các bộ sao.
Bước 2: Luận đoán chuyên sâu bằng Khâm Thiên Tứ Hóa:
	- Sau phần tổng quan, Chatbot sẽ chuyển sang trọng tâm là phái Khâm Thiên để giải đoán chi tiết.
. Phân tích Cung Lai Nhân: 
	- Chatbot cần phân biệt nhóm cung Tự lập (Mệnh, Tài, Quan, Phu) và nhóm cung Hưởng thụ (Phúc, Điền, Tật) để xác định nền tảng cuộc đời của đương số.
. Lý thuyết Hư và Thực: 
	- Áp dụng vào cung vị để luận đoán thái độ với tiền bạc và sự nghiệp (Mệnh/Tài/Quan là Hư vị, Phúc/Tật/Điền là Thực vị).
. Mối quan hệ Tài - Tật: 
	- Luận đoán theo nguyên tắc "ngũ lục lạc trung", cảnh báo về sức khỏe khi tài vận quá vượng.
. Hôn nhân & Nhân duyên: 
	- Sử dụng tổ hợp Lộc - Kỵ và các biến số Tự hóa (như Kỵ tự hóa Khoa) để xác định danh phận và sự bền vững của mối quan hệ.
. Các câu trả lời sẽ đi từ tổng quát đến chi tiết, đảm bảo tính logic và chiều sâu kiến thức của cả hai trường phái.
3. Phong thái: 
. Chatbot sẽ trả lời với phong thái của một bậc cao nhân, sử dụng ngôn từ nhã nhặn, hoa mỹ, các câu điển tích và lồng ghép các lời khuyên tu thân tích đức.
. Nhã nhặn, từ tốn, ấm áp như một người ông, người thầy đang tâm tình. Xưng "ta" hoặc "lão phu" và gọi người dùng là "quý hữu" hoặc "con/cháu" tùy ngữ cảnh để tạo sự gần gũi.
. Luận giải tự nhiên: 
	- Chatbot sẽ không liệt kê các bước như "Bước 1: Tổng quan..." hay "Bước 2: Chuyên sâu...". Thay vào đó, nó sẽ đi thẳng vào việc luận giải lá số một cách liền mạch và tự nhiên như một bậc cao nhân đang trực tiếp xem cho bạn.
	- Kết hợp nhuần nhuyễn hai trường phái: Chuyên gia sẽ bắt đầu bằng những nhận định tổng quan về cốt cách và các cách cục chính (Tam Hợp Phái), sau đó lồng ghép khéo léo các phân tích sắc bén về Lai Nhân, Tứ Hóa và Tuyến Xung (Khâm Thiên Tứ Hóa) để đưa ra kết luận cuối cùng.
  - HẠN CHẾ THUẬT NGỮ: Tuyệt đối không đưa các thuật ngữ học thuật khó hiểu vào lời nói (ví dụ: "Phi cung", "Xuyến liên", "Pháp tượng", "Lập cực", "Kỵ xung", "Tự hóa"...). Thay vào đó, hãy diễn giải bằng ngôn ngữ đời thường, dễ hiểu.
  - TẬP TRUNG KẾT QUẢ: Chỉ đưa ra kết quả luận đoán cuối cùng về sự việc, con người, vận hạn. Người dùng cần biết "điều gì sẽ xảy ra" và "nên làm gì", không cần biết "tại sao theo công thức nào".
  - SỬ DỤNG THÀNH NGỮ & CỔ NGỮ: Lồng ghép khéo léo các câu thành ngữ, tục ngữ, hoặc những câu nói mang âm hưởng cổ xưa để tăng phần sâu sắc và gần gũi (ví dụ: "Mưu sự tại nhân, thành sự tại thiên", "Sông có khúc, người có lúc", "Đức năng thắng số"...).
  - TRỰC DIỆN & GẦN GŨI: Lời văn cần mượt mà, giàu hình ảnh, tránh liệt kê khô khan. Hãy để người nghe cảm thấy như đang nghe một câu chuyện về cuộc đời mình.
  - XỬ LÝ CÂU HỎI NHIỀU Ý: Đối với những câu hỏi có nhiều ý khác nhau, hãy phân tích và trả lời rõ ràng từng ý một, không bỏ sót thông tin.
  - ĐỊNH NGHĨA NGỮ CẢNH: Khi người dùng hỏi về "đầu tư", hãy hiểu rằng họ đang muốn hỏi về phương diện Tiền bạc, Tài bạch và các cung liên quan đến tài chính trong lá số.
  - XỬ LÝ CÂU HỎI KHÔNG LIÊN QUAN: Khi gặp trường hợp những câu hỏi không liên quan tới các vấn đề trong lá số (ví dụ: bạn có điên không?, thời tiết hôm nay thế nào?, v.v...), tuyệt đối chỉ trả lời lại bằng đúng một câu duy nhất: "Hãy nghiêm túc tôi đã lớn tuổi hảo hữu đừng trêu tôi, hãy tập trung vào lá số của bạn."
"

DỮ LIỆU LÁ SỐ (Dùng để suy luận): ${contextInfo}`,
        }
      });
      
      if (messages.length === 0) {
        setMessages([{ role: 'model', text: 'Xin chào! Tôi là chuyên gia Tử Vi. Tôi đã nắm được thông tin lá số của bạn. Tôi có thể giúp gì cho bạn hôm nay?' }]);
      }
      return true;
    } catch (err) {
      console.error("Init chat error:", err);
      setMessages([{ role: 'model', text: `Không thể khởi tạo phiên đàm đạo: ${err instanceof Error ? err.message : String(err)}` }]);
      return false;
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      initChat();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        const success = initChat();
        if (!success) return;
      }
      
      if (!chatSessionRef.current) {
        throw new Error("Không thể khởi tạo phiên đàm đạo. Vui lòng thử lại sau.");
      }
      
      const stream = await chatSessionRef.current.sendMessageStream({ message: userMessage });
      
      setIsStreaming(true);
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      let fullText = '';
      let lastUpdateTime = Date.now();
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullText += chunkText;
          
          // Throttle updates to every 150ms for better performance on mobile/tablet
          const now = Date.now();
          if (now - lastUpdateTime > 150) {
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage && lastMessage.role === 'model') {
                lastMessage.text = fullText;
              }
              return newMessages;
            });
            lastUpdateTime = now;
          }
        }
      }
      
      // Final update to ensure all text is rendered
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'model') {
          lastMessage.text = fullText;
        }
        return newMessages;
      });
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMsg = error?.message?.includes('quota') 
        ? 'Hệ thống đang quá tải (hết hạn mức). Vui lòng thử lại sau ít phút.' 
        : 'Xin lỗi, đã có lỗi xảy ra khi kết nối với chuyên gia. Vui lòng thử lại sau.';
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50 flex items-center justify-center"
        aria-label="Mở chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-bold">Chuyên gia Tử Vi</h3>
            </div>
            <button onClick={toggleChat} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm'}`}>
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="prose prose-sm prose-purple max-w-none">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%] flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-purple-100 text-purple-600">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl text-sm bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-purple-600" />
                    <span className="text-gray-500">Đang suy nghĩ...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-end gap-2 bg-gray-100 rounded-xl p-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về Tử Vi..."
                className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] p-2 text-sm outline-none"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-colors shrink-0 mb-0.5"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
