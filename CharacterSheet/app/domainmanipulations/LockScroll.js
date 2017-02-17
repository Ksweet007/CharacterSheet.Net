define('domainmanipulations/LockScroll', function (require) {
    var _i = {
        $: require('jquery'),
        router: require('plugins/router')
    };

    function FixesCls() { }

    FixesCls.prototype.runOnBindingHandler = function () {
        
        _i.$(window).on("load",function () {
            $(".content").mCustomScrollbar({
                theme: "minimal"
            });
        })(_i.$);

        _i.$(window).on("load", function () {
            $(".content-3").mCustomScrollbar({
                scrollButtons: { enable: true },
                theme: "dark-thick",
                scrollbarPosition: "outside"
            });
        })(_i.$);

        _i.$(window).on("load", function () {
            $(".content-4").mCustomScrollbar({
                theme: "rounded-dots",
                scrollInertia: 400
            });
        })(_i.$);

        _i.$(window).on("load", function () {
            $(".content-7").mCustomScrollbar({
                scrollButtons: { enable: true },
                theme: "3d-thick"
            });
        })(_i.$);

        _i.$(window).on("load", function () {
            $(".content-9").mCustomScrollbar({
                scrollButtons: { enable: true, scrollType: "stepped" },
                keyboard: { scrollType: "stepped" },
                mouseWheel: { scrollAmount: 188 },
                theme: "rounded-light",
                autoExpandScrollbar: true,
                snapAmount: 188,
                snapOffset: 65
            });
        })(_i.$);
    }

    return new FixesCls();
});
