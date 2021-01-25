import { toParams } from '../../util/utils';

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

                    if (!popup || popup.closed !== false) {
                        this.close();

                        reject(new Error('The popup was closed'));

                        return;
                    }

                    if (
                        popup.location.href === this.url ||
                        popup.location.pathname === 'blank'
                    ) {
                        return;
                    }

                    const params = toParams(
                        popup.location.search.replace(/^\?/, '')
                    );

                    resolve(params);

                    this.close();
                } catch (error) {
                    /*
                     * Ignore DOMException: Blocked a frame with origin from accessing a
                     * cross-origin frame.
                     */
                }
            }, 500);
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
        popup.open();
        popup.poll();
        // setInterval(() => {
        //     if(check) this.close();
        // },1000);
        return popup;
    }
}

export default PopupWindow;
