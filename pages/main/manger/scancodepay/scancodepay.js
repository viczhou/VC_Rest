Page({
    data: {
        hasLoading: false,
        'order_pid': '1805120024150004',
        order_data: { 'order_price': 100, 'order_time': '2018-05-12 16:25:41', 'order_detail': [{ 'food_count': 18, 'food_price': 211.16, 'food_name': '好吃的火锅' }, { 'food_count': 5, 'food_price': 26, 'food_name': '好吃asass的火锅' }, { 'food_count': 1, 'food_price': 26, 'food_name': '好吃的网红菜超长测试测试测试测试测试测试测试测试' }] }
    },
    onLoad: function (options) {
        let that = this

        wx.getSystemInfo({
            success: function (res) {
                that.setData({ windowHeight: res.windowHeight })
            }
        })

        wx.scanCode({
            success: function (res) {
                //res格式 {shop_id:xx,table_id:xx,order_id:xx}
                console.log(res.result)
                let result = ''
                try {
                    result = JSON.parse(res.result)
                } catch (e) {
                    result = 'error'
                }
                //判断格式以及shop_id   shop_id后面加
                if (result === 'error') {
                    wx.showToast({
                        title: '二维码错误',
                        icon: 'none'
                    })
                    setTimeout(function () {
                        wx.navigateBack({})
                    }, 1500)
                }
                if (result.shop_id != wx.getStorageSync("shop_id")) {
                    wx.showToast({
                        title: '请扫描本店订单二维码',
                        icon: 'none'
                    })
                    setTimeout(function () {
                        wx.navigateBack({})
                    }, 1500)
                }
                wx.request({
                    url: 'https://viczhou.cn/vc_rest/order/getOrderDetail',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    data: {
                        order_id: result.order_id
                    },
                    success: function (res) {
                        console.log(res.data)
                        if (res.data.msg == 0) {
                            //放请求回调中
                            that.setData({
                                hasLoading: true ,
                                order_data:res.data ,
                                order_pid: res.data.order_time.substring(2).replace("-", "").replace("-", "").replace(" ", "").replace(":", "").replace(":", "") + result.order_id
                            })
                        }
                    }
                })

            },
            fail: function () {

                wx.navigateBack({})

            }
        })

        //根据请求数据
        // wx.request({
        //     url: '',
        // })
    },
    formSubmit: function (e) {
        //请求服务器，完成订单
        //通过订单号提取order_id提交
        console.log(e.detail.value)
    }
})