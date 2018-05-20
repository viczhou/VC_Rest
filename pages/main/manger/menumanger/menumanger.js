let idx_flag = -1;
Page({
    data: {
        //菜单列表
        menu_data: ['本店推荐', '蛋糕冰淇淋', '肉类', '饮料', '酒水', '蔬菜', '火锅'],
        hiddenmodalput: true,
        hiddenDeleteToast: true,
        modalInputValue: '',

        //菜品列表
        food_data: [{
            'id': '1',
            'image': 'https://viczhou.cn/test.jpg',
            'price': 175,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }],
        //用于检测是否激活菜单
        flag: 0,
        //菜单列表是否可以编辑
        menu_isdisable: true,
        edit_menuMsg: '编辑'
    },
    //刷新页面
    onShow: function () {
        //请求菜品
        //  wx.request({
        //     url: 'https://viczhou.cn/vc_rest/food/getFood',
        //     method: 'POST',
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded' // 默认值
        //     },
        //     data:{
        //         menu_id: this.data.menu_data[0].menu_id
        //     },
        //     success:function(res){
        //         console.log(res.data)
        //     }
        // })

    },
    onLoad: function (opt) {
        let that = this

        wx.request({
            url: 'https://viczhou.cn/vc_rest/shop_menu/getMenu',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                shop_id: wx.getStorageSync('shop_id')
            },
            success: function (res) {
                wx.setStorageSync('menu_data', res.data.menu)
                that.setData({
                    menu_data: res.data.menu
                })

                wx.request({
                    url: 'https://viczhou.cn/vc_rest/food/getFood',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    data: {
                        menu_id: this.data.menu_data[0].menu_id
                    },
                    success: function (res) {
                        this.setData({
                            food_data: res.data.data
                        })
                    }.bind(this)
                })
            }.bind(this)
        })
    },
    menuClick: function (e) {
        if (this.data.flag != e.currentTarget.dataset.idx) {
            this.setData({
                flag: e.currentTarget.dataset.idx
            })
            //请求数据
            wx.request({
                url: 'https://viczhou.cn/vc_rest/food/getFood',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: {
                    menu_id: this.data.menu_data[this.data.flag].menu_id
                },
                success: function (res) {

                    if (res.data.msg == 0) {
                        this.setData({
                            food_data: res.data.data
                        })
                    }
                }.bind(this)
            })
        }
    },
    //更改input值
    changeMenuInput: function (e) {
        console.log(e.detail)

        let data = this.data.menu_data

        data[e.currentTarget.dataset.idx].menu_name = e.detail.value
        this.setData({
            flag: e.currentTarget.dataset.idx
        })
        /////////////////////////////////
        ////////////////////////////
        ////////////////////////////////
        let that = this
        wx.setStorage({
            key: 'menu_data',
            data: data
        })
        wx.getStorage({
            key: 'menu_data',
            success: function (res) {
                if (res.data !== '') {
                    that.setData({
                        menu_data: res.data
                    })
                }
            }
        })
    },
    //点击删除
    deleteMenu: function (e) {
        console.log(this.data.menu_data[e.currentTarget.dataset.idx].menu_id)
        //更新服务器数据,删除
        wx.request({
            url: 'https://viczhou.cn/vc_rest/shop_menu/delete',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                menu_id: this.data.menu_data[e.currentTarget.dataset.idx].menu_id
            }
        })
        let menu = this.data.menu_data
        menu.splice(e.currentTarget.dataset.idx, 1)
        wx.setStorage({
            key: 'menu_data',
            data: menu
        })
        this.setData({
            menu_data: menu
        })
    },
    edit_menuClick: function (e) {
        this.setData({
            menu_isdisable: !this.data.menu_isdisable,
            edit_menuMsg: !this.data.menu_isdisable ? '编辑' : '完成编辑'
        })
    },
    //添加分类
    addMenuClass: function () {
        //显示编辑框
        this.setData({
            modalInputValue: '',
            modalInput: '',
            hiddenmodalput: false
        })
    },
    //添加菜品
    addFood: function () {
        if (this.data.menu_data.length == 0) {
            wx.showToast({
                title: '分类为空，请先添加分类！',
                icon: 'none'
            })
        } else {
            wx.navigateTo({
                url: '/pages/main/manger/menumanger/addfood/addfood?flag=' + this.data.flag + '&menu=' + JSON.stringify(this.data.menu_data),
            })
        }
    },
    isDeleteFood: function (e) {
        this.setData({
            hiddenDeleteToast: false
        })
        idx_flag = e.currentTarget.dataset.idx
    },
    deleteFood: function () {

        ////////请求
        //删除food            console.log(e.currentTarget.dataset.idx)
        wx.request({
            url: 'https://viczhou.cn/vc_rest/food/delete',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                food_id: this.data.food_data[idx_flag].id
            },
            success: function (res) {
                if (res.data.msg == 0) {
                    wx.showToast({
                        title: '删除成功',
                        icon:'none',
                        duration:800
                    })
                    let data = this.data.food_data
                    data.splice(idx_flag, 1)
                    this.setData({
                        food_data: data,
                    })
                }
            }.bind(this)
        })
        this.setData({
            hiddenDeleteToast: true
        })

    },
    editFood: function (e) {
        let food = this.data.food_data[e.currentTarget.dataset.idx]

        console.log(food)
        wx.navigateTo({
            url: '/pages/main/manger/menumanger/addfood/addfood?flag=' + this.data.flag + '&menu=' + JSON.stringify(this.data.menu_data) + '&food_img=' + food.foodImg + '&food_price=' + food.foodPrice + '&food_title=' + food.foodName + '&food_id=' + food.id,
        })

    },
    cancelModal: function () {
        this.setData({
            hiddenmodalput: true,
            hiddenDeleteToast: true
        });
    },
    //确认  
    confirmModal: function (e) {
        if (this.data.modalInput != undefined && this.data.modalInput.trim().length != 0) {
            this.setData({
                hiddenmodalput: true
            })

            wx.request({
                url: 'https://viczhou.cn/vc_rest/shop_menu/add',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: {
                    shop_id: wx.getStorageSync('shop_id'),
                    menu_content: this.data.modalInput
                },
                success: function (res) {

                    let data = this.data.menu_data
                    data.push({ 'menu_id': res.data.menu_id, 'menu_name': this.data.modalInput })
                    wx.setStorage({
                        key: 'menu_data',
                        data: data
                    })

                    this.setData({
                        menu_data: data
                    })
                }.bind(this)
            })

        } else {
            wx.showToast({
                title: '请输入分类名',
                icon: 'none'
            })
        }
    },
    modalInputBlur: function (e) {
        this.setData({
            modalInput: e.detail.value
        })
    }
})