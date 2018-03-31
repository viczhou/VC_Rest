Page({

    longitude: '',
    latitude: '',
    data: {
        files: 'https://viczhou.cn/zhou/1_.png',
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
            count: 1,
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: res.tempFilePaths

                });
                console.log(res.tempFilePaths)
            }
        })
    },
    imgClick: function () {
        this.imgMenu()
    },
    imgMenu: function () {
        var that = this

        wx.showActionSheet({
            itemList: ['查看大图', '重新选择'],
            success: function (res) {
                if (res.tapIndex === 1) {
                    that.chooseImage()
                } else if (res.tapIndex === 0) {
                    wx.previewImage({
                        urls: that.data.files
                    })
                }
            }
        });
    },
    formSubmit: function (e) {
        if (e.detail.value.shop_name !== '' && e.detail.value.shop_phone !== '' && e.detail.value.shop_licence !== '' && this.data.files !== undefined) {
            ////////请求

            wx.showToast({
                title: '更改成功！',
            })
            setTimeout(function () {
                wx.navigateBack()
            }.bind(this), 1500)

        } else {
            wx.showToast({
                title: '请填写完必填信息后提交',
                icon: 'none',
                duration: 1200
            })
        }

    }
})