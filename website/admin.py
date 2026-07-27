from django.contrib import admin
from .models import Service, Client, LeadershipMember, ContactSubmission

admin.site.site_header = "Zone Creators Control Panel"
admin.site.site_title = "Zone Creators Admin"
admin.site.index_title = "Business Incubator Control Dashboard"

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'order')
    list_editable = ('order',)
    search_fields = ('title', 'short_description')

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'industry', 'rating', 'since', 'created_at')
    list_filter = ('industry',)
    search_fields = ('name', 'description')

@admin.register(LeadershipMember)
class LeadershipMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'role', 'description')

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'submitted_at')
    readonly_fields = ('name', 'email', 'phone', 'subject', 'message', 'submitted_at')
    search_fields = ('name', 'email', 'message')
