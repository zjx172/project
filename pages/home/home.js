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
    currentlistnum:0,//0为默认 1为点赞 2为热度 区分加载哪种列表
    hidden:true,
    // scrollTop:0,
    scrollHeight:0,
    triggered:false
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
                that.data.currentlistnum=1;
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
        that.data.currentlistnum=2;
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
        that.data.originalarray=res.data;
        console.log(that.data.originalarray);
        that.data.currentlistnum=0;
        // that.setData({likearray:that.data.likearray})
        that.setData({
            // originalarray:res.data,
            array:res.data,
            // likearray:that.data.likearray
        });
        // console.log(that.data.array)
        // console.log(that.data.likearray);
        }
    });
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    // page = 0;
    // this.setData({
    //   list: [],
    //   scrollTop: 0
    // });
    // loadMore(this);
    console.log("重新加载");
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
    var that = this;
    // this.setData({
    //     triggered: true,
    //   })
    wx.showLoading({title:'加载中…'})
    wx.getSystemInfo({
        success: function (res) {
            that.setData({
              scrollHeight: res.windowHeight
            });
            // console.log("设备高度scrollHeight==" + res.windowHeight);
      }
    });
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
                        // res.data.forEach((item,index)=>{
                        //     if(item.like==1){
                        //         that.data.likearray.push(item);
                        //     }
                        // })
                        that.data.originalarray=res.data;
                        console.log(that.data.originalarray);
                         // that.setData({likearray:that.data.likearray})
                        that.setData({
                            // originalarray:res.data,
                            array:res.data,
                            // likearray:that.data.likearray
                        },function(){
                            wx.hideLoading();//???有延时
                        });
                        // console.log(that.data.array)
                        // console.log(that.data.likearray);
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
  },
  //   scroll: function (event) {
  //   //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
  //   this.setData({
  //     scrollTop: event.detail.scrollTop
  //   });
  //   // console.log("滚动时触发scrollTop==" + event.detail.scrollTop);
  // },
  // 
  // 
  topLoad: function () {
    // this.setData({
    //   scrollTop: 0
    // });
    wx.showLoading({title:'加载中…'})
    that.data.page=0;
    wx.request({
        url: 'http://192.168.31.249:3001/posts/home',
        method:'POST',
        data:{
          openid:that.data.openid,
          page:that.data.page
        },
        success (res) {
            // res.data.forEach((item,index)=>{
            //     if(item.like==1){
            //         that.data.likearray.push(item);
            //     }
            // })
            that.data.originalarray=res.data;
            console.log(that.data.originalarray);
             // that.setData({likearray:that.data.likearray})
            that.setData({
                // originalarray:res.data,
                array:res.data,
                // likearray:that.data.likearray
            },function(){
                wx.hideLoading();//???有延时
            });
            // console.log(that.data.array)
            // console.log(that.data.likearray);
            // users_like_this_post
        },
        fail:function(err){
          console.log(err);
        },//请求失败
    })
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    // page = 0;
    // this.setData({
    //   list: [],
    //   scrollTop: 0
    // });
    // loadMore(this);
    // console.log("重新加载");
  },

  //页面滑动到底部
  bindDownLoad: function () {
    console.log("lower");
    var that=this;
    console.log(that.data.currentlistnum);
    that.data.page++;
    console.log(that.data.page)
    var str='http://192.168.31.249:3001/posts/';
    switch (that.data.currentlistnum) {
        case 0:
            str=str+'home';
            break;
        case 1:
            str=str+'likelist';
            break;
        case 2:
            str=str+'hotlist';
            break;
    }
    console.log(str);
    wx.request({
        url:str,
        method:"POST",
        data:{
          openid:that.data.openid,
          page:that.data.page
        },
        success (res) {
            //显示加载中 用一个字段控制
            console.log('加载新的数据中！')
            console.log(res.data)
            switch (that.data.currentlistnum) {
            case 0:
                res.data.forEach((item,index)=>{
                    that.data.originalarray.push(item);
                })
                that.setData({
                    array:that.data.originalarray
                },function(){
                    //取消显示“加载中”
                    console.log("完成！")
                })
            break;
            case 1:
                res.data.forEach((item,index)=>{
                    that.data.likearray.push(item);
                })
                that.setData({
                array:that.data.likearray
                },function(){
                //取消显示“加载中”
                console.log("完成！")
                })
            break;
            case 2:
                res.data.forEach((item,index)=>{
                    that.data.mostlikearray.push(item);
                })
                that.setData({
                    array:that.data.mostlikearray
                },function(){
                //取消显示“加载中”
                console.log("完成！")
                })
            break;
            }
        },
    })
    //添加加载动画
    //请求数据 请求成功后关闭动画
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("???????????/");
    // this.onLoad();
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
    var that=this;
    // // console.log("tetetete");
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画
    wx.setNavigationBarTitle({
      title: '刷新中'
    })//动态设置当前页面的标题。
    // wx.showLoading({title:'加载中…'})
    wx.request({
        url: 'http://192.168.31.249:3001/posts/home',
        method:'POST',
        data:{
          openid:that.data.openid,
          page:that.data.page
        },
        success (res) {
            // res.data.forEach((item,index)=>{
            //     if(item.like==1){
            //         that.data.likearray.push(item);
            //     }
            // })
            that.data.originalarray=res.data;
            console.log(that.data.originalarray);
             // that.setData({likearray:that.data.likearray})
            that.setData({
                // originalarray:res.data,
                array:res.data,
                // likearray:that.data.likearray
            },function(){
                // wx.hideLoading();//???有延时
                wx.hideNavigationBarLoading();//隐藏导航条加载动画
                wx.setNavigationBarTitle({
                    title: 'Wechat'
                })
                wx.stopPullDownRefresh();//停止当前页面下拉刷新。
            });
            // console.log(that.data.array)
            // console.log(that.data.likearray);
            // users_like_this_post
        },
        fail:function(err){
          console.log(err);
        },//请求失败
    })
    // wx.hideNavigationBarLoading();//隐藏导航条加载动画
    // wx.setNavigationBarTitle({
    //   title: '刷新中'
    // })//动态设置当前页面的标题。
    //   wx.stopPullDownRefresh();//停止当前页面下拉刷新。
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.bindDownLoad();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})