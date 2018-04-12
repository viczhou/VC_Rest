Page({
    data: {
        rest_info: { 'shop_img': '/images/manger.png', 'shop_name': '测试店名', 'shop_address': '测试的店铺地址', 'shop_phone': '18520887662', 'latitude': 22.53332, 'longitude': 113.93041 },
        markers:[{
            'latitude': 22.53332,
             'longitude': 113.93041
        }]
    },
    onLoad:function(){
        //请求接口拿信息数据
       
    },
    showMap:function(){
        wx.openLocation({
            latitude: + this.data.rest_info.latitude,
            longitude: + this.data.rest_info.longitude,
            scale: 28,
            name: this.data.rest_info.shop_name,
            address:this.data.rest_info.shop_address
        })
    }
})