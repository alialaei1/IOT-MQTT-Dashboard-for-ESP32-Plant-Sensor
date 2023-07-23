from django import forms
from django.core import validators
from django.db.models import fields
from django.db.models.base import Model
from django.forms.widgets import Select
from .models import *
# from bootstrap_datepicker_plus import DatePickerInput


class AddNewDevice(forms.Form):
    # Auth With models : Username, Password, Number
    Username = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'شناسه کاربری دستگاه', 'class': 'form-control', 'id':'device_name'}),
        validators=[
            validators.MaxLengthValidator(
                limit_value=20, message='تعداد کاراکترهای نام کاربری نباید بیشتر از 20 کاراکتر باشد')
        ]
    )
    Version = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'ورژن دستگاه', 'class': 'form-control'}),
    )
    Name = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'نام دلخواه دستگاه', 'class': 'form-control'}),
    )
    Location = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'مکان قرارگیری دستگاه', 'class': 'form-control'}),
    )
    Sampling_Rate = forms.IntegerField(
        widget=forms.NumberInput(
            attrs={'placeholder': 'نمونه سازی به دقیقه', 'class': 'form-control', 'min': '5',  'max': '60', 'step': '5'}),
        validators=[
            validators.MaxValueValidator(
                limit_value=60, message="حداکثر مقدار 60 است"),
            validators.MinValueValidator(
                limit_value=5, message="حداقل مقدار 5 است"),
        ]
    )


class ExportingMethods(forms.Form):

    start_date = forms.CharField(
        widget=forms.TextInput(
            attrs={'class': 'form-control', 'type': 'text', 'id': 'date1', 'autocomplete': 'off', 'name': 'start_date', 'placeholder': 'انتخاب'}),
    )
    end_date = forms.CharField(
        widget=forms.TextInput(
            attrs={'class': 'form-control ', 'type': 'text', 'id': 'date2', 'autocomplete': 'off', 'name': 'end_date', 'placeholder': 'انتخاب'}),
    )

    CHOICES_Export = (
        ('ExcelTableExport', 'جدولی در قالب Excel'),
        ('PDFTableExport', 'جدولی در قالب PDF'),
        ('PDFChartExportParts', 'نموداری - در قالب PDF'),
    )

    Select_Export = forms.ChoiceField(
        widget=forms.Select(
            attrs={'class': 'form-control select2'}
        ), choices=CHOICES_Export)

    Export_Parameter = (
        ('Lux', 'نور'),
        ('Humidity', 'رطوبت'),
        ('Temperature', 'دما'),
        ('Soil_Moisture', 'رطوبت خاک'),
        ('Soil_tempurature', 'دمای خاک'),
        ('EC', 'EC'),
        ('Total', 'خروجی جامع (نور، دما، رطوبت، EC و...)'),
    )

    Select_Parameter = forms.ChoiceField(
        widget=forms.Select(
            attrs={'class': 'form-control select2'}
        ), choices=Export_Parameter)
