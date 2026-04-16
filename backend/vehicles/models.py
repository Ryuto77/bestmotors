from django.db import models

# Create your models here.
class Vehicle(models.Model):
    name = models.CharField(max_length=100)
    vehicle_number = models.CharField(max_length=20, unique=True)
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    km_driven = models.IntegerField(null=True, blank=True)
    cover_image = models.ImageField(upload_to='vehicles/', null=True, blank=True)
    
    def __str__(self):
        return self.vehicle_number
    
class VehicleImage(models.Model):
    vehicle = models.ForeignKey('vehicles.Vehicle', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='vehicles/')

    def __str__(self):
        return f"Image for {self.vehicle.vehicle_number}"