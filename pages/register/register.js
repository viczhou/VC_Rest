Page({
    disable: false,
    input_data: [0, 0],
    data: {
        msg: "获取验证码",
        regist_btn: true
    },
    clickCode: function () {
        if (this.disable) {
            return
        }
        this.disable = true

        var num = 60;
        let that = this
        wx.request({
            url: 'https://viczhou.cn/vc_rest/validate_code/getCode',
            method: 'POST',
            data: {
                'phone': this.input_data[0]
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {

                if (res.data.msg == 1) {
                    this.disable = false
                    wx.showToast({
                        title: '发送失败，请检查手机号',
                        icon: 'none'
                    })
                } else {
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
                }
            }.bind(this)
        })


    },
    checkCode: function (e) {
        this.input_data[1] = e.detail.value
        if (this.input_data[1].length === 6 && this.input_data[0].length === 11) {
            this.setData({ regist_btn: false })
        } else {
            this.setData({ regist_btn: true })
        }
    },
    checkPhone: function (e) {
        this.input_data[0] = e.detail.value
        if (this.input_data[1].length === 6 && this.input_data[0].length === 11) {
            this.setData({ regist_btn: false })
        } else {
            this.setData({ regist_btn: true })
        }
    },
    formSubmit: function (e) {

        wx.request({
            url: 'https://viczhou.cn/vc_rest/validate_code/validate',
            method: 'POST',
            data: {
                'phone': this.input_data[0],
                'code': this.input_data[1],
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
                //res.data.msg != 0
                let a = 1
                console.log(res.data)
                if (a != 1) {
                    wx.showToast({
                        title: '验证码错误！',
                        icon: 'none',
                        duration: 1500
                    })
                } else {
                    wx.showToast({
                        title: '注册成功',
                        icon: 'success',
                        duration: 800
                    })
                    setTimeout(function () {
                        wx.redirectTo({
                            url: '/pages/register/setpwd/setpwd?phone=' + e.detail.value.phone
                        })
                    }, 800)
                }
            }.bind(this),
            fail: function () {
                wx.showToast({
                    title: '服务器错误',
                    icon: 'none'
                })
            }
        })
    }
})