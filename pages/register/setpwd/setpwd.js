Page({
    phone : '',
    data: {
        pwd_btn: true,
    },
    onLoad: function (option) {
        this.phone = option.phone
    },
    checkPwd: function (e) {
        if (e.detail.value.length > 7) {
            this.setData({ pwd_btn: false })
        }
    },
    formSubmit: function (e) {
        wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 800
        })
        setTimeout(function () {
            wx.reLaunch({
                url: '/pages/index/index?phone='+this.phone
            })
        }.bind(this), 800)
    }
})