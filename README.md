# Website Trường THPT Nghi Lộc 3 - Tỉnh Nghệ An

> **Phiên bản tích hợp đầy đủ Hệ thống Câu lạc bộ Học sinh & Nội dung số hóa.**

Website được cấu trúc sẵn để sẵn sàng xuất bản lên **GitHub** hoặc các dịch vụ lưu trữ web tĩnh (**GitHub Pages**, **Vercel**, **Netlify**, **Cloudflare Pages**).

---

## 📁 Cấu trúc thư mục

- `index.html`: Trang chủ chính thức trường THPT Nghi Lộc 3.
- `cau-lac-bo/` & `cau-lac-bo.html`: Trang giới thiệu 9 Câu lạc bộ học sinh tiêu biểu (Truyền thông, Âm nhạc, Sách & Hành động, STEM/Khoa học tự nhiên, Chuyển đổi số, Tiếng Anh, Thanh niên tình nguyện, Văn học, Thể dục thể thao).
- `gioi-thieu/` & `gioi-thieu.html`: Mục Giới thiệu nhà trường & Danh hiệu khen thưởng.
- `co-cau-to-chuc/` & `co-cau-to-chuc.html`: Cơ cấu tổ chức Ban Giám hiệu, Tổ chuyên môn.
- `thong-bao/` & `thong-bao.html`: Kế hoạch và thông báo tuần.
- `tin-hoat-dong/` & `tin-hoat-dong.html`: Tin tức, sự kiện nhà trường.
- `tai-nguyen/` & `tai-nguyen.html`: Tài nguyên giáo dục số.
- `404.html`: Trang xử lý lỗi đường dẫn tiêu chuẩn.
- `3rdparty/`, `App/`, `Common/`, `Content/`, `css/`, `publish/`, `upload/`: Toàn bộ tài nguyên CSS, JavaScript, phông chữ và hình ảnh.
- `.nojekyll`: Tệp cấu hình bắt buộc để GitHub Pages không lọc bỏ các thư mục và hiển thị ảnh đầy đủ.

---

## 🚀 Hướng dẫn đăng lên GitHub & Bật Website Online

### Cách 1 (Nhanh nhất - Tự động): Bấm đúp vào `push-to-github.bat`
Trong thư mục `github_deploy`, bấm đúp vào tệp **`push-to-github.bat`**.
- Tập lệnh sẽ tự động kiểm tra và cài đặt Git nếu chưa có.
- Tự động đẩy toàn bộ 207 tệp và mọi thư mục (`css/`, `upload/`, `3rdparty/`, `publish/`...) lên thẳng kho lưu trữ `https://github.com/phung232010-cloud/THPT-NL3`.

### Cách 2 (Dễ nhất qua giao diện đồ họa): Sử dụng GitHub Desktop
1. Tải và cài đặt phần mềm chính thức: [desktop.github.com](https://desktop.github.com/).
2. Đăng nhập tài khoản GitHub của bạn (`phung232010-cloud`).
3. Chọn **File** -> **Clone Repository...** -> chọn kho lưu trữ `THPT-NL3` về máy.
4. Sao chép toàn bộ tệp và thư mục trong `github_deploy` dán đè vào thư mục vừa Clone.
5. Trên GitHub Desktop, bấm **Commit to main** và bấm **Push origin**.

---

## 🌐 Kích hoạt chạy online miễn phí với GitHub Pages

Sau khi đã tải toàn bộ mã nguồn lên Repository trên GitHub:
1. Vào mục **Settings** của Repository `THPT-NL3` trên GitHub.
2. Ở thanh menu bên trái, tìm và bấm vào mục **Pages** (mục GitHub Pages).
3. Tại phần **Build and deployment** -> **Source**:
   - Chọn **Deploy from a branch**.
   - Tại dòng **Branch**: Chọn nhánh `main` và thư mục là `/ (root)`.
   - Bấm **Save**.
4. Chờ khoảng 1-2 phút, truy cập đường link trang web của bạn:
   👉 **`https://clb-thptnghiloc3.vercel.app/`**

---

## 💡 Lưu ý quan trọng
- Tệp `.nojekyll` đã được tạo sẵn để đảm bảo toàn bộ thư mục CSS, JS và ảnh hoạt động chính xác trên GitHub Pages.
- Nếu muốn liên kết tên miền riêng (ví dụ: `thptnghiloc3.edu.vn`), bạn chỉ cần nhập tên miền vào ô **Custom domain** trong mục **Settings -> Pages** trên GitHub.
