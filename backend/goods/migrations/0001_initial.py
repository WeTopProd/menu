# Generated by Django 3.2 on 2023-09-18 12:36

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name': 'Избранное',
                'verbose_name_plural': 'Избранные',
            },
        ),
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=355, verbose_name='Название товара')),
                ('description', models.CharField(max_length=355, verbose_name='Описание товара')),
                ('compound', models.CharField(max_length=500, verbose_name='Состав товара')),
                ('weight', models.IntegerField(verbose_name='Вес товара')),
                ('calories', models.IntegerField(verbose_name='Калорийность')),
                ('price', models.IntegerField(verbose_name='Цена товара')),
                ('count', models.IntegerField(default=1, verbose_name='Количество товара')),
            ],
            options={
                'verbose_name': 'Товар',
                'verbose_name_plural': 'Товары',
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='GoodsSubtype',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название типа товара')),
            ],
            options={
                'verbose_name': 'Тип товара',
                'verbose_name_plural': 'Типы товаров',
            },
        ),
        migrations.CreateModel(
            name='GoodsType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название типа меню')),
            ],
            options={
                'verbose_name': 'Тип меню',
                'verbose_name_plural': 'Типы меню',
            },
        ),
        migrations.CreateModel(
            name='HookahAdditive',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название типа добавок для кальяна')),
            ],
            options={
                'verbose_name': 'Тип добавки для кальяна',
                'verbose_name_plural': 'Типы добавок для кальяна',
            },
        ),
        migrations.CreateModel(
            name='HookahTobacco',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название типа табака')),
            ],
            options={
                'verbose_name': 'Тип табакаа',
                'verbose_name_plural': 'Типы табаков',
            },
        ),
        migrations.CreateModel(
            name='HookahType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название типа кальяна')),
            ],
            options={
                'verbose_name': 'Тип кальяна',
                'verbose_name_plural': 'Типы кальянов',
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ImageField(upload_to='backend_media/', verbose_name='Изображение')),
            ],
            options={
                'verbose_name': 'Изображение товара',
                'verbose_name_plural': 'Изображения товаров',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата заказа')),
                ('total_price', models.IntegerField(verbose_name='Итоговая цена')),
                ('cutlery', models.IntegerField(verbose_name='Столовые приборы')),
                ('delivery_cost', models.IntegerField(verbose_name='Цена доставки')),
                ('fio', models.CharField(max_length=255, verbose_name='Ф.И.О.')),
                ('email', models.EmailField(db_index=True, max_length=255, validators=[django.core.validators.EmailValidator()], verbose_name='Почта')),
                ('address', models.CharField(max_length=255, verbose_name='Адрес доставки')),
                ('delivery_time', models.CharField(max_length=50, verbose_name='Время доставки')),
                ('payment_method', models.CharField(max_length=100, verbose_name='Метод оплаты')),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.PositiveIntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'verbose_name': 'Товар в заказе',
                'verbose_name_plural': 'Товары в заказе',
            },
        ),
        migrations.CreateModel(
            name='ShoppingCart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField(default=1, verbose_name='Количество товар')),
                ('price', models.IntegerField(verbose_name='Цена товара')),
                ('goods', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shopping_cart_goods', to='goods.goods', verbose_name='Покупка')),
            ],
            options={
                'verbose_name': 'Покупка',
                'verbose_name_plural': 'Покупки',
            },
        ),
    ]
