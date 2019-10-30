#Vue实战之喵喵电影
##day1 - 创建组件
###页面组件
+ 电影页面组件
+ 影院页面组件
+ 我的页面组件
###公共组件
+ 正在热映组件
+ 即将上映组件
+ 城市组件
+ 搜索组件
+ 影院列表组件
+ 登录组件
*重点知识总结*
1. 创建新的组件、路由、js等文件时，应该首先创建一个对应名字的文件夹，然后在文件夹里面创建的一个名为index的对应文件，这样既能够避免将所有的代码写在一起，而引起的代码复杂的问题，又能避免引入文件的路径复杂（只用找到对应名字的文件夹即可，系统会默认寻找当前目录下名为index的文件）
2. 当一个页面在注册公共的组件时，我们可以使用`component: () => import('[组件路径]')`这种方式按需导入，可以优化一定的性能。
3. 在导入外部文件时，由于当前项目的资源过多且目录结构复杂而引起的相对路径较为复杂的问题，我们可以通过`@`来解决，`@`表示的是当前项目src目录，因此我们可以通过`@`来使用绝对路径，引入外部文件。