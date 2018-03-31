Page({
    data: {
        msg: '验证码'
    },
    clickCode: function () {
        if (this.disable) {
            return
        }
        this.disable = true

        var num = 60;

        this.setData({ msg: '已发送(' + num + 's)' })
        var interval = setInterval(function () {
            num -= 1
            this.setData({
                msg: '已发送(' + num + 's)',
                disable: true
            })
            if (num === 0) {
                this.setData({
                    msg: "获取验证码"
                })
                this.disable = false
                clearInterval(interval)
            }
        }.bind(this), 1000);
    },
    checkCode: function (e) {
        this.input_data[1] = e.detail.value
        if (this.input_data[1].length === 6 && this.input_data[0].length === 11) {
            this.setData({ regist_btn: false })
        } else {
            this.setData({ regist_btn: true })
        }
    },
    formSubmit: function (e) {

        wx.showToast({
            title: '更新成功，请重新登录',
            icon: 'none'
        })
        setTimeout(function () {
            wx.reLaunch({
                url: '/pages/index/index',
            })
        }.bind(this), 1500)
    }
})