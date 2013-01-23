/**
 * jQuery ResizeImages v1.1
 *
 * @author  Santiago Dimattía <master@teleportz.com.ar>
 * @link    http://aquilez.github.com/jQuery-resizeImages/
 * @version 1.1
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */
(function($) {

	$.fn.resizeImages = function(options)
	{
		var defaults = {
			maxWidth: 0,
			maxHeight: 0,
			msgResized: 'This image has been scaled to {resized_w}x{resized_h}px. Click here to see the original size of {original_w}x{original_h}px.',
			msgNotResized: 'This is the original size of the image ({original_w}x{original_h}px). Click here to resize it.', // @todo translation
			showOriginalCallback: function(){ return true; },
			showResizedCallback: function(){ return true; }
		};

		var settings = $.extend(defaults, options);

		// For each element...
		this.each(function(){
			// Only proceed if the elemnt is an image
			if($(this).is('img') == false)
			{
				return;
			}

			var $image = $(this);

			// Wait til the image is loaded...
			$(this).load(function()
			{
				// If the width of the image is smaller than the limit, do nothing
				if((settings.maxWidth != 0 && $image.width() <= settings.maxWidth) && (settings.maxHeight != 0 && $image.height() <= settings.maxHeight))
				{
					return;
				}

				// Save the original size in the data attributes
				var original_width  = $image.width();
				var original_height = $image.height();

				// Parse the width and height and get the resized dimensions that fit :)
				if(settings.maxWidth > 0 && settings.maxHeight > 0)
				{
					var width_ratio = original_width / settings.maxWidth;
					var height_ratio = original_height / settings.maxHeight;

					var max = Math.max(width_ratio, height_ratio);

					var resized_width = Math.round(original_width / max);
					var resized_height = Math.round(original_height / max);
				}
				else if(settings.maxWidth > 0)
				{
					var resized_width = settings.maxWidth;
					var resized_height = original_height;
				}
				else if(settings.maxHeight > 0)
				{
					var resized_width = original_width;
					var resized_height = settings.maxHeight;
				}
				else
				{
					return;
				}

				// Function to replace the placeholder in the messages with the resolution
				var parseMessage = function(message)
				{
					var array = {
						'{original_w}': original_width,
						'{original_h}': original_height,
						'{resized_w}': resized_width,
						'{resized_h}': resized_height
					};

					for(var val in array)
					{
						message = message.split(val).join(array[val]);
					}

    					return message;
				}

				// Wrap the image in a div
				$image.wrap('<div class="resizedImageContainer" style="width: ' + resized_width + 'px;" />');

				// Resize it to the allowed size
				$image.width(resized_width);
				$image.height(resized_height);

				// Select the parent div & add a new div with the message
				var $parent = $image.parent();
				$parent.prepend('<div>' + parseMessage(settings.msgResized) + '</div>');

				// When you click the message....
				$parent.children('div').click(function(){
					var $container = $(this).parent();

					// If the element has the class notResized
					if($container.hasClass('notResized'))
					{
						if(settings.showResizedCallback($image))
						{
							// Set the container and the image to the max size allowed
							$image.width(resized_width);
							$image.height(resized_height);
							$container.width(resized_width);

							// Change the message text
							$container.children('div').html(parseMessage(settings.msgResized));

							// Delete the notResized class
							$container.removeClass('notResized');
						}
					}
					else
					{
						if(settings.showOriginalCallback($image))
						{
							// We resize the image width to auto
							$image.width(original_width);
							$image.height(original_height);
							$container.width(original_width);

							// We change the message text
							$container.children('div').html(parseMessage(settings.msgNotResized));

							// We add the notResized class
							$container.addClass('notResized');
						}
					}
				})
			}).load();
		});
	}

})(jQuery);