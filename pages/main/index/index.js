Page({
    data: {
        active: 1,
        total_money: 0,
        oder_num: 0,
        grids: [0, 1, 2, 3, 4, 5],
        imgs: ['print', 'shop_info', 'qr_code', 'menu_manger', 'qr_code_manger', 'shop_status'],
        img_title: ['打印机', '餐厅信息', '查看桌码', '菜品管理', '桌码管理', '店铺状态'],
        urls: ['print/print', 'restinfo/restinfo', 'qrcode/qrcode', 'menumanger/menumanger', 'qrcodemanger/qrcodemanger', 'reststatus/reststatus']
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