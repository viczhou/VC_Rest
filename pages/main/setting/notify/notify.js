Page({
    sound:function(e){
        wx.setStorage({
            key: 'sound',
            data: e.detail.value,
        })
    },
    shake:function(e){
        wx.setStorage({
            key: 'shock',
            data: e.detail.value,
        })
    }
})