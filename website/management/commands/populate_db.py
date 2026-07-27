from django.core.management.base import BaseCommand
from website.models import Service, Client, LeadershipMember

class Command(BaseCommand):
    help = 'Populates initial services, clients, and leadership members into SQLite database'

    def handle(self, *args, **kwargs):
        self.stdout.write("Populating database...")

        # 1. Services
        services_data = [
            {
                "id": 1,
                "title": "Content Marketing",
                "subtitle": "Strategy-driven content to increase brand reach",
                "icon_class": "bi-pencil-square",
                "short_description": "We create strategic content plans to boost your brand's visibility and engagement across platforms.",
                "detailed_description": "Content marketing is the backbone of digital visibility. We produce high-converting copy, blog articles, social media calendars, and visual graphics designed to position your business as an industry authority.",
                "order": 1
            },
            {
                "id": 2,
                "title": "Brand Development",
                "subtitle": "Building strong, recognizable brands",
                "icon_class": "bi-badge-ad",
                "short_description": "We develop comprehensive brand identities that resonate with your target audience.",
                "detailed_description": "From logo design and brand guidelines to voice, positioning, and visual assets, we craft cohesive brand identities that captivate and build trust.",
                "order": 2
            },
            {
                "id": 3,
                "title": "Online Marketing",
                "subtitle": "Driving leads and sales through digital platforms",
                "icon_class": "bi-globe",
                "short_description": "Our digital marketing strategies maximize visibility and conversions across search & social media.",
                "detailed_description": "We execute targeted PPC campaigns, Social Media Marketing (SMM), and Search Engine Optimization (SEO) strategies to deliver qualified leads to your business.",
                "order": 3
            },
            {
                "id": 4,
                "title": "SEO & Web Development",
                "subtitle": "High-performance web solutions built for search",
                "icon_class": "bi-code-slash",
                "short_description": "Modern web development integrated with top-tier Search Engine Optimization.",
                "detailed_description": "We design and build lightning-fast, mobile-optimized websites optimized for google rankings and high conversion rates.",
                "order": 4
            },
            {
                "id": 5,
                "title": "Franchise & Retail Expansion",
                "subtitle": "Scaling retail operations & franchise networks",
                "icon_class": "bi-shop",
                "short_description": "Strategic expansion blueprints for retail chains and franchise networks.",
                "detailed_description": "We provide end-to-end franchise development frameworks, local store marketing, and operational launch strategies.",
                "order": 5
            },
            {
                "id": 6,
                "title": "Business Incubation",
                "subtitle": "From startup validation to sustainable growth",
                "icon_class": "bi-rocket-takeoff",
                "short_description": "Comprehensive incubational support for early-stage and growing ventures.",
                "detailed_description": "We act as your growth partner, validating business models, optimizing sales funnels, and building long-term scaling strategy.",
                "order": 6
            }
        ]

        for item in services_data:
            Service.objects.update_or_create(id=item["id"], defaults=item)

        # 2. Clients
        clients_data = [
            {
                "name": "Altron Computers",
                "industry": "retail",
                "industry_display": "Retail • Tech",
                "description": "Leading computer hardware and software retail store providing enterprise and consumer IT solutions.",
                "logo_url": "/static/altron.jpeg",
                "rating": 5.0,
                "since": "2023",
                "website": "https://www.instagram.com/zonecreators_client_page"
            },
            {
                "name": "Apex Fitness Studio",
                "industry": "fitness",
                "industry_display": "Fitness • Health",
                "description": "Modern health and wellness center offering customized fitness coaching and nutritional guidance.",
                "rating": 4.9,
                "since": "2024"
            },
            {
                "name": "Horizon Builders",
                "industry": "construction",
                "industry_display": "Construction • Architecture",
                "description": "Premier residential and commercial construction agency specializing in modern eco-friendly architecture.",
                "rating": 5.0,
                "since": "2022"
            }
        ]

        for item in clients_data:
            Client.objects.update_or_create(name=item["name"], defaults=item)

        # 3. Leadership
        team_data = [
            {
                "name": "Zone Team Lead",
                "role": "Founder & Business Incubator",
                "image_url": "/static/founder.jpg",
                "description": "Visionary entrepreneur with extensive experience in business growth, branding, and incubation.",
                "order": 1
            }
        ]

        for item in team_data:
            LeadershipMember.objects.update_or_create(name=item["name"], defaults=item)

        self.stdout.write(self.style.SUCCESS("Database successfully populated!"))
