var gi = Object.defineProperty;
var Ys = (s, t) => {
    for (var e in t) gi(s, e, { get: t[e], enumerable: !0 });
};
var Zs = '3.7.8',
    wi = Zs,
    De = typeof Buffer == 'function',
    Gs = typeof TextDecoder == 'function' ? new TextDecoder() : void 0,
    Ws = typeof TextEncoder == 'function' ? new TextEncoder() : void 0,
    bi = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    nt = Array.prototype.slice.call(bi),
    _t = ((s) => {
        let t = {};
        return (s.forEach((e, n) => (t[e] = n)), t);
    })(nt),
    ki = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
    Z = String.fromCharCode.bind(String),
    Qs = typeof Uint8Array.from == 'function' ? Uint8Array.from.bind(Uint8Array) : (s) => new Uint8Array(Array.prototype.slice.call(s, 0)),
    xs = (s) => s.replace(/=/g, '').replace(/[+\/]/g, (t) => (t == '+' ? '-' : '_')),
    en = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, ''),
    tn = (s) => {
        let t,
            e,
            n,
            i,
            r = '',
            l = s.length % 3;
        for (let c = 0; c < s.length; ) {
            if ((e = s.charCodeAt(c++)) > 255 || (n = s.charCodeAt(c++)) > 255 || (i = s.charCodeAt(c++)) > 255)
                throw new TypeError('invalid character found');
            ((t = (e << 16) | (n << 8) | i), (r += nt[(t >> 18) & 63] + nt[(t >> 12) & 63] + nt[(t >> 6) & 63] + nt[t & 63]));
        }
        return l ? r.slice(0, l - 3) + '==='.substring(l) : r;
    },
    ds = typeof btoa == 'function' ? (s) => btoa(s) : De ? (s) => Buffer.from(s, 'binary').toString('base64') : tn,
    fs = De
        ? (s) => Buffer.from(s).toString('base64')
        : (s) => {
              let e = [];
              for (let n = 0, i = s.length; n < i; n += 4096) e.push(Z.apply(null, s.subarray(n, n + 4096)));
              return ds(e.join(''));
          },
    yt = (s, t = !1) => (t ? xs(fs(s)) : fs(s)),
    vi = (s) => {
        if (s.length < 2) {
            var t = s.charCodeAt(0);
            return t < 128
                ? s
                : t < 2048
                  ? Z(192 | (t >>> 6)) + Z(128 | (t & 63))
                  : Z(224 | ((t >>> 12) & 15)) + Z(128 | ((t >>> 6) & 63)) + Z(128 | (t & 63));
        } else {
            var t = 65536 + (s.charCodeAt(0) - 55296) * 1024 + (s.charCodeAt(1) - 56320);
            return Z(240 | ((t >>> 18) & 7)) + Z(128 | ((t >>> 12) & 63)) + Z(128 | ((t >>> 6) & 63)) + Z(128 | (t & 63));
        }
    },
    $i = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
    sn = (s) => s.replace($i, vi),
    zs = De ? (s) => Buffer.from(s, 'utf8').toString('base64') : Ws ? (s) => fs(Ws.encode(s)) : (s) => ds(sn(s)),
    Me = (s, t = !1) => (t ? xs(zs(s)) : zs(s)),
    Xs = (s) => Me(s, !0),
    _i = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
    yi = (s) => {
        switch (s.length) {
            case 4:
                var t = ((7 & s.charCodeAt(0)) << 18) | ((63 & s.charCodeAt(1)) << 12) | ((63 & s.charCodeAt(2)) << 6) | (63 & s.charCodeAt(3)),
                    e = t - 65536;
                return Z((e >>> 10) + 55296) + Z((e & 1023) + 56320);
            case 3:
                return Z(((15 & s.charCodeAt(0)) << 12) | ((63 & s.charCodeAt(1)) << 6) | (63 & s.charCodeAt(2)));
            default:
                return Z(((31 & s.charCodeAt(0)) << 6) | (63 & s.charCodeAt(1)));
        }
    },
    nn = (s) => s.replace(_i, yi),
    rn = (s) => {
        if (((s = s.replace(/\s+/g, '')), !ki.test(s))) throw new TypeError('malformed base64.');
        s += '=='.slice(2 - (s.length & 3));
        let t,
            e,
            n,
            i = [];
        for (let r = 0; r < s.length; )
            ((t = (_t[s.charAt(r++)] << 18) | (_t[s.charAt(r++)] << 12) | ((e = _t[s.charAt(r++)]) << 6) | (n = _t[s.charAt(r++)])),
                e === 64
                    ? i.push(Z((t >> 16) & 255))
                    : n === 64
                      ? i.push(Z((t >> 16) & 255, (t >> 8) & 255))
                      : i.push(Z((t >> 16) & 255, (t >> 8) & 255, t & 255)));
        return i.join('');
    },
    hs = typeof atob == 'function' ? (s) => atob(en(s)) : De ? (s) => Buffer.from(s, 'base64').toString('binary') : rn,
    on = De
        ? (s) => Qs(Buffer.from(s, 'base64'))
        : (s) =>
              Qs(
                  hs(s)
                      .split('')
                      .map((t) => t.charCodeAt(0))
              ),
    an = (s) => on(ln(s)),
    Si = De ? (s) => Buffer.from(s, 'base64').toString('utf8') : Gs ? (s) => Gs.decode(on(s)) : (s) => nn(hs(s)),
    ln = (s) => en(s.replace(/[-_]/g, (t) => (t == '-' ? '+' : '/'))),
    us = (s) => Si(ln(s)),
    Ai = (s) => {
        if (typeof s != 'string') return !1;
        let t = s.replace(/\s+/g, '').replace(/={0,2}$/, '');
        return !/[^\s0-9a-zA-Z\+/]/.test(t) || !/[^\s0-9a-zA-Z\-_]/.test(t);
    },
    cn = (s) => ({ value: s, enumerable: !1, writable: !0, configurable: !0 }),
    fn = function () {
        let s = (t, e) => Object.defineProperty(String.prototype, t, cn(e));
        (s('fromBase64', function () {
            return us(this);
        }),
            s('toBase64', function (t) {
                return Me(this, t);
            }),
            s('toBase64URI', function () {
                return Me(this, !0);
            }),
            s('toBase64URL', function () {
                return Me(this, !0);
            }),
            s('toUint8Array', function () {
                return an(this);
            }));
    },
    un = function () {
        let s = (t, e) => Object.defineProperty(Uint8Array.prototype, t, cn(e));
        (s('toBase64', function (t) {
            return yt(this, t);
        }),
            s('toBase64URI', function () {
                return yt(this, !0);
            }),
            s('toBase64URL', function () {
                return yt(this, !0);
            }));
    },
    Ii = () => {
        (fn(), un());
    },
    V = {
        version: Zs,
        VERSION: wi,
        atob: hs,
        atobPolyfill: rn,
        btoa: ds,
        btoaPolyfill: tn,
        fromBase64: us,
        toBase64: Me,
        encode: Me,
        encodeURI: Xs,
        encodeURL: Xs,
        utob: sn,
        btou: nn,
        decode: us,
        isValid: Ai,
        fromUint8Array: yt,
        toUint8Array: an,
        extendString: fn,
        extendUint8Array: un,
        extendBuiltins: Ii,
    };
var Ks = {};
Ys(Ks, {
    Alias: () => ke,
    CST: () => Ms,
    Composer: () => je,
    Document: () => $e,
    Lexer: () => et,
    LineCounter: () => tt,
    Pair: () => Y,
    Parser: () => Be,
    Scalar: () => R,
    Schema: () => Qe,
    YAMLError: () => Xe,
    YAMLMap: () => G,
    YAMLParseError: () => oe,
    YAMLSeq: () => x,
    YAMLWarning: () => Ze,
    isAlias: () => re,
    isCollection: () => F,
    isDocument: () => ae,
    isMap: () => le,
    isNode: () => D,
    isPair: () => B,
    isScalar: () => U,
    isSeq: () => ce,
    parse: () => oi,
    parseAllDocuments: () => ri,
    parseDocument: () => Fs,
    stringify: () => ai,
    visit: () => de,
    visitAsync: () => it,
});
var St = Symbol.for('yaml.alias'),
    At = Symbol.for('yaml.document'),
    ue = Symbol.for('yaml.map'),
    ps = Symbol.for('yaml.pair'),
    ie = Symbol.for('yaml.scalar'),
    Se = Symbol.for('yaml.seq'),
    te = Symbol.for('yaml.node.type'),
    re = (s) => !!s && typeof s == 'object' && s[te] === St,
    ae = (s) => !!s && typeof s == 'object' && s[te] === At,
    le = (s) => !!s && typeof s == 'object' && s[te] === ue,
    B = (s) => !!s && typeof s == 'object' && s[te] === ps,
    U = (s) => !!s && typeof s == 'object' && s[te] === ie,
    ce = (s) => !!s && typeof s == 'object' && s[te] === Se;
function F(s) {
    if (s && typeof s == 'object')
        switch (s[te]) {
            case ue:
            case Se:
                return !0;
        }
    return !1;
}
function D(s) {
    if (s && typeof s == 'object')
        switch (s[te]) {
            case St:
            case ue:
            case ie:
            case Se:
                return !0;
        }
    return !1;
}
var It = (s) => (U(s) || F(s)) && !!s.anchor;
var ne = Symbol('break visit'),
    dn = Symbol('skip children'),
    we = Symbol('remove node');
function de(s, t) {
    let e = hn(t);
    ae(s) ? Fe(null, s.contents, e, Object.freeze([s])) === we && (s.contents = null) : Fe(null, s, e, Object.freeze([]));
}
de.BREAK = ne;
de.SKIP = dn;
de.REMOVE = we;
function Fe(s, t, e, n) {
    let i = pn(s, t, e, n);
    if (D(i) || B(i)) return (mn(s, n, i), Fe(s, i, e, n));
    if (typeof i != 'symbol') {
        if (F(t)) {
            n = Object.freeze(n.concat(t));
            for (let r = 0; r < t.items.length; ++r) {
                let l = Fe(r, t.items[r], e, n);
                if (typeof l == 'number') r = l - 1;
                else {
                    if (l === ne) return ne;
                    l === we && (t.items.splice(r, 1), (r -= 1));
                }
            }
        } else if (B(t)) {
            n = Object.freeze(n.concat(t));
            let r = Fe('key', t.key, e, n);
            if (r === ne) return ne;
            r === we && (t.key = null);
            let l = Fe('value', t.value, e, n);
            if (l === ne) return ne;
            l === we && (t.value = null);
        }
    }
    return i;
}
async function it(s, t) {
    let e = hn(t);
    ae(s) ? (await Ke(null, s.contents, e, Object.freeze([s]))) === we && (s.contents = null) : await Ke(null, s, e, Object.freeze([]));
}
it.BREAK = ne;
it.SKIP = dn;
it.REMOVE = we;
async function Ke(s, t, e, n) {
    let i = await pn(s, t, e, n);
    if (D(i) || B(i)) return (mn(s, n, i), Ke(s, i, e, n));
    if (typeof i != 'symbol') {
        if (F(t)) {
            n = Object.freeze(n.concat(t));
            for (let r = 0; r < t.items.length; ++r) {
                let l = await Ke(r, t.items[r], e, n);
                if (typeof l == 'number') r = l - 1;
                else {
                    if (l === ne) return ne;
                    l === we && (t.items.splice(r, 1), (r -= 1));
                }
            }
        } else if (B(t)) {
            n = Object.freeze(n.concat(t));
            let r = await Ke('key', t.key, e, n);
            if (r === ne) return ne;
            r === we && (t.key = null);
            let l = await Ke('value', t.value, e, n);
            if (l === ne) return ne;
            l === we && (t.value = null);
        }
    }
    return i;
}
function hn(s) {
    return typeof s == 'object' && (s.Collection || s.Node || s.Value)
        ? Object.assign(
              { Alias: s.Node, Map: s.Node, Scalar: s.Node, Seq: s.Node },
              s.Value && { Map: s.Value, Scalar: s.Value, Seq: s.Value },
              s.Collection && { Map: s.Collection, Seq: s.Collection },
              s
          )
        : s;
}
function pn(s, t, e, n) {
    if (typeof e == 'function') return e(s, t, n);
    if (le(t)) return e.Map?.(s, t, n);
    if (ce(t)) return e.Seq?.(s, t, n);
    if (B(t)) return e.Pair?.(s, t, n);
    if (U(t)) return e.Scalar?.(s, t, n);
    if (re(t)) return e.Alias?.(s, t, n);
}
function mn(s, t, e) {
    let n = t[t.length - 1];
    if (F(n)) n.items[s] = e;
    else if (B(n)) s === 'key' ? (n.key = e) : (n.value = e);
    else if (ae(n)) n.contents = e;
    else {
        let i = re(n) ? 'alias' : 'scalar';
        throw new Error(`Cannot replace node with ${i} parent`);
    }
}
var Ni = { '!': '%21', ',': '%2C', '[': '%5B', ']': '%5D', '{': '%7B', '}': '%7D' },
    Oi = (s) => s.replace(/[!,[\]{}]/g, (t) => Ni[t]),
    be = class s {
        constructor(t, e) {
            ((this.docStart = null),
                (this.docEnd = !1),
                (this.yaml = Object.assign({}, s.defaultYaml, t)),
                (this.tags = Object.assign({}, s.defaultTags, e)));
        }
        clone() {
            let t = new s(this.yaml, this.tags);
            return ((t.docStart = this.docStart), t);
        }
        atDocument() {
            let t = new s(this.yaml, this.tags);
            switch (this.yaml.version) {
                case '1.1':
                    this.atNextDocument = !0;
                    break;
                case '1.2':
                    ((this.atNextDocument = !1),
                        (this.yaml = { explicit: s.defaultYaml.explicit, version: '1.2' }),
                        (this.tags = Object.assign({}, s.defaultTags)));
                    break;
            }
            return t;
        }
        add(t, e) {
            this.atNextDocument &&
                ((this.yaml = { explicit: s.defaultYaml.explicit, version: '1.1' }),
                (this.tags = Object.assign({}, s.defaultTags)),
                (this.atNextDocument = !1));
            let n = t.trim().split(/[ \t]+/),
                i = n.shift();
            switch (i) {
                case '%TAG': {
                    if (n.length !== 2 && (e(0, '%TAG directive should contain exactly two parts'), n.length < 2)) return !1;
                    let [r, l] = n;
                    return ((this.tags[r] = l), !0);
                }
                case '%YAML': {
                    if (((this.yaml.explicit = !0), n.length !== 1)) return (e(0, '%YAML directive should contain exactly one part'), !1);
                    let [r] = n;
                    if (r === '1.1' || r === '1.2') return ((this.yaml.version = r), !0);
                    {
                        let l = /^\d+\.\d+$/.test(r);
                        return (e(6, `Unsupported YAML version ${r}`, l), !1);
                    }
                }
                default:
                    return (e(0, `Unknown directive ${i}`, !0), !1);
            }
        }
        tagName(t, e) {
            if (t === '!') return '!';
            if (t[0] !== '!') return (e(`Not a valid tag: ${t}`), null);
            if (t[1] === '<') {
                let l = t.slice(2, -1);
                return l === '!' || l === '!!'
                    ? (e(`Verbatim tags aren't resolved, so ${t} is invalid.`), null)
                    : (t[t.length - 1] !== '>' && e('Verbatim tags must end with a >'), l);
            }
            let [, n, i] = t.match(/^(.*!)([^!]*)$/s);
            i || e(`The ${t} tag has no suffix`);
            let r = this.tags[n];
            if (r)
                try {
                    return r + decodeURIComponent(i);
                } catch (l) {
                    return (e(String(l)), null);
                }
            return n === '!' ? t : (e(`Could not resolve tag: ${t}`), null);
        }
        tagString(t) {
            for (let [e, n] of Object.entries(this.tags)) if (t.startsWith(n)) return e + Oi(t.substring(n.length));
            return t[0] === '!' ? t : `!<${t}>`;
        }
        toString(t) {
            let e = this.yaml.explicit ? [`%YAML ${this.yaml.version || '1.2'}`] : [],
                n = Object.entries(this.tags),
                i;
            if (t && n.length > 0 && D(t.contents)) {
                let r = {};
                (de(t.contents, (l, c) => {
                    D(c) && c.tag && (r[c.tag] = !0);
                }),
                    (i = Object.keys(r)));
            } else i = [];
            for (let [r, l] of n) (r === '!!' && l === 'tag:yaml.org,2002:') || ((!t || i.some((c) => c.startsWith(l))) && e.push(`%TAG ${r} ${l}`));
            return e.join(`
`);
        }
    };
be.defaultYaml = { explicit: !1, version: '1.2' };
be.defaultTags = { '!!': 'tag:yaml.org,2002:' };
function Nt(s) {
    if (/[\x00-\x19\s,[\]{}]/.test(s)) {
        let e = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
        throw new Error(e);
    }
    return !0;
}
function ms(s) {
    let t = new Set();
    return (
        de(s, {
            Value(e, n) {
                n.anchor && t.add(n.anchor);
            },
        }),
        t
    );
}
function gs(s, t) {
    for (let e = 1; ; ++e) {
        let n = `${s}${e}`;
        if (!t.has(n)) return n;
    }
}
function gn(s, t) {
    let e = [],
        n = new Map(),
        i = null;
    return {
        onAnchor: (r) => {
            (e.push(r), i ?? (i = ms(s)));
            let l = gs(t, i);
            return (i.add(l), l);
        },
        setAnchors: () => {
            for (let r of e) {
                let l = n.get(r);
                if (typeof l == 'object' && l.anchor && (U(l.node) || F(l.node))) l.node.anchor = l.anchor;
                else {
                    let c = new Error('Failed to resolve repeated object (this should not happen)');
                    throw ((c.source = r), c);
                }
            }
        },
        sourceObjects: n,
    };
}
function Oe(s, t, e, n) {
    if (n && typeof n == 'object')
        if (Array.isArray(n))
            for (let i = 0, r = n.length; i < r; ++i) {
                let l = n[i],
                    c = Oe(s, n, String(i), l);
                c === void 0 ? delete n[i] : c !== l && (n[i] = c);
            }
        else if (n instanceof Map)
            for (let i of Array.from(n.keys())) {
                let r = n.get(i),
                    l = Oe(s, n, i, r);
                l === void 0 ? n.delete(i) : l !== r && n.set(i, l);
            }
        else if (n instanceof Set)
            for (let i of Array.from(n)) {
                let r = Oe(s, n, i, i);
                r === void 0 ? n.delete(i) : r !== i && (n.delete(i), n.add(r));
            }
        else
            for (let [i, r] of Object.entries(n)) {
                let l = Oe(s, n, i, r);
                l === void 0 ? delete n[i] : l !== r && (n[i] = l);
            }
    return s.call(t, e, n);
}
function Q(s, t, e) {
    if (Array.isArray(s)) return s.map((n, i) => Q(n, String(i), e));
    if (s && typeof s.toJSON == 'function') {
        if (!e || !It(s)) return s.toJSON(t, e);
        let n = { aliasCount: 0, count: 1, res: void 0 };
        (e.anchors.set(s, n),
            (e.onCreate = (r) => {
                ((n.res = r), delete e.onCreate);
            }));
        let i = s.toJSON(t, e);
        return (e.onCreate && e.onCreate(i), i);
    }
    return typeof s == 'bigint' && !e?.keep ? Number(s) : s;
}
var Ce = class {
    constructor(t) {
        Object.defineProperty(this, te, { value: t });
    }
    clone() {
        let t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        return (this.range && (t.range = this.range.slice()), t);
    }
    toJS(t, { mapAsMap: e, maxAliasCount: n, onAnchor: i, reviver: r } = {}) {
        if (!ae(t)) throw new TypeError('A document argument is required');
        let l = { anchors: new Map(), doc: t, keep: !0, mapAsMap: e === !0, mapKeyWarned: !1, maxAliasCount: typeof n == 'number' ? n : 100 },
            c = Q(this, '', l);
        if (typeof i == 'function') for (let { count: o, res: u } of l.anchors.values()) i(u, o);
        return typeof r == 'function' ? Oe(r, { '': c }, '', c) : c;
    }
};
var ke = class extends Ce {
    constructor(t) {
        (super(St),
            (this.source = t),
            Object.defineProperty(this, 'tag', {
                set() {
                    throw new Error('Alias nodes cannot have tags');
                },
            }));
    }
    resolve(t, e) {
        let n;
        e?.aliasResolveCache
            ? (n = e.aliasResolveCache)
            : ((n = []),
              de(t, {
                  Node: (r, l) => {
                      (re(l) || It(l)) && n.push(l);
                  },
              }),
              e && (e.aliasResolveCache = n));
        let i;
        for (let r of n) {
            if (r === this) break;
            r.anchor === this.source && (i = r);
        }
        return i;
    }
    toJSON(t, e) {
        if (!e) return { source: this.source };
        let { anchors: n, doc: i, maxAliasCount: r } = e,
            l = this.resolve(i, e);
        if (!l) {
            let o = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new ReferenceError(o);
        }
        let c = n.get(l);
        if ((c || (Q(l, null, e), (c = n.get(l))), !c || c.res === void 0)) {
            let o = 'This should not happen: Alias anchor was not resolved?';
            throw new ReferenceError(o);
        }
        if (r >= 0 && ((c.count += 1), c.aliasCount === 0 && (c.aliasCount = Ot(i, l, n)), c.count * c.aliasCount > r)) {
            let o = 'Excessive alias count indicates a resource exhaustion attack';
            throw new ReferenceError(o);
        }
        return c.res;
    }
    toString(t, e, n) {
        let i = `*${this.source}`;
        if (t) {
            if ((Nt(this.source), t.options.verifyAliasOrder && !t.anchors.has(this.source))) {
                let r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
                throw new Error(r);
            }
            if (t.implicitKey) return `${i} `;
        }
        return i;
    }
};
function Ot(s, t, e) {
    if (re(t)) {
        let n = t.resolve(s),
            i = e && n && e.get(n);
        return i ? i.count * i.aliasCount : 0;
    } else if (F(t)) {
        let n = 0;
        for (let i of t.items) {
            let r = Ot(s, i, e);
            r > n && (n = r);
        }
        return n;
    } else if (B(t)) {
        let n = Ot(s, t.key, e),
            i = Ot(s, t.value, e);
        return Math.max(n, i);
    }
    return 1;
}
var Ct = (s) => !s || (typeof s != 'function' && typeof s != 'object'),
    R = class extends Ce {
        constructor(t) {
            (super(ie), (this.value = t));
        }
        toJSON(t, e) {
            return e?.keep ? this.value : Q(this.value, t, e);
        }
        toString() {
            return String(this.value);
        }
    };
R.BLOCK_FOLDED = 'BLOCK_FOLDED';
R.BLOCK_LITERAL = 'BLOCK_LITERAL';
R.PLAIN = 'PLAIN';
R.QUOTE_DOUBLE = 'QUOTE_DOUBLE';
R.QUOTE_SINGLE = 'QUOTE_SINGLE';
var Ci = 'tag:yaml.org,2002:';
function Ei(s, t, e) {
    if (t) {
        let n = e.filter((r) => r.tag === t),
            i = n.find((r) => !r.format) ?? n[0];
        if (!i) throw new Error(`Tag ${t} not found`);
        return i;
    }
    return e.find((n) => n.identify?.(s) && !n.format);
}
function Ae(s, t, e) {
    if ((ae(s) && (s = s.contents), D(s))) return s;
    if (B(s)) {
        let h = e.schema[ue].createNode?.(e.schema, null, e);
        return (h.items.push(s), h);
    }
    (s instanceof String || s instanceof Number || s instanceof Boolean || (typeof BigInt < 'u' && s instanceof BigInt)) && (s = s.valueOf());
    let { aliasDuplicateObjects: n, onAnchor: i, onTagObj: r, schema: l, sourceObjects: c } = e,
        o;
    if (n && s && typeof s == 'object') {
        if (((o = c.get(s)), o)) return (o.anchor ?? (o.anchor = i(s)), new ke(o.anchor));
        ((o = { anchor: null, node: null }), c.set(s, o));
    }
    t?.startsWith('!!') && (t = Ci + t.slice(2));
    let u = Ei(s, t, l.tags);
    if (!u) {
        if ((s && typeof s.toJSON == 'function' && (s = s.toJSON()), !s || typeof s != 'object')) {
            let h = new R(s);
            return (o && (o.node = h), h);
        }
        u = s instanceof Map ? l[ue] : Symbol.iterator in Object(s) ? l[Se] : l[ue];
    }
    r && (r(u), delete e.onTagObj);
    let g = u?.createNode ? u.createNode(e.schema, s, e) : typeof u?.nodeClass?.from == 'function' ? u.nodeClass.from(e.schema, s, e) : new R(s);
    return (t ? (g.tag = t) : u.default || (g.tag = u.tag), o && (o.node = g), g);
}
function rt(s, t, e) {
    let n = e;
    for (let i = t.length - 1; i >= 0; --i) {
        let r = t[i];
        if (typeof r == 'number' && Number.isInteger(r) && r >= 0) {
            let l = [];
            ((l[r] = n), (n = l));
        } else n = new Map([[r, n]]);
    }
    return Ae(n, void 0, {
        aliasDuplicateObjects: !1,
        keepUndefined: !1,
        onAnchor: () => {
            throw new Error('This should not happen, please report a bug.');
        },
        schema: s,
        sourceObjects: new Map(),
    });
}
var Ve = (s) => s == null || (typeof s == 'object' && !!s[Symbol.iterator]().next().done),
    qe = class extends Ce {
        constructor(t, e) {
            (super(t), Object.defineProperty(this, 'schema', { value: e, configurable: !0, enumerable: !1, writable: !0 }));
        }
        clone(t) {
            let e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
            return (
                t && (e.schema = t),
                (e.items = e.items.map((n) => (D(n) || B(n) ? n.clone(t) : n))),
                this.range && (e.range = this.range.slice()),
                e
            );
        }
        addIn(t, e) {
            if (Ve(t)) this.add(e);
            else {
                let [n, ...i] = t,
                    r = this.get(n, !0);
                if (F(r)) r.addIn(i, e);
                else if (r === void 0 && this.schema) this.set(n, rt(this.schema, i, e));
                else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
            }
        }
        deleteIn(t) {
            let [e, ...n] = t;
            if (n.length === 0) return this.delete(e);
            let i = this.get(e, !0);
            if (F(i)) return i.deleteIn(n);
            throw new Error(`Expected YAML collection at ${e}. Remaining path: ${n}`);
        }
        getIn(t, e) {
            let [n, ...i] = t,
                r = this.get(n, !0);
            return i.length === 0 ? (!e && U(r) ? r.value : r) : F(r) ? r.getIn(i, e) : void 0;
        }
        hasAllNullValues(t) {
            return this.items.every((e) => {
                if (!B(e)) return !1;
                let n = e.value;
                return n == null || (t && U(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag);
            });
        }
        hasIn(t) {
            let [e, ...n] = t;
            if (n.length === 0) return this.has(e);
            let i = this.get(e, !0);
            return F(i) ? i.hasIn(n) : !1;
        }
        setIn(t, e) {
            let [n, ...i] = t;
            if (i.length === 0) this.set(n, e);
            else {
                let r = this.get(n, !0);
                if (F(r)) r.setIn(i, e);
                else if (r === void 0 && this.schema) this.set(n, rt(this.schema, i, e));
                else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
            }
        }
    };
var wn = (s) => s.replace(/^(?!$)(?: $)?/gm, '#');
function fe(s, t) {
    return /^\n+$/.test(s) ? s.substring(1) : t ? s.replace(/^(?! *$)/gm, t) : s;
}
var ve = (s, t, e) =>
    s.endsWith(`
`)
        ? fe(e, t)
        : e.includes(`
`)
          ? `
` + fe(e, t)
          : (s.endsWith(' ') ? '' : ' ') + e;
var ws = 'flow',
    Et = 'block',
    ot = 'quoted';
function at(s, t, e = 'flow', { indentAtStart: n, lineWidth: i = 80, minContentWidth: r = 20, onFold: l, onOverflow: c } = {}) {
    if (!i || i < 0) return s;
    i < r && (r = 0);
    let o = Math.max(1 + r, 1 + i - t.length);
    if (s.length <= o) return s;
    let u = [],
        g = {},
        h = i - t.length;
    typeof n == 'number' && (n > i - Math.max(2, r) ? u.push(0) : (h = i - n));
    let p,
        _,
        v = !1,
        d = -1,
        m = -1,
        w = -1;
    e === Et && ((d = bn(s, d, t.length)), d !== -1 && (h = d + o));
    for (let N; (N = s[(d += 1)]); ) {
        if (e === ot && N === '\\') {
            switch (((m = d), s[d + 1])) {
                case 'x':
                    d += 3;
                    break;
                case 'u':
                    d += 5;
                    break;
                case 'U':
                    d += 9;
                    break;
                default:
                    d += 1;
            }
            w = d;
        }
        if (
            N ===
            `
`
        )
            (e === Et && (d = bn(s, d, t.length)), (h = d + t.length + o), (p = void 0));
        else {
            if (
                N === ' ' &&
                _ &&
                _ !== ' ' &&
                _ !==
                    `
` &&
                _ !== '	'
            ) {
                let $ = s[d + 1];
                $ &&
                    $ !== ' ' &&
                    $ !==
                        `
` &&
                    $ !== '	' &&
                    (p = d);
            }
            if (d >= h)
                if (p) (u.push(p), (h = p + o), (p = void 0));
                else if (e === ot) {
                    for (; _ === ' ' || _ === '	'; ) ((_ = N), (N = s[(d += 1)]), (v = !0));
                    let $ = d > w + 1 ? d - 2 : m - 1;
                    if (g[$]) return s;
                    (u.push($), (g[$] = !0), (h = $ + o), (p = void 0));
                } else v = !0;
        }
        _ = N;
    }
    if ((v && c && c(), u.length === 0)) return s;
    l && l();
    let y = s.slice(0, u[0]);
    for (let N = 0; N < u.length; ++N) {
        let $ = u[N],
            I = u[N + 1] || s.length;
        $ === 0
            ? (y = `
${t}${s.slice(0, I)}`)
            : (e === ot && g[$] && (y += `${s[$]}\\`),
              (y += `
${t}${s.slice($ + 1, I)}`));
    }
    return y;
}
function bn(s, t, e) {
    let n = t,
        i = t + 1,
        r = s[i];
    for (; r === ' ' || r === '	'; )
        if (t < i + e) r = s[++t];
        else {
            do r = s[++t];
            while (
                r &&
                r !==
                    `
`
            );
            ((n = t), (i = t + 1), (r = s[i]));
        }
    return n;
}
var Lt = (s, t) => ({
        indentAtStart: t ? s.indent.length : s.indentAtStart,
        lineWidth: s.options.lineWidth,
        minContentWidth: s.options.minContentWidth,
    }),
    Rt = (s) => /^(%|---|\.\.\.)/m.test(s);
function Ti(s, t, e) {
    if (!t || t < 0) return !1;
    let n = t - e,
        i = s.length;
    if (i <= n) return !1;
    for (let r = 0, l = 0; r < i; ++r)
        if (
            s[r] ===
            `
`
        ) {
            if (r - l > n) return !0;
            if (((l = r + 1), i - l <= n)) return !1;
        }
    return !0;
}
function lt(s, t) {
    let e = JSON.stringify(s);
    if (t.options.doubleQuotedAsJSON) return e;
    let { implicitKey: n } = t,
        i = t.options.doubleQuotedMinMultiLineLength,
        r = t.indent || (Rt(s) ? '  ' : ''),
        l = '',
        c = 0;
    for (let o = 0, u = e[o]; u; u = e[++o])
        if ((u === ' ' && e[o + 1] === '\\' && e[o + 2] === 'n' && ((l += e.slice(c, o) + '\\ '), (o += 1), (c = o), (u = '\\')), u === '\\'))
            switch (e[o + 1]) {
                case 'u':
                    {
                        l += e.slice(c, o);
                        let g = e.substr(o + 2, 4);
                        switch (g) {
                            case '0000':
                                l += '\\0';
                                break;
                            case '0007':
                                l += '\\a';
                                break;
                            case '000b':
                                l += '\\v';
                                break;
                            case '001b':
                                l += '\\e';
                                break;
                            case '0085':
                                l += '\\N';
                                break;
                            case '00a0':
                                l += '\\_';
                                break;
                            case '2028':
                                l += '\\L';
                                break;
                            case '2029':
                                l += '\\P';
                                break;
                            default:
                                g.substr(0, 2) === '00' ? (l += '\\x' + g.substr(2)) : (l += e.substr(o, 6));
                        }
                        ((o += 5), (c = o + 1));
                    }
                    break;
                case 'n':
                    if (n || e[o + 2] === '"' || e.length < i) o += 1;
                    else {
                        for (
                            l +=
                                e.slice(c, o) +
                                `

`;
                            e[o + 2] === '\\' && e[o + 3] === 'n' && e[o + 4] !== '"';

                        )
                            ((l += `
`),
                                (o += 2));
                        ((l += r), e[o + 2] === ' ' && (l += '\\'), (o += 1), (c = o + 1));
                    }
                    break;
                default:
                    o += 1;
            }
    return ((l = c ? l + e.slice(c) : e), n ? l : at(l, r, ot, Lt(t, !1)));
}
function bs(s, t) {
    if (
        t.options.singleQuote === !1 ||
        (t.implicitKey &&
            s.includes(`
`)) ||
        /[ \t]\n|\n[ \t]/.test(s)
    )
        return lt(s, t);
    let e = t.indent || (Rt(s) ? '  ' : ''),
        n =
            "'" +
            s.replace(/'/g, "''").replace(
                /\n+/g,
                `$&
${e}`
            ) +
            "'";
    return t.implicitKey ? n : at(n, e, ws, Lt(t, !1));
}
function He(s, t) {
    let { singleQuote: e } = t.options,
        n;
    if (e === !1) n = lt;
    else {
        let i = s.includes('"'),
            r = s.includes("'");
        i && !r ? (n = bs) : r && !i ? (n = lt) : (n = e ? bs : lt);
    }
    return n(s, t);
}
var ks;
try {
    ks = new RegExp(
        `(^|(?<!
))
+(?!
|$)`,
        'g'
    );
} catch {
    ks = /\n+(?!\n|$)/g;
}
function Tt({ comment: s, type: t, value: e }, n, i, r) {
    let { blockQuote: l, commentString: c, lineWidth: o } = n.options;
    if (!l || /\n[\t ]+$/.test(e)) return He(e, n);
    let u = n.indent || (n.forceBlockIndent || Rt(e) ? '  ' : ''),
        g = l === 'literal' ? !0 : l === 'folded' || t === R.BLOCK_FOLDED ? !1 : t === R.BLOCK_LITERAL ? !0 : !Ti(e, o, u.length);
    if (!e)
        return g
            ? `|
`
            : `>
`;
    let h, p;
    for (p = e.length; p > 0; --p) {
        let I = e[p - 1];
        if (
            I !==
                `
` &&
            I !== '	' &&
            I !== ' '
        )
            break;
    }
    let _ = e.substring(p),
        v = _.indexOf(`
`);
    (v === -1 ? (h = '-') : e === _ || v !== _.length - 1 ? ((h = '+'), r && r()) : (h = ''),
        _ &&
            ((e = e.slice(0, -_.length)),
            _[_.length - 1] ===
                `
` && (_ = _.slice(0, -1)),
            (_ = _.replace(ks, `$&${u}`))));
    let d = !1,
        m,
        w = -1;
    for (m = 0; m < e.length; ++m) {
        let I = e[m];
        if (I === ' ') d = !0;
        else if (
            I ===
            `
`
        )
            w = m;
        else break;
    }
    let y = e.substring(0, w < m ? w + 1 : m);
    y && ((e = e.substring(y.length)), (y = y.replace(/\n+/g, `$&${u}`)));
    let $ = (d ? (u ? '2' : '1') : '') + h;
    if ((s && (($ += ' ' + c(s.replace(/ ?[\r\n]+/g, ' '))), i && i()), !g)) {
        let I = e
                .replace(
                    /\n+/g,
                    `
$&`
                )
                .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, '$1$2')
                .replace(/\n+/g, `$&${u}`),
            S = !1,
            E = Lt(n, !0);
        l !== 'folded' &&
            t !== R.BLOCK_FOLDED &&
            (E.onOverflow = () => {
                S = !0;
            });
        let A = at(`${y}${I}${_}`, u, Et, E);
        if (!S)
            return `>${$}
${u}${A}`;
    }
    return (
        (e = e.replace(/\n+/g, `$&${u}`)),
        `|${$}
${u}${y}${e}${_}`
    );
}
function Li(s, t, e, n) {
    let { type: i, value: r } = s,
        { actualString: l, implicitKey: c, indent: o, indentStep: u, inFlow: g } = t;
    if (
        (c &&
            r.includes(`
`)) ||
        (g && /[[\]{},]/.test(r))
    )
        return He(r, t);
    if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
        return c ||
            g ||
            !r.includes(`
`)
            ? He(r, t)
            : Tt(s, t, e, n);
    if (
        !c &&
        !g &&
        i !== R.PLAIN &&
        r.includes(`
`)
    )
        return Tt(s, t, e, n);
    if (Rt(r)) {
        if (o === '') return ((t.forceBlockIndent = !0), Tt(s, t, e, n));
        if (c && o === u) return He(r, t);
    }
    let h = r.replace(
        /\n+/g,
        `$&
${o}`
    );
    if (l) {
        let p = (d) => d.default && d.tag !== 'tag:yaml.org,2002:str' && d.test?.test(h),
            { compat: _, tags: v } = t.doc.schema;
        if (v.some(p) || _?.some(p)) return He(r, t);
    }
    return c ? h : at(h, o, ws, Lt(t, !1));
}
function Ie(s, t, e, n) {
    let { implicitKey: i, inFlow: r } = t,
        l = typeof s.value == 'string' ? s : Object.assign({}, s, { value: String(s.value) }),
        { type: c } = s;
    c !== R.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(l.value) && (c = R.QUOTE_DOUBLE);
    let o = (g) => {
            switch (g) {
                case R.BLOCK_FOLDED:
                case R.BLOCK_LITERAL:
                    return i || r ? He(l.value, t) : Tt(l, t, e, n);
                case R.QUOTE_DOUBLE:
                    return lt(l.value, t);
                case R.QUOTE_SINGLE:
                    return bs(l.value, t);
                case R.PLAIN:
                    return Li(l, t, e, n);
                default:
                    return null;
            }
        },
        u = o(c);
    if (u === null) {
        let { defaultKeyType: g, defaultStringType: h } = t.options,
            p = (i && g) || h;
        if (((u = o(p)), u === null)) throw new Error(`Unsupported default string type ${p}`);
    }
    return u;
}
function Ut(s, t) {
    let e = Object.assign(
            {
                blockQuote: !0,
                commentString: wn,
                defaultKeyType: null,
                defaultStringType: 'PLAIN',
                directives: null,
                doubleQuotedAsJSON: !1,
                doubleQuotedMinMultiLineLength: 40,
                falseStr: 'false',
                flowCollectionPadding: !0,
                indentSeq: !0,
                lineWidth: 80,
                minContentWidth: 20,
                nullStr: 'null',
                simpleKeys: !1,
                singleQuote: null,
                trueStr: 'true',
                verifyAliasOrder: !0,
            },
            s.schema.toStringOptions,
            t
        ),
        n;
    switch (e.collectionStyle) {
        case 'block':
            n = !1;
            break;
        case 'flow':
            n = !0;
            break;
        default:
            n = null;
    }
    return {
        anchors: new Set(),
        doc: s,
        flowCollectionPadding: e.flowCollectionPadding ? ' ' : '',
        indent: '',
        indentStep: typeof e.indent == 'number' ? ' '.repeat(e.indent) : '  ',
        inFlow: n,
        options: e,
    };
}
function Ri(s, t) {
    if (t.tag) {
        let i = s.filter((r) => r.tag === t.tag);
        if (i.length > 0) return i.find((r) => r.format === t.format) ?? i[0];
    }
    let e, n;
    if (U(t)) {
        n = t.value;
        let i = s.filter((r) => r.identify?.(n));
        if (i.length > 1) {
            let r = i.filter((l) => l.test);
            r.length > 0 && (i = r);
        }
        e = i.find((r) => r.format === t.format) ?? i.find((r) => !r.format);
    } else ((n = t), (e = s.find((i) => i.nodeClass && n instanceof i.nodeClass)));
    if (!e) {
        let i = n?.constructor?.name ?? (n === null ? 'null' : typeof n);
        throw new Error(`Tag not resolved for ${i} value`);
    }
    return e;
}
function Ui(s, t, { anchors: e, doc: n }) {
    if (!n.directives) return '';
    let i = [],
        r = (U(s) || F(s)) && s.anchor;
    r && Nt(r) && (e.add(r), i.push(`&${r}`));
    let l = s.tag ?? (t.default ? null : t.tag);
    return (l && i.push(n.directives.tagString(l)), i.join(' '));
}
function Ne(s, t, e, n) {
    if (B(s)) return s.toString(t, e, n);
    if (re(s)) {
        if (t.doc.directives) return s.toString(t);
        if (t.resolvedAliases?.has(s)) throw new TypeError('Cannot stringify circular structure without alias nodes');
        (t.resolvedAliases ? t.resolvedAliases.add(s) : (t.resolvedAliases = new Set([s])), (s = s.resolve(t.doc)));
    }
    let i,
        r = D(s) ? s : t.doc.createNode(s, { onTagObj: (o) => (i = o) });
    i ?? (i = Ri(t.doc.schema.tags, r));
    let l = Ui(r, i, t);
    l.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + l.length + 1);
    let c = typeof i.stringify == 'function' ? i.stringify(r, t, e, n) : U(r) ? Ie(r, t, e, n) : r.toString(t, e, n);
    return l
        ? U(r) || c[0] === '{' || c[0] === '['
            ? `${l} ${c}`
            : `${l}
${t.indent}${c}`
        : c;
}
function kn({ key: s, value: t }, e, n, i) {
    let {
            allNullValues: r,
            doc: l,
            indent: c,
            indentStep: o,
            options: { commentString: u, indentSeq: g, simpleKeys: h },
        } = e,
        p = (D(s) && s.comment) || null;
    if (h) {
        if (p) throw new Error('With simple keys, key nodes cannot have comments');
        if (F(s) || (!D(s) && typeof s == 'object')) {
            let E = 'With simple keys, collection cannot be used as a key value';
            throw new Error(E);
        }
    }
    let _ =
        !h &&
        (!s || (p && t == null && !e.inFlow) || F(s) || (U(s) ? s.type === R.BLOCK_FOLDED || s.type === R.BLOCK_LITERAL : typeof s == 'object'));
    e = Object.assign({}, e, { allNullValues: !1, implicitKey: !_ && (h || !r), indent: c + o });
    let v = !1,
        d = !1,
        m = Ne(
            s,
            e,
            () => (v = !0),
            () => (d = !0)
        );
    if (!_ && !e.inFlow && m.length > 1024) {
        if (h) throw new Error('With simple keys, single line scalar must not span more than 1024 characters');
        _ = !0;
    }
    if (e.inFlow) {
        if (r || t == null) return (v && n && n(), m === '' ? '?' : _ ? `? ${m}` : m);
    } else if ((r && !h) || (t == null && _)) return ((m = `? ${m}`), p && !v ? (m += ve(m, e.indent, u(p))) : d && i && i(), m);
    (v && (p = null),
        _
            ? (p && (m += ve(m, e.indent, u(p))),
              (m = `? ${m}
${c}:`))
            : ((m = `${m}:`), p && (m += ve(m, e.indent, u(p)))));
    let w, y, N;
    (D(t)
        ? ((w = !!t.spaceBefore), (y = t.commentBefore), (N = t.comment))
        : ((w = !1), (y = null), (N = null), t && typeof t == 'object' && (t = l.createNode(t))),
        (e.implicitKey = !1),
        !_ && !p && U(t) && (e.indentAtStart = m.length + 1),
        (d = !1),
        !g && o.length >= 2 && !e.inFlow && !_ && ce(t) && !t.flow && !t.tag && !t.anchor && (e.indent = e.indent.substring(2)));
    let $ = !1,
        I = Ne(
            t,
            e,
            () => ($ = !0),
            () => (d = !0)
        ),
        S = ' ';
    if (p || w || y) {
        if (
            ((S = w
                ? `
`
                : ''),
            y)
        ) {
            let E = u(y);
            S += `
${fe(E, e.indent)}`;
        }
        I === '' && !e.inFlow
            ? S ===
                  `
` &&
              (S = `

`)
            : (S += `
${e.indent}`);
    } else if (!_ && F(t)) {
        let E = I[0],
            A = I.indexOf(`
`),
            O = A !== -1,
            L = e.inFlow ?? t.flow ?? t.items.length === 0;
        if (O || !L) {
            let a = !1;
            if (O && (E === '&' || E === '!')) {
                let f = I.indexOf(' ');
                (E === '&' && f !== -1 && f < A && I[f + 1] === '!' && (f = I.indexOf(' ', f + 1)), (f === -1 || A < f) && (a = !0));
            }
            a ||
                (S = `
${e.indent}`);
        }
    } else
        (I === '' ||
            I[0] ===
                `
`) &&
            (S = '');
    return ((m += S + I), e.inFlow ? $ && n && n() : N && !$ ? (m += ve(m, e.indent, u(N))) : d && i && i(), m);
}
function Pt(s, t) {
    (s === 'debug' || s === 'warn') && console.warn(t);
}
var jt = '<<',
    he = {
        identify: (s) => s === jt || (typeof s == 'symbol' && s.description === jt),
        default: 'key',
        tag: 'tag:yaml.org,2002:merge',
        test: /^<<$/,
        resolve: () => Object.assign(new R(Symbol(jt)), { addToJSMap: $s }),
        stringify: () => jt,
    },
    vn = (s, t) =>
        (he.identify(t) || (U(t) && (!t.type || t.type === R.PLAIN) && he.identify(t.value))) &&
        s?.doc.schema.tags.some((e) => e.tag === he.tag && e.default);
