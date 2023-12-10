from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db import connection

from .serializers import AdoptionApplicationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import AdoptionApplicationSerializer, PetSerializer, BreedSerializer

import pdb

## Create an adoption application for a pet using REST API
# @param request POS and GET request with AdoptionApplication Serializer
# @param JWT token
# @return JSON response with status code
@api_view(['POST', 'GET'])
def adoption_applications(request):
    # Get the user id from the JWT token from the request's parameters
    pdb.set_trace()
    ##Get the user_id from the request data 
    user_id = request.data.get('user_id')
    ##Remove the user_id from the request data
    request.data.pop('user_id')    

    if request.method == 'POST':
        ##Add the current date to the request data
        
        serializer = AdoptionApplicationSerializer(data=request.data)
        try:
            # Check if the serializer is valid
            pdb.set_trace()
            if not serializer.is_valid():
                return Response({'detail': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
            
            cursor = connection.cursor()
            # Check if the user is an adopter
            cursor.execute("SELECT * FROM Adopter WHERE adopter_id = %s", [user_id])
            row = cursor.fetchone()
            if row is None:
                return Response({'detail': 'User is not an adopter'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the pet exists
            cursor.execute("SELECT * FROM Pet WHERE pet_id = %s", [request.data['pet_id']])
            row = cursor.fetchone()
            if row is None:
                return Response({'detail': 'Pet does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            elif row is not None and row[6] == 1:
                return Response({'detail': 'Pet is already adopted'}, status=status.HTTP_400_BAD_REQUEST)
                
            # Check if the pet is already applied from the same adopter
            cursor.execute("SELECT * FROM adoption_application WHERE pet_id = %s AND adopter_id = %s", [request.data['pet_id'], user_id])
            row = cursor.fetchone()
            if row is not None:
                return Response({'detail': 'Pet is already applied'}, status=status.HTTP_400_BAD_REQUEST) 
            
            # Now we can create the adoption application if the pet exists and is not adopted
            serializer.save()
            return Response({'status': 'success'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        # Check if the user is an adoption organization
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM adoption_organization WHERE user_id = %s", [user_id])
        row = cursor.fetchone()
        
        # Then return all the adoption applications for the adoption organization
        if row is not None:
            cursor.execute("SELECT * FROM adoption_application WHERE pet_id IN (SELECT pet_id FROM pet WHERE adoption_organization_id = %s)", [row[0]])
            rows = cursor.fetchall()
            applications = []
            for row in rows:
                applications.append({
                    'adopter_id': row[1],
                    'aapp_date': row[2],
                    'pet_id': row[3],
                    'aapp_file': row[4],
                    'aapp_status': row[5],
                    'aapp_response_date': row[6],
                    'amotivation_text': row[7]
                })
            return Response(applications, status=status.HTTP_200_OK)

        # Check if the user is an adopter
        cursor.execute("SELECT * FROM adopter WHERE user_id = %s", [user_id])
        row = cursor.fetchone()

        # Then return all the adoption applications for the adopter
        if row is not None:
            cursor.execute("SELECT * FROM adoption_application WHERE adopter_id = %s", [row[0]])
            rows = cursor.fetchall()
            applications = []
            for row in rows:
                applications.append({
                    'adopter_id': row[1],
                    'aapp_date': row[2],
                    'pet_id': row[3],
                    'aapp_file': row[4],
                    'aapp_status': row[5],
                    'aapp_response_date': row[6],
                    'amotivation_text': row[7]
                })
            return Response(applications, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'User is not an adopter or adoption organization'}, status=status.HTTP_400_BAD_REQUEST)
        
## Get, delete or update a single adoption application using REST API
# @param request GET, DELETE or PUT request with AdoptionApplication Serializer
# @param JWT token
# @param pk Primary key of the adoption application
# @return JSON response with status code
@api_view(['GET', 'DELETE', 'PUT'])
def adoption_application(request, pk):

    user_id = request.user.get_user_id()
    if request.method == 'GET':
        # Check if the user is an adoption organization or adopter who has a pet that is applied 
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM adoption_organization WHERE user_id = %s", [user_id])
        row = cursor.fetchone()
        
        # Then return the adoption application for the adoption organization
        if row is not None:
            cursor.execute("SELECT * FROM adoption_application WHERE pet_id IN (SELECT pet_id FROM pet WHERE adoption_organization_id = %s) AND adopter_id = %s", [row[0], pk])
            row = cursor.fetchone()
            if row is not None:
                application = {
                    'adopter_id': row[1],
                    'aapp_date': row[2],
                    'pet_id': row[3],
                    'aapp_file': row[4],
                    'aapp_status': row[5],
                    'aapp_response_date': row[6],
                    'amotivation_text': row[7]
                }
                return Response(application, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Adoption application does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the user is an adopter
        cursor.execute("SELECT * FROM adopter WHERE user_id = %s", [user_id])
        row = cursor.fetchone()

        # Then return the adoption application for the adopter
        if row is not None:
            cursor.execute("SELECT * FROM adoption_application WHERE adopter_id = %s AND aap = %s", [row[0], pk])
            row = cursor.fetchone()
            if row is not None:
                application = {
                    'adopter_id': row[1],
                    'aapp_date': row[2],
                    'pet_id': row[3],
                    'aapp_file': row[4],
                    'aapp_status': row[5],
                    'aapp_response_date': row[6],
                    'amotivation_text': row[7]
                }
                return Response(application, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Adoption application does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'User is not an adopter or adoption organization'}, status=status.HTTP_400_BAD_REQUEST)  

## Function that gets all pets and can create a pet
# @param request GET and POST request with Pet Serializer
# @param JWT token
# @return JSON response with status code
class PetsView(APIView):
    def get(self, request):
        ## Get all the pets from the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Pet")
        rows = cursor.fetchall()
        pets = []
        for row in rows:
            pets.append({
                'pet_id': row[0],
                'pet_name': row[1],
                'pet_size': row[2],
                'pet_image': row[3],
                'pet_color': row[4],
                'is_adopted': row[5],
                'adopter_id': row[6],
                'adoption_organization_id': row[7],
                'breed_id': row[8]
            })
        return Response(pets, status=status.HTTP_200_OK)

    def post(self, request):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM AdoptionOrganization WHERE ao_id = %s", [request.data['adoption_organization_id']])
        row = cursor.fetchone()
        if row is None:
            return Response({'detail': 'Organization not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the breed exists
        cursor.execute("SELECT * FROM Breed WHERE breed_id = %s", [request.data['breed_id']])
        row = cursor.fetchone()
        if row is None:
            return Response({'detail': 'Breed does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = PetSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'detail': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        
        ## Add the pet to the database using raw SQL
        cursor.execute("INSERT INTO Pet (pet_name, pet_size, pet_image, pet_color, is_adopted, ao_id, pet_breed_id) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                        [request.data['pet_name'], request.data['pet_size'], request.data['pet_image'], request.data['pet_color'], request.data['is_adopted'],
                          request.data['adoption_organization_id'], request.data['breed_id']])

        ## now return the pet
        cursor.execute("SELECT * FROM Pet WHERE pet_name = %s", [request.data['pet_name']])
        row = cursor.fetchone()
        pdb.set_trace()
        pet = {
            'pet_id': row[0],
            'pet_name': row[1],
            'pet_size': row[2],
            'pet_image': row[3],
            'pet_color': row[4],
            'is_adopted': row[5],
            'adopter_id': row[6],
            'adoption_organization_id': row[7],
            'breed_id': row[8]
        }
        return Response(pet, status=status.HTTP_201_CREATED)

class BreedsView(APIView):
    pdb.set_trace()
    def get(self, request):
        ## Get all the breeds from the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Breed")
        rows = cursor.fetchall()
        breeds = []
        for row in rows:
            breeds.append({
                'breed_id': row[0],
                'breed_name': row[1],
                'intelligence': row[2],
                'playfulness': row[3]
            })
        return Response(breeds, status=status.HTTP_200_OK)

    def post(self, request):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Breed WHERE breed_name = %s", [request.data['breed_name']])
        row = cursor.fetchone()
        if row is not None:
            return Response({'detail': 'Breed already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = BreedSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'detail': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        
        ## Add the breed to the database using raw SQL
        cursor.execute("INSERT INTO Breed (breed_name, intelligence, playfulness) VALUES (%s, %s, %s)", [request.data['breed_name'], request.data['intelligence'], request.data['playfulness']])

        ## now return the breed
        cursor.execute("SELECT * FROM Breed WHERE breed_name = %s", [request.data['breed_name']])
        row = cursor.fetchone()
        breed = {
            'breed_id': row[0],
            'breed_name': row[1],
            'intelligence': row[2],
            'playfulness': row[3]
        }
        return Response(breed, status=status.HTTP_201_CREATED)