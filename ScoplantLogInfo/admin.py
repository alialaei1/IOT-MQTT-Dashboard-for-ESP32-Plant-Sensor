from django.contrib import admin
from .models import *

# Register your models here.

class LogInfoAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'id_device', 'Date_Log','Time_Log','Battery_Log']


    class Meta:
        model = LogInfo


admin.site.register(LogInfo, LogInfoAdmin)