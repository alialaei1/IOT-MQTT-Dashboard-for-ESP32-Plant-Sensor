from .models import AccountDevice
from django.contrib import admin

# Register your models here.


class AccountDeviceAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'Username', 'Version','Active']
    list_filter = ['Active']
    search_fields = ['Username']


    class Meta:
        model = AccountDevice


admin.site.register(AccountDevice, AccountDeviceAdmin)
