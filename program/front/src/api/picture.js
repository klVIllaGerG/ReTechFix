import request from '@/utils/request'

//首页的走马灯部分
export function pictureget() {
    return request({
      url: '/DeviceType',
      method: 'get',
    })
  }