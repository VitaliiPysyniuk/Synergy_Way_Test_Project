from rest_framework.serializers import ModelSerializer

from .models import GroupModel, UserGroupModel


class GroupSerializer(ModelSerializer):
    class Meta:
        model = GroupModel
        fields = ['id', 'name', 'description', 'users']
        extra_kwargs = {'users': {'read_only': True}}


class UserGroupSerializer(ModelSerializer):
    class Meta:
        model = UserGroupModel
        fields = ['id', 'user', 'group']
        extra_kwargs = {'user': {'required': False}}
