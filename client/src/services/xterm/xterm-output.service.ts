import { Lazy } from '../lazy.service'
import XtermService from './xterm.service'

class XtermOutputService extends XtermService {
    constructor() {
        super({
            disableStdin: true,
        })
    }
}

const lazyXtermOutputService = new Lazy(() => {
  return new XtermOutputService()
})

const xtermOutputService = () => lazyXtermOutputService.instance
export default xtermOutputService
