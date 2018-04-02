var sliderWidth = 96;

Page({
    data: {
        active: 1,
        total_money: 0,
        oder_num: 0,
        grids: [0, 1, 2, 3, 4, 5],
        imgs: ['print', 'shop_info', 'qr_code', 'menu_manger', 'qr_code_manger', 'shop_status'],
        img_title: ['打印机', '餐厅信息', '查看桌码', '菜品管理', '桌码管理', '店铺状态'],
        urls: ['print/print', 'restinfo/restinfo', 'qrcode/qrcode', 'menumanger/menumanger', 'qrcodemanger/qrcodemanger', 'reststatus/reststatus'],
        tabs: ["全部", "退单", "异常"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        data: [{ 'table': 9, 'price': '425.00', 'time': '2018-03-15 15:30:20', 'pid': '2018030500001' }, { 'table': 49, 'price': '475.00', 'time': '2018-03-15 15:30:20', 'pid': '2018030500001' }, { 'table': 45, 'price': '275.00', 'time': '2018-03-15 15:30:20', 'pid': '2018030500001' }, { 'table': 5, 'price': '755.00', 'time': '2018-03-15 15:30:20', 'pid': '2018030500001' }, { 'table': 46, 'price': '25.00', 'time': '2018-03-15 15:30:20', 'pid': '2018030500001' }]

    },
    onLoad:function(){
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
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
    exitLogin:function(){
        wx.redirectTo({
            url: '/pages/index/index',
        })
    }
})