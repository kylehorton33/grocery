from django.contrib import admin

# Register your models here.
from .models import ListItem

class ListItemAdmin(admin.ModelAdmin):  # add this
  list_display = ('item', 'quantity', 'unit') # add this

# Register your models here.
admin.site.register(ListItem, ListItemAdmin) # add this