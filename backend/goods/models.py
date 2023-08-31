from django.db import models
from django.core.validators import validate_email

from users.models import User


class Image(models.Model):
    images = models.ImageField(
        upload_to='backend_media/',
        verbose_name='Изображение'
    )
    goods = models.ForeignKey(
        "Goods",
        related_name='images',
        on_delete=models.CASCADE,
        verbose_name='Блюдо'
    )

    def __str__(self):
        return f'Картинка #{self.pk} для блюда {self.goods.title}'


class Goods(models.Model):
    DISH_TYPE = (
        ('hot_dishes', 'Горячие блюда'),
        ('paste', 'Паста'),
        ('salads', 'Салаты'),
        ('side_dishes', 'Гарниры'),
        ('pizza', 'Пицца'),
        ('burgers', 'Бургеры'),
        ('dessert', 'Десерты'),
        ('drinks', 'Напитки'),
        ('khachapuri', 'Хачапури'),
        ('ossetian_pies', 'Осетинские пироги'),
        ('sauces', 'Соусы'),
        ('dishes_grill', 'Блюда на мангале'),
        ('rolls', 'Роллы'),
        ('mini_rolls', 'Мини роллы'),
        ('beer_snacks', 'Пивные закуски'),
        ('bread', 'Хлеб'),
        ('wok', 'Вок'),
        ('children_menu', 'Детское меню'),
        ('seasonal_dishes', 'Сезонные блюда'),
        ('snacks', 'Закуски'),
        ('soups', 'Супы')
    )
    PROMO_GOODS = (
        ('promotion', 'Акция'),
        ('recommend', 'Рекомендуем'),
    )
    title = models.CharField(
        max_length=355,
        verbose_name='Название блюда'
    )
    description = models.CharField(
        max_length=355,
        verbose_name='Описание блюда'
    )
    compound = models.CharField(
        max_length=500,
        verbose_name='Состав блюда'
    )
    weight = models.IntegerField('Вес блюда')
    calories = models.IntegerField('Калорийность')
    price = models.IntegerField('Цена блюда')
    image = models.ManyToManyField(
        Image,
        blank=True,
        related_name='goods_img'
    )
    count = models.IntegerField(
        default=1,
        verbose_name='Количество блюда'
    )
    type = models.CharField(
        'Тип блюда',
        max_length=50,
        choices=DISH_TYPE,
        blank=True,
        null=True
    )
    promotion = models.CharField(
        'Акция блюда',
        max_length=50,
        choices=PROMO_GOODS,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Блюдо'
        verbose_name_plural = 'Блюда'
        ordering = ['title']

    def __str__(self):
        return f'Блюдо {self.title}'


class Favorite(models.Model):
    user = models.ForeignKey(
        User,
        related_name='favorites',
        on_delete=models.CASCADE
    )
    goods = models.ForeignKey(
        Goods,
        related_name='users_favorites',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранные'
        constraints = [
            models.UniqueConstraint(
                fields=['goods', 'user'],
                name='favorite_unique'
            )
        ]

    def __str__(self):
        return f'{self.user} added {self.goods} to favorite'


class ShoppingCart(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name='Список покупок',
        related_name='shopping_cart',
        on_delete=models.CASCADE
    )
    goods = models.ForeignKey(
        Goods,
        verbose_name='Покупка',
        related_name='shopping_cart_goods',
        on_delete=models.CASCADE
    )
    count = models.IntegerField(
        default=1,
        verbose_name='Количество блюд'
    )
    price = models.IntegerField('Цена блюда')

    class Meta:
        verbose_name = 'Покупка'
        verbose_name_plural = 'Покупки'
        constraints = [
            models.UniqueConstraint(
                fields=['goods', 'user'],
                name='shopping_cart_unique'
            )
        ]

    def __str__(self):
        return f'{self.user} added {self.goods} to shopping cart'


class Order(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name='Покупатель',
        related_name='orders',
        on_delete=models.CASCADE
    )
    goods = models.ManyToManyField(Goods, through='OrderItem')
    order_date = models.DateTimeField('Дата заказа', auto_now_add=True)
    total_price = models.IntegerField('Итоговая цена')
    cutlery = models.IntegerField('Столовые приборы')
    delivery_cost = models.IntegerField('Цена доставки')
    fio = models.CharField('Ф.И.О.', max_length=255)
    email = models.EmailField(
        db_index=True,
        max_length=255,
        verbose_name='Почта',
        validators=[validate_email],
    )
    address = models.CharField('Адрес доставки', max_length=255)
    delivery_time = models.CharField('Время доставки', max_length=50)
    payment_method = models.CharField('Метод оплаты', max_length=100)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        return f'Заказ #{self.pk} от {self.order_date}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)
    count = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = 'Товар в заказе'
        verbose_name_plural = 'Товары в заказе'

    def __str__(self):
        return f'{self.goods.title} - {self.count}'
