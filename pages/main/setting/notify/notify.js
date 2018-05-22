Page({
    data:{
        shake: wx.getStorageSync('shake'),
        sound: wx.getStorageSync('sound')
    },
    onShow:function(){
        this.setData({
            shake: wx.getStorageSync('shake'),
            sound: wx.getStorageSync('sound')
        })
    },
    sound:function(e){
        wx.setStorage({
            key: 'sound',
            data: e.detail.value,
        })
    },
    shake:function(e){
        wx.setStorage({
            key: 'shake',
            data: e.detail.value,
        })
    }
})