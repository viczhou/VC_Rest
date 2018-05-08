Page({
    formSubmit: function (e) {
        wx.request({
            url: 'https://viczhou.cn/vc_rest/login/change_pwd',
            method: 'POST',
            data: {
                'old_password': e.detail.value.old_password,
                'new_password': e.detail.value.new_password,
                user_id: wx.getStorageSync('user_id')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
                if (res.data.msg == 0) {
                    wx.showToast({
                        title: '更新成功，请重新登录',
                        icon: 'none'
                    })
                    setTimeout(function () {
                        wx.reLaunch({
                            url: '/pages/index/index',
                        })
                    }.bind(this), 1500)
                } else {
                    wx.showToast({
                        title: '原密码错误',
                        icon:'none'
                    })
                }
            }
        })
    }
})