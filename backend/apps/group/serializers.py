from rest_framework.serializers import ModelSerializer

from .models import GroupModel, UserGroupModel


class ShortGroupSerializer(ModelSerializer):
    class Meta:
        model = GroupModel
        fields = ['id', 'name']
        extra_kwargs = {'name': {'read_only': True}, 'id': {'read_only': True}}


class FullUserGroupSerializer(ModelSerializer):
    group = ShortGroupSerializer(read_only=True)

    class Meta:
        model = UserGroupModel
        fields = ['id', 'user', 'group']
        extra_kwargs = {'user': {'required': False}, 'id': {'read_only': True}}


class UserGroupSerializer(ModelSerializer):
    class Meta:
        model = UserGroupModel
        fields = ['id', 'user', 'group']


class GroupSerializer(ModelSerializer):
    users = UserGroupSerializer(many=True, required=False)

    class Meta:
        model = GroupModel
        fields = ['id', 'name', 'description', 'users']
        extra_kwargs = {'users': {'read_only': True}}


class ShortUserGroupSerializer(ModelSerializer):
    group = ShortGroupSerializer(many=True)

    class Meta:
        model = UserGroupModel
        fields = ['group']
