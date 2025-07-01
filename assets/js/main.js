// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面动画
    initPageAnimations();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 初始化图片懒加载
    initLazyLoading();
    
    // 初始化页面特定功能
    initPortfolioFeatures();
    initContactForm();
    initSocialLinks();
    
    // 动画效果控制
    animateOnLoad();
    
    // 滚动动画
    initScrollAnimations();
    
    // 鼠标跟随效果
    initCursorFollower();
    
    // 滚动进度条
    initScrollProgress();
    
    // 磁性悬停效果
    initMagneticHover();
    
    // 粒子背景效果
    initParticleBackground();
});

// 页面动画初始化
function initPageAnimations() {
    // 为需要动画的元素添加fade-in类
    const animatedElements = document.querySelectorAll('.work-item, .skill-category, .section-header');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 触发动画
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
}

// 滚动效果初始化
function initScrollEffects() {
    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏背景透明度变化
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 图片懒加载初始化
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
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
    } else {
        // 降级处理：直接加载所有图片
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// 工具函数：防抖
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// 工具函数：节流
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
    };
}

// 页面加载动画
window.addEventListener('load', function() {
    // 页面完全加载后的动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 控制台日志（开发环境）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('设计师作品集网站已加载完成');
    console.log('当前页面:', window.location.pathname);
}

// 作品集页面功能
function initPortfolioFeatures() {
    // 作品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // 更新按钮状态
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // 筛选作品
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 作品详情模态框
    const modal = document.getElementById('projectModal');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        const portfolioLinks = document.querySelectorAll('.portfolio-link');

        // 打开模态框
        portfolioLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 获取项目数据
                const projectData = getProjectData(this.closest('.portfolio-item'));
                
                // 更新模态框内容
                updateModalContent(projectData);
                
                // 显示模态框
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // 关闭模态框
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // 点击模态框外部关闭
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// 获取项目数据
function getProjectData(portfolioItem) {
    const title = portfolioItem.querySelector('h3').textContent;
    const category = portfolioItem.querySelector('p').textContent;
    const categoryType = portfolioItem.getAttribute('data-category');
    
    const projectData = {
        title: title,
        category: category,
        categoryType: categoryType,
        date: '2024年',
        description: {
            overview: '这是一个详细的项目描述，包含了项目的背景、目标和解决方案。',
            challenge: '项目中遇到的主要挑战包括用户需求的多样性、技术限制和预算约束等。',
            process: '设计过程包括用户研究、概念设计、原型制作、用户测试和最终实现等阶段。',
            result: '最终项目获得了良好的用户反馈，提升了用户体验和业务指标。'
        },
        images: ['../assets/img/project-detail.jpg']
    };
    
    return projectData;
}

// 更新模态框内容
function updateModalContent(data) {
    const modal = document.getElementById('projectModal');
    
    // 更新标题
    modal.querySelector('.project-info h2').textContent = data.title;
    
    // 更新分类和日期
    const projectMeta = modal.querySelector('.project-meta');
    projectMeta.innerHTML = `
        <span class="project-category">${data.category}</span>
        <span class="project-date">${data.date}</span>
    `;
    
    // 更新描述
    const projectDescription = modal.querySelector('.project-description');
    projectDescription.innerHTML = `
        <h3>项目概述</h3>
        <p>${data.description.overview}</p>
        
        <h3>设计挑战</h3>
        <p>${data.description.challenge}</p>
        
        <h3>设计过程</h3>
        <p>${data.description.process}</p>
        
        <h3>最终成果</h3>
        <p>${data.description.result}</p>
    `;
    
    // 更新图片（如果有的话）
    if (data.images && data.images.length > 0) {
        const projectGallery = modal.querySelector('.project-gallery img');
        projectGallery.src = data.images[0];
        projectGallery.alt = data.title;
    }
}

// 联系表单功能
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // 实时表单验证
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });

        // 字符计数（用于项目描述）
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.addEventListener('input', function() {
                const length = this.value.length;
                const minLength = 20;
                
                // 更新字符计数
                let counter = this.parentNode.querySelector('.char-counter');
                if (!counter) {
                    counter = document.createElement('div');
                    counter.className = 'char-counter';
                    counter.style.cssText = `
                        font-size: 12px;
                        color: #666;
                        text-align: right;
                        margin-top: 5px;
                    `;
                    this.parentNode.appendChild(counter);
                }
                
                counter.textContent = `${length}/${minLength} 字符`;
                
                // 颜色变化
                if (length >= minLength) {
                    counter.style.color = '#27ae60';
                } else {
                    counter.style.color = '#666';
                }
            });
        }

        // 项目类型选择联动
        const projectTypeSelect = document.getElementById('project-type');
        const budgetSelect = document.getElementById('budget');
        
        if (projectTypeSelect && budgetSelect) {
            projectTypeSelect.addEventListener('change', function() {
                const projectType = this.value;
                
                // 重置预算选择
                budgetSelect.value = '';
                
                // 根据项目类型设置默认预算范围
                if (projectType === 'ui-design' || projectType === 'ux-design') {
                    budgetSelect.querySelector('option[value="10k-50k"]').selected = true;
                } else if (projectType === 'brand-design') {
                    budgetSelect.querySelector('option[value="under-10k"]').selected = true;
                } else if (projectType === 'web-design') {
                    budgetSelect.querySelector('option[value="50k-100k"]').selected = true;
                }
            });
        }
    }
}

