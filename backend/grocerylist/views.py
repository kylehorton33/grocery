from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets    
from .serializers import ListItemSerializer
from .models import ListItem               

class ListItemView(viewsets.ModelViewSet): 
  serializer_class = ListItemSerializer    
  queryset = ListItem.objects.all()        