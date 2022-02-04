const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {

  const host = process.env.HOST || 'localhost';

  app.use(
    '/yrkesskade/redirect-til-login',
    createProxyMiddleware({
      target: `http://${host}:3000/`,
      changeOrigin: true
    })
  )

  app.use(
    '/yrkesskade/success',
    createProxyMiddleware({
      target: `http://${host}:3000/`,
      changeOrigin: true
    })
  )

  app.use(
    '/yrkesskade/innlogget',
    createProxyMiddleware({
      target: `http://${host}:3000/`,
      changeOrigin: true
    })
  )

  app.use(
    '/yrkesskade/toggles',
    createProxyMiddleware({
      target: `http://${host}:3000/`,
      changeOrigin: true
    })
  )

  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${host}:3000/`,
      changeOrigin: true
    })
  )
}
