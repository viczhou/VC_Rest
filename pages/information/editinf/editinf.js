Page({

    longitude: '',
    latitude: '',
    data: {
        files: 'https://viczhou.cn/test.jpg',
        shop_address: ''
    },
    onLoad: function () {
        wx.request({
            url: 'https://viczhou.cn/vc_rest/shop/getShopInfo',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                shop_id: wx.getStorageSync('shop_id')
            },
            success: function (res) {
                wx.downloadFile({
                    url: res.data.shop_img, //仅为示例，并非真实的资源
                    success: function (res) {
                        if (res.statusCode === 200) {
                            let filePath = res.tempFilePath
                            this.setData({
                                files: new Array(filePath),
                            })
                        }
                    }.bind(this)
                })

                if (res.data.msg == 0) {
                    this.latitude = res.data.atitude
                    this.longitude = res.data.longitude
                    this.setData({
                        files:res.data.shop_img,
                        shop_address: res.data.shop_address,
                        shop_name: res.data.shop_name,
                        shop_phone: res.data.shop_phone,

                    })
                }
            }.bind(this)
        })
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
        if (e.detail.value.shop_name !== '' && e.detail.value.shop_phone !== '' && this.data.files !== undefined) {

            wx.uploadFile({
                url: 'https://viczhou.cn/vc_rest/shop/uploadImag',
                filePath: this.data.files[0],
                name: 'file_name',
                formData: {
                    'flag': 0,
                },
                success: function (res) {
                    let image_src = JSON.parse(res.data).img_src
                    ////////请求
                    wx.request({
                        url: 'https://viczhou.cn/vc_rest/shop/change',
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        data: {
                            shop_id: wx.getStorageSync('shop_id'),
                            shop_name: e.detail.value.shop_name,
                            'shop_phone': e.detail.value.shop_phone,
                            'resp_name': e.detail.value.resp_name,
                            'resp_phone': e.detail.value.resp_phone,
                            'shop_address': e.detail.value.shop_address,
                            'longitude': this.longitude, //经度
                            'latitude': this.latitude, //纬度
                            'shop_img': image_src
                        },
                        success: function (e) {
                            //console.log(res.data)
                            if (e.data.msg == 0) {
                                wx.showToast({
                                    title: '更新成功',
                                })
                                setTimeout(function(){
                                    wx.reLaunch({
                                        url: '/pages/main/index/index',
                                    })
                                },1200)
                            }
                        }
                    })

                    wx.showToast({
                        title: '更改成功！',
                    })
                    setTimeout(function () {
                        wx.navigateBack()
                    }.bind(this), 1500)
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