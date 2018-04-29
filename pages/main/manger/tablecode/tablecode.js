Page({
    data: {
        hiddenmodalput: true,
        hiddenmodalcode:true,
        table_code: [ { 'table': '2', 'code_src': '/images/ceshi/qr.png' }, { 'table': '3', 'code_src': '/images/ceshi/qr.png' }, { 'table': '4', 'code_src': '/images/ceshi/qr.png' }]
    },

    onLoad: function () {
        //请求  获取table_code
        ////////////////
        //////////////
        ///////////////////////
        //////////////
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
    saveNewCode:function(){
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
            hiddenmodalcode:true
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
            ////
            ////生成失败提示
            /////////
            //success:function()生成成功显示二维码{
            let table_code = this.data.table_code
            table_code.push({ 'table': this.data.modalInput, 'code_src': 'https://qr.api.cli.im/qr?data=%E5%91%B5%E5%91%B5&level=H&transparent=true&bgcolor=%23FFFFFF&forecolor=&blockpixel=12&marginblock=2&logourl=%2F%2Foss-cn-hangzhou.aliyuncs.com%2Fpublic-cli%2Ffree%2F99653a68678413feaefe005c13cda2f81523608540.png&size=400&text=&logoshape=rect&fontsize=30&fontfamily=msyh.ttf&fontcolor=&incolor=%2339b778&outcolor=%23003562&background=images%2Fbackground%2Fbg18.png&qrcode_eyes=pin-3.png&wper=0.66&hper=0.66&lper=0.17&tper=0.12&eye_use_fore=1&qrpad=10&kid=cliim&key=33a31cd0655ff313ddae573cf55c5cda' })
            wx.showToast({
                title: '生成成功',
                duration:1000
            })
            this.setData({
                hiddenmodalcode:false,
                table_code: table_code
            })
            ////////////////////////////}

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