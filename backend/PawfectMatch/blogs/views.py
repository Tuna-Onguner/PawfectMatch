from PawfectMatch.utils import dictfetchall
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import pdb
import jwt
from django.conf import settings
from rest_framework.permissions import AllowAny
from roles.utils import check_jwt_role

class CounselsView(APIView):
    def get(self, request, user_id):
        
        user_id = request.data.get('user_id')
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Adopter WHERE user_id = %s", [user_id])

        if cursor.fetchone():
            cursor.execute("""
                SELECT c.advice_date, ef.expertise_field_name, b.blog_title AS expert_name, c.adopter_problem, c.expert_response
                FROM Counsels c
                JOIN Expert e ON c.expert_id = e.expert_id
                JOIN Blogger b ON e.blogger_id = b.blogger_id
                JOIN ExpertiseField ef ON c.expertise_field_id = ef.expertise_field_id
                WHERE c.adopter_id = %s
            """, [user_id])
            counsels = dictfetchall(cursor)
        return Response(counsels)

    def post(self, request):
        user_id = request.data.get('user_id')
        selected_expert_id = request.data.get('selected_expert_id')
        selected_expertise_field_id = request.data.get('selected_expertise_field_id')
        topic_of_advice = request.data.get('topic_of_advice')

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Adopter WHERE user_id = %s", [user_id])

        if cursor.fetchone():
            cursor.execute("""
                INSERT INTO Counsels (adopter_id, expert_id, advice_date, expertise_field_id, adopter_problem, advice_status)
                VALUES (%s, %s, NOW(), %s, %s, 'PENDING')
            """, [user_id, selected_expert_id, selected_expertise_field_id, topic_of_advice])

        return Response({'message': 'Advice created'}, status=status.HTTP_201_CREATED)


class BlogFieldView(APIView):
    def get(self, request):
        cursor = connection.cursor()

        cursor.execute("""
            SELECT *
            FROM
                BlogField bf
        """)
        blog_fields = dictfetchall(cursor)
        return Response(blog_fields)


class BlogView(APIView):
    def get(self, request, blogger_id):
        user_id = request.data.get('user_id')
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM Expert WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor = connection.cursor()
            cursor.execute("""
                SELECT blog_id, blogger_id, blog_image, blog_content, blog_title, blog_field_id, is_restricted, published_date
                FROM Blog
                WHERE blogger_id = %s
            """, [blogger_id])
            blogs = dictfetchall(cursor)

        return Response(blogs)

    def post(self, request):
        user_id = request.data.get('user_id')
        blogger_id = request.data.get('blogger_id')
        blog_image = request.data.get('blog_image')
        blog_content = request.data.get('blog_content')
        blog_title = request.data.get('blog_title')
        blog_field_id = request.data.get('blog_field_id')

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Blogger WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor.execute("""
                INSERT INTO Blog (blogger_id, blog_image, blog_content, blog_title, blog_field_id, is_restricted, published_date)
                VALUES (%s, %s, %s, %s, %s, FALSE, CURRENT_DATE)
            """, [blogger_id, blog_image, blog_content, blog_title, blog_field_id])

        return Response({'message': 'Blog created'}, status=status.HTTP_201_CREATED)

    def put(self, request, blog_id):
        user_id = request.data.get('user_id')
        blog_image = request.data.get('blog_image')
        blog_content = request.data.get('blog_content')
        blog_title = request.data.get('blog_title')
        blog_field_id = request.data.get('blog_field_id')
        is_restricted = request.data.get('is_restricted')

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Blogger WHERE user_id = %s", [user_id])
        if cursor.fetchone():
            cursor.execute("""
                UPDATE Blog
                SET blog_image = %s, blog_content = %s, blog_title = %s, blog_field_id = %s, is_restricted = %s
                WHERE blog_id = %s
            """, [blog_image, blog_content, blog_title, blog_field_id, is_restricted, blog_id])

        return Response({'message': 'Blog updated'}, status=status.HTTP_200_OK)


class BlogsView(APIView):
    def get(self, request):
        user_id, role = check_jwt_role(request, request.headers["Authorization"])
        cursor = connection.cursor()
        cursor.execute('''
            SELECT *
            FROM Blog b
            JOIN Blogger bl ON b.blogger_id = bl.blogger_id
            JOIN User u
            JOIN BlogField bf ON b.blog_field_id = bf.blog_field_id            
            ''')
        blogs = dictfetchall(cursor)
        return Response(blogs)


class ExpertiseFieldView(APIView):
    def get(self, request):
        cursor = connection.cursor()

        cursor.execute("""
            SELECT *
            FROM
                ExpertiseField ef
        """)
        blog_fields = dictfetchall(cursor)
        return Response(blog_fields)
