var wn = Object.defineProperty;
var vn = (t, e, n) => e in t ? wn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var S = (t, e, n) => (vn(t, typeof e != "symbol" ? e + "" : e, n), n);
function _t(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function bn(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Re(t) {
  let e, n, r;
  t.length !== 2 ? (e = _t, n = (o, u) => _t(t(o), u), r = (o, u) => t(o) - u) : (e = t === _t || t === bn ? t : Sn, n = t, r = t);
  function i(o, u, l = 0, f = o.length) {
    if (l < f) {
      if (e(u, u) !== 0)
        return f;
      do {
        const c = l + f >>> 1;
        n(o[c], u) < 0 ? l = c + 1 : f = c;
      } while (l < f);
    }
    return l;
  }
  function a(o, u, l = 0, f = o.length) {
    if (l < f) {
      if (e(u, u) !== 0)
        return f;
      do {
        const c = l + f >>> 1;
        n(o[c], u) <= 0 ? l = c + 1 : f = c;
      } while (l < f);
    }
    return l;
  }
  function s(o, u, l = 0, f = o.length) {
    const c = i(o, u, l, f - 1);
    return c > l && r(o[c - 1], u) > -r(o[c], u) ? c - 1 : c;
  }
  return { left: i, center: s, right: a };
}
function Sn() {
  return 0;
}
function Nn(t) {
  return t === null ? NaN : +t;
}
const kn = Re(_t), Mn = kn.right;
Re(Nn).center;
const $n = Mn;
function It(t, e) {
  let n, r;
  if (e === void 0)
    for (const i of t)
      i != null && (n === void 0 ? i >= i && (n = r = i) : (n > i && (n = i), r < i && (r = i)));
  else {
    let i = -1;
    for (let a of t)
      (a = e(a, ++i, t)) != null && (n === void 0 ? a >= a && (n = r = a) : (n > a && (n = a), r < a && (r = a)));
  }
  return [n, r];
}
const An = Math.sqrt(50), En = Math.sqrt(10), Ln = Math.sqrt(2);
function bt(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / Math.pow(10, i), s = a >= An ? 10 : a >= En ? 5 : a >= Ln ? 2 : 1;
  let o, u, l;
  return i < 0 ? (l = Math.pow(10, -i) / s, o = Math.round(t * l), u = Math.round(e * l), o / l < t && ++o, u / l > e && --u, l = -l) : (l = Math.pow(10, i) * s, o = Math.round(t / l), u = Math.round(e / l), o * l < t && ++o, u * l > e && --u), u < o && 0.5 <= n && n < 2 ? bt(t, e, n * 2) : [o, u, l];
}
function Tn(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0))
    return [];
  if (t === e)
    return [t];
  const r = e < t, [i, a, s] = r ? bt(e, t, n) : bt(t, e, n);
  if (!(a >= i))
    return [];
  const o = a - i + 1, u = new Array(o);
  if (r)
    if (s < 0)
      for (let l = 0; l < o; ++l)
        u[l] = (a - l) / -s;
    else
      for (let l = 0; l < o; ++l)
        u[l] = (a - l) * s;
  else if (s < 0)
    for (let l = 0; l < o; ++l)
      u[l] = (i + l) / -s;
  else
    for (let l = 0; l < o; ++l)
      u[l] = (i + l) * s;
  return u;
}
function Dt(t, e, n) {
  return e = +e, t = +t, n = +n, bt(t, e, n)[2];
}
function Pn(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? Dt(e, t, n) : Dt(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Cn(t) {
  return t;
}
var Ft = 1, Rt = 2, Vt = 3, tt = 4, he = 1e-6;
function zn(t) {
  return "translate(" + t + ",0)";
}
function Fn(t) {
  return "translate(0," + t + ")";
}
function Rn(t) {
  return (e) => +t(e);
}
function Xn(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Hn() {
  return !this.__axis;
}
function Xe(t, e) {
  var n = [], r = null, i = null, a = 6, s = 6, o = 3, u = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === Ft || t === tt ? -1 : 1, f = t === tt || t === Rt ? "x" : "y", c = t === Ft || t === Vt ? zn : Fn;
  function h(d) {
    var p = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), g = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Cn), y = Math.max(a, 0) + o, _ = e.range(), v = +_[0] + u, b = +_[_.length - 1] + u, w = (e.bandwidth ? Xn : Rn)(e.copy(), u), x = d.selection ? d.selection() : d, L = x.selectAll(".domain").data([null]), k = x.selectAll(".tick").data(p, e).order(), R = k.exit(), W = k.enter().append("g").attr("class", "tick"), D = k.select("line"), m = k.select("text");
    L = L.merge(L.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), k = k.merge(W), D = D.merge(W.append("line").attr("stroke", "currentColor").attr(f + "2", l * a)), m = m.merge(W.append("text").attr("fill", "currentColor").attr(f, l * y).attr("dy", t === Ft ? "0em" : t === Vt ? "0.71em" : "0.32em")), d !== x && (L = L.transition(d), k = k.transition(d), D = D.transition(d), m = m.transition(d), R = R.transition(d).attr("opacity", he).attr("transform", function($) {
      return isFinite($ = w($)) ? c($ + u) : this.getAttribute("transform");
    }), W.attr("opacity", he).attr("transform", function($) {
      var M = this.parentNode.__axis;
      return c((M && isFinite(M = M($)) ? M : w($)) + u);
    })), R.remove(), L.attr("d", t === tt || t === Rt ? s ? "M" + l * s + "," + v + "H" + u + "V" + b + "H" + l * s : "M" + u + "," + v + "V" + b : s ? "M" + v + "," + l * s + "V" + u + "H" + b + "V" + l * s : "M" + v + "," + u + "H" + b), k.attr("opacity", 1).attr("transform", function($) {
      return c(w($) + u);
    }), D.attr(f + "2", l * a), m.attr(f, l * y).text(g), x.filter(Hn).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Rt ? "start" : t === tt ? "end" : "middle"), x.each(function() {
      this.__axis = w;
    });
  }
  return h.scale = function(d) {
    return arguments.length ? (e = d, h) : e;
  }, h.ticks = function() {
    return n = Array.from(arguments), h;
  }, h.tickArguments = function(d) {
    return arguments.length ? (n = d == null ? [] : Array.from(d), h) : n.slice();
  }, h.tickValues = function(d) {
    return arguments.length ? (r = d == null ? null : Array.from(d), h) : r && r.slice();
  }, h.tickFormat = function(d) {
    return arguments.length ? (i = d, h) : i;
  }, h.tickSize = function(d) {
    return arguments.length ? (a = s = +d, h) : a;
  }, h.tickSizeInner = function(d) {
    return arguments.length ? (a = +d, h) : a;
  }, h.tickSizeOuter = function(d) {
    return arguments.length ? (s = +d, h) : s;
  }, h.tickPadding = function(d) {
    return arguments.length ? (o = +d, h) : o;
  }, h.offset = function(d) {
    return arguments.length ? (u = +d, h) : u;
  }, h;
}
function In(t) {
  return Xe(Vt, t);
}
function Dn(t) {
  return Xe(tt, t);
}
var Vn = { value: () => {
} };
function He() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new xt(n);
}
function xt(t) {
  this._ = t;
}
function qn(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
xt.prototype = He.prototype = {
  constructor: xt,
  on: function(t, e) {
    var n = this._, r = qn(t + "", n), i, a = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++a < s; )
        if ((i = (t = r[a]).type) && (i = On(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++a < s; )
      if (i = (t = r[a]).type)
        n[i] = de(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = de(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new xt(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, a; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (a = this._[t], r = 0, i = a.length; r < i; ++r)
      a[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, a = r.length; i < a; ++i)
      r[i].value.apply(e, n);
  }
};
function On(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function de(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Vn, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var qt = "http://www.w3.org/1999/xhtml";
const pe = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: qt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Pt(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), pe.hasOwnProperty(e) ? { space: pe[e], local: t } : t;
}
function Yn(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === qt && e.documentElement.namespaceURI === qt ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Bn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function ee(t) {
  var e = Pt(t);
  return (e.local ? Bn : Yn)(e);
}
function Wn() {
}
function ne(t) {
  return t == null ? Wn : function() {
    return this.querySelector(t);
  };
}
function Gn(t) {
  typeof t != "function" && (t = ne(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = new Array(s), u, l, f = 0; f < s; ++f)
      (u = a[f]) && (l = t.call(u, u.__data__, f, a)) && ("__data__" in u && (l.__data__ = u.__data__), o[f] = l);
  return new E(r, this._parents);
}
function Un(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Zn() {
  return [];
}
function Ie(t) {
  return t == null ? Zn : function() {
    return this.querySelectorAll(t);
  };
}
function Kn(t) {
  return function() {
    return Un(t.apply(this, arguments));
  };
}
function Qn(t) {
  typeof t == "function" ? t = Kn(t) : t = Ie(t);
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, u, l = 0; l < o; ++l)
      (u = s[l]) && (r.push(t.call(u, u.__data__, l, s)), i.push(u));
  return new E(r, i);
}
function De(t) {
  return function() {
    return this.matches(t);
  };
}
function Ve(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Jn = Array.prototype.find;
function jn(t) {
  return function() {
    return Jn.call(this.children, t);
  };
}
function tr() {
  return this.firstElementChild;
}
function er(t) {
  return this.select(t == null ? tr : jn(typeof t == "function" ? t : Ve(t)));
}
var nr = Array.prototype.filter;
function rr() {
  return Array.from(this.children);
}
function ir(t) {
  return function() {
    return nr.call(this.children, t);
  };
}
function ar(t) {
  return this.selectAll(t == null ? rr : ir(typeof t == "function" ? t : Ve(t)));
}
function sr(t) {
  typeof t != "function" && (t = De(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], u, l = 0; l < s; ++l)
      (u = a[l]) && t.call(u, u.__data__, l, a) && o.push(u);
  return new E(r, this._parents);
}
function qe(t) {
  return new Array(t.length);
}
function or() {
  return new E(this._enter || this._groups.map(qe), this._parents);
}
function St(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
St.prototype = {
  constructor: St,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function lr(t) {
  return function() {
    return t;
  };
}
function ur(t, e, n, r, i, a) {
  for (var s = 0, o, u = e.length, l = a.length; s < l; ++s)
    (o = e[s]) ? (o.__data__ = a[s], r[s] = o) : n[s] = new St(t, a[s]);
  for (; s < u; ++s)
    (o = e[s]) && (i[s] = o);
}
function cr(t, e, n, r, i, a, s) {
  var o, u, l = /* @__PURE__ */ new Map(), f = e.length, c = a.length, h = new Array(f), d;
  for (o = 0; o < f; ++o)
    (u = e[o]) && (h[o] = d = s.call(u, u.__data__, o, e) + "", l.has(d) ? i[o] = u : l.set(d, u));
  for (o = 0; o < c; ++o)
    d = s.call(t, a[o], o, a) + "", (u = l.get(d)) ? (r[o] = u, u.__data__ = a[o], l.delete(d)) : n[o] = new St(t, a[o]);
  for (o = 0; o < f; ++o)
    (u = e[o]) && l.get(h[o]) === u && (i[o] = u);
}
function fr(t) {
  return t.__data__;
}
function hr(t, e) {
  if (!arguments.length)
    return Array.from(this, fr);
  var n = e ? cr : ur, r = this._parents, i = this._groups;
  typeof t != "function" && (t = lr(t));
  for (var a = i.length, s = new Array(a), o = new Array(a), u = new Array(a), l = 0; l < a; ++l) {
    var f = r[l], c = i[l], h = c.length, d = dr(t.call(f, f && f.__data__, l, r)), p = d.length, g = o[l] = new Array(p), y = s[l] = new Array(p), _ = u[l] = new Array(h);
    n(f, c, g, y, _, d, e);
    for (var v = 0, b = 0, w, x; v < p; ++v)
      if (w = g[v]) {
        for (v >= b && (b = v + 1); !(x = y[b]) && ++b < p; )
          ;
        w._next = x || null;
      }
  }
  return s = new E(s, r), s._enter = o, s._exit = u, s;
}
function dr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function pr() {
  return new E(this._exit || this._groups.map(qe), this._parents);
}
function gr(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function mr(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, a = r.length, s = Math.min(i, a), o = new Array(i), u = 0; u < s; ++u)
    for (var l = n[u], f = r[u], c = l.length, h = o[u] = new Array(c), d, p = 0; p < c; ++p)
      (d = l[p] || f[p]) && (h[p] = d);
  for (; u < i; ++u)
    o[u] = n[u];
  return new E(o, this._parents);
}
function yr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], s; --i >= 0; )
      (s = r[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function _r(t) {
  t || (t = xr);
  function e(c, h) {
    return c && h ? t(c.__data__, h.__data__) : !c - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var s = n[a], o = s.length, u = i[a] = new Array(o), l, f = 0; f < o; ++f)
      (l = s[f]) && (u[f] = l);
    u.sort(e);
  }
  return new E(i, this._parents).order();
}
function xr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function wr() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function vr() {
  return Array.from(this);
}
function br() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function Sr() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Nr() {
  return !this.node();
}
function kr(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, s = i.length, o; a < s; ++a)
      (o = i[a]) && t.call(o, o.__data__, a, i);
  return this;
}
function Mr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function $r(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ar(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Er(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Lr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Tr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Pr(t, e) {
  var n = Pt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? $r : Mr : typeof e == "function" ? n.local ? Tr : Lr : n.local ? Er : Ar)(n, e));
}
function Oe(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Cr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function zr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Fr(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Rr(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Cr : typeof e == "function" ? Fr : zr)(t, e, n ?? "")) : K(this.node(), t);
}
function K(t, e) {
  return t.style.getPropertyValue(e) || Oe(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Xr(t) {
  return function() {
    delete this[t];
  };
}
function Hr(t, e) {
  return function() {
    this[t] = e;
  };
}
function Ir(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Dr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Xr : typeof e == "function" ? Ir : Hr)(t, e)) : this.node()[t];
}
function Ye(t) {
  return t.trim().split(/^|\s+/);
}
function re(t) {
  return t.classList || new Be(t);
}
function Be(t) {
  this._node = t, this._names = Ye(t.getAttribute("class") || "");
}
Be.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function We(t, e) {
  for (var n = re(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function Ge(t, e) {
  for (var n = re(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function Vr(t) {
  return function() {
    We(this, t);
  };
}
function qr(t) {
  return function() {
    Ge(this, t);
  };
}
function Or(t, e) {
  return function() {
    (e.apply(this, arguments) ? We : Ge)(this, t);
  };
}
function Yr(t, e) {
  var n = Ye(t + "");
  if (arguments.length < 2) {
    for (var r = re(this.node()), i = -1, a = n.length; ++i < a; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Or : e ? Vr : qr)(n, e));
}
function Br() {
  this.textContent = "";
}
function Wr(t) {
  return function() {
    this.textContent = t;
  };
}
function Gr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ur(t) {
  return arguments.length ? this.each(t == null ? Br : (typeof t == "function" ? Gr : Wr)(t)) : this.node().textContent;
}
function Zr() {
  this.innerHTML = "";
}
function Kr(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Qr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Jr(t) {
  return arguments.length ? this.each(t == null ? Zr : (typeof t == "function" ? Qr : Kr)(t)) : this.node().innerHTML;
}
function jr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ti() {
  return this.each(jr);
}
function ei() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ni() {
  return this.each(ei);
}
function ri(t) {
  var e = typeof t == "function" ? t : ee(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ii() {
  return null;
}
function ai(t, e) {
  var n = typeof t == "function" ? t : ee(t), r = e == null ? ii : typeof e == "function" ? e : ne(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function si() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function oi() {
  return this.each(si);
}
function li() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ui() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ci(t) {
  return this.select(t ? ui : li);
}
function fi(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function hi(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function di(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function pi(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function gi(t, e, n) {
  return function() {
    var r = this.__on, i, a = hi(e);
    if (r) {
      for (var s = 0, o = r.length; s < o; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), i = { type: t.type, name: t.name, value: e, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function mi(t, e, n) {
  var r = di(t + ""), i, a = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var u = 0, l = o.length, f; u < l; ++u)
        for (i = 0, f = o[u]; i < a; ++i)
          if ((s = r[i]).type === f.type && s.name === f.name)
            return f.value;
    }
    return;
  }
  for (o = e ? gi : pi, i = 0; i < a; ++i)
    this.each(o(r[i], e, n));
  return this;
}
function Ue(t, e, n) {
  var r = Oe(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function yi(t, e) {
  return function() {
    return Ue(this, t, e);
  };
}
function _i(t, e) {
  return function() {
    return Ue(this, t, e.apply(this, arguments));
  };
}
function xi(t, e) {
  return this.each((typeof e == "function" ? _i : yi)(t, e));
}
function* wi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length, s; i < a; ++i)
      (s = r[i]) && (yield s);
}
var Ze = [null];
function E(t, e) {
  this._groups = t, this._parents = e;
}
function lt() {
  return new E([[document.documentElement]], Ze);
}
function vi() {
  return this;
}
E.prototype = lt.prototype = {
  constructor: E,
  select: Gn,
  selectAll: Qn,
  selectChild: er,
  selectChildren: ar,
  filter: sr,
  data: hr,
  enter: or,
  exit: pr,
  join: gr,
  merge: mr,
  selection: vi,
  order: yr,
  sort: _r,
  call: wr,
  nodes: vr,
  node: br,
  size: Sr,
  empty: Nr,
  each: kr,
  attr: Pr,
  style: Rr,
  property: Dr,
  classed: Yr,
  text: Ur,
  html: Jr,
  raise: ti,
  lower: ni,
  append: ri,
  insert: ai,
  remove: oi,
  clone: ci,
  datum: fi,
  on: mi,
  dispatch: xi,
  [Symbol.iterator]: wi
};
function Ot(t) {
  return typeof t == "string" ? new E([[document.querySelector(t)]], [document.documentElement]) : new E([[t]], Ze);
}
function it(t) {
  return Ot(ee(t).call(document.documentElement));
}
function bi(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function Si(t, e) {
  if (t = bi(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function ie(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ke(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function ut() {
}
var at = 0.7, Nt = 1 / at, Z = "\\s*([+-]?\\d+)\\s*", st = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", z = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ni = /^#([0-9a-f]{3,8})$/, ki = new RegExp(`^rgb\\(${Z},${Z},${Z}\\)$`), Mi = new RegExp(`^rgb\\(${z},${z},${z}\\)$`), $i = new RegExp(`^rgba\\(${Z},${Z},${Z},${st}\\)$`), Ai = new RegExp(`^rgba\\(${z},${z},${z},${st}\\)$`), Ei = new RegExp(`^hsl\\(${st},${z},${z}\\)$`), Li = new RegExp(`^hsla\\(${st},${z},${z},${st}\\)$`), ge = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
ie(ut, Y, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: me,
  // Deprecated! Use color.formatHex.
  formatHex: me,
  formatHex8: Ti,
  formatHsl: Pi,
  formatRgb: ye,
  toString: ye
});
function me() {
  return this.rgb().formatHex();
}
function Ti() {
  return this.rgb().formatHex8();
}
function Pi() {
  return Qe(this).formatHsl();
}
function ye() {
  return this.rgb().formatRgb();
}
function Y(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ni.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? _e(e) : n === 3 ? new A(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? pt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? pt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ki.exec(t)) ? new A(e[1], e[2], e[3], 1) : (e = Mi.exec(t)) ? new A(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = $i.exec(t)) ? pt(e[1], e[2], e[3], e[4]) : (e = Ai.exec(t)) ? pt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ei.exec(t)) ? ve(e[1], e[2] / 100, e[3] / 100, 1) : (e = Li.exec(t)) ? ve(e[1], e[2] / 100, e[3] / 100, e[4]) : ge.hasOwnProperty(t) ? _e(ge[t]) : t === "transparent" ? new A(NaN, NaN, NaN, 0) : null;
}
function _e(t) {
  return new A(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function pt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new A(t, e, n, r);
}
function Ci(t) {
  return t instanceof ut || (t = Y(t)), t ? (t = t.rgb(), new A(t.r, t.g, t.b, t.opacity)) : new A();
}
function Yt(t, e, n, r) {
  return arguments.length === 1 ? Ci(t) : new A(t, e, n, r ?? 1);
}
function A(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
ie(A, Yt, Ke(ut, {
  brighter(t) {
    return t = t == null ? Nt : Math.pow(Nt, t), new A(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? at : Math.pow(at, t), new A(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new A(O(this.r), O(this.g), O(this.b), kt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: xe,
  // Deprecated! Use color.formatHex.
  formatHex: xe,
  formatHex8: zi,
  formatRgb: we,
  toString: we
}));
function xe() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}`;
}
function zi() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}${q((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function we() {
  const t = kt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${O(this.r)}, ${O(this.g)}, ${O(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function kt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function O(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function q(t) {
  return t = O(t), (t < 16 ? "0" : "") + t.toString(16);
}
function ve(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new P(t, e, n, r);
}
function Qe(t) {
  if (t instanceof P)
    return new P(t.h, t.s, t.l, t.opacity);
  if (t instanceof ut || (t = Y(t)), !t)
    return new P();
  if (t instanceof P)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), s = NaN, o = a - i, u = (a + i) / 2;
  return o ? (e === a ? s = (n - r) / o + (n < r) * 6 : n === a ? s = (r - e) / o + 2 : s = (e - n) / o + 4, o /= u < 0.5 ? a + i : 2 - a - i, s *= 60) : o = u > 0 && u < 1 ? 0 : s, new P(s, o, u, t.opacity);
}
function Fi(t, e, n, r) {
  return arguments.length === 1 ? Qe(t) : new P(t, e, n, r ?? 1);
}
function P(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
ie(P, Fi, Ke(ut, {
  brighter(t) {
    return t = t == null ? Nt : Math.pow(Nt, t), new P(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? at : Math.pow(at, t), new P(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new A(
      Xt(t >= 240 ? t - 240 : t + 120, i, r),
      Xt(t, i, r),
      Xt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new P(be(this.h), gt(this.s), gt(this.l), kt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = kt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${be(this.h)}, ${gt(this.s) * 100}%, ${gt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function be(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function gt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Xt(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const ae = (t) => () => t;
function Ri(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Xi(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Hi(t) {
  return (t = +t) == 1 ? Je : function(e, n) {
    return n - e ? Xi(e, n, t) : ae(isNaN(e) ? n : e);
  };
}
function Je(t, e) {
  var n = e - t;
  return n ? Ri(t, n) : ae(isNaN(t) ? e : t);
}
const Mt = function t(e) {
  var n = Hi(e);
  function r(i, a) {
    var s = n((i = Yt(i)).r, (a = Yt(a)).r), o = n(i.g, a.g), u = n(i.b, a.b), l = Je(i.opacity, a.opacity);
    return function(f) {
      return i.r = s(f), i.g = o(f), i.b = u(f), i.opacity = l(f), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Ii(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i)
      r[i] = t[i] * (1 - a) + e[i] * a;
    return r;
  };
}
function Di(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Vi(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), a = new Array(n), s;
  for (s = 0; s < r; ++s)
    i[s] = se(t[s], e[s]);
  for (; s < n; ++s)
    a[s] = e[s];
  return function(o) {
    for (s = 0; s < r; ++s)
      a[s] = i[s](o);
    return a;
  };
}
function qi(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function T(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Oi(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = se(t[i], e[i]) : r[i] = e[i];
  return function(a) {
    for (i in n)
      r[i] = n[i](a);
    return r;
  };
}
var Bt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ht = new RegExp(Bt.source, "g");
function Yi(t) {
  return function() {
    return t;
  };
}
function Bi(t) {
  return function(e) {
    return t(e) + "";
  };
}
function je(t, e) {
  var n = Bt.lastIndex = Ht.lastIndex = 0, r, i, a, s = -1, o = [], u = [];
  for (t = t + "", e = e + ""; (r = Bt.exec(t)) && (i = Ht.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (r = r[0]) === (i = i[0]) ? o[s] ? o[s] += i : o[++s] = i : (o[++s] = null, u.push({ i: s, x: T(r, i) })), n = Ht.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? u[0] ? Bi(u[0].x) : Yi(e) : (e = u.length, function(l) {
    for (var f = 0, c; f < e; ++f)
      o[(c = u[f]).i] = c.x(l);
    return o.join("");
  });
}
function se(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? ae(e) : (n === "number" ? T : n === "string" ? (r = Y(e)) ? (e = r, Mt) : je : e instanceof Y ? Mt : e instanceof Date ? qi : Di(e) ? Ii : Array.isArray(e) ? Vi : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Oi : T)(t, e);
}
function Wi(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var Se = 180 / Math.PI, Wt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function tn(t, e, n, r, i, a) {
  var s, o, u;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (u = t * n + e * r) && (n -= t * u, r -= e * u), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, u /= o), t * r < e * n && (t = -t, e = -e, u = -u, s = -s), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(e, t) * Se,
    skewX: Math.atan(u) * Se,
    scaleX: s,
    scaleY: o
  };
}
var mt;
function Gi(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Wt : tn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Ui(t) {
  return t == null || (mt || (mt = document.createElementNS("http://www.w3.org/2000/svg", "g")), mt.setAttribute("transform", t), !(t = mt.transform.baseVal.consolidate())) ? Wt : (t = t.matrix, tn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function en(t, e, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, f, c, h, d, p) {
    if (l !== c || f !== h) {
      var g = d.push("translate(", null, e, null, n);
      p.push({ i: g - 4, x: T(l, c) }, { i: g - 2, x: T(f, h) });
    } else
      (c || h) && d.push("translate(" + c + e + h + n);
  }
  function s(l, f, c, h) {
    l !== f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), h.push({ i: c.push(i(c) + "rotate(", null, r) - 2, x: T(l, f) })) : f && c.push(i(c) + "rotate(" + f + r);
  }
  function o(l, f, c, h) {
    l !== f ? h.push({ i: c.push(i(c) + "skewX(", null, r) - 2, x: T(l, f) }) : f && c.push(i(c) + "skewX(" + f + r);
  }
  function u(l, f, c, h, d, p) {
    if (l !== c || f !== h) {
      var g = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: T(l, c) }, { i: g - 2, x: T(f, h) });
    } else
      (c !== 1 || h !== 1) && d.push(i(d) + "scale(" + c + "," + h + ")");
  }
  return function(l, f) {
    var c = [], h = [];
    return l = t(l), f = t(f), a(l.translateX, l.translateY, f.translateX, f.translateY, c, h), s(l.rotate, f.rotate, c, h), o(l.skewX, f.skewX, c, h), u(l.scaleX, l.scaleY, f.scaleX, f.scaleY, c, h), l = f = null, function(d) {
      for (var p = -1, g = h.length, y; ++p < g; )
        c[(y = h[p]).i] = y.x(d);
      return c.join("");
    };
  };
}
var Zi = en(Gi, "px, ", "px)", "deg)"), Ki = en(Ui, ", ", ")", ")"), Q = 0, et = 0, j = 0, nn = 1e3, $t, nt, At = 0, B = 0, Ct = 0, ot = typeof performance == "object" && performance.now ? performance : Date, rn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function oe() {
  return B || (rn(Qi), B = ot.now() + Ct);
}
function Qi() {
  B = 0;
}
function Et() {
  this._call = this._time = this._next = null;
}
Et.prototype = an.prototype = {
  constructor: Et,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? oe() : +n) + (e == null ? 0 : +e), !this._next && nt !== this && (nt ? nt._next = this : $t = this, nt = this), this._call = t, this._time = n, Gt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Gt());
  }
};
function an(t, e, n) {
  var r = new Et();
  return r.restart(t, e, n), r;
}
function Ji() {
  oe(), ++Q;
  for (var t = $t, e; t; )
    (e = B - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Q;
}
function Ne() {
  B = (At = ot.now()) + Ct, Q = et = 0;
  try {
    Ji();
  } finally {
    Q = 0, ta(), B = 0;
  }
}
function ji() {
  var t = ot.now(), e = t - At;
  e > nn && (Ct -= e, At = t);
}
function ta() {
  for (var t, e = $t, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : $t = n);
  nt = t, Gt(r);
}
function Gt(t) {
  if (!Q) {
    et && (et = clearTimeout(et));
    var e = t - B;
    e > 24 ? (t < 1 / 0 && (et = setTimeout(Ne, t - ot.now() - Ct)), j && (j = clearInterval(j))) : (j || (At = ot.now(), j = setInterval(ji, nn)), Q = 1, rn(Ne));
  }
}
function ke(t, e, n) {
  var r = new Et();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var ea = He("start", "end", "cancel", "interrupt"), na = [], sn = 0, Me = 1, Ut = 2, wt = 3, $e = 4, Zt = 5, vt = 6;
function zt(t, e, n, r, i, a) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (n in s)
    return;
  ra(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ea,
    tween: na,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: sn
  });
}
function le(t, e) {
  var n = C(t, e);
  if (n.state > sn)
    throw new Error("too late; already scheduled");
  return n;
}
function F(t, e) {
  var n = C(t, e);
  if (n.state > wt)
    throw new Error("too late; already running");
  return n;
}
function C(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function ra(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = an(a, 0, n.time);
  function a(l) {
    n.state = Me, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var f, c, h, d;
    if (n.state !== Me)
      return u();
    for (f in r)
      if (d = r[f], d.name === n.name) {
        if (d.state === wt)
          return ke(s);
        d.state === $e ? (d.state = vt, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[f]) : +f < e && (d.state = vt, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[f]);
      }
    if (ke(function() {
      n.state === wt && (n.state = $e, n.timer.restart(o, n.delay, n.time), o(l));
    }), n.state = Ut, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Ut) {
      for (n.state = wt, i = new Array(h = n.tween.length), f = 0, c = -1; f < h; ++f)
        (d = n.tween[f].value.call(t, t.__data__, n.index, n.group)) && (i[++c] = d);
      i.length = c + 1;
    }
  }
  function o(l) {
    for (var f = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(u), n.state = Zt, 1), c = -1, h = i.length; ++c < h; )
      i[c].call(t, f);
    n.state === Zt && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = vt, n.timer.stop(), delete r[e];
    for (var l in r)
      return;
    delete t.__transition;
  }
}
function ia(t, e) {
  var n = t.__transition, r, i, a = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        a = !1;
        continue;
      }
      i = r.state > Ut && r.state < Zt, r.state = vt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function aa(t) {
  return this.each(function() {
    ia(this, t);
  });
}
function sa(t, e) {
  var n, r;
  return function() {
    var i = F(this, t), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var s = 0, o = r.length; s < o; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function oa(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var a = F(this, t), s = a.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var o = { name: e, value: n }, u = 0, l = i.length; u < l; ++u)
        if (i[u].name === e) {
          i[u] = o;
          break;
        }
      u === l && i.push(o);
    }
    a.tween = i;
  };
}
function la(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = C(this.node(), n).tween, i = 0, a = r.length, s; i < a; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? sa : oa)(n, t, e));
}
function ue(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = F(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return C(i, r).value[e];
  };
}
function on(t, e) {
  var n;
  return (typeof e == "number" ? T : e instanceof Y ? Mt : (n = Y(e)) ? (e = n, Mt) : je)(t, e);
}
function ua(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ca(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fa(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function ha(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function da(t, e, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), u;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), u = o + "", s === u ? null : s === r && u === i ? a : (i = u, a = e(r = s, o)));
  };
}
function pa(t, e, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), u;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), u = o + "", s === u ? null : s === r && u === i ? a : (i = u, a = e(r = s, o)));
  };
}
function ga(t, e) {
  var n = Pt(t), r = n === "transform" ? Ki : on;
  return this.attrTween(t, typeof e == "function" ? (n.local ? pa : da)(n, r, ue(this, "attr." + t, e)) : e == null ? (n.local ? ca : ua)(n) : (n.local ? ha : fa)(n, r, e));
}
function ma(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function ya(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function _a(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && ya(t, a)), n;
  }
  return i._value = e, i;
}
function xa(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && ma(t, a)), n;
  }
  return i._value = e, i;
}
function wa(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = Pt(t);
  return this.tween(n, (r.local ? _a : xa)(r, e));
}
function va(t, e) {
  return function() {
    le(this, t).delay = +e.apply(this, arguments);
  };
}
function ba(t, e) {
  return e = +e, function() {
    le(this, t).delay = e;
  };
}
function Sa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? va : ba)(e, t)) : C(this.node(), e).delay;
}
function Na(t, e) {
  return function() {
    F(this, t).duration = +e.apply(this, arguments);
  };
}
function ka(t, e) {
  return e = +e, function() {
    F(this, t).duration = e;
  };
}
function Ma(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Na : ka)(e, t)) : C(this.node(), e).duration;
}
function $a(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    F(this, t).ease = e;
  };
}
function Aa(t) {
  var e = this._id;
  return arguments.length ? this.each($a(e, t)) : C(this.node(), e).ease;
}
function Ea(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    F(this, t).ease = n;
  };
}
function La(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Ea(this._id, t));
}
function Ta(t) {
  typeof t != "function" && (t = De(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], u, l = 0; l < s; ++l)
      (u = a[l]) && t.call(u, u.__data__, l, a) && o.push(u);
  return new I(r, this._parents, this._name, this._id);
}
function Pa(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), s = new Array(r), o = 0; o < a; ++o)
    for (var u = e[o], l = n[o], f = u.length, c = s[o] = new Array(f), h, d = 0; d < f; ++d)
      (h = u[d] || l[d]) && (c[d] = h);
  for (; o < r; ++o)
    s[o] = e[o];
  return new I(s, this._parents, this._name, this._id);
}
function Ca(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function za(t, e, n) {
  var r, i, a = Ca(e) ? le : F;
  return function() {
    var s = a(this, t), o = s.on;
    o !== r && (i = (r = o).copy()).on(e, n), s.on = i;
  };
}
function Fa(t, e) {
  var n = this._id;
  return arguments.length < 2 ? C(this.node(), n).on.on(t) : this.each(za(n, t, e));
}
function Ra(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function Xa() {
  return this.on("end.remove", Ra(this._id));
}
function Ha(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = ne(t));
  for (var r = this._groups, i = r.length, a = new Array(i), s = 0; s < i; ++s)
    for (var o = r[s], u = o.length, l = a[s] = new Array(u), f, c, h = 0; h < u; ++h)
      (f = o[h]) && (c = t.call(f, f.__data__, h, o)) && ("__data__" in f && (c.__data__ = f.__data__), l[h] = c, zt(l[h], e, n, h, l, C(f, n)));
  return new I(a, this._parents, e, n);
}
function Ia(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ie(t));
  for (var r = this._groups, i = r.length, a = [], s = [], o = 0; o < i; ++o)
    for (var u = r[o], l = u.length, f, c = 0; c < l; ++c)
      if (f = u[c]) {
        for (var h = t.call(f, f.__data__, c, u), d, p = C(f, n), g = 0, y = h.length; g < y; ++g)
          (d = h[g]) && zt(d, e, n, g, h, p);
        a.push(h), s.push(f);
      }
  return new I(a, s, e, n);
}
var Da = lt.prototype.constructor;
function Va() {
  return new Da(this._groups, this._parents);
}
function qa(t, e) {
  var n, r, i;
  return function() {
    var a = K(this, t), s = (this.style.removeProperty(t), K(this, t));
    return a === s ? null : a === n && s === r ? i : i = e(n = a, r = s);
  };
}
function ln(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Oa(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = K(this, t);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function Ya(t, e, n) {
  var r, i, a;
  return function() {
    var s = K(this, t), o = n(this), u = o + "";
    return o == null && (u = o = (this.style.removeProperty(t), K(this, t))), s === u ? null : s === r && u === i ? a : (i = u, a = e(r = s, o));
  };
}
function Ba(t, e) {
  var n, r, i, a = "style." + e, s = "end." + a, o;
  return function() {
    var u = F(this, t), l = u.on, f = u.value[a] == null ? o || (o = ln(e)) : void 0;
    (l !== n || i !== f) && (r = (n = l).copy()).on(s, i = f), u.on = r;
  };
}
function Wa(t, e, n) {
  var r = (t += "") == "transform" ? Zi : on;
  return e == null ? this.styleTween(t, qa(t, r)).on("end.style." + t, ln(t)) : typeof e == "function" ? this.styleTween(t, Ya(t, r, ue(this, "style." + t, e))).each(Ba(this._id, t)) : this.styleTween(t, Oa(t, r, e), n).on("end.style." + t, null);
}
function Ga(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ua(t, e, n) {
  var r, i;
  function a() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Ga(t, s, n)), r;
  }
  return a._value = e, a;
}
function Za(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Ua(t, e, n ?? ""));
}
function Ka(t) {
  return function() {
    this.textContent = t;
  };
}
function Qa(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Ja(t) {
  return this.tween("text", typeof t == "function" ? Qa(ue(this, "text", t)) : Ka(t == null ? "" : t + ""));
}
function ja(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ts(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && ja(i)), e;
  }
  return r._value = t, r;
}
function es(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, ts(t));
}
function ns() {
  for (var t = this._name, e = this._id, n = un(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, u, l = 0; l < o; ++l)
      if (u = s[l]) {
        var f = C(u, e);
        zt(u, t, n, l, s, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new I(r, this._parents, t, n);
}
function rs() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, u = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var l = F(this, r), f = l.on;
      f !== t && (e = (t = f).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(u)), l.on = e;
    }), i === 0 && a();
  });
}
var is = 0;
function I(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function un() {
  return ++is;
}
var H = lt.prototype;
I.prototype = {
  constructor: I,
  select: Ha,
  selectAll: Ia,
  selectChild: H.selectChild,
  selectChildren: H.selectChildren,
  filter: Ta,
  merge: Pa,
  selection: Va,
  transition: ns,
  call: H.call,
  nodes: H.nodes,
  node: H.node,
  size: H.size,
  empty: H.empty,
  each: H.each,
  on: Fa,
  attr: ga,
  attrTween: wa,
  style: Wa,
  styleTween: Za,
  text: Ja,
  textTween: es,
  remove: Xa,
  tween: la,
  delay: Sa,
  duration: Ma,
  ease: Aa,
  easeVarying: La,
  end: rs,
  [Symbol.iterator]: H[Symbol.iterator]
};
function as(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ss = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: as
};
function os(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function ls(t) {
  var e, n;
  t instanceof I ? (e = t._id, t = t._name) : (e = un(), (n = ss).time = oe(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, u, l = 0; l < o; ++l)
      (u = s[l]) && zt(u, t, e, l, s, n || os(u, e));
  return new I(r, this._parents, t, e);
}
lt.prototype.interrupt = aa;
lt.prototype.transition = ls;
const Kt = Math.PI, Qt = 2 * Kt, V = 1e-6, us = Qt - V;
function cn(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function cs(t) {
  let e = Math.floor(t);
  if (!(e >= 0))
    throw new Error(`invalid digits: ${t}`);
  if (e > 15)
    return cn;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, a = r.length; i < a; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class fs {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? cn : cs(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, a, s) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +a},${this._y1 = +s}`;
  }
  arcTo(e, n, r, i, a) {
    if (e = +e, n = +n, r = +r, i = +i, a = +a, a < 0)
      throw new Error(`negative radius: ${a}`);
    let s = this._x1, o = this._y1, u = r - e, l = i - n, f = s - e, c = o - n, h = f * f + c * c;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (h > V)
      if (!(Math.abs(c * u - l * f) > V) || !a)
        this._append`L${this._x1 = e},${this._y1 = n}`;
      else {
        let d = r - s, p = i - o, g = u * u + l * l, y = d * d + p * p, _ = Math.sqrt(g), v = Math.sqrt(h), b = a * Math.tan((Kt - Math.acos((g + h - y) / (2 * _ * v))) / 2), w = b / v, x = b / _;
        Math.abs(w - 1) > V && this._append`L${e + w * f},${n + w * c}`, this._append`A${a},${a},0,0,${+(c * d > f * p)},${this._x1 = e + x * u},${this._y1 = n + x * l}`;
      }
  }
  arc(e, n, r, i, a, s) {
    if (e = +e, n = +n, r = +r, s = !!s, r < 0)
      throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i), u = r * Math.sin(i), l = e + o, f = n + u, c = 1 ^ s, h = s ? i - a : a - i;
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > V || Math.abs(this._y1 - f) > V) && this._append`L${l},${f}`, r && (h < 0 && (h = h % Qt + Qt), h > us ? this._append`A${r},${r},0,1,${c},${e - o},${n - u}A${r},${r},0,1,${c},${this._x1 = l},${this._y1 = f}` : h > V && this._append`A${r},${r},0,${+(h >= Kt)},${c},${this._x1 = e + r * Math.cos(a)},${this._y1 = n + r * Math.sin(a)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function hs(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Lt(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function J(t) {
  return t = Lt(Math.abs(t)), t ? t[1] : NaN;
}
function ds(t, e) {
  return function(n, r) {
    for (var i = n.length, a = [], s = 0, o = t[0], u = 0; i > 0 && o > 0 && (u + o + 1 > r && (o = Math.max(1, r - u)), a.push(n.substring(i -= o, i + o)), !((u += o + 1) > r)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function ps(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var gs = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Tt(t) {
  if (!(e = gs.exec(t)))
    throw new Error("invalid format: " + t);
  var e;
  return new ce({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
Tt.prototype = ce.prototype;
function ce(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
ce.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function ms(t) {
  t:
    for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
      switch (t[n]) {
        case ".":
          r = i = n;
          break;
        case "0":
          r === 0 && (r = n), i = n;
          break;
        default:
          if (!+t[n])
            break t;
          r > 0 && (r = 0);
          break;
      }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var fn;
function ys(t, e) {
  var n = Lt(t, e);
  if (!n)
    return t + "";
  var r = n[0], i = n[1], a = i - (fn = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return a === s ? r : a > s ? r + new Array(a - s + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + Lt(t, Math.max(0, e + a - 1))[0];
}
function Ae(t, e) {
  var n = Lt(t, e);
  if (!n)
    return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Ee = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: hs,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Ae(t * 100, e),
  r: Ae,
  s: ys,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Le(t) {
  return t;
}
var Te = Array.prototype.map, Pe = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function _s(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Le : ds(Te.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Le : ps(Te.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(c) {
    c = Tt(c);
    var h = c.fill, d = c.align, p = c.sign, g = c.symbol, y = c.zero, _ = c.width, v = c.comma, b = c.precision, w = c.trim, x = c.type;
    x === "n" ? (v = !0, x = "g") : Ee[x] || (b === void 0 && (b = 12), w = !0, x = "g"), (y || h === "0" && d === "=") && (y = !0, h = "0", d = "=");
    var L = g === "$" ? n : g === "#" && /[boxX]/.test(x) ? "0" + x.toLowerCase() : "", k = g === "$" ? r : /[%p]/.test(x) ? s : "", R = Ee[x], W = /[defgprs%]/.test(x);
    b = b === void 0 ? 6 : /[gprs]/.test(x) ? Math.max(1, Math.min(21, b)) : Math.max(0, Math.min(20, b));
    function D(m) {
      var $ = L, M = k, G, fe, ft;
      if (x === "c")
        M = R(m) + M, m = "";
      else {
        m = +m;
        var ht = m < 0 || 1 / m < 0;
        if (m = isNaN(m) ? u : R(Math.abs(m), b), w && (m = ms(m)), ht && +m == 0 && p !== "+" && (ht = !1), $ = (ht ? p === "(" ? p : o : p === "-" || p === "(" ? "" : p) + $, M = (x === "s" ? Pe[8 + fn / 3] : "") + M + (ht && p === "(" ? ")" : ""), W) {
          for (G = -1, fe = m.length; ++G < fe; )
            if (ft = m.charCodeAt(G), 48 > ft || ft > 57) {
              M = (ft === 46 ? i + m.slice(G + 1) : m.slice(G)) + M, m = m.slice(0, G);
              break;
            }
        }
      }
      v && !y && (m = e(m, 1 / 0));
      var dt = $.length + m.length + M.length, X = dt < _ ? new Array(_ - dt + 1).join(h) : "";
      switch (v && y && (m = e(X + m, X.length ? _ - M.length : 1 / 0), X = ""), d) {
        case "<":
          m = $ + m + M + X;
          break;
        case "=":
          m = $ + X + m + M;
          break;
        case "^":
          m = X.slice(0, dt = X.length >> 1) + $ + m + M + X.slice(dt);
          break;
        default:
          m = X + $ + m + M;
          break;
      }
      return a(m);
    }
    return D.toString = function() {
      return c + "";
    }, D;
  }
  function f(c, h) {
    var d = l((c = Tt(c), c.type = "f", c)), p = Math.max(-8, Math.min(8, Math.floor(J(h) / 3))) * 3, g = Math.pow(10, -p), y = Pe[8 + p / 3];
    return function(_) {
      return d(g * _) + y;
    };
  }
  return {
    format: l,
    formatPrefix: f
  };
}
var yt, hn, dn;
xs({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function xs(t) {
  return yt = _s(t), hn = yt.format, dn = yt.formatPrefix, yt;
}
function ws(t) {
  return Math.max(0, -J(Math.abs(t)));
}
function vs(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(J(e) / 3))) * 3 - J(Math.abs(t)));
}
function bs(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, J(e) - J(t)) + 1;
}
function Ss(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
function Ns(t) {
  return function() {
    return t;
  };
}
function ks(t) {
  return +t;
}
var Ce = [0, 1];
function U(t) {
  return t;
}
function Jt(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Ns(isNaN(e) ? NaN : 0.5);
}
function Ms(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function $s(t, e, n) {
  var r = t[0], i = t[1], a = e[0], s = e[1];
  return i < r ? (r = Jt(i, r), a = n(s, a)) : (r = Jt(r, i), a = n(a, s)), function(o) {
    return a(r(o));
  };
}
function As(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    i[s] = Jt(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var u = $n(t, o, 1, r) - 1;
    return a[u](i[u](o));
  };
}
function Es(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Ls() {
  var t = Ce, e = Ce, n = se, r, i, a, s = U, o, u, l;
  function f() {
    var h = Math.min(t.length, e.length);
    return s !== U && (s = Ms(t[0], t[h - 1])), o = h > 2 ? As : $s, u = l = null, c;
  }
  function c(h) {
    return h == null || isNaN(h = +h) ? a : (u || (u = o(t.map(r), e, n)))(r(s(h)));
  }
  return c.invert = function(h) {
    return s(i((l || (l = o(e, t.map(r), T)))(h)));
  }, c.domain = function(h) {
    return arguments.length ? (t = Array.from(h, ks), f()) : t.slice();
  }, c.range = function(h) {
    return arguments.length ? (e = Array.from(h), f()) : e.slice();
  }, c.rangeRound = function(h) {
    return e = Array.from(h), n = Wi, f();
  }, c.clamp = function(h) {
    return arguments.length ? (s = h ? !0 : U, f()) : s !== U;
  }, c.interpolate = function(h) {
    return arguments.length ? (n = h, f()) : n;
  }, c.unknown = function(h) {
    return arguments.length ? (a = h, c) : a;
  }, function(h, d) {
    return r = h, i = d, f();
  };
}
function Ts() {
  return Ls()(U, U);
}
function Ps(t, e, n, r) {
  var i = Pn(t, e, n), a;
  switch (r = Tt(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(a = vs(i, s)) && (r.precision = a), dn(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(a = bs(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(a = ws(i)) && (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return hn(r);
}
function Cs(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Tn(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Ps(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, a = r.length - 1, s = r[i], o = r[a], u, l, f = 10;
    for (o < s && (l = s, s = o, o = l, l = i, i = a, a = l); f-- > 0; ) {
      if (l = Dt(s, o, n), l === u)
        return r[i] = s, r[a] = o, e(r);
      if (l > 0)
        s = Math.floor(s / l) * l, o = Math.ceil(o / l) * l;
      else if (l < 0)
        s = Math.ceil(s * l) / l, o = Math.floor(o * l) / l;
      else
        break;
      u = l;
    }
    return t;
  }, t;
}
function jt() {
  var t = Ts();
  return t.copy = function() {
    return Es(t, jt());
  }, Ss.apply(t, arguments), Cs(t);
}
function N(t) {
  return function() {
    return t;
  };
}
function pn(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length)
      return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0))
        throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new fs(e);
}
function gn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function mn(t) {
  this._context = t;
}
mn.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, e);
        break;
    }
  }
};
function yn(t) {
  return new mn(t);
}
function _n(t) {
  return t[0];
}
function xn(t) {
  return t[1];
}
function te(t, e) {
  var n = N(!0), r = null, i = yn, a = null, s = pn(o);
  t = typeof t == "function" ? t : t === void 0 ? _n : N(t), e = typeof e == "function" ? e : e === void 0 ? xn : N(e);
  function o(u) {
    var l, f = (u = gn(u)).length, c, h = !1, d;
    for (r == null && (a = i(d = s())), l = 0; l <= f; ++l)
      !(l < f && n(c = u[l], l, u)) === h && ((h = !h) ? a.lineStart() : a.lineEnd()), h && a.point(+t(c, l, u), +e(c, l, u));
    if (d)
      return a = null, d + "" || null;
  }
  return o.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : N(+u), o) : t;
  }, o.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : N(+u), o) : e;
  }, o.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : N(!!u), o) : n;
  }, o.curve = function(u) {
    return arguments.length ? (i = u, r != null && (a = i(r)), o) : i;
  }, o.context = function(u) {
    return arguments.length ? (u == null ? r = a = null : a = i(r = u), o) : r;
  }, o;
}
function ze(t, e, n) {
  var r = null, i = N(!0), a = null, s = yn, o = null, u = pn(l);
  t = typeof t == "function" ? t : t === void 0 ? _n : N(+t), e = typeof e == "function" ? e : N(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? xn : N(+n);
  function l(c) {
    var h, d, p, g = (c = gn(c)).length, y, _ = !1, v, b = new Array(g), w = new Array(g);
    for (a == null && (o = s(v = u())), h = 0; h <= g; ++h) {
      if (!(h < g && i(y = c[h], h, c)) === _)
        if (_ = !_)
          d = h, o.areaStart(), o.lineStart();
        else {
          for (o.lineEnd(), o.lineStart(), p = h - 1; p >= d; --p)
            o.point(b[p], w[p]);
          o.lineEnd(), o.areaEnd();
        }
      _ && (b[h] = +t(y, h, c), w[h] = +e(y, h, c), o.point(r ? +r(y, h, c) : b[h], n ? +n(y, h, c) : w[h]));
    }
    if (v)
      return o = null, v + "" || null;
  }
  function f() {
    return te().defined(i).curve(s).context(a);
  }
  return l.x = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : N(+c), r = null, l) : t;
  }, l.x0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : N(+c), l) : t;
  }, l.x1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : N(+c), l) : r;
  }, l.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : N(+c), n = null, l) : e;
  }, l.y0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : N(+c), l) : e;
  }, l.y1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : N(+c), l) : n;
  }, l.lineX0 = l.lineY0 = function() {
    return f().x(t).y(e);
  }, l.lineY1 = function() {
    return f().x(t).y(n);
  }, l.lineX1 = function() {
    return f().x(r).y(e);
  }, l.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : N(!!c), l) : i;
  }, l.curve = function(c) {
    return arguments.length ? (s = c, a != null && (o = s(a)), l) : s;
  }, l.context = function(c) {
    return arguments.length ? (c == null ? a = o = null : o = s(a = c), l) : a;
  }, l;
}
class zs {
  constructor(e, n) {
    this._context = e, this._x = n;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(e, n) {
    switch (e = +e, n = +n, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(e, n) : this._context.moveTo(e, n);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, n, e, n) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + n) / 2, e, this._y0, e, n);
        break;
      }
    }
    this._x0 = e, this._y0 = n;
  }
}
function Fe(t) {
  return new zs(t, !0);
}
function rt(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
rt.prototype = {
  constructor: rt,
  scale: function(t) {
    return t === 1 ? this : new rt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new rt(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
rt.prototype;
class ct {
  constructor(e, n) {
    S(this, "root");
    S(this, "chartState");
    S(this, "data");
    this.root = it("svg:g"), this.chartState = n, this.data = e;
  }
  getNode() {
    return this.root.node();
  }
  destroy() {
  }
  // @ts-ignore
  redraw(e) {
  }
}
class Fs extends ct {
  constructor(e, n) {
    super(e, n), this.setScale(), this.setStyles();
  }
  setScale() {
    const { yMax: e, tickDividedBy: n, sizes: r, yScale: i } = this.chartState, a = new Array(e / n + 1 || 0).fill(0).map((s, o) => o * n);
    this.root.style(
      "transform",
      `translate(${r.width + r.left}px, ${r.top}px)`
    ).call(Dn(i).tickValues(a).tickSize(r.width));
  }
  setStyles() {
    this.root.attr("class", "left-axis");
  }
  redraw(e) {
    this.data = e, this.setScale();
  }
}
class Rs extends ct {
  constructor(e, n) {
    super(e, n), this.setScale(), this.setStyles();
  }
  setScale() {
    const e = this.root, { sizes: n, xScale: r, yScale: i } = this.chartState;
    e.style(
      "transform",
      `translate(${n.left}px,${i(0) + n.top}px)`
    ).call(
      In(r).ticks(this.data.length).tickValues(this.chartState.parseXField(this.data)).tickFormat((a, s) => this.chartState.parseXVisible(this.data[s]))
    ), e.selectAll(".tick line").attr("style", `transform: translateY(${-i(0)}px)`).attr("stroke", "#E1E1E1").attr("stroke-dasharray", "2,2").attr("y2", i(0)), e.select(".domain").remove();
  }
  setStyles() {
    this.root.classed("bottom-axis", !0).selectAll("text");
  }
  redraw(e) {
    this.data = e, this.setScale();
  }
}
class Xs extends ct {
  constructor(n, r, i) {
    super(n, r);
    S(this, "dataLineField");
    S(this, "lineNode");
    S(this, "areaNode");
    S(this, "line", te());
    S(this, "area", ze());
    this.dataLineField = i, this.lineNode = this.root.append("path"), this.areaNode = this.root.append("path"), this.setStyles(), this.setScale();
  }
  setScale() {
    const { sizes: n, xScale: r, yScale: i } = this.chartState;
    this.line = te().curve(Fe).x((a) => r(this.chartState.parseXField(a))).y((a) => i(a[this.dataLineField])), this.area = ze().curve(Fe).x((a) => r(this.chartState.parseXField(a))).y1((a) => i(a[this.dataLineField])), this.area.y0(n.height), this.areaNode.attr("d", this.area(this.data)), this.lineNode.datum(this.data).attr("d", this.line);
  }
  setStyles() {
    const n = this.chartState.dataLines.find(
      (a) => a.field === this.dataLineField
    );
    if (!n)
      return;
    const { defsNode: r } = this.chartState, i = r.append("linearGradient").attr("id", "g-" + n.field).attr("gradientTransform", "rotate(90)");
    i.append("stop").attr("offset", "0%").attr("stop-color", n.color).attr("stop-opacity", "0.15"), i.append("stop").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", "0.15"), this.areaNode.attr("fill", `url(#g-${n.field})`), this.lineNode.attr("stroke", n.color).attr("stroke-width", "2px").attr("fill", "none");
  }
  redraw(n) {
    this.data = n, this.setScale();
  }
}
class Hs extends ct {
  constructor(n, r) {
    super(n, r);
    S(this, "tooltipHeight");
    S(this, "tooltip");
    S(this, "tooltipTitle");
    S(this, "circles");
    S(this, "tooltipWidth", 171);
    S(this, "tooltipLabelNode");
    S(this, "tooltipLabelPos");
    S(this, "tooltipLabelPosInitial");
    S(this, "tooltipLabelPosY");
    S(this, "tooltipLabelPosX");
    S(this, "delta", 0);
    this.tooltipHeight = 52 + r.dataLines.length * 20 + r.dataLines.length * (4 - 1) + 16;
    const i = 14, a = this.tooltipHeight, { dataLines: s } = this.chartState, o = s.map((c) => {
      const h = this.root.append("svg:circle");
      return h.style("display", "none").attr("r", 6).attr("fill", c.color).attr("stroke", "#fff").attr("stroke-width", 2), h;
    }), u = this.root.append("svg:g");
    u.style("opacity", "0").attr("pointer-events", "none").style("letter-spacing", "0.07px").style("font-weight", "500").style("font-size", "14px").style("fill", "#fff");
    const l = u.append("svg:g");
    l.attr("fill", "#454142").attr("opacity", 0.92), l.append("rect").attr("rx", 6).attr("x", 0).attr("y", 0).attr("width", 203).attr("height", a), this.tooltipLabelPosY = a - 3, this.tooltipLabelPosX = 90, this.tooltipLabelPosInitial = `translate(${this.tooltipLabelPosX},${this.tooltipLabelPosY})`, this.tooltipLabelPos = this.tooltipLabelPosInitial, this.tooltipLabelNode = l.append("path").attr(
      "d",
      "M9.46326 13.3346C10.2583 14.223 11.649 14.223 12.444 13.3346L21.3937 3.33372C22.5466 2.0454 21.6322 0 19.9033 0H2.00392C0.275054 0 -0.639356 2.0454 0.513553 3.33372L9.46326 13.3346Z"
    ).attr("transform", this.tooltipLabelPos);
    const f = u.append("text");
    f.attr("x", 102).attr("y", i + 16).style("text-anchor", "middle"), u.append("rect").attr("x", 16).attr("y", 44).attr("fill", "rgba(255,255,255,0.3)").attr("height", 1).attr("width", this.tooltipWidth), s.forEach((c, h) => {
      const d = u.append("svg:g");
      d.attr("transform", `translate(16,${i + 54 + 26 * h})`), d.append("text").text(c.name), c.textVar = d.append("svg:text"), c.textVar.style("text-anchor", "end").attr("x", 171);
    }), this.tooltip = u, this.tooltipTitle = f, this.circles = o, this.initEvent();
  }
  updateDelta() {
    const [n = 0, r = 0] = It(
      this.data,
      this.chartState.parseXField
    );
    this.delta = r - n;
  }
  initEvent() {
    const i = {
      x: 101,
      y: this.tooltipHeight + 11 + 16
      // родной размер, 11  и 16 отступ для точки
    }, { yScale: a, xScale: s, dataWrapperNode: o, svgNode: u, dataLines: l } = this.chartState;
    o.on("mouseenter", () => {
      this.updateDelta(), this.tooltip.transition().duration(250).style("opacity", 1), this.circles.forEach((c) => {
        c.style("display", "block");
      });
    });
    let f = null;
    o.on("mousemove", (c) => {
      const h = this.chartState.sizes, [d] = Si(c), p = Math.round(d / h.width * this.delta), g = this.data[p], y = s(this.chartState.parseXField(g));
      let _ = y;
      const v = l.map((k) => a(g[k.field]));
      l.forEach((k, R) => {
        this.circles[R].attr("cx", _).attr("cy", v[R]);
      }), _ -= i.x;
      const b = this.tooltipLabelPos;
      let w = "", x = this.tooltipLabelPosX;
      _ <= 0 ? (_ = -20, x = y - _ - 11, w = `translate(${x},${this.tooltipLabelPosY})`) : _ >= this.chartState.sizes.width - this.tooltipWidth ? (_ = this.chartState.sizes.width - this.tooltipWidth - 10, x = y - _ - 11, w = `translate(${x},${this.tooltipLabelPosY})`) : w != this.tooltipLabelPosInitial && (x = this.tooltipLabelPosX, w = this.tooltipLabelPosInitial);
      let L = v[0] - i.y;
      L <= 0 && (L = v[0] + 16 + 11, w = `translate(${x + 22},3)rotate(180)`), w != b && (this.tooltipLabelPos = w, this.tooltipLabelNode.attr("transform", w)), this.tooltip.attr("transform", `translate(${_},${L})`), f && f.i !== p && (f.yTick.classed("selected", !1), f = null), f || (f = {
        yTick: u.select(`.bottom-axis .tick:nth-child(${p + 1})`),
        i: p
      }, f.yTick.classed("selected", !0)), this.tooltipTitle.text(this.chartState.parseXVisible(g)), l.forEach((k) => {
        k.textVar.selection().text(g[k.field]);
      });
    }), o.on("mouseleave", () => {
      this.tooltip.transition().duration(250).style("opacity", "0"), this.circles.forEach((c) => {
        c.style("display", "none");
      }), f && (f.yTick.classed("selected", !1), f = null);
    });
  }
  redraw(n) {
    this.data = n, this.updateDelta();
  }
}
class Is extends ct {
  constructor(n, r) {
    super(n, r);
    S(this, "totalElements");
    this.root = it("div"), this.root.classed("c-chart-info", !0);
    const i = this.root.append("div").classed("c-chart-info__wrap c-chart-info__wrap--small-size", !0), a = this.root.append("div").classed("c-chart-info__wrap c-chart-info__wrap--end-pos", !0);
    this.totalElements = [], this.data = n, i.selectAll("div").data(r.dataLines).enter().insert((s) => this.createLegend(s)), a.selectAll("div").data(r.dataLines).enter().insert((s) => {
      const { node: o, valueNode: u } = this.createTotal(s);
      return this.totalElements.push({
        node: u,
        field: s.field
      }), o;
    }), this.root.style("padding-left", r.sizes.left + "px").style("padding-right", r.sizes.right + "px");
  }
  redraw(n) {
    this.data = n, this.totalElements.forEach(({ node: r, field: i }) => {
      r.text(this.getMax(n, i));
    });
  }
  destroy() {
    var n;
    (n = this.getNode()) == null || n.remove();
  }
  getMax(n, r) {
    return n.reduce((i, a) => i + a[r], 0);
  }
  createLegend(n) {
    const r = it("div");
    return r.classed("c-legend", !0), r.append("div").classed("c-legend__color", !0).style("background-color", n.color), r.append("p").classed("c-legend__name", !0).text(n.name), r.node();
  }
  createTotal(n) {
    const r = this.data, i = it("div");
    i.classed("c-total", !0), i.append("p").classed("c-total__name", !0).text(n.name);
    const a = this.getMax(r, n.field), s = i.append("p");
    return s.classed("c-total__value", !0).text(a), {
      node: i.node(),
      valueNode: s
    };
  }
}
class Vs {
  constructor(e, n) {
    S(this, "chartState");
    S(this, "data");
    S(this, "dataPaths");
    S(this, "elements");
    S(this, "chartNode");
    const r = Ot(n.element);
    this.chartNode = r.node();
    const i = r.append("svg"), a = this.calculateSizes(this.chartNode);
    i.attr("width", a.totalWidth + "px"), i.attr("height", a.totalHeight + "px"), this.data = e;
    const { yMax: s, tickDividedBy: o } = this.calculateMax(n.dataLines), u = it("svg:g").style("transform", `translate(${a.left}px,${a.top}px)`), l = jt([0, s], [a.height, 0]), [f = 0, c = 0] = It(
      e,
      n.xAxis.getData
    ), h = jt([f, c], [0, a.width]), d = i.append("defs"), p = {
      sizes: a,
      yMax: s,
      tickDividedBy: o,
      dataLines: n.dataLines,
      dataWrapperNode: u,
      svgNode: i,
      defsNode: d,
      yScale: l,
      xScale: h,
      parseXVisible: n.xAxis.getVisible,
      parseXField: n.xAxis.getData
    };
    this.chartState = p;
    const g = new Rs(e, p), y = new Hs(e, p), _ = new Is(e, p), v = new Fs(e, p);
    u.append("rect").attr("class", "sizes-rect").attr("width", a.width).attr("height", a.height).attr("fill", "transparent"), this.dataPaths = [], n.dataLines.forEach((b) => {
      const w = new Xs(e, p, b.field);
      this.dataPaths.push(w), this.appendSingle(u, () => w.getNode());
    }), this.appendSingle(r, () => _.getNode(), !0), this.appendSingle(i, () => v.getNode()), this.appendSingle(i, () => g.getNode()), this.appendSingle(i, () => u.node()), this.appendSingle(u, () => y.getNode()), this.elements = [_, v, g, y], this.resize = this.resize.bind(this), window.addEventListener("resize", this.resize);
  }
  calculateSizes(e) {
    const n = {
      top: 22,
      left: 86,
      right: 34,
      bottom: 94,
      width: 0,
      height: 389,
      totalWidth: e.clientWidth,
      totalHeight: 0
    };
    return n.width = n.totalWidth - n.left - n.right, n.totalHeight = n.height + n.top + n.bottom, n;
  }
  appendSingle(e, n, r) {
    e.node()[r ? "prepend" : "append"](n());
  }
  redraw(e) {
    this.data = e;
    const { yMax: n, tickDividedBy: r } = this.calculateMax(
      this.chartState.dataLines
    );
    this.chartState.yMax = n, this.chartState.tickDividedBy = r, this.chartState.yScale.domain([0, this.chartState.yMax]);
    const [i = 0, a = 0] = It(
      e,
      this.chartState.parseXField
    );
    this.chartState.xScale.domain([i, a]), this.elements.forEach((s) => s.redraw(e)), this.dataPaths.forEach((s) => s.redraw(e));
  }
  resize() {
    const e = this.calculateSizes(this.chartNode);
    this.chartState.sizes = e, Ot(this.chartNode).select(".sizes-rect").attr("width", e.width).attr("height", e.height), this.chartState.svgNode.attr("width", e.totalWidth + "px"), this.chartState.svgNode.attr("height", e.totalHeight + "px"), this.chartState.yScale.range([e.height, 0]), this.chartState.xScale.range([0, e.width]), this.redraw(this.data);
  }
  calculateMax(e) {
    let n = 0, r = 0;
    this.data.forEach((a) => {
      n = Math.max(n, ...e.map((s) => a[s.field]));
    });
    let i = 50;
    return n < 50 && (i = 10), r = Math.ceil(n / 500) * i || 10, n = Math.ceil(Math.round(n + n * 0.1) / r) * r || 50, {
      yMax: n,
      tickDividedBy: r
    };
  }
  destroy() {
    this.chartState.svgNode.remove(), this.elements.forEach((e) => e.destroy()), this.dataPaths.forEach((e) => e.destroy()), this.chartNode = null, this.chartState = null, this.elements = null, this.dataPaths = null, this.data = null, window.removeEventListener("resize", this.resize);
  }
}
export {
  Vs as Chart
};
