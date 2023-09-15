from django.contrib import admin

from .models import Goods, Image, Order, GoodsType, GoodsSubtype


class PostImageAdmin(admin.StackedInline):
    model = Image


@admin.register(Goods)
class GoodsAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'title',
        'type',
        'subtype',
        'price',
    )
    inlines = [PostImageAdmin]
    ordering = ('title', )
    search_fields = ('title', 'price', 'type', 'subtype')
    list_filter = ('price', 'type', 'subtype')


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'user',
        'order_date',
        'total_price',
        'cutlery',
        'delivery_cost'
    )
    ordering = ('-order_date',)
    search_fields = ('user',)
    list_filter = ('order_date', 'total_price',)


admin.site.register(GoodsType)
admin.site.register(GoodsSubtype)