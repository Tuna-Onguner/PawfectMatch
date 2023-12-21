from PawfectMatch.utils import dictfetchall, dictfetchone
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import pdb


class DonationView(APIView):
    @staticmethod
    def get(request) -> Response:  # noqa
        with connection.cursor() as cursor:
            ##Get the user_id from session
            user_id = request.session.get("user_id")
            role = request.session.get("role")

            if role == "adoptionorganization":
                cursor.execute("SELECT * FROM Donation WHERE ao_id = %s", (user_id,))
            else:
                cursor.execute("SELECT * FROM Donation WHERE donor_id = %s", (user_id,))

            donations = dictfetchall(cursor)

            if len(donations) == 0:
                return Response(
                    data={"message": "No donations found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            return Response(data=donations, status=status.HTTP_200_OK)

    @staticmethod
    def post(request) -> Response:
        donor_id = request.data.get("donor_id")
        ao_id = request.data.get("ao_id")
        amount = request.data.get("amount")
        currency = request.data.get("currency", "usd")  # Set 'usd' as default value

        if not donor_id or not ao_id or not amount:
            return Response(
                data={"message": "Missing required fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        elif float(amount) <= 0:
            return Response(
                data={"message": "Amount must be greater than 0"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        else:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO Donation (donor_id, ao_id, amount, currency) VALUES (%s, %s, %s, %s)",
                    (
                        donor_id,
                        ao_id,
                        amount,
                        currency,
                    ),
                )

                donation_id = cursor.lastrowid

                cursor.execute(
                    "SELECT * FROM Donation WHERE donation_id = %s", (donation_id,)
                )

                donation = dictfetchone(cursor)

                return Response(data=donation, status=status.HTTP_201_CREATED)


class DonationDetailView(APIView):
    @staticmethod
    def get(request, _id) -> Response:  # noqa
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Donation WHERE donation_id = %s", (_id,))

            donation = dictfetchone(cursor)

            if len(donation) == 0:
                return Response(
                    {"message": "Donation not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            return Response(data=donation, status=status.HTTP_200_OK)

    @staticmethod
    def put(request, _id) -> Response:
        fields = ["donor_id", "ao_id", "amount", "currency"]
        update = [f"{field} = %s" for field in fields if field in request.data]
        values = [request.data[field] for field in fields if field in request.data]

        if len(update) == 0:
            return Response(
                data={"message": "No fields provided for update"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE Donation SET {', '.join(update)} WHERE donation_id = %s",
                (
                    *values,
                    _id,
                ),
            )

            cursor.execute("SELECT * FROM Donation WHERE donation_id = %s", (_id,))

            donation = dictfetchone(cursor)

            return Response(data=donation, status=status.HTTP_200_OK)

    @staticmethod
    def delete(request, _id) -> Response:  # noqa
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Donation WHERE donation_id = %s", (_id,))

            donation = dictfetchone(cursor)

            if len(donation) == 0:
                return Response(
                    data={"message": "Donation not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            cursor.execute("DELETE FROM Donation WHERE donation_id = %s", (_id,))

            return Response(
                data={"message": "Donation deleted successfully"},
                status=status.HTTP_200_OK,
            )
