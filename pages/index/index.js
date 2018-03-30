Page({
    data: {
        phone: ''
    },
    onLoad: function (option) {
        undefined !== option.phone && this.setData({ phone: option.phone })
    },
    formSubmit: function (e) {
        var result = 0
        var title = result === 0 ? '登录成功！前往填写填写店铺信息' : '登录成功'
        
        wx.showToast({
            title: title,
            icon:'none',
            duration: 2000
        })
        setTimeout(function(){
            if (result === 0) {
                wx.redirectTo({
                    url: '/pages/information/addinf/addinf'
                })
            } else {

            }
        },2000)
        
    }
})