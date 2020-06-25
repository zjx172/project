// pages/demo1/demo1.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    textdata:"",
  },
  click:function(){
    var that = this;
    wx.chooseImage({
      count: 1,//只给选一个
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths[0]
        // console.log(tempFilePaths);
        wx.getFileSystemManager().readFile({
          filePath:res.tempFilePaths[0],
          encoding:'base64',
          success:res=>{
        //    console.log('data:image/png;base64,'+res.data);

            var tempFilePaths='data:image/png;base64,'+res.data;
            const item={
              src:tempFilePaths
            };
            that.data.array.push(item)
            that.setData({
              array:that.data.array
            });
            console.log(that.data.array);
          }
        })
        // console.log(tempFilePaths);
        // const item={
        //   src:tempFilePaths
        // };
        // that.data.array.push(item)
        // that.setData({
        //   array:that.data.array
        // });
        // console.log(that.data.array);
      }
    })
    // console.log(this.data.array);
  },
  connectt:function(){
    // console.log('tets');
    // console.log(this.data.array);
    this.setData({textdata:this.data.textdata})
    const post={
      text:this.data.textdata,
      photo:this.data.array,
    }
    console.log(post);
    // wx.request({
    //   url: 'http://localhost:3001/posts', //仅为示例，并非真实的接口地址
    //   success (res) {
    //     console.log('????')
    //     console.log(res.data)
    //   }
    // })
  },
  bindFormSubmit: function(e) {
    // console.log(e.detail.value.textarea)
    var that =this;
    console.log("????");
    this.setData({textdata:e.detail.value.textarea})
    // console.log(this.data.textdata);
    // const post={
    //   text:this.data.textdata,
    //   photo:this.data.array
    // }
    // console.log(post);
    // 
    // 
    
    wx.request({
      url: 'http://192.168.31.249:3001/posts', //仅为示例，并非真实的接口地址
      method:'POST',
      // header: {
      //   'content-type': 'application/json'
      // },
      data:{
        text:that.data.textdata,
        photo:that.data.array
      },
      success (res) {
        // console.log('????')
        console.log("上传成功！");
        // console.log(res.data)
        // wx.navigateTo({
        //     url: '../home/home',
        // })
        wx.switchTab({
          url: '/pages/home/home',
          success:function(){
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
            // console.log("???onLoad");
          }
        })
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that=this;
    // var page = getCurrentPages().pop();
    // console.log(page);
    // that.setData({
    //   textdata:false,
    //   array:false,
    // });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("<KMKMOKM");
    var that=this;
    that.setData({
      textdata:"",
      array:[],
    });
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