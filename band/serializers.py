
from rest_framework import serializers
from .models import Band

class BandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Band
        fields = ('name','date_added','image','bio')

    def create(self,validated_data):
        name = validated_data.get('name',None)
        date_added = validated_data.get('date_added',None)
        image = validated_data.get('image',None)
        bio = validated_data.get('bio',None)
        return Band.objects.create(name=name,date_added=date_added,image=image,bio=bio)
