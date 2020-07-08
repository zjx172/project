# project  
##待完成功能：  
    1、点赞列表（后端控制）(完成)  
    2、热度列表（后端控制）（完成）  
    3、一次只请求十条数据（完成）  
    4、时间排序（完成）  
    5、跳转之后新加的数据显示在第一条（完成）  
    6、骨架屏  
    7、加载数据的时候提示刷新  
    8、分享功能（完成）  
    9、加入下拉刷新scrollview  
    10、懒加载  
    11、真机调试  
    12、数据性能优化（完成）  
    13、点击图片预览（完成）  
##新增功能：  
    1、详情页跳转  
    2、搜索栏  
    3、分类  
##待性能优化：  
    1、上传页实现删除图片  
    2、图片支持选择多张  
    3、支持切换排列顺序  
    4、帖子详情页  
    5、展开收起（前端控制字数）  
    6、数据传输长度为 3841 KB，存在有性能问题！  
    7、小程序切换tag的时候刷新界面  
    8、发布文字的输入框自动变长  
##分页查询的sql语句:  
 db.表名.find().skip((page-1)*pageSize).limit(pageSize)  
##列表下拉刷新加载教程:  
<!-- https://blog.csdn.net/cplvfx/article/details/78355866?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase -->  
##微信小程序 初始化进入首页时 onShow加载两次解决方法  
<!-- https://blog.csdn.net/weixin_42286528/article/details/92445878 -->
##微信小程序生命周期  
<!-- https://blog.csdn.net/henryhu712/article/details/82381287 -->
##微信小程序onLoad、onShow、onHide、onUnload区别  
<!-- https://blog.csdn.net/ljy950914/article/details/91384311 -->
##使用setData修改数组或对象中的某一参数
<!-- 既然知道是以键值对的方式进行传参，那么我们在修改数组和对象的时候就直接将要修改的参数名写成对应字符串就可以了，然后使用[]将字符串括起来，这就告诉编译器这是指向的是该字符对应的实际位置，如下：

var authority = 'buttonGroup.authority'
      that.setData({
        [authority]: parseInt(level)
      })

var printPrice = "item["+i+"].print_price";
          this.setData({
            [printPrice]: e.detail.value 
          }); -->