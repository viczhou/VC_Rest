Page({
    data: {
    },
    onLoad: function (opt) {
        let that = this
        wx.request({
            //'url':'https://viczhou.cn/aaaa/test',
            url:'https://cli.im/api/qrcode/code?text=呵呵&&mhid=5hbOCw/uk8IhMHcqKtdRPKw',  //网页
            //url:'https://pan.baidu.com/share/qrcode?w=150&h=150&url=你的内容', //二进制
            success: function (res) {
                let result = /qrcode_plugins_img ="(.*?)"/g
                let a = result.exec(res.data)[1]
                let b = new Array(a)
                console.log(b)
                that.setData({
                    files: b
                })
            }
        })
        //new EventSource('https://viczhou.cn/aaaa/test')
        let array = opt.menu.split(',')
        let now = array[opt.flag]

        if (opt.food_id != undefined) {
            this.setData({
                food_id:opt.food_id,
                files: new Array(opt.food_img),
                food_price: opt.food_price,
                food_title: opt.food_title
            })
        }
        this.setData({
            flag: opt.flag,
            menu: array,
            menuPicker: now
        })
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        let that = this
        this.setData({
            menuPicker: that.data.menu[e.detail.value]
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
        /////////////
        ///
        ///
        //////////////////////
        if (this.data.food_id == undefined){
            //添加接口
        } else {
            //调用更新接口
        }
        

        wx.navigateBack()
    }

})