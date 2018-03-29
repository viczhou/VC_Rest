Page({
    longitude: '',
    latitude: '',
    data: {
        shop_address: ''
    },
    onLoad: function () {



    },
    mapClick: function () {
        var that = this
        wx.chooseLocation({
            success: function (res) {
                that.setData({
                    shop_address: res.address
                })

                that.latitude = res.latitude
                that.longitude = res.longitude
            }
        })
    },
    chooseImage: function (e) {
        var that = this;

        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: res.tempFilePaths

                });
                console.log(res.tempFilePaths)
            }
        })
    },
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    }
})