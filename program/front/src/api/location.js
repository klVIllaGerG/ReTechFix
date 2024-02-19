import request from '@/utils/request'

//获取地址信息
export function getLocationInfo(UserID) {
  return request({
    url: "/ServiceLoc/"+ UserID,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// 添加地址信息
export function addLocationInfo(params) {
  return request({
    url: `/ServiceLoc/${params.uid}`, 
    method: 'post',
    data: {
      Location_Name: params.Location_Name,
      Loc_Detail: params.Loc_Detail,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function editLocationInfo(params, id, locid) {
  return request({
    url: '/ServiceLoc/'+ id + '/' + locid,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      Location_Name: params.Location_Name,
      Loc_Detail: params.Loc_Detail,
    }
  });
}

export function deleteLocationInfo(locid) {
  return request({
    url: '/ServiceLoc/'+ locid,
    method: 'delete',
  });
}