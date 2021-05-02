var LazyLoadController = function () {
    function a() {
        var a = $("body").hasClass("desktop"),
            o = $("body").hasClass("page-template-page-works");
        jQuery(".js-lazy").length > 0 && jQuery(".js-lazy").lazyload({
            threshold: a ? -150 : 300,
            load: function (a, e) {
                var t = $(this);
                t.attr("srcset", t.attr("data-srcset")), TweenMax.fromTo({}, o ? .75 : 0, {
                    fakeProp: 0
                }, {
                    fakeProp: 100,
                    onComplete: function () {
                        t.addClass("js-lazy--loaded")
                    }
                })
            }
        })
    }
    Events.on("AppController.INIT", a), Events.on("Controller.DOM_UPDATED", a)
}();
var ScrollToController = function () {
    function o() {
        jQuery("a.scroll-to,a.anchor").on("click", function (o) {
            o.preventDefault(), o.stopImmediatePropagation();
            var t = jQuery(this).attr("href");
            return Events.emit("AppController.SCROLL_TO", {
                target: "ScrollToController",
                time: 1.5,
                to: jQuery(t).offset().top
            }), !1
        })
    }
    Events.on("AppController.INIT", o)
}();
var NavigationController = function () {
    function e() {
        jQuery(".js-mobile-nav", r).length > 0 && (n = jQuery(".js-mobile-nav", r)), jQuery(".js-hamburger", r).length > 0 && (o = jQuery(".js-hamburger", r)).on("click", function (e) {
            e.preventDefault(), n.addClass("is-open"), console.log(n)
        }), jQuery(".js-hamburger--close", r).length > 0 && (o = jQuery(".js-hamburger--close", r)).on("click", function (e) {
            e.preventDefault(), n.removeClass("is-open")
        }), l = void 0 === l ? r.height() : l, $(window).scroll(function () {
            $(window).scrollTop() >= l ? r.addClass("c-header--bg-white") : r.removeClass("c-header--bg-white")
        }).trigger("scroll")
    }
    var r, o, n, l = 50;
    r = jQuery("header").eq(0), Events.on("AppController.INIT", e)
}();
var ParallaxController = function () {
    function l() {
        (n = $(".js-parallax-window")).length > 0 && n.parallax({
            speed: .3,
            overScrollFix: !0
        })
    }

    function r() {
        $(window).trigger("scroll")
    }
    var n;
    Events.on("AppController.INIT", l), Events.on("GridController.CONTENT_UPDATE", r)
}();
var FancyboxController = function () {
    function n() {
        var n = $("a.js-fancybox");
        n.length > 0 && n.fancybox({
            animationEffect: !1,
            toolbar: !0,
            buttons: ["close"]
        })
    }
    Events.on("AppController.INIT", n)
}();
var ExpandibleContentController = function () {
    function e() {
        $(".js-expandible").length > 0 && (n = $(".js-expandible")).each(function () {
            var e = $(this),
                n = e.find(".js-expandible__content"),
                a = e.find(".js-expandible__btn"),
                t = "js-expandible--expanded",
                i = Expo.easeInOut;
            a.on("click", function (a) {
                a.preventDefault(), e.hasClass(t) ? (TweenMax.to(n, .95, {
                    height: 0,
                    ease: i
                }), e.removeClass(t)) : (TweenMax.set(n, {
                    height: "auto"
                }), TweenMax.from(n, .95, {
                    height: 0,
                    ease: i
                }), e.addClass(t))
            }), TweenMax.to(n, 0, {
                height: 0
            })
        })
    }
    var n;
    Events.on("AppController.INIT", e)
}();
var NewsletterFormController = function () {
    function e() {
        s = $(".js-form-newsletter"), r = $(".js-form-newsletter__messages", s), s.on("submit", function () {
            return function () {
                if (!t) {
                    var e = $('input[name="subscriber_email"]', s).val(),
                        a = $('select[name="list_id"]', s).val();
                    if (e.length > 0 && e.length > 0) {
                        n(!0);
                        var o = (new BasicService).get({
                            url: config.admin_ajax,
                            method: "POST",
                            data: {
                                action: "add_new_subscriber",
                                list_id: a,
                                subscriber_email: e,
                                _wpnonce: $('input[name="_wpnonce"]').val()
                            }
                        });
                        jQuery.when(o).then(function (e) {
                            n(!1);
                            var t;
                            "OK" === e.success ? (s.find("input").val(""), t = !1) : t = !0,
                                function (e, n) {
                                    r.text(e).addClass(n ? "text-danger" : "text-success"), TweenMax.fromTo({}, 4, {
                                        props: 0
                                    }, {
                                        props: 1,
                                        onComplete: function () {
                                            r.text("").removeClass("text-danger").removeClass("text-success")
                                        }
                                    })
                                }(e.message, t)
                        })
                    }
                }
            }(), !1
        })
    }

    function n(e) {
        t = e;
        var n = e ? "Loading projects..." : "";
        r.text(n)
    }
    var t = !1,
        s = null,
        r = null;
    Events.on("AppController.INIT", e)
}();
var FilterController = function () {
    function t() {
        (n = $(".js-filter")).length > 0 && (l = $(".js-filter__btn")).length > 0 && l.on("click", function (t) {
            var n = $(this).attr("data-filter");
            ! function (t) {
                l.each(function () {
                    $(this).removeClass("o-link--bold"), t.addClass("o-link--bold")
                })
            }($(this)), Events.emit("FilterController.FILTER_CHANGED", {
                active_filter: n
            })
        })
    }
    var n, l;
    Events.on("AppController.INIT", t)
}();
var GridController = function () {
    function t() {
        $(".js-grid").length > 0 && ((i = $(".js-grid")).css_class = ".js-grid", e())
    }

    function e() {
        var t = $(".js-grid-load-more", i);
        t.length > 0 && (void 0 === o && ($(document).off("click", ".js-grid-load-more"), $(document).on("click", ".js-grid-load-more", function (t) {
            t.preventDefault(), $(this).text("Cargando..."),
                function (t) {
                    if (void 0 !== t && t.length > 0) {
                        var r = (new BasicService).get({
                            url: t,
                            dataType: "html",
                            cache: !0,
                            method: "GET"
                        });
                        $.when(r).then(function (t) {
                            void 0 !== o && (o.parent().remove(), o = void 0),
                                function (t) {
                                    var e = $.parseHTML(t),
                                        r = jQuery("<div />").html(e).find(i.css_class).first().html();
                                    i.append(r)
                                }(t), e(), Events.emit("Controller.DOM_UPDATED", {
                                    target: GridController
                                }), $(window).trigger("resize")
                        })
                    }
                }($(this).attr("href"))
        })), o = t)
    }

    function r(t) {
        if (!$.isEmptyObject(t) && void 0 !== i) {
            var e = t.active_filter,
                r = $('[data-filter~="' + e + '"]', i),
                o = $("[data-filter]", i);
            "" !== e ? (o.hide(), r.show(), $(window).trigger("scroll").trigger("resize")) : o.show()
        }
    }
    var i, o;
    Events.on("AppController.INIT", t), Events.on("FilterController.FILTER_CHANGED", r)
}();
var GridVideoController = function () {
    function o() {
        $("video").length > 0 && $(window).on("scroll", function () {
            $("video").each(function () {
                var o = $(this)[0];
                4 === o.readyState && ($(this).is(":in-viewport") ? o.paused && o.play() : o.pause())
            })
        }).trigger("scroll")
    }
    Events.on("AppController.INIT", o)
}();
var InfiniteScrollController = function () {
    function n() {
        $(".js-grid--infinite").length > 0 && $(".js-grid--infinite").infiniteScroll({
            path: "/play/page/{{#}}/",
            append: ".c-grid--play",
            history: !1
        }).on("append.infiniteScroll", function (n, i, t, e) {
            Events.emit("Controller.DOM_UPDATED", {})
        })
    }
    Events.on("AppController.INIT", n)
}();
var SpinnerMainController = function () {
    function n() {
        $(".o-spinner--main").length > 0 && (t = $(".o-spinner--main"), e(!0))
    }

    function o() {
        void 0 !== t && TweenMax.to(t, .75, {
            autoAlpha: 0,
            ease: Quart.easeInOut,
            onComplete: function () {
                t.remove(), e(!1)
            }
        })
    }

    function e(n) {
        n ? $("html, body").addClass("overflow-hidden") : $("html, body").removeClass("overflow-hidden")
    }
    var t;
    Events.on("AppController.INIT", n), Events.on("AppController.LOADED", o)
}();
var OwlCarouselController = function () {
    function o() {
        if ((a = $(".owl-carousel.o-slideshow")).length > 0) {
            var o = {
                items: 1,
                loop: !0,
                margin: 0,
                autoHeight: !0,
                loop: !0,
                lazyLoad: a.hasClass("o-slideshow--lazy")
            };
            a.hasClass("o-slideshow--fade") && (o = $.extend(o, {
                animateOut: "fadeOut"
            })), a.hasClass("o-slideshow--no-dots") && (o = $.extend(o, {
                dots: !1
            })), a.hasClass("o-slideshow--autoplay") && (o = $.extend(o, {
                autoplay: !0,
                autoplayTimeout: 5e3,
                autoplayHoverPause: !1
            })), a.owlCarousel(o)
        }
    }
    var a;
    Events.on("AppController.INIT", o)
}();
var AppController = function () {
    function e(e) {
        if (!jQuery.isEmptyObject(e) && void 0 !== e.time && void 0 !== e.to) {
            var t = Math.abs(jQuery(document).height() - jQuery(window).height()),
                n = jQuery("header").height(),
                o = Math.min(e.to - n, t);
            TweenMax.to(jQuery("html,body"), e.time, {
                scrollTop: o,
                ease: Quint.easeInOut
            })
        }
    }
    return {
        init: function () {
            jQuery(window).on("resize", function () {
                Events.emit("AppController.RESIZE", {})
            }), Events.on("AppController.SCROLL_TO", e), Events.emit("AppController.INIT", {}), Events.emit("AppController.RESIZE", {})
        }
    }
}();
jQuery(document).ready(function () {
    AppController.init()
}), jQuery(window).on("load", function () {
    Events.emit("AppController.LOADED", {})
});