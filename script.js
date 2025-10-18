// ===== GLOBAL VARIABLES =====
let currentSection = 'home';
let isMenuOpen = false;

// ===== DOM ELEMENTS =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('memberModal');
const successMessage = document.getElementById('successMessage');

// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing website...');
    
    // Initialize skill bars animation
    initializeSkillBars();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize contact form
    initializeContactForm();
    
    // Show home section by default
    showSection('home');
    
    console.log('Website initialized successfully!');
});

// Initialize navigation event listeners
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // Navigation links in navbar
    navLinks.forEach((link, index) => {
        console.log(`Adding listener to nav link ${index}:`, link.getAttribute('data-section'));
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            console.log('Nav link clicked, target section:', targetSection);
            showSection(targetSection);
            
            // Close mobile menu if open
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Button links with data-section attribute (like in hero section)
    const sectionButtons = document.querySelectorAll('[data-section]:not(.nav-link)');
    console.log('Found section buttons:', sectionButtons.length);
    sectionButtons.forEach((button, index) => {
        console.log(`Adding listener to button ${index}:`, button.getAttribute('data-section'));
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            console.log('Section button clicked, target section:', targetSection);
            showSection(targetSection);
        });
    });
    
    // Portfolio links
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add portfolio modal or redirect logic here if needed
        });
    });
    
    console.log('Navigation initialized successfully!');
}

// Show specific section
function showSection(sectionId) {
    console.log('Showing section:', sectionId); // Debug log
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Update active nav link
        updateActiveNavLink(sectionId);
        
        // Trigger animations for the shown section
        setTimeout(() => {
            triggerSectionAnimations(sectionId);
        }, 100);
        
        // Scroll to top
        window.scrollTo(0, 0);
    } else {
        console.error('Section not found:', sectionId);
    }
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    console.log('Updating active nav link for section:', sectionId);
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
            console.log('Set active link for:', sectionId);
        }
    });
}

// Test navigation function (for debugging)
function testNavigation() {
    console.log('Testing navigation...');
    const sections = ['home', 'about', 'skills', 'portfolio', 'hobbies', 'members', 'contact'];
    sections.forEach((section, index) => {
        setTimeout(() => {
            console.log('Testing section:', section);
            showSection(section);
        }, index * 1000);
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (isMenuOpen) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Function to animate skill bars
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
    
    // Animate when skills section is shown
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ===== MEMBER SKILLS NAVIGATION =====
function showMemberSkills(memberName) {
    // Hide all member skills
    const allMemberSkills = document.querySelectorAll('.member-skills');
    allMemberSkills.forEach(skill => {
        skill.classList.remove('active');
    });
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.member-skill-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected member skills
    const targetSkills = document.getElementById(`skills-${memberName}`);
    const targetButton = document.querySelector(`[data-member="${memberName}"]`);
    
    if (targetSkills && targetButton) {
        targetSkills.classList.add('active');
        targetButton.classList.add('active');
        
        // Animate skill bars for the selected member
        setTimeout(() => {
            const skillBars = targetSkills.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                // Reset width first
                bar.style.width = '0';
                
                // Animate to target width
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }, index * 100 + 200);
            });
        }, 100);
    }
}

// Initialize member skills on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set default active member (Thuần)
    setTimeout(() => {
        showMemberSkills('thuần');
    }, 500);
});

// ===== SECTION ANIMATIONS =====
function triggerSectionAnimations(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Add fade-in animation to section content
    const animatedElements = section.querySelectorAll('.member-card, .portfolio-card, .hobby-card, .skill-category');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate skill bars if skills section
    if (sectionId === 'skills') {
        setTimeout(() => {
            const skillBars = section.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }, index * 200);
            });
        }, 500);
    }
}

