(function($){

	$.fn.gallery = function(options){
	
		options = $.extend({
			duration: 400,
			auto: 0,
			easing: 'swing',
			view: 1
		}, options);
		
		return this.each(function(){
		
			/*
			>>> SLIDER CODE
		
			var that = $(this),
				next = $('#' + that.attr('id') + '-next'),
				prev = $('#' + that.attr('id') + '-prev'),
				content = $('#' + that.attr('id') + '-content'),
				active = true,
				vsToggle = function(){
					active = !active;
				},
				scrollNext = function(){
			
					if (active) {
				
						vsToggle();
			
						// animate the top element shrinking, pull it off the top, and stick at the end
						content.children(':first').hide({
							duration: options.duration, 
							easing: options.easing,
							complete: function(){
								$(this).detach().appendTo(content).show(0,vsToggle);
							}
						});
				
					}
				
				},
				scrollPrev = function(){
			
					if (active) {
				
						vsToggle();
			
						// hide, then remove the bottom element, then stick it at the top and show
						content.children(':last').hide(0,function(){
							$(this).detach().prependTo(content).slideDown({
								duration: options.duration,
								easing: options.easing,
								complete: vsToggle
							});
						});
				
					}
				
				}
			;
			
			// set up the viewport css
			that.css({
				'overflow':'hidden',
				'height':content.children().height() * options.view
			});
			
			// crop off the last item, then put it at the beginning
			content.children(':last').detach().prependTo(content);
			
			// move the top to the original first item's position
			that.css({ "position": "relative" });
			content.css({
				"position": "absolute",
				"margin-top": "-=" + (content.children().height())
			});
			
			// set up auto scroll
			if (options.auto > 0) {
				window.setInterval(scrollNext, options.auto);
			}
			
			// set up the next button
			next.click(function(){
				scrollNext();
				
				return false;
			});
			
			// set up the previous button
			prev.click(function(){
				scrollPrev();
				
				return false;
			});
			
		});
		
		*/
		
		// grab the stuff we're going to use
		var thumbs = $('.thumbnail'),
			viewer = $('#image_viewer'),
			overlay = $('#modal_overlay'),
			img_content = $('#tabs'),
			gallery_thumbs = 15,
			newview
		;

		if (thumbs.length > 0) {

			// set up the thumbnails
			thumbs.each(function(){
				var that = $(this);
				
				if (that.parent().css('display') !== 'none') {
					// align the image once it's loaded
					that.imagesLoaded(function(){
						
						alignImage($(this));
					});
				}
				
				that.bind('click', function(){
					
					// grab the image location
					var img = $(this).find('img').attr('src'),
						fullimg = img.substr(0,img.indexOf('thumbs')) + img.substr(img.lastIndexOf('/')+1)
					;
					
					// place the image in the viewer
					viewer.empty();
					viewer.append('<img src="'+ fullimg + '" />');
					viewer.find('img').imagesLoaded(function(){
						
						// show the viewer
						viewer.parent().fadeIn(easedur);
						overlay.fadeIn(easedur);
						alignImage(viewer);
					});
					
				});
	
			});
			
			// set up thumbnail tabs
			img_content.find('.tab').hide(0, function(){
				img_content.find('#img_tab1').show();
			});
			
			// set up thumbnail navigation
			img_content.prev().find('p').text('page 1 of ' + Math.ceil(thumbs.length / gallery_thumbs)).prev().bind('click',function(){
				// previous image button
				
				// change the image page
				img_content.children().each(function(){
					var that = $(this);
					
					if (that.css('display') !== 'none') {
						
						that.fadeOut(easedur, function(){
	
							// determine what the next view is
							if (that.prev().attr('id') !== undefined) {
								newview = that.prev();
							} else {
								newview = that.siblings(':last');
							}
	
							// initialize the next view
							nav_text = 'page ' + newview.attr('id').substr(7) + ' of ' + Math.ceil(thumbs.length / gallery_thumbs);
							img_content.prev().find('p').text(nav_text);
							newview.find('img').each(function(){
								$(this).imagesLoaded(function(){
									alignImage($(this).parent());
								});
							});
							newview.fadeIn(easedur);
						});
						
						return false;
					}
				});
				
				return false;
			}).prev().bind('click',function(){
				// next image button
				
				// change the image page
				img_content.children().each(function(){
					var that = $(this);
					
					if (that.css('display') !== 'none') {
						
						that.fadeOut(easedur, function(){
	
							// determine what the next view is
							if (that.next().attr('id') !== undefined) {
								newview = that.next();
							} else {
								newview = that.siblings(':first');
							}
	
							// initialize the next view
							nav_text = 'page ' + newview.attr('id').substr(7) + ' of ' + Math.ceil(thumbs.length / gallery_thumbs);
							img_content.prev().find('p').text(nav_text);
							newview.find('img').each(function(){
								$(this).imagesLoaded(function(){
									alignImage($(this).parent());
								});
							});
							newview.fadeIn(easedur);
						});
						
						return false;
					}
				});
				
				return false;
			});
			
			// set up viewer controls
			viewer.parent().find('#viewer_next').bind('click',function(){
				// viewer next button
				
				// get the next image
				var viewerimg = viewer.find('img').attr('src'),
					nextimg = viewerimg.substr(0,viewerimg.lastIndexOf('/')) + '/thumbs' + viewerimg.substr(viewerimg.lastIndexOf('/'));
				
				var index = 0;
				
				// find the next image and navigate to it
				thumbs.each(function(){
					var thumbimg = $(this).find('img').attr('src');
	
					if (thumbimg === nextimg) {
						if (index + 1 > thumbs.length - 1) {
							nextimg = $(thumbs[0]).find('img').attr('src');
						} else {
							nextimg = $(thumbs[index+1]).find('img').attr('src');
						}
						nextimg = nextimg.substr(0,nextimg.indexOf('thumbs')) + nextimg.substr(nextimg.lastIndexOf('/')+1);
	
						// place the image in the viewer
						viewer.fadeOut(easedur, function(){
							viewer.empty();
							viewer.append('<img src="'+ nextimg + '" />');
							viewer.find('img').imagesLoaded(function(){
								viewer.fadeIn(easedur);
								alignImage(viewer);
							});
						});
						
						
						return false;
					}
					
					index++;
				});
				
				return false;
			}).next().bind('click',function(){
				// viewer previous button
				
				// get the next image
				var viewerimg = viewer.find('img').attr('src'),
					nextimg = viewerimg.substr(0,viewerimg.lastIndexOf('/')) + '/thumbs' + viewerimg.substr(viewerimg.lastIndexOf('/'));
				
				var index = 0;
				
				// find the next image and navigate to it
				thumbs.each(function(){
					var thumbimg = $(this).find('img').attr('src');
	
					if (thumbimg === nextimg) {
						if (index === 0) {
							nextimg = $(thumbs[thumbs.length-1]).find('img').attr('src');
						} else {
							nextimg = $(thumbs[index-1]).find('img').attr('src');
						}
						nextimg = nextimg.substr(0,nextimg.indexOf('thumbs')) + nextimg.substr(nextimg.lastIndexOf('/')+1);
	
						// place the image in the viewer
						viewer.fadeOut(easedur, function(){
							viewer.empty();
							viewer.append('<img src="'+ nextimg + '" />');
							viewer.find('img').imagesLoaded(function(){
								viewer.fadeIn(easedur);
								alignImage(viewer);
							});
						});
						
						
						return false;
					}
					
					index++;
				});
				
				return false;
			}).next().bind('click',function(){
				// viewer close button
	
				// hide the viewer
				viewer.parent().fadeOut(easedur);
				overlay.fadeOut(easedur);
				
				return false;
			});
		}
			
	};
		
})(jQuery);