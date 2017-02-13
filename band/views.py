from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes
from serializers import BandSerializer
from rest_framework.response import Response
from band.models import Band

def index(request):
    return render(request,'band/index.html')

def all_bands(request):
    return render(request,'band/all_bands.html')

# Create your views here.
def band(request,band_id):
    band = Band.objects.get(pk=band_id)
    return render(request,'band/band.html',{'band':band})

class BandDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Band.objects.all()
    serializer_class = BandSerializer


class BandList(generics.ListCreateAPIView):
    queryset = Band.objects.all()
    serializer_class = BandSerializer
    def get(self,request,format=None):
        band = Band.objects.all().order_by('-date_added')
        serializer = BandSerializer(band,many=True)
        return Response(serializer.data)

    @permission_classes((IsAdminUser,))
    def post(self,request,format=None):
        serializer =BandSerializer(data=request.data,context=None)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
