# Vue实战之喵喵电影
## day1 - 创建组件
### 页面组件
+ 电影页面组件
+ 影院页面组件
+ 我的页面组件
### 公共组件
+ 正在热映组件
+ 即将上映组件
+ 城市组件
+ 搜索组件
+ 影院列表组件
+ 登录组件
### 重点知识总结
1. 创建新的组件、路由、js等文件时，应该首先创建一个对应名字的文件夹，然后在文件夹里面创建的一个名为index的对应文件，这样既能够避免将所有的代码写在一起，而引起的代码复杂的问题，又能避免引入文件的路径复杂（只用找到对应名字的文件夹即可，系统会默认寻找当前目录下名为index的文件）
2. 当一个页面在注册公共的组件时，我们可以使用`component: () => import('[组件路径]')`这种方式按需导入，可以优化一定的性能。
3. 在导入外部文件时，由于当前项目的资源过多且目录结构复杂而引起的相对路径较为复杂的问题，我们可以通过`@`来解决，`@`表示的是当前项目src目录，因此我们可以通过`@`来使用绝对路径，引入外部文件。

## day2 - 请求数据，渲染页面
### 重点知识总结
1. 关于跨域问题的解决方法：利用axios使用反向代理来进行跨域，具体做法如下：
    + 在项目根目录建立`vue.config.js`文件【此文件为vue默认的配置文件】
    + 在文件中写入如下代码：
    + 
        ```javascript
        module.exports = {
            devServer: { //反向代理
                proxy: {
                    '/api': { //代理的接口
                        target: 'http://39.97.33.178', //代理的目标地址
                        changeOrigin: true //是否切换源
                    }
                }
            }
        }
        ```
    + 将axios注册到全局Vue中，在其他页面使用axios请求数据：
    + 
        ```javascript
        //全局注册axios
        import axios from 'axios'
        Vue.property.axios = axios //注册到Vue的原型上

        //使用axios请求数据
        this.axios.get('/api/...').then(...) //请求的地址，从代理的接口开始
        ```
2. 在进行数据绑定的时候，有些数据的形式并不是我们期望的。这时，我们需要使用过滤器来生成需要的数据【全局/局部过滤器的选择方式：此过滤器是否被项目中的多个地方共用，是则选用全局过滤器，否则选用局部过滤器】，需要注意的是：对于一些数据不同，而最终呈现的样式不同的情况，我们也可以使用过滤器。
3. 当需要根据输入的内容进行查询时，我们应该使用`watch`来监听属性【此属性是输入框双向绑定的数据】。
    + 为什么使用`watch`而不是使用`computed`？
        + 在`vue`的官方文档中写到：当需要在数据变化时执行异步或开销较大的操作时，watch是最有用的。
        + 使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
4. 在输入框中一直输入内容时，立即查询是非常消耗性能【函数防抖现象】，常见的解决方式有两种：
    + 使用定时器完成
    + 
        ```javascript
        /**
        * @desc 函数防抖
        * @param func 函数
        * @param wait 延迟执行毫秒数
        * @param immediate true 表立即执行，false 表非立即执行
        */
        function debounce(func,wait,immediate) {
            let timeout;

            return function () {
                let context = this;
                let args = arguments;

                if (timeout) clearTimeout(timeout);
                if (immediate) {
                    var callNow = !timeout;
                    timeout = setTimeout(() => {
                        timeout = null;
                    }, wait)
                    if (callNow) func.apply(context, args)
                }
                else {
                    timeout = setTimeout(function(){
                        func.apply(context, args)
                    }, wait);
                }
            }
        }
        ```
    + 使用axios自带的方法（连续发送多次请求，取消上一次请求）
    + 
        ```javascript
         methods: {
            getMsg () {
                let CancelToken = axios.CancelToken
                let self = this
                axios.get('http://jsonplaceholder.typicode.com/comments', {
                cancelToken: new CancelToken(function executor(c) {
                    self.cancel = c
                    console.log(c)
                    // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
                })
                }).then(res => {
                    this.items = res.data
                }).catch(err => {
                    console.log(err)
                })


                //手速够快就不用写这个定时器了，点击取消获取就可以看到效果了
                setTimeout(function () {
                //只要我们去调用了这个cancel()方法，没有完成请求的接口便会停止请求
                self.cancel()
                }, 100)
            },
            //cancelGetMsg 方法跟上面的setTimeout函数是一样的效果，因为手速不够快，哦不，是因为网速太快，导致我来不及点取消获取按钮，数据就获取成功了
            cancelGetMsg () {
                // 在这里去判断你的id 1 2 3，你默认是展示的tab1，点击的时候不管你上一个请求有没有执行完都去调用这个cancel()，
                this.cancel()
            }
        }
        ```