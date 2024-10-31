import { ITreeItem } from './filetree.service'

const server = 'http://localhost:3000'

const getFileApi = '/api/getfiles'
const getFileZipPathApi = '/api/getfilezip'

const saveFileApi = '/api/savefile'

const saveFile = async (path: string, content: string): Promise<any> => {
  const res = await fetch(`${server}${saveFileApi}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path,
      content
    })
  })
  const resData = await res.json()
  return resData.data
}

const getFileTree = async (path: string): Promise<ITreeItem[]> => {
  const res = await fetch(`${server}${getFileApi}?path=${path}`)
  const resData = await res.json()
  return resData.data
}

const getFileTreeZip = async (path: string): Promise<string> => {
  const res = await fetch(`${server}${getFileZipPathApi}?path=${path}`)
  const resData = await res.json()
  return resData.data
}

const getFileContent = async (path: string): Promise<string> => {
  const res = await fetch(path)
  const resData = await res.text()
  return resData
}

const getProject = async (): Promise<any> => {
  try {
    const res = await fetch(`${server}/api/getproject`)
    const resData = await res.json()
    return resData.data
  } catch (error) {
    return []
  }
}

const apiService = {
  getFileTree,
  getFileTreeZip,
  saveFile,
  getFileContent,
  getProject
}

export default apiService
