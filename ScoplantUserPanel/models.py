from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class AddDeviceInfo(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.IntegerField(primary_key=True)
    Username = models.CharField(max_length=64)
    Version = models.CharField(max_length=64)
    Name = models.CharField(max_length=64)
    Location = models.CharField(max_length=64)
    Time = models.TimeField(auto_now=True)
    Date = models.CharField(max_length=10)
    Sampling_Rate = models.IntegerField(default=60)

    def __str__(self):
        return self.Username