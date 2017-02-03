define('domainmanipulations/LockScroll', function (require) {
    var _i = {
        $: require('jquery'),
        router: require('plugins/router')
    };

    function FixesCls() { }

    FixesCls.prototype.runOnBindingHandler = function () {
        var $fade = _i.$('.scrollerfade');
        _i.$(window).on('scroll', function () {
            $fade.toggle((_i.$(window).scrollTop() > 0));
        });

        //fix for IE9, because the final scroll event is not fired when the page size changes
        _i.router.on('router:navigation:composition-complete').then(function (instance, instruction, router) {
            $fade.toggle((_i.$(window).scrollTop() > 0));
        });
    }

    return new FixesCls();
});
