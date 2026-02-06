const Xl = (n, e, t) => {
  const i = n[e];
  return i ? typeof i == "function" ? i() : Promise.resolve(i) : new Promise((s, r) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
      r.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + e + (e.split("/").length !== t ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
let Qr = [], dc = [];
(() => {
  let n = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < n.length; e++)
    (e % 2 ? dc : Qr).push(t = t + n[e]);
})();
function Md(n) {
  if (n < 768) return !1;
  for (let e = 0, t = Qr.length; ; ) {
    let i = e + t >> 1;
    if (n < Qr[i]) t = i;
    else if (n >= dc[i]) e = i + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function Yl(n) {
  return n >= 127462 && n <= 127487;
}
const Ql = 8205;
function Pd(n, e, t = !0, i = !0) {
  return (t ? pc : Bd)(n, e, i);
}
function pc(n, e, t) {
  if (e == n.length) return e;
  e && mc(n.charCodeAt(e)) && gc(n.charCodeAt(e - 1)) && e--;
  let i = br(n, e);
  for (e += Zl(i); e < n.length; ) {
    let s = br(n, e);
    if (i == Ql || s == Ql || t && Md(s))
      e += Zl(s), i = s;
    else if (Yl(s)) {
      let r = 0, o = e - 2;
      for (; o >= 0 && Yl(br(n, o)); )
        r++, o -= 2;
      if (r % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function Bd(n, e, t) {
  for (; e > 0; ) {
    let i = pc(n, e - 2, t);
    if (i < e) return i;
    e--;
  }
  return 0;
}
function br(n, e) {
  let t = n.charCodeAt(e);
  if (!gc(t) || e + 1 == n.length) return t;
  let i = n.charCodeAt(e + 1);
  return mc(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function mc(n) {
  return n >= 56320 && n < 57344;
}
function gc(n) {
  return n >= 55296 && n < 56320;
}
function Zl(n) {
  return n < 65536 ? 1 : 2;
}
class V {
  /**
  Get the line description around the given position.
  */
  lineAt(e) {
    if (e < 0 || e > this.length)
      throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
    return this.lineInner(e, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(e) {
    if (e < 1 || e > this.lines)
      throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
    return this.lineInner(e, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(e, t, i) {
    [e, t] = Ri(this, e, t);
    let s = [];
    return this.decompose(
      0,
      e,
      s,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      s,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      s,
      1
      /* Open.From */
    ), kt.from(s, this.length - (t - e) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(e) {
    return this.replace(this.length, this.length, e);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(e, t = this.length) {
    [e, t] = Ri(this, e, t);
    let i = [];
    return this.decompose(e, t, i, 0), kt.from(i, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), s = new tn(this), r = new tn(e);
    for (let o = t, l = t; ; ) {
      if (s.next(o), r.next(o), o = 0, s.lineBreak != r.lineBreak || s.done != r.done || s.value != r.value)
        return !1;
      if (l += s.value.length, s.done || l >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new tn(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new yc(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let i;
    if (e == null)
      i = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let s = this.line(e).from;
      i = this.iterRange(s, Math.max(s, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new bc(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? V.empty : e.length <= 32 ? new oe(e) : kt.from(oe.split(e, []));
  }
}
class oe extends V {
  constructor(e, t = Nd(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, i, s) {
    for (let r = 0; ; r++) {
      let o = this.text[r], l = s + o.length;
      if ((t ? i : l) >= e)
        return new Id(s, l, i, o);
      s = l + 1, i++;
    }
  }
  decompose(e, t, i, s) {
    let r = e <= 0 && t >= this.length ? this : new oe(ea(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (s & 1) {
      let o = i.pop(), l = rs(r.text, o.text.slice(), 0, r.length);
      if (l.length <= 32)
        i.push(new oe(l, o.length + r.length));
      else {
        let a = l.length >> 1;
        i.push(new oe(l.slice(0, a)), new oe(l.slice(a)));
      }
    } else
      i.push(r);
  }
  replace(e, t, i) {
    if (!(i instanceof oe))
      return super.replace(e, t, i);
    [e, t] = Ri(this, e, t);
    let s = rs(this.text, rs(i.text, ea(this.text, 0, e)), t), r = this.length + i.length - (t - e);
    return s.length <= 32 ? new oe(s, r) : kt.from(oe.split(s, []), r);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = Ri(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r <= t && o < this.text.length; o++) {
      let l = this.text[o], a = r + l.length;
      r > e && o && (s += i), e < a && t > r && (s += l.slice(Math.max(0, e - r), t - r)), r = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let i = [], s = -1;
    for (let r of e)
      i.push(r), s += r.length + 1, i.length == 32 && (t.push(new oe(i, s)), i = [], s = -1);
    return s > -1 && t.push(new oe(i, s)), t;
  }
}
class kt extends V {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let i of e)
      this.lines += i.lines;
  }
  lineInner(e, t, i, s) {
    for (let r = 0; ; r++) {
      let o = this.children[r], l = s + o.length, a = i + o.lines - 1;
      if ((t ? a : l) >= e)
        return o.lineInner(e, t, i, s);
      s = l + 1, i = a + 1;
    }
  }
  decompose(e, t, i, s) {
    for (let r = 0, o = 0; o <= t && r < this.children.length; r++) {
      let l = this.children[r], a = o + l.length;
      if (e <= a && t >= o) {
        let h = s & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
        o >= e && a <= t && !h ? i.push(l) : l.decompose(e - o, t - o, i, h);
      }
      o = a + 1;
    }
  }
  replace(e, t, i) {
    if ([e, t] = Ri(this, e, t), i.lines < this.lines)
      for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], l = r + o.length;
        if (e >= r && t <= l) {
          let a = o.replace(e - r, t - r, i), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let c = this.children.slice();
            return c[s] = a, new kt(c, this.length - (t - e) + i.length);
          }
          return super.replace(r, l, a);
        }
        r = l + 1;
      }
    return super.replace(e, t, i);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = Ri(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r < this.children.length && o <= t; r++) {
      let l = this.children[r], a = o + l.length;
      o > e && r && (s += i), e < a && t > o && (s += l.sliceString(e - o, t - o, i)), o = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof kt))
      return 0;
    let i = 0, [s, r, o, l] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; s += t, r += t) {
      if (s == o || r == l)
        return i;
      let a = this.children[s], h = e.children[r];
      if (a != h)
        return i + a.scanIdentical(h, t);
      i += a.length + 1;
    }
  }
  static from(e, t = e.reduce((i, s) => i + s.length + 1, -1)) {
    let i = 0;
    for (let d of e)
      i += d.lines;
    if (i < 32) {
      let d = [];
      for (let p of e)
        p.flatten(d);
      return new oe(d, t);
    }
    let s = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), r = s << 1, o = s >> 1, l = [], a = 0, h = -1, c = [];
    function f(d) {
      let p;
      if (d.lines > r && d instanceof kt)
        for (let m of d.children)
          f(m);
      else d.lines > o && (a > o || !a) ? (u(), l.push(d)) : d instanceof oe && a && (p = c[c.length - 1]) instanceof oe && d.lines + p.lines <= 32 ? (a += d.lines, h += d.length + 1, c[c.length - 1] = new oe(p.text.concat(d.text), p.length + 1 + d.length)) : (a + d.lines > s && u(), a += d.lines, h += d.length + 1, c.push(d));
    }
    function u() {
      a != 0 && (l.push(c.length == 1 ? c[0] : kt.from(c, h)), h = -1, a = c.length = 0);
    }
    for (let d of e)
      f(d);
    return u(), l.length == 1 ? l[0] : new kt(l, t);
  }
}
V.empty = /* @__PURE__ */ new oe([""], 0);
function Nd(n) {
  let e = -1;
  for (let t of n)
    e += t.length + 1;
  return e;
}
function rs(n, e, t = 0, i = 1e9) {
  for (let s = 0, r = 0, o = !0; r < n.length && s <= i; r++) {
    let l = n[r], a = s + l.length;
    a >= t && (a > i && (l = l.slice(0, i - s)), s < t && (l = l.slice(t - s)), o ? (e[e.length - 1] += l, o = !1) : e.push(l)), s = a + 1;
  }
  return e;
}
function ea(n, e, t) {
  return rs(n, [""], e, t);
}
class tn {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof oe ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, s = this.nodes[i], r = this.offsets[i], o = r >> 1, l = s instanceof oe ? s.text.length : s.children.length;
      if (o == (t > 0 ? l : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[i] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (s instanceof oe) {
        let a = s.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[i] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = s.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof oe ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class yc {
  constructor(e, t, i) {
    this.value = "", this.done = !1, this.cursor = new tn(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let i = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > i && (e = i), i -= e;
    let { value: s } = this.cursor.next(e);
    return this.pos += (s.length + e) * t, this.value = s.length <= i ? s : t < 0 ? s.slice(s.length - i) : s.slice(0, i), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class bc {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: i, value: s } = this.inner.next(e);
    return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = s, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (V.prototype[Symbol.iterator] = function() {
  return this.iter();
}, tn.prototype[Symbol.iterator] = yc.prototype[Symbol.iterator] = bc.prototype[Symbol.iterator] = function() {
  return this;
});
class Id {
  /**
  @internal
  */
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.number = i, this.text = s;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function Ri(n, e, t) {
  return e = Math.max(0, Math.min(n.length, e)), [e, Math.max(e, Math.min(n.length, t))];
}
function ve(n, e, t = !0, i = !0) {
  return Pd(n, e, t, i);
}
function Ld(n) {
  return n >= 56320 && n < 57344;
}
function $d(n) {
  return n >= 55296 && n < 56320;
}
function Ke(n, e) {
  let t = n.charCodeAt(e);
  if (!$d(t) || e + 1 == n.length)
    return t;
  let i = n.charCodeAt(e + 1);
  return Ld(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function kc(n) {
  return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
}
function At(n) {
  return n < 65536 ? 1 : 2;
}
const Zr = /\r\n?|\n/;
var Ne = /* @__PURE__ */ function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
}(Ne || (Ne = {}));
class St {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(e) {
    this.sections = e;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2)
      e += this.sections[t];
    return e;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t + 1];
      e += i < 0 ? this.sections[t] : i;
    }
    return e;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(e) {
    for (let t = 0, i = 0, s = 0; t < this.sections.length; ) {
      let r = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(i, s, r), s += r) : s += o, i += r;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    eo(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], s = this.sections[t++];
      s < 0 ? e.push(i, s) : e.push(s, i);
    }
    return new St(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : xc(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : to(this, e, t);
  }
  mapPos(e, t = -1, i = Ne.Simple) {
    let s = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], h = s + l;
      if (a < 0) {
        if (h > e)
          return r + (e - s);
        r += l;
      } else {
        if (i != Ne.Simple && h >= e && (i == Ne.TrackDel && s < e && h > e || i == Ne.TrackBefore && s < e || i == Ne.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !l)
          return e == s || t < 0 ? r : r + a;
        r += a;
      }
      s = h;
    }
    if (e > s)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);
    return r;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let i = 0, s = 0; i < this.sections.length && s <= t; ) {
      let r = this.sections[i++], o = this.sections[i++], l = s + r;
      if (o >= 0 && s <= t && l >= e)
        return s < e && l > t ? "cover" : !0;
      s = l;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], s = this.sections[t++];
      e += (e ? " " : "") + i + (s >= 0 ? ":" + s : "");
    }
    return e;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new St(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new St(e);
  }
}
class ue extends St {
  constructor(e, t) {
    super(e), this.inserted = t;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(e) {
    if (this.length != e.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return eo(this, (t, i, s, r, o) => e = e.replace(s, s + (i - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return to(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), i = [];
    for (let s = 0, r = 0; s < t.length; s += 2) {
      let o = t[s], l = t[s + 1];
      if (l >= 0) {
        t[s] = l, t[s + 1] = o;
        let a = s >> 1;
        for (; i.length < a; )
          i.push(V.empty);
        i.push(o ? e.slice(r, r + o) : V.empty);
      }
      r += o;
    }
    return new ue(t, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : xc(this, e, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(e, t = !1) {
    return e.empty ? this : to(this, e, t, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(e, t = !1) {
    eo(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return St.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], i = [], s = [], r = new dn(this);
    e: for (let o = 0, l = 0; ; ) {
      let a = o == e.length ? 1e9 : e[o++];
      for (; l < a || l == a && r.len == 0; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, a - l);
        Ae(s, c, -1);
        let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        Ae(t, c, f), f > 0 && Nt(i, t, r.text), r.forward(c), l += c;
      }
      let h = e[o++];
      for (; l < h; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, h - l);
        Ae(t, c, -1), Ae(s, c, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(c), l += c;
      }
    }
    return {
      changes: new ue(t, i),
      filtered: St.create(s)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t], s = this.sections[t + 1];
      s < 0 ? e.push(i) : s == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, i) {
    let s = [], r = [], o = 0, l = null;
    function a(c = !1) {
      if (!c && !s.length)
        return;
      o < t && Ae(s, t - o, -1);
      let f = new ue(s, r);
      l = l ? l.compose(f.map(l)) : f, s = [], r = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof ue) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        a(), l = l ? l.compose(c.map(l)) : c;
      } else {
        let { from: f, to: u = f, insert: d } = c;
        if (f > u || f < 0 || u > t)
          throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);
        let p = d ? typeof d == "string" ? V.of(d.split(i || Zr)) : d : V.empty, m = p.length;
        if (f == u && m == 0)
          return;
        f < o && a(), f > o && Ae(s, f - o, -1), Ae(s, u - f, m), Nt(r, s, p), o = u;
      }
    }
    return h(e), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new ue(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], i = [];
    for (let s = 0; s < e.length; s++) {
      let r = e[s];
      if (typeof r == "number")
        t.push(r, -1);
      else {
        if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, l) => l && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (r.length == 1)
          t.push(r[0], 0);
        else {
          for (; i.length < s; )
            i.push(V.empty);
          i[s] = V.of(r.slice(1)), t.push(r[0], i[s].length);
        }
      }
    }
    return new ue(t, i);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new ue(e, t);
  }
}
function Ae(n, e, t, i = !1) {
  if (e == 0 && t <= 0)
    return;
  let s = n.length - 2;
  s >= 0 && t <= 0 && t == n[s + 1] ? n[s] += e : s >= 0 && e == 0 && n[s] == 0 ? n[s + 1] += t : i ? (n[s] += e, n[s + 1] += t) : n.push(e, t);
}
function Nt(n, e, t) {
  if (t.length == 0)
    return;
  let i = e.length - 2 >> 1;
  if (i < n.length)
    n[n.length - 1] = n[n.length - 1].append(t);
  else {
    for (; n.length < i; )
      n.push(V.empty);
    n.push(t);
  }
}
function eo(n, e, t) {
  let i = n.inserted;
  for (let s = 0, r = 0, o = 0; o < n.sections.length; ) {
    let l = n.sections[o++], a = n.sections[o++];
    if (a < 0)
      s += l, r += l;
    else {
      let h = s, c = r, f = V.empty;
      for (; h += l, c += a, a && i && (f = f.append(i[o - 2 >> 1])), !(t || o == n.sections.length || n.sections[o + 1] < 0); )
        l = n.sections[o++], a = n.sections[o++];
      e(s, h, r, c, f), s = h, r = c;
    }
  }
}
function to(n, e, t, i = !1) {
  let s = [], r = i ? [] : null, o = new dn(n), l = new dn(e);
  for (let a = -1; ; ) {
    if (o.done && l.len || l.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && l.ins == -1) {
      let h = Math.min(o.len, l.len);
      Ae(s, h, -1), o.forward(h), l.forward(h);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
      let h = l.len;
      for (Ae(s, l.ins, -1); h; ) {
        let c = Math.min(o.len, h);
        o.ins >= 0 && a < o.i && o.len <= c && (Ae(s, 0, o.ins), r && Nt(r, s, o.text), a = o.i), o.forward(c), h -= c;
      }
      l.next();
    } else if (o.ins >= 0) {
      let h = 0, c = o.len;
      for (; c; )
        if (l.ins == -1) {
          let f = Math.min(c, l.len);
          h += f, c -= f, l.forward(f);
        } else if (l.ins == 0 && l.len < c)
          c -= l.len, l.next();
        else
          break;
      Ae(s, h, a < o.i ? o.ins : 0), r && a < o.i && Nt(r, s, o.text), a = o.i, o.forward(o.len - c);
    } else {
      if (o.done && l.done)
        return r ? ue.createSet(s, r) : St.create(s);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function xc(n, e, t = !1) {
  let i = [], s = t ? [] : null, r = new dn(n), o = new dn(e);
  for (let l = !1; ; ) {
    if (r.done && o.done)
      return s ? ue.createSet(i, s) : St.create(i);
    if (r.ins == 0)
      Ae(i, r.len, 0, l), r.next();
    else if (o.len == 0 && !o.done)
      Ae(i, 0, o.ins, l), s && Nt(s, i, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(r.len2, o.len), h = i.length;
        if (r.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          Ae(i, a, c, l), s && c && Nt(s, i, o.text);
        } else o.ins == -1 ? (Ae(i, r.off ? 0 : r.len, a, l), s && Nt(s, i, r.textBit(a))) : (Ae(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), s && !o.off && Nt(s, i, o.text));
        l = (r.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > h), r.forward2(a), o.forward(a);
      }
    }
  }
}
class dn {
  constructor(e) {
    this.set = e, this.i = 0, this.next();
  }
  next() {
    let { sections: e } = this.set;
    this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: e } = this.set, t = this.i - 2 >> 1;
    return t >= e.length ? V.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, i = this.i - 2 >> 1;
    return i >= t.length && !e ? V.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class ni {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.flags = i;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let e = this.flags & 7;
    return e == 7 ? null : e;
  }
  /**
  The goal column (stored vertical offset) associated with a
  cursor. This is used to preserve the vertical position when
  [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
  lines of different length.
  */
  get goalColumn() {
    let e = this.flags >> 6;
    return e == 16777215 ? void 0 : e;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(e, t = -1) {
    let i, s;
    return this.empty ? i = s = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), s = e.mapPos(this.to, -1)), i == this.from && s == this.to ? this : new ni(i, s, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e) {
    if (e <= this.anchor && t >= this.anchor)
      return S.range(e, t);
    let i = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return S.range(this.anchor, i);
  }
  /**
  Compare this range to another range.
  */
  eq(e, t = !1) {
    return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(e) {
    if (!e || typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return S.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new ni(e, t, i);
  }
}
class S {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : S.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(e, t = !1) {
    if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(e.ranges[i], t))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new S([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return S.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let i = this.ranges.slice();
    return i[t] = e, S.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(e) {
    if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new S(e.ranges.map((t) => ni.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new S([S.range(e, t)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(e, t = 0) {
    if (e.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, s = 0; s < e.length; s++) {
      let r = e[s];
      if (r.empty ? r.from <= i : r.from < i)
        return S.normalized(e.slice(), t);
      i = r.to;
    }
    return new S(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, i, s) {
    return ni.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)) | (s ?? 16777215) << 6);
  }
  /**
  Create a selection range.
  */
  static range(e, t, i, s) {
    let r = (i ?? 16777215) << 6 | (s == null ? 7 : Math.min(6, s));
    return t < e ? ni.create(t, e, 48 | r) : ni.create(e, t, (t > e ? 8 : 0) | r);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let i = e[t];
    e.sort((s, r) => s.from - r.from), t = e.indexOf(i);
    for (let s = 1; s < e.length; s++) {
      let r = e[s], o = e[s - 1];
      if (r.empty ? r.from <= o.to : r.from < o.to) {
        let l = o.from, a = Math.max(r.to, o.to);
        s <= t && t--, e.splice(--s, 2, r.anchor > r.head ? S.range(a, l) : S.range(l, a));
      }
    }
    return new S(e, t);
  }
}
function wc(n, e) {
  for (let t of n.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let sl = 0;
class E {
  constructor(e, t, i, s, r) {
    this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = s, this.id = sl++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new E(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : rl), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new os([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new os(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new os(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
  }
}
function rl(n, e) {
  return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
}
class os {
  constructor(e, t, i, s) {
    this.dependencies = e, this.facet = t, this.type = i, this.value = s, this.id = sl++;
  }
  dynamicSlot(e) {
    var t;
    let i = this.value, s = this.facet.compareInput, r = this.id, o = e[r] >> 1, l = this.type == 2, a = !1, h = !1, c = [];
    for (let f of this.dependencies)
      f == "doc" ? a = !0 : f == "selection" ? h = !0 : ((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1 || c.push(e[f.id]);
    return {
      create(f) {
        return f.values[o] = i(f), 1;
      },
      update(f, u) {
        if (a && u.docChanged || h && (u.docChanged || u.selection) || io(f, c)) {
          let d = i(f);
          if (l ? !ta(d, f.values[o], s) : !s(d, f.values[o]))
            return f.values[o] = d, 1;
        }
        return 0;
      },
      reconfigure: (f, u) => {
        let d, p = u.config.address[r];
        if (p != null) {
          let m = xs(u, p);
          if (this.dependencies.every((g) => g instanceof E ? u.facet(g) === f.facet(g) : g instanceof Me ? u.field(g, !1) == f.field(g, !1) : !0) || (l ? ta(d = i(f), m, s) : s(d = i(f), m)))
            return f.values[o] = m, 0;
        } else
          d = i(f);
        return f.values[o] = d, 1;
      }
    };
  }
}
function ta(n, e, t) {
  if (n.length != e.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (!t(n[i], e[i]))
      return !1;
  return !0;
}
function io(n, e) {
  let t = !1;
  for (let i of e)
    nn(n, i) & 1 && (t = !0);
  return t;
}
function Fd(n, e, t) {
  let i = t.map((a) => n[a.id]), s = t.map((a) => a.type), r = i.filter((a) => !(a & 1)), o = n[e.id] >> 1;
  function l(a) {
    let h = [];
    for (let c = 0; c < i.length; c++) {
      let f = xs(a, i[c]);
      if (s[c] == 2)
        for (let u of f)
          h.push(u);
      else
        h.push(f);
    }
    return e.combine(h);
  }
  return {
    create(a) {
      for (let h of i)
        nn(a, h);
      return a.values[o] = l(a), 1;
    },
    update(a, h) {
      if (!io(a, r))
        return 0;
      let c = l(a);
      return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
    },
    reconfigure(a, h) {
      let c = io(a, i), f = h.config.facets[e.id], u = h.facet(e);
      if (f && !c && rl(t, f))
        return a.values[o] = u, 0;
      let d = l(a);
      return e.compare(d, u) ? (a.values[o] = u, 0) : (a.values[o] = d, 1);
    }
  };
}
const Fn = /* @__PURE__ */ E.define({ static: !0 });
class Me {
  constructor(e, t, i, s, r) {
    this.id = e, this.createF = t, this.updateF = i, this.compareF = s, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new Me(sl++, e.create, e.update, e.compare || ((i, s) => i === s), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(Fn).find((i) => i.field == this);
    return (t?.create || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (i) => (i.values[t] = this.create(i), 1),
      update: (i, s) => {
        let r = i.values[t], o = this.updateF(r, s);
        return this.compareF(r, o) ? 0 : (i.values[t] = o, 1);
      },
      reconfigure: (i, s) => {
        let r = i.facet(Fn), o = s.facet(Fn), l;
        return (l = r.find((a) => a.field == this)) && l != o.find((a) => a.field == this) ? (i.values[t] = l.create(i), 1) : s.config.address[this.id] != null ? (i.values[t] = s.field(this), 0) : (i.values[t] = this.create(i), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, Fn.of({ field: this, create: e })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const ti = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function Hi(n) {
  return (e) => new Sc(e, n);
}
const Tn = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ Hi(ti.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ Hi(ti.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ Hi(ti.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ Hi(ti.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ Hi(ti.lowest)
};
class Sc {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
}
class Ks {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new no(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return Ks.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class no {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
}
class ks {
  constructor(e, t, i, s, r, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = s, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, i) {
    let s = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let u of zd(e, t, o))
      u instanceof Me ? s.push(u) : (r[u.facet.id] || (r[u.facet.id] = [])).push(u);
    let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let u of s)
      l[u.id] = h.length << 1, h.push((d) => u.slot(d));
    let c = i?.config.facets;
    for (let u in r) {
      let d = r[u], p = d[0].facet, m = c && c[u] || [];
      if (d.every(
        (g) => g.type == 0
        /* Provider.Static */
      ))
        if (l[p.id] = a.length << 1 | 1, rl(m, d))
          a.push(i.facet(p));
        else {
          let g = p.combine(d.map((y) => y.value));
          a.push(i && p.compare(g, i.facet(p)) ? i.facet(p) : g);
        }
      else {
        for (let g of d)
          g.type == 0 ? (l[g.id] = a.length << 1 | 1, a.push(g.value)) : (l[g.id] = h.length << 1, h.push((y) => g.dynamicSlot(y)));
        l[p.id] = h.length << 1, h.push((g) => Fd(g, p, d));
      }
    }
    let f = h.map((u) => u(l));
    return new ks(e, o, f, l, a, r);
  }
}
function zd(n, e, t) {
  let i = [[], [], [], [], []], s = /* @__PURE__ */ new Map();
  function r(o, l) {
    let a = s.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let h = i[a].indexOf(o);
      h > -1 && i[a].splice(h, 1), o instanceof no && t.delete(o.compartment);
    }
    if (s.set(o, l), Array.isArray(o))
      for (let h of o)
        r(h, l);
    else if (o instanceof no) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), r(h, l);
    } else if (o instanceof Sc)
      r(o.inner, o.prec);
    else if (o instanceof Me)
      i[l].push(o), o.provides && r(o.provides, l);
    else if (o instanceof os)
      i[l].push(o), o.facet.extensions && r(o.facet.extensions, ti.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(h, l);
    }
  }
  return r(n, ti.default), i.reduce((o, l) => o.concat(l));
}
function nn(n, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, i = n.status[t];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  n.status[t] = 4;
  let s = n.computeSlot(n, n.config.dynamicSlots[t]);
  return n.status[t] = 2 | s;
}
function xs(n, e) {
  return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
}
const vc = /* @__PURE__ */ E.define(), so = /* @__PURE__ */ E.define({
  combine: (n) => n.some((e) => e),
  static: !0
}), Cc = /* @__PURE__ */ E.define({
  combine: (n) => n.length ? n[0] : void 0,
  static: !0
}), Ac = /* @__PURE__ */ E.define(), Tc = /* @__PURE__ */ E.define(), Oc = /* @__PURE__ */ E.define(), _c = /* @__PURE__ */ E.define({
  combine: (n) => n.length ? n[0] : !1
});
class Dt {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new Hd();
  }
}
class Hd {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new Dt(this, e);
  }
}
class Wd {
  /**
  @internal
  */
  constructor(e) {
    this.map = e;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(e) {
    return new J(this, e);
  }
}
class J {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(e) {
    let t = this.type.map(this.value, e);
    return t === void 0 ? void 0 : t == this.value ? this : new J(this.type, t);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(e) {
    return this.type == e;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(e = {}) {
    return new Wd(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let i = [];
    for (let s of e) {
      let r = s.map(t);
      r && i.push(r);
    }
    return i;
  }
}
J.reconfigure = /* @__PURE__ */ J.define();
J.appendConfig = /* @__PURE__ */ J.define();
class pe {
  constructor(e, t, i, s, r, o) {
    this.startState = e, this.changes = t, this.selection = i, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, i && wc(i, t.newLength), r.some((l) => l.type == pe.time) || (this.annotations = r.concat(pe.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, i, s, r, o) {
    return new pe(e, t, i, s, r, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(e) {
    for (let t of this.annotations)
      if (t.type == e)
        return t.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(e) {
    let t = this.annotation(pe.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
pe.time = /* @__PURE__ */ Dt.define();
pe.userEvent = /* @__PURE__ */ Dt.define();
pe.addToHistory = /* @__PURE__ */ Dt.define();
pe.remote = /* @__PURE__ */ Dt.define();
function Vd(n, e) {
  let t = [];
  for (let i = 0, s = 0; ; ) {
    let r, o;
    if (i < n.length && (s == e.length || e[s] >= n[i]))
      r = n[i++], o = n[i++];
    else if (s < e.length)
      r = e[s++], o = e[s++];
    else
      return t;
    !t.length || t[t.length - 1] < r ? t.push(r, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function Rc(n, e, t) {
  var i;
  let s, r, o;
  return t ? (s = e.changes, r = ue.empty(e.changes.length), o = n.changes.compose(e.changes)) : (s = e.changes.map(n.changes), r = n.changes.mapDesc(e.changes, !0), o = n.changes.compose(s)), {
    changes: o,
    selection: e.selection ? e.selection.map(r) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(s),
    effects: J.mapEffects(n.effects, s).concat(J.mapEffects(e.effects, r)),
    annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: n.scrollIntoView || e.scrollIntoView
  };
}
function ro(n, e, t) {
  let i = e.selection, s = Si(e.annotations);
  return e.userEvent && (s = s.concat(pe.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof ue ? e.changes : ue.of(e.changes || [], t, n.facet(Cc)),
    selection: i && (i instanceof S ? i : S.single(i.anchor, i.head)),
    effects: Si(e.effects),
    annotations: s,
    scrollIntoView: !!e.scrollIntoView
  };
}
function Ec(n, e, t) {
  let i = ro(n, e.length ? e[0] : {}, n.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let r = 1; r < e.length; r++) {
    e[r].filter === !1 && (t = !1);
    let o = !!e[r].sequential;
    i = Rc(i, ro(n, e[r], o ? i.changes.newLength : n.doc.length), o);
  }
  let s = pe.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return qd(t ? jd(s) : s);
}
function jd(n) {
  let e = n.startState, t = !0;
  for (let s of e.facet(Ac)) {
    let r = s(n);
    if (r === !1) {
      t = !1;
      break;
    }
    Array.isArray(r) && (t = t === !0 ? r : Vd(t, r));
  }
  if (t !== !0) {
    let s, r;
    if (t === !1)
      r = n.changes.invertedDesc, s = ue.empty(e.doc.length);
    else {
      let o = n.changes.filter(t);
      s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    n = pe.create(e, s, n.selection && n.selection.map(r), J.mapEffects(n.effects, r), n.annotations, n.scrollIntoView);
  }
  let i = e.facet(Tc);
  for (let s = i.length - 1; s >= 0; s--) {
    let r = i[s](n);
    r instanceof pe ? n = r : Array.isArray(r) && r.length == 1 && r[0] instanceof pe ? n = r[0] : n = Ec(e, Si(r), !1);
  }
  return n;
}
function qd(n) {
  let e = n.startState, t = e.facet(Oc), i = n;
  for (let s = t.length - 1; s >= 0; s--) {
    let r = t[s](n);
    r && Object.keys(r).length && (i = Rc(i, ro(e, r, n.changes.newLength), !0));
  }
  return i == n ? n : pe.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
}
const Ud = [];
function Si(n) {
  return n == null ? Ud : Array.isArray(n) ? n : [n];
}
var Je = /* @__PURE__ */ function(n) {
  return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
}(Je || (Je = {}));
const Kd = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let oo;
try {
  oo = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function Gd(n) {
  if (oo)
    return oo.test(n);
  for (let e = 0; e < n.length; e++) {
    let t = n[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || Kd.test(t)))
      return !0;
  }
  return !1;
}
function Jd(n) {
  return (e) => {
    if (!/\S/.test(e))
      return Je.Space;
    if (Gd(e))
      return Je.Word;
    for (let t = 0; t < n.length; t++)
      if (e.indexOf(n[t]) > -1)
        return Je.Word;
    return Je.Other;
  };
}
class q {
  constructor(e, t, i, s, r, o) {
    this.config = e, this.doc = t, this.selection = i, this.values = s, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      nn(this, l << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let i = this.config.address[e.id];
    if (i == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return nn(this, i), xs(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...e) {
    return Ec(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: i, compartments: s } = t;
    for (let l of e.effects)
      l.is(Ks.reconfigure) ? (t && (s = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => s.set(h, a)), t = null), s.set(l.value.compartment, l.value.extension)) : l.is(J.reconfigure) ? (t = null, i = l.value) : l.is(J.appendConfig) && (t = null, i = Si(i).concat(l.value));
    let r;
    t ? r = e.startState.values.slice() : (t = ks.resolve(i, s, this), r = new q(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
    let o = e.startState.facet(so) ? e.newSelection : e.newSelection.asSingle();
    new q(t, e.newDoc, o, r, (l, a) => a.update(l, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: S.cursor(t.from + e.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(e) {
    let t = this.selection, i = e(t.ranges[0]), s = this.changes(i.changes), r = [i.range], o = Si(i.effects);
    for (let l = 1; l < t.ranges.length; l++) {
      let a = e(t.ranges[l]), h = this.changes(a.changes), c = h.map(s);
      for (let u = 0; u < l; u++)
        r[u] = r[u].map(c);
      let f = s.mapDesc(h, !0);
      r.push(a.range.map(f)), s = s.compose(c), o = J.mapEffects(o, c).concat(J.mapEffects(Si(a.effects), f));
    }
    return {
      changes: s,
      selection: S.create(r, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof ue ? e : ue.of(e, this.doc.length, this.facet(q.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return V.of(e.split(this.facet(q.lineSeparator) || Zr));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(e = 0, t = this.doc.length) {
    return this.doc.sliceString(e, t, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(e) {
    let t = this.config.address[e.id];
    return t == null ? e.default : (nn(this, t), xs(this, t));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(e) {
    let t = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (e)
      for (let i in e) {
        let s = e[i];
        s instanceof Me && this.config.address[s.id] != null && (t[i] = s.spec.toJSON(this.field(e[i]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, i) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let s = [];
    if (i) {
      for (let r in i)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
          let o = i[r], l = e[r];
          s.push(o.init((a) => o.spec.fromJSON(l, a)));
        }
    }
    return q.create({
      doc: e.doc,
      selection: S.fromJSON(e.selection),
      extensions: t.extensions ? s.concat([t.extensions]) : s
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = ks.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof V ? e.doc : V.of((e.doc || "").split(t.staticFacet(q.lineSeparator) || Zr)), s = e.selection ? e.selection instanceof S ? e.selection : S.single(e.selection.anchor, e.selection.head) : S.single(0);
    return wc(s, i.length), t.staticFacet(so) || (s = s.asSingle()), new q(t, i, s, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(q.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(q.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(_c);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(e, ...t) {
    for (let i of this.facet(q.phrases))
      if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, s) => {
      if (s == "$")
        return "$";
      let r = +(s || 1);
      return !r || r > t.length ? i : t[r - 1];
    })), e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(e, t, i = -1) {
    let s = [];
    for (let r of this.facet(vc))
      for (let o of r(this, t, i))
        Object.prototype.hasOwnProperty.call(o, e) && s.push(o[e]);
    return s;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    let t = this.languageDataAt("wordChars", e);
    return Jd(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: i, length: s } = this.doc.lineAt(e), r = this.charCategorizer(e), o = e - i, l = e - i;
    for (; o > 0; ) {
      let a = ve(t, o, !1);
      if (r(t.slice(a, o)) != Je.Word)
        break;
      o = a;
    }
    for (; l < s; ) {
      let a = ve(t, l);
      if (r(t.slice(l, a)) != Je.Word)
        break;
      l = a;
    }
    return o == l ? null : S.range(o + i, l + i);
  }
}
q.allowMultipleSelections = so;
q.tabSize = /* @__PURE__ */ E.define({
  combine: (n) => n.length ? n[0] : 4
});
q.lineSeparator = Cc;
q.readOnly = _c;
q.phrases = /* @__PURE__ */ E.define({
  compare(n, e) {
    let t = Object.keys(n), i = Object.keys(e);
    return t.length == i.length && t.every((s) => n[s] == e[s]);
  }
});
q.languageData = vc;
q.changeFilter = Ac;
q.transactionFilter = Tc;
q.transactionExtender = Oc;
Ks.reconfigure = /* @__PURE__ */ J.define();
function Dc(n, e, t = {}) {
  let i = {};
  for (let s of n)
    for (let r of Object.keys(s)) {
      let o = s[r], l = i[r];
      if (l === void 0)
        i[r] = o;
      else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(t, r))
        i[r] = t[r](l, o);
      else
        throw new Error("Config merge conflict for field " + r);
    }
  for (let s in e)
    i[s] === void 0 && (i[s] = e[s]);
  return i;
}
class zt {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(e, t = e) {
    return lo.create(e, t, this);
  }
}
zt.prototype.startSide = zt.prototype.endSide = 0;
zt.prototype.point = !1;
zt.prototype.mapMode = Ne.TrackDel;
function ol(n, e) {
  return n == e || n.constructor == e.constructor && n.eq(e);
}
let lo = class Mc {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.value = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Mc(e, t, i);
  }
};
function ao(n, e) {
  return n.from - e.from || n.value.startSide - e.value.startSide;
}
class ll {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.value = i, this.maxPoint = s;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, i, s = 0) {
    let r = i ? this.to : this.from;
    for (let o = s, l = r.length; ; ) {
      if (o == l)
        return o;
      let a = o + l >> 1, h = r[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == o)
        return h >= 0 ? o : l;
      h >= 0 ? l = a : o = a + 1;
    }
  }
  between(e, t, i, s) {
    for (let r = this.findIndex(t, -1e9, !0), o = this.findIndex(i, 1e9, !1, r); r < o; r++)
      if (s(this.from[r] + e, this.to[r] + e, this.value[r]) === !1)
        return !1;
  }
  map(e, t) {
    let i = [], s = [], r = [], o = -1, l = -1;
    for (let a = 0; a < this.value.length; a++) {
      let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, u, d;
      if (c == f) {
        let p = t.mapPos(c, h.startSide, h.mapMode);
        if (p == null || (u = d = p, h.startSide != h.endSide && (d = t.mapPos(c, h.endSide), d < u)))
          continue;
      } else if (u = t.mapPos(c, h.startSide), d = t.mapPos(f, h.endSide), u > d || u == d && h.startSide > 0 && h.endSide <= 0)
        continue;
      (d - u || h.endSide - h.startSide) < 0 || (o < 0 && (o = u), h.point && (l = Math.max(l, d - u)), i.push(h), s.push(u - o), r.push(d - o));
    }
    return { mapped: i.length ? new ll(s, r, i, l) : null, pos: o };
  }
}
class U {
  constructor(e, t, i, s) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(e, t, i, s) {
    return new U(e, t, i, s);
  }
  /**
  @internal
  */
  get length() {
    let e = this.chunk.length - 1;
    return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let e = this.nextLayer.size;
    for (let t of this.chunk)
      e += t.value.length;
    return e;
  }
  /**
  @internal
  */
  chunkEnd(e) {
    return this.chunkPos[e] + this.chunk[e].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: i = !1, filterFrom: s = 0, filterTo: r = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (i && (t = t.slice().sort(ao)), this.isEmpty)
      return t.length ? U.of(t) : this;
    let l = new Pc(this, null, -1).goto(0), a = 0, h = [], c = new pn();
    for (; l.value || a < t.length; )
      if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || s > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || s > l.to || r < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h.push(lo.create(l.from, l.to, l.value))), l.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? U.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: s, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], i = [], s = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], a = this.chunk[o], h = e.touchesRange(l, l + a.length);
      if (h === !1)
        s = Math.max(s, a.maxPoint), t.push(a), i.push(e.mapPos(l));
      else if (h === !0) {
        let { mapped: c, pos: f } = a.map(l, e);
        c && (s = Math.max(s, c.maxPoint), t.push(c), i.push(f));
      }
    }
    let r = this.nextLayer.map(e);
    return t.length == 0 ? r : new U(i, t, r || U.empty, s);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, i) {
    if (!this.isEmpty) {
      for (let s = 0; s < this.chunk.length; s++) {
        let r = this.chunkPos[s], o = this.chunk[s];
        if (t >= r && e <= r + o.length && o.between(r, e - r, t - r, i) === !1)
          return;
      }
      this.nextLayer.between(e, t, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return mn.from([this]).goto(e);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(e, t = 0) {
    return mn.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, i, s, r = -1) {
    let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), a = ia(o, l, i), h = new Wi(o, a, r), c = new Wi(l, a, r);
    i.iterGaps((f, u, d) => na(h, f, c, u, d, s)), i.empty && i.length == 0 && na(h, 0, c, 0, 0, s);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, i = 0, s) {
    s == null && (s = 999999999);
    let r = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
    if (r.length != o.length)
      return !1;
    if (!r.length)
      return !0;
    let l = ia(r, o), a = new Wi(r, l, 0).goto(i), h = new Wi(o, l, 0).goto(i);
    for (; ; ) {
      if (a.to != h.to || !ho(a.active, h.active) || a.point && (!h.point || !ol(a.point, h.point)))
        return !1;
      if (a.to > s)
        return !0;
      a.next(), h.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, i, s, r = -1) {
    let o = new Wi(e, null, r).goto(t), l = t, a = o.openStart;
    for (; ; ) {
      let h = Math.min(o.to, i);
      if (o.point) {
        let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, a);
        s.point(l, h, o.point, c, f, o.pointRank), a = Math.min(o.openEnd(h), c.length);
      } else h > l && (s.span(l, h, o.active, a), a = o.openEnd(h));
      if (o.to > i)
        return a + (o.point && o.to > i ? 1 : 0);
      l = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let i = new pn();
    for (let s of e instanceof lo ? [e] : t ? Xd(e) : e)
      i.add(s.from, s.to, s.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return U.empty;
    let t = e[e.length - 1];
    for (let i = e.length - 2; i >= 0; i--)
      for (let s = e[i]; s != U.empty; s = s.nextLayer)
        t = new U(s.chunkPos, s.chunk, t, Math.max(s.maxPoint, t.maxPoint));
    return t;
  }
}
U.empty = /* @__PURE__ */ new U([], [], null, -1);
function Xd(n) {
  if (n.length > 1)
    for (let e = n[0], t = 1; t < n.length; t++) {
      let i = n[t];
      if (ao(e, i) > 0)
        return n.slice().sort(ao);
      e = i;
    }
  return n;
}
U.empty.nextLayer = U.empty;
class pn {
  finishChunk(e) {
    this.chunks.push(new ll(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, i) {
    this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new pn())).add(e, t, i);
  }
  /**
  @internal
  */
  addInner(e, t, i) {
    let s = e - this.lastTo || i.startSide - this.last.endSide;
    if (s <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return s < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let i = t.value.length - 1;
    return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(U.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = U.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function ia(n, e, t) {
  let i = /* @__PURE__ */ new Map();
  for (let r of n)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && i.set(r.chunk[o], r.chunkPos[o]);
  let s = /* @__PURE__ */ new Set();
  for (let r of e)
    for (let o = 0; o < r.chunk.length; o++) {
      let l = i.get(r.chunk[o]);
      l != null && (t ? t.mapPos(l) : l) == r.chunkPos[o] && !t?.touchesRange(l, l + r.chunk[o].length) && s.add(r.chunk[o]);
    }
  return s;
}
class Pc {
  constructor(e, t, i, s = 0) {
    this.layer = e, this.skip = t, this.minPoint = i, this.rank = s;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(e, t = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
  }
  gotoInner(e, t, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let s = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(s) || this.layer.chunkEnd(this.chunkIndex) < e || s.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let s = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!i || this.rangeIndex < s) && this.setRangeIndex(s);
    }
    this.next();
  }
  forward(e, t) {
    (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(e) {
    if (e == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = e;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(e) {
    return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
  }
}
class mn {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, i = -1) {
    let s = [];
    for (let r = 0; r < e.length; r++)
      for (let o = e[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && s.push(new Pc(o, t, i, r));
    return s.length == 1 ? s[0] : new mn(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let i of this.heap)
      i.goto(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      kr(this.heap, i);
    return this.next(), this;
  }
  forward(e, t) {
    for (let i of this.heap)
      i.forward(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      kr(this.heap, i);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), kr(this.heap, 0);
    }
  }
}
function kr(n, e) {
  for (let t = n[e]; ; ) {
    let i = (e << 1) + 1;
    if (i >= n.length)
      break;
    let s = n[i];
    if (i + 1 < n.length && s.compare(n[i + 1]) >= 0 && (s = n[i + 1], i++), t.compare(s) < 0)
      break;
    n[i] = t, n[e] = s, e = i;
  }
}
class Wi {
  constructor(e, t, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = mn.from(e, t, i);
  }
  goto(e, t = -1e9) {
    return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
  }
  forward(e, t) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(e, t);
  }
  removeActive(e) {
    zn(this.active, e), zn(this.activeTo, e), zn(this.activeRank, e), this.minActive = sa(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: i, to: s, rank: r } = this.cursor;
    for (; t < this.activeRank.length && (r - this.activeRank[t] || s - this.activeTo[t]) > 0; )
      t++;
    Hn(this.active, t, i), Hn(this.activeTo, t, s), Hn(this.activeRank, t, r), e && Hn(e, t, this.cursor.from), this.minActive = sa(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let s = this.minActive;
      if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[s] > e) {
          this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
          break;
        }
        this.removeActive(s), i && zn(i, s);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let s = i.length - 1; s >= 0 && i[s] < e; s--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--)
      t++;
    return t;
  }
}
function na(n, e, t, i, s, r) {
  n.goto(e), t.goto(i);
  let o = i + s, l = i, a = i - e, h = !!r.boundChange;
  for (let c = !1; ; ) {
    let f = n.to + a - t.to, u = f || n.endSide - t.endSide, d = u < 0 ? n.to + a : t.to, p = Math.min(d, o);
    if (n.point || t.point ? (n.point && t.point && ol(n.point, t.point) && ho(n.activeForPoint(n.to), t.activeForPoint(t.to)) || r.comparePoint(l, p, n.point, t.point), c = !1) : (c && r.boundChange(l), p > l && !ho(n.active, t.active) && r.compareRange(l, p, n.active, t.active), h && p < o && (f || n.openEnd(d) != t.openEnd(d)) && (c = !0)), d > o)
      break;
    l = d, u <= 0 && n.next(), u >= 0 && t.next();
  }
}
function ho(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t] && !ol(n[t], e[t]))
      return !1;
  return !0;
}
function zn(n, e) {
  for (let t = e, i = n.length - 1; t < i; t++)
    n[t] = n[t + 1];
  n.pop();
}
function Hn(n, e, t) {
  for (let i = n.length - 1; i >= e; i--)
    n[i + 1] = n[i];
  n[e] = t;
}
function sa(n, e) {
  let t = -1, i = 1e9;
  for (let s = 0; s < e.length; s++)
    (e[s] - i || n[s].endSide - n[t].endSide) < 0 && (t = s, i = e[s]);
  return t;
}
function Gs(n, e, t = n.length) {
  let i = 0;
  for (let s = 0; s < t && s < n.length; )
    n.charCodeAt(s) == 9 ? (i += e - i % e, s++) : (i++, s = ve(n, s));
  return i;
}
function Yd(n, e, t, i) {
  for (let s = 0, r = 0; ; ) {
    if (r >= e)
      return s;
    if (s == n.length)
      break;
    r += n.charCodeAt(s) == 9 ? t - r % t : 1, s = ve(n, s);
  }
  return n.length;
}
const co = "ͼ", ra = typeof Symbol > "u" ? "__" + co : Symbol.for(co), fo = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), oa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class Ht {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: i } = t || {};
    function s(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function r(o, l, a, h) {
      let c = [], f = /^@(\w+)\b/.exec(o[0]), u = f && f[1] == "keyframes";
      if (f && l == null) return a.push(o[0] + ";");
      for (let d in l) {
        let p = l[d];
        if (/&/.test(d))
          r(
            d.split(/,\s*/).map((m) => o.map((g) => m.replace(/&/, g))).reduce((m, g) => m.concat(g)),
            p,
            a
          );
        else if (p && typeof p == "object") {
          if (!f) throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
          r(s(d), p, c, u);
        } else p != null && c.push(d.replace(/_.*/, "").replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()) + ": " + p + ";");
      }
      (c.length || u) && a.push((i && !f && !h ? o.map(i) : o).join(", ") + " {" + c.join(" ") + "}");
    }
    for (let o in e) r(s(o), e[o], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let e = oa[ra] || 1;
    return oa[ra] = e + 1, co + e.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  //
  // If a Content Security Policy nonce is provided, it is added to
  // the `<style>` tag generated by the library.
  static mount(e, t, i) {
    let s = e[fo], r = i && i.nonce;
    s ? r && s.setNonce(r) : s = new Qd(e, r), s.mount(Array.isArray(t) ? t : [t], e);
  }
}
let la = /* @__PURE__ */ new Map();
class Qd {
  constructor(e, t) {
    let i = e.ownerDocument || e, s = i.defaultView;
    if (!e.head && e.adoptedStyleSheets && s.CSSStyleSheet) {
      let r = la.get(i);
      if (r) return e[fo] = r;
      this.sheet = new s.CSSStyleSheet(), la.set(i, this);
    } else
      this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[fo] = this;
  }
  mount(e, t) {
    let i = this.sheet, s = 0, r = 0;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = this.modules.indexOf(l);
      if (a < r && a > -1 && (this.modules.splice(a, 1), r--, a = -1), a == -1) {
        if (this.modules.splice(r++, 0, l), i) for (let h = 0; h < l.rules.length; h++)
          i.insertRule(l.rules[h], s++);
      } else {
        for (; r < a; ) s += this.modules[r++].rules.length;
        s += l.rules.length, r++;
      }
    }
    if (i)
      t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
    else {
      let o = "";
      for (let a = 0; a < this.modules.length; a++)
        o += this.modules[a].getRules() + `
`;
      this.styleTag.textContent = o;
      let l = t.head || t;
      this.styleTag.parentNode != l && l.insertBefore(this.styleTag, l.firstChild);
    }
  }
  setNonce(e) {
    this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
  }
}
var Wt = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, gn = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, Zd = typeof navigator < "u" && /Mac/.test(navigator.platform), ep = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var Se = 0; Se < 10; Se++) Wt[48 + Se] = Wt[96 + Se] = String(Se);
for (var Se = 1; Se <= 24; Se++) Wt[Se + 111] = "F" + Se;
for (var Se = 65; Se <= 90; Se++)
  Wt[Se] = String.fromCharCode(Se + 32), gn[Se] = String.fromCharCode(Se);
for (var xr in Wt) gn.hasOwnProperty(xr) || (gn[xr] = Wt[xr]);
function tp(n) {
  var e = Zd && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || ep && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? gn : Wt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
let Ee = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, uo = typeof document < "u" ? document : { documentElement: { style: {} } };
const po = /* @__PURE__ */ /Edge\/(\d+)/.exec(Ee.userAgent), Bc = /* @__PURE__ */ /MSIE \d/.test(Ee.userAgent), mo = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Ee.userAgent), Js = !!(Bc || mo || po), aa = !Js && /* @__PURE__ */ /gecko\/(\d+)/i.test(Ee.userAgent), wr = !Js && /* @__PURE__ */ /Chrome\/(\d+)/.exec(Ee.userAgent), ip = "webkitFontSmoothing" in uo.documentElement.style, go = !Js && /* @__PURE__ */ /Apple Computer/.test(Ee.vendor), ha = go && (/* @__PURE__ */ /Mobile\/\w+/.test(Ee.userAgent) || Ee.maxTouchPoints > 2);
var R = {
  mac: ha || /* @__PURE__ */ /Mac/.test(Ee.platform),
  windows: /* @__PURE__ */ /Win/.test(Ee.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(Ee.platform),
  ie: Js,
  ie_version: Bc ? uo.documentMode || 6 : mo ? +mo[1] : po ? +po[1] : 0,
  gecko: aa,
  gecko_version: aa ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(Ee.userAgent) || [0, 0])[1] : 0,
  chrome: !!wr,
  chrome_version: wr ? +wr[1] : 0,
  ios: ha,
  android: /* @__PURE__ */ /Android\b/.test(Ee.userAgent),
  webkit_version: ip ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(Ee.userAgent) || [0, 0])[1] : 0,
  safari: go,
  safari_version: go ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(Ee.userAgent) || [0, 0])[1] : 0,
  tabSize: uo.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function al(n, e) {
  for (let t in n)
    t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
  return e;
}
const ws = /* @__PURE__ */ Object.create(null);
function hl(n, e, t) {
  if (n == e)
    return !0;
  n || (n = ws), e || (e = ws);
  let i = Object.keys(n), s = Object.keys(e);
  if (i.length - 0 != s.length - 0)
    return !1;
  for (let r of i)
    if (r != t && (s.indexOf(r) == -1 || n[r] !== e[r]))
      return !1;
  return !0;
}
function np(n, e) {
  for (let t = n.attributes.length - 1; t >= 0; t--) {
    let i = n.attributes[t].name;
    e[i] == null && n.removeAttribute(i);
  }
  for (let t in e) {
    let i = e[t];
    t == "style" ? n.style.cssText = i : n.getAttribute(t) != i && n.setAttribute(t, i);
  }
}
function ca(n, e, t) {
  let i = !1;
  if (e)
    for (let s in e)
      t && s in t || (i = !0, s == "style" ? n.style.cssText = "" : n.removeAttribute(s));
  if (t)
    for (let s in t)
      e && e[s] == t[s] || (i = !0, s == "style" ? n.style.cssText = t[s] : n.setAttribute(s, t[s]));
  return i;
}
function sp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < n.attributes.length; t++) {
    let i = n.attributes[t];
    e[i.name] = i.value;
  }
  return e;
}
class Xs {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(e) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(e, t) {
    return !1;
  }
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(e, t, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var Ze = /* @__PURE__ */ function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
}(Ze || (Ze = {}));
class te extends zt {
  constructor(e, t, i, s) {
    super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = s;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(e) {
    return new On(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
    return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new di(e, t, t, i, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, i, s;
    if (e.isBlockGap)
      i = -5e8, s = 4e8;
    else {
      let { start: r, end: o } = Nc(e, t);
      i = (r ? t ? -3e8 : -1 : 5e8) - 1, s = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new di(e, i, s, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new _n(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return U.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
te.none = U.empty;
class On extends te {
  constructor(e) {
    let { start: t, end: i } = Nc(e);
    super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? al(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || ws;
  }
  eq(e) {
    return this == e || e instanceof On && this.tagName == e.tagName && hl(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
On.prototype.point = !1;
class _n extends te {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof _n && this.spec.class == e.spec.class && hl(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
_n.prototype.mapMode = Ne.TrackBefore;
_n.prototype.point = !0;
class di extends te {
  constructor(e, t, i, s, r, o) {
    super(t, i, r, e), this.block = s, this.isReplace = o, this.mapMode = s ? t <= 0 ? Ne.TrackBefore : Ne.TrackAfter : Ne.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? Ze.WidgetRange : this.startSide <= 0 ? Ze.WidgetBefore : Ze.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof di && rp(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
di.prototype.point = !0;
function Nc(n, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: i } = n;
  return t == null && (t = n.inclusive), i == null && (i = n.inclusive), { start: t ?? e, end: i ?? e };
}
function rp(n, e) {
  return n == e || !!(n && e && n.compare(e));
}
function vi(n, e, t, i = 0) {
  let s = t.length - 1;
  s >= 0 && t[s] + i >= n ? t[s] = Math.max(t[s], e) : t.push(n, e);
}
class yn extends zt {
  constructor(e, t) {
    super(), this.tagName = e, this.attributes = t;
  }
  eq(e) {
    return e == this || e instanceof yn && this.tagName == e.tagName && hl(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new yn(e.tagName, e.attributes || ws);
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return U.of(e, t);
  }
}
yn.prototype.startSide = yn.prototype.endSide = -1;
function Ei(n) {
  let e;
  return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
}
function yo(n, e) {
  return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function sn(n, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return yo(n, e.anchorNode);
  } catch {
    return !1;
  }
}
function ls(n) {
  return n.nodeType == 3 ? bn(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function rn(n, e, t, i) {
  return t ? fa(n, e, t, i, -1) || fa(n, e, t, i, 1) : !1;
}
function Vt(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}
function Ss(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
function fa(n, e, t, i, s) {
  for (; ; ) {
    if (n == t && e == i)
      return !0;
    if (e == (s < 0 ? 0 : Et(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let r = n.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      e = Vt(n) + (s < 0 ? 0 : 1), n = r;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (s < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      e = s < 0 ? Et(n) : 0;
    } else
      return !1;
  }
}
function Et(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function vs(n, e) {
  let t = e ? n.left : n.right;
  return { left: t, right: t, top: n.top, bottom: n.bottom };
}
function op(n) {
  let e = n.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function Ic(n, e) {
  let t = e.width / n.offsetWidth, i = e.height / n.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - n.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - n.offsetHeight) < 1) && (i = 1), { scaleX: t, scaleY: i };
}
function lp(n, e, t, i, s, r, o, l) {
  let a = n.ownerDocument, h = a.defaultView || window;
  for (let c = n, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let u, d = c == a.body, p = 1, m = 1;
      if (d)
        u = op(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let b = c.getBoundingClientRect();
        ({ scaleX: p, scaleY: m } = Ic(c, b)), u = {
          left: b.left,
          right: b.left + c.clientWidth * p,
          top: b.top,
          bottom: b.top + c.clientHeight * m
        };
      }
      let g = 0, y = 0;
      if (s == "nearest")
        e.top < u.top ? (y = e.top - (u.top + o), t > 0 && e.bottom > u.bottom + y && (y = e.bottom - u.bottom + o)) : e.bottom > u.bottom && (y = e.bottom - u.bottom + o, t < 0 && e.top - y < u.top && (y = e.top - (u.top + o)));
      else {
        let b = e.bottom - e.top, x = u.bottom - u.top;
        y = (s == "center" && b <= x ? e.top + b / 2 - x / 2 : s == "start" || s == "center" && t < 0 ? e.top - o : e.bottom - x + o) - u.top;
      }
      if (i == "nearest" ? e.left < u.left ? (g = e.left - (u.left + r), t > 0 && e.right > u.right + g && (g = e.right - u.right + r)) : e.right > u.right && (g = e.right - u.right + r, t < 0 && e.left < u.left + g && (g = e.left - (u.left + r))) : g = (i == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? e.left - r : e.right - (u.right - u.left) + r) - u.left, g || y)
        if (d)
          h.scrollBy(g, y);
        else {
          let b = 0, x = 0;
          if (y) {
            let v = c.scrollTop;
            c.scrollTop += y / m, x = (c.scrollTop - v) * m;
          }
          if (g) {
            let v = c.scrollLeft;
            c.scrollLeft += g / p, b = (c.scrollLeft - v) * p;
          }
          e = {
            left: e.left - b,
            top: e.top - x,
            right: e.right - b,
            bottom: e.bottom - x
          }, b && Math.abs(b - g) < 1 && (i = "nearest"), x && Math.abs(x - y) < 1 && (s = "nearest");
        }
      if (d)
        break;
      (e.top < u.top || e.bottom > u.bottom || e.left < u.left || e.right > u.right) && (e = {
        left: Math.max(e.left, u.left),
        right: Math.min(e.right, u.right),
        top: Math.max(e.top, u.top),
        bottom: Math.min(e.bottom, u.bottom)
      }), c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
function ap(n) {
  let e = n.ownerDocument, t, i;
  for (let s = n.parentNode; s && !(s == e.body || t && i); )
    if (s.nodeType == 1)
      !i && s.scrollHeight > s.clientHeight && (i = s), !t && s.scrollWidth > s.clientWidth && (t = s), s = s.assignedSlot || s.parentNode;
    else if (s.nodeType == 11)
      s = s.host;
    else
      break;
  return { x: t, y: i };
}
class hp {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: i } = e;
    this.set(t, Math.min(e.anchorOffset, t ? Et(t) : 0), i, Math.min(e.focusOffset, i ? Et(i) : 0));
  }
  set(e, t, i, s) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = s;
  }
}
let ei = null;
R.safari && R.safari_version >= 26 && (ei = !1);
function Lc(n) {
  if (n.setActive)
    return n.setActive();
  if (ei)
    return n.focus(ei);
  let e = [];
  for (let t = n; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (n.focus(ei == null ? {
    get preventScroll() {
      return ei = { preventScroll: !0 }, !0;
    }
  } : void 0), !ei) {
    ei = !1;
    for (let t = 0; t < e.length; ) {
      let i = e[t++], s = e[t++], r = e[t++];
      i.scrollTop != s && (i.scrollTop = s), i.scrollLeft != r && (i.scrollLeft = r);
    }
  }
}
let ua;
function bn(n, e, t = e) {
  let i = ua || (ua = document.createRange());
  return i.setEnd(n, t), i.setStart(n, e), i;
}
function Ci(n, e, t, i) {
  let s = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  i && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = i);
  let r = new KeyboardEvent("keydown", s);
  r.synthetic = !0, n.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", s);
  return o.synthetic = !0, n.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function cp(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function fp(n, e) {
  let t = e.focusNode, i = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != i)
    return !1;
  for (i = Math.min(i, Et(t)); ; )
    if (i) {
      if (t.nodeType != 1)
        return !1;
      let s = t.childNodes[i - 1];
      s.contentEditable == "false" ? i-- : (t = s, i = Et(t));
    } else {
      if (t == n)
        return !0;
      i = Vt(t), t = t.parentNode;
    }
}
function $c(n) {
  return n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
function Fc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i > 0)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i - 1], i = Et(t);
    } else if (t.parentNode && !Ss(t))
      i = Vt(t), t = t.parentNode;
    else
      return null;
  }
}
function zc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i < t.nodeValue.length)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i], i = 0;
    } else if (t.parentNode && !Ss(t))
      i = Vt(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class ot {
  constructor(e, t, i = !0) {
    this.node = e, this.offset = t, this.precise = i;
  }
  static before(e, t) {
    return new ot(e.parentNode, Vt(e), t);
  }
  static after(e, t) {
    return new ot(e.parentNode, Vt(e) + 1, t);
  }
}
var se = /* @__PURE__ */ function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
}(se || (se = {}));
const pi = se.LTR, cl = se.RTL;
function Hc(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    e.push(1 << +n[t]);
  return e;
}
const up = /* @__PURE__ */ Hc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), dp = /* @__PURE__ */ Hc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), bo = /* @__PURE__ */ Object.create(null), pt = [];
for (let n of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ n.charCodeAt(0), t = /* @__PURE__ */ n.charCodeAt(1);
  bo[e] = t, bo[t] = -e;
}
function Wc(n) {
  return n <= 247 ? up[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? dp[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
}
const pp = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class Ot {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? cl : pi;
  }
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.level = i;
  }
  /**
  @internal
  */
  side(e, t) {
    return this.dir == t == e ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(e, t) {
    return e == (this.dir == t);
  }
  /**
  @internal
  */
  static find(e, t, i, s) {
    let r = -1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if (l.from <= t && l.to >= t) {
        if (l.level == i)
          return o;
        (r < 0 || (s != 0 ? s < 0 ? l.from < t : l.to > t : e[r].level > l.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function Vc(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++) {
    let i = n[t], s = e[t];
    if (i.from != s.from || i.to != s.to || i.direction != s.direction || !Vc(i.inner, s.inner))
      return !1;
  }
  return !0;
}
const X = [];
function mp(n, e, t, i, s) {
  for (let r = 0; r <= i.length; r++) {
    let o = r ? i[r - 1].to : e, l = r < i.length ? i[r].from : t, a = r ? 256 : s;
    for (let h = o, c = a, f = a; h < l; h++) {
      let u = Wc(n.charCodeAt(h));
      u == 512 ? u = c : u == 8 && f == 4 && (u = 16), X[h] = u == 4 ? 2 : u, u & 7 && (f = u), c = u;
    }
    for (let h = o, c = a, f = a; h < l; h++) {
      let u = X[h];
      if (u == 128)
        h < l - 1 && c == X[h + 1] && c & 24 ? u = X[h] = c : X[h] = 256;
      else if (u == 64) {
        let d = h + 1;
        for (; d < l && X[d] == 64; )
          d++;
        let p = h && c == 8 || d < t && X[d] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let m = h; m < d; m++)
          X[m] = p;
        h = d - 1;
      } else u == 8 && f == 1 && (X[h] = 1);
      c = u, u & 7 && (f = u);
    }
  }
}
function gp(n, e, t, i, s) {
  let r = s == 1 ? 2 : 1;
  for (let o = 0, l = 0, a = 0; o <= i.length; o++) {
    let h = o ? i[o - 1].to : e, c = o < i.length ? i[o].from : t;
    for (let f = h, u, d, p; f < c; f++)
      if (d = bo[u = n.charCodeAt(f)])
        if (d < 0) {
          for (let m = l - 3; m >= 0; m -= 3)
            if (pt[m + 1] == -d) {
              let g = pt[m + 2], y = g & 2 ? s : g & 4 ? g & 1 ? r : s : 0;
              y && (X[f] = X[pt[m]] = y), l = m;
              break;
            }
        } else {
          if (pt.length == 189)
            break;
          pt[l++] = f, pt[l++] = u, pt[l++] = a;
        }
      else if ((p = X[f]) == 2 || p == 1) {
        let m = p == s;
        a = m ? 0 : 1;
        for (let g = l - 3; g >= 0; g -= 3) {
          let y = pt[g + 2];
          if (y & 2)
            break;
          if (m)
            pt[g + 2] |= 2;
          else {
            if (y & 4)
              break;
            pt[g + 2] |= 4;
          }
        }
      }
  }
}
function yp(n, e, t, i) {
  for (let s = 0, r = i; s <= t.length; s++) {
    let o = s ? t[s - 1].to : n, l = s < t.length ? t[s].from : e;
    for (let a = o; a < l; ) {
      let h = X[a];
      if (h == 256) {
        let c = a + 1;
        for (; ; )
          if (c == l) {
            if (s == t.length)
              break;
            c = t[s++].to, l = s < t.length ? t[s].from : e;
          } else if (X[c] == 256)
            c++;
          else
            break;
        let f = r == 1, u = (c < e ? X[c] : i) == 1, d = f == u ? f ? 1 : 2 : i;
        for (let p = c, m = s, g = m ? t[m - 1].to : n; p > a; )
          p == g && (p = t[--m].from, g = m ? t[m - 1].to : n), X[--p] = d;
        a = c;
      } else
        r = h, a++;
    }
  }
}
function ko(n, e, t, i, s, r, o) {
  let l = i % 2 ? 2 : 1;
  if (i % 2 == s % 2)
    for (let a = e, h = 0; a < t; ) {
      let c = !0, f = !1;
      if (h == r.length || a < r[h].from) {
        let m = X[a];
        m != l && (c = !1, f = m == 16);
      }
      let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, p = a;
      e: for (; ; )
        if (h < r.length && p == r[h].from) {
          if (f)
            break e;
          let m = r[h];
          if (!c)
            for (let g = m.to, y = h + 1; ; ) {
              if (g == t)
                break e;
              if (y < r.length && r[y].from == g)
                g = r[y++].to;
              else {
                if (X[g] == l)
                  break e;
                break;
              }
            }
          if (h++, u)
            u.push(m);
          else {
            m.from > a && o.push(new Ot(a, m.from, d));
            let g = m.direction == pi != !(d % 2);
            xo(n, g ? i + 1 : i, s, m.inner, m.from, m.to, o), a = m.to;
          }
          p = m.to;
        } else {
          if (p == t || (c ? X[p] != l : X[p] == l))
            break;
          p++;
        }
      u ? ko(n, a, p, i + 1, s, u, o) : a < p && o.push(new Ot(a, p, d)), a = p;
    }
  else
    for (let a = t, h = r.length; a > e; ) {
      let c = !0, f = !1;
      if (!h || a > r[h - 1].to) {
        let m = X[a - 1];
        m != l && (c = !1, f = m == 16);
      }
      let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, p = a;
      e: for (; ; )
        if (h && p == r[h - 1].to) {
          if (f)
            break e;
          let m = r[--h];
          if (!c)
            for (let g = m.from, y = h; ; ) {
              if (g == e)
                break e;
              if (y && r[y - 1].to == g)
                g = r[--y].from;
              else {
                if (X[g - 1] == l)
                  break e;
                break;
              }
            }
          if (u)
            u.push(m);
          else {
            m.to < a && o.push(new Ot(m.to, a, d));
            let g = m.direction == pi != !(d % 2);
            xo(n, g ? i + 1 : i, s, m.inner, m.from, m.to, o), a = m.from;
          }
          p = m.from;
        } else {
          if (p == e || (c ? X[p - 1] != l : X[p - 1] == l))
            break;
          p--;
        }
      u ? ko(n, p, a, i + 1, s, u, o) : p < a && o.push(new Ot(p, a, d)), a = p;
    }
}
function xo(n, e, t, i, s, r, o) {
  let l = e % 2 ? 2 : 1;
  mp(n, s, r, i, l), gp(n, s, r, i, l), yp(s, r, i, l), ko(n, s, r, e, t, i, o);
}
function bp(n, e, t) {
  if (!n)
    return [new Ot(0, 0, e == cl ? 1 : 0)];
  if (e == pi && !t.length && !pp.test(n))
    return jc(n.length);
  if (t.length)
    for (; n.length > X.length; )
      X[X.length] = 256;
  let i = [], s = e == pi ? 0 : 1;
  return xo(n, s, s, t, 0, n.length, i), i;
}
function jc(n) {
  return [new Ot(0, n, 0)];
}
let qc = "";
function kp(n, e, t, i, s) {
  var r;
  let o = i.head - n.from, l = Ot.find(e, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc), a = e[l], h = a.side(s, t);
  if (o == h) {
    let u = l += s ? 1 : -1;
    if (u < 0 || u >= e.length)
      return null;
    a = e[l = u], o = a.side(!s, t), h = a.side(s, t);
  }
  let c = ve(n.text, o, a.forward(s, t));
  (c < a.from || c > a.to) && (c = h), qc = n.text.slice(Math.min(o, c), Math.max(o, c));
  let f = l == (s ? e.length - 1 : 0) ? null : e[l + (s ? 1 : -1)];
  return f && c == h && f.level + (s ? 0 : 1) < a.level ? S.cursor(f.side(!s, t) + n.from, f.forward(s, t) ? 1 : -1, f.level) : S.cursor(c + n.from, a.forward(s, t) ? -1 : 1, a.level);
}
function xp(n, e, t) {
  for (let i = e; i < t; i++) {
    let s = Wc(n.charCodeAt(i));
    if (s == 1)
      return pi;
    if (s == 2 || s == 4)
      return cl;
  }
  return pi;
}
const Uc = /* @__PURE__ */ E.define(), Kc = /* @__PURE__ */ E.define(), Gc = /* @__PURE__ */ E.define(), Jc = /* @__PURE__ */ E.define(), wo = /* @__PURE__ */ E.define(), Xc = /* @__PURE__ */ E.define(), Yc = /* @__PURE__ */ E.define(), fl = /* @__PURE__ */ E.define(), ul = /* @__PURE__ */ E.define(), Qc = /* @__PURE__ */ E.define({
  combine: (n) => n.some((e) => e)
}), wp = /* @__PURE__ */ E.define({
  combine: (n) => n.some((e) => e)
}), Zc = /* @__PURE__ */ E.define();
class Ai {
  constructor(e, t = "nearest", i = "nearest", s = 5, r = 5, o = !1) {
    this.range = e, this.y = t, this.x = i, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new Ai(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new Ai(S.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Wn = /* @__PURE__ */ J.define({ map: (n, e) => n.map(e) }), ef = /* @__PURE__ */ J.define();
function je(n, e, t) {
  let i = n.facet(Jc);
  i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const Tt = /* @__PURE__ */ E.define({ combine: (n) => n.length ? n[0] : !0 });
let Sp = 0;
const bi = /* @__PURE__ */ E.define({
  combine(n) {
    return n.filter((e, t) => {
      for (let i = 0; i < t; i++)
        if (n[i].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class it {
  constructor(e, t, i, s, r) {
    this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = s, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat(bi.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(bi.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: i, eventObservers: s, provide: r, decorations: o } = t || {};
    return new it(Sp++, e, i, s, (l) => {
      let a = [];
      return o && a.push(Ys.of((h) => {
        let c = h.plugin(l);
        return c ? o(c) : te.none;
      })), r && a.push(r(l)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return it.define((i, s) => new e(i, s), t);
  }
}
class Sr {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  get plugin() {
    return this.spec && this.spec.plugin;
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (i) {
            if (je(t.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.plugin.create(e, this.spec.arg);
      } catch (t) {
        je(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        je(e.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const tf = /* @__PURE__ */ E.define(), dl = /* @__PURE__ */ E.define(), Ys = /* @__PURE__ */ E.define(), nf = /* @__PURE__ */ E.define(), pl = /* @__PURE__ */ E.define(), Rn = /* @__PURE__ */ E.define(), sf = /* @__PURE__ */ E.define();
function da(n, e) {
  let t = n.state.facet(sf);
  if (!t.length)
    return t;
  let i = t.map((r) => r instanceof Function ? r(n) : r), s = [];
  return U.spans(i, e.from, e.to, {
    point() {
    },
    span(r, o, l, a) {
      let h = r - e.from, c = o - e.from, f = s;
      for (let u = l.length - 1; u >= 0; u--, a--) {
        let d = l[u].spec.bidiIsolate, p;
        if (d == null && (d = xp(e.text, h, c)), a > 0 && f.length && (p = f[f.length - 1]).to == h && p.direction == d)
          p.to = c, f = p.inner;
        else {
          let m = { from: h, to: c, direction: d, inner: [] };
          f.push(m), f = m.inner;
        }
      }
    }
  }), s;
}
const rf = /* @__PURE__ */ E.define();
function ml(n) {
  let e = 0, t = 0, i = 0, s = 0;
  for (let r of n.state.facet(rf)) {
    let o = r(n);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: e, right: t, top: i, bottom: s };
}
const Ki = /* @__PURE__ */ E.define();
class Xe {
  constructor(e, t, i, s) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = s;
  }
  join(e) {
    return new Xe(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, i = this;
    for (; t > 0; t--) {
      let s = e[t - 1];
      if (!(s.fromA > i.toA)) {
        if (s.toA < i.fromA)
          break;
        i = i.join(s), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, i), e;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let i = [];
    for (let s = 0, r = 0, o = 0; ; ) {
      let l = s < e.length ? e[s].fromB : 1e9, a = r < t.length ? t[r] : 1e9, h = Math.min(l, a);
      if (h == 1e9)
        break;
      let c = h + o, f = h, u = c;
      for (; ; )
        if (r < t.length && t[r] <= f) {
          let d = t[r + 1];
          r += 2, f = Math.max(f, d);
          for (let p = s; p < e.length && e[p].fromB <= f; p++)
            o = e[p].toA - e[p].toB;
          u = Math.max(u, d + o);
        } else if (s < e.length && e[s].fromB <= f) {
          let d = e[s++];
          f = Math.max(f, d.toB), u = Math.max(u, d.toA), o = d.toA - d.toB;
        } else
          break;
      i.push(new Xe(c, u, h, f));
    }
    return i;
  }
}
class Cs {
  constructor(e, t, i) {
    this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = ue.empty(this.startState.doc.length);
    for (let r of i)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, l, a) => s.push(new Xe(r, o, l, a))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Cs(e, t, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((e) => e.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
const vp = [];
class ce {
  constructor(e, t, i = 0) {
    this.dom = e, this.length = t, this.flags = i, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return vp;
  }
  isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  isComposite() {
    return !1;
  }
  isLine() {
    return !1;
  }
  isText() {
    return !1;
  }
  isBlock() {
    return !1;
  }
  get domAttrs() {
    return null;
  }
  sync(e) {
    if (this.flags |= 2, this.flags & 4) {
      this.flags &= -5;
      let t = this.domAttrs;
      t && np(this.dom, t);
    }
  }
  toString() {
    return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
  }
  destroy() {
    this.parent = null;
  }
  setDOM(e) {
    this.dom = e, e.cmTile = this;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(e, t = this.posAtStart) {
    let i = t;
    for (let s of this.children) {
      if (s == e)
        return i;
      i += s.length + s.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  covers(e) {
    return !0;
  }
  coordsIn(e, t) {
    return null;
  }
  domPosFor(e, t) {
    let i = Vt(this.dom), s = this.length ? e > 0 : t > 0;
    return new ot(this.parent.dom, i + (s ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof Zs)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class Qs extends ce {
  constructor(e) {
    super(e, 0), this._children = [];
  }
  isComposite() {
    return !0;
  }
  get children() {
    return this._children;
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
  append(e) {
    this.children.push(e), e.parent = this;
  }
  sync(e) {
    if (this.flags & 2)
      return;
    super.sync(e);
    let t = this.dom, i = null, s, r = e?.node == t ? e : null, o = 0;
    for (let l of this.children) {
      if (l.sync(e), o += l.length + l.breakAfter, s = i ? i.nextSibling : t.firstChild, r && s != l.dom && (r.written = !0), l.dom.parentNode == t)
        for (; s && s != l.dom; )
          s = pa(s);
      else
        t.insertBefore(l.dom, s);
      i = l.dom;
    }
    for (s = i ? i.nextSibling : t.firstChild, r && s && (r.written = !0); s; )
      s = pa(s);
    this.length = o;
  }
}
function pa(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Zs extends Qs {
  constructor(e, t) {
    super(t), this.view = e;
  }
  owns(e) {
    for (; e; e = e.parent)
      if (e == this)
        return !0;
    return !1;
  }
  isBlock() {
    return !0;
  }
  nearest(e) {
    for (; ; ) {
      if (!e)
        return null;
      let t = ce.get(e);
      if (t && this.owns(t))
        return t;
      e = e.parentNode;
    }
  }
  blockTiles(e) {
    for (let t = [], i = this, s = 0, r = 0; ; )
      if (s == i.children.length) {
        if (!t.length)
          return;
        i = i.parent, i.breakAfter && r++, s = t.pop();
      } else {
        let o = i.children[s++];
        if (o instanceof $t)
          t.push(s), i = o, s = 0;
        else {
          let l = r + o.length, a = e(o, r);
          if (a !== void 0)
            return a;
          r = l + o.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(e, t) {
    let i, s = -1, r, o = -1;
    if (this.blockTiles((l, a) => {
      let h = a + l.length;
      if (e >= a && e <= h) {
        if (l.isWidget() && t >= -1 && t <= 1) {
          if (l.flags & 32)
            return !0;
          l.flags & 16 && (i = void 0);
        }
        (a < e || e == h && (t < -1 ? l.length : l.covers(1))) && (!i || !l.isWidget() && i.isWidget()) && (i = l, s = e - a), (h > e || e == a && (t > 1 ? l.length : l.covers(-1))) && (!r || !l.isWidget() && r.isWidget()) && (r = l, o = e - a);
      }
    }), !i && !r)
      throw new Error("No tile at position " + e);
    return i && t < 0 || !r ? { tile: i, offset: s } : { tile: r, offset: o };
  }
}
class $t extends Qs {
  constructor(e, t) {
    super(e), this.wrapper = t;
  }
  isBlock() {
    return !0;
  }
  covers(e) {
    return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
  }
  get domAttrs() {
    return this.wrapper.attributes;
  }
  static of(e, t) {
    let i = new $t(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Di extends Qs {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, i) {
    let s = new Di(t || document.createElement("div"), e);
    return (!t || !i) && (s.flags |= 4), s;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(e, t, i) {
    let s = null, r = -1, o = null, l = -1;
    function a(c, f) {
      for (let u = 0, d = 0; u < c.children.length && d <= f; u++) {
        let p = c.children[u], m = d + p.length;
        m >= f && (p.isComposite() ? a(p, f - d) : (!o || o.isHidden && (t > 0 || i && Ap(o, p))) && (m > f || p.flags & 32) ? (o = p, l = f - d) : (d < f || p.flags & 16 && !p.isHidden) && (s = p, r = f - d)), d = m;
      }
    }
    a(this, e);
    let h = (t < 0 ? s : o) || s || o;
    return h ? { tile: h, offset: h == s ? r : l } : null;
  }
  coordsIn(e, t) {
    let i = this.resolveInline(e, t, !0);
    return i ? i.tile.coordsIn(Math.max(0, i.offset), t) : Cp(this);
  }
  domIn(e, t) {
    let i = this.resolveInline(e, t);
    if (i) {
      let { tile: s, offset: r } = i;
      if (this.dom.contains(s.dom))
        return s.isText() ? new ot(s.dom, Math.min(s.dom.nodeValue.length, r)) : s.domPosFor(r, s.flags & 16 ? 1 : s.flags & 32 ? -1 : t);
      let o = i.tile.parent, l = !1;
      for (let a of o.children) {
        if (l)
          return new ot(a.dom, 0);
        a == i.tile && (l = !0);
      }
    }
    return new ot(this.dom, 0);
  }
}
function Cp(n) {
  let e = n.dom.lastChild;
  if (!e)
    return n.dom.getBoundingClientRect();
  let t = ls(e);
  return t[t.length - 1] || null;
}
function Ap(n, e) {
  let t = n.coordsIn(0, 1), i = e.coordsIn(0, 1);
  return t && i && i.top < t.bottom;
}
class Ie extends Qs {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let i = new Ie(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class si extends ce {
  constructor(e, t) {
    super(e, t.length), this.text = t;
  }
  sync(e) {
    this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
  }
  isText() {
    return !0;
  }
  toString() {
    return JSON.stringify(this.text);
  }
  coordsIn(e, t) {
    let i = this.dom.nodeValue.length;
    e > i && (e = i);
    let s = e, r = e, o = 0;
    e == 0 && t < 0 || e == i && t >= 0 ? R.chrome || R.gecko || (e ? (s--, o = 1) : r < i && (r++, o = -1)) : t < 0 ? s-- : r < i && r++;
    let l = bn(this.dom, s, r).getClientRects();
    if (!l.length)
      return null;
    let a = l[(o ? o < 0 : t >= 0) ? 0 : l.length - 1];
    return R.safari && !o && a.width == 0 && (a = Array.prototype.find.call(l, (h) => h.width) || a), o ? vs(a, o < 0) : a || null;
  }
  static of(e, t) {
    let i = new si(t || document.createTextNode(e), e);
    return t || (i.flags |= 2), i;
  }
}
class mi extends ce {
  constructor(e, t, i, s) {
    super(e, t, s), this.widget = i;
  }
  isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  covers(e) {
    return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
  }
  coordsIn(e, t) {
    return this.coordsInWidget(e, t, !1);
  }
  coordsInWidget(e, t, i) {
    let s = this.widget.coordsAt(this.dom, e, t);
    if (s)
      return s;
    if (i)
      return vs(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let r = this.dom.getClientRects(), o = null;
      if (!r.length)
        return null;
      let l = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = l ? r.length - 1 : 0; o = r[a], !(e > 0 ? a == 0 : a == r.length - 1 || o.top < o.bottom); a += l ? -1 : 1)
        ;
      return vs(o, !l);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return V.empty;
    let { root: e } = this;
    if (!e)
      return V.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, i, s, r) {
    return r || (r = e.toDOM(t), e.editable || (r.contentEditable = "false")), new mi(r, i, e, s);
  }
}
class As extends ce {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return V.empty;
  }
  coordsIn(e) {
    return this.dom.getBoundingClientRect();
  }
}
class Tp {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, i) {
    let { tile: s, index: r, beforeBreak: o, parents: l } = this;
    for (; e || t > 0; )
      if (s.isComposite())
        if (o) {
          if (!e)
            break;
          i && i.break(), e--, o = !1;
        } else if (r == s.children.length) {
          if (!e && !l.length)
            break;
          i && i.leave(s), o = !!s.breakAfter, { tile: s, index: r } = l.pop(), r++;
        } else {
          let a = s.children[r], h = a.breakAfter;
          (t > 0 ? a.length <= e : a.length < e) && (!i || i.skip(a, 0, a.length) !== !1 || !a.isComposite) ? (o = !!h, r++, e -= a.length) : (l.push({ tile: s, index: r }), s = a, r = 0, i && a.isComposite() && i.enter(a));
        }
      else if (r == s.length)
        o = !!s.breakAfter, { tile: s, index: r } = l.pop(), r++;
      else if (e) {
        let a = Math.min(e, s.length - r);
        i && i.skip(s, r, r + a), e -= a, r += a;
      } else
        break;
    return this.tile = s, this.index = r, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class Op {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.wrapper = i, this.rank = s;
  }
}
class _p {
  constructor(e, t, i) {
    this.cache = e, this.root = t, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, i, s) {
    var r;
    this.flushBuffer();
    let o = this.ensureMarks(t, i), l = o.lastChild;
    if (l && l.isText() && !(l.flags & 8) && l.length + e.length < 512) {
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
      let a = o.children[o.children.length - 1] = new si(l.dom, l.text + e);
      a.parent = o;
    } else
      o.append(s || si.of(e, (r = this.cache.find(si)) === null || r === void 0 ? void 0 : r.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let i = this.curLine;
    i.dom != t.line.dom && (i.setDOM(this.cache.reused.has(t.line) ? vr(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let s = i;
    for (let l = t.marks.length - 1; l >= 0; l--) {
      let a = t.marks[l], h = s.lastChild;
      if (h instanceof Ie && h.mark.eq(a.mark))
        h.dom != a.dom && h.setDOM(vr(a.dom)), s = h;
      else {
        if (this.cache.reused.get(a)) {
          let f = ce.get(a.dom);
          f && f.setDOM(vr(a.dom));
        }
        let c = Ie.of(a.mark, a.dom);
        s.append(c), s = c;
      }
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
    }
    let r = ce.get(e.text);
    r && this.cache.reused.set(
      r,
      2
      /* Reused.DOM */
    );
    let o = new si(e.text, e.text.nodeValue);
    o.flags |= 8, s.append(o);
  }
  addInlineWidget(e, t, i) {
    let s = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
    s || this.flushBuffer();
    let r = this.ensureMarks(t, i);
    !s && !(e.flags & 16) && r.append(this.getBuffer(1)), r.append(e), this.pos += e.length, this.afterWidget = e;
  }
  addMark(e, t, i) {
    this.flushBuffer(), this.ensureMarks(t, i).append(e), this.pos += e.length, this.afterWidget = null;
  }
  addBlockWidget(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  continueWidget(e) {
    let t = this.afterWidget || this.lastBlock;
    t.length += e, this.pos += e;
  }
  addLineStart(e, t) {
    var i;
    e || (e = of);
    let s = Di.start(e, t || ((i = this.cache.find(Di)) === null || i === void 0 ? void 0 : i.dom), !!t);
    this.getBlockPos().append(this.lastBlock = this.curLine = s);
  }
  addLine(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  addBreak() {
    this.lastBlock.flags |= 1, this.endLine(), this.pos++;
  }
  addLineStartIfNotCovered(e) {
    this.blockPosCovered() || this.addLineStart(e);
  }
  ensureLine(e) {
    this.curLine || this.addLineStart(e);
  }
  ensureMarks(e, t) {
    var i;
    let s = this.curLine;
    for (let r = e.length - 1; r >= 0; r--) {
      let o = e[r], l;
      if (t > 0 && (l = s.lastChild) && l instanceof Ie && l.mark.eq(o))
        s = l, t--;
      else {
        let a = Ie.of(o, (i = this.cache.find(Ie, (h) => h.mark.eq(o))) === null || i === void 0 ? void 0 : i.dom);
        s.append(a), s = a, t = 0;
      }
    }
    return s;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !ma(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(R.ios && ma(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        Cr,
        0,
        32
        /* TileFlag.After */
      ) || new mi(
        Cr.toDOM(),
        0,
        Cr,
        32
        /* TileFlag.After */
      )), this.curLine = this.afterWidget = null;
    }
  }
  updateBlockWrappers() {
    this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
    for (let e = this.wrappers.length - 1; e >= 0; e--)
      this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
    for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next())
      if (e.to >= this.pos) {
        let t = new Op(e.from, e.to, e.value, e.rank), i = this.wrappers.length;
        for (; i > 0 && (this.wrappers[i - 1].rank - t.rank || this.wrappers[i - 1].to - t.to) < 0; )
          i--;
        this.wrappers.splice(i, 0, t);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var e;
    this.updateBlockWrappers();
    let t = this.root;
    for (let i of this.wrappers) {
      let s = t.lastChild;
      if (i.from < this.pos && s instanceof $t && s.wrapper.eq(i.wrapper))
        t = s;
      else {
        let r = $t.of(i.wrapper, (e = this.cache.find($t, (o) => o.wrapper.eq(i.wrapper))) === null || e === void 0 ? void 0 : e.dom);
        t.append(r), t = r;
      }
    }
    return t;
  }
  blockPosCovered() {
    let e = this.lastBlock;
    return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
  }
  getBuffer(e) {
    let t = 2 | (e < 0 ? 16 : 32), i = this.cache.find(
      As,
      void 0,
      1
      /* Reused.Full */
    );
    return i && (i.flags = t), i || new As(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class Rp {
  constructor(e) {
    this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
  }
  skip(e) {
    this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
  }
  next(e) {
    if (this.textOff == this.text.length) {
      let { value: s, lineBreak: r, done: o } = this.cursor.next(this.skipCount);
      if (this.skipCount = 0, o)
        throw new Error("Ran out of text content when drawing inline views");
      this.text = s;
      let l = this.textOff = Math.min(e, s.length);
      return r ? null : s.slice(0, l);
    }
    let t = Math.min(this.text.length, this.textOff + e), i = this.text.slice(this.textOff, t);
    return this.textOff = t, i;
  }
}
const Ts = [mi, Di, si, Ie, As, $t, Zs];
for (let n = 0; n < Ts.length; n++)
  Ts[n].bucket = n;
class Ep {
  constructor(e) {
    this.view = e, this.buckets = Ts.map(() => []), this.index = Ts.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(e) {
    let t = e.constructor.bucket, i = this.buckets[t];
    i.length < 6 ? i.push(e) : i[
      this.index[t] = (this.index[t] + 1) % 6
      /* C.Bucket */
    ] = e;
  }
  find(e, t, i = 2) {
    let s = e.bucket, r = this.buckets[s], o = this.index[s];
    for (let l = r.length - 1; l >= 0; l--) {
      let a = (l + o) % r.length, h = r[a];
      if ((!t || t(h)) && !this.reused.has(h))
        return r.splice(a, 1), a < o && this.index[s]--, this.reused.set(h, i), h;
    }
    return null;
  }
  findWidget(e, t, i) {
    let s = this.buckets[0];
    if (s.length)
      for (let r = 0, o = 0; ; r++) {
        if (r == s.length) {
          if (o)
            return null;
          o = 1, r = 0;
        }
        let l = s[r];
        if (!this.reused.has(l) && (o == 0 ? l.widget.compare(e) : l.widget.constructor == e.constructor && e.updateDOM(l.dom, this.view)))
          return s.splice(r, 1), r < this.index[0] && this.index[0]--, l.widget == e && l.length == t && (l.flags & 497) == i ? (this.reused.set(
            l,
            1
            /* Reused.Full */
          ), l) : (this.reused.set(
            l,
            2
            /* Reused.DOM */
          ), new mi(l.dom, t, e, l.flags & -498 | i));
      }
  }
  reuse(e) {
    return this.reused.set(
      e,
      1
      /* Reused.Full */
    ), e;
  }
  maybeReuse(e, t = 2) {
    if (!this.reused.has(e))
      return this.reused.set(e, t), e.dom;
  }
  clear() {
    for (let e = 0; e < this.buckets.length; e++)
      this.buckets[e].length = this.index[e] = 0;
  }
}
class Dp {
  constructor(e, t, i, s, r) {
    this.view = e, this.decorations = s, this.disallowBlockEffectsFor = r, this.openWidget = !1, this.openMarks = 0, this.cache = new Ep(e), this.text = new Rp(e.state.doc), this.builder = new _p(this.cache, new Zs(e, e.contentDOM), U.iter(i)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new Tp(t), this.reuseWalker = {
      skip: (o, l, a) => {
        if (this.cache.add(o), o.isComposite())
          return !1;
      },
      enter: (o) => this.cache.add(o),
      leave: () => {
      },
      break: () => {
      }
    };
  }
  run(e, t) {
    let i = t && this.getCompositionContext(t.text);
    for (let s = 0, r = 0, o = 0; ; ) {
      let l = o < e.length ? e[o++] : null, a = l ? l.fromA : this.old.root.length;
      if (a > s) {
        let h = a - s;
        this.preserve(h, !o, !l), s = a, r += h;
      }
      if (!l)
        break;
      t && l.fromA <= t.range.fromA && l.toA >= t.range.toA ? (this.forward(l.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(r, t.range.fromB), this.cache.clear(), this.builder.addComposition(t, i), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, l.toA), this.emit(t.range.toB, l.toB)) : (this.forward(l.fromA, l.toA), this.emit(r, l.toB)), r = l.toB, s = l.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, i) {
    let s = Bp(this.old), r = this.openMarks;
    this.old.advance(e, i ? 1 : -1, {
      skip: (o, l, a) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - l);
          else {
            let h = a > 0 || l < o.length ? mi.of(o.widget, this.view, a - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
            h.flags & 256 ? (h.flags &= -2, this.builder.addBlockWidget(h)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(h, s, r), r = s.length);
          }
        else if (o.isText())
          this.builder.ensureLine(null), !l && a == o.length ? this.builder.addText(o.text, s, r, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(l, a), s, r)), r = s.length;
        else if (o.isLine())
          o.flags &= -2, this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), this.builder.addLine(o);
        else if (o instanceof As)
          this.cache.add(o);
        else if (o instanceof Ie)
          this.builder.ensureLine(null), this.builder.addMark(o, s, r), this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), r = s.length;
        else
          return !1;
        this.openWidget = !1;
      },
      enter: (o) => {
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof Ie && s.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? s.length && (s.length = r = 0) : o instanceof Ie && (s.shift(), r = Math.min(r, s.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let i = null, s = this.builder, r = 0, o = U.spans(this.decorations, e, t, {
      point: (l, a, h, c, f, u) => {
        if (h instanceof di) {
          if (this.disallowBlockEffectsFor[u]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(l).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (r = c.length, f > c.length)
            s.continueWidget(a - l);
          else {
            let d = h.widget || (h.block ? Mi.block : Mi.inline), p = Mp(h), m = this.cache.findWidget(d, a - l, p) || mi.of(d, this.view, a - l, p);
            h.block ? (h.startSide > 0 && s.addLineStartIfNotCovered(i), s.addBlockWidget(m)) : (s.ensureLine(i), s.addInlineWidget(m, c, f));
          }
          i = null;
        } else
          i = Pp(i, h);
        a > l && this.text.skip(a - l);
      },
      span: (l, a, h, c) => {
        for (let f = l; f < a; ) {
          let u = this.text.next(Math.min(512, a - f));
          u == null ? (s.addLineStartIfNotCovered(i), s.addBreak(), f++) : (s.ensureLine(i), s.addText(u, h, f == l ? c : h.length), f += u.length), i = null;
        }
      }
    });
    s.addLineStartIfNotCovered(i), this.openWidget = o > r, this.openMarks = o;
  }
  forward(e, t, i = 1) {
    t - e <= 10 ? this.old.advance(t - e, i, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, i, this.reuseWalker));
  }
  getCompositionContext(e) {
    let t = [], i = null;
    for (let s = e.parentNode; ; s = s.parentNode) {
      let r = ce.get(s);
      if (s == this.view.contentDOM)
        break;
      r instanceof Ie ? t.push(r) : r?.isLine() ? i = r : s.nodeName == "DIV" && !i && s != this.view.contentDOM ? i = new Di(s, of) : t.push(Ie.of(new On({ tagName: s.nodeName.toLowerCase(), attributes: sp(s) }), s));
    }
    return { line: i, marks: t };
  }
}
function ma(n, e) {
  let t = (i) => {
    for (let s of i.children)
      if ((e ? s.isText() : s.length) || t(s))
        return !0;
    return !1;
  };
  return t(n);
}
function Mp(n) {
  let e = n.isReplace ? (n.startSide < 0 ? 64 : 0) | (n.endSide > 0 ? 128 : 0) : n.startSide > 0 ? 32 : 16;
  return n.block && (e |= 256), e;
}
const of = { class: "cm-line" };
function Pp(n, e) {
  let t = e.spec.attributes, i = e.spec.class;
  return !t && !i || (n || (n = { class: "cm-line" }), t && al(t, n), i && (n.class += " " + i)), n;
}
function Bp(n) {
  let e = [];
  for (let t = n.parents.length; t > 1; t--) {
    let i = t == n.parents.length ? n.tile : n.parents[t].tile;
    i instanceof Ie && e.push(i.mark);
  }
  return e;
}
function vr(n) {
  let e = ce.get(n);
  return e && e.setDOM(n.cloneNode()), n;
}
class Mi extends Xs {
  constructor(e) {
    super(), this.tag = e;
  }
  eq(e) {
    return e.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(e) {
    return e.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
Mi.inline = /* @__PURE__ */ new Mi("span");
Mi.block = /* @__PURE__ */ new Mi("div");
const Cr = /* @__PURE__ */ new class extends Xs {
  toDOM() {
    return document.createElement("br");
  }
  get isHidden() {
    return !0;
  }
  get editable() {
    return !0;
  }
}();
class ga {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = te.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new Zs(e, e.contentDOM), this.updateInner([new Xe(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let i = e.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let s = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? s = this.domChanged.newSel.head : !Vp(e.changes, this.hasComposition) && !e.selectionSet && (s = e.state.selection.main.head));
    let r = s > -1 ? Ip(this.view, e.changes, s) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: c, to: f } = this.hasComposition;
      i = new Xe(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(i.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (R.ie || R.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.blockWrappers;
    this.updateDeco();
    let a = Fp(o, this.decorations, e.changes);
    a.length && (i = Xe.extendWithRanges(i, a));
    let h = Hp(l, this.blockWrappers, e.changes);
    return h.length && (i = Xe.extendWithRanges(i, h)), r && !i.some((c) => c.fromA <= r.range.fromA && c.toA >= r.range.toA) && (i = r.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? !1 : (this.updateInner(i, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: i } = this.view;
    i.ignore(() => {
      if (t || e.length) {
        let o = this.tile, l = new Dp(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        this.tile = l.run(e, t), So(o, l.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let r = R.chrome || R.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(r), r && (r.written || i.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let s = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let r of this.tile.children)
        r.isWidget() && r.widget instanceof Ar && s.push(r.dom);
    i.updateGaps(s);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(ef) && (this.editContextFormatting = i.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: i } = this.tile, s = this.view.root.activeElement, r = s == i, o = !r && !(this.view.state.facet(Tt) || i.tabIndex > -1) && sn(i, this.view.observer.selectionRange) && !(s && i.contains(s));
    if (!(r || t || o))
      return;
    let l = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h, c;
    if (a.empty ? c = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), R.gecko && a.empty && !this.hasComposition && Np(h)) {
      let u = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(u, h.node.childNodes[h.offset] || null)), h = c = new ot(u, 0), l = !0;
    }
    let f = this.view.observer.selectionRange;
    (l || !f.focusNode || (!rn(h.node, h.offset, f.anchorNode, f.anchorOffset) || !rn(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, a)) && (this.view.observer.ignore(() => {
      R.android && R.chrome && i.contains(f.focusNode) && Wp(f.focusNode, i) && (i.blur(), i.focus({ preventScroll: !0 }));
      let u = Ei(this.view.root);
      if (u) if (a.empty) {
        if (R.gecko) {
          let d = Lp(h.node, h.offset);
          if (d && d != 3) {
            let p = (d == 1 ? Fc : zc)(h.node, h.offset);
            p && (h = new ot(p.node, p.offset));
          }
        }
        u.collapse(h.node, h.offset), a.bidiLevel != null && u.caretBidiLevel !== void 0 && (u.caretBidiLevel = a.bidiLevel);
      } else if (u.extend) {
        u.collapse(h.node, h.offset);
        try {
          u.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let d = document.createRange();
        a.anchor > a.head && ([h, c] = [c, h]), d.setEnd(c.node, c.offset), d.setStart(h.node, h.offset), u.removeAllRanges(), u.addRange(d);
      }
      o && this.view.root.activeElement == i && (i.blur(), s && s.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new ot(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new ot(f.focusNode, f.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && rn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, i = Ei(e.root), { anchorNode: s, anchorOffset: r } = e.observer.selectionRange;
    if (!i || !t.empty || !t.assoc || !i.modify)
      return;
    let o = this.lineAt(t.head, t.assoc);
    if (!o)
      return;
    let l = o.posAtStart;
    if (t.head == l || t.head == l + o.length)
      return;
    let a = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
    if (!a || !h || a.bottom > h.top)
      return;
    let c = this.domAtPos(t.head + t.assoc, t.assoc);
    i.collapse(c.node, c.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let f = e.observer.selectionRange;
    e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && i.collapse(s, r);
  }
  posFromDOM(e, t) {
    let i = this.tile.nearest(e);
    if (!i)
      return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
    let s = i.posAtStart;
    if (i.isComposite()) {
      let r;
      if (e == i.dom)
        r = i.dom.childNodes[t];
      else {
        let o = Et(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let l = e.parentNode;
          if (l == i.dom)
            break;
          o == 0 && l.firstChild != l.lastChild && (e == l.firstChild ? o = -1 : o = 1), e = l;
        }
        o < 0 ? r = e : r = e.nextSibling;
      }
      if (r == i.dom.firstChild)
        return s;
      for (; r && !ce.get(r); )
        r = r.nextSibling;
      if (!r)
        return s + i.length;
      for (let o = 0, l = s; ; o++) {
        let a = i.children[o];
        if (a.dom == r)
          return l;
        l += a.length + a.breakAfter;
      }
    } else return i.isText() ? e == i.dom ? s + t : s + (t ? i.length : 0) : s;
  }
  domAtPos(e, t) {
    let { tile: i, offset: s } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.domPosFor(e, t) : i.domIn(s, t);
  }
  inlineDOMNearPos(e, t) {
    let i, s = -1, r = !1, o, l = -1, a = !1;
    return this.tile.blockTiles((h, c) => {
      if (h.isWidget()) {
        if (h.flags & 32 && c >= e)
          return !0;
        h.flags & 16 && (r = !0);
      } else {
        let f = c + h.length;
        if (c <= e && (i = h, s = e - c, r = f < e), f >= e && !o && (o = h, l = e - c, a = c > e), c > e && o)
          return !0;
      }
    }), !i && !o ? this.domAtPos(e, t) : (r && o ? i = null : a && i && (o = null), i && t < 0 || !o ? i.domIn(s, t) : o.domIn(l, t));
  }
  coordsAt(e, t) {
    let { tile: i, offset: s } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.widget instanceof Ar ? null : i.coordsInWidget(s, t, !0) : i.coordsIn(s, t);
  }
  lineAt(e, t) {
    let { tile: i } = this.tile.resolveBlock(e, t);
    return i.isLine() ? i : null;
  }
  coordsForChar(e) {
    let { tile: t, offset: i } = this.tile.resolveBlock(e, 1);
    if (!t.isLine())
      return null;
    function s(r, o) {
      if (r.isComposite())
        for (let l of r.children) {
          if (l.length >= o) {
            let a = s(l, o);
            if (a)
              return a;
          }
          if (o -= l.length, o < 0)
            break;
        }
      else if (r.isText() && o < r.length) {
        let l = ve(r.text, o);
        if (l == o)
          return null;
        let a = bn(r.dom, o, l).getClientRects();
        for (let h = 0; h < a.length; h++) {
          let c = a[h];
          if (h == a.length - 1 || c.top < c.bottom && c.left < c.right)
            return c;
        }
      }
      return null;
    }
    return s(t, i);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: i, to: s } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == se.LTR, h = 0, c = (f, u, d) => {
      for (let p = 0; p < f.children.length && !(u > s); p++) {
        let m = f.children[p], g = u + m.length, y = m.dom.getBoundingClientRect(), { height: b } = y;
        if (d && !p && (h += y.top - d.top), m instanceof $t)
          g > i && c(m, u, y);
        else if (u >= i && (h > 0 && t.push(-h), t.push(b + h), h = 0, o)) {
          let x = m.dom.lastChild, v = x ? ls(x) : [];
          if (v.length) {
            let C = v[v.length - 1], T = a ? C.right - y.left : y.right - C.left;
            T > l && (l = T, this.minWidth = r, this.minWidthFrom = u, this.minWidthTo = g);
          }
        }
        d && p == f.children.length - 1 && (h += d.bottom - y.bottom), u = g + m.breakAfter;
      }
    };
    return c(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? se.RTL : se.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let l = 0, a;
        for (let h of o.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let c = ls(h.dom);
          if (c.length != 1)
            return;
          l += c[0].width, a = c[0].height;
        }
        if (l)
          return {
            lineHeight: o.dom.getBoundingClientRect().height,
            charWidth: l / o.length,
            textHeight: a
          };
      }
    });
    if (e)
      return e;
    let t = document.createElement("div"), i, s, r;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let o = ls(t.firstChild)[0];
      i = t.getBoundingClientRect().height, s = o && o.width ? o.width / 27 : 7, r = o && o.height ? o.height : i, t.remove();
    }), { lineHeight: i, charWidth: s, textHeight: r };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let i = 0, s = 0; ; s++) {
      let r = s == t.viewports.length ? null : t.viewports[s], o = r ? r.from - 1 : this.view.state.doc.length;
      if (o > i) {
        let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
        e.push(te.replace({
          widget: new Ar(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!r)
        break;
      i = r.to + 1;
    }
    return te.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(Ys).map((r) => (this.dynamicDecorationMap[e++] = typeof r == "function") ? r(this.view) : r), i = !1, s = this.view.state.facet(pl).map((r, o) => {
      let l = typeof r == "function";
      return l && (i = !0), l ? r(this.view) : r;
    });
    for (s.length && (this.dynamicDecorationMap[e++] = i, t.push(U.join(s))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(nf).map((r) => typeof r == "function" ? r(this.view) : r);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let h = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let h of this.view.state.facet(Zc))
      try {
        if (h(this.view, e.range, e))
          return !0;
      } catch (c) {
        je(this.view.state, c, "scroll handler");
      }
    let { range: t } = e, i = this.coordsAt(t.head, t.empty ? t.assoc : t.head > t.anchor ? -1 : 1), s;
    if (!i)
      return;
    !t.empty && (s = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, s.left),
      top: Math.min(i.top, s.top),
      right: Math.max(i.right, s.right),
      bottom: Math.max(i.bottom, s.bottom)
    });
    let r = ml(this.view), o = {
      left: i.left - r.left,
      top: i.top - r.top,
      right: i.right + r.right,
      bottom: i.bottom + r.bottom
    }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
    lp(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, l), -l), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == se.LTR);
  }
  lineHasWidget(e) {
    let t = (i) => i.isWidget() || i.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    So(this.tile);
  }
}
function So(n, e) {
  let t = e?.get(n);
  if (t != 1) {
    t == null && n.destroy();
    for (let i of n.children)
      So(i, e);
  }
}
function Np(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
function lf(n, e) {
  let t = n.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let i = Fc(t.focusNode, t.focusOffset), s = zc(t.focusNode, t.focusOffset), r = i || s;
  if (s && i && s.node != i.node) {
    let l = ce.get(s.node);
    if (!l || l.isText() && l.text != s.node.nodeValue)
      r = s;
    else if (n.docView.lastCompositionAfterCursor) {
      let a = ce.get(i.node);
      !a || a.isText() && a.text != i.node.nodeValue || (r = s);
    }
  }
  if (n.docView.lastCompositionAfterCursor = r != i, !r)
    return null;
  let o = e - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function Ip(n, e, t) {
  let i = lf(n, t);
  if (!i)
    return null;
  let { node: s, from: r, to: o } = i, l = s.nodeValue;
  if (/[\n\r]/.test(l) || n.state.doc.sliceString(i.from, i.to) != l)
    return null;
  let a = e.invertedDesc;
  return { range: new Xe(a.mapPos(r), a.mapPos(o), r, o), text: s };
}
function Lp(n, e) {
  return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let $p = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    vi(e, t, this.changes);
  }
  comparePoint(e, t) {
    vi(e, t, this.changes);
  }
  boundChange(e) {
    vi(e, e, this.changes);
  }
};
function Fp(n, e, t) {
  let i = new $p();
  return U.compare(n, e, t, i), i.changes;
}
class zp {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    vi(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    vi(e, e, this.changes);
  }
}
function Hp(n, e, t) {
  let i = new zp();
  return U.compare(n, e, t, i), i.changes;
}
function Wp(n, e) {
  for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function Vp(n, e) {
  let t = !1;
  return e && n.iterChangedRanges((i, s) => {
    i < e.to && s > e.from && (t = !0);
  }), t;
}
class Ar extends Xs {
  constructor(e) {
    super(), this.height = e;
  }
  toDOM() {
    let e = document.createElement("div");
    return e.className = "cm-gap", this.updateDOM(e), e;
  }
  eq(e) {
    return e.height == this.height;
  }
  updateDOM(e) {
    return e.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function jp(n, e, t = 1) {
  let i = n.charCategorizer(e), s = n.doc.lineAt(e), r = e - s.from;
  if (s.length == 0)
    return S.cursor(e);
  r == 0 ? t = 1 : r == s.length && (t = -1);
  let o = r, l = r;
  t < 0 ? o = ve(s.text, r, !1) : l = ve(s.text, r);
  let a = i(s.text.slice(o, l));
  for (; o > 0; ) {
    let h = ve(s.text, o, !1);
    if (i(s.text.slice(h, o)) != a)
      break;
    o = h;
  }
  for (; l < s.length; ) {
    let h = ve(s.text, l);
    if (i(s.text.slice(l, h)) != a)
      break;
    l = h;
  }
  return S.range(o + s.from, l + s.from);
}
function qp(n, e, t, i, s) {
  let r = Math.round((i - e.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
    let l = n.viewState.heightOracle.textHeight, a = Math.floor((s - t.top - (n.defaultLineHeight - l) * 0.5) / l);
    r += a * n.viewState.heightOracle.lineLength;
  }
  let o = n.state.sliceDoc(t.from, t.to);
  return t.from + Yd(o, r, n.state.tabSize);
}
function Up(n, e, t) {
  let i = n.lineBlockAt(e);
  if (Array.isArray(i.type)) {
    let s;
    for (let r of i.type) {
      if (r.from > e)
        break;
      if (!(r.to < e)) {
        if (r.from < e && r.to > e)
          return r;
        (!s || r.type == Ze.Text && (s.type != r.type || (t < 0 ? r.from < e : r.to > e))) && (s = r);
      }
    }
    return s || i;
  }
  return i;
}
function Kp(n, e, t, i) {
  let s = Up(n, e.head, e.assoc || -1), r = !i || s.type != Ze.Text || !(n.lineWrapping || s.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head);
  if (r) {
    let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(s.from), a = n.posAtCoords({
      x: t == (l == se.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (a != null)
      return S.cursor(a, t ? -1 : 1);
  }
  return S.cursor(t ? s.to : s.from, t ? -1 : 1);
}
function ya(n, e, t, i) {
  let s = n.state.doc.lineAt(e.head), r = n.bidiSpans(s), o = n.textDirectionAt(s.from);
  for (let l = e, a = null; ; ) {
    let h = kp(s, r, o, l, t), c = qc;
    if (!h) {
      if (s.number == (t ? n.state.doc.lines : 1))
        return l;
      c = `
`, s = n.state.doc.line(s.number + (t ? 1 : -1)), r = n.bidiSpans(s), h = n.visualLineSide(s, !t);
    }
    if (a) {
      if (!a(c))
        return l;
    } else {
      if (!i)
        return h;
      a = i(c);
    }
    l = h;
  }
}
function Gp(n, e, t) {
  let i = n.state.charCategorizer(e), s = i(t);
  return (r) => {
    let o = i(r);
    return s == Je.Space && (s = o), s == o;
  };
}
function Jp(n, e, t, i) {
  let s = e.head, r = t ? 1 : -1;
  if (s == (t ? n.state.doc.length : 0))
    return S.cursor(s, e.assoc);
  let o = e.goalColumn, l, a = n.contentDOM.getBoundingClientRect(), h = n.coordsAtPos(s, e.assoc || -1), c = n.documentTop;
  if (h)
    o == null && (o = h.left - a.left), l = r < 0 ? h.top : h.bottom;
  else {
    let p = n.viewState.lineBlockAt(s);
    o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (s - p.from))), l = (r < 0 ? p.top : p.bottom) + c;
  }
  let f = a.left + o, u = i ?? n.viewState.heightOracle.textHeight >> 1, d = vo(n, { x: f, y: l + u * r }, !1, r);
  return S.cursor(d.pos, d.assoc, void 0, o);
}
function on(n, e, t) {
  for (; ; ) {
    let i = 0;
    for (let s of n)
      s.between(e - 1, e + 1, (r, o, l) => {
        if (e > r && e < o) {
          let a = i || t || (e - r < o - e ? -1 : 1);
          e = a < 0 ? r : o, i = a;
        }
      });
    if (!i)
      return e;
  }
}
function af(n, e) {
  let t = null;
  for (let i = 0; i < e.ranges.length; i++) {
    let s = e.ranges[i], r = null;
    if (s.empty) {
      let o = on(n, s.from, 0);
      o != s.from && (r = S.cursor(o, -1));
    } else {
      let o = on(n, s.from, -1), l = on(n, s.to, 1);
      (o != s.from || l != s.to) && (r = S.range(s.from == s.anchor ? o : l, s.from == s.head ? o : l));
    }
    r && (t || (t = e.ranges.slice()), t[i] = r);
  }
  return t ? S.create(t, e.mainIndex) : e;
}
function Tr(n, e, t) {
  let i = on(n.state.facet(Rn).map((s) => s(n)), t.from, e.head > t.from ? -1 : 1);
  return i == t.from ? t : S.cursor(i, i < t.from ? 1 : -1);
}
class xt {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function vo(n, e, t, i) {
  let s = n.contentDOM.getBoundingClientRect(), r = s.top + n.viewState.paddingTop, { x: o, y: l } = e, a = l - r, h;
  for (; ; ) {
    if (a < 0)
      return new xt(0, 1);
    if (a > n.viewState.docHeight)
      return new xt(n.state.doc.length, -1);
    if (h = n.elementAtHeight(a), i == null)
      break;
    if (h.type == Ze.Text) {
      if (i < 0 ? h.to < n.viewport.from : h.from > n.viewport.to)
        break;
      let u = n.docView.coordsAt(i < 0 ? h.from : h.to, i);
      if (u && (i < 0 ? u.top <= a + r : u.bottom >= a + r))
        break;
    }
    let f = n.viewState.heightOracle.textHeight / 2;
    a = i > 0 ? h.bottom + f : h.top - f;
  }
  if (n.viewport.from >= h.to || n.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == Ze.Text) {
      let f = qp(n, s, h, o, l);
      return new xt(f, f == h.from ? 1 : -1);
    }
  }
  if (h.type != Ze.Text)
    return a < (h.top + h.bottom) / 2 ? new xt(h.from, 1) : new xt(h.to, -1);
  let c = n.docView.lineAt(h.from, 2);
  return (!c || c.length != h.length) && (c = n.docView.lineAt(h.from, -2)), hf(n, c, h.from, o, l);
}
function hf(n, e, t, i, s) {
  let r = -1, o = null, l = 1e9, a = 1e9, h = s, c = s, f = (u, d) => {
    for (let p = 0; p < u.length; p++) {
      let m = u[p];
      if (m.top == m.bottom)
        continue;
      let g = m.left > i ? m.left - i : m.right < i ? i - m.right : 0, y = m.top > s ? m.top - s : m.bottom < s ? s - m.bottom : 0;
      m.top <= c && m.bottom >= h && (h = Math.min(m.top, h), c = Math.max(m.bottom, c), y = 0), (r < 0 || (y - a || g - l) < 0) && (r >= 0 && a && l < g && o.top <= c - 2 && o.bottom >= h + 2 ? a = 0 : (r = d, l = g, a = y, o = m));
    }
  };
  if (e.isText()) {
    for (let d = 0; d < e.length; ) {
      let p = ve(e.text, d);
      if (f(bn(e.dom, d, p).getClientRects(), d), !l && !a)
        break;
      d = p;
    }
    return i > (o.left + o.right) / 2 == (ba(n, r + t) == se.LTR) ? new xt(t + ve(e.text, r), -1) : new xt(t + r, 1);
  } else {
    if (!e.length)
      return new xt(t, 1);
    for (let m = 0; m < e.children.length; m++) {
      let g = e.children[m];
      if (g.flags & 48)
        continue;
      let y = (g.dom.nodeType == 1 ? g.dom : bn(g.dom, 0, g.length)).getClientRects();
      if (f(y, m), !l && !a)
        break;
    }
    let u = e.children[r], d = e.posBefore(u, t);
    return u.isComposite() || u.isText() ? hf(n, u, d, Math.max(o.left, Math.min(o.right, i)), s) : i > (o.left + o.right) / 2 == (ba(n, r + t) == se.LTR) ? new xt(d + u.length, -1) : new xt(d, 1);
  }
}
function ba(n, e) {
  let t = n.state.doc.lineAt(e);
  return n.bidiSpans(t)[Ot.find(n.bidiSpans(t), e - t.from, -1, 1)].dir;
}
const Gi = "￿";
class Xp {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(q.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Gi;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let i = e.parentNode;
    for (let s = e; ; ) {
      this.findPointBefore(i, s);
      let r = this.text.length;
      this.readNode(s);
      let o = ce.get(s), l = s.nextSibling;
      if (l == t) {
        o?.breakAfter && !l && i != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = ce.get(l);
      (o && a ? o.breakAfter : (o ? o.breakAfter : Ss(s)) || Ss(l) && (s.nodeName != "BR" || o?.isWidget()) && this.text.length > r) && !Qp(l, t) && this.lineBreak(), s = l;
    }
    return this.findPointBefore(i, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let i of this.points)
      i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
    for (let i = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, l;
      if (this.lineSeparator ? (r = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = s.exec(t)) && (r = l.index, o = l[0].length), this.append(t.slice(i, r < 0 ? t.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
      i = r + o;
    }
  }
  readNode(e) {
    let t = ce.get(e), i = t && t.overrideDOMText;
    if (i != null) {
      this.findPointInside(e, i.length);
      for (let s = i.iter(); !s.next().done; )
        s.lineBreak ? this.lineBreak() : this.append(s.value);
    } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let i of this.points)
      i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let i of this.points)
      (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (Yp(e, i.node, i.offset) ? t : 0));
  }
}
function Yp(n, e, t) {
  for (; ; ) {
    if (!e || t < Et(e))
      return !1;
    if (e == n)
      return !0;
    t = Vt(e) + 1, e = e.parentNode;
  }
}
function Qp(n, e) {
  let t;
  for (; !(n == e || !n); n = n.nextSibling) {
    let i = ce.get(n);
    if (!i?.isWidget())
      return !1;
    i && (t || (t = [])).push(i);
  }
  if (t)
    for (let i of t) {
      let s = i.overrideDOMText;
      if (s?.length)
        return !1;
    }
  return !0;
}
class ka {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class Zp {
  constructor(e, t, i, s) {
    this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: r, impreciseAnchor: o } = e.docView;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = cf(e.docView.tile, t, i, 0))) {
      let l = r || o ? [] : tm(e), a = new Xp(l, e);
      a.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = a.text, this.newSel = im(l, this.bounds.from);
    } else {
      let l = e.observer.selectionRange, a = r && r.node == l.focusNode && r.offset == l.focusOffset || !yo(e.contentDOM, l.focusNode) ? e.state.selection.main.head : e.docView.posFromDOM(l.focusNode, l.focusOffset), h = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !yo(e.contentDOM, l.anchorNode) ? e.state.selection.main.anchor : e.docView.posFromDOM(l.anchorNode, l.anchorOffset), c = e.viewport;
      if ((R.ios || R.chrome) && e.state.selection.main.empty && a != h && (c.from > 0 || c.to < e.state.doc.length)) {
        let f = Math.min(a, h), u = Math.max(a, h), d = c.from - f, p = c.to - u;
        (d == 0 || d == 1 || f == 0) && (p == 0 || p == -1 || u == e.state.doc.length) && (a = 0, h = e.state.doc.length);
      }
      e.inputState.composing > -1 && e.state.selection.ranges.length > 1 ? this.newSel = e.state.selection.replaceRange(S.range(h, a)) : this.newSel = S.single(h, a);
    }
  }
}
function cf(n, e, t, i) {
  if (n.isComposite()) {
    let s = -1, r = -1, o = -1, l = -1;
    for (let a = 0, h = i, c = i; a < n.children.length; a++) {
      let f = n.children[a], u = h + f.length;
      if (h < e && u > t)
        return cf(f, e, t, h);
      if (u >= e && s == -1 && (s = a, r = h), h > t && f.dom.parentNode == n.dom) {
        o = a, l = c;
        break;
      }
      c = u, h = u + f.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? i + n.length : l,
      startDOM: (s ? n.children[s - 1].dom.nextSibling : null) || n.dom.firstChild,
      endDOM: o < n.children.length && o >= 0 ? n.children[o].dom : null
    };
  } else return n.isText() ? { from: i, to: i + n.length, startDOM: n.dom, endDOM: n.dom.nextSibling } : null;
}
function ff(n, e) {
  let t, { newSel: i } = e, s = n.state.selection.main, r = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: o, to: l } = e.bounds, a = s.from, h = null;
    (r === 8 || R.android && e.text.length < l - o) && (a = s.to, h = "end");
    let c = uf(n.state.doc.sliceString(o, l, Gi), e.text, a - o, h);
    c && (R.chrome && r == 13 && c.toB == c.from + 2 && e.text.slice(c.from, c.toB) == Gi + Gi && c.toB--, t = {
      from: o + c.from,
      to: o + c.toA,
      insert: V.of(e.text.slice(c.from, c.toB).split(Gi))
    });
  } else i && (!n.hasFocus && n.state.facet(Tt) || Os(i, s)) && (i = null);
  if (!t && !i)
    return !1;
  if (!t && e.typeOver && !s.empty && i && i.main.empty ? t = { from: s.from, to: s.to, insert: n.state.doc.slice(s.from, s.to) } : (R.mac || R.android) && t && t.from == t.to && t.from == s.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = S.single(i.main.anchor - 1, i.main.head - 1)), t = { from: t.from, to: t.to, insert: V.of([t.insert.toString().replace(".", " ")]) }) : t && t.from >= s.from && t.to <= s.to && (t.from != s.from || t.to != s.to) && s.to - s.from - (t.to - t.from) <= 4 ? t = {
    from: s.from,
    to: s.to,
    insert: n.state.doc.slice(s.from, t.from).append(t.insert).append(n.state.doc.slice(t.to, s.to))
  } : n.state.doc.lineAt(s.from).to < s.to && n.docView.lineHasWidget(s.to) && n.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: s.from,
    to: s.to,
    insert: n.state.toText(n.inputState.insertingText)
  } : R.chrome && t && t.from == t.to && t.from == s.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = S.single(i.main.anchor - 1, i.main.head - 1)), t = { from: s.from, to: s.to, insert: V.of([" "]) }), t)
    return gl(n, t, i, r);
  if (i && !Os(i, s)) {
    let o = !1, l = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (o = !0), l = n.inputState.lastSelectionOrigin, l == "select.pointer" && (i = af(n.state.facet(Rn).map((a) => a(n)), i))), n.dispatch({ selection: i, scrollIntoView: o, userEvent: l }), !0;
  } else
    return !1;
}
function gl(n, e, t, i = -1) {
  if (R.ios && n.inputState.flushIOSKey(e))
    return !0;
  let s = n.state.selection.main;
  if (R.android && (e.to == s.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == s.from || e.from == s.from - 1 && n.state.sliceDoc(e.from, s.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && Ci(n.contentDOM, "Enter", 13) || (e.from == s.from - 1 && e.to == s.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > s.head) && Ci(n.contentDOM, "Backspace", 8) || e.from == s.from && e.to == s.to + 1 && e.insert.length == 0 && Ci(n.contentDOM, "Delete", 46)))
    return !0;
  let r = e.insert.toString();
  n.inputState.composing >= 0 && n.inputState.composing++;
  let o, l = () => o || (o = em(n, e, t));
  return n.state.facet(Xc).some((a) => a(n, e.from, e.to, r, l)) || n.dispatch(l()), !0;
}
function em(n, e, t) {
  let i, s = n.state, r = s.selection.main, o = -1;
  if (e.from == e.to && e.from < r.from || e.from > r.to) {
    let a = e.from < r.from ? -1 : 1, h = a < 0 ? r.from : r.to, c = on(s.facet(Rn).map((f) => f(n)), h, a);
    e.from == c && (o = c);
  }
  if (o > -1)
    i = {
      changes: e,
      selection: S.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= r.from && e.to <= r.to && e.to - e.from >= (r.to - r.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && n.inputState.composing < 0) {
    let a = r.from < e.from ? s.sliceDoc(r.from, e.from) : "", h = r.to > e.to ? s.sliceDoc(e.to, r.to) : "";
    i = s.replaceSelection(n.state.toText(a + e.insert.sliceString(0, void 0, n.state.lineBreak) + h));
  } else {
    let a = s.changes(e), h = t && t.main.to <= a.newLength ? t.main : void 0;
    if (s.selection.ranges.length > 1 && (n.inputState.composing >= 0 || n.inputState.compositionPendingChange) && e.to <= r.to + 10 && e.to >= r.to - 10) {
      let c = n.state.sliceDoc(e.from, e.to), f, u = t && lf(n, t.main.head);
      if (u) {
        let p = e.insert.length - (e.to - e.from);
        f = { from: u.from, to: u.to - p };
      } else
        f = n.state.doc.lineAt(r.head);
      let d = r.to - e.to;
      i = s.changeByRange((p) => {
        if (p.from == r.from && p.to == r.to)
          return { changes: a, range: h || p.map(a) };
        let m = p.to - d, g = m - c.length;
        if (n.state.sliceDoc(g, m) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        m >= f.from && g <= f.to)
          return { range: p };
        let y = s.changes({ from: g, to: m, insert: e.insert }), b = p.to - r.to;
        return {
          changes: y,
          range: h ? S.range(Math.max(0, h.anchor + b), Math.max(0, h.head + b)) : p.map(y)
        };
      });
    } else
      i = {
        changes: a,
        selection: h && s.selection.replaceRange(h)
      };
  }
  let l = "input.type";
  return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, l += ".compose", n.inputState.compositionFirstChange && (l += ".start", n.inputState.compositionFirstChange = !1)), s.update(i, { userEvent: l, scrollIntoView: !0 });
}
function uf(n, e, t, i) {
  let s = Math.min(n.length, e.length), r = 0;
  for (; r < s && n.charCodeAt(r) == e.charCodeAt(r); )
    r++;
  if (r == s && n.length == e.length)
    return null;
  let o = n.length, l = e.length;
  for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == e.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let a = Math.max(0, r - Math.min(o, l));
    t -= o + a - r;
  }
  if (o < r && n.length < e.length) {
    let a = t <= r && t >= o ? r - t : 0;
    r -= a, l = r + (l - o), o = r;
  } else if (l < r) {
    let a = t <= r && t >= l ? r - t : 0;
    r -= a, o = r + (o - l), l = r;
  }
  return { from: r, toA: o, toB: l };
}
function tm(n) {
  let e = [];
  if (n.root.activeElement != n.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: i, focusNode: s, focusOffset: r } = n.observer.selectionRange;
  return t && (e.push(new ka(t, i)), (s != t || r != i) && e.push(new ka(s, r))), e;
}
function im(n, e) {
  if (n.length == 0)
    return null;
  let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
  return t > -1 && i > -1 ? S.single(t + e, i + e) : null;
}
function Os(n, e) {
  return e.head == n.main.head && e.anchor == n.main.anchor;
}
class nm {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, R.safari && e.contentDOM.addEventListener("input", () => null), R.gecko && bm(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !fm(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
  }
  runHandlers(e, t) {
    let i = this.handlers[e];
    if (i) {
      for (let s of i.observers)
        s(this.view, t);
      for (let s of i.handlers) {
        if (t.defaultPrevented)
          break;
        if (s(this.view, t)) {
          t.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(e) {
    let t = sm(e), i = this.handlers, s = this.view.contentDOM;
    for (let r in t)
      if (r != "scroll") {
        let o = !t[r].handlers.length, l = i[r];
        l && o != !l.handlers.length && (s.removeEventListener(r, this.handleEvent), l = null), l || s.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in i)
      r != "scroll" && !t[r] && s.removeEventListener(r, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && pf.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), R.android && R.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    let t;
    return R.ios && !e.synthetic && !e.altKey && !e.metaKey && ((t = df.find((i) => i.keyCode == e.keyCode)) && !e.ctrlKey || rm.indexOf(e.key) > -1 && e.ctrlKey && !e.shiftKey) ? (this.pendingIOSKey = t || e, setTimeout(() => this.flushIOSKey(), 250), !0) : (e.keyCode != 229 && this.view.observer.forceFlush(), !1);
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, Ci(this.view.contentDOM, t.key, t.keyCode, t instanceof KeyboardEvent ? t : void 0));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : R.safari && !R.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
  }
  startMouseSelection(e) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
  }
  update(e) {
    this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function xa(n, e) {
  return (t, i) => {
    try {
      return e.call(n, i, t);
    } catch (s) {
      je(t.state, s);
    }
  };
}
function sm(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(i) {
    return e[i] || (e[i] = { observers: [], handlers: [] });
  }
  for (let i of n) {
    let s = i.spec, r = s && s.plugin.domEventHandlers, o = s && s.plugin.domEventObservers;
    if (r)
      for (let l in r) {
        let a = r[l];
        a && t(l).handlers.push(xa(i.value, a));
      }
    if (o)
      for (let l in o) {
        let a = o[l];
        a && t(l).observers.push(xa(i.value, a));
      }
  }
  for (let i in ht)
    t(i).handlers.push(ht[i]);
  for (let i in nt)
    t(i).observers.push(nt[i]);
  return e;
}
const df = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], rm = "dthko", pf = [16, 17, 18, 20, 91, 92, 224, 225], Vn = 6;
function jn(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function om(n, e) {
  return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
}
class lm {
  constructor(e, t, i, s) {
    this.view = e, this.startEvent = t, this.style = i, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = ap(e.contentDOM), this.atoms = e.state.facet(Rn).map((o) => o(e));
    let r = e.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(q.allowMultipleSelections) && am(e, t), this.dragging = cm(e, t) && yf(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && om(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, i = 0, s = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let a = ml(this.view);
    e.clientX - a.left <= s + Vn ? t = -jn(s - e.clientX) : e.clientX + a.right >= o - Vn && (t = jn(e.clientX - o)), e.clientY - a.top <= r + Vn ? i = -jn(r - e.clientY) : e.clientY + a.bottom >= l - Vn && (i = jn(e.clientY - l)), this.setScrollSpeed(t, i);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(e, t) {
    this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: e, y: t } = this.scrollSpeed;
    e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
  }
  select(e) {
    let { view: t } = this, i = af(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !i.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function am(n, e) {
  let t = n.state.facet(Uc);
  return t.length ? t[0](e) : R.mac ? e.metaKey : e.ctrlKey;
}
function hm(n, e) {
  let t = n.state.facet(Kc);
  return t.length ? t[0](e) : R.mac ? !e.altKey : !e.ctrlKey;
}
function cm(n, e) {
  let { main: t } = n.state.selection;
  if (t.empty)
    return !1;
  let i = Ei(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let s = i.getRangeAt(0).getClientRects();
  for (let r = 0; r < s.length; r++) {
    let o = s[r];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function fm(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, i; t != n.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (i = ce.get(t)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const ht = /* @__PURE__ */ Object.create(null), nt = /* @__PURE__ */ Object.create(null), mf = R.ie && R.ie_version < 15 || R.ios && R.webkit_version < 604;
function um(n) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    n.focus(), t.remove(), gf(n, t.value);
  }, 50);
}
function er(n, e, t) {
  for (let i of n.facet(e))
    t = i(t, n);
  return t;
}
function gf(n, e) {
  e = er(n.state, fl, e);
  let { state: t } = n, i, s = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
  if (Co != null && t.selection.ranges.every((a) => a.empty) && Co == r.toString()) {
    let a = -1;
    i = t.changeByRange((h) => {
      let c = t.doc.lineAt(h.from);
      if (c.from == a)
        return { range: h };
      a = c.from;
      let f = t.toText((o ? r.line(s++).text : e) + t.lineBreak);
      return {
        changes: { from: c.from, insert: f },
        range: S.cursor(h.from + f.length)
      };
    });
  } else o ? i = t.changeByRange((a) => {
    let h = r.line(s++);
    return {
      changes: { from: a.from, to: a.to, insert: h.text },
      range: S.cursor(a.from + h.length)
    };
  }) : i = t.replaceSelection(r);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
nt.scroll = (n) => {
  n.inputState.lastScrollTop = n.scrollDOM.scrollTop, n.inputState.lastScrollLeft = n.scrollDOM.scrollLeft;
};
ht.keydown = (n, e) => (n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), !1);
nt.touchstart = (n, e) => {
  n.inputState.lastTouchTime = Date.now(), n.inputState.setSelectionOrigin("select.pointer");
};
nt.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
ht.mousedown = (n, e) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let i of n.state.facet(Gc))
    if (t = i(n, e), t)
      break;
  if (!t && e.button == 0 && (t = pm(n, e)), t) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new lm(n, e, t, i)), i && n.observer.ignore(() => {
      Lc(n.contentDOM);
      let r = n.root.activeElement;
      r && !r.contains(n.contentDOM) && r.blur();
    });
    let s = n.inputState.mouseSelection;
    if (s)
      return s.start(e), s.dragging === !1;
  } else
    n.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function wa(n, e, t, i) {
  if (i == 1)
    return S.cursor(e, t);
  if (i == 2)
    return jp(n.state, e, t);
  {
    let s = n.docView.lineAt(e, t), r = n.state.doc.lineAt(s ? s.posAtEnd : e), o = s ? s.posAtStart : r.from, l = s ? s.posAtEnd : r.to;
    return l < n.state.doc.length && l == r.to && l++, S.range(o, l);
  }
}
const dm = R.ie && R.ie_version <= 11;
let Sa = null, va = 0, Ca = 0;
function yf(n) {
  if (!dm)
    return n.detail;
  let e = Sa, t = Ca;
  return Sa = n, Ca = Date.now(), va = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (va + 1) % 3 : 1;
}
function pm(n, e) {
  let t = n.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), i = yf(e), s = n.state.selection;
  return {
    update(r) {
      r.docChanged && (t.pos = r.changes.mapPos(t.pos), s = s.map(r.changes));
    },
    get(r, o, l) {
      let a = n.posAndSideAtCoords({ x: r.clientX, y: r.clientY }, !1), h, c = wa(n, a.pos, a.assoc, i);
      if (t.pos != a.pos && !o) {
        let f = wa(n, t.pos, t.assoc, i), u = Math.min(f.from, c.from), d = Math.max(f.to, c.to);
        c = u < c.from ? S.range(u, d) : S.range(d, u);
      }
      return o ? s.replaceRange(s.main.extend(c.from, c.to)) : l && i == 1 && s.ranges.length > 1 && (h = mm(s, a.pos)) ? h : l ? s.addRange(c) : S.create([c]);
    }
  };
}
function mm(n, e) {
  for (let t = 0; t < n.ranges.length; t++) {
    let { from: i, to: s } = n.ranges[t];
    if (i <= e && s >= e)
      return S.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
  }
  return null;
}
ht.dragstart = (n, e) => {
  let { selection: { main: t } } = n.state;
  if (e.target.draggable) {
    let s = n.docView.tile.nearest(e.target);
    if (s && s.isWidget()) {
      let r = s.posAtStart, o = r + s.length;
      (r >= t.to || o <= t.from) && (t = S.range(r, o));
    }
  }
  let { inputState: i } = n;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", er(n.state, ul, n.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
ht.dragend = (n) => (n.inputState.draggedContent = null, !1);
function Aa(n, e, t, i) {
  if (t = er(n.state, fl, t), !t)
    return;
  let s = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: r } = n.inputState, o = i && r && hm(n, e) ? { from: r.from, to: r.to } : null, l = { from: s, insert: t }, a = n.state.changes(o ? [o, l] : l);
  n.focus(), n.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(s, -1), head: a.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), n.inputState.draggedContent = null;
}
ht.drop = (n, e) => {
  if (!e.dataTransfer)
    return !1;
  if (n.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let i = Array(t.length), s = 0, r = () => {
      ++s == t.length && Aa(n, e, i.filter((o) => o != null).join(n.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let l = new FileReader();
      l.onerror = r, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), r();
      }, l.readAsText(t[o]);
    }
    return !0;
  } else {
    let i = e.dataTransfer.getData("Text");
    if (i)
      return Aa(n, e, i, !0), !0;
  }
  return !1;
};
ht.paste = (n, e) => {
  if (n.state.readOnly)
    return !0;
  n.observer.flush();
  let t = mf ? null : e.clipboardData;
  return t ? (gf(n, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (um(n), !1);
};
function gm(n, e) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let i = t.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function ym(n) {
  let e = [], t = [], i = !1;
  for (let s of n.selection.ranges)
    s.empty || (e.push(n.sliceDoc(s.from, s.to)), t.push(s));
  if (!e.length) {
    let s = -1;
    for (let { from: r } of n.selection.ranges) {
      let o = n.doc.lineAt(r);
      o.number > s && (e.push(o.text), t.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), s = o.number;
    }
    i = !0;
  }
  return { text: er(n, ul, e.join(n.lineBreak)), ranges: t, linewise: i };
}
let Co = null;
ht.copy = ht.cut = (n, e) => {
  let t = Ei(n.root);
  if (t && !sn(n.contentDOM, t))
    return !1;
  let { text: i, ranges: s, linewise: r } = ym(n.state);
  if (!i && !r)
    return !1;
  Co = r ? i : null, e.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: s,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let o = mf ? null : e.clipboardData;
  return o ? (o.clearData(), o.setData("text/plain", i), !0) : (gm(n, i), !1);
};
const bf = /* @__PURE__ */ Dt.define();
function kf(n, e) {
  let t = [];
  for (let i of n.facet(Yc)) {
    let s = i(n, e);
    s && t.push(s);
  }
  return t.length ? n.update({ effects: t, annotations: bf.of(!0) }) : null;
}
function xf(n) {
  setTimeout(() => {
    let e = n.hasFocus;
    if (e != n.inputState.notifiedFocused) {
      let t = kf(n.state, e);
      t ? n.dispatch(t) : n.update([]);
    }
  }, 10);
}
nt.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), xf(n);
};
nt.blur = (n) => {
  n.observer.clearSelectionRange(), xf(n);
};
nt.compositionstart = nt.compositionupdate = (n) => {
  n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0));
};
nt.compositionend = (n) => {
  n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, R.chrome && R.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50));
};
nt.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
ht.beforeinput = (n, e) => {
  var t, i;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (n.inputState.insertingText = e.data, n.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && n.observer.editContext) {
    let r = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (r && o.length) {
      let l = o[0], a = n.posAtDOM(l.startContainer, l.startOffset), h = n.posAtDOM(l.endContainer, l.endOffset);
      return gl(n, { from: a, to: h, insert: n.state.toText(r) }, null), !0;
    }
  }
  let s;
  if (R.chrome && R.android && (s = df.find((r) => r.inputType == e.inputType)) && (n.observer.delayAndroidKey(s.key, s.keyCode), s.key == "Backspace" || s.key == "Delete")) {
    let r = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
  return R.ios && e.inputType == "deleteContentForward" && n.observer.flushSoon(), R.safari && e.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => nt.compositionend(n, e), 20), !1;
};
const Ta = /* @__PURE__ */ new Set();
function bm(n) {
  Ta.has(n) || (Ta.add(n), n.addEventListener("copy", () => {
  }), n.addEventListener("cut", () => {
  }));
}
const Oa = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let Pi = !1;
function _a() {
  Pi = !1;
}
class km {
  constructor(e) {
    this.lineWrapping = e, this.doc = V.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(e, t) {
    let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return Oa.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      s < 0 ? i++ : this.heightSamples[Math.floor(s * 10)] || (t = !0, this.heightSamples[Math.floor(s * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, i, s, r, o) {
    let l = Oa.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != l || Math.abs(i - this.charWidth) > 0.1;
    if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = i, this.textHeight = s, this.lineLength = r, a) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let c = o[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return a;
  }
}
class xm {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class rt {
  /**
  @internal
  */
  constructor(e, t, i, s, r) {
    this.from = e, this.length = t, this.top = i, this.height = s, this._content = r;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? Ze.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof di ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(e) {
    let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
    return new rt(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var Q = /* @__PURE__ */ function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
}(Q || (Q = {}));
const as = 1e-3;
class De {
  constructor(e, t, i = 2) {
    this.length = e, this.height = t, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e) {
    this.height != e && (Math.abs(this.height - e) > as && (Pi = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, i) {
    return De.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, i, s) {
    let r = this, o = i.doc;
    for (let l = s.length - 1; l >= 0; l--) {
      let { fromA: a, toA: h, fromB: c, toB: f } = s[l], u = r.lineAt(a, Q.ByPosNoHeight, i.setDoc(t), 0, 0), d = u.to >= h ? u : r.lineAt(h, Q.ByPosNoHeight, i, 0, 0);
      for (f += d.to - h, h = d.to; l > 0 && u.from <= s[l - 1].toA; )
        a = s[l - 1].fromA, c = s[l - 1].fromB, l--, a < u.from && (u = r.lineAt(a, Q.ByPosNoHeight, i, 0, 0));
      c += u.from - a, a = u.from;
      let p = yl.build(i.setDoc(o), e, c, f);
      r = _s(r, r.replace(a, h, p));
    }
    return r.updateHeight(i, 0);
  }
  static empty() {
    return new We(0, 0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, i = e.length, s = 0, r = 0;
    for (; ; )
      if (t == i)
        if (s > r * 2) {
          let l = e[t - 1];
          l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), i += 1 + l.break, s -= l.size;
        } else if (r > s * 2) {
          let l = e[i];
          l.break ? e.splice(i, 1, l.left, null, l.right) : e.splice(i, 1, l.left, l.right), i += 2 + l.break, r -= l.size;
        } else
          break;
      else if (s < r) {
        let l = e[t++];
        l && (s += l.size);
      } else {
        let l = e[--i];
        l && (r += l.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new Sm(De.of(e.slice(0, t)), o, De.of(e.slice(i)));
  }
}
function _s(n, e) {
  return n == e ? n : (n.constructor != e.constructor && (Pi = !0), e);
}
De.prototype.size = 1;
const wm = /* @__PURE__ */ te.replace({});
class wf extends De {
  constructor(e, t, i) {
    super(e, t), this.deco = i, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new rt(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, i, s) {
    return this.spaceAbove && e < i + this.spaceAbove ? new rt(s, 0, i, this.spaceAbove, wm) : this.mainBlock(i, s);
  }
  lineAt(e, t, i, s, r) {
    let o = this.mainBlock(s, r);
    return this.spaceAbove ? this.blockAt(0, i, s, r).join(o) : o;
  }
  forEachLine(e, t, i, s, r, o) {
    e <= r + this.length && t >= r && o(this.lineAt(0, Q.ByPos, i, s, r));
  }
  setMeasuredHeight(e) {
    let t = e.heights[e.index++];
    t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
  }
  updateHeight(e, t = 0, i = !1, s) {
    return s && s.from <= t && s.more && this.setMeasuredHeight(s), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class We extends wf {
  constructor(e, t, i) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
  }
  mainBlock(e, t) {
    return new rt(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, i) {
    let s = i[0];
    return i.length == 1 && (s instanceof We || s instanceof xe && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof xe ? s = new We(s.length, this.height, this.spaceAbove) : s.height = this.height, this.outdated || (s.outdated = !1), s) : De.of(i);
  }
  updateHeight(e, t = 0, i = !1, s) {
    return s && s.from <= t && s.more ? this.setMeasuredHeight(s) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class xe extends De {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let i = e.doc.lineAt(t).number, s = e.doc.lineAt(t + this.length).number, r = s - i + 1, o, l = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * r);
      o = a / r, this.length > r + 1 && (l = (this.height - a) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: i, lastLine: s, perLine: o, perChar: l };
  }
  blockAt(e, t, i, s) {
    let { firstLine: r, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, s);
    if (t.lineWrapping) {
      let h = s + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), c = t.doc.lineAt(h), f = l + c.length * a, u = Math.max(i, e - f / 2);
      return new rt(c.from, c.length, u, f, 0);
    } else {
      let h = Math.max(0, Math.min(o - r, Math.floor((e - i) / l))), { from: c, length: f } = t.doc.line(r + h);
      return new rt(c, f, i + l * h, l, 0);
    }
  }
  lineAt(e, t, i, s, r) {
    if (t == Q.ByHeight)
      return this.blockAt(e, i, s, r);
    if (t == Q.ByPosNoHeight) {
      let { from: d, to: p } = i.doc.lineAt(e);
      return new rt(d, p - d, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, r), h = i.doc.lineAt(e), c = l + h.length * a, f = h.number - o, u = s + l * f + a * (h.from - r - f);
    return new rt(h.from, h.length, Math.max(s, Math.min(u, s + this.height - c)), c, 0);
  }
  forEachLine(e, t, i, s, r, o) {
    e = Math.max(e, r), t = Math.min(t, r + this.length);
    let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(i, r);
    for (let c = e, f = s; c <= t; ) {
      let u = i.doc.lineAt(c);
      if (c == e) {
        let p = u.number - l;
        f += a * p + h * (e - r - p);
      }
      let d = a + h * u.length;
      o(new rt(u.from, u.length, f, d, 0)), f += d, c = u.to + 1;
    }
  }
  replace(e, t, i) {
    let s = this.length - t;
    if (s > 0) {
      let r = i[i.length - 1];
      r instanceof xe ? i[i.length - 1] = new xe(r.length + s) : i.push(null, new xe(s - 1));
    }
    if (e > 0) {
      let r = i[0];
      r instanceof xe ? i[0] = new xe(e + r.length) : i.unshift(new xe(e - 1), null);
    }
    return De.of(i);
  }
  decomposeLeft(e, t) {
    t.push(new xe(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new xe(this.length - e - 1));
  }
  updateHeight(e, t = 0, i = !1, s) {
    let r = t + this.length;
    if (s && s.from <= t + this.length && s.more) {
      let o = [], l = Math.max(t, s.from), a = -1;
      for (s.from > t && o.push(new xe(s.from - t - 1).updateHeight(e, t)); l <= r && s.more; ) {
        let c = e.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = s.heights[s.index++], u = 0;
        f < 0 && (u = -f, f = s.heights[s.index++]), a == -1 ? a = f : Math.abs(f - a) >= as && (a = -2);
        let d = new We(c, f, u);
        d.outdated = !1, o.push(d), l += c + 1;
      }
      l <= r && o.push(null, new xe(r - l).updateHeight(e, l));
      let h = De.of(o);
      return (a < 0 || Math.abs(h.height - this.height) >= as || Math.abs(a - this.heightMetrics(e, t).perLine) >= as) && (Pi = !0), _s(this, h);
    } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class Sm extends De {
  constructor(e, t, i) {
    super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, i, s) {
    let r = i + this.left.height;
    return e < r ? this.left.blockAt(e, t, i, s) : this.right.blockAt(e, t, r, s + this.left.length + this.break);
  }
  lineAt(e, t, i, s, r) {
    let o = s + this.left.height, l = r + this.left.length + this.break, a = t == Q.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, i, s, r) : this.right.lineAt(e, t, i, o, l);
    if (this.break || (a ? h.to < l : h.from > l))
      return h;
    let c = t == Q.ByPosNoHeight ? Q.ByPosNoHeight : Q.ByPos;
    return a ? h.join(this.right.lineAt(l, c, i, o, l)) : this.left.lineAt(l, c, i, s, r).join(h);
  }
  forEachLine(e, t, i, s, r, o) {
    let l = s + this.left.height, a = r + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, i, s, r, o), t >= a && this.right.forEachLine(e, t, i, l, a, o);
    else {
      let h = this.lineAt(a, Q.ByPos, i, s, r);
      e < h.from && this.left.forEachLine(e, h.from - 1, i, s, r, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, i, l, a, o);
    }
  }
  replace(e, t, i) {
    let s = this.left.length + this.break;
    if (t < s)
      return this.balanced(this.left.replace(e, t, i), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - s, t - s, i));
    let r = [];
    e > 0 && this.decomposeLeft(e, r);
    let o = r.length;
    for (let l of i)
      r.push(l);
    if (e > 0 && Ra(r, o - 1), t < this.length) {
      let l = r.length;
      this.decomposeRight(t, r), Ra(r, l);
    }
    return De.of(r);
  }
  decomposeLeft(e, t) {
    let i = this.left.length;
    if (e <= i)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
  }
  decomposeRight(e, t) {
    let i = this.left.length, s = i + this.break;
    if (e >= s)
      return this.right.decomposeRight(e - s, t);
    e < i && this.left.decomposeRight(e, t), this.break && e < s && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? De.of(this.break ? [e, null, t] : [e, t]) : (this.left = _s(this.left, e), this.right = _s(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, i = !1, s) {
    let { left: r, right: o } = this, l = t + r.length + this.break, a = null;
    return s && s.from <= t + r.length && s.more ? a = r = r.updateHeight(e, t, i, s) : r.updateHeight(e, t, i), s && s.from <= l + o.length && s.more ? a = o = o.updateHeight(e, l, i, s) : o.updateHeight(e, l, i), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Ra(n, e) {
  let t, i;
  n[e] == null && (t = n[e - 1]) instanceof xe && (i = n[e + 1]) instanceof xe && n.splice(e - 1, 3, new xe(t.length + 1 + i.length));
}
const vm = 5;
class yl {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let i = Math.min(t, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof We ? s.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new We(i - this.pos, -1, 0)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, i) {
    if (e < t || i.heightRelevant) {
      let s = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = t - e;
      i.block ? this.addBlock(new wf(o, s, i)) : (o || r || s >= vm) && this.addLineDeco(s, r, o);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new We(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let i = new xe(t - e);
    return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof We)
      return e;
    let t = new We(0, -1, 0);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    this.enterLine();
    let t = e.deco;
    t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
  }
  addLineDeco(e, t, i) {
    let s = this.ensureLine();
    s.length += i, s.collapsed += i, s.widgetHeight = Math.max(s.widgetHeight, e), s.breaks += t, this.writtenTo = this.pos = this.pos + i;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof We) && !this.isCovered ? this.nodes.push(new We(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = e;
    for (let s of this.nodes)
      s instanceof We && s.updateHeight(this.oracle, i), i += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, i, s) {
    let r = new yl(i, e);
    return U.spans(t, i, s, r, 0), r.finish(i);
  }
}
function Cm(n, e, t) {
  let i = new Am();
  return U.compare(n, e, t, i, 0), i.changes;
}
class Am {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, i, s) {
    (e < t || i && i.heightRelevant || s && s.heightRelevant) && vi(e, t, this.changes, 5);
  }
}
function Tm(n, e) {
  let t = n.getBoundingClientRect(), i = n.ownerDocument, s = i.defaultView || window, r = Math.max(0, t.left), o = Math.min(s.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(s.innerHeight, t.bottom);
  for (let h = n.parentNode; h && h != i.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let u = c.getBoundingClientRect();
        r = Math.max(r, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = Math.min(h == n.parentNode ? s.innerHeight : a, u.bottom);
      }
      h = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
  return {
    left: r - t.left,
    right: Math.max(r, o) - t.left,
    top: l - (t.top + e),
    bottom: Math.max(l, a) - (t.top + e)
  };
}
function Om(n) {
  let e = n.getBoundingClientRect(), t = n.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function _m(n, e) {
  let t = n.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class Or {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.size = i, this.displaySize = s;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i], r = t[i];
      if (s.from != r.from || s.to != r.to || s.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(e, t) {
    return te.replace({
      widget: new Rm(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class Rm extends Xs {
  constructor(e, t) {
    super(), this.size = e, this.vertical = t;
  }
  eq(e) {
    return e.size == this.size && e.vertical == this.vertical;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class Ea {
  constructor(e) {
    this.state = e, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scrollTop = 0, this.scrolledToBottom = !1, this.scaleX = 1, this.scaleY = 1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Da, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = se.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let t = e.facet(dl).some((i) => typeof i != "function" && i.class == "cm-lineWrapping");
    this.heightOracle = new km(t), this.stateDeco = Ma(e), this.heightMap = De.empty().applyChanges(this.stateDeco, V.empty, this.heightOracle.setDoc(e.doc), [new Xe(0, 0, 0, e.doc.length)]);
    for (let i = 0; i < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); i++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = te.set(this.lineGaps.map((i) => i.draw(this, !1))), this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let s = i ? t.head : t.anchor;
      if (!e.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        e.push(new qn(r, o));
      }
    }
    return this.viewports = e.sort((i, s) => i.from - s.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? Da : new bl(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(Ji(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let i = this.stateDeco;
    this.stateDeco = Ma(this.state);
    let s = e.changedRanges, r = Xe.extendWithRanges(s, Cm(i, this.stateDeco, e ? e.changes : ue.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollTop);
    _a(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || Pi) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let a = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(wp) && (this.mustEnforceCursorAssoc = !0);
  }
  measure(e) {
    let t = e.contentDOM, i = window.getComputedStyle(t), s = this.heightOracle, r = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? se.RTL : se.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r) || this.mustMeasureContent, l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let h = 0, c = 0;
    if (l.width && l.height) {
      let { scaleX: v, scaleY: C } = Ic(t, l);
      (v > 5e-3 && Math.abs(this.scaleX - v) > 5e-3 || C > 5e-3 && Math.abs(this.scaleY - C) > 5e-3) && (this.scaleX = v, this.scaleY = C, h |= 16, o = a = !0);
    }
    let f = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (s.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let d = e.scrollDOM.scrollTop * this.scaleY;
    this.scrollTop != d && (this.scrollAnchorHeight = -1, this.scrollTop = d), this.scrolledToBottom = $c(e.scrollDOM);
    let p = (this.printing ? _m : Tm)(t, this.paddingTop), m = p.top - this.pixelViewport.top, g = p.bottom - this.pixelViewport.bottom;
    this.pixelViewport = p;
    let y = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (y != this.inView && (this.inView = y, y && (a = !0)), !this.inView && !this.scrollTarget && !Om(e.dom))
      return 0;
    let b = l.width;
    if ((this.contentDOMWidth != b || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
      let v = e.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(v) && (o = !0), o || s.lineWrapping && Math.abs(b - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: C, charWidth: T, textHeight: A } = e.docView.measureTextSize();
        o = C > 0 && s.refresh(r, C, T, A, Math.max(5, b / T), v), o && (e.docView.minWidth = 0, h |= 16);
      }
      m > 0 && g > 0 ? c = Math.max(m, g) : m < 0 && g < 0 && (c = Math.min(m, g)), _a();
      for (let C of this.viewports) {
        let T = C.from == this.viewport.from ? v : e.docView.measureVisibleLineHeights(C);
        this.heightMap = (o ? De.empty().applyChanges(this.stateDeco, V.empty, this.heightOracle, [new Xe(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new xm(C.from, T));
      }
      Pi && (h |= 2);
    }
    let x = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return x && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || x) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new qn(s.lineAt(o - i * 1e3, Q.ByHeight, r, 0, 0).from, s.lineAt(l + (1 - i) * 1e3, Q.ByHeight, r, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = s.lineAt(h, Q.ByPos, r, 0, 0), u;
        t.y == "center" ? u = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? u = f.top : u = f.bottom - c, a = new qn(s.lineAt(u - 1e3 / 2, Q.ByHeight, r, 0, 0).from, s.lineAt(u + c + 1e3 / 2, Q.ByHeight, r, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let i = t.mapPos(e.from, -1), s = t.mapPos(e.to, 1);
    return new qn(this.heightMap.lineAt(i, Q.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, Q.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(e, Q.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, Q.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (e == 0 || s <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || r >= l + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && s > o - 2 * 1e3 && r < l + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let i = [];
    for (let s of e)
      t.touchesRange(s.from, s.to) || i.push(new Or(t.mapPos(s.from), t.mapPos(s.to), s.size, s.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let i = this.heightOracle.lineWrapping, s = i ? 1e4 : 2e3, r = s >> 1, o = s << 1;
    if (this.defaultTextDirection != se.LTR && !i)
      return [];
    let l = [], a = (c, f, u, d) => {
      if (f - c < r)
        return;
      let p = this.state.selection.main, m = [p.from];
      p.empty || m.push(p.to);
      for (let y of m)
        if (y > c && y < f) {
          a(c, y - 10, u, d), a(y + 10, f, u, d);
          return;
        }
      let g = Dm(e, (y) => y.from >= u.from && y.to <= u.to && Math.abs(y.from - c) < r && Math.abs(y.to - f) < r && !m.some((b) => y.from < b && y.to > b));
      if (!g) {
        if (f < u.to && t && i && t.visibleRanges.some((x) => x.from <= f && x.to >= f)) {
          let x = t.moveToLineBoundary(S.cursor(f), !1, !0).head;
          x > c && (f = x);
        }
        let y = this.gapSize(u, c, f, d), b = i || y < 2e6 ? y : 2e6;
        g = new Or(c, f, y, b);
      }
      l.push(g);
    }, h = (c) => {
      if (c.length < o || c.type != Ze.Text)
        return;
      let f = Em(c.from, c.to, this.stateDeco);
      if (f.total < o)
        return;
      let u = this.scrollTarget ? this.scrollTarget.range.head : null, d, p;
      if (i) {
        let m = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, g, y;
        if (u != null) {
          let b = Kn(f, u), x = ((this.visibleBottom - this.visibleTop) / 2 + m) / c.height;
          g = b - x, y = b + x;
        } else
          g = (this.visibleTop - c.top - m) / c.height, y = (this.visibleBottom - c.top + m) / c.height;
        d = Un(f, g), p = Un(f, y);
      } else {
        let m = f.total * this.heightOracle.charWidth, g = s * this.heightOracle.charWidth, y = 0;
        if (m > 2e6)
          for (let T of e)
            T.from >= c.from && T.from < c.to && T.size != T.displaySize && T.from * this.heightOracle.charWidth + y < this.pixelViewport.left && (y = T.size - T.displaySize);
        let b = this.pixelViewport.left + y, x = this.pixelViewport.right + y, v, C;
        if (u != null) {
          let T = Kn(f, u), A = ((x - b) / 2 + g) / m;
          v = T - A, C = T + A;
        } else
          v = (b - g) / m, C = (x + g) / m;
        d = Un(f, v), p = Un(f, C);
      }
      d > c.from && a(c.from, d, c, f), p < c.to && a(p, c.to, c, f);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(h) : h(c);
    return l;
  }
  gapSize(e, t, i, s) {
    let r = Kn(s, i) - Kn(s, t);
    return this.heightOracle.lineWrapping ? e.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(e) {
    Or.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = te.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let i = [];
    U.spans(t, this.viewport.from, this.viewport.to, {
      span(r, o) {
        i.push({ from: r, to: o });
      },
      point() {
      }
    }, 20);
    let s = 0;
    if (i.length != this.visibleRanges.length)
      s = 12;
    else
      for (let r = 0; r < i.length && !(s & 8); r++) {
        let o = this.visibleRanges[r], l = i[r];
        (o.from != l.from || o.to != l.to) && (s |= 4, e && e.mapPos(o.from, -1) == l.from && e.mapPos(o.to, 1) == l.to || (s |= 8));
      }
    return this.visibleRanges = i, s;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || Ji(this.heightMap.lineAt(e, Q.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || Ji(this.heightMap.lineAt(this.scaler.fromDOM(e), Q.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return Ji(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class qn {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function Em(n, e, t) {
  let i = [], s = n, r = 0;
  return U.spans(t, n, e, {
    span() {
    },
    point(o, l) {
      o > s && (i.push({ from: s, to: o }), r += o - s), s = l;
    }
  }, 20), s < e && (i.push({ from: s, to: e }), r += e - s), { total: r, ranges: i };
}
function Un({ total: n, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let i = Math.floor(n * t);
  for (let s = 0; ; s++) {
    let { from: r, to: o } = e[s], l = o - r;
    if (i <= l)
      return r + i;
    i -= l;
  }
}
function Kn(n, e) {
  let t = 0;
  for (let { from: i, to: s } of n.ranges) {
    if (e <= s) {
      t += e - i;
      break;
    }
    t += s - i;
  }
  return t / n.total;
}
function Dm(n, e) {
  for (let t of n)
    if (e(t))
      return t;
}
const Da = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1,
  eq(n) {
    return n == this;
  }
};
function Ma(n) {
  let e = n.facet(Ys).filter((i) => typeof i != "function"), t = n.facet(pl).filter((i) => typeof i != "function");
  return t.length && e.push(U.join(t)), e;
}
class bl {
  constructor(e, t, i) {
    let s = 0, r = 0, o = 0;
    this.viewports = i.map(({ from: l, to: a }) => {
      let h = t.lineAt(l, Q.ByPos, e, 0, 0).top, c = t.lineAt(a, Q.ByPos, e, 0, 0).bottom;
      return s += c - h, { from: l, to: a, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - s) / (t.height - s);
    for (let l of this.viewports)
      l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
  }
  toDOM(e) {
    for (let t = 0, i = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.top)
        return s + (e - i) * this.scale;
      if (e <= r.bottom)
        return r.domTop + (e - r.top);
      i = r.bottom, s = r.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, i = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.domTop)
        return i + (e - s) / this.scale;
      if (e <= r.domBottom)
        return r.top + (e - r.domTop);
      i = r.bottom, s = r.domBottom;
    }
  }
  eq(e) {
    return e instanceof bl ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : !1;
  }
}
function Ji(n, e) {
  if (e.scale == 1)
    return n;
  let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
  return new rt(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((s) => Ji(s, e)) : n._content);
}
const Gn = /* @__PURE__ */ E.define({ combine: (n) => n.join(" ") }), Ao = /* @__PURE__ */ E.define({ combine: (n) => n.indexOf(!0) > -1 }), To = /* @__PURE__ */ Ht.newName(), Sf = /* @__PURE__ */ Ht.newName(), vf = /* @__PURE__ */ Ht.newName(), Cf = { "&light": "." + Sf, "&dark": "." + vf };
function Oo(n, e, t) {
  return new Ht(e, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (s) => {
        if (s == "&")
          return n;
        if (!t || !t[s])
          throw new RangeError(`Unsupported selector: ${s}`);
        return t[s];
      }) : n + " " + i;
    }
  });
}
const Mm = /* @__PURE__ */ Oo("." + To, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // https://github.com/codemirror/dev/issues/456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 200
  },
  ".cm-gutters-before": { insetInlineStart: 0 },
  ".cm-gutters-after": { insetInlineEnd: 0 },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    border: "0px solid #ddd",
    "&.cm-gutters-before": { borderRightWidth: "1px" },
    "&.cm-gutters-after": { borderLeftWidth: "1px" }
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-dialog": {
    padding: "2px 19px 4px 6px",
    position: "relative",
    "& label": { fontSize: "80%" }
  },
  ".cm-dialog-close": {
    position: "absolute",
    top: "3px",
    right: "4px",
    backgroundColor: "inherit",
    border: "none",
    font: "inherit",
    fontSize: "14px",
    padding: "0"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top",
    userSelect: "none"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, Cf), Pm = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, _r = R.ie && R.ie_version <= 11;
class Bm {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new hp(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let i of t)
        this.queue.push(i);
      (R.ie && R.ie_version <= 11 || R.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && R.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(R.chrome && R.chrome_version < 126) && (this.editContext = new Im(e), e.state.facet(Tt) && (e.contentDOM.editContext = this.editContext.editContext)), _r && (this.onCharData = (t) => {
      this.queue.push({
        target: t.target,
        type: "characterData",
        oldValue: t.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var t;
      ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
      t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(e) {
    this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
  }
  onScroll(e) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(e) {
    (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(e) {
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    let t = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, s = this.selectionRange;
    if (i.state.facet(Tt) ? i.root.activeElement != this.dom : !sn(this.dom, s))
      return;
    let r = s.anchorNode && i.docView.tile.nearest(s.anchorNode);
    if (r && r.isWidget() && r.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (R.ie && R.ie_version <= 11 || R.android && R.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && rn(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = Ei(e.root);
    if (!t)
      return !1;
    let i = R.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && Nm(this.view, t) || t;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let s = sn(this.dom, i);
    return s && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && fp(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), s && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = t)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(e) {
    if (!this.active)
      return e();
    try {
      return this.stop(), e();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, Pm), _r && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), _r && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(e, t) {
    var i;
    if (!this.delayedAndroidKey) {
      let s = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && Ci(this.dom, r.key, r.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(s);
    }
    (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
      key: e,
      keyCode: t,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let e of this.observer.takeRecords())
      this.queue.push(e);
    return this.queue;
  }
  processRecords() {
    let e = this.pendingRecords();
    e.length && (this.queue = []);
    let t = -1, i = -1, s = !1;
    for (let r of e) {
      let o = this.readMutation(r);
      o && (o.typeOver && (s = !0), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
    }
    return { from: t, to: i, typeOver: s };
  }
  readChange() {
    let { from: e, to: t, typeOver: i } = this.processRecords(), s = this.selectionChanged && sn(this.dom, this.selectionRange);
    if (e < 0 && !s)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Zp(this.view, e, t, i);
    return this.view.docView.domChanged = { newSel: r.newSel ? r.newSel.main : null }, r;
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    e && this.readSelectionRange();
    let t = this.readChange();
    if (!t)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, s = ff(this.view, t);
    return this.view.state == i && (t.domChanged || t.newSel && !Os(this.view.state.selection, t.newSel.main)) && this.view.update([]), s;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let i = Pa(t, e.previousSibling || e.target.previousSibling, -1), s = Pa(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: i ? t.posAfter(i) : t.posAtStart,
        to: s ? t.posBefore(s) : t.posAtEnd,
        typeOver: !1
      };
    } else return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  setWindow(e) {
    e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
  }
  addWindowListeners(e) {
    e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(e) {
    e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(e) {
    this.editContext && (this.editContext.update(e), e.startState.facet(Tt) != e.state.facet(Tt) && (e.view.contentDOM.editContext = e.state.facet(Tt) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, i;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let s of this.scrollTargets)
      s.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function Pa(n, e, t) {
  for (; e; ) {
    let i = ce.get(e);
    if (i && i.parent == n)
      return i;
    let s = e.parentNode;
    e = s != n.dom ? s : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function Ba(n, e) {
  let t = e.startContainer, i = e.startOffset, s = e.endContainer, r = e.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor, 1);
  return rn(o.node, o.offset, s, r) && ([t, i, s, r] = [s, r, t, i]), { anchorNode: t, anchorOffset: i, focusNode: s, focusOffset: r };
}
function Nm(n, e) {
  if (e.getComposedRanges) {
    let s = e.getComposedRanges(n.root)[0];
    if (s)
      return Ba(n, s);
  }
  let t = null;
  function i(s) {
    s.preventDefault(), s.stopImmediatePropagation(), t = s.getTargetRanges()[0];
  }
  return n.contentDOM.addEventListener("beforeinput", i, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, !0), t ? Ba(n, t) : null;
}
class Im {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let s = e.state.selection.main, { anchor: r, head: o } = s, l = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: l, drifted: !1 });
      let h = a - l > i.text.length;
      l == this.from && r < this.from ? l = r : a == this.to && r > this.to && (a = r);
      let c = uf(e.state.sliceDoc(l, a), i.text, (h ? s.from : s.to) - l, h ? "end" : null);
      if (!c) {
        let u = S.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
        Os(u, s) || e.dispatch({ selection: u, userEvent: "select" });
        return;
      }
      let f = {
        from: c.from + l,
        to: c.toA + l,
        insert: V.of(i.text.slice(c.from, c.toB).split(`
`))
      };
      if ((R.mac || R.android) && f.from == o - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: l, to: a, insert: V.of([i.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
        let u = this.to - this.from + (f.to - f.from + f.insert.length);
        gl(e, f, S.single(this.toEditorPos(i.selectionStart, u), this.toEditorPos(i.selectionEnd, u)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), f.from < f.to && !f.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(t.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
    }, this.handlers.characterboundsupdate = (i) => {
      let s = [], r = null;
      for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
        let a = e.coordsForChar(o);
        r = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || r || new DOMRect(), s.push(r);
      }
      t.updateCharacterBounds(i.rangeStart, s);
    }, this.handlers.textformatupdate = (i) => {
      let s = [];
      for (let r of i.getTextFormats()) {
        let o = r.underlineStyle, l = r.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(l)) {
          let a = this.toEditorPos(r.rangeStart), h = this.toEditorPos(r.rangeEnd);
          if (a < h) {
            let c = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(l) ? 1 : 2}px`;
            s.push(te.mark({ attributes: { style: c } }).range(a, h));
          }
        }
      }
      e.dispatch({ effects: ef.of(te.set(s)) });
    }, this.handlers.compositionstart = () => {
      e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(e.state);
      }
    };
    for (let i in this.handlers)
      t.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
      let s = Ei(i.root);
      s && s.rangeCount && this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, i = !1, s = this.pendingContextChange;
    return e.changes.iterChanges((r, o, l, a, h) => {
      if (i)
        return;
      let c = h.length - (o - r);
      if (s && o >= s.to)
        if (s.from == r && s.to == o && s.insert.eq(h)) {
          s = this.pendingContextChange = null, t += c, this.to += c;
          return;
        } else
          s = null, this.revertPending(e.state);
      if (r += t, o += t, o <= this.from)
        this.from += c, this.to += c;
      else if (r < this.to) {
        if (r < this.from || o > this.to || this.to - this.from + h.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), h.toString()), this.to += c;
      }
      t += c;
    }), s && !i && this.revertPending(e.state), !i;
  }
  update(e) {
    let t = this.pendingContextChange, i = e.startState.selection.main;
    this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((s) => !s.isUserEvent("input.type") && s.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
  }
  resetRange(e) {
    let { head: t } = e.selection.main;
    this.from = Math.max(
      0,
      t - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      e.doc.length,
      t + 1e4
      /* CxVp.Margin */
    );
  }
  reset(e) {
    this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
  }
  revertPending(e) {
    let t = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
  }
  setSelection(e) {
    let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), s = this.toContextPos(t.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != s) && this.editContext.updateSelection(i, s);
  }
  rangeIsValid(e) {
    let { head: t } = e.selection.main;
    return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(e, t = this.to - this.from) {
    e = Math.min(e, t);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
  }
  toContextPos(e) {
    let t = this.composing;
    return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
  }
  destroy() {
    for (let e in this.handlers)
      this.editContext.removeEventListener(e, this.handlers[e]);
  }
}
class N {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return !!this.inputState && this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return !!this.inputState && this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(e = {}) {
    var t;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
    let { dispatch: i } = e;
    this.dispatchTransactions = e.dispatchTransactions || i && ((s) => s.forEach((r) => i(r, this))) || ((s) => this.update(s)), this.dispatch = this.dispatch.bind(this), this._root = e.root || cp(e.parent) || document, this.viewState = new Ea(e.state || q.create(e)), e.scrollTo && e.scrollTo.is(Wn) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(bi).map((s) => new Sr(s));
    for (let s of this.plugins)
      s.update(this);
    this.observer = new Bm(this), this.inputState = new nm(this), this.inputState.ensureHandlers(this.plugins), this.docView = new ga(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = !0, this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof pe ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
    this.dispatchTransactions(t, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let t = !1, i = !1, s, r = this.state;
    for (let u of e) {
      if (u.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, l = 0, a = null;
    e.some((u) => u.annotation(bf)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = kf(r, o), a || (l = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (c = null)) : this.observer.clear(), r.facet(q.phrases) != this.state.facet(q.phrases))
      return this.setState(r);
    s = Cs.create(this, r, e), s.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of e) {
        if (f && (f = f.map(u.changes)), u.scrollIntoView) {
          let { main: d } = u.state.selection;
          f = new Ai(d.empty ? d : S.cursor(d.head, d.head > d.anchor ? -1 : 1));
        }
        for (let d of u.effects)
          d.is(Wn) && (f = d.value.clip(this.state));
      }
      this.viewState.update(s, f), this.bidiCache = Rs.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), t = this.docView.update(s), this.state.facet(Ki) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(Gn) != s.state.facet(Gn) && (this.viewState.mustMeasureContent = !0), (t || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !s.empty)
      for (let u of this.state.facet(wo))
        try {
          u(s);
        } catch (d) {
          je(this.state, d, "update listener");
        }
    (a || c) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), c && !ff(this, c) && h.force && Ci(this.contentDOM, h.key, h.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = e;
      return;
    }
    this.updateState = 2;
    let t = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new Ea(e), this.plugins = e.facet(bi).map((i) => new Sr(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new ga(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(bi), i = e.state.facet(bi);
    if (t != i) {
      let s = [];
      for (let r of i) {
        let o = t.indexOf(r);
        if (o < 0)
          s.push(new Sr(r));
        else {
          let l = this.plugins[o];
          l.mustUpdate = e, s.push(l);
        }
      }
      for (let r of this.plugins)
        r.mustUpdate != e && r.destroy(this);
      this.plugins = s, this.pluginMap.clear();
    } else
      for (let s of this.plugins)
        s.mustUpdate = e;
    for (let s = 0; s < this.plugins.length; s++)
      this.plugins[s].update(this);
    t != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let e of this.plugins) {
      let t = e.value;
      if (t && t.docViewUpdate)
        try {
          t.docViewUpdate(this);
        } catch (i) {
          je(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, e && this.observer.forceFlush();
    let t = null, i = this.scrollDOM, s = i.scrollTop * this.scaleY, { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    Math.abs(s - this.viewState.scrollTop) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if ($c(i))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let d = this.viewState.scrollAnchorAt(s);
            r = d.from, o = d.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure(this);
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let h = [];
        a & 4 || ([this.measureRequests, h] = [h, this.measureRequests]);
        let c = h.map((d) => {
          try {
            return d.read(this);
          } catch (p) {
            return je(this.state, p), Na;
          }
        }), f = Cs.create(this, this.state, []), u = !1;
        f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
        for (let d = 0; d < h.length; d++)
          if (c[d] != Na)
            try {
              let p = h[d];
              p.write && p.write(c[d], this);
            } catch (p) {
              je(this.state, p);
            }
        if (u && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let p = (r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o;
              if (p > 1 || p < -1) {
                s = s + p, i.scrollTop = s / this.scaleY, o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let l of this.state.facet(wo))
        l(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return To + " " + (this.state.facet(Ao) ? vf : Sf) + " " + this.state.facet(Gn);
  }
  updateAttrs() {
    let e = Ia(this, tf, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(Tt) ? "true" : "false",
      class: "cm-content",
      style: `${R.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), Ia(this, dl, t);
    let i = this.observer.ignore(() => {
      let s = ca(this.contentDOM, this.contentAttrs, t), r = ca(this.dom, this.editorAttrs, e);
      return s || r;
    });
    return this.editorAttrs = e, this.contentAttrs = t, i;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let i of e)
      for (let s of i.effects)
        if (s.is(N.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Ki);
    let e = this.state.facet(N.cspNonce);
    Ht.mount(this.root, this.styleModules.concat(Mm).reverse(), e ? { nonce: e } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(e) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
      if (this.measureRequests.indexOf(e) > -1)
        return;
      if (e.key != null) {
        for (let t = 0; t < this.measureRequests.length; t++)
          if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
      }
      this.measureRequests.push(e);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(e) {
    return this.viewState.lineBlockAt(e);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, i) {
    return Tr(this, e, ya(this, e, t, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return Tr(this, e, ya(this, e, t, (i) => Gp(this, e.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let i = this.bidiSpans(e), s = this.textDirectionAt(e.from), r = i[t ? i.length - 1 : 0];
    return S.cursor(r.side(t, s) + e.from, r.forward(!t, s) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, i = !0) {
    return Kp(this, e, t, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(e, t, i) {
    return Tr(this, e, Jp(this, e, t, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(e, t = 1) {
    return this.docView.domAtPos(e, t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(e, t = 0) {
    return this.docView.posFromDOM(e, t);
  }
  posAtCoords(e, t = !0) {
    this.readMeasured();
    let i = vo(this, e, t);
    return i && i.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), vo(this, e, t);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(e, t = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(e, t);
    if (!i || i.left == i.right)
      return i;
    let s = this.state.doc.lineAt(e), r = this.bidiSpans(s), o = r[Ot.find(r, e - s.from, -1, t)];
    return vs(i, o.dir == se.LTR == t > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(e) {
    return this.readMeasured(), this.docView.coordsForChar(e);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(e) {
    return !this.state.facet(Qc) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(e) {
    if (e.length > Lm)
      return jc(e.length);
    let t = this.textDirectionAt(e.from), i;
    for (let r of this.bidiCache)
      if (r.from == e.from && r.dir == t && (r.fresh || Vc(r.isolates, i = da(this, e))))
        return r.order;
    i || (i = da(this, e));
    let s = bp(e.text, t, i);
    return this.bidiCache.push(new Rs(e.from, e.to, t, i, !0, s)), s;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || R.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      Lc(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(e) {
    this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let e of this.plugins)
      e.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    return Wn.of(new Ai(typeof e == "number" ? S.cursor(e) : e, t.y, t.x, t.yMargin, t.xMargin));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
    return Wn.of(new Ai(S.cursor(i.from), "start", "start", i.top - e, t, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(e) {
    e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(e) {
    return it.define(() => ({}), { eventHandlers: e });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(e) {
    return it.define(() => ({}), { eventObservers: e });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(e, t) {
    let i = Ht.newName(), s = [Gn.of(i), Ki.of(Oo(`.${i}`, e))];
    return t && t.dark && s.push(Ao.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return Tn.lowest(Ki.of(Oo("." + To, e, Cf)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let i = e.querySelector(".cm-content"), s = i && ce.get(i) || ce.get(e);
    return ((t = s?.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
N.styleModule = Ki;
N.inputHandler = Xc;
N.clipboardInputFilter = fl;
N.clipboardOutputFilter = ul;
N.scrollHandler = Zc;
N.focusChangeEffect = Yc;
N.perLineTextDirection = Qc;
N.exceptionSink = Jc;
N.updateListener = wo;
N.editable = Tt;
N.mouseSelectionStyle = Gc;
N.dragMovesSelection = Kc;
N.clickAddsSelectionRange = Uc;
N.decorations = Ys;
N.blockWrappers = nf;
N.outerDecorations = pl;
N.atomicRanges = Rn;
N.bidiIsolatedRanges = sf;
N.scrollMargins = rf;
N.darkTheme = Ao;
N.cspNonce = /* @__PURE__ */ E.define({ combine: (n) => n.length ? n[0] : "" });
N.contentAttributes = dl;
N.editorAttributes = tf;
N.lineWrapping = /* @__PURE__ */ N.contentAttributes.of({ class: "cm-lineWrapping" });
N.announce = /* @__PURE__ */ J.define();
const Lm = 4096, Na = {};
class Rs {
  constructor(e, t, i, s, r, o) {
    this.from = e, this.to = t, this.dir = i, this.isolates = s, this.fresh = r, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((r) => r.fresh))
      return e;
    let i = [], s = e.length ? e[e.length - 1].dir : se.LTR;
    for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
      let o = e[r];
      o.dir == s && !t.touchesRange(o.from, o.to) && i.push(new Rs(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function Ia(n, e, t) {
  for (let i = n.state.facet(e), s = i.length - 1; s >= 0; s--) {
    let r = i[s], o = typeof r == "function" ? r(n) : r;
    o && al(o, t);
  }
  return t;
}
const $m = R.mac ? "mac" : R.windows ? "win" : R.linux ? "linux" : "key";
function Fm(n, e) {
  const t = n.split(/-(?!$)/);
  let i = t[t.length - 1];
  i == "Space" && (i = " ");
  let s, r, o, l;
  for (let a = 0; a < t.length - 1; ++a) {
    const h = t[a];
    if (/^(cmd|meta|m)$/i.test(h))
      l = !0;
    else if (/^a(lt)?$/i.test(h))
      s = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      r = !0;
    else if (/^s(hift)?$/i.test(h))
      o = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? l = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return s && (i = "Alt-" + i), r && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function Jn(n, e, t) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== !1 && e.shiftKey && (n = "Shift-" + n), n;
}
const zm = /* @__PURE__ */ Tn.default(/* @__PURE__ */ N.domEventHandlers({
  keydown(n, e) {
    return jm(Hm(e.state), n, e, "editor");
  }
})), tr = /* @__PURE__ */ E.define({ enables: zm }), La = /* @__PURE__ */ new WeakMap();
function Hm(n) {
  let e = n.facet(tr), t = La.get(e);
  return t || La.set(e, t = Vm(e.reduce((i, s) => i.concat(s), []))), t;
}
let Bt = null;
const Wm = 4e3;
function Vm(n, e = $m) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), s = (o, l) => {
    let a = i[o];
    if (a == null)
      i[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, a, h, c) => {
    var f, u;
    let d = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), p = l.split(/ (?!$)/).map((y) => Fm(y, e));
    for (let y = 1; y < p.length; y++) {
      let b = p.slice(0, y).join(" ");
      s(b, !0), d[b] || (d[b] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(x) => {
          let v = Bt = { view: x, prefix: b, scope: o };
          return setTimeout(() => {
            Bt == v && (Bt = null);
          }, Wm), !0;
        }]
      });
    }
    let m = p.join(" ");
    s(m, !1);
    let g = d[m] || (d[m] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (f = d._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
    });
    a && g.run.push(a), h && (g.preventDefault = !0), c && (g.stopPropagation = !0);
  };
  for (let o of n) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let h of l) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = o;
        for (let u in c)
          c[u].run.push((d) => f(d, _o));
      }
    let a = o[e] || o.key;
    if (a)
      for (let h of l)
        r(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let _o = null;
function jm(n, e, t, i) {
  _o = e;
  let s = tp(e), r = Ke(s, 0), o = At(r) == s.length && s != " ", l = "", a = !1, h = !1, c = !1;
  Bt && Bt.view == t && Bt.scope == i && (l = Bt.prefix + " ", pf.indexOf(e.keyCode) < 0 && (h = !0, Bt = null));
  let f = /* @__PURE__ */ new Set(), u = (g) => {
    if (g) {
      for (let y of g.run)
        if (!f.has(y) && (f.add(y), y(t)))
          return g.stopPropagation && (c = !0), !0;
      g.preventDefault && (g.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, d = n[i], p, m;
  return d && (u(d[l + Jn(s, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(R.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(R.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (p = Wt[e.keyCode]) && p != s ? (u(d[l + Jn(p, e, !0)]) || e.shiftKey && (m = gn[e.keyCode]) != s && m != p && u(d[l + Jn(m, e, !1)])) && (a = !0) : o && e.shiftKey && u(d[l + Jn(s, e, !0)]) && (a = !0), !a && u(d._any) && (a = !0)), h && (a = !0), a && c && e.stopPropagation(), _o = null, a;
}
const Xn = "-10000px";
class qm {
  constructor(e, t, i, s) {
    this.facet = t, this.createTooltipView = i, this.removeTooltipView = s, this.input = e.state.facet(t), this.tooltips = this.input.filter((o) => o);
    let r = null;
    this.tooltipViews = this.tooltips.map((o) => r = i(o, r));
  }
  update(e, t) {
    var i;
    let s = e.state.facet(this.facet), r = s.filter((a) => a);
    if (s === this.input) {
      for (let a of this.tooltipViews)
        a.update && a.update(e);
      return !1;
    }
    let o = [], l = t ? [] : null;
    for (let a = 0; a < r.length; a++) {
      let h = r[a], c = -1;
      if (h) {
        for (let f = 0; f < this.tooltips.length; f++) {
          let u = this.tooltips[f];
          u && u.create == h.create && (c = f);
        }
        if (c < 0)
          o[a] = this.createTooltipView(h, a ? o[a - 1] : null), l && (l[a] = !!h.above);
        else {
          let f = o[a] = this.tooltipViews[c];
          l && (l[a] = t[c]), f.update && f.update(e);
        }
      }
    }
    for (let a of this.tooltipViews)
      o.indexOf(a) < 0 && (this.removeTooltipView(a), (i = a.destroy) === null || i === void 0 || i.call(a));
    return t && (l.forEach((a, h) => t[h] = a), t.length = l.length), this.input = s, this.tooltips = r, this.tooltipViews = o, !0;
  }
}
function Um(n) {
  let e = n.dom.ownerDocument.documentElement;
  return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
}
const Rr = /* @__PURE__ */ E.define({
  combine: (n) => {
    var e, t, i;
    return {
      position: R.ios ? "absolute" : ((e = n.find((s) => s.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = n.find((s) => s.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((i = n.find((s) => s.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || Um
    };
  }
}), $a = /* @__PURE__ */ new WeakMap(), Af = /* @__PURE__ */ it.fromClass(class {
  constructor(n) {
    this.view = n, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = n.state.facet(Rr);
    this.position = e.position, this.parent = e.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new qm(n, Tf, (t, i) => this.createTooltip(t, i), (t) => {
      this.resizeObserver && this.resizeObserver.unobserve(t.dom), t.dom.remove();
    }), this.above = this.manager.tooltips.map((t) => !!t.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((t) => {
      Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let n of this.manager.tooltipViews)
        this.intersectionObserver.observe(n.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(n) {
    n.transactions.length && (this.lastTransaction = Date.now());
    let e = this.manager.update(n, this.above);
    e && this.observeIntersection();
    let t = e || n.geometryChanged, i = n.state.facet(Rr);
    if (i.position != this.position && !this.madeAbsolute) {
      this.position = i.position;
      for (let s of this.manager.tooltipViews)
        s.dom.style.position = this.position;
      t = !0;
    }
    if (i.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
      for (let s of this.manager.tooltipViews)
        this.container.appendChild(s.dom);
      t = !0;
    } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    t && this.maybeMeasure();
  }
  createTooltip(n, e) {
    let t = n.create(this.view), i = e ? e.dom : null;
    if (t.dom.classList.add("cm-tooltip"), n.arrow && !t.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let s = document.createElement("div");
      s.className = "cm-tooltip-arrow", t.dom.appendChild(s);
    }
    return t.dom.style.position = this.position, t.dom.style.top = Xn, t.dom.style.left = "0px", this.container.insertBefore(t.dom, i), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
  }
  destroy() {
    var n, e, t;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let i of this.manager.tooltipViews)
      i.dom.remove(), (n = i.destroy) === null || n === void 0 || n.call(i);
    this.parent && this.container.remove(), (e = this.resizeObserver) === null || e === void 0 || e.disconnect(), (t = this.intersectionObserver) === null || t === void 0 || t.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let n = 1, e = 1, t = !1;
    if (this.position == "fixed" && this.manager.tooltipViews.length) {
      let { dom: r } = this.manager.tooltipViews[0];
      if (R.safari) {
        let o = r.getBoundingClientRect();
        t = Math.abs(o.top + 1e4) > 1 || Math.abs(o.left) > 1;
      } else
        t = !!r.offsetParent && r.offsetParent != this.container.ownerDocument.body;
    }
    if (t || this.position == "absolute")
      if (this.parent) {
        let r = this.parent.getBoundingClientRect();
        r.width && r.height && (n = r.width / this.parent.offsetWidth, e = r.height / this.parent.offsetHeight);
      } else
        ({ scaleX: n, scaleY: e } = this.view.viewState);
    let i = this.view.scrollDOM.getBoundingClientRect(), s = ml(this.view);
    return {
      visible: {
        left: i.left + s.left,
        top: i.top + s.top,
        right: i.right - s.right,
        bottom: i.bottom - s.bottom
      },
      parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
      pos: this.manager.tooltips.map((r, o) => {
        let l = this.manager.tooltipViews[o];
        return l.getCoords ? l.getCoords(r.pos) : this.view.coordsAtPos(r.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: r }) => r.getBoundingClientRect()),
      space: this.view.state.facet(Rr).tooltipSpace(this.view),
      scaleX: n,
      scaleY: e,
      makeAbsolute: t
    };
  }
  writeMeasure(n) {
    var e;
    if (n.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let l of this.manager.tooltipViews)
        l.dom.style.position = "absolute";
    }
    let { visible: t, space: i, scaleX: s, scaleY: r } = n, o = [];
    for (let l = 0; l < this.manager.tooltips.length; l++) {
      let a = this.manager.tooltips[l], h = this.manager.tooltipViews[l], { dom: c } = h, f = n.pos[l], u = n.size[l];
      if (!f || a.clip !== !1 && (f.bottom <= Math.max(t.top, i.top) || f.top >= Math.min(t.bottom, i.bottom) || f.right < Math.max(t.left, i.left) - 0.1 || f.left > Math.min(t.right, i.right) + 0.1)) {
        c.style.top = Xn;
        continue;
      }
      let d = a.arrow ? h.dom.querySelector(".cm-tooltip-arrow") : null, p = d ? 7 : 0, m = u.right - u.left, g = (e = $a.get(h)) !== null && e !== void 0 ? e : u.bottom - u.top, y = h.offset || Gm, b = this.view.textDirection == se.LTR, x = u.width > i.right - i.left ? b ? i.left : i.right - u.width : b ? Math.max(i.left, Math.min(f.left - (d ? 14 : 0) + y.x, i.right - m)) : Math.min(Math.max(i.left, f.left - m + (d ? 14 : 0) - y.x), i.right - m), v = this.above[l];
      !a.strictSide && (v ? f.top - g - p - y.y < i.top : f.bottom + g + p + y.y > i.bottom) && v == i.bottom - f.bottom > f.top - i.top && (v = this.above[l] = !v);
      let C = (v ? f.top - i.top : i.bottom - f.bottom) - p;
      if (C < g && h.resize !== !1) {
        if (C < this.view.defaultLineHeight) {
          c.style.top = Xn;
          continue;
        }
        $a.set(h, g), c.style.height = (g = C) / r + "px";
      } else c.style.height && (c.style.height = "");
      let T = v ? f.top - g - p - y.y : f.bottom + p + y.y, A = x + m;
      if (h.overlap !== !0)
        for (let I of o)
          I.left < A && I.right > x && I.top < T + g && I.bottom > T && (T = v ? I.top - g - 2 - p : I.bottom + p + 2);
      if (this.position == "absolute" ? (c.style.top = (T - n.parent.top) / r + "px", Fa(c, (x - n.parent.left) / s)) : (c.style.top = T / r + "px", Fa(c, x / s)), d) {
        let I = f.left + (b ? y.x : -y.x) - (x + 14 - 7);
        d.style.left = I / s + "px";
      }
      h.overlap !== !0 && o.push({ left: x, top: T, right: A, bottom: T + g }), c.classList.toggle("cm-tooltip-above", v), c.classList.toggle("cm-tooltip-below", !v), h.positioned && h.positioned(n.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let n of this.manager.tooltipViews)
        n.dom.style.top = Xn;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function Fa(n, e) {
  let t = parseInt(n.style.left, 10);
  (isNaN(t) || Math.abs(e - t) > 1) && (n.style.left = e + "px");
}
const Km = /* @__PURE__ */ N.baseTheme({
  ".cm-tooltip": {
    zIndex: 500,
    boxSizing: "border-box"
  },
  "&light .cm-tooltip": {
    border: "1px solid #bbb",
    backgroundColor: "#f5f5f5"
  },
  "&light .cm-tooltip-section:not(:first-child)": {
    borderTop: "1px solid #bbb"
  },
  "&dark .cm-tooltip": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tooltip-arrow": {
    height: "7px",
    width: `${7 * 2}px`,
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent"
    },
    ".cm-tooltip-above &": {
      bottom: "-7px",
      "&:before": {
        borderTop: "7px solid #bbb"
      },
      "&:after": {
        borderTop: "7px solid #f5f5f5",
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: "-7px",
      "&:before": {
        borderBottom: "7px solid #bbb"
      },
      "&:after": {
        borderBottom: "7px solid #f5f5f5",
        top: "1px"
      }
    }
  },
  "&dark .cm-tooltip .cm-tooltip-arrow": {
    "&:before": {
      borderTopColor: "#333338",
      borderBottomColor: "#333338"
    },
    "&:after": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    }
  }
}), Gm = { x: 0, y: 0 }, Tf = /* @__PURE__ */ E.define({
  enables: [Af, Km]
});
function Of(n, e) {
  let t = n.plugin(Af);
  if (!t)
    return null;
  let i = t.manager.tooltips.indexOf(e);
  return i < 0 ? null : t.manager.tooltipViews[i];
}
class Bi extends zt {
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(e) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(e) {
  }
}
Bi.prototype.elementClass = "";
Bi.prototype.toDOM = void 0;
Bi.prototype.mapMode = Ne.TrackBefore;
Bi.prototype.startSide = Bi.prototype.endSide = -1;
Bi.prototype.point = !0;
const Ro = E.define(), Jm = Me.define({
  create: (n) => {
    n.facet(Ro).at(0)?.(n.doc.sliceString(0), n);
  },
  update: (n, { state: e, docChanged: t }) => {
    t && e.facet(Ro).at(0)?.(e.doc.sliceString(0), e);
  }
}), Xm = (n) => n ? [Ro.of(n), Jm] : [], _f = 1024;
let Ym = 0;
class Er {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class z {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = Ym++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = e.combine || null;
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = ze.match(e)), (t) => {
      let i = e(t);
      return i === void 0 ? null : [this, i];
    };
  }
}
z.closedBy = new z({ deserialize: (n) => n.split(" ") });
z.openedBy = new z({ deserialize: (n) => n.split(" ") });
z.group = new z({ deserialize: (n) => n.split(" ") });
z.isolate = new z({ deserialize: (n) => {
  if (n && n != "rtl" && n != "ltr" && n != "auto")
    throw new RangeError("Invalid value for isolate: " + n);
  return n || "auto";
} });
z.contextHash = new z({ perNode: !0 });
z.lookAhead = new z({ perNode: !0 });
z.mounted = new z({ perNode: !0 });
class ln {
  constructor(e, t, i, s = !1) {
    this.tree = e, this.overlay = t, this.parser = i, this.bracketed = s;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[z.mounted.id];
  }
}
const Qm = /* @__PURE__ */ Object.create(null);
class ze {
  /**
  @internal
  */
  constructor(e, t, i, s = 0) {
    this.name = e, this.props = t, this.id = i, this.flags = s;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Qm, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new ze(e.name || "", t, e.id, i);
    if (e.props) {
      for (let r of e.props)
        if (Array.isArray(r) || (r = r(s)), r) {
          if (r[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[r[0].id] = r[1];
        }
    }
    return s;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(e) {
    return this.props[e.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(z.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e)
      for (let s of i.split(" "))
        t[s] = e[i];
    return (i) => {
      for (let s = i.prop(z.group), r = -1; r < (s ? s.length : 0); r++) {
        let o = t[r < 0 ? i.name : s[r]];
        if (o)
          return o;
      }
    };
  }
}
ze.none = new ze(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class kl {
  /**
  Create a set with the given types. The `id` property of each
  type should correspond to its position within the array.
  */
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /**
  Create a copy of this set with some node properties added. The
  arguments to this method can be created with
  [`NodeProp.add`](#common.NodeProp.add).
  */
  extend(...e) {
    let t = [];
    for (let i of this.types) {
      let s = null;
      for (let r of e) {
        let o = r(i);
        if (o) {
          s || (s = Object.assign({}, i.props));
          let l = o[1], a = o[0];
          a.combine && a.id in s && (l = a.combine(s[a.id], l)), s[a.id] = l;
        }
      }
      t.push(s ? new ze(i.name, s, i.id, i.flags) : i);
    }
    return new kl(t);
  }
}
const Yn = /* @__PURE__ */ new WeakMap(), za = /* @__PURE__ */ new WeakMap();
var ne;
(function(n) {
  n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays", n[n.EnterBracketed = 16] = "EnterBracketed";
})(ne || (ne = {}));
class le {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, i, s, r) {
    if (this.type = e, this.children = t, this.positions = i, this.length = s, this.props = null, r && r.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, l] of r)
        this.props[typeof o == "number" ? o : o.id] = l;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = ln.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let i of this.children) {
      let s = i.toString();
      s && (t && (t += ","), t += s);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(e = 0) {
    return new Do(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, i = 0) {
    let s = Yn.get(this) || this.topNode, r = new Do(s);
    return r.moveTo(e, t), Yn.set(this, r._tree), r;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new et(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(e, t = 0) {
    let i = kn(Yn.get(this) || this.topNode, e, t, !1);
    return Yn.set(this, i), i;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let i = kn(za.get(this) || this.topNode, e, t, !0);
    return za.set(this, i), i;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return tg(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: i, from: s = 0, to: r = this.length } = e, o = e.mode || 0, l = (o & ne.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | ne.IncludeAnonymous); ; ) {
      let h = !1;
      if (a.from <= r && a.to >= s && (!l && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        h = !0;
      }
      for (; h && i && (l || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
        if (!a.parent())
          return;
        h = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(e = {}) {
    return this.children.length <= 8 ? this : Sl(ze.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, s) => new le(this.type, t, i, s, this.propValues), e.makeTree || ((t, i, s) => new le(ze.none, t, i, s)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return ig(e);
  }
}
le.empty = new le(ze.none, [], [], 0);
class xl {
  constructor(e, t) {
    this.buffer = e, this.index = t;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new xl(this.buffer, this.index);
  }
}
class jt {
  /**
  Create a tree buffer.
  */
  constructor(e, t, i) {
    this.buffer = e, this.length = t, this.set = i;
  }
  /**
  @internal
  */
  get type() {
    return ze.none;
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /**
  @internal
  */
  childString(e) {
    let t = this.buffer[e], i = this.buffer[e + 3], s = this.set.types[t], r = s.name;
    if (/\W/.test(r) && !s.isError && (r = JSON.stringify(r)), e += 4, i == e)
      return r;
    let o = [];
    for (; e < i; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return r + "(" + o.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, i, s, r) {
    let { buffer: o } = this, l = -1;
    for (let a = e; a != t && !(Rf(r, s, o[a + 1], o[a + 2]) && (l = a, i > 0)); a = o[a + 3])
      ;
    return l;
  }
  /**
  @internal
  */
  slice(e, t, i) {
    let s = this.buffer, r = new Uint16Array(t - e), o = 0;
    for (let l = e, a = 0; l < t; ) {
      r[a++] = s[l++], r[a++] = s[l++] - i;
      let h = r[a++] = s[l++] - i;
      r[a++] = s[l++] - e, o = Math.max(o, h);
    }
    return new jt(r, o, this.set);
  }
}
function Rf(n, e, t, i) {
  switch (n) {
    case -2:
      return t < e;
    case -1:
      return i >= e && t < e;
    case 0:
      return t < e && i > e;
    case 1:
      return t <= e && i > e;
    case 2:
      return i > e;
    case 4:
      return !0;
  }
}
function kn(n, e, t, i) {
  for (var s; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
    let o = !i && n instanceof et && n.index < 0 ? null : n.parent;
    if (!o)
      return n;
    n = o;
  }
  let r = i ? 0 : ne.IgnoreOverlays;
  if (i)
    for (let o = n, l = o.parent; l; o = l, l = o.parent)
      o instanceof et && o.index < 0 && ((s = l.enter(e, t, r)) === null || s === void 0 ? void 0 : s.from) != o.from && (n = l);
  for (; ; ) {
    let o = n.enter(e, t, r);
    if (!o)
      return n;
    n = o;
  }
}
class Ef {
  cursor(e = 0) {
    return new Do(this, e);
  }
  getChild(e, t = null, i = null) {
    let s = Ha(this, e, t, i);
    return s.length ? s[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return Ha(this, e, t, i);
  }
  resolve(e, t = 0) {
    return kn(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return kn(this, e, t, !0);
  }
  matchContext(e) {
    return Eo(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), i = this;
    for (; t; ) {
      let s = t.lastChild;
      if (!s || s.to != t.to)
        break;
      s.type.isError && s.from == s.to ? (i = t, t = s.prevSibling) : t = s;
    }
    return i;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class et extends Ef {
  constructor(e, t, i, s) {
    super(), this._tree = e, this.from = t, this.index = i, this._parent = s;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(e, t, i, s, r = 0) {
    var o;
    for (let l = this; ; ) {
      for (let { children: a, positions: h } = l._tree, c = t > 0 ? a.length : -1; e != c; e += t) {
        let f = a[e], u = h[e] + l.from;
        if (!(!(r & ne.EnterBracketed && f instanceof le && ((o = ln.get(f)) === null || o === void 0 ? void 0 : o.overlay) === null && (u >= i || u + f.length <= i)) && !Rf(s, i, u, u + f.length))) {
          if (f instanceof jt) {
            if (r & ne.ExcludeBuffers)
              continue;
            let d = f.findChild(0, f.buffer.length, t, i - u, s);
            if (d > -1)
              return new It(new Zm(l, f, e, u), null, d);
          } else if (r & ne.IncludeAnonymous || !f.type.isAnonymous || wl(f)) {
            let d;
            if (!(r & ne.IgnoreMounts) && (d = ln.get(f)) && !d.overlay)
              return new et(d.tree, u, e, l);
            let p = new et(f, u, e, l);
            return r & ne.IncludeAnonymous || !p.type.isAnonymous ? p : p.nextChild(t < 0 ? f.children.length - 1 : 0, t, i, s, r);
          }
        }
      }
      if (r & ne.IncludeAnonymous || !l.type.isAnonymous || (l.index >= 0 ? e = l.index + t : e = t < 0 ? -1 : l._parent._tree.children.length, l = l._parent, !l))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this._tree.prop(e);
  }
  enter(e, t, i = 0) {
    let s;
    if (!(i & ne.IgnoreOverlays) && (s = ln.get(this._tree)) && s.overlay) {
      let r = e - this.from, o = i & ne.EnterBracketed && s.bracketed;
      for (let { from: l, to: a } of s.overlay)
        if ((t > 0 || o ? l <= r : l < r) && (t < 0 || o ? a >= r : a > r))
          return new et(s.tree, s.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, i);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function Ha(n, e, t, i) {
  let s = n.cursor(), r = [];
  if (!s.firstChild())
    return r;
  if (t != null) {
    for (let o = !1; !o; )
      if (o = s.type.is(t), !s.nextSibling())
        return r;
  }
  for (; ; ) {
    if (i != null && s.type.is(i))
      return r;
    if (s.type.is(e) && r.push(s.node), !s.nextSibling())
      return i == null ? r : [];
  }
}
function Eo(n, e, t = e.length - 1) {
  for (let i = n; t >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (e[t] && e[t] != i.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class Zm {
  constructor(e, t, i, s) {
    this.parent = e, this.buffer = t, this.index = i, this.start = s;
  }
}
class It extends Ef {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, i) {
    super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
  }
  child(e, t, i) {
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.context.start, i);
    return r < 0 ? null : new It(this.context, this, r);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this.type.prop(e);
  }
  enter(e, t, i = 0) {
    if (i & ne.ExcludeBuffers)
      return null;
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return r < 0 ? null : new It(this.context, this, r);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new It(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new It(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: i } = this.context, s = this.index + 4, r = i.buffer[this.index + 3];
    if (r > s) {
      let o = i.buffer[this.index + 1];
      e.push(i.slice(s, r, o)), t.push(0);
    }
    return new le(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function Df(n) {
  if (!n.length)
    return null;
  let e = 0, t = n[0];
  for (let r = 1; r < n.length; r++) {
    let o = n[r];
    (o.from > t.from || o.to < t.to) && (t = o, e = r);
  }
  let i = t instanceof et && t.index < 0 ? null : t.parent, s = n.slice();
  return i ? s[e] = i : s.splice(e, 1), new eg(s, t);
}
class eg {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return Df(this.heads);
  }
}
function tg(n, e, t) {
  let i = n.resolveInner(e, t), s = null;
  for (let r = i instanceof et ? i : i.context.parent; r; r = r.parent)
    if (r.index < 0) {
      let o = r.parent;
      (s || (s = [i])).push(o.resolve(e, t)), r = o;
    } else {
      let o = ln.get(r.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let l = new et(o.tree, o.overlay[0].from + r.from, -1, r);
        (s || (s = [i])).push(kn(l, e, t, !1));
      }
    }
  return s ? Df(s) : i;
}
class Do {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(e, t = 0) {
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~ne.EnterBracketed, e instanceof et)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let i = e._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: i, buffer: s } = this.buffer;
    return this.type = t || s.set.types[s.buffer[e]], this.from = i + s.buffer[e + 1], this.to = i + s.buffer[e + 2], !0;
  }
  /**
  @internal
  */
  yield(e) {
    return e ? e instanceof et ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(e, t, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
    let { buffer: s } = this.buffer, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.buffer.start, i);
    return r < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(r));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(e, t, i = this.mode) {
    return this.buffer ? i & ne.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & ne.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & ne.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, i = this.stack.length - 1;
    if (e < 0) {
      let s = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != s)
        return this.yieldBuf(t.findChild(
          s,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let s = t.buffer[this.index + 3];
      if (s < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3]))
        return this.yieldBuf(s);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(e) {
    let t, i, { buffer: s } = this;
    if (s) {
      if (e > 0) {
        if (this.index < s.buffer.buffer.length)
          return !1;
      } else
        for (let r = 0; r < this.index; r++)
          if (s.buffer.buffer[r + 3] < this.index)
            return !1;
      ({ index: t, parent: i } = s);
    } else
      ({ index: t, _parent: i } = this._tree);
    for (; i; { index: t, _parent: i } = i)
      if (t > -1)
        for (let r = t + e, o = e < 0 ? -1 : i._tree.children.length; r != o; r += e) {
          let l = i._tree.children[r];
          if (this.mode & ne.IncludeAnonymous || l instanceof jt || !l.type.isAnonymous || wl(l))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(e = !0) {
    return this.move(1, e);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(e = !0) {
    return this.move(-1, e);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let e = this.bufferNode, t = null, i = 0;
    if (e && e.context == this.buffer)
      e: for (let s = this.index, r = this.stack.length; r >= 0; ) {
        for (let o = e; o; o = o._parent)
          if (o.index == s) {
            if (s == this.index)
              return o;
            t = o, i = r + 1;
            break e;
          }
        s = this.stack[--r];
      }
    for (let s = i; s < this.stack.length; s++)
      t = new It(this.buffer, t, this.stack[s]);
    return this.bufferNode = new It(this.buffer, t, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(e, t) {
    for (let i = 0; ; ) {
      let s = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (s = !0);
      }
      for (; ; ) {
        if (s && t && t(this), s = this.type.isAnonymous, !i)
          return;
        if (this.nextSibling())
          break;
        this.parent(), i--, s = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(e) {
    if (!this.buffer)
      return Eo(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: i } = t.set;
    for (let s = e.length - 1, r = this.stack.length - 1; s >= 0; r--) {
      if (r < 0)
        return Eo(this._tree, e, s);
      let o = i[t.buffer[this.stack[r]]];
      if (!o.isAnonymous) {
        if (e[s] && e[s] != o.name)
          return !1;
        s--;
      }
    }
    return !0;
  }
}
function wl(n) {
  return n.children.some((e) => e instanceof jt || !e.type.isAnonymous || wl(e));
}
function ig(n) {
  var e;
  let { buffer: t, nodeSet: i, maxBufferLength: s = _f, reused: r = [], minRepeatType: o = i.types.length } = n, l = Array.isArray(t) ? new xl(t, t.length) : t, a = i.types, h = 0, c = 0;
  function f(C, T, A, I, L, W) {
    let { id: D, start: w, end: M, size: $ } = l, H = c, G = h;
    if ($ < 0)
      if (l.next(), $ == -1) {
        let ee = r[D];
        A.push(ee), I.push(w - C);
        return;
      } else if ($ == -3) {
        h = D;
        return;
      } else if ($ == -4) {
        c = D;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${$}`);
    let ke = a[D], ie, ae, Jt = w - C;
    if (M - w <= s && (ae = g(l.pos - T, L))) {
      let ee = new Uint16Array(ae.size - ae.skip), _ = l.pos - ae.size, F = ee.length;
      for (; l.pos > _; )
        F = y(ae.start, ee, F);
      ie = new jt(ee, M - ae.start, i), Jt = ae.start - C;
    } else {
      let ee = l.pos - $;
      l.next();
      let _ = [], F = [], j = D >= o ? D : -1, Pe = 0, Xt = M;
      for (; l.pos > ee; )
        j >= 0 && l.id == j && l.size >= 0 ? (l.end <= Xt - s && (p(_, F, w, Pe, l.end, Xt, j, H, G), Pe = _.length, Xt = l.end), l.next()) : W > 2500 ? u(w, ee, _, F) : f(w, ee, _, F, j, W + 1);
      if (j >= 0 && Pe > 0 && Pe < _.length && p(_, F, w, Pe, w, Xt, j, H, G), _.reverse(), F.reverse(), j > -1 && Pe > 0) {
        let Yt = d(ke, G);
        ie = Sl(ke, _, F, 0, _.length, 0, M - w, Yt, Yt);
      } else
        ie = m(ke, _, F, M - w, H - M, G);
    }
    A.push(ie), I.push(Jt);
  }
  function u(C, T, A, I) {
    let L = [], W = 0, D = -1;
    for (; l.pos > T; ) {
      let { id: w, start: M, end: $, size: H } = l;
      if (H > 4)
        l.next();
      else {
        if (D > -1 && M < D)
          break;
        D < 0 && (D = $ - s), L.push(w, M, $), W++, l.next();
      }
    }
    if (W) {
      let w = new Uint16Array(W * 4), M = L[L.length - 2];
      for (let $ = L.length - 3, H = 0; $ >= 0; $ -= 3)
        w[H++] = L[$], w[H++] = L[$ + 1] - M, w[H++] = L[$ + 2] - M, w[H++] = H;
      A.push(new jt(w, L[2] - M, i)), I.push(M - C);
    }
  }
  function d(C, T) {
    return (A, I, L) => {
      let W = 0, D = A.length - 1, w, M;
      if (D >= 0 && (w = A[D]) instanceof le) {
        if (!D && w.type == C && w.length == L)
          return w;
        (M = w.prop(z.lookAhead)) && (W = I[D] + w.length + M);
      }
      return m(C, A, I, L, W, T);
    };
  }
  function p(C, T, A, I, L, W, D, w, M) {
    let $ = [], H = [];
    for (; C.length > I; )
      $.push(C.pop()), H.push(T.pop() + A - L);
    C.push(m(i.types[D], $, H, W - L, w - W, M)), T.push(L - A);
  }
  function m(C, T, A, I, L, W, D) {
    if (W) {
      let w = [z.contextHash, W];
      D = D ? [w].concat(D) : [w];
    }
    if (L > 25) {
      let w = [z.lookAhead, L];
      D = D ? [w].concat(D) : [w];
    }
    return new le(C, T, A, I, D);
  }
  function g(C, T) {
    let A = l.fork(), I = 0, L = 0, W = 0, D = A.end - s, w = { size: 0, start: 0, skip: 0 };
    e: for (let M = A.pos - C; A.pos > M; ) {
      let $ = A.size;
      if (A.id == T && $ >= 0) {
        w.size = I, w.start = L, w.skip = W, W += 4, I += 4, A.next();
        continue;
      }
      let H = A.pos - $;
      if ($ < 0 || H < M || A.start < D)
        break;
      let G = A.id >= o ? 4 : 0, ke = A.start;
      for (A.next(); A.pos > H; ) {
        if (A.size < 0)
          if (A.size == -3 || A.size == -4)
            G += 4;
          else
            break e;
        else A.id >= o && (G += 4);
        A.next();
      }
      L = ke, I += $, W += G;
    }
    return (T < 0 || I == C) && (w.size = I, w.start = L, w.skip = W), w.size > 4 ? w : void 0;
  }
  function y(C, T, A) {
    let { id: I, start: L, end: W, size: D } = l;
    if (l.next(), D >= 0 && I < o) {
      let w = A;
      if (D > 4) {
        let M = l.pos - (D - 4);
        for (; l.pos > M; )
          A = y(C, T, A);
      }
      T[--A] = w, T[--A] = W - C, T[--A] = L - C, T[--A] = I;
    } else D == -3 ? h = I : D == -4 && (c = I);
    return A;
  }
  let b = [], x = [];
  for (; l.pos > 0; )
    f(n.start || 0, n.bufferStart || 0, b, x, -1, 0);
  let v = (e = n.length) !== null && e !== void 0 ? e : b.length ? x[0] + b[0].length : 0;
  return new le(a[n.topID], b.reverse(), x.reverse(), v);
}
const Wa = /* @__PURE__ */ new WeakMap();
function hs(n, e) {
  if (!n.isAnonymous || e instanceof jt || e.type != n)
    return 1;
  let t = Wa.get(e);
  if (t == null) {
    t = 1;
    for (let i of e.children) {
      if (i.type != n || !(i instanceof le)) {
        t = 1;
        break;
      }
      t += hs(n, i);
    }
    Wa.set(e, t);
  }
  return t;
}
function Sl(n, e, t, i, s, r, o, l, a) {
  let h = 0;
  for (let p = i; p < s; p++)
    h += hs(n, e[p]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], u = [];
  function d(p, m, g, y, b) {
    for (let x = g; x < y; ) {
      let v = x, C = m[x], T = hs(n, p[x]);
      for (x++; x < y; x++) {
        let A = hs(n, p[x]);
        if (T + A >= c)
          break;
        T += A;
      }
      if (x == v + 1) {
        if (T > c) {
          let A = p[v];
          d(A.children, A.positions, 0, A.children.length, m[v] + b);
          continue;
        }
        f.push(p[v]);
      } else {
        let A = m[x - 1] + p[x - 1].length - C;
        f.push(Sl(n, p, m, v, x, C, A, null, a));
      }
      u.push(C + b - r);
    }
  }
  return d(e, t, i, s, 0), (l || a)(f, u, o);
}
class li {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(e, t, i, s, r = !1, o = !1) {
    this.from = e, this.to = t, this.tree = i, this.offset = s, this.open = (r ? 1 : 0) | (o ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(e, t = [], i = !1) {
    let s = [new li(0, e.length, e, 0, !1, i)];
    for (let r of t)
      r.to > e.length && s.push(r);
    return s;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(e, t, i = 128) {
    if (!t.length)
      return e;
    let s = [], r = 1, o = e.length ? e[0] : null;
    for (let l = 0, a = 0, h = 0; ; l++) {
      let c = l < t.length ? t[l] : null, f = c ? c.fromA : 1e9;
      if (f - a >= i)
        for (; o && o.from < f; ) {
          let u = o;
          if (a >= u.from || f <= u.to || h) {
            let d = Math.max(u.from, a) - h, p = Math.min(u.to, f) - h;
            u = d >= p ? null : new li(d, p, u.tree, u.offset + h, l > 0, !!c);
          }
          if (u && s.push(u), o.to > f)
            break;
          o = r < e.length ? e[r++] : null;
        }
      if (!c)
        break;
      a = c.toA, h = c.toA - c.toB;
    }
    return s;
  }
}
class Mf {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, i) {
    return typeof e == "string" && (e = new ng(e)), i = i ? i.length ? i.map((s) => new Er(s.from, s.to)) : [new Er(0, 0)] : [new Er(0, e.length)], this.createParse(e, t || [], i);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, i) {
    let s = this.startParse(e, t, i);
    for (; ; ) {
      let r = s.advance();
      if (r)
        return r;
    }
  }
}
class ng {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
new z({ perNode: !0 });
let sg = 0;
class de {
  /**
  @internal
  */
  constructor(e, t, i, s) {
    this.name = e, this.set = t, this.base = i, this.modified = s, this.id = sg++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let i = typeof e == "string" ? e : "?";
    if (e instanceof de && (t = e), t?.base)
      throw new Error("Can not derive from a modified tag");
    let s = new de(i, [], null, []);
    if (s.set.push(s), t)
      for (let r of t.set)
        s.set.push(r);
    return s;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(e) {
    let t = new Es(e);
    return (i) => i.modified.indexOf(t) > -1 ? i : Es.get(i.base || i, i.modified.concat(t).sort((s, r) => s.id - r.id));
  }
}
let rg = 0;
class Es {
  constructor(e) {
    this.name = e, this.instances = [], this.id = rg++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let i = t[0].instances.find((l) => l.base == e && og(t, l.modified));
    if (i)
      return i;
    let s = [], r = new de(e.name, s, e, t);
    for (let l of t)
      l.instances.push(r);
    let o = lg(t);
    for (let l of e.set)
      if (!l.modified.length)
        for (let a of o)
          s.push(Es.get(l, a));
    return r;
  }
}
function og(n, e) {
  return n.length == e.length && n.every((t, i) => t == e[i]);
}
function lg(n) {
  let e = [[]];
  for (let t = 0; t < n.length; t++)
    for (let i = 0, s = e.length; i < s; i++)
      e.push(e[i].concat(n[t]));
  return e.sort((t, i) => i.length - t.length);
}
function Pf(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let i = n[t];
    Array.isArray(i) || (i = [i]);
    for (let s of t.split(" "))
      if (s) {
        let r = [], o = 2, l = s;
        for (let f = 0; ; ) {
          if (l == "..." && f > 0 && f + 3 == s.length) {
            o = 1;
            break;
          }
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
          if (!u)
            throw new RangeError("Invalid path: " + s);
          if (r.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), f += u[0].length, f == s.length)
            break;
          let d = s[f++];
          if (f == s.length && d == "!") {
            o = 0;
            break;
          }
          if (d != "/")
            throw new RangeError("Invalid path: " + s);
          l = s.slice(f);
        }
        let a = r.length - 1, h = r[a];
        if (!h)
          throw new RangeError("Invalid path: " + s);
        let c = new xn(i, o, a > 0 ? r.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return Bf.add(e);
}
const Bf = new z({
  combine(n, e) {
    let t, i, s;
    for (; n || e; ) {
      if (!n || e && n.depth >= e.depth ? (s = e, e = e.next) : (s = n, n = n.next), t && t.mode == s.mode && !s.context && !t.context)
        continue;
      let r = new xn(s.tags, s.mode, s.context);
      t ? t.next = r : i = r, t = r;
    }
    return i;
  }
});
let xn = class {
  constructor(e, t, i, s) {
    this.tags = e, this.mode = t, this.context = i, this.next = s;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
};
xn.empty = new xn([], 2, null);
function Nf(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r of n)
    if (!Array.isArray(r.tag))
      t[r.tag.id] = r.class;
    else
      for (let o of r.tag)
        t[o.id] = r.class;
  let { scope: i, all: s = null } = e || {};
  return {
    style: (r) => {
      let o = s;
      for (let l of r)
        for (let a of l.set) {
          let h = t[a.id];
          if (h) {
            o = o ? o + " " + h : h;
            break;
          }
        }
      return o;
    },
    scope: i
  };
}
function ag(n, e) {
  let t = null;
  for (let i of n) {
    let s = i.style(e);
    s && (t = t ? t + " " + s : s);
  }
  return t;
}
function hg(n, e, t, i = 0, s = n.length) {
  let r = new cg(i, Array.isArray(e) ? e : [e], t);
  r.highlightRange(n.cursor(), i, s, "", r.highlighters), r.flush(s);
}
class cg {
  constructor(e, t, i) {
    this.at = e, this.highlighters = t, this.span = i, this.class = "";
  }
  startSpan(e, t) {
    t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
  }
  flush(e) {
    e > this.at && this.class && this.span(this.at, e, this.class);
  }
  highlightRange(e, t, i, s, r) {
    let { type: o, from: l, to: a } = e;
    if (l >= i || a <= t)
      return;
    o.isTop && (r = this.highlighters.filter((d) => !d.scope || d.scope(o)));
    let h = s, c = fg(e) || xn.empty, f = ag(r, c.tags);
    if (f && (h && (h += " "), h += f, c.mode == 1 && (s += (s ? " " : "") + f)), this.startSpan(Math.max(t, l), h), c.opaque)
      return;
    let u = e.tree && e.tree.prop(z.mounted);
    if (u && u.overlay) {
      let d = e.node.enter(u.overlay[0].from + l, 1), p = this.highlighters.filter((g) => !g.scope || g.scope(u.tree.type)), m = e.firstChild();
      for (let g = 0, y = l; ; g++) {
        let b = g < u.overlay.length ? u.overlay[g] : null, x = b ? b.from + l : a, v = Math.max(t, y), C = Math.min(i, x);
        if (v < C && m)
          for (; e.from < C && (this.highlightRange(e, v, C, s, r), this.startSpan(Math.min(C, e.to), h), !(e.to >= x || !e.nextSibling())); )
            ;
        if (!b || x > i)
          break;
        y = b.to + l, y > t && (this.highlightRange(d.cursor(), Math.max(t, b.from + l), Math.min(i, y), "", p), this.startSpan(Math.min(i, y), h));
      }
      m && e.parent();
    } else if (e.firstChild()) {
      u && (s = "");
      do
        if (!(e.to <= t)) {
          if (e.from >= i)
            break;
          this.highlightRange(e, t, i, s, r), this.startSpan(Math.min(i, e.to), h);
        }
      while (e.nextSibling());
      e.parent();
    }
  }
}
function fg(n) {
  let e = n.type.prop(Bf);
  for (; e && e.context && !n.matchContext(e.context); )
    e = e.next;
  return e || null;
}
const O = de.define, Qn = O(), Mt = O(), Va = O(Mt), ja = O(Mt), Pt = O(), Zn = O(Pt), Dr = O(Pt), bt = O(), Qt = O(bt), mt = O(), gt = O(), Mo = O(), Vi = O(Mo), es = O(), P = {
  /**
  A comment.
  */
  comment: Qn,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: O(Qn),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: O(Qn),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: O(Qn),
  /**
  Any kind of identifier.
  */
  name: Mt,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: O(Mt),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: Va,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: O(Va),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: ja,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: O(ja),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: O(Mt),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: O(Mt),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: O(Mt),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: O(Mt),
  /**
  A literal value.
  */
  literal: Pt,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: Zn,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: O(Zn),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: O(Zn),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: O(Zn),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: Dr,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: O(Dr),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: O(Dr),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: O(Pt),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: O(Pt),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: O(Pt),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: O(Pt),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: O(Pt),
  /**
  A language keyword.
  */
  keyword: mt,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: O(mt),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: O(mt),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: O(mt),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: O(mt),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: O(mt),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: O(mt),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: O(mt),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: O(mt),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: O(mt),
  /**
  An operator.
  */
  operator: gt,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: O(gt),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: O(gt),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: O(gt),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: O(gt),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: O(gt),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: O(gt),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: O(gt),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: O(gt),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: O(gt),
  /**
  Program or markup punctuation.
  */
  punctuation: Mo,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: O(Mo),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: Vi,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: O(Vi),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: O(Vi),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: O(Vi),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: O(Vi),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: bt,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: Qt,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: O(Qt),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: O(Qt),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: O(Qt),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: O(Qt),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: O(Qt),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: O(Qt),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: O(bt),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: O(bt),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: O(bt),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: O(bt),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: O(bt),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: O(bt),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: O(bt),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: O(bt),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: O(),
  /**
  Deleted text.
  */
  deleted: O(),
  /**
  Changed text.
  */
  changed: O(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: O(),
  /**
  Metadata or meta-instruction.
  */
  meta: es,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: O(es),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: O(es),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: O(es),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: de.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: de.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: de.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: de.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: de.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: de.defineModifier("special")
};
for (let n in P) {
  let e = P[n];
  e instanceof de && (e.name = n);
}
Nf([
  { tag: P.link, class: "tok-link" },
  { tag: P.heading, class: "tok-heading" },
  { tag: P.emphasis, class: "tok-emphasis" },
  { tag: P.strong, class: "tok-strong" },
  { tag: P.keyword, class: "tok-keyword" },
  { tag: P.atom, class: "tok-atom" },
  { tag: P.bool, class: "tok-bool" },
  { tag: P.url, class: "tok-url" },
  { tag: P.labelName, class: "tok-labelName" },
  { tag: P.inserted, class: "tok-inserted" },
  { tag: P.deleted, class: "tok-deleted" },
  { tag: P.literal, class: "tok-literal" },
  { tag: P.string, class: "tok-string" },
  { tag: P.number, class: "tok-number" },
  { tag: [P.regexp, P.escape, P.special(P.string)], class: "tok-string2" },
  { tag: P.variableName, class: "tok-variableName" },
  { tag: P.local(P.variableName), class: "tok-variableName tok-local" },
  { tag: P.definition(P.variableName), class: "tok-variableName tok-definition" },
  { tag: P.special(P.variableName), class: "tok-variableName2" },
  { tag: P.definition(P.propertyName), class: "tok-propertyName tok-definition" },
  { tag: P.typeName, class: "tok-typeName" },
  { tag: P.namespace, class: "tok-namespace" },
  { tag: P.className, class: "tok-className" },
  { tag: P.macroName, class: "tok-macroName" },
  { tag: P.propertyName, class: "tok-propertyName" },
  { tag: P.operator, class: "tok-operator" },
  { tag: P.comment, class: "tok-comment" },
  { tag: P.meta, class: "tok-meta" },
  { tag: P.invalid, class: "tok-invalid" },
  { tag: P.punctuation, class: "tok-punctuation" }
]);
var Mr;
const ki = /* @__PURE__ */ new z();
function ug(n) {
  return E.define({
    combine: n ? (e) => e.concat(n) : void 0
  });
}
const dg = /* @__PURE__ */ new z();
class lt {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, i = [], s = "") {
    this.data = e, this.name = s, q.prototype.hasOwnProperty("tree") || Object.defineProperty(q.prototype, "tree", { get() {
      return re(this);
    } }), this.parser = t, this.extension = [
      Ii.of(this),
      q.languageData.of((r, o, l) => {
        let a = qa(r, o, l), h = a.type.prop(ki);
        if (!h)
          return [];
        let c = r.facet(h), f = a.type.prop(dg);
        if (f) {
          let u = a.resolve(o - a.from, l);
          for (let d of f)
            if (d.test(u, r)) {
              let p = r.facet(d.facet);
              return d.type == "replace" ? p : p.concat(c);
            }
        }
        return c;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, i = -1) {
    return qa(e, t, i).type.prop(ki) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(Ii);
    if (t?.data == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let i = [], s = (r, o) => {
      if (r.prop(ki) == this.data) {
        i.push({ from: o, to: o + r.length });
        return;
      }
      let l = r.prop(z.mounted);
      if (l) {
        if (l.tree.prop(ki) == this.data) {
          if (l.overlay)
            for (let a of l.overlay)
              i.push({ from: a.from + o, to: a.to + o });
          else
            i.push({ from: o, to: o + r.length });
          return;
        } else if (l.overlay) {
          let a = i.length;
          if (s(l.tree, l.overlay[0].from + o), i.length > a)
            return;
        }
      }
      for (let a = 0; a < r.children.length; a++) {
        let h = r.children[a];
        h instanceof le && s(h, r.positions[a] + o);
      }
    };
    return s(re(e), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
lt.setState = /* @__PURE__ */ J.define();
function qa(n, e, t) {
  let i = n.facet(Ii), s = re(n).topNode;
  if (!i || i.allowsNesting)
    for (let r = s; r; r = r.enter(e, t, ne.ExcludeBuffers | ne.EnterBracketed))
      r.type.isTop && (s = r);
  return s;
}
class Ds extends lt {
  constructor(e, t, i) {
    super(e, t, [], i), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = ug(e.languageData);
    return new Ds(t, e.parser.configure({
      props: [ki.add((i) => i.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new Ds(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function re(n) {
  let e = n.field(lt.state, !1);
  return e ? e.tree : le.empty;
}
class pg {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let i = this.cursorPos - this.string.length;
    return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
  }
}
let ji = null;
class Ms {
  constructor(e, t, i = [], s, r, o, l, a) {
    this.parser = e, this.state = t, this.fragments = i, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Ms(e, t, [], le.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new pg(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != le.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof e == "number") {
        let s = Date.now() + e;
        e = () => Date.now() > s;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let s = this.parse.advance();
        if (s)
          if (this.fragments = this.withoutTempSkipped(li.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(li.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = ji;
    ji = this;
    try {
      return e();
    } finally {
      ji = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = Ua(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: i, tree: s, treeLen: r, viewport: o, skipped: l } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, c, f, u) => a.push({ fromA: h, toA: c, fromB: f, toB: u })), i = li.applyChanges(i, a), s = le.empty, r = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && l.push({ from: c, to: f });
        }
      }
    }
    return new Ms(this.parser, t, i, s, r, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: s, to: r } = this.skipped[i];
      s < e.to && r > e.from && (this.fragments = Ua(this.fragments, s, r), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends Mf {
      createParse(t, i, s) {
        let r = s[0].from, o = s[s.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let a = ji;
            if (a) {
              for (let h of s)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new le(ze.none, [], [], o - r);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return ji;
  }
}
function Ua(n, e, t) {
  return li.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class Ni {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, i) || t.takeTree(), new Ni(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), i = Ms.create(e.facet(Ii).parser, e, { from: 0, to: t });
    return i.work(20, t) || i.takeTree(), new Ni(i);
  }
}
lt.state = /* @__PURE__ */ Me.define({
  create: Ni.init,
  update(n, e) {
    for (let t of e.effects)
      if (t.is(lt.setState))
        return t.value;
    return e.startState.facet(Ii) != e.state.facet(Ii) ? Ni.init(e.state) : n.apply(e);
  }
});
let If = (n) => {
  let e = setTimeout(
    () => n(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (If = (n) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(n, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const Pr = typeof navigator < "u" && (!((Mr = navigator.scheduling) === null || Mr === void 0) && Mr.isInputPending) ? () => navigator.scheduling.isInputPending() : null, mg = /* @__PURE__ */ it.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(lt.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(lt.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = If(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: s } } = this.view, r = i.field(lt.state);
    if (r.tree == r.context.tree && r.context.isDone(
      s + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !Pr ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = r.context.treeLen < s && i.doc.length > s + 1e3, a = r.context.work(() => Pr && Pr() || Date.now() > o, s + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: lt.setState.of(new Ni(r.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => je(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), Ii = /* @__PURE__ */ E.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    lt.state,
    mg,
    N.contentAttributes.compute([n], (e) => {
      let t = e.facet(n);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class gg {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const yg = /* @__PURE__ */ E.define(), vl = /* @__PURE__ */ E.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let e = n[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return e;
  }
});
function Ps(n) {
  let e = n.facet(vl);
  return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
}
function wn(n, e) {
  let t = "", i = n.tabSize, s = n.facet(vl)[0];
  if (s == "	") {
    for (; e >= i; )
      t += "	", e -= i;
    s = " ";
  }
  for (let r = 0; r < e; r++)
    t += s;
  return t;
}
function Cl(n, e) {
  n instanceof q && (n = new ir(n));
  for (let i of n.state.facet(yg)) {
    let s = i(n, e);
    if (s !== void 0)
      return s;
  }
  let t = re(n.state);
  return t.length >= e ? bg(n, t, e) : null;
}
class ir {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = Ps(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let i = this.state.doc.lineAt(e), { simulateBreak: s, simulateDoubleBreak: r } = this.options;
    return s != null && s >= i.from && s <= i.to ? r && s == e ? { text: "", from: e } : (t < 0 ? s < e : s <= e) ? { text: i.text.slice(s - i.from), from: s } : { text: i.text.slice(0, s - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: i, from: s } = this.lineAt(e, t);
    return i.slice(e - s, Math.min(i.length, e + 100 - s));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: i, from: s } = this.lineAt(e, t), r = this.countColumn(i, e - s), o = this.options.overrideIndentation ? this.options.overrideIndentation(s) : -1;
    return o > -1 && (r += o - this.countColumn(i, i.search(/\S|$/))), r;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return Gs(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: i, from: s } = this.lineAt(e, t), r = this.options.overrideIndentation;
    if (r) {
      let o = r(s);
      if (o > -1)
        return o;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const Lf = /* @__PURE__ */ new z();
function bg(n, e, t) {
  let i = e.resolveStack(t), s = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (s != i.node) {
    let r = [];
    for (let o = s; o && !(o.from < i.node.from || o.to > i.node.to || o.from == i.node.from && o.type == i.node.type); o = o.parent)
      r.push(o);
    for (let o = r.length - 1; o >= 0; o--)
      i = { node: r[o], next: i };
  }
  return $f(i, n, t);
}
function $f(n, e, t) {
  for (let i = n; i; i = i.next) {
    let s = xg(i.node);
    if (s)
      return s(Al.create(e, t, i));
  }
  return 0;
}
function kg(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function xg(n) {
  let e = n.type.prop(Lf);
  if (e)
    return e;
  let t = n.firstChild, i;
  if (t && (i = t.type.prop(z.closedBy))) {
    let s = n.lastChild, r = s && i.indexOf(s.name) > -1;
    return (o) => Cg(o, !0, 1, void 0, r && !kg(o) ? s.from : void 0);
  }
  return n.parent == null ? wg : null;
}
function wg() {
  return 0;
}
class Al extends ir {
  constructor(e, t, i) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Al(e, t, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let i = e.resolve(t.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (Sg(i, e))
        break;
      t = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return $f(this.context.next, this.base, this.pos);
  }
}
function Sg(n, e) {
  for (let t = e; t; t = t.parent)
    if (n == t)
      return !0;
  return !1;
}
function vg(n) {
  let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
  if (!t)
    return null;
  let s = n.options.simulateBreak, r = n.state.doc.lineAt(t.from), o = s == null || s <= r.from ? r.to : Math.min(r.to, s);
  for (let l = t.to; ; ) {
    let a = e.childAfter(l);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped) {
      if (a.from >= o)
        return null;
      let h = /^ */.exec(r.text.slice(t.to - r.from))[0].length;
      return { from: t.from, to: t.to + h };
    }
    l = a.to;
  }
}
function Cg(n, e, t, i, s) {
  let r = n.textAfter, o = r.match(/^\s*/)[0].length, l = i && r.slice(o, o + i.length) == i || s == n.pos + o, a = vg(n);
  return a ? l ? n.column(a.from) : n.column(a.to) : n.baseIndent + (l ? 0 : n.unit * t);
}
const Ag = 200;
function Tg() {
  return q.transactionFilter.of((n) => {
    if (!n.docChanged || !n.isUserEvent("input.type") && !n.isUserEvent("input.complete"))
      return n;
    let e = n.startState.languageDataAt("indentOnInput", n.startState.selection.main.head);
    if (!e.length)
      return n;
    let t = n.newDoc, { head: i } = n.newSelection.main, s = t.lineAt(i);
    if (i > s.from + Ag)
      return n;
    let r = t.sliceString(s.from, i);
    if (!e.some((h) => h.test(r)))
      return n;
    let { state: o } = n, l = -1, a = [];
    for (let { head: h } of o.selection.ranges) {
      let c = o.doc.lineAt(h);
      if (c.from == l)
        continue;
      l = c.from;
      let f = Cl(o, c.from);
      if (f == null)
        continue;
      let u = /^\s*/.exec(c.text)[0], d = wn(o, f);
      u != d && a.push({ from: c.from, to: c.from + u.length, insert: d });
    }
    return a.length ? [n, { changes: a, sequential: !0 }] : n;
  });
}
const Og = /* @__PURE__ */ new z();
function _g(n) {
  let e = n.firstChild, t = n.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? n.to : t.from } : null;
}
class nr {
  constructor(e, t) {
    this.specs = e;
    let i;
    function s(l) {
      let a = Ht.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = l, a;
    }
    const r = typeof t.all == "string" ? t.all : t.all ? s(t.all) : void 0, o = t.scope;
    this.scope = o instanceof lt ? (l) => l.prop(ki) == o.data : o ? (l) => l == o : void 0, this.style = Nf(e.map((l) => ({
      tag: l.tag,
      class: l.class || s(Object.assign({}, l, { tag: null }))
    })), {
      all: r
    }).style, this.module = i ? new Ht(i) : null, this.themeType = t.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(e, t) {
    return new nr(e, t || {});
  }
}
const Po = /* @__PURE__ */ E.define(), Rg = /* @__PURE__ */ E.define({
  combine(n) {
    return n.length ? [n[0]] : null;
  }
});
function Br(n) {
  let e = n.facet(Po);
  return e.length ? e : n.facet(Rg);
}
function Eg(n, e) {
  let t = [Mg], i;
  return n instanceof nr && (n.module && t.push(N.styleModule.of(n.module)), i = n.themeType), i ? t.push(Po.computeN([N.darkTheme], (s) => s.facet(N.darkTheme) == (i == "dark") ? [n] : [])) : t.push(Po.of(n)), t;
}
class Dg {
  constructor(e) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = re(e.state), this.decorations = this.buildDeco(e, Br(e.state)), this.decoratedTo = e.viewport.to;
  }
  update(e) {
    let t = re(e.state), i = Br(e.state), s = i != Br(e.startState), { viewport: r } = e.view, o = e.changes.mapPos(this.decoratedTo, 1);
    t.length < r.to && !s && t.type == this.tree.type && o >= r.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = o) : (t != this.tree || e.viewportChanged || s) && (this.tree = t, this.decorations = this.buildDeco(e.view, i), this.decoratedTo = r.to);
  }
  buildDeco(e, t) {
    if (!t || !this.tree.length)
      return te.none;
    let i = new pn();
    for (let { from: s, to: r } of e.visibleRanges)
      hg(this.tree, t, (o, l, a) => {
        i.add(o, l, this.markCache[a] || (this.markCache[a] = te.mark({ class: a })));
      }, s, r);
    return i.finish();
  }
}
const Mg = /* @__PURE__ */ Tn.high(/* @__PURE__ */ it.fromClass(Dg, {
  decorations: (n) => n.decorations
})), Pg = 1e4, Bg = "()[]{}", Ng = /* @__PURE__ */ new z();
function Bo(n, e, t) {
  let i = n.prop(e < 0 ? z.openedBy : z.closedBy);
  if (i)
    return i;
  if (n.name.length == 1) {
    let s = t.indexOf(n.name);
    if (s > -1 && s % 2 == (e < 0 ? 1 : 0))
      return [t[s + e]];
  }
  return null;
}
function No(n) {
  let e = n.type.prop(Ng);
  return e ? e(n.node) : n;
}
function xi(n, e, t, i = {}) {
  let s = i.maxScanDistance || Pg, r = i.brackets || Bg, o = re(n), l = o.resolveInner(e, t);
  for (let a = l; a; a = a.parent) {
    let h = Bo(a.type, t, r);
    if (h && a.from < a.to) {
      let c = No(a);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return Ig(n, e, t, a, c, h, r);
    }
  }
  return Lg(n, e, t, o, l.type, s, r);
}
function Ig(n, e, t, i, s, r, o) {
  let l = i.parent, a = { from: s.from, to: s.to }, h = 0, c = l?.cursor();
  if (c && (t < 0 ? c.childBefore(i.from) : c.childAfter(i.to)))
    do
      if (t < 0 ? c.to <= i.from : c.from >= i.to) {
        if (h == 0 && r.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = No(c);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (Bo(c.type, t, o))
          h++;
        else if (Bo(c.type, -t, o)) {
          if (h == 0) {
            let f = No(c);
            return {
              start: a,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          h--;
        }
      }
    while (t < 0 ? c.prevSibling() : c.nextSibling());
  return { start: a, matched: !1 };
}
function Lg(n, e, t, i, s, r, o) {
  let l = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
  for (let u = 0; !c.next().done && u <= r; ) {
    let d = c.value;
    t < 0 && (u += d.length);
    let p = e + u * t;
    for (let m = t > 0 ? 0 : d.length - 1, g = t > 0 ? d.length : -1; m != g; m += t) {
      let y = o.indexOf(d[m]);
      if (!(y < 0 || i.resolveInner(p + m, 1).type != s))
        if (y % 2 == 0 == t > 0)
          f++;
        else {
          if (f == 1)
            return { start: h, end: { from: p + m, to: p + m + 1 }, matched: y >> 1 == a >> 1 };
          f--;
        }
    }
    t > 0 && (u += d.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
const $g = /* @__PURE__ */ Object.create(null), Ka = [ze.none], Ga = [], Ja = /* @__PURE__ */ Object.create(null), Fg = /* @__PURE__ */ Object.create(null);
for (let [n, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  Fg[n] = /* @__PURE__ */ zg($g, e);
function Nr(n, e) {
  Ga.indexOf(n) > -1 || (Ga.push(n), console.warn(e));
}
function zg(n, e) {
  let t = [];
  for (let l of e.split(" ")) {
    let a = [];
    for (let h of l.split(".")) {
      let c = n[h] || P[h];
      c ? typeof c == "function" ? a.length ? a = a.map(c) : Nr(h, `Modifier ${h} used at start of tag`) : a.length ? Nr(h, `Tag ${h} used as modifier`) : a = Array.isArray(c) ? c : [c] : Nr(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of a)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let i = e.replace(/ /g, "_"), s = i + " " + t.map((l) => l.id), r = Ja[s];
  if (r)
    return r.id;
  let o = Ja[s] = ze.define({
    id: Ka.length,
    name: i,
    props: [Pf({ [i]: t })]
  });
  return Ka.push(o), o.id;
}
se.RTL, se.LTR;
class Bs {
  /**
  @internal
  */
  constructor(e, t, i, s, r, o, l, a, h, c = 0, f) {
    this.p = e, this.stack = t, this.state = i, this.reducePos = s, this.pos = r, this.score = o, this.buffer = l, this.bufferBase = a, this.curContext = h, this.lookAhead = c, this.parent = f;
  }
  /**
  @internal
  */
  toString() {
    return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /**
  @internal
  */
  static start(e, t, i = 0) {
    let s = e.parser.context;
    return new Bs(e, [], t, i, i, 0, [], 0, s ? new Xa(s, s.start) : null, 0, null);
  }
  /**
  The stack's current [context](#lr.ContextTracker) value, if
  any. Its type will depend on the context tracker's type
  parameter, or it will be `null` if there is no context
  tracker.
  */
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /**
  @internal
  */
  pushState(e, t) {
    this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
  }
  // Apply a reduce action
  /**
  @internal
  */
  reduce(e) {
    var t;
    let i = e >> 19, s = e & 65535, { parser: r } = this.p, o = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), l = r.dynamicPrecedence(s);
    if (l && (this.score += l), i == 0) {
      this.pushState(r.getGoto(this.state, s, !0), this.reducePos), s < r.minRepeatTerm && this.storeNode(s, this.reducePos, this.reducePos, o ? 8 : 4, !0), this.reduceContext(s, this.reducePos);
      return;
    }
    let a = this.stack.length - (i - 1) * 3 - (e & 262144 ? 6 : 0), h = a ? this.stack[a - 2] : this.p.ranges[0].from, c = this.reducePos - h;
    c >= 2e3 && !(!((t = this.p.parser.nodeSet.types[s]) === null || t === void 0) && t.isAnonymous) && (h == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = h, this.p.lastBigReductionSize = c));
    let f = a ? this.stack[a - 1] : 0, u = this.bufferBase + this.buffer.length - f;
    if (s < r.minRepeatTerm || e & 131072) {
      let d = r.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(s, h, d, u + 4, !0);
    }
    if (e & 262144)
      this.state = this.stack[a];
    else {
      let d = this.stack[a - 3];
      this.state = r.getGoto(d, s, !0);
    }
    for (; this.stack.length > a; )
      this.stack.pop();
    this.reduceContext(s, h);
  }
  // Shift a value into the buffer
  /**
  @internal
  */
  storeNode(e, t, i, s = 4, r = !1) {
    if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let o = this, l = this.buffer.length;
      if (l == 0 && o.parent && (l = o.bufferBase - o.parent.bufferBase, o = o.parent), l > 0 && o.buffer[l - 4] == 0 && o.buffer[l - 1] > -1) {
        if (t == i)
          return;
        if (o.buffer[l - 2] >= t) {
          o.buffer[l - 2] = i;
          return;
        }
      }
    }
    if (!r || this.pos == i)
      this.buffer.push(e, t, i, s);
    else {
      let o = this.buffer.length;
      if (o > 0 && (this.buffer[o - 4] != 0 || this.buffer[o - 1] < 0)) {
        let l = !1;
        for (let a = o; a > 0 && this.buffer[a - 2] > i; a -= 4)
          if (this.buffer[a - 1] >= 0) {
            l = !0;
            break;
          }
        if (l)
          for (; o > 0 && this.buffer[o - 2] > i; )
            this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, s > 4 && (s -= 4);
      }
      this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = i, this.buffer[o + 3] = s;
    }
  }
  // Apply a shift action
  /**
  @internal
  */
  shift(e, t, i, s) {
    if (e & 131072)
      this.pushState(e & 65535, this.pos);
    else if (e & 262144)
      this.pos = s, this.shiftContext(t, i), t <= this.p.parser.maxNode && this.buffer.push(t, i, s, 4);
    else {
      let r = e, { parser: o } = this.p;
      this.pos = s;
      let l = o.stateFlag(
        r,
        1
        /* StateFlag.Skipped */
      );
      !l && (s > i || t <= o.maxNode) && (this.reducePos = s), this.pushState(r, l ? i : Math.min(i, this.reducePos)), this.shiftContext(t, i), t <= o.maxNode && this.buffer.push(t, i, s, 4);
    }
  }
  // Apply an action
  /**
  @internal
  */
  apply(e, t, i, s) {
    e & 65536 ? this.reduce(e) : this.shift(e, t, i, s);
  }
  // Add a prebuilt (reused) node into the buffer.
  /**
  @internal
  */
  useNode(e, t) {
    let i = this.p.reused.length - 1;
    (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
    let s = this.pos;
    this.reducePos = this.pos = s + e.length, this.pushState(t, s), this.buffer.push(
      i,
      s,
      this.reducePos,
      -1
      /* size == -1 means this is a reused value */
    ), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
  }
  // Split the stack. Due to the buffer sharing and the fact
  // that `this.stack` tends to stay quite shallow, this isn't very
  // expensive.
  /**
  @internal
  */
  split() {
    let e = this, t = e.buffer.length;
    for (; t > 0 && e.buffer[t - 2] > e.reducePos; )
      t -= 4;
    let i = e.buffer.slice(t), s = e.bufferBase + t;
    for (; e && s == e.bufferBase; )
      e = e.parent;
    return new Bs(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, s, this.curContext, this.lookAhead, e);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /**
  @internal
  */
  recoverByDelete(e, t) {
    let i = e <= this.p.parser.maxNode;
    i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
  }
  /**
  Check if the given term would be able to be shifted (optionally
  after some reductions) on this stack. This can be useful for
  external tokenizers that want to make sure they only provide a
  given token when it applies.
  */
  canShift(e) {
    for (let t = new Hg(this); ; ) {
      let i = this.p.parser.stateSlot(
        t.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(t.state, e);
      if (i == 0)
        return !1;
      if (!(i & 65536))
        return !0;
      t.reduce(i);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /**
  @internal
  */
  recoverByInsert(e) {
    if (this.stack.length >= 300)
      return [];
    let t = this.p.parser.nextStates(this.state);
    if (t.length > 8 || this.stack.length >= 120) {
      let s = [];
      for (let r = 0, o; r < t.length; r += 2)
        (o = t[r + 1]) != this.state && this.p.parser.hasAction(o, e) && s.push(t[r], o);
      if (this.stack.length < 120)
        for (let r = 0; s.length < 8 && r < t.length; r += 2) {
          let o = t[r + 1];
          s.some((l, a) => a & 1 && l == o) || s.push(t[r], o);
        }
      t = s;
    }
    let i = [];
    for (let s = 0; s < t.length && i.length < 4; s += 2) {
      let r = t[s + 1];
      if (r == this.state)
        continue;
      let o = this.split();
      o.pushState(r, this.pos), o.storeNode(0, o.pos, o.pos, 4, !0), o.shiftContext(t[s], this.pos), o.reducePos = this.pos, o.score -= 200, i.push(o);
    }
    return i;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /**
  @internal
  */
  forceReduce() {
    let { parser: e } = this.p, t = e.stateSlot(
      this.state,
      5
      /* ParseState.ForcedReduce */
    );
    if (!(t & 65536))
      return !1;
    if (!e.validAction(this.state, t)) {
      let i = t >> 19, s = t & 65535, r = this.stack.length - i * 3;
      if (r < 0 || e.getGoto(this.stack[r], s, !1) < 0) {
        let o = this.findForcedReduction();
        if (o == null)
          return !1;
        t = o;
      }
      this.storeNode(0, this.pos, this.pos, 4, !0), this.score -= 100;
    }
    return this.reducePos = this.pos, this.reduce(t), !0;
  }
  /**
  Try to scan through the automaton to find some kind of reduction
  that can be applied. Used when the regular ForcedReduce field
  isn't a valid action. @internal
  */
  findForcedReduction() {
    let { parser: e } = this.p, t = [], i = (s, r) => {
      if (!t.includes(s))
        return t.push(s), e.allActions(s, (o) => {
          if (!(o & 393216)) if (o & 65536) {
            let l = (o >> 19) - r;
            if (l > 1) {
              let a = o & 65535, h = this.stack.length - l * 3;
              if (h >= 0 && e.getGoto(this.stack[h], a, !1) >= 0)
                return l << 19 | 65536 | a;
            }
          } else {
            let l = i(o, r + 1);
            if (l != null)
              return l;
          }
        });
    };
    return i(this.state, 0);
  }
  /**
  @internal
  */
  forceAll() {
    for (; !this.p.parser.stateFlag(
      this.state,
      2
      /* StateFlag.Accepting */
    ); )
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, !0);
        break;
      }
    return this;
  }
  /**
  Check whether this state has no further actions (assumed to be a direct descendant of the
  top state, since any other states must be able to continue
  somehow). @internal
  */
  get deadEnd() {
    if (this.stack.length != 3)
      return !1;
    let { parser: e } = this.p;
    return e.data[e.stateSlot(
      this.state,
      1
      /* ParseState.Actions */
    )] == 65535 && !e.stateSlot(
      this.state,
      4
      /* ParseState.DefaultReduce */
    );
  }
  /**
  Restart the stack (put it back in its start state). Only safe
  when this.stack.length == 3 (state is directly below the top
  state). @internal
  */
  restart() {
    this.storeNode(0, this.pos, this.pos, 4, !0), this.state = this.stack[0], this.stack.length = 0;
  }
  /**
  @internal
  */
  sameState(e) {
    if (this.state != e.state || this.stack.length != e.stack.length)
      return !1;
    for (let t = 0; t < this.stack.length; t += 3)
      if (this.stack[t] != e.stack[t])
        return !1;
    return !0;
  }
  /**
  Get the parser used by this stack.
  */
  get parser() {
    return this.p.parser;
  }
  /**
  Test whether a given dialect (by numeric ID, as exported from
  the terms file) is enabled.
  */
  dialectEnabled(e) {
    return this.p.parser.dialect.flags[e];
  }
  shiftContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  reduceContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  /**
  @internal
  */
  emitContext() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /**
  @internal
  */
  emitLookAhead() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
  }
  updateContext(e) {
    if (e != this.curContext.context) {
      let t = new Xa(this.curContext.tracker, e);
      t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
    }
  }
  /**
  @internal
  */
  setLookAhead(e) {
    return e <= this.lookAhead ? !1 : (this.emitLookAhead(), this.lookAhead = e, !0);
  }
  /**
  @internal
  */
  close() {
    this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
  }
}
class Xa {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
class Hg {
  constructor(e) {
    this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
  }
  reduce(e) {
    let t = e & 65535, i = e >> 19;
    i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
    let s = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
    this.state = s;
  }
}
class Ns {
  constructor(e, t, i) {
    this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new Ns(e, t, t - e.bufferBase);
  }
  maybeNext() {
    let e = this.stack.parent;
    e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  next() {
    this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
  }
  fork() {
    return new Ns(this.stack, this.pos, this.index);
  }
}
function Xi(n, e = Uint16Array) {
  if (typeof n != "string")
    return n;
  let t = null;
  for (let i = 0, s = 0; i < n.length; ) {
    let r = 0;
    for (; ; ) {
      let o = n.charCodeAt(i++), l = !1;
      if (o == 126) {
        r = 65535;
        break;
      }
      o >= 92 && o--, o >= 34 && o--;
      let a = o - 32;
      if (a >= 46 && (a -= 46, l = !0), r += a, l)
        break;
      r *= 46;
    }
    t ? t[s++] = r : t = new e(r);
  }
  return t;
}
class cs {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const Ya = new cs();
class Wg {
  /**
  @internal
  */
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = Ya, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
  }
  /**
  @internal
  */
  resolveOffset(e, t) {
    let i = this.range, s = this.rangeIndex, r = this.pos + e;
    for (; r < i.from; ) {
      if (!s)
        return null;
      let o = this.ranges[--s];
      r -= i.from - o.to, i = o;
    }
    for (; t < 0 ? r > i.to : r >= i.to; ) {
      if (s == this.ranges.length - 1)
        return null;
      let o = this.ranges[++s];
      r += o.from - i.to, i = o;
    }
    return r;
  }
  /**
  @internal
  */
  clipPos(e) {
    if (e >= this.range.from && e < this.range.to)
      return e;
    for (let t of this.ranges)
      if (t.to > e)
        return Math.max(e, t.from);
    return this.end;
  }
  /**
  Look at a code unit near the stream position. `.peek(0)` equals
  `.next`, `.peek(-1)` gives you the previous character, and so
  on.
  
  Note that looking around during tokenizing creates dependencies
  on potentially far-away content, which may reduce the
  effectiveness incremental parsing—when looking forward—or even
  cause invalid reparses when looking backward more than 25 code
  units, since the library does not track lookbehind.
  */
  peek(e) {
    let t = this.chunkOff + e, i, s;
    if (t >= 0 && t < this.chunk.length)
      i = this.pos + e, s = this.chunk.charCodeAt(t);
    else {
      let r = this.resolveOffset(e, 1);
      if (r == null)
        return -1;
      if (i = r, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length)
        s = this.chunk2.charCodeAt(i - this.chunk2Pos);
      else {
        let o = this.rangeIndex, l = this.range;
        for (; l.to <= i; )
          l = this.ranges[++o];
        this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > l.to && (this.chunk2 = this.chunk2.slice(0, l.to - i)), s = this.chunk2.charCodeAt(0);
      }
    }
    return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), s;
  }
  /**
  Accept a token. By default, the end of the token is set to the
  current stream position, but you can pass an offset (relative to
  the stream position) to change that.
  */
  acceptToken(e, t = 0) {
    let i = t ? this.resolveOffset(t, -1) : this.pos;
    if (i == null || i < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = e, this.token.end = i;
  }
  /**
  Accept a token ending at a specific given position.
  */
  acceptTokenTo(e, t) {
    this.token.value = e, this.token.end = t;
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk: e, chunkPos: t } = this;
      this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
    } else {
      this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
      let e = this.input.chunk(this.pos), t = this.pos + e.length;
      this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
    }
  }
  readNext() {
    return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
  }
  /**
  Move the stream forward N (defaults to 1) code units. Returns
  the new value of [`next`](#lr.InputStream.next).
  */
  advance(e = 1) {
    for (this.chunkOff += e; this.pos + e >= this.range.to; ) {
      if (this.rangeIndex == this.ranges.length - 1)
        return this.setDone();
      e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
    }
    return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
  }
  setDone() {
    return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
  }
  /**
  @internal
  */
  reset(e, t) {
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = Ya, this.pos != e) {
      if (this.pos = e, e == this.end)
        return this.setDone(), this;
      for (; e < this.range.from; )
        this.range = this.ranges[--this.rangeIndex];
      for (; e >= this.range.to; )
        this.range = this.ranges[++this.rangeIndex];
      e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
    }
    return this;
  }
  /**
  @internal
  */
  read(e, t) {
    if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
    if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
    if (e >= this.range.from && t <= this.range.to)
      return this.input.read(e, t);
    let i = "";
    for (let s of this.ranges) {
      if (s.from >= t)
        break;
      s.to > e && (i += this.input.read(Math.max(s.from, e), Math.min(s.to, t)));
    }
    return i;
  }
}
let Ti = class {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: i } = t.p;
    zf(this.data, e, t, this.id, i.data, i.tokenPrecTable);
  }
};
Ti.prototype.contextual = Ti.prototype.fallback = Ti.prototype.extend = !1;
class Ff {
  constructor(e, t, i) {
    this.precTable = t, this.elseToken = i, this.data = typeof e == "string" ? Xi(e) : e;
  }
  token(e, t) {
    let i = e.pos, s = 0;
    for (; ; ) {
      let r = e.next < 0, o = e.resolveOffset(1, 1);
      if (zf(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (r || s++, o == null)
        break;
      e.reset(o, e.token);
    }
    s && (e.reset(i, e.token), e.acceptToken(this.elseToken, s));
  }
}
Ff.prototype.contextual = Ti.prototype.fallback = Ti.prototype.extend = !1;
function zf(n, e, t, i, s, r) {
  let o = 0, l = 1 << i, { dialect: a } = t.p.parser;
  e: for (; l & n[o]; ) {
    let h = n[o + 1];
    for (let d = o + 3; d < h; d += 2)
      if ((n[d + 1] & l) > 0) {
        let p = n[d];
        if (a.allows(p) && (e.token.value == -1 || e.token.value == p || Vg(p, e.token.value, s, r))) {
          e.acceptToken(p);
          break;
        }
      }
    let c = e.next, f = 0, u = n[o + 2];
    if (e.next < 0 && u > f && n[h + u * 3 - 3] == 65535) {
      o = n[h + u * 3 - 1];
      continue e;
    }
    for (; f < u; ) {
      let d = f + u >> 1, p = h + d + (d << 1), m = n[p], g = n[p + 1] || 65536;
      if (c < m)
        u = d;
      else if (c >= g)
        f = d + 1;
      else {
        o = n[p + 2], e.advance();
        continue e;
      }
    }
    break;
  }
}
function Qa(n, e, t) {
  for (let i = e, s; (s = n[i]) != 65535; i++)
    if (s == t)
      return i - e;
  return -1;
}
function Vg(n, e, t, i) {
  let s = Qa(t, i, e);
  return s < 0 || Qa(t, i, n) < s;
}
const He = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let Ir = null;
function Za(n, e, t) {
  let i = n.cursor(ne.IncludeAnonymous);
  for (i.moveTo(e); ; )
    if (!(t < 0 ? i.childBefore(e) : i.childAfter(e)))
      for (; ; ) {
        if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError)
          return t < 0 ? Math.max(0, Math.min(
            i.to - 1,
            e - 25
            /* Lookahead.Margin */
          )) : Math.min(n.length, Math.max(
            i.from + 1,
            e + 25
            /* Lookahead.Margin */
          ));
        if (t < 0 ? i.prevSibling() : i.nextSibling())
          break;
        if (!i.parent())
          return t < 0 ? 0 : n.length;
      }
}
class jg {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? Za(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? Za(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
        this.trees.pop(), this.start.pop(), this.index.pop();
      this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
    } else
      this.nextStart = 1e9;
  }
  // `pos` must be >= any previously given `pos` for this cursor
  nodeAt(e) {
    if (e < this.nextStart)
      return null;
    for (; this.fragment && this.safeTo <= e; )
      this.nextFragment();
    if (!this.fragment)
      return null;
    for (; ; ) {
      let t = this.trees.length - 1;
      if (t < 0)
        return this.nextFragment(), null;
      let i = this.trees[t], s = this.index[t];
      if (s == i.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop();
        continue;
      }
      let r = i.children[s], o = this.start[t] + i.positions[s];
      if (o > e)
        return this.nextStart = o, null;
      if (r instanceof le) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let l = o + r.length;
          if (l <= this.safeTo) {
            let a = r.prop(z.lookAhead);
            if (!a || l + a < this.fragment.to)
              return r;
          }
        }
        this.index[t]++, o + r.length >= Math.max(this.safeFrom, e) && (this.trees.push(r), this.start.push(o), this.index.push(0));
      } else
        this.index[t]++, this.nextStart = o + r.length;
    }
  }
}
class qg {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((i) => new cs());
  }
  getActions(e) {
    let t = 0, i = null, { parser: s } = e.p, { tokenizers: r } = s, o = s.stateSlot(
      e.state,
      3
      /* ParseState.TokenizerMask */
    ), l = e.curContext ? e.curContext.hash : 0, a = 0;
    for (let h = 0; h < r.length; h++) {
      if (!(1 << h & o))
        continue;
      let c = r[h], f = this.tokens[h];
      if (!(i && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != o || f.context != l) && (this.updateCachedToken(f, c, e), f.mask = o, f.context = l), f.lookAhead > f.end + 25 && (a = Math.max(f.lookAhead, a)), f.value != 0)) {
        let u = t;
        if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (i = f, t > u))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return a && e.setLookAhead(a), !i && e.pos == this.stream.end && (i = new cs(), i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new cs(), { pos: i, p: s } = e;
    return t.start = i, t.end = Math.min(i + 1, s.stream.end), t.value = i == s.stream.end ? s.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, i) {
    let s = this.stream.clipPos(i.pos);
    if (t.token(this.stream.reset(s, e), i), e.value > -1) {
      let { parser: r } = i.p;
      for (let o = 0; o < r.specialized.length; o++)
        if (r.specialized[o] == e.value) {
          let l = r.specializers[o](this.stream.read(e.start, e.end), i);
          if (l >= 0 && i.p.parser.dialect.allows(l >> 1)) {
            l & 1 ? e.extended = l >> 1 : e.value = l >> 1;
            break;
          }
        }
    } else
      e.value = 0, e.end = this.stream.clipPos(s + 1);
  }
  putAction(e, t, i, s) {
    for (let r = 0; r < s; r += 3)
      if (this.actions[r] == e)
        return s;
    return this.actions[s++] = e, this.actions[s++] = t, this.actions[s++] = i, s;
  }
  addActions(e, t, i, s) {
    let { state: r } = e, { parser: o } = e.p, { data: l } = o;
    for (let a = 0; a < 2; a++)
      for (let h = o.stateSlot(
        r,
        a ? 2 : 1
        /* ParseState.Actions */
      ); ; h += 3) {
        if (l[h] == 65535)
          if (l[h + 1] == 1)
            h = vt(l, h + 2);
          else {
            s == 0 && l[h + 1] == 2 && (s = this.putAction(vt(l, h + 2), t, i, s));
            break;
          }
        l[h] == t && (s = this.putAction(vt(l, h + 1), t, i, s));
      }
    return s;
  }
}
class Ug {
  constructor(e, t, i, s) {
    this.parser = e, this.input = t, this.ranges = s, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new Wg(t, s), this.tokens = new qg(e, this.stream), this.topTerm = e.top[1];
    let { from: r } = s[0];
    this.stacks = [Bs.start(this, e.top[0], r)], this.fragments = i.length && this.stream.end - r > e.bufferLength * 4 ? new jg(i, e.nodeSet) : null;
  }
  get parsedPos() {
    return this.minStackPos;
  }
  // Move the parser forward. This will process all parse stacks at
  // `this.pos` and try to advance them to a further position. If no
  // stack for such a position is found, it'll start error-recovery.
  //
  // When the parse is finished, this will return a syntax tree. When
  // not, it returns `null`.
  advance() {
    let e = this.stacks, t = this.minStackPos, i = this.stacks = [], s, r;
    if (this.bigReductionCount > 300 && e.length == 1) {
      let [o] = e;
      for (; o.forceReduce() && o.stack.length && o.stack[o.stack.length - 2] >= this.lastBigReductionStart; )
        ;
      this.bigReductionCount = this.lastBigReductionSize = 0;
    }
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      for (; ; ) {
        if (this.tokens.mainToken = null, l.pos > t)
          i.push(l);
        else {
          if (this.advanceStack(l, i, e))
            continue;
          {
            s || (s = [], r = []), s.push(l);
            let a = this.tokens.getMainToken(l);
            r.push(a.value, a.end);
          }
        }
        break;
      }
    }
    if (!i.length) {
      let o = s && Gg(s);
      if (o)
        return He && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
      if (this.parser.strict)
        throw He && s && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && s) {
      let o = this.stoppedAt != null && s[0].pos > this.stoppedAt ? s[0] : this.runRecovery(s, r, i);
      if (o)
        return He && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3;
      if (i.length > o)
        for (i.sort((l, a) => a.score - l.score); i.length > o; )
          i.pop();
      i.some((l) => l.reducePos > t) && this.recovering--;
    } else if (i.length > 1) {
      e: for (let o = 0; o < i.length - 1; o++) {
        let l = i[o];
        for (let a = o + 1; a < i.length; a++) {
          let h = i[a];
          if (l.sameState(h) || l.buffer.length > 500 && h.buffer.length > 500)
            if ((l.score - h.score || l.buffer.length - h.buffer.length) > 0)
              i.splice(a--, 1);
            else {
              i.splice(o--, 1);
              continue e;
            }
        }
      }
      i.length > 12 && (i.sort((o, l) => l.score - o.score), i.splice(
        12,
        i.length - 12
        /* Rec.MaxStackCount */
      ));
    }
    this.minStackPos = i[0].pos;
    for (let o = 1; o < i.length; o++)
      i[o].pos < this.minStackPos && (this.minStackPos = i[o].pos);
    return null;
  }
  stopAt(e) {
    if (this.stoppedAt != null && this.stoppedAt < e)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = e;
  }
  // Returns an updated version of the given stack, or null if the
  // stack can't advance normally. When `split` and `stacks` are
  // given, stacks split off by ambiguous operations will be pushed to
  // `split`, or added to `stacks` if they move `pos` forward.
  advanceStack(e, t, i) {
    let s = e.pos, { parser: r } = this, o = He ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && s > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let f = this.fragments.nodeAt(s); f; ) {
        let u = this.parser.nodeSet.types[f.type.id] == f.type ? r.getGoto(e.state, f.type.id) : -1;
        if (u > -1 && f.length && (!h || (f.prop(z.contextHash) || 0) == c))
          return e.useNode(f, u), He && console.log(o + this.stackID(e) + ` (via reuse of ${r.getName(f.type.id)})`), !0;
        if (!(f instanceof le) || f.children.length == 0 || f.positions[0] > 0)
          break;
        let d = f.children[0];
        if (d instanceof le && f.positions[0] == 0)
          f = d;
        else
          break;
      }
    }
    let l = r.stateSlot(
      e.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (l > 0)
      return e.reduce(l), He && console.log(o + this.stackID(e) + ` (via always-reduce ${r.getName(
        l & 65535
        /* Action.ValueMask */
      )})`), !0;
    if (e.stack.length >= 8400)
      for (; e.stack.length > 6e3 && e.forceReduce(); )
        ;
    let a = this.tokens.getActions(e);
    for (let h = 0; h < a.length; ) {
      let c = a[h++], f = a[h++], u = a[h++], d = h == a.length || !i, p = d ? e : e.split(), m = this.tokens.mainToken;
      if (p.apply(c, f, m ? m.start : p.pos, u), He && console.log(o + this.stackID(p) + ` (via ${c & 65536 ? `reduce of ${r.getName(
        c & 65535
        /* Action.ValueMask */
      )}` : "shift"} for ${r.getName(f)} @ ${s}${p == e ? "" : ", split"})`), d)
        return !0;
      p.pos > s ? t.push(p) : i.push(p);
    }
    return !1;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(e, t) {
    let i = e.pos;
    for (; ; ) {
      if (!this.advanceStack(e, null, null))
        return !1;
      if (e.pos > i)
        return eh(e, t), !0;
    }
  }
  runRecovery(e, t, i) {
    let s = null, r = !1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = t[o << 1], h = t[(o << 1) + 1], c = He ? this.stackID(l) + " -> " : "";
      if (l.deadEnd && (r || (r = !0, l.restart(), He && console.log(c + this.stackID(l) + " (restarted)"), this.advanceFully(l, i))))
        continue;
      let f = l.split(), u = c;
      for (let d = 0; d < 10 && f.forceReduce() && (He && console.log(u + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, i)); d++)
        He && (u = this.stackID(f) + " -> ");
      for (let d of l.recoverByInsert(a))
        He && console.log(c + this.stackID(d) + " (via recover-insert)"), this.advanceFully(d, i);
      this.stream.end > l.pos ? (h == l.pos && (h++, a = 0), l.recoverByDelete(a, h), He && console.log(c + this.stackID(l) + ` (via recover-delete ${this.parser.getName(a)})`), eh(l, i)) : (!s || s.score < f.score) && (s = f);
    }
    return s;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), le.build({
      buffer: Ns.create(e),
      nodeSet: this.parser.nodeSet,
      topID: this.topTerm,
      maxBufferLength: this.parser.bufferLength,
      reused: this.reused,
      start: this.ranges[0].from,
      length: e.pos - this.ranges[0].from,
      minRepeatType: this.parser.minRepeatTerm
    });
  }
  stackID(e) {
    let t = (Ir || (Ir = /* @__PURE__ */ new WeakMap())).get(e);
    return t || Ir.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function eh(n, e) {
  for (let t = 0; t < e.length; t++) {
    let i = e[t];
    if (i.pos == n.pos && i.sameState(n)) {
      e[t].score < n.score && (e[t] = n);
      return;
    }
  }
  e.push(n);
}
class Kg {
  constructor(e, t, i) {
    this.source = e, this.flags = t, this.disabled = i;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
class Is extends Mf {
  /**
  @internal
  */
  constructor(e) {
    if (super(), this.wrappers = [], e.version != 14)
      throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
    let t = e.nodeNames.split(" ");
    this.minRepeatTerm = t.length;
    for (let l = 0; l < e.repeatNodeCount; l++)
      t.push("");
    let i = Object.keys(e.topRules).map((l) => e.topRules[l][1]), s = [];
    for (let l = 0; l < t.length; l++)
      s.push([]);
    function r(l, a, h) {
      s[l].push([a, a.deserialize(String(h))]);
    }
    if (e.nodeProps)
      for (let l of e.nodeProps) {
        let a = l[0];
        typeof a == "string" && (a = z[a]);
        for (let h = 1; h < l.length; ) {
          let c = l[h++];
          if (c >= 0)
            r(c, a, l[h++]);
          else {
            let f = l[h + -c];
            for (let u = -c; u > 0; u--)
              r(l[h++], a, f);
            h++;
          }
        }
      }
    this.nodeSet = new kl(t.map((l, a) => ze.define({
      name: a >= this.minRepeatTerm ? void 0 : l,
      id: a,
      props: s[a],
      top: i.indexOf(a) > -1,
      error: a == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = _f;
    let o = Xi(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let l = 0; l < this.specializerSpecs.length; l++)
      this.specialized[l] = this.specializerSpecs[l].term;
    this.specializers = this.specializerSpecs.map(th), this.states = Xi(e.states, Uint32Array), this.data = Xi(e.stateData), this.goto = Xi(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((l) => typeof l == "number" ? new Ti(o, l) : l), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, i) {
    let s = new Ug(this, e, t, i);
    for (let r of this.wrappers)
      s = r(s, e, t, i);
    return s;
  }
  /**
  Get a goto table entry @internal
  */
  getGoto(e, t, i = !1) {
    let s = this.goto;
    if (t >= s[0])
      return -1;
    for (let r = s[t + 1]; ; ) {
      let o = s[r++], l = o & 1, a = s[r++];
      if (l && i)
        return a;
      for (let h = r + (o >> 1); r < h; r++)
        if (s[r] == e)
          return a;
      if (l)
        return -1;
    }
  }
  /**
  Check if this state has an action for a given terminal @internal
  */
  hasAction(e, t) {
    let i = this.data;
    for (let s = 0; s < 2; s++)
      for (let r = this.stateSlot(
        e,
        s ? 2 : 1
        /* ParseState.Actions */
      ), o; ; r += 3) {
        if ((o = i[r]) == 65535)
          if (i[r + 1] == 1)
            o = i[r = vt(i, r + 2)];
          else {
            if (i[r + 1] == 2)
              return vt(i, r + 2);
            break;
          }
        if (o == t || o == 0)
          return vt(i, r + 1);
      }
    return 0;
  }
  /**
  @internal
  */
  stateSlot(e, t) {
    return this.states[e * 6 + t];
  }
  /**
  @internal
  */
  stateFlag(e, t) {
    return (this.stateSlot(
      e,
      0
      /* ParseState.Flags */
    ) & t) > 0;
  }
  /**
  @internal
  */
  validAction(e, t) {
    return !!this.allActions(e, (i) => i == t ? !0 : null);
  }
  /**
  @internal
  */
  allActions(e, t) {
    let i = this.stateSlot(
      e,
      4
      /* ParseState.DefaultReduce */
    ), s = i ? t(i) : void 0;
    for (let r = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); s == null; r += 3) {
      if (this.data[r] == 65535)
        if (this.data[r + 1] == 1)
          r = vt(this.data, r + 2);
        else
          break;
      s = t(vt(this.data, r + 1));
    }
    return s;
  }
  /**
  Get the states that can follow this one through shift actions or
  goto jumps. @internal
  */
  nextStates(e) {
    let t = [];
    for (let i = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); ; i += 3) {
      if (this.data[i] == 65535)
        if (this.data[i + 1] == 1)
          i = vt(this.data, i + 2);
        else
          break;
      if (!(this.data[i + 2] & 1)) {
        let s = this.data[i + 1];
        t.some((r, o) => o & 1 && r == s) || t.push(this.data[i], s);
      }
    }
    return t;
  }
  /**
  Configure the parser. Returns a new parser instance that has the
  given settings modified. Settings not provided in `config` are
  kept from the original parser.
  */
  configure(e) {
    let t = Object.assign(Object.create(Is.prototype), this);
    if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
      let i = this.topRules[e.top];
      if (!i)
        throw new RangeError(`Invalid top rule name ${e.top}`);
      t.top = i;
    }
    return e.tokenizers && (t.tokenizers = this.tokenizers.map((i) => {
      let s = e.tokenizers.find((r) => r.from == i);
      return s ? s.to : i;
    })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, s) => {
      let r = e.specializers.find((l) => l.from == i.external);
      if (!r)
        return i;
      let o = Object.assign(Object.assign({}, i), { external: r.to });
      return t.specializers[s] = th(o), o;
    })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
  }
  /**
  Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  are registered for this parser.
  */
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /**
  Returns the name associated with a given term. This will only
  work for all terms when the parser was generated with the
  `--names` option. By default, only the names of tagged terms are
  stored.
  */
  getName(e) {
    return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
  }
  /**
  The eof term id is always allocated directly after the node
  types. @internal
  */
  get eofTerm() {
    return this.maxNode + 1;
  }
  /**
  The type of top node produced by the parser.
  */
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /**
  @internal
  */
  dynamicPrecedence(e) {
    let t = this.dynamicPrecedences;
    return t == null ? 0 : t[e] || 0;
  }
  /**
  @internal
  */
  parseDialect(e) {
    let t = Object.keys(this.dialects), i = t.map(() => !1);
    if (e)
      for (let r of e.split(" ")) {
        let o = t.indexOf(r);
        o >= 0 && (i[o] = !0);
      }
    let s = null;
    for (let r = 0; r < t.length; r++)
      if (!i[r])
        for (let o = this.dialects[t[r]], l; (l = this.data[o++]) != 65535; )
          (s || (s = new Uint8Array(this.maxTerm + 1)))[l] = 1;
    return new Kg(e, i, s);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(e) {
    return new Is(e);
  }
}
function vt(n, e) {
  return n[e] | n[e + 1] << 16;
}
function Gg(n) {
  let e = null;
  for (let t of n) {
    let i = t.p.stoppedAt;
    (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(
      t.state,
      2
      /* StateFlag.Accepting */
    ) && (!e || e.score < t.score) && (e = t);
  }
  return e;
}
function th(n) {
  if (n.external) {
    let e = n.extend ? 1 : 0;
    return (t, i) => n.external(t, i) << 1 | e;
  }
  return n.get;
}
class be {
  constructor(e) {
    this.start = e;
  }
}
class Jg extends be {
  constructor(e, t, i, s, r, o, l, a, h, c, f, u, d, p, m) {
    super(e), this.rules = t, this.topRules = i, this.tokens = s, this.localTokens = r, this.context = o, this.externalTokens = l, this.externalSpecializers = a, this.externalPropSources = h, this.precedences = c, this.mainSkip = f, this.scopedSkip = u, this.dialects = d, this.externalProps = p, this.autoDelim = m;
  }
  toString() {
    return Object.values(this.rules).join(`
`);
  }
}
class Tl extends be {
  constructor(e, t, i, s, r) {
    super(e), this.id = t, this.props = i, this.params = s, this.expr = r;
  }
  toString() {
    return this.id.name + (this.params.length ? `<${this.params.join()}>` : "") + " -> " + this.expr;
  }
}
class Xg extends be {
  constructor(e, t) {
    super(e), this.items = t;
  }
}
class Yg extends be {
  constructor(e, t) {
    super(e), this.items = t;
  }
}
class Qg extends be {
  constructor(e, t, i) {
    super(e), this.a = t, this.b = i;
  }
}
class Zg extends be {
  constructor(e, t, i, s, r) {
    super(e), this.precedences = t, this.conflicts = i, this.rules = s, this.literals = r;
  }
}
class e0 extends be {
  constructor(e, t, i, s) {
    super(e), this.precedences = t, this.rules = i, this.fallback = s;
  }
}
class t0 extends be {
  constructor(e, t, i) {
    super(e), this.literal = t, this.props = i;
  }
}
class i0 extends be {
  constructor(e, t, i) {
    super(e), this.id = t, this.source = i;
  }
}
class n0 extends be {
  constructor(e, t, i, s, r) {
    super(e), this.id = t, this.source = i, this.tokens = s, this.conflicts = r;
  }
}
class s0 extends be {
  constructor(e, t, i, s, r, o) {
    super(e), this.type = t, this.token = i, this.id = s, this.source = r, this.tokens = o;
  }
}
class r0 extends be {
  constructor(e, t, i) {
    super(e), this.id = t, this.source = i;
  }
}
class o0 extends be {
  constructor(e, t, i, s) {
    super(e), this.id = t, this.externalID = i, this.source = s;
  }
}
class Hf extends be {
  constructor(e, t) {
    super(e), this.name = t;
  }
  toString() {
    return this.name;
  }
}
class ct extends be {
  walk(e) {
    return e(this);
  }
  eq(e) {
    return !1;
  }
}
ct.prototype.prec = 10;
class Te extends ct {
  constructor(e, t, i) {
    super(e), this.id = t, this.args = i;
  }
  toString() {
    return this.id.name + (this.args.length ? `<${this.args.join()}>` : "");
  }
  eq(e) {
    return this.id.name == e.id.name && En(this.args, e.args);
  }
  walk(e) {
    let t = Ol(this.args, e);
    return e(t == this.args ? this : new Te(this.start, this.id, t));
  }
}
class Oi extends ct {
  constructor(e, t, i, s, r) {
    super(e), this.type = t, this.props = i, this.token = s, this.content = r;
  }
  toString() {
    return `@${this.type}[${this.props.join(",")}]<${this.token}, ${this.content}>`;
  }
  eq(e) {
    return this.type == e.type && sr.eqProps(this.props, e.props) && qt(this.token, e.token) && qt(this.content, e.content);
  }
  walk(e) {
    let t = this.token.walk(e), i = this.content.walk(e);
    return e(t == this.token && i == this.content ? this : new Oi(this.start, this.type, this.props, t, i));
  }
}
class ai extends ct {
  constructor(e, t) {
    super(e), this.rule = t;
  }
  toString() {
    let e = this.rule;
    return `${e.id}${e.props.length ? `[${e.props.join(",")}]` : ""} { ${e.expr} }`;
  }
  eq(e) {
    let t = this.rule, i = e.rule;
    return qt(t.expr, i.expr) && t.id.name == i.id.name && sr.eqProps(t.props, i.props);
  }
  walk(e) {
    let t = this.rule, i = t.expr.walk(e);
    return e(i == t.expr ? this : new ai(this.start, new Tl(t.start, t.id, t.props, [], i)));
  }
}
class Ft extends ct {
  constructor(e, t) {
    super(e), this.exprs = t;
  }
  toString() {
    return this.exprs.map((e) => _l(e, this)).join(" | ");
  }
  eq(e) {
    return En(this.exprs, e.exprs);
  }
  walk(e) {
    let t = Ol(this.exprs, e);
    return e(t == this.exprs ? this : new Ft(this.start, t));
  }
}
Ft.prototype.prec = 1;
class qe extends ct {
  constructor(e, t, i, s = !1) {
    super(e), this.exprs = t, this.markers = i, this.empty = s;
  }
  toString() {
    return this.empty ? "()" : this.exprs.map((e) => _l(e, this)).join(" ");
  }
  eq(e) {
    return En(this.exprs, e.exprs) && this.markers.every((t, i) => {
      let s = e.markers[i];
      return t.length == s.length && t.every((r, o) => r.eq(s[o]));
    });
  }
  walk(e) {
    let t = Ol(this.exprs, e);
    return e(t == this.exprs ? this : new qe(this.start, t, this.markers, this.empty && !t.length));
  }
}
qe.prototype.prec = 2;
class l0 extends be {
  constructor(e, t, i) {
    super(e), this.id = t, this.type = i;
  }
  toString() {
    return (this.type == "ambig" ? "~" : "!") + this.id.name;
  }
  eq(e) {
    return this.id.name == e.id.name && this.type == e.type;
  }
}
class gi extends ct {
  constructor(e, t, i) {
    super(e), this.expr = t, this.kind = i;
  }
  toString() {
    return _l(this.expr, this) + this.kind;
  }
  eq(e) {
    return qt(this.expr, e.expr) && this.kind == e.kind;
  }
  walk(e) {
    let t = this.expr.walk(e);
    return e(t == this.expr ? this : new gi(this.start, t, this.kind));
  }
}
gi.prototype.prec = 3;
class Ge extends ct {
  // value.length is always > 0
  constructor(e, t) {
    super(e), this.value = t;
  }
  toString() {
    return JSON.stringify(this.value);
  }
  eq(e) {
    return this.value == e.value;
  }
}
class Wf extends ct {
  constructor(e, t, i) {
    super(e), this.ranges = t, this.inverted = i;
  }
  toString() {
    return `[${this.inverted ? "^" : ""}${this.ranges.map(([e, t]) => String.fromCodePoint(e) + (t == e + 1 ? "" : "-" + String.fromCodePoint(t)))}]`;
  }
  eq(e) {
    return this.inverted == e.inverted && this.ranges.length == e.ranges.length && this.ranges.every(([t, i], s) => {
      let [r, o] = e.ranges[s];
      return t == r && i == o;
    });
  }
}
class Vf extends ct {
  constructor(e) {
    super(e);
  }
  toString() {
    return "_";
  }
  eq() {
    return !0;
  }
}
function Ol(n, e) {
  let t = null;
  for (let i = 0; i < n.length; i++) {
    let s = n[i].walk(e);
    s != n[i] && !t && (t = n.slice(0, i)), t && t.push(s);
  }
  return t || n;
}
const Io = {
  asciiLetter: [[65, 91], [97, 123]],
  asciiLowercase: [[97, 123]],
  asciiUppercase: [[65, 91]],
  digit: [[48, 58]],
  whitespace: [
    [9, 14],
    [32, 33],
    [133, 134],
    [160, 161],
    [5760, 5761],
    [8192, 8203],
    [8232, 8234],
    [8239, 8240],
    [8287, 8288],
    [12288, 12289]
  ],
  eof: [[65535, 65535]]
};
class Lo extends ct {
  constructor(e, t) {
    super(e), this.type = t;
  }
  toString() {
    return "@" + this.type;
  }
  eq(e) {
    return this.type == e.type;
  }
}
function qt(n, e) {
  return n.constructor == e.constructor && n.eq(e);
}
function En(n, e) {
  return n.length == e.length && n.every((t, i) => qt(t, e[i]));
}
class sr extends be {
  constructor(e, t, i, s) {
    super(e), this.at = t, this.name = i, this.value = s;
  }
  eq(e) {
    return this.name == e.name && this.value.length == e.value.length && this.value.every((t, i) => t.value == e.value[i].value && t.name == e.value[i].name);
  }
  toString() {
    let e = (this.at ? "@" : "") + this.name;
    if (this.value.length) {
      e += "=";
      for (let { name: t, value: i } of this.value)
        e += t ? `{${t}}` : /[^\w-]/.test(i) ? JSON.stringify(i) : i;
    }
    return e;
  }
  static eqProps(e, t) {
    return e.length == t.length && e.every((i, s) => i.eq(t[s]));
  }
}
class an extends be {
  constructor(e, t, i) {
    super(e), this.value = t, this.name = i;
  }
}
function _l(n, e) {
  return n.prec < e.prec ? "(" + n.toString() + ")" : n.toString();
}
class Rt extends Error {
}
function Yi(n) {
  for (let e in n)
    return !0;
  return !1;
}
let a0 = 0;
class h0 {
  constructor(e, t, i, s = {}) {
    this.name = e, this.flags = t, this.nodeName = i, this.props = s, this.hash = ++a0, this.id = -1, this.rules = [];
  }
  toString() {
    return this.name;
  }
  get nodeType() {
    return this.top || this.nodeName != null || Yi(this.props) || this.repeated;
  }
  get terminal() {
    return (this.flags & 1) > 0;
  }
  get eof() {
    return (this.flags & 4) > 0;
  }
  get error() {
    return "error" in this.props;
  }
  get top() {
    return (this.flags & 2) > 0;
  }
  get interesting() {
    return this.flags > 0 || this.nodeName != null;
  }
  get repeated() {
    return (this.flags & 16) > 0;
  }
  set preserve(e) {
    this.flags = e ? this.flags | 8 : this.flags & -9;
  }
  get preserve() {
    return (this.flags & 8) > 0;
  }
  set inline(e) {
    this.flags = e ? this.flags | 32 : this.flags & -33;
  }
  get inline() {
    return (this.flags & 32) > 0;
  }
  cmp(e) {
    return this.hash - e.hash;
  }
}
class c0 {
  constructor() {
    this.terms = [], this.names = /* @__PURE__ */ Object.create(null), this.tops = [], this.eof = this.term(
      "␄",
      null,
      5
      /* TermFlag.Eof */
    ), this.error = this.term(
      "⚠",
      "⚠",
      8
      /* TermFlag.Preserve */
    );
  }
  term(e, t, i = 0, s = {}) {
    let r = new h0(e, i, t, s);
    return this.terms.push(r), this.names[e] = r, r;
  }
  makeTop(e, t) {
    const i = this.term("@top", e, 2, t);
    return this.tops.push(i), i;
  }
  makeTerminal(e, t, i = {}) {
    return this.term(e, t, 1, i);
  }
  makeNonTerminal(e, t, i = {}) {
    return this.term(e, t, 0, i);
  }
  makeRepeat(e) {
    return this.term(
      e,
      null,
      16
      /* TermFlag.Repeated */
    );
  }
  uniqueName(e) {
    for (let t = 0; ; t++) {
      let i = t ? `${e}-${t}` : e;
      if (!this.names[i])
        return i;
    }
  }
  finish(e) {
    for (let o of e)
      o.name.rules.push(o);
    this.terms = this.terms.filter((o) => o.terminal || o.preserve || e.some((l) => l.name == o || l.parts.includes(o)));
    let t = {}, i = [this.error];
    this.error.id = 0;
    let s = 1;
    for (let o of this.terms)
      o.id < 0 && o.nodeType && !o.repeated && (o.id = s++, i.push(o));
    let r = s;
    for (let o of this.terms)
      o.repeated && (o.id = s++, i.push(o));
    this.eof.id = s++;
    for (let o of this.terms)
      o.id < 0 && (o.id = s++), o.name && (t[o.id] = o.name);
    if (s >= 65534)
      throw new Rt("Too many terms");
    return { nodeTypes: i, names: t, minRepeatTerm: r, maxTerm: s - 1 };
  }
}
function Ls(n, e, t) {
  if (n.length != e.length)
    return n.length - e.length;
  for (let i = 0; i < n.length; i++) {
    let s = t(n[i], e[i]);
    if (s)
      return s;
  }
  return 0;
}
const f0 = [];
class we {
  constructor(e, t = f0, i = 0) {
    this.precedence = e, this.ambigGroups = t, this.cut = i;
  }
  join(e) {
    return this == we.none || this == e ? e : e == we.none ? this : new we(Math.max(this.precedence, e.precedence), $s(this.ambigGroups, e.ambigGroups), Math.max(this.cut, e.cut));
  }
  cmp(e) {
    return this.precedence - e.precedence || Ls(this.ambigGroups, e.ambigGroups, (t, i) => t < i ? -1 : t > i ? 1 : 0) || this.cut - e.cut;
  }
}
we.none = new we(0);
function $s(n, e) {
  if (n.length == 0 || n == e)
    return e;
  if (e.length == 0)
    return n;
  let t = n.slice();
  for (let i of e)
    n.includes(i) || t.push(i);
  return t.sort();
}
let u0 = 0;
class Rl {
  constructor(e, t, i, s) {
    this.name = e, this.parts = t, this.conflicts = i, this.skip = s, this.id = u0++;
  }
  cmp(e) {
    return this.id - e.id;
  }
  cmpNoName(e) {
    return this.parts.length - e.parts.length || this.skip.hash - e.skip.hash || this.parts.reduce((t, i, s) => t || i.cmp(e.parts[s]), 0) || Ls(this.conflicts, e.conflicts, (t, i) => t.cmp(i));
  }
  toString() {
    return this.name + " -> " + this.parts.join(" ");
  }
  get isRepeatWrap() {
    return this.name.repeated && this.parts.length == 2 && this.parts[0] == this.name;
  }
  sameReduce(e) {
    return this.name == e.name && this.parts.length == e.parts.length && this.isRepeatWrap == e.isRepeatWrap;
  }
}
const El = 65535;
class jf {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.target = i;
  }
  toString() {
    return `-> ${this.target.id}[label=${JSON.stringify(this.from < 0 ? "ε" : ih(this.from) + (this.to > this.from + 1 ? "-" + ih(this.to - 1) : ""))}]`;
  }
}
function ih(n) {
  return n > El ? "∞" : n == 10 ? "\\n" : n == 13 ? "\\r" : n < 32 || n >= 55296 && n < 57343 ? "\\u{" + n.toString(16) + "}" : String.fromCharCode(n);
}
function d0(n, e) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null);
  for (let s of n) {
    let r = $o(s.accepting), o = i[r] || (i[r] = []);
    o.push(s), t[s.id] = o;
  }
  for (; ; ) {
    let s = !1, r = /* @__PURE__ */ Object.create(null);
    for (let o of n) {
      if (r[o.id])
        continue;
      let l = t[o.id];
      if (l.length == 1) {
        r[l[0].id] = l;
        continue;
      }
      let a = [];
      e: for (let h of l) {
        for (let c of a)
          if (p0(h, c[0], t)) {
            c.push(h);
            continue e;
          }
        a.push([h]);
      }
      a.length > 1 && (s = !0);
      for (let h of a)
        for (let c of h)
          r[c.id] = h;
    }
    if (!s)
      return m0(n, e, t);
    t = r;
  }
}
function p0(n, e, t) {
  if (n.edges.length != e.edges.length)
    return !1;
  for (let i = 0; i < n.edges.length; i++) {
    let s = n.edges[i], r = e.edges[i];
    if (s.from != r.from || s.to != r.to || t[s.target.id] != t[r.target.id])
      return !1;
  }
  return !0;
}
function m0(n, e, t) {
  for (let i of n)
    for (let s = 0; s < i.edges.length; s++) {
      let r = i.edges[s], o = t[r.target.id][0];
      o != r.target && (i.edges[s] = new jf(r.from, r.to, o));
    }
  return t[e.id][0];
}
let g0 = 1, Ve = class qf {
  constructor(e = [], t = g0++) {
    this.accepting = e, this.id = t, this.edges = [];
  }
  edge(e, t, i) {
    this.edges.push(new jf(e, t, i));
  }
  nullEdge(e) {
    this.edge(-1, -1, e);
  }
  compile() {
    let e = /* @__PURE__ */ Object.create(null), t = 0, i = s(this.closure().sort((r, o) => r.id - o.id));
    return d0(Object.values(e), i);
    function s(r) {
      let o = e[$o(r)] = new qf(r.reduce((h, c) => $s(h, c.accepting), []), t++), l = [];
      for (let h of r)
        for (let c of h.edges)
          c.from >= 0 && l.push(c);
      let a = b0(l);
      for (let h of a) {
        let c = h.targets.sort((f, u) => f.id - u.id);
        o.edge(h.from, h.to, e[$o(c)] || s(c));
      }
      return o;
    }
  }
  closure() {
    let e = [], t = /* @__PURE__ */ Object.create(null);
    function i(s) {
      if (!t[s.id]) {
        t[s.id] = !0, (s.edges.some((r) => r.from >= 0) || s.accepting.length > 0 && !s.edges.some((r) => y0(s.accepting, r.target.accepting))) && e.push(s);
        for (let r of s.edges)
          r.from < 0 && i(r.target);
      }
    }
    return i(this), e;
  }
  findConflicts(e) {
    let t = [], i = this.cycleTerms();
    function s(r, o, l, a, h) {
      r.id < o.id && ([r, o] = [o, r], l = -l);
      let c = t.find((f) => f.a == r && f.b == o);
      c ? c.soft != l && (c.soft = 0) : t.push(new Uf(r, o, l, nh(a), h && nh(h)));
    }
    return this.reachable((r, o) => {
      if (r.accepting.length != 0) {
        for (let l = 0; l < r.accepting.length; l++)
          for (let a = l + 1; a < r.accepting.length; a++)
            s(r.accepting[l], r.accepting[a], 0, o);
        r.reachable((l, a) => {
          if (l != r)
            for (let h of l.accepting) {
              let c = i.includes(h);
              for (let f of r.accepting)
                h != f && s(h, f, c || i.includes(f) || !e(h, f) ? 0 : 1, o, o.concat(a));
            }
        });
      }
    }), t;
  }
  cycleTerms() {
    let e = [];
    this.reachable((r) => {
      for (let { target: o } of r.edges)
        e.push(r, o);
    });
    let t = /* @__PURE__ */ new Map(), i = [];
    for (let r = 0; r < e.length; ) {
      let o = e[r++], l = e[r++], a = t.get(o);
      if (a || t.set(o, a = []), !a.includes(l))
        if (o == l)
          i.includes(o) || i.push(o);
        else {
          for (let h of a)
            e.push(o, h);
          a.push(l);
        }
    }
    let s = [];
    for (let r of i)
      for (let o of r.accepting)
        s.includes(o) || s.push(o);
    return s;
  }
  reachable(e) {
    let t = [], i = [];
    (function s(r) {
      e(r, i), t.push(r);
      for (let o of r.edges)
        t.includes(o.target) || (i.push(o), s(o.target), i.pop());
    })(this);
  }
  toString() {
    let e = `digraph {
`;
    return this.reachable((t) => {
      t.accepting.length && (e += `  ${t.id} [label=${JSON.stringify(t.accepting.join())}];
`);
      for (let i of t.edges)
        e += `  ${t.id} ${i};
`;
    }), e + "}";
  }
  // Tokenizer data is represented as a single flat array. This
  // contains regions for each tokenizer state. Region offsets are
  // used to identify states.
  //
  // Each state is laid out as:
  //  - Token group mask
  //  - Offset of the end of the accepting data
  //  - Number of outgoing edges in the state
  //  - Pairs of token masks and term ids that indicate the accepting
  //    states, sorted by precedence
  //  - Triples for the edges: each with a low and high bound and the
  //    offset of the next state.
  toArray(e, t) {
    let i = [], s = [];
    this.reachable((r) => {
      let o = s.length, l = o + 3 + r.accepting.length * 2;
      i[r.id] = o, s.push(r.stateMask(e), l, r.edges.length), r.accepting.sort((a, h) => t.indexOf(a.id) - t.indexOf(h.id));
      for (let a of r.accepting)
        s.push(a.id, e[a.id] || 65535);
      for (let a of r.edges)
        s.push(a.from, a.to, -a.target.id - 1);
    });
    for (let r = 0; r < s.length; r++)
      s[r] < 0 && (s[r] = i[-s[r] - 1]);
    if (s.length > Math.pow(2, 16))
      throw new Rt("Tokenizer tables too big to represent with 16-bit offsets.");
    return Uint16Array.from(s);
  }
  stateMask(e) {
    let t = 0;
    return this.reachable((i) => {
      for (let s of i.accepting)
        t |= e[s.id] || 65535;
    }), t;
  }
}, Uf = class {
  constructor(e, t, i, s, r) {
    this.a = e, this.b = t, this.soft = i, this.exampleA = s, this.exampleB = r;
  }
};
function nh(n) {
  let e = "";
  for (let t = 0; t < n.length; t++)
    e += String.fromCharCode(n[t].from);
  return e;
}
function $o(n) {
  let e = "";
  for (let t of n)
    e.length && (e += "-"), e += t.id;
  return e;
}
function y0(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t])
      return !1;
  return !0;
}
class sh {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.targets = i;
  }
}
function b0(n) {
  let e = [], t = [];
  for (let s of n)
    e.includes(s.from) || e.push(s.from), e.includes(s.to) || e.push(s.to);
  e.sort((s, r) => s - r);
  for (let s = 1; s < e.length; s++) {
    let r = e[s - 1], o = e[s], l = [];
    for (let a of n)
      if (a.to > r && a.from < o)
        for (let h of a.target.closure())
          l.includes(h) || l.push(h);
    l.length && t.push(new sh(r, o, l));
  }
  let i = n.filter(
    (s) => s.from == 65535 && s.to == 65535
    /* Seq.End */
  );
  if (i.length) {
    let s = [];
    for (let r of i)
      for (let o of r.target.closure())
        s.includes(o) || s.push(o);
    s.length && t.push(new sh(65535, 65535, s));
  }
  return t;
}
let Qi = /[\w_-]+/gy;
try {
  Qi = /[\p{Alphabetic}\d_-]+/ugy;
} catch {
}
const Ct = [];
class k0 {
  constructor(e, t = null) {
    this.string = e, this.fileName = t, this.type = "sof", this.value = null, this.start = 0, this.end = 0, this.next();
  }
  lineInfo(e) {
    for (let t = 1, i = 0; ; ) {
      let s = this.string.indexOf(`
`, i);
      if (s > -1 && s < e)
        ++t, i = s + 1;
      else
        return { line: t, ch: e - i };
    }
  }
  message(e, t = -1) {
    let i = this.fileName || "";
    if (t > -1) {
      let s = this.lineInfo(t);
      i += (i ? " " : "") + s.line + ":" + s.ch;
    }
    return i ? e + ` (${i})` : e;
  }
  raise(e, t = -1) {
    throw new Rt(this.message(e, t));
  }
  match(e, t) {
    let i = t.exec(this.string.slice(e));
    return i ? e + i[0].length : -1;
  }
  next() {
    let e = this.match(this.end, /^(\s|\/\/.*|\/\*[^]*?\*\/)*/);
    if (e == this.string.length)
      return this.set("eof", null, e, e);
    let t = this.string[e];
    if (t == '"') {
      let i = this.match(e + 1, /^(\\.|[^"\\])*"/);
      return i == -1 && this.raise("Unterminated string literal", e), this.set("string", Fo(this.string.slice(e + 1, i - 1)), e, i);
    } else if (t == "'") {
      let i = this.match(e + 1, /^(\\.|[^'\\])*'/);
      return i == -1 && this.raise("Unterminated string literal", e), this.set("string", Fo(this.string.slice(e + 1, i - 1)), e, i);
    } else if (t == "@") {
      Qi.lastIndex = e + 1;
      let i = Qi.exec(this.string);
      return i ? this.set("at", i[0], e, e + 1 + i[0].length) : this.raise("@ without a name", e);
    } else if ((t == "$" || t == "!") && this.string[e + 1] == "[") {
      let i = this.match(e + 2, /^(?:\\.|[^\]\\])*\]/);
      return i == -1 && this.raise("Unterminated character set", e), this.set("set", this.string.slice(e + 2, i - 1), e, i);
    } else {
      if (/[\[\]()!~+*?{}<>\.,|:$=]/.test(t))
        return this.set(t, null, e, e + 1);
      {
        Qi.lastIndex = e;
        let i = Qi.exec(this.string);
        return i ? this.set("id", i[0], e, e + i[0].length) : this.raise("Unexpected character " + JSON.stringify(t), e);
      }
    }
  }
  set(e, t, i, s) {
    this.type = e, this.value = t, this.start = i, this.end = s;
  }
  eat(e, t = null) {
    return this.type == e && (t == null || this.value === t) ? (this.next(), !0) : !1;
  }
  unexpected() {
    return this.raise(`Unexpected token '${this.string.slice(this.start, this.end)}'`, this.start);
  }
  expect(e, t = null) {
    let i = this.value;
    return (this.type != e || !(t == null || i === t)) && this.unexpected(), this.next(), i;
  }
  parse() {
    return x0(this);
  }
}
function x0(n) {
  let e = n.start, t = [], i = null, s = null, r = [], o = null, l = [], a = [], h = null, c = [], f = [], u = [], d = [], p = [], m = !1, g = !1;
  for (; n.type != "eof"; ) {
    let y = n.start;
    if (n.eat("at", "top"))
      n.type != "id" && n.raise("Top rules must have a name", n.start), p.push(Lt(n, Ce(n))), m = !0;
    else if (n.type == "at" && n.value == "tokens")
      s ? n.raise("Multiple @tokens declaractions", n.start) : s = A0(n);
    else if (n.eat("at", "local"))
      n.expect("id", "tokens"), r.push(T0(n, y));
    else if (n.eat("at", "context")) {
      h && n.raise("Multiple @context declarations", y);
      let b = Ce(n);
      n.expect("id", "from");
      let x = n.expect("string");
      h = new i0(y, b, x);
    } else if (n.eat("at", "external"))
      n.eat("id", "tokens") ? c.push(_0(n, y)) : n.eat("id", "prop") ? u.push(E0(n, y)) : n.eat("id", "extend") ? f.push(ah(n, "extend", y)) : n.eat("id", "specialize") ? f.push(ah(n, "specialize", y)) : n.eat("id", "propSource") ? d.push(R0(n, y)) : n.unexpected();
    else if (n.eat("at", "dialects")) {
      n.expect("{");
      for (let b = !0; !n.eat("}"); b = !1)
        b || n.eat(","), a.push(Ce(n));
    } else if (n.type == "at" && n.value == "precedence")
      i && n.raise("Multiple precedence declarations", n.start), i = C0(n);
    else if (n.eat("at", "detectDelim"))
      g = !0;
    else if (n.eat("at", "skip")) {
      let b = Dl(n);
      if (n.type == "{") {
        n.next();
        let x = [], v = [];
        for (; !n.eat("}"); )
          n.eat("at", "top") ? (v.push(Lt(n, Ce(n))), m = !0) : x.push(Lt(n));
        l.push({ expr: b, topRules: v, rules: x });
      } else
        o && n.raise("Multiple top-level skip declarations", n.start), o = b;
    } else
      t.push(Lt(n));
  }
  return m ? new Jg(e, t, p, s, r, h, c, f, d, i, o, l, a, u, g) : n.raise("Missing @top declaration");
}
function Lt(n, e) {
  let t = e ? e.start : n.start, i = e || Ce(n), s = Dn(n), r = [];
  if (n.eat("<"))
    for (; !n.eat(">"); )
      r.length && n.expect(","), r.push(Ce(n));
  let o = Dl(n);
  return new Tl(t, i, s, r, o);
}
function Dn(n) {
  if (n.type != "[")
    return Ct;
  let e = [];
  for (n.expect("["); !n.eat("]"); )
    e.length && n.expect(","), e.push(w0(n));
  return e;
}
function w0(n) {
  let e = n.start, t = [], i = n.value, s = n.type == "at";
  if (!n.eat("at") && !n.eat("id") && n.unexpected(), n.eat("="))
    for (; ; )
      if (n.type == "string" || n.type == "id")
        t.push(new an(n.start, n.value, null)), n.next();
      else if (n.eat("."))
        t.push(new an(n.start, ".", null));
      else if (n.eat("{"))
        t.push(new an(n.start, null, n.expect("id"))), n.expect("}");
      else
        break;
  return new sr(e, s, i, t);
}
function Dl(n) {
  n.expect("{");
  let e = hn(n);
  return n.expect("}"), e;
}
const Lr = "﷚";
function Fs(n) {
  let e = n.start;
  if (n.eat("(")) {
    if (n.eat(")"))
      return new qe(e, Ct, [Ct, Ct]);
    let t = hn(n);
    return n.expect(")"), t;
  } else if (n.type == "string") {
    let t = n.value;
    return n.next(), t.length == 0 ? new qe(e, Ct, [Ct, Ct]) : new Ge(e, t);
  } else {
    if (n.eat("id", "_"))
      return new Vf(e);
    if (n.type == "set") {
      let t = n.value, i = n.string[n.start] == "!", s = Fo(t.replace(/\\.|-|"/g, (o) => o == "-" ? Lr : o == '"' ? '\\"' : o)), r = [];
      for (let o = 0; o < s.length; ) {
        let l = s.codePointAt(o);
        if (o += l > 65535 ? 2 : 1, o < s.length - 1 && s[o] == Lr) {
          let a = s.codePointAt(o + 1);
          o += a > 65535 ? 3 : 2, a < l && n.raise("Invalid character range", n.start), rh(n, r, l, a + 1);
        } else
          l == Lr.charCodeAt(0) && (l = 45), rh(n, r, l, l + 1);
      }
      return n.next(), new Wf(e, r.sort((o, l) => o[0] - l[0]), i);
    } else if (n.type == "at" && (n.value == "specialize" || n.value == "extend")) {
      let { start: t, value: i } = n;
      n.next();
      let s = Dn(n);
      n.expect("<");
      let r = hn(n), o;
      return n.eat(",") ? o = hn(n) : r instanceof Ge ? o = r : n.raise(`@${i} requires two arguments when its first argument isn't a literal string`), n.expect(">"), new Oi(t, i, s, r, o);
    } else if (n.type == "at" && Io.hasOwnProperty(n.value)) {
      let t = new Lo(n.start, n.value);
      return n.next(), t;
    } else if (n.type == "[") {
      let t = Lt(n, new Hf(e, "_anon"));
      return t.params.length && n.raise("Inline rules can't have parameters", t.start), new ai(e, t);
    } else {
      let t = Ce(n);
      if (n.type == "[" || n.type == "{") {
        let i = Lt(n, t);
        return i.params.length && n.raise("Inline rules can't have parameters", i.start), new ai(e, i);
      } else {
        if (n.eat(".") && t.name == "std" && Io.hasOwnProperty(n.value)) {
          let i = new Lo(e, n.value);
          return n.next(), i;
        }
        return new Te(e, t, S0(n));
      }
    }
  }
}
function S0(n) {
  let e = [];
  if (n.eat("<"))
    for (; !n.eat(">"); )
      e.length && n.expect(","), e.push(hn(n));
  return e;
}
function rh(n, e, t, i) {
  e.every(([s, r]) => r <= t || s >= i) || n.raise("Overlapping character range", n.start), e.push([t, i]);
}
function v0(n) {
  let e = n.start, t = Fs(n);
  for (; ; ) {
    let i = n.type;
    if (n.eat("*") || n.eat("?") || n.eat("+"))
      t = new gi(e, t, i);
    else
      return t;
  }
}
function oh(n) {
  return n.type == "}" || n.type == ")" || n.type == "|" || n.type == "/" || n.type == "/\\" || n.type == "{" || n.type == "," || n.type == ">";
}
function lh(n) {
  let e = n.start, t = [], i = [Ct];
  do {
    for (; ; ) {
      let s = n.start, r;
      if (n.eat("~"))
        r = "ambig";
      else if (n.eat("!"))
        r = "prec";
      else
        break;
      i[i.length - 1] = i[i.length - 1].concat(new l0(s, Ce(n), r));
    }
    if (oh(n))
      break;
    t.push(v0(n)), i.push(Ct);
  } while (!oh(n));
  return t.length == 1 && i.every((s) => s.length == 0) ? t[0] : new qe(e, t, i, !t.length);
}
function hn(n) {
  let e = n.start, t = lh(n);
  if (!n.eat("|"))
    return t;
  let i = [t];
  do
    i.push(lh(n));
  while (n.eat("|"));
  let s = i.find((r) => r instanceof qe && r.empty);
  return s && n.raise("Empty expression in choice operator. If this is intentional, use () to make it explicit.", s.start), new Ft(e, i);
}
function Ce(n) {
  n.type != "id" && n.unexpected();
  let e = n.start, t = n.value;
  return n.next(), new Hf(e, t);
}
function C0(n) {
  let e = n.start;
  n.next(), n.expect("{");
  let t = [];
  for (; !n.eat("}"); )
    t.length && n.eat(","), t.push({
      id: Ce(n),
      type: n.eat("at", "left") ? "left" : n.eat("at", "right") ? "right" : n.eat("at", "cut") ? "cut" : null
    });
  return new Xg(e, t);
}
function A0(n) {
  let e = n.start;
  n.next(), n.expect("{");
  let t = [], i = [], s = [], r = [];
  for (; !n.eat("}"); )
    n.type == "at" && n.value == "precedence" ? s.push(Kf(n)) : n.type == "at" && n.value == "conflict" ? r.push(O0(n)) : n.type == "string" ? i.push(new t0(n.start, n.expect("string"), Dn(n))) : t.push(Lt(n));
  return new Zg(e, s, r, t, i);
}
function T0(n, e) {
  n.expect("{");
  let t = [], i = [], s = null;
  for (; !n.eat("}"); )
    n.type == "at" && n.value == "precedence" ? i.push(Kf(n)) : n.eat("at", "else") && !s ? s = { id: Ce(n), props: Dn(n) } : t.push(Lt(n));
  return new e0(e, i, t, s);
}
function Kf(n) {
  let e = n.start;
  n.next(), n.expect("{");
  let t = [];
  for (; !n.eat("}"); ) {
    t.length && n.eat(",");
    let i = Fs(n);
    i instanceof Ge || i instanceof Te ? t.push(i) : n.raise("Invalid expression in token precedences", i.start);
  }
  return new Yg(e, t);
}
function O0(n) {
  let e = n.start;
  n.next(), n.expect("{");
  let t = Fs(n);
  t instanceof Ge || t instanceof Te || n.raise("Invalid expression in token conflict", t.start), n.eat(",");
  let i = Fs(n);
  return i instanceof Ge || i instanceof Te || n.raise("Invalid expression in token conflict", i.start), n.expect("}"), new Qg(e, t, i);
}
function Gf(n, e) {
  let t = [], i = [];
  n.expect("{");
  for (let s = !0; !n.eat("}"); s = !1)
    if (s || n.eat(","), e && n.eat("at", "conflict")) {
      n.expect("{");
      for (let r = !0; !n.eat("}"); r = !1)
        r || n.eat(","), i.push(Ce(n));
    } else {
      let r = Ce(n), o = Dn(n);
      t.push({ id: r, props: o });
    }
  return { tokens: t, conflicts: i };
}
function _0(n, e) {
  let t = Ce(n);
  n.expect("id", "from");
  let i = n.expect("string"), { tokens: s, conflicts: r } = Gf(n, !0);
  return new n0(e, t, i, s, r);
}
function ah(n, e, t) {
  let i = Dl(n), s = Ce(n);
  n.expect("id", "from");
  let r = n.expect("string");
  return new s0(t, e, i, s, r, Gf(n, !1).tokens);
}
function R0(n, e) {
  let t = Ce(n);
  return n.expect("id", "from"), new r0(e, t, n.expect("string"));
}
function E0(n, e) {
  let t = Ce(n), i = n.eat("id", "as") ? Ce(n) : t;
  n.expect("id", "from");
  let s = n.expect("string");
  return new o0(e, i, t, s);
}
function Fo(n) {
  let e = /\\(?:u\{([\da-f]+)\}|u([\da-f]{4})|x([\da-f]{2})|([ntbrf0])|(.))|[^]/yig, t = "", i;
  for (; i = e.exec(n); ) {
    let [s, r, o, l, a, h] = i;
    r || o || l ? t += String.fromCodePoint(parseInt(r || o || l, 16)) : a ? t += a == "n" ? `
` : a == "t" ? "	" : a == "0" ? "\0" : a == "r" ? "\r" : a == "f" ? "\f" : "\b" : h ? t += h : t += s;
  }
  return t;
}
function cn(n, e) {
  return (n << 5) + n + e;
}
function D0(n, e) {
  for (let t = 0; t < e.length; t++)
    n = cn(n, e.charCodeAt(t));
  return n;
}
const fn = typeof process < "u" && process.env.LOG || "", Sn = /\btime\b/.test(fn), Zt = Sn ? (n, e) => {
  let t = Date.now(), i = e();
  return console.log(`${n} (${((Date.now() - t) / 1e3).toFixed(2)}s)`), i;
} : (n, e) => e();
class Ut {
  constructor(e, t, i, s, r, o) {
    this.rule = e, this.pos = t, this.ahead = i, this.ambigAhead = s, this.skipAhead = r, this.via = o, this.hash = 0;
  }
  finish() {
    let e = cn(cn(this.rule.id, this.pos), this.skipAhead.hash);
    for (let t of this.ahead)
      e = cn(e, t.hash);
    for (let t of this.ambigAhead)
      e = D0(e, t);
    return this.hash = e, this;
  }
  get next() {
    return this.pos < this.rule.parts.length ? this.rule.parts[this.pos] : null;
  }
  advance() {
    return new Ut(this.rule, this.pos + 1, this.ahead, this.ambigAhead, this.skipAhead, this.via).finish();
  }
  get skip() {
    return this.pos == this.rule.parts.length ? this.skipAhead : this.rule.skip;
  }
  cmp(e) {
    return this.rule.cmp(e.rule) || this.pos - e.pos || this.skipAhead.hash - e.skipAhead.hash || Ls(this.ahead, e.ahead, (t, i) => t.cmp(i)) || Ls(this.ambigAhead, e.ambigAhead, P0);
  }
  eqSimple(e) {
    return e.rule == this.rule && e.pos == this.pos;
  }
  toString() {
    let e = this.rule.parts.map((t) => t.name);
    return e.splice(this.pos, 0, "·"), `${this.rule.name} -> ${e.join(" ")}`;
  }
  eq(e) {
    return this == e || this.hash == e.hash && this.rule == e.rule && this.pos == e.pos && this.skipAhead == e.skipAhead && fh(this.ahead, e.ahead) && fh(this.ambigAhead, e.ambigAhead);
  }
  trail(e = 60) {
    let t = [];
    for (let s = this; s; s = s.via)
      for (let r = s.pos - 1; r >= 0; r--)
        t.push(s.rule.parts[r]);
    let i = t.reverse().join(" ");
    return i.length > e && (i = i.slice(i.length - e).replace(/.*? /, "… ")), i;
  }
  conflicts(e = this.pos) {
    let t = this.rule.conflicts[e];
    return e == this.rule.parts.length && this.ambigAhead.length && (t = t.join(new we(0, this.ambigAhead))), t;
  }
  static addOrigins(e, t) {
    let i = e.slice();
    for (let s = 0; s < i.length; s++) {
      let r = i[s];
      if (r.pos == 0)
        for (let o of t)
          o.next == r.rule.name && !i.includes(o) && i.push(o);
    }
    return i;
  }
}
function hh(n) {
  let e = we.none;
  for (let t of n)
    e = e.join(t.conflicts());
  return e;
}
function M0(n, e) {
  for (let t of n)
    if (t.rule.name.repeated) {
      for (let i of e)
        if (i.rule.name == t.rule.name) {
          if (t.rule.isRepeatWrap && t.pos == 2)
            return 1;
          if (i.rule.isRepeatWrap && i.pos == 2)
            return -1;
        }
    }
  return 0;
}
function P0(n, e) {
  return n < e ? -1 : n > e ? 1 : 0;
}
function ch(n, e, t, i) {
  let s = [];
  for (let r = e + 1; r < n.parts.length; r++) {
    let o = n.parts[r], l = !1;
    if (o.terminal)
      hi(o, s);
    else
      for (let a of i[o.name])
        a == null ? l = !0 : hi(a, s);
    if (!l)
      return s;
  }
  for (let r of t)
    hi(r, s);
  return s;
}
function fs(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].eq(e[t]))
      return !1;
  return !0;
}
function fh(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t])
      return !1;
  return !0;
}
class tt {
  constructor(e, t) {
    this.term = e, this.target = t;
  }
  eq(e) {
    return e instanceof tt && this.term == e.term && e.target.id == this.target.id;
  }
  cmp(e) {
    return e instanceof Kt ? -1 : this.term.id - e.term.id || this.target.id - e.target.id;
  }
  matches(e, t) {
    return e instanceof tt && t[e.target.id] == t[this.target.id];
  }
  toString() {
    return "s" + this.target.id;
  }
  map(e, t) {
    let i = t[e[this.target.id]];
    return i == this.target ? this : new tt(this.term, i);
  }
}
class Kt {
  constructor(e, t) {
    this.term = e, this.rule = t;
  }
  eq(e) {
    return e instanceof Kt && this.term == e.term && e.rule.sameReduce(this.rule);
  }
  cmp(e) {
    return e instanceof tt ? 1 : this.term.id - e.term.id || this.rule.name.id - e.rule.name.id || this.rule.parts.length - e.rule.parts.length;
  }
  matches(e, t) {
    return e instanceof Kt && e.rule.sameReduce(this.rule);
  }
  toString() {
    return `${this.rule.name.name}(${this.rule.parts.length})`;
  }
  map() {
    return this;
  }
}
function zo(n) {
  let e = 5381;
  for (let t of n)
    e = cn(e, t.hash);
  return e;
}
class B0 {
  constructor(e) {
    this.first = e, this.conflicts = [];
  }
}
class Jf {
  constructor(e, t, i = 0, s, r = zo(t), o = null) {
    this.id = e, this.set = t, this.flags = i, this.skip = s, this.hash = r, this.startRule = o, this.actions = [], this.actionPositions = [], this.goto = [], this.tokenGroup = -1, this.defaultReduce = null, this._actionsByTerm = null;
  }
  toString() {
    let e = this.actions.map((t) => t.term + "=" + t).join(",") + (this.goto.length ? " | " + this.goto.map((t) => t.term + "=" + t).join(",") : "");
    return this.id + ": " + this.set.filter((t) => t.pos > 0).join() + (this.defaultReduce ? `
  always ${this.defaultReduce.name}(${this.defaultReduce.parts.length})` : e.length ? `
  ` + e : "");
  }
  addActionInner(e, t) {
    e: for (let i = 0; i < this.actions.length; i++) {
      let s = this.actions[i];
      if (s.term == e.term) {
        if (s.eq(e))
          return null;
        let r = Ut.addOrigins(t, this.set), o = Ut.addOrigins(this.actionPositions[i], this.set), l = hh(r), a = hh(o), h = M0(r, o) || l.precedence - a.precedence;
        if (h > 0) {
          this.actions.splice(i, 1), this.actionPositions.splice(i, 1), i--;
          continue e;
        } else {
          if (h < 0)
            return null;
          if (l.ambigGroups.some((c) => a.ambigGroups.includes(c)))
            continue e;
          return s;
        }
      }
    }
    return this.actions.push(e), this.actionPositions.push(t), null;
  }
  addAction(e, t, i) {
    let s = this.addActionInner(e, t);
    if (s) {
      let r = this.actionPositions[this.actions.indexOf(s)][0], o = [t[0].rule.name, r.rule.name];
      if (i.conflicts.some((a) => a.rules.some((h) => o.includes(h))))
        return;
      let l;
      s instanceof tt ? l = `shift/reduce conflict between
  ${r}
and
  ${t[0].rule}` : l = `reduce/reduce conflict between
  ${r.rule}
and
  ${t[0].rule}`, l += `
With input:
  ${t[0].trail(70)} · ${e.term} …`, s instanceof tt && (l += z0(t[0], s.term, i.first)), l += F0(r, t[0]), i.conflicts.push(new $0(l, o));
    }
  }
  getGoto(e) {
    return this.goto.find((t) => t.term == e);
  }
  hasSet(e) {
    return fs(this.set, e);
  }
  actionsByTerm() {
    let e = this._actionsByTerm;
    if (!e) {
      this._actionsByTerm = e = /* @__PURE__ */ Object.create(null);
      for (let t of this.actions)
        (e[t.term.id] || (e[t.term.id] = [])).push(t);
    }
    return e;
  }
  finish() {
    if (this.actions.length) {
      let e = this.actions[0];
      if (e instanceof Kt) {
        let { rule: t } = e;
        this.actions.every((i) => i instanceof Kt && i.rule.sameReduce(t)) && (this.defaultReduce = t);
      }
    }
    this.actions.sort((e, t) => e.cmp(t)), this.goto.sort((e, t) => e.cmp(t));
  }
  eq(e) {
    let t = this.defaultReduce, i = e.defaultReduce;
    return t || i ? t && i ? t.sameReduce(i) : !1 : this.skip == e.skip && this.tokenGroup == e.tokenGroup && fs(this.actions, e.actions) && fs(this.goto, e.goto);
  }
}
function N0(n, e) {
  let t = [], i = [];
  function s(o, l, a, h, c) {
    for (let f of o.rules) {
      let u = t.find((d) => d.rule == f);
      if (!u) {
        let d = n.find((p) => p.pos == 0 && p.rule == f);
        u = d ? new Ut(f, 0, d.ahead.slice(), d.ambigAhead, d.skipAhead, d.via) : new Ut(f, 0, [], Ho, h, c), t.push(u);
      }
      if (u.skipAhead != h)
        throw new Rt("Inconsistent skip sets after " + c.trail());
      u.ambigAhead = $s(u.ambigAhead, a);
      for (let d of l)
        u.ahead.includes(d) || (u.ahead.push(d), u.rule.parts.length && !u.rule.parts[0].terminal && hi(u, i));
    }
  }
  for (let o of n) {
    let l = o.next;
    l && !l.terminal && s(l, ch(o.rule, o.pos, o.ahead, e), o.conflicts(o.pos + 1).ambigGroups, o.pos == o.rule.parts.length - 1 ? o.skipAhead : o.rule.skip, o);
  }
  for (; i.length; ) {
    let o = i.pop();
    s(o.rule.parts[0], ch(o.rule, 0, o.ahead, e), $s(o.rule.conflicts[1].ambigGroups, o.rule.parts.length == 1 ? o.ambigAhead : Ho), o.rule.parts.length == 1 ? o.skipAhead : o.rule.skip, o);
  }
  let r = n.slice();
  for (let o of t) {
    o.ahead.sort((a, h) => a.hash - h.hash), o.finish();
    let l = n.findIndex((a) => a.pos == 0 && a.rule == o.rule);
    l > -1 ? r[l] = o : r.push(o);
  }
  return r.sort((o, l) => o.cmp(l));
}
function hi(n, e) {
  e.includes(n) || e.push(n);
}
function I0(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t of n.terms)
    t.terminal || (e[t.name] = []);
  for (; ; ) {
    let t = !1;
    for (let i of n.terms)
      if (!i.terminal)
        for (let s of i.rules) {
          let r = e[i.name], o = !1, l = r.length;
          for (let a of s.parts) {
            if (o = !0, a.terminal)
              hi(a, r);
            else
              for (let h of e[a.name])
                h == null ? o = !1 : hi(h, r);
            if (o)
              break;
          }
          o || hi(null, r), r.length > l && (t = !0);
        }
    if (!t)
      return e;
  }
}
class L0 {
  constructor(e, t) {
    this.set = e, this.state = t;
  }
}
class $0 {
  constructor(e, t) {
    this.error = e, this.rules = t;
  }
}
function F0(n, e) {
  if (n.eqSimple(e))
    return "";
  function t(i, s) {
    let r = [];
    for (let o = s.via; !o.eqSimple(i); o = o.via)
      r.push(o);
    return r.length ? (r.unshift(s), r.reverse().map((o, l) => `
` + "  ".repeat(l + 1) + (o == s ? "" : "via ") + o).join("")) : "";
  }
  for (let i = n; i; i = i.via)
    for (let s = e; s; s = s.via)
      if (i.eqSimple(s))
        return `
Shared origin: ` + i + t(i, n) + t(i, e);
  return "";
}
function z0(n, e, t) {
  let i = n, s = [];
  for (; ; ) {
    for (let l = i.pos - 1; l >= 0; l--)
      s.push(i.rule.parts[l]);
    if (!i.via)
      break;
    i = i.via;
  }
  s.reverse();
  let r = /* @__PURE__ */ new Set();
  function o(l, a, h) {
    if (a == s.length && h && !l.next)
      return `
The reduction of ${n.rule.name} is allowed before ${e} because of this rule:
  ${h}`;
    for (let c; c = l.next; ) {
      if (a < s.length && c == s[a]) {
        let d = o(l.advance(), a + 1, h);
        if (d)
          return d;
      }
      let f = l.rule.parts[l.pos + 1], u = l.pos + 1 == l.rule.parts.length ? h : null;
      f && (f.terminal ? f == e : t[f.name].includes(e)) && (u = l.advance());
      for (let d of c.rules) {
        let p = (d.id << 5) + a + (u ? 555 : 0);
        if (!r.has(p)) {
          r.add(p);
          let m = o(new Ut(d, 0, [], [], c, l), a, u);
          if (m)
            return m;
        }
      }
      if (!c.terminal && t[c.name].includes(null))
        l = l.advance();
      else
        break;
    }
    return "";
  }
  return o(i, 0, null);
}
function H0(n, e, t) {
  let i = [], s = {}, r = {}, o = Date.now();
  function l(h, c) {
    if (h.length == 0)
      return null;
    let f = zo(h), u = r[f], d;
    for (let b of h)
      if (!d)
        d = b.skip;
      else if (d != b.skip)
        throw new Rt("Inconsistent skip sets after " + b.trail());
    if (u) {
      for (let b of u)
        if (fs(h, b.set)) {
          if (b.state.skip != d)
            throw new Rt("Inconsistent skip sets after " + b.set[0].trail());
          return b.state;
        }
    }
    let p = N0(h, t), m = zo(p), g = s[m] || (s[m] = []), y;
    if (!c)
      for (let b of g)
        b.hasSet(p) && (y = b);
    return y || (y = new Jf(i.length, p, 0, d, m, c), g.push(y), i.push(y), Sn && i.length % 500 == 0 && console.log(`${i.length} states after ${((Date.now() - o) / 1e3).toFixed(2)}s`)), (r[f] || (r[f] = [])).push(new L0(h, y)), y;
  }
  for (const h of e) {
    const c = h.rules.length ? h.rules[0].skip : n.names["%noskip"];
    l(h.rules.map((f) => new Ut(f, 0, [n.eof], Ho, c, null).finish()), h);
  }
  let a = new B0(t);
  for (let h = 0; h < i.length; h++) {
    let c = i[h], f = [], u = [], d = [];
    for (let m of c.set)
      if (m.pos == m.rule.parts.length)
        m.rule.name.top || d.push(m);
      else {
        let g = m.rule.parts[m.pos], y = f.indexOf(g);
        y < 0 ? (f.push(g), u.push([m])) : u[y].push(m);
      }
    for (let m = 0; m < f.length; m++) {
      let g = f[m], y = u[m].map((b) => b.advance());
      if (g.terminal) {
        let b = W0(y), x = l(b);
        x && c.addAction(new tt(g, x), u[m], a);
      } else {
        let b = l(y);
        b && c.goto.push(new tt(g, b));
      }
    }
    let p = !1;
    for (let m of d)
      for (let g of m.ahead) {
        let y = c.actions.length;
        c.addAction(new Kt(g, m.rule), [m], a), c.actions.length == y && (p = !0);
      }
    if (p)
      for (let m = 0; m < c.goto.length; m++)
        t[c.goto[m].term.name].some((y) => c.actions.some((b) => b.term == y && b instanceof tt)) || c.goto.splice(m--, 1);
  }
  if (a.conflicts.length)
    throw new Rt(a.conflicts.map((h) => h.error).join(`

`));
  for (let h of i)
    h.finish();
  return Sn && console.log(`${i.length} states total.`), i;
}
function W0(n) {
  let e = null, t = 1;
  for (let i of n) {
    let s = i.rule.conflicts[i.pos - 1].cut;
    s < t || ((!e || s > t) && (t = s, e = []), e.push(i));
  }
  return e || n;
}
function uh(n, e, t) {
  for (let s of n.goto)
    for (let r of e.goto)
      if (s.term == r.term && t[s.target.id] != t[r.target.id])
        return !1;
  let i = e.actionsByTerm();
  for (let s of n.actions) {
    let r = i[s.term.id];
    if (r && r.some((o) => !o.matches(s, t))) {
      if (r.length == 1)
        return !1;
      let o = n.actionsByTerm()[s.term.id];
      if (o.length != r.length || o.some((l) => !r.some((a) => l.matches(a, t))))
        return !1;
    }
  }
  return !0;
}
function V0(n, e) {
  let t = [];
  for (let i of n) {
    let s = e[i.id];
    t[s] || (t[s] = new Jf(s, i.set, 0, i.skip, i.hash, i.startRule), t[s].tokenGroup = i.tokenGroup, t[s].defaultReduce = i.defaultReduce);
  }
  for (let i of n) {
    let s = e[i.id], r = t[s];
    r.flags |= i.flags;
    for (let o = 0; o < i.actions.length; o++) {
      let l = i.actions[o].map(e, t);
      r.actions.some((a) => a.eq(l)) || (r.actions.push(l), r.actionPositions.push(i.actionPositions[o]));
    }
    for (let o of i.goto) {
      let l = o.map(e, t);
      r.goto.some((a) => a.eq(l)) || r.goto.push(l);
    }
  }
  return t;
}
class dh {
  constructor(e, t) {
    this.origin = e, this.members = [t];
  }
}
function j0(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].eqSimple(e[t]))
      return !1;
  return !0;
}
function q0(n) {
  let e = [], t = [];
  e: for (let s = 0; s < n.length; s++) {
    let r = n[s];
    if (!r.startRule)
      for (let o = 0; o < t.length; o++) {
        let l = t[o], a = n[l.members[0]];
        if (r.tokenGroup == a.tokenGroup && r.skip == a.skip && !a.startRule && j0(r.set, a.set)) {
          l.members.push(s), e.push(o);
          continue e;
        }
      }
    e.push(t.length), t.push(new dh(t.length, s));
  }
  function i(s, r) {
    let o = t[s], l = n[o.members[r]], a = o.members.pop();
    r != o.members.length && (o.members[r] = a);
    for (let h = s + 1; h < t.length; h++)
      if (e[l.id] = h, t[h].origin == o.origin && t[h].members.every((c) => uh(l, n[c], e))) {
        t[h].members.push(l.id);
        return;
      }
    e[l.id] = t.length, t.push(new dh(o.origin, l.id));
  }
  for (let s = 1; ; s++) {
    let r = !1, o = Date.now();
    for (let l = 0, a = t.length; l < a; l++) {
      let h = t[l];
      for (let c = 0; c < h.members.length - 1; c++)
        for (let f = c + 1; f < h.members.length; f++) {
          let u = h.members[c], d = h.members[f];
          uh(n[u], n[d], e) || (r = !0, i(l, f--));
        }
    }
    if (Sn && console.log(`Collapse pass ${s}${r ? "" : ", done"} (${((Date.now() - o) / 1e3).toFixed(2)}s)`), !r)
      return V0(n, e);
  }
}
function U0(n) {
  for (let e = 1; ; e++) {
    let t = [], i = !1, s = Date.now(), r = [];
    for (let o = 0; o < n.length; o++) {
      let l = n[o], a = r.findIndex((h) => l.eq(h));
      if (a < 0)
        t[o] = r.length, r.push(l);
      else {
        t[o] = a, i = !0;
        let h = r[a], c = null;
        for (let f of l.set)
          h.set.some((u) => u.eqSimple(f)) || (c || (c = [])).push(f);
        c && (h.set = c.concat(h.set).sort((f, u) => f.cmp(u)));
      }
    }
    if (Sn && console.log(`Merge identical pass ${e}${i ? "" : ", done"} (${((Date.now() - s) / 1e3).toFixed(2)}s)`), !i)
      return n;
    for (let o of r)
      o.defaultReduce || (o.actions = o.actions.map((l) => l.map(t, r)), o.goto = o.goto.map((l) => l.map(t, r)));
    for (let o = 0; o < r.length; o++)
      r[o].id = o;
    n = r;
  }
}
const Ho = [];
function K0(n) {
  return U0(q0(n));
}
function G0(n) {
  let e = n + 32;
  return e >= 34 && e++, e >= 92 && e++, String.fromCharCode(e);
}
function ph(n, e = 65535) {
  if (n > e)
    throw new Error("Trying to encode a number that's too big: " + n);
  if (n == 65535)
    return "~";
  let t = "";
  for (let i = 46; ; i = 0) {
    let s = n % 46, r = n - s;
    if (t = G0(s + i) + t, r == 0)
      break;
    n = r / 46;
  }
  return t;
}
function Zi(n, e = 65535) {
  let t = '"' + ph(n.length, 4294967295);
  for (let i = 0; i < n.length; i++)
    t += ph(n[i], e);
  return t += '"', t;
}
const me = [];
class at {
  constructor(e, t) {
    this.terms = e, this.conflicts = t;
  }
  concat(e) {
    if (this == at.none)
      return e;
    if (e == at.none)
      return this;
    let t = null;
    if (this.conflicts || e.conflicts) {
      t = this.conflicts ? this.conflicts.slice() : this.ensureConflicts();
      let i = e.ensureConflicts();
      t[t.length - 1] = t[t.length - 1].join(i[0]);
      for (let s = 1; s < i.length; s++)
        t.push(i[s]);
    }
    return new at(this.terms.concat(e.terms), t);
  }
  withConflicts(e, t) {
    if (t == we.none)
      return this;
    let i = this.conflicts ? this.conflicts.slice() : this.ensureConflicts();
    return i[e] = i[e].join(t), new at(this.terms, i);
  }
  ensureConflicts() {
    if (this.conflicts)
      return this.conflicts;
    let e = [];
    for (let t = 0; t <= this.terms.length; t++)
      e.push(we.none);
    return e;
  }
}
at.none = new at(me, null);
function Ue(...n) {
  return new at(n, null);
}
class zs {
  constructor(e, t, i) {
    this.id = e, this.args = t, this.term = i;
  }
  matches(e) {
    return this.id == e.id.name && En(e.args, this.args);
  }
  matchesRepeat(e) {
    return this.id == "+" && qt(e.expr, this.args[0]);
  }
}
class J0 {
  constructor(e, t) {
    this.options = t, this.terms = new c0(), this.specialized = /* @__PURE__ */ Object.create(null), this.tokenOrigins = /* @__PURE__ */ Object.create(null), this.rules = [], this.built = [], this.ruleNames = /* @__PURE__ */ Object.create(null), this.namespaces = /* @__PURE__ */ Object.create(null), this.namedTerms = /* @__PURE__ */ Object.create(null), this.termTable = /* @__PURE__ */ Object.create(null), this.knownProps = /* @__PURE__ */ Object.create(null), this.dynamicRulePrecedences = [], this.definedGroups = [], this.astRules = [], this.currentSkip = [], Zt("Parse", () => {
      this.input = new k0(e, t.fileName), this.ast = this.input.parse();
    });
    let i = z;
    for (let s in i)
      i[s] instanceof z && !i[s].perNode && (this.knownProps[s] = { prop: i[s], source: { name: s, from: null } });
    for (let s of this.ast.externalProps)
      this.knownProps[s.id.name] = {
        prop: this.options.externalProp ? this.options.externalProp(s.id.name) : new z(),
        source: { name: s.externalID.name, from: s.source }
      };
    this.dialects = this.ast.dialects.map((s) => s.name), this.tokens = new ry(this, this.ast.tokens), this.localTokens = this.ast.localTokens.map((s) => new oy(this, s)), this.externalTokens = this.ast.externalTokens.map((s) => new Wo(this, s)), this.externalSpecializers = this.ast.externalSpecializers.map((s) => new Vr(this, s)), Zt("Build rules", () => {
      let s = this.newName("%noskip", !0);
      this.defineRule(s, []);
      let r = this.ast.mainSkip ? this.newName("%mainskip", !0) : s, o = [], l = [];
      for (let a of this.ast.rules)
        this.astRules.push({ skip: r, rule: a });
      for (let a of this.ast.topRules)
        l.push({ skip: r, rule: a });
      for (let a of this.ast.scopedSkip) {
        let h = s, c = this.ast.scopedSkip.findIndex((f, u) => u < o.length && qt(f.expr, a.expr));
        c > -1 ? h = o[c] : this.ast.mainSkip && qt(a.expr, this.ast.mainSkip) ? h = r : Qf(a.expr) || (h = this.newName("%skip", !0)), o.push(h);
        for (let f of a.rules)
          this.astRules.push({ skip: h, rule: f });
        for (let f of a.topRules)
          l.push({ skip: h, rule: f });
      }
      for (let { rule: a } of this.astRules)
        this.unique(a.id);
      this.currentSkip.push(s), this.skipRules = r == s ? [r] : [s, r], r != s && this.defineRule(r, this.normalizeExpr(this.ast.mainSkip));
      for (let a = 0; a < this.ast.scopedSkip.length; a++) {
        let h = o[a];
        this.skipRules.includes(h) || (this.skipRules.push(h), h != s && this.defineRule(h, this.normalizeExpr(this.ast.scopedSkip[a].expr)));
      }
      this.currentSkip.pop();
      for (let { rule: a, skip: h } of l.sort((c, f) => c.rule.start - f.rule.start)) {
        this.unique(a.id), this.used(a.id.name), this.currentSkip.push(h);
        let { name: c, props: f } = this.nodeInfo(a.props, "a", a.id.name, me, me, a.expr), u = this.terms.makeTop(c, f);
        this.namedTerms[c] = u, this.defineRule(u, this.normalizeExpr(a.expr)), this.currentSkip.pop();
      }
      for (let a of this.externalSpecializers)
        a.finish();
      for (let { skip: a, rule: h } of this.astRules)
        this.ruleNames[h.id.name] && my(h) && !h.params.length && (this.buildRule(h, [], a, !1), h.expr instanceof qe && h.expr.exprs.length == 0 && this.used(h.id.name));
    });
    for (let s in this.ruleNames) {
      let r = this.ruleNames[s];
      r && this.warn(`Unused rule '${r.name}'`, r.start);
    }
    this.tokens.takePrecedences(), this.tokens.takeConflicts();
    for (let s of this.localTokens)
      s.takePrecedences();
    for (let { name: s, group: r, rule: o } of this.definedGroups)
      this.defineGroup(s, r, o);
    this.checkGroups();
  }
  unique(e) {
    e.name in this.ruleNames && this.raise(`Duplicate definition of rule '${e.name}'`, e.start), this.ruleNames[e.name] = e;
  }
  used(e) {
    this.ruleNames[e] = null;
  }
  newName(e, t = null, i = {}) {
    for (let s = t ? 0 : 1; ; s++) {
      let r = s ? `${e}-${s}` : e;
      if (!this.terms.names[r])
        return this.terms.makeNonTerminal(r, t === !0 ? null : t, i);
    }
  }
  prepareParser() {
    let e = Zt("Simplify rules", () => uy(this.rules, [
      ...this.skipRules,
      ...this.terms.tops
    ])), { nodeTypes: t, names: i, minRepeatTerm: s, maxTerm: r } = this.terms.finish(e);
    for (let w in this.namedTerms)
      this.termTable[w] = this.namedTerms[w].id;
    /\bgrammar\b/.test(fn) && console.log(e.join(`
`));
    let o = this.terms.tops.slice(), l = I0(this.terms), a = this.skipRules.map((w, M) => {
      let $ = [], H = [], G = [];
      for (let ke of w.rules) {
        if (!ke.parts.length)
          continue;
        let ie = ke.parts[0];
        for (let ae of ie.terminal ? [ie] : l[ie.name] || [])
          ae && !H.includes(ae) && H.push(ae);
        ie.terminal && ke.parts.length == 1 && !G.some((ae) => ae != ke && ae.parts[0] == ie) ? $.push(ie) : G.push(ke);
      }
      return w.rules = G, G.length && o.push(w), { skip: $, rule: G.length ? w : null, startTokens: H, id: M };
    }), h = Zt("Build full automaton", () => H0(this.terms, o, l)), c = this.localTokens.map((w, M) => w.buildLocalGroup(h, a, M)), { tokenGroups: f, tokenPrec: u, tokenData: d } = Zt("Build token groups", () => this.tokens.buildTokenGroups(h, a, c.length));
    for (let w of this.externalTokens)
      w.checkConflicts(h, a);
    let p = Zt("Finish automaton", () => K0(h)), m = Z0(p, this.terms.tops);
    /\blr\b/.test(fn) && console.log(p.join(`
`));
    let g = [];
    for (let w of this.externalSpecializers)
      g.push(w);
    for (let w in this.specialized)
      g.push({ token: this.terms.names[w], table: Y0(this.specialized[w]) });
    let y = (w) => w instanceof Wo ? w.ast.start : this.tokens.ast ? this.tokens.ast.start : -1, b = f.concat(this.externalTokens).sort((w, M) => y(w) - y(M)).concat(c), x = new Xf(), v = a.map((w) => {
      let M = [];
      for (let $ of w.skip)
        M.push($.id, 0, 4);
      if (w.rule) {
        let $ = p.find((H) => H.startRule == w.rule);
        for (let H of $.actions)
          M.push(H.term.id, $.id, 2);
      }
      return M.push(
        65535,
        0
        /* Seq.Done */
      ), x.storeArray(M);
    }), C = Zt("Finish states", () => {
      let w = new Uint32Array(
        p.length * 6
        /* ParseState.Size */
      ), M = this.computeForceReductions(p, a), $ = new X0(b, x, w, v, a, p, this);
      for (let H of p)
        $.finish(H, m(H.id), M[H.id]);
      return w;
    }), T = /* @__PURE__ */ Object.create(null);
    for (let w = 0; w < this.dialects.length; w++)
      T[this.dialects[w]] = x.storeArray((this.tokens.byDialect[w] || me).map((M) => M.id).concat(
        65535
        /* Seq.End */
      ));
    let A = null;
    if (this.dynamicRulePrecedences.length) {
      A = /* @__PURE__ */ Object.create(null);
      for (let { rule: w, prec: M } of this.dynamicRulePrecedences)
        A[w.id] = M;
    }
    let I = /* @__PURE__ */ Object.create(null);
    for (let w of this.terms.tops)
      I[w.nodeName] = [p.find((M) => M.startRule == w).id, w.id];
    let L = x.storeArray(u.concat(
      65535
      /* Seq.End */
    )), { nodeProps: W, skippedTypes: D } = this.gatherNodeProps(t);
    return {
      states: C,
      stateData: x.finish(),
      goto: ey(p),
      nodeNames: t.filter((w) => w.id < s).map((w) => w.nodeName).join(" "),
      nodeProps: W,
      skippedTypes: D,
      maxTerm: r,
      repeatNodeCount: t.length - s,
      tokenizers: b,
      tokenData: d,
      topRules: I,
      dialects: T,
      dynamicPrecedences: A,
      specialized: g,
      tokenPrec: L,
      termNames: i
    };
  }
  getParser() {
    let { states: e, stateData: t, goto: i, nodeNames: s, nodeProps: r, skippedTypes: o, maxTerm: l, repeatNodeCount: a, tokenizers: h, tokenData: c, topRules: f, dialects: u, dynamicPrecedences: d, specialized: p, tokenPrec: m, termNames: g } = this.prepareParser(), y = p.map((b) => {
      if (b instanceof Vr) {
        let x = this.options.externalSpecializer(b.ast.id.name, this.termTable);
        return {
          term: b.term.id,
          get: (v, C) => x(v, C) << 1 | (b.ast.type == "extend" ? 1 : 0),
          external: x,
          extend: b.ast.type == "extend"
        };
      } else
        return { term: b.token.id, get: (x) => b.table[x] || -1 };
    });
    return Is.deserialize({
      version: 14,
      states: e,
      stateData: t,
      goto: i,
      nodeNames: s,
      maxTerm: l,
      repeatNodeCount: a,
      nodeProps: r.map(({ prop: b, terms: x }) => [this.knownProps[b].prop, ...x]),
      propSources: this.options.externalPropSource ? this.ast.externalPropSources.map((b) => this.options.externalPropSource(b.id.name)) : void 0,
      skippedNodes: o,
      tokenData: c,
      tokenizers: h.map((b) => b.create()),
      context: this.ast.context ? typeof this.options.contextTracker == "function" ? this.options.contextTracker(this.termTable) : this.options.contextTracker : void 0,
      topRules: f,
      dialects: u,
      dynamicPrecedences: d,
      specialized: y,
      tokenPrec: m,
      termNames: g
    });
  }
  getParserFile() {
    let { states: e, stateData: t, goto: i, nodeNames: s, nodeProps: r, skippedTypes: o, maxTerm: l, repeatNodeCount: a, tokenizers: h, tokenData: c, topRules: f, dialects: u, dynamicPrecedences: d, specialized: p, tokenPrec: m, termNames: g } = this.prepareParser(), y = this.options.moduleStyle || "es", b = `// This file was generated by lezer-generator. You probably shouldn't edit it.
`, x = b, v = {}, C = /* @__PURE__ */ Object.create(null), T = /* @__PURE__ */ Object.create(null);
    for (let _ of kh)
      T[_] = !0;
    let A = this.options.exportName || "parser";
    T[A] = !0;
    let I = (_) => {
      for (let F = 0; ; F++) {
        let j = _ + (F ? "_" + F : "");
        if (!T[j])
          return j;
      }
    }, L = (_, F, j = _) => {
      let Pe = _ + " from " + F;
      if (C[Pe])
        return C[Pe];
      let Xt = JSON.stringify(F), Yt = _;
      return _ in T && (Yt = I(j), _ += `${y == "cjs" ? ":" : " as"} ${Yt}`), T[Yt] = !0, (v[Xt] || (v[Xt] = [])).push(_), C[Pe] = Yt;
    }, W = L("LRParser", "@lezer/lr"), D = h.map((_) => _.createSource(L)), w = this.ast.context ? L(this.ast.context.id.name, this.ast.context.source) : null, M = r.map(({ prop: _, terms: F }) => {
      let { source: j } = this.knownProps[_];
      return `[${j.from ? L(j.name, j.from) : JSON.stringify(j.name)}, ${F.map(ie).join(",")}]`;
    });
    function $(_) {
      return "{__proto__:null," + Object.keys(_).map((F) => `${/^(\d+|[a-zA-Z_]\w*)$/.test(F) ? F : JSON.stringify(F)}:${_[F]}`).join(", ") + "}";
    }
    let H = "", G = p.map((_) => {
      if (_ instanceof Vr) {
        let F = L(_.ast.id.name, _.ast.source), j = this.options.typeScript ? ": any" : "";
        return `{term: ${_.term.id}, get: (value${j}, stack${j}) => (${F}(value, stack) << 1)${_.ast.type == "extend" ? " | 1" : ""}, external: ${F}${_.ast.type == "extend" ? ", extend: true" : ""}}`;
      } else {
        let F = I("spec_" + _.token.name.replace(/\W/g, ""));
        T[F] = !0, H += `const ${F} = ${$(_.table)}
`;
        let j = this.options.typeScript ? `: keyof typeof ${F}` : "";
        return `{term: ${_.token.id}, get: (value${j}) => ${F}[value] || -1}`;
      }
    }), ke = this.ast.externalPropSources.map((_) => L(_.id.name, _.source));
    for (let _ in v)
      y == "cjs" ? x += `const {${v[_].join(", ")}} = require(${_})
` : x += `import {${v[_].join(", ")}} from ${_}
`;
    x += H;
    function ie(_) {
      return typeof _ != "string" || /^(true|false|\d+(\.\d+)?|\.\d+)$/.test(_) ? _ : JSON.stringify(_);
    }
    let ae = Object.keys(u).map((_) => `${_}: ${u[_]}`), Jt = `${W}.deserialize({
  version: 14,
  states: ${Zi(e, 4294967295)},
  stateData: ${Zi(t)},
  goto: ${Zi(i)},
  nodeNames: ${JSON.stringify(s)},
  maxTerm: ${l}${w ? `,
  context: ${w}` : ""}${M.length ? `,
  nodeProps: [
    ${M.join(`,
    `)}
  ]` : ""}${ke.length ? `,
  propSources: [${ke.join()}]` : ""}${o.length ? `,
  skippedNodes: ${JSON.stringify(o)}` : ""},
  repeatNodeCount: ${a},
  tokenData: ${Zi(c)},
  tokenizers: [${D.join(", ")}],
  topRules: ${JSON.stringify(f)}${ae.length ? `,
  dialects: {${ae.join(", ")}}` : ""}${d ? `,
  dynamicPrecedences: ${JSON.stringify(d)}` : ""}${G.length ? `,
  specialized: [${G.join(",")}]` : ""},
  tokenPrec: ${m}${this.options.includeNames ? `,
  termNames: ${JSON.stringify(g)}` : ""}
})`, ee = [];
    for (let _ in this.termTable) {
      let F = _;
      if (kh.includes(F))
        for (let j = 1; F = "_".repeat(j) + _, F in this.termTable; j++)
          ;
      else if (!/^[\w$]+$/.test(_))
        continue;
      ee.push(`${F}${y == "cjs" ? ":" : " ="} ${this.termTable[_]}`);
    }
    for (let _ = 0; _ < this.dialects.length; _++)
      ee.push(`Dialect_${this.dialects[_]}${y == "cjs" ? ":" : " ="} ${_}`);
    return {
      parser: x + (y == "cjs" ? `exports.${A} = ${Jt}
` : `export const ${A} = ${Jt}
`),
      terms: y == "cjs" ? `${b}module.exports = {
  ${ee.join(`,
  `)}
}` : `${b}export const
  ${ee.join(`,
  `)}
`
    };
  }
  gatherNonSkippedNodes() {
    let e = /* @__PURE__ */ Object.create(null), t = [], i = (s) => {
      e[s.id] || (e[s.id] = !0, t.push(s));
    };
    this.terms.tops.forEach(i);
    for (let s = 0; s < t.length; s++)
      for (let r of t[s].rules)
        for (let o of r.parts)
          i(o);
    return e;
  }
  gatherNodeProps(e) {
    let t = this.gatherNonSkippedNodes(), i = [], s = [];
    for (let r of e) {
      !t[r.id] && !r.error && i.push(r.id);
      for (let o in r.props) {
        let l = this.knownProps[o];
        if (!l)
          throw new Rt("No known prop type for " + o);
        if (l.source.from == null && (l.source.name == "repeated" || l.source.name == "error"))
          continue;
        let a = s.find((h) => h.prop == o);
        a || s.push(a = { prop: o, values: {} }), (a.values[r.props[o]] || (a.values[r.props[o]] = [])).push(r.id);
      }
    }
    return {
      nodeProps: s.map(({ prop: r, values: o }) => {
        let l = [];
        for (let a in o) {
          let h = o[a];
          if (h.length == 1)
            l.push(h[0], a);
          else {
            l.push(-h.length);
            for (let c of h)
              l.push(c);
            l.push(a);
          }
        }
        return { prop: r, terms: l };
      }),
      skippedTypes: i
    };
  }
  makeTerminal(e, t, i) {
    return this.terms.makeTerminal(this.terms.uniqueName(e), t, i);
  }
  computeForceReductions(e, t) {
    let i = [], s = [], r = /* @__PURE__ */ Object.create(null);
    for (let a of e) {
      i.push(0);
      for (let h of a.goto) {
        let c = r[h.term.id] || (r[h.term.id] = []), f = c.find((u) => u.target == h.target.id);
        f ? f.parents.push(a.id) : c.push({ parents: [a.id], target: h.target.id });
      }
      s[a.id] = a.set.filter((h) => h.pos > 0 && !h.rule.name.top).sort((h, c) => c.pos - h.pos || h.rule.parts.length - c.rule.parts.length);
    }
    let o = /* @__PURE__ */ Object.create(null);
    function l(a, h, c = null) {
      let f = r[a];
      return f ? f.some((u) => {
        let d = c ? c.filter((m) => u.parents.includes(m)) : u.parents;
        if (d.length == 0)
          return !1;
        if (u.target == h)
          return !0;
        let p = o[u.target];
        return p != null && l(p, h, d);
      }) : !1;
    }
    for (let a of e)
      a.defaultReduce && a.defaultReduce.parts.length > 0 && (i[a.id] = un(a.defaultReduce, t), a.defaultReduce.parts.length == 1 && (o[a.id] = a.defaultReduce.name.id));
    for (let a = 1; ; a++) {
      let h = !0;
      for (let c of e) {
        if (c.defaultReduce)
          continue;
        let f = s[c.id];
        if (f.length != a) {
          f.length > a && (h = !1);
          continue;
        }
        for (let u of f)
          if (u.pos != 1 || !l(u.rule.name.id, c.id)) {
            i[c.id] = un(u.rule, t, u.pos), u.pos == 1 && (o[c.id] = u.rule.name.id);
            break;
          }
      }
      if (h)
        break;
    }
    return i;
  }
  substituteArgs(e, t, i) {
    return t.length == 0 ? e : e.walk((s) => {
      let r;
      if (s instanceof Te && (r = i.findIndex((o) => o.name == s.id.name)) > -1) {
        let o = t[r];
        if (s.args.length) {
          if (o instanceof Te && !o.args.length)
            return new Te(s.start, o.id, s.args);
          this.raise("Passing arguments to a parameter that already has arguments", s.start);
        }
        return o;
      } else if (s instanceof ai) {
        let o = s.rule, l = this.substituteArgsInProps(o.props, t, i);
        return l == o.props ? s : new ai(s.start, new Tl(o.start, o.id, l, o.params, o.expr));
      } else if (s instanceof Oi) {
        let o = this.substituteArgsInProps(s.props, t, i);
        return o == s.props ? s : new Oi(s.start, s.type, o, s.token, s.content);
      }
      return s;
    });
  }
  substituteArgsInProps(e, t, i) {
    let s = (o) => {
      let l = o;
      for (let a = 0; a < o.length; a++) {
        let h = o[a];
        if (!h.name)
          continue;
        let c = i.findIndex((u) => u.name == h.name);
        if (c < 0)
          continue;
        l == o && (l = o.slice());
        let f = t[c];
        f instanceof Te && !f.args.length ? l[a] = new an(h.start, f.id.name, null) : f instanceof Ge ? l[a] = new an(h.start, f.value, null) : this.raise(`Trying to interpolate expression '${f}' into a prop`, h.start);
      }
      return l;
    }, r = e;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = s(l.value);
      a != l.value && (r == e && (r = e.slice()), r[o] = new sr(l.start, l.at, l.name, a));
    }
    return r;
  }
  conflictsFor(e) {
    let t = we.none, i = we.none;
    for (let s of e)
      if (s.type == "ambig")
        t = t.join(new we(0, [s.id.name]));
      else {
        let r = this.ast.precedences, o = r ? r.items.findIndex((h) => h.id.name == s.id.name) : -1;
        o < 0 && this.raise(`Reference to unknown precedence: '${s.id.name}'`, s.id.start);
        let l = r.items[o], a = r.items.length - o;
        l.type == "cut" ? t = t.join(new we(0, me, a)) : (t = t.join(new we(a << 2)), i = i.join(new we((a << 2) + (l.type == "left" ? 1 : l.type == "right" ? -1 : 0))));
      }
    return { here: t, atEnd: i };
  }
  raise(e, t = 1) {
    return this.input.raise(e, t);
  }
  warn(e, t = -1) {
    let i = this.input.message(e, t);
    this.options.warn ? this.options.warn(i) : console.warn(i);
  }
  defineRule(e, t) {
    let i = this.currentSkip[this.currentSkip.length - 1];
    for (let s of t)
      this.rules.push(new Rl(e, s.terms, s.ensureConflicts(), i));
  }
  resolve(e) {
    for (let s of this.built)
      if (s.matches(e))
        return [Ue(s.term)];
    let t = this.tokens.getToken(e);
    if (t)
      return [Ue(t)];
    for (let s of this.localTokens) {
      let r = s.getToken(e);
      if (r)
        return [Ue(r)];
    }
    for (let s of this.externalTokens) {
      let r = s.getToken(e);
      if (r)
        return [Ue(r)];
    }
    for (let s of this.externalSpecializers) {
      let r = s.getToken(e);
      if (r)
        return [Ue(r)];
    }
    let i = this.astRules.find((s) => s.rule.id.name == e.id.name);
    return i ? (i.rule.params.length != e.args.length && this.raise(`Wrong number or arguments for '${e.id.name}'`, e.start), this.used(i.rule.id.name), [Ue(this.buildRule(i.rule, e.args, i.skip))]) : this.raise(`Reference to undefined rule '${e.id.name}'`, e.start);
  }
  // For tree-balancing reasons, repeat expressions X+ have to be
  // normalized to something like
  //
  //     R -> X | R R
  //
  // Returns the `R` term.
  normalizeRepeat(e) {
    let t = this.built.find((r) => r.matchesRepeat(e));
    if (t)
      return Ue(t.term);
    let i = e.expr.prec < e.prec ? `(${e.expr})+` : `${e.expr}+`, s = this.terms.makeRepeat(this.terms.uniqueName(i));
    return this.built.push(new zs("+", [e.expr], s)), this.defineRule(s, this.normalizeExpr(e.expr).concat(Ue(s, s))), Ue(s);
  }
  normalizeSequence(e) {
    let t = e.exprs.map((r) => this.normalizeExpr(r)), i = this;
    function s(r, o, l) {
      let { here: a, atEnd: h } = i.conflictsFor(e.markers[o]);
      if (o == t.length)
        return [r.withConflicts(r.terms.length, a.join(l))];
      let c = [];
      for (let f of t[o])
        for (let u of s(r.concat(f).withConflicts(r.terms.length, a), o + 1, l.join(h)))
          c.push(u);
      return c;
    }
    return s(at.none, 0, we.none);
  }
  normalizeExpr(e) {
    if (e instanceof gi && e.kind == "?")
      return [at.none, ...this.normalizeExpr(e.expr)];
    if (e instanceof gi) {
      let t = this.normalizeRepeat(e);
      return e.kind == "+" ? [t] : [at.none, t];
    } else return e instanceof Ft ? e.exprs.reduce((t, i) => t.concat(this.normalizeExpr(i)), []) : e instanceof qe ? this.normalizeSequence(e) : e instanceof Ge ? [Ue(this.tokens.getLiteral(e))] : e instanceof Te ? this.resolve(e) : e instanceof Oi ? [Ue(this.resolveSpecialization(e))] : e instanceof ai ? [Ue(this.buildRule(e.rule, me, this.currentSkip[this.currentSkip.length - 1], !0))] : this.raise(`This type of expression ('${e}') may not occur in non-token rules`, e.start);
  }
  buildRule(e, t, i, s = !1) {
    let r = this.substituteArgs(e.expr, t, e.params), { name: o, props: l, dynamicPrec: a, inline: h, group: c, exported: f } = this.nodeInfo(e.props || me, s ? "pg" : "pgi", e.id.name, t, e.params, e.expr);
    f && e.params.length && this.warn("Can't export parameterized rules", e.start), f && s && this.warn("Can't export inline rule", e.start);
    let u = this.newName(e.id.name + (t.length ? "<" + t.join(",") + ">" : ""), o || !0, l);
    h && (u.inline = !0), a && this.registerDynamicPrec(u, a), (u.nodeType || f) && e.params.length == 0 && (o || (u.preserve = !0), s || (this.namedTerms[f || e.id.name] = u)), s || this.built.push(new zs(e.id.name, t, u)), this.currentSkip.push(i);
    let d = this.normalizeExpr(r);
    return d.length > 100 * (r instanceof Ft ? r.exprs.length : 1) && this.warn(`Rule ${e.id.name} is generating a lot (${d.length}) of choices.
  Consider splitting it up or reducing the amount of ? or | operator uses.`, e.start), /\brulesize\b/.test(fn) && d.length > 10 && console.log(`Rule ${e.id.name}: ${d.length} variants`), this.defineRule(u, d), this.currentSkip.pop(), c && this.definedGroups.push({ name: u, group: c, rule: e }), u;
  }
  nodeInfo(e, t, i = null, s = me, r = me, o, l) {
    let a = {}, h = i && (t.indexOf("a") > -1 || !py(i)) && !/ /.test(i) ? i : null, c = null, f = 0, u = !1, d = null, p = null;
    for (let m of e)
      if (m.at)
        if (m.name == "name")
          h = this.finishProp(m, s, r), / /.test(h) && this.raise(`Node names cannot have spaces ('${h}')`, m.start);
        else if (m.name == "dialect") {
          t.indexOf("d") < 0 && this.raise("Can't specify a dialect on non-token rules", e[0].start), m.value.length != 1 && !m.value[0].value && this.raise("The '@dialect' rule prop must hold a plain string value");
          let g = this.dialects.indexOf(m.value[0].value);
          g < 0 && this.raise(`Unknown dialect '${m.value[0].value}'`, m.value[0].start), c = g;
        } else m.name == "dynamicPrecedence" ? (t.indexOf("p") < 0 && this.raise("Dynamic precedence can only be specified on nonterminals"), (m.value.length != 1 || !/^-?(?:10|\d)$/.test(m.value[0].value)) && this.raise("The '@dynamicPrecedence' rule prop must hold an integer between -10 and 10"), f = +m.value[0].value) : m.name == "inline" ? (m.value.length && this.raise("'@inline' doesn't take a value", m.value[0].start), t.indexOf("i") < 0 && this.raise("Inline can only be specified on nonterminals"), u = !0) : m.name == "isGroup" ? (t.indexOf("g") < 0 && this.raise("'@isGroup' can only be specified on nonterminals"), d = m.value.length ? this.finishProp(m, s, r) : i) : m.name == "export" ? m.value.length ? p = this.finishProp(m, s, r) : p = i : this.raise(`Unknown built-in prop name '@${m.name}'`, m.start);
      else {
        if (!this.knownProps[m.name]) {
          let g = ["name", "dialect", "dynamicPrecedence", "export", "isGroup"].includes(m.name) ? ` (did you mean '@${m.name}'?)` : "";
          this.raise(`Unknown prop name '${m.name}'${g}`, m.start);
        }
        a[m.name] = this.finishProp(m, s, r);
      }
    if (o && this.ast.autoDelim && (h || Yi(a))) {
      let m = this.findDelimiters(o);
      m && (mh(m[0], "closedBy", m[1].nodeName), mh(m[1], "openedBy", m[0].nodeName));
    }
    if (l && Yi(l))
      for (let m in l)
        m in a || (a[m] = l[m]);
    return Yi(a) && !h && this.raise("Node has properties but no name", e.length ? e[0].start : o.start), u && (Yi(a) || c || f) && this.raise("Inline nodes can't have props, dynamic precedence, or a dialect", e[0].start), u && h && (h = null), { name: h, props: a, dialect: c, dynamicPrec: f, inline: u, group: d, exported: p };
  }
  finishProp(e, t, i) {
    return e.value.map((s) => {
      if (s.value)
        return s.value;
      let r = i.findIndex((l) => l.name == s.name);
      r < 0 && this.raise(`Property refers to '${s.name}', but no parameter by that name is in scope`, s.start);
      let o = t[r];
      return o instanceof Te && !o.args.length ? o.id.name : o instanceof Ge ? o.value : this.raise(`Expression '${o}' can not be used as part of a property value`, s.start);
    }).join("");
  }
  resolveSpecialization(e) {
    let t = e.type, { name: i, props: s, dialect: r, exported: o } = this.nodeInfo(e.props, "d"), l = this.normalizeExpr(e.token);
    (l.length != 1 || l[0].terms.length != 1 || !l[0].terms[0].terminal) && this.raise(`The first argument to '${t}' must resolve to a token`, e.token.start);
    let a, h;
    if ((h = us(e.content)) != null)
      a = [h];
    else if (e.content instanceof Ft && e.content.exprs.every((d) => us(d) != null))
      a = e.content.exprs.map(us);
    else
      return this.raise(`The second argument to '${e.type}' must be a literal or choice of literals`, e.content.start);
    let c = l[0].terms[0], f = null, u = this.specialized[c.name] || (this.specialized[c.name] = []);
    for (let d of a) {
      let p = u.find((m) => m.value == d);
      p == null ? (f || (f = this.makeTerminal(c.name + "/" + JSON.stringify(d), i, s), r != null && (this.tokens.byDialect[r] || (this.tokens.byDialect[r] = [])).push(f)), u.push({ value: d, term: f, type: t, dialect: r, name: i }), this.tokenOrigins[f.name] = { spec: c }, (i || o) && (i || (f.preserve = !0), this.namedTerms[o || i] = f)) : (p.type != t && this.raise(`Conflicting specialization types for ${JSON.stringify(d)} of ${c.name} (${t} vs ${p.type})`, e.start), p.dialect != r && this.raise(`Conflicting dialects for specialization ${JSON.stringify(d)} of ${c.name}`, e.start), p.name != i && this.raise(`Conflicting names for specialization ${JSON.stringify(d)} of ${c.name}`, e.start), f && p.term != f && this.raise(`Conflicting specialization tokens for ${JSON.stringify(d)} of ${c.name}`, e.start), f = p.term);
    }
    return f;
  }
  findDelimiters(e) {
    if (!(e instanceof qe) || e.exprs.length < 2)
      return null;
    let t = (l) => {
      if (l instanceof Ge)
        return { term: this.tokens.getLiteral(l), str: l.value };
      if (l instanceof Te && l.args.length == 0) {
        let a = this.ast.rules.find((c) => c.id.name == l.id.name);
        if (a)
          return t(a.expr);
        let h = this.tokens.rules.find((c) => c.id.name == l.id.name);
        if (h && h.expr instanceof Ge)
          return { term: this.tokens.getToken(l), str: h.expr.value };
      }
      return null;
    }, i = t(e.exprs[e.exprs.length - 1]);
    if (!i || !i.term.nodeName)
      return null;
    let r = ["()", "[]", "{}", "<>"].find((l) => i.str.indexOf(l[1]) > -1 && i.str.indexOf(l[0]) < 0);
    if (!r)
      return null;
    let o = t(e.exprs[0]);
    return !o || !o.term.nodeName || o.str.indexOf(r[0]) < 0 || o.str.indexOf(r[1]) > -1 ? null : [o.term, i.term];
  }
  registerDynamicPrec(e, t) {
    this.dynamicRulePrecedences.push({ rule: e, prec: t }), e.preserve = !0;
  }
  defineGroup(e, t, i) {
    var s;
    let r = [], o = (l) => {
      if (l.nodeName)
        return [l];
      r.includes(l) && this.raise(`Rule '${i.id.name}' cannot define a group because it contains a non-named recursive rule ('${l.name}')`, i.start);
      let a = [];
      r.push(l);
      for (let h of this.rules)
        if (h.name == l) {
          let c = h.parts.map(o).filter((f) => f.length);
          if (c.length > 1 && this.raise(`Rule '${i.id.name}' cannot define a group because some choices produce multiple named nodes`, i.start), c.length == 1)
            for (let f of c[0])
              a.push(f);
        }
      return r.pop(), a;
    };
    for (let l of o(e))
      l.props.group = (((s = l.props.group) === null || s === void 0 ? void 0 : s.split(" ")) || []).concat(t).sort().join(" ");
  }
  checkGroups() {
    let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
    for (let s of this.terms.terms)
      if (s.nodeName && (t[s.nodeName] = !0, s.props.group))
        for (let r of s.props.group.split(" "))
          (e[r] || (e[r] = [])).push(s);
    let i = Object.keys(e);
    for (let s = 0; s < i.length; s++) {
      let r = i[s], o = e[r];
      t[r] && this.warn(`Group name '${r}' conflicts with a node of the same name`);
      for (let l = s + 1; l < i.length; l++) {
        let a = e[i[l]];
        o.some((h) => a.includes(h)) && (o.length > a.length ? a.some((h) => !o.includes(h)) : o.some((h) => !a.includes(h))) && this.warn(`Groups '${r}' and '${i[l]}' overlap without one being a superset of the other`);
      }
    }
  }
}
function us(n) {
  if (n instanceof Ge)
    return n.value;
  if (n instanceof qe) {
    let e = "";
    for (let t of n.exprs) {
      let i = us(t);
      if (i == null)
        return null;
      e += i;
    }
    return e;
  }
  return null;
}
const $r = 5;
class X0 {
  constructor(e, t, i, s, r, o, l) {
    this.tokenizers = e, this.data = t, this.stateArray = i, this.skipData = s, this.skipInfo = r, this.states = o, this.builder = l, this.sharedActions = [];
  }
  findSharedActions(e) {
    if (e.actions.length < $r)
      return null;
    let t = null;
    for (let o of this.sharedActions)
      (!t || o.actions.length > t.actions.length) && o.actions.every((l) => e.actions.some((a) => a.eq(l))) && (t = o);
    if (t)
      return t;
    let i = null, s = [];
    for (let o = e.id + 1; o < this.states.length; o++) {
      let l = this.states[o], a = 0;
      if (!(l.defaultReduce || l.actions.length < $r)) {
        for (let h of e.actions)
          for (let c of l.actions)
            h.eq(c) && (s[a++] = h);
        a >= $r && (!i || i.length < a) && (i = s, s = []);
      }
    }
    if (!i)
      return null;
    let r = { actions: i, addr: this.storeActions(i, -1, null) };
    return this.sharedActions.push(r), r;
  }
  storeActions(e, t, i) {
    if (t < 0 && i && i.actions.length == e.length)
      return i.addr;
    let s = [];
    for (let r of e)
      if (!(i && i.actions.some((o) => o.eq(r))))
        if (r instanceof tt)
          s.push(r.term.id, r.target.id, 0);
        else {
          let o = un(r.rule, this.skipInfo);
          o != t && s.push(r.term.id, o & 65535, o >> 16);
        }
    return s.push(
      65535
      /* Seq.End */
    ), t > -1 ? s.push(2, t & 65535, t >> 16) : i ? s.push(1, i.addr & 65535, i.addr >> 16) : s.push(
      0
      /* Seq.Done */
    ), this.data.storeArray(s);
  }
  finish(e, t, i) {
    let s = this.builder, r = s.skipRules.indexOf(e.skip), o = this.skipData[r], l = this.skipInfo[r].startTokens, a = e.defaultReduce ? un(e.defaultReduce, this.skipInfo) : 0, h = t ? 1 : 0, c = -1, f = null;
    if (a == 0) {
      if (t)
        for (const m of e.actions)
          m instanceof Kt && m.term.eof && (c = un(m.rule, this.skipInfo));
      c < 0 && (f = this.findSharedActions(e));
    }
    e.set.some((m) => m.rule.name.top && m.pos == m.rule.parts.length) && (h |= 2);
    let u = [];
    for (let m = 0; m < e.actions.length + l.length; m++) {
      let g = m < e.actions.length ? e.actions[m].term : l[m - e.actions.length];
      for (; ; ) {
        let y = s.tokenOrigins[g.name];
        if (y && y.spec) {
          g = y.spec;
          continue;
        }
        y && y.external instanceof Wo && en(u, y.external);
        break;
      }
    }
    let d = 0;
    for (let m = 0; m < this.tokenizers.length; m++) {
      let g = this.tokenizers[m];
      (u.includes(g) || g.groupID == e.tokenGroup) && (d |= 1 << m);
    }
    let p = e.id * 6;
    this.stateArray[
      p + 0
      /* ParseState.Flags */
    ] = h, this.stateArray[
      p + 1
      /* ParseState.Actions */
    ] = this.storeActions(a ? me : e.actions, c, f), this.stateArray[
      p + 2
      /* ParseState.Skip */
    ] = o, this.stateArray[
      p + 3
      /* ParseState.TokenizerMask */
    ] = d, this.stateArray[
      p + 4
      /* ParseState.DefaultReduce */
    ] = a, this.stateArray[
      p + 5
      /* ParseState.ForcedReduce */
    ] = i;
  }
}
function mh(n, e, t) {
  let i = n.props[e];
  (!i || i.split(" ").indexOf(t) < 0) && (n.props[e] = i ? i + " " + t : t);
}
function Y0(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let { value: t, term: i, type: s } of n) {
    let r = s == "specialize" ? 0 : 1;
    e[t] = i.id << 1 | r;
  }
  return e;
}
function un(n, e, t = n.parts.length) {
  return n.name.id | 65536 | (n.isRepeatWrap && t == n.parts.length ? 131072 : 0) | (e.some((i) => i.rule == n.name) ? 262144 : 0) | t << 19;
}
function Q0(n, e) {
  e: for (let t = 0; ; ) {
    let i = n.indexOf(e[0], t);
    if (i == -1 || i + e.length > n.length)
      break;
    for (let s = 1; s < e.length; s++)
      if (e[s] != n[i + s]) {
        t = i + 1;
        continue e;
      }
    return i;
  }
  return -1;
}
function Z0(n, e) {
  let t = /* @__PURE__ */ Object.create(null), i = [], s = (r) => {
    t[r.id] || (t[r.id] = !0, i.push(r));
  };
  for (let r of n)
    r.startRule && e.includes(r.startRule) && s(r);
  for (let r = 0; r < i.length; r++) {
    for (let o of i[r].actions)
      o instanceof tt && s(o.target);
    for (let o of i[r].goto)
      s(o.target);
  }
  return (r) => !t[r];
}
class Xf {
  constructor() {
    this.data = [];
  }
  storeArray(e) {
    let t = Q0(this.data, e);
    if (t > -1)
      return t;
    let i = this.data.length;
    for (let s of e)
      this.data.push(s);
    return i;
  }
  finish() {
    return Uint16Array.from(this.data);
  }
}
function ey(n) {
  let e = {}, t = 0;
  for (let o of n)
    for (let l of o.goto) {
      t = Math.max(l.term.id, t);
      let a = e[l.term.id] || (e[l.term.id] = {});
      (a[l.target.id] || (a[l.target.id] = [])).push(o.id);
    }
  let i = new Xf(), s = [], r = t + 2;
  for (let o = 0; o <= t; o++) {
    let l = e[o];
    if (!l) {
      s.push(1);
      continue;
    }
    let a = [], h = Object.keys(l);
    for (let c of h) {
      let f = l[c];
      a.push((c == h[h.length - 1] ? 1 : 0) + (f.length << 1)), a.push(+c);
      for (let u of f)
        a.push(u);
    }
    s.push(i.storeArray(a) + r);
  }
  if (s.some((o) => o > 65535))
    throw new Rt("Goto table too large");
  return Uint16Array.from([t + 1, ...s, ...i.data]);
}
class ty {
  constructor(e, t) {
    this.tokens = e, this.groupID = t;
  }
  create() {
    return this.groupID;
  }
  createSource() {
    return String(this.groupID);
  }
}
function en(n, e) {
  n.includes(e) || n.push(e);
}
function iy(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t of n) {
    let i = 1 << t.groupID;
    for (let s of t.tokens)
      e[s.id] = (e[s.id] || 0) | i;
  }
  return e;
}
class ny {
  constructor(e, t, i) {
    this.name = e, this.expr = t, this.scope = i;
  }
}
class sy {
  constructor(e, t, i, s) {
    this.name = e, this.start = t, this.to = i, this.args = s;
  }
}
class Yf {
  constructor(e, t) {
    this.b = e, this.ast = t, this.startState = new Ve(), this.built = [], this.building = [], this.byDialect = /* @__PURE__ */ Object.create(null), this.precedenceRelations = [], this.rules = t ? t.rules : me;
    for (let i of this.rules)
      e.unique(i.id);
  }
  getToken(e) {
    for (let h of this.built)
      if (h.matches(e))
        return h.term;
    let t = e.id.name, i = this.rules.find((h) => h.id.name == t);
    if (!i)
      return null;
    let { name: s, props: r, dialect: o, exported: l } = this.b.nodeInfo(i.props, "d", t, e.args, i.params.length != e.args.length ? me : i.params), a = this.b.makeTerminal(e.toString(), s, r);
    return o != null && (this.byDialect[o] || (this.byDialect[o] = [])).push(a), (a.nodeType || l) && i.params.length == 0 && (a.nodeType || (a.preserve = !0), this.b.namedTerms[l || t] = a), this.buildRule(i, e, this.startState, new Ve([a])), this.built.push(new zs(t, e.args, a)), a;
  }
  buildRule(e, t, i, s, r = me) {
    let o = t.id.name;
    e.params.length != t.args.length && this.b.raise(`Incorrect number of arguments for token '${o}'`, t.start);
    let l = this.building.find((h) => h.name == o && En(t.args, h.args));
    if (l) {
      if (l.to == s) {
        i.nullEdge(l.start);
        return;
      }
      let h = this.building.length - 1;
      for (; this.building[h].name != o; )
        h--;
      this.b.raise(`Invalid (non-tail) recursion in token rules: ${this.building.slice(h).map((c) => c.name).join(" -> ")}`, t.start);
    }
    this.b.used(e.id.name);
    let a = new Ve();
    i.nullEdge(a), this.building.push(new sy(o, a, s, t.args)), this.build(this.b.substituteArgs(e.expr, t.args, e.params), a, s, t.args.map((h, c) => new ny(e.params[c].name, h, r))), this.building.pop();
  }
  build(e, t, i, s) {
    if (e instanceof Te) {
      let r = e.id.name, o = s.find((a) => a.name == r);
      if (o)
        return this.build(o.expr, t, i, o.scope);
      let l;
      for (let a = 0, h = this.b.localTokens; a <= h.length && (l = (a == h.length ? this.b.tokens : h[a]).rules.find((f) => f.id.name == r), !l); a++)
        ;
      if (!l)
        return this.b.raise(`Reference to token rule '${r}', which isn't found`, e.start);
      this.buildRule(l, e, t, i, s);
    } else if (e instanceof Lo)
      for (let [r, o] of Io[e.type])
        t.edge(r, o, i);
    else if (e instanceof Ft)
      for (let r of e.exprs)
        this.build(r, t, i, s);
    else if (Qf(e))
      t.nullEdge(i);
    else if (e instanceof qe) {
      let r = e.markers.find((o) => o.length > 0);
      r && this.b.raise("Conflict marker in token expression", r[0].start);
      for (let o = 0; o < e.exprs.length; o++) {
        let l = o == e.exprs.length - 1 ? i : new Ve();
        this.build(e.exprs[o], t, l, s), t = l;
      }
    } else if (e instanceof gi)
      if (e.kind == "*") {
        let r = new Ve();
        t.nullEdge(r), this.build(e.expr, r, r, s), r.nullEdge(i);
      } else if (e.kind == "+") {
        let r = new Ve();
        this.build(e.expr, t, r, s), this.build(e.expr, r, r, s), r.nullEdge(i);
      } else
        t.nullEdge(i), this.build(e.expr, t, i, s);
    else if (e instanceof Wf)
      for (let [r, o] of e.inverted ? ay(e.ranges) : e.ranges)
        hy(t, i, r, o);
    else if (e instanceof Ge)
      for (let r = 0; r < e.value.length; r++) {
        let o = e.value.charCodeAt(r), l = r == e.value.length - 1 ? i : new Ve();
        t.edge(o, o + 1, l), t = l;
      }
    else if (e instanceof Vf) {
      let r = new Ve();
      t.edge(0, 56320, i), t.edge(56320, El + 1, i), t.edge(55296, 56320, r), r.edge(56320, 57344, i);
    } else
      return this.b.raise("Unrecognized expression type in token", e.start);
  }
  takePrecedences() {
    let e = this.precedenceRelations = [];
    if (this.ast)
      for (let t of this.ast.precedences) {
        let i = [];
        for (let s of t.items) {
          let r = [];
          if (s instanceof Te)
            for (let o of this.built)
              (s.args.length ? o.matches(s) : o.id == s.id.name) && r.push(o.term);
          else {
            let o = JSON.stringify(s.value), l = this.built.find((a) => a.id == o);
            l && r.push(l.term);
          }
          r.length || this.b.warn(`Precedence specified for unknown token ${s}`, s.start);
          for (let o of r)
            Wr(e, o, i);
          i = i.concat(r);
        }
      }
  }
  precededBy(e, t) {
    let i = this.precedenceRelations.find((s) => s.term == e);
    return i && i.after.includes(t);
  }
  buildPrecTable(e) {
    let t = [], i = this.precedenceRelations.slice();
    for (let { a: s, b: r, soft: o } of e)
      if (o) {
        if (!i.some((l) => l.term == s) || !i.some((l) => l.term == r))
          continue;
        o < 0 && ([s, r] = [r, s]), Wr(i, r, [s]), Wr(i, s, []);
      }
    e: for (; i.length; ) {
      for (let s = 0; s < i.length; s++) {
        let r = i[s];
        if (r.after.every((o) => t.includes(o.id))) {
          if (t.push(r.term.id), i.length == 1)
            break e;
          i[s] = i.pop();
          continue e;
        }
      }
      this.b.raise(`Cyclic token precedence relation between ${i.map((s) => s.term).join(", ")}`);
    }
    return t;
  }
}
class ry extends Yf {
  constructor() {
    super(...arguments), this.explicitConflicts = [];
  }
  getLiteral(e) {
    let t = JSON.stringify(e.value);
    for (let h of this.built)
      if (h.id == t)
        return h.term;
    let i = null, s = {}, r = null, o = null, l = this.ast ? this.ast.literals.find((h) => h.literal == e.value) : null;
    l && ({ name: i, props: s, dialect: r, exported: o } = this.b.nodeInfo(l.props, "da", e.value));
    let a = this.b.makeTerminal(t, i, s);
    return r != null && (this.byDialect[r] || (this.byDialect[r] = [])).push(a), o && (this.b.namedTerms[o] = a), this.build(e, this.startState, new Ve([a]), me), this.built.push(new zs(t, me, a)), a;
  }
  takeConflicts() {
    var e;
    let t = (i) => {
      if (i instanceof Te) {
        for (let s of this.built)
          if (s.matches(i))
            return s.term;
      } else {
        let s = JSON.stringify(i.value), r = this.built.find((o) => o.id == s);
        if (r)
          return r.term;
      }
      return this.b.warn(`Conflict specified for unknown token ${i}`, i.start), null;
    };
    for (let i of ((e = this.ast) === null || e === void 0 ? void 0 : e.conflicts) || []) {
      let s = t(i.a), r = t(i.b);
      s && r && (s.id < r.id && ([s, r] = [r, s]), this.explicitConflicts.push({ a: s, b: r }));
    }
  }
  // Token groups are a mechanism for allowing conflicting (matching
  // overlapping input, without an explicit precedence being given)
  // tokens to exist in a grammar _if_ they don't occur in the same
  // place (aren't used in the same states).
  //
  // States that use tokens that conflict will raise an error when any
  // of the conflicting pairs of tokens both occur in that state.
  // Otherwise, they are assigned a token group, which includes all
  // the potentially-conflicting tokens they use. If there's already a
  // group that doesn't have any conflicts with those tokens, that is
  // reused, otherwise a new group is created.
  //
  // So each state has zero or one token groups, and each conflicting
  // token may belong to one or more groups. Tokens get assigned a
  // 16-bit bitmask with the groups they belong to set to 1 (all-1s
  // for non-conflicting tokens). When tokenizing, that mask is
  // compared to the current state's group (again using all-1s for
  // group-less states) to determine whether a token is applicable for
  // this state.
  //
  // Extended/specialized tokens are treated as their parent token for
  // this purpose.
  buildTokenGroups(e, t, i) {
    let s = this.startState.compile();
    s.accepting.length && this.b.raise(`Grammar contains zero-length tokens (in '${s.accepting[0].name}')`, this.rules.find((f) => f.id.name == s.accepting[0].name).start), /\btokens\b/.test(fn) && console.log(s.toString());
    let r = s.findConflicts(ly(e, this.b, t)).filter(({ a: f, b: u }) => !this.precededBy(f, u) && !this.precededBy(u, f));
    for (let { a: f, b: u } of this.explicitConflicts)
      r.some((d) => d.a == f && d.b == u) || r.push(new Uf(f, u, 0, "", ""));
    let o = r.filter((f) => f.soft), l = r.filter((f) => !f.soft), a = [], h = [];
    for (let f of e) {
      if (f.defaultReduce || f.tokenGroup > -1)
        continue;
      let u = [], d = [], p = t[this.b.skipRules.indexOf(f.skip)].startTokens;
      for (let y of p)
        f.actions.some((b) => b.term == y) && this.b.raise(`Use of token ${y.name} conflicts with skip rule`);
      let m = [];
      for (let y = 0; y < f.actions.length + (p ? p.length : 0); y++) {
        let b = y < f.actions.length ? f.actions[y].term : p[y - f.actions.length], x = this.b.tokenOrigins[b.name];
        if (x && x.spec)
          b = x.spec;
        else if (x && x.external)
          continue;
        en(m, b);
      }
      if (m.length == 0)
        continue;
      for (let y of m)
        for (let b of l) {
          let x = b.a == y ? b.b : b.b == y ? b.a : null;
          if (x) {
            if (m.includes(x) && !a.some((v) => v.conflict == b)) {
              let v = b.exampleA ? ` (example: ${JSON.stringify(b.exampleA)}${b.exampleB ? ` vs ${JSON.stringify(b.exampleB)}` : ""})` : "";
              a.push({
                error: `Overlapping tokens ${y.name} and ${x.name} used in same context${v}
After: ${f.set[0].trail()}`,
                conflict: b
              });
            }
            en(u, y), en(d, x);
          }
        }
      let g = null;
      for (let y of h)
        if (!d.some((b) => y.tokens.includes(b))) {
          for (let b of u)
            en(y.tokens, b);
          g = y;
          break;
        }
      g || (g = new ty(u, h.length + i), h.push(g)), f.tokenGroup = g.groupID;
    }
    a.length && this.b.raise(a.map((f) => f.error).join(`

`)), h.length + i > 16 && this.b.raise(`Too many different token groups (${h.length}) to represent them as a 16-bit bitfield`);
    let c = this.buildPrecTable(o);
    return {
      tokenGroups: h,
      tokenPrec: c,
      tokenData: s.toArray(iy(h), c)
    };
  }
}
class oy extends Yf {
  constructor(e, t) {
    super(e, t), this.fallback = null, t.fallback && e.unique(t.fallback.id);
  }
  getToken(e) {
    let t = null;
    if (this.ast.fallback && this.ast.fallback.id.name == e.id.name) {
      if (e.args.length && this.b.raise(`Incorrect number of arguments for ${e.id.name}`, e.start), !this.fallback) {
        let { name: i, props: s, exported: r } = this.b.nodeInfo(this.ast.fallback.props, "", e.id.name, me, me), o = this.fallback = this.b.makeTerminal(e.id.name, i, s);
        (o.nodeType || r) && (o.nodeType || (o.preserve = !0), this.b.namedTerms[r || e.id.name] = o), this.b.used(e.id.name);
      }
      t = this.fallback;
    } else
      t = super.getToken(e);
    return t && !this.b.tokenOrigins[t.name] && (this.b.tokenOrigins[t.name] = { group: this }), t;
  }
  buildLocalGroup(e, t, i) {
    let s = this.startState.compile();
    s.accepting.length && this.b.raise(`Grammar contains zero-length tokens (in '${s.accepting[0].name}')`, this.rules.find((h) => h.id.name == s.accepting[0].name).start);
    for (let { a: h, b: c, exampleA: f } of s.findConflicts(() => !0))
      !this.precededBy(h, c) && !this.precededBy(c, h) && this.b.raise(`Overlapping tokens ${h.name} and ${c.name} in local token group${f ? ` (example: ${JSON.stringify(f)})` : ""}`);
    for (let h of e) {
      if (h.defaultReduce)
        continue;
      let c = null, f = t[this.b.skipRules.indexOf(h.skip)].startTokens[0];
      for (let { term: u } of h.actions) {
        let d = this.b.tokenOrigins[u.name];
        for (; d?.spec; )
          d = this.b.tokenOrigins[d.spec.name];
        d?.group == this ? c = u : f = u;
      }
      c && (f && this.b.raise(`Tokens from a local token group used together with other tokens (${c.name} with ${f.name})`), h.tokenGroup = i);
    }
    let r = this.buildPrecTable(me), o = s.toArray({
      [i]: 65535
      /* Seq.End */
    }, r), l = o.length, a = new Uint16Array(o.length + r.length + 1);
    return a.set(o, 0), a.set(r, l), a[a.length - 1] = 65535, {
      groupID: i,
      create: () => new Ff(a, l, this.fallback ? this.fallback.id : void 0),
      createSource: (h) => `new ${h("LocalTokenGroup", "@lezer/lr")}(${Zi(a)}, ${l}${this.fallback ? `, ${this.fallback.id}` : ""})`
    };
  }
}
function ly(n, e, t) {
  let i = /* @__PURE__ */ Object.create(null);
  function s(r, o) {
    return r.actions.some((l) => l.term == o) || t[e.skipRules.indexOf(r.skip)].startTokens.includes(o);
  }
  return (r, o) => {
    r.id < o.id && ([r, o] = [o, r]);
    let l = r.id | o.id << 16, a = i[l];
    return a ?? (i[l] = n.some((h) => s(h, r) && s(h, o)));
  };
}
function ay(n) {
  let e = 0, t = [];
  for (let [i, s] of n)
    i > e && t.push([e, i]), e = s;
  return e <= bh && t.push([e, bh + 1]), t;
}
const Fr = 65536, gh = 55296, yh = 57344, bh = 1114111, zr = 56320, Hr = 57343;
function hy(n, e, t, i) {
  if (t < Fr && (t < gh && n.edge(t, Math.min(i, gh), e), i > yh && n.edge(Math.max(t, yh), Math.min(i, El + 1), e), t = Fr), i <= Fr)
    return;
  let s = String.fromCodePoint(t), r = String.fromCodePoint(i - 1), o = s.charCodeAt(0), l = s.charCodeAt(1), a = r.charCodeAt(0), h = r.charCodeAt(1);
  if (o == a) {
    let c = new Ve();
    n.edge(o, o + 1, c), c.edge(l, h + 1, e);
  } else {
    let c = o, f = a;
    if (l > zr) {
      c++;
      let u = new Ve();
      n.edge(o, o + 1, u), u.edge(l, Hr + 1, e);
    }
    if (h < Hr) {
      f--;
      let u = new Ve();
      n.edge(a, a + 1, u), u.edge(zr, h + 1, e);
    }
    if (c <= f) {
      let u = new Ve();
      n.edge(c, f + 1, u), u.edge(zr, Hr + 1, e);
    }
  }
}
function Qf(n) {
  return n instanceof qe && n.exprs.length == 0;
}
function Zf(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let i of e) {
    n.unique(i.id);
    let { name: s, props: r, dialect: o } = n.nodeInfo(i.props, "d", i.id.name), l = n.makeTerminal(i.id.name, s, r);
    o != null && (n.tokens.byDialect[o] || (n.tokens.byDialect[o] = [])).push(l), n.namedTerms[i.id.name] = t[i.id.name] = l;
  }
  return t;
}
function eu(n, e, t) {
  let i = e[t.id.name];
  return i ? (t.args.length && n.raise("External tokens cannot take arguments", t.args[0].start), n.used(t.id.name), i) : null;
}
function Wr(n, e, t) {
  let i = n.findIndex((s) => s.term == e);
  i < 0 ? n.push({ term: e, after: t }) : n[i] = { term: e, after: n[i].after.concat(t) };
}
class Wo {
  constructor(e, t) {
    this.b = e, this.ast = t, this.tokens = Zf(e, t.tokens);
    for (let i in this.tokens)
      this.b.tokenOrigins[this.tokens[i].name] = { external: this };
  }
  getToken(e) {
    return eu(this.b, this.tokens, e);
  }
  checkConflicts(e, t) {
    let i = [];
    for (let s of this.ast.conflicts) {
      let r = this.b.namedTerms[s.name];
      r ? r.terminal ? this.tokens[s.name] ? this.b.warn(`External token set specifying a conflict with one of its own tokens ('${s.name}')`) : i.push(r) : this.b.warn(`Term '${s.name}' isn't a terminal and cannot be used in a token conflict.`) : this.b.warn(`Unknown conflict term '${s.name}'`);
    }
    if (i.length)
      for (let s of e) {
        let r = t[this.b.skipRules.indexOf(s.skip)].startTokens, o = !1, l = null;
        for (let a = 0; a < s.actions.length + r.length; a++) {
          let h = a < s.actions.length ? s.actions[a].term : r[a - s.actions.length];
          h.name in this.tokens ? o = !0 : i.indexOf(h) > -1 && (l = h);
        }
        o && l && this.b.raise(`Tokens from external group used together with conflicting token '${l.name}'
After: ${s.set[0].trail()}`, this.ast.start);
      }
  }
  create() {
    return this.b.options.externalTokenizer(this.ast.id.name, this.b.termTable);
  }
  createSource(e) {
    let { source: t, id: { name: i } } = this.ast;
    return e(i, t);
  }
}
class Vr {
  constructor(e, t) {
    this.b = e, this.ast = t, this.term = null, this.tokens = Zf(e, t.tokens);
  }
  finish() {
    let e = this.b.normalizeExpr(this.ast.token);
    (e.length != 1 || e[0].terms.length != 1 || !e[0].terms[0].terminal) && this.b.raise(`The token expression to '@external ${this.ast.type}' must resolve to a token`, this.ast.token.start), this.term = e[0].terms[0];
    for (let t in this.tokens)
      this.b.tokenOrigins[this.tokens[t].name] = { spec: this.term, external: this };
  }
  getToken(e) {
    return eu(this.b, this.tokens, e);
  }
}
function cy(n, e) {
  for (let t = 0; ; t++) {
    let i = /* @__PURE__ */ Object.create(null), s;
    if (t == 0) {
      for (let o of n)
        if (o.name.inline && !i[o.name.name]) {
          let l = n.filter((a) => a.name == o.name);
          if (l.some((a) => a.parts.includes(o.name)))
            continue;
          s = i[o.name.name] = l;
        }
    }
    for (let o = 0; o < n.length; o++) {
      let l = n[o];
      !l.name.interesting && !l.parts.includes(l.name) && l.parts.length < 3 && !e.includes(l.name) && (l.parts.length == 1 || n.every((a) => a.skip == l.skip || !a.parts.includes(l.name))) && !l.parts.some((a) => !!i[a.name]) && !n.some((a, h) => h != o && a.name == l.name) && (s = i[l.name.name] = [l]);
    }
    if (!s)
      return n;
    let r = [];
    for (let o of n) {
      let l = function(a, h, c) {
        if (a == o.parts.length) {
          r.push(new Rl(o.name, c, h, o.skip));
          return;
        }
        let f = o.parts[a], u = i[f.name];
        if (!u) {
          l(a + 1, h.concat(o.conflicts[a + 1]), c.concat(f));
          return;
        }
        for (let d of u)
          l(a + 1, h.slice(0, h.length - 1).concat(h[a].join(d.conflicts[0])).concat(d.conflicts.slice(1, d.conflicts.length - 1)).concat(o.conflicts[a + 1].join(d.conflicts[d.conflicts.length - 1])), c.concat(d.parts));
      };
      if (!i[o.name.name]) {
        if (!o.parts.some((a) => !!i[a.name])) {
          r.push(o);
          continue;
        }
        l(0, [o.conflicts[0]], []);
      }
    }
    n = r;
  }
}
function fy(n) {
  let e = /* @__PURE__ */ Object.create(null), t;
  for (let s = 0; s < n.length; ) {
    let r = s, o = n[s++].name;
    for (; s < n.length && n[s].name == o; )
      s++;
    let l = s - r;
    if (!o.interesting)
      for (let a = s; a < n.length; ) {
        let h = a, c = n[a++].name;
        for (; a < n.length && n[a].name == c; )
          a++;
        if (a - h != l || c.interesting)
          continue;
        let f = !0;
        for (let u = 0; u < l && f; u++) {
          let d = n[r + u], p = n[h + u];
          d.cmpNoName(p) != 0 && (f = !1);
        }
        f && (t = e[o.name] = c);
      }
  }
  if (!t)
    return n;
  let i = [];
  for (let s of n)
    e[s.name.name] || i.push(s.parts.every((r) => !e[r.name]) ? s : new Rl(s.name, s.parts.map((r) => e[r.name] || r), s.conflicts, s.skip));
  return i;
}
function uy(n, e) {
  return fy(cy(n, e));
}
function dy(n, e = {}) {
  let t = new J0(n, e), i = t.getParser();
  return i.termTable = t.termTable, i;
}
const kh = [
  "arguments",
  "await",
  "break",
  "case",
  "catch",
  "continue",
  "debugger",
  "default",
  "do",
  "else",
  "eval",
  "finally",
  "for",
  "function",
  "if",
  "return",
  "switch",
  "throw",
  "try",
  "var",
  "while",
  "with",
  "null",
  "true",
  "false",
  "instanceof",
  "typeof",
  "void",
  "delete",
  "new",
  "in",
  "this",
  "const",
  "class",
  "extends",
  "export",
  "import",
  "super",
  "enum",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "require"
];
function py(n) {
  let e = n[0];
  return e == "_" || e.toUpperCase() != e;
}
function my(n) {
  return n.props.some((e) => e.at && e.name == "export");
}
const gy = dy(`
@top QueryList { Query }
@skip { "
" | Comment }

Query {
  anyCondition ((" " | "	")+  anyCondition)*
}

anyCondition { Condition | ExcludeCondition | IgnoredCondition }
Condition { Field ":" Predicate }
ExcludeCondition { "-" Field ":" Predicate }
IgnoredCondition { "!" Field ":" Predicate }

Predicate { Regex | Value | Command  }
Command { Identifier "(" Argument ("," Argument)* ")" }
Argument { Identifier | Number | String }
Value { Identifier | Number | String }

@tokens {
  ":"
  Field { Identifier }
  Function { Identifier }
  Identifier { $[a-zA-Z_]+ ("." $[a-zA-Z_]+)* }
  Number { std.digit+ }
  String { '"' !["]* '"' }
  Regex { RegexContent (RegexFlag)* }
  RegexFlag { std.asciiLetter+ }
  RegexContent { "/" (![/] | "\\/")*  "/" }
  Comment { "#" (![
])* }
}
`), Re = {
  Condition: de.define(P.keyword),
  Field: de.define(P.propertyName),
  Command: P.function(P.variableName),
  Predicate: de.define(P.variableName),
  Value: de.define(P.attributeValue),
  Operator: de.define(P.operator),
  Regex: de.define(P.regexp),
  RegexContent: de.define(P.regexp)
}, Hs = [
  "IgnoredCondition",
  "ExcludeCondition",
  "Condition"
], yy = (n) => Hs.includes(n), Mn = (n, e) => {
  for (; e.parent; ) {
    if (e.parent.name === n)
      return e.parent;
    e = e.parent;
  }
  return null;
}, by = (n, e) => !!Mn(n, e), ky = (n) => n.trim() === "";
Me.define({
  create: () => null,
  update: (n, { state: e }) => {
    const { anchor: t } = e.selection.main;
    return re(e).resolve(t, -1).node;
  }
});
const tu = (n, e = []) => n ? tu(n.next, [...e, n.node.name]) : e, ci = (n) => {
  if (Hs.includes(n.name)) return n;
  for (const e of Hs) {
    const t = Mn(e, n);
    if (t) return t;
  }
  return null;
};
function iu(n, e) {
  const t = n.name === "ExcludeCondition" ? "-" : n.name === "IgnoredCondition" ? "!" : "", i = n.getChild("Field"), s = n.getChild("Predicate");
  return {
    prefix: t,
    field: i ? e.sliceString(i.from, i.to) : "",
    predicate: s ? e.sliceString(s.from, s.to) : "",
    node: n
  };
}
function xy(n) {
  return `${n.prefix}${n.field}:${n.predicate}`;
}
function wy(n, e) {
  const t = n.getChildren("Argument");
  if (t.length === 0) return null;
  const i = t[0], s = t[t.length - 1];
  return e.sliceString(i.from, s.to);
}
const Sy = (n) => {
  if (!n) return null;
  if (n.name === "Field")
    return n;
  if (n.name === "Identifier" && by("Value", n) || n.name === ":")
    return ci(n)?.getChild("Field") ?? null;
  const e = ci(n);
  return e ? e.getChild("Field") : null;
}, nu = (n, e, t) => {
  const i = Sy(t);
  if (i) return i;
  if (t && (t.name === "Query" || t.name === "QueryList"))
    for (let s = e - 1; s >= 0; s--) {
      const r = n.resolveInner(s, -1);
      if (r.name === ":") {
        const o = ci(r);
        if (o)
          return o.getChild("Field");
      }
      if (Hs.includes(r.name))
        return r.getChild("Field");
      if (!(r.name === "Query" || r.name === "QueryList") && r.name !== "Query" && r.name !== "QueryList")
        break;
    }
  return null;
}, Ml = Me.define({
  create: () => null,
  update: (n, { state: e }) => {
    const { anchor: t } = e.selection.main, i = re(e);
    return {
      node: i.resolve(t, -1),
      path: tu(i.resolveStack(t, -1))
    };
  }
});
class su {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, i, s) {
    this.state = e, this.pos = t, this.explicit = i, this.view = s, this.abortListeners = [], this.abortOnDocChange = !1;
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(e) {
    let t = re(this.state).resolveInner(this.pos, -1);
    for (; t && e.indexOf(t.name) < 0; )
      t = t.parent;
    return t ? {
      from: t.from,
      to: this.pos,
      text: this.state.sliceDoc(t.from, this.pos),
      type: t.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(e) {
    let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), s = t.text.slice(i - t.from, this.pos - t.from), r = s.search(ru(e, !1));
    return r < 0 ? null : { from: i + r, to: this.pos, text: s.slice(r) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  
  By default, running queries will not be aborted for regular
  typing or backspacing, on the assumption that they are likely to
  return a result with a
  [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
  allows the result to be used after all. Passing `onDocChange:
  true` will cause this query to be aborted for any document
  change.
  */
  addEventListener(e, t, i) {
    e == "abort" && this.abortListeners && (this.abortListeners.push(t), i && i.onDocChange && (this.abortOnDocChange = !0));
  }
}
function xh(n) {
  let e = Object.keys(n).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function vy(n) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: s } of n) {
    e[s[0]] = !0;
    for (let r = 1; r < s.length; r++)
      t[s[r]] = !0;
  }
  let i = xh(e) + xh(t) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function Cy(n) {
  let e = n.map((s) => typeof s == "string" ? { label: s } : s), [t, i] = e.every((s) => /^\w+$/.test(s.label)) ? [/\w*$/, /\w+$/] : vy(e);
  return (s) => {
    let r = s.matchBefore(i);
    return r || s.explicit ? { from: r ? r.from : s.pos, options: e, validFor: t } : null;
  };
}
class wh {
  constructor(e, t, i, s) {
    this.completion = e, this.source = t, this.match = i, this.score = s;
  }
}
function fi(n) {
  return n.selection.main.from;
}
function ru(n, e) {
  var t;
  let { source: i } = n, s = e && i[0] != "^", r = i[i.length - 1] != "$";
  return !s && !r ? n : new RegExp(`${s ? "^" : ""}(?:${i})${r ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "");
}
const ou = /* @__PURE__ */ Dt.define();
function Ay(n, e, t, i) {
  let { main: s } = n.selection, r = t - s.from, o = i - s.from;
  return {
    ...n.changeByRange((l) => {
      if (l != s && t != i && n.sliceDoc(l.from + r, l.from + o) != n.sliceDoc(t, i))
        return { range: l };
      let a = n.toText(e);
      return {
        changes: { from: l.from + r, to: i == s.from ? l.to : l.from + o, insert: a },
        range: S.cursor(l.from + r + a.length)
      };
    }),
    scrollIntoView: !0,
    userEvent: "input.complete"
  };
}
const Sh = /* @__PURE__ */ new WeakMap();
function Ty(n) {
  if (!Array.isArray(n))
    return n;
  let e = Sh.get(n);
  return e || Sh.set(n, e = Cy(n)), e;
}
const Ws = /* @__PURE__ */ J.define(), vn = /* @__PURE__ */ J.define();
class Oy {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let i = Ke(e, t), s = At(i);
      this.chars.push(i);
      let r = e.slice(t, t + s), o = r.toUpperCase();
      this.folded.push(Ke(o == r ? r.toLowerCase() : o, 0)), t += s;
    }
    this.astral = e.length != this.chars.length;
  }
  ret(e, t) {
    return this.score = e, this.matched = t, this;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(e) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (e.length < this.pattern.length)
      return null;
    let { chars: t, folded: i, any: s, precise: r, byWord: o } = this;
    if (t.length == 1) {
      let b = Ke(e, 0), x = At(b), v = x == e.length ? 0 : -100;
      if (b != t[0]) if (b == i[0])
        v += -200;
      else
        return null;
      return this.ret(v, [0, x]);
    }
    let l = e.indexOf(this.pattern);
    if (l == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = t.length, h = 0;
    if (l < 0) {
      for (let b = 0, x = Math.min(e.length, 200); b < x && h < a; ) {
        let v = Ke(e, b);
        (v == t[h] || v == i[h]) && (s[h++] = b), b += At(v);
      }
      if (h < a)
        return null;
    }
    let c = 0, f = 0, u = !1, d = 0, p = -1, m = -1, g = /[a-z]/.test(e), y = !0;
    for (let b = 0, x = Math.min(e.length, 200), v = 0; b < x && f < a; ) {
      let C = Ke(e, b);
      l < 0 && (c < a && C == t[c] && (r[c++] = b), d < a && (C == t[d] || C == i[d] ? (d == 0 && (p = b), m = b + 1, d++) : d = 0));
      let T, A = C < 255 ? C >= 48 && C <= 57 || C >= 97 && C <= 122 ? 2 : C >= 65 && C <= 90 ? 1 : 0 : (T = kc(C)) != T.toLowerCase() ? 1 : T != T.toUpperCase() ? 2 : 0;
      (!b || A == 1 && g || v == 0 && A != 0) && (t[f] == C || i[f] == C && (u = !0) ? o[f++] = b : o.length && (y = !1)), v = A, b += At(C);
    }
    return f == a && o[0] == 0 && y ? this.result(-100 + (u ? -200 : 0), o, e) : d == a && p == 0 ? this.ret(-200 - e.length + (m == e.length ? 0 : -100), [0, m]) : l > -1 ? this.ret(-700 - e.length, [l, l + this.pattern.length]) : d == a ? this.ret(-900 - e.length, [p, m]) : f == a ? this.result(-100 + (u ? -200 : 0) + -700 + (y ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((s[0] ? -700 : 0) + -200 + -1100, s, e);
  }
  result(e, t, i) {
    let s = [], r = 0;
    for (let o of t) {
      let l = o + (this.astral ? At(Ke(i, o)) : 1);
      r && s[r - 1] == o ? s[r - 1] = l : (s[r++] = o, s[r++] = l);
    }
    return this.ret(e - i.length, s);
  }
}
class _y {
  constructor(e) {
    this.pattern = e, this.matched = [], this.score = 0, this.folded = e.toLowerCase();
  }
  match(e) {
    if (e.length < this.pattern.length)
      return null;
    let t = e.slice(0, this.pattern.length), i = t == this.pattern ? 0 : t.toLowerCase() == this.folded ? -200 : null;
    return i == null ? null : (this.matched = [0, t.length], this.score = i + (e.length == this.pattern.length ? 0 : -100), this);
  }
}
const ge = /* @__PURE__ */ E.define({
  combine(n) {
    return Dc(n, {
      activateOnTyping: !0,
      activateOnCompletion: () => !1,
      activateOnTypingDelay: 100,
      selectOnOpen: !0,
      override: null,
      closeOnBlur: !0,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: [],
      positionInfo: Ry,
      filterStrict: !1,
      compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (i) => vh(e(i), t(i)),
      optionClass: (e, t) => (i) => vh(e(i), t(i)),
      addToOptions: (e, t) => e.concat(t),
      filterStrict: (e, t) => e || t
    });
  }
});
function vh(n, e) {
  return n ? e ? n + " " + e : n : e;
}
function Ry(n, e, t, i, s, r) {
  let o = n.textDirection == se.RTL, l = o, a = !1, h = "top", c, f, u = e.left - s.left, d = s.right - e.right, p = i.right - i.left, m = i.bottom - i.top;
  if (l && u < Math.min(p, d) ? l = !1 : !l && d < Math.min(p, u) && (l = !0), p <= (l ? u : d))
    c = Math.max(s.top, Math.min(t.top, s.bottom - m)) - e.top, f = Math.min(400, l ? u : d);
  else {
    a = !0, f = Math.min(
      400,
      (o ? e.right : s.right - e.left) - 30
      /* Info.Margin */
    );
    let b = s.bottom - e.bottom;
    b >= m || b > e.top ? c = t.bottom - e.top : (h = "bottom", c = e.bottom - t.top);
  }
  let g = (e.bottom - e.top) / r.offsetHeight, y = (e.right - e.left) / r.offsetWidth;
  return {
    style: `${h}: ${c / g}px; max-width: ${f / y}px`,
    class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : l ? "left" : "right")
  };
}
function Ey(n) {
  let e = n.addToOptions.slice();
  return n.icons && e.push({
    render(t) {
      let i = document.createElement("div");
      return i.classList.add("cm-completionIcon"), t.type && i.classList.add(...t.type.split(/\s+/g).map((s) => "cm-completionIcon-" + s)), i.setAttribute("aria-hidden", "true"), i;
    },
    position: 20
  }), e.push({
    render(t, i, s, r) {
      let o = document.createElement("span");
      o.className = "cm-completionLabel";
      let l = t.displayLabel || t.label, a = 0;
      for (let h = 0; h < r.length; ) {
        let c = r[h++], f = r[h++];
        c > a && o.appendChild(document.createTextNode(l.slice(a, c)));
        let u = o.appendChild(document.createElement("span"));
        u.appendChild(document.createTextNode(l.slice(c, f))), u.className = "cm-completionMatchedText", a = f;
      }
      return a < l.length && o.appendChild(document.createTextNode(l.slice(a))), o;
    },
    position: 50
  }, {
    render(t) {
      if (!t.detail)
        return null;
      let i = document.createElement("span");
      return i.className = "cm-completionDetail", i.textContent = t.detail, i;
    },
    position: 80
  }), e.sort((t, i) => t.position - i.position).map((t) => t.render);
}
function jr(n, e, t) {
  if (n <= t)
    return { from: 0, to: n };
  if (e < 0 && (e = 0), e <= n >> 1) {
    let s = Math.floor(e / t);
    return { from: s * t, to: (s + 1) * t };
  }
  let i = Math.floor((n - e) / t);
  return { from: n - (i + 1) * t, to: n - i * t };
}
class Dy {
  constructor(e, t, i) {
    this.view = e, this.stateField = t, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let s = e.state.field(t), { options: r, selected: o } = s.open, l = e.state.facet(ge);
    this.optionContent = Ey(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = jr(r.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
      let { options: h } = e.state.field(t).open;
      for (let c = a.target, f; c && c != this.dom; c = c.parentNode)
        if (c.nodeName == "LI" && (f = /-(\d+)$/.exec(c.id)) && +f[1] < h.length) {
          this.applyCompletion(e, h[+f[1]]), a.preventDefault();
          return;
        }
    }), this.dom.addEventListener("focusout", (a) => {
      let h = e.state.field(this.stateField, !1);
      h && h.tooltip && e.state.facet(ge).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({ effects: vn.of(null) });
    }), this.showOptions(r, s.id);
  }
  mount() {
    this.updateSel();
  }
  showOptions(e, t) {
    this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(e, t, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    });
  }
  update(e) {
    var t;
    let i = e.state.field(this.stateField), s = e.startState.field(this.stateField);
    if (this.updateTooltipClass(e.state), i != s) {
      let { options: r, selected: o, disabled: l } = i.open;
      (!s.open || s.open.options != r) && (this.range = jr(r.length, o, e.state.facet(ge).maxRenderedOptions), this.showOptions(r, i.id)), this.updateSel(), l != ((t = s.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!l);
    }
  }
  updateTooltipClass(e) {
    let t = this.tooltipClass(e);
    if (t != this.currentClass) {
      for (let i of this.currentClass.split(" "))
        i && this.dom.classList.remove(i);
      for (let i of t.split(" "))
        i && this.dom.classList.add(i);
      this.currentClass = t;
    }
  }
  positioned(e) {
    this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let e = this.view.state.field(this.stateField), t = e.open;
    (t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = jr(t.options.length, t.selected, this.view.state.facet(ge).maxRenderedOptions), this.showOptions(t.options, e.id));
    let i = this.updateSelectedOption(t.selected);
    if (i) {
      this.destroyInfo();
      let { completion: s } = t.options[t.selected], { info: r } = s;
      if (!r)
        return;
      let o = typeof r == "string" ? document.createTextNode(r) : r(s);
      if (!o)
        return;
      "then" in o ? o.then((l) => {
        l && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(l, s);
      }).catch((l) => je(this.view.state, l, "completion info")) : (this.addInfoPane(o, s), i.setAttribute("aria-describedby", this.info.id));
    }
  }
  addInfoPane(e, t) {
    this.destroyInfo();
    let i = this.info = document.createElement("div");
    if (i.className = "cm-tooltip cm-completionInfo", i.id = "cm-completionInfo-" + Math.floor(Math.random() * 65535).toString(16), e.nodeType != null)
      i.appendChild(e), this.infoDestroy = null;
    else {
      let { dom: s, destroy: r } = e;
      i.appendChild(s), this.infoDestroy = r || null;
    }
    this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(e) {
    let t = null;
    for (let i = this.list.firstChild, s = this.range.from; i; i = i.nextSibling, s++)
      i.nodeName != "LI" || !i.id ? s-- : s == e ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), t = i) : i.hasAttribute("aria-selected") && (i.removeAttribute("aria-selected"), i.removeAttribute("aria-describedby"));
    return t && Py(this.list, t), t;
  }
  measureInfo() {
    let e = this.dom.querySelector("[aria-selected]");
    if (!e || !this.info)
      return null;
    let t = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), s = e.getBoundingClientRect(), r = this.space;
    if (!r) {
      let o = this.dom.ownerDocument.documentElement;
      r = { left: 0, top: 0, right: o.clientWidth, bottom: o.clientHeight };
    }
    return s.top > Math.min(r.bottom, t.bottom) - 10 || s.bottom < Math.max(r.top, t.top) + 10 ? null : this.view.state.facet(ge).positionInfo(this.view, t, s, i, r, this.dom);
  }
  placeInfo(e) {
    this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(e, t, i) {
    const s = document.createElement("ul");
    s.id = t, s.setAttribute("role", "listbox"), s.setAttribute("aria-expanded", "true"), s.setAttribute("aria-label", this.view.state.phrase("Completions")), s.addEventListener("mousedown", (o) => {
      o.target == s && o.preventDefault();
    });
    let r = null;
    for (let o = i.from; o < i.to; o++) {
      let { completion: l, match: a } = e[o], { section: h } = l;
      if (h) {
        let u = typeof h == "string" ? h : h.name;
        if (u != r && (o > i.from || i.from == 0))
          if (r = u, typeof h != "string" && h.header)
            s.appendChild(h.header(h));
          else {
            let d = s.appendChild(document.createElement("completion-section"));
            d.textContent = u;
          }
      }
      const c = s.appendChild(document.createElement("li"));
      c.id = t + "-" + o, c.setAttribute("role", "option");
      let f = this.optionClass(l);
      f && (c.className = f);
      for (let u of this.optionContent) {
        let d = u(l, this.view.state, this.view, a);
        d && c.appendChild(d);
      }
    }
    return i.from && s.classList.add("cm-completionListIncompleteTop"), i.to < e.length && s.classList.add("cm-completionListIncompleteBottom"), s;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function My(n, e) {
  return (t) => new Dy(t, n, e);
}
function Py(n, e) {
  let t = n.getBoundingClientRect(), i = e.getBoundingClientRect(), s = t.height / n.offsetHeight;
  i.top < t.top ? n.scrollTop -= (t.top - i.top) / s : i.bottom > t.bottom && (n.scrollTop += (i.bottom - t.bottom) / s);
}
function Ch(n) {
  return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0);
}
function By(n, e) {
  let t = [], i = null, s = null, r = (c) => {
    t.push(c);
    let { section: f } = c.completion;
    if (f) {
      i || (i = []);
      let u = typeof f == "string" ? f : f.name;
      i.some((d) => d.name == u) || i.push(typeof f == "string" ? { name: u } : f);
    }
  }, o = e.facet(ge);
  for (let c of n)
    if (c.hasResult()) {
      let f = c.result.getMatch;
      if (c.result.filter === !1)
        for (let u of c.result.options)
          r(new wh(u, c.source, f ? f(u) : [], 1e9 - t.length));
      else {
        let u = e.sliceDoc(c.from, c.to), d, p = o.filterStrict ? new _y(u) : new Oy(u);
        for (let m of c.result.options)
          if (d = p.match(m.label)) {
            let g = m.displayLabel ? f ? f(m, d.matched) : [] : d.matched, y = d.score + (m.boost || 0);
            if (r(new wh(m, c.source, g, y)), typeof m.section == "object" && m.section.rank === "dynamic") {
              let { name: b } = m.section;
              s || (s = /* @__PURE__ */ Object.create(null)), s[b] = Math.max(y, s[b] || -1e9);
            }
          }
      }
    }
  if (i) {
    let c = /* @__PURE__ */ Object.create(null), f = 0, u = (d, p) => (d.rank === "dynamic" && p.rank === "dynamic" ? s[p.name] - s[d.name] : 0) || (typeof d.rank == "number" ? d.rank : 1e9) - (typeof p.rank == "number" ? p.rank : 1e9) || (d.name < p.name ? -1 : 1);
    for (let d of i.sort(u))
      f -= 1e5, c[d.name] = f;
    for (let d of t) {
      let { section: p } = d.completion;
      p && (d.score += c[typeof p == "string" ? p : p.name]);
    }
  }
  let l = [], a = null, h = o.compareCompletions;
  for (let c of t.sort((f, u) => u.score - f.score || h(f.completion, u.completion))) {
    let f = c.completion;
    !a || a.label != f.label || a.detail != f.detail || a.type != null && f.type != null && a.type != f.type || a.apply != f.apply || a.boost != f.boost ? l.push(c) : Ch(c.completion) > Ch(a) && (l[l.length - 1] = c), a = c.completion;
  }
  return l;
}
class wi {
  constructor(e, t, i, s, r, o) {
    this.options = e, this.attrs = t, this.tooltip = i, this.timestamp = s, this.selected = r, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new wi(this.options, Ah(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, i, s, r, o) {
    if (s && !o && e.some((h) => h.isPending))
      return s.setDisabled();
    let l = By(e, t);
    if (!l.length)
      return s && e.some((h) => h.isPending) ? s.setDisabled() : null;
    let a = t.facet(ge).selectOnOpen ? 0 : -1;
    if (s && s.selected != a && s.selected != -1) {
      let h = s.options[s.selected].completion;
      for (let c = 0; c < l.length; c++)
        if (l[c].completion == h) {
          a = c;
          break;
        }
    }
    return new wi(l, Ah(i, a), {
      pos: e.reduce((h, c) => c.hasResult() ? Math.min(h, c.from) : h, 1e8),
      create: zy,
      above: r.aboveCursor
    }, s ? s.timestamp : Date.now(), a, !1);
  }
  map(e) {
    return new wi(this.options, this.attrs, { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) }, this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new wi(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class Vs {
  constructor(e, t, i) {
    this.active = e, this.id = t, this.open = i;
  }
  static start() {
    return new Vs($y, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, i = t.facet(ge), r = (i.override || t.languageDataAt("autocomplete", fi(t)).map(Ty)).map((a) => (this.active.find((c) => c.source == a) || new Ye(
      a,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(e, i));
    r.length == this.active.length && r.every((a, h) => a == this.active[h]) && (r = this.active);
    let o = this.open, l = e.effects.some((a) => a.is(Pl));
    o && e.docChanged && (o = o.map(e.changes)), e.selection || r.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !Ny(r, this.active) || l ? o = wi.build(r, t, this.id, o, i, l) : o && o.disabled && !r.some((a) => a.isPending) && (o = null), !o && r.every((a) => !a.isPending) && r.some((a) => a.hasResult()) && (r = r.map((a) => a.hasResult() ? new Ye(
      a.source,
      0
      /* State.Inactive */
    ) : a));
    for (let a of e.effects)
      a.is(au) && (o = o && o.setSelected(a.value, this.id));
    return r == this.active && o == this.open ? this : new Vs(r, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? Iy : Ly;
  }
}
function Ny(n, e) {
  if (n == e)
    return !0;
  for (let t = 0, i = 0; ; ) {
    for (; t < n.length && !n[t].hasResult(); )
      t++;
    for (; i < e.length && !e[i].hasResult(); )
      i++;
    let s = t == n.length, r = i == e.length;
    if (s || r)
      return s == r;
    if (n[t++].result != e[i++].result)
      return !1;
  }
}
const Iy = {
  "aria-autocomplete": "list"
}, Ly = {};
function Ah(n, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": n
  };
  return e > -1 && (t["aria-activedescendant"] = n + "-" + e), t;
}
const $y = [];
function lu(n, e) {
  if (n.isUserEvent("input.complete")) {
    let i = n.annotation(ou);
    if (i && e.activateOnCompletion(i))
      return 12;
  }
  let t = n.isUserEvent("input.type");
  return t && e.activateOnTyping ? 5 : t ? 1 : n.isUserEvent("delete.backward") ? 2 : n.selection ? 8 : n.docChanged ? 16 : 0;
}
class Ye {
  constructor(e, t, i = !1) {
    this.source = e, this.state = t, this.explicit = i;
  }
  hasResult() {
    return !1;
  }
  get isPending() {
    return this.state == 1;
  }
  update(e, t) {
    let i = lu(e, t), s = this;
    (i & 8 || i & 16 && this.touches(e)) && (s = new Ye(
      s.source,
      0
      /* State.Inactive */
    )), i & 4 && s.state == 0 && (s = new Ye(
      this.source,
      1
      /* State.Pending */
    )), s = s.updateFor(e, i);
    for (let r of e.effects)
      if (r.is(Ws))
        s = new Ye(s.source, 1, r.value);
      else if (r.is(vn))
        s = new Ye(
          s.source,
          0
          /* State.Inactive */
        );
      else if (r.is(Pl))
        for (let o of r.value)
          o.source == s.source && (s = o);
    return s;
  }
  updateFor(e, t) {
    return this.map(e.changes);
  }
  map(e) {
    return this;
  }
  touches(e) {
    return e.changes.touchesRange(fi(e.state));
  }
}
class _i extends Ye {
  constructor(e, t, i, s, r, o) {
    super(e, 3, t), this.limit = i, this.result = s, this.from = r, this.to = o;
  }
  hasResult() {
    return !0;
  }
  updateFor(e, t) {
    var i;
    if (!(t & 3))
      return this.map(e.changes);
    let s = this.result;
    s.map && !e.changes.empty && (s = s.map(s, e.changes));
    let r = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), l = fi(e.state);
    if (l > o || !s || t & 2 && (fi(e.startState) == this.from || l < this.limit))
      return new Ye(
        this.source,
        t & 4 ? 1 : 0
        /* State.Inactive */
      );
    let a = e.changes.mapPos(this.limit);
    return Fy(s.validFor, e.state, r, o) ? new _i(this.source, this.explicit, a, s, r, o) : s.update && (s = s.update(s, r, o, new su(e.state, l, !1))) ? new _i(this.source, this.explicit, a, s, s.from, (i = s.to) !== null && i !== void 0 ? i : fi(e.state)) : new Ye(this.source, 1, this.explicit);
  }
  map(e) {
    return e.empty ? this : (this.result.map ? this.result.map(this.result, e) : this.result) ? new _i(this.source, this.explicit, e.mapPos(this.limit), this.result, e.mapPos(this.from), e.mapPos(this.to, 1)) : new Ye(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(e) {
    return e.changes.touchesRange(this.from, this.to);
  }
}
function Fy(n, e, t, i) {
  if (!n)
    return !1;
  let s = e.sliceDoc(t, i);
  return typeof n == "function" ? n(s, t, i, e) : ru(n, !0).test(s);
}
const Pl = /* @__PURE__ */ J.define({
  map(n, e) {
    return n.map((t) => t.map(e));
  }
}), au = /* @__PURE__ */ J.define(), Be = /* @__PURE__ */ Me.define({
  create() {
    return Vs.start();
  },
  update(n, e) {
    return n.update(e);
  },
  provide: (n) => [
    Tf.from(n, (e) => e.tooltip),
    N.contentAttributes.from(n, (e) => e.attrs)
  ]
});
function Bl(n, e) {
  const t = e.completion.apply || e.completion.label;
  let i = n.state.field(Be).active.find((s) => s.source == e.source);
  return i instanceof _i ? (typeof t == "string" ? n.dispatch({
    ...Ay(n.state, t, i.from, i.to),
    annotations: ou.of(e.completion)
  }) : t(n, e.completion, i.from, i.to), !0) : !1;
}
const zy = /* @__PURE__ */ My(Be, Bl);
function ts(n, e = "option") {
  return (t) => {
    let i = t.state.field(Be, !1);
    if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < t.state.facet(ge).interactionDelay)
      return !1;
    let s = 1, r;
    e == "page" && (r = Of(t, i.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = i.open.options, l = i.open.selected > -1 ? i.open.selected + s * (n ? 1 : -1) : n ? 0 : o - 1;
    return l < 0 ? l = e == "page" ? 0 : o - 1 : l >= o && (l = e == "page" ? o - 1 : 0), t.dispatch({ effects: au.of(l) }), !0;
  };
}
const Hy = (n) => {
  let e = n.state.field(Be, !1);
  return n.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < n.state.facet(ge).interactionDelay ? !1 : Bl(n, e.open.options[e.open.selected]);
}, qr = (n) => n.state.field(Be, !1) ? (n.dispatch({ effects: Ws.of(!0) }), !0) : !1, Wy = (n) => {
  let e = n.state.field(Be, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* State.Inactive */
  ) ? !1 : (n.dispatch({ effects: vn.of(null) }), !0);
};
class Vy {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const jy = 50, qy = 1e3, Uy = /* @__PURE__ */ it.fromClass(class {
  constructor(n) {
    this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let e of n.state.field(Be).active)
      e.isPending && this.startQuery(e);
  }
  update(n) {
    let e = n.state.field(Be), t = n.state.facet(ge);
    if (!n.selectionSet && !n.docChanged && n.startState.field(Be) == e)
      return;
    let i = n.transactions.some((r) => {
      let o = lu(r, t);
      return o & 8 || (r.selection || r.docChanged) && !(o & 3);
    });
    for (let r = 0; r < this.running.length; r++) {
      let o = this.running[r];
      if (i || o.context.abortOnDocChange && n.docChanged || o.updates.length + n.transactions.length > jy && Date.now() - o.time > qy) {
        for (let l of o.context.abortListeners)
          try {
            l();
          } catch (a) {
            je(this.view.state, a);
          }
        o.context.abortListeners = null, this.running.splice(r--, 1);
      } else
        o.updates.push(...n.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), n.transactions.some((r) => r.effects.some((o) => o.is(Ws))) && (this.pendingStart = !0);
    let s = this.pendingStart ? 50 : t.activateOnTypingDelay;
    if (this.debounceUpdate = e.active.some((r) => r.isPending && !this.running.some((o) => o.active.source == r.source)) ? setTimeout(() => this.startUpdate(), s) : -1, this.composing != 0)
      for (let r of n.transactions)
        r.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && r.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: n } = this.view, e = n.field(Be);
    for (let t of e.active)
      t.isPending && !this.running.some((i) => i.active.source == t.source) && this.startQuery(t);
    this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(ge).updateSyncTime));
  }
  startQuery(n) {
    let { state: e } = this.view, t = fi(e), i = new su(e, t, n.explicit, this.view), s = new Vy(n, i);
    this.running.push(s), Promise.resolve(n.source(i)).then((r) => {
      s.context.aborted || (s.done = r || null, this.scheduleAccept());
    }, (r) => {
      this.view.dispatch({ effects: vn.of(null) }), je(this.view.state, r);
    });
  }
  scheduleAccept() {
    this.running.every((n) => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(ge).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var n;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(ge), i = this.view.state.field(Be);
    for (let s = 0; s < this.running.length; s++) {
      let r = this.running[s];
      if (r.done === void 0)
        continue;
      if (this.running.splice(s--, 1), r.done) {
        let l = fi(r.updates.length ? r.updates[0].startState : this.view.state), a = Math.min(l, r.done.from + (r.active.explicit ? 0 : 1)), h = new _i(r.active.source, r.active.explicit, a, r.done, r.done.from, (n = r.done.to) !== null && n !== void 0 ? n : l);
        for (let c of r.updates)
          h = h.update(c, t);
        if (h.hasResult()) {
          e.push(h);
          continue;
        }
      }
      let o = i.active.find((l) => l.source == r.active.source);
      if (o && o.isPending)
        if (r.done == null) {
          let l = new Ye(
            r.active.source,
            0
            /* State.Inactive */
          );
          for (let a of r.updates)
            l = l.update(a, t);
          l.isPending || e.push(l);
        } else
          this.startQuery(o);
    }
    (e.length || i.open && i.open.disabled) && this.view.dispatch({ effects: Pl.of(e) });
  }
}, {
  eventHandlers: {
    blur(n) {
      let e = this.view.state.field(Be, !1);
      if (e && e.tooltip && this.view.state.facet(ge).closeOnBlur) {
        let t = e.open && Of(this.view, e.open.tooltip);
        (!t || !t.dom.contains(n.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: vn.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: Ws.of(!1) }), 20), this.composing = 0;
    }
  }
}), Ky = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), Gy = /* @__PURE__ */ Tn.highest(/* @__PURE__ */ N.domEventHandlers({
  keydown(n, e) {
    let t = e.state.field(Be, !1);
    if (!t || !t.open || t.open.disabled || t.open.selected < 0 || n.key.length > 1 || n.ctrlKey && !(Ky && n.altKey) || n.metaKey)
      return !1;
    let i = t.open.options[t.open.selected], s = t.active.find((o) => o.source == i.source), r = i.completion.commitCharacters || s.result.commitCharacters;
    return r && r.indexOf(n.key) > -1 && Bl(e, i), !1;
  }
})), Jy = /* @__PURE__ */ N.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
}), Cn = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
}, ri = /* @__PURE__ */ J.define({
  map(n, e) {
    let t = e.mapPos(n, -1, Ne.TrackAfter);
    return t ?? void 0;
  }
}), Nl = /* @__PURE__ */ new class extends zt {
}();
Nl.startSide = 1;
Nl.endSide = -1;
const hu = /* @__PURE__ */ Me.define({
  create() {
    return U.empty;
  },
  update(n, e) {
    if (n = n.map(e.changes), e.selection) {
      let t = e.state.doc.lineAt(e.selection.main.head);
      n = n.update({ filter: (i) => i >= t.from && i <= t.to });
    }
    for (let t of e.effects)
      t.is(ri) && (n = n.update({ add: [Nl.range(t.value, t.value + 1)] }));
    return n;
  }
});
function Xy() {
  return [Qy, hu];
}
const Ur = "()[]{}<>«»»«［］｛｝";
function cu(n) {
  for (let e = 0; e < Ur.length; e += 2)
    if (Ur.charCodeAt(e) == n)
      return Ur.charAt(e + 1);
  return kc(n < 128 ? n : n + 1);
}
function fu(n, e) {
  return n.languageDataAt("closeBrackets", e)[0] || Cn;
}
const Yy = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), Qy = /* @__PURE__ */ N.inputHandler.of((n, e, t, i) => {
  if ((Yy ? n.composing : n.compositionStarted) || n.state.readOnly)
    return !1;
  let s = n.state.selection.main;
  if (i.length > 2 || i.length == 2 && At(Ke(i, 0)) == 1 || e != s.from || t != s.to)
    return !1;
  let r = tb(n.state, i);
  return r ? (n.dispatch(r), !0) : !1;
}), Zy = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let i = fu(n, n.selection.main.head).brackets || Cn.brackets, s = null, r = n.changeByRange((o) => {
    if (o.empty) {
      let l = ib(n.doc, o.head);
      for (let a of i)
        if (a == l && rr(n.doc, o.head) == cu(Ke(a, 0)))
          return {
            changes: { from: o.head - a.length, to: o.head + a.length },
            range: S.cursor(o.head - a.length)
          };
    }
    return { range: s = o };
  });
  return s || e(n.update(r, { scrollIntoView: !0, userEvent: "delete.backward" })), !s;
}, eb = [
  { key: "Backspace", run: Zy }
];
function tb(n, e) {
  let t = fu(n, n.selection.main.head), i = t.brackets || Cn.brackets;
  for (let s of i) {
    let r = cu(Ke(s, 0));
    if (e == s)
      return r == s ? rb(n, s, i.indexOf(s + s + s) > -1, t) : nb(n, s, r, t.before || Cn.before);
    if (e == r && uu(n, n.selection.main.from))
      return sb(n, s, r);
  }
  return null;
}
function uu(n, e) {
  let t = !1;
  return n.field(hu).between(0, n.doc.length, (i) => {
    i == e && (t = !0);
  }), t;
}
function rr(n, e) {
  let t = n.sliceString(e, e + 2);
  return t.slice(0, At(Ke(t, 0)));
}
function ib(n, e) {
  let t = n.sliceString(e - 2, e);
  return At(Ke(t, 0)) == t.length ? t : t.slice(1);
}
function nb(n, e, t, i) {
  let s = null, r = n.changeByRange((o) => {
    if (!o.empty)
      return {
        changes: [{ insert: e, from: o.from }, { insert: t, from: o.to }],
        effects: ri.of(o.to + e.length),
        range: S.range(o.anchor + e.length, o.head + e.length)
      };
    let l = rr(n.doc, o.head);
    return !l || /\s/.test(l) || i.indexOf(l) > -1 ? {
      changes: { insert: e + t, from: o.head },
      effects: ri.of(o.head + e.length),
      range: S.cursor(o.head + e.length)
    } : { range: s = o };
  });
  return s ? null : n.update(r, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function sb(n, e, t) {
  let i = null, s = n.changeByRange((r) => r.empty && rr(n.doc, r.head) == t ? {
    changes: { from: r.head, to: r.head + t.length, insert: t },
    range: S.cursor(r.head + t.length)
  } : i = { range: r });
  return i ? null : n.update(s, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function rb(n, e, t, i) {
  let s = i.stringPrefixes || Cn.stringPrefixes, r = null, o = n.changeByRange((l) => {
    if (!l.empty)
      return {
        changes: [{ insert: e, from: l.from }, { insert: e, from: l.to }],
        effects: ri.of(l.to + e.length),
        range: S.range(l.anchor + e.length, l.head + e.length)
      };
    let a = l.head, h = rr(n.doc, a), c;
    if (h == e) {
      if (Th(n, a))
        return {
          changes: { insert: e + e, from: a },
          effects: ri.of(a + e.length),
          range: S.cursor(a + e.length)
        };
      if (uu(n, a)) {
        let u = t && n.sliceDoc(a, a + e.length * 3) == e + e + e ? e + e + e : e;
        return {
          changes: { from: a, to: a + u.length, insert: u },
          range: S.cursor(a + u.length)
        };
      }
    } else {
      if (t && n.sliceDoc(a - 2 * e.length, a) == e + e && (c = Oh(n, a - 2 * e.length, s)) > -1 && Th(n, c))
        return {
          changes: { insert: e + e + e + e, from: a },
          effects: ri.of(a + e.length),
          range: S.cursor(a + e.length)
        };
      if (n.charCategorizer(a)(h) != Je.Word && Oh(n, a, s) > -1 && !ob(n, a, e, s))
        return {
          changes: { insert: e + e, from: a },
          effects: ri.of(a + e.length),
          range: S.cursor(a + e.length)
        };
    }
    return { range: r = l };
  });
  return r ? null : n.update(o, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function Th(n, e) {
  let t = re(n).resolveInner(e + 1);
  return t.parent && t.from == e;
}
function ob(n, e, t, i) {
  let s = re(n).resolveInner(e, -1), r = i.reduce((o, l) => Math.max(o, l.length), 0);
  for (let o = 0; o < 5; o++) {
    let l = n.sliceDoc(s.from, Math.min(s.to, s.from + t.length + r)), a = l.indexOf(t);
    if (!a || a > -1 && i.indexOf(l.slice(0, a)) > -1) {
      let c = s.firstChild;
      for (; c && c.from == s.from && c.to - c.from > t.length + a; ) {
        if (n.sliceDoc(c.to - t.length, c.to) == t)
          return !1;
        c = c.firstChild;
      }
      return !0;
    }
    let h = s.to == e && s.parent;
    if (!h)
      break;
    s = h;
  }
  return !1;
}
function Oh(n, e, t) {
  let i = n.charCategorizer(e);
  if (i(n.sliceDoc(e - 1, e)) != Je.Word)
    return e;
  for (let s of t) {
    let r = e - s.length;
    if (n.sliceDoc(r, e) == s && i(n.sliceDoc(r - 1, r)) != Je.Word)
      return r;
  }
  return -1;
}
function lb(n = {}) {
  return [
    Gy,
    Be,
    ge.of(n),
    Uy,
    ab,
    Jy
  ];
}
const du = [
  { key: "Ctrl-Space", run: qr },
  { mac: "Alt-`", run: qr },
  { mac: "Alt-i", run: qr },
  { key: "Escape", run: Wy },
  { key: "ArrowDown", run: /* @__PURE__ */ ts(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ ts(!1) },
  { key: "PageDown", run: /* @__PURE__ */ ts(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ ts(!1, "page") },
  { key: "Enter", run: Hy }
], ab = /* @__PURE__ */ Tn.highest(/* @__PURE__ */ tr.computeN([ge], (n) => n.facet(ge).defaultKeymap ? [du] : [])), hb = (n) => {
  let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = Ll(n.state, t.from);
  return i.line ? cb(n) : i.block ? ub(n) : !1;
};
function Il(n, e) {
  return ({ state: t, dispatch: i }) => {
    if (t.readOnly)
      return !1;
    let s = n(e, t);
    return s ? (i(t.update(s)), !0) : !1;
  };
}
const cb = /* @__PURE__ */ Il(
  mb,
  0
  /* CommentOption.Toggle */
), fb = /* @__PURE__ */ Il(
  pu,
  0
  /* CommentOption.Toggle */
), ub = /* @__PURE__ */ Il(
  (n, e) => pu(n, e, pb(e)),
  0
  /* CommentOption.Toggle */
);
function Ll(n, e) {
  let t = n.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const qi = 50;
function db(n, { open: e, close: t }, i, s) {
  let r = n.sliceDoc(i - qi, i), o = n.sliceDoc(s, s + qi), l = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, h = r.length - l;
  if (r.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: i - l, margin: l && 1 },
      close: { pos: s + a, margin: a && 1 }
    };
  let c, f;
  s - i <= 2 * qi ? c = f = n.sliceDoc(i, s) : (c = n.sliceDoc(i, i + qi), f = n.sliceDoc(s - qi, s));
  let u = /^\s*/.exec(c)[0].length, d = /\s*$/.exec(f)[0].length, p = f.length - d - t.length;
  return c.slice(u, u + e.length) == e && f.slice(p, p + t.length) == t ? {
    open: {
      pos: i + u + e.length,
      margin: /\s/.test(c.charAt(u + e.length)) ? 1 : 0
    },
    close: {
      pos: s - d - t.length,
      margin: /\s/.test(f.charAt(p - 1)) ? 1 : 0
    }
  } : null;
}
function pb(n) {
  let e = [];
  for (let t of n.selection.ranges) {
    let i = n.doc.lineAt(t.from), s = t.to <= i.to ? i : n.doc.lineAt(t.to);
    s.from > i.from && s.from == t.to && (s = t.to == i.to + 1 ? i : n.doc.lineAt(t.to - 1));
    let r = e.length - 1;
    r >= 0 && e[r].to > i.from ? e[r].to = s.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: s.to });
  }
  return e;
}
function pu(n, e, t = e.selection.ranges) {
  let i = t.map((r) => Ll(e, r.from).block);
  if (!i.every((r) => r))
    return null;
  let s = t.map((r, o) => db(e, i[o], r.from, r.to));
  if (n != 2 && !s.every((r) => r))
    return { changes: e.changes(t.map((r, o) => s[o] ? [] : [{ from: r.from, insert: i[o].open + " " }, { from: r.to, insert: " " + i[o].close }])) };
  if (n != 1 && s.some((r) => r)) {
    let r = [];
    for (let o = 0, l; o < s.length; o++)
      if (l = s[o]) {
        let a = i[o], { open: h, close: c } = l;
        r.push({ from: h.pos - a.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + a.close.length });
      }
    return { changes: r };
  }
  return null;
}
function mb(n, e, t = e.selection.ranges) {
  let i = [], s = -1;
  for (let { from: r, to: o } of t) {
    let l = i.length, a = 1e9, h = Ll(e, r).line;
    if (h) {
      for (let c = r; c <= o; ) {
        let f = e.doc.lineAt(c);
        if (f.from > s && (r == o || o > f.from)) {
          s = f.from;
          let u = /^\s*/.exec(f.text)[0].length, d = u == f.length, p = f.text.slice(u, u + h.length) == h ? u : -1;
          u < f.text.length && u < a && (a = u), i.push({ line: f, comment: p, token: h, indent: u, empty: d, single: !1 });
        }
        c = f.to + 1;
      }
      if (a < 1e9)
        for (let c = l; c < i.length; c++)
          i[c].indent < i[c].line.text.length && (i[c].indent = a);
      i.length == l + 1 && (i[l].single = !0);
    }
  }
  if (n != 2 && i.some((r) => r.comment < 0 && (!r.empty || r.single))) {
    let r = [];
    for (let { line: l, token: a, indent: h, empty: c, single: f } of i)
      (f || !c) && r.push({ from: l.from + h, insert: a + " " });
    let o = e.changes(r);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (n != 1 && i.some((r) => r.comment >= 0)) {
    let r = [];
    for (let { line: o, comment: l, token: a } of i)
      if (l >= 0) {
        let h = o.from + l, c = h + a.length;
        o.text[c - o.from] == " " && c++, r.push({ from: h, to: c });
      }
    return { changes: r };
  }
  return null;
}
const Vo = /* @__PURE__ */ Dt.define(), gb = /* @__PURE__ */ Dt.define(), yb = /* @__PURE__ */ E.define(), mu = /* @__PURE__ */ E.define({
  combine(n) {
    return Dc(n, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (i, s) => e(i, s) || t(i, s)
    });
  }
}), gu = /* @__PURE__ */ Me.define({
  create() {
    return wt.empty;
  },
  update(n, e) {
    let t = e.state.facet(mu), i = e.annotation(Vo);
    if (i) {
      let a = Le.fromTransaction(e, i.selection), h = i.side, c = h == 0 ? n.undone : n.done;
      return a ? c = js(c, c.length, t.minDepth, a) : c = ku(c, e.startState.selection), new wt(h == 0 ? i.rest : c, h == 0 ? c : i.rest);
    }
    let s = e.annotation(gb);
    if ((s == "full" || s == "before") && (n = n.isolate()), e.annotation(pe.addToHistory) === !1)
      return e.changes.empty ? n : n.addMapping(e.changes.desc);
    let r = Le.fromTransaction(e), o = e.annotation(pe.time), l = e.annotation(pe.userEvent);
    return r ? n = n.addChanges(r, o, l, t, e) : e.selection && (n = n.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (s == "full" || s == "after") && (n = n.isolate()), n;
  },
  toJSON(n) {
    return { done: n.done.map((e) => e.toJSON()), undone: n.undone.map((e) => e.toJSON()) };
  },
  fromJSON(n) {
    return new wt(n.done.map(Le.fromJSON), n.undone.map(Le.fromJSON));
  }
});
function bb(n = {}) {
  return [
    gu,
    mu.of(n),
    N.domEventHandlers({
      beforeinput(e, t) {
        let i = e.inputType == "historyUndo" ? yu : e.inputType == "historyRedo" ? jo : null;
        return i ? (e.preventDefault(), i(t)) : !1;
      }
    })
  ];
}
function or(n, e) {
  return function({ state: t, dispatch: i }) {
    if (!e && t.readOnly)
      return !1;
    let s = t.field(gu, !1);
    if (!s)
      return !1;
    let r = s.pop(n, t, e);
    return r ? (i(r), !0) : !1;
  };
}
const yu = /* @__PURE__ */ or(0, !1), jo = /* @__PURE__ */ or(1, !1), kb = /* @__PURE__ */ or(0, !0), xb = /* @__PURE__ */ or(1, !0);
class Le {
  constructor(e, t, i, s, r) {
    this.changes = e, this.effects = t, this.mapped = i, this.startSelection = s, this.selectionsAfter = r;
  }
  setSelAfter(e) {
    return new Le(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, i;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
    };
  }
  static fromJSON(e) {
    return new Le(e.changes && ue.fromJSON(e.changes), [], e.mapped && St.fromJSON(e.mapped), e.startSelection && S.fromJSON(e.startSelection), e.selectionsAfter.map(S.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let i = Qe;
    for (let s of e.startState.facet(yb)) {
      let r = s(e);
      r.length && (i = i.concat(r));
    }
    return !i.length && e.changes.empty ? null : new Le(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, Qe);
  }
  static selection(e) {
    return new Le(void 0, Qe, void 0, void 0, e);
  }
}
function js(n, e, t, i) {
  let s = e + 1 > t + 20 ? e - t - 1 : 0, r = n.slice(s, e);
  return r.push(i), r;
}
function wb(n, e) {
  let t = [], i = !1;
  return n.iterChangedRanges((s, r) => t.push(s, r)), e.iterChangedRanges((s, r, o, l) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], c = t[a++];
      l >= h && o <= c && (i = !0);
    }
  }), i;
}
function Sb(n, e) {
  return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
}
function bu(n, e) {
  return n.length ? e.length ? n.concat(e) : n : e;
}
const Qe = [], vb = 200;
function ku(n, e) {
  if (n.length) {
    let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - vb));
    return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), js(n, n.length - 1, 1e9, t.setSelAfter(i)));
  } else
    return [Le.selection([e])];
}
function Cb(n) {
  let e = n[n.length - 1], t = n.slice();
  return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function Kr(n, e) {
  if (!n.length)
    return n;
  let t = n.length, i = Qe;
  for (; t; ) {
    let s = Ab(n[t - 1], e, i);
    if (s.changes && !s.changes.empty || s.effects.length) {
      let r = n.slice(0, t);
      return r[t - 1] = s, r;
    } else
      e = s.mapped, t--, i = s.selectionsAfter;
  }
  return i.length ? [Le.selection(i)] : Qe;
}
function Ab(n, e, t) {
  let i = bu(n.selectionsAfter.length ? n.selectionsAfter.map((l) => l.map(e)) : Qe, t);
  if (!n.changes)
    return Le.selection(i);
  let s = n.changes.map(e), r = e.mapDesc(n.changes, !0), o = n.mapped ? n.mapped.composeDesc(r) : r;
  return new Le(s, J.mapEffects(n.effects, e), o, n.startSelection.map(r), i);
}
const Tb = /^(input\.type|delete)($|\.)/;
class wt {
  constructor(e, t, i = 0, s = void 0) {
    this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = s;
  }
  isolate() {
    return this.prevTime ? new wt(this.done, this.undone) : this;
  }
  addChanges(e, t, i, s, r) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && e.changes && (!i || Tb.test(i)) && (!l.selectionsAfter.length && t - this.prevTime < s.newGroupDelay && s.joinToEvent(r, wb(l.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? o = js(o, o.length - 1, s.minDepth, new Le(e.changes.compose(l.changes), bu(J.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, Qe)) : o = js(o, o.length, s.minDepth, e), new wt(o, Qe, t, i);
  }
  addSelection(e, t, i, s) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Qe;
    return r.length > 0 && t - this.prevTime < s && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && Sb(r[r.length - 1], e) ? this : new wt(ku(this.done, e), this.undone, t, i);
  }
  addMapping(e) {
    return new wt(Kr(this.done, e), Kr(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, i) {
    let s = e == 0 ? this.done : this.undone;
    if (s.length == 0)
      return null;
    let r = s[s.length - 1], o = r.selectionsAfter[0] || t.selection;
    if (i && r.selectionsAfter.length)
      return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: Vo.of({ side: e, rest: Cb(s), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let l = s.length == 1 ? Qe : s.slice(0, s.length - 1);
      return r.mapped && (l = Kr(l, r.mapped)), t.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: Vo.of({ side: e, rest: l, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
wt.empty = /* @__PURE__ */ new wt(Qe, Qe);
const Ob = [
  { key: "Mod-z", run: yu, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: jo, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: jo, preventDefault: !0 },
  { key: "Mod-u", run: kb, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: xb, preventDefault: !0 }
];
function Fi(n, e) {
  return S.create(n.ranges.map(e), n.mainIndex);
}
function ft(n, e) {
  return n.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function ut({ state: n, dispatch: e }, t) {
  let i = Fi(n.selection, t);
  return i.eq(n.selection, !0) ? !1 : (e(ft(n, i)), !0);
}
function lr(n, e) {
  return S.cursor(e ? n.to : n.from);
}
function xu(n, e) {
  return ut(n, (t) => t.empty ? n.moveByChar(t, e) : lr(t, e));
}
function _e(n) {
  return n.textDirectionAt(n.state.selection.main.head) == se.LTR;
}
const wu = (n) => xu(n, !_e(n)), Su = (n) => xu(n, _e(n));
function vu(n, e) {
  return ut(n, (t) => t.empty ? n.moveByGroup(t, e) : lr(t, e));
}
const _b = (n) => vu(n, !_e(n)), Rb = (n) => vu(n, _e(n));
function Eb(n, e, t) {
  if (e.type.prop(t))
    return !0;
  let i = e.to - e.from;
  return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
}
function ar(n, e, t) {
  let i = re(n).resolveInner(e.head), s = t ? z.closedBy : z.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? i.childAfter(a) : i.childBefore(a);
    if (!h)
      break;
    Eb(n, h, s) ? i = h : a = t ? h.to : h.from;
  }
  let r = i.type.prop(s), o, l;
  return r && (o = t ? xi(n, i.from, 1) : xi(n, i.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? i.to : i.from, S.cursor(l, t ? -1 : 1);
}
const Db = (n) => ut(n, (e) => ar(n.state, e, !_e(n))), Mb = (n) => ut(n, (e) => ar(n.state, e, _e(n)));
function Cu(n, e) {
  return ut(n, (t) => {
    if (!t.empty)
      return lr(t, e);
    let i = n.moveVertically(t, e);
    return i.head != t.head ? i : n.moveToLineBoundary(t, e);
  });
}
const Au = (n) => Cu(n, !1), Tu = (n) => Cu(n, !0);
function Ou(n) {
  let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, s;
  if (e) {
    for (let r of n.state.facet(N.scrollMargins)) {
      let o = r(n);
      o?.top && (t = Math.max(o?.top, t)), o?.bottom && (i = Math.max(o?.bottom, i));
    }
    s = n.scrollDOM.clientHeight - t - i;
  } else
    s = (n.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: i,
    selfScroll: e,
    height: Math.max(n.defaultLineHeight, s - 5)
  };
}
function _u(n, e) {
  let t = Ou(n), { state: i } = n, s = Fi(i.selection, (o) => o.empty ? n.moveVertically(o, e, t.height) : lr(o, e));
  if (s.eq(i.selection))
    return !1;
  let r;
  if (t.selfScroll) {
    let o = n.coordsAtPos(i.selection.main.head), l = n.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
    o && o.top > a && o.bottom < h && (r = N.scrollIntoView(s.main.head, { y: "start", yMargin: o.top - a }));
  }
  return n.dispatch(ft(i, s), { effects: r }), !0;
}
const _h = (n) => _u(n, !1), qo = (n) => _u(n, !0);
function Gt(n, e, t) {
  let i = n.lineBlockAt(e.head), s = n.moveToLineBoundary(e, t);
  if (s.head == e.head && s.head != (t ? i.to : i.from) && (s = n.moveToLineBoundary(e, t, !1)), !t && s.head == i.from && i.length) {
    let r = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    r && e.head != i.from + r && (s = S.cursor(i.from + r));
  }
  return s;
}
const Pb = (n) => ut(n, (e) => Gt(n, e, !0)), Bb = (n) => ut(n, (e) => Gt(n, e, !1)), Nb = (n) => ut(n, (e) => Gt(n, e, !_e(n))), Ib = (n) => ut(n, (e) => Gt(n, e, _e(n))), Lb = (n) => ut(n, (e) => S.cursor(n.lineBlockAt(e.head).from, 1)), $b = (n) => ut(n, (e) => S.cursor(n.lineBlockAt(e.head).to, -1));
function Fb(n, e, t) {
  let i = !1, s = Fi(n.selection, (r) => {
    let o = xi(n, r.head, -1) || xi(n, r.head, 1) || r.head > 0 && xi(n, r.head - 1, 1) || r.head < n.doc.length && xi(n, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    i = !0;
    let l = o.start.from == r.head ? o.end.to : o.end.from;
    return S.cursor(l);
  });
  return i ? (e(ft(n, s)), !0) : !1;
}
const zb = ({ state: n, dispatch: e }) => Fb(n, e);
function st(n, e) {
  let t = Fi(n.state.selection, (i) => {
    let s = e(i);
    return S.range(i.anchor, s.head, s.goalColumn, s.bidiLevel || void 0);
  });
  return t.eq(n.state.selection) ? !1 : (n.dispatch(ft(n.state, t)), !0);
}
function Ru(n, e) {
  return st(n, (t) => n.moveByChar(t, e));
}
const Eu = (n) => Ru(n, !_e(n)), Du = (n) => Ru(n, _e(n));
function Mu(n, e) {
  return st(n, (t) => n.moveByGroup(t, e));
}
const Hb = (n) => Mu(n, !_e(n)), Wb = (n) => Mu(n, _e(n)), Vb = (n) => st(n, (e) => ar(n.state, e, !_e(n))), jb = (n) => st(n, (e) => ar(n.state, e, _e(n)));
function Pu(n, e) {
  return st(n, (t) => n.moveVertically(t, e));
}
const Bu = (n) => Pu(n, !1), Nu = (n) => Pu(n, !0);
function Iu(n, e) {
  return st(n, (t) => n.moveVertically(t, e, Ou(n).height));
}
const Rh = (n) => Iu(n, !1), Eh = (n) => Iu(n, !0), qb = (n) => st(n, (e) => Gt(n, e, !0)), Ub = (n) => st(n, (e) => Gt(n, e, !1)), Kb = (n) => st(n, (e) => Gt(n, e, !_e(n))), Gb = (n) => st(n, (e) => Gt(n, e, _e(n))), Jb = (n) => st(n, (e) => S.cursor(n.lineBlockAt(e.head).from)), Xb = (n) => st(n, (e) => S.cursor(n.lineBlockAt(e.head).to)), Dh = ({ state: n, dispatch: e }) => (e(ft(n, { anchor: 0 })), !0), Mh = ({ state: n, dispatch: e }) => (e(ft(n, { anchor: n.doc.length })), !0), Ph = ({ state: n, dispatch: e }) => (e(ft(n, { anchor: n.selection.main.anchor, head: 0 })), !0), Bh = ({ state: n, dispatch: e }) => (e(ft(n, { anchor: n.selection.main.anchor, head: n.doc.length })), !0), Yb = ({ state: n, dispatch: e }) => (e(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), !0), Qb = ({ state: n, dispatch: e }) => {
  let t = hr(n).map(({ from: i, to: s }) => S.range(i, Math.min(s + 1, n.doc.length)));
  return e(n.update({ selection: S.create(t), userEvent: "select" })), !0;
}, Zb = ({ state: n, dispatch: e }) => {
  let t = Fi(n.selection, (i) => {
    let s = re(n), r = s.resolveStack(i.from, 1);
    if (i.empty) {
      let o = s.resolveStack(i.from, -1);
      o.node.from >= r.node.from && o.node.to <= r.node.to && (r = o);
    }
    for (let o = r; o; o = o.next) {
      let { node: l } = o;
      if ((l.from < i.from && l.to >= i.to || l.to > i.to && l.from <= i.from) && o.next)
        return S.range(l.to, l.from);
    }
    return i;
  });
  return t.eq(n.selection) ? !1 : (e(ft(n, t)), !0);
};
function Lu(n, e) {
  let { state: t } = n, i = t.selection, s = t.selection.ranges.slice();
  for (let r of t.selection.ranges) {
    let o = t.doc.lineAt(r.head);
    if (e ? o.to < n.state.doc.length : o.from > 0)
      for (let l = r; ; ) {
        let a = n.moveVertically(l, e);
        if (a.head < o.from || a.head > o.to) {
          s.some((h) => h.head == a.head) || s.push(a);
          break;
        } else {
          if (a.head == l.head)
            break;
          l = a;
        }
      }
  }
  return s.length == i.ranges.length ? !1 : (n.dispatch(ft(t, S.create(s, s.length - 1))), !0);
}
const e1 = (n) => Lu(n, !1), t1 = (n) => Lu(n, !0), i1 = ({ state: n, dispatch: e }) => {
  let t = n.selection, i = null;
  return t.ranges.length > 1 ? i = S.create([t.main]) : t.main.empty || (i = S.create([S.cursor(t.main.head)])), i ? (e(ft(n, i)), !0) : !1;
};
function Pn(n, e) {
  if (n.state.readOnly)
    return !1;
  let t = "delete.selection", { state: i } = n, s = i.changeByRange((r) => {
    let { from: o, to: l } = r;
    if (o == l) {
      let a = e(r);
      a < o ? (t = "delete.backward", a = is(n, a, !1)) : a > o && (t = "delete.forward", a = is(n, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = is(n, o, !1), l = is(n, l, !0);
    return o == l ? { range: r } : { changes: { from: o, to: l }, range: S.cursor(o, o < r.head ? -1 : 1) };
  });
  return s.changes.empty ? !1 : (n.dispatch(i.update(s, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? N.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function is(n, e, t) {
  if (n instanceof N)
    for (let i of n.state.facet(N.atomicRanges).map((s) => s(n)))
      i.between(e, e, (s, r) => {
        s < e && r > e && (e = t ? r : s);
      });
  return e;
}
const $u = (n, e, t) => Pn(n, (i) => {
  let s = i.from, { state: r } = n, o = r.doc.lineAt(s), l, a;
  if (t && !e && s > o.from && s < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, s - o.from))) {
    if (l[l.length - 1] == "	")
      return s - 1;
    let h = Gs(l, r.tabSize), c = h % Ps(r) || Ps(r);
    for (let f = 0; f < c && l[l.length - 1 - f] == " "; f++)
      s--;
    a = s;
  } else
    a = ve(o.text, s - o.from, e, e) + o.from, a == s && o.number != (e ? r.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, s - o.from)) && (a = ve(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), Uo = (n) => $u(n, !1, !0), Fu = (n) => $u(n, !0, !1), zu = (n, e) => Pn(n, (t) => {
  let i = t.head, { state: s } = n, r = s.doc.lineAt(i), o = s.charCategorizer(i);
  for (let l = null; ; ) {
    if (i == (e ? r.to : r.from)) {
      i == t.head && r.number != (e ? s.doc.lines : 1) && (i += e ? 1 : -1);
      break;
    }
    let a = ve(r.text, i - r.from, e) + r.from, h = r.text.slice(Math.min(i, a) - r.from, Math.max(i, a) - r.from), c = o(h);
    if (l != null && c != l)
      break;
    (h != " " || i != t.head) && (l = c), i = a;
  }
  return i;
}), Hu = (n) => zu(n, !1), n1 = (n) => zu(n, !0), s1 = (n) => Pn(n, (e) => {
  let t = n.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), r1 = (n) => Pn(n, (e) => {
  let t = n.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), o1 = (n) => Pn(n, (e) => {
  let t = n.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), l1 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: V.of(["", ""]) },
    range: S.cursor(i.from)
  }));
  return e(n.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, a1 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == n.doc.length)
      return { range: i };
    let s = i.from, r = n.doc.lineAt(s), o = s == r.from ? s - 1 : ve(r.text, s - r.from, !1) + r.from, l = s == r.to ? s + 1 : ve(r.text, s - r.from, !0) + r.from;
    return {
      changes: { from: o, to: l, insert: n.doc.slice(s, l).append(n.doc.slice(o, s)) },
      range: S.cursor(l)
    };
  });
  return t.changes.empty ? !1 : (e(n.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function hr(n) {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let s = n.doc.lineAt(i.from), r = n.doc.lineAt(i.to);
    if (!i.empty && i.to == r.from && (r = n.doc.lineAt(i.to - 1)), t >= s.number) {
      let o = e[e.length - 1];
      o.to = r.to, o.ranges.push(i);
    } else
      e.push({ from: s.from, to: r.to, ranges: [i] });
    t = r.number + 1;
  }
  return e;
}
function Wu(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [], s = [];
  for (let r of hr(n)) {
    if (t ? r.to == n.doc.length : r.from == 0)
      continue;
    let o = n.doc.lineAt(t ? r.to + 1 : r.from - 1), l = o.length + 1;
    if (t) {
      i.push({ from: r.to, to: o.to }, { from: r.from, insert: o.text + n.lineBreak });
      for (let a of r.ranges)
        s.push(S.range(Math.min(n.doc.length, a.anchor + l), Math.min(n.doc.length, a.head + l)));
    } else {
      i.push({ from: o.from, to: r.from }, { from: r.to, insert: n.lineBreak + o.text });
      for (let a of r.ranges)
        s.push(S.range(a.anchor - l, a.head - l));
    }
  }
  return i.length ? (e(n.update({
    changes: i,
    scrollIntoView: !0,
    selection: S.create(s, n.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const h1 = ({ state: n, dispatch: e }) => Wu(n, e, !1), c1 = ({ state: n, dispatch: e }) => Wu(n, e, !0);
function Vu(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [];
  for (let r of hr(n))
    t ? i.push({ from: r.from, insert: n.doc.slice(r.from, r.to) + n.lineBreak }) : i.push({ from: r.to, insert: n.lineBreak + n.doc.slice(r.from, r.to) });
  let s = n.changes(i);
  return e(n.update({
    changes: s,
    selection: n.selection.map(s, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const f1 = ({ state: n, dispatch: e }) => Vu(n, e, !1), u1 = ({ state: n, dispatch: e }) => Vu(n, e, !0), d1 = (n) => {
  if (n.state.readOnly)
    return !1;
  let { state: e } = n, t = e.changes(hr(e).map(({ from: s, to: r }) => (s > 0 ? s-- : r < e.doc.length && r++, { from: s, to: r }))), i = Fi(e.selection, (s) => {
    let r;
    if (n.lineWrapping) {
      let o = n.lineBlockAt(s.head), l = n.coordsAtPos(s.head, s.assoc || 1);
      l && (r = o.bottom + n.documentTop - l.bottom + n.defaultLineHeight / 2);
    }
    return n.moveVertically(s, !0, r);
  }).map(t);
  return n.dispatch({ changes: t, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function p1(n, e) {
  if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = re(n).resolveInner(e), i = t.childBefore(e), s = t.childAfter(e), r;
  return i && s && i.to <= e && s.from >= e && (r = i.type.prop(z.closedBy)) && r.indexOf(s.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(s.from).from && !/\S/.test(n.sliceDoc(i.to, s.from)) ? { from: i.to, to: s.from } : null;
}
const Nh = /* @__PURE__ */ ju(!1), m1 = /* @__PURE__ */ ju(!0);
function ju(n) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let i = e.changeByRange((s) => {
      let { from: r, to: o } = s, l = e.doc.lineAt(r), a = !n && r == o && p1(e, r);
      n && (r = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
      let h = new ir(e, { simulateBreak: r, simulateDoubleBreak: !!a }), c = Cl(h, r);
      for (c == null && (c = Gs(/^\s*/.exec(e.doc.lineAt(r).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: r, to: o } = a : r > l.from && r < l.from + 100 && !/\S/.test(l.text.slice(0, r)) && (r = l.from);
      let f = ["", wn(e, c)];
      return a && f.push(wn(e, h.lineIndent(l.from, -1))), {
        changes: { from: r, to: o, insert: V.of(f) },
        range: S.cursor(r + 1 + f[1].length)
      };
    });
    return t(e.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function $l(n, e) {
  let t = -1;
  return n.changeByRange((i) => {
    let s = [];
    for (let o = i.from; o <= i.to; ) {
      let l = n.doc.lineAt(o);
      l.number > t && (i.empty || i.to > l.from) && (e(l, s, i), t = l.number), o = l.to + 1;
    }
    let r = n.changes(s);
    return {
      changes: s,
      range: S.range(r.mapPos(i.anchor, 1), r.mapPos(i.head, 1))
    };
  });
}
const g1 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), i = new ir(n, { overrideIndentation: (r) => {
    let o = t[r];
    return o ?? -1;
  } }), s = $l(n, (r, o, l) => {
    let a = Cl(i, r.from);
    if (a == null)
      return;
    /\S/.test(r.text) || (a = 0);
    let h = /^\s*/.exec(r.text)[0], c = wn(n, a);
    (h != c || l.from < r.from + h.length) && (t[r.from] = a, o.push({ from: r.from, to: r.from + h.length, insert: c }));
  });
  return s.changes.empty || e(n.update(s, { userEvent: "indent" })), !0;
}, y1 = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update($l(n, (t, i) => {
  i.push({ from: t.from, insert: n.facet(vl) });
}), { userEvent: "input.indent" })), !0), b1 = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update($l(n, (t, i) => {
  let s = /^\s*/.exec(t.text)[0];
  if (!s)
    return;
  let r = Gs(s, n.tabSize), o = 0, l = wn(n, Math.max(0, r - Ps(n)));
  for (; o < s.length && o < l.length && s.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  i.push({ from: t.from + o, to: t.from + s.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), k1 = (n) => (n.setTabFocusMode(), !0), x1 = [
  { key: "Ctrl-b", run: wu, shift: Eu, preventDefault: !0 },
  { key: "Ctrl-f", run: Su, shift: Du },
  { key: "Ctrl-p", run: Au, shift: Bu },
  { key: "Ctrl-n", run: Tu, shift: Nu },
  { key: "Ctrl-a", run: Lb, shift: Jb },
  { key: "Ctrl-e", run: $b, shift: Xb },
  { key: "Ctrl-d", run: Fu },
  { key: "Ctrl-h", run: Uo },
  { key: "Ctrl-k", run: s1 },
  { key: "Ctrl-Alt-h", run: Hu },
  { key: "Ctrl-o", run: l1 },
  { key: "Ctrl-t", run: a1 },
  { key: "Ctrl-v", run: qo }
], qu = /* @__PURE__ */ [
  { key: "ArrowLeft", run: wu, shift: Eu, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: _b, shift: Hb, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: Nb, shift: Kb, preventDefault: !0 },
  { key: "ArrowRight", run: Su, shift: Du, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: Rb, shift: Wb, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: Ib, shift: Gb, preventDefault: !0 },
  { key: "ArrowUp", run: Au, shift: Bu, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Dh, shift: Ph },
  { mac: "Ctrl-ArrowUp", run: _h, shift: Rh },
  { key: "ArrowDown", run: Tu, shift: Nu, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: Mh, shift: Bh },
  { mac: "Ctrl-ArrowDown", run: qo, shift: Eh },
  { key: "PageUp", run: _h, shift: Rh },
  { key: "PageDown", run: qo, shift: Eh },
  { key: "Home", run: Bb, shift: Ub, preventDefault: !0 },
  { key: "Mod-Home", run: Dh, shift: Ph },
  { key: "End", run: Pb, shift: qb, preventDefault: !0 },
  { key: "Mod-End", run: Mh, shift: Bh },
  { key: "Enter", run: Nh, shift: Nh },
  { key: "Mod-a", run: Yb },
  { key: "Backspace", run: Uo, shift: Uo, preventDefault: !0 },
  { key: "Delete", run: Fu, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: Hu, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: n1, preventDefault: !0 },
  { mac: "Mod-Backspace", run: r1, preventDefault: !0 },
  { mac: "Mod-Delete", run: o1, preventDefault: !0 }
].concat(/* @__PURE__ */ x1.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), w1 = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: Db, shift: Vb },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: Mb, shift: jb },
  { key: "Alt-ArrowUp", run: h1 },
  { key: "Shift-Alt-ArrowUp", run: f1 },
  { key: "Alt-ArrowDown", run: c1 },
  { key: "Shift-Alt-ArrowDown", run: u1 },
  { key: "Mod-Alt-ArrowUp", run: e1 },
  { key: "Mod-Alt-ArrowDown", run: t1 },
  { key: "Escape", run: i1 },
  { key: "Mod-Enter", run: m1 },
  { key: "Alt-l", mac: "Ctrl-l", run: Qb },
  { key: "Mod-i", run: Zb, preventDefault: !0 },
  { key: "Mod-[", run: b1 },
  { key: "Mod-]", run: y1 },
  { key: "Mod-Alt-\\", run: g1 },
  { key: "Shift-Mod-k", run: d1 },
  { key: "Shift-Mod-\\", run: zb },
  { key: "Mod-/", run: hb },
  { key: "Alt-A", run: fb },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: k1 }
].concat(qu), S1 = () => [
  tr.of([
    ...Ob,
    ...w1,
    ...qu,
    ...du,
    ...eb
  ]),
  Xy(),
  lb(),
  bb(),
  Tg(),
  N.lineWrapping
], Uu = E.define();
var cr, Y, Ku, ii, Ih, Gu, Ju, Xu, Fl, Ko, Go, An = {}, Yu = [], v1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, fr = Array.isArray;
function _t(n, e) {
  for (var t in e) n[t] = e[t];
  return n;
}
function zl(n) {
  n && n.parentNode && n.parentNode.removeChild(n);
}
function C1(n, e, t) {
  var i, s, r, o = {};
  for (r in e) r == "key" ? i = e[r] : r == "ref" ? s = e[r] : o[r] = e[r];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? cr.call(arguments, 2) : t), typeof n == "function" && n.defaultProps != null) for (r in n.defaultProps) o[r] === void 0 && (o[r] = n.defaultProps[r]);
  return ds(n, o, i, s, null);
}
function ds(n, e, t, i, s) {
  var r = { type: n, props: e, key: t, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: s ?? ++Ku, __i: -1, __u: 0 };
  return s == null && Y.vnode != null && Y.vnode(r), r;
}
function ur(n) {
  return n.children;
}
function ps(n, e) {
  this.props = n, this.context = e;
}
function Li(n, e) {
  if (e == null) return n.__ ? Li(n.__, n.__i + 1) : null;
  for (var t; e < n.__k.length; e++) if ((t = n.__k[e]) != null && t.__e != null) return t.__e;
  return typeof n.type == "function" ? Li(n) : null;
}
function Qu(n) {
  var e, t;
  if ((n = n.__) != null && n.__c != null) {
    for (n.__e = n.__c.base = null, e = 0; e < n.__k.length; e++) if ((t = n.__k[e]) != null && t.__e != null) {
      n.__e = n.__c.base = t.__e;
      break;
    }
    return Qu(n);
  }
}
function Lh(n) {
  (!n.__d && (n.__d = !0) && ii.push(n) && !qs.__r++ || Ih != Y.debounceRendering) && ((Ih = Y.debounceRendering) || Gu)(qs);
}
function qs() {
  for (var n, e, t, i, s, r, o, l = 1; ii.length; ) ii.length > l && ii.sort(Ju), n = ii.shift(), l = ii.length, n.__d && (t = void 0, i = void 0, s = (i = (e = n).__v).__e, r = [], o = [], e.__P && ((t = _t({}, i)).__v = i.__v + 1, Y.vnode && Y.vnode(t), Hl(e.__P, t, i, e.__n, e.__P.namespaceURI, 32 & i.__u ? [s] : null, r, s ?? Li(i), !!(32 & i.__u), o), t.__v = i.__v, t.__.__k[t.__i] = t, td(r, t, o), i.__e = i.__ = null, t.__e != s && Qu(t)));
  qs.__r = 0;
}
function Zu(n, e, t, i, s, r, o, l, a, h, c) {
  var f, u, d, p, m, g, y, b = i && i.__k || Yu, x = e.length;
  for (a = A1(t, e, b, a, x), f = 0; f < x; f++) (d = t.__k[f]) != null && (u = d.__i == -1 ? An : b[d.__i] || An, d.__i = f, g = Hl(n, d, u, s, r, o, l, a, h, c), p = d.__e, d.ref && u.ref != d.ref && (u.ref && Wl(u.ref, null, d), c.push(d.ref, d.__c || p, d)), m == null && p != null && (m = p), (y = !!(4 & d.__u)) || u.__k === d.__k ? a = ed(d, a, n, y) : typeof d.type == "function" && g !== void 0 ? a = g : p && (a = p.nextSibling), d.__u &= -7);
  return t.__e = m, a;
}
function A1(n, e, t, i, s) {
  var r, o, l, a, h, c = t.length, f = c, u = 0;
  for (n.__k = new Array(s), r = 0; r < s; r++) (o = e[r]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = n.__k[r] = ds(null, o, null, null, null) : fr(o) ? o = n.__k[r] = ds(ur, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = n.__k[r] = ds(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, a = r + u, o.__ = n, o.__b = n.__b + 1, l = null, (h = o.__i = T1(o, t, a, f)) != -1 && (f--, (l = t[h]) && (l.__u |= 2)), l == null || l.__v == null ? (h == -1 && (s > c ? u-- : s < c && u++), typeof o.type != "function" && (o.__u |= 4)) : h != a && (h == a - 1 ? u-- : h == a + 1 ? u++ : (h > a ? u-- : u++, o.__u |= 4))) : n.__k[r] = null;
  if (f) for (r = 0; r < c; r++) (l = t[r]) != null && !(2 & l.__u) && (l.__e == i && (i = Li(l)), nd(l, l));
  return i;
}
function ed(n, e, t, i) {
  var s, r;
  if (typeof n.type == "function") {
    for (s = n.__k, r = 0; s && r < s.length; r++) s[r] && (s[r].__ = n, e = ed(s[r], e, t, i));
    return e;
  }
  n.__e != e && (i && (e && n.type && !e.parentNode && (e = Li(n)), t.insertBefore(n.__e, e || null)), e = n.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function T1(n, e, t, i) {
  var s, r, o, l = n.key, a = n.type, h = e[t], c = h != null && (2 & h.__u) == 0;
  if (h === null && l == null || c && l == h.key && a == h.type) return t;
  if (i > (c ? 1 : 0)) {
    for (s = t - 1, r = t + 1; s >= 0 || r < e.length; ) if ((h = e[o = s >= 0 ? s-- : r++]) != null && !(2 & h.__u) && l == h.key && a == h.type) return o;
  }
  return -1;
}
function $h(n, e, t) {
  e[0] == "-" ? n.setProperty(e, t ?? "") : n[e] = t == null ? "" : typeof t != "number" || v1.test(e) ? t : t + "px";
}
function ns(n, e, t, i, s) {
  var r, o;
  e: if (e == "style") if (typeof t == "string") n.style.cssText = t;
  else {
    if (typeof i == "string" && (n.style.cssText = i = ""), i) for (e in i) t && e in t || $h(n.style, e, "");
    if (t) for (e in t) i && t[e] == i[e] || $h(n.style, e, t[e]);
  }
  else if (e[0] == "o" && e[1] == "n") r = e != (e = e.replace(Xu, "$1")), o = e.toLowerCase(), e = o in n || e == "onFocusOut" || e == "onFocusIn" ? o.slice(2) : e.slice(2), n.l || (n.l = {}), n.l[e + r] = t, t ? i ? t.u = i.u : (t.u = Fl, n.addEventListener(e, r ? Go : Ko, r)) : n.removeEventListener(e, r ? Go : Ko, r);
  else {
    if (s == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in n) try {
      n[e] = t ?? "";
      break e;
    } catch {
    }
    typeof t == "function" || (t == null || t === !1 && e[4] != "-" ? n.removeAttribute(e) : n.setAttribute(e, e == "popover" && t == 1 ? "" : t));
  }
}
function Fh(n) {
  return function(e) {
    if (this.l) {
      var t = this.l[e.type + n];
      if (e.t == null) e.t = Fl++;
      else if (e.t < t.u) return;
      return t(Y.event ? Y.event(e) : e);
    }
  };
}
function Hl(n, e, t, i, s, r, o, l, a, h) {
  var c, f, u, d, p, m, g, y, b, x, v, C, T, A, I, L, W, D = e.type;
  if (e.constructor !== void 0) return null;
  128 & t.__u && (a = !!(32 & t.__u), r = [l = e.__e = t.__e]), (c = Y.__b) && c(e);
  e: if (typeof D == "function") try {
    if (y = e.props, b = "prototype" in D && D.prototype.render, x = (c = D.contextType) && i[c.__c], v = c ? x ? x.props.value : c.__ : i, t.__c ? g = (f = e.__c = t.__c).__ = f.__E : (b ? e.__c = f = new D(y, v) : (e.__c = f = new ps(y, v), f.constructor = D, f.render = _1), x && x.sub(f), f.state || (f.state = {}), f.__n = i, u = f.__d = !0, f.__h = [], f._sb = []), b && f.__s == null && (f.__s = f.state), b && D.getDerivedStateFromProps != null && (f.__s == f.state && (f.__s = _t({}, f.__s)), _t(f.__s, D.getDerivedStateFromProps(y, f.__s))), d = f.props, p = f.state, f.__v = e, u) b && D.getDerivedStateFromProps == null && f.componentWillMount != null && f.componentWillMount(), b && f.componentDidMount != null && f.__h.push(f.componentDidMount);
    else {
      if (b && D.getDerivedStateFromProps == null && y !== d && f.componentWillReceiveProps != null && f.componentWillReceiveProps(y, v), e.__v == t.__v || !f.__e && f.shouldComponentUpdate != null && f.shouldComponentUpdate(y, f.__s, v) === !1) {
        for (e.__v != t.__v && (f.props = y, f.state = f.__s, f.__d = !1), e.__e = t.__e, e.__k = t.__k, e.__k.some(function(w) {
          w && (w.__ = e);
        }), C = 0; C < f._sb.length; C++) f.__h.push(f._sb[C]);
        f._sb = [], f.__h.length && o.push(f);
        break e;
      }
      f.componentWillUpdate != null && f.componentWillUpdate(y, f.__s, v), b && f.componentDidUpdate != null && f.__h.push(function() {
        f.componentDidUpdate(d, p, m);
      });
    }
    if (f.context = v, f.props = y, f.__P = n, f.__e = !1, T = Y.__r, A = 0, b) {
      for (f.state = f.__s, f.__d = !1, T && T(e), c = f.render(f.props, f.state, f.context), I = 0; I < f._sb.length; I++) f.__h.push(f._sb[I]);
      f._sb = [];
    } else do
      f.__d = !1, T && T(e), c = f.render(f.props, f.state, f.context), f.state = f.__s;
    while (f.__d && ++A < 25);
    f.state = f.__s, f.getChildContext != null && (i = _t(_t({}, i), f.getChildContext())), b && !u && f.getSnapshotBeforeUpdate != null && (m = f.getSnapshotBeforeUpdate(d, p)), L = c, c != null && c.type === ur && c.key == null && (L = id(c.props.children)), l = Zu(n, fr(L) ? L : [L], e, t, i, s, r, o, l, a, h), f.base = e.__e, e.__u &= -161, f.__h.length && o.push(f), g && (f.__E = f.__ = null);
  } catch (w) {
    if (e.__v = null, a || r != null) if (w.then) {
      for (e.__u |= a ? 160 : 128; l && l.nodeType == 8 && l.nextSibling; ) l = l.nextSibling;
      r[r.indexOf(l)] = null, e.__e = l;
    } else {
      for (W = r.length; W--; ) zl(r[W]);
      Jo(e);
    }
    else e.__e = t.__e, e.__k = t.__k, w.then || Jo(e);
    Y.__e(w, e, t);
  }
  else r == null && e.__v == t.__v ? (e.__k = t.__k, e.__e = t.__e) : l = e.__e = O1(t.__e, e, t, i, s, r, o, a, h);
  return (c = Y.diffed) && c(e), 128 & e.__u ? void 0 : l;
}
function Jo(n) {
  n && n.__c && (n.__c.__e = !0), n && n.__k && n.__k.forEach(Jo);
}
function td(n, e, t) {
  for (var i = 0; i < t.length; i++) Wl(t[i], t[++i], t[++i]);
  Y.__c && Y.__c(e, n), n.some(function(s) {
    try {
      n = s.__h, s.__h = [], n.some(function(r) {
        r.call(s);
      });
    } catch (r) {
      Y.__e(r, s.__v);
    }
  });
}
function id(n) {
  return typeof n != "object" || n == null || n.__b && n.__b > 0 ? n : fr(n) ? n.map(id) : _t({}, n);
}
function O1(n, e, t, i, s, r, o, l, a) {
  var h, c, f, u, d, p, m, g = t.props || An, y = e.props, b = e.type;
  if (b == "svg" ? s = "http://www.w3.org/2000/svg" : b == "math" ? s = "http://www.w3.org/1998/Math/MathML" : s || (s = "http://www.w3.org/1999/xhtml"), r != null) {
    for (h = 0; h < r.length; h++) if ((d = r[h]) && "setAttribute" in d == !!b && (b ? d.localName == b : d.nodeType == 3)) {
      n = d, r[h] = null;
      break;
    }
  }
  if (n == null) {
    if (b == null) return document.createTextNode(y);
    n = document.createElementNS(s, b, y.is && y), l && (Y.__m && Y.__m(e, r), l = !1), r = null;
  }
  if (b == null) g === y || l && n.data == y || (n.data = y);
  else {
    if (r = r && cr.call(n.childNodes), !l && r != null) for (g = {}, h = 0; h < n.attributes.length; h++) g[(d = n.attributes[h]).name] = d.value;
    for (h in g) if (d = g[h], h != "children") {
      if (h == "dangerouslySetInnerHTML") f = d;
      else if (!(h in y)) {
        if (h == "value" && "defaultValue" in y || h == "checked" && "defaultChecked" in y) continue;
        ns(n, h, null, d, s);
      }
    }
    for (h in y) d = y[h], h == "children" ? u = d : h == "dangerouslySetInnerHTML" ? c = d : h == "value" ? p = d : h == "checked" ? m = d : l && typeof d != "function" || g[h] === d || ns(n, h, d, g[h], s);
    if (c) l || f && (c.__html == f.__html || c.__html == n.innerHTML) || (n.innerHTML = c.__html), e.__k = [];
    else if (f && (n.innerHTML = ""), Zu(e.type == "template" ? n.content : n, fr(u) ? u : [u], e, t, i, b == "foreignObject" ? "http://www.w3.org/1999/xhtml" : s, r, o, r ? r[0] : t.__k && Li(t, 0), l, a), r != null) for (h = r.length; h--; ) zl(r[h]);
    l || (h = "value", b == "progress" && p == null ? n.removeAttribute("value") : p != null && (p !== n[h] || b == "progress" && !p || b == "option" && p != g[h]) && ns(n, h, p, g[h], s), h = "checked", m != null && m != n[h] && ns(n, h, m, g[h], s));
  }
  return n;
}
function Wl(n, e, t) {
  try {
    if (typeof n == "function") {
      var i = typeof n.__u == "function";
      i && n.__u(), i && e == null || (n.__u = n(e));
    } else n.current = e;
  } catch (s) {
    Y.__e(s, t);
  }
}
function nd(n, e, t) {
  var i, s;
  if (Y.unmount && Y.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || Wl(i, null, e)), (i = n.__c) != null) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (r) {
      Y.__e(r, e);
    }
    i.base = i.__P = null;
  }
  if (i = n.__k) for (s = 0; s < i.length; s++) i[s] && nd(i[s], e, t || typeof n.type != "function");
  t || zl(n.__e), n.__c = n.__ = n.__e = void 0;
}
function _1(n, e, t) {
  return this.constructor(n, t);
}
function R1(n, e, t) {
  var i, s, r, o;
  e == document && (e = document.documentElement), Y.__ && Y.__(n, e), s = (i = !1) ? null : e.__k, r = [], o = [], Hl(e, n = e.__k = C1(ur, null, [n]), s || An, An, e.namespaceURI, s ? null : e.firstChild ? cr.call(e.childNodes) : null, r, s ? s.__e : e.firstChild, i, o), td(r, n, o);
}
cr = Yu.slice, Y = { __e: function(n, e, t, i) {
  for (var s, r, o; e = e.__; ) if ((s = e.__c) && !s.__) try {
    if ((r = s.constructor) && r.getDerivedStateFromError != null && (s.setState(r.getDerivedStateFromError(n)), o = s.__d), s.componentDidCatch != null && (s.componentDidCatch(n, i || {}), o = s.__d), o) return s.__E = s;
  } catch (l) {
    n = l;
  }
  throw n;
} }, Ku = 0, ps.prototype.setState = function(n, e) {
  var t;
  t = this.__s != null && this.__s != this.state ? this.__s : this.__s = _t({}, this.state), typeof n == "function" && (n = n(_t({}, t), this.props)), n && _t(t, n), n != null && this.__v && (e && this._sb.push(e), Lh(this));
}, ps.prototype.forceUpdate = function(n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), Lh(this));
}, ps.prototype.render = ur, ii = [], Gu = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Ju = function(n, e) {
  return n.__v.__b - e.__v.__b;
}, qs.__r = 0, Xu = /(PointerCapture)$|Capture$/i, Fl = 0, Ko = Fh(!1), Go = Fh(!0);
var E1 = 0;
function K(n, e, t, i, s, r) {
  e || (e = {});
  var o, l, a = e;
  if ("ref" in a) for (l in a = {}, e) l == "ref" ? o = e[l] : a[l] = e[l];
  var h = { type: n, props: a, key: t, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --E1, __i: -1, __u: 0, __source: s, __self: r };
  if (typeof n == "function" && (o = n.defaultProps)) for (l in o) a[l] === void 0 && (a[l] = o[l]);
  return Y.vnode && Y.vnode(h), h;
}
function sd(n, e) {
  return function() {
    return n.apply(e, arguments);
  };
}
const { toString: D1 } = Object.prototype, { getPrototypeOf: Vl } = Object, { iterator: dr, toStringTag: rd } = Symbol, pr = /* @__PURE__ */ ((n) => (e) => {
  const t = D1.call(e);
  return n[t] || (n[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), dt = (n) => (n = n.toLowerCase(), (e) => pr(e) === n), mr = (n) => (e) => typeof e === n, { isArray: zi } = Array, $i = mr("undefined");
function Bn(n) {
  return n !== null && !$i(n) && n.constructor !== null && !$i(n.constructor) && $e(n.constructor.isBuffer) && n.constructor.isBuffer(n);
}
const od = dt("ArrayBuffer");
function M1(n) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(n) : e = n && n.buffer && od(n.buffer), e;
}
const P1 = mr("string"), $e = mr("function"), ld = mr("number"), Nn = (n) => n !== null && typeof n == "object", B1 = (n) => n === !0 || n === !1, ms = (n) => {
  if (pr(n) !== "object")
    return !1;
  const e = Vl(n);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(rd in n) && !(dr in n);
}, N1 = (n) => {
  if (!Nn(n) || Bn(n))
    return !1;
  try {
    return Object.keys(n).length === 0 && Object.getPrototypeOf(n) === Object.prototype;
  } catch {
    return !1;
  }
}, I1 = dt("Date"), L1 = dt("File"), $1 = dt("Blob"), F1 = dt("FileList"), z1 = (n) => Nn(n) && $e(n.pipe), H1 = (n) => {
  let e;
  return n && (typeof FormData == "function" && n instanceof FormData || $e(n.append) && ((e = pr(n)) === "formdata" || // detect form-data instance
  e === "object" && $e(n.toString) && n.toString() === "[object FormData]"));
}, W1 = dt("URLSearchParams"), [V1, j1, q1, U1] = ["ReadableStream", "Request", "Response", "Headers"].map(dt), K1 = (n) => n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function In(n, e, { allOwnKeys: t = !1 } = {}) {
  if (n === null || typeof n > "u")
    return;
  let i, s;
  if (typeof n != "object" && (n = [n]), zi(n))
    for (i = 0, s = n.length; i < s; i++)
      e.call(null, n[i], i, n);
  else {
    if (Bn(n))
      return;
    const r = t ? Object.getOwnPropertyNames(n) : Object.keys(n), o = r.length;
    let l;
    for (i = 0; i < o; i++)
      l = r[i], e.call(null, n[l], l, n);
  }
}
function ad(n, e) {
  if (Bn(n))
    return null;
  e = e.toLowerCase();
  const t = Object.keys(n);
  let i = t.length, s;
  for (; i-- > 0; )
    if (s = t[i], e === s.toLowerCase())
      return s;
  return null;
}
const oi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, hd = (n) => !$i(n) && n !== oi;
function Xo() {
  const { caseless: n, skipUndefined: e } = hd(this) && this || {}, t = {}, i = (s, r) => {
    const o = n && ad(t, r) || r;
    ms(t[o]) && ms(s) ? t[o] = Xo(t[o], s) : ms(s) ? t[o] = Xo({}, s) : zi(s) ? t[o] = s.slice() : (!e || !$i(s)) && (t[o] = s);
  };
  for (let s = 0, r = arguments.length; s < r; s++)
    arguments[s] && In(arguments[s], i);
  return t;
}
const G1 = (n, e, t, { allOwnKeys: i } = {}) => (In(e, (s, r) => {
  t && $e(s) ? Object.defineProperty(n, r, {
    value: sd(s, t),
    writable: !0,
    enumerable: !0,
    configurable: !0
  }) : Object.defineProperty(n, r, {
    value: s,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}, { allOwnKeys: i }), n), J1 = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n), X1 = (n, e, t, i) => {
  n.prototype = Object.create(e.prototype, i), Object.defineProperty(n.prototype, "constructor", {
    value: n,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(n, "super", {
    value: e.prototype
  }), t && Object.assign(n.prototype, t);
}, Y1 = (n, e, t, i) => {
  let s, r, o;
  const l = {};
  if (e = e || {}, n == null) return e;
  do {
    for (s = Object.getOwnPropertyNames(n), r = s.length; r-- > 0; )
      o = s[r], (!i || i(o, n, e)) && !l[o] && (e[o] = n[o], l[o] = !0);
    n = t !== !1 && Vl(n);
  } while (n && (!t || t(n, e)) && n !== Object.prototype);
  return e;
}, Q1 = (n, e, t) => {
  n = String(n), (t === void 0 || t > n.length) && (t = n.length), t -= e.length;
  const i = n.indexOf(e, t);
  return i !== -1 && i === t;
}, Z1 = (n) => {
  if (!n) return null;
  if (zi(n)) return n;
  let e = n.length;
  if (!ld(e)) return null;
  const t = new Array(e);
  for (; e-- > 0; )
    t[e] = n[e];
  return t;
}, ek = /* @__PURE__ */ ((n) => (e) => n && e instanceof n)(typeof Uint8Array < "u" && Vl(Uint8Array)), tk = (n, e) => {
  const i = (n && n[dr]).call(n);
  let s;
  for (; (s = i.next()) && !s.done; ) {
    const r = s.value;
    e.call(n, r[0], r[1]);
  }
}, ik = (n, e) => {
  let t;
  const i = [];
  for (; (t = n.exec(e)) !== null; )
    i.push(t);
  return i;
}, nk = dt("HTMLFormElement"), sk = (n) => n.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, i, s) {
    return i.toUpperCase() + s;
  }
), zh = (({ hasOwnProperty: n }) => (e, t) => n.call(e, t))(Object.prototype), rk = dt("RegExp"), cd = (n, e) => {
  const t = Object.getOwnPropertyDescriptors(n), i = {};
  In(t, (s, r) => {
    let o;
    (o = e(s, r, n)) !== !1 && (i[r] = o || s);
  }), Object.defineProperties(n, i);
}, ok = (n) => {
  cd(n, (e, t) => {
    if ($e(n) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const i = n[t];
    if ($e(i)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, lk = (n, e) => {
  const t = {}, i = (s) => {
    s.forEach((r) => {
      t[r] = !0;
    });
  };
  return zi(n) ? i(n) : i(String(n).split(e)), t;
}, ak = () => {
}, hk = (n, e) => n != null && Number.isFinite(n = +n) ? n : e;
function ck(n) {
  return !!(n && $e(n.append) && n[rd] === "FormData" && n[dr]);
}
const fk = (n) => {
  const e = new Array(10), t = (i, s) => {
    if (Nn(i)) {
      if (e.indexOf(i) >= 0)
        return;
      if (Bn(i))
        return i;
      if (!("toJSON" in i)) {
        e[s] = i;
        const r = zi(i) ? [] : {};
        return In(i, (o, l) => {
          const a = t(o, s + 1);
          !$i(a) && (r[l] = a);
        }), e[s] = void 0, r;
      }
    }
    return i;
  };
  return t(n, 0);
}, uk = dt("AsyncFunction"), dk = (n) => n && (Nn(n) || $e(n)) && $e(n.then) && $e(n.catch), fd = ((n, e) => n ? setImmediate : e ? ((t, i) => (oi.addEventListener("message", ({ source: s, data: r }) => {
  s === oi && r === t && i.length && i.shift()();
}, !1), (s) => {
  i.push(s), oi.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  $e(oi.postMessage)
), pk = typeof queueMicrotask < "u" ? queueMicrotask.bind(oi) : typeof process < "u" && process.nextTick || fd, mk = (n) => n != null && $e(n[dr]), k = {
  isArray: zi,
  isArrayBuffer: od,
  isBuffer: Bn,
  isFormData: H1,
  isArrayBufferView: M1,
  isString: P1,
  isNumber: ld,
  isBoolean: B1,
  isObject: Nn,
  isPlainObject: ms,
  isEmptyObject: N1,
  isReadableStream: V1,
  isRequest: j1,
  isResponse: q1,
  isHeaders: U1,
  isUndefined: $i,
  isDate: I1,
  isFile: L1,
  isBlob: $1,
  isRegExp: rk,
  isFunction: $e,
  isStream: z1,
  isURLSearchParams: W1,
  isTypedArray: ek,
  isFileList: F1,
  forEach: In,
  merge: Xo,
  extend: G1,
  trim: K1,
  stripBOM: J1,
  inherits: X1,
  toFlatObject: Y1,
  kindOf: pr,
  kindOfTest: dt,
  endsWith: Q1,
  toArray: Z1,
  forEachEntry: tk,
  matchAll: ik,
  isHTMLForm: nk,
  hasOwnProperty: zh,
  hasOwnProp: zh,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: cd,
  freezeMethods: ok,
  toObjectSet: lk,
  toCamelCase: sk,
  noop: ak,
  toFiniteNumber: hk,
  findKey: ad,
  global: oi,
  isContextDefined: hd,
  isSpecCompliantForm: ck,
  toJSONObject: fk,
  isAsyncFn: uk,
  isThenable: dk,
  setImmediate: fd,
  asap: pk,
  isIterable: mk
};
let B = class ud extends Error {
  static from(e, t, i, s, r, o) {
    const l = new ud(e.message, t || e.code, i, s, r);
    return l.cause = e, l.name = e.name, o && Object.assign(l, o), l;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(e, t, i, s, r) {
    super(e), this.name = "AxiosError", this.isAxiosError = !0, t && (this.code = t), i && (this.config = i), s && (this.request = s), r && (this.response = r, this.status = r.status);
  }
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: k.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
B.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
B.ERR_BAD_OPTION = "ERR_BAD_OPTION";
B.ECONNABORTED = "ECONNABORTED";
B.ETIMEDOUT = "ETIMEDOUT";
B.ERR_NETWORK = "ERR_NETWORK";
B.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
B.ERR_DEPRECATED = "ERR_DEPRECATED";
B.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
B.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
B.ERR_CANCELED = "ERR_CANCELED";
B.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
B.ERR_INVALID_URL = "ERR_INVALID_URL";
const gk = null;
function Yo(n) {
  return k.isPlainObject(n) || k.isArray(n);
}
function dd(n) {
  return k.endsWith(n, "[]") ? n.slice(0, -2) : n;
}
function Hh(n, e, t) {
  return n ? n.concat(e).map(function(s, r) {
    return s = dd(s), !t && r ? "[" + s + "]" : s;
  }).join(t ? "." : "") : e;
}
function yk(n) {
  return k.isArray(n) && !n.some(Yo);
}
const bk = k.toFlatObject(k, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function gr(n, e, t) {
  if (!k.isObject(n))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = k.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(m, g) {
    return !k.isUndefined(g[m]);
  });
  const i = t.metaTokens, s = t.visitor || c, r = t.dots, o = t.indexes, a = (t.Blob || typeof Blob < "u" && Blob) && k.isSpecCompliantForm(e);
  if (!k.isFunction(s))
    throw new TypeError("visitor must be a function");
  function h(p) {
    if (p === null) return "";
    if (k.isDate(p))
      return p.toISOString();
    if (k.isBoolean(p))
      return p.toString();
    if (!a && k.isBlob(p))
      throw new B("Blob is not supported. Use a Buffer instead.");
    return k.isArrayBuffer(p) || k.isTypedArray(p) ? a && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function c(p, m, g) {
    let y = p;
    if (p && !g && typeof p == "object") {
      if (k.endsWith(m, "{}"))
        m = i ? m : m.slice(0, -2), p = JSON.stringify(p);
      else if (k.isArray(p) && yk(p) || (k.isFileList(p) || k.endsWith(m, "[]")) && (y = k.toArray(p)))
        return m = dd(m), y.forEach(function(x, v) {
          !(k.isUndefined(x) || x === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Hh([m], v, r) : o === null ? m : m + "[]",
            h(x)
          );
        }), !1;
    }
    return Yo(p) ? !0 : (e.append(Hh(g, m, r), h(p)), !1);
  }
  const f = [], u = Object.assign(bk, {
    defaultVisitor: c,
    convertValue: h,
    isVisitable: Yo
  });
  function d(p, m) {
    if (!k.isUndefined(p)) {
      if (f.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      f.push(p), k.forEach(p, function(y, b) {
        (!(k.isUndefined(y) || y === null) && s.call(
          e,
          y,
          k.isString(b) ? b.trim() : b,
          m,
          u
        )) === !0 && d(y, m ? m.concat(b) : [b]);
      }), f.pop();
    }
  }
  if (!k.isObject(n))
    throw new TypeError("data must be an object");
  return d(n), e;
}
function Wh(n) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function(i) {
    return e[i];
  });
}
function jl(n, e) {
  this._pairs = [], n && gr(n, this, e);
}
const pd = jl.prototype;
pd.append = function(e, t) {
  this._pairs.push([e, t]);
};
pd.toString = function(e) {
  const t = e ? function(i) {
    return e.call(this, i, Wh);
  } : Wh;
  return this._pairs.map(function(s) {
    return t(s[0]) + "=" + t(s[1]);
  }, "").join("&");
};
function kk(n) {
  return encodeURIComponent(n).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function md(n, e, t) {
  if (!e)
    return n;
  const i = t && t.encode || kk, s = k.isFunction(t) ? {
    serialize: t
  } : t, r = s && s.serialize;
  let o;
  if (r ? o = r(e, s) : o = k.isURLSearchParams(e) ? e.toString() : new jl(e, s).toString(i), o) {
    const l = n.indexOf("#");
    l !== -1 && (n = n.slice(0, l)), n += (n.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return n;
}
class Vh {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, t, i) {
    return this.handlers.push({
      fulfilled: e,
      rejected: t,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    k.forEach(this.handlers, function(i) {
      i !== null && e(i);
    });
  }
}
const gd = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, xk = typeof URLSearchParams < "u" ? URLSearchParams : jl, wk = typeof FormData < "u" ? FormData : null, Sk = typeof Blob < "u" ? Blob : null, vk = {
  isBrowser: !0,
  classes: {
    URLSearchParams: xk,
    FormData: wk,
    Blob: Sk
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, ql = typeof window < "u" && typeof document < "u", Qo = typeof navigator == "object" && navigator || void 0, Ck = ql && (!Qo || ["ReactNative", "NativeScript", "NS"].indexOf(Qo.product) < 0), Ak = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Tk = ql && window.location.href || "http://localhost", Ok = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: ql,
  hasStandardBrowserEnv: Ck,
  hasStandardBrowserWebWorkerEnv: Ak,
  navigator: Qo,
  origin: Tk
}, Symbol.toStringTag, { value: "Module" })), Oe = {
  ...Ok,
  ...vk
};
function _k(n, e) {
  return gr(n, new Oe.classes.URLSearchParams(), {
    visitor: function(t, i, s, r) {
      return Oe.isNode && k.isBuffer(t) ? (this.append(i, t.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    },
    ...e
  });
}
function Rk(n) {
  return k.matchAll(/\w+|\[(\w*)]/g, n).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Ek(n) {
  const e = {}, t = Object.keys(n);
  let i;
  const s = t.length;
  let r;
  for (i = 0; i < s; i++)
    r = t[i], e[r] = n[r];
  return e;
}
function yd(n) {
  function e(t, i, s, r) {
    let o = t[r++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o), a = r >= t.length;
    return o = !o && k.isArray(s) ? s.length : o, a ? (k.hasOwnProp(s, o) ? s[o] = [s[o], i] : s[o] = i, !l) : ((!s[o] || !k.isObject(s[o])) && (s[o] = []), e(t, i, s[o], r) && k.isArray(s[o]) && (s[o] = Ek(s[o])), !l);
  }
  if (k.isFormData(n) && k.isFunction(n.entries)) {
    const t = {};
    return k.forEachEntry(n, (i, s) => {
      e(Rk(i), s, t, 0);
    }), t;
  }
  return null;
}
function Dk(n, e, t) {
  if (k.isString(n))
    try {
      return (e || JSON.parse)(n), k.trim(n);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (t || JSON.stringify)(n);
}
const Ln = {
  transitional: gd,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, t) {
    const i = t.getContentType() || "", s = i.indexOf("application/json") > -1, r = k.isObject(e);
    if (r && k.isHTMLForm(e) && (e = new FormData(e)), k.isFormData(e))
      return s ? JSON.stringify(yd(e)) : e;
    if (k.isArrayBuffer(e) || k.isBuffer(e) || k.isStream(e) || k.isFile(e) || k.isBlob(e) || k.isReadableStream(e))
      return e;
    if (k.isArrayBufferView(e))
      return e.buffer;
    if (k.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let l;
    if (r) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return _k(e, this.formSerializer).toString();
      if ((l = k.isFileList(e)) || i.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return gr(
          l ? { "files[]": e } : e,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return r || s ? (t.setContentType("application/json", !1), Dk(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || Ln.transitional, i = t && t.forcedJSONParsing, s = this.responseType === "json";
    if (k.isResponse(e) || k.isReadableStream(e))
      return e;
    if (e && k.isString(e) && (i && !this.responseType || s)) {
      const o = !(t && t.silentJSONParsing) && s;
      try {
        return JSON.parse(e, this.parseReviver);
      } catch (l) {
        if (o)
          throw l.name === "SyntaxError" ? B.from(l, B.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Oe.classes.FormData,
    Blob: Oe.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
k.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
  Ln.headers[n] = {};
});
const Mk = k.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Pk = (n) => {
  const e = {};
  let t, i, s;
  return n && n.split(`
`).forEach(function(o) {
    s = o.indexOf(":"), t = o.substring(0, s).trim().toLowerCase(), i = o.substring(s + 1).trim(), !(!t || e[t] && Mk[t]) && (t === "set-cookie" ? e[t] ? e[t].push(i) : e[t] = [i] : e[t] = e[t] ? e[t] + ", " + i : i);
  }), e;
}, jh = Symbol("internals");
function Ui(n) {
  return n && String(n).trim().toLowerCase();
}
function gs(n) {
  return n === !1 || n == null ? n : k.isArray(n) ? n.map(gs) : String(n);
}
function Bk(n) {
  const e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = t.exec(n); )
    e[i[1]] = i[2];
  return e;
}
const Nk = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
function Gr(n, e, t, i, s) {
  if (k.isFunction(i))
    return i.call(this, e, t);
  if (s && (e = t), !!k.isString(e)) {
    if (k.isString(i))
      return e.indexOf(i) !== -1;
    if (k.isRegExp(i))
      return i.test(e);
  }
}
function Ik(n) {
  return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, i) => t.toUpperCase() + i);
}
function Lk(n, e) {
  const t = k.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(n, i + t, {
      value: function(s, r, o) {
        return this[i].call(this, e, s, r, o);
      },
      configurable: !0
    });
  });
}
let Fe = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, i) {
    const s = this;
    function r(l, a, h) {
      const c = Ui(a);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const f = k.findKey(s, c);
      (!f || s[f] === void 0 || h === !0 || h === void 0 && s[f] !== !1) && (s[f || a] = gs(l));
    }
    const o = (l, a) => k.forEach(l, (h, c) => r(h, c, a));
    if (k.isPlainObject(e) || e instanceof this.constructor)
      o(e, t);
    else if (k.isString(e) && (e = e.trim()) && !Nk(e))
      o(Pk(e), t);
    else if (k.isObject(e) && k.isIterable(e)) {
      let l = {}, a, h;
      for (const c of e) {
        if (!k.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        l[h = c[0]] = (a = l[h]) ? k.isArray(a) ? [...a, c[1]] : [a, c[1]] : c[1];
      }
      o(l, t);
    } else
      e != null && r(t, e, i);
    return this;
  }
  get(e, t) {
    if (e = Ui(e), e) {
      const i = k.findKey(this, e);
      if (i) {
        const s = this[i];
        if (!t)
          return s;
        if (t === !0)
          return Bk(s);
        if (k.isFunction(t))
          return t.call(this, s, i);
        if (k.isRegExp(t))
          return t.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = Ui(e), e) {
      const i = k.findKey(this, e);
      return !!(i && this[i] !== void 0 && (!t || Gr(this, this[i], i, t)));
    }
    return !1;
  }
  delete(e, t) {
    const i = this;
    let s = !1;
    function r(o) {
      if (o = Ui(o), o) {
        const l = k.findKey(i, o);
        l && (!t || Gr(i, i[l], l, t)) && (delete i[l], s = !0);
      }
    }
    return k.isArray(e) ? e.forEach(r) : r(e), s;
  }
  clear(e) {
    const t = Object.keys(this);
    let i = t.length, s = !1;
    for (; i--; ) {
      const r = t[i];
      (!e || Gr(this, this[r], r, e, !0)) && (delete this[r], s = !0);
    }
    return s;
  }
  normalize(e) {
    const t = this, i = {};
    return k.forEach(this, (s, r) => {
      const o = k.findKey(i, r);
      if (o) {
        t[o] = gs(s), delete t[r];
        return;
      }
      const l = e ? Ik(r) : String(r).trim();
      l !== r && delete t[r], t[l] = gs(s), i[l] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return k.forEach(this, (i, s) => {
      i != null && i !== !1 && (t[s] = e && k.isArray(i) ? i.join(", ") : i);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const i = new this(e);
    return t.forEach((s) => i.set(s)), i;
  }
  static accessor(e) {
    const i = (this[jh] = this[jh] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function r(o) {
      const l = Ui(o);
      i[l] || (Lk(s, o), i[l] = !0);
    }
    return k.isArray(e) ? e.forEach(r) : r(e), this;
  }
};
Fe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
k.reduceDescriptors(Fe.prototype, ({ value: n }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => n,
    set(i) {
      this[t] = i;
    }
  };
});
k.freezeMethods(Fe);
function Jr(n, e) {
  const t = this || Ln, i = e || t, s = Fe.from(i.headers);
  let r = i.data;
  return k.forEach(n, function(l) {
    r = l.call(t, r, s.normalize(), e ? e.status : void 0);
  }), s.normalize(), r;
}
function bd(n) {
  return !!(n && n.__CANCEL__);
}
let $n = class extends B {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(e, t, i) {
    super(e ?? "canceled", B.ERR_CANCELED, t, i), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function kd(n, e, t) {
  const i = t.config.validateStatus;
  !t.status || !i || i(t.status) ? n(t) : e(new B(
    "Request failed with status code " + t.status,
    [B.ERR_BAD_REQUEST, B.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function $k(n) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
  return e && e[1] || "";
}
function Fk(n, e) {
  n = n || 10;
  const t = new Array(n), i = new Array(n);
  let s = 0, r = 0, o;
  return e = e !== void 0 ? e : 1e3, function(a) {
    const h = Date.now(), c = i[r];
    o || (o = h), t[s] = a, i[s] = h;
    let f = r, u = 0;
    for (; f !== s; )
      u += t[f++], f = f % n;
    if (s = (s + 1) % n, s === r && (r = (r + 1) % n), h - o < e)
      return;
    const d = c && h - c;
    return d ? Math.round(u * 1e3 / d) : void 0;
  };
}
function zk(n, e) {
  let t = 0, i = 1e3 / e, s, r;
  const o = (h, c = Date.now()) => {
    t = c, s = null, r && (clearTimeout(r), r = null), n(...h);
  };
  return [(...h) => {
    const c = Date.now(), f = c - t;
    f >= i ? o(h, c) : (s = h, r || (r = setTimeout(() => {
      r = null, o(s);
    }, i - f)));
  }, () => s && o(s)];
}
const Us = (n, e, t = 3) => {
  let i = 0;
  const s = Fk(50, 250);
  return zk((r) => {
    const o = r.loaded, l = r.lengthComputable ? r.total : void 0, a = o - i, h = s(a), c = o <= l;
    i = o;
    const f = {
      loaded: o,
      total: l,
      progress: l ? o / l : void 0,
      bytes: a,
      rate: h || void 0,
      estimated: h && l && c ? (l - o) / h : void 0,
      event: r,
      lengthComputable: l != null,
      [e ? "download" : "upload"]: !0
    };
    n(f);
  }, t);
}, qh = (n, e) => {
  const t = n != null;
  return [(i) => e[0]({
    lengthComputable: t,
    total: n,
    loaded: i
  }), e[1]];
}, Uh = (n) => (...e) => k.asap(() => n(...e)), Hk = Oe.hasStandardBrowserEnv ? /* @__PURE__ */ ((n, e) => (t) => (t = new URL(t, Oe.origin), n.protocol === t.protocol && n.host === t.host && (e || n.port === t.port)))(
  new URL(Oe.origin),
  Oe.navigator && /(msie|trident)/i.test(Oe.navigator.userAgent)
) : () => !0, Wk = Oe.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(n, e, t, i, s, r, o) {
      if (typeof document > "u") return;
      const l = [`${n}=${encodeURIComponent(e)}`];
      k.isNumber(t) && l.push(`expires=${new Date(t).toUTCString()}`), k.isString(i) && l.push(`path=${i}`), k.isString(s) && l.push(`domain=${s}`), r === !0 && l.push("secure"), k.isString(o) && l.push(`SameSite=${o}`), document.cookie = l.join("; ");
    },
    read(n) {
      if (typeof document > "u") return null;
      const e = document.cookie.match(new RegExp("(?:^|; )" + n + "=([^;]*)"));
      return e ? decodeURIComponent(e[1]) : null;
    },
    remove(n) {
      this.write(n, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Vk(n) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
}
function jk(n, e) {
  return e ? n.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : n;
}
function xd(n, e, t) {
  let i = !Vk(e);
  return n && (i || t == !1) ? jk(n, e) : e;
}
const Kh = (n) => n instanceof Fe ? { ...n } : n;
function yi(n, e) {
  e = e || {};
  const t = {};
  function i(h, c, f, u) {
    return k.isPlainObject(h) && k.isPlainObject(c) ? k.merge.call({ caseless: u }, h, c) : k.isPlainObject(c) ? k.merge({}, c) : k.isArray(c) ? c.slice() : c;
  }
  function s(h, c, f, u) {
    if (k.isUndefined(c)) {
      if (!k.isUndefined(h))
        return i(void 0, h, f, u);
    } else return i(h, c, f, u);
  }
  function r(h, c) {
    if (!k.isUndefined(c))
      return i(void 0, c);
  }
  function o(h, c) {
    if (k.isUndefined(c)) {
      if (!k.isUndefined(h))
        return i(void 0, h);
    } else return i(void 0, c);
  }
  function l(h, c, f) {
    if (f in e)
      return i(h, c);
    if (f in n)
      return i(void 0, h);
  }
  const a = {
    url: r,
    method: r,
    data: r,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l,
    headers: (h, c, f) => s(Kh(h), Kh(c), f, !0)
  };
  return k.forEach(Object.keys({ ...n, ...e }), function(c) {
    const f = a[c] || s, u = f(n[c], e[c], c);
    k.isUndefined(u) && f !== l || (t[c] = u);
  }), t;
}
const wd = (n) => {
  const e = yi({}, n);
  let { data: t, withXSRFToken: i, xsrfHeaderName: s, xsrfCookieName: r, headers: o, auth: l } = e;
  if (e.headers = o = Fe.from(o), e.url = md(xd(e.baseURL, e.url, e.allowAbsoluteUrls), n.params, n.paramsSerializer), l && o.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), k.isFormData(t)) {
    if (Oe.hasStandardBrowserEnv || Oe.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if (k.isFunction(t.getHeaders)) {
      const a = t.getHeaders(), h = ["content-type", "content-length"];
      Object.entries(a).forEach(([c, f]) => {
        h.includes(c.toLowerCase()) && o.set(c, f);
      });
    }
  }
  if (Oe.hasStandardBrowserEnv && (i && k.isFunction(i) && (i = i(e)), i || i !== !1 && Hk(e.url))) {
    const a = s && r && Wk.read(r);
    a && o.set(s, a);
  }
  return e;
}, qk = typeof XMLHttpRequest < "u", Uk = qk && function(n) {
  return new Promise(function(t, i) {
    const s = wd(n);
    let r = s.data;
    const o = Fe.from(s.headers).normalize();
    let { responseType: l, onUploadProgress: a, onDownloadProgress: h } = s, c, f, u, d, p;
    function m() {
      d && d(), p && p(), s.cancelToken && s.cancelToken.unsubscribe(c), s.signal && s.signal.removeEventListener("abort", c);
    }
    let g = new XMLHttpRequest();
    g.open(s.method.toUpperCase(), s.url, !0), g.timeout = s.timeout;
    function y() {
      if (!g)
        return;
      const x = Fe.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), C = {
        data: !l || l === "text" || l === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: x,
        config: n,
        request: g
      };
      kd(function(A) {
        t(A), m();
      }, function(A) {
        i(A), m();
      }, C), g = null;
    }
    "onloadend" in g ? g.onloadend = y : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(y);
    }, g.onabort = function() {
      g && (i(new B("Request aborted", B.ECONNABORTED, n, g)), g = null);
    }, g.onerror = function(v) {
      const C = v && v.message ? v.message : "Network Error", T = new B(C, B.ERR_NETWORK, n, g);
      T.event = v || null, i(T), g = null;
    }, g.ontimeout = function() {
      let v = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const C = s.transitional || gd;
      s.timeoutErrorMessage && (v = s.timeoutErrorMessage), i(new B(
        v,
        C.clarifyTimeoutError ? B.ETIMEDOUT : B.ECONNABORTED,
        n,
        g
      )), g = null;
    }, r === void 0 && o.setContentType(null), "setRequestHeader" in g && k.forEach(o.toJSON(), function(v, C) {
      g.setRequestHeader(C, v);
    }), k.isUndefined(s.withCredentials) || (g.withCredentials = !!s.withCredentials), l && l !== "json" && (g.responseType = s.responseType), h && ([u, p] = Us(h, !0), g.addEventListener("progress", u)), a && g.upload && ([f, d] = Us(a), g.upload.addEventListener("progress", f), g.upload.addEventListener("loadend", d)), (s.cancelToken || s.signal) && (c = (x) => {
      g && (i(!x || x.type ? new $n(null, n, g) : x), g.abort(), g = null);
    }, s.cancelToken && s.cancelToken.subscribe(c), s.signal && (s.signal.aborted ? c() : s.signal.addEventListener("abort", c)));
    const b = $k(s.url);
    if (b && Oe.protocols.indexOf(b) === -1) {
      i(new B("Unsupported protocol " + b + ":", B.ERR_BAD_REQUEST, n));
      return;
    }
    g.send(r || null);
  });
}, Kk = (n, e) => {
  const { length: t } = n = n ? n.filter(Boolean) : [];
  if (e || t) {
    let i = new AbortController(), s;
    const r = function(h) {
      if (!s) {
        s = !0, l();
        const c = h instanceof Error ? h : this.reason;
        i.abort(c instanceof B ? c : new $n(c instanceof Error ? c.message : c));
      }
    };
    let o = e && setTimeout(() => {
      o = null, r(new B(`timeout of ${e}ms exceeded`, B.ETIMEDOUT));
    }, e);
    const l = () => {
      n && (o && clearTimeout(o), o = null, n.forEach((h) => {
        h.unsubscribe ? h.unsubscribe(r) : h.removeEventListener("abort", r);
      }), n = null);
    };
    n.forEach((h) => h.addEventListener("abort", r));
    const { signal: a } = i;
    return a.unsubscribe = () => k.asap(l), a;
  }
}, Gk = function* (n, e) {
  let t = n.byteLength;
  if (t < e) {
    yield n;
    return;
  }
  let i = 0, s;
  for (; i < t; )
    s = i + e, yield n.slice(i, s), i = s;
}, Jk = async function* (n, e) {
  for await (const t of Xk(n))
    yield* Gk(t, e);
}, Xk = async function* (n) {
  if (n[Symbol.asyncIterator]) {
    yield* n;
    return;
  }
  const e = n.getReader();
  try {
    for (; ; ) {
      const { done: t, value: i } = await e.read();
      if (t)
        break;
      yield i;
    }
  } finally {
    await e.cancel();
  }
}, Gh = (n, e, t, i) => {
  const s = Jk(n, e);
  let r = 0, o, l = (a) => {
    o || (o = !0, i && i(a));
  };
  return new ReadableStream({
    async pull(a) {
      try {
        const { done: h, value: c } = await s.next();
        if (h) {
          l(), a.close();
          return;
        }
        let f = c.byteLength;
        if (t) {
          let u = r += f;
          t(u);
        }
        a.enqueue(new Uint8Array(c));
      } catch (h) {
        throw l(h), h;
      }
    },
    cancel(a) {
      return l(a), s.return();
    }
  }, {
    highWaterMark: 2
  });
}, Jh = 64 * 1024, { isFunction: ss } = k, Yk = (({ Request: n, Response: e }) => ({
  Request: n,
  Response: e
}))(k.global), {
  ReadableStream: Xh,
  TextEncoder: Yh
} = k.global, Qh = (n, ...e) => {
  try {
    return !!n(...e);
  } catch {
    return !1;
  }
}, Qk = (n) => {
  n = k.merge.call({
    skipUndefined: !0
  }, Yk, n);
  const { fetch: e, Request: t, Response: i } = n, s = e ? ss(e) : typeof fetch == "function", r = ss(t), o = ss(i);
  if (!s)
    return !1;
  const l = s && ss(Xh), a = s && (typeof Yh == "function" ? /* @__PURE__ */ ((p) => (m) => p.encode(m))(new Yh()) : async (p) => new Uint8Array(await new t(p).arrayBuffer())), h = r && l && Qh(() => {
    let p = !1;
    const m = new t(Oe.origin, {
      body: new Xh(),
      method: "POST",
      get duplex() {
        return p = !0, "half";
      }
    }).headers.has("Content-Type");
    return p && !m;
  }), c = o && l && Qh(() => k.isReadableStream(new i("").body)), f = {
    stream: c && ((p) => p.body)
  };
  s && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((p) => {
    !f[p] && (f[p] = (m, g) => {
      let y = m && m[p];
      if (y)
        return y.call(m);
      throw new B(`Response type '${p}' is not supported`, B.ERR_NOT_SUPPORT, g);
    });
  });
  const u = async (p) => {
    if (p == null)
      return 0;
    if (k.isBlob(p))
      return p.size;
    if (k.isSpecCompliantForm(p))
      return (await new t(Oe.origin, {
        method: "POST",
        body: p
      }).arrayBuffer()).byteLength;
    if (k.isArrayBufferView(p) || k.isArrayBuffer(p))
      return p.byteLength;
    if (k.isURLSearchParams(p) && (p = p + ""), k.isString(p))
      return (await a(p)).byteLength;
  }, d = async (p, m) => {
    const g = k.toFiniteNumber(p.getContentLength());
    return g ?? u(m);
  };
  return async (p) => {
    let {
      url: m,
      method: g,
      data: y,
      signal: b,
      cancelToken: x,
      timeout: v,
      onDownloadProgress: C,
      onUploadProgress: T,
      responseType: A,
      headers: I,
      withCredentials: L = "same-origin",
      fetchOptions: W
    } = wd(p), D = e || fetch;
    A = A ? (A + "").toLowerCase() : "text";
    let w = Kk([b, x && x.toAbortSignal()], v), M = null;
    const $ = w && w.unsubscribe && (() => {
      w.unsubscribe();
    });
    let H;
    try {
      if (T && h && g !== "get" && g !== "head" && (H = await d(I, y)) !== 0) {
        let ee = new t(m, {
          method: "POST",
          body: y,
          duplex: "half"
        }), _;
        if (k.isFormData(y) && (_ = ee.headers.get("content-type")) && I.setContentType(_), ee.body) {
          const [F, j] = qh(
            H,
            Us(Uh(T))
          );
          y = Gh(ee.body, Jh, F, j);
        }
      }
      k.isString(L) || (L = L ? "include" : "omit");
      const G = r && "credentials" in t.prototype, ke = {
        ...W,
        signal: w,
        method: g.toUpperCase(),
        headers: I.normalize().toJSON(),
        body: y,
        duplex: "half",
        credentials: G ? L : void 0
      };
      M = r && new t(m, ke);
      let ie = await (r ? D(M, W) : D(m, ke));
      const ae = c && (A === "stream" || A === "response");
      if (c && (C || ae && $)) {
        const ee = {};
        ["status", "statusText", "headers"].forEach((Pe) => {
          ee[Pe] = ie[Pe];
        });
        const _ = k.toFiniteNumber(ie.headers.get("content-length")), [F, j] = C && qh(
          _,
          Us(Uh(C), !0)
        ) || [];
        ie = new i(
          Gh(ie.body, Jh, F, () => {
            j && j(), $ && $();
          }),
          ee
        );
      }
      A = A || "text";
      let Jt = await f[k.findKey(f, A) || "text"](ie, p);
      return !ae && $ && $(), await new Promise((ee, _) => {
        kd(ee, _, {
          data: Jt,
          headers: Fe.from(ie.headers),
          status: ie.status,
          statusText: ie.statusText,
          config: p,
          request: M
        });
      });
    } catch (G) {
      throw $ && $(), G && G.name === "TypeError" && /Load failed|fetch/i.test(G.message) ? Object.assign(
        new B("Network Error", B.ERR_NETWORK, p, M),
        {
          cause: G.cause || G
        }
      ) : B.from(G, G && G.code, p, M);
    }
  };
}, Zk = /* @__PURE__ */ new Map(), Sd = (n) => {
  let e = n && n.env || {};
  const { fetch: t, Request: i, Response: s } = e, r = [
    i,
    s,
    t
  ];
  let o = r.length, l = o, a, h, c = Zk;
  for (; l--; )
    a = r[l], h = c.get(a), h === void 0 && c.set(a, h = l ? /* @__PURE__ */ new Map() : Qk(e)), c = h;
  return h;
};
Sd();
const Ul = {
  http: gk,
  xhr: Uk,
  fetch: {
    get: Sd
  }
};
k.forEach(Ul, (n, e) => {
  if (n) {
    try {
      Object.defineProperty(n, "name", { value: e });
    } catch {
    }
    Object.defineProperty(n, "adapterName", { value: e });
  }
});
const Zh = (n) => `- ${n}`, ex = (n) => k.isFunction(n) || n === null || n === !1;
function tx(n, e) {
  n = k.isArray(n) ? n : [n];
  const { length: t } = n;
  let i, s;
  const r = {};
  for (let o = 0; o < t; o++) {
    i = n[o];
    let l;
    if (s = i, !ex(i) && (s = Ul[(l = String(i)).toLowerCase()], s === void 0))
      throw new B(`Unknown adapter '${l}'`);
    if (s && (k.isFunction(s) || (s = s.get(e))))
      break;
    r[l || "#" + o] = s;
  }
  if (!s) {
    const o = Object.entries(r).map(
      ([a, h]) => `adapter ${a} ` + (h === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let l = t ? o.length > 1 ? `since :
` + o.map(Zh).join(`
`) : " " + Zh(o[0]) : "as no adapter specified";
    throw new B(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return s;
}
const vd = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: tx,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: Ul
};
function Xr(n) {
  if (n.cancelToken && n.cancelToken.throwIfRequested(), n.signal && n.signal.aborted)
    throw new $n(null, n);
}
function ec(n) {
  return Xr(n), n.headers = Fe.from(n.headers), n.data = Jr.call(
    n,
    n.transformRequest
  ), ["post", "put", "patch"].indexOf(n.method) !== -1 && n.headers.setContentType("application/x-www-form-urlencoded", !1), vd.getAdapter(n.adapter || Ln.adapter, n)(n).then(function(i) {
    return Xr(n), i.data = Jr.call(
      n,
      n.transformResponse,
      i
    ), i.headers = Fe.from(i.headers), i;
  }, function(i) {
    return bd(i) || (Xr(n), i && i.response && (i.response.data = Jr.call(
      n,
      n.transformResponse,
      i.response
    ), i.response.headers = Fe.from(i.response.headers))), Promise.reject(i);
  });
}
const Cd = "1.13.4", yr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((n, e) => {
  yr[n] = function(i) {
    return typeof i === n || "a" + (e < 1 ? "n " : " ") + n;
  };
});
const tc = {};
yr.transitional = function(e, t, i) {
  function s(r, o) {
    return "[Axios v" + Cd + "] Transitional option '" + r + "'" + o + (i ? ". " + i : "");
  }
  return (r, o, l) => {
    if (e === !1)
      throw new B(
        s(o, " has been removed" + (t ? " in " + t : "")),
        B.ERR_DEPRECATED
      );
    return t && !tc[o] && (tc[o] = !0, console.warn(
      s(
        o,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(r, o, l) : !0;
  };
};
yr.spelling = function(e) {
  return (t, i) => (console.warn(`${i} is likely a misspelling of ${e}`), !0);
};
function ix(n, e, t) {
  if (typeof n != "object")
    throw new B("options must be an object", B.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(n);
  let s = i.length;
  for (; s-- > 0; ) {
    const r = i[s], o = e[r];
    if (o) {
      const l = n[r], a = l === void 0 || o(l, r, n);
      if (a !== !0)
        throw new B("option " + r + " must be " + a, B.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new B("Unknown option " + r, B.ERR_BAD_OPTION);
  }
}
const ys = {
  assertOptions: ix,
  validators: yr
}, yt = ys.validators;
let ui = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new Vh(),
      response: new Vh()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, t) {
    try {
      return await this._request(e, t);
    } catch (i) {
      if (i instanceof Error) {
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const r = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? r && !String(i.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + r) : i.stack = r;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = yi(this.defaults, t);
    const { transitional: i, paramsSerializer: s, headers: r } = t;
    i !== void 0 && ys.assertOptions(i, {
      silentJSONParsing: yt.transitional(yt.boolean),
      forcedJSONParsing: yt.transitional(yt.boolean),
      clarifyTimeoutError: yt.transitional(yt.boolean)
    }, !1), s != null && (k.isFunction(s) ? t.paramsSerializer = {
      serialize: s
    } : ys.assertOptions(s, {
      encode: yt.function,
      serialize: yt.function
    }, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), ys.assertOptions(t, {
      baseUrl: yt.spelling("baseURL"),
      withXsrfToken: yt.spelling("withXSRFToken")
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let o = r && k.merge(
      r.common,
      r[t.method]
    );
    r && k.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (p) => {
        delete r[p];
      }
    ), t.headers = Fe.concat(o, r);
    const l = [];
    let a = !0;
    this.interceptors.request.forEach(function(m) {
      typeof m.runWhen == "function" && m.runWhen(t) === !1 || (a = a && m.synchronous, l.unshift(m.fulfilled, m.rejected));
    });
    const h = [];
    this.interceptors.response.forEach(function(m) {
      h.push(m.fulfilled, m.rejected);
    });
    let c, f = 0, u;
    if (!a) {
      const p = [ec.bind(this), void 0];
      for (p.unshift(...l), p.push(...h), u = p.length, c = Promise.resolve(t); f < u; )
        c = c.then(p[f++], p[f++]);
      return c;
    }
    u = l.length;
    let d = t;
    for (; f < u; ) {
      const p = l[f++], m = l[f++];
      try {
        d = p(d);
      } catch (g) {
        m.call(this, g);
        break;
      }
    }
    try {
      c = ec.call(this, d);
    } catch (p) {
      return Promise.reject(p);
    }
    for (f = 0, u = h.length; f < u; )
      c = c.then(h[f++], h[f++]);
    return c;
  }
  getUri(e) {
    e = yi(this.defaults, e);
    const t = xd(e.baseURL, e.url, e.allowAbsoluteUrls);
    return md(t, e.params, e.paramsSerializer);
  }
};
k.forEach(["delete", "get", "head", "options"], function(e) {
  ui.prototype[e] = function(t, i) {
    return this.request(yi(i || {}, {
      method: e,
      url: t,
      data: (i || {}).data
    }));
  };
});
k.forEach(["post", "put", "patch"], function(e) {
  function t(i) {
    return function(r, o, l) {
      return this.request(yi(l || {}, {
        method: e,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: o
      }));
    };
  }
  ui.prototype[e] = t(), ui.prototype[e + "Form"] = t(!0);
});
let nx = class Ad {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(r) {
      t = r;
    });
    const i = this;
    this.promise.then((s) => {
      if (!i._listeners) return;
      let r = i._listeners.length;
      for (; r-- > 0; )
        i._listeners[r](s);
      i._listeners = null;
    }), this.promise.then = (s) => {
      let r;
      const o = new Promise((l) => {
        i.subscribe(l), r = l;
      }).then(s);
      return o.cancel = function() {
        i.unsubscribe(r);
      }, o;
    }, e(function(r, o, l) {
      i.reason || (i.reason = new $n(r, o, l), t(i.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), t = (i) => {
      e.abort(i);
    };
    return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new Ad(function(s) {
        e = s;
      }),
      cancel: e
    };
  }
};
function sx(n) {
  return function(t) {
    return n.apply(null, t);
  };
}
function rx(n) {
  return k.isObject(n) && n.isAxiosError === !0;
}
const Zo = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(Zo).forEach(([n, e]) => {
  Zo[e] = n;
});
function Td(n) {
  const e = new ui(n), t = sd(ui.prototype.request, e);
  return k.extend(t, ui.prototype, e, { allOwnKeys: !0 }), k.extend(t, e, null, { allOwnKeys: !0 }), t.create = function(s) {
    return Td(yi(n, s));
  }, t;
}
const Z = Td(Ln);
Z.Axios = ui;
Z.CanceledError = $n;
Z.CancelToken = nx;
Z.isCancel = bd;
Z.VERSION = Cd;
Z.toFormData = gr;
Z.AxiosError = B;
Z.Cancel = Z.CanceledError;
Z.all = function(e) {
  return Promise.all(e);
};
Z.spread = sx;
Z.isAxiosError = rx;
Z.mergeConfig = yi;
Z.AxiosHeaders = Fe;
Z.formToJSON = (n) => yd(k.isHTMLForm(n) ? new FormData(n) : n);
Z.getAdapter = vd.getAdapter;
Z.HttpStatusCode = Zo;
Z.default = Z;
const {
  Axios: Yx,
  AxiosError: Qx,
  CanceledError: Zx,
  isCancel: ew,
  CancelToken: tw,
  VERSION: iw,
  all: nw,
  Cancel: sw,
  isAxiosError: rw,
  spread: ow,
  toFormData: lw,
  AxiosHeaders: aw,
  HttpStatusCode: hw,
  formToJSON: cw,
  getAdapter: fw,
  mergeConfig: uw
} = Z;
var el, he, Yr, ic, tl = 0, Od = [], fe = Y, nc = fe.__b, sc = fe.__r, rc = fe.diffed, oc = fe.__c, lc = fe.unmount, ac = fe.__;
function ox(n, e) {
  fe.__h && fe.__h(he, n, tl || e), tl = 0;
  var t = he.__H || (he.__H = { __: [], __h: [] });
  return n >= t.__.length && t.__.push({}), t.__[n];
}
function lx(n) {
  return tl = 1, ax(_d, n);
}
function ax(n, e, t) {
  var i = ox(el++, 2);
  if (i.t = n, !i.__c && (i.__ = [_d(void 0, e), function(l) {
    var a = i.__N ? i.__N[0] : i.__[0], h = i.t(a, l);
    a !== h && (i.__N = [h, i.__[1]], i.__c.setState({}));
  }], i.__c = he, !he.__f)) {
    var s = function(l, a, h) {
      if (!i.__c.__H) return !0;
      var c = i.__c.__H.__.filter(function(u) {
        return !!u.__c;
      });
      if (c.every(function(u) {
        return !u.__N;
      })) return !r || r.call(this, l, a, h);
      var f = i.__c.props !== l;
      return c.forEach(function(u) {
        if (u.__N) {
          var d = u.__[0];
          u.__ = u.__N, u.__N = void 0, d !== u.__[0] && (f = !0);
        }
      }), r && r.call(this, l, a, h) || f;
    };
    he.__f = !0;
    var r = he.shouldComponentUpdate, o = he.componentWillUpdate;
    he.componentWillUpdate = function(l, a, h) {
      if (this.__e) {
        var c = r;
        r = void 0, s(l, a, h), r = c;
      }
      o && o.call(this, l, a, h);
    }, he.shouldComponentUpdate = s;
  }
  return i.__N || i.__;
}
function hx() {
  for (var n; n = Od.shift(); ) if (n.__P && n.__H) try {
    n.__H.__h.forEach(bs), n.__H.__h.forEach(il), n.__H.__h = [];
  } catch (e) {
    n.__H.__h = [], fe.__e(e, n.__v);
  }
}
fe.__b = function(n) {
  he = null, nc && nc(n);
}, fe.__ = function(n, e) {
  n && e.__k && e.__k.__m && (n.__m = e.__k.__m), ac && ac(n, e);
}, fe.__r = function(n) {
  sc && sc(n), el = 0;
  var e = (he = n.__c).__H;
  e && (Yr === he ? (e.__h = [], he.__h = [], e.__.forEach(function(t) {
    t.__N && (t.__ = t.__N), t.u = t.__N = void 0;
  })) : (e.__h.forEach(bs), e.__h.forEach(il), e.__h = [], el = 0)), Yr = he;
}, fe.diffed = function(n) {
  rc && rc(n);
  var e = n.__c;
  e && e.__H && (e.__H.__h.length && (Od.push(e) !== 1 && ic === fe.requestAnimationFrame || ((ic = fe.requestAnimationFrame) || cx)(hx)), e.__H.__.forEach(function(t) {
    t.u && (t.__H = t.u), t.u = void 0;
  })), Yr = he = null;
}, fe.__c = function(n, e) {
  e.some(function(t) {
    try {
      t.__h.forEach(bs), t.__h = t.__h.filter(function(i) {
        return !i.__ || il(i);
      });
    } catch (i) {
      e.some(function(s) {
        s.__h && (s.__h = []);
      }), e = [], fe.__e(i, t.__v);
    }
  }), oc && oc(n, e);
}, fe.unmount = function(n) {
  lc && lc(n);
  var e, t = n.__c;
  t && t.__H && (t.__H.__.forEach(function(i) {
    try {
      bs(i);
    } catch (s) {
      e = s;
    }
  }), t.__H = void 0, e && fe.__e(e, t.__v));
};
var hc = typeof requestAnimationFrame == "function";
function cx(n) {
  var e, t = function() {
    clearTimeout(i), hc && cancelAnimationFrame(e), setTimeout(n);
  }, i = setTimeout(t, 35);
  hc && (e = requestAnimationFrame(t));
}
function bs(n) {
  var e = he, t = n.__c;
  typeof t == "function" && (n.__c = void 0, t()), he = e;
}
function il(n) {
  var e = he;
  n.__c = n.__(), he = e;
}
function _d(n, e) {
  return typeof e == "function" ? e(n) : e;
}
const fx = (n) => ({
  ...n,
  prefix: n.prefix === "-" ? "" : "-"
}), ux = (n) => ({
  ...n,
  prefix: n.prefix === "!" ? "" : "!"
});
let Rd = {};
function ye(n, ...e) {
  let t = Rd[n] ?? n;
  return e.forEach((i, s) => {
    t = t.replace(`%${s + 1}`, String(i));
  }), t;
}
function cc(n, e) {
  Rd = n;
}
function fc(n) {
  return n || (typeof document < "u" && document.documentElement.lang ? document.documentElement.lang : "en");
}
const dx = [
  { label: '"..."', value: '"|"', description: () => ye("Exact match") },
  { label: "contains()", value: 'contains("|")', description: () => ye("Contains the given text") },
  { label: "starts_with()", value: 'starts_with("|")', description: () => ye("Starts with the given text") },
  { label: "ends_with()", value: 'ends_with("|")', description: () => ye("Ends with the given text") }
], px = [
  { label: '"..."', value: '"|"', description: () => ye("Exact match") }
], mx = [
  { label: "one_of()", value: 'one_of("|")', description: () => ye("Match one of these values") }
], gx = [
  { label: "after()", value: "after(|)", description: () => ye("After this date") },
  { label: "before()", value: "before(|)", description: () => ye("Before this date") },
  { label: "between()", value: "between(|,)", description: () => ye("Between two dates") }
], yx = {
  text: dx,
  keyword: px,
  uuid: mx,
  date: gx
};
function bx(n) {
  return (yx[n] ?? []).map((t) => ({
    type: "setPredicate",
    id: `predicate-${n}-${t.label}`,
    label: t.label,
    description: t.description(),
    value: t.value
  }));
}
function kx(n, e) {
  if (!n.condition) return {};
  const t = iu(n.condition, n.state.doc), i = e(t), s = xy(i), o = n.state.selection.main.anchor - n.condition.from, l = i.prefix.length - t.prefix.length, a = n.condition.from + o + l;
  return {
    changes: {
      from: n.condition.from,
      to: n.condition.to,
      insert: s
    },
    selection: { anchor: a }
  };
}
function xx(n, e, t) {
  const i = t === "cursor" ? n.node?.from ?? 0 : n.state.doc.length;
  return {
    selection: { anchor: i + e.length },
    changes: { from: i, insert: e }
  };
}
function wx(n, e) {
  if (!n.node) return {};
  const t = Mn("Query", n.node) || n.node, i = n.state.sliceDoc(n.node.to, n.node.to + 1), r = (ky(i) ? "" : " ") + e;
  return {
    selection: { anchor: t.to + r.length },
    changes: n.state.changes({
      from: t.to,
      insert: r
    })
  };
}
function Sx(n, e) {
  if (!e) return n;
  const t = n.match(/^(\w+)\(([^)]*)\)$/);
  if (!t) return n;
  const [, i, s] = t;
  if (!/[a-zA-Z0-9]/.test(s)) {
    const o = s.includes("|");
    return `${i}(${e}${o ? "|" : ""})`;
  }
  return n;
}
function vx(n, e) {
  if (!n.node) return {};
  const t = Mn("Predicate", n.node) || ci(n.node)?.getChild("Predicate"), i = t?.getChild("Command"), s = t?.getChild("Value"), r = i ? wy(i, n.state.doc) : s ? n.state.doc.sliceString(s.from, s.to) : null, o = Sx(e, r), l = o.replace("|", ""), a = o.indexOf("|");
  if (!t) {
    const c = ci(n.node)?.to ?? n.node.to;
    return {
      selection: { anchor: c + (a >= 0 ? a : l.length) },
      changes: n.state.changes({
        from: c,
        insert: l
      })
    };
  }
  return {
    selection: {
      anchor: t.from + (a >= 0 ? a : l.length)
    },
    changes: n.state.changes({
      from: t.from,
      to: t.to,
      insert: l
    })
  };
}
function Cx(n, e) {
  switch (e.type) {
    case "transform":
      return kx(n, e.transform);
    case "insert":
      return xx(n, e.insert(n), e.position);
    case "append":
      return wx(n, e.value);
    case "setPredicate":
      return vx(n, e.value);
    default:
      return {};
  }
}
function Ax(n) {
  if (!n.condition) return [];
  const e = n.condition.name === "ExcludeCondition", t = n.condition.name === "IgnoredCondition";
  return [
    {
      type: "transform",
      id: "negate",
      label: "-",
      description: ye(e ? "Remove negation" : "Exclude from results"),
      transform: fx
    },
    {
      type: "transform",
      id: "disable",
      label: "!",
      description: ye(t ? "Enable condition" : "Disable condition"),
      transform: ux
    }
  ];
}
function Tx(n) {
  const e = n.state.field(Gl);
  if (!e) return [];
  const t = n.field ?? "*", i = e[t] ?? e["*"];
  if (!i) return [];
  const s = [];
  if (i.type && s.push(...bx(i.type)), i.values)
    for (const r of i.values)
      switch (r.action.type) {
        case "setPredicate":
          s.push({
            type: "setPredicate",
            id: `field-value-${r.label}`,
            label: r.label,
            description: r.description,
            value: r.action.value
          });
          break;
        case "append":
          s.push({
            type: "append",
            id: `field-value-${r.label}`,
            label: r.label,
            description: r.description,
            value: r.action.value
          });
          break;
        case "insert":
          s.push({
            type: "insert",
            id: `field-value-${r.label}`,
            label: r.label,
            description: r.description,
            insert: () => r.action.value,
            position: r.action.position ?? "cursor"
          });
          break;
      }
  if (n.field && n.field !== "*" && n.condition) {
    const r = n.condition.getChild("Predicate");
    r && r.from < r.to && s.push({
      type: "insert",
      id: "new-condition",
      label: "+ new condition",
      description: ye("Add another condition"),
      insert: () => " ",
      position: "end"
    });
  }
  return s;
}
function Ox(n) {
  return [...Tx(n), ...Ax(n)].filter((t) => {
    if (t.type === "transform") {
      if (!n.condition) return !1;
      const i = iu(n.condition, n.state.doc);
      return t.isApplicable?.(i, n) ?? !0;
    } else
      return t.isApplicable?.(n) ?? !0;
  });
}
const _x = (n) => {
  const e = re(n);
  let t = "";
  return e.iterate({
    enter({ type: i, from: s, to: r }) {
      t += `<ul><li class="pl-8">${i.name} (${s}→${r}): ${n.doc.sliceString(s, r)}`;
    },
    leave() {
      t += "</ul>";
    }
  }), t;
};
function Rx(n) {
  const { state: e } = n, t = e.field(Ml);
  if (!t) return null;
  const i = re(e), s = e.selection.main.anchor, r = nu(i, s, t.node), o = r ? e.doc.sliceString(r.from, r.to) : null, l = ci(t.node);
  return {
    view: n,
    state: e,
    node: t.node,
    field: o,
    condition: l
  };
}
function Ex({ view: n, view: { state: e } }) {
  const [t, i] = lx(!1), s = e.field(Ml), r = e.field(Gl);
  if (!s)
    return null;
  if (!r)
    return /* @__PURE__ */ K("p", { className: "flex items-center gap-2 text-base-content/70", children: [
      /* @__PURE__ */ K("span", { className: "loading loading-spinner loading-sm" }),
      ye("Loading suggestions...")
    ] });
  const o = Rx(n);
  if (!o) return null;
  const l = Ox(o), a = l.filter((g) => g.type === "transform"), h = l.filter((g) => g.type !== "transform"), c = (g) => (y) => {
    y.preventDefault(), n.dispatch(Cx(o, g)), n.focus();
  }, f = re(e), u = e.selection.main.anchor, d = nu(f, u, s.node), p = d ? e.doc.sliceString(d.from, d.to) : "*", m = r[p] ?? r["*"];
  return /* @__PURE__ */ K("div", { className: "card space-y-3", children: [
    /* @__PURE__ */ K("h2", { className: "divider text-sm font-semibold text-base-content/70", children: m?.title || ye("Narrow your search") }),
    m?.description && /* @__PURE__ */ K("p", { className: "text-sm text-base-content/60 mb-2", children: m.description }),
    h.length > 0 && /* @__PURE__ */ K("ul", { className: "grid gap-2", children: h.map((g) => /* @__PURE__ */ K("li", { className: "contents", children: /* @__PURE__ */ K("button", { className: "btn justify-start", onClick: c(g), children: [
      /* @__PURE__ */ K("span", { className: "font-medium font-mono text-primary", children: g.label }),
      /* @__PURE__ */ K("span", { className: "text-base-content/60 text-xs", children: [
        g.description,
        t && /* @__PURE__ */ K("span", { className: "badge badge-ghost badge-xs ml-1", children: g.type })
      ] })
    ] }) }, g.id)) }),
    a.length > 0 && /* @__PURE__ */ K("div", { className: "mt-4", children: [
      /* @__PURE__ */ K("h3", { className: "divider text-xs text-base-content/50", children: ye("Condition modifiers") }),
      /* @__PURE__ */ K("div", { className: "flex gap-2", children: a.map((g) => {
        const y = g.id === "negate" && o.condition?.name === "ExcludeCondition" || g.id === "disable" && o.condition?.name === "IgnoredCondition";
        return /* @__PURE__ */ K(
          "button",
          {
            className: `btn btn-sm flex-1 ${y ? "btn-active" : ""}`,
            onClick: c(g),
            title: g.description,
            children: [
              /* @__PURE__ */ K("span", { className: "font-mono", children: g.label }),
              /* @__PURE__ */ K("span", { className: "text-xs", children: g.description })
            ]
          },
          g.id
        );
      }) })
    ] }),
    /* @__PURE__ */ K("div", { className: "flex justify-end items-center gap-2", children: /* @__PURE__ */ K("label", { className: "label cursor-pointer gap-2", children: [
      /* @__PURE__ */ K("span", { className: "label-text text-xs text-base-content/50", children: ye("Debug") }),
      /* @__PURE__ */ K(
        "input",
        {
          type: "checkbox",
          className: "toggle toggle-xs",
          checked: t,
          onChange: () => i((g) => !g)
        }
      )
    ] }) }),
    t && /* @__PURE__ */ K("div", { className: "mockup-code mt-3 text-xs", children: /* @__PURE__ */ K("pre", { children: /* @__PURE__ */ K("code", { children: `${d?.name || ""}<${p}> + Node(${s.node.type.name}<${e.doc.sliceString(
      s.node.from,
      s.node.to
    )}>)` }) }) }),
    t && /* @__PURE__ */ K("div", { className: "collapse collapse-arrow bg-base-200 mt-2", children: [
      /* @__PURE__ */ K("input", { type: "checkbox" }),
      /* @__PURE__ */ K("div", { className: "collapse-title text-xs py-2 min-h-0", children: "full state" }),
      /* @__PURE__ */ K(
        "div",
        {
          className: "collapse-content text-xs",
          dangerouslySetInnerHTML: { __html: _x(n.state) }
        }
      )
    ] })
  ] });
}
const nl = (n) => {
  throw new Error(n);
}, Kl = J.define(), Gl = Me.define({
  create: () => ({}),
  update: (n, e) => {
    for (const t of e.effects)
      if (t.is(Kl))
        return t.value;
    return n;
  }
}), Dx = Kl, Mx = it.fromClass(
  class {
    #e;
    constructor(n) {
      this.#e = document.querySelector(`[for="${n.dom.parentElement?.id}"]`) || nl("no suggestion container found");
      const e = this.#e.getAttribute("endpoint");
      e && this.fetchSuggestions(n, e);
    }
    fetchSuggestions(n, e) {
      Z.get(e).then(({ data: t }) => {
        n.dispatch({
          effects: Kl.of(t)
        });
      }).catch(console.error);
    }
    update(n) {
      R1(/* @__PURE__ */ K(Ex, { view: n.view }), this.#e);
    }
  },
  {
    // @ts-ignore
    provide: (n) => [Gl, n]
  }
), Px = nr.define([
  { tag: Re.Condition, class: "cnd" },
  { tag: Re.Operator, class: "cnd-op" },
  { tag: Re.Value, class: "cnd-val" },
  { tag: Re.Command, class: "cnd-val cnd-cmd" },
  { tag: Re.Field, class: "cnd-fld" },
  { tag: Re.Regex, class: "cnd-val cnd-rgx cnd-rgx-f" },
  { tag: P.string, class: "string" },
  { tag: P.lineComment, class: "comment" }
]), Bx = (n) => {
  let e;
  return n === "ExcludeCondition" && (e = te.mark({ class: "condition condition--exclude" })), n === "IgnoredCondition" && (e = te.mark({ class: "condition condition--ignored" })), e = e || te.mark({
    class: "condition"
  }), e;
}, Nx = () => te.mark({
  class: "query"
}), uc = (n) => {
  const e = [];
  for (const { from: t, to: i } of n.visibleRanges)
    re(n.state).iterate({
      from: t,
      to: i,
      enter: (s) => {
        s.name === "Query" && e.push(Nx().range(s.from, s.to)), yy(s.name) && e.push(Bx(s.name).range(s.from, s.to));
      }
    });
  return te.set(e);
};
it.fromClass(
  class {
    decorations;
    constructor(n) {
      this.decorations = uc(n);
    }
    update(n) {
      (n.docChanged || n.viewportChanged || re(n.startState) != re(n.state)) && (this.decorations = uc(n.view));
    }
  },
  {
    decorations: (n) => n.decorations
  }
);
const Ix = gy.configure({
  props: [
    Pf({
      "Condition/:": Re.Operator,
      "ExcludeCondition/:": Re.Operator,
      "Condition/Field/...": Re.Field,
      "Condition/Predicate/RegexContent!": Re.RegexContent,
      "Command!": Re.Command,
      "Separator!": Re.Operator,
      Regex: Re.Regex,
      // "Condition/Predicate/...": condition.Predicate,
      Comment: P.lineComment,
      Field: Re.Field,
      "Value!": Re.Value
    }),
    Lf.add({
      Query: (n) => n.column(n.node.from) + n.unit
    }),
    Og.add({
      Query: _g
    })
  ]
}), Ed = Ds.define({
  parser: Ix,
  languageData: {
    // commentTokens: { line: "" },
  }
});
function Lx() {
  return new gg(Ed, [
    Eg(Px),
    Fx
    // linter(lintExample),
  ]);
}
const Jl = J.define(), Dd = Me.define({
  create: () => ({ fields: [] }),
  update: (n, e) => {
    for (const t of e.effects)
      if (t.is(Jl))
        return t.value;
    return n;
  }
}), $x = it.fromClass(
  class {
    constructor(n) {
      const t = n.state.facet(Uu)[0]?.autocompletionsEndpoint;
      t && this.fetchSchema(n, t);
    }
    fetchSchema(n, e) {
      Z.get(e).then(({ data: t }) => {
        n.dispatch({
          effects: Jl.of(t)
        });
      }).catch(console.error);
    }
    update() {
    }
  }
), Fx = Ed.data.of({
  autocomplete: (n) => {
    const t = re(n.state).resolveInner(n.pos, -1), i = n.state.sliceDoc(t.from, n.pos), s = /[\w.]*$/.exec(i);
    if (!s && !n.explicit) return null;
    const r = s ? t.from + s.index : n.pos, o = n.state.field(Dd, !1), l = Mn("Condition", t), a = l?.getChild("Field"), h = l?.getChild(":");
    if (a && h && n.pos > h.to) {
      const c = n.state.doc.sliceString(a.from, a.to), f = o?.values?.[c];
      if (f?.length) {
        const u = f.map((d) => ({
          label: d,
          type: "value"
        }));
        return {
          from: r,
          options: u
        };
      }
    }
    if (t.name === "Field" && o?.fields?.length) {
      const c = o.fields.map((f) => ({
        label: f.label,
        type: f.type,
        info: f.info
      }));
      return {
        from: r,
        options: c
      };
    }
    return t.name === "Field" ? {
      from: r,
      options: []
    } : null;
  }
}), zx = (n) => n ? tr.of([{
  key: "Ctrl-Enter",
  mac: "Cmd-Enter",
  run: () => (n(), !0)
}]) : [], Hx = (n, e) => new N({
  extensions: [
    S1(),
    Lx(),
    Uu.of(e),
    Ml,
    Dd,
    e.autocompletionsEndpoint ? $x : [],
    e.suggestions ? Mx : [],
    Xm(e.onUpdate),
    zx(e.onSubmit)
  ],
  parent: n,
  doc: e.value
});
class Wx extends HTMLElement {
  static formAssociated = !0;
  static observedAttributes = ["value", "autocompletions", "suggestions", "locale"];
  #e = "";
  #n;
  #t;
  #i;
  editor;
  constructor() {
    super(), this.#i = this.attachInternals();
  }
  connectedCallback() {
    if (this.editor) return;
    this.#e = this.getAttribute("value") || "", this.#n = this.getAttribute("endpoint") || nl("endpoint is required on dequel-editor"), this.#t = this.getAttribute("autocompletions") || "";
    const e = fc(this.getAttribute("locale"));
    e !== "en" && Xl(/* @__PURE__ */ Object.assign({ "./locales/de.json": () => import("./de-ChXK8h97.js") }), `./locales/${e}.json`, 3).then((i) => cc(i.default)).catch(() => console.warn(`[dequel-editor] No translations for locale: ${e}`));
    const t = !!document.querySelector(`[for="${this.id}"]`);
    this.editor = Hx(this, {
      value: this.value,
      completionEndpoint: this.#n,
      autocompletionsEndpoint: this.#t || void 0,
      suggestions: t,
      onUpdate: (i) => {
        this.#e = i, this.dispatchEvent(new CustomEvent("input", { bubbles: !0, detail: i }));
      },
      onSubmit: () => {
        this.form?.requestSubmit();
      }
    });
  }
  get value() {
    return this.#e;
  }
  set value(e) {
    this.#e = e, this.#i.setFormValue(e);
  }
  attributeChangedCallback(e, t, i) {
    switch (e) {
      case "value": {
        this.value = i;
        break;
      }
      case "autocompletions": {
        this.#t = i, this.editor && i && this.fetchCompletions(i);
        break;
      }
      case "suggestions": {
        this.editor && i && this.fetchSuggestions(i);
        break;
      }
      case "locale": {
        const s = fc(i);
        s !== "en" && Xl(/* @__PURE__ */ Object.assign({ "./locales/de.json": () => import("./de-ChXK8h97.js") }), `./locales/${s}.json`, 3).then((r) => cc(r.default)).catch(() => console.warn(`[dequel-editor] No translations for locale: ${s}`));
        break;
      }
    }
  }
  fetchCompletions(e) {
    Z.get(e).then(({ data: t }) => {
      this.editor?.dispatch({
        effects: Jl.of(t)
      });
    }).catch(console.error);
  }
  fetchSuggestions(e) {
    Z.get(e).then(({ data: t }) => {
      this.editor?.dispatch({
        effects: Dx.of(t)
      });
    }).catch(console.error);
  }
  get form() {
    return this.#i.form;
  }
  get name() {
    return this.getAttribute("name") || nl("name is a required on dequel-editor");
  }
  get type() {
    return this.localName;
  }
}
customElements.get("dequel-editor") || customElements.define("dequel-editor", Wx);
export {
  Wx as DequelEditorElement
};
