import { loadPyodide, PackageData, PyodideInterface } from 'pyodide'
import { Lazy } from '../lazy.service'
import { reactive } from 'vue'
import { modules } from './pyodide-packages'

interface ILoadPackagesResponse {
  installed: string[]
  failed: { packageName: string; error: any }[]
}

enum EPyodideInitState {
  LOADING = 'loading',
  LOADED = 'loaded',
  NONE = ''
}

enum EPackageInstallState {
  INSTALLING = 'installing',
  INSTALLED = 'installed',
  NONE = ''
}

interface IPyodideState {
  init: EPyodideInitState
  packageInstall: EPackageInstallState
  packageList: Map<string, { isInstalled: boolean; name: string; version: string }>
}

class PyodideService {
  pyodide: PyodideInterface
  pyodideState: IPyodideState = reactive({
    init: EPyodideInitState.NONE,
    packageInstall: EPackageInstallState.NONE,
    packageList: new Map<string, { isInstalled: boolean; name: string; version: string }>()
  })

  virtualMachineRoot = ''
  fileSystemBasePath: string
  hasLoadedMicropip = false

  extractFolder = 'src'

  constructor() {
    modules.map((value: { name: string; version: string }) => {
      this.pyodideState.packageList.set(value.name, {
        isInstalled: false,
        name: value.name,
        version: value.version
      })
    })
  }
  /**
   * Initialize Pyodide with the given base path and canvas
   *
   * @param {string} basePath - The base path to the Pyodide files
   * @param {HTMLCanvasElement} canvas - The canvas to use for Pyodide
   * @memberof PyodideService
   */
  async init(basePath: string, canvas: HTMLCanvasElement): Promise<PyodideInterface> {
    if (this.pyodideState.init === EPyodideInitState.LOADING) {
      throw new Error('Pyodide is already loading')
    }
    if (this.pyodideState.init === EPyodideInitState.LOADED) {
      return this.pyodide
    }
    this.pyodideState.init = EPyodideInitState.LOADING
    this.pyodide = await loadPyodide({
      indexURL: basePath
    })
    this.pyodideState.init = EPyodideInitState.LOADED
    this.pyodide.canvas.setCanvas2D(canvas)
    this.virtualMachineRoot = this.pyodide.FS.cwd()
    return this.pyodide
  }

  /**
   * Load a Python script from the given URL
   *
   * @param {string} zipfilesPath - The URL of the zip file containing the Python script
   * @param {string} [extractDir='src'] - The directory to extract the files to
   * @return {*}  {Promise<void>}
   * @memberof PyodideService
   */
  async uploadFilesForZip(zipfilesPath: string, extractDir = this.extractFolder): Promise<void> {
    this.extractFolder = extractDir
    // check is zip file
    if (!zipfilesPath.endsWith('.zip')) {
      throw new Error('The file is not a zip file')
    }
    let zipResponse = await fetch(zipfilesPath)
    let zipBinary = await zipResponse.arrayBuffer()
    this.pyodide.FS.chdir(this.virtualMachineRoot)
    this.pyodide.unpackArchive(zipBinary, 'zip', { extractDir: extractDir })
    this.fileSystemBasePath = this.virtualMachineRoot + '/' + extractDir
  }

  /**
   * Load a Python script from the given Whl URL | packageName
   *
   * @param {string} moduleName - The URL of the whl file containing the Python script or the package name
   * @param {boolean} [isWhl=false] - If the file is a wheel file
   * @memberof PyodideService
   */
  async loadMicropipPackage(moduleName: string, isWhl = false) {
    if (this.pyodideState.packageInstall === EPackageInstallState.INSTALLING) {
      throw new Error('Micropip is already installing a package')
    }
    this.pyodideState.packageInstall = EPackageInstallState.INSTALLING
    if (!this.hasLoadedMicropip) {
      await this.loadPackage(['micropip'])
      this.hasLoadedMicropip = true
    }
    if (isWhl && !moduleName.endsWith('.whl')) {
      this.pyodideState.packageInstall = EPackageInstallState.NONE
      throw new Error('The file is not a wheel file')
    }
    
    try {
      const micropip = this.pyodide.pyimport('micropip')
      const packageDatas: PackageData[] = await micropip.install(moduleName)
      this.pyodideState.packageInstall = EPackageInstallState.INSTALLED

      if (packageDatas === undefined || packageDatas.length === 0) {
        return [];
      }
      packageDatas.map((value) => {
        this.pyodideState.packageList.set(value.name, {
          ...value,
          isInstalled: true
        })
      })
      
      return packageDatas
    } catch (error) {
      this.pyodideState.packageInstall = EPackageInstallState.NONE
      throw new Error(`Failed to install package: ${moduleName}`)
    }
    
  }

  /**
   * Load packages from the given list of package names
   *
   * @param {string[]} packageNames - The list of package names to load
   * @return {*}  {Promise<ILoadPackagesResponse>}
   * @memberof PyodideService
   */
  async loadPackageForNames(packageNames: string[]): Promise<ILoadPackagesResponse> {
    if (this.pyodideState.packageInstall === EPackageInstallState.INSTALLING) {
      throw new Error('Micropip is already installing a package')
    }
    this.pyodideState.packageInstall = EPackageInstallState.INSTALLING
    let failed: { packageName: string; error: any }[] = []
    const installed: string[] = []
    for (let packageName of packageNames) {
      try {
        const localPackageData = this.pyodideState.packageList.get(packageName)
        if (localPackageData && localPackageData.isInstalled) {
          return
        }
        const packageDatas = await this.loadPackage(packageName)
        packageDatas.map((value) => {
          this.pyodideState.packageList.set(value.name, {
            ...value,
            isInstalled: true
          })
        })
        installed.push(packageName)
      } catch (error) {
        failed.push({ packageName, error })
      }
    }
    this.pyodideState.packageInstall = EPackageInstallState.INSTALLED
    return {
      installed: installed,
      failed
    }
  }

  private async loadPackage(name: string | Array<string>) {
    const result = await this.pyodide.loadPackage(name, { checkIntegrity: false })
    if (!result) {
      throw new Error(`Failed to load package: ${name}, cannot install any dependencies`)
    }
    return result
  }

  saveFileToPyodide(path: string, content: string) {
    console.log('path', this.pyodide.FS.cwd() + path)
    this.pyodide.FS.writeFile(this.pyodide.FS.cwd() + path, content)
  }
}

const lazyPyodideService = new Lazy(() => {
  return new PyodideService()
})
const pyodideService = () => {
  return lazyPyodideService.instance
}
export { EPyodideInitState }
export default pyodideService
