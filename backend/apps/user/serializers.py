from rest_framework.serializers import ModelSerializer

from .models import UserModel
from ..group.serializers import GroupSerializer, UserGroupSerializer


class UserSerializer(ModelSerializer):
    groups = UserGroupSerializer(many=True, required=False)

    class Meta:
        model = UserModel
        fields = ['id', 'username', 'creation_time', 'groups']
        # extra_kwargs = {'groups': {'read_only': True}, 'creation_time': {'read_only': True}}

    def create(self, validated_data):
        print(validated_data)
        if 'groups' in validated_data:
            groups = validated_data.pop('groups')
            print(groups)

        user = UserModel.objects.create(**validated_data)

        if groups:
            for group in groups:
                group['user'] = user.id
                group['group'] = group['group'].id

            user_group_serializer = UserGroupSerializer(data=groups, many=True)
            user_group_serializer.is_valid(raise_exception=True)
            user_group_serializer.save()

        return user


class FullUserSerializer(ModelSerializer):
    groups = GroupSerializer(many=True, required=False)

    class Meta:
        model = UserModel
        fields = ['id', 'username', 'creation_time', 'groups']