// 表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // 验证所有字段
    if (!validateForm(form)) {
        return;
    }
    
    // 显示提交状态
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 模拟表单提交
    setTimeout(() => {
        showSuccessMessage('消息发送成功！我会在24小时内回复您。');
        
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// 表单验证
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 字段验证
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // 清除之前的错误
    clearFieldError(e);
    
    // 必填字段验证
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, '此字段为必填项');
        return false;
    }
    
    // 邮箱验证
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, '请输入有效的邮箱地址');
            return false;
        }
    }
    
    // 项目描述长度验证
    if (fieldName === 'message' && value) {
        if (value.length < 20) {
            showFieldError(field, '项目描述至少需要20个字符');
            return false;
        }
    }
    
    return true;
}

// 显示字段错误
function showFieldError(field, message) {
    // 移除之前的错误信息
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加错误样式
    field.style.borderColor = '#e74c3c';
    
    // 创建错误信息元素
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    // 插入错误信息
    field.parentNode.appendChild(errorElement);
}

// 清除字段错误
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '#e5e5e5';
}

// 显示成功消息
function showSuccessMessage(message) {
    // 创建成功消息元素
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    successElement.textContent = message;
    
    // 添加到页面
    document.body.appendChild(successElement);
    
    // 3秒后自动移除
    setTimeout(() => {
        successElement.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (successElement.parentNode) {
                successElement.parentNode.removeChild(successElement);
            }
        }, 300);
    }, 3000);
}

// 社交媒体链接处理
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.querySelector('span:last-child').textContent;
            showSocialInfo(platform);
        });
    });
}

// 显示社交媒体信息
function showSocialInfo(platform) {
    const messages = {
        '微信': '请扫描二维码或搜索微信号：designer_portfolio',
        'LinkedIn': '访问我的LinkedIn主页：linkedin.com/in/designer',
        '微博': '关注我的微博：@设计师作品集',
        'Instagram': '关注我的Instagram：@designer_portfolio'
    };
    
    const message = messages[platform] || '请通过其他方式联系我';
    showSuccessMessage(message);
}

// 添加动画样式
const additionalStyles = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// 将动画样式添加到页面
const style = document.createElement('style');
style.textContent = additionalStyles;
document.head.appendChild(style);

