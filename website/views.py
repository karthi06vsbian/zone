from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Service, Client, LeadershipMember, ContactSubmission

def home_view(request):
    try:
        services = Service.objects.all()[:6]
        clients = Client.objects.all()[:6]
        team_members = LeadershipMember.objects.all()[:4]
    except Exception:
        services = []
        clients = []
        team_members = []
    context = {
        'services': services,
        'clients': clients,
        'team_members': team_members,
    }
    return render(request, 'index.html', context)


def services_view(request):
    try:
        services = Service.objects.all()
    except Exception:
        services = []
    return render(request, 'services/index.html', {'services': services})


def service_detail_view(request, pk=None):
    if pk is None:
        pk = request.GET.get('id', 1)
    
    try:
        service = Service.objects.get(pk=pk)
    except Exception:
        service = None

    try:
        all_services = Service.objects.all()
    except Exception:
        all_services = []

    context = {
        'service': service,
        'all_services': all_services,
    }
    return render(request, 'services/detail.html', context)


def about_view(request):
    try:
        team_members = LeadershipMember.objects.all()
    except Exception:
        team_members = []
    return render(request, 'about.html', {'team_members': team_members})


def clients_view(request):
    try:
        clients = Client.objects.all()
    except Exception:
        clients = []
    return render(request, 'clients.html', {'clients': clients})



def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        phone = request.POST.get('phone', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        if name and email and message:
            ContactSubmission.objects.create(
                name=name,
                email=email,
                phone=phone,
                subject=subject,
                message=message
            )
            messages.success(request, 'Thank you! Your message has been sent successfully.')
            return redirect('contact')
        else:
            messages.error(request, 'Please fill in all required fields.')

    return render(request, 'contact.html')
