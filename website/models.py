from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=255, blank=True)
    icon_class = models.CharField(max_length=100, default='bi-globe', help_text="Bootstrap icon class e.g. bi-pencil-square")
    short_description = models.TextField()
    detailed_description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title


class Client(models.Model):
    INDUSTRY_CHOICES = [
        ('construction', 'Construction'),
        ('healthcare', 'Healthcare'),
        ('automotive', 'Automotive'),
        ('fitness', 'Fitness'),
        ('finance', 'Finance'),
        ('retail', 'Retail'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=200)
    industry = models.CharField(max_length=50, choices=INDUSTRY_CHOICES, default='retail')
    industry_display = models.CharField(max_length=100, blank=True, help_text="e.g. Retail • Fashion")
    description = models.TextField()
    logo = models.ImageField(upload_to='clients/logos/', blank=True, null=True)
    logo_url = models.URLField(blank=True, help_text="Optional direct image URL if not uploading file")
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    since = models.CharField(max_length=20, default='2024')
    instagram = models.URLField(blank=True)
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def logo_src(self):
        if self.logo:
            return self.logo.url
        elif self.logo_url:
            return self.logo_url
        return '/static/logo.jpg'


class LeadershipMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    image = models.ImageField(upload_to='leadership/', blank=True, null=True)
    image_url = models.URLField(blank=True, help_text="Optional direct photo URL")
    description = models.TextField()
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.name} - {self.role}"

    @property
    def image_src(self):
        if self.image:
            return self.image.url
        elif self.image_url:
            return self.image_url
        return '/static/logo.jpg'


class ContactSubmission(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
