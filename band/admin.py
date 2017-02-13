from django.contrib import admin

from .models import Band

class BandAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name',]
# Register your models here.
admin.site.register(Band,BandAdmin)

