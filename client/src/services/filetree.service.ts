import { reactive } from 'vue'

interface ITreeItem {
  label: string
  path: string
  isDirectory: boolean
  filePath: string
  ext: string
  children?: ITreeItem[]
  name: string
  folderPath: string
}

const treeSelectItems = reactive({
  items: [] as ITreeItem[],
  currentItem: {} as ITreeItem
})

function getCurrentItem() {
  return treeSelectItems.currentItem
}

function setTreeSelectItem(items: ITreeItem) {
  if (items.isDirectory) {
    return
  }
  treeSelectItems.currentItem = items
  if (treeSelectItems.items.some((i) => i.path === items.path)) {
    return
  }
  treeSelectItems.items.push(items)
}

function getTreeSelectItem() {
  return treeSelectItems.items
}

function clearTreeSelectItem() {
  treeSelectItems.items = []
}

function delSelectTreeItem(path: string) {
  treeSelectItems.items = treeSelectItems.items.filter((i) => i.path !== path)
}

export { ITreeItem }

const fileTreeService = {
  setTreeSelectItem,
  getTreeSelectItem,
  clearTreeSelectItem,
  delSelectTreeItem,
  getCurrentItem
}

export default fileTreeService
