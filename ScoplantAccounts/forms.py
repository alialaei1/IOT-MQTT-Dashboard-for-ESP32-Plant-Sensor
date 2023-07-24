from django import forms
from django.contrib.auth.models import User
from django.core import validators
# Form Sign Up
class SignUpForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'Username', 'class': 'input100','id':'signupUsernameInput'}),
        validators=[
            validators.MaxLengthValidator(limit_value=20, message='The number of characters in the username should not be more than 20 characters')
        ]
    )

    email = forms.EmailField(
        widget=forms.EmailInput(
            attrs={'placeholder': 'email', 'class': 'input100'}),
        validators=[
            validators.EmailValidator('Email entered is not valid')
        ]
    )

    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={'placeholder': 'password', 'class': 'input100'}),
        label='password'
    )

    re_password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={'placeholder': 'repeat password', 'class': 'input100'}),
    )

    def clean_email(self):
        email = self.cleaned_data["email"]
        is_exist_email = User.objects.filter(email=email).exists()

        if is_exist_email:
            raise forms.ValidationError('There is a user with this email')
        return email

    def clean_username(self):
        username = self.cleaned_data["username"]
        is_exist_user_by_username = User.objects.filter(
            username=username).exists()

        if is_exist_user_by_username:
            raise forms.ValidationError('A user with this username exists')
        return username

    def clean_re_password(self):
        password = self.cleaned_data.get('password')
        re_password = self.cleaned_data.get('re_password')

        if password != re_password:
            raise forms.ValidationError('passwords are inconsistent')
        return password

class LoginForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'Username', 'class': 'input100'}),
    )

    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={'placeholder': 'Password', 'class': 'input100'}),
    )

    def clean_username(self):
        username = self.cleaned_data["username"]
        is_exists_user = User.objects.filter(username=username).exists()
        if not is_exists_user:
            raise forms.ValidationError('User with this username was not found')
        return username

class ForgotPasswordForm(forms.Form):
    Username = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'Enter email', 'class': 'input100','type':'email','name':'text1'}),
    )

    def clean_username(self):
        username = self.cleaned_data["Username"]
        is_exists_user = User.objects.filter(email=username).exists()
        if not is_exists_user:
            raise forms.ValidationError('User not found!')
        return username

