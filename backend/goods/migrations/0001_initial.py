# Generated by Django 3.2 on 2023-09-20 10:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
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
                ('image', models.ImageField(blank=True, upload_to='backend_media/', verbose_name='Изображение')),
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
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата заказа')),
                ('total_price', models.IntegerField(verbose_name='Итоговая цена')),
                ('num_table', models.IntegerField(verbose_name='Номер стола')),
                ('num_person', models.IntegerField(verbose_name='Количество персон')),
                ('comment', models.TextField(verbose_name='Комментарий к заказу')),
                ('tobacco_type', models.CharField(max_length=50, verbose_name='Тип табака')),
                ('additive_type', models.CharField(max_length=50, verbose_name='Тип добавки для кальяна')),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
            },
        ),
        migrations.CreateModel(
            name='ShoppingCart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField(default=1, verbose_name='Количество товар')),
                ('price', models.IntegerField(verbose_name='Цена товара')),
                ('goods', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shopping_cart_goods', to='goods.goods', verbose_name='Покупка')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shopping_cart', to=settings.AUTH_USER_MODEL, verbose_name='Список покупок')),
            ],
            options={
                'verbose_name': 'Покупка',
                'verbose_name_plural': 'Покупки',
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.PositiveIntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('goods', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goods.goods')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goods.order')),
            ],
            options={
                'verbose_name': 'Товар в заказе',
                'verbose_name_plural': 'Товары в заказе',
            },
        ),
        migrations.AddField(
            model_name='order',
            name='goods',
            field=models.ManyToManyField(through='goods.OrderItem', to='goods.Goods'),
        ),
        migrations.AddField(
            model_name='order',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL, verbose_name='Покупатель'),
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ImageField(upload_to='backend_media/', verbose_name='Изображение')),
                ('goods', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='goods.goods', verbose_name='товар')),
            ],
            options={
                'verbose_name': 'Изображение товара',
                'verbose_name_plural': 'Изображения товаров',
            },
        ),
        migrations.AddField(
            model_name='goods',
            name='additive_type',
            field=models.ManyToManyField(blank=True, to='goods.HookahAdditive', verbose_name='Тип добавки для кальяна'),
        ),
        migrations.AddField(
            model_name='goods',
            name='hookah_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='goods.hookahtype', verbose_name='Тип кальяна'),
        ),
        migrations.AddField(
            model_name='goods',
            name='image',
            field=models.ManyToManyField(blank=True, related_name='goods_img', to='goods.Image'),
        ),
        migrations.AddField(
            model_name='goods',
            name='subtype',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='goods.goodssubtype', verbose_name='Тип товара'),
        ),
        migrations.AddField(
            model_name='goods',
            name='tobacco_type',
            field=models.ManyToManyField(blank=True, to='goods.HookahTobacco', verbose_name='Тип табака'),
        ),
        migrations.AddField(
            model_name='goods',
            name='type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='goods.goodstype', verbose_name='Тип меню'),
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('goods', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_favorites', to='goods.goods')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorites', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Избранное',
                'verbose_name_plural': 'Избранные',
            },
        ),
        migrations.AddConstraint(
            model_name='shoppingcart',
            constraint=models.UniqueConstraint(fields=('goods', 'user'), name='shopping_cart_unique'),
        ),
        migrations.AddConstraint(
            model_name='favorite',
            constraint=models.UniqueConstraint(fields=('goods', 'user'), name='favorite_unique'),
        ),
    ]