// 页面加载动画
function animateOnLoad() {
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-actions');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // 作品项目动画
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 1000 + index * 200);
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 添加不同的动画效果
                if (entry.target.classList.contains('animate-fade-in-up')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                } else if (entry.target.classList.contains('animate-scale-in')) {
                    entry.target.style.animation = 'scaleIn 0.6s ease-out';
                } else if (entry.target.classList.contains('animate-slide-in-left')) {
                    entry.target.style.animation = 'fadeInLeft 0.8s ease-out';
                } else if (entry.target.classList.contains('animate-slide-in-right')) {
                    entry.target.style.animation = 'fadeInRight 0.8s ease-out';
                }
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.scroll-animate, .animate-fade-in-up, .animate-scale-in, .animate-slide-in-left, .animate-slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// 鼠标跟随效果
function initCursorFollower() {
    // 创建鼠标跟随元素
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // 悬停效果
    const hoverElements = document.querySelectorAll('a, button, .work-item, .nav-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // 动画循环
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// 滚动进度条
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// 磁性悬停效果
function initMagneticHover() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}

// 粒子背景效果
function initParticleBackground() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);
    
    // 创建粒子
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(26, 26, 26, 0.1);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particlesContainer.appendChild(particle);
    }
}

// 打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 3D卡片翻转效果
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
        });
    });
}

// 波浪效果
function initWaveEffect() {
    const waveElements = document.querySelectorAll('.wave');
    
    waveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'wave 2s infinite';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = 'none';
        });
    });
}

// 霓虹灯效果
function initNeonEffect() {
    const neonElements = document.querySelectorAll('.neon-text');
    
    neonElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'neonPulse 1.5s ease-in-out infinite alternate';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = 'neonPulse 1.5s ease-in-out infinite alternate';
        });
    });
}

// 页面切换动画
function pageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
        transition.classList.add('active');
    }, 100);
    
    setTimeout(() => {
        transition.remove();
    }, 1000);
}

