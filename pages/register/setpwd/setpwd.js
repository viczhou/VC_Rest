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
        console.log(e.detail)
        wx.request({
            url: 'https://viczhou.cn/vc_rest/register/regist',
            method:"POST",
            data: {
                'phone': this.phone,
                'password': e.detail.value.password,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success:function(res){
                if(!res.data.msg){
                    wx.showToast({
                        title: '设置成功',
                        icon: 'success',
                        duration: 800
                    })
                    setTimeout(function () {
                        wx.reLaunch({
                            url: '/pages/index/index?phone=' + this.phone
                        })
                    }.bind(this), 800)
                }
            }.bind(this)
        })
        
    }
})