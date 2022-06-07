(() => {
    class require {
        constructor(file, cwd) {
            const resolved = require.resolve(file, cwd || '/');
            const mod = require.modules[resolved];
            if (!mod) throw new Error(
                'Failed to resolve module ' + file + ', tried ' + resolved
            );
            const cached = require.cache[resolved];
            const res = cached? cached.exports : mod();
            return res;
        }

        static alias(from, to) {
            const path = require.modules.path();
            let res = null;
            try {
                res = require.resolve(from + '/package.json', '/');
            }
            catch (err) {
                res = require.resolve(from, '/');
            }
            const basedir = path.dirname(res);

            const keys = (Object.keys || (obj => {
                const res = [];
                for (const key in obj) res.push(key);
                return res;
            }))(require.modules);

            keys.forEach(key => {
                if (key.slice(0, basedir.length + 1) === basedir + '/') {
                    const f = key.slice(basedir.length);
                    require.modules[to + f] = require.modules[basedir + f];
                }
                else if (key === basedir) {
                    require.modules[to] = require.modules[basedir];
                }
            });
        }

        static define(filename, fn) {
            if (!definedProcess && require.modules.__browserify_process) {
                process = require.modules.__browserify_process();
                definedProcess = true;
            }

            const dirname = require._core[filename]
                ? ''
                : require.modules.path().dirname(filename);

            class require_ {
                constructor(file) {
                    const requiredModule = require(file, dirname);
                    const cached = require.cache[require.resolve(file, dirname)];

                    if (cached && cached.parent === null) {
                        cached.parent = module_;
                    }

                    return requiredModule;
                }

                static resolve(name) {
                    return require.resolve(name, dirname);
                }
            }

            require_.modules = require.modules;
            require_.define = require.define;
            require_.cache = require.cache;
            var module_ = {
                id : filename,
                filename: filename,
                exports : {},
                loaded : false,
                parent: null
            };

            require.modules[filename] = () => {
                require.cache[filename] = module_;
                fn.call(
                    module_.exports,
                    require_,
                    module_,
                    module_.exports,
                    dirname,
                    filename,
                    process,
                    global
                );
                module_.loaded = true;
                return module_.exports;
            };
        }
    }

    require.paths = [];
    require.modules = {};
    require.cache = {};
    require.extensions = [".js",".coffee",".json"];

    require._core = {
        'assert': true,
        'events': true,
        'fs': true,
        'path': true,
        'vm': true
    };

    require.resolve = (() => {
        return (x, cwd) => {
            if (!cwd) cwd = '/';
            
            if (require._core[x]) return x;
            const path = require.modules.path();
            cwd = path.resolve('/', cwd);
            const y = cwd || '/';
            
            if (x.match(/^(?:\.\.?\/|\/)/)) {
                const m = loadAsFileSync(path.resolve(y, x))
                    || loadAsDirectorySync(path.resolve(y, x));
                if (m) return m;
            }
            
            const n = loadNodeModulesSync(x, y);
            if (n) return n;
            
            throw new Error("Cannot find module '" + x + "'");
            
            function loadAsFileSync (x) {
                x = path.normalize(x);
                if (require.modules[x]) {
                    return x;
                }
                
                for (let i = 0; i < require.extensions.length; i++) {
                    const ext = require.extensions[i];
                    if (require.modules[x + ext]) return x + ext;
                }
            }
            
            function loadAsDirectorySync (x) {
                x = x.replace(/\/+$/, '');
                const pkgfile = path.normalize(x + '/package.json');
                if (require.modules[pkgfile]) {
                    const pkg = require.modules[pkgfile]();
                    const b = pkg.browserify;
                    if (typeof b === 'object' && b.main) {
                        var m = loadAsFileSync(path.resolve(x, b.main));
                        if (m) return m;
                    }
                    else if (typeof b === 'string') {
                        var m = loadAsFileSync(path.resolve(x, b));
                        if (m) return m;
                    }
                    else if (pkg.main) {
                        var m = loadAsFileSync(path.resolve(x, pkg.main));
                        if (m) return m;
                    }
                }
                
                return loadAsFileSync(x + '/index');
            }
            
            function loadNodeModulesSync (x, start) {
                const dirs = nodeModulesPathsSync(start);
                for (let i = 0; i < dirs.length; i++) {
                    const dir = dirs[i];
                    var m = loadAsFileSync(dir + '/' + x);
                    if (m) return m;
                    const n = loadAsDirectorySync(dir + '/' + x);
                    if (n) return n;
                }
                
                var m = loadAsFileSync(x);
                if (m) return m;
            }
            
            function nodeModulesPathsSync (start) {
                let parts;
                if (start === '/') parts = [ '' ];
                else parts = path.normalize(start).split('/');
                
                const dirs = [];
                for (let i = parts.length - 1; i >= 0; i--) {
                    if (parts[i] === 'node_modules') continue;
                    const dir = parts.slice(0, i + 1).join('/') + '/node_modules';
                    dirs.push(dir);
                }
                
                return dirs;
            }
        };
    })();

    (() => {
        const process = {};
        const global = typeof window !== 'undefined' ? window : {};
        const definedProcess = false;
    })();


    require.define("path",(require, module, exports, __dirname, __filename, process, global) => {function filter (xs, fn) {
        const res = [];
        for (let i = 0; i < xs.length; i++) {
            if (fn(xs[i], i, xs)) res.push(xs[i]);
        }
        return res;
    }

    // resolves . and .. elements in a path array with directory names there
    // must be no slashes, empty elements, or device names (c:\) in the array
    // (so also no leading and trailing slashes - it does not distinguish
    // relative and absolute paths)
    function normalizeArray(parts, allowAboveRoot) {
      // if the path tries to go above the root, `up` ends up > 0
      let up = 0;
      for (let i = parts.length; i >= 0; i--) {
        const last = parts[i];
        if (last == '.') {
          parts.splice(i, 1);
        } else if (last === '..') {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }

      // if the path is allowed to go above the root, restore leading ..s
      if (allowAboveRoot) {
        for (; up--; up) {
          parts.unshift('..');
        }
      }

      return parts;
    }

    // Regex to split a filename into [*, dir, basename, ext]
    // posix version
    const splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

    // path.resolve([from ...], to)
    // posix version
    exports.resolve = function(...args) {
    let resolvedPath = '', resolvedAbsolute = false;

    for (let i = args.length; i >= -1 && !resolvedAbsolute; i--) {
      const path = (i >= 0)
          ? args[i]
          : process.cwd();

      // Skip empty and invalid entries
      if (typeof path !== 'string' || !path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), p => {
        return !!p;
      }), !resolvedAbsolute).join('/');

      return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
    };

    // path.normalize(path)
    // posix version
    exports.normalize = path => {
    const isAbsolute = path.charAt(0) === '/', trailingSlash = path.slice(-1) === '/';

    // Normalize the path
    path = normalizeArray(filter(path.split('/'), p => {
        return !!p;
      }), !isAbsolute).join('/');

      if (!path && !isAbsolute) {
        path = '.';
      }
      if (path && trailingSlash) {
        path += '/';
      }
      
      return (isAbsolute ? '/' : '') + path;
    };


    // posix version
    exports.join = function(...args) {
      const paths = Array.prototype.slice.call(args, 0);
      return exports.normalize(filter(paths, (p, index) => {
        return p && typeof p === 'string';
      }).join('/'));
    };


    exports.dirname = path => {
      const dir = splitPathRe.exec(path)[1] || '';
      const isWindows = false;
      if (!dir) {
        // No dirname
        return '.';
      } else if (dir.length === 1 ||
          (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
        // It is just a slash or a drive letter with a slash
        return dir;
      } else {
        // It is a full dirname, strip trailing slash
        return dir.substring(0, dir.length - 1);
      }
    };


    exports.basename = (path, ext) => {
      let f = splitPathRe.exec(path)[2] || '';
      // TODO: make this comparison case-insensitive on windows?
      if (ext && f.substr(-1 * ext.length) === ext) {
        f = f.substr(0, f.length - ext.length);
      }
      return f;
    };


    exports.extname = path => {
      return splitPathRe.exec(path)[3] || '';
    };

    });

    require.define("__browserify_process",(require, module, exports, __dirname, __filename, process, global) => {var process = module.exports = {};

    process.nextTick = (() => {
        const canSetImmediate = typeof window !== 'undefined'
            && window.setImmediate;
        const canPost = typeof window !== 'undefined'
            && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
            return f => { return window.setImmediate(f) };
        }

        if (canPost) {
            const queue = [];
            window.addEventListener('message', ev => {
                if (ev.source === window && ev.data === 'browserify-tick') {
                    ev.stopPropagation();
                    if (queue.length > 0) {
                        const fn = queue.shift();
                        fn();
                    }
                }
            }, true);

            return function nextTick(fn) {
                queue.push(fn);
                window.postMessage('browserify-tick', '*');
            };
        }

        return function nextTick(fn) {
            setTimeout(fn, 0);
        };
    })();

    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];

    process.binding = name => {
        if (name === 'evals') return (require)('vm')
        else throw new Error('No such module. (Possibly not yet loaded)')
    };

    (() => {
        let cwd = '/';
        let path;
        process.cwd = () => { return cwd };
        process.chdir = dir => {
            if (!path) path = require('path');
            cwd = path.resolve(dir, cwd);
        };
    })();

    });

    require.define("/entry.js",(require, module, exports, __dirname, __filename, process, global) => {module.exports = list;

    function getState(){
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '?' + window.location.pathname, true);
        xhr.onload = function(e) {
          if (this.status == 200) {
            // Note: .response instead of .responseText
            const state = this.responseText;
            console.log(state)
          }
        };
        xhr.send()	
    }

    getState()

    function list(obj){
        
        const p = obj[Object.keys(obj)[0]];

        const div = document.createElement('div');
        const parent = document.createElement('a');
        parent.textContent = Object.keys(obj)[0];
        parent.href = '/' + Object.keys(obj)[0];
        const ul = document.createElement('ul');
        div.appendChild(ul);
        div.appendChild(parent);
        
        const children = [];
        
        for(x in p){
            
            const li = document.createElement('li');
            li.textContent = p[x];
            children.unshift(li)
            
        }
        
        children.forEach(e => {
            ul.appendChild(e)
        })
        
        document.body.appendChild(div)
        
    }
    });
    require("/entry.js");
})();
