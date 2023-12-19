from rest_framework import serializers

from .models import AdoptionApplication, Pet, Breed


## Serializer for AdoptionApplication model that has
# adopter, app_date, pet, aapp_file, aapp_status, aapp_response_date, amotivation_text
class AdoptionApplicationSerializer(serializers.ModelSerializer):
    adopter_id = serializers.IntegerField(source='adopter.user_id', write_only=True)
    pet_id = serializers.IntegerField(source='pet.pet_id', write_only=True)

    class Meta:
        model = AdoptionApplication
        fields = ['adopter_id', 'app_date', 'pet_id', 'aapp_file', 'aapp_status', 'aapp_response_date',
                  'amotivation_text']
        read_only_fields = ['app_date', 'aapp_status', 'aapp_response_date']


class PetSerializer(serializers.ModelSerializer):
    adopter_id = serializers.IntegerField(source='adopter.user_id', read_only=True)
    adoption_organization_id = serializers.CharField(source='adoption_organization.ao_id', read_only=True)
    breed_id = serializers.IntegerField(source='breed.breed_id', read_only=True)

    class Meta:
        model = Pet
        fields = ['pet_id', 'pet_name', 'pet_size', 'pet_image', 'pet_color', 'is_adopted', 'adopter_id',
                  'adoption_organization_id', 'breed_id']


class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = ['breed_name', 'intelligence', 'playfulness']
