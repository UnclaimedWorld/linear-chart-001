var N = Object.defineProperty;
var P = (c, e, t) => e in c ? N(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var r = (c, e, t) => (P(c, typeof e != "symbol" ? e + "" : e, t), t);
import * as h from "d3";
class L {
  constructor(e, t) {
    r(this, "root");
    r(this, "chartState");
    r(this, "data");
    this.root = h.create("svg:g"), this.chartState = t, this.data = e;
  }
  getNode() {
    return this.root.node();
  }
  destroy() {
  }
  redraw(e) {
  }
}
class k extends L {
  constructor(e, t) {
    super(e, t), this.setScale(), this.setStyles();
  }
  setScale() {
    const { yMax: e, tickDividedBy: t, sizes: a, yScale: s } = this.chartState;
    var i = new Array(e / t + 1 || 0).fill(0).map((o, p) => p * t);
    this.root.style("transform", `translate(${a.width + a.left}px, ${a.top}px)`).call(h.axisLeft(s).tickValues(i).tickSize(a.width));
  }
  setStyles() {
    this.root.attr("class", "left-axis");
  }
  redraw(e) {
    this.data = e, this.setScale();
  }
}
class z extends L {
  constructor(e, t) {
    super(e, t), this.setScale(), this.setStyles();
  }
  setScale() {
    var e = this.root, { sizes: t, xScale: a, yScale: s } = this.chartState;
    e.style("transform", `translate(${t.left}px,${s(0) + t.top}px)`).call(h.axisBottom(a).ticks(this.data.length).tickValues(this.chartState.parseXField(this.data)).tickFormat((i, o) => this.chartState.parseXVisible(this.data[o]))), e.selectAll(".tick line").attr("style", `transform: translateY(${-s(0)}px)`).attr("stroke", "#E1E1E1").attr("stroke-dasharray", "2,2").attr("y2", s(0)), e.select(".domain").remove();
  }
  setStyles() {
    this.root.classed("bottom-axis", !0).selectAll("text");
  }
  redraw(e) {
    this.data = e, this.setScale();
  }
}
class E extends L {
  constructor(t, a, s) {
    super(t, a);
    r(this, "dataLineField");
    r(this, "lineNode");
    r(this, "areaNode");
    r(this, "line", h.line());
    r(this, "area", h.area());
    this.dataLineField = s, this.lineNode = this.root.append("path"), this.areaNode = this.root.append("path"), this.setStyles(), this.setScale();
  }
  setScale() {
    const { sizes: t, xScale: a, yScale: s } = this.chartState;
    this.line = h.line().curve(h.curveBumpX).x((i) => a(this.chartState.parseXField(i))).y((i) => s(i[this.dataLineField])), this.area = h.area().curve(h.curveBumpX).x((i) => a(this.chartState.parseXField(i))).y1((i) => s(i[this.dataLineField])), this.area.y0(t.height), this.areaNode.attr("d", this.area(this.data)), this.lineNode.datum(this.data).attr("d", this.line);
  }
  setStyles() {
    var t, a = this.chartState.dataLines.find((s) => s.field === this.dataLineField);
    a && (t = this.chartState.defsNode, (t = t.append("linearGradient").attr("id", "g-" + a.field).attr("gradientTransform", "rotate(90)")).append("stop").attr("offset", "0%").attr("stop-color", a.color).attr("stop-opacity", "0.15"), t.append("stop").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", "0.15"), this.areaNode.attr("fill", `url(#g-${a.field})`), this.lineNode.attr("stroke", a.color).attr("stroke-width", "2px").attr("fill", "none"));
  }
  redraw(t) {
    this.data = t, this.setScale();
  }
}
class M extends L {
  constructor(l, s) {
    super(l, s);
    r(this, "tooltipHeight");
    r(this, "tooltip");
    r(this, "tooltipTitle");
    r(this, "circles");
    r(this, "tooltipWidth", 171);
    r(this, "tooltipLabelNode");
    r(this, "tooltipLabelPos");
    r(this, "tooltipLabelPosInitial");
    r(this, "tooltipLabelPosY");
    r(this, "tooltipLabelPosX");
    r(this, "delta", 0);
    this.tooltipHeight = 52 + 20 * s.dataLines.length + 3 * s.dataLines.length + 16;
    var l = this.tooltipHeight, s = this.chartState.dataLines, i = s.map((g) => {
      var n = this.root.append("svg:circle");
      return n.style("display", "none").attr("r", 6).attr("fill", g.color).attr("stroke", "#fff").attr("stroke-width", 2), n;
    });
    const o = this.root.append("svg:g");
    o.style("opacity", "0").attr("pointer-events", "none").style("letter-spacing", "0.07px").style("font-weight", "500").style("font-size", "14px").style("fill", "#fff");
    var p = o.append("svg:g"), l = (p.attr("fill", "#454142").attr("opacity", 0.92), p.append("rect").attr("rx", 6).attr("x", 0).attr("y", 0).attr("width", 203).attr("height", l), this.tooltipLabelPosY = l - 3, this.tooltipLabelPosX = 90, this.tooltipLabelPosInitial = `translate(${this.tooltipLabelPosX},${this.tooltipLabelPosY})`, this.tooltipLabelPos = this.tooltipLabelPosInitial, this.tooltipLabelNode = p.append("path").attr("d", "M9.46326 13.3346C10.2583 14.223 11.649 14.223 12.444 13.3346L21.3937 3.33372C22.5466 2.0454 21.6322 0 19.9033 0H2.00392C0.275054 0 -0.639356 2.0454 0.513553 3.33372L9.46326 13.3346Z").attr("transform", this.tooltipLabelPos), o.append("text"));
    l.attr("x", 102).attr("y", 30).style("text-anchor", "middle"), o.append("rect").attr("x", 16).attr("y", 44).attr("fill", "rgba(255,255,255,0.3)").attr("height", 1).attr("width", this.tooltipWidth), s.forEach((g, n) => {
      var d = o.append("svg:g");
      d.attr("transform", `translate(16,${68 + 26 * n})`), d.append("text").text(g.name), g.textVar = d.append("svg:text"), g.textVar.style("text-anchor", "end").attr("x", 171);
    }), this.tooltip = o, this.tooltipTitle = l, this.circles = i, this.initEvent();
  }
  updateDelta() {
    var [t = 0, a = 0] = h.extent(this.data, this.chartState.parseXField);
    this.delta = a - t;
  }
  initEvent() {
    const t = { x: 101, y: this.tooltipHeight + 11 + 16 }, { yScale: a, xScale: s, dataWrapperNode: i, svgNode: o, dataLines: p } = this.chartState;
    i.on("mouseenter", () => {
      this.updateDelta(), this.tooltip.transition().duration(250).style("opacity", 1), this.circles.forEach((g) => {
        g.style("display", "block");
      });
    });
    let l = null;
    i.on("mousemove", (d) => {
      var n = this.chartState.sizes, [d] = h.pointer(d), d = Math.round(d / n.width * this.delta);
      const y = this.data[d];
      n = s(this.chartState.parseXField(y));
      let x = n;
      const v = p.map((m) => a(y[m.field]));
      p.forEach((m, b) => {
        this.circles[b].attr("cx", x).attr("cy", v[b]);
      }), x -= t.x;
      var w = this.tooltipLabelPos;
      let f = "", S = this.tooltipLabelPosX, u = (x <= 0 ? (x = -20, S = n - x - 11, f = `translate(${S},${this.tooltipLabelPosY})`) : x >= this.chartState.sizes.width - this.tooltipWidth ? (x = this.chartState.sizes.width - this.tooltipWidth - 10, S = n - x - 11, f = `translate(${S},${this.tooltipLabelPosY})`) : f != this.tooltipLabelPosInitial && (S = this.tooltipLabelPosX, f = this.tooltipLabelPosInitial), v[0] - t.y);
      u <= 0 && (u = v[0] + 16 + 11, f = `translate(${S + 22},3)rotate(180)`), f != w && (this.tooltipLabelPos = f, this.tooltipLabelNode.attr("transform", f)), this.tooltip.attr("transform", `translate(${x},${u})`), l && l.i !== d && (l.yTick.classed("selected", !1), l = null), l || (l = { yTick: o.select(`.bottom-axis .tick:nth-child(${d + 1})`), i: d }).yTick.classed("selected", !0), this.tooltipTitle.text(this.chartState.parseXVisible(y)), p.forEach((m) => {
        m.textVar.selection().text(y[m.field]);
      });
    }), i.on("mouseleave", () => {
      this.tooltip.transition().duration(250).style("opacity", "0"), this.circles.forEach((g) => {
        g.style("display", "none");
      }), l && (l.yTick.classed("selected", !1), l = null);
    });
  }
  redraw(t) {
    this.data = t, this.updateDelta();
  }
}
class $ extends L {
  constructor(t, a) {
    super(t, a);
    r(this, "totalElements");
    this.root = h.create("div"), this.root.classed("c-chart-info", !0);
    var s = this.root.append("div").classed("c-chart-info__wrap c-chart-info__wrap--small-size", !0), i = this.root.append("div").classed("c-chart-info__wrap c-chart-info__wrap--end-pos", !0);
    this.totalElements = [], this.data = t, s.selectAll("div").data(a.dataLines).enter().insert((o) => this.createLegend(o)), i.selectAll("div").data(a.dataLines).enter().insert((o) => {
      var { node: p, valueNode: l } = this.createTotal(o);
      return this.totalElements.push({ node: l, field: o.field }), p;
    }), this.root.style("padding-left", a.sizes.left + "px").style("padding-right", a.sizes.right + "px");
  }
  redraw(t) {
    this.data = t, this.totalElements.forEach(({ node: a, field: s }) => {
      a.text(this.getMax(t, s));
    });
  }
  destroy() {
    var t;
    (t = this.getNode()) == null || t.remove();
  }
  getMax(t, a) {
    return t.reduce((s, i) => s + i[a], 0);
  }
  createLegend(t) {
    var a = h.create("div");
    return a.classed("c-legend", !0), a.append("div").classed("c-legend__color", !0).style("background-color", t.color), a.append("p").classed("c-legend__name", !0).text(t.name), a.node();
  }
  createTotal(i) {
    var s = this.data, a = h.create("div"), s = (a.classed("c-total", !0), a.append("p").classed("c-total__name", !0).text(i.name), this.getMax(s, i.field)), i = a.append("p");
    return i.classed("c-total__value", !0).text(s), { node: a.node(), valueNode: i };
  }
}
class _ {
  constructor(e, t) {
    r(this, "chartState");
    r(this, "data");
    r(this, "dataPaths");
    r(this, "elements");
    r(this, "chartNode");
    var a = h.select(t.element), s = (this.chartNode = a.node(), a.append("svg")), i = this.calculateSizes(this.chartNode), { yMax: o, tickDividedBy: p } = (s.attr("width", i.totalWidth + "px"), s.attr("height", i.totalHeight + "px"), this.data = e, this.calculateMax(t.dataLines));
    const l = h.create("svg:g").style("transform", `translate(${i.left}px,${i.top}px)`);
    var g = h.scaleLinear([0, o], [i.height, 0]), [n = 0, d = 0] = h.extent(e, t.xAxis.getData), n = h.scaleLinear([n, d], [0, i.width]), d = s.append("defs");
    const y = { sizes: i, yMax: o, tickDividedBy: p, dataLines: t.dataLines, dataWrapperNode: l, svgNode: s, defsNode: d, yScale: g, xScale: n, parseXVisible: t.xAxis.getVisible, parseXField: t.xAxis.getData }, x = (this.chartState = y, new z(e, y)), v = new M(e, y), w = new $(e, y), f = new k(e, y);
    l.append("rect").attr("class", "sizes-rect").attr("width", i.width).attr("height", i.height).attr("fill", "transparent"), this.dataPaths = [], t.dataLines.forEach((S) => {
      const u = new E(e, y, S.field);
      this.dataPaths.push(u), this.appendSingle(l, () => u.getNode());
    }), this.appendSingle(a, () => w.getNode(), !0), this.appendSingle(s, () => f.getNode()), this.appendSingle(s, () => x.getNode()), this.appendSingle(s, () => l.node()), this.appendSingle(l, () => v.getNode()), this.elements = [w, f, x, v], this.resize = this.resize.bind(this), window.addEventListener("resize", this.resize);
  }
  calculateSizes(e) {
    return e = { top: 22, left: 86, right: 34, bottom: 94, width: 0, height: 389, totalWidth: e.clientWidth, totalHeight: 0 }, e.width = e.totalWidth - e.left - e.right, e.totalHeight = e.height + e.top + e.bottom, e;
  }
  appendSingle(e, t, a) {
    e.node()[a ? "prepend" : "append"](t());
  }
  redraw(e) {
    this.data = e;
    var { yMax: t, tickDividedBy: a } = this.calculateMax(this.chartState.dataLines), [t = 0, a = 0] = (this.chartState.yMax = t, this.chartState.tickDividedBy = a, this.chartState.yScale.domain([0, this.chartState.yMax]), h.extent(e, this.chartState.parseXField));
    this.chartState.xScale.domain([t, a]), this.elements.forEach((s) => s.redraw(e)), this.dataPaths.forEach((s) => s.redraw(e));
  }
  resize() {
    var e = this.calculateSizes(this.chartNode);
    this.chartState.sizes = e, h.select(this.chartNode).select(".sizes-rect").attr("width", e.width).attr("height", e.height), this.chartState.svgNode.attr("width", e.totalWidth + "px"), this.chartState.svgNode.attr("height", e.totalHeight + "px"), this.chartState.yScale.range([e.height, 0]), this.chartState.xScale.range([0, e.width]), this.redraw(this.data);
  }
  calculateMax(e) {
    let t = 0;
    var a;
    this.data.forEach((i) => {
      t = Math.max(t, ...e.map((o) => i[o.field]));
    });
    let s = 50;
    return t < 50 && (s = 10), a = Math.ceil(t / 500) * s || 10, { yMax: t = Math.ceil(Math.round(t + 0.1 * t) / a) * a || 50, tickDividedBy: a };
  }
  destroy() {
    this.chartState.svgNode.remove(), this.elements.forEach((e) => e.destroy()), this.dataPaths.forEach((e) => e.destroy()), this.chartNode = null, this.chartState = null, this.elements = null, this.dataPaths = null, this.data = null, window.removeEventListener("resize", this.resize);
  }
}
class D {
  constructor(e, t, a) {
    r(this, "name");
    r(this, "field");
    r(this, "color");
    r(this, "textVar");
    this.name = e, this.field = t, this.color = a, this.textVar = null;
  }
}
export {
  _ as Chart,
  D as DataLine
};
