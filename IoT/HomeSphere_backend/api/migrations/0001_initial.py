# Generated by Django 2.2.5 on 2019-09-12 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SensorData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cpuUsage', models.CharField(max_length=3)),
                ('totalRAM', models.CharField(max_length=10)),
                ('usedRAM', models.CharField(max_length=10)),
                ('freeRAM', models.CharField(max_length=10)),
                ('timeStamp', models.CharField(max_length=10)),
                ('diskTotal', models.CharField(max_length=10)),
                ('diskUsed', models.CharField(max_length=10)),
                ('diskFree', models.CharField(max_length=10)),
                ('temperature', models.CharField(max_length=10)),
                ('pressure', models.CharField(max_length=10)),
                ('humidity', models.CharField(max_length=10)),
                ('deviceID', models.CharField(max_length=20)),
            ],
        ),
    ]