// ===== MEMBER MODAL FUNCTIONALITY =====
const memberData = {
    member1: {
        name: 'Nguyễn Duy Thuần',
        role: 'Team Leader & Full-stack Developer',
        avatar: '<i class="fas fa-user"></i>',
        description: 'Sinh viên khóa 22 Đại học Giao thông Vận tải TP.HCM, sinh năm 2004. Chuyên gia về React và Node.js, có kinh nghiệm trong phát triển web. Thuần là người dẫn dắt nhóm với tầm nhìn chiến lược và kỹ năng quản lý dự án tuyệt vời.',
        skills: ['HTML', 'CSS', 'MongoDB', 'Express.js', 'TypeScript'],
        hobbies: ['Martial Arts', 'Football', 'Traveling'],
        contact: {
            facebook: 'https://www.facebook.com/na.thanh.311056/',
            email: 'nguyenduythuan.ng@gmail.com',
            phone: '+84 702479538'
        }
    },
    member2: {
        name: 'Trần Văn Quang',
        role: 'Frontend Developer & UI/UX Designer',
        avatar: '<i class="fas fa-user"></i>',
        description: 'Sinh viên khóa 22 Đại học Giao thông Vận tải TP.HCM, sinh năm 2004. Đam mê thiết kế giao diện người dùng và có khả năng sáng tạo tuyệt vời. Quang luôn đảm bảo mọi sản phẩm đều có giao diện đẹp mắt và trải nghiệm người dùng tốt nhất.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'Adobe XD'],
        hobbies: ['Design', 'Nhiếp ảnh', 'Nghe nhạc'],
        contact: {
            facebook: 'https://facebook.com/tranvanquang',
            email: 'quangvan123@gmail.com',
            phone: '+84 123 456 790'
        }
    },
    member3: {
        name: 'Nguyễn Trần Duy Khả',
        role: 'Backend Developer',
        avatar: '<i class="fas fa-user"></i>',
        description: 'Sinh viên khóa 22 Đại học Giao thông Vận tải TP.HCM, sinh năm 2004. Chuyên gia về database và API development, thành thạo PHP và Python. Khả đảm bảo hệ thống backend hoạt động ổn định và bảo mật cao.',
        skills: ['PHP', 'Python', 'MySQL', 'PostgreSQL', 'Laravel'],
        hobbies: ['Đọc sách khoa học', 'Chơi game', 'Tập gym'],
        contact: {
            facebook: 'https://facebook.com/nguyentranduykha',
            email: 'khanguyentran@gmail.com',
            phone: '+84 123 456 791'
        }
    },
    member4: {
        name: 'Trần Phan Đình Huy',
        role: 'Frontend Developer',
        avatar: '<i class="fas fa-user"></i>',
        description: 'Sinh viên khóa 22 Đại học Giao thông Vận tải TP.HCM, sinh năm 2004. Yêu thích JavaScript và các framework hiện đại như Vue.js và Angular. Huy luôn cập nhật những công nghệ frontend mới nhất để áp dụng vào dự án.',
        skills: ['Vue.js', 'Angular', 'JavaScript', 'SASS', 'Webpack'],
        hobbies: ['Học ngôn ngữ mới', 'Nấu ăn', 'Xem phim'],
        contact: {
            facebook: 'https://facebook.com/tranphandinhhuy',
            email: 'huy@example.com',
            phone: '+84 523529392'
        }
    },
    member5: {
        name: 'Nguyễn Thanh Vũ',
        role: 'DevOps & QA Tester',
        avatar: '<i class="fas fa-user"></i>',
        description: 'Sinh viên khóa 22 Đại học Giao thông Vận tải TP.HCM, sinh năm 2004. Chuyên về testing và deployment, đảm bảo chất lượng sản phẩm. Vũ có vai trò quan trọng trong việc duy trì và cải thiện quy trình phát triển của nhóm.',
        skills: ['Docker', 'Jenkins', 'AWS', 'Testing', 'CI/CD'],
        hobbies: ['Chơi thể thao', 'Du lịch', 'Đọc tin tức công nghệ'],
        contact: {
            facebook: 'https://web.facebook.com/share/17N8WB8dn1/?mibextid=wwXIfr&_rdc=1&_rdr',
            email: 'em@example.com',
            phone: '+84 123 456 793'
        }
    }
};

