import xhr from '@/service/xhr'

class TestService {

  test(params, that, cb) {
    return xhr(
      that,
      '/admin/test',
      'GET',
      params,
      cb)
  }

}

export default new TestService()
