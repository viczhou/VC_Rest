Page({
    data: {
        number: 0
    },
    formSubmit: function (e) {
        console.log(e.detail.value.phone)
        console.log(e.detail.value.text)
        console.log(e.detail.value.phone.length)
        if (e.detail.value.phone.length < 11 || e.detail.value.text === null || e.detail.value.text === '') {
            wx.showToast({
                title: '请填写完联系方式及问题描述再提交',
                icon: 'none'
            })
        } else {
            wx.showToast({
                title: '提交成功! 感谢您的反馈',
                icon: 'none'
            })
            setTimeout(function () {
                this.setData({
                    phone: '',
                    text: '',
                    number:0
                })
            }.bind(this), 1500)

        }

    },
    input: function (e) {
        console.log(e.detail.value.length)
        this.setData({
            number: e.detail.value.length
        })
    }
})