// Open member modal
function openMemberModal(memberId) {
    const member = memberData[memberId];
    if (!member) return;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="member-detail">
            <div class="member-detail-header">
                <div class="member-detail-avatar">
                    ${member.avatar}
                </div>
                <div class="member-detail-info">
                    <h2>${member.name}</h2>
                    <p class="member-detail-role">${member.role}</p>
                </div>
            </div>
            
            <div class="member-detail-content">
                <div class="member-section">
                    <h3><i class="fas fa-info-circle"></i> Giới thiệu</h3>
                    <p>${member.description}</p>
                </div>
                
                <div class="member-section">
                    <h3><i class="fas fa-code"></i> Kỹ năng chuyên môn</h3>
                    <div class="member-skills">
                        ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <div class="member-section">
                    <h3><i class="fas fa-heart"></i> Sở thích</h3>
                    <ul class="member-hobbies">
                        ${member.hobbies.map(hobby => `<li><i class="fas fa-star"></i> ${hobby}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="member-section">
                    <h3><i class="fas fa-address-book"></i> Thông tin liên hệ</h3>
                    <div class="member-contact">
                        <a href="${member.contact.facebook}" target="_blank" class="contact-btn facebook">
                            <i class="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="javascript:void(0)" onclick="showEmail('${member.contact.email}')" class="contact-btn email">
                            <i class="fas fa-envelope"></i> Email
                        </a>
                        <a href="tel:${member.contact.phone}" class="contact-btn phone">
                            <i class="fas fa-phone-alt"></i> ${member.contact.phone}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close member modal
function closeMemberModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show email address in a nice modal
function showEmail(email) {
    const emailModal = document.createElement('div');
    emailModal.className = 'email-modal';
    emailModal.innerHTML = `
        <div class="email-modal-content">
            <div class="email-modal-header">
                <h3><i class="fas fa-envelope"></i> Email Address</h3>
                <span class="email-close" onclick="closeEmailModal()">&times;</span>
            </div>
            <div class="email-modal-body">
                <div class="email-display">
                    <i class="fas fa-envelope email-icon"></i>
                    <span class="email-text">${email}</span>
                </div>
                <div class="email-actions">
                    <button onclick="copyEmail('${email}')" class="email-btn copy-btn">
                        <i class="fas fa-copy"></i> Copy Email
                    </button>
                    <a href="mailto:${email}" class="email-btn send-btn">
                        <i class="fas fa-paper-plane"></i> Send Email
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(emailModal);
    emailModal.style.display = 'flex';
    
    // Close when clicking outside
    emailModal.addEventListener('click', function(e) {
        if (e.target === emailModal) {
            closeEmailModal();
        }
    });
}

// Close email modal
function closeEmailModal() {
    const emailModal = document.querySelector('.email-modal');
    if (emailModal) {
        emailModal.remove();
    }
}

// Copy email to clipboard
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(function() {
        // Show success message
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '#007bff';
        }, 2000);
    });
}

// ===== LIGHTBOX FUNCTIONALITY =====
const lightboxImages = [
    { src: 'img/vanquang.jpg', title: 'Listening to Music' },
    { src: 'img/hobby-travel.jpg', title: 'Go Sightseeing with Friends' },
    { src: 'img/DuyThuan.jpg', title: 'Sports' },
    { src: 'img/hobby-reading.jpg', title: 'Reading' },
    { src: 'img/hobby-gaming.jpg', title: 'Gaming' }
];

let currentImageIndex = 0;

function openLightbox(imageSrc, imageTitle) {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    
    // Find current image index
    currentImageIndex = lightboxImages.findIndex(img => img.src === imageSrc);
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageTitle;
    lightboxTitle.textContent = imageTitle;
    
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNav);
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Remove keyboard navigation
    document.removeEventListener('keydown', handleKeyboardNav);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const currentImage = lightboxImages[currentImageIndex];
    
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.title;
    lightboxTitle.textContent = currentImage.title;
}

function handleKeyboardNav(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
}

// Close lightbox when clicking outside image
document.addEventListener('click', function(event) {
    const lightboxModal = document.getElementById('lightboxModal');
    if (event.target === lightboxModal) {
        closeLightbox();
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeMemberModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeMemberModal();
    }
});

// ===== HOBBY SLIDESHOW FUNCTIONALITY =====
const slideshows = ['music-slideshow', 'travel-slideshow', 'sports-slideshow', 'reading-slideshow', 'gaming-slideshow'];
const slideIntervals = {};

function initializeSlideshows() {
    slideshows.forEach(slideshowId => {
        startSlideshow(slideshowId);
    });
}

