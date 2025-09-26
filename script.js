/**
 * Live Stage 2025 - Main JavaScript File
 * Enhanced with video upload functionality and cross-browser compatibility
 */

(function() {
    'use strict';
    
    // ========================================
    // Feature Detection & Compatibility
    // ========================================
    
    const hasLocalStorage = (function() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    })();
    
    const hasSessionStorage = (function() {
        try {
            const test = 'test';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    })();
    
    // ========================================
    // Configuration
    // ========================================
    
    const CONFIG = {
        // Set your event date here (30 days from now by default)
        targetDate: (function() {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            date.setHours(20, 0, 0, 0); // 8:00 PM
            return date;
        })(),
        
        // Video settings
        maxVideoSize: 100 * 1024 * 1024, // 100MB
        supportedVideoTypes: ['video/mp4', 'video/webm', 'video/mov', 'video/avi'],
        
        // Performance settings
        particleInterval: 2000, // milliseconds
        lowEndParticleInterval: 4000,
        
        // Your messenger page ID - replace with your actual page ID
        messengerPageId: 'YOUR_PAGE_ID'
    };
    
    // ========================================
    // State Management
    // ========================================
    
    let state = {
        likeCount: 128,
        isLiked: false,
        commentCount: 45,
        hasUploadedVideo: false,
        currentVideoFile: null,
        currentVideoURL: null
    };
    
    // ========================================
    // DOM Element Cache
    // ========================================
    
    const elements = {
        // Countdown elements
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        
        // Video elements
        videoUpload: document.getElementById('videoUpload'),
        videoPlayer: document.getElementById('videoPlayer'),
        defaultVideo: document.getElementById('defaultVideo'),
        videoUploadSection: document.getElementById('videoUploadSection'),
        videoOverlay: document.getElementById('videoOverlay'),
        videoTitle: document.getElementById('videoTitle'),
        removeVideoBtn: document.getElementById('removeVideoBtn'),
        
        // Progress elements
        uploadProgress: document.getElementById('uploadProgress'),
        progressFill: document.getElementById('progressFill'),
        progressText: document.getElementById('progressText'),
        
        // Interaction elements
        messageInput: document.getElementById('messageInput'),
        commentInput: document.getElementById('commentInput'),
        commentSection: document.getElementById('commentSection'),
        likeCount: document.getElementById('likeCount'),
        commentCount: document.getElementById('commentCount')
    };
    
    // ========================================
    // State Persistence
    // ========================================
    
    function loadState() {
        if (hasLocalStorage) {
            try {
                const saved = localStorage.getItem('liveStageState');
                if (saved) {
                    const savedState = JSON.parse(saved);
                    state = Object.assign(state, savedState);
                }
            } catch(e) {
                console.warn('Could not load saved state:', e);
            }
        }
        
        // Apply loaded state to UI
        if (elements.videoOverlay) elements.videoOverlay.style.display = 'none';
        
        // Show video player and remove button
        if (elements.videoPlayer) {
            elements.videoPlayer.src = videoURL;
            elements.videoPlayer.style.display = 'block';
            elements.videoPlayer.load();
        }
        if (elements.removeVideoBtn) elements.removeVideoBtn.style.display = 'flex';
        
        // Update video title
        if (elements.videoTitle) {
            elements.videoTitle.textContent = `🎵 ${fileName} - Your uploaded video`;
        }
        
        // Add video event listeners
        if (elements.videoPlayer) {
            elements.videoPlayer.addEventListener('loadedmetadata', () => {
                console.log('Video loaded successfully');
            });
            
            elements.videoPlayer.addEventListener('error', (e) => {
                console.error('Video playback error:', e);
                showToast('Lỗi phát video. Vui lòng thử file khác.', 'error');
                removeVideo();
            });
        }
    }
    
    function removeVideo() {
        // Clean up object URL to prevent memory leaks
        if (state.currentVideoURL) {
            URL.revokeObjectURL(state.currentVideoURL);
        }
        
        // Reset state
        state.hasUploadedVideo = false;
        state.currentVideoFile = null;
        state.currentVideoURL = null;
        
        // Reset UI
        if (elements.videoPlayer) {
            elements.videoPlayer.style.display = 'none';
            elements.videoPlayer.src = '';
        }
        if (elements.removeVideoBtn) elements.removeVideoBtn.style.display = 'none';
        if (elements.defaultVideo) elements.defaultVideo.style.display = 'flex';
        if (elements.videoUploadSection) elements.videoUploadSection.style.display = 'block';
        if (elements.videoOverlay) elements.videoOverlay.style.display = 'block';
        if (elements.videoTitle) {
            elements.videoTitle.textContent = '🎵 Live Stage 2025 - Upload your video to get started';
        }
        
        // Clear file input
        if (elements.videoUpload) {
            elements.videoUpload.value = '';
        }
        
        saveState();
        showToast('Video đã được xóa', 'info');
    }
    
    // ========================================
    // Auto Video Simulation (for default state)
    // ========================================
    
    let videoMessageIndex = 0;
    const videoMessages = [
        '🎵 LIVE STAGE 2025<br/><small style="font-size: 0.8rem; opacity: 0.8;">Upload your video</small>',
        '✨ Epic Performance<br/><small style="font-size: 0.8rem; opacity: 0.8;">Get Ready!</small>',
        '🎪 Ultimate Experience<br/><small style="font-size: 0.8rem; opacity: 0.8;">Don\'t Miss It!</small>',
        '🔥 Live Entertainment<br/><small style="font-size: 0.8rem; opacity: 0.8;">Be There!</small>'
    ];
    
    function simulateAutoVideo() {
        if (!elements.defaultVideo) return;
        
        function updateVideoContent() {
            if (!state.hasUploadedVideo && elements.defaultVideo.style.display !== 'none') {
                elements.defaultVideo.innerHTML = videoMessages[videoMessageIndex] + '<div class="video-progress"></div>';
                videoMessageIndex = (videoMessageIndex + 1) % videoMessages.length;
            }
        }
        
        setInterval(updateVideoContent, 15000);
    }
    
    // ========================================
    // Interaction Functions
    // ========================================
    
    function toggleLike() {
        const heartIcon = document.querySelector('.heart-icon');
        const likeCountElement = elements.likeCount;
        
        if (!heartIcon || !likeCountElement) return;
        
        if (!state.isLiked) {
            state.likeCount++;
            state.isLiked = true;
            heartIcon.style.fill = '#ff4757';
            
            // Enhanced animation
            if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                heartIcon.parentElement.style.animation = 'heartBeat 0.6s ease';
                
                // Create floating heart effect
                const floatingHeart = heartIcon.cloneNode(true);
                floatingHeart.style.cssText = 'position:absolute;pointer-events:none;z-index:1000;animation:floatHeart 2s ease forwards;';
                heartIcon.parentElement.appendChild(floatingHeart);
                
                setTimeout(() => {
                    if (floatingHeart.parentNode) {
                        floatingHeart.remove();
                    }
                }, 2000);
            }
        } else {
            state.likeCount--;
            state.isLiked = false;
            heartIcon.style.fill = '#ffffff';
        }
        
        likeCountElement.textContent = state.likeCount;
        saveState();
        
        // Reset animation
        setTimeout(() => {
            heartIcon.parentElement.style.animation = '';
        }, 600);
    }
    
    function addComment() {
        const commentInput = elements.commentInput;
        const commentSection = elements.commentSection;
        const commentCountElement = elements.commentCount;
        
        if (!commentInput || !commentSection || !commentCountElement) return;
        
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <div class="comment-author">@you</div>
                <div class="comment-text">${commentText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            `;
            
            // Add with animation
            newComment.style.opacity = '0';
            newComment.style.transform = 'translateY(20px)';
            commentSection.appendChild(newComment);
            
            // Animate in
            requestAnimationFrame(() => {
                newComment.style.transition = 'all 0.3s ease';
                newComment.style.opacity = '1';
                newComment.style.transform = 'translateY(0)';
            });
            
            commentSection.scrollTop = commentSection.scrollHeight;
            
            // Update comment count
            state.commentCount++;
            commentCountElement.textContent = state.commentCount;
            saveState();
            
            commentInput.value = '';
            
            // Success feedback
            commentInput.style.borderColor = '#00ff00';
            setTimeout(() => {
                commentInput.style.borderColor = '';
            }, 1000);
        } else {
            // Error feedback
            commentInput.focus();
            commentInput.style.borderColor = '#ff4757';
            setTimeout(() => {
                commentInput.style.borderColor = '';
            }, 2000);
        }
    }
    
    function focusComment() {
        const commentInput = elements.commentInput;
        if (commentInput) {
            commentInput.focus();
        }
    }
    
    function sendMessage() {
        const messageInput = elements.messageInput;
        if (!messageInput) return;
        
        const message = messageInput.value.trim();
        
        if (message) {
            // Enhanced user feedback
            const button = document.querySelector('.send-button');
            if (button) {
                const originalText = button.textContent;
                button.textContent = 'Đang gửi...';
                button.disabled = true;
                
                // Simulate sending process
                setTimeout(() => {
                    // Create messenger URL with encoded message
                    const messengerUrl = `https://m.me/${CONFIG.messengerPageId}?text=${encodeURIComponent(message)}`;
                    
                    // Show confirmation with better UX
                    if (window.confirm(`Tin nhắn: "${message}"\n\nBạn sẽ được chuyển đến Messenger. Tiếp tục?`)) {
                        // Try to open in same tab first, fallback to new tab
                        try {
                            window.open(messengerUrl, '_blank');
                        } catch(e) {
                            window.location.href = messengerUrl;
                        }
                        
                        messageInput.value = '';
                        showToast('Đã mở Messenger! 💬', 'success');
                    }
                    
                    // Reset button
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1000);
            }
        } else {
            // Enhanced error feedback
            messageInput.focus();
            messageInput.style.borderColor = '#ff4757';
            setTimeout(() => {
                messageInput.style.borderColor = '';
            }, 2000);
            
            showToast('Vui lòng nhập tin nhắn!', 'error');
        }
    }
    
    function shareVideo() {
        const shareData = {
            title: 'Live Stage 2025',
            text: 'Check out this amazing Live Stage 2025 countdown! 🎵✨',
            url: window.location.href
        };
        
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare();
            });
        } else {
            fallbackShare();
        }
        
        function fallbackShare() {
            // Try clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast('Link đã được copy! Chia sẻ với bạn bè nhé! 🎵', 'success');
                }).catch(() => {
                    fallbackCopy();
                });
            } else {
                fallbackCopy();
            }
        }
        
        function fallbackCopy() {
            // Create temporary input for copying
            const tempInput = document.createElement('input');
            tempInput.style.position = 'absolute';
            tempInput.style.left = '-9999px';
            tempInput.value = window.location.href;
            document.body.appendChild(tempInput);
            tempInput.select();
            tempInput.setSelectionRange(0, 99999);
            
            try {
                document.execCommand('copy');
                showToast('Link đã được copy! Chia sẻ với bạn bè nhé! 🎵', 'success');
            } catch (err) {
                showToast('Không thể copy link. Vui lòng copy thủ công: ' + window.location.href, 'error');
            }
            
            document.body.removeChild(tempInput);
        }
    }
    
    function scrollToContent() {
        const contentSection = document.getElementById('contentSection');
        if (contentSection) {
            contentSection.scrollIntoView({ 
                behavior: window.matchMedia('(prefers-reduced-motion: no-preference)').matches ? 'smooth' : 'auto',
                block: 'start' 
            });
        }
    }
    
    // ========================================
    // Toast Notification System
    // ========================================
    
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff4757' : '#00ffff'};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 10001;
            font-weight: bold;
            max-width: 300px;
            word-wrap: break-word;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            font-family: inherit;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });
        
        // Auto remove
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 4000);
    }
    
    // ========================================
    // Enhanced Visual Effects
    // ========================================
    
    function addHoverEffects() {
        const countdownBoxes = document.querySelectorAll('.countdown-box');
        countdownBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                    this.style.transform = 'scale(1.05) translateY(-5px)';
                    this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            });
            
            box.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
            
            // Touch support
            box.addEventListener('touchstart', function() {
                if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                    this.style.transform = 'scale(1.02)';
                }
            });
            
            box.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    function createRandomParticle() {
        if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
            return;
        }
        
        const backgroundEffects = document.querySelector('.background-effects');
        if (!backgroundEffects) return;
        
        const particle = document.createElement('div');
        particle.className = 'floating-particles';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        backgroundEffects.appendChild(particle);
        
        // Clean up particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 8000);
    }
    
    let particleInterval;
    
    function startParticleSystem() {
        // Detect device performance heuristically
        const isLowEnd = navigator.hardwareConcurrency <= 2 || 
                        navigator.deviceMemory <= 2 || 
                        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        const interval = isLowEnd ? CONFIG.lowEndParticleInterval : CONFIG.particleInterval;
        particleInterval = setInterval(createRandomParticle, interval);
    }
    
    // ========================================
    // Event Listeners Setup
    // ========================================
    
    function setupEventListeners() {
        // Video upload
        if (elements.videoUpload) {
            elements.videoUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    handleVideoUpload(file);
                }
            });
        }
        
        // Drag and drop for video upload
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                videoContainer.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
            });
            
            videoContainer.addEventListener('dragleave', (e) => {
                e.preventDefault();
                videoContainer.style.backgroundColor = '';
            });
            
            videoContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                videoContainer.style.backgroundColor = '';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    const file = files[0];
                    if (file.type.startsWith('video/')) {
                        handleVideoUpload(file);
                    } else {
                        showToast('Vui lòng chọn file video!', 'error');
                    }
                }
            });
        }
        
        // Keyboard event handlers
        if (elements.messageInput) {
            elements.messageInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
        
        if (elements.commentInput) {
            elements.commentInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                }
            });
        }
        
        // Global keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Alt + C to focus comment input
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                focusComment();
            }
            
            // Alt + M to focus message input
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                const messageInput = elements.messageInput;
                if (messageInput) {
                    messageInput.focus();
                    scrollToContent();
                }
            }
            
            // Alt + L to like
            if (e.altKey && e.key === 'l') {
                e.preventDefault();
                toggleLike();
            }
            
            // Alt + S to share
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                shareVideo();
            }
            
            // Alt + R to remove video
            if (e.altKey && e.key === 'r' && state.hasUploadedVideo) {
                e.preventDefault();
                if (window.confirm('Bạn có chắc muốn xóa video?')) {
                    removeVideo();
                }
            }
        });
        
        // Tab visibility handling for performance
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                isTabVisible = false;
                stopCountdown();
                if (particleInterval) {
                    clearInterval(particleInterval);
                    particleInterval = null;
                }
            } else {
                isTabVisible = true;
                startCountdown();
                startParticleSystem();
            }
        });
    }
    
    // ========================================
    // Accessibility Enhancements
    // ========================================
    
    function setupAccessibility() {
        // Announce countdown updates to screen readers
        let lastAnnouncement = '';
        const announceCountdown = function() {
            if (!elements.days || !elements.hours || !elements.minutes) return;
            
            const days = elements.days.textContent;
            const hours = elements.hours.textContent;
            const minutes = elements.minutes.textContent;
            
            const announcement = `${days} days, ${hours} hours, ${minutes} minutes remaining`;
            
            if (announcement !== lastAnnouncement) {
                lastAnnouncement = announcement;
                
                // Create live region for screen readers
                let liveRegion = document.getElementById('countdown-live-region');
                if (!liveRegion) {
                    liveRegion = document.createElement('div');
                    liveRegion.id = 'countdown-live-region';
                    liveRegion.setAttribute('aria-live', 'polite');
                    liveRegion.className = 'sr-only';
                    document.body.appendChild(liveRegion);
                }
                
                // Announce every minute
                if (elements.seconds && elements.seconds.textContent === '00') {
                    liveRegion.textContent = announcement;
                }
            }
        };
        
        // Check every second but only announce when needed
        setInterval(announceCountdown, 1000);
    }
    
    // ========================================
    // Performance Monitoring
    // ========================================
    
    function monitorPerformance() {
        if ('performance' in window && 'memory' in performance) {
            const checkMemory = function() {
                const memory = performance.memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
                const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
                
                // If memory usage is high, reduce particle frequency
                if (usedMB > 50 && particleInterval) {
                    clearInterval(particleInterval);
                    particleInterval = setInterval(createRandomParticle, 5000); // Slower particles
                }
                
                console.log(`Memory usage: ${usedMB}MB / ${totalMB}MB`);
            };
            
            // Check memory every 30 seconds
            setInterval(checkMemory, 30000);
        }
        
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        function measureFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
                
                // If FPS is low, disable some animations
                if (fps < 30 && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                    console.log('Low FPS detected, reducing animations');
                    document.documentElement.style.setProperty('--transition', 'none');
                    
                    // Disable particle system
                    if (particleInterval) {
                        clearInterval(particleInterval);
                        particleInterval = null;
                    }
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        }
        
        // Start FPS monitoring
        requestAnimationFrame(measureFPS);
    }
    
    // ========================================
    // Network Status Handling
    // ========================================
    
    function handleNetworkStatus() {
        const updateOnlineStatus = function() {
            if (!navigator.onLine) {
                showToast('Mất kết nối internet. Một số tính năng có thể không hoạt động.', 'error');
            } else {
                showToast('Đã kết nối lại internet!', 'success');
            }
        };
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    }
    
    // ========================================
    // Error Handling
    // ========================================
    
    function setupErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
            
            // Try to recover countdown if it stops
            if (!countdownInterval && isTabVisible) {
                console.log('Attempting to restart countdown...');
                startCountdown();
            }
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    // ========================================
    // Cleanup
    // ========================================
    
    function cleanup() {
        stopCountdown();
        if (particleInterval) {
            clearInterval(particleInterval);
        }
        
        // Clean up video object URLs
        if (state.currentVideoURL) {
            URL.revokeObjectURL(state.currentVideoURL);
        }
        
        saveState();
    }
    
    // ========================================
    // Global Functions (for onclick handlers)
    // ========================================
    
    // Expose functions to global scope for onclick handlers
    window.scrollToContent = scrollToContent;
    window.sendMessage = sendMessage;
    window.toggleLike = toggleLike;
    window.addComment = addComment;
    window.focusComment = focusComment;
    window.shareVideo = shareVideo;
    window.removeVideo = removeVideo;
    
    // ========================================
    // Initialization
    // ========================================
    
    function init() {
        console.log('🎵 Live Stage 2025 - Initializing...');
        
        // Load saved state
        loadState();
        
        // Setup core functionality
        startCountdown();
        setupEventListeners();
        setupAccessibility();
        setupErrorHandling();
        
        // Start visual effects
        addHoverEffects();
        startParticleSystem();
        simulateAutoVideo();
        
        // Setup monitoring
        if (window.performance) {
            monitorPerformance();
        }
        handleNetworkStatus();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', cleanup);
        
        console.log('✅ Live Stage 2025 initialized successfully!');
        
        // Announce to screen readers
        setTimeout(() => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = 'Live Stage 2025 countdown page loaded. Use Alt+M for messaging, Alt+C for comments, Alt+L to like, Alt+S to share, Alt+R to remove video.';
            document.body.appendChild(announcement);
        }, 1000);
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();likeCount) elements.likeCount.textContent = state.likeCount;
        if (elements.commentCount) elements.commentCount.textContent = state.commentCount;
    }
    
    function saveState() {
        if (hasLocalStorage) {
            try {
                // Don't save video file object, only metadata
                const stateToSave = Object.assign({}, state);
                delete stateToSave.currentVideoFile;
                delete stateToSave.currentVideoURL;
                localStorage.setItem('liveStageState', JSON.stringify(stateToSave));
            } catch(e) {
                console.warn('Could not save state:', e);
            }
        }
    }
    
    // ========================================
    // Countdown Timer
    // ========================================
    
    let countdownInterval;
    let isTabVisible = true;
    
    function updateCountdown() {
        const now = Date.now();
        const distance = CONFIG.targetDate.getTime() - now;
        
        if (distance < 0) {
            if (elements.days) elements.days.textContent = '00';
            if (elements.hours) elements.hours.textContent = '00';
            if (elements.minutes) elements.minutes.textContent = '00';
            if (elements.seconds) elements.seconds.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
            if (elements.days) elements.days.textContent = String(days).padStart(2, '0');
            if (elements.hours) elements.hours.textContent = String(hours).padStart(2, '0');
            if (elements.minutes) elements.minutes.textContent = String(minutes).padStart(2, '0');
            if (elements.seconds) elements.seconds.textContent = String(seconds).padStart(2, '0');
        });
    }
    
    function startCountdown() {
        updateCountdown(); // Run immediately
        countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    function stopCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }
    
    // ========================================
    // Video Upload Functionality
    // ========================================
    
    function validateVideoFile(file) {
        // Check file type
        if (!CONFIG.supportedVideoTypes.includes(file.type)) {
            throw new Error('Định dạng video không được hỗ trợ. Vui lòng chọn MP4, WebM, MOV hoặc AVI.');
        }
        
        // Check file size
        if (file.size > CONFIG.maxVideoSize) {
            throw new Error(`Kích thước file quá lớn. Tối đa ${CONFIG.maxVideoSize / (1024 * 1024)}MB.`);
        }
        
        return true;
    }
    
    function simulateUploadProgress(callback) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            
            if (elements.progressFill) {
                elements.progressFill.style.width = progress + '%';
            }
            if (elements.progressText) {
                elements.progressText.textContent = `Uploading... ${Math.round(progress)}%`;
            }
            
            if (progress >= 100 && callback) {
                setTimeout(callback, 500);
            }
        }, 200);
    }
    
    function handleVideoUpload(file) {
        try {
            validateVideoFile(file);
            
            // Show upload progress
            if (elements.uploadProgress) {
                elements.uploadProgress.style.display = 'block';
            }
            
            // Create object URL for the video
            const videoURL = URL.createObjectURL(file);
            
            // Simulate upload process
            simulateUploadProgress(() => {
                // Hide upload progress
                if (elements.uploadProgress) {
                    elements.uploadProgress.style.display = 'none';
                }
                
                // Update state
                state.hasUploadedVideo = true;
                state.currentVideoFile = file;
                state.currentVideoURL = videoURL;
                
                // Update UI
                showUploadedVideo(videoURL, file.name);
                saveState();
                
                showToast('Video đã được upload thành công! 🎉', 'success');
            });
            
        } catch (error) {
            if (elements.uploadProgress) {
                elements.uploadProgress.style.display = 'none';
            }
            showToast(error.message, 'error');
        }
    }
    
    function showUploadedVideo(videoURL, fileName) {
        // Hide default video and upload section
        if (elements.defaultVideo) elements.defaultVideo.style.display = 'none';
        if (elements.videoUploadSection) elements.videoUploadSection.style.display = 'none';
        if (elements.
