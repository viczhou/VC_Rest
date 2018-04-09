Page({
    data: {
        phone: ''
    },
    onLoad: function (option) {
        undefined !== option.phone && this.setData({ phone: option.phone })
    },
    formSubmit: function (e) {
        //提交登录到服务器   result为返回的登录结果
        var result = 0
        let title = ''
        //登录shibai 
        if (result == 2) {
            title = '账号或密码错误！'
            wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000
            })
        } else if (result == 0) {
            let shop_id = 0 //测试， 拿到的店铺id
            title = '登录成功！'

            //登录成功
            wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000
            })
            setTimeout(function () {
                if (result === 0) {
                    wx.redirectTo({
                        url: '/pages/main/index/index?shop_id=' + shop_id
                    })
                } else {

                }
            }, 2000)

        } else {

            //第一次登录

            title = '登录成功！前往填写填写店铺信息'

            wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000
            })
            setTimeout(function () {
                if (result === 0) {
                    wx.redirectTo({
                        url: '/pages/information/addinf/addinf'
                    })
                } else {

                }
            }, 2000)

        }
    }
})