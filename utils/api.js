const API_BASE = 'http://178.63.13.157:8090/mock-api/api/'

export default function api(endpoint, { body, ...customConfig } = {}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }

  return window
    .fetch(`${API_BASE}${endpoint}`, config)
    .then(async (response) => {
      if (response.ok) {
        return await response.json()
      } else {
        const errorMessage = await response.text()
        return Promise.reject(new Error(errorMessage))
      }
    })
    .catch((error) => {
      const errorMessage = error.message
      return Promise.reject(new Error(errorMessage))
    })
}
