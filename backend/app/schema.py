import graphene

from . import models, types, mutations


class Query(graphene.ObjectType):
    get_all_lists = graphene.List(types.ListType)

    def resolve_get_all_lists(self, info):
        return models.List.objects.all()


schema = graphene.Schema(query=Query, mutation=mutations.Mutations)
