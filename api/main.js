import createRequest from '../utils/request'

export function loginRequest(data) {
  return createRequest({
    url: '/login',
    method: 'POST',
    data,
    needLogin: false
  })
}

export function getScoreListRequest(data) {
  return createRequest({
    url: '/scores',
    data
  })
}

export function getRawScoreListRequest(data) {
  return createRequest({
    url: '/raw-scores',
    data
  })
}

export function getCourseListRequest(data) {
  return createRequest({
    url: '/courses',
    data
  })
}