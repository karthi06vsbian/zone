from .models import Client, Service, LeadershipMember, ContactSubmission

def admin_dashboard_stats(request):
    if request.path.startswith('/admin/'):
        return {
            'total_clients': Client.objects.count(),
            'total_services': Service.objects.count(),
            'total_leadership': LeadershipMember.objects.count(),
            'total_messages': ContactSubmission.objects.count(),
        }
    return {}