// 加载动画
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-spinner';
    loading.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
    `;
    document.body.appendChild(loading);
    
    setTimeout(() => {
        loading.remove();
    }, 2000);
}

// 震动效果
function shake(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// 脉冲效果
function pulse(element) {
    element.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// 发光效果
function glow(element) {
    element.style.animation = 'glow 1s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 1000);
}

// 初始化所有动画效果
document.addEventListener('DOMContentLoaded', function() {
    initFlipCards();
    initWaveEffect();
    initNeonEffect();
    
    // 为按钮添加点击效果
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            pulse(button);
        });
    });
    
    // 为链接添加点击效果
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (link.href && link.href !== window.location.href) {
                pageTransition();
            }
        });
    });
});

// 平滑滚动
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 视差滚动效果
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 初始化视差效果
document.addEventListener('DOMContentLoaded', initParallax);

// 彩虹文字动画效果
function initRainbowText() {
    const rainbowElements = document.querySelectorAll('.hero-title, .page-header h1, .section-header h2');
    
    rainbowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'rainbow 2s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = 'gradientShift 3s ease-in-out infinite';
        });
    });
}

// 彩色粒子背景效果
function initColorfulParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // 创建粒子容器
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'colorful-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(particlesContainer);
    
    // 创建彩色粒子
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// 动态渐变背景
function initDynamicGradient() {
    const gradientElements = document.querySelectorAll('.hero, .page-header, .featured-works, .skills, .portfolio-filter, .portfolio-grid, .contact-form-section');
    
    gradientElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const colors = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            ];
            
            const randomGradient = colors[Math.floor(Math.random() * colors.length)];
            this.style.background = randomGradient;
            this.style.transition = 'background 0.5s ease-in-out';
        });
        
        element.addEventListener('mouseleave', function() {
            // 恢复原始渐变
            setTimeout(() => {
                this.style.background = '';
                this.style.transition = '';
            }, 500);
        });
    });
}

// 彩色按钮悬停效果
function initColorfulButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .filter-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            this.style.background = `linear-gradient(45deg, ${randomColor}, ${colors[Math.floor(Math.random() * colors.length)]})`;
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = `0 8px 25px ${randomColor}40`;
        });
        
        button.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.background = '';
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 300);
        });
    });
}

// 彩色卡片悬停效果
function initColorfulCards() {
    const cards = document.querySelectorAll('.work-item, .skill-category, .philosophy-item, .contact-item, .portfolio-item');
    
    cards.forEach((card, index) => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const color = colors[index % colors.length];
        
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = color;
            this.style.boxShadow = `0 20px 40px ${color}30`;
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = '';
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
}

// 彩色导航栏效果
function initColorfulNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    navLinks.forEach((link, index) => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        const color = colors[index % colors.length];
        
        link.addEventListener('mouseenter', function() {
            this.style.background = `linear-gradient(45deg, ${color}, ${colors[(index + 1) % colors.length]})`;
            this.style.color = '#fff';
            this.style.transform = 'translateY(-2px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.color = '';
            this.style.transform = '';
        });
    });
}

// 彩色时间线效果
function initColorfulTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
        const color = colors[index % colors.length];
        
        const dateElement = item.querySelector('.timeline-date');
        if (dateElement) {
            dateElement.addEventListener('mouseenter', function() {
                this.style.background = `linear-gradient(45deg, ${color}, ${colors[(index + 1) % colors.length]})`;
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            dateElement.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.transform = '';
            });
        }
    });
}

// 彩色表单效果
function initColorfulForm() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach((input, index) => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
        const color = colors[index % colors.length];
        
        input.addEventListener('focus', function() {
            this.style.borderColor = color;
            this.style.boxShadow = `0 0 0 3px ${color}20`;
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
}

// 彩色滚动条效果
function initColorfulScrollbar() {
    const style = document.createElement('style');
    style.textContent = `
        ::-webkit-scrollbar {
            width: 12px;
        }
        
        ::-webkit-scrollbar-track {
            background: linear-gradient(180deg, #f1f1f1, #e1e1e1);
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            border-radius: 10px;
            border: 2px solid #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #4ecdc4, #45b7d1, #96ceb4, #feca57);
        }
    `;
    document.head.appendChild(style);
}

// 彩色选择效果
function initColorfulSelection() {
    const style = document.createElement('style');
    style.textContent = `
        ::selection {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
        }
        
        ::-moz-selection {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// 彩色加载动画
function initColorfulLoading() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'colorful-loading';
    loadingSpinner.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #ff6b6b;
        border-right: 4px solid #4ecdc4;
        border-bottom: 4px solid #45b7d1;
        border-left: 4px solid #96ceb4;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
        display: none;
    `;
    
    document.body.appendChild(loadingSpinner);
    
    // 显示加载动画
    window.showColorfulLoading = function() {
        loadingSpinner.style.display = 'block';
    };
    
    // 隐藏加载动画
    window.hideColorfulLoading = function() {
        loadingSpinner.style.display = 'none';
    };
}

// 彩色通知效果
function showColorfulNotification(message, type = 'info') {
    const colors = {
        success: '#4ecdc4',
        error: '#ff6b6b',
        warning: '#feca57',
        info: '#45b7d1'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, ${colors[type]}, ${colors[type]}dd);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 10px 30px ${colors[type]}40;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 初始化所有彩色效果
function initAllColorfulEffects() {
    initRainbowText();
    initColorfulParticles();
    initDynamicGradient();
    initColorfulButtons();
    initColorfulCards();
    initColorfulNavbar();
    initColorfulTimeline();
    initColorfulForm();
    initColorfulScrollbar();
    initColorfulSelection();
    initColorfulLoading();
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes rainbow {
            0%, 100% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// 页面加载完成后初始化彩色效果
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化彩色效果，确保页面完全加载
    setTimeout(() => {
        initAllColorfulEffects();
    }, 1000);
});

// 导出函数供其他模块使用
window.ColorfulEffects = {
    showNotification: showColorfulNotification,
    showLoading: window.showColorfulLoading,
    hideLoading: window.hideColorfulLoading
}; 