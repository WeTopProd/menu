from django.db import models

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
        verbose_name='товар'
    )

    class Meta:
        verbose_name = 'Изображение товара'
        verbose_name_plural = 'Изображения товаров'

    def __str__(self):
        return f'Картинка #{self.pk} для товара {self.goods.title}'


class GoodsType(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название типа меню')

    class Meta:
        verbose_name = 'Тип меню'
        verbose_name_plural = 'Типы меню'
        ordering = ['pk']

    def __str__(self):
        return self.name


class GoodsSubtype(models.Model):
    name = models.CharField(
        max_length=50,
        verbose_name='Название типа товара'
    )
    icon = models.ImageField(
        upload_to='backend_media/',
        verbose_name='Иконка',
        blank=True
    )
    gif = models.ImageField(
        upload_to='backend_media/',
        verbose_name='Гифка',
        blank=True
    )
    type = models.ForeignKey(
        GoodsType,
        on_delete=models.SET_NULL,
        verbose_name='Тип меню',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Тип товара'
        verbose_name_plural = 'Типы товаров'
        ordering = ['name']

    def __str__(self):
        return self.name


class HookahType(models.Model):
    name = models.CharField(
        max_length=50,
        verbose_name='Название типа кальяна'
    )

    class Meta:
        verbose_name = 'Тип кальяна'
        verbose_name_plural = 'Типы кальянов'
        ordering = ['name']

    def __str__(self):
        return self.name


class HookahTobacco(models.Model):
    name = models.CharField(
        max_length=50,
        verbose_name='Название типа табака'
    )

    class Meta:
        verbose_name = 'Тип табакаа'
        verbose_name_plural = 'Типы табаков'
        ordering = ['name']

    def __str__(self):
        return self.name


class HookahAdditive(models.Model):
    name = models.CharField(
        max_length=50,
        verbose_name='Название типа добавок для кальяна'
    )
    price = models.IntegerField('Цена добавки для кальяна')

    class Meta:
        verbose_name = 'Тип добавки для кальяна'
        verbose_name_plural = 'Типы добавок для кальяна'
        ordering = ['name']

    def __str__(self):
        return self.name


class Goods(models.Model):
    title = models.CharField(
        max_length=355,
        verbose_name='Название товара'
    )
    description = models.CharField(
        max_length=355,
        verbose_name='Описание товара'
    )
    compound = models.CharField(
        max_length=500,
        verbose_name='Состав товара'
    )
    weight = models.IntegerField('Вес товара')
    calories = models.IntegerField('Калорийность')
    price = models.IntegerField('Цена товара')
    image = models.ManyToManyField(
        Image,
        blank=True,
        related_name='goods_img'
    )
    count = models.IntegerField(
        default=1,
        verbose_name='Количество товара'
    )
    type = models.ForeignKey(
        GoodsType,
        on_delete=models.SET_NULL,
        verbose_name='Тип меню',
        blank=True,
        null=True
    )
    subtype = models.ForeignKey(
        GoodsSubtype,
        on_delete=models.SET_NULL,
        verbose_name='Тип товара',
        blank=True,
        null=True
    )
    hookah_type = models.ForeignKey(
        HookahType,
        on_delete=models.SET_NULL,
        verbose_name='Тип кальяна',
        blank=True,
        null=True
    )
    tobacco_type = models.ManyToManyField(
        HookahTobacco,
        verbose_name='Тип табака',
        blank=True
    )
    additive_type = models.ManyToManyField(
        HookahAdditive,
        verbose_name='Тип добавки для кальяна',
        blank=True
    )

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['title']

    def __str__(self):
        return f'Товар {self.title}'


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
        verbose_name='Количество товар'
    )
    price = models.IntegerField('Цена товара')
    additive_price = models.IntegerField(
        'Цена добавки для кальяна',
        null=True,
        blank=True
    )
    tobacco_type = models.CharField(
        'Тип табака',
        max_length=155,
        blank=True,
        null=True
    )
    additive_type = models.CharField(
        'Тип добавки для кальяна',
        max_length=155,
        blank=True,
        null=True
    )

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
    num_table = models.IntegerField('Номер стола')
    num_person = models.IntegerField('Количество персон')
    comment = models.TextField('Комментарий к заказу')

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
    additive_price = models.IntegerField(
        'Цена добавки для кальяна',
        null=True,
        blank=True
    )
    tobacco_type = models.CharField('Тип табака', max_length=50)
    additive_type = models.CharField('Тип добавки для кальяна', max_length=50)

    class Meta:
        verbose_name = 'Товар в заказе'
        verbose_name_plural = 'Товары в заказе'

    def __str__(self):
        return f'{self.goods.title} - {self.count}'
