// chatbot.js - PROFESSIONAL EDITION (FIXED)
class ProfessionalChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.currentService = null;
        this.userName = null;
        this.conversationContext = {
            lastTopic: null,
            interestedService: null,
            budget: null,
            timeline: null
        };
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.setupEventListeners();
        this.loadPreviousSession();
        setTimeout(() => this.showWelcomeSequence(), 2000);
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-wrapper">
                <div class="chatbot-container" id="chatbotContainer">
                    <div class="chatbot-header">
                        <div class="chatbot-title">
                            <div class="bot-icon">
                                <i class="bi bi-robot"></i>
                            </div>
                            <div class="title-text">
                                <span class="main-title">Zone Creators Assistant</span>
                                <span class="sub-title">AI-Powered Business Growth</span>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbotClose" title="Close Chat" type="button">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbotMessages">
                        <!-- Messages will be inserted here -->
                    </div>
                    
                    <div class="chatbot-input">
                        <form id="chatbotForm">
                            <input type="text" id="chatbotInput" 
                                   placeholder="Type your message here..." 
                                   autocomplete="off"
                                   aria-label="Chat message input"
                                   required>
                            <button type="submit" class="chatbot-send-btn" id="chatbotSend" title="Send message">
                                <i class="bi bi-send"></i>
                            </button>
                        </form>
                    </div>
                </div>
                
                <button class="chatbot-toggle" id="chatbotToggle" title="Start conversation" type="button">
                    <i class="bi bi-chat-dots"></i>
                    <span class="notification-badge" id="notificationBadge" style="display: none;">1</span>
                </button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.container = document.getElementById('chatbotContainer');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.toggleButton = document.getElementById('chatbotToggle');
        this.closeButton = document.getElementById('chatbotClose');
        this.form = document.getElementById('chatbotForm');
        this.input = document.getElementById('chatbotInput');
        this.sendButton = document.getElementById('chatbotSend');
        this.notificationBadge = document.getElementById('notificationBadge');
    }

    setupEventListeners() {
        this.toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleChatbot();
        });
        
        this.closeButton.addEventListener('click', () => this.closeChatbot());
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserInput();
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.container.contains(e.target) && 
                !this.toggleButton.contains(e.target) &&
                e.target !== this.toggleButton) {
                this.closeChatbot();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChatbot();
            }
            if (e.key === '/' && e.ctrlKey) {
                e.preventDefault();
                this.toggleChatbot();
            }
            if (e.key === 'Enter' && e.ctrlKey && this.isOpen) {
                e.preventDefault();
                this.input.focus();
            }
        });
        
        // Auto-resize input
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 100) + 'px';
            this.scrollToBottom();
        });
        
        // Prevent form submission on enter (handled by submit button)
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserInput();
            }
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.openChatbot();
        } else {
            this.closeChatbot();
        }
    }

    openChatbot() {
        this.container.classList.add('show');
        this.toggleButton.classList.add('active');
        this.toggleButton.setAttribute('title', 'Close chat');
        this.input.focus();
        this.isOpen = true;
        this.hideNotification();
        
        // Scroll to bottom when opening
        setTimeout(() => {
            this.scrollToBottom();
        }, 100);
        
        // Add welcome if first message
        if (this.messages.length === 0) {
            this.showWelcomeSequence();
        }
    }

    closeChatbot() {
        this.container.classList.remove('show');
        this.toggleButton.classList.remove('active');
        this.toggleButton.setAttribute('title', 'Start conversation');
        this.isOpen = false;
        this.saveSession();
    }

    showWelcomeSequence() {
        const welcomeMessages = [
            {
                type: 'bot',
                text: "👋 Welcome to Zone Creators! I'm your AI assistant, here to help you grow your business.",
                delay: 300
            },
            {
                type: 'bot',
                text: "I can help you explore our services, get pricing information, understand our process, or answer any questions about business growth and marketing.",
                delay: 1000
            },
            {
                type: 'bot',
                text: "What would you like to know about today?",
                delay: 1700
            }
        ];
        
        welcomeMessages.forEach((msg, index) => {
            setTimeout(() => {
                if (msg.type === 'bot') {
                    this.addBotMessage(msg.text, index === welcomeMessages.length - 1);
                }
            }, msg.delay);
        });
        
        // Show quick suggestions after welcome
        setTimeout(() => {
            this.showQuickSuggestions([
                "Tell me about your services",
                "What's your pricing?",
                "How does your process work?",
                "Can I see case studies?"
            ]);
        }, 2300);
    }

    async handleUserInput() {
        const message = this.input.value.trim();
        
        if (!message || this.isTyping) return;
        
        this.addUserMessage(message);
        this.input.value = '';
        this.input.style.height = 'auto';
        this.input.focus();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process after delay for natural feel
        setTimeout(async () => {
            await this.processUserMessage(message);
            this.hideTypingIndicator();
        }, 800 + Math.random() * 400);
    }

    async processUserMessage(message) {
        const lowerMsg = message.toLowerCase().trim();
        
        // Update conversation context
        this.updateContext(lowerMsg);
        
        // Process based on message type
        let response = await this.generateIntelligentResponse(lowerMsg, message);
        
        // Add slight delay for typing effect
        setTimeout(() => {
            this.addBotMessage(response, true);
            
            // Show relevant follow-ups
            setTimeout(() => {
                this.showContextualSuggestions();
            }, 500);
        }, 500);
    }

    async generateIntelligentResponse(lowerMsg, originalMsg) {
        // Service inquiries
        if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('what do you do')) {
            this.conversationContext.interestedService = 'general';
            return this.getServicesOverview();
        }
        
        // Pricing inquiries
        else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
            this.conversationContext.budget = 'inquired';
            return this.getPricingInformation();
        }
        
        // Process inquiries
        else if (lowerMsg.includes('process') || lowerMsg.includes('work') || lowerMsg.includes('how do you')) {
            return this.getProcessInformation();
        }
        
        // Contact inquiries
        else if (lowerMsg.includes('contact') || lowerMsg.includes('call') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
            return this.getContactInformation();
        }
        
        // Timeline inquiries
        else if (lowerMsg.includes('time') || lowerMsg.includes('long') || lowerMsg.includes('duration') || lowerMsg.includes('when')) {
            this.conversationContext.timeline = 'inquired';
            return this.getTimelineInformation();
        }
        
        // Greetings
        else if (lowerMsg.match(/(hello|hi|hey|good morning|good afternoon|good evening)/)) {
            const greetings = [
                "Hello! 👋 How can I assist you today?",
                "Hi there! Ready to grow your business?",
                "Hey! Great to see you here. What can I help you with?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Thanks
        else if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
            return "You're welcome! 😊 Is there anything else I can help you with today?";
        }
        
        // Specific service inquiries
        else if (this.checkForSpecificService(lowerMsg)) {
            return this.getServiceDetails(this.checkForSpecificService(lowerMsg));
        }
        
        // Default - try to understand intent
        else {
            return this.handleComplexQuery(originalMsg);
        }
    }

    checkForSpecificService(message) {
        const services = {
            'seo': 'SEO',
            'search engine': 'SEO',
            'content': 'Content Marketing',
            'social media': 'Social Media Management',
            'instagram': 'Social Media Management',
            'facebook': 'Social Media Management',
            'brand': 'Brand Development',
            'logo': 'Logo Creation',
            'website': 'Web Development',
            'web development': 'Web Development',
            'video': 'Video Editing',
            'graphic': 'Graphic Design',
            'design': 'Graphic Design',
            'marketing': 'Online Marketing',
            'linkedin': 'LinkedIn Marketing',
            'sem': 'SEM',
            'google ads': 'SEM',
            'offline': 'Offline Marketing',
            'training': 'Marketing Team Training',
            'business': 'Business Development'
        };
        
        for (const [keyword, service] of Object.entries(services)) {
            if (message.includes(keyword)) {
                this.conversationContext.interestedService = service;
                return service;
            }
        }
        return null;
    }

    getServicesOverview() {
        return `We offer 14 comprehensive services:\n\n` +
               `🎯 **Core Services:**\n` +
               `• Content Marketing\n` +
               `• Brand Development\n` +
               `• SEO & SEM\n` +
               `• Social Media Management\n\n` +
               `💻 **Technical Services:**\n` +
               `• Web Development\n` +
               `• Graphic Design\n` +
               `• Video Editing\n\n` +
               `🚀 **Growth Services:**\n` +
               `• LinkedIn Marketing\n` +
               `• Business Development\n` +
               `• Team Training\n\n` +
               `Which area are you most interested in?`;
    }

    getPricingInformation() {
        return `💰 **Our Pricing Structure:**\n\n` +
               `We offer flexible pricing options:\n\n` +
               `• **Project-Based:** One-time services (starting at $999)\n` +
               `• **Monthly Retainers:** Ongoing support ($1,500-$5,000/month)\n` +
               `• **Custom Packages:** Multiple services bundled\n\n` +
               `Pricing depends on:\n` +
               `✓ Business size & industry\n` +
               `✓ Scope of work\n` +
               `✓ Timeline requirements\n` +
               `✓ Expected results\n\n` +
               `Would you like a **free consultation** to discuss specific pricing for your needs?`;
    }

    getProcessInformation() {
        return `🔄 **Our 5-Step Process:**\n\n` +
               `1. **Discovery Call** (Free)\n` +
               `   - Understand your business goals\n` +
               `   - Analyze current positioning\n\n` +
               `2. **Strategy Development** (1-2 weeks)\n` +
               `   - Create customized growth plan\n` +
               `   - Define KPIs & metrics\n\n` +
               `3. **Proposal & Agreement** (3-5 days)\n` +
               `   - Transparent pricing breakdown\n` +
               `   - Clear scope & timeline\n\n` +
               `4. **Execution** (Ongoing)\n` +
               `   - Weekly progress updates\n` +
               `   - Regular strategy reviews\n\n` +
               `5. **Optimization** (Continuous)\n` +
               `   - Performance analysis\n` +
               `   - Strategy refinement\n\n` +
               `We work as an **extension of your team** with full transparency.`;
    }

    getContactInformation() {
        return `📞 **Get in Touch:**\n\n` +
               `**Email:** 📧 zonecreators1106@gmail.com\n` +
               `**Phone:** 📱 +91 72008 31314\n` +
               `**Address:** 📍 30 A, NACHIVALASU,KOOTHAMPATTI (P.T), ARACHALUR, ERODE - 638101\n` +
               `**Hours:** 🕒 Mon-Fri 9AM-6PM EST\n\n` +
               `**Quick Actions:**\n` +
               `• Schedule a free consultation\n` +
               `• Request a custom proposal\n` +
               `• Ask specific questions\n\n` +
               `Would you like me to help you schedule a call?`;
    }

    getTimelineInformation() {
        return `⏱️ **Typical Timelines:**\n\n` +
               `**Quick Start (1-2 weeks):**\n` +
               `• Social Media Setup\n` +
               `• Basic SEO Audit\n` +
               `• Initial Content Plan\n\n` +
               `**Medium Term (1-3 months):**\n` +
               `• Brand Development\n` +
               `• Website Launch\n` +
               `• Campaign Execution\n\n` +
               `**Long Term (3-6+ months):**\n` +
               `• SEO Results\n` +
               `• Brand Authority\n` +
               `• Sustainable Growth\n\n` +
               `We provide **detailed timelines** during our discovery call based on your specific goals.`;
    }

    getServiceDetails(serviceName) {
        const serviceDetails = {
            'SEO': `🔍 **SEO Services:**\n\n` +
                   `We optimize your website to rank higher in search results:\n\n` +
                   `**What's included:**\n` +
                   `• Technical SEO audit\n` +
                   `• Keyword research & strategy\n` +
                   `• On-page optimization\n` +
                   `• Local SEO (Google Maps)\n` +
                   `• Monthly performance reports\n\n` +
                   `**Expected results:**\n` +
                   `✓ Increased organic traffic\n` +
                   `✓ Higher search rankings\n` +
                   `✓ More qualified leads\n` +
                   `✓ Sustainable growth\n\n` +
                   `**Timeline:** 3-6 months for significant results`,

            'Content Marketing': `📝 **Content Marketing:**\n\n` +
                                `We create strategic content that engages your audience:\n\n` +
                                `**What's included:**\n` +
                                `• Content strategy development\n` +
                                `• Blog posts & articles\n` +
                                `• Social media content\n` +
                                `• Email newsletters\n` +
                                `• Content calendar management\n\n` +
                                `**Expected results:**\n` +
                                `✓ Increased brand awareness\n` +
                                `✓ Higher engagement rates\n` +
                                `✓ More website traffic\n` +
                                `✓ Better lead generation\n\n` +
                                `**Timeline:** Immediate start, results in 1-3 months`,

            'Social Media Management': `📱 **Social Media Management:**\n\n` +
                                      `We handle your entire social media presence:\n\n` +
                                      `**What's included:**\n` +
                                      `• Platform setup & optimization\n` +
                                      `• Daily content posting\n` +
                                      `• Community management\n` +
                                      `• Hashtag strategy\n` +
                                      `• Monthly analytics reports\n\n` +
                                      `**Expected results:**\n` +
                                      `✓ Consistent brand presence\n` +
                                      `✓ Increased followers\n` +
                                      `✓ Higher engagement\n` +
                                      `✓ More website clicks\n\n` +
                                      `**Timeline:** Immediate start, growth in 30 days`
        };

        return serviceDetails[serviceName] || 
               `I can provide detailed information about our ${serviceName} services. ` +
               `Would you like specific details about what's included, pricing, or timelines?`;
    }

    handleComplexQuery(message) {
        // Try to understand the query better
        if (message.length > 50) {
            return "That's an excellent question! I understand you're asking about a detailed topic. " +
                   "For comprehensive answers about specific strategies or complex business scenarios, " +
                   "I recommend scheduling a consultation with our experts. Would you like me to help you with that?";
        }
        
        // Suggest options for unclear queries
        return "I want to make sure I understand correctly. Are you asking about:\n\n" +
               "1. Our services and what we offer\n" +
               "2. Pricing and investment required\n" +
               "3. Our process and timeline\n" +
               "4. How to get started\n\n" +
               "Or maybe something else specific?";
    }

    showQuickSuggestions(suggestions) {
        const suggestionsHTML = `
            <div class="quick-suggestions">
                <div class="suggestion-title">
                    <i class="bi bi-lightning"></i>
                    <span>Quick Questions</span>
                </div>
                <div class="suggestion-buttons">
                    ${suggestions.map(suggestion => `
                        <button type="button" class="suggestion-btn" data-question="${suggestion}">
                            <i class="bi bi-chat-right-text"></i>
                            ${suggestion}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.messagesContainer.insertAdjacentHTML('beforeend', suggestionsHTML);
        this.scrollToBottom();
        
        // Add event listeners
        const suggestionButtons = this.messagesContainer.querySelectorAll('.suggestion-btn');
        suggestionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const question = e.currentTarget.getAttribute('data-question');
                this.handleSuggestionClick(question);
            });
        });
    }

    handleSuggestionClick(question) {
        this.input.value = question;
        this.handleUserInput();
        
        // Remove suggestions
        const suggestions = this.messagesContainer.querySelector('.quick-suggestions');
        if (suggestions) {
            suggestions.style.opacity = '0';
            suggestions.style.transform = 'translateY(20px)';
            setTimeout(() => suggestions.remove(), 300);
        }
    }

    showContextualSuggestions() {
        if (this.conversationContext.interestedService) {
            const suggestions = [
                `Tell me more about ${this.conversationContext.interestedService}`,
                `What's the pricing for ${this.conversationContext.interestedService}?`,
                `How long does ${this.conversationContext.interestedService} take?`,
                `Can I see ${this.conversationContext.interestedService} case studies?`
            ];
            this.showQuickSuggestions(suggestions);
        } else if (this.conversationContext.budget) {
            this.showQuickSuggestions([
                "What's included in your packages?",
                "Do you offer payment plans?",
                "Can I get a custom quote?",
                "What's your refund policy?"
            ]);
        } else {
            this.showQuickSuggestions([
                "Tell me about your team",
                "What industries do you work with?",
                "Can you share success stories?",
                "How do I get started?"
            ]);
        }
    }

    addUserMessage(text) {
        const messageId = `msg-${Date.now()}`;
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageHTML = `
            <div class="message user" id="${messageId}">
                <div class="message-avatar">
                    <i class="bi bi-person"></i>
                </div>
                <div class="message-content-wrapper">
                    <div class="message-content">
                        ${this.escapeHtml(text)}
                    </div>
                    <div class="message-time">${timestamp}</div>
                </div>
            </div>
        `;
        
        this.messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.messages.push({ type: 'user', text, timestamp: new Date() });
        
        // Scroll to bottom after adding message
        this.scrollToBottom();
        
        // Trigger animation
        setTimeout(() => {
            const element = document.getElementById(messageId);
            if (element) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        }, 10);
    }

    addBotMessage(text, shouldScroll = true) {
        const messageId = `msg-${Date.now()}`;
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Format text with markdown-like styling
        const formattedText = this.formatMessage(text);
        
        const messageHTML = `
            <div class="message bot" id="${messageId}">
                <div class="message-avatar">
                    <i class="bi bi-robot"></i>
                </div>
                <div class="message-content-wrapper">
                    <div class="message-content">
                        ${formattedText}
                    </div>
                    <div class="message-time">${timestamp}</div>
                </div>
            </div>
        `;
        
        this.messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.messages.push({ type: 'bot', text, timestamp: new Date() });
        
        if (shouldScroll) {
            this.scrollToBottom();
        }
        
        // Trigger animation with delay for typing effect
        setTimeout(() => {
            const element = document.getElementById(messageId);
            if (element) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        }, 10);
    }

    showTypingIndicator() {
        this.isTyping = true;
        
        const typingHTML = `
            <div class="typing-indicator" id="typingIndicator">
                <span></span>
                <span></span>
                <span></span>
                <div class="typing-text">Assistant is typing...</div>
            </div>
        `;
        
        this.messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.style.opacity = '0';
            indicator.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.remove();
                }
            }, 300);
        }
    }

    formatMessage(text) {
        return this.escapeHtml(text)
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\•/g, '•')
            .replace(/🎯/g, '<span class="emoji">🎯</span>')
            .replace(/💰/g, '<span class="emoji">💰</span>')
            .replace(/🔄/g, '<span class="emoji">🔄</span>')
            .replace(/📞/g, '<span class="emoji">📞</span>')
            .replace(/⏱️/g, '<span class="emoji">⏱️</span>')
            .replace(/✓/g, '<span class="emoji">✓</span>')
            .replace(/👋/g, '<span class="emoji">👋</span>')
            .replace(/😊/g, '<span class="emoji">😊</span>')
            .replace(/(\d+)\.\s/g, '<span class="number">$1.</span> ');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    scrollToBottom() {
        // Ensure messages container exists
        if (!this.messagesContainer) return;
        
        // Use multiple methods to ensure scrolling works
        setTimeout(() => {
            // Method 1: scrollTop
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            
            // Method 2: scrollTo with smooth behavior
            this.messagesContainer.scrollTo({
                top: this.messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
            
            // Method 3: scrollIntoView for last message
            const lastMessage = this.messagesContainer.lastElementChild;
            if (lastMessage) {
                lastMessage.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            }
        }, 100);
    }

    updateContext(message) {
        // Store last topic
        this.conversationContext.lastTopic = message;
    }

    loadPreviousSession() {
        const savedMessages = localStorage.getItem('zoneChatMessages');
        if (savedMessages) {
            try {
                const parsedMessages = JSON.parse(savedMessages);
                if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
                    this.messages = parsedMessages;
                    this.showNotification();
                }
            } catch (e) {
                console.log('Could not load previous messages:', e);
                localStorage.removeItem('zoneChatMessages');
            }
        }
    }

    saveSession() {
        try {
            // Keep only the last 50 messages
            const messagesToSave = this.messages.slice(-50);
            localStorage.setItem('zoneChatMessages', JSON.stringify(messagesToSave));
        } catch (e) {
            console.log('Could not save messages:', e);
        }
    }

    showNotification() {
        if (!this.isOpen && this.notificationBadge) {
            this.notificationBadge.style.display = 'flex';
        }
    }

    hideNotification() {
        if (this.notificationBadge) {
            this.notificationBadge.style.display = 'none';
        }
    }

    // Public API methods
    openWithService(serviceId) {
        this.openChatbot();
        setTimeout(() => {
            this.addBotMessage(`I see you're interested in our services! Let me tell you about what we offer...`);
            setTimeout(() => {
                this.showServiceOptions();
            }, 1000);
        }, 500);
    }

    showServiceOptions() {
        const servicesHTML = `
            <div class="service-options">
                <div class="service-option" data-service="seo">
                    <i class="bi bi-search"></i>
                    <span>SEO</span>
                </div>
                <div class="service-option" data-service="social">
                    <i class="bi bi-instagram"></i>
                    <span>Social Media</span>
                </div>
                <div class="service-option" data-service="content">
                    <i class="bi bi-pencil-square"></i>
                    <span>Content</span>
                </div>
                <div class="service-option" data-service="brand">
                    <i class="bi bi-badge-ad"></i>
                    <span>Branding</span>
                </div>
            </div>
        `;
        
        this.messagesContainer.insertAdjacentHTML('beforeend', servicesHTML);
        this.scrollToBottom();
        
        // Add event listeners
        this.messagesContainer.querySelectorAll('.service-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const service = e.currentTarget.getAttribute('data-service');
                this.handleServiceSelection(service);
            });
        });
    }

    handleServiceSelection(service) {
        const serviceMap = {
            'seo': 'SEO',
            'social': 'Social Media Management',
            'content': 'Content Marketing',
            'brand': 'Brand Development'
        };
        
        this.conversationContext.interestedService = serviceMap[service];
        this.addBotMessage(`Great choice! ${serviceMap[service]} is one of our most popular services.`);
        
        setTimeout(() => {
            this.addBotMessage(this.getServiceDetails(serviceMap[service]));
        }, 800);
        
        // Remove service options with animation
        const options = this.messagesContainer.querySelector('.service-options');
        if (options) {
            options.style.opacity = '0';
            options.style.transform = 'scale(0.9)';
            setTimeout(() => options.remove(), 300);
        }
    }
}

// Initialize chatbot
let chatbotInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Delay initialization for better UX
    setTimeout(() => {
        try {
            chatbotInstance = new ProfessionalChatbot();
            window.ZoneCreatorsChatbot = chatbotInstance;
            
            // Auto-open on service pages after 3 seconds
            if (window.location.pathname.includes('service') || 
                window.location.pathname.includes('services')) {
                setTimeout(() => {
                    if (chatbotInstance && !chatbotInstance.isOpen) {
                        chatbotInstance.showNotification();
                    }
                }, 3000);
            }
        } catch (error) {
            console.error('Failed to initialize chatbot:', error);
        }
    }, 1000);
});

// Global helper function
function openChatbotWithService(serviceName) {
    if (chatbotInstance) {
        chatbotInstance.openChatbot();
        setTimeout(() => {
            chatbotInstance.addBotMessage(`Let me tell you about our ${serviceName} services...`);
        }, 300);
    }
}