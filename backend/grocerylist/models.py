from django.db import models

# Create your models here.
class ListItem(models.Model):
  item = models.CharField(max_length=120)
  quantity = models.IntegerField(blank=True, default=1)
  unit = models.CharField(blank=True, max_length=30)
  category = models.CharField(blank=True, max_length=30)

  def _str_(self):
    return self.item



  def default_quantity(self):
    pass

  def default_unit(self):
    pass