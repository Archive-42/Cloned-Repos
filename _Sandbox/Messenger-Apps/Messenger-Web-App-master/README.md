Messenger Web App
========================
A simple in-browser chat application example useful to anyone learning web development.

##Getting Started
1. Install [Git](http://git-scm.com/)
    * Recommended installation options
        1. In the **Select Components** section:
            * check `Windows Explorer integration`
                * select `Simple context menu (Registry based)`
                    * check `Git Bash Here`
                    * check `Git GUI Here`
            * check `Associate .git* configuration files with the default text editor`
            * check `Associate .sh files to be run with Bash`
        2. In the **Adjusting your PATH environment** section: select `Use Git from the Windows Command Prompt`
        3. In the **Configure the line ending conversions** section: select `Checkout as-is, commit as-is`
        4. Install the damn thing
2. Install [Node.JS](http://nodejs.org/), this is what will run our server.
    * This will **require** to restart your computer.
    * Node will also provide us the `npm install` command, which fetches and downloads any project dependency (chunk of code) needed to make the project work
3. After restart, right click on the root folder for this project and select `Git Bash` to open the Git command line
    * Optionally, if you set up git to also run on the Windows Command Prompt, you can just open the windows command prompt on the root folder for this project. 
4. `npm install -g nodemon`: It is recommended that while developing the app you run the server with [nodemon](http://nodemon.io/). To do so, run this command in Git Bash or in the Windows Command Prompt: `npm install -g nodemon`
    * Nodemon watches for any file change in your project and restarts your server automatically so you can quickly see the changes you made.
5. `npm install -g bower`: [Bower](http://bower.io/) is required in order to download some additional packages required by our app
    * Bower is similar to `npm` in that it fetches and downloads dependencies as well, but provides additional packages not found in npm
    * Instead of looking in package.json for dependencies, bower looks in **bower.json**
6. `npm install`: Git Bash, or any other command line window, should already be open to this project's root directory, so run `npm install`
    * This command looks at **package.json** and downloads all the dependencies listed along with executing any other command you defined.
    * A bit on [package.json](https://www.npmjs.org/doc/files/package.json.html)
        * Must be written in [.json](http://www.json.org/) format to work
        * Must include a `name` and `version` property
            * `name` can be any string
            * `version` must be a string in the form of #.#.# or [Major].[Minor].[Patch]
        * If your project requires external dependencies, include the `dependencies` property
            * The value for the key `dependencies` must be of type object
            * Node will try to download any key-value pair within `dependencies`
                * **key**s should be the **name** of the dependency you want node to download
                * **value**s should be the **version** of the package that you need
        * Search online for many of the available packages node can get for you
7. After `npm install` finishes successfully:
    1. navigate into the server folder and open a command window from that directory
	    * This can be done by clicking on the address bar in the File Explorer window and typing `cmd` or Shift+Right click on the server folder and click on `Open command window here`
    2. in the command window, execute the command `node server.js`
        * This will start the node server
        * Optionally, you could run the command `nodemon server.js` which will run the server using nodemon, which is easier for development
    3. once the server is up and running, open your web browser and go to [localhost:3000](http://localhost:3000/) if the server port number is set for port 3000.
        * You can open multiple windows to this address and run multiple instances of this application
        * You can also connect to this server from any other device (phones/tablets included) connected to the same local network. Just replace **localhost** with the IPv4 address of the computer the server is running on.
8. If you are using this by yourself, open multiple browser windows, **not tabs** since it'll be annoying switching between tabs, to [localhost:3000](http://localhost:3000/) and register as different users within this app. This way, you will be able to simultaneously see the screens of both the sender and receiver (they are different). 
    * You can do this with as many browser windows as you'd like!
