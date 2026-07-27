// animations.js - COMPLETE UPDATED VERSION WITH BEAUTIFUL LOADING ANIMATION

class AnimationManager {
    constructor() {
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupScrollAnimations();
            this.setupHoverAnimations();
            this.setupParallaxEffects();
            this.setupLoadingAnimations();
            this.setupStaggerAnimations();
            this.setupChatbotAnimations();
            this.setupCounterAnimations();
            this.setupFormAnimations();
            this.setupNavigationAnimations();
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add animation classes based on data attributes
                    const animationType = element.getAttribute('data-animation') || 'fade-up';
                    const delay = element.getAttribute('data-delay') || '0';
                    
                    element.classList.add(`animate-${animationType}`);
                    element.style.animationDelay = `${delay}ms`;
                    
                    // Remove observer after animation
                    observer.unobserve(element);
                    this.animatedElements.add(element);
                }
            });
        }, observerOptions);

        // Observe all elements with animation attributes
        document.querySelectorAll('[data-animation]').forEach(element => {
            observer.observe(element);
        });

        // Also observe service cards and detail cards
        document.querySelectorAll('.service-card, .service-detail-card').forEach(element => {
            if (!element.hasAttribute('data-animation')) {
                observer.observe(element);
            }
        });

        // Observe other animated elements
        document.querySelectorAll('.process-step, .timeline-item, .resource-item, .other-service-item').forEach(element => {
            observer.observe(element);
        });
    }

    setupHoverAnimations() {
        // Add hover effects to cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateCardHover(e.currentTarget, true);
            });

            card.addEventListener('mouseleave', (e) => {
                this.animateCardHover(e.currentTarget, false);
            });
        });

        // Add hover effects to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.animateButtonHover(e.currentTarget, true);
            });

            button.addEventListener('mouseleave', (e) => {
                this.animateButtonHover(e.currentTarget, false);
            });
        });

        // Add hover effects to navigation items
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.animateNavHover(e.currentTarget, true);
            });

            link.addEventListener('mouseleave', (e) => {
                this.animateNavHover(e.currentTarget, false);
            });
        });
    }

    animateCardHover(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 25px 60px rgba(13, 16, 47, 0.15)';
            
            // Animate the icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'rotateY(180deg) scale(1.1)';
                icon.style.background = 'linear-gradient(135deg, var(--metallic-gold), var(--light-gold))';
            }
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 15px 40px rgba(13, 16, 47, 0.08)';
            
            // Reset the icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'rotateY(0) scale(1)';
                icon.style.background = 'linear-gradient(135deg, var(--deep-blue), var(--dark-navy))';
            }
        }
    }

    animateButtonHover(button, isEntering) {
        if (isEntering) {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        } else {
            button.style.transform = 'translateY(0) scale(1)';
        }
    }

    animateNavHover(link, isEntering) {
        if (isEntering) {
            link.style.transform = 'translateY(-2px)';
        } else {
            link.style.transform = 'translateY(0)';
        }
    }

    setupParallaxEffects() {
        // Simple parallax for hero elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });

            // Parallax for hero floating elements
            const heroElements = document.querySelectorAll('.hero-element');
            heroElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupLoadingAnimations() {
        // Create beautiful loading text effect
        this.createLoadingText();
        
        // Loading overlay animation
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            // Add some random delay for natural feel
            const delay = 2000 + Math.random() * 1000;
            
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    // Trigger initial animations after load
                    this.triggerInitialAnimations();
                }, 500);
            }, delay);
        }
    }

    createLoadingText() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (!loadingOverlay) return;

        // Create the main loading container
        const loadingContainer = document.createElement('div');
        loadingContainer.className = 'zone-creators-loading';
        loadingContainer.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 1001;
        `;

        // Create the "Zone Creators" text with individual letters
        const text = "ZONE CREATORS";
        const lettersContainer = document.createElement('div');
        lettersContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 4px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        `;

        // Create each letter with glowing effect
        text.split('').forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'loading-letter';
            letterSpan.style.cssText = `
                font-family: 'Montserrat', sans-serif;
                font-size: 4.5rem;
                font-weight: 800;
                color: #fff;
                text-shadow: 0 0 10px #fff,
                             0 0 20px #fff,
                             0 0 30px #007bff,
                             0 0 40px #007bff,
                             0 0 50px #007bff,
                             0 0 60px #007bff,
                             0 0 70px #007bff;
                opacity: 0;
                transform: translateY(20px);
                animation: letterFloat 2s ease-in-out infinite alternate;
                animation-delay: ${index * 0.1}s;
                filter: blur(0.5px);
            `;
            lettersContainer.appendChild(letterSpan);
        });

        // Create loading dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'loading-dots';
        dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 20px;
        `;

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'loading-dot';
            dot.style.cssText = `
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: linear-gradient(135deg, #007bff, #00bfff);
                box-shadow: 0 0 15px #007bff,
                            0 0 30px #007bff,
                            0 0 45px #00bfff;
                opacity: 0;
                transform: scale(0);
                animation: dotPulse 1.5s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
            `;
            dotsContainer.appendChild(dot);
        }

        // Create glowing border effect
        const borderEffect = document.createElement('div');
        borderEffect.className = 'loading-border';
        borderEffect.style.cssText = `
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            border: 2px solid transparent;
            border-radius: 15px;
            background: linear-gradient(45deg, transparent, rgba(0, 123, 255, 0.2), transparent);
            background-clip: padding-box, border-box;
            background-origin: border-box;
            animation: borderGlow 3s linear infinite;
            z-index: -1;
        `;

        // Create background particles
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'loading-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
        `;

        // Add particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'loading-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: linear-gradient(135deg, #007bff, #00bfff);
                border-radius: 50%;
                box-shadow: 0 0 10px #007bff,
                            0 0 20px #007bff;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 5 + 3}s linear infinite;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            particlesContainer.appendChild(particle);
        }

        // Create subtitle
        const subtitle = document.createElement('div');
        subtitle.className = 'loading-subtitle';
        subtitle.textContent = 'Crafting Digital Excellence';
        subtitle.style.cssText = `
            font-family: 'Montserrat', sans-serif;
            font-size: 1.2rem;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-top: 20px;
            opacity: 0;
            animation: subtitleFade 2s ease-in-out infinite alternate;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        `;

        // Assemble everything
        loadingContainer.appendChild(lettersContainer);
        loadingContainer.appendChild(dotsContainer);
        loadingContainer.appendChild(subtitle);
        loadingContainer.appendChild(borderEffect);
        loadingContainer.appendChild(particlesContainer);
        loadingOverlay.appendChild(loadingContainer);

        // Add CSS animations
        this.addLoadingStyles();
    }

    addLoadingStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes letterFloat {
                0% {
                    opacity: 0.3;
                    transform: translateY(20px);
                    text-shadow: 0 0 10px #fff,
                                 0 0 20px #fff,
                                 0 0 30px #007bff,
                                 0 0 40px #007bff,
                                 0 0 50px #007bff,
                                 0 0 60px #007bff;
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                    text-shadow: 0 0 20px #fff,
                                 0 0 30px #fff,
                                 0 0 40px #007bff,
                                 0 0 50px #007bff,
                                 0 0 60px #007bff,
                                 0 0 70px #007bff,
                                 0 0 80px #007bff;
                }
            }

            @keyframes dotPulse {
                0%, 100% {
                    opacity: 0;
                    transform: scale(0);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2);
                }
            }

            @keyframes borderGlow {
                0% {
                    border-image: linear-gradient(45deg, 
                        rgba(0, 123, 255, 0.1),
                        rgba(0, 191, 255, 0.3),
                        rgba(0, 123, 255, 0.1)) 1;
                    box-shadow: 0 0 20px rgba(0, 123, 255, 0.1);
                }
                50% {
                    border-image: linear-gradient(45deg, 
                        rgba(0, 191, 255, 0.3),
                        rgba(0, 123, 255, 0.5),
                        rgba(0, 191, 255, 0.3)) 1;
                    box-shadow: 0 0 40px rgba(0, 123, 255, 0.3),
                                0 0 60px rgba(0, 191, 255, 0.2);
                }
                100% {
                    border-image: linear-gradient(45deg, 
                        rgba(0, 123, 255, 0.1),
                        rgba(0, 191, 255, 0.3),
                        rgba(0, 123, 255, 0.1)) 1;
                    box-shadow: 0 0 20px rgba(0, 123, 255, 0.1);
                }
            }

            @keyframes particleFloat {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(0) translateX(20px);
                }
                75% {
                    transform: translateY(20px) translateX(10px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }

            @keyframes subtitleFade {
                0% {
                    opacity: 0.3;
                    letter-spacing: 2px;
                }
                100% {
                    opacity: 0.8;
                    letter-spacing: 4px;
                }
            }

            #loadingOverlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0d102f 0%, #1a1f4b 50%, #0d102f 100%);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.5s ease;
            }

            #loadingOverlay.hidden {
                opacity: 0;
                pointer-events: none;
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
                .loading-letter {
                    font-size: 3rem !important;
                }
                
                .loading-dot {
                    width: 12px !important;
                    height: 12px !important;
                }
                
                .loading-subtitle {
                    font-size: 1rem !important;
                }
            }

            @media (max-width: 480px) {
                .loading-letter {
                    font-size: 2.2rem !important;
                }
                
                .loading-dots {
                    gap: 8px !important;
                }
                
                .loading-dot {
                    width: 10px !important;
                    height: 10px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupStaggerAnimations() {
        // Stagger animations for lists
        document.querySelectorAll('.stagger-list').forEach(list => {
            const items = list.querySelectorAll('.stagger-item');
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 100}ms`;
                item.classList.add('fade-in-up');
            });
        });

        // Stagger animations for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
        });

        // Stagger animations for timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 150}ms`;
        });
    }

    setupChatbotAnimations() {
        // Chatbot message animations
        this.setupMessageAnimations();
        
        // Chatbot toggle animation
        this.setupToggleAnimation();
    }

    setupMessageAnimations() {
        // Message animations are handled by the chatbot class
        // This is a placeholder for any additional message animations
    }

    setupToggleAnimation() {
        const toggle = document.getElementById('chatbotToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                if (toggle.classList.contains('active')) {
                    // Closing animation
                    toggle.style.transform = 'rotate(45deg) scale(0.9)';
                    setTimeout(() => {
                        toggle.style.transform = 'rotate(0) scale(1)';
                    }, 300);
                } else {
                    // Opening animation
                    toggle.style.transform = 'rotate(45deg) scale(1.1)';
                }
            });
        }
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        if (counters.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.getAttribute('data-counter'));
                        this.animateCounter(counter, target);
                        observer.unobserve(counter);
                    }
                });
            }, { 
                threshold: 0.5,
                rootMargin: '0px 0px -50px 0px'
            });
            
            counters.forEach(counter => observer.observe(counter));
        }
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // 50 steps for smooth animation
        const duration = 2000; // 2 seconds total
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
                
                // Add a little bounce effect at the end
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 100);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    setupFormAnimations() {
        // Form input animations
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                this.animateFormFocus(e.currentTarget, true);
            });

            input.addEventListener('blur', (e) => {
                this.animateFormFocus(e.currentTarget, false);
            });
        });

        // Form submission animations
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.animateFormSubmit(e.currentTarget);
            });
        });
    }

    animateFormFocus(input, isFocused) {
        if (isFocused) {
            input.style.transform = 'translateY(-2px)';
            input.style.boxShadow = '0 5px 15px rgba(181, 164, 116, 0.2)';
        } else {
            input.style.transform = 'translateY(0)';
            input.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    }

    animateFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            // Add loading animation
            const originalHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
            submitBtn.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                submitBtn.innerHTML = originalHtml;
                submitBtn.disabled = false;
                
                // Add success animation
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                setTimeout(() => {
                    submitBtn.style.background = '';
                }, 2000);
            }, 2000);
        }
    }

    setupNavigationAnimations() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar scroll animation
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    triggerInitialAnimations() {
        // Clean up loading elements before animating page
        const loadingContainer = document.querySelector('.zone-creators-loading');
        if (loadingContainer) {
            loadingContainer.style.transition = 'opacity 0.5s ease';
            loadingContainer.style.opacity = '0';
            setTimeout(() => {
                loadingContainer.remove();
            }, 500);
        }
        
        // Animate hero section
        this.animateHeroSection();
        
        // Animate page elements based on current page
        this.animatePageElements();
        
        // Start floating animations
        this.startFloatingAnimations();
    }

    animateHeroSection() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');

        if (heroTitle) {
            setTimeout(() => {
                heroTitle.classList.add('fade-in-up');
                heroTitle.style.opacity = '1';
            }, 100);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.classList.add('fade-in-up');
                heroSubtitle.style.opacity = '1';
            }, 300);
        }
        
        if (heroCta) {
            setTimeout(() => {
                heroCta.classList.add('fade-in-up');
                heroCta.style.opacity = '1';
            }, 500);
        }
    }

    animatePageElements() {
        // Get current page
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        
        switch(page) {
            case 'index':
                this.animateHomePage();
                break;
            case 'services':
                this.animateServicesPage();
                break;
            case 'service-detail':
                this.animateServiceDetailPage();
                break;
            case 'about':
                this.animateAboutPage();
                break;
            case 'contact':
                this.animateContactPage();
                break;
        }
    }

    animateHomePage() {
        // Animate service cards with staggered delay
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        });
        
        // Animate features
        const features = document.querySelectorAll('.feature-item');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add('fade-in-up');
            }, index * 150);
        });
    }

    animateServicesPage() {
        // Stagger service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 50);
        });
    }

    animateServiceDetailPage() {
        // Animate service detail sections
        const sections = document.querySelectorAll('.service-detail-card');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('animate');
            }, index * 200);
        });
        
        // Animate FAQ items
        const faqItems = document.querySelectorAll('.accordion-item');
        faqItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in-up');
            }, index * 100);
        });
    }

    animateAboutPage() {
        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in-left');
            }, index * 200);
        });
        
        // Animate team cards
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 150);
        });
        
        // Animate stats
        const stats = document.querySelectorAll('.stats-card');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add('scale-in');
            }, index * 100);
        });
    }

    animateContactPage() {
        // Animate contact cards
        const contactCards = document.querySelectorAll('.contact-info-card');
        contactCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 150);
        });
        
        // Animate form elements
        const formElements = document.querySelectorAll('.form-control, .form-select');
        formElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in-left');
            }, index * 50);
        });
    }

    startFloatingAnimations() {
        // Hero floating elements
        const heroElements = document.querySelectorAll('.hero-element');
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 1}s`;
        });
        
        // Chatbot toggle floating animation
        const chatbotToggle = document.getElementById('chatbotToggle');
        if (chatbotToggle) {
            chatbotToggle.style.animation = 'float 3s ease-in-out infinite';
        }
    }

    // Public method to manually trigger animations
    triggerAnimation(element, animationClass) {
        element.classList.add(animationClass);
    }

    // Public method to remove animations
    removeAnimation(element, animationClass) {
        element.classList.remove(animationClass);
    }

    // Public method to check if element has been animated
    isAnimated(element) {
        return this.animatedElements.has(element);
    }
}

// Initialize animation manager
const animationManager = new AnimationManager();

// Export for global access
window.AnimationManager = animationManager;

// Helper functions for common animations
window.Animations = {
    fadeIn: (element, duration = 500) => {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    },
    
    fadeOut: (element, duration = 500) => {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '1';
        requestAnimationFrame(() => {
            element.style.opacity = '0';
        });
    },
    
    slideIn: (element, direction = 'up', duration = 500) => {
        const translateMap = {
            'up': 'translateY(30px)',
            'down': 'translateY(-30px)',
            'left': 'translateX(30px)',
            'right': 'translateX(-30px)'
        };
        
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        element.style.opacity = '0';
        element.style.transform = translateMap[direction] || 'translateY(30px)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
        });
    },
    
    slideOut: (element, direction = 'up', duration = 500) => {
        const translateMap = {
            'up': 'translateY(-30px)',
            'down': 'translateY(30px)',
            'left': 'translateX(-30px)',
            'right': 'translateX(30px)'
        };
        
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        element.style.opacity = '1';
        element.style.transform = 'translate(0)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '0';
            element.style.transform = translateMap[direction] || 'translateY(-30px)';
        });
    },
    
    bounce: (element, duration = 500) => {
        element.style.transition = `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        element.style.transform = 'scale(1)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, duration);
        });
    },
    
    shake: (element, duration = 500) => {
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = 'translateX(0)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(10px)';
            setTimeout(() => {
                element.style.transform = 'translateX(-10px)';
                setTimeout(() => {
                    element.style.transform = 'translateX(0)';
                }, duration/2);
            }, duration/2);
        });
    }
};