function startSlideshow(slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;
    
    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length <= 1) return;
    
    let currentIndex = 0;
    
    // Clear existing interval if any
    if (slideIntervals[slideshowId]) {
        clearInterval(slideIntervals[slideshowId]);
    }
    
    // Start new interval
    slideIntervals[slideshowId] = setInterval(() => {
        // Remove active class from current slide
        slides[currentIndex].classList.remove('active');
        
        // Move to next slide
        currentIndex = (currentIndex + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentIndex].classList.add('active');
    }, 4000); // Change every 4 seconds
}

function stopSlideshow(slideshowId) {
    if (slideIntervals[slideshowId]) {
        clearInterval(slideIntervals[slideshowId]);
        delete slideIntervals[slideshowId];
    }
}

// Update hobby galleries data with slideshow images
function updateHobbyGalleriesWithSlides() {
    // Music gallery
    hobbyGalleries.music = [
        { src: 'img/vanquang.jpg', title: 'Trần Văn Quang - Music' },
        { src: 'img/DuyThuan.jpg', title: 'Nguyễn Duy Thuần - Music' },
        { src: 'img/DuyKha.jpg', title: 'Nguyễn Trần Duy Khả - Music' },
        { src: 'img/ĐìnhHuy.jpg', title: 'Trần Phan Đình Huy - Music' },
        { src: 'img/thanhvu.jpg', title: 'Nguyễn Thanh Vũ - Music' }
    ];
    
    // Travel gallery
    hobbyGalleries.travel = [
        { src: 'img/DuyKha.jpg', title: 'Nguyễn Trần Duy Khả - Travel' },
        { src: 'img/vanquang.jpg', title: 'Trần Văn Quang - Travel' },
        { src: 'img/DuyThuan.jpg', title: 'Nguyễn Duy Thuần - Travel' },
        { src: 'img/ĐìnhHuy.jpg', title: 'Trần Phan Đình Huy - Travel' },
        { src: 'img/thanhvu.jpg', title: 'Nguyễn Thanh Vũ - Travel' }
    ];
    
    // Sports gallery
    hobbyGalleries.sports = [
        { src: 'img/DuyThuan.jpg', title: 'Nguyễn Duy Thuần - Sports' },
        { src: 'img/thanhvu.jpg', title: 'Nguyễn Thanh Vũ - Sports' },
        { src: 'img/vanquang.jpg', title: 'Trần Văn Quang - Sports' },
        { src: 'img/DuyKha.jpg', title: 'Nguyễn Trần Duy Khả - Sports' },
        { src: 'img/ĐìnhHuy.jpg', title: 'Trần Phan Đình Huy - Sports' }
    ];
    
    // Reading gallery
    hobbyGalleries.reading = [
        { src: 'img/ĐìnhHuy.jpg', title: 'Trần Phan Đình Huy - Reading' },
        { src: 'img/DuyKha.jpg', title: 'Nguyễn Trần Duy Khả - Reading' },
        { src: 'img/DuyThuan.jpg', title: 'Nguyễn Duy Thuần - Reading' },
        { src: 'img/vanquang.jpg', title: 'Trần Văn Quang - Reading' },
        { src: 'img/thanhvu.jpg', title: 'Nguyễn Thanh Vũ - Reading' }
    ];
    
    // Gaming gallery
    hobbyGalleries.gaming = [
        { src: 'img/thanhvu.jpg', title: 'Nguyễn Thanh Vũ - Gaming' },
        { src: 'img/ĐìnhHuy.jpg', title: 'Trần Phan Đình Huy - Gaming' },
        { src: 'img/vanquang.jpg', title: 'Trần Văn Quang - Gaming' },
        { src: 'img/DuyThuan.jpg', title: 'Nguyễn Duy Thuần - Gaming' },
        { src: 'img/DuyKha.jpg', title: 'Nguyễn Trần Duy Khả - Gaming' }
    ];
    
    // Update thumbnails for all galleries
    Object.keys(hobbyGalleries).forEach(hobbyType => {
        updateThumbnails(hobbyType);
    });
}

// ===== HOBBY GALLERY FUNCTIONS =====
function addHobbyImage(hobbyType) {
    const fileInput = document.getElementById(hobbyType + '-input');
    fileInput.click();
}

