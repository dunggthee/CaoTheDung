# 🎯 Website Đếm Ngược Thông Minh

![Responsive Design](https://img.shields.io/badge/Responsive-Yes-green)
![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue)
![Modern Design](https://img.shields.io/badge/Design-Modern-orange)

Ứng dụng web đếm ngược hiện đại với tính năng Story Reels, được thiết kế responsive hoàn hảo cho mọi thiết bị.

## ✨ Tính Năng Nổi Bật

### 🕐 Hệ Thống Đếm Ngược
- ⏰ Đếm ngược thời gian thực đến Tết Dương Lịch 2025
- 🎨 Hiển thị ngày, giờ, phút, giây với animation mượt mà
- 📱 Giao diện thích ứng hoàn hảo trên mọi kích thước màn hình

### 🎬 Story Reels Tương Tác
- 📹 Hỗ trợ video từ thư mục local
- 🔄 Tự động chuyển story khi video kết thúc
- ⏩ Điều khiển Next/Previous linh hoạt
- ❤️ Tính năng like và chia sẻ story
- 📊 Thanh tiến trình hiển thị thời gian xem

### 📱 Thiết Kế Responsive
- **Mobile First** approach
- **Touch-friendly** interface
- **Cross-browser** compatibility
- **Fast loading** performance

## 🚀 Cài Đặt và Sử Dụng

### 📁 Cấu Trúc Thư Mục
countdown-website/
├── 📄 index.html
├── 📁 assets/
│ ├── 📁 videos/
│ │ ├── 🎬 story1.mp4
│ │ ├── 🎬 story2.mp4
│ │ ├── 🎬 story3.mp4
│ │ ├── 🎬 story4.mp4
│ │ └── 🎬 story5.mp4
│ └── 📁 images/
│ ├── 🖼️ avatar1.jpg
│ ├── 🖼️ avatar2.jpg
│ ├── 🖼️ avatar3.jpg
│ ├── 🖼️ avatar4.jpg
│ └── 🖼️ avatar5.jpg
└── 📄 README.md

text

### 🛠️ Bước 1: Chuẩn Bị File
1. **Tạo thư mục** `countdown-website`
2. **Lưu code** thành file `index.html`
3. **Tạo thư mục con** theo cấu trúc trên

### 🎬 Bước 2: Thêm Video và Ảnh
```bash
# Đặt video vào thư mục assets/videos/
assets/videos/story1.mp4
assets/videos/story2.mp4
assets/videos/story3.mp4
assets/videos/story4.mp4
assets/videos/story5.mp4

# Đặt ảnh đại diện vào thư mục assets/images/
assets/images/avatar1.jpg
assets/images/avatar2.jpg
assets/images/avatar3.jpg
assets/images/avatar4.jpg
assets/images/avatar5.jpg
⚙️ Bước 3: Tùy Chỉnh Nội Dung
Mở file index.html và tìm phần JavaScript để chỉnh sửa:

javascript
const stories = [
    {
        id: 1,
        username: "Tên hiển thị của bạn",      // ← Thay đổi tên
        avatar: "assets/images/avatar1.jpg",   // ← Đường dẫn ảnh
        videoUrl: "assets/videos/story1.mp4",  // ← Đường dẫn video
        time: "3 giờ trước"                    // ← Thời gian đăng
    },
    // ... thêm các story khác
];
🔗 Bước 4: Cập Nhật Facebook Messenger
javascript
// Thay yourfacebookprofile bằng ID Facebook của bạn
const facebookProfile = "yourfacebookprofile";
🌐 Deploy Lên Internet
🆓 Netlify (Khuyến Nghị)
Truy cập: netlify.com/drop

Kéo thả folder countdown-website vào

Nhận URL và chia sẻ ngay!

📦 GitHub Pages
Tạo repository trên GitHub

Upload toàn bộ file lên

Vào Settings → Pages → Chọn branch main

Truy cập: https://username.github.io/repository-name

🔥 Firebase Hosting
bash
# Cài đặt Firebase CLI
npm install -g firebase-tools

# Login và deploy
firebase login
firebase init hosting
firebase deploy
📱 Hướng Dẫn Sử Dụng
🎯 Đếm Ngược
Website tự động đếm ngược đến 00:00 ngày 1/1/2025

Hiển thị real-time với độ chính xác cao

Giao diện thay đổi khi kết thúc đếm ngược

🎬 Story Reels
Click/Tap vào avatar để xem story

Tự động chuyển sang story tiếp theo

Nút Next để chuyển thủ công

Nút Like để tương tác với story

Nút Chia sẻ để chia sẻ story

💬 Liên Hệ
Click nút "Liên Hệ" để mở form

Nhập tên và tin nhắn

Gửi trực tiếp qua Facebook Messenger

🛠️ Yêu Cầu Kỹ Thuật
💻 Trình Duyệt Hỗ Trợ
Browser	Version	Support
Chrome	60+	✅ Full
Firefox	55+	✅ Full
Safari	12+	✅ Full
Edge	79+	✅ Full
iOS Safari	12+	✅ Full
Chrome Mobile	60+	✅ Full
📹 Định Dạng Media
Loại	Định Dạng	Khuyến Nghị
Video	MP4, WebM	MP4 H.264
Ảnh	JPG, PNG, WebP	JPG 1:1 ratio
Kích thước	-	Video < 50MB
📐 Tỷ Lệ Khung Hình
Video Story: 9:16 (dọc)

Ảnh Avatar: 1:1 (vuông)

Responsive: 320px - 3840px

🎨 Tùy Chỉnh Giao Diện
🎨 Màu Sắc Chủ Đạo
css
:root {
    --apple-blue: #0071e3;      /* Màu chính */
    --apple-light-blue: #2997ff; /* Màu hover */
    --apple-white: #ffffff;      /* Nền sáng */
    --apple-gray: #f5f5f7;       /* Nền phụ */
    --text-primary: #1d1d1f;     /* Chữ chính */
}
📱 Breakpoints
css
/* Mobile First */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
🐛 Xử Lý Lỗi Thường Gặp
❌ Video Không Phát
Kiểm tra đường dẫn file

Đảm bảo định dạng MP4

Test video trên trình duyệt

❌ Ảnh Không Hiển Thị
Kiểm tra tên file và đường dẫn

Đảm bảo định dạng JPG/PNG

Giảm kích thước ảnh nếu cần

❌ Responsive Lỗi
Clear cache trình duyệt

Kiểm tra viewport meta tag

Test trên nhiều thiết bị

📞 Hỗ Trợ
🐛 Báo Cáo Lỗi
Mô tả vấn đề gặp phải

Trình duyệt và phiên bản

Thiết bị đang sử dụng

Ảnh chụp màn hình (nếu có)

💡 Đề Xuất Tính Năng
Tính năng đa ngôn ngữ

Custom countdown date

Video upload trực tiếp

Analytics integration

📄 Giấy Phép
Dự án được phân phối dưới giấy phép MIT. Xem file LICENSE để biết thêm chi tiết.

👥 Đóng Góp
Đóng góp luôn được chào đón! Vui lòng:

Fork repository

Tạo feature branch

Commit changes

Push to branch

Tạo Pull Request

⭐ Nếu bạn thấy dự án hữu ích, hãy cho nó một star!

📧 Liên hệ: [Your Email]
🌐 Website: [Your Website]
💼 LinkedIn: [Your LinkedIn]

Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript

text

## 📋 **FILE 4: DEPLOY-GUIDE.md**

```markdown
# 🚀 Hướng Dẫn Deploy Chi Tiết

## 📦 Chuẩn Bị Trước Khi Deploy

### 1. Kiểm Tra Local
```bash
# Mở file index.html trên trình duyệt
# Kiểm tra các tính năng:
✅ Đếm ngược hoạt động
✅ Story video phát được
✅ Responsive trên mobile
✅ Form liên hệ mở được
2. Tối Ưu Hóa
bash
# Nén ảnh (recommended < 500KB)
https://tinypng.com/

# Nén video (recommended < 50MB)
https://handbrake.fr/
🌐 Deploy Lên Netlify (5 Phút)
Phương Pháp 1: Kéo Thả
Truy cập: netlify.com/drop

Kéo thả toàn bộ folder countdown-website

Chờ deploy tự động (1-2 phút)

Nhận URL: https://amazing-site-123.netlify.app

Phương Pháp 2: GitHub Integration
Đẩy code lên GitHub

Đăng nhập Netlify

New site from Git

Chọn repository

Deploy

Tùy Chỉnh Tên Miền
bash
# Trên Netlify Dashboard
Site Settings → Domain Management → Custom Domains

# Thêm tên miền
my-countdown.netlify.app
🐙 Deploy Lên GitHub Pages
Bước 1: Tạo Repository
bash
# Tên repository
username.github.io  # Cho personal site
hoặc
countdown-website   # Cho project site
Bước 2: Upload Files
bash
# Sử dụng GitHub Desktop hoặc command line
git init
git add .
git commit -m "Deploy countdown website"
git push
Bước 3: Kích Hoạt Pages
bash
# Trên GitHub
Settings → Pages → Source → Deploy from branch
→ Chọn branch main → Save
🔥 Deploy Lên Firebase
Cài Đặt Firebase CLI
bash
# Yêu cầu Node.js
npm install -g firebase-tools

# Login
firebase login

# Init project
firebase init hosting

# Deploy
firebase deploy
Cấu Hình Firebase
json
// firebase.json
{
  "hosting": {
    "public": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
📊 Kiểm Tra Sau Khi Deploy
Performance Test
bash
# PageSpeed Insights
https://pagespeed.web.dev/

# GTmetrix
https://gtmetrix.com/

# WebPageTest
https://www.webpagetest.org/
Cross-Browser Test
bash
# BrowserStack
https://www.browserstack.com/

# CrossBrowserTesting
https://crossbrowsertesting.com/
🔧 Tối Ưu Hóa Production
1. CDN cho Media
bash
# Sử dụng Cloudinary cho ảnh/video
https://cloudinary.com/

# Hoặc ImageKit
https://imagekit.io/
2. Analytics
html
<!-- Thêm Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
3. SEO Optimization
html
<!-- Thêm meta tags -->
<meta name="description" content="Website đếm ngược thông minh với story reels">
<meta property="og:title" content="Đếm Ngược Thông Minh">
<meta property="og:description" content="Theo dõi sự kiện quan trọng">
<meta property="og:image" content="/preview.jpg">
🚨 Xử Lý Sự Cố
Lỗi 404
bash
# Netlify: Thêm file _redirects
/*    /index.html   200

# Firebase: Cấu hình rewrites
Lỗi Mixed Content
bash
# Đảm bảo tất cả resource dùng HTTPS
# Kiểm tra console trên trình duyệt
Lỗi CORS
bash
# Video từ different domain
# Cấu hình CORS headers trên server
📈 Monitoring
Uptime Monitoring
bash
# UptimeRobot
https://uptimerobot.com/

# Pingdom
https://www.pingdom.com/
Performance Monitoring
bash
# Google Search Console
https://search.google.com/search-console/

# Vercel Analytics
https://vercel.com/analytics
🎉 Chúc mừng! Website của bạn đã live trên internet!

text

## 🎯 **CÁCH SỬ DỤNG README:**

1. **README.md** - Hướng dẫn tổng quan cho developer
2. **DEPLOY-GUIDE.md** - Hướng dẫn deploy chi tiết

Cả hai file này cung cấp hướng dẫn đầy đủ từ setup đến deploy production! 🚀
