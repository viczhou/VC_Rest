Page({
    data: {
        status: '营业中',
        check: 'true'
    },
    onLoad: function () {
        //请求营业状态
        wx.request({
            url: 'https://viczhou.cn/vc/FindShopStatus',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                shop_id: wx.getStorageSync('shop_id')
            },
            success: function (res) {
                if (res.data.msg == 0) {
                    if (res.data.status) {
                        this.setData({
                            status: '已打烊',
                            check: false
                        })
                    } else {
                        this.setData({
                            status: '营业中',
                            check: true
                        })
                    }
                }
            }.bind(this)
        })


    },
    status: function (e) {
        let status = e.detail.value
        if (status === false) {
            this.setData({
                status: '已打烊',
                check: false
            })
        } else {
            this.setData({
                status: '营业中',
                check: true
            })
        }

        //请求服务器，更新状态
        wx.request({
            url: 'https://viczhou.cn/vc_rest/shop/changeStatus',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                shop_id: wx.getStorageSync('shop_id'),
                status: status ? 0 : 1
            }
        })
    }
})