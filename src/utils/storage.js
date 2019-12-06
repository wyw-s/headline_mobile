/**
 * 封装token
 */
export const SetStorage = (name, value) => {
  // 储存token 因为此时得到 data 是对象，所以需要先转在存
  window.localStorage.setItem(name, JSON.stringify(value))
}

export const GetStorage = (name) => {
  // 获取token 把获取到的json转换为对象；
  return JSON.parse(window.localStorage.getItem(name))
}

export const RemoveStorage = (name) => {
  // 删除 token
  window.localStorage.removeItem(name)
}
