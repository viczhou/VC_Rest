Page({
    data: {
    },
    onLoad: function (opt) {
        let that = this
        // wx.request({
        //     //'url':'https://viczhou.cn/aaaa/test',
        //     url:'https://cli.im/api/qrcode/code?text=呵呵&&mhid=5hbOCw/uk8IhMHcqKtdRPKw',  //网页
        //     //url:'https://pan.baidu.com/share/qrcode?w=150&h=150&url=你的内容', //二进制
        //     success: function (res) {
        //         let result = /qrcode_plugins_img ="(.*?)"/g
        //         let a = result.exec(res.data)[1]
        //         let b = new Array(a)
        //         console.log(b)
        //         that.setData({
        //             files: b
        //         })
        //     }
        // })
        //new EventSource('https://viczhou.cn/aaaa/test')

        let menu_array = JSON.parse(opt.menu)

        let now = menu_array[opt.flag].menu_name

        if (opt.food_id != undefined) {
            wx.downloadFile({
                url: opt.food_img, //仅为示例，并非真实的资源
                success: function (res) {
                    if (res.statusCode === 200) {
                        let filePath = res.tempFilePath
                        this.setData({
                            food_id: opt.food_id,
                            files: new Array(filePath),
                            food_price: opt.food_price,
                            food_title: opt.food_title
                        })
                    }
                }.bind(this)
            })
            this.setData({
                food_id: opt.food_id,
                food_price: opt.food_price,
                food_title: opt.food_title
            })
        }

        let menu_name = []
        for (let i = 0; i < menu_array.length; i++) {
            menu_name.push(menu_array[i].menu_name)
        }

        this.setData({
            flag: opt.flag,
            menu: menu_array,
            menu_name: menu_name,
            menuPicker: now
        })
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            menuPicker: this.data.menu_name[e.detail.value],
            flag: e.detail.value
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
        //提交到服务器
        console.log(e.detail.value)
        if (e.detail.value.menu == '' || e.detail.value.food_price == '' || e.detail.value.food_title == '' || this.data.files == [] || this.data.files == undefined) {
            wx.showToast({
                title: '请填写完整再提交',
                icon: 'none'
            })
            return;
        }
        wx.uploadFile({
            url: 'https://viczhou.cn/vc_rest/shop/uploadImag',
            filePath: this.data.files[0],
            name: 'file_name',
            formData: {
                'flag': 0,
            },
            success: function (res) {
                let image_src = JSON.parse(res.data).img_src

                if (this.data.food_id == undefined) {

                    wx.request({
                        url: 'https://viczhou.cn/vc_rest/food/add',
                        method: 'POST',
                        data: {
                            'menu_id': this.data.menu[this.data.flag].menu_id,
                            'food_img': image_src,
                            'food_name': e.detail.value.food_title,
                            'food_price': e.detail.value.food_price
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            if (res.data.msg == 0) {
                                wx.showToast({
                                    title: '添加成功',
                                    icon: 'none',

                                })

                                setTimeout(function () {
                                    wx.navigateBack()
                                }, 1000)
                            } else {
                                wx.showToast({
                                    title: '服务器错误',
                                    icon: 'none',
                                })
                            }
                        }.bind(this)
                    })
                    //添加接口
                } else {
                    //调用更新接口
                    wx.request({
                        url: 'https://viczhou.cn/vc_rest/food/update',
                        method: 'POST',
                        data: {
                            'food_id': this.data.food_id,
                            'menu_id': this.data.menu[this.data.flag].menu_id,
                            'food_img': image_src,
                            'food_name': e.detail.value.food_title,
                            'food_price': e.detail.value.food_price
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            if (res.data.msg == 0) {
                                wx.showToast({
                                    title: '更新成功',
                                    icon: 'none',

                                })

                                setTimeout(function () {
                                    wx.navigateBack()
                                }, 1000)
                            } else {
                                wx.showToast({
                                    title: '服务器错误',
                                    icon: 'none',
                                })
                            }
                        }.bind(this)
                    })
                }


            }.bind(this)
        })



    }

})