function $s(s, t, e) {
    if (((e = s && re(e) ? e.resolve(s.doc) : e), ce(e))) for (let n of e.items) vs(s, t, n);
    else if (Array.isArray(e)) for (let n of e) vs(s, t, n);
    else vs(s, t, e);
}
function vs(s, t, e) {
    let n = s && re(e) ? e.resolve(s.doc) : e;
    if (!le(n)) throw new Error('Merge sources must be maps or map aliases');
    let i = n.toJSON(null, s, Map);
    for (let [r, l] of i)
        t instanceof Map
            ? t.has(r) || t.set(r, l)
            : t instanceof Set
              ? t.add(r)
              : Object.prototype.hasOwnProperty.call(t, r) ||
                Object.defineProperty(t, r, { value: l, writable: !0, enumerable: !0, configurable: !0 });
    return t;
}
function Bt(s, t, { key: e, value: n }) {
    if (D(e) && e.addToJSMap) e.addToJSMap(s, t, n);
    else if (vn(s, e)) $s(s, t, n);
    else {
        let i = Q(e, '', s);
        if (t instanceof Map) t.set(i, Q(n, i, s));
        else if (t instanceof Set) t.add(i);
        else {
            let r = Pi(e, i, s),
                l = Q(n, r, s);
            r in t ? Object.defineProperty(t, r, { value: l, writable: !0, enumerable: !0, configurable: !0 }) : (t[r] = l);
        }
    }
    return t;
}
function Pi(s, t, e) {
    if (t === null) return '';
    if (typeof t != 'object') return String(t);
    if (D(s) && e?.doc) {
        let n = Ut(e.doc, {});
        n.anchors = new Set();
        for (let r of e.anchors.keys()) n.anchors.add(r.anchor);
        ((n.inFlow = !0), (n.inStringifyKey = !0));
        let i = s.toString(n);
        if (!e.mapKeyWarned) {
            let r = JSON.stringify(i);
            (r.length > 40 && (r = r.substring(0, 36) + '..."'),
                Pt(
                    e.doc.options.logLevel,
                    `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`
                ),
                (e.mapKeyWarned = !0));
        }
        return i;
    }
    return JSON.stringify(t);
}
function Je(s, t, e) {
    let n = Ae(s, void 0, e),
        i = Ae(t, void 0, e);
    return new Y(n, i);
}
var Y = class s {
    constructor(t, e = null) {
        (Object.defineProperty(this, te, { value: ps }), (this.key = t), (this.value = e));
    }
    clone(t) {
        let { key: e, value: n } = this;
        return (D(e) && (e = e.clone(t)), D(n) && (n = n.clone(t)), new s(e, n));
    }
    toJSON(t, e) {
        let n = e?.mapAsMap ? new Map() : {};
        return Bt(e, n, this);
    }
    toString(t, e, n) {
        return t?.doc ? kn(this, t, e, n) : JSON.stringify(this);
    }
};
function Dt(s, t, e) {
    return ((t.inFlow ?? s.flow) ? Bi : ji)(s, t, e);
}
function ji({ comment: s, items: t }, e, { blockItemPrefix: n, flowChars: i, itemIndent: r, onChompKeep: l, onComment: c }) {
    let {
            indent: o,
            options: { commentString: u },
        } = e,
        g = Object.assign({}, e, { indent: r, type: null }),
        h = !1,
        p = [];
    for (let v = 0; v < t.length; ++v) {
        let d = t[v],
            m = null;
        if (D(d)) (!h && d.spaceBefore && p.push(''), Mt(e, p, d.commentBefore, h), d.comment && (m = d.comment));
        else if (B(d)) {
            let y = D(d.key) ? d.key : null;
            y && (!h && y.spaceBefore && p.push(''), Mt(e, p, y.commentBefore, h));
        }
        h = !1;
        let w = Ne(
            d,
            g,
            () => (m = null),
            () => (h = !0)
        );
        (m && (w += ve(w, r, u(m))), h && m && (h = !1), p.push(n + w));
    }
    let _;
    if (p.length === 0) _ = i.start + i.end;
    else {
        _ = p[0];
        for (let v = 1; v < p.length; ++v) {
            let d = p[v];
            _ += d
                ? `
${o}${d}`
                : `
`;
        }
    }
    return (
        s
            ? ((_ +=
                  `
` + fe(u(s), o)),
              c && c())
            : h && l && l(),
        _
    );
}
function Bi({ items: s }, t, { flowChars: e, itemIndent: n }) {
    let {
        indent: i,
        indentStep: r,
        flowCollectionPadding: l,
        options: { commentString: c },
    } = t;
    n += r;
    let o = Object.assign({}, t, { indent: n, inFlow: !0, type: null }),
        u = !1,
        g = 0,
        h = [];
    for (let v = 0; v < s.length; ++v) {
        let d = s[v],
            m = null;
        if (D(d)) (d.spaceBefore && h.push(''), Mt(t, h, d.commentBefore, !1), d.comment && (m = d.comment));
        else if (B(d)) {
            let y = D(d.key) ? d.key : null;
            y && (y.spaceBefore && h.push(''), Mt(t, h, y.commentBefore, !1), y.comment && (u = !0));
            let N = D(d.value) ? d.value : null;
            N ? (N.comment && (m = N.comment), N.commentBefore && (u = !0)) : d.value == null && y?.comment && (m = y.comment);
        }
        m && (u = !0);
        let w = Ne(d, o, () => (m = null));
        (v < s.length - 1 && (w += ','),
            m && (w += ve(w, n, c(m))),
            !u &&
                (h.length > g ||
                    w.includes(`
`)) &&
                (u = !0),
            h.push(w),
            (g = h.length));
    }
    let { start: p, end: _ } = e;
    if (h.length === 0) return p + _;
    if (!u) {
        let v = h.reduce((d, m) => d + m.length + 2, 2);
        u = t.options.lineWidth > 0 && v > t.options.lineWidth;
    }
    if (u) {
        let v = p;
        for (let d of h)
            v += d
                ? `
${r}${i}${d}`
                : `
`;
        return `${v}
${i}${_}`;
    } else return `${p}${l}${h.join(' ')}${l}${_}`;
}
function Mt({ indent: s, options: { commentString: t } }, e, n, i) {
    if ((n && i && (n = n.replace(/^\n+/, '')), n)) {
        let r = fe(t(n), s);
        e.push(r.trimStart());
    }
}
function Ee(s, t) {
    let e = U(t) ? t.value : t;
    for (let n of s) if (B(n) && (n.key === t || n.key === e || (U(n.key) && n.key.value === e))) return n;
}
var G = class extends qe {
    static get tagName() {
        return 'tag:yaml.org,2002:map';
    }
    constructor(t) {
        (super(ue, t), (this.items = []));
    }
    static from(t, e, n) {
        let { keepUndefined: i, replacer: r } = n,
            l = new this(t),
            c = (o, u) => {
                if (typeof r == 'function') u = r.call(e, o, u);
                else if (Array.isArray(r) && !r.includes(o)) return;
                (u !== void 0 || i) && l.items.push(Je(o, u, n));
            };
        if (e instanceof Map) for (let [o, u] of e) c(o, u);
        else if (e && typeof e == 'object') for (let o of Object.keys(e)) c(o, e[o]);
        return (typeof t.sortMapEntries == 'function' && l.items.sort(t.sortMapEntries), l);
    }
    add(t, e) {
        let n;
        B(t) ? (n = t) : !t || typeof t != 'object' || !('key' in t) ? (n = new Y(t, t?.value)) : (n = new Y(t.key, t.value));
        let i = Ee(this.items, n.key),
            r = this.schema?.sortMapEntries;
        if (i) {
            if (!e) throw new Error(`Key ${n.key} already set`);
            U(i.value) && Ct(n.value) ? (i.value.value = n.value) : (i.value = n.value);
        } else if (r) {
            let l = this.items.findIndex((c) => r(n, c) < 0);
            l === -1 ? this.items.push(n) : this.items.splice(l, 0, n);
        } else this.items.push(n);
    }
    delete(t) {
        let e = Ee(this.items, t);
        return e ? this.items.splice(this.items.indexOf(e), 1).length > 0 : !1;
    }
    get(t, e) {
        let i = Ee(this.items, t)?.value;
        return (!e && U(i) ? i.value : i) ?? void 0;
    }
    has(t) {
        return !!Ee(this.items, t);
    }
    set(t, e) {
        this.add(new Y(t, e), !0);
    }
    toJSON(t, e, n) {
        let i = n ? new n() : e?.mapAsMap ? new Map() : {};
        e?.onCreate && e.onCreate(i);
        for (let r of this.items) Bt(e, i, r);
        return i;
    }
    toString(t, e, n) {
        if (!t) return JSON.stringify(this);
        for (let i of this.items) if (!B(i)) throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
        return (
            !t.allNullValues && this.hasAllNullValues(!1) && (t = Object.assign({}, t, { allNullValues: !0 })),
            Dt(this, t, { blockItemPrefix: '', flowChars: { start: '{', end: '}' }, itemIndent: t.indent || '', onChompKeep: n, onComment: e })
        );
    }
};
var pe = {
    collection: 'map',
    default: !0,
    nodeClass: G,
    tag: 'tag:yaml.org,2002:map',
    resolve(s, t) {
        return (le(s) || t('Expected a mapping for this tag'), s);
    },
    createNode: (s, t, e) => G.from(s, t, e),
};
var x = class extends qe {
    static get tagName() {
        return 'tag:yaml.org,2002:seq';
    }
    constructor(t) {
        (super(Se, t), (this.items = []));
    }
    add(t) {
        this.items.push(t);
    }
    delete(t) {
        let e = Ft(t);
        return typeof e != 'number' ? !1 : this.items.splice(e, 1).length > 0;
    }
    get(t, e) {
        let n = Ft(t);
        if (typeof n != 'number') return;
        let i = this.items[n];
        return !e && U(i) ? i.value : i;
    }
    has(t) {
        let e = Ft(t);
        return typeof e == 'number' && e < this.items.length;
    }
    set(t, e) {
        let n = Ft(t);
        if (typeof n != 'number') throw new Error(`Expected a valid index, not ${t}.`);
        let i = this.items[n];
        U(i) && Ct(e) ? (i.value = e) : (this.items[n] = e);
    }
    toJSON(t, e) {
        let n = [];
        e?.onCreate && e.onCreate(n);
        let i = 0;
        for (let r of this.items) n.push(Q(r, String(i++), e));
        return n;
    }
    toString(t, e, n) {
        return t
            ? Dt(this, t, {
                  blockItemPrefix: '- ',
                  flowChars: { start: '[', end: ']' },
                  itemIndent: (t.indent || '') + '  ',
                  onChompKeep: n,
                  onComment: e,
              })
            : JSON.stringify(this);
    }
    static from(t, e, n) {
        let { replacer: i } = n,
            r = new this(t);
        if (e && Symbol.iterator in Object(e)) {
            let l = 0;
            for (let c of e) {
                if (typeof i == 'function') {
                    let o = e instanceof Set ? c : String(l++);
                    c = i.call(e, o, c);
                }
                r.items.push(Ae(c, void 0, n));
            }
        }
        return r;
    }
};
function Ft(s) {
    let t = U(s) ? s.value : s;
    return (t && typeof t == 'string' && (t = Number(t)), typeof t == 'number' && Number.isInteger(t) && t >= 0 ? t : null);
}
var me = {
    collection: 'seq',
    default: !0,
    nodeClass: x,
    tag: 'tag:yaml.org,2002:seq',
    resolve(s, t) {
        return (ce(s) || t('Expected a sequence for this tag'), s);
    },
    createNode: (s, t, e) => x.from(s, t, e),
};
var Te = {
    identify: (s) => typeof s == 'string',
    default: !0,
    tag: 'tag:yaml.org,2002:str',
    resolve: (s) => s,
    stringify(s, t, e, n) {
        return ((t = Object.assign({ actualString: !0 }, t)), Ie(s, t, e, n));
    },
};
var Pe = {
    identify: (s) => s == null,
    createNode: () => new R(null),
    default: !0,
    tag: 'tag:yaml.org,2002:null',
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new R(null),
    stringify: ({ source: s }, t) => (typeof s == 'string' && Pe.test.test(s) ? s : t.options.nullStr),
};
var ct = {
    identify: (s) => typeof s == 'boolean',
    default: !0,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: (s) => new R(s[0] === 't' || s[0] === 'T'),
    stringify({ source: s, value: t }, e) {
        if (s && ct.test.test(s)) {
            let n = s[0] === 't' || s[0] === 'T';
            if (t === n) return s;
        }
        return t ? e.options.trueStr : e.options.falseStr;
    },
};
function ee({ format: s, minFractionDigits: t, tag: e, value: n }) {
    if (typeof n == 'bigint') return String(n);
    let i = typeof n == 'number' ? n : Number(n);
    if (!isFinite(i)) return isNaN(i) ? '.nan' : i < 0 ? '-.inf' : '.inf';
    let r = JSON.stringify(n);
    if (!s && t && (!e || e === 'tag:yaml.org,2002:float') && /^\d/.test(r)) {
        let l = r.indexOf('.');
        l < 0 && ((l = r.length), (r += '.'));
        let c = t - (r.length - l - 1);
        for (; c-- > 0; ) r += '0';
    }
    return r;
}
var Kt = {
        identify: (s) => typeof s == 'number',
        default: !0,
        tag: 'tag:yaml.org,2002:float',
        test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
        resolve: (s) => (s.slice(-3).toLowerCase() === 'nan' ? NaN : s[0] === '-' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY),
        stringify: ee,
    },
    qt = {
        identify: (s) => typeof s == 'number',
        default: !0,
        tag: 'tag:yaml.org,2002:float',
        format: 'EXP',
        test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
        resolve: (s) => parseFloat(s),
        stringify(s) {
            let t = Number(s.value);
            return isFinite(t) ? t.toExponential() : ee(s);
        },
    },
    Vt = {
        identify: (s) => typeof s == 'number',
        default: !0,
        tag: 'tag:yaml.org,2002:float',
        test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
        resolve(s) {
            let t = new R(parseFloat(s)),
                e = s.indexOf('.');
            return (e !== -1 && s[s.length - 1] === '0' && (t.minFractionDigits = s.length - e - 1), t);
        },
        stringify: ee,
    };
var Ht = (s) => typeof s == 'bigint' || Number.isInteger(s),
    _s = (s, t, e, { intAsBigInt: n }) => (n ? BigInt(s) : parseInt(s.substring(t), e));
function $n(s, t, e) {
    let { value: n } = s;
    return Ht(n) && n >= 0 ? e + n.toString(t) : ee(s);
}
var Jt = {
        identify: (s) => Ht(s) && s >= 0,
        default: !0,
        tag: 'tag:yaml.org,2002:int',
        format: 'OCT',
        test: /^0o[0-7]+$/,
        resolve: (s, t, e) => _s(s, 2, 8, e),
        stringify: (s) => $n(s, 8, '0o'),
    },
    Yt = { identify: Ht, default: !0, tag: 'tag:yaml.org,2002:int', test: /^[-+]?[0-9]+$/, resolve: (s, t, e) => _s(s, 0, 10, e), stringify: ee },
    Gt = {
        identify: (s) => Ht(s) && s >= 0,
        default: !0,
        tag: 'tag:yaml.org,2002:int',
        format: 'HEX',
        test: /^0x[0-9a-fA-F]+$/,
        resolve: (s, t, e) => _s(s, 2, 16, e),
        stringify: (s) => $n(s, 16, '0x'),
    };
var _n = [pe, me, Te, Pe, ct, Jt, Yt, Gt, Kt, qt, Vt];
function yn(s) {
    return typeof s == 'bigint' || Number.isInteger(s);
}
var Wt = ({ value: s }) => JSON.stringify(s),
    Mi = [
        { identify: (s) => typeof s == 'string', default: !0, tag: 'tag:yaml.org,2002:str', resolve: (s) => s, stringify: Wt },
        {
            identify: (s) => s == null,
            createNode: () => new R(null),
            default: !0,
            tag: 'tag:yaml.org,2002:null',
            test: /^null$/,
            resolve: () => null,
            stringify: Wt,
        },
        {
            identify: (s) => typeof s == 'boolean',
            default: !0,
            tag: 'tag:yaml.org,2002:bool',
            test: /^true$|^false$/,
            resolve: (s) => s === 'true',
            stringify: Wt,
        },
        {
            identify: yn,
            default: !0,
            tag: 'tag:yaml.org,2002:int',
            test: /^-?(?:0|[1-9][0-9]*)$/,
            resolve: (s, t, { intAsBigInt: e }) => (e ? BigInt(s) : parseInt(s, 10)),
            stringify: ({ value: s }) => (yn(s) ? s.toString() : JSON.stringify(s)),
        },
        {
            identify: (s) => typeof s == 'number',
            default: !0,
            tag: 'tag:yaml.org,2002:float',
            test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
            resolve: (s) => parseFloat(s),
            stringify: Wt,
        },
    ],
    Di = {
        default: !0,
        tag: '',
        test: /^/,
        resolve(s, t) {
            return (t(`Unresolved plain scalar ${JSON.stringify(s)}`), s);
        },
    },
    Sn = [pe, me].concat(Mi, Di);
var ft = {
    identify: (s) => s instanceof Uint8Array,
    default: !1,
    tag: 'tag:yaml.org,2002:binary',
    resolve(s, t) {
        if (typeof atob == 'function') {
            let e = atob(s.replace(/[\n\r]/g, '')),
                n = new Uint8Array(e.length);
            for (let i = 0; i < e.length; ++i) n[i] = e.charCodeAt(i);
            return n;
        } else return (t('This environment does not support reading binary tags; either Buffer or atob is required'), s);
    },
    stringify({ comment: s, type: t, value: e }, n, i, r) {
        if (!e) return '';
        let l = e,
            c;
        if (typeof btoa == 'function') {
            let o = '';
            for (let u = 0; u < l.length; ++u) o += String.fromCharCode(l[u]);
            c = btoa(o);
        } else throw new Error('This environment does not support writing binary tags; either Buffer or btoa is required');
        if ((t ?? (t = R.BLOCK_LITERAL), t !== R.QUOTE_DOUBLE)) {
            let o = Math.max(n.options.lineWidth - n.indent.length, n.options.minContentWidth),
                u = Math.ceil(c.length / o),
                g = new Array(u);
            for (let h = 0, p = 0; h < u; ++h, p += o) g[h] = c.substr(p, o);
            c = g.join(
                t === R.BLOCK_LITERAL
                    ? `
`
                    : ' '
            );
        }
        return Ie({ comment: s, type: t, value: c }, n, i, r);
    },
};
function ys(s, t) {
    if (ce(s))
        for (let e = 0; e < s.items.length; ++e) {
            let n = s.items[e];
            if (!B(n)) {
                if (le(n)) {
                    n.items.length > 1 && t('Each pair must have its own sequence indicator');
                    let i = n.items[0] || new Y(new R(null));
                    if (
                        (n.commentBefore &&
                            (i.key.commentBefore = i.key.commentBefore
                                ? `${n.commentBefore}
${i.key.commentBefore}`
                                : n.commentBefore),
                        n.comment)
                    ) {
                        let r = i.value ?? i.key;
                        r.comment = r.comment
                            ? `${n.comment}
${r.comment}`
                            : n.comment;
                    }
                    n = i;
                }
                s.items[e] = B(n) ? n : new Y(n);
            }
        }
    else t('Expected a sequence for this tag');
    return s;
}
function Ss(s, t, e) {
    let { replacer: n } = e,
        i = new x(s);
    i.tag = 'tag:yaml.org,2002:pairs';
    let r = 0;
    if (t && Symbol.iterator in Object(t))
        for (let l of t) {
            typeof n == 'function' && (l = n.call(t, String(r++), l));
            let c, o;
            if (Array.isArray(l))
                if (l.length === 2) ((c = l[0]), (o = l[1]));
                else throw new TypeError(`Expected [key, value] tuple: ${l}`);
            else if (l && l instanceof Object) {
                let u = Object.keys(l);
                if (u.length === 1) ((c = u[0]), (o = l[c]));
                else throw new TypeError(`Expected tuple with one key, not ${u.length} keys`);
            } else c = l;
            i.items.push(Je(c, o, e));
        }
    return i;
}
var ut = { collection: 'seq', default: !1, tag: 'tag:yaml.org,2002:pairs', resolve: ys, createNode: Ss };
var Ye = class s extends x {
    constructor() {
        (super(),
            (this.add = G.prototype.add.bind(this)),
            (this.delete = G.prototype.delete.bind(this)),
            (this.get = G.prototype.get.bind(this)),
            (this.has = G.prototype.has.bind(this)),
            (this.set = G.prototype.set.bind(this)),
            (this.tag = s.tag));
    }
    toJSON(t, e) {
        if (!e) return super.toJSON(t);
        let n = new Map();
        e?.onCreate && e.onCreate(n);
        for (let i of this.items) {
            let r, l;
            if ((B(i) ? ((r = Q(i.key, '', e)), (l = Q(i.value, r, e))) : (r = Q(i, '', e)), n.has(r)))
                throw new Error('Ordered maps must not include duplicate keys');
            n.set(r, l);
        }
        return n;
    }
    static from(t, e, n) {
        let i = Ss(t, e, n),
            r = new this();
        return ((r.items = i.items), r);
    }
};
Ye.tag = 'tag:yaml.org,2002:omap';
var dt = {
    collection: 'seq',
    identify: (s) => s instanceof Map,
    nodeClass: Ye,
    default: !1,
    tag: 'tag:yaml.org,2002:omap',
    resolve(s, t) {
        let e = ys(s, t),
            n = [];
        for (let { key: i } of e.items)
            U(i) && (n.includes(i.value) ? t(`Ordered maps must not include duplicate keys: ${i.value}`) : n.push(i.value));
        return Object.assign(new Ye(), e);
    },
    createNode: (s, t, e) => Ye.from(s, t, e),
};
function An({ value: s, source: t }, e) {
    return t && (s ? As : Is).test.test(t) ? t : s ? e.options.trueStr : e.options.falseStr;
}
var As = {
        identify: (s) => s === !0,
        default: !0,
        tag: 'tag:yaml.org,2002:bool',
        test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
        resolve: () => new R(!0),
        stringify: An,
    },
    Is = {
        identify: (s) => s === !1,
        default: !0,
        tag: 'tag:yaml.org,2002:bool',
        test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
        resolve: () => new R(!1),
        stringify: An,
    };
var In = {
        identify: (s) => typeof s == 'number',
        default: !0,
        tag: 'tag:yaml.org,2002:float',
        test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
        resolve: (s) => (s.slice(-3).toLowerCase() === 'nan' ? NaN : s[0] === '-' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY),
        stringify: ee,
    },
    Nn = {
        identify: (s) => typeof s == 'number',
        default: !0,
        tag: 'tag:yaml.org,2002:float',
        format: 'EXP',
        test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
        resolve: (s) => parseFloat(s.replace(/_/g, '')),
        stringify(s) {
            let t = Number(s.value);
            return isFinite(t) ? t.toExponential() : ee(s);
        },
    },
    On = {
        identify: (s) => typeof s == 'number',
        default: !0,
        tag: 'tag:yaml.org,2002:float',
        test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
        resolve(s) {
            let t = new R(parseFloat(s.replace(/_/g, ''))),
                e = s.indexOf('.');
            if (e !== -1) {
                let n = s.substring(e + 1).replace(/_/g, '');
                n[n.length - 1] === '0' && (t.minFractionDigits = n.length);
            }
            return t;
        },
        stringify: ee,
    };