function handleHobbyImageUpload(hobbyType, input) {
    const files = input.files;
    
    if (!files || files.length === 0) {
        console.log('No files selected');
        return;
    }
    
    console.log(`Uploading ${files.length} image(s) to ${hobbyType}`);
    
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const imageData = {
                    src: e.target.result,
                    title: `Custom ${hobbyType.charAt(0).toUpperCase() + hobbyType.slice(1)} ${hobbyGalleries[hobbyType].length + 1}`,
                    isCustom: true
                };
                
                // Add to gallery data
                hobbyGalleries[hobbyType].push(imageData);
                
                // Add to slideshow
                addImageToSlideshow(hobbyType, imageData);
                
                // Update thumbnails display
                updateThumbnails(hobbyType);
                
                // Restart slideshow to include new image
                restartSlideshow(hobbyType);
                
                // Show success notification
                showImageUploadSuccess(hobbyType);
                
                // Save to localStorage
                saveHobbyGalleries();
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    // Clear input
    input.value = '';
}

function updateThumbnails(hobbyType) {
    const thumbnailsContainer = document.getElementById(hobbyType + '-thumbnails');
    const images = hobbyGalleries[hobbyType];
    
    if (!thumbnailsContainer || !images) return;
    
    thumbnailsContainer.innerHTML = '';
    
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.className = 'thumbnail-img';
        img.onclick = () => openHobbyGallery(hobbyType, index);
        
        thumbnailsContainer.appendChild(img);
    });
}

function openHobbyGallery(hobbyType, imageIndex) {
    currentGallery = hobbyType;
    currentImageIndex = imageIndex;
    
    const images = hobbyGalleries[hobbyType];
    if (images && images[imageIndex]) {
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        
        lightboxImage.src = images[imageIndex].src;
        lightboxImage.alt = images[imageIndex].title;
        lightboxTitle.textContent = images[imageIndex].title;
        
        lightboxModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNav);
        
        // Update navigation for hobby gallery
        updateHobbyNavigation();
    }
}

function updateHobbyNavigation() {
    const images = hobbyGalleries[currentGallery];
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.style.display = images.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = images.length > 1 ? 'flex' : 'none';
    }
}

function addImageToSlideshow(hobbyType, imageData) {
    const slideshow = document.getElementById(hobbyType + '-slideshow');
    if (!slideshow) return;
    
    // Create new slide element
    const newSlide = document.createElement('div');
    newSlide.className = 'slide';
    
    // Get current number of images for proper index
    const currentImages = hobbyGalleries[hobbyType];
    const newIndex = currentImages.length - 1; // Index of newly added image
    
    // Extract member name from title or use generic name
    const memberName = imageData.title.includes(' - ') ? 
        imageData.title.split(' - ')[0] : 
        `Custom Image ${newIndex + 1}`;
    
    newSlide.innerHTML = `
        <img src="${imageData.src}" alt="${imageData.title}" onclick="openHobbyGallery('${hobbyType}', ${newIndex})" />
        <div class="slide-caption">${memberName}</div>
    `;
    
    // Add to slideshow
    slideshow.appendChild(newSlide);
}

function restartSlideshow(hobbyType) {
    const slideshowId = hobbyType + '-slideshow';
    
    // Stop current slideshow
    stopSlideshow(slideshowId);
    
    // Start new slideshow with updated images
    setTimeout(() => {
        startSlideshow(slideshowId);
    }, 100);
}

function saveHobbyGalleries() {
    try {
        localStorage.setItem('hobbyGalleries', JSON.stringify(hobbyGalleries));
    } catch (e) {
        console.error('Error saving hobby galleries:', e);
    }
}

function loadHobbyGalleries() {
    try {
        const saved = localStorage.getItem('hobbyGalleries');
        if (saved) {
            const savedGalleries = JSON.parse(saved);
            Object.keys(savedGalleries).forEach(hobbyType => {
                if (hobbyGalleries[hobbyType] && savedGalleries[hobbyType]) {
                    // Load saved images
                    const savedImages = savedGalleries[hobbyType];
                    
                    // Add custom uploaded images (skip original member images)
                    const originalLength = getOriginalImagesCount(hobbyType);
                    const customImages = savedImages.slice(originalLength);
                    
                    // Add custom images to gallery
                    customImages.forEach(imageData => {
                        hobbyGalleries[hobbyType].push(imageData);
                        addImageToSlideshow(hobbyType, imageData);
                    });
                    
                    updateThumbnails(hobbyType);
                }
            });
        }
    } catch (e) {
        console.error('Error loading hobby galleries:', e);
    }
}

