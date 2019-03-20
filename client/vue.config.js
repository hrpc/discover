module.exports = {
  lintOnSave: false,
  devServer: {
    // 设置主机地址
    host: '172.20.16.21',
    // 设置默认端口
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // 本地mock服务器地址
        pathRewrite: {'^/api' : ''},
        changeOrigin: true, // needed for virtual hosted sites
        // ws: true, // proxy websockets
      }
    },
  }
};
