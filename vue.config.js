module.exports = {
    devServer: { //反向代理
        proxy: {
            '/api': { //代理接口
                target: 'http://39.97.33.178', //代理目标
                changeOrigin: true
            }
        }
    }
}