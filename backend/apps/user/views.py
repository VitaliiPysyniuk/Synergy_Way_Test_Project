from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status

from .models import UserModel
from .serializers import UserSerializer
from ..group.models import UserGroupModel
from ..group.serializers import UserGroupSerializer


class UserListCreateView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()

        return Response(user_serializer.data, status=status.HTTP_201_CREATED)


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def update(self, request, *args, **kwargs):
        if 'groups' in request.data:
            user_id = kwargs.get('pk')
            user_groups = UserGroupModel.objects.filter(user_id=user_id)
            groups_data = request.data.pop('groups')
            groups_data = [new_group['group'] for new_group in groups_data]

            for group in user_groups:
                if group.group.id in groups_data:
                    groups_data.remove(group.group.id)
                else:
                    group.delete()

            if len(groups_data) > 0:
                for new_group in groups_data:
                    user_group_serializer = UserGroupSerializer(
                        data={
                            'user': user_id,
                            'group': new_group
                        })
                    user_group_serializer.is_valid(raise_exception=True)
                    user_group_serializer.save()

        return super().update(request, *args, **kwargs)