function getOriginalImagesCount(hobbyType) {
    // Each hobby originally has 5 member images
    return 5;
}

function showImageUploadSuccess(hobbyType) {
    // Create temporary success message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease-out;
    `;
    
    message.innerHTML = `
        <i class="fas fa-check-circle"></i> 
        Ảnh đã được thêm vào ${hobbyType} slideshow!
    `;
    
    // Add animation keyframes if not exists
    if (!document.getElementById('successAnimation')) {
        const style = document.createElement('style');
        style.id = 'successAnimation';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitForm);
    }
}

// Submit contact form
function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Validate form
    if (!validateForm(formObject)) {
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    // Try EmailJS first, fallback to mailto
    sendEmailViaEmailJS(formObject, submitBtn, originalText, event.target);
}

// Send email via EmailJS
function sendEmailViaEmailJS(formData, submitBtn, originalText, formElement) {
    // EmailJS configuration (you need to replace these with actual values)
    const serviceID = 'service_your_id'; // Replace with your EmailJS service ID
    const templateID = 'template_your_id'; // Replace with your EmailJS template ID  
    const publicKey = 'your_public_key'; // Replace with your EmailJS public key
    
    // Prepare template parameters
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Không có',
        subject: formData.subject,
        message: formData.message,
        to_email: 'nguyenduythuan.ng@gmail.com'
    };
    
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
        // Initialize EmailJS
        emailjs.init(publicKey);
        
        // Send email
        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
                handleFormSuccess(formElement, submitBtn, originalText, 'Email đã được gửi thành công!');
            })
            .catch(function(error) {
                console.log('EmailJS failed, using mailto fallback...', error);
                sendEmailViaMailto(formData, submitBtn, originalText, formElement);
            });
    } else {
        // EmailJS not available, use mailto
        sendEmailViaMailto(formData, submitBtn, originalText, formElement);
    }
}

// Fallback: Send email via mailto
function sendEmailViaMailto(formData, submitBtn, originalText, formElement) {
    // Create email content
    const emailSubject = `[Website Contact] ${formData.subject}`;
    const emailBody = `
Họ và tên: ${formData.name}
Email: ${formData.email}
Số điện thoại: ${formData.phone || 'Không có'}
Chủ đề: ${formData.subject}

Tin nhắn:
${formData.message}

---
Email này được gửi từ website nhóm 5
    `.trim();
    
    // Use mailto link to send email
    const mailtoLink = `mailto:nguyenduythuan.ng@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    // Handle success
    setTimeout(() => {
        handleFormSuccess(formElement, submitBtn, originalText, 'Email client đã được mở. Vui lòng kiểm tra và gửi email!');
    }, 1000);
}

// Handle form success
function handleFormSuccess(formElement, submitBtn, originalText, message) {
    // Reset form
    formElement.reset();
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Show success message
    showSuccessMessage(message);
}

