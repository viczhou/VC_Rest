Page({
    data:{
        status:'营业中'
    },
    onLoad:function(){
        //请求营业状态



    },
    status:function(e){
        let status = e.detail.value
        if(status === false){
            this.setData({
                status:'已打烊'
            })
        } else {
            this.setData({
                status:'营业中'
            })
        }

        //请求服务器，更新状态
    }
})