var ht = (s) => typeof s == 'bigint' || Number.isInteger(s);
function Qt(s, t, e, { intAsBigInt: n }) {
    let i = s[0];
    if (((i === '-' || i === '+') && (t += 1), (s = s.substring(t).replace(/_/g, '')), n)) {
        switch (e) {
            case 2:
                s = `0b${s}`;
                break;
            case 8:
                s = `0o${s}`;
                break;
            case 16:
                s = `0x${s}`;
                break;
        }
        let l = BigInt(s);
        return i === '-' ? BigInt(-1) * l : l;
    }
    let r = parseInt(s, e);
    return i === '-' ? -1 * r : r;
}
function Ns(s, t, e) {
    let { value: n } = s;
    if (ht(n)) {
        let i = n.toString(t);
        return n < 0 ? '-' + e + i.substr(1) : e + i;
    }
    return ee(s);
}
var Cn = {
        identify: ht,
        default: !0,
        tag: 'tag:yaml.org,2002:int',
        format: 'BIN',
        test: /^[-+]?0b[0-1_]+$/,
        resolve: (s, t, e) => Qt(s, 2, 2, e),
        stringify: (s) => Ns(s, 2, '0b'),
    },
    En = {
        identify: ht,
        default: !0,
        tag: 'tag:yaml.org,2002:int',
        format: 'OCT',
        test: /^[-+]?0[0-7_]+$/,
        resolve: (s, t, e) => Qt(s, 1, 8, e),
        stringify: (s) => Ns(s, 8, '0'),
    },
    Tn = {
        identify: ht,
        default: !0,
        tag: 'tag:yaml.org,2002:int',
        test: /^[-+]?[0-9][0-9_]*$/,
        resolve: (s, t, e) => Qt(s, 0, 10, e),
        stringify: ee,
    },
    Ln = {
        identify: ht,
        default: !0,
        tag: 'tag:yaml.org,2002:int',
        format: 'HEX',
        test: /^[-+]?0x[0-9a-fA-F_]+$/,
        resolve: (s, t, e) => Qt(s, 2, 16, e),
        stringify: (s) => Ns(s, 16, '0x'),
    };
var Ge = class s extends G {
    constructor(t) {
        (super(t), (this.tag = s.tag));
    }
    add(t) {
        let e;
        (B(t)
            ? (e = t)
            : t && typeof t == 'object' && 'key' in t && 'value' in t && t.value === null
              ? (e = new Y(t.key, null))
              : (e = new Y(t, null)),
            Ee(this.items, e.key) || this.items.push(e));
    }
    get(t, e) {
        let n = Ee(this.items, t);
        return !e && B(n) ? (U(n.key) ? n.key.value : n.key) : n;
    }
    set(t, e) {
        if (typeof e != 'boolean') throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof e}`);
        let n = Ee(this.items, t);
        n && !e ? this.items.splice(this.items.indexOf(n), 1) : !n && e && this.items.push(new Y(t));
    }
    toJSON(t, e) {
        return super.toJSON(t, e, Set);
    }
    toString(t, e, n) {
        if (!t) return JSON.stringify(this);
        if (this.hasAllNullValues(!0)) return super.toString(Object.assign({}, t, { allNullValues: !0 }), e, n);
        throw new Error('Set items must all have null values');
    }
    static from(t, e, n) {
        let { replacer: i } = n,
            r = new this(t);
        if (e && Symbol.iterator in Object(e)) for (let l of e) (typeof i == 'function' && (l = i.call(e, l, l)), r.items.push(Je(l, null, n)));
        return r;
    }
};
Ge.tag = 'tag:yaml.org,2002:set';
var pt = {
    collection: 'map',
    identify: (s) => s instanceof Set,
    nodeClass: Ge,
    default: !1,
    tag: 'tag:yaml.org,2002:set',
    createNode: (s, t, e) => Ge.from(s, t, e),
    resolve(s, t) {
        if (le(s)) {
            if (s.hasAllNullValues(!0)) return Object.assign(new Ge(), s);
            t('Set items must all have null values');
        } else t('Expected a mapping for this tag');
        return s;
    },
};
function Os(s, t) {
    let e = s[0],
        n = e === '-' || e === '+' ? s.substring(1) : s,
        i = (l) => (t ? BigInt(l) : Number(l)),
        r = n
            .replace(/_/g, '')
            .split(':')
            .reduce((l, c) => l * i(60) + i(c), i(0));
    return e === '-' ? i(-1) * r : r;
}
function Rn(s) {
    let { value: t } = s,
        e = (l) => l;
    if (typeof t == 'bigint') e = (l) => BigInt(l);
    else if (isNaN(t) || !isFinite(t)) return ee(s);
    let n = '';
    t < 0 && ((n = '-'), (t *= e(-1)));
    let i = e(60),
        r = [t % i];
    return (
        t < 60 ? r.unshift(0) : ((t = (t - r[0]) / i), r.unshift(t % i), t >= 60 && ((t = (t - r[0]) / i), r.unshift(t))),
        n +
            r
                .map((l) => String(l).padStart(2, '0'))
                .join(':')
                .replace(/000000\d*$/, '')
    );
}
var zt = {
        identify: (s) => typeof s == 'bigint' || Number.isInteger(s),
        default: !0,
        tag: 'tag:yaml.org,2002:int',
        format: 'TIME',
        test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
        resolve: (s, t, { intAsBigInt: e }) => Os(s, e),
        stringify: Rn,
    },
    Xt = {
        identify: (s) => typeof s == 'number',
        default: !0,
        tag: 'tag:yaml.org,2002:float',
        format: 'TIME',
        test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
        resolve: (s) => Os(s, !1),
        stringify: Rn,
    },
    We = {
        identify: (s) => s instanceof Date,
        default: !0,
        tag: 'tag:yaml.org,2002:timestamp',
        test: RegExp(
            '^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$'
        ),
        resolve(s) {
            let t = s.match(We.test);
            if (!t) throw new Error('!!timestamp expects a date, starting with yyyy-mm-dd');
            let [, e, n, i, r, l, c] = t.map(Number),
                o = t[7] ? Number((t[7] + '00').substr(1, 3)) : 0,
                u = Date.UTC(e, n - 1, i, r || 0, l || 0, c || 0, o),
                g = t[8];
            if (g && g !== 'Z') {
                let h = Os(g, !1);
                (Math.abs(h) < 30 && (h *= 60), (u -= 6e4 * h));
            }
            return new Date(u);
        },
        stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, '') ?? '',
    };
var Cs = [pe, me, Te, Pe, As, Is, Cn, En, Tn, Ln, In, Nn, On, ft, he, dt, ut, pt, zt, Xt, We];
var Un = new Map([
        ['core', _n],
        ['failsafe', [pe, me, Te]],
        ['json', Sn],
        ['yaml11', Cs],
        ['yaml-1.1', Cs],
    ]),
    Pn = {
        binary: ft,
        bool: ct,
        float: Vt,
        floatExp: qt,
        floatNaN: Kt,
        floatTime: Xt,
        int: Yt,
        intHex: Gt,
        intOct: Jt,
        intTime: zt,
        map: pe,
        merge: he,
        null: Pe,
        omap: dt,
        pairs: ut,
        seq: me,
        set: pt,
        timestamp: We,
    },
    jn = {
        'tag:yaml.org,2002:binary': ft,
        'tag:yaml.org,2002:merge': he,
        'tag:yaml.org,2002:omap': dt,
        'tag:yaml.org,2002:pairs': ut,
        'tag:yaml.org,2002:set': pt,
        'tag:yaml.org,2002:timestamp': We,
    };
function Zt(s, t, e) {
    let n = Un.get(t);
    if (n && !s) return e && !n.includes(he) ? n.concat(he) : n.slice();
    let i = n;
    if (!i)
        if (Array.isArray(s)) i = [];
        else {
            let r = Array.from(Un.keys())
                .filter((l) => l !== 'yaml11')
                .map((l) => JSON.stringify(l))
                .join(', ');
            throw new Error(`Unknown schema "${t}"; use one of ${r} or define customTags array`);
        }
    if (Array.isArray(s)) for (let r of s) i = i.concat(r);
    else typeof s == 'function' && (i = s(i.slice()));
    return (
        e && (i = i.concat(he)),
        i.reduce((r, l) => {
            let c = typeof l == 'string' ? Pn[l] : l;
            if (!c) {
                let o = JSON.stringify(l),
                    u = Object.keys(Pn)
                        .map((g) => JSON.stringify(g))
                        .join(', ');
                throw new Error(`Unknown custom tag ${o}; use one of ${u}`);
            }
            return (r.includes(c) || r.push(c), r);
        }, [])
    );
}
var Fi = (s, t) => (s.key < t.key ? -1 : s.key > t.key ? 1 : 0),
    Qe = class s {
        constructor({ compat: t, customTags: e, merge: n, resolveKnownTags: i, schema: r, sortMapEntries: l, toStringDefaults: c }) {
            ((this.compat = Array.isArray(t) ? Zt(t, 'compat') : t ? Zt(null, t) : null),
                (this.name = (typeof r == 'string' && r) || 'core'),
                (this.knownTags = i ? jn : {}),
                (this.tags = Zt(e, this.name, n)),
                (this.toStringOptions = c ?? null),
                Object.defineProperty(this, ue, { value: pe }),
                Object.defineProperty(this, ie, { value: Te }),
                Object.defineProperty(this, Se, { value: me }),
                (this.sortMapEntries = typeof l == 'function' ? l : l === !0 ? Fi : null));
        }
        clone() {
            let t = Object.create(s.prototype, Object.getOwnPropertyDescriptors(this));
            return ((t.tags = this.tags.slice()), t);
        }
    };
function Bn(s, t) {
    let e = [],
        n = t.directives === !0;
    if (t.directives !== !1 && s.directives) {
        let o = s.directives.toString(s);
        o ? (e.push(o), (n = !0)) : s.directives.docStart && (n = !0);
    }
    n && e.push('---');
    let i = Ut(s, t),
        { commentString: r } = i.options;
    if (s.commentBefore) {
        e.length !== 1 && e.unshift('');
        let o = r(s.commentBefore);
        e.unshift(fe(o, ''));
    }
    let l = !1,
        c = null;
    if (s.contents) {
        if (D(s.contents)) {
            if ((s.contents.spaceBefore && n && e.push(''), s.contents.commentBefore)) {
                let g = r(s.contents.commentBefore);
                e.push(fe(g, ''));
            }
            ((i.forceBlockIndent = !!s.comment), (c = s.contents.comment));
        }
        let o = c ? void 0 : () => (l = !0),
            u = Ne(s.contents, i, () => (c = null), o);
        (c && (u += ve(u, '', r(c))), (u[0] === '|' || u[0] === '>') && e[e.length - 1] === '---' ? (e[e.length - 1] = `--- ${u}`) : e.push(u));
    } else e.push(Ne(s.contents, i));
    if (s.directives?.docEnd)
        if (s.comment) {
            let o = r(s.comment);
            o.includes(`
`)
                ? (e.push('...'), e.push(fe(o, '')))
                : e.push(`... ${o}`);
        } else e.push('...');
    else {
        let o = s.comment;
        (o && l && (o = o.replace(/^\n+/, '')), o && ((!l || c) && e[e.length - 1] !== '' && e.push(''), e.push(fe(r(o), ''))));
    }
    return (
        e.join(`
`) +
        `
`
    );
}
var $e = class s {
    constructor(t, e, n) {
        ((this.commentBefore = null),
            (this.comment = null),
            (this.errors = []),
            (this.warnings = []),
            Object.defineProperty(this, te, { value: At }));
        let i = null;
        typeof e == 'function' || Array.isArray(e) ? (i = e) : n === void 0 && e && ((n = e), (e = void 0));
        let r = Object.assign(
            { intAsBigInt: !1, keepSourceTokens: !1, logLevel: 'warn', prettyErrors: !0, strict: !0, stringKeys: !1, uniqueKeys: !0, version: '1.2' },
            n
        );
        this.options = r;
        let { version: l } = r;
        (n?._directives
            ? ((this.directives = n._directives.atDocument()), this.directives.yaml.explicit && (l = this.directives.yaml.version))
            : (this.directives = new be({ version: l })),
            this.setSchema(l, n),
            (this.contents = t === void 0 ? null : this.createNode(t, i, n)));
    }
    clone() {
        let t = Object.create(s.prototype, { [te]: { value: At } });
        return (
            (t.commentBefore = this.commentBefore),
            (t.comment = this.comment),
            (t.errors = this.errors.slice()),
            (t.warnings = this.warnings.slice()),
            (t.options = Object.assign({}, this.options)),
            this.directives && (t.directives = this.directives.clone()),
            (t.schema = this.schema.clone()),
            (t.contents = D(this.contents) ? this.contents.clone(t.schema) : this.contents),
            this.range && (t.range = this.range.slice()),
            t
        );
    }
    add(t) {
        ze(this.contents) && this.contents.add(t);
    }
    addIn(t, e) {
        ze(this.contents) && this.contents.addIn(t, e);
    }
    createAlias(t, e) {
        if (!t.anchor) {
            let n = ms(this);
            t.anchor = !e || n.has(e) ? gs(e || 'a', n) : e;
        }
        return new ke(t.anchor);
    }
    createNode(t, e, n) {
        let i;
        if (typeof e == 'function') ((t = e.call({ '': t }, '', t)), (i = e));
        else if (Array.isArray(e)) {
            let m = (y) => typeof y == 'number' || y instanceof String || y instanceof Number,
                w = e.filter(m).map(String);
            (w.length > 0 && (e = e.concat(w)), (i = e));
        } else n === void 0 && e && ((n = e), (e = void 0));
        let { aliasDuplicateObjects: r, anchorPrefix: l, flow: c, keepUndefined: o, onTagObj: u, tag: g } = n ?? {},
            { onAnchor: h, setAnchors: p, sourceObjects: _ } = gn(this, l || 'a'),
            v = {
                aliasDuplicateObjects: r ?? !0,
                keepUndefined: o ?? !1,
                onAnchor: h,
                onTagObj: u,
                replacer: i,
                schema: this.schema,
                sourceObjects: _,
            },
            d = Ae(t, g, v);
        return (c && F(d) && (d.flow = !0), p(), d);
    }
    createPair(t, e, n = {}) {
        let i = this.createNode(t, null, n),
            r = this.createNode(e, null, n);
        return new Y(i, r);
    }
    delete(t) {
        return ze(this.contents) ? this.contents.delete(t) : !1;
    }
    deleteIn(t) {
        return Ve(t) ? (this.contents == null ? !1 : ((this.contents = null), !0)) : ze(this.contents) ? this.contents.deleteIn(t) : !1;
    }
    get(t, e) {
        return F(this.contents) ? this.contents.get(t, e) : void 0;
    }
    getIn(t, e) {
        return Ve(t) ? (!e && U(this.contents) ? this.contents.value : this.contents) : F(this.contents) ? this.contents.getIn(t, e) : void 0;
    }
    has(t) {
        return F(this.contents) ? this.contents.has(t) : !1;
    }
    hasIn(t) {
        return Ve(t) ? this.contents !== void 0 : F(this.contents) ? this.contents.hasIn(t) : !1;
    }
    set(t, e) {
        this.contents == null ? (this.contents = rt(this.schema, [t], e)) : ze(this.contents) && this.contents.set(t, e);
    }
    setIn(t, e) {
        Ve(t)
            ? (this.contents = e)
            : this.contents == null
              ? (this.contents = rt(this.schema, Array.from(t), e))
              : ze(this.contents) && this.contents.setIn(t, e);
    }
    setSchema(t, e = {}) {
        typeof t == 'number' && (t = String(t));
        let n;
        switch (t) {
            case '1.1':
                (this.directives ? (this.directives.yaml.version = '1.1') : (this.directives = new be({ version: '1.1' })),
                    (n = { resolveKnownTags: !1, schema: 'yaml-1.1' }));
                break;
            case '1.2':
            case 'next':
                (this.directives ? (this.directives.yaml.version = t) : (this.directives = new be({ version: t })),
                    (n = { resolveKnownTags: !0, schema: 'core' }));
                break;
            case null:
                (this.directives && delete this.directives, (n = null));
                break;
            default: {
                let i = JSON.stringify(t);
                throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`);
            }
        }
        if (e.schema instanceof Object) this.schema = e.schema;
        else if (n) this.schema = new Qe(Object.assign(n, e));
        else throw new Error('With a null YAML version, the { schema: Schema } option is required');
    }
    toJS({ json: t, jsonArg: e, mapAsMap: n, maxAliasCount: i, onAnchor: r, reviver: l } = {}) {
        let c = { anchors: new Map(), doc: this, keep: !t, mapAsMap: n === !0, mapKeyWarned: !1, maxAliasCount: typeof i == 'number' ? i : 100 },
            o = Q(this.contents, e ?? '', c);
        if (typeof r == 'function') for (let { count: u, res: g } of c.anchors.values()) r(g, u);
        return typeof l == 'function' ? Oe(l, { '': o }, '', o) : o;
    }
    toJSON(t, e) {
        return this.toJS({ json: !0, jsonArg: t, mapAsMap: !1, onAnchor: e });
    }
    toString(t = {}) {
        if (this.errors.length > 0) throw new Error('Document with errors cannot be stringified');
        if ('indent' in t && (!Number.isInteger(t.indent) || Number(t.indent) <= 0)) {
            let e = JSON.stringify(t.indent);
            throw new Error(`"indent" option must be a positive integer, not ${e}`);
        }
        return Bn(this, t);
    }
};
function ze(s) {
    if (F(s)) return !0;
    throw new Error('Expected a YAML collection as document contents');
}
var Xe = class extends Error {
        constructor(t, e, n, i) {
            (super(), (this.name = t), (this.code = n), (this.message = i), (this.pos = e));
        }
    },
    oe = class extends Xe {
        constructor(t, e, n) {
            super('YAMLParseError', t, e, n);
        }
    },
    Ze = class extends Xe {
        constructor(t, e, n) {
            super('YAMLWarning', t, e, n);
        }
    },
    mt = (s, t) => (e) => {
        if (e.pos[0] === -1) return;
        e.linePos = e.pos.map((c) => t.linePos(c));
        let { line: n, col: i } = e.linePos[0];
        e.message += ` at line ${n}, column ${i}`;
        let r = i - 1,
            l = s.substring(t.lineStarts[n - 1], t.lineStarts[n]).replace(/[\n\r]+$/, '');
        if (r >= 60 && l.length > 80) {
            let c = Math.min(r - 39, l.length - 79);
            ((l = '\u2026' + l.substring(c)), (r -= c - 1));
        }
        if ((l.length > 80 && (l = l.substring(0, 79) + '\u2026'), n > 1 && /^ *$/.test(l.substring(0, r)))) {
            let c = s.substring(t.lineStarts[n - 2], t.lineStarts[n - 1]);
            (c.length > 80 &&
                (c =
                    c.substring(0, 79) +
                    `\u2026
`),
                (l = c + l));
        }
        if (/[^ ]/.test(l)) {
            let c = 1,
                o = e.linePos[1];
            o && o.line === n && o.col > i && (c = Math.max(1, Math.min(o.col - i, 80 - r)));
            let u = ' '.repeat(r) + '^'.repeat(c);
            e.message += `:

${l}
${u}
`;
        }
    };
