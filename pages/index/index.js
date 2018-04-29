Page({
    data: {
        phone: ''
    },
    onLoad: function (option) {
        undefined !== option.phone && this.setData({ phone: option.phone })
    },
    formSubmit: function (e) {
        wx.request({
            url: 'https://viczhou.cn/vc_rest/login/check',
            method: 'POST',
            data: {
                'phone': e.detail.value.phone,
                'password': e.detail.value.password
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {

                let result = res.data.msg
                if (result == 1) {
                    wx.showToast({
                        title: '账号或密码错误',
                        icon: 'none',
                        duration: 1000
                    })
                } else {
                    wx.setStorage({
                        key: 'user_id',
                        data: res.data.user_id,
                    })

                    let title = result === 2 ? '登录成功！前往填写填写店铺信息' : '登录成功'
                    wx.showToast({
                        title: title,
                        icon: 'none'
                    })
                    setTimeout(function () {
                        if (result === 2) {
                            wx.redirectTo({
                                url: '/pages/information/addinf/addinf'
                            })
                        } else {
                            wx.redirectTo({
                                url: '/pages/main/index/index'
                            })

                            wx.setStorage({
                                key: 'shop_id',
                                data: res.data.shop_id,
                            })
                            
                        }
                    }, 1500)
                }
            }
        })
    }
})