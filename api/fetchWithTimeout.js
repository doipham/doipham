export default async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => {
    controller.abort()
  }, timeout)
  const response = await fetch(resource, {
    headers: {
      ["x-api-key"]: "162C7D559DE4DD383DFD9867A456D8AA"
    },
    ...options,
    signal: controller.signal
  })
  clearTimeout(id)
  return response
}
