from django.db import models
from ScoplantUserPanel.models import *
import uuid
# Create your models here.


class LogInfo(models.Model):
    # The device username beacus its uniqu
    id_device = models.ForeignKey(AddDeviceInfo, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Date_Log = models.DateField(auto_now=True)
    Time_Log = models.CharField(max_length=10)
    Battery_Log = models.CharField(max_length=3)
    Lux_Log = models.CharField(max_length=10)
    Humidity_Log = models.CharField(max_length=10)
    Temperature_Log = models.CharField(max_length=10)
    SoilMoisture_Log = models.CharField(max_length=10)
    SoilTemperature_Log = models.CharField(max_length=10)
    EC_Log = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.id_device}---{self.Date_Log}-{self.Time_Log}"
