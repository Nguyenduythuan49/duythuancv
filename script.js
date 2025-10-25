// ========== JAVASCRIPT CV NGUYỄN VĂN ANH ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CV Nguyễn Văn Anh đã được tải thành công!');
    
    // Khởi tạo các chức năng
    initializeAnimations();
    initializeNavigation();
    initializeSkillBars();
    initializeScrollEffects();
    
    console.log('✅ Tất cả chức năng đã được khởi tạo');
});

// ========== KHỞI TẠO ANIMATIONS ==========
function initializeAnimations() {
    // Animate các phần tử khi load trang
    const animatedElements = document.querySelectorAll('.info-item, .hobby-item, .goal-item, .achievement-item, .project-card');
    
    // Thêm class animation với delay khác nhau
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    console.log('🎨 Animations đã được khởi tạo');
}

// ========== NAVIGATION SMOOTH SCROLL ==========
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class từ tất cả links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class cho link được click
            this.classList.add('active');
            
            // Smooth scroll đến section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            console.log(`📍 Điều hướng đến ${targetId}`);
        });
    });
    
    console.log('🧭 Navigation đã được khởi tạo');
}

// ========== SKILL BARS ANIMATION ==========
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress, .progress-fill');
    
    // Tạo Intersection Observer để animate skill bars khi visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Reset width và animate
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 2s ease-out';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                console.log(`📊 Animating skill bar: ${targetWidth}`);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    console.log('📈 Skill bars animation đã được khởi tạo');
}

// ========== SCROLL EFFECTS ==========
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar hide/show effect
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Parallax effect cho banner
        const banner = document.querySelector('.banner');
        const bannerOffset = scrollTop * 0.5;
        banner.style.backgroundPosition = `center ${bannerOffset}px`;
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    navbar.style.transition = 'transform 0.3s ease';
    
    console.log('📜 Scroll effects đã được khởi tạo');
}

// ========== UPDATE ACTIVE NAV LINK ==========
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ========== HOVER EFFECTS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.transition = 'all 0.4s ease';
            
            console.log('🎯 Project card hover effect activated');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
    
    // Contact items hover effect
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            console.log('📞 Contact item hover effect activated');
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ========== LOADING EFFECTS ==========
function showLoadingEffect() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
}

// ========== TYPING EFFECT CHO BANNER ==========
function initializeTypingEffect() {
    const bannerTitle = document.querySelector('.banner-title');
    const originalText = bannerTitle.textContent;
    
    bannerTitle.textContent = '';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        bannerTitle.textContent += originalText[index];
        index++;
        
        if (index >= originalText.length) {
            clearInterval(typeInterval);
            console.log('⌨️ Typing effect completed');
        }
    }, 100);
}

// ========== PARALLAX EFFECT CHO CÁC ELEMENTS ==========
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.goal-item, .achievement-item');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 * (index + 1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    console.log('🌊 Parallax effects đã được khởi tạo');
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 200;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 10);
    });
}

// ========== THEME TOGGLE (BONUS) ==========
function initializeThemeToggle() {
    // Tạo button toggle theme
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc2626;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            console.log('🌙 Dark theme activated');
        } else {
            icon.className = 'fas fa-moon';
            console.log('☀️ Light theme activated');
        }
    });
    
    document.body.appendChild(themeToggle);
    
    console.log('🎨 Theme toggle đã được khởi tạo');
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    // ESC để về top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('⬆️ Scrolled to top via ESC key');
    }
    
    // Ctrl + số để navigate đến section
    if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const navLinks = document.querySelectorAll('.nav-link');
        const index = parseInt(e.key) - 1;
        
        if (navLinks[index]) {
            navLinks[index].click();
            console.log(`🎯 Navigated to section ${e.key} via keyboard shortcut`);
        }
    }
});

// ========== LAZY LOADING CHO IMAGES ==========
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
                
                console.log('🖼️ Image loaded lazily');
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`⚡ Trang đã load xong trong ${loadTime}ms`);
    
    // Show loading complete animation
    showLoadingEffect();
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('❌ Đã xảy ra lỗi:', e.error);
});

// ========== EXPORT CHO DEBUGGING ==========
window.CVController = {
    initializeAnimations,
    initializeNavigation,
    initializeSkillBars,
    updateActiveNavLink,
    animateCounters
};

console.log('🎉 CV Controller đã sẵn sàng!');
