from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
from rest_framework.views import APIView

from PawfectMatch.utils import dictfetchall
from .models import GranteeApp
from django.utils import timezone

from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class GranteeAppView(APIView):
    def get(self, request, ao_id, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        
        cursor.execute("SELECT * FROM AdoptionOrganization WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor.execute("SELECT * FROM GranteeApp WHERE ao_id = %s", [ao_id])
            grantee_apps = dictfetchall(cursor)
                  
        cursor.execute("SELECT * FROM Admin WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor.execute("""
            SELECT
                ga.grantee_app_id,
                ao.ao_id,
                ao.ao_name,
                ga.motivation_text,
                ga.file_path,
                ga.amount_requested,
                ga.decided_amount,
                ga.application_date,
                ga.status,
                ga.response_date
            FROM
                GranteeApplication ga
            JOIN
                AdoptionOrganization ao ON ga.ao_id = ao.ao_id
            """)
            grantee_apps = dictfetchall(cursor)
            
        return Response(grantee_apps)
        

    def post(self, request, ao_id, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        
        cursor.execute("SELECT * FROM AdoptionOrganization WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            gapp_amount = request.data.get('gapp_amount')
            gapp_file = request.data.get('gapp_file')
            gmotivation_text = request.data.get('gmotivation_text')
            
            if not gapp_file and not gmotivation_text:
                return Response({'error': 'Either file or motivation text must be provided.'}, status=status.HTTP_400_BAD_REQUEST)
            
            cursor.execute("INSERT INTO GranteeApp (ao_id, gapp_amount, gapp_file, gmotivation_text) VALUES (%s, %s, %s, %s)",
                       [ao_id, gapp_amount, gapp_file, gmotivation_text])
            
        return Response({'message': 'Grantee application created successfully.'}, status=status.HTTP_201_CREATED)

    def put(self, request, ao_id, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        
        cursor.execute("SELECT * FROM AdoptionOrganization WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            new_status = request.data.get('new_status')
            update_gapp_date = request.data.get('update_gapp_date')
            
            cursor.execute("UPDATE GranteeApp SET gapp_status = %s, gapp_response_date = CURRENT_TIMESTAMP WHERE ao_id = %s AND gapp_date = %s",
                       [new_status, ao_id, update_gapp_date])
        
        cursor.execute("SELECT * FROM Admin WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            grantee_app_id = request.data.get('grantee_app_id')
            new_status = request.data.get('new_status')
            decided_amount = request.data.get('decided_amount')
            
            if new_status == 'approved':
                cursor.execute("""
                    UPDATE GranteeApplication
                    SET status = %s, response_date = CURRENT_DATE, decided_amount = %s
                    WHERE grantee_app_id = %s
                """, [new_status, decided_amount, grantee_app_id])
            elif new_status == 'rejected':
                cursor.execute("""
                    UPDATE GranteeApplication
                    SET status = %s, response_date = CURRENT_DATE
                    WHERE grantee_app_id = %s
                """, [new_status, grantee_app_id])
            else:
                return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
     
        return Response({'message': 'Grantee application updated successfully.'}, status=status.HTTP_200_OK)

    
class AdoptionAppView(APIView):
    def get(self, request, ao_id, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        
        cursor.execute("SELECT * FROM AdoptionOrganization WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor.execute("""
                SELECT
                    AdoptionApp.adopter_id,
                    AdoptionApp.aapp_date,
                    AdoptionApp.aapp_file,
                    AdoptionApp.aapp_status,
                    AdoptionApp.amotivation_text,
                    User.user_name,
                    User.email,
                    User.phone_number
                FROM
                    AdoptionApp
                JOIN
                    Adopter ON AdoptionApp.adopter_id = Adopter.adopter_id
                JOIN
                    User ON Adopter.adopter_id = User.user_id
                WHERE
                    AdoptionApp.ao_id = %s
            """, [ao_id])
            adoption_apps = dictfetchall(cursor)
            return Response(adoption_apps)
        
        
        cursor.execute("SELECT * FROM Adopter WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor.execute("""
                SELECT a.amotivation_text, a.aapp_status, a.aapp_file
                FROM AdoptionApp a
                WHERE a.adopter_id = %s
            """, [user_id])
            adoption_apps = dictfetchall(cursor)
            return Response(adoption_apps)      
            
        return Response(adoption_apps)

    def post(self, request, ao_id, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Adopter WHERE user_id = %s", [user_id])
        
        if cursor.fetchone():
            adopter_id = request.data.get('adopter_id')
            pet_id = request.data.get('pet_id')
            aapp_file = request.data.get('aapp_file')
            amotivation_text = request.data.get('amotivation_text')
            
            if not aapp_file and not amotivation_text:
                return Response({'error': 'Either file or motivation text must be provided.'}, status=status.HTTP_400_BAD_REQUEST)

            cursor.execute("""
                INSERT INTO AdoptionApp (adopter_id, ao_id, aapp_date, pet_id, aapp_file, aapp_status, aapp_response_date, amotivation_text)
                VALUES (%s, %s, NOW(), %s, %s, 'PENDING', NULL, %s)
            """, [adopter_id, ao_id, pet_id, aapp_file, amotivation_text])

        return Response({'message': 'Adoption application created successfully.'}, status=status.HTTP_201_CREATED)

    def put(self, request, ao_id, app_id, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM AdoptionOrganization WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            application_id = request.data.get('application_id')
            new_status = request.data.get('new_status')

            if new_status in ['accepted', 'rejected']:
                cursor.execute("""
                    UPDATE AdoptionApp
                    SET aapp_status = %s
                    WHERE adopter_id = %s
                """, [new_status, application_id])
            else:
                return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Adoption application updated successfully.'}, status=status.HTTP_200_OK)


class BloggerAppView(APIView):
    def get(self, request, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        is_blogger = False
        
        cursor.execute("SELECT * FROM Blogger WHERE user_id = %s", [user_id])
        if (cursor.fetchone()):
            is_blogger = True
        
        cursor.execute("SELECT * FROM Adopter WHERE user_id = %s", [user_id])
        if cursor.fetchone() and not is_blogger:
            cursor.execute("""
                SELECT bf.blog_field_id, bf.blog_field_name, a.adopter_id, u.user_name as blogger_name
                FROM BlogField bf
                JOIN Blogger b ON bf.blog_field_id = b.blog_field_id
                JOIN Adopter a ON b.blogger_id = a.adopter_id
                JOIN User u ON a.adopter_id = u.user_id
            """)
            blogger_apps = dictfetchall(cursor)
            return Response(blogger_apps)
            
        cursor.execute("SELECT * FROM Admin WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor.execute("""
                SELECT ba.blogger_app_id, a.adopter_id, a.adopter_name, a.email, a.phone_number, ba.motivation_text, ba.file_path, ba.application_date, ba.status, ba.response_date
                FROM BloggerApplication ba
                JOIN Adopter a ON ba.adopter_id = a.adopter_id
            """)
            blogger_apps = dictfetchall(cursor)
            return Response(blogger_apps)
        
        return Response(blogger_apps)
                        
    def put(self, request, blogger_app_id, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Admin WHERE user_id = %s", [user_id])
        if not cursor.fetchone():
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        status = request.data.get('status')
        if status not in ['approved', 'rejected']:
            return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

        cursor.execute("""
            UPDATE BloggerApplication
            SET status = %s, response_date = CURRENT_DATE
            WHERE blogger_app_id = %s
        """, [status, blogger_app_id])

        return Response({'message': 'Blogger application updated successfully.'}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Adopter WHERE user_id = %s", [user_id])
        
        if cursor.fetchone():
            adopter_id = request.data.get('adopter_id')
            blog_field_id = request.data.get('blog_field_id')
            bapp_file = request.data.get('bapp_file')
            bmotivation_text = request.data.get('bmotivation_text')

            if not bapp_file and not bmotivation_text:
                return Response({'error': 'Either file or motivation text must be provided.'}, status=status.HTTP_400_BAD_REQUEST)

            cursor.execute("""
                INSERT INTO BloggerApp (adopter_id, blog_field_id, bapp_date, bapp_file, bapp_status, bapp_response_date, bmotivation_text)
                VALUES (%s, %s, NOW(), %s, 'PENDING', NULL, %s)
            """, [adopter_id, blog_field_id, bapp_file, bmotivation_text])

        return Response({'message': 'Blogger application created successfully.'}, status=status.HTTP_201_CREATED)

class ExpertAppView(APIView):
    def get(self, request, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Admin WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor.execute("""
                SELECT ea.expert_app_id, a.adopter_id, a.adopter_name, a.email, a.phone_number, ea.motivation_text, ea.file_path, ea.application_date, ea.status, ea.response_date
                FROM ExpertApplication ea
                JOIN Adopter a ON ea.adopter_id = a.adopter_id
            """)
            expert_apps = dictfetchall(cursor)
            
        return Response(expert_apps)

    def put(self, request, expert_app_id, format=None):
        user_id = request.data['user_id']
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Admin WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            status = request.data.get('status')
            if status not in ['approved', 'rejected']:
                return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

            cursor.execute("""
                UPDATE ExpertApplication
                SET status = %s, response_date = CURRENT_DATE
                WHERE expert_app_id = %s
            """, [status, expert_app_id])

        return Response({'message': 'Expert application updated successfully.'}, status=status.HTTP_200_OK)