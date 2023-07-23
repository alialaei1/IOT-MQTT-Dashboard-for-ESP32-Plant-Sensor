import uuid
from django.db import models

# Create your models here.

class AccountDevice(models.Model):
    Username = models.CharField(max_length=64,unique=True)
    Version = models.CharField(max_length=64)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    MQTT_ID = models.CharField(max_length=64)
    MQTT_USERNAME = models.CharField(max_length=64)
    MQTT_PASSWORD = models.CharField(max_length=64)
    MQTT_PUB = models.CharField(max_length=64)
    MQTT_SUB = models.CharField(max_length=64)
    Date = models.DateTimeField(auto_now=True)
    Active = models.BooleanField(default=False,editable=False ,help_text="Warning! Do Not Active This")

    def __str__(self):
        return self.Username