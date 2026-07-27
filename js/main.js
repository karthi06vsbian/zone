// ../js/main.js - COMPLETE

// Services data
const services = [
    {
        id: 1,
        title: "Content Marketing",
        subtitle: "Strategy-driven content to increase brand reach and engagement",
        description: "We create strategic content plans to boost your brand's visibility and engagement across platforms with content tailored for your target audience.",
        icon: "bi-pencil-square",
        features: [
            "Social media content planning (30 / 60 / 90 days)",
            "Reels, posts, carousel content ideas",
            "Script writing (English & Tamil)",
            "Educational, promotional & branding content",
            "Platform-specific content (Instagram, Facebook, YouTube, LinkedIn)",
            "Content calendar & posting guidance"
        ],
        outcome: "Audience trust, reach & lead generation"
    },
    {
        id: 2,
        title: "Brand Development",
        subtitle: "Building strong, recognizable brands",
        description: "We develop comprehensive brand identities that resonate with your target audience and stand out in competitive markets.",
        icon: "bi-badge-ad",
        features: [
            "Brand positioning & identity creation",
            "Brand voice & tone definition",
            "Competitor analysis",
            "Brand guidelines creation",
            "Long-term brand growth roadmap"
        ],
        outcome: "Professional and consistent brand image"
    },
    {
        id: 3,
        title: "Online Marketing",
        subtitle: "Driving leads and sales through digital platforms",
        description: "Our digital marketing strategies are designed to maximize visibility and conversions across all digital touchpoints.",
        icon: "bi-globe",
        features: [
            "Social media marketing campaigns",
            "Performance-focused marketing strategy",
            "WhatsApp marketing funnels",
            "Google Business Profile optimization",
            "Influencer & collaboration strategies"
        ],
        outcome: "Increased visibility, enquiries & conversions"
    },
    {
        id: 4,
        title: "Social Media Management",
        subtitle: "End-to-end social media account management",
        description: "We handle your social media presence from strategy to execution and reporting, ensuring consistent growth.",
        icon: "bi-instagram",
        features: [
            "Instagram, Facebook & LinkedIn page management",
            "Monthly content planning & posting",
            "Caption writing & hashtag strategy",
            "Comment & basic DM handling guidance",
            "Analytics & monthly performance reports"
        ],
        outcome: "Consistent growth and professional social presence"
    },
     
    {
        id: 5,
        title: "Franchise Marketing",
        subtitle: "B2B & Corporate Marketing Solutions",
        icon: "bi-building",
        description: "Hexagon marketing solutions designed specifically for franchises and corporate clients. We provide comprehensive B2B marketing strategies with proven testimonial success from clients like Trip for Up and Ultraan Corporation.",
        features: [
            "Hexagon marketing framework implementation",
            "Franchise network expansion strategies",
            "Corporate B2B lead generation",
            "Testimonial-driven marketing campaigns",
            "Multi-location brand management",
            "Franchisee onboarding marketing support"
        ],
        outcome: "Scalable franchise growth with measurable corporate client acquisition through testimonial-proven strategies"
    },
    {
        id: 6,
        title: "SEM (Search Engine Marketing)",
        subtitle: "Instant leads through paid advertising",
        description: "ROI-focused paid advertising campaigns on search engines and display networks for immediate results.",
        icon: "bi-search",
        features: [
            "Google Ads setup & management",
            "Search, display & local ads",
            "Keyword research & ad copywriting",
            "Conversion tracking & campaign optimization"
        ],
        outcome: "Fast enquiries with ROI-focused campaigns"
    },
    {
        id: 7,
        title: "SEO (Search Engine Optimization)",
        subtitle: "Long-term organic growth on search engines",
        description: "Sustainable organic growth strategies to improve search engine rankings and drive qualified traffic.",
        icon: "bi-graph-up",
        features: [
            "Website SEO audit",
            "On-page SEO optimization",
            "Local SEO (Google Maps ranking)",
            "Keyword research & content recommendations",
            "Monthly SEO performance tracking"
        ],
        outcome: "Organic traffic and sustainable lead generation"
    },
    {
        id: 8,
        title: "Offline Marketing",
        subtitle: "Traditional marketing for local market dominance",
        description: "Traditional marketing strategies to establish local brand presence and drive physical walk-ins.",
        icon: "bi-megaphone",
        features: [
            "Flyer & pamphlet strategy",
            "Banner, flex & poster guidance",
            "Local promotions & activations",
            "Referral & partnership models",
            "Field marketing plans"
        ],
        outcome: "Strong local brand awareness and walk-ins"
    },
    {
        id: 9,
        title: "Web Development",
        subtitle: "Professional digital presence for businesses",
        description: "Custom website development with mobile-friendly and SEO-ready structures that convert visitors.",
        icon: "bi-code-slash",
        features: [
            "Business websites & landing pages",
            "Portfolio & service websites",
            "Mobile-friendly & SEO-ready structure",
            "Website content support"
        ],
        outcome: "Credibility and strong online presence"
    },
    {
        id: 10,
        title: "Marketing Team Training",
        subtitle: "Training internal teams to become result-driven marketers",
        description: "Comprehensive training programs to upskill your in-house marketing team for better results.",
        icon: "bi-people",
        features: [
            "Social media handling training",
            "Content planning & posting systems",
            "Lead handling & follow-up process",
            "Marketing psychology fundamentals",
            "Sales & marketing alignment"
        ],
        outcome: "Skilled and efficient in-house marketing team"
    },
    {
        id: 11,
        title: "Video Editing",
        subtitle: "High-retention and high-engagement video content",
        description: "Professional video editing services tailored for social media and promotional use.",
        icon: "bi-camera-reels",
        features: [
            "Reels & short-form video editing",
            "Business promotional videos",
            "Subtitles & hook-based editing",
            "Trend-based edits"
        ],
        outcome: "Higher engagement and watch time"
    },
    {
        id: 12,
        title: "Graphic Design",
        subtitle: "Creative visual branding support",
        description: "Visually appealing designs for all your marketing and branding needs.",
        icon: "bi-palette",
        features: [
            "Social media creatives",
            "Posters, banners & flyers",
            "Marketing and advertising designs"
        ],
        outcome: "Visually appealing and professional creatives"
    },
    {
        id: 13,
        title: "Logo Creation",
        subtitle: "The foundation of brand identity",
        description: "Unique and memorable logo designs that form the foundation of your brand identity.",
        icon: "bi-tag",
        features: [
            "Unique logo concepts",
            "Brand-aligned colors & typography",
            "Logo variations for digital & print use"
        ],
        outcome: "Strong and memorable brand identity"
    },
    {
        id: 14,
        title: "Business Idea & Development",
        subtitle: "From idea validation to business growth",
        description: "End-to-end support from business idea validation to growth and scaling strategies.",
        icon: "bi-lightbulb",
        features: [
            "New business idea validation",
            "Market research & feasibility study",
            "Business model development",
            "Go-to-market strategy",
            "Growth and scaling roadmap"
        ],
        outcome: "Clear business direction and scalable growth"
    }
];

