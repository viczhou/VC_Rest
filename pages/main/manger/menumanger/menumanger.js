Page({
    data: {
        //菜单列表
        menu_data: ['本店推荐', '蛋糕冰淇淋', '肉类', '饮料', '酒水', '蔬菜', '火锅'],
        //菜品列表
        food_data: [{
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 75,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 75,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
            }, {
                'image': 'https://viczhou.cn/zhou/1_.png',
                'price': 75,
                'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 75,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 75,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 75,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 75,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 75,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }, {
            'image': 'https://viczhou.cn/zhou/1_.png',
            'price': 75,
            'name': '超级麻辣好吃的不得了的牛肉偏偏呀'
        }],
        //用于检测是否激活菜单
        flag: 0,
        //菜单列表是否可以编辑
        menu_isdisable : true,
        edit_menuMsg:'编辑'
    },
    onLoad: function () {
        let that = this

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
    menuClick: function (e) {
        this.setData({
            flag: e.currentTarget.dataset.idx
        })
        console.log(e.currentTarget.dataset.idx)
    },
    edit_menuClick:function(e){
        console.log(e)
        this.setData({
            menu_isdisable: !this.data.menu_isdisable,
            edit_menuMsg: !this.data.menu_isdisable ? '编辑' : '完成编辑'
        })
    }
})