from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Purchase, Expense, Sale

admin.site.register(Purchase)
admin.site.register(Expense)
admin.site.register(Sale)