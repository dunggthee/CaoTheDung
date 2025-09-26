# 🎵 Live Stage 2025 - Countdown Website

Một trang web countdown hiện đại với tính năng upload video và messenger tích hợp, được tối ưu cho mọi thiết bị và trình duyệt.

## ✨ Tính năng chính

### 🎬 Video Upload
- **Upload video tùy chỉnh**: Thay thế video mặc định bằng video của bạn
- **Drag & Drop**: Kéo thả file video trực tiếp vào khung video
- **Hỗ trợ nhiều định dạng**: MP4, WebM, MOV, AVI
- **Kiểm tra kích thước**: Tối đa 100MB
- **Progress indicator**: Hiển thị tiến trình upload
- **Video controls**: Play, pause, volume, fullscreen

### ⏰ Countdown Timer
- **Responsive design**: Hiển thị đẹp trên mọi thiết bị
- **Real-time update**: Cập nhật mỗi giây
- **Tab visibility**: Tự động tạm dừng khi tab không hiển thị (tiết kiệm tài nguyên)
- **Accessibility**: Hỗ trợ screen reader

### 💬 Interactive Features
- **Comment system**: Bình luận trực tiếp
- **Like button**: Tương tác với animation
- **Messenger integration**: Gửi tin nhắn qua Facebook Messenger
- **Share functionality**: Chia sẻ link với Web Share API

### 🎨 Visual Effects
- **Animated background**: Laser grid, light beams, floating particles
- **Gradient animations**: Text và background động
- **Hover effects**: Tương tác mượt mà
- **Performance optimized**: Tự động giảm effects trên thiết bị yếu

### ♿ Accessibility
- **Keyboard shortcuts**: Alt+M, Alt+C, Alt+L, Alt+S, Alt+R
- **Screen reader support**: ARIA labels và live regions
- **High contrast mode**: Tự động điều chỉnh
- **Reduced motion**: Tôn trọng preference của người dùng

## 📁 Cấu trúc file

```
live-stage-countdown/
├── index.html          # File HTML chính
├── style.css           # Stylesheet
├── script.js           # JavaScript functionality
├── README.md           # Hướng dẫn này
└── images/            # Thư mục chứa ảnh (tùy chọn)
    └── background.jpg  # Ảnh background
```

## 🚀 Cách sử dụng

### 1. Cài đặt cơ bản
1. Tải về tất cả các file
2. Đặt chúng trong cùng một thư mục
3. Mở `index.html` trong trình duyệt

### 2. Tùy chỉnh thời gian countdown
Trong file `script.js`, tìm và sửa phần:
```javascript
const CONFIG = {
    // Set your event date here
    targetDate: (function() {
        const date = new Date();
        date.setDate(date.getDate() + 30); // Thay đổi số ngày
        date.setHours(20, 0, 0, 0); // Thay đổi giờ (20:00 = 8PM)
        return date;
    })(),
    
    // Your messenger page ID - replace with your actual page ID
    messengerPageId: 'YOUR_PAGE_ID' // Thay thế bằng Page ID thực
};
```

### 3. Thay đổi background image
Trong file `style.css`, tìm và sửa:
```css
body {
    background: 
        linear-gradient(45deg, 
            rgba(10, 10, 46, 0.8), 
            rgba(22, 33, 62, 0.8), 
            rgba(15, 52, 96, 0.8)
        ),
        url('images/your-background.jpg'); /* Thay đổi đường dẫn này */
}
```

### 4. Upload video
1. Nhấn vào nút "Choose Video File" hoặc
2. Kéo thả file video trực tiếp vào khung video
3. Video sẽ được hiển thị thay thế video mặc định
4. Sử dụng nút "❌" để xóa video

### 5. Cấu hình Messenger
1. Tạo Facebook Page
2. Lấy Page ID từ Facebook
3