function _e(s, { flow: t, indicator: e, next: n, offset: i, onError: r, parentIndent: l, startOnNewline: c }) {
    let o = !1,
        u = c,
        g = c,
        h = '',
        p = '',
        _ = !1,
        v = !1,
        d = null,
        m = null,
        w = null,
        y = null,
        N = null,
        $ = null,
        I = null;
    for (let A of s)
        switch (
            (v &&
                (A.type !== 'space' &&
                    A.type !== 'newline' &&
                    A.type !== 'comma' &&
                    r(A.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space'),
                (v = !1)),
            d && (u && A.type !== 'comment' && A.type !== 'newline' && r(d, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation'), (d = null)),
            A.type)
        ) {
            case 'space':
                (!t && (e !== 'doc-start' || n?.type !== 'flow-collection') && A.source.includes('	') && (d = A), (g = !0));
                break;
            case 'comment': {
                g || r(A, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
                let O = A.source.substring(1) || ' ';
                (h ? (h += p + O) : (h = O), (p = ''), (u = !1));
                break;
            }
            case 'newline':
                (u ? (h ? (h += A.source) : (!$ || e !== 'seq-item-ind') && (o = !0)) : (p += A.source),
                    (u = !0),
                    (_ = !0),
                    (m || w) && (y = A),
                    (g = !0));
                break;
            case 'anchor':
                (m && r(A, 'MULTIPLE_ANCHORS', 'A node can have at most one anchor'),
                    A.source.endsWith(':') && r(A.offset + A.source.length - 1, 'BAD_ALIAS', 'Anchor ending in : is ambiguous', !0),
                    (m = A),
                    I ?? (I = A.offset),
                    (u = !1),
                    (g = !1),
                    (v = !0));
                break;
            case 'tag': {
                (w && r(A, 'MULTIPLE_TAGS', 'A node can have at most one tag'), (w = A), I ?? (I = A.offset), (u = !1), (g = !1), (v = !0));
                break;
            }
            case e:
                ((m || w) && r(A, 'BAD_PROP_ORDER', `Anchors and tags must be after the ${A.source} indicator`),
                    $ && r(A, 'UNEXPECTED_TOKEN', `Unexpected ${A.source} in ${t ?? 'collection'}`),
                    ($ = A),
                    (u = e === 'seq-item-ind' || e === 'explicit-key-ind'),
                    (g = !1));
                break;
            case 'comma':
                if (t) {
                    (N && r(A, 'UNEXPECTED_TOKEN', `Unexpected , in ${t}`), (N = A), (u = !1), (g = !1));
                    break;
                }
            default:
                (r(A, 'UNEXPECTED_TOKEN', `Unexpected ${A.type} token`), (u = !1), (g = !1));
        }
    let S = s[s.length - 1],
        E = S ? S.offset + S.source.length : i;
    return (
        v &&
            n &&
            n.type !== 'space' &&
            n.type !== 'newline' &&
            n.type !== 'comma' &&
            (n.type !== 'scalar' || n.source !== '') &&
            r(n.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space'),
        d &&
            ((u && d.indent <= l) || n?.type === 'block-map' || n?.type === 'block-seq') &&
            r(d, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation'),
        { comma: N, found: $, spaceBefore: o, comment: h, hasNewline: _, anchor: m, tag: w, newlineAfterProp: y, end: E, start: I ?? E }
    );
}
function Le(s) {
    if (!s) return null;
    switch (s.type) {
        case 'alias':
        case 'scalar':
        case 'double-quoted-scalar':
        case 'single-quoted-scalar':
            if (
                s.source.includes(`
`)
            )
                return !0;
            if (s.end) {
                for (let t of s.end) if (t.type === 'newline') return !0;
            }
            return !1;
        case 'flow-collection':
            for (let t of s.items) {
                for (let e of t.start) if (e.type === 'newline') return !0;
                if (t.sep) {
                    for (let e of t.sep) if (e.type === 'newline') return !0;
                }
                if (Le(t.key) || Le(t.value)) return !0;
            }
            return !1;
        default:
            return !0;
    }
}
function gt(s, t, e) {
    if (t?.type === 'flow-collection') {
        let n = t.end[0];
        n.indent === s &&
            (n.source === ']' || n.source === '}') &&
            Le(t) &&
            e(n, 'BAD_INDENT', 'Flow end indicator should be more indented than parent', !0);
    }
}
function xt(s, t, e) {
    let { uniqueKeys: n } = s.options;
    if (n === !1) return !1;
    let i = typeof n == 'function' ? n : (r, l) => r === l || (U(r) && U(l) && r.value === l.value);
    return t.some((r) => i(r.key, e));
}
var Mn = 'All mapping items must start at the same column';
function Dn({ composeNode: s, composeEmptyNode: t }, e, n, i, r) {
    let l = r?.nodeClass ?? G,
        c = new l(e.schema);
    e.atRoot && (e.atRoot = !1);
    let o = n.offset,
        u = null;
    for (let g of n.items) {
        let { start: h, key: p, sep: _, value: v } = g,
            d = _e(h, { indicator: 'explicit-key-ind', next: p ?? _?.[0], offset: o, onError: i, parentIndent: n.indent, startOnNewline: !0 }),
            m = !d.found;
        if (m) {
            if (
                (p &&
                    (p.type === 'block-seq'
                        ? i(o, 'BLOCK_AS_IMPLICIT_KEY', 'A block sequence may not be used as an implicit map key')
                        : 'indent' in p && p.indent !== n.indent && i(o, 'BAD_INDENT', Mn)),
                !d.anchor && !d.tag && !_)
            ) {
                ((u = d.end),
                    d.comment &&
                        (c.comment
                            ? (c.comment +=
                                  `
` + d.comment)
                            : (c.comment = d.comment)));
                continue;
            }
            (d.newlineAfterProp || Le(p)) && i(p ?? h[h.length - 1], 'MULTILINE_IMPLICIT_KEY', 'Implicit keys need to be on a single line');
        } else d.found?.indent !== n.indent && i(o, 'BAD_INDENT', Mn);
        e.atKey = !0;
        let w = d.end,
            y = p ? s(e, p, d, i) : t(e, w, h, null, d, i);
        (e.schema.compat && gt(n.indent, p, i), (e.atKey = !1), xt(e, c.items, y) && i(w, 'DUPLICATE_KEY', 'Map keys must be unique'));
        let N = _e(_ ?? [], {
            indicator: 'map-value-ind',
            next: v,
            offset: y.range[2],
            onError: i,
            parentIndent: n.indent,
            startOnNewline: !p || p.type === 'block-scalar',
        });
        if (((o = N.end), N.found)) {
            m &&
                (v?.type === 'block-map' && !N.hasNewline && i(o, 'BLOCK_AS_IMPLICIT_KEY', 'Nested mappings are not allowed in compact mappings'),
                e.options.strict &&
                    d.start < N.found.offset - 1024 &&
                    i(y.range, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit block mapping key'));
            let $ = v ? s(e, v, N, i) : t(e, o, _, null, N, i);
            (e.schema.compat && gt(n.indent, v, i), (o = $.range[2]));
            let I = new Y(y, $);
            (e.options.keepSourceTokens && (I.srcToken = g), c.items.push(I));
        } else {
            (m && i(y.range, 'MISSING_CHAR', 'Implicit map keys need to be followed by map values'),
                N.comment &&
                    (y.comment
                        ? (y.comment +=
                              `
` + N.comment)
                        : (y.comment = N.comment)));
            let $ = new Y(y);
            (e.options.keepSourceTokens && ($.srcToken = g), c.items.push($));
        }
    }
    return (u && u < o && i(u, 'IMPOSSIBLE', 'Map comment with trailing content'), (c.range = [n.offset, o, u ?? o]), c);
}
function Fn({ composeNode: s, composeEmptyNode: t }, e, n, i, r) {
    let l = r?.nodeClass ?? x,
        c = new l(e.schema);
    (e.atRoot && (e.atRoot = !1), e.atKey && (e.atKey = !1));
    let o = n.offset,
        u = null;
    for (let { start: g, value: h } of n.items) {
        let p = _e(g, { indicator: 'seq-item-ind', next: h, offset: o, onError: i, parentIndent: n.indent, startOnNewline: !0 });
        if (!p.found)
            if (p.anchor || p.tag || h)
                h && h.type === 'block-seq'
                    ? i(p.end, 'BAD_INDENT', 'All sequence items must start at the same column')
                    : i(o, 'MISSING_CHAR', 'Sequence item without - indicator');
            else {
                ((u = p.end), p.comment && (c.comment = p.comment));
                continue;
            }
        let _ = h ? s(e, h, p, i) : t(e, p.end, g, null, p, i);
        (e.schema.compat && gt(n.indent, h, i), (o = _.range[2]), c.items.push(_));
    }
    return ((c.range = [n.offset, o, u ?? o]), c);
}
function ye(s, t, e, n) {
    let i = '';
    if (s) {
        let r = !1,
            l = '';
        for (let c of s) {
            let { source: o, type: u } = c;
            switch (u) {
                case 'space':
                    r = !0;
                    break;
                case 'comment': {
                    e && !r && n(c, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
                    let g = o.substring(1) || ' ';
                    (i ? (i += l + g) : (i = g), (l = ''));
                    break;
                }
                case 'newline':
                    (i && (l += o), (r = !0));
                    break;
                default:
                    n(c, 'UNEXPECTED_TOKEN', `Unexpected ${u} at node end`);
            }
            t += o.length;
        }
    }
    return { comment: i, offset: t };
}
var Es = 'Block collections are not allowed within flow collections',
    Ts = (s) => s && (s.type === 'block-map' || s.type === 'block-seq');
function Kn({ composeNode: s, composeEmptyNode: t }, e, n, i, r) {
    let l = n.start.source === '{',
        c = l ? 'flow map' : 'flow sequence',
        o = r?.nodeClass ?? (l ? G : x),
        u = new o(e.schema);
    u.flow = !0;
    let g = e.atRoot;
    (g && (e.atRoot = !1), e.atKey && (e.atKey = !1));
    let h = n.offset + n.start.source.length;
    for (let m = 0; m < n.items.length; ++m) {
        let w = n.items[m],
            { start: y, key: N, sep: $, value: I } = w,
            S = _e(y, {
                flow: c,
                indicator: 'explicit-key-ind',
                next: N ?? $?.[0],
                offset: h,
                onError: i,
                parentIndent: n.indent,
                startOnNewline: !1,
            });
        if (!S.found) {
            if (!S.anchor && !S.tag && !$ && !I) {
                (m === 0 && S.comma
                    ? i(S.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${c}`)
                    : m < n.items.length - 1 && i(S.start, 'UNEXPECTED_TOKEN', `Unexpected empty item in ${c}`),
                    S.comment &&
                        (u.comment
                            ? (u.comment +=
                                  `
` + S.comment)
                            : (u.comment = S.comment)),
                    (h = S.end));
                continue;
            }
            !l && e.options.strict && Le(N) && i(N, 'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
        }
        if (m === 0) S.comma && i(S.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${c}`);
        else if ((S.comma || i(S.start, 'MISSING_CHAR', `Missing , between ${c} items`), S.comment)) {
            let E = '';
            e: for (let A of y)
                switch (A.type) {
                    case 'comma':
                    case 'space':
                        break;
                    case 'comment':
                        E = A.source.substring(1);
                        break e;
                    default:
                        break e;
                }
            if (E) {
                let A = u.items[u.items.length - 1];
                (B(A) && (A = A.value ?? A.key),
                    A.comment
                        ? (A.comment +=
                              `
` + E)
                        : (A.comment = E),
                    (S.comment = S.comment.substring(E.length + 1)));
            }
        }
        if (!l && !$ && !S.found) {
            let E = I ? s(e, I, S, i) : t(e, S.end, $, null, S, i);
            (u.items.push(E), (h = E.range[2]), Ts(I) && i(E.range, 'BLOCK_IN_FLOW', Es));
        } else {
            e.atKey = !0;
            let E = S.end,
                A = N ? s(e, N, S, i) : t(e, E, y, null, S, i);
            (Ts(N) && i(A.range, 'BLOCK_IN_FLOW', Es), (e.atKey = !1));
            let O = _e($ ?? [], {
                flow: c,
                indicator: 'map-value-ind',
                next: I,
                offset: A.range[2],
                onError: i,
                parentIndent: n.indent,
                startOnNewline: !1,
            });
            if (O.found) {
                if (!l && !S.found && e.options.strict) {
                    if ($)
                        for (let f of $) {
                            if (f === O.found) break;
                            if (f.type === 'newline') {
                                i(f, 'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
                                break;
                            }
                        }
                    S.start < O.found.offset - 1024 &&
                        i(
                            O.found,
                            'KEY_OVER_1024_CHARS',
                            'The : indicator must be at most 1024 chars after the start of an implicit flow sequence key'
                        );
                }
            } else
                I &&
                    ('source' in I && I.source && I.source[0] === ':'
                        ? i(I, 'MISSING_CHAR', `Missing space after : in ${c}`)
                        : i(O.start, 'MISSING_CHAR', `Missing , or : between ${c} items`));
            let L = I ? s(e, I, O, i) : O.found ? t(e, O.end, $, null, O, i) : null;
            L
                ? Ts(I) && i(L.range, 'BLOCK_IN_FLOW', Es)
                : O.comment &&
                  (A.comment
                      ? (A.comment +=
                            `
` + O.comment)
                      : (A.comment = O.comment));
            let a = new Y(A, L);
            if ((e.options.keepSourceTokens && (a.srcToken = w), l)) {
                let f = u;
                (xt(e, f.items, A) && i(E, 'DUPLICATE_KEY', 'Map keys must be unique'), f.items.push(a));
            } else {
                let f = new G(e.schema);
                ((f.flow = !0), f.items.push(a));
                let b = (L ?? A).range;
                ((f.range = [A.range[0], b[1], b[2]]), u.items.push(f));
            }
            h = L ? L.range[2] : O.end;
        }
    }
    let p = l ? '}' : ']',
        [_, ...v] = n.end,
        d = h;
    if (_ && _.source === p) d = _.offset + _.source.length;
    else {
        let m = c[0].toUpperCase() + c.substring(1),
            w = g ? `${m} must end with a ${p}` : `${m} in block collection must be sufficiently indented and end with a ${p}`;
        (i(h, g ? 'MISSING_CHAR' : 'BAD_INDENT', w), _ && _.source.length !== 1 && v.unshift(_));
    }
    if (v.length > 0) {
        let m = ye(v, d, e.options.strict, i);
        (m.comment &&
            (u.comment
                ? (u.comment +=
                      `
` + m.comment)
                : (u.comment = m.comment)),
            (u.range = [n.offset, d, m.offset]));
    } else u.range = [n.offset, d, d];
    return u;
}
function Ls(s, t, e, n, i, r) {
    let l = e.type === 'block-map' ? Dn(s, t, e, n, r) : e.type === 'block-seq' ? Fn(s, t, e, n, r) : Kn(s, t, e, n, r),
        c = l.constructor;
    return i === '!' || i === c.tagName ? ((l.tag = c.tagName), l) : (i && (l.tag = i), l);
}
function qn(s, t, e, n, i) {
    let r = n.tag,
        l = r ? t.directives.tagName(r.source, (p) => i(r, 'TAG_RESOLVE_FAILED', p)) : null;
    if (e.type === 'block-seq') {
        let { anchor: p, newlineAfterProp: _ } = n,
            v = p && r ? (p.offset > r.offset ? p : r) : (p ?? r);
        v && (!_ || _.offset < v.offset) && i(v, 'MISSING_CHAR', 'Missing newline after block sequence props');
    }
    let c = e.type === 'block-map' ? 'map' : e.type === 'block-seq' ? 'seq' : e.start.source === '{' ? 'map' : 'seq';
    if (!r || !l || l === '!' || (l === G.tagName && c === 'map') || (l === x.tagName && c === 'seq')) return Ls(s, t, e, i, l);
    let o = t.schema.tags.find((p) => p.tag === l && p.collection === c);
    if (!o) {
        let p = t.schema.knownTags[l];
        if (p && p.collection === c) (t.schema.tags.push(Object.assign({}, p, { default: !1 })), (o = p));
        else
            return (
                p
                    ? i(r, 'BAD_COLLECTION_TYPE', `${p.tag} used for ${c} collection, but expects ${p.collection ?? 'scalar'}`, !0)
                    : i(r, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${l}`, !0),
                Ls(s, t, e, i, l)
            );
    }
    let u = Ls(s, t, e, i, l, o),
        g = o.resolve?.(u, (p) => i(r, 'TAG_RESOLVE_FAILED', p), t.options) ?? u,
        h = D(g) ? g : new R(g);
    return ((h.range = u.range), (h.tag = l), o?.format && (h.format = o.format), h);
}
function es(s, t, e) {
    let n = t.offset,
        i = Ki(t, s.options.strict, e);
    if (!i) return { value: '', type: null, comment: '', range: [n, n, n] };
    let r = i.mode === '>' ? R.BLOCK_FOLDED : R.BLOCK_LITERAL,
        l = t.source ? qi(t.source) : [],
        c = l.length;
    for (let d = l.length - 1; d >= 0; --d) {
        let m = l[d][1];
        if (m === '' || m === '\r') c = d;
        else break;
    }
    if (c === 0) {
        let d =
                i.chomp === '+' && l.length > 0
                    ? `
`.repeat(Math.max(1, l.length - 1))
                    : '',
            m = n + i.length;
        return (t.source && (m += t.source.length), { value: d, type: r, comment: i.comment, range: [n, m, m] });
    }
    let o = t.indent + i.indent,
        u = t.offset + i.length,
        g = 0;
    for (let d = 0; d < c; ++d) {
        let [m, w] = l[d];
        if (w === '' || w === '\r') i.indent === 0 && m.length > o && (o = m.length);
        else {
            (m.length < o &&
                e(u + m.length, 'MISSING_CHAR', 'Block scalars with more-indented leading empty lines must use an explicit indentation indicator'),
                i.indent === 0 && (o = m.length),
                (g = d),
                o === 0 && !s.atRoot && e(u, 'BAD_INDENT', 'Block scalar values in collections must be indented'));
            break;
        }
        u += m.length + w.length + 1;
    }
    for (let d = l.length - 1; d >= c; --d) l[d][0].length > o && (c = d + 1);
    let h = '',
        p = '',
        _ = !1;
    for (let d = 0; d < g; ++d)
        h +=
            l[d][0].slice(o) +
            `
`;
    for (let d = g; d < c; ++d) {
        let [m, w] = l[d];
        u += m.length + w.length + 1;
        let y = w[w.length - 1] === '\r';
        if ((y && (w = w.slice(0, -1)), w && m.length < o)) {
            let $ = `Block scalar lines must not be less indented than their ${i.indent ? 'explicit indentation indicator' : 'first line'}`;
            (e(u - w.length - (y ? 2 : 1), 'BAD_INDENT', $), (m = ''));
        }
        r === R.BLOCK_LITERAL
            ? ((h += p + m.slice(o) + w),
              (p = `
`))
            : m.length > o || w[0] === '	'
              ? (p === ' '
                    ? (p = `
`)
                    : !_ &&
                      p ===
                          `
` &&
                      (p = `

`),
                (h += p + m.slice(o) + w),
                (p = `
`),
                (_ = !0))
              : w === ''
                ? p ===
                  `
`
                    ? (h += `
`)
                    : (p = `
`)
                : ((h += p + w), (p = ' '), (_ = !1));
    }
    switch (i.chomp) {
        case '-':
            break;
        case '+':
            for (let d = c; d < l.length; ++d)
                h +=
                    `
` + l[d][0].slice(o);
            h[h.length - 1] !==
                `
` &&
                (h += `
`);
            break;
        default:
            h += `
`;
    }
    let v = n + i.length + t.source.length;
    return { value: h, type: r, comment: i.comment, range: [n, v, v] };
}
function Ki({ offset: s, props: t }, e, n) {
    if (t[0].type !== 'block-scalar-header') return (n(t[0], 'IMPOSSIBLE', 'Block scalar header not found'), null);
    let { source: i } = t[0],
        r = i[0],
        l = 0,
        c = '',
        o = -1;
    for (let p = 1; p < i.length; ++p) {
        let _ = i[p];
        if (!c && (_ === '-' || _ === '+')) c = _;
        else {
            let v = Number(_);
            !l && v ? (l = v) : o === -1 && (o = s + p);
        }
    }
    o !== -1 && n(o, 'UNEXPECTED_TOKEN', `Block scalar header includes extra characters: ${i}`);
    let u = !1,
        g = '',
        h = i.length;
    for (let p = 1; p < t.length; ++p) {
        let _ = t[p];
        switch (_.type) {
            case 'space':
                u = !0;
            case 'newline':
                h += _.source.length;
                break;
            case 'comment':
                (e && !u && n(_, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters'),
                    (h += _.source.length),
                    (g = _.source.substring(1)));
                break;
            case 'error':
                (n(_, 'UNEXPECTED_TOKEN', _.message), (h += _.source.length));
                break;
            default: {
                let v = `Unexpected token in block scalar header: ${_.type}`;
                n(_, 'UNEXPECTED_TOKEN', v);
                let d = _.source;
                d && typeof d == 'string' && (h += d.length);
            }
        }
    }
    return { mode: r, indent: l, chomp: c, comment: g, length: h };
}
function qi(s) {
    let t = s.split(/\n( *)/),
        e = t[0],
        n = e.match(/^( *)/),
        r = [n?.[1] ? [n[1], e.slice(n[1].length)] : ['', e]];
    for (let l = 1; l < t.length; l += 2) r.push([t[l], t[l + 1]]);
    return r;
}
function ts(s, t, e) {
    let { offset: n, type: i, source: r, end: l } = s,
        c,
        o,
        u = (p, _, v) => e(n + p, _, v);
    switch (i) {
        case 'scalar':
            ((c = R.PLAIN), (o = Vi(r, u)));
            break;
        case 'single-quoted-scalar':
            ((c = R.QUOTE_SINGLE), (o = Hi(r, u)));
            break;
        case 'double-quoted-scalar':
            ((c = R.QUOTE_DOUBLE), (o = Ji(r, u)));
            break;
        default:
            return (
                e(s, 'UNEXPECTED_TOKEN', `Expected a flow scalar value, but found: ${i}`),
                { value: '', type: null, comment: '', range: [n, n + r.length, n + r.length] }
            );
    }
    let g = n + r.length,
        h = ye(l, g, t, e);
    return { value: o, type: c, comment: h.comment, range: [n, g, h.offset] };
}
function Vi(s, t) {
    let e = '';
    switch (s[0]) {
        case '	':
            e = 'a tab character';
            break;
        case ',':
            e = 'flow indicator character ,';
            break;
        case '%':
            e = 'directive indicator character %';
            break;
        case '|':
        case '>': {
            e = `block scalar indicator ${s[0]}`;
            break;
        }
        case '@':
        case '`': {
            e = `reserved character ${s[0]}`;
            break;
        }
    }
    return (e && t(0, 'BAD_SCALAR_START', `Plain value cannot start with ${e}`), Vn(s));
}
function Hi(s, t) {
    return (
        (s[s.length - 1] !== "'" || s.length === 1) && t(s.length, 'MISSING_CHAR', "Missing closing 'quote"),
        Vn(s.slice(1, -1)).replace(/''/g, "'")
    );
}
function Vn(s) {
    let t, e;
    try {
        ((t = new RegExp(
            `(.*?)(?<![ 	])[ 	]*\r?
`,
            'sy'
        )),
            (e = new RegExp(
                `[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,
                'sy'
            )));
    } catch {
        ((t = /(.*?)[ \t]*\r?\n/sy), (e = /[ \t]*(.*?)[ \t]*\r?\n/sy));
    }
    let n = t.exec(s);
    if (!n) return s;
    let i = n[1],
        r = ' ',
        l = t.lastIndex;
    for (e.lastIndex = l; (n = e.exec(s)); )
        (n[1] === ''
            ? r ===
              `
`
                ? (i += r)
                : (r = `
`)
            : ((i += r + n[1]), (r = ' ')),
            (l = e.lastIndex));
    let c = /[ \t]*(.*)/sy;
    return ((c.lastIndex = l), (n = c.exec(s)), i + r + (n?.[1] ?? ''));
}
function Ji(s, t) {
    let e = '';
    for (let n = 1; n < s.length - 1; ++n) {
        let i = s[n];
        if (
            !(
                i === '\r' &&
                s[n + 1] ===
                    `
`
            )
        )
            if (
                i ===
                `
`
            ) {
                let { fold: r, offset: l } = Yi(s, n);
                ((e += r), (n = l));
            } else if (i === '\\') {
                let r = s[++n],
                    l = Gi[r];
                if (l) e += l;
                else if (
                    r ===
                    `
`
                )
                    for (r = s[n + 1]; r === ' ' || r === '	'; ) r = s[++n + 1];
                else if (
                    r === '\r' &&
                    s[n + 1] ===
                        `
`
                )
                    for (r = s[++n + 1]; r === ' ' || r === '	'; ) r = s[++n + 1];
                else if (r === 'x' || r === 'u' || r === 'U') {
                    let c = { x: 2, u: 4, U: 8 }[r];
                    ((e += Wi(s, n + 1, c, t)), (n += c));
                } else {
                    let c = s.substr(n - 1, 2);
                    (t(n - 1, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${c}`), (e += c));
                }
            } else if (i === ' ' || i === '	') {
                let r = n,
                    l = s[n + 1];
                for (; l === ' ' || l === '	'; ) l = s[++n + 1];
                l !==
                    `
` &&
                    !(
                        l === '\r' &&
                        s[n + 2] ===
                            `
`
                    ) &&
                    (e += n > r ? s.slice(r, n + 1) : i);
            } else e += i;
    }
    return ((s[s.length - 1] !== '"' || s.length === 1) && t(s.length, 'MISSING_CHAR', 'Missing closing "quote'), e);
}
function Yi(s, t) {
    let e = '',
        n = s[t + 1];
    for (
        ;
        (n === ' ' ||
            n === '	' ||
            n ===
                `
` ||
            n === '\r') &&
        !(
            n === '\r' &&
            s[t + 2] !==
                `
`
        );

    )
        (n ===
            `
` &&
            (e += `
`),
            (t += 1),
            (n = s[t + 1]));
    return (e || (e = ' '), { fold: e, offset: t });
}
var Gi = {
    0: '\0',
    a: '\x07',
    b: '\b',
    e: '\x1B',
    f: '\f',
    n: `
`,
    r: '\r',
    t: '	',
    v: '\v',
    N: '\x85',
    _: '\xA0',
    L: '\u2028',
    P: '\u2029',
    ' ': ' ',
    '"': '"',
    '/': '/',
    '\\': '\\',
    '	': '	',
};
function Wi(s, t, e, n) {
    let i = s.substr(t, e),
        l = i.length === e && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
    if (isNaN(l)) {
        let c = s.substr(t - 2, e + 2);
        return (n(t - 2, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${c}`), c);
    }
    return String.fromCodePoint(l);
}
function Rs(s, t, e, n) {
    let { value: i, type: r, comment: l, range: c } = t.type === 'block-scalar' ? es(s, t, n) : ts(t, s.options.strict, n),
        o = e ? s.directives.tagName(e.source, (h) => n(e, 'TAG_RESOLVE_FAILED', h)) : null,
        u;
    s.options.stringKeys && s.atKey
        ? (u = s.schema[ie])
        : o
          ? (u = Qi(s.schema, i, o, e, n))
          : t.type === 'scalar'
            ? (u = zi(s, i, t, n))
            : (u = s.schema[ie]);
    let g;
    try {
        let h = u.resolve(i, (p) => n(e ?? t, 'TAG_RESOLVE_FAILED', p), s.options);
        g = U(h) ? h : new R(h);
    } catch (h) {
        let p = h instanceof Error ? h.message : String(h);
        (n(e ?? t, 'TAG_RESOLVE_FAILED', p), (g = new R(i)));
    }
    return ((g.range = c), (g.source = i), r && (g.type = r), o && (g.tag = o), u.format && (g.format = u.format), l && (g.comment = l), g);
}
function Qi(s, t, e, n, i) {
    if (e === '!') return s[ie];
    let r = [];
    for (let c of s.tags)
        if (!c.collection && c.tag === e)
            if (c.default && c.test) r.push(c);
            else return c;
    for (let c of r) if (c.test?.test(t)) return c;
    let l = s.knownTags[e];
    return l && !l.collection
        ? (s.tags.push(Object.assign({}, l, { default: !1, test: void 0 })), l)
        : (i(n, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${e}`, e !== 'tag:yaml.org,2002:str'), s[ie]);
}
function zi({ atKey: s, directives: t, schema: e }, n, i, r) {
    let l = e.tags.find((c) => (c.default === !0 || (s && c.default === 'key')) && c.test?.test(n)) || e[ie];
    if (e.compat) {
        let c = e.compat.find((o) => o.default && o.test?.test(n)) ?? e[ie];
        if (l.tag !== c.tag) {
            let o = t.tagString(l.tag),
                u = t.tagString(c.tag),
                g = `Value may be parsed as either ${o} or ${u}`;
            r(i, 'TAG_RESOLVE_FAILED', g, !0);
        }
    }
    return l;
}
function Hn(s, t, e) {
    if (t) {
        e ?? (e = t.length);
        for (let n = e - 1; n >= 0; --n) {
            let i = t[n];
            switch (i.type) {
                case 'space':
                case 'comment':
                case 'newline':
                    s -= i.source.length;
                    continue;
            }
            for (i = t[++n]; i?.type === 'space'; ) ((s += i.source.length), (i = t[++n]));
            break;
        }
    }
    return s;
}
var Xi = { composeNode: Us, composeEmptyNode: ss };
function Us(s, t, e, n) {
    let i = s.atKey,
        { spaceBefore: r, comment: l, anchor: c, tag: o } = e,
        u,
        g = !0;
    switch (t.type) {
        case 'alias':
            ((u = Zi(s, t, n)), (c || o) && n(t, 'ALIAS_PROPS', 'An alias node must not specify any properties'));
            break;
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
        case 'block-scalar':
            ((u = Rs(s, t, o, n)), c && (u.anchor = c.source.substring(1)));
            break;
        case 'block-map':
        case 'block-seq':
        case 'flow-collection':
            ((u = qn(Xi, s, t, e, n)), c && (u.anchor = c.source.substring(1)));
            break;
        default: {
            let h = t.type === 'error' ? t.message : `Unsupported token (type: ${t.type})`;
            (n(t, 'UNEXPECTED_TOKEN', h), (u = ss(s, t.offset, void 0, null, e, n)), (g = !1));
        }
    }
    return (
        c && u.anchor === '' && n(c, 'BAD_ALIAS', 'Anchor cannot be an empty string'),
        i &&
            s.options.stringKeys &&
            (!U(u) || typeof u.value != 'string' || (u.tag && u.tag !== 'tag:yaml.org,2002:str')) &&
            n(o ?? t, 'NON_STRING_KEY', 'With stringKeys, all keys must be strings'),
        r && (u.spaceBefore = !0),
        l && (t.type === 'scalar' && t.source === '' ? (u.comment = l) : (u.commentBefore = l)),
        s.options.keepSourceTokens && g && (u.srcToken = t),
        u
    );
}
function ss(s, t, e, n, { spaceBefore: i, comment: r, anchor: l, tag: c, end: o }, u) {
    let g = { type: 'scalar', offset: Hn(t, e, n), indent: -1, source: '' },
        h = Rs(s, g, c, u);
    return (
        l && ((h.anchor = l.source.substring(1)), h.anchor === '' && u(l, 'BAD_ALIAS', 'Anchor cannot be an empty string')),
        i && (h.spaceBefore = !0),
        r && ((h.comment = r), (h.range[2] = o)),
        h
    );
}
function Zi({ options: s }, { offset: t, source: e, end: n }, i) {
    let r = new ke(e.substring(1));
    (r.source === '' && i(t, 'BAD_ALIAS', 'Alias cannot be an empty string'),
        r.source.endsWith(':') && i(t + e.length - 1, 'BAD_ALIAS', 'Alias ending in : is ambiguous', !0));
    let l = t + e.length,
        c = ye(n, l, s.strict, i);
    return ((r.range = [t, l, c.offset]), c.comment && (r.comment = c.comment), r);
}
function Jn(s, t, { offset: e, start: n, value: i, end: r }, l) {
    let c = Object.assign({ _directives: t }, s),
        o = new $e(void 0, c),
        u = { atKey: !1, atRoot: !0, directives: o.directives, options: o.options, schema: o.schema },
        g = _e(n, { indicator: 'doc-start', next: i ?? r?.[0], offset: e, onError: l, parentIndent: 0, startOnNewline: !0 });
    (g.found &&
        ((o.directives.docStart = !0),
        i &&
            (i.type === 'block-map' || i.type === 'block-seq') &&
            !g.hasNewline &&
            l(g.end, 'MISSING_CHAR', 'Block collection cannot start on same line with directives-end marker')),
        (o.contents = i ? Us(u, i, g, l) : ss(u, g.end, n, null, g, l)));
    let h = o.contents.range[2],
        p = ye(r, h, !1, l);
    return (p.comment && (o.comment = p.comment), (o.range = [e, h, p.offset]), o);
}
function wt(s) {
    if (typeof s == 'number') return [s, s + 1];
    if (Array.isArray(s)) return s.length === 2 ? s : [s[0], s[1]];
    let { offset: t, source: e } = s;
    return [t, t + (typeof e == 'string' ? e.length : 1)];
}
function Yn(s) {
    let t = '',
        e = !1,
        n = !1;
    for (let i = 0; i < s.length; ++i) {
        let r = s[i];
        switch (r[0]) {
            case '#':
                ((t +=
                    (t === ''
                        ? ''
                        : n
                          ? `

`
                          : `
`) + (r.substring(1) || ' ')),
                    (e = !0),
                    (n = !1));
                break;
            case '%':
                (s[i + 1]?.[0] !== '#' && (i += 1), (e = !1));
                break;
            default:
                (e || (n = !0), (e = !1));
        }
    }
    return { comment: t, afterEmptyLine: n };
}
var je = class {
    constructor(t = {}) {
        ((this.doc = null),
            (this.atDirectives = !1),
            (this.prelude = []),
            (this.errors = []),
            (this.warnings = []),
            (this.onError = (e, n, i, r) => {
                let l = wt(e);
                r ? this.warnings.push(new Ze(l, n, i)) : this.errors.push(new oe(l, n, i));
            }),
            (this.directives = new be({ version: t.version || '1.2' })),
            (this.options = t));
    }
    decorate(t, e) {
        let { comment: n, afterEmptyLine: i } = Yn(this.prelude);
        if (n) {
            let r = t.contents;
            if (e)
                t.comment = t.comment
                    ? `${t.comment}
${n}`
                    : n;
            else if (i || t.directives.docStart || !r) t.commentBefore = n;
            else if (F(r) && !r.flow && r.items.length > 0) {
                let l = r.items[0];
                B(l) && (l = l.key);
                let c = l.commentBefore;
                l.commentBefore = c
                    ? `${n}
${c}`
                    : n;
            } else {
                let l = r.commentBefore;
                r.commentBefore = l
                    ? `${n}
${l}`
                    : n;
            }
        }
        (e
            ? (Array.prototype.push.apply(t.errors, this.errors), Array.prototype.push.apply(t.warnings, this.warnings))
            : ((t.errors = this.errors), (t.warnings = this.warnings)),
            (this.prelude = []),
            (this.errors = []),
            (this.warnings = []));
    }
    streamInfo() {
        return { comment: Yn(this.prelude).comment, directives: this.directives, errors: this.errors, warnings: this.warnings };
    }
    *compose(t, e = !1, n = -1) {
        for (let i of t) yield* this.next(i);
        yield* this.end(e, n);
    }
    *next(t) {
        switch (t.type) {
            case 'directive':
                (this.directives.add(t.source, (e, n, i) => {
                    let r = wt(t);
                    ((r[0] += e), this.onError(r, 'BAD_DIRECTIVE', n, i));
                }),
                    this.prelude.push(t.source),
                    (this.atDirectives = !0));
                break;
            case 'document': {
                let e = Jn(this.options, this.directives, t, this.onError);
                (this.atDirectives && !e.directives.docStart && this.onError(t, 'MISSING_CHAR', 'Missing directives-end/doc-start indicator line'),
                    this.decorate(e, !1),
                    this.doc && (yield this.doc),
                    (this.doc = e),
                    (this.atDirectives = !1));
                break;
            }
            case 'byte-order-mark':
            case 'space':
                break;
            case 'comment':
            case 'newline':
                this.prelude.push(t.source);
                break;
            case 'error': {
                let e = t.source ? `${t.message}: ${JSON.stringify(t.source)}` : t.message,
                    n = new oe(wt(t), 'UNEXPECTED_TOKEN', e);
                this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n);
                break;
            }
            case 'doc-end': {
                if (!this.doc) {
                    let n = 'Unexpected doc-end without preceding document';
                    this.errors.push(new oe(wt(t), 'UNEXPECTED_TOKEN', n));
                    break;
                }
                this.doc.directives.docEnd = !0;
                let e = ye(t.end, t.offset + t.source.length, this.doc.options.strict, this.onError);
                if ((this.decorate(this.doc, !0), e.comment)) {
                    let n = this.doc.comment;
                    this.doc.comment = n
                        ? `${n}
${e.comment}`
                        : e.comment;
                }
                this.doc.range[2] = e.offset;
                break;
            }
            default:
                this.errors.push(new oe(wt(t), 'UNEXPECTED_TOKEN', `Unsupported token ${t.type}`));
        }
    }
    *end(t = !1, e = -1) {
        if (this.doc) (this.decorate(this.doc, !0), yield this.doc, (this.doc = null));
        else if (t) {
            let n = Object.assign({ _directives: this.directives }, this.options),
                i = new $e(void 0, n);
            (this.atDirectives && this.onError(e, 'MISSING_CHAR', 'Missing directives-end indicator line'),
                (i.range = [0, e, e]),
                this.decorate(i, !1),
                yield i);
        }
    }
};
var Ms = {};
Ys(Ms, {
    BOM: () => bt,
    DOCUMENT: () => kt,
    FLOW_END: () => vt,
    SCALAR: () => xe,
    createScalarToken: () => Wn,
    isCollection: () => tr,
    isScalar: () => sr,
    prettyToken: () => nr,
    resolveAsScalar: () => Gn,
    setScalarValue: () => Qn,
    stringify: () => Xn,
    tokenType: () => Bs,
    visit: () => Re,
});
function Gn(s, t = !0, e) {
    if (s) {
        let n = (i, r, l) => {
            let c = typeof i == 'number' ? i : Array.isArray(i) ? i[0] : i.offset;
            if (e) e(c, r, l);
            else throw new oe([c, c + 1], r, l);
        };
        switch (s.type) {
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return ts(s, t, n);
            case 'block-scalar':
                return es({ options: { strict: t } }, s, n);
        }
    }
    return null;
}
function Wn(s, t) {
    let { implicitKey: e = !1, indent: n, inFlow: i = !1, offset: r = -1, type: l = 'PLAIN' } = t,
        c = Ie({ type: l, value: s }, { implicitKey: e, indent: n > 0 ? ' '.repeat(n) : '', inFlow: i, options: { blockQuote: !0, lineWidth: -1 } }),
        o = t.end ?? [
            {
                type: 'newline',
                offset: -1,
                indent: n,
                source: `
`,
            },
        ];
    switch (c[0]) {
        case '|':
        case '>': {
            let u = c.indexOf(`
`),
                g = c.substring(0, u),
                h =
                    c.substring(u + 1) +
                    `
`,
                p = [{ type: 'block-scalar-header', offset: r, indent: n, source: g }];
            return (
                zn(p, o) ||
                    p.push({
                        type: 'newline',
                        offset: -1,
                        indent: n,
                        source: `
`,
                    }),
                { type: 'block-scalar', offset: r, indent: n, props: p, source: h }
            );
        }
        case '"':
            return { type: 'double-quoted-scalar', offset: r, indent: n, source: c, end: o };
        case "'":
            return { type: 'single-quoted-scalar', offset: r, indent: n, source: c, end: o };
        default:
            return { type: 'scalar', offset: r, indent: n, source: c, end: o };
    }
}
function Qn(s, t, e = {}) {
    let { afterKey: n = !1, implicitKey: i = !1, inFlow: r = !1, type: l } = e,
        c = 'indent' in s ? s.indent : null;
    if ((n && typeof c == 'number' && (c += 2), !l))
        switch (s.type) {
            case 'single-quoted-scalar':
                l = 'QUOTE_SINGLE';
                break;
            case 'double-quoted-scalar':
                l = 'QUOTE_DOUBLE';
                break;
            case 'block-scalar': {
                let u = s.props[0];
                if (u.type !== 'block-scalar-header') throw new Error('Invalid block scalar header');
                l = u.source[0] === '>' ? 'BLOCK_FOLDED' : 'BLOCK_LITERAL';
                break;
            }
            default:
                l = 'PLAIN';
        }
    let o = Ie(
        { type: l, value: t },
        { implicitKey: i || c === null, indent: c !== null && c > 0 ? ' '.repeat(c) : '', inFlow: r, options: { blockQuote: !0, lineWidth: -1 } }
    );
    switch (o[0]) {
        case '|':
        case '>':
            xi(s, o);
            break;
        case '"':
            Ps(s, o, 'double-quoted-scalar');
            break;
        case "'":
            Ps(s, o, 'single-quoted-scalar');
            break;
        default:
            Ps(s, o, 'scalar');
    }
}
function xi(s, t) {
    let e = t.indexOf(`
`),
        n = t.substring(0, e),
        i =
            t.substring(e + 1) +
            `
`;
    if (s.type === 'block-scalar') {
        let r = s.props[0];
        if (r.type !== 'block-scalar-header') throw new Error('Invalid block scalar header');
        ((r.source = n), (s.source = i));
    } else {
        let { offset: r } = s,
            l = 'indent' in s ? s.indent : -1,
            c = [{ type: 'block-scalar-header', offset: r, indent: l, source: n }];
        zn(c, 'end' in s ? s.end : void 0) ||
            c.push({
                type: 'newline',
                offset: -1,
                indent: l,
                source: `
`,
            });
        for (let o of Object.keys(s)) o !== 'type' && o !== 'offset' && delete s[o];
        Object.assign(s, { type: 'block-scalar', indent: l, props: c, source: i });
    }
}
function zn(s, t) {
    if (t)
        for (let e of t)
            switch (e.type) {
                case 'space':
                case 'comment':
                    s.push(e);
                    break;
                case 'newline':
                    return (s.push(e), !0);
            }
    return !1;
}
function Ps(s, t, e) {
    switch (s.type) {
        case 'scalar':
        case 'double-quoted-scalar':
        case 'single-quoted-scalar':
            ((s.type = e), (s.source = t));
            break;
        case 'block-scalar': {
            let n = s.props.slice(1),
                i = t.length;
            s.props[0].type === 'block-scalar-header' && (i -= s.props[0].source.length);
            for (let r of n) r.offset += i;
            (delete s.props, Object.assign(s, { type: e, source: t, end: n }));
            break;
        }
        case 'block-map':
        case 'block-seq': {
            let i = {
                type: 'newline',
                offset: s.offset + t.length,
                indent: s.indent,
                source: `
`,
            };
            (delete s.items, Object.assign(s, { type: e, source: t, end: [i] }));
            break;
        }
        default: {
            let n = 'indent' in s ? s.indent : -1,
                i = 'end' in s && Array.isArray(s.end) ? s.end.filter((r) => r.type === 'space' || r.type === 'comment' || r.type === 'newline') : [];
            for (let r of Object.keys(s)) r !== 'type' && r !== 'offset' && delete s[r];
            Object.assign(s, { type: e, indent: n, source: t, end: i });
        }
    }
}
var Xn = (s) => ('type' in s ? is(s) : ns(s));
function is(s) {
    switch (s.type) {
        case 'block-scalar': {
            let t = '';
            for (let e of s.props) t += is(e);
            return t + s.source;
        }
        case 'block-map':
        case 'block-seq': {
            let t = '';
            for (let e of s.items) t += ns(e);
            return t;
        }
        case 'flow-collection': {
            let t = s.start.source;
            for (let e of s.items) t += ns(e);
            for (let e of s.end) t += e.source;
            return t;
        }
        case 'document': {
            let t = ns(s);
            if (s.end) for (let e of s.end) t += e.source;
            return t;
        }
        default: {
            let t = s.source;
            if ('end' in s && s.end) for (let e of s.end) t += e.source;
            return t;
        }
    }
}
function ns({ start: s, key: t, sep: e, value: n }) {
    let i = '';
    for (let r of s) i += r.source;
    if ((t && (i += is(t)), e)) for (let r of e) i += r.source;
    return (n && (i += is(n)), i);
}
var js = Symbol('break visit'),
    er = Symbol('skip children'),
    Zn = Symbol('remove item');
function Re(s, t) {
    ('type' in s && s.type === 'document' && (s = { start: s.start, value: s.value }), xn(Object.freeze([]), s, t));
}
Re.BREAK = js;
Re.SKIP = er;
Re.REMOVE = Zn;
Re.itemAtPath = (s, t) => {
    let e = s;
    for (let [n, i] of t) {
        let r = e?.[n];
        if (r && 'items' in r) e = r.items[i];
        else return;
    }
    return e;
};
Re.parentCollection = (s, t) => {
    let e = Re.itemAtPath(s, t.slice(0, -1)),
        n = t[t.length - 1][0],
        i = e?.[n];
    if (i && 'items' in i) return i;
    throw new Error('Parent collection not found');
};
function xn(s, t, e) {
    let n = e(t, s);
    if (typeof n == 'symbol') return n;
    for (let i of ['key', 'value']) {
        let r = t[i];
        if (r && 'items' in r) {
            for (let l = 0; l < r.items.length; ++l) {
                let c = xn(Object.freeze(s.concat([[i, l]])), r.items[l], e);
                if (typeof c == 'number') l = c - 1;
                else {
                    if (c === js) return js;
                    c === Zn && (r.items.splice(l, 1), (l -= 1));
                }
            }
            typeof n == 'function' && i === 'key' && (n = n(t, s));
        }
    }
    return typeof n == 'function' ? n(t, s) : n;
}
var bt = '\uFEFF',
    kt = '',
    vt = '',
    xe = '',
    tr = (s) => !!s && 'items' in s,
    sr = (s) => !!s && (s.type === 'scalar' || s.type === 'single-quoted-scalar' || s.type === 'double-quoted-scalar' || s.type === 'block-scalar');
function nr(s) {
    switch (s) {
        case bt:
            return '<BOM>';
        case kt:
            return '<DOC>';
        case vt:
            return '<FLOW_END>';
        case xe:
            return '<SCALAR>';
        default:
            return JSON.stringify(s);
    }
}
function Bs(s) {
    switch (s) {
        case bt:
            return 'byte-order-mark';
        case kt:
            return 'doc-mode';
        case vt:
            return 'flow-error-end';
        case xe:
            return 'scalar';
        case '---':
            return 'doc-start';
        case '...':
            return 'doc-end';
        case '':
        case `
`:
        case `\r
`:
            return 'newline';
        case '-':
            return 'seq-item-ind';
        case '?':
            return 'explicit-key-ind';
        case ':':
            return 'map-value-ind';
        case '{':
            return 'flow-map-start';
        case '}':
            return 'flow-map-end';
        case '[':
            return 'flow-seq-start';
        case ']':
            return 'flow-seq-end';
        case ',':
            return 'comma';
    }
    switch (s[0]) {
        case ' ':
        case '	':
            return 'space';
        case '#':
            return 'comment';
        case '%':
            return 'directive-line';
        case '*':
            return 'alias';
        case '&':
            return 'anchor';
        case '!':
            return 'tag';
        case "'":
            return 'single-quoted-scalar';
        case '"':
            return 'double-quoted-scalar';
        case '|':
        case '>':
            return 'block-scalar-header';
    }
    return null;
}
function ge(s) {
    switch (s) {
        case void 0:
        case ' ':
        case `
`:
        case '\r':
        case '	':
            return !0;
        default:
            return !1;
    }
}
var ei = new Set('0123456789ABCDEFabcdef'),
    ir = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),
    rs = new Set(',[]{}'),
    rr = new Set(` ,[]{}
\r	`),
    Ds = (s) => !s || rr.has(s),
    et = class {
        constructor() {
            ((this.atEnd = !1),
                (this.blockScalarIndent = -1),
                (this.blockScalarKeep = !1),
                (this.buffer = ''),
                (this.flowKey = !1),
                (this.flowLevel = 0),
                (this.indentNext = 0),
                (this.indentValue = 0),
                (this.lineEndPos = null),
                (this.next = null),
                (this.pos = 0));
        }
        *lex(t, e = !1) {
            if (t) {
                if (typeof t != 'string') throw TypeError('source is not a string');
                ((this.buffer = this.buffer ? this.buffer + t : t), (this.lineEndPos = null));
            }
            this.atEnd = !e;
            let n = this.next ?? 'stream';
            for (; n && (e || this.hasChars(1)); ) n = yield* this.parseNext(n);
        }
        atLineEnd() {
            let t = this.pos,
                e = this.buffer[t];
            for (; e === ' ' || e === '	'; ) e = this.buffer[++t];
            return !e ||
                e === '#' ||
                e ===
                    `
`
                ? !0
                : e === '\r'
                  ? this.buffer[t + 1] ===
                    `
`
                  : !1;
        }
        charAt(t) {
            return this.buffer[this.pos + t];
        }
        continueScalar(t) {
            let e = this.buffer[t];
            if (this.indentNext > 0) {
                let n = 0;
                for (; e === ' '; ) e = this.buffer[++n + t];
                if (e === '\r') {
                    let i = this.buffer[n + t + 1];
                    if (
                        i ===
                            `
` ||
                        (!i && !this.atEnd)
                    )
                        return t + n + 1;
                }
                return e ===
                    `
` ||
                    n >= this.indentNext ||
                    (!e && !this.atEnd)
                    ? t + n
                    : -1;
            }
            if (e === '-' || e === '.') {
                let n = this.buffer.substr(t, 3);
                if ((n === '---' || n === '...') && ge(this.buffer[t + 3])) return -1;
            }
            return t;
        }
        getLine() {
            let t = this.lineEndPos;
            return (
                (typeof t != 'number' || (t !== -1 && t < this.pos)) &&
                    ((t = this.buffer.indexOf(
                        `
`,
                        this.pos
                    )),
                    (this.lineEndPos = t)),
                t === -1
                    ? this.atEnd
                        ? this.buffer.substring(this.pos)
                        : null
                    : (this.buffer[t - 1] === '\r' && (t -= 1), this.buffer.substring(this.pos, t))
            );
        }
        hasChars(t) {
            return this.pos + t <= this.buffer.length;
        }
        setNext(t) {
            return ((this.buffer = this.buffer.substring(this.pos)), (this.pos = 0), (this.lineEndPos = null), (this.next = t), null);
        }
        peek(t) {
            return this.buffer.substr(this.pos, t);
        }
        *parseNext(t) {
            switch (t) {
                case 'stream':
                    return yield* this.parseStream();
                case 'line-start':
                    return yield* this.parseLineStart();
                case 'block-start':
                    return yield* this.parseBlockStart();
                case 'doc':
                    return yield* this.parseDocument();
                case 'flow':
                    return yield* this.parseFlowCollection();
                case 'quoted-scalar':
                    return yield* this.parseQuotedScalar();
                case 'block-scalar':
                    return yield* this.parseBlockScalar();
                case 'plain-scalar':
                    return yield* this.parsePlainScalar();
            }
        }
        *parseStream() {
            let t = this.getLine();
            if (t === null) return this.setNext('stream');
            if ((t[0] === bt && (yield* this.pushCount(1), (t = t.substring(1))), t[0] === '%')) {
                let e = t.length,
                    n = t.indexOf('#');
                for (; n !== -1; ) {
                    let r = t[n - 1];
                    if (r === ' ' || r === '	') {
                        e = n - 1;
                        break;
                    } else n = t.indexOf('#', n + 1);
                }
                for (;;) {
                    let r = t[e - 1];
                    if (r === ' ' || r === '	') e -= 1;
                    else break;
                }
                let i = (yield* this.pushCount(e)) + (yield* this.pushSpaces(!0));
                return (yield* this.pushCount(t.length - i), this.pushNewline(), 'stream');
            }
            if (this.atLineEnd()) {
                let e = yield* this.pushSpaces(!0);
                return (yield* this.pushCount(t.length - e), yield* this.pushNewline(), 'stream');
            }
            return (yield kt, yield* this.parseLineStart());
        }
        *parseLineStart() {
            let t = this.charAt(0);
            if (!t && !this.atEnd) return this.setNext('line-start');
            if (t === '-' || t === '.') {
                if (!this.atEnd && !this.hasChars(4)) return this.setNext('line-start');
                let e = this.peek(3);
                if ((e === '---' || e === '...') && ge(this.charAt(3)))
                    return (yield* this.pushCount(3), (this.indentValue = 0), (this.indentNext = 0), e === '---' ? 'doc' : 'stream');
            }
            return (
                (this.indentValue = yield* this.pushSpaces(!1)),
                this.indentNext > this.indentValue && !ge(this.charAt(1)) && (this.indentNext = this.indentValue),
                yield* this.parseBlockStart()
            );
        }
        *parseBlockStart() {
            let [t, e] = this.peek(2);
            if (!e && !this.atEnd) return this.setNext('block-start');
            if ((t === '-' || t === '?' || t === ':') && ge(e)) {
                let n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
                return ((this.indentNext = this.indentValue + 1), (this.indentValue += n), yield* this.parseBlockStart());
            }
            return 'doc';
        }
        *parseDocument() {
            yield* this.pushSpaces(!0);
            let t = this.getLine();
            if (t === null) return this.setNext('doc');
            let e = yield* this.pushIndicators();
            switch (t[e]) {
                case '#':
                    yield* this.pushCount(t.length - e);
                case void 0:
                    return (yield* this.pushNewline(), yield* this.parseLineStart());
                case '{':
                case '[':
                    return (yield* this.pushCount(1), (this.flowKey = !1), (this.flowLevel = 1), 'flow');
                case '}':
                case ']':
                    return (yield* this.pushCount(1), 'doc');
                case '*':
                    return (yield* this.pushUntil(Ds), 'doc');
                case '"':
                case "'":
                    return yield* this.parseQuotedScalar();
                case '|':
                case '>':
                    return (
                        (e += yield* this.parseBlockScalarHeader()),
                        (e += yield* this.pushSpaces(!0)),
                        yield* this.pushCount(t.length - e),
                        yield* this.pushNewline(),
                        yield* this.parseBlockScalar()
                    );
                default:
                    return yield* this.parsePlainScalar();
            }
        }
        *parseFlowCollection() {
            let t,
                e,
                n = -1;
            do
                ((t = yield* this.pushNewline()),
                    t > 0 ? ((e = yield* this.pushSpaces(!1)), (this.indentValue = n = e)) : (e = 0),
                    (e += yield* this.pushSpaces(!0)));
            while (t + e > 0);
            let i = this.getLine();
            if (i === null) return this.setNext('flow');
            if (
                ((n !== -1 && n < this.indentNext && i[0] !== '#') || (n === 0 && (i.startsWith('---') || i.startsWith('...')) && ge(i[3]))) &&
                !(n === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === ']' || i[0] === '}'))
            )
                return ((this.flowLevel = 0), yield vt, yield* this.parseLineStart());
            let r = 0;
            for (; i[r] === ','; ) ((r += yield* this.pushCount(1)), (r += yield* this.pushSpaces(!0)), (this.flowKey = !1));
            switch (((r += yield* this.pushIndicators()), i[r])) {
                case void 0:
                    return 'flow';
                case '#':
                    return (yield* this.pushCount(i.length - r), 'flow');
                case '{':
                case '[':
                    return (yield* this.pushCount(1), (this.flowKey = !1), (this.flowLevel += 1), 'flow');
                case '}':
                case ']':
                    return (yield* this.pushCount(1), (this.flowKey = !0), (this.flowLevel -= 1), this.flowLevel ? 'flow' : 'doc');
                case '*':
                    return (yield* this.pushUntil(Ds), 'flow');
                case '"':
                case "'":
                    return ((this.flowKey = !0), yield* this.parseQuotedScalar());
                case ':': {
                    let l = this.charAt(1);
                    if (this.flowKey || ge(l) || l === ',')
                        return ((this.flowKey = !1), yield* this.pushCount(1), yield* this.pushSpaces(!0), 'flow');
                }
                default:
                    return ((this.flowKey = !1), yield* this.parsePlainScalar());
            }
        }
        *parseQuotedScalar() {
            let t = this.charAt(0),
                e = this.buffer.indexOf(t, this.pos + 1);
            if (t === "'") for (; e !== -1 && this.buffer[e + 1] === "'"; ) e = this.buffer.indexOf("'", e + 2);
            else
                for (; e !== -1; ) {
                    let r = 0;
                    for (; this.buffer[e - 1 - r] === '\\'; ) r += 1;
                    if (r % 2 === 0) break;
                    e = this.buffer.indexOf('"', e + 1);
                }
            let n = this.buffer.substring(0, e),
                i = n.indexOf(
                    `
`,
                    this.pos
                );
            if (i !== -1) {
                for (; i !== -1; ) {
                    let r = this.continueScalar(i + 1);
                    if (r === -1) break;
                    i = n.indexOf(
                        `
`,
                        r
                    );
                }
                i !== -1 && (e = i - (n[i - 1] === '\r' ? 2 : 1));
            }
            if (e === -1) {
                if (!this.atEnd) return this.setNext('quoted-scalar');
                e = this.buffer.length;
            }
            return (yield* this.pushToIndex(e + 1, !1), this.flowLevel ? 'flow' : 'doc');
        }
        *parseBlockScalarHeader() {
            ((this.blockScalarIndent = -1), (this.blockScalarKeep = !1));
            let t = this.pos;
            for (;;) {
                let e = this.buffer[++t];
                if (e === '+') this.blockScalarKeep = !0;
                else if (e > '0' && e <= '9') this.blockScalarIndent = Number(e) - 1;
                else if (e !== '-') break;
            }
            return yield* this.pushUntil((e) => ge(e) || e === '#');
        }
        *parseBlockScalar() {
            let t = this.pos - 1,
                e = 0,
                n;
            e: for (let r = this.pos; (n = this.buffer[r]); ++r)
                switch (n) {
                    case ' ':
                        e += 1;
                        break;
                    case `
`:
                        ((t = r), (e = 0));
                        break;
                    case '\r': {
                        let l = this.buffer[r + 1];
                        if (!l && !this.atEnd) return this.setNext('block-scalar');
                        if (
                            l ===
                            `
`
                        )
                            break;
                    }
                    default:
                        break e;
                }
            if (!n && !this.atEnd) return this.setNext('block-scalar');
            if (e >= this.indentNext) {
                this.blockScalarIndent === -1
                    ? (this.indentNext = e)
                    : (this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext));
                do {
                    let r = this.continueScalar(t + 1);
                    if (r === -1) break;
                    t = this.buffer.indexOf(
                        `
`,
                        r
                    );
                } while (t !== -1);
                if (t === -1) {
                    if (!this.atEnd) return this.setNext('block-scalar');
                    t = this.buffer.length;
                }
            }
            let i = t + 1;
            for (n = this.buffer[i]; n === ' '; ) n = this.buffer[++i];
            if (n === '	') {
                for (
                    ;
                    n === '	' ||
                    n === ' ' ||
                    n === '\r' ||
                    n ===
                        `
`;

                )
                    n = this.buffer[++i];
                t = i - 1;
            } else if (!this.blockScalarKeep)
                do {
                    let r = t - 1,
                        l = this.buffer[r];
                    l === '\r' && (l = this.buffer[--r]);
                    let c = r;
                    for (; l === ' '; ) l = this.buffer[--r];
                    if (
                        l ===
                            `
` &&
                        r >= this.pos &&
                        r + 1 + e > c
                    )
                        t = r;
                    else break;
                } while (!0);
            return (yield xe, yield* this.pushToIndex(t + 1, !0), yield* this.parseLineStart());
        }
        *parsePlainScalar() {
            let t = this.flowLevel > 0,
                e = this.pos - 1,
                n = this.pos - 1,
                i;
            for (; (i = this.buffer[++n]); )
                if (i === ':') {
                    let r = this.buffer[n + 1];
                    if (ge(r) || (t && rs.has(r))) break;
                    e = n;
                } else if (ge(i)) {
                    let r = this.buffer[n + 1];
                    if (
                        (i === '\r' &&
                            (r ===
                            `
`
                                ? ((n += 1),
                                  (i = `
`),
                                  (r = this.buffer[n + 1]))
                                : (e = n)),
                        r === '#' || (t && rs.has(r)))
                    )
                        break;
                    if (
                        i ===
                        `
`
                    ) {
                        let l = this.continueScalar(n + 1);
                        if (l === -1) break;
                        n = Math.max(n, l - 2);
                    }
                } else {
                    if (t && rs.has(i)) break;
                    e = n;
                }
            return !i && !this.atEnd ? this.setNext('plain-scalar') : (yield xe, yield* this.pushToIndex(e + 1, !0), t ? 'flow' : 'doc');
        }
        *pushCount(t) {
            return t > 0 ? (yield this.buffer.substr(this.pos, t), (this.pos += t), t) : 0;
        }
        *pushToIndex(t, e) {
            let n = this.buffer.slice(this.pos, t);
            return n ? (yield n, (this.pos += n.length), n.length) : (e && (yield ''), 0);
        }
        *pushIndicators() {
            switch (this.charAt(0)) {
                case '!':
                    return (yield* this.pushTag()) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
                case '&':
                    return (yield* this.pushUntil(Ds)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
                case '-':
                case '?':
                case ':': {
                    let t = this.flowLevel > 0,
                        e = this.charAt(1);
                    if (ge(e) || (t && rs.has(e)))
                        return (
                            t ? this.flowKey && (this.flowKey = !1) : (this.indentNext = this.indentValue + 1),
                            (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators())
                        );
                }
            }
            return 0;
        }
        *pushTag() {
            if (this.charAt(1) === '<') {
                let t = this.pos + 2,
                    e = this.buffer[t];
                for (; !ge(e) && e !== '>'; ) e = this.buffer[++t];
                return yield* this.pushToIndex(e === '>' ? t + 1 : t, !1);
            } else {
                let t = this.pos + 1,
                    e = this.buffer[t];
                for (; e; )
                    if (ir.has(e)) e = this.buffer[++t];
                    else if (e === '%' && ei.has(this.buffer[t + 1]) && ei.has(this.buffer[t + 2])) e = this.buffer[(t += 3)];
                    else break;
                return yield* this.pushToIndex(t, !1);
            }
        }
        *pushNewline() {
            let t = this.buffer[this.pos];
            return t ===
                `
`
                ? yield* this.pushCount(1)
                : t === '\r' &&
                    this.charAt(1) ===
                        `
`
                  ? yield* this.pushCount(2)
                  : 0;
        }
        *pushSpaces(t) {
            let e = this.pos - 1,
                n;
            do n = this.buffer[++e];
            while (n === ' ' || (t && n === '	'));
            let i = e - this.pos;
            return (i > 0 && (yield this.buffer.substr(this.pos, i), (this.pos = e)), i);
        }
        *pushUntil(t) {
            let e = this.pos,
                n = this.buffer[e];
            for (; !t(n); ) n = this.buffer[++e];
            return yield* this.pushToIndex(e, !1);
        }
    };
var tt = class {
    constructor() {
        ((this.lineStarts = []),
            (this.addNewLine = (t) => this.lineStarts.push(t)),
            (this.linePos = (t) => {
                let e = 0,
                    n = this.lineStarts.length;
                for (; e < n; ) {
                    let r = (e + n) >> 1;
                    this.lineStarts[r] < t ? (e = r + 1) : (n = r);
                }
                if (this.lineStarts[e] === t) return { line: e + 1, col: 1 };
                if (e === 0) return { line: 0, col: t };
                let i = this.lineStarts[e - 1];
                return { line: e, col: t - i + 1 };
            }));
    }
};
function Ue(s, t) {
    for (let e = 0; e < s.length; ++e) if (s[e].type === t) return !0;
    return !1;
}
function ti(s) {
    for (let t = 0; t < s.length; ++t)
        switch (s[t].type) {
            case 'space':
            case 'comment':
            case 'newline':
                break;
            default:
                return t;
        }
    return -1;
}
function ni(s) {
    switch (s?.type) {
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
        case 'flow-collection':
            return !0;
        default:
            return !1;
    }
}
function os(s) {
    switch (s.type) {
        case 'document':
            return s.start;
        case 'block-map': {
            let t = s.items[s.items.length - 1];
            return t.sep ?? t.start;
        }
        case 'block-seq':
            return s.items[s.items.length - 1].start;
        default:
            return [];
    }
}
function st(s) {
    if (s.length === 0) return [];
    let t = s.length;
    e: for (; --t >= 0; )
        switch (s[t].type) {
            case 'doc-start':
            case 'explicit-key-ind':
            case 'map-value-ind':
            case 'seq-item-ind':
            case 'newline':
                break e;
        }
    for (; s[++t]?.type === 'space'; );
    return s.splice(t, s.length);
}
function si(s) {
    if (s.start.type === 'flow-seq-start')
        for (let t of s.items)
            t.sep &&
                !t.value &&
                !Ue(t.start, 'explicit-key-ind') &&
                !Ue(t.sep, 'map-value-ind') &&
                (t.key && (t.value = t.key),
                delete t.key,
                ni(t.value)
                    ? t.value.end
                        ? Array.prototype.push.apply(t.value.end, t.sep)
                        : (t.value.end = t.sep)
                    : Array.prototype.push.apply(t.start, t.sep),
                delete t.sep);
}
var Be = class {
    constructor(t) {
        ((this.atNewLine = !0),
            (this.atScalar = !1),
            (this.indent = 0),
            (this.offset = 0),
            (this.onKeyLine = !1),
            (this.stack = []),
            (this.source = ''),
            (this.type = ''),
            (this.lexer = new et()),
            (this.onNewLine = t));
    }
    *parse(t, e = !1) {
        this.onNewLine && this.offset === 0 && this.onNewLine(0);
        for (let n of this.lexer.lex(t, e)) yield* this.next(n);
        e || (yield* this.end());
    }
    *next(t) {
        if (((this.source = t), this.atScalar)) {
            ((this.atScalar = !1), yield* this.step(), (this.offset += t.length));
            return;
        }
        let e = Bs(t);
        if (e)
            if (e === 'scalar') ((this.atNewLine = !1), (this.atScalar = !0), (this.type = 'scalar'));
            else {
                switch (((this.type = e), yield* this.step(), e)) {
                    case 'newline':
                        ((this.atNewLine = !0), (this.indent = 0), this.onNewLine && this.onNewLine(this.offset + t.length));
                        break;
                    case 'space':
                        this.atNewLine && t[0] === ' ' && (this.indent += t.length);
                        break;
                    case 'explicit-key-ind':
                    case 'map-value-ind':
                    case 'seq-item-ind':
                        this.atNewLine && (this.indent += t.length);
                        break;
                    case 'doc-mode':
                    case 'flow-error-end':
                        return;
                    default:
                        this.atNewLine = !1;
                }
                this.offset += t.length;
            }
        else {
            let n = `Not a YAML token: ${t}`;
            (yield* this.pop({ type: 'error', offset: this.offset, message: n, source: t }), (this.offset += t.length));
        }
    }
    *end() {
        for (; this.stack.length > 0; ) yield* this.pop();
    }
    get sourceToken() {
        return { type: this.type, offset: this.offset, indent: this.indent, source: this.source };
    }
    *step() {
        let t = this.peek(1);
        if (this.type === 'doc-end' && (!t || t.type !== 'doc-end')) {
            for (; this.stack.length > 0; ) yield* this.pop();
            this.stack.push({ type: 'doc-end', offset: this.offset, source: this.source });
            return;
        }
        if (!t) return yield* this.stream();
        switch (t.type) {
            case 'document':
                return yield* this.document(t);
            case 'alias':
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return yield* this.scalar(t);
            case 'block-scalar':
                return yield* this.blockScalar(t);
            case 'block-map':
                return yield* this.blockMap(t);
            case 'block-seq':
                return yield* this.blockSequence(t);
            case 'flow-collection':
                return yield* this.flowCollection(t);
            case 'doc-end':
                return yield* this.documentEnd(t);
        }
        yield* this.pop();
    }
    peek(t) {
        return this.stack[this.stack.length - t];
    }
    *pop(t) {
        let e = t ?? this.stack.pop();
        if (!e) yield { type: 'error', offset: this.offset, source: '', message: 'Tried to pop an empty stack' };
        else if (this.stack.length === 0) yield e;
        else {
            let n = this.peek(1);
            switch (
                (e.type === 'block-scalar'
                    ? (e.indent = 'indent' in n ? n.indent : 0)
                    : e.type === 'flow-collection' && n.type === 'document' && (e.indent = 0),
                e.type === 'flow-collection' && si(e),
                n.type)
            ) {
                case 'document':
                    n.value = e;
                    break;
                case 'block-scalar':
                    n.props.push(e);
                    break;
                case 'block-map': {
                    let i = n.items[n.items.length - 1];
                    if (i.value) {
                        (n.items.push({ start: [], key: e, sep: [] }), (this.onKeyLine = !0));
                        return;
                    } else if (i.sep) i.value = e;
                    else {
                        (Object.assign(i, { key: e, sep: [] }), (this.onKeyLine = !i.explicitKey));
                        return;
                    }
                    break;
                }
                case 'block-seq': {
                    let i = n.items[n.items.length - 1];
                    i.value ? n.items.push({ start: [], value: e }) : (i.value = e);
                    break;
                }
                case 'flow-collection': {
                    let i = n.items[n.items.length - 1];
                    !i || i.value ? n.items.push({ start: [], key: e, sep: [] }) : i.sep ? (i.value = e) : Object.assign(i, { key: e, sep: [] });
                    return;
                }
                default:
                    (yield* this.pop(), yield* this.pop(e));
            }
            if ((n.type === 'document' || n.type === 'block-map' || n.type === 'block-seq') && (e.type === 'block-map' || e.type === 'block-seq')) {
                let i = e.items[e.items.length - 1];
                i &&
                    !i.sep &&
                    !i.value &&
                    i.start.length > 0 &&
                    ti(i.start) === -1 &&
                    (e.indent === 0 || i.start.every((r) => r.type !== 'comment' || r.indent < e.indent)) &&
                    (n.type === 'document' ? (n.end = i.start) : n.items.push({ start: i.start }), e.items.splice(-1, 1));
            }
        }
    }
    *stream() {
        switch (this.type) {
            case 'directive-line':
                yield { type: 'directive', offset: this.offset, source: this.source };
                return;
            case 'byte-order-mark':
            case 'space':
            case 'comment':
            case 'newline':
                yield this.sourceToken;
                return;
            case 'doc-mode':
            case 'doc-start': {
                let t = { type: 'document', offset: this.offset, start: [] };
                (this.type === 'doc-start' && t.start.push(this.sourceToken), this.stack.push(t));
                return;
            }
        }
        yield { type: 'error', offset: this.offset, message: `Unexpected ${this.type} token in YAML stream`, source: this.source };
    }
    *document(t) {
        if (t.value) return yield* this.lineEnd(t);
        switch (this.type) {
            case 'doc-start': {
                ti(t.start) !== -1 ? (yield* this.pop(), yield* this.step()) : t.start.push(this.sourceToken);
                return;
            }
            case 'anchor':
            case 'tag':
            case 'space':
            case 'comment':
            case 'newline':
                t.start.push(this.sourceToken);
                return;
        }
        let e = this.startBlockValue(t);
        e
            ? this.stack.push(e)
            : yield { type: 'error', offset: this.offset, message: `Unexpected ${this.type} token in YAML document`, source: this.source };
    }
    *scalar(t) {
        if (this.type === 'map-value-ind') {
            let e = os(this.peek(2)),
                n = st(e),
                i;
            t.end ? ((i = t.end), i.push(this.sourceToken), delete t.end) : (i = [this.sourceToken]);
            let r = { type: 'block-map', offset: t.offset, indent: t.indent, items: [{ start: n, key: t, sep: i }] };
            ((this.onKeyLine = !0), (this.stack[this.stack.length - 1] = r));
        } else yield* this.lineEnd(t);
    }
    *blockScalar(t) {
        switch (this.type) {
            case 'space':
            case 'comment':
            case 'newline':
                t.props.push(this.sourceToken);
                return;
            case 'scalar':
                if (((t.source = this.source), (this.atNewLine = !0), (this.indent = 0), this.onNewLine)) {
                    let e =
                        this.source.indexOf(`
`) + 1;
                    for (; e !== 0; )
                        (this.onNewLine(this.offset + e),
                            (e =
                                this.source.indexOf(
                                    `
`,
                                    e
                                ) + 1));
                }
                yield* this.pop();
                break;
            default:
                (yield* this.pop(), yield* this.step());
        }
    }
    *blockMap(t) {
        let e = t.items[t.items.length - 1];
        switch (this.type) {
            case 'newline':
                if (((this.onKeyLine = !1), e.value)) {
                    let n = 'end' in e.value ? e.value.end : void 0;
                    (Array.isArray(n) ? n[n.length - 1] : void 0)?.type === 'comment'
                        ? n?.push(this.sourceToken)
                        : t.items.push({ start: [this.sourceToken] });
                } else e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
                return;
            case 'space':
            case 'comment':
                if (e.value) t.items.push({ start: [this.sourceToken] });
                else if (e.sep) e.sep.push(this.sourceToken);
                else {
                    if (this.atIndentedComment(e.start, t.indent)) {
                        let i = t.items[t.items.length - 2]?.value?.end;
                        if (Array.isArray(i)) {
                            (Array.prototype.push.apply(i, e.start), i.push(this.sourceToken), t.items.pop());
                            return;
                        }
                    }
                    e.start.push(this.sourceToken);
                }
                return;
        }
        if (this.indent >= t.indent) {
            let n = !this.onKeyLine && this.indent === t.indent,
                i = n && (e.sep || e.explicitKey) && this.type !== 'seq-item-ind',
                r = [];
            if (i && e.sep && !e.value) {
                let l = [];
                for (let c = 0; c < e.sep.length; ++c) {
                    let o = e.sep[c];
                    switch (o.type) {
                        case 'newline':
                            l.push(c);
                            break;
                        case 'space':
                            break;
                        case 'comment':
                            o.indent > t.indent && (l.length = 0);
                            break;
                        default:
                            l.length = 0;
                    }
                }
                l.length >= 2 && (r = e.sep.splice(l[1]));
            }
            switch (this.type) {
                case 'anchor':
                case 'tag':
                    i || e.value
                        ? (r.push(this.sourceToken), t.items.push({ start: r }), (this.onKeyLine = !0))
                        : e.sep
                          ? e.sep.push(this.sourceToken)
                          : e.start.push(this.sourceToken);
                    return;
                case 'explicit-key-ind':
                    (!e.sep && !e.explicitKey
                        ? (e.start.push(this.sourceToken), (e.explicitKey = !0))
                        : i || e.value
                          ? (r.push(this.sourceToken), t.items.push({ start: r, explicitKey: !0 }))
                          : this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start: [this.sourceToken], explicitKey: !0 }],
                            }),
                        (this.onKeyLine = !0));
                    return;
                case 'map-value-ind':
                    if (e.explicitKey)
                        if (e.sep)
                            if (e.value) t.items.push({ start: [], key: null, sep: [this.sourceToken] });
                            else if (Ue(e.sep, 'map-value-ind'))
                                this.stack.push({
                                    type: 'block-map',
                                    offset: this.offset,
                                    indent: this.indent,
                                    items: [{ start: r, key: null, sep: [this.sourceToken] }],
                                });
                            else if (ni(e.key) && !Ue(e.sep, 'newline')) {
                                let l = st(e.start),
                                    c = e.key,
                                    o = e.sep;
                                (o.push(this.sourceToken),
                                    delete e.key,
                                    delete e.sep,
                                    this.stack.push({
                                        type: 'block-map',
                                        offset: this.offset,
                                        indent: this.indent,
                                        items: [{ start: l, key: c, sep: o }],
                                    }));
                            } else r.length > 0 ? (e.sep = e.sep.concat(r, this.sourceToken)) : e.sep.push(this.sourceToken);
                        else if (Ue(e.start, 'newline')) Object.assign(e, { key: null, sep: [this.sourceToken] });
                        else {
                            let l = st(e.start);
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start: l, key: null, sep: [this.sourceToken] }],
                            });
                        }
                    else
                        e.sep
                            ? e.value || i
                                ? t.items.push({ start: r, key: null, sep: [this.sourceToken] })
                                : Ue(e.sep, 'map-value-ind')
                                  ? this.stack.push({
                                        type: 'block-map',
                                        offset: this.offset,
                                        indent: this.indent,
                                        items: [{ start: [], key: null, sep: [this.sourceToken] }],
                                    })
                                  : e.sep.push(this.sourceToken)
                            : Object.assign(e, { key: null, sep: [this.sourceToken] });
                    this.onKeyLine = !0;
                    return;
                case 'alias':
                case 'scalar':
                case 'single-quoted-scalar':
                case 'double-quoted-scalar': {
                    let l = this.flowScalar(this.type);
                    i || e.value
                        ? (t.items.push({ start: r, key: l, sep: [] }), (this.onKeyLine = !0))
                        : e.sep
                          ? this.stack.push(l)
                          : (Object.assign(e, { key: l, sep: [] }), (this.onKeyLine = !0));
                    return;
                }
                default: {
                    let l = this.startBlockValue(t);
                    if (l) {
                        if (l.type === 'block-seq') {
                            if (!e.explicitKey && e.sep && !Ue(e.sep, 'newline')) {
                                yield* this.pop({
                                    type: 'error',
                                    offset: this.offset,
                                    message: 'Unexpected block-seq-ind on same line with key',
                                    source: this.source,
                                });
                                return;
                            }
                        } else n && t.items.push({ start: r });
                        this.stack.push(l);
                        return;
                    }
                }
            }
        }
        (yield* this.pop(), yield* this.step());
    }
    *blockSequence(t) {
        let e = t.items[t.items.length - 1];
        switch (this.type) {
            case 'newline':
                if (e.value) {
                    let n = 'end' in e.value ? e.value.end : void 0;
                    (Array.isArray(n) ? n[n.length - 1] : void 0)?.type === 'comment'
                        ? n?.push(this.sourceToken)
                        : t.items.push({ start: [this.sourceToken] });
                } else e.start.push(this.sourceToken);
                return;
            case 'space':
            case 'comment':
                if (e.value) t.items.push({ start: [this.sourceToken] });
                else {
                    if (this.atIndentedComment(e.start, t.indent)) {
                        let i = t.items[t.items.length - 2]?.value?.end;
                        if (Array.isArray(i)) {
                            (Array.prototype.push.apply(i, e.start), i.push(this.sourceToken), t.items.pop());
                            return;
                        }
                    }
                    e.start.push(this.sourceToken);
                }
                return;
            case 'anchor':
            case 'tag':
                if (e.value || this.indent <= t.indent) break;
                e.start.push(this.sourceToken);
                return;
            case 'seq-item-ind':
                if (this.indent !== t.indent) break;
                e.value || Ue(e.start, 'seq-item-ind') ? t.items.push({ start: [this.sourceToken] }) : e.start.push(this.sourceToken);
                return;
        }
        if (this.indent > t.indent) {
            let n = this.startBlockValue(t);
            if (n) {
                this.stack.push(n);
                return;
            }
        }
        (yield* this.pop(), yield* this.step());
    }
    *flowCollection(t) {
        let e = t.items[t.items.length - 1];
        if (this.type === 'flow-error-end') {
            let n;
            do (yield* this.pop(), (n = this.peek(1)));
            while (n && n.type === 'flow-collection');
        } else if (t.end.length === 0) {
            switch (this.type) {
                case 'comma':
                case 'explicit-key-ind':
                    !e || e.sep ? t.items.push({ start: [this.sourceToken] }) : e.start.push(this.sourceToken);
                    return;
                case 'map-value-ind':
                    !e || e.value
                        ? t.items.push({ start: [], key: null, sep: [this.sourceToken] })
                        : e.sep
                          ? e.sep.push(this.sourceToken)
                          : Object.assign(e, { key: null, sep: [this.sourceToken] });
                    return;
                case 'space':
                case 'comment':
                case 'newline':
                case 'anchor':
                case 'tag':
                    !e || e.value
                        ? t.items.push({ start: [this.sourceToken] })
                        : e.sep
                          ? e.sep.push(this.sourceToken)
                          : e.start.push(this.sourceToken);
                    return;
                case 'alias':
                case 'scalar':
                case 'single-quoted-scalar':
                case 'double-quoted-scalar': {
                    let i = this.flowScalar(this.type);
                    !e || e.value ? t.items.push({ start: [], key: i, sep: [] }) : e.sep ? this.stack.push(i) : Object.assign(e, { key: i, sep: [] });
                    return;
                }
                case 'flow-map-end':
                case 'flow-seq-end':
                    t.end.push(this.sourceToken);
                    return;
            }
            let n = this.startBlockValue(t);
            n ? this.stack.push(n) : (yield* this.pop(), yield* this.step());
        } else {
            let n = this.peek(2);
            if (
                n.type === 'block-map' &&
                ((this.type === 'map-value-ind' && n.indent === t.indent) || (this.type === 'newline' && !n.items[n.items.length - 1].sep))
            )
                (yield* this.pop(), yield* this.step());
            else if (this.type === 'map-value-ind' && n.type !== 'flow-collection') {
                let i = os(n),
                    r = st(i);
                si(t);
                let l = t.end.splice(1, t.end.length);
                l.push(this.sourceToken);
                let c = { type: 'block-map', offset: t.offset, indent: t.indent, items: [{ start: r, key: t, sep: l }] };
                ((this.onKeyLine = !0), (this.stack[this.stack.length - 1] = c));
            } else yield* this.lineEnd(t);
        }
    }
    flowScalar(t) {
        if (this.onNewLine) {
            let e =
                this.source.indexOf(`
`) + 1;
            for (; e !== 0; )
                (this.onNewLine(this.offset + e),
                    (e =
                        this.source.indexOf(
                            `
`,
                            e
                        ) + 1));
        }
        return { type: t, offset: this.offset, indent: this.indent, source: this.source };
    }
    startBlockValue(t) {
        switch (this.type) {
            case 'alias':
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return this.flowScalar(this.type);
            case 'block-scalar-header':
                return { type: 'block-scalar', offset: this.offset, indent: this.indent, props: [this.sourceToken], source: '' };
            case 'flow-map-start':
            case 'flow-seq-start':
                return { type: 'flow-collection', offset: this.offset, indent: this.indent, start: this.sourceToken, items: [], end: [] };
            case 'seq-item-ind':
                return { type: 'block-seq', offset: this.offset, indent: this.indent, items: [{ start: [this.sourceToken] }] };
            case 'explicit-key-ind': {
                this.onKeyLine = !0;
                let e = os(t),
                    n = st(e);
                return (
                    n.push(this.sourceToken),
                    { type: 'block-map', offset: this.offset, indent: this.indent, items: [{ start: n, explicitKey: !0 }] }
                );
            }
            case 'map-value-ind': {
                this.onKeyLine = !0;
                let e = os(t),
                    n = st(e);
                return { type: 'block-map', offset: this.offset, indent: this.indent, items: [{ start: n, key: null, sep: [this.sourceToken] }] };
            }
        }
        return null;
    }
    atIndentedComment(t, e) {
        return this.type !== 'comment' || this.indent <= e ? !1 : t.every((n) => n.type === 'newline' || n.type === 'space');
    }
    *documentEnd(t) {
        this.type !== 'doc-mode' &&
            (t.end ? t.end.push(this.sourceToken) : (t.end = [this.sourceToken]), this.type === 'newline' && (yield* this.pop()));
    }
    *lineEnd(t) {
        switch (this.type) {
            case 'comma':
            case 'doc-start':
            case 'doc-end':
            case 'flow-seq-end':
            case 'flow-map-end':
            case 'map-value-ind':
                (yield* this.pop(), yield* this.step());
                break;
            case 'newline':
                this.onKeyLine = !1;
            case 'space':
            case 'comment':
            default:
                (t.end ? t.end.push(this.sourceToken) : (t.end = [this.sourceToken]), this.type === 'newline' && (yield* this.pop()));
        }
    }
};
function ii(s) {
    let t = s.prettyErrors !== !1;
    return { lineCounter: s.lineCounter || (t && new tt()) || null, prettyErrors: t };
}
function ri(s, t = {}) {
    let { lineCounter: e, prettyErrors: n } = ii(t),
        i = new Be(e?.addNewLine),
        r = new je(t),
        l = Array.from(r.compose(i.parse(s)));
    if (n && e) for (let c of l) (c.errors.forEach(mt(s, e)), c.warnings.forEach(mt(s, e)));
    return l.length > 0 ? l : Object.assign([], { empty: !0 }, r.streamInfo());
}
function Fs(s, t = {}) {
    let { lineCounter: e, prettyErrors: n } = ii(t),
        i = new Be(e?.addNewLine),
        r = new je(t),
        l = null;
    for (let c of r.compose(i.parse(s), !0, s.length))
        if (!l) l = c;
        else if (l.options.logLevel !== 'silent') {
            l.errors.push(new oe(c.range.slice(0, 2), 'MULTIPLE_DOCS', 'Source contains multiple documents; please use YAML.parseAllDocuments()'));
            break;
        }
    return (n && e && (l.errors.forEach(mt(s, e)), l.warnings.forEach(mt(s, e))), l);
}
function oi(s, t, e) {
    let n;
    typeof t == 'function' ? (n = t) : e === void 0 && t && typeof t == 'object' && (e = t);
    let i = Fs(s, e);
    if (!i) return null;
    if ((i.warnings.forEach((r) => Pt(i.options.logLevel, r)), i.errors.length > 0)) {
        if (i.options.logLevel !== 'silent') throw i.errors[0];
        i.errors = [];
    }
    return i.toJS(Object.assign({ reviver: n }, e));
}
function ai(s, t, e) {
    let n = null;
    if (
        (typeof t == 'function' || Array.isArray(t) ? (n = t) : e === void 0 && t && (e = t),
        typeof e == 'string' && (e = e.length),
        typeof e == 'number')
    ) {
        let i = Math.round(e);
        e = i < 1 ? void 0 : i > 8 ? { indent: 8 } : { indent: i };
    }
    if (s === void 0) {
        let { keepUndefined: i } = e ?? t ?? {};
        if (!i) return;
    }
    return ae(s) && !n ? s.toString(e) : new $e(s, n, e).toString(e);
}
var li = Ks;
var ci = {
        from(s) {
            return {
                toString(t) {
                    return new TextDecoder(t).decode(new TextEncoder().encode(s));
                },
            };
        },
    },
    or = {
        generateFingerprint(s) {
            function t(c) {
                let o = new Uint32Array([
                        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401,
                        607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628,
                        770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
                        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
                        2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
                        659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
                        2428436474, 2756734187, 3204031479, 3329325298,
                    ]),
                    u = 1779033703,
                    g = 3144134277,
                    h = 1013904242,
                    p = 2773480762,
                    _ = 1359893119,
                    v = 2600822924,
                    d = 528734635,
                    m = 1541459225,
                    w = new TextEncoder().encode(c),
                    y = w.length * 8,
                    N = new Uint8Array(((w.length + 9 + 63) >> 6) << 6);
                (N.set(w), (N[w.length] = 128));
                let $ = new DataView(N.buffer);
                $.setUint32(N.length - 4, y, !1);
                for (let I = 0; I < N.length; I += 64) {
                    let S = new Uint32Array(64);
                    for (let C = 0; C < 16; C++) S[C] = $.getUint32(I + C * 4, !1);
                    for (let C = 16; C < 64; C++) {
                        let j = ((S[C - 15] >>> 7) | (S[C - 15] << 25)) ^ ((S[C - 15] >>> 18) | (S[C - 15] << 14)) ^ (S[C - 15] >>> 3),
                            K = ((S[C - 2] >>> 17) | (S[C - 2] << 15)) ^ ((S[C - 2] >>> 19) | (S[C - 2] << 13)) ^ (S[C - 2] >>> 10);
                        S[C] = (S[C - 16] + j + S[C - 7] + K) >>> 0;
                    }
                    let E = u,
                        A = g,
                        O = h,
                        L = p,
                        a = _,
                        f = v,
                        b = d,
                        k = m;
                    for (let C = 0; C < 64; C++) {
                        let j = ((a >>> 6) | (a << 26)) ^ ((a >>> 11) | (a << 21)) ^ ((a >>> 25) | (a << 7)),
                            K = (a & f) ^ (~a & b),
                            M = (k + j + K + o[C] + S[C]) >>> 0,
                            q = ((E >>> 2) | (E << 30)) ^ ((E >>> 13) | (E << 19)) ^ ((E >>> 22) | (E << 10)),
                            X = (E & A) ^ (E & O) ^ (A & O),
                            z = (q + X) >>> 0;
                        ((k = b), (b = f), (f = a), (a = (L + M) >>> 0), (L = O), (O = A), (A = E), (E = (M + z) >>> 0));
                    }
                    ((u = (u + E) >>> 0),
                        (g = (g + A) >>> 0),
                        (h = (h + O) >>> 0),
                        (p = (p + L) >>> 0),
                        (_ = (_ + a) >>> 0),
                        (v = (v + f) >>> 0),
                        (d = (d + b) >>> 0),
                        (m = (m + k) >>> 0));
                }
                return [u, g, h, p, _, v, d, m].map((I) => I.toString(16).padStart(8, '0')).join('');
            }
            function e(c) {
                return atob(
                    c
                        .replace(/-----BEGIN CERTIFICATE-----/, '')
                        .replace(/-----END CERTIFICATE-----/, '')
                        .replace(/\s+/g, '')
                );
            }
            function n(c) {
                return Array.from(c)
                    .map((o) => o.charCodeAt(0).toString(16).padStart(2, '0'))
                    .join('');
            }
            let i = e(s),
                r = n(i);
            return t(r).match(/.{2}/g).join(':').toUpperCase();
        },
    },
    qs = li.parse,
    ar = mi(),
    lr = { v2ray: mi(), mihomo: pi(), singbox: mr(), base64: gr() },
    W = {
        info: (...s) => {
            console.log('[INFO]', ...s);
        },
        error: (...s) => {
            console.log('[ERROR]', ...s);
        },
        log: (...s) => {
            console.log('[LOG]', ...s);
        },
    },
    cr = () => ({
        parse: (t) => {
            let [e, n] = t.split('://'),
                i = new URL('http://' + n),
                r = i.searchParams,
                l = {
                    name: decodeURIComponent(i.hash.slice(1)),
                    type: 'trojan',
                    server: i.hostname,
                    port: Number(i.port),
                    password: i.username,
                    udp: !0,
                    'skip-cert-verify': !!r.get('allowInsecure'),
                };
            (r.get('alpn') && (l.alpn = r.get('alpn').split(',')), r.get('sni') && (l.sni = r.get('sni')));
            let c = r.get('type')?.toLowerCase();
            switch ((c && (l.network = c), c)) {
                case 'ws': {
                    let o = { path: r.get('path'), headers: { 'User-Agent': '' } };
                    l['ws-opts'] = o;
                    break;
                }
                case 'grpc': {
                    l['grpc-opts'] = { 'grpc-service-name': r.get('serviceName') };
                    break;
                }
            }
            return ((l['client-fingerprint'] = r.get('fp') || 'chrome'), l);
        },
    }),
    fr = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/,
    ur =
        /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
function Vs(s) {
    return fr.test(s);
}
function cs(s) {
    return ur.test(s);
}
function ls(s) {
    return typeof s == 'string' && s.trim().length > 0;
}
function J(s, t) {
    return ls(s) ? s : t;
}
function H(s) {
    if (arguments.length === 1) return typeof s < 'u' && s !== null;
    if (arguments.length === 2) {
        let t = arguments[1],
            e = Array.isArray(t) ? t : t.split('.').filter(Boolean),
            n = s;
        for (let i of e) {
            if (n == null || typeof n != 'object') return !1;
            n = n[i];
        }
        return n != null;
    }
}
function $t(s, t) {
    return H(s) ? s : t;
}
function fi(s) {
    return typeof s == 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(s);
}
function dr(s) {
    return /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/.test(s);
}
function hr(s, t) {
    return ((s = Math.ceil(s)), (t = Math.floor(t)), Math.floor(Math.random() * (t - s + 1)) + s);
}
function hi(s) {
    let t = s.split(/,|\//),
        e = t[Math.floor(Math.random() * t.length)];
    if (e.includes('-')) {
        let [n, i] = e.split('-').map(Number);
        return hr(n, i);
    } else return Number(e);
}
function pr(s) {
    return Number.isSafeInteger(s) ? String(s) : BigInt(s).toString();
}
function pi() {
    let s = { dual: 'dual', 'v4-only': 'ipv4', 'v6-only': 'ipv6', 'prefer-v4': 'ipv4-prefer', 'prefer-v6': 'ipv6-prefer' };
    return {
        type: 'ALL',
        produce: (n, i, r = {}) => {
            let l = n
                .filter((c) =>
                    r['include-unsupported-proxy']
                        ? !0
                        : (c.type === 'snell' && c.version >= 4) || ['juicity'].includes(c.type)
                          ? !1
                          : !(
                                ['ss'].includes(c.type) &&
                                ![
                                    'aes-128-ctr',
                                    'aes-192-ctr',
                                    'aes-256-ctr',
                                    'aes-128-cfb',
                                    'aes-192-cfb',
                                    'aes-256-cfb',
                                    'aes-128-gcm',
                                    'aes-192-gcm',
                                    'aes-256-gcm',
                                    'aes-128-ccm',
                                    'aes-192-ccm',
                                    'aes-256-ccm',
                                    'aes-128-gcm-siv',
                                    'aes-256-gcm-siv',
                                    'chacha20-ietf',
                                    'chacha20',
                                    'xchacha20',
                                    'chacha20-ietf-poly1305',
                                    'xchacha20-ietf-poly1305',
                                    'chacha8-ietf-poly1305',
                                    'xchacha8-ietf-poly1305',
                                    '2022-blake3-aes-128-gcm',
                                    '2022-blake3-aes-256-gcm',
                                    '2022-blake3-chacha20-poly1305',
                                    'lea-128-gcm',
                                    'lea-192-gcm',
                                    'lea-256-gcm',
                                    'rabbit128-poly1305',
                                    'aegis-128l',
                                    'aegis-256',
                                    'aez-384',
                                    'deoxys-ii-256-128',
                                    'rc4-md5',
                                    'none',
                                ].includes(c.cipher)
                            )
                )
                .map((c) => {
                    if (
                        (c.type === 'vmess'
                            ? (H(c, 'aead') && (c.aead && (c.alterId = 0), delete c.aead),
                              H(c, 'sni') && ((c.servername = c.sni), delete c.sni),
                              H(c, 'cipher') &&
                                  !['auto', 'none', 'zero', 'aes-128-gcm', 'chacha20-poly1305'].includes(c.cipher) &&
                                  (c.cipher = 'auto'))
                            : c.type === 'tuic'
                              ? (H(c, 'alpn') ? (c.alpn = Array.isArray(c.alpn) ? c.alpn : [c.alpn]) : (c.alpn = ['h3']),
                                H(c, 'tfo') && !H(c, 'fast-open') && (c['fast-open'] = c.tfo),
                                (!c.token || c.token.length === 0) && !H(c, 'version') && (c.version = 5))
                              : c.type === 'hysteria'
                                ? (H(c, 'auth_str') && !H(c, 'auth-str') && (c['auth-str'] = c.auth_str),
                                  H(c, 'alpn') && (c.alpn = Array.isArray(c.alpn) ? c.alpn : [c.alpn]),
                                  H(c, 'tfo') && !H(c, 'fast-open') && (c['fast-open'] = c.tfo))
                                : c.type === 'wireguard'
                                  ? ((c.keepalive = c.keepalive ?? c['persistent-keepalive']),
                                    (c['persistent-keepalive'] = c.keepalive),
                                    (c['preshared-key'] = c['preshared-key'] ?? c['pre-shared-key']),
                                    (c['pre-shared-key'] = c['preshared-key']))
                                  : c.type === 'snell' && c.version < 3
                                    ? delete c.udp
                                    : c.type === 'vless'
                                      ? H(c, 'sni') && ((c.servername = c.sni), delete c.sni)
                                      : c.type === 'ss' &&
                                        H(c, 'shadow-tls-password') &&
                                        !H(c, 'plugin') &&
                                        ((c.plugin = 'shadow-tls'),
                                        (c['plugin-opts'] = {
                                            host: c['shadow-tls-sni'],
                                            password: c['shadow-tls-password'],
                                            version: c['shadow-tls-version'],
                                        }),
                                        delete c['shadow-tls-password'],
                                        delete c['shadow-tls-sni'],
                                        delete c['shadow-tls-version']),
                        ['vmess', 'vless'].includes(c.type) && c.network === 'http')
                    ) {
                        let o = c['http-opts']?.path;
                        H(c, 'http-opts.path') && !Array.isArray(o) && (c['http-opts'].path = [o]);
                        let u = c['http-opts']?.headers?.Host;
                        H(c, 'http-opts.headers.Host') && !Array.isArray(u) && (c['http-opts'].headers.Host = [u]);
                    }
                    if (['vmess', 'vless'].includes(c.type) && c.network === 'h2') {
                        let o = c['h2-opts']?.path;
                        H(c, 'h2-opts.path') && Array.isArray(o) && (c['h2-opts'].path = o[0]);
                        let u = c['h2-opts']?.headers?.host;
                        H(c, 'h2-opts.headers.Host') && !Array.isArray(u) && (c['h2-opts'].headers.host = [u]);
                    }
                    if (['ws'].includes(c.network)) {
                        let o = c[`${c.network}-opts`]?.path;
                        if (o) {
                            let u = /^(.*?)(?:\?ed=(\d+))?$/,
                                [g, h = '', p = ''] = u.exec(o);
                            ((c[`${c.network}-opts`].path = h),
                                p !== '' &&
                                    ((c['ws-opts']['early-data-header-name'] = 'Sec-WebSocket-Protocol'),
                                    (c['ws-opts']['max-early-data'] = parseInt(p, 10))));
                        } else ((c[`${c.network}-opts`] = c[`${c.network}-opts`] || {}), (c[`${c.network}-opts`].path = '/'));
                    }
                    if (
                        (c['plugin-opts']?.tls && H(c, 'skip-cert-verify') && (c['plugin-opts']['skip-cert-verify'] = c['skip-cert-verify']),
                        ['trojan', 'tuic', 'hysteria', 'hysteria2', 'juicity', 'anytls'].includes(c.type) && delete c.tls,
                        c['tls-fingerprint'] && (c.fingerprint = c['tls-fingerprint']),
                        delete c['tls-fingerprint'],
                        c['underlying-proxy'] && (c['dialer-proxy'] = c['underlying-proxy']),
                        delete c['underlying-proxy'],
                        H(c, 'tls') && typeof c.tls != 'boolean' && delete c.tls,
                        delete c.subName,
                        delete c.collectionName,
                        delete c.id,
                        delete c.resolved,
                        delete c['no-resolve'],
                        i !== 'internal' || r['delete-underscore-fields'])
                    )
                        for (let o in c) (c[o] == null || /^_/i.test(o)) && delete c[o];
                    return (
                        ['grpc'].includes(c.network) &&
                            c[`${c.network}-opts`] &&
                            (delete c[`${c.network}-opts`]['_grpc-type'], delete c[`${c.network}-opts`]['_grpc-authority']),
                        c['ip-version'] && (c['ip-version'] = s[c['ip-version']] || c['ip-version']),
                        c
                    );
                });
            return i === 'internal'
                ? l
                : `proxies:
` +
                      l
                          .map(
                              (c) =>
                                  '  - ' +
                                  JSON.stringify(c) +
                                  `
`
                          )
                          .join('');
        },
    };
}
function mr() {
    let s = {
            ipv4: 'ipv4_only',
            ipv6: 'ipv6_only',
            'v4-only': 'ipv4_only',
            'v6-only': 'ipv6_only',
            'ipv4-prefer': 'prefer_ipv4',
            'ipv6-prefer': 'prefer_ipv6',
            'prefer-v4': 'prefer_ipv4',
            'prefer-v6': 'prefer_ipv6',
        },
        t = (a, f) => {
            let b = s[a['ip-version']];
            a._dns_server && b && (f.domain_resolver = { server: a._dns_server, strategy: b });
        },
        e = (a, f) => {
            f.detour = a['dialer-proxy'] || a.detour;
        },
        n = (a, f) => {
            ['tcp', 'udp'].includes(a._network) && (f.network = a._network);
        },
        i = (a, f) => {
            ((f.tcp_fast_open = !1),
                a.tfo && (f.tcp_fast_open = !0),
                a.tcp_fast_open && (f.tcp_fast_open = !0),
                a['tcp-fast-open'] && (f.tcp_fast_open = !0),
                f.tcp_fast_open || delete f.tcp_fast_open);
        },
        r = (a, f) => {
            !a ||
                !a.enabled ||
                ((f.multiplex = { enabled: !0 }),
                (f.multiplex.protocol = a.protocol),
                a['max-connections'] && (f.multiplex.max_connections = parseInt(`${a['max-connections']}`, 10)),
                a['max-streams'] && (f.multiplex.max_streams = parseInt(`${a['max-streams']}`, 10)),
                a['min-streams'] && (f.multiplex.min_streams = parseInt(`${a['min-streams']}`, 10)),
                a.padding && (f.multiplex.padding = !0),
                (a['brutal-opts']?.up || a['brutal-opts']?.down) &&
                    ((f.multiplex.brutal = { enabled: !0 }),
                    a['brutal-opts']?.up && (f.multiplex.brutal.up_mbps = parseInt(`${a['brutal-opts']?.up}`, 10)),
                    a['brutal-opts']?.down && (f.multiplex.brutal.down_mbps = parseInt(`${a['brutal-opts']?.down}`, 10))));
        },
        l = (a, f) => {
            let b = { type: 'ws', headers: {} };
            if (a['ws-opts']) {
                let { path: k = '', headers: C = {}, 'max-early-data': j, 'early-data-header-name': K } = a['ws-opts'];
                if (
                    ((b.early_data_header_name = K), (b.max_early_data = parseInt(j, 10)), k !== '' && (b.path = `${k}`), Object.keys(C).length > 0)
                ) {
                    let M = {};
                    for (let X of Object.keys(C)) {
                        let z = C[X];
                        z !== '' && (Array.isArray(z) || (z = [`${z}`]), z.length > 0 && (M[X] = z));
                    }
                    let { Host: q } = M;
                    if (q.length === 1)
                        for (let X of `Host:${q[0]}`.split(`
`)) {
                            let [z, T] = X.split(':');
                            T.trim() !== '' && (M[z.trim()] = T.trim().split(','));
                        }
                    b.headers = M;
                }
            }
            if (a['ws-headers']) {
                let k = {};
                for (let j of Object.keys(a['ws-headers'])) {
                    let K = a['ws-headers'][j];
                    K !== '' && (Array.isArray(K) || (K = [`${K}`]), K.length > 0 && (k[j] = K));
                }
                let { Host: C } = k;
                if (C.length === 1)
                    for (let j of `Host:${C[0]}`.split(`
`)) {
                        let [K, M] = j.split(':');
                        M.trim() !== '' && (k[K.trim()] = M.trim().split(','));
                    }
                for (let j of Object.keys(k)) b.headers[j] = k[j];
            }
            if ((a['ws-path'] && a['ws-path'] !== '' && (b.path = `${a['ws-path']}`), b.path)) {
                let k = /^(.*?)(?:\?ed=(\d+))?$/,
                    [C, j = '', K = ''] = k.exec(b.path);
                ((b.path = j), K !== '' && ((b.early_data_header_name = 'Sec-WebSocket-Protocol'), (b.max_early_data = parseInt(K, 10))));
            }
            (f.tls.insecure && (f.tls.server_name = b.headers.Host[0]),
                a['ws-opts'] &&
                    a['ws-opts']['v2ray-http-upgrade'] &&
                    ((b.type = 'httpupgrade'),
                    b.headers.Host && ((b.host = b.headers.Host[0]), delete b.headers.Host),
                    b.max_early_data && delete b.max_early_data,
                    b.early_data_header_name && delete b.early_data_header_name));
            for (let k of Object.keys(b.headers)) {
                let C = b.headers[k];
                C.length === 1 && (b.headers[k] = C[0]);
            }
            f.transport = b;
        },
        c = (a, f) => {
            let b = { type: 'http', headers: {} };
            if (a['http-opts']) {
                let { method: k = '', path: C = '', headers: j = {} } = a['http-opts'];
                (k !== '' && (b.method = k), Array.isArray(C) ? (b.path = `${C[0]}`) : C !== '' && (b.path = `${C}`));
                for (let K of Object.keys(j)) {
                    let M = j[K];
                    if (M !== '') {
                        if (K.toLowerCase() === 'host') {
                            let q = M;
                            (Array.isArray(q) || (q = `${q}`.split(',').map((X) => X.trim())), q.length > 0 && (b.host = q));
                            continue;
                        }
                        (Array.isArray(M) || (M = `${M}`.split(',').map((q) => q.trim())), M.length > 0 && (b.headers[K] = M));
                    }
                }
            }
            if (a['http-host'] && a['http-host'] !== '') {
                let k = a['http-host'];
                (Array.isArray(k) || (k = `${k}`.split(',').map((C) => C.trim())), k.length > 0 && (b.host = k));
            }
            if (a['http-path'] && a['http-path'] !== '') {
                let k = a['http-path'];
                Array.isArray(k) ? (b.path = `${k[0]}`) : k !== '' && (b.path = `${k}`);
            }
            (f.tls.insecure && (f.tls.server_name = b.host[0]), b.host?.length === 1 && (b.host = b.host[0]));
            for (let k of Object.keys(b.headers)) {
                let C = b.headers[k];
                C.length === 1 && (b.headers[k] = C[0]);
            }
            f.transport = b;
        },
        o = (a, f) => {
            let b = { type: 'http' };
            if (a['h2-opts']) {
                let { host: k = '', path: C = '' } = a['h2-opts'];
                (C !== '' && (b.path = `${C}`),
                    k !== '' && (Array.isArray(k) || (k = `${k}`.split(',').map((j) => j.trim())), k.length > 0 && (b.host = k)));
            }
            if (a['h2-host'] && a['h2-host'] !== '') {
                let k = a['h2-host'];
                (Array.isArray(k) || (k = `${k}`.split(',').map((C) => C.trim())), k.length > 0 && (b.host = k));
            }
            (a['h2-path'] && a['h2-path'] !== '' && (b.path = `${a['h2-path']}`),
                (f.tls.enabled = !0),
                f.tls.insecure && (f.tls.server_name = b.host[0]),
                b.host.length === 1 && (b.host = b.host[0]),
                (f.transport = b));
        },
        u = (a, f) => {
            let b = { type: 'grpc' };
            if (a['grpc-opts']) {
                let k = a['grpc-opts']['grpc-service-name'];
                k != null && k !== '' && (b.service_name = `${k}`);
            }
            f.transport = b;
        },
        g = (a, f) => {
            (a.tls && (f.tls.enabled = !0),
                a.servername && a.servername !== '' && (f.tls.server_name = a.servername),
                a.peer && a.peer !== '' && (f.tls.server_name = a.peer),
                a.sni && a.sni !== '' && (f.tls.server_name = a.sni),
                a['skip-cert-verify'] && (f.tls.insecure = !0),
                a.insecure && (f.tls.insecure = !0),
                a['disable-sni'] && (f.tls.disable_sni = !0),
                typeof a.alpn == 'string' ? (f.tls.alpn = [a.alpn]) : Array.isArray(a.alpn) && (f.tls.alpn = a.alpn),
                a.ca && (f.tls.certificate_path = `${a.ca}`),
                a.ca_str && (f.tls.certificate = [a.ca_str]),
                a['ca-str'] && (f.tls.certificate = [a['ca-str']]),
                a['reality-opts'] &&
                    ((f.tls.reality = { enabled: !0 }),
                    a['reality-opts']['public-key'] && (f.tls.reality.public_key = a['reality-opts']['public-key']),
                    a['reality-opts']['short-id'] && (f.tls.reality.short_id = a['reality-opts']['short-id']),
                    (f.tls.utls = { enabled: !0 })),
                !['hysteria', 'hysteria2', 'tuic'].includes(a.type) &&
                    a['client-fingerprint'] &&
                    a['client-fingerprint'] !== '' &&
                    (f.tls.utls = { enabled: !0, fingerprint: a['client-fingerprint'] }),
                f.tls.enabled || delete f.tls);
        },
        h = (a = {}) => {
            let f = { tag: a.name, type: 'ssh', server: a.server, server_port: parseInt(`${a.port}`, 10) };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            return (
                a.username && (f.user = a.username),
                a.password && (f.password = a.password),
                a.privateKey && (f.private_key_path = a.privateKey),
                a['private-key'] && (f.private_key_path = a['private-key']),
                a['private-key-passphrase'] && (f.private_key_passphrase = a['private-key-passphrase']),
                a['server-fingerprint'] &&
                    ((f.host_key = [a['server-fingerprint']]), (f.host_key_algorithms = [a['server-fingerprint'].split(' ')[0]])),
                a['host-key'] && (f.host_key = a['host-key']),
                a['host-key-algorithms'] && (f.host_key_algorithms = a['host-key-algorithms']),
                a['fast-open'] && (f.udp_fragment = !0),
                i(a, f),
                e(a, f),
                t(a, f),
                f
            );
        },
        p = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'http',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                tls: { enabled: !1, server_name: a.server, insecure: !1 },
            };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            if ((a.username && (f.username = a.username), a.password && (f.password = a.password), a.headers)) {
                f.headers = {};
                for (let b of Object.keys(a.headers)) f.headers[b] = `${a.headers[b]}`;
                Object.keys(f.headers).length === 0 && delete f.headers;
            }
            return (a['fast-open'] && (f.udp_fragment = !0), i(a, f), e(a, f), g(a, f), t(a, f), f);
        },
        _ = (a = {}) => {
            let f = { tag: a.name, type: 'socks', server: a.server, server_port: parseInt(`${a.port}`, 10), password: a.password, version: '5' };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            return (
                a.username && (f.username = a.username),
                a.password && (f.password = a.password),
                a.uot && (f.udp_over_tcp = !0),
                a['udp-over-tcp'] && (f.udp_over_tcp = !0),
                a['fast-open'] && (f.udp_fragment = !0),
                n(a, f),
                i(a, f),
                e(a, f),
                t(a, f),
                f
            );
        },
        v = (a = {}) => {
            let f = { tag: a.name, type: 'shadowsocks', method: a.cipher, password: a.password, detour: `${a.name}_shadowtls` };
            (a.uot && (f.udp_over_tcp = !0),
                a['udp-over-tcp'] &&
                    (f.udp_over_tcp = { enabled: !0, version: !a['udp-over-tcp-version'] || a['udp-over-tcp-version'] === 1 ? 1 : 2 }));
            let b = {
                tag: `${a.name}_shadowtls`,
                type: 'shadowtls',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                version: a['plugin-opts'].version,
                password: a['plugin-opts'].password,
                tls: { enabled: !0, server_name: a['plugin-opts'].host, utls: { enabled: !0, fingerprint: a['client-fingerprint'] } },
            };
            if (b.server_port < 0 || b.server_port > 65535) throw '\u7AEF\u53E3\u503C\u975E\u6CD5';
            return (
                a['fast-open'] === !0 && (b.udp_fragment = !0),
                i(a, b),
                e(a, b),
                r(a.smux, f),
                t(a, b),
                { type: 'ss-with-st', ssPart: f, stPart: b }
            );
        },
        d = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'shadowsocks',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                method: a.cipher,
                password: a.password,
            };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            if (
                (a.uot && (f.udp_over_tcp = !0),
                a['udp-over-tcp'] &&
                    (f.udp_over_tcp = { enabled: !0, version: !a['udp-over-tcp-version'] || a['udp-over-tcp-version'] === 1 ? 1 : 2 }),
                a['fast-open'] && (f.udp_fragment = !0),
                n(a, f),
                i(a, f),
                e(a, f),
                r(a.smux, f),
                t(a, f),
                a.plugin)
            ) {
                let b = [];
                (a.plugin === 'obfs' &&
                    ((f.plugin = 'obfs-local'),
                    (f.plugin_opts = ''),
                    a['obfs-host'] && (a['plugin-opts'].host = a['obfs-host']),
                    Object.keys(a['plugin-opts']).forEach((k) => {
                        switch (k) {
                            case 'mode':
                                b.push(`obfs=${a['plugin-opts'].mode}`);
                                break;
                            case 'host':
                                b.push(`obfs-host=${a['plugin-opts'].host}`);
                                break;
                            default:
                                b.push(`${k}=${a['plugin-opts'][k]}`);
                                break;
                        }
                    })),
                    a.plugin === 'v2ray-plugin' &&
                        ((f.plugin = 'v2ray-plugin'),
                        a['ws-host'] && (a['plugin-opts'].host = a['ws-host']),
                        a['ws-path'] && (a['plugin-opts'].path = a['ws-path']),
                        Object.keys(a['plugin-opts']).forEach((k) => {
                            switch (k) {
                                case 'tls':
                                    a['plugin-opts'].tls && b.push('tls');
                                    break;
                                case 'host':
                                    b.push(`host=${a['plugin-opts'].host}`);
                                    break;
                                case 'path':
                                    b.push(`path=${a['plugin-opts'].path}`);
                                    break;
                                case 'headers':
                                    b.push(`headers=${JSON.stringify(a['plugin-opts'].headers)}`);
                                    break;
                                case 'mux':
                                    a['plugin-opts'].mux && (f.multiplex = { enabled: !0 });
                                    break;
                                default:
                                    b.push(`${k}=${a['plugin-opts'][k]}`);
                            }
                        })),
                    (f.plugin_opts = b.join(';')));
            }
            return f;
        },
        m = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'shadowsocksr',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                method: a.cipher,
                password: a.password,
                obfs: a.obfs,
                protocol: a.protocol,
            };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            return (
                a['obfs-param'] && (f.obfs_param = a['obfs-param']),
                a['protocol-param'] && a['protocol-param'] !== '' && (f.protocol_param = a['protocol-param']),
                a['fast-open'] && (f.udp_fragment = !0),
                i(a, f),
                e(a, f),
                r(a.smux, f),
                t(a, f),
                f
            );
        },
        w = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'vmess',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                uuid: a.uuid,
                security: a.cipher,
                alter_id: parseInt(`${a.alterId}`, 10),
                tls: { enabled: !1, server_name: a.server, insecure: !1 },
            };
            if (
                (['auto', 'none', 'zero', 'aes-128-gcm', 'chacha20-poly1305', 'aes-128-ctr'].indexOf(f.security) === -1 && (f.security = 'auto'),
                f.server_port < 0 || f.server_port > 65535)
            )
                throw 'invalid port';
            return (
                a.xudp && (f.packet_encoding = 'xudp'),
                a['fast-open'] && (f.udp_fragment = !0),
                a.network === 'ws' && l(a, f),
                a.network === 'h2' && o(a, f),
                a.network === 'http' && c(a, f),
                a.network === 'grpc' && u(a, f),
                n(a, f),
                i(a, f),
                e(a, f),
                g(a, f),
                r(a.smux, f),
                t(a, f),
                f
            );
        },
        y = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'vless',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                uuid: a.uuid,
                tls: { enabled: !1, server_name: a.server, insecure: !1 },
            };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            return (
                a.xudp && (f.packet_encoding = 'xudp'),
                a['fast-open'] && (f.udp_fragment = !0),
                a.flow != null && (f.flow = a.flow),
                a.network === 'ws' && l(a, f),
                a.network === 'h2' && o(a, f),
                a.network === 'http' && c(a, f),
                a.network === 'grpc' && u(a, f),
                n(a, f),
                i(a, f),
                e(a, f),
                r(a.smux, f),
                g(a, f),
                t(a, f),
                f
            );
        },
        N = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'trojan',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                password: a.password,
                tls: { enabled: !0, server_name: a.server, insecure: !1 },
            };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            return (
                a['fast-open'] && (f.udp_fragment = !0),
                a.network === 'grpc' && u(a, f),
                a.network === 'ws' && l(a, f),
                n(a, f),
                i(a, f),
                e(a, f),
                g(a, f),
                r(a.smux, f),
                t(a, f),
                f
            );
        },
        $ = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'hysteria',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                disable_mtu_discovery: !1,
                tls: { enabled: !0, server_name: a.server, insecure: !1 },
            };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            (a.auth_str && (f.auth_str = `${a.auth_str}`),
                a['auth-str'] && (f.auth_str = `${a['auth-str']}`),
                a['fast-open'] && (f.udp_fragment = !0));
            let b = new RegExp('^[0-9]+[ 	]*[KMGT]*[Bb]ps$');
            return (
                b.test(`${a.up}`) && !`${a.up}`.endsWith('Mbps') ? (f.up = `${a.up}`) : (f.up_mbps = parseInt(`${a.up}`, 10)),
                b.test(`${a.down}`) && !`${a.down}`.endsWith('Mbps') ? (f.down = `${a.down}`) : (f.down_mbps = parseInt(`${a.down}`, 10)),
                a.obfs && (f.obfs = a.obfs),
                a.recv_window_conn && (f.recv_window_conn = a.recv_window_conn),
                a['recv-window-conn'] && (f.recv_window_conn = a['recv-window-conn']),
                a.recv_window && (f.recv_window = a.recv_window),
                a['recv-window'] && (f.recv_window = a['recv-window']),
                a.disable_mtu_discovery &&
                    (typeof a.disable_mtu_discovery == 'boolean'
                        ? (f.disable_mtu_discovery = a.disable_mtu_discovery)
                        : a.disable_mtu_discovery === 1 && (f.disable_mtu_discovery = !0)),
                n(a, f),
                g(a, f),
                e(a, f),
                i(a, f),
                r(a.smux, f),
                t(a, f),
                f
            );
        },
        I = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'hysteria2',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                password: a.password,
                obfs: {},
                tls: { enabled: !0, server_name: a.server, insecure: !1 },
            };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            return (
                a['hop-interval'] && (f.hop_interval = /^\d+$/.test(a['hop-interval']) ? `${a['hop-interval']}s` : a['hop-interval']),
                a.ports && (f.server_ports = a.ports.split(/\s*,\s*/).map((b) => b.replace(/\s*-\s*/g, ':'))),
                a.up && (f.up_mbps = parseInt(`${a.up}`, 10)),
                a.down && (f.down_mbps = parseInt(`${a.down}`, 10)),
                a.obfs === 'salamander' && (f.obfs.type = 'salamander'),
                a['obfs-password'] && (f.obfs.password = a['obfs-password']),
                f.obfs.type || delete f.obfs,
                n(a, f),
                g(a, f),
                i(a, f),
                e(a, f),
                r(a.smux, f),
                t(a, f),
                f
            );
        },
        S = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'tuic',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                uuid: a.uuid,
                password: a.password,
                tls: { enabled: !0, server_name: a.server, insecure: !1 },
            };
            if (f.server_port < 0 || f.server_port > 65535) throw 'invalid port';
            return (
                a['fast-open'] && (f.udp_fragment = !0),
                a['congestion-controller'] && a['congestion-controller'] !== 'cubic' && (f.congestion_control = a['congestion-controller']),
                a['udp-relay-mode'] && a['udp-relay-mode'] !== 'native' && (f.udp_relay_mode = a['udp-relay-mode']),
                a['reduce-rtt'] && (f.zero_rtt_handshake = !0),
                a['udp-over-stream'] && (f.udp_over_stream = !0),
                a['heartbeat-interval'] && (f.heartbeat = `${a['heartbeat-interval']}ms`),
                n(a, f),
                i(a, f),
                e(a, f),
                g(a, f),
                r(a.smux, f),
                t(a, f),
                f
            );
        },
        E = (a = {}) => {
            let f = {
                tag: a.name,
                type: 'anytls',
                server: a.server,
                server_port: parseInt(`${a.port}`, 10),
                password: a.password,
                tls: { enabled: !0, server_name: a.server, insecure: !1 },
            };
            return (
                /^\d+$/.test(a['idle-session-check-interval']) && (f.idle_session_check_interval = `${a['idle-session-check-interval']}s`),
                /^\d+$/.test(a['idle-session-timeout']) && (f.idle_session_timeout = `${a['idle-session-timeout']}s`),
                /^\d+$/.test(a['min-idle-session']) && (f.min_idle_session = parseInt(`${a['min-idle-session']}`, 10)),
                e(a, f),
                g(a, f),
                t(a, f),
                f
            );
        },
        A = (a = {}) => {
            let f = ['ip', 'ipv6']
                    .map((k) => a[k])
                    .map((k) => {
                        if (Vs(k)) return `${k}/32`;
                        if (cs(k)) return `${k}/128`;
                    })
                    .filter((k) => k),
                b = {
                    tag: a.name,
                    type: 'wireguard',
                    server: a.server,
                    server_port: parseInt(`${a.port}`, 10),
                    local_address: f,
                    private_key: a['private-key'],
                    peer_public_key: a['public-key'],
                    pre_shared_key: a['pre-shared-key'],
                    reserved: [],
                };
            if (b.server_port < 0 || b.server_port > 65535) throw 'invalid port';
            if ((a['fast-open'] && (b.udp_fragment = !0), typeof a.reserved == 'string')) b.reserved = a.reserved;
            else if (Array.isArray(a.reserved)) for (let k of a.reserved) b.reserved.push(k);
            else delete b.reserved;
            if (a.peers && a.peers.length > 0) {
                b.peers = [];
                for (let k of a.peers) {
                    let C = {
                        server: k.server,
                        server_port: parseInt(`${k.port}`, 10),
                        public_key: k['public-key'],
                        allowed_ips: k['allowed-ips'] || k.allowed_ips,
                        reserved: [],
                    };
                    if (typeof k.reserved == 'string') C.reserved.push(k.reserved);
                    else if (Array.isArray(k.reserved)) for (let j of k.reserved) C.reserved.push(j);
                    else delete C.reserved;
                    (k['pre-shared-key'] && (C.pre_shared_key = k['pre-shared-key']), b.peers.push(C));
                }
            }
            return (n(a, b), i(a, b), e(a, b), r(a.smux, b), t(a, b), b);
        };
    return {
        type: 'ALL',
        produce: (a, f, b = {}) => {
            let k = [];
            return (
                pi()
                    .produce(a, 'internal', { 'include-unsupported-proxy': !0 })
                    .map((C) => {
                        try {
                            switch (C.type) {
                                case 'ssh':
                                    k.push(h(C));
                                    break;
                                case 'http':
                                    k.push(p(C));
                                    break;
                                case 'socks5':
                                    if (C.tls) throw new Error(`Platform sing-box does not support proxy type: ${C.type} with tls`);
                                    k.push(_(C));
                                    break;
                                case 'ss':
                                    if (C.plugin === 'shadow-tls') {
                                        let { ssPart: j, stPart: K } = v(C);
                                        (k.push(j), k.push(K));
                                    } else k.push(d(C));
                                    break;
                                case 'ssr':
                                    if (b['include-unsupported-proxy']) k.push(m(C));
                                    else throw new Error(`Platform sing-box does not support proxy type: ${C.type}`);
                                    break;
                                case 'vmess':
                                    if (!C.network || ['ws', 'grpc', 'h2', 'http'].includes(C.network)) k.push(w(C));
                                    else throw new Error(`Platform sing-box does not support proxy type: ${C.type} with network ${C.network}`);
                                    break;
                                case 'vless':
                                    if (!C.flow || ['xtls-rprx-vision'].includes(C.flow)) k.push(y(C));
                                    else throw new Error(`Platform sing-box does not support proxy type: ${C.type} with flow ${C.flow}`);
                                    break;
                                case 'trojan':
                                    if (!C.flow) k.push(N(C));
                                    else throw new Error(`Platform sing-box does not support proxy type: ${C.type} with flow ${C.flow}`);
                                    break;
                                case 'hysteria':
                                    k.push($(C));
                                    break;
                                case 'hysteria2':
                                    k.push(I(C, b['include-unsupported-proxy']));
                                    break;
                                case 'tuic':
                                    if (!C.token || C.token.length === 0) k.push(S(C));
                                    else throw new Error('Platform sing-box does not support proxy type: TUIC v4');
                                    break;
                                case 'wireguard':
                                    k.push(A(C));
                                    break;
                                case 'anytls':
                                    k.push(E(C));
                                    break;
                                default:
                                    throw new Error(`Platform sing-box does not support proxy type: ${C.type}`);
                            }
                        } catch (j) {
                            W.error(j.message ?? j);
                        }
                    }),
                f === 'internal' ? k : JSON.stringify({ outbounds: k }, null, 2)
            );
        },
    };
}
function mi() {
    return {
        type: 'SINGLE',
        produce: (e) => {
            let n = '';
            (delete e.subName, delete e.collectionName, delete e.id, delete e.resolved, delete e['no-resolve']);
            for (let i in e) e[i] == null && delete e[i];
            switch (
                (['trojan', 'tuic', 'hysteria', 'hysteria2', 'juicity'].includes(e.type) && delete e.tls,
                !['vmess'].includes(e.type) && e.server && cs(e.server) && (e.server = `[${e.server}]`),
                e.type)
            ) {
                case 'socks5':
                    n = `socks://${encodeURIComponent(V.encode(`${e.username ?? ''}:${e.password ?? ''}`))}@${e.server}:${e.port}#${e.name}`;
                    break;
                case 'ss':
                    let i = `${e.cipher}:${e.password}`;
                    if (
                        ((n = `ss://${e.cipher?.startsWith('2022-blake3-') ? `${encodeURIComponent(e.cipher)}:${encodeURIComponent(e.password)}` : V.encode(i)}@${e.server}:${e.port}${e.plugin ? '/' : ''}`),
                        e.plugin)
                    ) {
                        n += '?plugin=';
                        let T = e['plugin-opts'];
                        switch (e.plugin) {
                            case 'obfs':
                                n += encodeURIComponent(`simple-obfs;obfs=${T.mode}${T.host ? ';obfs-host=' + T.host : ''}`);
                                break;
                            case 'v2ray-plugin':
                                n += encodeURIComponent(`v2ray-plugin;obfs=${T.mode}${T.host ? ';obfs-host' + T.host : ''}${T.tls ? ';tls' : ''}`);
                                break;
                            case 'shadow-tls':
                                n += encodeURIComponent(`shadow-tls;host=${T.host};password=${T.password};version=${T.version}`);
                                break;
                            default:
                                throw new Error(`Unsupported plugin option: ${e.plugin}`);
                        }
                    }
                    (e['udp-over-tcp'] && (n = `${n}${e.plugin ? '&' : '?'}uot=1`),
                        e.tfo && (n = `${n}${e.plugin || e['udp-over-tcp'] ? '&' : '?'}tfo=1`),
                        (n += `#${encodeURIComponent(e.name)}`));
                    break;
                case 'ssr':
                    ((n = `${e.server}:${e.port}:${e.protocol}:${e.cipher}:${e.obfs}:${V.encode(e.password)}/`),
                        (n += `?remarks=${V.encode(e.name)}${e['obfs-param'] ? '&obfsparam=' + V.encode(e['obfs-param']) : ''}${e['protocol-param'] ? '&protocolparam=' + V.encode(e['protocol-param']) : ''}`),
                        (n = 'ssr://' + V.encode(n)));
                    break;
                case 'vmess':
                    let r = '',
                        l = e.network || 'tcp';
                    if (
                        (e.network === 'http'
                            ? ((l = 'tcp'), (r = 'http'))
                            : e.network === 'ws' && e['ws-opts']?.['v2ray-http-upgrade'] && (l = 'httpupgrade'),
                        (n = {
                            v: '2',
                            ps: e.name,
                            add: e.server,
                            port: `${e.port}`,
                            id: e.uuid,
                            aid: `${e.alterId || 0}`,
                            scy: e.cipher,
                            net: l,
                            type: r,
                            tls: e.tls ? 'tls' : '',
                            alpn: Array.isArray(e.alpn) ? e.alpn.join(',') : e.alpn,
                            fp: e['client-fingerprint'],
                        }),
                        e.tls && e.sni && (n.sni = e.sni),
                        e.network)
                    ) {
                        let T = e[`${e.network}-opts`]?.path,
                            P = e[`${e.network}-opts`]?.headers?.Host;
                        ['grpc'].includes(e.network)
                            ? ((n.path = e[`${e.network}-opts`]?.['grpc-service-name']),
                              (n.type = e[`${e.network}-opts`]?.['_grpc-type'] || 'gun'),
                              (n.host = e[`${e.network}-opts`]?.['_grpc-authority']))
                            : ['kcp', 'quic'].includes(e.network)
                              ? ((n.type = e[`${e.network}-opts`]?.[`_${e.network}-type`] || 'none'),
                                (n.host = e[`${e.network}-opts`]?.[`_${e.network}-host`]),
                                (n.path = e[`${e.network}-opts`]?.[`_${e.network}-path`]))
                              : (T && (n.path = Array.isArray(T) ? T[0] : T), P && (n.host = Array.isArray(P) ? P[0] : P));
                    }
                    n = 'vmess://' + V.encode(JSON.stringify(n));
                    break;
                case 'vless':
                    let c = 'none',
                        o = e['reality-opts'],
                        u = '',
                        g = '',
                        h = '';
                    if (o) {
                        c = 'reality';
                        let T = e['reality-opts']?.['public-key'];
                        T && (g = `&pbk=${encodeURIComponent(T)}`);
                        let P = e['reality-opts']?.['short-id'];
                        P && (u = `&sid=${encodeURIComponent(P)}`);
                        let se = e['reality-opts']?.['_spider-x'];
                        se && (h = `&spx=${encodeURIComponent(se)}`);
                    } else e.tls && (c = 'tls');
                    let p = '';
                    e.alpn && (p = `&alpn=${encodeURIComponent(Array.isArray(e.alpn) ? e.alpn : e.alpn.join(','))}`);
                    let _ = '';
                    e['skip-cert-verify'] && (_ = '&allowInsecure=1');
                    let v = '';
                    e.sni && (v = `&sni=${encodeURIComponent(e.sni)}`);
                    let d = '';
                    e['client-fingerprint'] && (d = `&fp=${encodeURIComponent(e['client-fingerprint'])}`);
                    let m = '';
                    e.flow && (m = `&flow=${encodeURIComponent(e.flow)}`);
                    let w = '';
                    e._extra && (w = `&extra=${encodeURIComponent(e._extra)}`);
                    let y = '';
                    e._mode && (y = `&mode=${encodeURIComponent(e._mode)}`);
                    let N = e.network;
                    e.network === 'ws' && e['ws-opts']?.['v2ray-http-upgrade'] && (N = 'httpupgrade');
                    let $ = `&type=${encodeURIComponent(N)}`;
                    if (['grpc'].includes(e.network)) {
                        $ += `&mode=${encodeURIComponent(e[`${e.network}-opts`]?.['_grpc-type'] || 'gun')}`;
                        let T = e[`${e.network}-opts`]?.['_grpc-authority'];
                        T && ($ += `&authority=${encodeURIComponent(T)}`);
                    }
                    let I = e[`${e.network}-opts`]?.[`${e.network}-service-name`],
                        S = e[`${e.network}-opts`]?.path,
                        E = e[`${e.network}-opts`]?.headers?.Host;
                    (S && ($ += `&path=${encodeURIComponent(Array.isArray(S) ? S[0] : S)}`),
                        E && ($ += `&host=${encodeURIComponent(Array.isArray(E) ? E[0] : E)}`),
                        I && ($ += `&serviceName=${encodeURIComponent(I)}`),
                        e.network === 'kcp' &&
                            (e.seed && ($ += `&seed=${encodeURIComponent(e.seed)}`),
                            e.headerType && ($ += `&headerType=${encodeURIComponent(e.headerType)}`)),
                        (n = `vless://${e.uuid}@${e.server}:${e.port}?security=${encodeURIComponent(c)}${$}${p}${_}${v}${d}${m}${u}${h}${g}${y}${w}#${encodeURIComponent(e.name)}`));
                    break;
                case 'trojan':
                    let A = '';
                    if (e.network) {
                        let T = e.network;
                        if (
                            (e.network === 'ws' && e['ws-opts']?.['v2ray-http-upgrade'] && (T = 'httpupgrade'),
                            (A = `&type=${encodeURIComponent(T)}`),
                            ['grpc'].includes(e.network))
                        ) {
                            let Hs = e[`${e.network}-opts`]?.[`${e.network}-service-name`],
                                Js = e[`${e.network}-opts`]?.['_grpc-authority'];
                            (Hs && (A += `&serviceName=${encodeURIComponent(Hs)}`),
                                Js && (A += `&authority=${encodeURIComponent(Js)}`),
                                (A += `&mode=${encodeURIComponent(e[`${e.network}-opts`]?.['_grpc-type'] || 'gun')}`));
                        }
                        let P = e[`${e.network}-opts`]?.path,
                            se = e[`${e.network}-opts`]?.headers?.Host;
                        (P && (A += `&path=${encodeURIComponent(Array.isArray(P) ? P[0] : P)}`),
                            se && (A += `&host=${encodeURIComponent(Array.isArray(se) ? se[0] : se)}`));
                    }
                    let O = '';
                    e['client-fingerprint'] && (O = `&fp=${encodeURIComponent(e['client-fingerprint'])}`);
                    let L = '';
                    e.alpn && (L = `&alpn=${encodeURIComponent(Array.isArray(e.alpn) ? e.alpn : e.alpn.join(','))}`);
                    let a = e['reality-opts'],
                        f = '',
                        b = '',
                        k = '',
                        C = '',
                        j = '',
                        K = '';
                    if (a) {
                        C = '&security=reality';
                        let T = e['reality-opts']?.['public-key'];
                        T && (b = `&pbk=${encodeURIComponent(T)}`);
                        let P = e['reality-opts']?.['short-id'];
                        P && (f = `&sid=${encodeURIComponent(P)}`);
                        let se = e['reality-opts']?.['_spider-x'];
                        (se && (k = `&spx=${encodeURIComponent(se)}`),
                            e._extra && (K = `&extra=${encodeURIComponent(e._extra)}`),
                            e._mode && (j = `&mode=${encodeURIComponent(e._mode)}`));
                    }
                    n = `trojan://${e.password}@${e.server}:${e.port}?sni=${encodeURIComponent(e.sni || e.server)}${e['skip-cert-verify'] ? '&allowInsecure=1' : ''}${A}${L}${O}${C}${f}${b}${k}${j}${K}#${encodeURIComponent(e.name)}`;
                    break;
                case 'hysteria2':
                    let M = [];
                    (e['hop-interval'] && M.push(`hop-interval=${e['hop-interval']}`),
                        e.keepalive && M.push(`keepalive=${e.keepalive}`),
                        e['skip-cert-verify'] && M.push('insecure=1'),
                        e.obfs &&
                            (M.push(`obfs=${encodeURIComponent(e.obfs)}`),
                            e['obfs-password'] && M.push(`obfs-password=${encodeURIComponent(e['obfs-password'])}`)),
                        e.sni && M.push(`sni=${encodeURIComponent(e.sni)}`),
                        e.ports && M.push(`mport=${e.ports}`),
                        e['tls-fingerprint'] && M.push(`pinSHA256=${encodeURIComponent(e['tls-fingerprint'])}`),
                        e.tfo && M.push('fastopen=1'),
                        (n = `hysteria2://${encodeURIComponent(e.password)}@${e.server}:${e.port}?${M.join('&')}#${encodeURIComponent(e.name)}`));
                    break;
                case 'hysteria':
                    let q = [];
                    (Object.keys(e).forEach((T) => {
                        if (!['name', 'type', 'server', 'port'].includes(T)) {
                            let P = T.replace(/-/, '_');
                            ['alpn'].includes(T)
                                ? e[T] && q.push(`${P}=${encodeURIComponent(Array.isArray(e[T]) ? e[T][0] : e[T])}`)
                                : ['skip-cert-verify'].includes(T)
                                  ? e[T] && q.push('insecure=1')
                                  : ['tfo', 'fast-open'].includes(T)
                                    ? e[T] && !q.includes('fastopen=1') && q.push('fastopen=1')
                                    : ['ports'].includes(T)
                                      ? q.push(`mport=${e[T]}`)
                                      : ['auth-str'].includes(T)
                                        ? q.push(`auth=${e[T]}`)
                                        : ['up'].includes(T)
                                          ? q.push(`upmbps=${e[T]}`)
                                          : ['down'].includes(T)
                                            ? q.push(`downmbps=${e[T]}`)
                                            : ['_obfs'].includes(T)
                                              ? q.push(`obfs=${e[T]}`)
                                              : ['obfs'].includes(T)
                                                ? q.push(`obfsParam=${e[T]}`)
                                                : ['sni'].includes(T)
                                                  ? q.push(`peer=${e[T]}`)
                                                  : e[T] && !/^_/i.test(T) && q.push(`${P}=${encodeURIComponent(e[T])}`);
                        }
                    }),
                        (n = `hysteria://${e.server}:${e.port}?${q.join('&')}#${encodeURIComponent(e.name)}`));
                    break;
                case 'tuic':
                    if (!e.token || e.token.length === 0) {
                        let T = [];
                        (Object.keys(e).forEach((P) => {
                            if (!['name', 'type', 'uuid', 'password', 'server', 'port', 'tls'].includes(P)) {
                                let se = P.replace(/-/, '_');
                                ['alpn'].includes(P)
                                    ? e[P] && T.push(`${se}=${encodeURIComponent(Array.isArray(e[P]) ? e[P][0] : e[P])}`)
                                    : ['skip-cert-verify'].includes(P)
                                      ? e[P] && T.push('allow_insecure=1')
                                      : ['tfo', 'fast-open'].includes(P)
                                        ? e[P] && !T.includes('fast_open=1') && T.push('fast_open=1')
                                        : ['disable-sni', 'reduce-rtt'].includes(P) && e[P]
                                          ? T.push(`${se.replace(/-/g, '_')}=1`)
                                          : ['congestion-controller'].includes(P)
                                            ? T.push(`congestion_control=${e[P]}`)
                                            : e[P] && !/^_/i.test(P) && T.push(`${se.replace(/-/g, '_')}=${encodeURIComponent(e[P])}`);
                            }
                        }),
                            (n = `tuic://${encodeURIComponent(e.uuid)}:${encodeURIComponent(e.password)}@${e.server}:${e.port}?${T.join('&')}#${encodeURIComponent(e.name)}`));
                    }
                    break;
                case 'anytls':
                    let X = [];
                    (Object.keys(e).forEach((T) => {
                        if (!['name', 'type', 'password', 'server', 'port', 'tls'].includes(T)) {
                            let P = T.replace(/-/, '_');
                            ['alpn'].includes(T)
                                ? e[T] && X.push(`${P}=${encodeURIComponent(Array.isArray(e[T]) ? e[T][0] : e[T])}`)
                                : ['skip-cert-verify'].includes(T)
                                  ? e[T] && X.push('insecure=1')
                                  : ['udp'].includes(T)
                                    ? e[T] && X.push('udp=1')
                                    : e[T] && !/^_/i.test(T) && X.push(`${P.replace(/-/g, '_')}=${encodeURIComponent(e[T])}`);
                        }
                    }),
                        (n = `anytls://${encodeURIComponent(e.password)}@${e.server}:${e.port}/?${X.join('&')}#${encodeURIComponent(e.name)}`));
                    break;
                case 'wireguard':
                    let z = [];
                    (Object.keys(e).forEach((T) => {
                        ['name', 'type', 'server', 'port', 'ip', 'ipv6', 'private-key'].includes(T) ||
                            (['public-key'].includes(T)
                                ? z.push(`publickey=${e[T]}`)
                                : ['udp'].includes(T)
                                  ? e[T] && z.push(`${T}=1`)
                                  : e[T] && !/^_/i.test(T) && z.push(`${T}=${encodeURIComponent(e[T])}`));
                    }),
                        e.ip && e.ipv6
                            ? z.push(`address=${e.ip}/32,${e.ipv6}/128`)
                            : e.ip
                              ? z.push(`address=${e.ip}/32`)
                              : e.ipv6 && z.push(`address=${e.ipv6}/128`),
                        (n = `wireguard://${encodeURIComponent(e['private-key'])}@${e.server}:${e.port}/?${z.join('&')}#${encodeURIComponent(e.name)}`));
                    break;
            }
            return n;
        },
    };
}
function gr() {
    return {
        type: 'ALL',
        produce: (e) => {
            let n = [];
            return (
                e.map((i) => {
                    try {
                        n.push(ar.produce(i));
                    } catch (r) {
                        W.error(`Cannot produce proxy: ${JSON.stringify(i, null, 2)}
Reason: ${r}`);
                    }
                }),
                V.encode(
                    n.join(`
`)
                )
            );
        },
    };
}
var wr = (() => {
        function s() {
            return {
                name: 'URI PROXY Parser',
                test: (d) => /^(socks5\+tls|socks5|http|https):\/\//.test(d),
                parse: (d) => {
                    let [m, w, y, N, $, I, S, E, A] = d.match(
                        /^(socks5|http|http)(\+tls|s)?:\/\/(?:(.*?):(.*?)@)?(.*?)(?::(\d+?))?(\?.*?)?(?:#(.*?))?$/
                    );
                    if (S) S = parseInt(S, 10);
                    else {
                        if (y) S = 443;
                        else if (w === 'http') S = 80;
                        else throw (W.error(`port is not present in line: ${d}`), new Error(`port is not present in line: ${d}`));
                        W.info(`port is not present in line: ${d}, set to ${S}`);
                    }
                    return {
                        name: A != null ? decodeURIComponent(A) : `${w} ${I}:${S}`,
                        type: w,
                        tls: !!y,
                        server: I,
                        port: S,
                        username: N != null ? decodeURIComponent(N) : void 0,
                        password: $ != null ? decodeURIComponent($) : void 0,
                    };
                },
            };
        }
        function t() {
            return {
                name: 'URI SOCKS Parser',
                test: (d) => /^socks:\/\//.test(d),
                parse: (d) => {
                    let [m, w, y, N, $, I, S] = d.match(/^(socks)?:\/\/(?:(.*)@)?(.*?)(?::(\d+?))?(\?.*?)?(?:#(.*?))?$/);
                    if ($) $ = parseInt($, 10);
                    else throw (W.error(`port is not present in line: ${d}`), new Error(`port is not present in line: ${d}`));
                    let E, A;
                    if (y) {
                        let L = V.decode(decodeURIComponent(y)).split(':');
                        ((E = L[0]), (A = L[1]));
                    }
                    return {
                        name: S != null ? decodeURIComponent(S) : `${w} ${N}:${$}`,
                        type: 'socks5',
                        server: N,
                        port: $,
                        username: E,
                        password: A,
                    };
                },
            };
        }
        function e() {
            return {
                name: 'URI SS Parser',
                test: (d) => /^ss:\/\//.test(d),
                parse: (d) => {
                    let m = d.split('ss://')[1],
                        w = d.split('#')[1],
                        y = { type: 'ss' };
                    m = m.split('#')[0];
                    let N = m.match(/@([^/?]*)(\/|\?|$)/),
                        $ = decodeURIComponent(m.split('@')[0]),
                        I;
                    $?.startsWith('2022-blake3-') ? (I = $) : (I = V.decode($));
                    let S = '';
                    if (N) m.includes('?') && (S = m.match(/(\?.*)$/)[1]);
                    else {
                        if (m.includes('?')) {
                            let f = m.match(/^(.*)(\?.*)$/);
                            ((m = f[1]), (S = f[2]));
                        }
                        if (((m = V.decode(m)), S)) {
                            if (/(&|\?)v2ray-plugin=/.test(S)) {
                                let b = S.match(/(&|\?)v2ray-plugin=(.*?)(&|$)/)[2];
                                b && ((y.plugin = 'v2ray-plugin'), (y['plugin-opts'] = JSON.parse(V.decode(b))));
                            }
                            m = `${m}${S}`;
                        }
                        ((I = m.match(/(^.*)@/)?.[1]), (N = m.match(/@([^/@]*)(\/|$)/)));
                    }
                    let E = N[1],
                        A = E.lastIndexOf(':');
                    ((y.server = E.substring(0, A)), (y.port = `${E.substring(A + 1)}`.match(/\d+/)?.[0]));
                    let O = I.match(/(^.*?):(.*$)/);
                    ((y.cipher = O?.[1]), (y.password = O?.[2]));
                    let L = m.match(/[?&]plugin=([^&]+)/),
                        a = m.match(/[?&]shadow-tls=([^&]+)/);
                    if (L) {
                        let f = ('plugin=' + decodeURIComponent(L[1])).split(';'),
                            b = {};
                        for (let k of f) {
                            let [C, j] = k.split('=');
                            C && (b[C] = j || !0);
                        }
                        switch (b.plugin) {
                            case 'obfs-local':
                            case 'simple-obfs':
                                ((y.plugin = 'obfs'), (y['plugin-opts'] = { mode: b.obfs, host: J(b['obfs-host']) }));
                                break;
                            case 'v2ray-plugin':
                                ((y.plugin = 'v2ray-plugin'),
                                    (y['plugin-opts'] = { mode: 'websocket', host: J(b['obfs-host']), path: J(b.path), tls: $t(b.tls) }));
                                break;
                            case 'shadow-tls': {
                                y.plugin = 'shadow-tls';
                                let k = J(b.version);
                                y['plugin-opts'] = { host: J(b.host), password: J(b.password), version: k ? parseInt(k, 10) : void 0 };
                                break;
                            }
                            default:
                                throw new Error(`Unsupported plugin option: ${b.plugin}`);
                        }
                    }
                    if (a) {
                        let f = JSON.parse(V.decode(a[1])),
                            b = J(f.version),
                            k = J(f.address),
                            C = J(f.port);
                        ((y.plugin = 'shadow-tls'),
                            (y['plugin-opts'] = { host: J(f.host), password: J(f.password), version: b ? parseInt(b, 10) : void 0 }),
                            k && (y.server = k),
                            C && (y.port = parseInt(C, 10)));
                    }
                    return (
                        /(&|\?)uot=(1|true)/i.test(S) && (y['udp-over-tcp'] = !0),
                        /(&|\?)tfo=(1|true)/i.test(S) && (y.tfo = !0),
                        w != null && (w = decodeURIComponent(w)),
                        (y.name = w ?? `SS ${y.server}:${y.port}`),
                        y
                    );
                },
            };
        }
        function n() {
            return {
                name: 'URI SSR Parser',
                test: (d) => /^ssr:\/\//.test(d),
                parse: (d) => {
                    d = V.decode(d.split('ssr://')[1]);
                    let m = d.indexOf(':origin');
                    m === -1 && (m = d.indexOf(':auth_'));
                    let w = d.substring(0, m),
                        y = w.substring(0, w.lastIndexOf(':')),
                        N = w.substring(w.lastIndexOf(':') + 1),
                        $ = d
                            .substring(m + 1)
                            .split('/?')[0]
                            .split(':'),
                        I = { type: 'ssr', server: y, port: N, protocol: $[0], cipher: $[1], obfs: $[2], password: V.decode($[3]) },
                        S = {};
                    if (((d = d.split('/?')[1].split('&')), d.length > 1))
                        for (let E of d) {
                            let [A, O] = E.split('=');
                            ((O = O.trim()), O.length > 0 && O !== '(null)' && (S[A] = O));
                        }
                    return (
                        (I = {
                            ...I,
                            name: S.remarks ? V.decode(S.remarks) : I.server,
                            'protocol-param': J(V.decode(S.protoparam || '').replace(/\s/g, '')),
                            'obfs-param': J(V.decode(S.obfsparam || '').replace(/\s/g, '')),
                        }),
                        I
                    );
                },
            };
        }
        function i() {
            return {
                name: 'URI VMess Parser',
                test: (d) => /^vmess:\/\//.test(d),
                parse: (d) => {
                    d = d.split('vmess://')[1];
                    let m = V.decode(d.replace(/\?.*?$/, ''));
                    if (/=\s*vmess/.test(m)) {
                        let w = m.split(',').map(($) => $.trim()),
                            y = {};
                        for (let $ of w)
                            if ($.indexOf('=') !== -1) {
                                let [I, S] = $.split('=');
                                y[I.trim()] = S.trim();
                            }
                        let N = {
                            name: w[0].split('=')[0].trim(),
                            type: 'vmess',
                            server: w[1],
                            port: w[2],
                            cipher: J(w[3], 'auto'),
                            uuid: w[4].match(/^"(.*)"$/)[1],
                            tls: y.obfs === 'wss',
                            udp: $t(y['udp-relay']),
                            tfo: $t(y['fast-open']),
                            'skip-cert-verify': H(y['tls-verification']) ? !y['tls-verification'] : void 0,
                        };
                        if (H(y.obfs))
                            if (y.obfs === 'ws' || y.obfs === 'wss') {
                                ((N.network = 'ws'), (N['ws-opts'].path = (J(y['obfs-path']) || '"/"').match(/^"(.*)"$/)[1]));
                                let $ = y['obfs-header'];
                                ($ && $.indexOf('Host') !== -1 && ($ = $.match(/Host:\s*([a-zA-Z0-9-.]*)/)[1]),
                                    ls($) && (N['ws-opts'].headers = { Host: $ }));
                            } else throw new Error(`Unsupported obfs: ${y.obfs}`);
                        return N;
                    } else {
                        let w = {};
                        try {
                            w = JSON.parse(m);
                        } catch {
                            let [E, A, O] = /(^[^?]+?)\/?\?(.*)$/.exec(d);
                            m = V.decode(A);
                            for (let C of O.split('&')) {
                                let [j, K] = C.split('='),
                                    M = K;
                                ((M = decodeURIComponent(K)), M.indexOf(',') === -1 ? (w[j] = M) : (w[j] = M.split(',')));
                            }
                            let [L, a, f, b, k] = /(^[^:]+?):([^:]+?)@(.*):(\d+)$/.exec(m);
                            ((w.scy = a), (w.id = f), (w.port = k), (w.add = b));
                        }
                        let y = w.add,
                            N = parseInt($t(w.port), 10),
                            $ = {
                                name: w.ps ?? w.remarks ?? w.remark ?? `VMess ${y}:${N}`,
                                type: 'vmess',
                                server: y,
                                port: N,
                                cipher: ['auto', 'aes-128-gcm', 'chacha20-poly1305', 'none'].includes(w.scy) ? w.scy : 'auto',
                                uuid: w.id,
                                alterId: parseInt($t(w.aid ?? w.alterId, 0), 10),
                                tls: ['tls', !0, 1, '1'].includes(w.tls),
                                'skip-cert-verify': H(w.verify_cert) ? !w.verify_cert : void 0,
                            };
                        (!$['skip-cert-verify'] && H(w.allowInsecure) && ($['skip-cert-verify'] = /(TRUE)|1/i.test(w.allowInsecure)),
                            $.tls && (w.sni && w.sni !== '' ? ($.sni = w.sni) : w.peer && w.peer !== '' && ($.sni = w.peer)));
                        let I = !1;
                        if (
                            (w.net === 'ws' || w.obfs === 'websocket'
                                ? ($.network = 'ws')
                                : ['http'].includes(w.net) || ['http'].includes(w.obfs) || ['http'].includes(w.type)
                                  ? ($.network = 'http')
                                  : ['grpc', 'kcp', 'quic'].includes(w.net)
                                    ? ($.network = w.net)
                                    : w.net === 'httpupgrade' || $.network === 'httpupgrade'
                                      ? (($.network = 'ws'), (I = !0))
                                      : (w.net === 'h2' || $.network === 'h2') && ($.network = 'h2'),
                            $.network)
                        ) {
                            let S = w.host ?? w.obfsParam;
                            try {
                                let O = JSON.parse(S)?.Host;
                                O && (S = O);
                            } catch {}
                            let E = w.path;
                            if (
                                (['ws'].includes($.network) && (E = E || '/'),
                                $.network === 'http' &&
                                    (S && ((S = S.split(',').map((A) => A.trim())), (S = Array.isArray(S) ? S[0] : S)),
                                    E ? (E = Array.isArray(E) ? E[0] : E) : (E = '/')),
                                E || S || ['kcp', 'quic'].includes($.network))
                            )
                                if (['grpc'].includes($.network))
                                    $[`${$.network}-opts`] = {
                                        'grpc-service-name': J(E),
                                        '_grpc-type': J(w.type),
                                        '_grpc-authority': J(w.authority),
                                    };
                                else if (['kcp', 'quic'].includes($.network))
                                    $[`${$.network}-opts`] = {
                                        [`_${$.network}-type`]: J(w.type),
                                        [`_${$.network}-host`]: J(J(S)),
                                        [`_${$.network}-path`]: J(E),
                                    };
                                else {
                                    let A = { path: J(E), headers: { Host: J(S) } };
                                    (I && ((A['v2ray-http-upgrade'] = !0), (A['v2ray-http-upgrade-fast-open'] = !0)), ($[`${$.network}-opts`] = A));
                                }
                            else delete $.network;
                        }
                        return (($['client-fingerprint'] = w.fp), ($.alpn = w.alpn ? w.alpn.split(',') : void 0), $);
                    }
                },
            };
        }
        function r() {
            return {
                name: 'URI VLESS Parser',
                test: (d) => /^vless:\/\//.test(d),
                parse: (d) => {
                    d = d.split('vless://')[1];
                    let m,
                        w = /^(.*?)@(.*?):(\d+)\/?(\?(.*?))?(?:#(.*?))?$/.exec(d);
                    if (!w) {
                        let [f, b, k] = /^(.*?)(\?.*?$)/.exec(d);
                        ((d = `${V.decode(b)}${k}`), (w = /^(.*?)@(.*?):(\d+)\/?(\?(.*?))?(?:#(.*?))?$/.exec(d)), (m = !0));
                    }
                    let [y, N, $, I, S, E = '', A] = w;
                    (m && (N = N.replace(/^.*?:/g, '')),
                        (I = parseInt(`${I}`, 10)),
                        (N = decodeURIComponent(N)),
                        A != null && (A = decodeURIComponent(A)));
                    let O = { type: 'vless', name: A, server: $, port: I, uuid: N },
                        L = {};
                    for (let f of E.split('&')) {
                        let [b, k] = f.split('='),
                            C = k;
                        ((C = decodeURIComponent(k)), (L[b] = C));
                    }
                    if (
                        ((O.name = A ?? L.remarks ?? L.remark ?? `VLESS ${$}:${I}`),
                        (O.tls = L.security && L.security !== 'none'),
                        m && /TRUE|1/i.test(L.tls) && ((O.tls = !0), (L.security = L.security ?? 'reality')),
                        (O.sni = L.sni || L.peer),
                        (O.flow = L.flow),
                        !O.flow && m && L.xtls)
                    ) {
                        let f = [void 0, 'xtls-rprx-direct', 'xtls-rprx-vision'][L.xtls];
                        f && (O.flow = f);
                    }
                    if (
                        ((O['client-fingerprint'] = L.fp),
                        (O.alpn = L.alpn ? L.alpn.split(',') : void 0),
                        (O['skip-cert-verify'] = /(TRUE)|1/i.test(L.allowInsecure)),
                        ['reality'].includes(L.security))
                    ) {
                        let f = {};
                        (L.pbk && (f['public-key'] = L.pbk),
                            L.sid && (f['short-id'] = L.sid),
                            L.spx && (f['_spider-x'] = L.spx),
                            Object.keys(f).length > 0 && (O[`${L.security}-opts`] = f));
                    }
                    let a = !1;
                    if (
                        ((O.network = L.type),
                        O.network === 'tcp' && L.headerType === 'http'
                            ? (O.network = 'http')
                            : O.network === 'httpupgrade' && ((O.network = 'ws'), (a = !0)),
                        !O.network && m && L.obfs && ((O.network = L.obfs), ['none'].includes(O.network) && (O.network = 'tcp')),
                        ['websocket'].includes(O.network) && (O.network = 'ws'),
                        O.network && !['tcp', 'none'].includes(O.network))
                    ) {
                        let f = {},
                            b = L.host ?? L.obfsParam;
                        if (b)
                            if (L.obfsParam)
                                try {
                                    let k = JSON.parse(b);
                                    f.headers = k;
                                } catch {
                                    f.headers = { Host: b };
                                }
                            else f.headers = { Host: b };
                        (L.serviceName
                            ? ((f[`${O.network}-service-name`] = L.serviceName),
                              ['grpc'].includes(O.network) && L.authority && (f['_grpc-authority'] = L.authority))
                            : m && L.path && (['ws', 'http', 'h2'].includes(O.network) || ((f[`${O.network}-service-name`] = L.path), delete L.path)),
                            L.path && (f.path = L.path),
                            ['grpc'].includes(O.network) && (f['_grpc-type'] = L.mode || 'gun'),
                            a && ((f['v2ray-http-upgrade'] = !0), (f['v2ray-http-upgrade-fast-open'] = !0)),
                            Object.keys(f).length > 0 && (O[`${O.network}-opts`] = f),
                            O.network === 'kcp' && (L.seed && (O.seed = L.seed), (O.headerType = L.headerType || 'none')),
                            L.mode && (O._mode = L.mode),
                            L.extra && (O._extra = L.extra));
                    }
                    return O;
                },
            };
        }
        function l() {
            return {
                name: 'URI AnyTLS Parser',
                test: (d) => /^anytls:\/\//.test(d),
                parse: (d) => {
                    d = d.split(/anytls:\/\//)[1];
                    let [m, w, y, N, $ = '', I] = /^(.*?)@(.*?)(?::(\d+))?\/?(?:\?(.*?))?(?:#(.*?))?$/.exec(d);
                    ((w = decodeURIComponent(w)),
                        (N = parseInt(`${N}`, 10)),
                        isNaN(N) && (N = 443),
                        (w = decodeURIComponent(w)),
                        I != null && (I = decodeURIComponent(I)),
                        (I = I ?? `AnyTLS ${y}:${N}`));
                    let S = { type: 'anytls', name: I, server: y, port: N, password: w };
                    for (let E of $.split('&')) {
                        let [A, O] = E.split('=');
                        ((A = A.replace(/_/g, '-')),
                            (O = decodeURIComponent(O)),
                            ['alpn'].includes(A)
                                ? (S[A] = O ? O.split(',') : void 0)
                                : ['insecure'].includes(A)
                                  ? (S['skip-cert-verify'] = /(TRUE)|1/i.test(O))
                                  : ['udp'].includes(A)
                                    ? (S[A] = /(TRUE)|1/i.test(O))
                                    : (S[A] = O));
                    }
                    return S;
                },
            };
        }
        function c() {
            return {
                name: 'URI Hysteria2 Parser',
                test: (d) => /^(hysteria2|hy2):\/\//.test(d),
                parse: (d) => {
                    d = d.split(/(hysteria2|hy2):\/\//)[2];
                    let m,
                        [w, y, N, $, I, S, E, A, O, L, a = '', f] = /^(.*?)@(.*?)(:((\d+(-\d+)?)([,;]\d+(-\d+)?)*))?\/?(\?(.*?))?(?:#(.*?))?$/.exec(
                            d
                        );
                    (/^\d+$/.test(I) ? ((I = parseInt(`${I}`, 10)), isNaN(I) && (I = 443)) : I ? ((m = I), (I = hi(m))) : (I = 443),
                        (y = decodeURIComponent(y)),
                        f != null && (f = decodeURIComponent(f)),
                        (f = f ?? `Hysteria2 ${N}:${I}`));
                    let b = { type: 'hysteria2', name: f, server: N, port: I, ports: m, password: y },
                        k = {};
                    for (let K of a.split('&')) {
                        let [M, q] = K.split('='),
                            X = q;
                        ((X = decodeURIComponent(q)), (k[M] = X));
                    }
                    ((b.sni = k.sni),
                        !b.sni && k.peer && (b.sni = k.peer),
                        k.obfs && k.obfs !== 'none' && (b.obfs = k.obfs),
                        k.mport && (b.ports = k.mport),
                        (b['obfs-password'] = k['obfs-password']),
                        (b['skip-cert-verify'] = /(TRUE)|1/i.test(k.insecure)),
                        (b.tfo = /(TRUE)|1/i.test(k.fastopen)),
                        (b['tls-fingerprint'] = k.pinSHA256));
                    let C = k['hop-interval'] || k.hop_interval;
                    /^\d+$/.test(C) && (b['hop-interval'] = parseInt(`${C}`, 10));
                    let j = k.keepalive;
                    return (/^\d+$/.test(j) && (b.keepalive = parseInt(`${j}`, 10)), b);
                },
            };
        }
        function o() {
            return {
                name: 'URI Hysteria Parser',
                test: (d) => /^(hysteria|hy):\/\//.test(d),
                parse: (d) => {
                    d = d.split(/(hysteria|hy):\/\//)[2];
                    let [m, w, y, N, $, I = '', S] = /^(.*?)(:(\d+))?\/?(\?(.*?))?(?:#(.*?))?$/.exec(d);
                    ((N = parseInt(`${N}`, 10)), isNaN(N) && (N = 443), S != null && (S = decodeURIComponent(S)), (S = S ?? `Hysteria ${w}:${N}`));
                    let E = { type: 'hysteria', name: S, server: w, port: N },
                        A = {};
                    for (let O of I.split('&')) {
                        let [L, a] = O.split('=');
                        ((L = L.replace(/_/, '-')),
                            (a = decodeURIComponent(a)),
                            ['alpn'].includes(L)
                                ? (E[L] = a ? a.split(',') : void 0)
                                : ['insecure'].includes(L)
                                  ? (E['skip-cert-verify'] = /(TRUE)|1/i.test(a))
                                  : ['auth'].includes(L)
                                    ? (E['auth-str'] = a)
                                    : ['mport'].includes(L)
                                      ? (E.ports = a)
                                      : ['obfsParam'].includes(L)
                                        ? (E.obfs = a)
                                        : ['upmbps'].includes(L)
                                          ? (E.up = a)
                                          : ['downmbps'].includes(L)
                                            ? (E.down = a)
                                            : ['obfs'].includes(L)
                                              ? (E._obfs = a || '')
                                              : ['fast-open', 'peer'].includes(L)
                                                ? (A[L] = a)
                                                : (E[L] = a));
                    }
                    return (
                        !E.sni && A.peer && (E.sni = A.peer),
                        !E['fast-open'] && A.fastopen && (E['fast-open'] = !0),
                        E.protocol || (E.protocol = 'udp'),
                        E
                    );
                },
            };
        }
        function u() {
            return {
                name: 'URI TUIC Parser',
                test: (d) => /^tuic:\/\//.test(d),
                parse: (d) => {
                    d = d.split(/tuic:\/\//)[1];
                    let [m, w, y, N, $ = '', I] = /^(.*?)@(.*?)(?::(\d+))?\/?(?:\?(.*?))?(?:#(.*?))?$/.exec(d);
                    w = decodeURIComponent(w);
                    let [S, ...E] = w.split(':'),
                        A = E.join(':');
                    ((N = parseInt(`${N}`, 10)),
                        isNaN(N) && (N = 443),
                        (A = decodeURIComponent(A)),
                        I != null && (I = decodeURIComponent(I)),
                        (I = I ?? `TUIC ${y}:${N}`));
                    let O = { type: 'tuic', name: I, server: y, port: N, password: A, uuid: S };
                    for (let L of $.split('&')) {
                        let [a, f] = L.split('=');
                        ((a = a.replace(/_/g, '-')),
                            (f = decodeURIComponent(f)),
                            ['alpn'].includes(a)
                                ? (O[a] = f ? f.split(',') : void 0)
                                : ['allow-insecure'].includes(a)
                                  ? (O['skip-cert-verify'] = /(TRUE)|1/i.test(f))
                                  : ['fast-open'].includes(a)
                                    ? (O.tfo = !0)
                                    : ['disable-sni', 'reduce-rtt'].includes(a)
                                      ? (O[a] = /(TRUE)|1/i.test(f))
                                      : a === 'congestion-control'
                                        ? ((O['congestion-controller'] = f), delete O[a])
                                        : (O[a] = f));
                    }
                    return O;
                },
            };
        }
        function g() {
            return {
                name: 'URI WireGuard Parser',
                test: (d) => /^(wireguard|wg):\/\//.test(d),
                parse: (d) => {
                    d = d.split(/(wireguard|wg):\/\//)[2];
                    let [m, w, y, N, $, I, S, E = '', A] = /^((.*?)@)?(.*?)(:(\d+))?\/?(\?(.*?))?(?:#(.*?))?$/.exec(d);
                    ((I = parseInt(`${I}`, 10)),
                        isNaN(I) && (I = 51820),
                        (y = decodeURIComponent(y)),
                        A != null && (A = decodeURIComponent(A)),
                        (A = A ?? `WireGuard ${N}:${I}`));
                    let O = { type: 'wireguard', name: A, server: N, port: I, 'private-key': y, udp: !0 };
                    for (let L of E.split('&')) {
                        let [a, f] = L.split('=');
                        if (((a = a.replace(/_/, '-')), (f = decodeURIComponent(f)), ['reserved'].includes(a))) {
                            let b = f
                                .split(',')
                                .map((k) => parseInt(k.trim(), 10))
                                .filter((k) => Number.isInteger(k));
                            b.length === 3 && (O[a] = b);
                        } else if (['address', 'ip'].includes(a))
                            f.split(',').map((b) => {
                                let k = b
                                    .trim()
                                    .replace(/\/\d+$/, '')
                                    .replace(/^\[/, '')
                                    .replace(/\]$/, '');
                                Vs(k) ? (O.ip = k) : cs(k) && (O.ipv6 = k);
                            });
                        else if (['mtu'].includes(a)) {
                            let b = parseInt(f.trim(), 10);
                            Number.isInteger(b) && (O[a] = b);
                        } else
                            /publickey/i.test(a)
                                ? (O['public-key'] = f)
                                : /privatekey/i.test(a)
                                  ? (O['private-key'] = f)
                                  : ['udp'].includes(a)
                                    ? (O[a] = /(TRUE)|1/i.test(f))
                                    : ['flag'].includes(a) || (O[a] = f);
                    }
                    return O;
                },
            };
        }
        function h() {
            return {
                name: 'URI Trojan Parser',
                test: (d) => /^trojan:\/\//.test(d),
                parse: (d) => {
                    let m = /^(trojan:\/\/.*?@.*?)(:(\d+))?\/?(\?.*?)?$/.exec(d);
                    m?.[2] || (d = d.replace(m[1], `${m[1]}:443`));
                    let [y, N] = d.split(/#(.+)/, 2),
                        I = cr().parse(y);
                    if (ls(N))
                        try {
                            I.name = decodeURIComponent(N);
                        } catch (S) {
                            console.log(S);
                        }
                    return I;
                },
            };
        }
        return [s(), t(), e(), n(), i(), r(), l(), o(), c(), u(), g(), h()];
    })(),
    br = (() => {
        function s() {
            return { name: 'HTML', test: (u) => /^<!DOCTYPE html>/.test(u), parse: () => '' };
        }
        function t() {
            let l = 'Base64 Pre-processor',
                c = [
                    'dm1lc3M',
                    'c3NyOi8v',
                    'c29ja3M6Ly',
                    'dHJvamFu',
                    'c3M6Ly',
                    'c3NkOi8v',
                    'c2hhZG93',
                    'aHR0c',
                    'dmxlc3M=',
                    'aHlzdGVyaWEy',
                    'aHkyOi8v',
                    'd2lyZWd1YXJkOi8v',
                    'd2c6Ly8=',
                    'dHVpYzovLw==',
                ];
            return {
                name: l,
                test: function (g) {
                    return !/^\w+:\/\/\w+/im.test(g) && c.some((h) => g.indexOf(h) !== -1);
                },
                parse: function (g) {
                    let h = V.decode(g);
                    return /^\w+(:\/\/|\s*?=\s*?)\w+/m.test(h)
                        ? h
                        : (W.error('Base64 Pre-processor error: decoded line does not start with protocol'), g);
                },
            };
        }
        function e() {
            return {
                name: 'Fallback Base64 Pre-processor',
                test: function (u) {
                    return !0;
                },
                parse: function (u) {
                    let g = V.decode(u);
                    return /^\w+(:\/\/|\s*?=\s*?)\w+/m.test(g)
                        ? g
                        : (W.error('Fallback Base64 Pre-processor error: decoded line does not start with protocol'), u);
                },
            };
        }
        function n() {
            return {
                name: 'Clash Pre-processor',
                test: function (u) {
                    if (!/proxies/.test(u)) return !1;
                    let g = qs(u);
                    return g.proxies && Array.isArray(g.proxies);
                },
                parse: function (u, g) {
                    let h = u.replace(/short-id:([ \t]*[^#\n,}]*)/g, (v, d) => {
                            let m = d.trim();
                            return !m || m === ''
                                ? 'short-id: ""'
                                : /^(['"]).*\1$/.test(m)
                                  ? `short-id: ${m}`
                                  : ['null'].includes(m)
                                    ? `short-id: ${m}`
                                    : `short-id: "${m}"`;
                        }),
                        { proxies: p, 'global-client-fingerprint': _ } = qs(h);
                    return (
                        (g
                            ? `proxies:
`
                            : '') +
                        p
                            .map(
                                (v) => (
                                    _ && !v['client-fingerprint'] && (v['client-fingerprint'] = _),
                                    `${g ? '  - ' : ''}${JSON.stringify(v)}
`
                                )
                            )
                            .join('')
                    );
                },
            };
        }
        function i() {
            return {
                name: 'SSD Pre-processor',
                test: function (u) {
                    return u.indexOf('ssd://') === 0;
                },
                parse: function (u) {
                    let g = [],
                        h = JSON.parse(V.decode(u.split('ssd://')[1])),
                        p = h.port,
                        _ = h.encryption,
                        v = h.password,
                        d = h.servers;
                    for (let m = 0; m < d.length; m++) {
                        let w = d[m];
                        ((_ = w.encryption ? w.encryption : _), (v = w.password ? w.password : v));
                        let y = V.encode(_ + ':' + v),
                            N = w.server;
                        p = w.port ? w.port : p;
                        let $ = w.remarks ? w.remarks : m,
                            I = w.plugin_options ? '/?plugin=' + encodeURIComponent(w.plugin + ';' + w.plugin_options) : '';
                        g[m] = 'ss://' + y + '@' + N + ':' + p + I + '#' + $;
                    }
                    return g.join(`
`);
                },
            };
        }
        function r() {
            return {
                name: 'Full Config Preprocessor',
                test: function (u) {
                    return /^(\[server_local\]|\[Proxy\])/gm.test(u);
                },
                parse: function (u) {
                    return u.match(/^\[server_local|Proxy\]([\s\S]+?)^\[.+?\](\r?\n|$)/im)?.[1] || u;
                },
            };
        }
        return [s(), n(), t(), i(), r(), e()];
    })(),
    ui = (() => {
        function s(o) {
            for (let u of br)
                try {
                    if (u.test(o)) return (W.info(`Pre-processor [${u.name}] activated`), u.parse(o));
                } catch (g) {
                    W.error(`Parser [${u.name}] failed
 Reason: ${g}`);
                }
            return o;
        }
        function t(o) {
            o = s(o);
            let u = o.split(`
`),
                g = [],
                h;
            for (let p of u) {
                if (((p = p.trim()), p.length === 0)) continue;
                let _ = !1;
                if (h) {
                    let [v, d] = n(h, p);
                    d || (g.push(l(v)), (_ = !0));
                }
                if (!_)
                    for (let v of wr) {
                        let [d, m] = n(v, p);
                        if (!m) {
                            (g.push(l(d)), (h = v), (_ = !0), W.info(`${v.name} is activated`));
                            break;
                        }
                    }
                _ || W.error(`Failed to parse line: ${p}`);
            }
            return g.filter((p) => (['vless', 'vmess'].includes(p.type) && (fi(p.uuid) || W.error(`UUID may be invalid: ${p.name} ${p.uuid}`)), !0));
        }
        function e(o, u, g, h = {}) {
            let p = lr[u];
            if (!p) throw new Error(`Target platform: ${u} is not supported!`);
            let _ = /Surge|SurgeMac|Shadowrocket/i.test(u);
            if (
                ((o = o.filter((v) =>
                    v.supported && v.supported[u] === !1
                        ? !1
                        : (['vless', 'vmess'].includes(v.type) && (fi(v.uuid) || W.error(`UUID may be invalid: ${v.name} ${v.uuid}`)), !0)
                )),
                (o = o.map(
                    (v) => (
                        (v._resolved = v.resolved),
                        ls(v.name) || (v.name = `${v.type} ${v.server}:${v.port}`),
                        v['disable-sni'] &&
                            (_
                                ? (v.sni = 'off')
                                : ['tuic'].includes(v.type) ||
                                  (W.error(
                                      `Target platform ${u} does not support sni off. Proxy's fields (sni, tls-fingerprint and skip-cert-verify) will be modified.`
                                  ),
                                  (v.sni = ''),
                                  (v['skip-cert-verify'] = !0),
                                  delete v['tls-fingerprint'])),
                        v.ports &&
                            ((v.ports = String(v.ports)),
                            ['ClashMeta'].includes(u) || (v.ports = v.ports.replace(/\//g, ',')),
                            v.port || (v.port = hi(v.ports))),
                        v
                    )
                )),
                W.log(`Producing proxies for target: ${u}`),
                typeof p.type > 'u' || p.type === 'SINGLE')
            ) {
                let v = o
                    .map((d) => {
                        try {
                            return p.produce(d, g, h);
                        } catch (m) {
                            return (
                                W.error(`Cannot produce proxy: ${JSON.stringify(d, null, 2)}
Reason: ${m}`),
                                ''
                            );
                        }
                    })
                    .filter((d) => d.length > 0);
                return (
                    (v =
                        g === 'internal'
                            ? v
                            : v.join(`
`)),
                    u.startsWith('Surge') &&
                        o.length > 0 &&
                        o.every((d) => d.type === 'wireguard') &&
                        (v = `#!name=${o[0]?._subName}
#!desc=${o[0]?._desc ?? ''}
#!category=${o[0]?._category ?? ''}
${v}`),
                    v
                );
            } else if (p.type === 'ALL') return p.produce(o, g, h);
        }
        function n(o, u) {
            if (!i(o, u)) return [null, new Error('Parser mismatch')];
            try {
                return [o.parse(u), null];
            } catch (g) {
                return [null, g];
            }
        }
        function i(o, u) {
            try {
                return o.test(u);
            } catch {
                return !1;
            }
        }
        function r(o) {
            if (typeof o == 'string' || typeof o == 'number') {
                if (((o = String(o).trim()), o === '')) return '/';
                if (!o.startsWith('/')) return '/' + o;
            }
            return o;
        }
        function l(o) {
            (typeof o.cipher == 'string' && (o.cipher = o.cipher.toLowerCase()),
                typeof o.password == 'number' && (o.password = pr(o.password)),
                ['ss'].includes(o.type) && o.cipher === 'none' && !o.password && (o.password = ''),
                o.interface && ((o['interface-name'] = o.interface), delete o.interface),
                dr(o.port) && (o.port = parseInt(o.port, 10)),
                o.server && (o.server = `${o.server}`.trim().replace(/^\[/, '').replace(/\]$/, '')),
                o.network === 'ws' &&
                    (!o['ws-opts'] &&
                        (o['ws-path'] || o['ws-headers']) &&
                        ((o['ws-opts'] = {}),
                        o['ws-path'] && (o['ws-opts'].path = o['ws-path']),
                        o['ws-headers'] && (o['ws-opts'].headers = o['ws-headers'])),
                    delete o['ws-path'],
                    delete o['ws-headers']));
            let u = o[`${o.network}-opts`]?.path;
            if (
                (Array.isArray(u) ? (o[`${o.network}-opts`].path = u.map((h) => r(h))) : u != null && (o[`${o.network}-opts`].path = r(u)),
                o.type === 'trojan' && o.network === 'tcp' && delete o.network,
                ['vless'].includes(o.type) && (o.network || (o.network = 'tcp')),
                ['trojan', 'tuic', 'hysteria', 'hysteria2', 'juicity', 'anytls'].includes(o.type) && (o.tls = !0),
                o.network)
            ) {
                let h = o[`${o.network}-opts`]?.headers?.Host,
                    p = o[`${o.network}-opts`]?.headers?.host;
                o.network === 'h2'
                    ? !p && h && ((o[`${o.network}-opts`].headers.host = h), delete o[`${o.network}-opts`].headers.Host)
                    : p && !h && ((o[`${o.network}-opts`].headers.Host = p), delete o[`${o.network}-opts`].headers.host);
            }
            if (o.network === 'h2') {
                let h = o['h2-opts']?.headers?.host,
                    p = o['h2-opts']?.path;
                (h && !Array.isArray(h) && (o['h2-opts'].headers.host = [h]), Array.isArray(p) && (o['h2-opts'].path = p[0]));
            }
            if (
                (!o.tls &&
                    ['ws', 'http'].includes(o.network) &&
                    !o[`${o.network}-opts`]?.headers?.Host &&
                    !c(o.server) &&
                    ((o[`${o.network}-opts`] = o[`${o.network}-opts`] || {}),
                    (o[`${o.network}-opts`].headers = o[`${o.network}-opts`].headers || {}),
                    (o[`${o.network}-opts`].headers.Host = ['vmess', 'vless'].includes(o.type) && o.network === 'http' ? [o.server] : o.server)),
                ['vmess', 'vless'].includes(o.type) && o.network === 'http')
            ) {
                let h = o[`${o.network}-opts`]?.path,
                    p = o[`${o.network}-opts`]?.headers?.Host;
                (p && !Array.isArray(p) && (o[`${o.network}-opts`].headers.Host = [p]),
                    h && !Array.isArray(h) && (o[`${o.network}-opts`].path = [h]));
            }
            if (o.tls && !o.sni && (c(o.server) || (o.sni = o.server), !o.sni && o.network)) {
                let h = o[`${o.network}-opts`]?.headers?.Host;
                ((h = Array.isArray(h) ? h[0] : h), h && (o.sni = h));
            }
            if (
                (o.ports ? (o.ports = String(o.ports).replace(/\//g, ',')) : delete o.ports,
                ['hysteria2'].includes(o.type) &&
                    o.obfs &&
                    !['salamander'].includes(o.obfs) &&
                    !o['obfs-password'] &&
                    ((o['obfs-password'] = o.obfs), (o.obfs = 'salamander')),
                ['hysteria2'].includes(o.type) &&
                    !o['obfs-password'] &&
                    o.obfs_password &&
                    ((o['obfs-password'] = o.obfs_password), delete o.obfs_password),
                ['vless'].includes(o.type) &&
                    (o['reality-opts'] && Object.keys(o['reality-opts']).length === 0 && delete o['reality-opts'],
                    o['grpc-opts'] && Object.keys(o['grpc-opts']).length === 0 && delete o['grpc-opts'],
                    !o['reality-opts'] && !o.flow && delete o.flow,
                    ['http'].includes(o.network) &&
                        (o[`${o.network}-opts`]?.path ||
                            (o[`${o.network}-opts`] || (o[`${o.network}-opts`] = {}), (o[`${o.network}-opts`].path = ['/'])))),
                typeof o.name != 'string')
            )
                if (/^\d+$/.test(o.name)) o.name = `${o.name}`;
                else
                    try {
                        o.name?.data ? (o.name = ci.from(o.name.data).toString('utf8')) : (o.name = ci.from(o.name).toString('utf8'));
                    } catch (h) {
                        (W.error(`proxy.name decode failed
Reason: ${h}`),
                            (o.name = `${o.type} ${o.server}:${o.port}`));
                    }
            (['ws', 'http', 'h2'].includes(o.network) &&
                (['ws', 'h2'].includes(o.network) && !o[`${o.network}-opts`]?.path
                    ? ((o[`${o.network}-opts`] = o[`${o.network}-opts`] || {}), (o[`${o.network}-opts`].path = '/'))
                    : o.network === 'http' &&
                      (!Array.isArray(o[`${o.network}-opts`]?.path) || o[`${o.network}-opts`]?.path.every((h) => !h)) &&
                      ((o[`${o.network}-opts`] = o[`${o.network}-opts`] || {}), (o[`${o.network}-opts`].path = ['/']))),
                ['', 'off'].includes(o.sni) && (o['disable-sni'] = !0));
            let g = o.ca_str;
            o['ca-str'] ? (g = o['ca-str']) : g && (delete o.ca_str, (o['ca-str'] = g));
            try {
                W.env.isNode && !g && o._ca && (g = W.node.fs.readFileSync(o._ca, { encoding: 'utf8' }));
            } catch (h) {
                W.error(`Read ca file failed
Reason: ${h}`);
            }
            return (
                !o['tls-fingerprint'] && g && (o['tls-fingerprint'] = or.generateFingerprint(g)),
                ['ss'].includes(o.type) &&
                    H(o, 'shadow-tls-password') &&
                    ((o.plugin = 'shadow-tls'),
                    (o['plugin-opts'] = { host: o['shadow-tls-sni'], password: o['shadow-tls-password'], version: o['shadow-tls-version'] }),
                    delete o['shadow-tls-sni'],
                    delete o['shadow-tls-password'],
                    delete o['shadow-tls-version']),
                o
            );
        }
        function c(o) {
            return Vs(o) || cs(o);
        }
        return { parse: t, produce: e };
    })(),
    fu = {
        async fetch(s) {
            try {
                let { target: t, nodeArray: e } = kr(s);
                if (!t || e.length === 0) return vr();
                let n = await $r(e, t, s);
                return yr(n, s);
            } catch (t) {
                return new Response(`Error: ${t.message}`, { status: 500 });
            }
        },
    };
function kr(s) {
    let t = new URL(s.url),
        e = t.searchParams.get('target'),
        n = t.searchParams.get('url'),
        i = n ? n.split(/[,|]/) : [];
    return (
        /meta|clash.meta|clash|clashverge|mihomo/i.test(e) && (e = 'mihomo'),
        /singbox|sing-box|sfa/i.test(e) && (e = 'singbox'),
        { target: e, nodeArray: i }
    );
}
function vr() {
    return new Response(
        JSON.stringify(
            {
                version: 'SubStore v2.20.4',
                message:
                    '\u8FD9\u662F\u4E00\u4E2A\u57FA\u4E8E cloudflare pagers \u7684 sub-store \u8282\u70B9\u8F6C\u6362\u5DE5\u5177\uFF0C\u4EC5\u8F6C\u6362\u8282\u70B9\u7528',
                usage: {
                    target: '\u8F93\u51FA\u7C7B\u578B\uFF1A{singbox|mihomo|v2ray|base64}',
                    url: '\u8F93\u5165\u7F16\u7801\u540E\u7684\u8BA2\u9605\u94FE\u63A5\uFF0C\u591A\u4E2A\u8BA2\u9605\u53EF\u7528 , \u5206\u5272',
                    example: '/?target=v2ray&url=UrlEncode(\u7F16\u7801\u540E\u7684\u8BA2\u9605)',
                },
            },
            null,
            4
        ),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}
async function $r(s, t, e) {
    let n = { proxies: [], outbounds: [], v2ray: '', base64: '', headers: [] },
        i = await Promise.all(s.map((c) => _r(c, t))),
        r = (c, o) => {
            o &&
                (Array.isArray(o)
                    ? (n[c] +=
                          o.filter(Boolean).join(`
`) +
                          `
`)
                    : (n[c] +=
                          o +
                          `
`));
        };
    (i.forEach((c) => {
        (c?.proxies && n.proxies.push(...c.proxies),
            c?.outbounds && n.outbounds.push(...c.outbounds),
            r('base64', c.base64),
            r('v2ray', c.v2ray),
            c?.headers && n.headers.push(c.headers));
    }),
        t === 'mihomo' ? (n.proxies = di(n.proxies, 'name')) : t === 'singbox' && (n.outbounds = di(n.outbounds, 'tag')),
        n.base64 && (n.base64 = btoa(unescape(encodeURIComponent(n.base64)))));
    let l = n.headers.length > 0 ? n.headers[Math.floor(Math.random() * n.headers.length)] : void 0;
    return (
        n.proxies.length || delete n.proxies,
        n.outbounds.length || delete n.outbounds,
        n.v2ray || delete n.v2ray,
        n.headers.length || delete n.headers,
        { ...n, headers: l }
    );
}
async function _r(s, t) {
    try {
        let e,
            n = {};
        if (/^https?:\/\//i.test(s)) {
            let l = await Sr(s, 'clash.mate');
            ((e = l?.data ?? l), (n.headers = l.headers));
        } else e = s;
        if (!e) return n;
        let r = Or(e);
        if (r?.proxies) n = await as(r, t);
        else if (Ir(e)) n = await as(e, t);
        else if (Nr(e)) {
            let l = e.split(/[\n\s]/);
            (await Promise.all(l.map((o) => as(o, t)))).forEach((o) => {
                Object.entries(o).forEach(([u, g]) => {
                    n[u] = (n[u] || []).concat(g);
                });
            });
        }
        return n;
    } catch (e) {
        return (console.error(`Error processing input: ${s}`, e), await as(s, t));
    }
}
async function as(s, t) {
    let e = {};
    if ((s?.proxies || (s = { proxies: ui.parse(s) }), s.proxies)) {
        let n = {
                singbox: { key: 'outbounds', format: 'singbox' },
                mihomo: { key: 'proxies', format: 'mihomo' },
                v2ray: { key: 'v2ray', format: 'v2ray' },
                default: { key: 'base64', format: 'v2ray' },
            },
            { key: i, format: r } = n[t] || n.default;
        e[i] = ui.produce(s.proxies, r, 'internal');
    }
    return e;
}
function di(s, t) {
    let e = new Map();
    return (
        s.forEach((n) => {
            let i = n[t];
            e.set(i, (e.get(i) || 0) + 1);
        }),
        s.map((n) => {
            let i = n[t],
                r = 1,
                l = i;
            if (e.get(i) === 1) return n;
            for (; e.has(`${i}_${r}`); ) r++;
            return ((l = `${i}_${r}`), e.set(l, 1), { ...n, [t]: l });
        })
    );
}
function yr(s, t) {
    let e = /Mozilla|Chrome|Safari|Edge|Opera|Firefox/i.test(t.headers.get('User-Agent')),
        n = new Headers(s.headers);
    return (
        n.set('Content-Type', 'application/json; charset=utf-8'),
        e && n.set('Content-Disposition', 'inline'),
        Array.isArray(s?.proxies) && s?.proxies?.length > 0
            ? new Response(JSON.stringify({ proxies: s.proxies }, null, 4), { status: 200, headers: n })
            : Array.isArray(s?.outbounds) && s?.outbounds?.length > 0
              ? new Response(JSON.stringify({ outbounds: s.outbounds }, null, 4), { status: 200, headers: n })
              : s?.v2ray
                ? new Response(s.v2ray, { status: 200, headers: n })
                : s?.base64
                  ? new Response(s.base64, { status: 200, headers: n })
                  : new Response('', { status: 200, headers: n })
    );
}
async function Sr(s, t) {
    let e;
    try {
        e = await fetch(s, { method: 'GET', headers: { 'User-Agent': t } });
    } catch {
        return s;
    }
    let n = Object.fromEntries(e.headers.entries()),
        i = Ar(e.headers);
    return (i && (n['content-disposition'] = i), { status: e.status, headers: n, data: await e.text() });
}
function Ar(s) {
    let t = s.get('Content-Disposition') || s.get('content-disposition');
    if (!t) return null;
    let e = t.match(/filename="?([^"]+)"?/);
    if (!e) return null;
    let n = e[1];
    if (!/[^\x00-\x7F]/.test(n)) return t;
    let r = 'download.json',
        l = encodeURIComponent(n);
    return `attachment; filename="${r}"; filename*=UTF-8''${l}`;
}
function Ir(s) {
    return /^[A-Za-z0-9+/=]+$/.test(s) && s.length % 4 === 0;
}
function Nr(s) {
    try {
        let t = new URL(s);
        return /^[a-zA-Z][a-zA-Z0-9+.-]*:$/.test(t.protocol);
    } catch {
        return !1;
    }
}
function Or(s) {
    let t = {};
    try {
        let e = qs(s, { maxAliasCount: -1, merge: !0 });
        e?.proxies && (t.proxies = e.proxies);
    } catch {
        return t;
    }
    return t;
}
export { fu as default };
//# sourceMappingURL=_worker.js.map
