from django.db import models

# Create your models here.
class ListItem(models.Model):
  item = models.CharField(max_length=120)
  category = models.CharField(blank=True, max_length=30)
  purchased = models.BooleanField(default=False)

  def _str_(self):
    return self.item

  def default_category(self):
    pass
