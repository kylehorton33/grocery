# Generated by Django 3.1.2 on 2020-10-13 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ListItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.CharField(max_length=120)),
                ('quantity', models.IntegerField(default=1, null=True)),
                ('unit', models.CharField(max_length=30, null=True)),
                ('category', models.CharField(max_length=30, null=True)),
            ],
        ),
    ]
