Page({
    data: {
        hiddenmodalput: true,
        hiddenmodalcode:true,
        table_code: [{ 'table': '1', 'code_src': 'https://pan.baidu.com/box-static/disk-header/header/img/star@2x.png?t=1521599641001' }, { 'table': '2', 'code_src': '/images/ceshi/qr.png' }, { 'table': '3', 'code_src': '/images/ceshi/qr.png' }, { 'table': '4', 'code_src': '/images/ceshi/qr.png' }, { 'table': '1568', 'code_src': 'https://pan.baidu.com/box-static/disk-header/header/img/star@2x.png?t=1521599641001' }]
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
            table_code.push({ 'table': this.data.modalInput, 'code_src': 'https://pan.baidu.com/box-static/disk-header/header/img/star@2x.png?t=1521599641001' })
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