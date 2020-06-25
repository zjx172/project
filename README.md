# project  
##待完成功能：  
    1、点赞列表（后端控制）(完成)  
    2、热度列表（后端控制）（完成）  
    3、一次只请求十条数据（完成）  
    4、时间排序（完成）  
    5、跳转之后新加的数据显示在第一条  
    6、骨架屏  
    7、加载数据的时候提示刷新  
    8、分享功能  
    9、加入下拉刷新scrollview  
##待性能优化：  
    1、上传页实现删除图片  
    2、图片支持选择多张  
    3、支持切换排列顺序  
    4、帖子详情页  
    5、展开收起（前端控制字数）  
    6、数据传输长度为 3841 KB，存在有性能问题！  
##分页查询的sql语句:  
 db.表名.find().skip((page-1)*pageSize).limit(pageSize)  
##列表下拉刷新加载教程:  
<!-- https://blog.csdn.net/cplvfx/article/details/78355866?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase -->  
