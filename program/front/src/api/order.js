import request from '@/utils/request';

export function getRecycleOrderInfo(id) {
  return request({
    url: `http://110.42.220.245:8081/RecycleOrder/${id}`,
    method: 'get'
  });
}

export function deleteRecycleOrderInfo(id, orderid) {
  return request({
    url: '/RecycleOrder/' + id + '/' + orderid,
    method: 'delete',
  });
}


export function getRepairOrderInfo(uid) {
  return request({
    url: `http://110.42.220.245:8081/RepairOrder/${uid}`,
    method: 'get'
  });
}

export function refundRepairOrder(uid,num) {
  return request({
    url:  `/Balance/Charge/${uid}?num=${num}`,
    method: 'post',
  });
}

export function deleteRepairOrderInfo(uid, id) {
  return request({
    url: '/RepairOrder/' + uid + '/' + id,
    method: 'delete',
  });
}