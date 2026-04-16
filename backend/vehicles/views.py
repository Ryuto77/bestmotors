from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Vehicle
from .serializers import VehicleSerializer
from transactions.models import Purchase, Expense, Sale


# ✅ THIS WAS MISSING OR DELETED
class VehicleViewSet(ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


# ✅ Your search API
@api_view(['GET'])
def search_vehicle(request):
    number = request.GET.get('number')

    try:
        vehicle = Vehicle.objects.get(vehicle_number=number)

        purchase = Purchase.objects.filter(vehicle=vehicle).first()
        sale = Sale.objects.filter(vehicle=vehicle).first()
        expenses = Expense.objects.filter(vehicle=vehicle)

        # Purchase
        purchase_data = {
            "amount": purchase.amount if purchase else 0,
            "date": purchase.date if purchase else None
        }

        # Sale
        sale_data = {
            "amount": sale.amount if sale else 0,
            "date": sale.date if sale else None
        }

        # Expenses
        expense_list = []
        total_expense = 0

        for e in expenses:
            expense_list.append({
                "type": e.type,
                "amount": e.amount,
                "date": e.date
            })
            total_expense += e.amount

        # Calculations
        profit = sale_data["amount"] - (purchase_data["amount"] + total_expense)
        total_investment = purchase_data["amount"] + total_expense
        status = "sold" if sale else "unsold"

        # Final response
        return Response({
            "vehicle": {
                "name": vehicle.name,
                "vehicle_number": vehicle.vehicle_number,
                "brand": vehicle.brand,
                "model": vehicle.model,
                "year": vehicle.year,
                "km_driven": vehicle.km_driven,
                "cover_image": request.build_absolute_uri(vehicle.cover_image.url) if vehicle.cover_image else None,
                "images": [
                    request.build_absolute_uri(img.image.url)
                    for img in vehicle.images.all()
                ]
            },
            "purchase": purchase_data,
            "expenses": expense_list,
            "total_expense": total_expense,
            "total_investment": total_investment,
            "sale": sale_data,
            "status": status,
            "profit": profit
        })

    except Vehicle.DoesNotExist:
        return Response({"error": "Vehicle not found"})