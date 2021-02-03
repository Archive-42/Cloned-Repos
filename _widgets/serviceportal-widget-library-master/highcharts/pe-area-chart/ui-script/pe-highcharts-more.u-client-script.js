/*
 Highcharts JS v5.0.5 (2016-11-29)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w) {
	"object" === typeof module && module.exports ? module.exports = w : w(Highcharts)
})(function(w) {
	(function(a) {
		function q(a, b, e) {
			this.init(a, b, e)
		}
		var u = a.each,
			v = a.extend,
			h = a.merge,
			t = a.splat;
		v(q.prototype, {
			init: function(a, b, e) {
				var f = this,
					p = f.defaultOptions;
				f.chart = b;
				f.options = a = h(p, b.angular ? {
					background: {}
				} : void 0, a);
				(a = a.background) && u([].concat(t(a)).reverse(), function(b) {
					var c, p = e.userOptions;
					c = h(f.defaultBackgroundOptions, b);
					b.backgroundColor && (c.backgroundColor = b.backgroundColor);
					c.color = c.backgroundColor;
					e.options.plotBands.unshift(c);
					p.plotBands = p.plotBands || [];
					p.plotBands !== e.options.plotBands && p.plotBands.unshift(c)
				})
			},
			defaultOptions: {
				center: ["50%", "50%"],
				size: "85%",
				startAngle: 0
			},
			defaultBackgroundOptions: {
				className: "highcharts-pane",
				shape: "circle",
				borderWidth: 1,
				borderColor: "#cccccc",
				backgroundColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
						[0, "#ffffff"],
						[1, "#e6e6e6"]
					]
				},
				from: -Number.MAX_VALUE,
				innerRadius: 0,
				to: Number.MAX_VALUE,
				outerRadius: "105%"
			}
		});
		a.Pane = q
	})(w);
	(function(a) {
		var q = a.CenteredSeriesMixin,
			u = a.each,
			v = a.extend,
			h = a.map,
			t = a.merge,
			d = a.noop,
			b = a.Pane,
			e = a.pick,
			f = a.pInt,
			p = a.splat,
			n = a.wrap,
			c, k, l = a.Axis.prototype;
		a = a.Tick.prototype;
		c = {
			getOffset: d,
			redraw: function() {
				this.isDirty = !1
			},
			render: function() {
				this.isDirty = !1
			},
			setScale: d,
			setCategories: d,
			setTitle: d
		};
		k = {
			defaultRadialGaugeOptions: {
				labels: {
					align: "center",
					x: 0,
					y: null
				},
				minorGridLineWidth: 0,
				minorTickInterval: "auto",
				minorTickLength: 10,
				minorTickPosition: "inside",
				minorTickWidth: 1,
				tickLength: 10,
				tickPosition: "inside",
				tickWidth: 2,
				title: {
					rotation: 0
				},
				zIndex: 2
			},
			defaultRadialXOptions: {
				gridLineWidth: 1,
				labels: {
					align: null,
					distance: 15,
					x: 0,
					y: null
				},
				maxPadding: 0,
				minPadding: 0,
				showLastLabel: !1,
				tickLength: 0
			},
			defaultRadialYOptions: {
				gridLineInterpolation: "circle",
				labels: {
					align: "right",
					x: -3,
					y: -2
				},
				showLastLabel: !1,
				title: {
					x: 4,
					text: null,
					rotation: 90
				}
			},
			setOptions: function(b) {
				b = this.options = t(this.defaultOptions, this.defaultRadialOptions, b);
				b.plotBands || (b.plotBands = [])
			},
			getOffset: function() {
				l.getOffset.call(this);
				this.chart.axisOffset[this.side] = 0;
				this.center = this.pane.center =
					q.getCenter.call(this.pane)
			},
			getLinePath: function(b, g) {
				b = this.center;
				var c = this.chart,
					m = e(g, b[2] / 2 - this.offset);
				this.isCircular || void 0 !== g ? g = this.chart.renderer.symbols.arc(this.left + b[0], this.top + b[1], m, m, {
					start: this.startAngleRad,
					end: this.endAngleRad,
					open: !0,
					innerR: 0
				}) : (g = this.postTranslate(this.angleRad, m), g = ["M", b[0] + c.plotLeft, b[1] + c.plotTop, "L", g.x, g.y]);
				return g
			},
			setAxisTranslation: function() {
				l.setAxisTranslation.call(this);
				this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) /
					(this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0)
			},
			beforeSetTickPositions: function() {
				if (this.autoConnect = this.isCircular && void 0 === e(this.userMax, this.options.max) && this.endAngleRad - this.startAngleRad === 2 * Math.PI) this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0
			},
			setAxisSize: function() {
				l.setAxisSize.call(this);
				this.isRadial && (this.center = this.pane.center = q.getCenter.call(this.pane), this.isCircular &&
					(this.sector = this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * e(this.sector, 1) / 2)
			},
			getPosition: function(b, g) {
				return this.postTranslate(this.isCircular ? this.translate(b) : this.angleRad, e(this.isCircular ? g : this.translate(b), this.center[2] / 2) - this.offset)
			},
			postTranslate: function(b, g) {
				var e = this.chart,
					c = this.center;
				b = this.startAngleRad + b;
				return {
					x: e.plotLeft + c[0] + Math.cos(b) * g,
					y: e.plotTop + c[1] + Math.sin(b) * g
				}
			},
			getPlotBandPath: function(b, g, c) {
				var m = this.center,
					p = this.startAngleRad,
					l = m[2] / 2,
					r = [e(c.outerRadius, "100%"), c.innerRadius, e(c.thickness, 10)],
					a = Math.min(this.offset, 0),
					k = /%$/,
					n, d = this.isCircular;
				"polygon" === this.options.gridLineInterpolation ? m = this.getPlotLinePath(b).concat(this.getPlotLinePath(g, !0)) : (b = Math.max(b, this.min), g = Math.min(g, this.max), d || (r[0] = this.translate(b), r[1] = this.translate(g)), r = h(r, function(b) {
						k.test(b) && (b = f(b, 10) * l / 100);
						return b
					}), "circle" !== c.shape && d ? (b = p + this.translate(b), g = p + this.translate(g)) : (b = -Math.PI / 2, g = 1.5 * Math.PI, n = !0), r[0] -= a, r[2] -=
					a, m = this.chart.renderer.symbols.arc(this.left + m[0], this.top + m[1], r[0], r[0], {
						start: Math.min(b, g),
						end: Math.max(b, g),
						innerR: e(r[1], r[0] - r[2]),
						open: n
					}));
				return m
			},
			getPlotLinePath: function(b, g) {
				var e = this,
					c = e.center,
					f = e.chart,
					p = e.getPosition(b),
					m, l, a;
				e.isCircular ? a = ["M", c[0] + f.plotLeft, c[1] + f.plotTop, "L", p.x, p.y] : "circle" === e.options.gridLineInterpolation ? (b = e.translate(b)) && (a = e.getLinePath(0, b)) : (u(f.xAxis, function(b) {
					b.pane === e.pane && (m = b)
				}), a = [], b = e.translate(b), c = m.tickPositions, m.autoConnect && (c =
					c.concat([c[0]])), g && (c = [].concat(c).reverse()), u(c, function(g, e) {
					l = m.getPosition(g, b);
					a.push(e ? "L" : "M", l.x, l.y)
				}));
				return a
			},
			getTitlePosition: function() {
				var b = this.center,
					g = this.chart,
					e = this.options.title;
				return {
					x: g.plotLeft + b[0] + (e.x || 0),
					y: g.plotTop + b[1] - {
						high: .5,
						middle: .25,
						low: 0
					}[e.align] * b[2] + (e.y || 0)
				}
			}
		};
		n(l, "init", function(f, g, l) {
			var a = g.angular,
				m = g.polar,
				r = l.isX,
				n = a && r,
				d, x = g.options,
				h = l.pane || 0;
			if (a) {
				if (v(this, n ? c : k), d = !r) this.defaultRadialOptions = this.defaultRadialGaugeOptions
			} else m && (v(this,
				k), this.defaultRadialOptions = (d = r) ? this.defaultRadialXOptions : t(this.defaultYAxisOptions, this.defaultRadialYOptions));
			a || m ? (this.isRadial = !0, g.inverted = !1, x.chart.zoomType = null) : this.isRadial = !1;
			f.call(this, g, l);
			n || !a && !m || (f = this.options, g.panes || (g.panes = []), this.pane = g = g.panes[h] = g.panes[h] || new b(p(x.pane)[h], g, this), g = g.options, this.angleRad = (f.angle || 0) * Math.PI / 180, this.startAngleRad = (g.startAngle - 90) * Math.PI / 180, this.endAngleRad = (e(g.endAngle, g.startAngle + 360) - 90) * Math.PI / 180, this.offset = f.offset ||
				0, this.isCircular = d)
		});
		n(l, "autoLabelAlign", function(b) {
			if (!this.isRadial) return b.apply(this, [].slice.call(arguments, 1))
		});
		n(a, "getPosition", function(b, e, c, f, p) {
			var g = this.axis;
			return g.getPosition ? g.getPosition(c) : b.call(this, e, c, f, p)
		});
		n(a, "getLabelPosition", function(b, g, c, f, p, a, l, k, n) {
			var m = this.axis,
				r = a.y,
				d = 20,
				x = a.align,
				z = (m.translate(this.pos) + m.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360;
			m.isRadial ? (b = m.getPosition(this.pos, m.center[2] / 2 + e(a.distance, -25)), "auto" === a.rotation ? f.attr({
					rotation: z
				}) :
				null === r && (r = m.chart.renderer.fontMetrics(f.styles.fontSize).b - f.getBBox().height / 2), null === x && (m.isCircular ? (this.label.getBBox().width > m.len * m.tickInterval / (m.max - m.min) && (d = 0), x = z > d && z < 180 - d ? "left" : z > 180 + d && z < 360 - d ? "right" : "center") : x = "center", f.attr({
					align: x
				})), b.x += a.x, b.y += r) : b = b.call(this, g, c, f, p, a, l, k, n);
			return b
		});
		n(a, "getMarkPath", function(b, e, c, f, a, p, l) {
			var g = this.axis;
			g.isRadial ? (b = g.getPosition(this.pos, g.center[2] / 2 + f), e = ["M", e, c, "L", b.x, b.y]) : e = b.call(this, e, c, f, a, p, l);
			return e
		})
	})(w);
	(function(a) {
		var q = a.each,
			u = a.noop,
			v = a.pick,
			h = a.Series,
			t = a.seriesType,
			d = a.seriesTypes;
		t("arearange", "area", {
			lineWidth: 1,
			marker: null,
			threshold: null,
			tooltip: {
				pointFormat: '\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'
			},
			trackByArea: !0,
			dataLabels: {
				align: null,
				verticalAlign: null,
				xLow: 0,
				xHigh: 0,
				yLow: 0,
				yHigh: 0
			},
			states: {
				hover: {
					halo: !1
				}
			}
		}, {
			pointArrayMap: ["low", "high"],
			dataLabelCollections: ["dataLabel",
				"dataLabelUpper"
			],
			toYData: function(b) {
				return [b.low, b.high]
			},
			pointValKey: "low",
			deferTranslatePolar: !0,
			highToXY: function(b) {
				var e = this.chart,
					f = this.xAxis.postTranslate(b.rectPlotX, this.yAxis.len - b.plotHigh);
				b.plotHighX = f.x - e.plotLeft;
				b.plotHigh = f.y - e.plotTop
			},
			translate: function() {
				var b = this,
					e = b.yAxis,
					f = !!b.modifyValue;
				d.area.prototype.translate.apply(b);
				q(b.points, function(a) {
					var p = a.low,
						c = a.high,
						k = a.plotY;
					null === c || null === p ? a.isNull = !0 : (a.plotLow = k, a.plotHigh = e.translate(f ? b.modifyValue(c, a) : c, 0, 1,
						0, 1), f && (a.yBottom = a.plotHigh))
				});
				this.chart.polar && q(this.points, function(e) {
					b.highToXY(e)
				})
			},
			getGraphPath: function(b) {
				var e = [],
					f = [],
					a, n = d.area.prototype.getGraphPath,
					c, k, l;
				l = this.options;
				var m = l.step;
				b = b || this.points;
				for (a = b.length; a--;) c = b[a], c.isNull || l.connectEnds || b[a + 1] && !b[a + 1].isNull || f.push({
						plotX: c.plotX,
						plotY: c.plotY,
						doCurve: !1
					}), k = {
						polarPlotY: c.polarPlotY,
						rectPlotX: c.rectPlotX,
						yBottom: c.yBottom,
						plotX: v(c.plotHighX, c.plotX),
						plotY: c.plotHigh,
						isNull: c.isNull
					}, f.push(k), e.push(k), c.isNull ||
					l.connectEnds || b[a - 1] && !b[a - 1].isNull || f.push({
						plotX: c.plotX,
						plotY: c.plotY,
						doCurve: !1
					});
				b = n.call(this, b);
				m && (!0 === m && (m = "left"), l.step = {
					left: "right",
					center: "center",
					right: "left"
				}[m]);
				e = n.call(this, e);
				f = n.call(this, f);
				l.step = m;
				l = [].concat(b, e);
				this.chart.polar || "M" !== f[0] || (f[0] = "L");
				this.graphPath = l;
				this.areaPath = this.areaPath.concat(b, f);
				l.isArea = !0;
				l.xMap = b.xMap;
				this.areaPath.xMap = b.xMap;
				return l
			},
			drawDataLabels: function() {
				var b = this.data,
					e = b.length,
					f, a = [],
					n = h.prototype,
					c = this.options.dataLabels,
					k = c.align,
					l = c.verticalAlign,
					m = c.inside,
					g, r, d = this.chart.inverted;
				if (c.enabled || this._hasPointLabels) {
					for (f = e; f--;)
						if (g = b[f]) r = m ? g.plotHigh < g.plotLow : g.plotHigh > g.plotLow, g.y = g.high, g._plotY = g.plotY, g.plotY = g.plotHigh, a[f] = g.dataLabel, g.dataLabel = g.dataLabelUpper, g.below = r, d ? k || (c.align = r ? "right" : "left") : l || (c.verticalAlign = r ? "top" : "bottom"), c.x = c.xHigh, c.y = c.yHigh;
					n.drawDataLabels && n.drawDataLabels.apply(this, arguments);
					for (f = e; f--;)
						if (g = b[f]) r = m ? g.plotHigh < g.plotLow : g.plotHigh > g.plotLow, g.dataLabelUpper =
							g.dataLabel, g.dataLabel = a[f], g.y = g.low, g.plotY = g._plotY, g.below = !r, d ? k || (c.align = r ? "left" : "right") : l || (c.verticalAlign = r ? "bottom" : "top"), c.x = c.xLow, c.y = c.yLow;
					n.drawDataLabels && n.drawDataLabels.apply(this, arguments)
				}
				c.align = k;
				c.verticalAlign = l
			},
			alignDataLabel: function() {
				d.column.prototype.alignDataLabel.apply(this, arguments)
			},
			setStackedPoints: u,
			getSymbol: u,
			drawPoints: u
		})
	})(w);
	(function(a) {
		var q = a.seriesType;
		q("areasplinerange", "arearange", null, {
			getPointSpline: a.seriesTypes.spline.prototype.getPointSpline
		})
	})(w);
	(function(a) {
		var q = a.defaultPlotOptions,
			u = a.each,
			v = a.merge,
			h = a.noop,
			t = a.pick,
			d = a.seriesType,
			b = a.seriesTypes.column.prototype;
		d("columnrange", "arearange", v(q.column, q.arearange, {
			lineWidth: 1,
			pointRange: null
		}), {
			translate: function() {
				var e = this,
					f = e.yAxis,
					a = e.xAxis,
					n = a.startAngleRad,
					c, k = e.chart,
					l = e.xAxis.isRadial,
					m;
				b.translate.apply(e);
				u(e.points, function(b) {
					var g = b.shapeArgs,
						p = e.options.minPointLength,
						d, h;
					b.plotHigh = m = f.translate(b.high, 0, 1, 0, 1);
					b.plotLow = b.plotY;
					h = m;
					d = t(b.rectPlotY, b.plotY) - m;
					Math.abs(d) <
						p ? (p -= d, d += p, h -= p / 2) : 0 > d && (d *= -1, h -= d);
					l ? (c = b.barX + n, b.shapeType = "path", b.shapeArgs = {
						d: e.polarArc(h + d, h, c, c + b.pointWidth)
					}) : (g.height = d, g.y = h, b.tooltipPos = k.inverted ? [f.len + f.pos - k.plotLeft - h - d / 2, a.len + a.pos - k.plotTop - g.x - g.width / 2, d] : [a.left - k.plotLeft + g.x + g.width / 2, f.pos - k.plotTop + h + d / 2, d])
				})
			},
			directTouch: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			drawGraph: h,
			crispCol: b.crispCol,
			drawPoints: b.drawPoints,
			drawTracker: b.drawTracker,
			getColumnMetrics: b.getColumnMetrics,
			animate: function() {
				return b.animate.apply(this,
					arguments)
			},
			polarArc: function() {
				return b.polarArc.apply(this, arguments)
			},
			pointAttribs: b.pointAttribs
		})
	})(w);
	(function(a) {
		var q = a.each,
			u = a.isNumber,
			v = a.merge,
			h = a.pick,
			t = a.pInt,
			d = a.Series,
			b = a.seriesType,
			e = a.TrackerMixin;
		b("gauge", "line", {
			dataLabels: {
				enabled: !0,
				defer: !1,
				y: 15,
				borderRadius: 3,
				crop: !1,
				verticalAlign: "top",
				zIndex: 2,
				borderWidth: 1,
				borderColor: "#cccccc"
			},
			dial: {},
			pivot: {},
			tooltip: {
				headerFormat: ""
			},
			showInLegend: !1
		}, {
			angular: !0,
			directTouch: !0,
			drawGraph: a.noop,
			fixedBox: !0,
			forceDL: !0,
			noSharedTooltip: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			translate: function() {
				var b = this.yAxis,
					e = this.options,
					a = b.center;
				this.generatePoints();
				q(this.points, function(c) {
					var f = v(e.dial, c.dial),
						l = t(h(f.radius, 80)) * a[2] / 200,
						m = t(h(f.baseLength, 70)) * l / 100,
						g = t(h(f.rearLength, 10)) * l / 100,
						p = f.baseWidth || 3,
						n = f.topWidth || 1,
						d = e.overshoot,
						q = b.startAngleRad + b.translate(c.y, null, null, null, !0);
					u(d) ? (d = d / 180 * Math.PI, q = Math.max(b.startAngleRad - d, Math.min(b.endAngleRad + d, q))) : !1 === e.wrap && (q = Math.max(b.startAngleRad, Math.min(b.endAngleRad,
						q)));
					q = 180 * q / Math.PI;
					c.shapeType = "path";
					c.shapeArgs = {
						d: f.path || ["M", -g, -p / 2, "L", m, -p / 2, l, -n / 2, l, n / 2, m, p / 2, -g, p / 2, "z"],
						translateX: a[0],
						translateY: a[1],
						rotation: q
					};
					c.plotX = a[0];
					c.plotY = a[1]
				})
			},
			drawPoints: function() {
				var b = this,
					e = b.yAxis.center,
					a = b.pivot,
					c = b.options,
					k = c.pivot,
					l = b.chart.renderer;
				q(b.points, function(e) {
					var a = e.graphic,
						f = e.shapeArgs,
						m = f.d,
						p = v(c.dial, e.dial);
					a ? (a.animate(f), f.d = m) : (e.graphic = l[e.shapeType](f).attr({
						rotation: f.rotation,
						zIndex: 1
					}).addClass("highcharts-dial").add(b.group), e.graphic.attr({
						stroke: p.borderColor ||
							"none",
						"stroke-width": p.borderWidth || 0,
						fill: p.backgroundColor || "#000000"
					}))
				});
				a ? a.animate({
					translateX: e[0],
					translateY: e[1]
				}) : (b.pivot = l.circle(0, 0, h(k.radius, 5)).attr({
					zIndex: 2
				}).addClass("highcharts-pivot").translate(e[0], e[1]).add(b.group), b.pivot.attr({
					"stroke-width": k.borderWidth || 0,
					stroke: k.borderColor || "#cccccc",
					fill: k.backgroundColor || "#000000"
				}))
			},
			animate: function(b) {
				var e = this;
				b || (q(e.points, function(b) {
					var a = b.graphic;
					a && (a.attr({
						rotation: 180 * e.yAxis.startAngleRad / Math.PI
					}), a.animate({
							rotation: b.shapeArgs.rotation
						},
						e.options.animation))
				}), e.animate = null)
			},
			render: function() {
				this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);
				d.prototype.render.call(this);
				this.group.clip(this.chart.clipRect)
			},
			setData: function(b, e) {
				d.prototype.setData.call(this, b, !1);
				this.processData();
				this.generatePoints();
				h(e, !0) && this.chart.redraw()
			},
			drawTracker: e && e.drawTrackerPoint
		}, {
			setState: function(b) {
				this.state = b
			}
		})
	})(w);
	(function(a) {
		var q = a.each,
			u = a.noop,
			v = a.pick,
			h = a.seriesType,
			t = a.seriesTypes;
		h("boxplot", "column", {
			threshold: null,
			tooltip: {
				pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'
			},
			whiskerLength: "50%",
			fillColor: "#ffffff",
			lineWidth: 1,
			medianWidth: 2,
			states: {
				hover: {
					brightness: -.3
				}
			},
			whiskerWidth: 2
		}, {
			pointArrayMap: ["low", "q1", "median",
				"q3", "high"
			],
			toYData: function(a) {
				return [a.low, a.q1, a.median, a.q3, a.high]
			},
			pointValKey: "high",
			pointAttribs: function(a) {
				var b = this.options,
					e = a && a.color || this.color;
				return {
					fill: a.fillColor || b.fillColor || e,
					stroke: b.lineColor || e,
					"stroke-width": b.lineWidth || 0
				}
			},
			drawDataLabels: u,
			translate: function() {
				var a = this.yAxis,
					b = this.pointArrayMap;
				t.column.prototype.translate.apply(this);
				q(this.points, function(e) {
					q(b, function(b) {
						null !== e[b] && (e[b + "Plot"] = a.translate(e[b], 0, 1, 0, 1))
					})
				})
			},
			drawPoints: function() {
				var a =
					this,
					b = a.options,
					e = a.chart.renderer,
					f, p, n, c, k, l, m = 0,
					g, r, h, t, A = !1 !== a.doQuartiles,
					u, y = a.options.whiskerLength;
				q(a.points, function(d) {
					var q = d.graphic,
						z = q ? "animate" : "attr",
						x = d.shapeArgs,
						w = {},
						C = {},
						H = {},
						I = d.color || a.color;
					void 0 !== d.plotY && (g = x.width, r = Math.floor(x.x), h = r + g, t = Math.round(g / 2), f = Math.floor(A ? d.q1Plot : d.lowPlot), p = Math.floor(A ? d.q3Plot : d.lowPlot), n = Math.floor(d.highPlot), c = Math.floor(d.lowPlot), q || (d.graphic = q = e.g("point").add(a.group), d.stem = e.path().addClass("highcharts-boxplot-stem").add(q),
						y && (d.whiskers = e.path().addClass("highcharts-boxplot-whisker").add(q)), A && (d.box = e.path(void 0).addClass("highcharts-boxplot-box").add(q)), d.medianShape = e.path(void 0).addClass("highcharts-boxplot-median").add(q), w.stroke = d.stemColor || b.stemColor || I, w["stroke-width"] = v(d.stemWidth, b.stemWidth, b.lineWidth), w.dashstyle = d.stemDashStyle || b.stemDashStyle, d.stem.attr(w), y && (C.stroke = d.whiskerColor || b.whiskerColor || I, C["stroke-width"] = v(d.whiskerWidth, b.whiskerWidth, b.lineWidth), d.whiskers.attr(C)), A && (q =
							a.pointAttribs(d), d.box.attr(q)), H.stroke = d.medianColor || b.medianColor || I, H["stroke-width"] = v(d.medianWidth, b.medianWidth, b.lineWidth), d.medianShape.attr(H)), l = d.stem.strokeWidth() % 2 / 2, m = r + t + l, d.stem[z]({
						d: ["M", m, p, "L", m, n, "M", m, f, "L", m, c]
					}), A && (l = d.box.strokeWidth() % 2 / 2, f = Math.floor(f) + l, p = Math.floor(p) + l, r += l, h += l, d.box[z]({
						d: ["M", r, p, "L", r, f, "L", h, f, "L", h, p, "L", r, p, "z"]
					})), y && (l = d.whiskers.strokeWidth() % 2 / 2, n += l, c += l, u = /%$/.test(y) ? t * parseFloat(y) / 100 : y / 2, d.whiskers[z]({
						d: ["M", m - u, n, "L", m + u, n,
							"M", m - u, c, "L", m + u, c
						]
					})), k = Math.round(d.medianPlot), l = d.medianShape.strokeWidth() % 2 / 2, k += l, d.medianShape[z]({
						d: ["M", r, k, "L", h, k]
					}))
				})
			},
			setStackedPoints: u
		})
	})(w);
	(function(a) {
		var q = a.each,
			u = a.noop,
			v = a.seriesType,
			h = a.seriesTypes;
		v("errorbar", "boxplot", {
			color: "#000000",
			grouping: !1,
			linkedTo: ":previous",
			tooltip: {
				pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'
			},
			whiskerWidth: null
		}, {
			type: "errorbar",
			pointArrayMap: ["low", "high"],
			toYData: function(a) {
				return [a.low, a.high]
			},
			pointValKey: "high",
			doQuartiles: !1,
			drawDataLabels: h.arearange ? function() {
				var a = this.pointValKey;
				h.arearange.prototype.drawDataLabels.call(this);
				q(this.data, function(d) {
					d.y = d[a]
				})
			} : u,
			getColumnMetrics: function() {
				return this.linkedParent && this.linkedParent.columnMetrics || h.column.prototype.getColumnMetrics.call(this)
			}
		})
	})(w);
	(function(a) {
		var q = a.correctFloat,
			u = a.isNumber,
			v = a.pick,
			h = a.Point,
			t = a.Series,
			d = a.seriesType,
			b = a.seriesTypes;
		d("waterfall", "column", {
			dataLabels: {
				inside: !0
			},
			lineWidth: 1,
			lineColor: "#333333",
			dashStyle: "dot",
			borderColor: "#333333",
			states: {
				hover: {
					lineWidthPlus: 0
				}
			}
		}, {
			pointValKey: "y",
			translate: function() {
				var a = this.options,
					f = this.yAxis,
					d, n, c, k, l, m, g, r, h, t = v(a.minPointLength, 5),
					u = a.threshold,
					w = a.stacking,
					y = 0,
					x = 0;
				b.column.prototype.translate.apply(this);
				g = r = u;
				n = this.points;
				d = 0;
				for (a = n.length; d < a; d++) c = n[d], m = this.processedYData[d], k = c.shapeArgs, h = (l = w && f.stacks[(this.negStacks && m < u ? "-" : "") + this.stackKey]) ? l[c.x].points[this.index +
					"," + d] : [0, m], c.isSum ? c.y = q(m) : c.isIntermediateSum && (c.y = q(m - r)), l = Math.max(g, g + c.y) + h[0], k.y = f.toPixels(l, !0), c.isSum ? (k.y = f.toPixels(h[1], !0), k.height = Math.min(f.toPixels(h[0], !0), f.len) - k.y + y + x) : c.isIntermediateSum ? (k.y = f.toPixels(h[1], !0), k.height = Math.min(f.toPixels(r, !0), f.len) - k.y + y + x, r = h[1]) : (k.height = 0 < m ? f.toPixels(g, !0) - k.y : f.toPixels(g, !0) - f.toPixels(g - m, !0), g += m), 0 > k.height && (k.y += k.height, k.height *= -1), c.plotY = k.y = Math.round(k.y) - this.borderWidth % 2 / 2, k.height = Math.max(Math.round(k.height),
					.001), c.yBottom = k.y + k.height, k.y -= x, k.height <= t && (k.height = t, 0 > c.y ? x -= t : y += t), k.y -= y, k = c.plotY - x - y + (c.negative && 0 <= x ? k.height : 0), this.chart.inverted ? c.tooltipPos[0] = f.len - k : c.tooltipPos[1] = k
			},
			processData: function(b) {
				var a = this.yData,
					e = this.options.data,
					d, c = a.length,
					k, l, m, g, r, h;
				l = k = m = g = this.options.threshold || 0;
				for (h = 0; h < c; h++) r = a[h], d = e && e[h] ? e[h] : {}, "sum" === r || d.isSum ? a[h] = q(l) : "intermediateSum" === r || d.isIntermediateSum ? a[h] = q(k) : (l += r, k += r), m = Math.min(l, m), g = Math.max(l, g);
				t.prototype.processData.call(this,
					b);
				this.dataMin = m;
				this.dataMax = g
			},
			toYData: function(b) {
				return b.isSum ? 0 === b.x ? null : "sum" : b.isIntermediateSum ? 0 === b.x ? null : "intermediateSum" : b.y
			},
			pointAttribs: function(a, f) {
				var e = this.options.upColor;
				e && !a.options.color && (a.color = 0 < a.y ? e : null);
				a = b.column.prototype.pointAttribs.call(this, a, f);
				delete a.dashstyle;
				return a
			},
			getGraphPath: function() {
				return ["M", 0, 0]
			},
			getCrispPath: function() {
				var b = this.data,
					a = b.length,
					d = this.graph.strokeWidth() + this.borderWidth,
					d = Math.round(d) % 2 / 2,
					n = [],
					c, k, l;
				for (l = 1; l < a; l++) k =
					b[l].shapeArgs, c = b[l - 1].shapeArgs, k = ["M", c.x + c.width, c.y + d, "L", k.x, c.y + d], 0 > b[l - 1].y && (k[2] += c.height, k[5] += c.height), n = n.concat(k);
				return n
			},
			drawGraph: function() {
				t.prototype.drawGraph.call(this);
				this.graph.attr({
					d: this.getCrispPath()
				})
			},
			getExtremes: a.noop
		}, {
			getClassName: function() {
				var b = h.prototype.getClassName.call(this);
				this.isSum ? b += " highcharts-sum" : this.isIntermediateSum && (b += " highcharts-intermediate-sum");
				return b
			},
			isValid: function() {
				return u(this.y, !0) || this.isSum || this.isIntermediateSum
			}
		})
	})(w);
	(function(a) {
		var q = a.Series,
			u = a.seriesType,
			v = a.seriesTypes;
		u("polygon", "scatter", {
			marker: {
				enabled: !1,
				states: {
					hover: {
						enabled: !1
					}
				}
			},
			stickyTracking: !1,
			tooltip: {
				followPointer: !0,
				pointFormat: ""
			},
			trackByArea: !0
		}, {
			type: "polygon",
			getGraphPath: function() {
				for (var a = q.prototype.getGraphPath.call(this), t = a.length + 1; t--;)(t === a.length || "M" === a[t]) && 0 < t && a.splice(t, 0, "z");
				return this.areaPath = a
			},
			drawGraph: function() {
				this.options.fillColor = this.color;
				v.area.prototype.drawGraph.call(this)
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			drawTracker: q.prototype.drawTracker,
			setStackedPoints: a.noop
		})
	})(w);
	(function(a) {
		var q = a.arrayMax,
			u = a.arrayMin,
			v = a.Axis,
			h = a.color,
			t = a.each,
			d = a.isNumber,
			b = a.noop,
			e = a.pick,
			f = a.pInt,
			p = a.Point,
			n = a.Series,
			c = a.seriesType,
			k = a.seriesTypes;
		c("bubble", "scatter", {
			dataLabels: {
				formatter: function() {
					return this.point.z
				},
				inside: !0,
				verticalAlign: "middle"
			},
			marker: {
				lineColor: null,
				lineWidth: 1,
				radius: null,
				states: {
					hover: {
						radiusPlus: 0
					}
				}
			},
			minSize: 8,
			maxSize: "20%",
			softThreshold: !1,
			states: {
				hover: {
					halo: {
						size: 5
					}
				}
			},
			tooltip: {
				pointFormat: "({point.x}, {point.y}), Size: {point.z}"
			},
			turboThreshold: 0,
			zThreshold: 0,
			zoneAxis: "z"
		}, {
			pointArrayMap: ["y", "z"],
			parallelArrays: ["x", "y", "z"],
			trackerGroups: ["group", "dataLabelsGroup"],
			bubblePadding: !0,
			zoneAxis: "z",
			markerAttribs: b,
			pointAttribs: function(b, a) {
				var c = e(this.options.marker.fillOpacity, .5);
				b = n.prototype.pointAttribs.call(this, b, a);
				1 !== c && (b.fill = h(b.fill).setOpacity(c).get("rgba"));
				return b
			},
			getRadii: function(b, a, e, c) {
				var g, f, d, l = this.zData,
					k = [],
					m = this.options,
					n = "width" !== m.sizeBy,
					r = m.zThreshold,
					p = a - b;
				f = 0;
				for (g = l.length; f < g; f++) d =
					l[f], m.sizeByAbsoluteValue && null !== d && (d = Math.abs(d - r), a = Math.max(a - r, Math.abs(b - r)), b = 0), null === d ? d = null : d < b ? d = e / 2 - 1 : (d = 0 < p ? (d - b) / p : .5, n && 0 <= d && (d = Math.sqrt(d)), d = Math.ceil(e + d * (c - e)) / 2), k.push(d);
				this.radii = k
			},
			animate: function(b) {
				var a = this.options.animation;
				b || (t(this.points, function(b) {
					var e = b.graphic;
					b = b.shapeArgs;
					e && b && (e.attr("r", 1), e.animate({
						r: b.r
					}, a))
				}), this.animate = null)
			},
			translate: function() {
				var b, a = this.data,
					e, c, f = this.radii;
				k.scatter.prototype.translate.call(this);
				for (b = a.length; b--;) e =
					a[b], c = f ? f[b] : 0, d(c) && c >= this.minPxSize / 2 ? (e.shapeType = "circle", e.shapeArgs = {
						x: e.plotX,
						y: e.plotY,
						r: c
					}, e.dlBox = {
						x: e.plotX - c,
						y: e.plotY - c,
						width: 2 * c,
						height: 2 * c
					}) : e.shapeArgs = e.plotY = e.dlBox = void 0
			},
			drawLegendSymbol: function(b, a) {
				var e = this.chart.renderer,
					c = e.fontMetrics(b.itemStyle && b.itemStyle.fontSize, a.legendItem).f / 2;
				a.legendSymbol = e.circle(c, b.baseline - c, c).attr({
					zIndex: 3
				}).add(a.legendGroup);
				a.legendSymbol.isMarker = !0
			},
			drawPoints: k.column.prototype.drawPoints,
			alignDataLabel: k.column.prototype.alignDataLabel,
			buildKDTree: b,
			applyZones: b
		}, {
			haloPath: function(b) {
				return p.prototype.haloPath.call(this, this.shapeArgs.r + b)
			},
			ttBelow: !1
		});
		v.prototype.beforePadding = function() {
			var b = this,
				a = this.len,
				c = this.chart,
				k = 0,
				n = a,
				p = this.isXAxis,
				h = p ? "xData" : "yData",
				v = this.min,
				w = {},
				x = Math.min(c.plotWidth, c.plotHeight),
				D = Number.MAX_VALUE,
				E = -Number.MAX_VALUE,
				F = this.max - v,
				B = a / F,
				G = [];
			t(this.series, function(a) {
				var d = a.options;
				!a.bubblePadding || !a.visible && c.options.chart.ignoreHiddenSeries || (b.allowZoomOutside = !0, G.push(a), p && (t(["minSize",
					"maxSize"
				], function(b) {
					var a = d[b],
						e = /%$/.test(a),
						a = f(a);
					w[b] = e ? x * a / 100 : a
				}), a.minPxSize = w.minSize, a.maxPxSize = Math.max(w.maxSize, w.minSize), a = a.zData, a.length && (D = e(d.zMin, Math.min(D, Math.max(u(a), !1 === d.displayNegative ? d.zThreshold : -Number.MAX_VALUE))), E = e(d.zMax, Math.max(E, q(a))))))
			});
			t(G, function(a) {
				var e = a[h],
					c = e.length,
					f;
				p && a.getRadii(D, E, a.minPxSize, a.maxPxSize);
				if (0 < F)
					for (; c--;) d(e[c]) && b.dataMin <= e[c] && e[c] <= b.dataMax && (f = a.radii[c], k = Math.min((e[c] - v) * B - f, k), n = Math.max((e[c] - v) * B + f, n))
			});
			G.length && 0 < F && !this.isLog && (n -= a, B *= (a + k - n) / a, t([
				["min", "userMin", k],
				["max", "userMax", n]
			], function(a) {
				void 0 === e(b.options[a[0]], b[a[1]]) && (b[a[0]] += a[2] / B)
			}))
		}
	})(w);
	(function(a) {
		function q(b, a) {
			var e = this.chart,
				d = this.options.animation,
				n = this.group,
				c = this.markerGroup,
				k = this.xAxis.center,
				l = e.plotLeft,
				m = e.plotTop;
			e.polar ? e.renderer.isSVG && (!0 === d && (d = {}), a ? (b = {
				translateX: k[0] + l,
				translateY: k[1] + m,
				scaleX: .001,
				scaleY: .001
			}, n.attr(b), c && c.attr(b)) : (b = {
				translateX: l,
				translateY: m,
				scaleX: 1,
				scaleY: 1
			}, n.animate(b,
				d), c && c.animate(b, d), this.animate = null)) : b.call(this, a)
		}
		var u = a.each,
			v = a.pick,
			h = a.seriesTypes,
			t = a.wrap,
			d = a.Series.prototype;
		a = a.Pointer.prototype;
		d.searchPointByAngle = function(b) {
			var a = this.chart,
				d = this.xAxis.pane.center;
			return this.searchKDTree({
				clientX: 180 + -180 / Math.PI * Math.atan2(b.chartX - d[0] - a.plotLeft, b.chartY - d[1] - a.plotTop)
			})
		};
		t(d, "buildKDTree", function(b) {
			this.chart.polar && (this.kdByAngle ? this.searchPoint = this.searchPointByAngle : this.kdDimensions = 2);
			b.apply(this)
		});
		d.toXY = function(b) {
			var a,
				d = this.chart,
				p = b.plotX;
			a = b.plotY;
			b.rectPlotX = p;
			b.rectPlotY = a;
			a = this.xAxis.postTranslate(b.plotX, this.yAxis.len - a);
			b.plotX = b.polarPlotX = a.x - d.plotLeft;
			b.plotY = b.polarPlotY = a.y - d.plotTop;
			this.kdByAngle ? (d = (p / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, 0 > d && (d += 360), b.clientX = d) : b.clientX = b.plotX
		};
		h.spline && t(h.spline.prototype, "getPointSpline", function(b, a, d, p) {
			var e, c, f, l, m, g, h;
			this.chart.polar ? (e = d.plotX, c = d.plotY, b = a[p - 1], f = a[p + 1], this.connectEnds && (b || (b = a[a.length - 2]), f || (f = a[1])), b && f &&
				(l = b.plotX, m = b.plotY, a = f.plotX, g = f.plotY, l = (1.5 * e + l) / 2.5, m = (1.5 * c + m) / 2.5, f = (1.5 * e + a) / 2.5, h = (1.5 * c + g) / 2.5, a = Math.sqrt(Math.pow(l - e, 2) + Math.pow(m - c, 2)), g = Math.sqrt(Math.pow(f - e, 2) + Math.pow(h - c, 2)), l = Math.atan2(m - c, l - e), m = Math.atan2(h - c, f - e), h = Math.PI / 2 + (l + m) / 2, Math.abs(l - h) > Math.PI / 2 && (h -= Math.PI), l = e + Math.cos(h) * a, m = c + Math.sin(h) * a, f = e + Math.cos(Math.PI + h) * g, h = c + Math.sin(Math.PI + h) * g, d.rightContX = f, d.rightContY = h), p ? (d = ["C", b.rightContX || b.plotX, b.rightContY || b.plotY, l || e, m || c, e, c], b.rightContX = b.rightContY =
					null) : d = ["M", e, c]) : d = b.call(this, a, d, p);
			return d
		});
		t(d, "translate", function(b) {
			var a = this.chart;
			b.call(this);
			if (a.polar && (this.kdByAngle = a.tooltip && a.tooltip.shared, !this.preventPostTranslate))
				for (b = this.points, a = b.length; a--;) this.toXY(b[a])
		});
		t(d, "getGraphPath", function(b, a) {
			var e = this,
				d, h;
			if (this.chart.polar) {
				a = a || this.points;
				for (d = 0; d < a.length; d++)
					if (!a[d].isNull) {
						h = d;
						break
					}!1 !== this.options.connectEnds && void 0 !== h && (this.connectEnds = !0, a.splice(a.length, 0, a[h]));
				u(a, function(a) {
					void 0 === a.polarPlotY &&
						e.toXY(a)
				})
			}
			return b.apply(this, [].slice.call(arguments, 1))
		});
		t(d, "animate", q);
		h.column && (h = h.column.prototype, h.polarArc = function(a, e, d, h) {
			var b = this.xAxis.center,
				c = this.yAxis.len;
			return this.chart.renderer.symbols.arc(b[0], b[1], c - e, null, {
				start: d,
				end: h,
				innerR: c - v(a, c)
			})
		}, t(h, "animate", q), t(h, "translate", function(a) {
			var b = this.xAxis,
				d = b.startAngleRad,
				h, n, c;
			this.preventPostTranslate = !0;
			a.call(this);
			if (b.isRadial)
				for (h = this.points, c = h.length; c--;) n = h[c], a = n.barX + d, n.shapeType = "path", n.shapeArgs = {
					d: this.polarArc(n.yBottom,
						n.plotY, a, a + n.pointWidth)
				}, this.toXY(n), n.tooltipPos = [n.plotX, n.plotY], n.ttBelow = n.plotY > b.center[1]
		}), t(h, "alignDataLabel", function(a, e, f, h, n, c) {
			this.chart.polar ? (a = e.rectPlotX / Math.PI * 180, null === h.align && (h.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === h.verticalAlign && (h.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"), d.alignDataLabel.call(this, e, f, h, n, c)) : a.call(this, e, f, h, n, c)
		}));
		t(a, "getCoordinates", function(a, e) {
			var b = this.chart,
				d = {
					xAxis: [],
					yAxis: []
				};
			b.polar ?
				u(b.axes, function(a) {
					var c = a.isXAxis,
						f = a.center,
						h = e.chartX - f[0] - b.plotLeft,
						f = e.chartY - f[1] - b.plotTop;
					d[c ? "xAxis" : "yAxis"].push({
						axis: a,
						value: a.translate(c ? Math.PI - Math.atan2(h, f) : Math.sqrt(Math.pow(h, 2) + Math.pow(f, 2)), !0)
					})
				}) : d = a.call(this, e);
			return d
		})
	})(w)
});