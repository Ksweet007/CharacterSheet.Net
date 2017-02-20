define(function (require) {
    var _i = {
        $: require('jquery')
    }

    function AlertCls() { };

            // self.alertConfig ={
            // positionX : "right",
            // positionY : "top",
            // effect : "fadeInUp",
            // //revert :
            // message : "",
            // type : "success",
            // //text :
            // //action :}

    AlertCls.prototype.showAlert = function (config) {
        var $positionX = config.positionX;
        var $positionY = config.positionY;
        var $dataEffect = config.effect;
        var $dataRevert = config.revert;
        var $dataMessage = config.message;
        var $dataType = config.type;
        var $actionText = config.text;
        var $action = config.action;

        if (!_i.$(".pmd-alert-container." + $positionX + "." + $positionY).length) {
            _i.$('body').append("<div class='pmd-alert-container " + $positionX + " " + $positionY + "'></div>");
        }

        var $currentPath = _i.$(".pmd-alert-container." + $positionX + "." + $positionY);

        var $notification = notificationValue();

        function notificationValue() {
            if ($action == "true") {
                if ($actionText == null) {
                    $notification = "<div class='pmd-alert' data-action='true'>" + $dataMessage + "<a href='javascript:void(0)' class='pmd-alert-close'>×</a></div>";
                } else {
                    $notification = "<div class='pmd-alert' data-action='true'>" + $dataMessage + "<a href='javascript:void(0)' class='pmd-alert-close'>" + $actionText + "</a></div>";
                }
                return $notification;
            } else {
                if ($actionText == null) {
                    $notification = "<div class='pmd-alert' data-action='false'>" + $dataMessage + "</div>";
                } else {
                    $notification = "<div class='pmd-alert' data-action='false'>" + $dataMessage + "<a href='javascript:void(0)' class='pmd-alert-close'>" + $actionText + "</a></div>";
                }
                return $notification;
            }
        }

        var boxLength = _i.$(".pmd-alert-container." + $positionX + "." + $positionY + " .pmd-alert").length;

        if (boxLength > 0) {
            if ($positionY == 'top') {
                $currentPath.append($notification);
            } else {
                $currentPath.prepend($notification);
            }
            $currentPath.width(_i.$(".pmd-alert").outerWidth());
            if ($action == "true") {
                _i.$currentPath.children("[data-action='true']").addClass("visible" +
					" " + $dataEffect);
            } else {
                $currentPath.children("[data-action='false']").addClass("visible" +
					" " + $dataEffect).delay(3000).slideUp(function () {
					    _i.$(this).removeClass("visible" +
                            " " + $dataEffect).remove();
					});
            }
            $currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
        } else {
            $currentPath.append($notification);
            $currentPath.width(_i.$(".pmd-alert").outerWidth());
            if ($action == "true") {
                $currentPath.children("[data-action='true']").addClass("visible" +
					" " + $dataEffect);
            } else {
                $currentPath.children("[data-action='false']").addClass("visible" +
					" " + $dataEffect).delay(3000).slideUp(function () {
					    _i.$(this).removeClass("visible" +
                            " " + $dataEffect).remove();
					});
            }
            $currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
        }
        $middle = _i.$(".pmd-alert").outerWidth() / 2;
        _i.$(".pmd-alert-container.center").css("marginLeft", "-" + $middle + "px");



    };

    _i.$(document).on("click", ".pmd-alert-close", function () {
        _i.$(this).parents(".pmd-alert").slideUp(function () {
            _i.$(this).removeClass("visible" +
				" " + $dataEffect).remove();
        });
    });


    return new AlertCls();
});
