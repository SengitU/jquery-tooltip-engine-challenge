jQuery Tooltip Plugin
=====================

This plug-in aims to add tooltip to referring HTML element.


#### USAGE

`tooltip-engine.source.js` and `tooltip-engine.css` files should be included in HTML.

In order to use, user should define a tooltip class name and add this class to necessary elements.

After, on document ready, tooltip-engine should be started like in the below example;

```JAVASCRIPT
$(document).ready(function() {
    $.tooltipEngine.applyDefinedTooltips(".tooltip-engine");
});
```

This code snippet will automatically add tooltip all the elements with `tooltip-engine` class.

All following attributes will be considered as options if added with `data-tooltip` prefix.

#### Usage With Callback

To attach a javascript function to tooltip, `createScriptedTooltip` function should be used as follows;

```JAVASCRIPT
$(document).ready(function() {
    $.tooltipEngine.createScriptedTooltip("#functionTooltip", function() {
    return "Your random number is:" + Math.floor((Math.random() * 100) + 1);
});
```


#### Attributes

Property 			 | Default			| Description
-------------------- | ---------------- | -----------
type                 | text             | Content type of the tooltip (Options: "Selector", "Ajax")
position             | top              | Adjust tooltip's position (Options: "top", "right", "left", "bottom")
source               | -                | Content of the tooltip. This should be a url if type is `Ajax` and an element selector, if type is `selector`
css                  | null             | Adds additional CSS class to tooltip

#### Example

* clone this project
* run `npm install grunt --save-dev`
* run `npm install`
* run `grunt`
* navigate to localhost:8080
