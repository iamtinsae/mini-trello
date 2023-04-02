from graphene_django import DjangoObjectType

from . import models

class ListType(DjangoObjectType):
    class Meta:
        model = models.List
        fields = "__all__"


class CardType(DjangoObjectType):
    class Meta:
        model = models.Card
        fields = "__all__"
