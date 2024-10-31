import { ElLoading } from 'element-plus'

let showTime = 0
let loading: any
const show = (msg?: string) => {
  loading = ElLoading.service({
    lock: true,
    text: msg || 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
    fullscreen: true
  })
  showTime = Date.now()
  return loading
}

let hideTime: any
const hide = () => {
  if (hideTime) {
    clearTimeout(hideTime)
    hideTime = null
  }
  const nowTime = Date.now()
  const remainTime = nowTime - showTime > 1000 ? 0 : 1000 - (nowTime - showTime)
  hideTime = setTimeout(() => {
    loading && loading.close()
  }, remainTime)
}

const loadingService = {
  show,
  hide
}

export default loadingService
