from rest_framework.serializers import ModelSerializer

from .models import UserModel
from ..group.serializers import FullUserGroupSerializer


class UserSerializer(ModelSerializer):
    groups = FullUserGroupSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = ['id', 'username', 'creation_time', 'groups']
        extra_kwargs = {'creation_time': {'read_only': True}}
