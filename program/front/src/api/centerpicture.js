

// //维修中心信息获取
// import request from '@/utils/request';

// // 从服务器获取数据的函数
// export function getData(params) {
//   return request({
//     url: '/ServiceCenter', // 根据实际的服务器接口地址进行替换
//     method: 'get',
//     params: {
//         id: params.ID,
//         name: params.Name,
//         loc_detail: params.Loc_Detail,
//         tel: params.Tel,
//         image: params.TIMG_URL,
//       }
//   });
// }

import request from '@/utils/request';

// Function to fetch all service centers
export function getAllServiceCenters() {
  return request({
    url: 'http://110.42.220.245:8081/ServiceCenter',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Function to fetch service center by location
export function getServiceCenterByLocation(location) {
  return request({
    url: `http://110.42.220.245:8081/ServiceCenter/${location}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
