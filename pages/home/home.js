// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:6,
    array:[],//显示列表
    originalarray:[],//默认时间排序
    likearray:[],//点赞排序
    mostlikearray:[],//热度排序
    change:true,
    openid:'',
    page:0,
  },
  likelist:function(){
    // console.log('likelist');
    var that=this;
    // console.log(this.data.originalarray);
    // this.setData({
    //     array:that.data.likearray
    // })
    that.data.page=0;
     wx.request({
        url: 'http://192.168.31.249:3001/posts/likelist',
        method:'POST',
        data:{
          openid:that.data.openid,
          page:that.data.page
        },
        success (res) {
                console.log(res.data);
                that.data.likearray=res.data;
                console.log("点赞接口");
                that.setData({
                    // originalarray:res.data,
                  array:that.data.likearray
                  // likearray:that.data.likearray
                });
        }
    })

    // wx.request({
    //     url: 'http://192.168.31.249:3001/posts/likelist', //仅为示例，并非真实的接口地址
    //     method:'GET',
    //     data:{
    //         openid:that.data.openid
    //     },
    //     success:function(res){

    //     }
    // })
  },
  hotlist:function(){
    var that=this;
    that.data.page=0;
    wx.request({
        url: 'http://192.168.31.249:3001/posts/hotlist',
        method:'POST',
        data:{
        openid:that.data.openid,
        page:that.data.page
    },
    success (res) {
        console.log(res.data);
        that.data.mostlikearray=res.data;
        that.setData({
            array:that.data.mostlikearray
        });
        }
    });
  },
  defalutlist:function(){
    var that=this;
    that.data.page=0;
    wx.request({
        url: 'http://192.168.31.249:3001/posts/home',
        method:'POST',
        data:{
        openid:that.data.openid,
        page:that.data.page
    },
    success (res) {
        // console.log(res.data);
        // console.log('????')
        res.data.forEach((item,index)=>{
            // console.log(item);
            if(item.like==1){
                that.data.likearray.push(item);
            }
        })
        that.data.originalarray=res.data;
        console.log(that.data.originalarray);
        // that.setData({likearray:that.data.likearray})
        that.setData({
            // originalarray:res.data,
            array:res.data,
            // likearray:that.data.likearray
        });
        // console.log(that.data.array)
        console.log(that.data.likearray);
        }
    });



  },
  Submit:function(e){
    var that=this
    // console.log(e.currentTarget.dataset)
    // const itemm=e.currentTarget.dataset
    // console.log(item)
    const index=e.currentTarget.dataset.index
    const id=e.currentTarget.dataset.item._id
    var _array = this.data.array
    var item=_array[index]
    var key = "array["+ index + "]"
    if(item.like==0){
        item.like=1
        item.likenumber++;
      }else{
        item.like=0
        item.likenumber--;
      }
    this.setData({
        array:_array
      },()=>{
        // console.log(this.data.array[index].like)
    })
    // console.log(that.data.openid)
    wx.request({
        url:"http://localhost:3001/posts/"+id,
        method:'POST',
        data:{
          id:id,
          like:item.like,
          openid:that.data.openid
      },
        success (res) {
          // console.log(res.data)
        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://192.168.31.249:3001/posts/login',
            method:'POST',
            data: {
              code: res.code
            },
            success (res) {
                console.log('成功！');
                console.log(res.data);
                that.setData({
                    openid:res.data.data.openid
                })
                wx.request({
                    url: 'http://192.168.31.249:3001/posts/home',
                    method:'POST',
                    data:{
                      openid:that.data.openid,
                      page:that.data.page
                    },
                success (res) {
                    // console.log(res.data);
                    // console.log('????')
                    res.data.forEach((item,index)=>{
                        // console.log(item);
                        if(item.like==1){
                            that.data.likearray.push(item);
                        }

                    })
                    that.data.originalarray=res.data;
                    console.log(that.data.originalarray);
                     // that.setData({likearray:that.data.likearray})
                    that.setData({
                        // originalarray:res.data,
                      array:res.data,
                      // likearray:that.data.likearray
                    });
                    // console.log(that.data.array)
                    console.log(that.data.likearray);
                   // users_like_this_post
            },
                fail:function(err){
                  console.log(err);
                },//请求失败
            })
                //console.log(that.data.openid);
            },
             fail:function(err){
                console.log(err);
            },//请求失败
          })
        }
        else {
            console.log('登录失败！' + res.errMsg)
          }
      }
    })
    // wx.request({
    //   url: 'http://localhost:3001/posts', //仅为示例，并非真实的接口地址
    //   method:'GET',
    //   success (res) {
    //     console.log('????')
    //     that.setData({
    //       array:res.data
    //     });
    //     console.log(that.data.array)
    //   },
    //   fail:function(err){
    //     console.log(err);
    //   },//请求失败
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})