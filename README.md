Image-Gallery
=============

[ ] Include an option for a slider-style page indicator

This image gallery plugin was designed for maximum compatability with a wide array of layouts. As such, adherance to naming conventions is essential for making sure each component of the gallery works properly. This allows for more freedom in placing the various components of the gallery on the page, but also means that if naming conventions are not followed portions of the interface may not work properly. This may require a bit more work up front to get the gallery up and running, but will also impart a great deal of versatility when integrating the plugin to a new page or design.

To name each component, choose an Id for your image gallery. Inside this div should be each of the thumbnails for the images in your gallery. For this example, we'll simply call the div 'gallery'.

	<div id="gallery">
		<img src="images/gallery/thumbs/image1.jpg" height="100px" width="100px" alt="First thumbnail" />
		<img src="images/gallery/thumbs/image2.jpg" height="100px" width="100px" alt="Second thumbnail" />
		<img src="images/gallery/thumbs/image3.jpg" height="100px" width="100px" alt="Third thumbnail" />
		<img src="images/gallery/thumbs/image4.jpg" height="100px" width="100px" alt="Fourth thumbnail" />
		<img src="images/gallery/thumbs/image5.jpg" height="100px" width="100px" alt="Fifth thumbnail" />
		<img src="images/gallery/thumbs/image6.jpg" height="100px" width="100px" alt="Sixth thumbnail" />
		<img src="images/gallery/thumbs/image7.jpg" height="100px" width="100px" alt="Seventh thumbnail" />
	</div>
	
There are a few things to notice here. Firstly, the thumbnails images are located within the *thumbs* folder, which is located within the *gallery* folder on the server. The full size images in this example would be located within the *gallery* folder. The two most important takeaways here are thus: the thumbnails should be in a folder named *thumbs*, and the *thumbs* folder should be located in the same folder as the full size images. Lastly, each thumbnail image should have the same name and file extension as it's full size counterpart, so image1.jpg in the *thumbs* folder would have a matching full size image1.jpg in the *gallery* directory.

Sometimes you might not want to use a static size for your thumbnails, if you want your thumbnails to maintain the aspect ratio of the image, for instance. The plugin requires a fixed size for the thumbnails in order to properly set the height and width of the thumbnail portion of the gallery, but you can get around this by nesting each image in a div and styling the thumbnail divs to be a particular size.

	.thumbnail {
		height: 100px;
		width: 100px;
	}

	<div id="gallery">
		<div class=".thumbnail">
			<img src="images/gallery/thumbs/image1.jpg" alt="First thumbnail" />
		</div>
		<div class=".thumbnail">
			<img src="images/gallery/thumbs/image2.jpg" alt="Second thumbnail" />
		</div>
		<div class=".thumbnail">
			<img src="images/gallery/thumbs/image3.jpg" alt="Third thumbnail" />
		</div>
		<div class=".thumbnail">
			<img src="images/gallery/thumbs/image4.jpg" alt="Fourth thumbnail" />
		</div>
		<div class=".thumbnail">
			<img src="images/gallery/thumbs/image5.jpg" alt="Fifth thumbnail" />
		</div>
		<div class=".thumbnail">
			<img src="images/gallery/thumbs/image6.jpg" alt="Sixth thumbnail" />
		</div>
		<div class=".thumbnail">
			<img src="images/gallery/thumbs/image7.jpg" alt="Seventh thumbnail" />
		</div>
	</div>
	
This is quite handy, as this structure will allow the plugin to automagically center the image within the boundaries of the thumbnail divs.

Now that we have our gallery in place, we can set up the other components of the image gallery. There are six other components to the image gallery: the gallery position indicator, gallery next button, gallery previous button, image viewer, image viewer next button, and image viewer previous button. To derive the proper ID name each component should have to work with the plugin, add the following suffix to the ID of each respective gallery component: -pos, -next, -prev, -viewer, -viewer-next, -viewer-prev. So with our example ID of *gallery*, we would derive the following IDs...

	gallery-pos
	gallery-next
	gallery-prev
	gallery-viewer
	gallery-viewer-next
	gallery-viewer-prev
	
Once you've labeled the IDs of each component, you're free to place them anywhere on the page. Anywhere, that is, but within the *gallery* div, whose only child elements should be a list of thumbnails. Here is an example set up for the other components:

	<div id="viewer-wrapper">
		<div id="gallery-viewer">
			<img alt="Placeholder" src="images/placeholder.png">
		</div><!-- #gallery-viewer -->
		<div id="viewer-nav">
			<a id="gallery-viewer-next" href="#">next</a>
			<a id="gallery-viewer-prev" href="#">previous</a>
		</div><!-- #viewer-nav -->
	</div><!-- #viewer-wrapper" -->

	<div id="thumbs-nav">
		<a id="gallery-next" href="#">next</a><a id="gallery-prev" href="#">previous</a><p id="gallery-pos">page 1 of 2</p>
	</div>
	
You may notice that I've placed a placeholder image in the viewer for initial loading. This is completely optional, but a nice red flag that something's gone wrong with the plugin. If everything is set up properly, the plugin will automatically place the first thumbnail in the viewer on load. So as long as everything is set up properly, you'll likely never see any image that is hard coded into the DOM.

Now that we have each component labeled properly, it's just a matter of calling the _.gallery()_ method on the base *gallery* div.

	$('#gallery').gallery();
	
There are multiple options available for perusal at the bottom of this page, but the most notable of them is the ability to customize the number of thumbnails visible in the gallery.

	$('#gallery').gallery({
		'rows':3,
		'cols':5
	});
	
This sets up a 3x5 grid of thumbnails in the gallery. The plugin will then read your page styling and image sizes to determine the size the thumbnail area will need to be to show the proper number of thumbnails and avoid clipping. The default size of the gallery is 1x5.

Dependancies
------------

Image Gallery is a jQuery plugin, and uses the ImagesLoaded plugin do accurately determine when an image is loaded across all browsers and situations.

jQuery
ImagesLoaded - https://github.com/desandro/imagesloaded

Further Customization
---------------------

The gallery() function will take an options object for further customization.

duration - The animation durations. *default: 400*
    
easing - The type of easing to use for animations. *default: 'swing'*

rows - The number of thumbnail rows to display. *default: 1*

cols - The number of thumbnail columns to display. *default: 5*
    
