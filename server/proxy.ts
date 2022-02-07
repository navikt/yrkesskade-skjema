import { createProxyMiddleware } from 'http-proxy-middleware';

export const doProxy = (path: string, target: string) => {
  return createProxyMiddleware(path, {
    changeOrigin: true,
    logLevel: process.env.NODE_ENV !== 'production' ? 'silent' : 'info',
    secure: true,
    target: `${target}`,
});
}
