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
            attrs={'placeholder': 'device ID', 'class': 'form-control', 'id':'device_name'}),
        validators=[
            validators.MaxLengthValidator(
                limit_value=20, message='The number of characters in the username should not be more than 20 characters')
        ]
    )
    Version = forms.CharField(
        widget=forms.TextInput(

            attrs={'placeholder': 'device version', 'class': 'form-control'}),
    )
    Name = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'custom device name', 'class': 'form-control'}),
    )
    Location = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'place', 'class': 'form-control'}),
    )
    Sampling_Rate = forms.IntegerField(
        widget=forms.NumberInput(
            attrs={'placeholder': 'sampling', 'class': 'form-control', 'min': '5', 'max': '60', 'step': '5'}),
        validators=[
            validators.MaxValueValidator(
                limit_value=60, message="The maximum value is 60"),
            validators.MinValueValidator(
                limit_value=5, message="Minimum value is 5"),
        ]
    )


class ExportingMethods(forms.Form):

    start_date = forms.CharField(
        widget=forms.TextInput(
            attrs={'class': 'form-control', 'type': 'text', 'id': 'date1', 'autocomplete': 'off', 'name': 'start_date', 'placeholder': 'Select'}),
    )
    end_date = forms.CharField(
        widget=forms.TextInput(
            attrs={'class': 'form-control ', 'type': 'text', 'id': 'date2', 'autocomplete': 'off', 'name': 'end_date', 'placeholder': 'Select'}),
    )

    CHOICES_Export = (
        
        ('ExcelTableExport', 'Table in Excel format'),
        ('PDFTableExport', 'Table in PDF format'),
        ('PDFChartExportParts', 'Chart - in PDF format'),
    )

    Select_Export = forms.ChoiceField(
        widget=forms.Select(
            attrs={'class': 'form-control select2'}
        ), choices=CHOICES_Export)

    Export_Parameter = (
        ('Lux', 'light'),
        ('Humidity', 'humidity'),
        ('Temperature', 'temperature'),
        ('Soil_Moisture', 'soil moisture'),
        ('Soil_tempurature', 'soil temperature'),
        ('EC', 'EC'),
        ('Total', 'Total output (light, temperature, humidity, EC and...)'),
    )

    Select_Parameter = forms.ChoiceField(
        widget=forms.Select(
            attrs={'class': 'form-control select2'}
        ), choices=Export_Parameter)
