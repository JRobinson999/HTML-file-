!function() {
    var o, a = window.location, r = window.document, t = r.currentScript, l = t.getAttribute("data-api") || new URL(t.src).origin + "/api/event", c = t.getAttribute("data-domain");
    function u(t, n, e) {
        n && console.warn("Ignoring Event: " + n),
        e && e.callback && e.callback(),
        "pageview" === t && (o = !0)
    }
    var s = a.href
      , d = {}
      , w = -1
      , v = !1
      , f = null
      , h = 0;
    function g() {
        var t = r.body || {}
          , n = r.documentElement || {};
        return Math.max(t.scrollHeight || 0, t.offsetHeight || 0, t.clientHeight || 0, n.scrollHeight || 0, n.offsetHeight || 0, n.clientHeight || 0)
    }
    function p() {
        var t = r.body || {}
          , n = r.documentElement || {}
          , e = window.innerHeight || n.clientHeight || 0
          , n = window.scrollY || n.scrollTop || t.scrollTop || 0;
        return b <= e ? b : n + e
    }
    function n() {
        return f ? h + (Date.now() - f) : h
    }
    var b = g()
      , m = p();
    function y() {
        var t = n();
        !o && (w < m || 3e3 <= t) && (w = m,
        t = {
            n: "engagement",
            sd: Math.round(m / b * 100),
            d: c,
            u: s,
            p: d,
            e: t,
            v: 9
        },
        f = null,
        h = 0,
        H(l, t))
    }
    function E() {
        "visible" === r.visibilityState && r.hasFocus() && null === f ? f = Date.now() : "hidden" !== r.visibilityState && r.hasFocus() || (h = n(),
        f = null,
        y())
    }
    function e(t, n) {
        var e = "pageview" === t;
        if (e && v && (y(),
        b = g(),
        m = p()),
        /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) || "file:" === a.protocol)
            return u(t, "localhost", n);
        if ((window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) && !window.__plausible)
            return u(t, null, n);
        try {
            if ("true" === window.localStorage.plausible_ignore)
                return u(t, "localStorage flag", n)
        } catch (t) {}
        var i = {}
          , t = (i.n = t,
        i.v = 9,
        n && n.u);
        i.u = t || a.href,
        i.d = c,
        i.r = r.referrer || null,
        n && n.meta && (i.m = JSON.stringify(n.meta)),
        n && n.props && (i.p = n.props),
        n && !1 === n.interactive && (i.i = !1),
        e && (o = !1,
        s = i.u,
        d = i.p,
        w = -1,
        h = 0,
        f = Date.now(),
        v || (r.addEventListener("visibilitychange", E),
        window.addEventListener("blur", E),
        window.addEventListener("focus", E),
        v = !0)),
        H(l, i, n)
    }
    function H(t, n, e) {
        window.fetch && fetch(t, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            keepalive: !0,
            body: JSON.stringify(n)
        }).then(function(t) {
            e && e.callback && e.callback({
                status: t.status
            })
        }).catch(function() {})
    }
    window.addEventListener("load", function() {
        b = g();
        var t = 0
          , n = setInterval(function() {
            b = g(),
            15 == ++t && clearInterval(n)
        }, 200)
    }),
    r.addEventListener("scroll", function() {
        b = g();
        var t = p();
        m < t && (m = t)
    });
    var i = window.plausible && window.plausible.q || [];
    window.plausible = e;
    for (var S = 0; S < i.length; S++)
        e.apply(this, i[S])
}();
