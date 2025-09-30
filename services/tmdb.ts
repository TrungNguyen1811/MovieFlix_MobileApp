import instance from '@/services/axios'

export async function createRequestToken() {
  const res = await instance.get(`authentication/token/new`)
  return res.data
}

export async function createSession(requestToken: string) {
  const res = await instance.post(`/authentication/session/new`, {
    request_token: requestToken,
  })
  return res.data
}

export async function getAccountDetails(sessionId: string) {
  const res = await instance.get(`/account`, {
    params: { session_id: sessionId },
  })
  return res.data
}
