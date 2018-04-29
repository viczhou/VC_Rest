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
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 175,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'id': '2',
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 275,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'id': '3',
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 375,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'id': '4',
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 475,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'id': '5',
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 575,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'id': '6',
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 675,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'id': '7',
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 775,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'id': '8',
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 875,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'id': '9',
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 975,
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
        /////
        /////
        ///

    },
    onLoad: function (opt) {
        let that = this
        //拿的店铺id

        console.log(opt.shop_id)
        this.setData({
            shop_id: opt.shop_id
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
        //ssss请求拿data

    },
    menuClick: function (e) {
        if (this.data.flag != e.currentTarget.dataset.idx) {
            this.setData({
                flag: e.currentTarget.dataset.idx
            })

            //请求数据
            //
            //
            ////
        }
        //console.log('点击了'+e.currentTarget.dataset.idx)
    },
    //更改input值
    changeMenuInput: function (e) {
        console.log(e.detail)

        let data = this.data.menu_data

        data[e.currentTarget.dataset.idx] = e.detail.value

        //更新后台数据
        //////
        //////
        //////
        ///////////////////////////
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
        console.log('删除' + e.currentTarget.dataset.idx)

        let data = this.data.menu_data

        data.splice(e.currentTarget.dataset.idx, 1)

        ///更新服务器数据,删除
        /////////
        //
        ///////////////////

        wx.setStorage({
            key: 'menu_data',
            data: data
        })
        this.setData({
            menu_data: data
        })
    },
    edit_menuClick: function (e) {
        this.setData({
            menu_isdisable: !this.data.menu_isdisable,
            edit_menuMsg: !this.data.menu_isdisable ? '编辑' : '完成编辑'
        })

        //将分类更新到服务器
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
                url: '/pages/main/manger/menumanger/addfood/addfood?flag=' + this.data.flag + '&menu=' + this.data.menu_data,
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
        /////////

        let data = this.data.food_data
        data.splice(idx_flag, 1)

        this.setData({
            food_data: data,
            hiddenDeleteToast: true
        })
    },
    editFood: function (e) {
        let food = this.data.food_data[e.currentTarget.dataset.idx]
        wx.navigateTo({
            url: '/pages/main/manger/menumanger/addfood/addfood?flag=' + this.data.flag + '&menu=' + this.data.menu_data + '&food_img=' + food.image + '&food_price=' + food.price + '&food_title=' + food.name + '&food_id=' + food.id,
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

            let that = this
            let data = this.data.menu_data

            data.push(this.data.modalInput)
            //采用缓存，避免要从服务器取，及时显示
            wx.setStorage({
                key: 'menu_data',
                data: data
            })

            this.setData({
                menu_data: data
            })

            //更新到后台,添加分类
            ////
            ////
            /////////

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