// Validate contact form
function validateForm(formData) {
    const required = ['name', 'email', 'subject', 'message'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    for (let field of required) {
        if (!formData[field] || formData[field].trim() === '') {
            showErrorMessage(`Vui lòng điền ${getFieldLabel(field)}`);
            return false;
        }
    }
    
    if (!emailRegex.test(formData.email)) {
        showErrorMessage('Vui lòng nhập email hợp lệ');
        return false;
    }
    
    return true;
}

// Get field label for validation messages
function getFieldLabel(field) {
    const labels = {
        name: 'họ và tên',
        email: 'email',
        subject: 'chủ đề',
        message: 'tin nhắn'
    };
    return labels[field] || field;
}

// Show success message
function showSuccessMessage(message) {
    const messageElement = successMessage.querySelector('span');
    messageElement.textContent = message;
    successMessage.style.display = 'flex';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    // Create error message element if it doesn't exist
    let errorMessage = document.getElementById('errorMessage');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.id = 'errorMessage';
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i><span></span>';
        document.body.appendChild(errorMessage);
        
        // Add error message styles
        const style = document.createElement('style');
        style.textContent = `
            .error-message {
                position: fixed;
                top: 90px;
                right: 20px;
                background: linear-gradient(135deg, #f44336, #d32f2f);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3);
                display: none;
                align-items: center;
                gap: 0.5rem;
                z-index: 1500;
                animation: slideInRight 0.5s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
    
    const messageElement = errorMessage.querySelector('span');
    messageElement.textContent = message;
    errorMessage.style.display = 'flex';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images when they come into view
const observeImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', observeImages);

// ===== UTILITY FUNCTIONS =====
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', function(event) {
    // Handle navigation with arrow keys
    if (event.altKey) {
        const sections = ['home', 'about', 'skills', 'portfolio', 'hobbies', 'members', 'contact'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (event.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            showSection(sections[currentIndex + 1]);
        } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(sections[currentIndex - 1]);
        }
    }
    
    // Debug hotkey - press Ctrl+Shift+T to test navigation
    if (event.ctrlKey && event.shiftKey && event.key === 'T') {
        testNavigation();
    }
});

// ===== ADDITIONAL MODAL STYLES =====
// Add styles for member detail modal
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .member-detail {
        max-height: 70vh;
        overflow-y: auto;
    }
    
    .member-detail-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 2px solid #f0f0f0;
    }
    
    .member-detail-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e91e63, #9c27b0);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2.5rem;
        flex-shrink: 0;
    }
    
    .member-detail-info h2 {
        color: #333;
        margin-bottom: 0.5rem;
        font-size: 1.8rem;
    }
    
    .member-detail-role {
        color: #e91e63;
        font-weight: 600;
        font-size: 1.1rem;
    }
    
    .member-section {
        margin-bottom: 2rem;
    }
    
    .member-section h3 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .member-section h3 i {
        color: #e91e63;
    }
    
    .member-skills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .skill-tag {
        background: linear-gradient(135deg, #e91e63, #9c27b0);
        color: white;
        padding: 0.4rem 0.8rem;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .member-hobbies {
        list-style: none;
        padding: 0;
    }
    
    .member-hobbies li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: #555;
    }
    
    .member-hobbies i {
        color: #e91e63;
        font-size: 0.8rem;
    }
    
    .member-contact {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
    }
    
    .contact-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.8rem 1rem;
        border-radius: 10px;
        text-decoration: none;
        color: white;
        font-weight: 600;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }
    
    .contact-btn.facebook {
        background: #1877f2;
    }
    
    .contact-btn.email {
        background: #ea4335;
    }
    
    .contact-btn.phone {
        background: #4caf50;
    }
    
    .contact-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    @media (max-width: 768px) {
        .member-detail-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
        }
        
        .member-contact {
            grid-template-columns: 1fr;
        }
        
        .member-detail-avatar {
            width: 80px;
            height: 80px;
            font-size: 2rem;
        }
    }
`;
document.head.appendChild(modalStyles);

// ===== AVATAR UPLOAD FUNCTIONALITY =====
function uploadAvatar(memberId, input) {
    console.log('Uploading avatar for:', memberId);
    
    const file = input.files[0];
    if (!file) {
        console.log('No file selected');
        return;
    }
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh!');
        return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn! Vui lòng chọn file dưới 5MB.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatarContainer = document.getElementById(`avatar-${memberId}`);
        const avatarImg = avatarContainer.querySelector('.avatar-img');
        const avatarIcon = avatarContainer.querySelector('.avatar-icon');
        
        // Set image source
        avatarImg.src = e.target.result;
        
        // Show image and hide icon
        avatarImg.style.display = 'block';
        avatarIcon.style.display = 'none';
        
        console.log(`Avatar uploaded successfully for ${memberId}`);
        
        // Optional: Save to localStorage for persistence
        localStorage.setItem(`avatar-${memberId}`, e.target.result);
    };
    
    reader.readAsDataURL(file);
}

// Load saved avatars on page load
function loadSavedAvatars() {
    const memberIds = ['member1', 'member2', 'member3', 'member4', 'member5'];
    
    memberIds.forEach(memberId => {
        const savedAvatar = localStorage.getItem(`avatar-${memberId}`);
        if (savedAvatar) {
            const avatarContainer = document.getElementById(`avatar-${memberId}`);
            const avatarImg = avatarContainer.querySelector('.avatar-img');
            const avatarIcon = avatarContainer.querySelector('.avatar-icon');
            
            // Only update if there's a saved custom avatar
            avatarImg.src = savedAvatar;
            avatarImg.style.display = 'block';
            avatarIcon.style.display = 'none';
        }
    });
}

// Load saved data when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadSavedAvatars();
    loadHobbyGalleries();
    updateHobbyGalleriesWithSlides();
    
    // Initialize slideshows with delay to ensure DOM is fully loaded
    setTimeout(() => {
        initializeSlideshows();
        setupHobbyCardEvents();
    }, 100);
});

