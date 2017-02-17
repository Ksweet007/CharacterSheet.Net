define(function(require) {
    var _i = {
        $: require('jquery'),
        ko: require('knockout')
    }

    _i.ko.bindingHandlers.rangeslider = {
        init: function(element, valueAccessor) {
            var settings = _i.$.extend({
                valueInput  : 0,
                type: 'input'
            }, _i.ko.unwrap(valueAccessor()))
            //var pmdSlider = _i.$(element)[0];

        if(settings.type === 'input'){
            //Single range with input
            var pmdSlider = _i.$('#pmd-slider-value-input')[0];
            noUiSlider.create(pmdSlider, {
                start: [ 1 ],
                connect: 'lower',
                tooltips: [wNumb({ decimals: 0 }) ],
                range: {
                    'min': 1,
                    'max': 20
                }
            });

        	pmdSlider.noUiSlider.on('update', function( values, handle ) {
                pmdSlider.value  = values[handle];
                settings.valueInput = pmdSlider.value;
        	});
        }

        if(settings.type === 'step'){
            // single range slider with step
        	var pmdSliderStep = _i.$('#pmd-slider-step')[0];
        	noUiSlider.create(pmdSliderStep, {
        		start: [0],
        		connect: 'lower',
        		tooltips: [wNumb({ decimals: 0 }) ],
        		range: {
        			'min': [0],
        			'max': [20]
        		},
        		step: 1,
        		pips: {
        			mode: 'steps',
        			density: 1
        		}

        	});

            pmdSliderStep.noUiSlider.on('update', function( values, handle ) {
                pmdSliderStep.value  = values[handle];
                settings.valueInput = pmdSliderStep.value;
        	});

        }



        }//END INIT
    };

});
