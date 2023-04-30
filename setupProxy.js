const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        createProxyMiddleware('http://localhost:3006',{
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    )
}