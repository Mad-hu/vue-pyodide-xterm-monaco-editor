import { ITerminalInitOnlyOptions, ITerminalOptions, Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

export default class XtermService {
  terminal: Terminal
  private fitAddon: FitAddon

  constructor(options?: ITerminalOptions & ITerminalInitOnlyOptions) {
    const defaultOptions: ITerminalOptions & ITerminalInitOnlyOptions = {
      theme: {
        foreground: 'black', // 字体
        background: '#CDD2E8' // 背景色
      }
    }
    this.terminal = new Terminal({ ...defaultOptions, ...options })
  }

  open(parent: HTMLElement) {
    this.terminal.open(parent)
    this.addonFit()
    this.fitAddon.fit()
  }

  private resize() {
    this.fitAddon.fit()
  }

  private addonFit() {
    this.fitAddon = new FitAddon()
    this.terminal.loadAddon(this.fitAddon)
    window.addEventListener('resize', this.resize.bind(this))
  }

  write(data: string | Uint8Array) {
    this.terminal.write(data)
  }

  writeln(data: string | Uint8Array) {
    this.terminal.writeln(data)
  }

  clear() {
    this.terminal.clear()
  }

  dispose() {
    this.terminal.dispose()
    window.removeEventListener('resize', this.resize.bind(this))
  }
}
