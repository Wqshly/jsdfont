import {JSEncrypt} from 'jsencrypt'
export function encryptedData (data) {
  // 新建JSEncrypt对象
  let encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKO5Qdke8EIuexyRe1r7U6OM+acb4hjs016NyQ5JOB+7NFeKHw7rXI0EWwlGDHuCvLeR8y/Nhm6zFdsIO0dhZY8CAwEAAQ==')
  // 加密数据
  return encryptor.encrypt(data)
}
