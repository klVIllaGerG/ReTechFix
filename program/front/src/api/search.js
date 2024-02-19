import request from '@/utils/request'

/*设备搜索*/
export function searchDevices(params) {
  return request({
    url: `http://110.42.220.245:8081/Device/Search?keywords=${params}`,
    method: 'get'
  })
}