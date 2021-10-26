from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework import status

from .models import UserModel
from .serializers import UserSerializer
from ..group.models import UserGroupModel, GroupModel
from ..group.serializers import UserGroupSerializer


class UserListCreateView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def create(self, request, *args, **kwargs):
        groups = None
        if 'groups' in request.data:
            groups = request.data.pop('groups')

        user_serializer = UserSerializer(data=request.data)
        try:
            user_serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'error': e.get_full_details()['username'][0]['message'].title()},
                            status=status.HTTP_400_BAD_REQUEST)

        user_serializer.save()
        user = user_serializer.data

        if groups:
            for group in groups:
                group_instance = get_object_or_404(GroupModel, pk=group['group']['id'])
                group['user'] = user.get('id')
                group['group'] = group_instance.id

            user_group_serializer = UserGroupSerializer(data=groups, many=True)
            user_group_serializer.is_valid(raise_exception=True)
            user_group_serializer.save()

        user_instance = get_object_or_404(UserModel, pk=user.get('id'))
        user_data = UserSerializer(instance=user_instance).data

        return Response(user_data, status=status.HTTP_201_CREATED)


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def update(self, request, *args, **kwargs):
        if 'groups' in request.data:
            user_id = kwargs.get('pk')
            user_groups = UserGroupModel.objects.filter(user_id=user_id)
            groups_data = request.data.pop('groups')
            groups_data = [new_group['group']['id'] for new_group in groups_data]

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

