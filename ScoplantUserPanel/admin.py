from .models import *
from django.contrib import admin

# Register your models here.


class AddDeviceInfoAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'User', 'Name', 'Location', 'Date', 'Time']
    search_fields = ['Name', 'Location']

    class Meta:
        model = AddDeviceInfo



admin.site.register(AddDeviceInfo, AddDeviceInfoAdmin)
