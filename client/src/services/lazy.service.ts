/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-22 13:19:43
 * @LastEditTime: 2022-07-28 13:48:45
 * @LastEditors: Yandong Hu
 * @Description:
 */

export class Lazy<T> {
  private creator: () => T;
  private cachedValue: T | undefined;
  constructor(creator: () => T) {
      this.creator = creator;
  }
  get instance() {
    if(!this.cachedValue) {
      this.cachedValue = this.creator();
    }
    return this.cachedValue;
  }

  set instance(T) {
    this.cachedValue  = T;
  }
  release() {
    this.cachedValue = undefined;
  }
}
