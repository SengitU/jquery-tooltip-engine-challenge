(function($) {
    $.tooltipEngine = function(selector) {
        var loadingText = "Loading...",
            tooltipDiv;

        function calculatePosition(element, positionMode, tooltipDiv) {
            var position = $(element).position(),
                calculatedPosition = {};

            switch (positionMode) {
                // RIGHT
                case "right":
                    calculatedPosition.top = position.top;
                    calculatedPosition.left = position.left + $(element).width() + 5;
                    break;
                // LEFT
                case "left":
                    calculatedPosition.top = position.top;
                    calculatedPosition.left = position.left - $(tooltipDiv).width() - 5;
                    break;
                // BOTTOM
                case "bottom":
                    calculatedPosition.top = position.top + $(element).height() + 5;
                    calculatedPosition.left = position.left;
                    break;
                // TOP
                default:
                    calculatedPosition.top = position.top - $(tooltipDiv).height() - 5;
                    calculatedPosition.left = position.left;
            }
            return calculatedPosition;
        }

        function applyTooltip(params) {
            var tooltipWidth,
                elementWidth,
                margin_left,
                position;

            tooltipDiv = $("<div>", {class: "tooltip-engine-container"}).
                append($("<div>", {class: "content" }).
                html(params.content));

            if (params.customCssClass) {
                tooltipDiv.addClass(customCssClass);
            }
            $(params.element).append(tooltipDiv);

            position = calculatePosition(params.element, params.position, tooltipDiv);
            tooltipDiv.css(position);
        }

        this.applyDefinedTooltips = function(selector) {
            // jQuery.each will probably handle the closure
            $.each($(selector), function(index) {
                $(this).hover(
                    function() {
                        var customCssClass = $(this).attr("data-tooltip-css"),
                            position = $(this).attr("data-tooltip-pos"),
                            contentSource = $(this).attr("data-tooltip-source"),
                            type = $(this).attr("data-tooltip-type"),
                            element = this;

                            switch (type) {
                                case "selector":
                                    var content = $(contentSource).text();
                                    applyTooltip({
                                        element: element,
                                        position: position,
                                        content: content,
                                        customCssClass: customCssClass
                                    });
                                    break;
                                case "ajax":
                                    applyTooltip({
                                        element: element,
                                        position: position,
                                        content: loadingText,
                                        customCssClass: customCssClass
                                    });

                                    $.get(contentSource, function(data) {
                                        // Removing loading tooltip
                                        $(tooltipDiv).remove();
                                        applyTooltip({
                                            element: element,
                                            position: position,
                                            content: data,
                                            customCssClass: customCssClass
                                        });
                                    });
                                    break;
                                default:
                                    applyTooltip({
                                        element: element,
                                        position: position,
                                        content: contentSource,
                                        customCssClass: customCssClass
                                    });
                            }
                    },
                    function() {
                        $(tooltipDiv).remove();
                    }
                );
            });
        };

        this.createScriptedTooltip = function(selector, callback, options) {
            // Need to apply closure here
            (function(selector, callback, options) {
                $(selector).hover(function() {
                    applyTooltip({
                        element: $(selector)[0],
                        position: options && options.position,
                        content: callback(),
                        customCssClass: options && options.css
                    });
                },
                function() {
                    $(tooltipDiv).remove();
                });
            })(selector, callback, options);
        };

        return this;
    }();

})(jQuery);
