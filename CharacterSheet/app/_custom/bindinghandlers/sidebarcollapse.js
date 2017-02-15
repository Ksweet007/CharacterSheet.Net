define(function(require) {
	var _i = {
		$: require('jquery'),
		ko: require('knockout')
	};

	_i.ko.bindingHandlers.sidebarcollapse = {
		init: function(element, valueAccessor) {
			var value = valueAccessor();
			var $element = $(element);
			var overlay = $('.pmd-sidebar-overlay');
			var sidebar = $('.pmd-sidebar');
			var lsidebar = $('.pmd-sidebar-left');
			var rsidebar = $('.pmd-sidebar-right-fixed');
			var pmdnavbarsidebar = $('.pmd-navbar-sidebar');
			var sidebar = $('.pmd-sidebar');
			var sidebarHeader = $('#sidebar .sidebar-header');
			var sidebarImg = sidebarHeader.css('background-image');
			var toggleButtons = $('.pmd-sidebar-toggle');
			var pmdtopbartoggle = $('.topbar-fixed');

			$element.on('click', function(e) {
				lsidebar.toggleClass('pmd-sidebar-open');
				if ((lsidebar.hasClass('pmd-sidebar-left-fixed') || lsidebar.hasClass('pmd-sidebar-right-fixed')) && lsidebar.hasClass('pmd-sidebar-open')) {
					overlay.addClass('pmd-sidebar-overlay-active');
					$('body').addClass("pmd-body-open")
				} else {
					overlay.removeClass('pmd-sidebar-overlay-active');
					$('body').removeClass("pmd-body-open")
				}
			});

		}

	};

});
