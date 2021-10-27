from django.urls import path

from .views import GroupListCreateView, GroupRetrieveUpdateDestroyView

urlpatterns = [
    path('', GroupListCreateView.as_view()),
    path('/<int:pk>', GroupRetrieveUpdateDestroyView.as_view())
]
