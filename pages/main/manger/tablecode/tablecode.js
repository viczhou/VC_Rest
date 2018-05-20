Page({
    data: {
        hiddenmodalput: true,
        hiddenmodalcode: true,
        table_code: [{ 'table': '1', 'code_src': '/images/ceshi/qr.jpg' }, { 'table': '2', 'code_src': '/images/ceshi/qr.jpg' }, { 'table': '3', 'code_src': '/images/ceshi/qr.jpg' }]
    },

    onLoad: function () {
        //请求  获取table_code
        wx.request({
            url: 'https://viczhou.cn/vc/tablecode',
            method: 'GET',
            data: {

                'shop_id': wx.getStorageSync("shop_id")
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data)
                this.setData({
                    table_code: res.data
                })
            }.bind(this)
        })
    },

    gridclick: function (e) {
        var that = this

        wx.showActionSheet({
            itemList: ['保存到本地'],
            success: function (res) {
                if (res.tapIndex === 0) {
                    that.saveImage(that.data.table_code[e.currentTarget.dataset.idx].code_src)
                }
            }
        });
    },

    saveImage: function (filePath) {
        //网络图片需要临时路径才能保存

        wx.downloadFile({
            url: filePath,
            success: function (res) {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function () {
                        wx.showToast({
                            title: '保存成功',
                        })
                    },
                    fail: function () {
                        wx.showToast({
                            title: '保存失败',
                            icon: 'none'
                        })
                    }
                })
            },
            fail: function () {
                wx.showToast({
                    title: '网络错误，请检查网络',
                    icon: 'none'
                })
            }
        })

    },
    saveNewCode: function () {
        let len = this.data.table_code.length
        this.saveImage(this.data.table_code[len - 1].code_src)
    },
    btnClick: function () {
        this.setData({
            hiddenmodalput: false,
            modalInput: '',
        });
    },
    cancelModal: function () {
        this.setData({
            hiddenmodalput: true,
            hiddenmodalcode: true
        });
    },
    //确认  
    confirmModal: function (e) {
        if (this.data.modalInput != undefined && this.data.modalInput.trim().length != 0) {
            this.setData({
                hiddenmodalput: true
            })

            //console.log(this.data.modalInput)桌号
            //请求后台,添加桌码
            wx.request({
                url: 'https://viczhou.cn/vc/tablecode',
                method: 'POST',
                data: {
                    'table_id': this.data.modalInput,
                    'shop_id': wx.getStorageSync("shop_id")
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    if (res.data.msg == 0) {
                        let table_code = this.data.table_code
                        table_code.push({
                            'table': res.data.table, 'code_src': res.data.code_src
                        })

                        wx.showToast({
                            title: '生成成功',
                            duration: 1000
                        })
                        this.setData({
                            hiddenmodalcode: false,
                            table_code: table_code
                        })
                    }else {
                        wx.showToast({
                            title: '已经有该桌码',
                            duration: 1000,
                            icon:'none'
                        })
                    }
                }.bind(this),
                fail:function(){
                    wx.showToast({
                        title: '网络错误',
                        icon:'loading',
                        duration: 1000
                    })
                }
            })

        } else {
            wx.showToast({
                title: '请输入桌号',
                icon: 'none'
            })
        }
    },
    modalInputBlur: function (e) {
        this.setData({
            modalInput: e.detail.value
        })
    }
});