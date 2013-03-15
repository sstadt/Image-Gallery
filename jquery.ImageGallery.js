(function($){

	$.fn.gallery = function(options){
	
		options = $.extend({
			duration: 400,
			easing: 'swing',
			rows: 3,
			cols: 5
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
		
			*/
		
			// grab the stuff we're going to use
			var gallery = $(this),
				next = $('#' + gallery.attr('id') + '-next'),
				prev = $('#' + gallery.attr('id') + '-prev'),
				pos = $('#' + gallery.attr('id') + '-pos'),
				thumbs = $('.thumbnail'),
				viewer = $('#image_viewer'),
				overlay = $('#modal_overlay'),
				gallery_thumbs = 15,
				newview,
				alignImage = function(view){
					var height = view.css('height'),
						width = view.css('width'),
						img = view.find('img'),
						imgheight = img.get(0).height,
						imgwidth = img.get(0).width,
						hpadding = (parseInt(height,10) - parseInt(imgheight,10)) / 2,
						vpadding = (parseInt(width,10) - parseInt(imgwidth,10)) / 2
					;
				
					if (hpadding > 0 && imgheight > 0) {
						img.css('margin-top',hpadding);
					}
				
					if (vpadding > 0 && imgwidth > 0) {
						img.css('margin-left',vpadding);
					}
					
				}
			;
	
			if (thumbs.length > 0) {
			
				// set up the gallery size
				gallery.css({
					'width': (thumbs.width()+parseInt(thumbs.css('margin-left'))+parseInt(thumbs.css('margin-right'))+parseInt(thumbs.css('padding-left'))+parseInt(thumbs.css('padding-right')))*options.cols,
					'height': (thumbs.height()+parseInt(thumbs.css('margin-bottom'))+parseInt(thumbs.css('margin-top'))+parseInt(thumbs.css('padding-bottom'))+parseInt(thumbs.css('padding-top')))*options.rows
				});
	
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
				gallery.find('.tab').hide(0, function(){
					gallery.find('.tab:first').show();
				});
				
				// set up thumbnail tab navigation indicator
				pos.text('page 1 of ' + Math.ceil(thumbs.length / gallery_thumbs))
				
				// set up the previous tab button
				prev.bind('click',function(){
					
					// change the image page
					gallery.children().each(function(){
						var that = $(this);
						
						if (that.css('display') !== 'none') {
							
							that.fadeOut(options.duration, function(){
		
								// determine what the next view is
								if (that.prev().attr('id') !== undefined) {
									newview = that.prev();
								} else {
									newview = that.siblings(':last');
								}
		
								// initialize the next view
								pos.text('page ' + newview.attr('id').substr(7) + ' of ' + Math.ceil(thumbs.length / gallery_thumbs));
								newview.find('img').each(function(){
									$(this).imagesLoaded(function(){
										alignImage($(this).parent());
									});
								});
								newview.fadeIn(options.duration);
							});
							
							return false;
						}
					});
					
					return false;
				});
				
				// set up the next tab button
				next.bind('click',function(){
					
					// change the image page
					gallery.children().each(function(){
						var that = $(this);
						
						if (that.css('display') !== 'none') {
							
							that.fadeOut(options.duration, function(){
		
								// determine what the next view is
								if (that.next().attr('id') !== undefined) {
									newview = that.next();
								} else {
									newview = that.siblings(':first');
								}
		
								// initialize the next view
								pos.text('page ' + newview.attr('id').substr(7) + ' of ' + Math.ceil(thumbs.length / gallery_thumbs));
								newview.find('img').each(function(){
									$(this).imagesLoaded(function(){
										alignImage($(this).parent());
									});
								});
								newview.fadeIn(options.duration);
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
			
		});
			
	};
		
})(jQuery);