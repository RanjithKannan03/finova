from rest_framework import serializers
from .models import Vote,Request
from users.serializers import UserSerializer

class VoteSerializer(serializers.ModelSerializer):
    cast_by = UserSerializer(read_only=True)
    class Meta:
        model = Vote
        fields = ['vote_id', 'cast_by','cast_on','choice']


class RequestSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    votes = VoteSerializer(many=True,read_only=True)
    class Meta:
        model = Request
        fields=['request_id','created_by','created_on','name','description','status','votes','expiry_date']


class RequestListSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    class Meta:
        model = Request
        fields=['request_id','created_by','created_on','name','status']
