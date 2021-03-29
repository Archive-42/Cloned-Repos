var ndarray = require('ndarray');
var fft = require('ndarray-fft');
var mag = require('ndarray-complex').mag;

var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

var fs = require('fs');
var html = fs.readFileSync(__dirname + '/scope.html', 'utf8');
var domify = require('domify');
var slideways = require('slideways');

module.exports = Scope;
inherits(Scope, EventEmitter);

function Scope (opts) {
    var self = this;
    if (!(this instanceof Scope)) return new Scope(opts);
    if (!opts) opts = {};
    this.rate = opts.rate || 44000;
    this._worker = opts.worker || function (data, cb) {
        cb(worker(data));
    };
    
    this.element = domify(html)[0];
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    
    this.element.addEventListener('click', function (ev) {
        if (ev.target === self.svg || ev.target === sliders
        || ev.target === self.polyline) {
            self.emit('click', ev);
        }
    });
    
    this.svg = createElement('svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.element.appendChild(this.svg);
    
    var p = this.polyline = createElement('polyline');
    p.setAttribute('fill', opts.fill || 'cyan');
    p.setAttribute('stroke', opts.stroke || 'cyan');
    p.setAttribute('strokeWidth', opts.strokeWidth || '2px');
    this.svg.appendChild(this.polyline);
    
    this.scale = 0;
    this.createSlider({ min: -1, max: 5, init: 0 }, function (x) {
        self.scale = Math.pow(2, x);
    });
}

Scope.prototype.createSlider = function (opts, f) {
    if (!opts) opts = {};
    var a = slideways(opts);
    if (f) a.on('value', f);
    a.appendTo(this.element.querySelector('#sliders'));
    return a;
};

Scope.prototype.appendTo = function (target) {
    if (typeof target === 'string') target = document.querySelector(target);
    target.appendChild(this.element);
    this._target = target;
    this.resize();
};

Scope.prototype.resize = function () {
    if (!this._target) return;
    var style = window.getComputedStyle(this._target);
    this.width = parseInt(style.width);
    this.height = parseInt(style.height);
};

module.exports.worker = worker;
function worker (input) {
    var data = new Float32Array(input.length);
    for (var i = 0; i < input.length; i++) {
        data[i] = Math.min(1, Math.max(-1, input[i]));
    }
    
    var reals = ndarray(data, [ data.length, 1 ]);
    var imags = ndarray(new Float32Array(data.length), [ data.length, 1 ]);
    
    fft(1, reals, imags);
    mag(reals, reals, imags);
    return reals;
};

Scope.prototype.draw = function (data) {
    var self = this;
    self._worker(data, function (reals) { self._draw(reals) });
};

Scope.prototype._draw = function (reals) {
    var self = this;
    
    var points = [ '0,' + this.height ];
    var pfreq, pd;
    
    for (var i = 0; i < reals.data.length; i++) {
        var freq = i * this.rate / reals.data.length;
        var d = reals.data[i];
        if (d > 1e5) {
            if (pd < 1e5) {
                plot(pfreq, pd);
            }
            plot(freq, d);
        }
        else if (pd > 1e5) plot(freq, d);
        
        pd = d;
        pfreq = freq;
    }
    
    function plot (freq, d) {
        var x = (Math.log(1 + freq) - 3) / 7 * self.width;
        var y = Math.max(0, self.height - d / 1e4 * self.scale);
        points.push(x + ',' + y);
    }
    
    points.push(this.width + ',' + this.height);
    this.polyline.setAttribute('points', points.join(' '));
};

function createElement (name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
