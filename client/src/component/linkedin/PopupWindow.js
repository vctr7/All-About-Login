import { toParams, toQuery } from '../../util/utils';
let check = false;
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

    poll() {
        this.promise = new Promise((resolve, reject) => {
            this._iid = window.setInterval(() => {
                try {
                    const popup = this.window;

                    // if (!popup || popup.closed !== false) {
                    //     reject(new Error('The popup was closed'));
                    //     this.close();

                    //     return;
                    // }

                    // if (
                    //     popup.location.href === this.url ||
                    //     popup.location.pathname === 'blank'
                    // ) {
                    //     return;
                    // }
                    // console.log(popup.location)
                    // const params = toParams(
                    //     popup.location.hash.replace(/^#/, '')
                    // );
                    check = true
                    resolve();
                    
                    
                } catch (error) {}
            }, 1000);
        })
        // this.close();
        // setInterval(()=>{if(check) this.close() },1000)
        // setInterval(()=>console.log(check),1000)
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
        popup.open();
        popup.poll();
        // setInterval(() => {
        //     if(check) this.close();
        // },1000); 
        return popup;
    }
}

export default PopupWindow;
