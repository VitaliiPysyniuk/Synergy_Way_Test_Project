from django.db import models


class UserModel(models.Model):
    class Meta:
        db_table = 'users'

    username = models.CharField(max_length=40, unique=True)
    creation_time = models.DateField(auto_now_add=True)
