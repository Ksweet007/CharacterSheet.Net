define(function (require) {
    var _i = {
        $: require('jquery'),
        ko: require('knockout')
    }

    _i.ko.bindingHandlers.modal = {
        init: function (element, valueAccessor) {

          _i.$(element).on('show.bs.modal',function reposition() {
              var modal = $(this),
              dialog = modal.find('.modal-dialog');
              modal.css('display', 'block');
              dialog.css("margin-top", Math.max(0, (_i.$(window).height() - dialog.height()) / 2));
              _i.$(".modal .actions").css("margin-top", Math.max(0, (_i.$(window).height() - dialog.height()) / 2));
          } );

          _i.$(window).on('resize',
          function () {
              _i.$('.modal:visible').each(reposition);
          });

        }
    }
});