// Setup hover events for hobby cards
function setupHobbyCardEvents() {
    const hobbyCards = document.querySelectorAll('.hobby-card');
    
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const slideshow = card.querySelector('.hobby-slideshow');
            if (slideshow) {
                stopSlideshow(slideshow.id);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const slideshow = card.querySelector('.hobby-slideshow');
            if (slideshow) {
                startSlideshow(slideshow.id);
            }
        });
    });
}

// Add CSS for email modal
const emailModalStyles = document.createElement('style');
emailModalStyles.textContent = `
    .email-modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
    }
    
    .email-modal-content {
        background: white;
        border-radius: 20px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        animation: emailModalSlideIn 0.3s ease;
    }
    
    @keyframes emailModalSlideIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .email-modal-header {
        background: linear-gradient(135deg, #e91e63, #9c27b0);
        color: white;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .email-modal-header h3 {
        margin: 0;
        font-size: 1.2rem;
    }
    
    .email-close {
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
        transition: opacity 0.3s;
    }
    
    .email-close:hover {
        opacity: 0.7;
    }
    
    .email-modal-body {
        padding: 2rem;
    }
    
    .email-display {
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        border-radius: 15px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        text-align: center;
        border-left: 4px solid #e91e63;
    }
    
    .email-icon {
        font-size: 2rem;
        color: #e91e63;
        margin-bottom: 0.5rem;
    }
    
    .email-text {
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
        word-break: break-all;
    }
    
    .email-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .email-btn {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        cursor: pointer;
        color: white;
    }
    
    .copy-btn {
        background: #007bff;
    }
    
    .copy-btn:hover {
        background: #0056b3;
        transform: translateY(-2px);
    }
    
    .send-btn {
        background: #28a745;
    }
    
    .send-btn:hover {
        background: #1e7e34;
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .email-actions {
            flex-direction: column;
        }
        
        .email-modal-content {
            width: 95%;
            margin: 1rem;
        }
    }
`;
document.head.appendChild(emailModalStyles);

// Add CSS for lightbox modal
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox-modal {
        display: none;
        position: fixed;
        z-index: 20000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        justify-content: center;
        align-items: center;
        animation: lightboxFadeIn 0.3s ease;
    }
    
    @keyframes lightboxFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
        animation: lightboxSlideIn 0.3s ease;
    }
    
    @keyframes lightboxSlideIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        font-weight: bold;
        cursor: pointer;
        z-index: 1001;
        transition: opacity 0.3s;
        background: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-close:hover {
        opacity: 0.7;
        background: rgba(233, 30, 99, 0.8);
    }
    
    #lightboxImage {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-caption {
        margin-top: 1rem;
        color: white;
        text-align: center;
    }
    
    .lightbox-caption h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        pointer-events: none;
    }
    
    .lightbox-nav button {
        background: rgba(233, 30, 99, 0.8);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        pointer-events: all;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-nav button:hover {
        background: rgba(233, 30, 99, 1);
        transform: scale(1.1);
    }
    
    .lightbox-nav button:active {
        transform: scale(0.95);
    }
    
    @media (max-width: 768px) {
        .lightbox-content {
            max-width: 95%;
            max-height: 85%;
        }
        
        .lightbox-close {
            top: -35px;
            font-size: 1.5rem;
            width: 35px;
            height: 35px;
        }
        
        .lightbox-nav {
            padding: 0 1rem;
        }
        
        .lightbox-nav button {
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
        
        #lightboxImage {
            max-height: 70vh;
        }
    }
`;
document.head.appendChild(lightboxStyles);

console.log('Website initialized successfully! 🚀');
