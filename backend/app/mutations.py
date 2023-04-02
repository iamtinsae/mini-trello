import graphene

from . import models, types


class CreateList(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)

    list = graphene.Field(types.ListType)

    def mutate(self, info, title):
        return CreateList(models.List.objects.create(title=title))


class UpdateList(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String(required=True)

    list = graphene.Field(types.ListType)

    def mutate(self, info, id, title):
        list_obj = models.List.objects.get(id=id)
        list_obj.title = title
        list_obj.save()
        return UpdateList(list=list_obj)


class DeleteList(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    deleted = graphene.Boolean()

    def mutate(self, info, id):
        list_obj = models.List.objects.get(id=id)
        list_obj.delete()
        return DeleteList(deleted=True)


class CreateCard(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        list_id = graphene.ID(required=True)

    card = graphene.Field(types.CardType)

    def mutate(self, info, title, description, list_id):
        list_obj = models.List.objects.get(id=list_id)
        card = models.Card.objects.create(
            title=title, description=description, list=list_obj
        )
        return CreateCard(card=card)


class UpdateCard(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String(required=True)

    card = graphene.Field(types.CardType)

    def mutate(self, info, id, title, description):
        card = models.Card.objects.get(id=id)
        card.title = title
        card.description = description
        card.save()
        return UpdateCard(card=card)


class DeleteCard(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    card = graphene.Field(types.CardType)

    def mutate(self, info, id):
        card = models.Card.objects.get(id=id)
        card.delete()

        # update the order of the cards
        cards = models.Card.objects.filter(list=card.list)
        for order, card in enumerate(cards):
            card.order = order
            card.save()

        return DeleteCard(card=card)


class ReorderCards(graphene.Mutation):
    class Arguments:
        list_id = graphene.ID(required=True)
        card_ids = graphene.List(graphene.ID, required=True)

    list = graphene.Field(types.ListType)

    def mutate(self, info, list_id, card_ids):
        list_obj = models.List.objects.get(id=list_id)
        for order, card_id in enumerate(card_ids):
            card = models.Card.objects.get(id=card_id)
            card.order = order
            card.save()
        return ReorderCards(list=list_obj)


class MoveCard(graphene.Mutation):
    class Arguments:
        card_id = graphene.ID(required=True)
        list_id = graphene.ID(required=True)

    card = graphene.Field(types.CardType)

    def mutate(self, info, card_id, list_id):
        card = models.Card.objects.get(id=card_id)
        list_obj = models.List.objects.get(id=list_id)
        card.list = list_obj
        card.save()
        return MoveCard(card=card)


class Mutations(graphene.ObjectType):
    create_list = CreateList.Field()
    update_list = UpdateList.Field()
    delete_list = DeleteList.Field()

    create_card = CreateCard.Field()
    update_card = UpdateCard.Field()
    delete_card = DeleteCard.Field()

    reorder_cards = ReorderCards.Field()
    move_card = MoveCard.Field()
