// eslint-disable-next-line no-unused-vars
const base64Uploader = (file, uploadUrl, headers, formName) => {
  let reader = new FileReader()
  return new Promise((accept, fail) => {
    reader.onload = () => accept({ errorCode: 0, data: { src: reader.result, href: file.name } })
    reader.onerror = () => fail(reader.error)
    setTimeout(() => reader.readAsDataURL(file), 5000 * Math.random())
  })
}

const fileUploader = (file, uploadUrl, headers) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('key', '31a649d5109d0cb87fb368e151502094')
  return new Promise((resolve, reject) => {
    fetch(uploadUrl, {
      method: 'post',
      headers: { ...headers },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getUploader = (url) => {
  return url ? fileUploader : base64Uploader
}
