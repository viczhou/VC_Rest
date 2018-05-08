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
        let shop_id = 0
        
        if (e.detail.value.shop_name !== '' && e.detail.value.shop_phone !== '' && e.detail.value.shop_licence !== '' && this.data.files !== undefined) {
            let that = this

            wx.uploadFile({
                url: 'https://viczhou.cn/vc_rest/shop/uploadImag',
                filePath: this.data.files[0],
                name: 'file_name',
                formData: {
                    'flag': 0,
                },
                success: function (res) {
                    let image_src = JSON.parse(res.data).img_src
                    let user_id = wx.getStorageSync('user_id')
                    wx.request({
                        url: 'https://viczhou.cn/vc_rest/shop/register',
                        method: 'POST',
                        data: {
                            'shop_img': image_src,
                            'shop_phone': e.detail.value.shop_phone,
                            'shop_license': e.detail.value.shop_licence,
                            'resp_name': e.detail.value.resp_name,
                            'resp_phone': e.detail.value.resp_phone,
                            'shop_address': e.detail.value.shop_address,
                            'shop_name': e.detail.value.shop_name,
                            'longitude': this.longitude,
                            'latitude': this.latitude,
                            'user_id': user_id
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            console.log(res)
                            if( res.data.msg == 0 ){
                                wx.setStorage({
                                    key: 'shop_id',
                                    data: res.data.shop_id
                                })
                                wx.redirectTo({
                                    url: '/pages/main/index/index',
                                })
                            }
                           
                        }
                    })
                }.bind(this)
            })

        } else {
            wx.showToast({
                title: '请填写完必填信息后提交',
                icon: 'none',
                duration: 1200
            })
        }

    }
})