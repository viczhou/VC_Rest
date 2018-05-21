var sliderWidth = 96;
let page = 1
let shop_id = -1
Page({
    data: {
        active: 1,
        //退单数
        handback_count: 0,
        total_money: 0,
        oder_num: 0,
        grids: [0, 1, 2, 3, 4, 5],
        imgs: ['print', 'shop_info', 'qr_code', 'menu_manger', 'qr_code_manger', 'shop_status'],
        img_title: ['打印机', '餐厅信息', '管理桌码', '菜品管理', '扫码结账', '营业状态'],
        urls: ['print/print', 'restinfo/restinfo', 'tablecode/tablecode', 'menumanger/menumanger', 'scancodepay/scancodepay', 'reststatus/reststatus'],
        tabs: ["全部订单", "退单", "未结账订单"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        //未处理数据
        untreated_data: [],
        //已处理，原始数据，后台获取
        data: [{
            'show': -1,
            'table': 9,
            'price': '425.00',
            'time': '2018-03-15 15:30:20',
            'pid': '2018030500441',
            'detail': [{
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 1,
                'price': 75,
                'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
            }
            ]
        }],
    },
    onLoad: function (opt) {
        let that = this
        setInterval(function () {
            wx.request({
                url: 'https://viczhou.cn/vc_rest/order/getShopOrderPage',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                data: {
                    'shop_id': wx.getStorageSync('shop_id'),
                    'limit': 50,
                    'page': 1,
                    'desc': 0
                },
                success: function (res) {
                    //console.log(res.data)
                    console.log(that.data.untreated_data)
                    let data = res.data
                    let untreated_data = that.data.untreated_data
                    let time
                    let j
                    for (let i = 0; i < data.length; i++) {
                        time = data[i].time.substring(2).replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').trim()
                        data[i].pid = time + data[i].order_id
                  
                        for (j = 0; j < untreated_data.length ; j ++){
                            if (untreated_data[j].pid == data[i].pid){
                                break
                            }
                        }
                        if (j == untreated_data.length){
                            untreated_data.push(data[i])
                        }
                    }


                    that.setData({
                        untreated_data: untreated_data
                    })
                }.bind(this)
            })
        }.bind(this), 1000 * 30)

        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
                    windowHeight: res.windowHeight
                });
            }
        })
        shop_id = wx.getStorageSync('shop_id')
        this.setData({
            shop_id: shop_id
        })
    },

    topbarClick: function (e) {
        if (e.currentTarget.id == 2) {
            wx.request({
                url: 'https://viczhou.cn/vc_rest/order/getShopOrderPage',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                data: {
                    'shop_id': shop_id,
                    'limit': 50,
                    'page': page,
                    'desc': 2
                },
                success: function (res) {
                    let data = res.data
                    let time

                    for (let i = 0; i < data.length; i++) {
                        time = data[i].time.substring(2).replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').trim()
                        data[i].pid = time + data[i].order_id
                    }
                    this.setData({
                        data: data
                    })
                }.bind(this)
            })
        } else if (e.currentTarget.id == 1) {
            wx.request({
                url: 'https://viczhou.cn/vc_rest/order/getShopOrderPage',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                data: {
                    'shop_id': shop_id,
                    'limit': 50,
                    'page': page,
                    'desc': 3
                },
                success: function (res) {
                    let data = res.data
                    let time
                    for (let i = 0; i < data.length; i++) {
                        time = data[i].time.substring(2).replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').trim()
                        data[i].pid = time + data[i].order_id
                    }
                    this.setData({
                        data: data
                    })
                }.bind(this)
            })
        } else if (e.currentTarget.id == 0) {
            wx.request({
                url: 'https://viczhou.cn/vc_rest/order/getShopOrderPage',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                data: {
                    'shop_id': shop_id,
                    'limit': 50,
                    'page': page,
                    'desc': 1
                },
                success: function (res) {
                    let data = res.data
                    let time

                    for (let i = 0; i < data.length; i++) {
                        time = data[i].time.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').trim()
                        data[i].pid = time + data[i].order_id
                    }
                    this.setData({
                        data: data
                    })
                }.bind(this)
            })
        }
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });


    },
    tabBarClick: function (e) {
        var bar = wx.getSystemInfoSync().windowWidth / 4
        var num = Math.floor(e.detail.x / bar) + 1
        var msg = ['未处理', '已处理', '管理', '设置']

        this.setData({
            active: num
        })
        wx.setNavigationBarTitle({
            title: msg[num - 1]
        })

        if (num == 1) {

        } else if (num == 2) {
            wx.request({
                url: 'https://viczhou.cn/vc_rest/order/getShopOrderPage',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                data: {
                    'shop_id': shop_id,
                    'limit': 50,
                    'page': page,
                    'desc': 1
                },
                success: function (res) {
                    let data = res.data
                    let time

                    for (let i = 0; i < data.length; i++) {
                        time = data[i].time.substring(2).replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').trim()
                        data[i].pid = time + data[i].order_id
                    }
                    this.setData({
                        data: data
                    })
                }.bind(this)
            })
        } else if (num == 3) {
            wx.request({
                url: 'https://viczhou.cn/vc_rest/order/getShopOrderCount',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                data: {
                    shop_id: shop_id
                },
                success: function (res) {
                    this.setData({
                        total_money: res.data.total_sales,
                        oder_num: res.data.order_count
                    })
                }.bind(this)
            })
        }
    },
    makePhone: function () {
        wx.makePhoneCall({
            phoneNumber: '18566211755',
            success: function () {
                console.log("拨打电话成功！")
            }
        })
    },
    exitLogin: function () {
        wx.redirectTo({
            url: '/pages/index/index',
        })
    },
    isOpenDetail: function (e) {
        var data_res = this.data.data
        if (e.currentTarget.dataset.msg != undefined) {
            data_res = this.data.untreated_data
        }
        var d = e.currentTarget.id


        data_res[d].show = -data_res[d].show

        if (e.currentTarget.dataset.msg != undefined) {
            this.setData({
                untreated_data: data_res
            })
        } else {
            this.setData({
                data: data_res
            })
        }
    },
    //上拉刷新
    onReachBottom: function () {
          
    },
    acceptOrder:function(e){
        let that = this
        let order_id = e.currentTarget.dataset.id.substring(12)
        let index = e.currentTarget.dataset.index
        let table = e.currentTarget.dataset.table
        let data = this.data.untreated_data

        wx.request({
            url: 'https://viczhou.cn/vc_rest/order/pay',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            data:{
                order_id: order_id ,
                status: 1
            },
            success:function(res){
                if(res.data.msg == 0){
                    data.splice(index,1)
                    
                    that.setData({
                        untreated_data:data
                    })

                    wx.showToast({
                        title: '已确认' + table+'号桌订单',
                        icon:'none'
                    })
                }
            }
        })

    }
})