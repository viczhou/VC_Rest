var sliderWidth = 96;

Page({
    data: {
        active: 1,
        //退单数
        handback_count: 0,
        total_money: 0,
        oder_num: 0,
        grids: [0, 1, 2, 3, 4, 5],
        imgs: ['print', 'shop_info', 'qr_code', 'menu_manger', 'qr_code_manger', 'shop_status'],
        img_title: ['打印机', '餐厅信息', '查看桌码', '菜品管理', '桌码管理', '店铺状态'],
        urls: ['print/print', 'restinfo/restinfo', 'qrcode/qrcode', 'menumanger/menumanger', 'qrcodemanger/qrcodemanger', 'reststatus/reststatus'],
        tabs: ["全部订单", "退单", "未结账订单"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        //未处理数据
        untreated_data: [] ,
        //已处理，原始数据，后台获取
        data: [{
            'show': -1,
            'table': 9,
            'price': '425.00',
            'time': '2018-03-15 15:30:20',
            'pid': '2018030500441',
            'order_detail': [{
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 1,
                'price': 75,
                'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 3,
                'price': 5,
                'name': '超级网红大白菜'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 12,
                'price': 15,
                'name': '网红版脏脏包'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 2,
                'price': 15,
                'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
            }]
        },
        {
            'show': -1,
            'table': 9,
            'price': '425.00',
            'time': '2018-03-15 15:30:20',
            'pid': '2018030500441',
            'order_detail': [{
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 1,
                'price': 75,
                'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 3,
                'price': 5,
                'name': '超级网红大白菜'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 12,
                'price': 15,
                'name': '网红版脏脏包'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 2,
                'price': 15,
                'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
            }]
        },
        {
            'show': -1,
            'table': 9,
            'price': '425.00',
            'time': '2018-03-15 15:30:20',
            'pid': '2018030500441',
            'order_detail': [{
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 1,
                'price': 75,
                'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 3,
                'price': 5,
                'name': '超级网红大白菜'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 12,
                'price': 15,
                'name': '网红版脏脏包'
            },
            {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'count': 2,
                'price': 15,
                'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
            }]
        }
        ]
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
                    windowHeight: res.windowHeight
                });
            }
        })
    },

    topbarClick: function (e) {
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
        var d = e.currentTarget.id
        var data_res = this.data.data

        data_res[d].show = -data_res[d].show

        this.setData({
            data: data_res
        })
    },
    //上拉刷新
    onReachBottom: function () {
        console.log(1)
        this.setData({
            data: this.data.data.concat([{
                'show': -1,
                'table': 9,
                'price': '425.00',
                'time': '2018-03-15 15:30:20',
                'pid': '2018030500441',
                'order_detail': [{
                    'image': 'https://viczhou.cn/zhou/1_.png',
                    'count': 1,
                    'price': 75,
                    'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
                },
                {
                    'image': 'https://viczhou.cn/zhou/1_.png',
                    'count': 3,
                    'price': 5,
                    'name': '超级网红大白菜'
                },
                {
                    'image': 'https://viczhou.cn/zhou/1_.png',
                    'count': 12,
                    'price': 15,
                    'name': '网红版脏脏包'
                },
                {
                    'image': 'https://viczhou.cn/zhou/1_.png',
                    'count': 2,
                    'price': 15,
                    'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
                }]
            }])
        })
    }
})