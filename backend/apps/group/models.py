from django.db import models

from ..user.models import UserModel


class GroupModel(models.Model):
    class Meta:
        db_table = 'groups'

    name = models.CharField(max_length=40, unique=True)
    description = models.CharField(max_length=255)


class UserGroupModel(models.Model):
    class Meta:
        db_table = 'groups_users'

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='groups')
    group = models.ForeignKey(GroupModel, on_delete=models.PROTECT, related_name='users')

