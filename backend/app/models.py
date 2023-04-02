from django.db import models


class List(models.Model):
    """
    Represent the columns in the board.
    """

    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return self.title


class Card(models.Model):
    """
    Represent the cards in a list.
    """

    title = models.CharField(max_length=50)
    description = models.TextField()
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name="cards")
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """
        Override save method to update the order of the cards.
        """
        if not self.id:
            self.order = self.list.cards.count()
        super().save(*args, **kwargs)
