import { toParams, toQuery } from '../../util/utils'

class PopupWindow {
  constructor(url) {
    this.url = url;
  }

  open() {
    const { url } = this;

    this.window = window.open(url);
  }

  close() {
    this.cancel();
    this.window.close();
  }

  async poll() {
    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setTimeout(() => {
        try {
          const popup = this.window;
          
          if (!popup || popup.closed !== false) {
            reject(new Error('The popup was closed'));
            this.close();
            
            return;
          }

          if (popup.location.href === this.url || popup.location.pathname === 'blank') {
            return;
          }

          const params = toParams(popup.location.hash.replace(/^#/, ''));
          resolve(params);
          this.close();    
        } catch (error) {
        }
      }, 1000);
      // setTimeout(()=>this.close(), 1000);
      
    });
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid);
      this._iid = null;
    }
  }

  then(...args) {
    return this.promise.then(...args);
  }

  catch(...args) {
    return this.promise.then(...args);
  }

  static open(...args) {
    const popup = new this(...args);
    popup.open()
    popup.poll();
    return popup;
  }
}

export default PopupWindow;
