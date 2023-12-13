from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import Blogger
from psycopg2.extras import RealDictCursor
from django.db import connections

# Create your views here.

class GranteAppView(APIView):
    def get(self, request):
        con = connections['default']
        con.ensure_connection()
        cursor= con.connection.cursor(cursor_factory=RealDictCursor)
        cursor.execute("select * from Customer")
        columns=cursor.fetchall()
        columns=json.dumps(columns)
        return HttpResponse("Hello, world. You're at the applications index.")
    