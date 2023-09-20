from rest_framework import serializers, validators

from .models import (Favorite, Goods, GoodsSubtype, GoodsType, HookahAdditive,
                     HookahTobacco, HookahType, Image, Order, OrderItem,
                     ShoppingCart)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('images', )


class GoodsTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsType
        fields = ('name', )


class GoodsSubtypeSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = GoodsSubtype
        fields = ('name', 'image', 'type')

    def get_type(self, obj):
        if obj.type:
            return GoodsTypeSerializer(obj.type).data['name']
        return None


class HookahTobaccoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HookahTobacco
        fields = ('name', )


class HookahAdditiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = HookahAdditive
        fields = ('name', )


class HookahTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HookahType
        fields = ('name', )


class GoodsSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    is_favorited = serializers.SerializerMethodField()
    is_in_shopping_cart = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    subtype = serializers.SerializerMethodField()
    hookah_type = serializers.SerializerMethodField()
    tobacco_type = serializers.StringRelatedField(many=True)
    additive_type = serializers.StringRelatedField(many=True)

    class Meta:
        model = Goods
        fields = (
            'id',
            'title',
            'description',
            'compound',
            'weight',
            'calories',
            'price',
            'images',
            'count',
            'type',
            'subtype',
            'hookah_type',
            'tobacco_type',
            'additive_type',
            'is_favorited',
            'is_in_shopping_cart',
        )

    def in_list(self, obj, model):
        request = self.context.get('request')
        if request is None or request.user.is_anonymous:
            return False
        return model.objects.filter(user=request.user, goods=obj).exists()

    def get_is_favorited(self, obj):
        return self.in_list(obj, Favorite)

    def get_is_in_shopping_cart(self, obj):
        return self.in_list(obj, ShoppingCart)

    def get_type(self, obj):
        if obj.type:
            return GoodsTypeSerializer(obj.type).data['name']
        return None

    def get_subtype(self, obj):
        if obj.subtype:
            return GoodsSubtypeSerializer(obj.subtype).data['name']

    def get_hookah_type(self, obj):
        if obj.hookah_type:
            return HookahTypeSerializer(obj.hookah_type).data['name']
        return None


class ShortGoodsSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Goods
        fields = (
            'id',
            'title',
            'description',
            'compound',
            'weight',
            'calories',
            'price',
            'images',
            'count',
            'type',
            'subtype',
            'hookah_type',
        )


class ShoppingCartSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShoppingCart
        fields = (
            'goods',
            'user',
            'count',
            'price',
        )


class FavoriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favorite
        fields = (
            'user',
            'goods',
        )
        validators = [
            validators.UniqueTogetherValidator(
                queryset=Favorite.objects.all(),
                fields=('user', 'goods'),
                message='Товар уже добавлен в избранное'
            )
        ]

    def to_representation(self, instance):
        request = self.context['request']
        return ShortGoodsSerializer(
            instance.goods,
            context={'request': request}
        ).data


class OrderItemSerializer(serializers.ModelSerializer):
    goods = ShortGoodsSerializer()

    class Meta:
        model = OrderItem
        fields = ('goods', 'count', 'price')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source='orderitem_set',
                                many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            'id',
            'user',
            'order_date',
            'total_price',
            'num_table',
            'num_person',
            'comment',
            'tobacco_type',
            'additive_type',
            'items'
        )
