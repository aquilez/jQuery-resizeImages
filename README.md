# jQuery resizeImages

* Site: [jQuery resizeImages](http://aquilez.github.com/jQuery-resizeImages/)
* Author: [Santiago Dimattía](http://about.me/santiagodimattia)
* License: [MIT](http://www.opensource.org/licenses/mit-license.php)

## Description

resizeImages gives you the ability to set the maximum width or height for images inserted in your pages.

When a image bigger than the limit is found, it will be resized and a message will be shown on top. Clicking on it, the image will be shown fullsize.
You can replace the default functionality using callbacks. Check the [official site](https://aquilez.github.com/jQuery-resizeImages/) to see a demo integrated with ColorBox.

## Screenshot

You can access a live demo on the plugin page, [here](http://aquilez.github.com/jQuery-resizeImages/).

## Usage

First you need to include [jQuery](http://jquery.com) and the plugin:

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script src="jquery.resizeimages.js"></script>

Then, you need to include the default CSS file (The plugin will work without it, but it won't look pretty)

	<link rel="stylesheet" href="style.css">

And then call the plugin on the images:

	jQuery(document).ready(function($){
		$('img').resizeImages({
			maxWidth: 300,
			maxHeight: 300
		});
	});

## Options

You have 6 options (2 of them are callbacks):

### maxWidth

Int. The maximum width for the image. In pixels.

### maxHeight

Int. The maximum height for the image. In pixels.

### msgResized

Message to show on top of the image when it's resized.

### msgNotResized

Message to show on top of the image when you are viewing the original size.

### showOriginalCallback

Callback executed when you click the link to show the image on it's original size.
This function has to return TRUE if you want the default functionality to work. For example, you can return FALSE to replace the way the fullsize image is shown. Check the demo for the ColorBox integration.

### showResizedCallback

Callback executed when you click the link to show the resized image.
This function has to return TRUE if you want the default functionality to work.

#### Example:

	jQuery(document).ready(function($){
		jQuery(document).ready(function($){
			$('#content img').resizeImages({
				maxWidth: 600,
				maxHeight: 300,
				msgResized: 'Image is resized.',
				msgNotResized: 'Original size.',
				showOriginalCallback: function(image){ console.log('Full sized image shown.'); return true; },
				showResizedCallback: function(image){ console.log('Image was resized.'); return true; }
			});
		});
	});