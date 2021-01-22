const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:8795',
      changeOrigin: true,
      secure: false,
    })
  ),
  app.use(
    '/yahoo',
    createProxyMiddleware({
      target: 'https://api.login.yahoo.com/oauth2/get_token',
      changeOrigin: true,
      secure: false,
    })
  )
}