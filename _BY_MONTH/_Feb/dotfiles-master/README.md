# dotfiles
A small opinionated list of dot files used to set up my apps.

## Hyper Terminal
### Performance
* To ensure that this uses as little CPU as possible on windows, make the following changes:
    * **hyperline.js**
        * In `componentDidMount()`, increase the timeout or comment the following line completely. It is not worth the extra CPU cycles to check your connection speed and have `WMI.exe` go nuts.
        ```JavaScript
        componentDidMount() {
            this.getSpeed();
            // Remove the following line
            this.interval = setInterval(() => this.getSpeed(), 1500);
        }
        ```
    * **index.js** for hyper-tabs-enhanced
        * After checking why this plugin began to burn my lap, it seems that the transparency property for the traffic button was to blame.
        ```JavaScript
        if (!hyperTabs.trafficButtons) {
            exports.decorateBrowserOptions = (defaults) => {
                return Object.assign({}, defaults, {
                    titleBarStyle: '',
                    transparent: true, // CHANGE THIS TO FALSE
                    frame: false,
                });
            };
        }
        ```
### Styling
* When using hyperline, scrollbars tend to appear since the plugin itself takes up too much space.
* Make sure to install *hyper-stylesheet* and include `.hyper.css` in your user folder.
