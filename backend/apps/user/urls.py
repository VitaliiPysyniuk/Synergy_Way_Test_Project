from django.urls import path

from .views import UserListCreateView, UserRetrieveUpdateDestroyView

urlpatterns = [
    path('', UserListCreateView.as_view(), name='get_creat_users'),
    path('<int:pk>', UserRetrieveUpdateDestroyView.as_view(), name='get_update_delete_specific_user'),
]
