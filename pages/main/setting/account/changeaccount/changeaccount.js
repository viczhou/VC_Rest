Page({
    data: {
        msg: '验证码',
        regist_btn: true,
        phone: '',
        _code: '',
        code: true
    },
    checkPhone: function (e) {
        if (e.detail.value.length === 11) {
            this.setData({
                code: false,
                phone: e.detail.value
            })
        }
        if (this.data._code.length === 6 && this.data.phone.length === 11) {
            this.setData({ regist_btn: false })
        } else {
            this.setData({ regist_btn: true })
        }
    },
    clickCode: function (e) {
        if (this.disable || this.data.code) {
            return
        }
        this.disable = true

        var num = 60;

        wx.request({
            url: 'https://viczhou.cn/vc_rest/validate_code/getCode',
            method: 'POST',
            data: {
                'phone': this.data.phone
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
        if (e.detail.value.length == 6) {
            this.setData({
                _code: e.detail.value
            })
        }
        if (this.data._code.length === 6 && this.data.phone.length === 11) {
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
                'phone': this.data.phone,
                'code': this.data._code,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
                if (res.data.msg == 0) {
                    wx.request({
                        url: 'https://viczhou.cn/vc_rest/login/chang_phone',
                        method: 'POST',
                        data: {
                            new_phone: this.data.phone,
                            user_id: wx.getStorageSync('user_id')
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        success: function (e) {
                            if (e.data.msg == 0) {
                                wx.showToast({
                                    title: '更新成功，请重新登录',
                                    icon: 'none'
                                })
                                setTimeout(function () {
                                    wx.reLaunch({
                                        url: '/pages/index/index',
                                    })
                                }.bind(this), 1500)
                            }else {
                                wx.showToast({
                                    title: '服务器错误，请稍后重试',
                                    icon: 'none'
                                })
                            }
                        }
                    })
                } else {
                    wx.showToast({
                        title: '验证码错误',
                        icon: 'none'
                    })
                }
            }.bind(this),
        })


    }
})