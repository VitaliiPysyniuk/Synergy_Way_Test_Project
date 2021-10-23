from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.response import Response
from django.db.models import ProtectedError

from .models import GroupModel, UserGroupModel
from .serializers import GroupSerializer


class GroupListCreateView(ListCreateAPIView):
    queryset = GroupModel.objects.all()
    serializer_class = GroupSerializer


class GroupRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = GroupModel.objects.all()
    serializer_class = GroupSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            self.perform_destroy(instance)
        except ProtectedError:
            records = UserGroupModel.objects.filter(group_id=instance)
            users_in_group_id = [record.user_id for record in records]
            err = f"Can not delete this group instance because users with id: {users_in_group_id}" \
                  f" are involved in this group."
            return Response({'error': str(err)}, status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)

