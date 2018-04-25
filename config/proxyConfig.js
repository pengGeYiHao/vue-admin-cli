module.exports = {
    proxyList: {
      '/newadmin':{
          target: 'http://10.10.1.22:8080',
          pathRewrite: {
            '^/newadmin': '/newadmin'
          }
      },
      '/admin':{
        target: 'http://10.10.1.22:8080',
        pathRewrite: {
          '^/admin': '/admin'
        }
      }
    }
  }
