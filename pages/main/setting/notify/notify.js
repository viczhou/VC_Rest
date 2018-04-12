Page({
    sound:function(e){
        wx.setStorage({
            key: 'sound',
            data: e.detail.value,
        })
    },
    shock:function(e){
        wx.setStorage({
            key: 'shock',
            data: e.detail.value,
        })
    }
})