Page({
    data: {
        phone: ''
    },
    onLoad: function (option) {
        undefined !== option.phone && this.setData({ phone: option.phone })
    },
    formSubmit: function (e) {
        var result = 0

        if (result === 0) {
            wx.redirectTo({
                url: '/pages/information/addinf/addinf'
            })
        }
    }
})