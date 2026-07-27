from .models import Client, Service, LeadershipMember, ContactSubmission

def admin_dashboard_stats(request):
    if request.path.startswith('/admin/'):
        try:
            return {
                'total_clients': Client.objects.count(),
                'total_services': Service.objects.count(),
                'total_leadership': LeadershipMember.objects.count(),
                'total_messages': ContactSubmission.objects.count(),
            }
        except Exception:
            return {
                'total_clients': 0,
                'total_services': 0,
                'total_leadership': 0,
                'total_messages': 0,
            }
    return {}

