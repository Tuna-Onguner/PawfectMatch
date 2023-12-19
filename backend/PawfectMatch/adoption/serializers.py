from rest_framework import serializers
from .models import (
    AdoptionApplication,
    Pet,
    Breed,
    Schedule,
    Slot,
    Examination,
    Reservation,
    AgreementRequest,
    OverseeingReq,
)


## Serializer for AdoptionApplication model that has
# adopter, app_date, pet, aapp_file, aapp_status, aapp_response_date, amotivation_text
class AdoptionApplicationSerializer(serializers.ModelSerializer):
    adopter_id = serializers.IntegerField(source="adopter.user_id", write_only=True)
    pet_id = serializers.IntegerField(source="pet.pet_id", write_only=True)

    class Meta:
        model = AdoptionApplication
        fields = [
            "adopter_id",
            "app_date",
            "pet_id",
            "aapp_file",
            "aapp_status",
            "aapp_response_date",
            "amotivation_text",
        ]
        read_only_fields = ["app_date", "aapp_status", "aapp_response_date"]


class PetSerializer(serializers.ModelSerializer):
    adopter_id = serializers.IntegerField(source="adopter.user_id", read_only=True)
    adoption_organization_id = serializers.CharField(
        source="adoption_organization.ao_id", read_only=True
    )
    breed_id = serializers.IntegerField(source="breed.breed_id", read_only=True)

    class Meta:
        model = Pet
        fields = [
            "pet_id",
            "pet_name",
            "pet_size",
            "pet_image",
            "pet_color",
            "is_adopted",
            "adopter_id",
            "adoption_organization_id",
            "breed_id",
        ]


class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = ["breed_name", "intelligence", "playfulness"]


class ScheduleSerializer(serializers.ModelSerializer):
    veterinarian_id = serializers.IntegerField(
        source="veterinarian.vet_id", read_only=True
    )

    class Meta:
        model = Schedule
        fields = [
            "schedule_id",
            "is_restricted",
            "schedule_beginning_date",
            "schedule_end_date",
            "veterinarian_id",
        ]


class SlotSerializer(serializers.ModelSerializer):
    schedule_id = serializers.IntegerField(source="schedule.schedule_id")

    class Meta:
        model = Slot
        fields = ["schedule_id", "start_hour", "end_hour", "is_reserved"]


class ExaminationSerializer(serializers.ModelSerializer):
    pet_id = serializers.IntegerField(source="pet.pet_id")
    vet_id = serializers.IntegerField(source="vet.vet_id")

    class Meta:
        model = Examination
        fields = [
            "examination_id",
            "examination_date",
            "examination_description",
            "examination_result",
            "pet_id",
            "vet_id",
        ]


class ReservationSerializer(serializers.ModelSerializer):
    adopter_id = serializers.IntegerField(source="adopter.user_id")
    pet_id = serializers.IntegerField(source="pet.pet_id")
    ex_id = serializers.IntegerField(source="ex.examination_id")

    class Meta:
        model = Reservation
        fields = [
            "reservation_id",
            "adopter_id",
            "pet_id",
            "rv_date",
            "ex_id",
            "reasoning",
            "rv_status",
            "rv_response_date",
        ]


class AgreementRequestSerializer(serializers.ModelSerializer):
    ao_id = serializers.IntegerField(source="ao.ao_id")
    vet_id = serializers.IntegerField(source="vet.vet_id")

    class Meta:
        model = AgreementRequest
        fields = [
            "ao_id",
            "vet_id",
            "agreq_date",
            "agreq_status",
            "agreq_response_date",
            "agmotivation_text",
            "agreq_term_date",
        ]
        read_only_fields = ["agreq_date", "agreq_status", "agreq_response_date"]


class OverseeingReqSerializer(serializers.ModelSerializer):
    ao_id = serializers.IntegerField(source="ao.ao_id")
    adopter_id = serializers.IntegerField(source="adopter.user_id")

    class Meta:
        model = OverseeingReq
        fields = [
            "ao_id",
            "adopter_id",
            "oreq_date",
            "oreq_status",
            "oreq_response_date",
            "omotivation_text",
            "oreq_result",
        ]
        read_only_fields = ["oreq_date", "oreq_status", "oreq_response_date"]