// Main initialization
class ZoneCreatorsApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupLoading();
            this.setupNavbar();
            this.setupBackToTop();
            this.setupAnimations();
            this.setupContactForm();
            this.setupServiceDetail();
            this.setupCounters();
            this.setupFAQs();
        });
    }

    setupLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            // Simulate loading
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    this.triggerPageAnimations();
                }, 500);
            }, 1500);
        }
    }

    setupNavbar() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active link highlighting
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }

            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    setupBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });

            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Animate service cards
                    if (element.classList.contains('service-card')) {
                        element.classList.add('animate');
                    }
                    
                    // Animate service detail cards
                    if (element.classList.contains('service-detail-card')) {
                        element.classList.add('animate');
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements
        document.querySelectorAll('.service-card, .service-detail-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';
                submitBtn.disabled = true;
                
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success message
                    this.showNotification('Success! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                } catch (error) {
                    this.showNotification('Error sending message. Please try again.', 'error');
                } finally {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    setupServiceDetail() {
        // Handle service detail page
        if (window.location.pathname.includes('../ServiceDetail/index.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const serviceId = parseInt(urlParams.get('id')) || 1;
            const service = services.find(s => s.id === serviceId) || services[0];
            
            // Update page content
            this.updateServiceDetail(service);
        }
    }

    updateServiceDetail(service) {
        // Update page title
        document.title = `${service.title} | Zone Creators`;
        
        // Update page title and subtitle
        const pageTitle = document.getElementById('serviceTitle');
        const pageSubtitle = document.getElementById('serviceSubtitle');
        if (pageTitle) pageTitle.textContent = service.title;
        if (pageSubtitle) pageSubtitle.textContent = service.subtitle;
        
        // Update service details
        const elements = {
            'serviceTitleText': service.title,
            'serviceSubtitleText': service.subtitle,
            'serviceDescription': service.description,
            'serviceIcon': service.icon,
            'serviceOutcome': service.outcome
        };
        
        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (id === 'serviceIcon') {
                    element.className = `bi ${service.icon}`;
                } else {
                    element.textContent = elements[id];
                }
            }
        });
        
        // Update features list
        const featuresList = document.getElementById('serviceFeatures');
        if (featuresList && service.features) {
            featuresList.innerHTML = service.features.map(feature => 
                `<li class="list-group-item border-0 px-0 py-2">
                    <i class="bi bi-check-circle-fill" style="color: var(--metallic-gold);"></i>
                    <span class="ms-2">${feature}</span>
                </li>`
            ).join('');
        }
        
        // Update other services
        this.updateOtherServices(service.id);
    }

    updateOtherServices(currentServiceId) {
        const otherServicesContainer = document.getElementById('otherServices');
        if (!otherServicesContainer) return;
        
        // Get 3 random services excluding current one
        const otherServices = services
            .filter(s => s.id !== currentServiceId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        otherServicesContainer.innerHTML = otherServices.map(service => `
            <div class="col-12 mb-3">
                <div class="other-service-item">
                    <div class="other-service-icon">
                        <i class="bi ${service.icon}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1" style="color: var(--deep-blue);">${service.title}</h6>
                        <p class="small text-muted mb-0">${service.subtitle}</p>
                    </div>
                    <div>
                        <a href="../ServiceDetail/index.html?id=${service.id}" class="btn btn-sm btn-outline-primary">View</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupCounters() {
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
            }, { threshold: 0.5 });
            
            counters.forEach(counter => observer.observe(counter));
        }
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    setupFAQs() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            }
        });
    }

    triggerPageAnimations() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-element');
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 1}s`;
        });
        
        // Animate service cards with delay
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="bi bi-x"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: white;
            border-radius: 10px;
            padding: 15px 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            z-index: 9999;
            animation: fadeInUp 0.3s ease;
            border-left: 4px solid ${this.getNotificationColor(type)};
        `;
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'bi-check-circle-fill',
            'error': 'bi-exclamation-circle-fill',
            'warning': 'bi-exclamation-triangle-fill',
            'info': 'bi-info-circle-fill'
        };
        return icons[type] || 'bi-info-circle-fill';
    }

    getNotificationColor(type) {
        const colors = {
            'success': '#28a745',
            'error': '#dc3545',
            'warning': '#ffc107',
            'info': '#17a2b8'
        };
        return colors[type] || '#17a2b8';
    }
}






// Initialize the app
const app = new ZoneCreatorsApp();

// Export for global access
window.ZoneCreatorsApp = app;