const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/yrkesskade/redirect-til-login',
    createProxyMiddleware({
      target: 'http://localhost:3000/',
      changeOrigin: true
    })
  )

  app.use(
    '/yrkesskade/success',
    createProxyMiddleware({
      target: 'http://localhost:3000/',
      changeOrigin: true
    })
  )

  app.use(
    '/yrkesskade/innlogget',
    createProxyMiddleware({
      target: 'http://localhost:3000/',
      changeOrigin: true
    })
  )

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000/',
      changeOrigin: true
    })
  )
}
