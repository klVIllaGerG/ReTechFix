import request from '@/utils/request'

//获取详情页图片
export function pictureget() {
    return request({
      url: '/DeviceType',
      method: 'get',
    })
  }

  /*详情信息*/

export function getdevicedata(params) {
  return request({
    url: '/DeviceType/{name}',
    method: 'get',
    params: {
      cate:params.cate,
      name:params.name,
      description:params.Description,
      price:params.Price,
      currentimageUrl:params.Img, // 图片路径根据实际情况进行调整
      imageList:params.ImgList
    }
  })
}