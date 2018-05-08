Page({
    data: {
        showToast: true,
        search: false,
        data: []
    },
    confirmToast: function () {
        this.setData({
            showToast: false
        })
    },
    clickDevice:function(){
        wx.showToast({
            title: '连接中...',
            icon:'none',
            duration:600
        })
        setTimeout(function(){
            wx.showToast({
                title: '连接失败，请选择正确的打印机设备连接',
                icon: 'none',
                duration: 1000
            })
        },600)
    },
    onLoad: function () {
        //初始化蓝牙
        wx.openBluetoothAdapter({
            success: function (res) {
                //获取蓝牙状态
                wx.getBluetoothAdapterState({
                    success: function (res) {
                        console.log(res.available)
                        if (res.available) {
                            this.setData({
                                isOpenBluetooth: true
                            })
                            //扫描蓝牙
                            wx.startBluetoothDevicesDiscovery({

                                success: function (res) {
                                    this.setData({
                                        search: true
                                    })

                                    console.log(res)
                                    //蓝牙搜索结果
                                    wx.onBluetoothDeviceFound(function (res) {
                                        let data = this.data.data
                                        data.push(res.devices[0])
                                        this.setData({
                                            data: data
                                        })
                                    }.bind(this))
                                }.bind(this),
                            })
                            setTimeout(function () {
                                wx.stopBluetoothDevicesDiscovery({
                                    success: function (res) {
                                        console.log(res)
                                        this.setData({
                                            search: false
                                        })
                                        wx.showToast({
                                            title: '搜索完毕',
                                            icon: 'none',
                                            duration: 700
                                        })
                                    }.bind(this),
                                })
                            }.bind(this), 1000 * 60)
                        } else {
                            this.setData({
                                isOpenBluetooth: false
                            })
                        }
                    }.bind(this)
                })

            }.bind(this),

            fail: function (err) {
                this.setData({
                    isOpenBluetooth: false
                })

            }.bind(this)
        });
    }
})