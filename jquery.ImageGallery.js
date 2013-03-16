(function($){

	$.fn.gallery = function(options){
	
		options = $.extend({
			duration: 400,
			easing: 'swing',
			rows: 4,
			cols: 2
		}, options);
		
		return this.each(function(){
		
			// grab the stuff we're going to use
			var gallery = $(this),
				next = $('#' + gallery.attr('id') + '-next'),
				prev = $('#' + gallery.attr('id') + '-prev'),
				pos = $('#' + gallery.attr('id') + '-pos'),
				viewer = $('#' + gallery.attr('id') + '-viewer'),
				viewnext = $('#' + gallery.attr('id') + '-viewer-next'),
				viewprev = $('#' + gallery.attr('id') + '-viewer-prev'),
				thumbs = gallery.children().children(), // I know... this is terrible, but the end goal is to remove the tab divs and hence the second children() call, so it will be all good
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
					'height': (thumbs.height()+parseInt(thumbs.css('margin-bottom'))+parseInt(thumbs.css('margin-top'))+parseInt(thumbs.css('padding-bottom'))+parseInt(thumbs.css('padding-top')))*options.rows,
					'overflow': 'hidden'
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
						viewer.fadeOut(options.duration,function(){
							viewer.empty();
							viewer.append('<img src="'+ fullimg + '" />');
							viewer.find('img').imagesLoaded(function(){
							
								// align the image and show the viewer
								viewer.fadeIn(options.duration);
								alignImage(viewer);
							});
						});
						
					});
		
				});
				
				// set up thumbnail tabs
				gallery.find('.tab').hide(0, function(){
					gallery.find('.tab:first').show();
				});
				
				// set up thumbnail tab navigation indicator
				pos.text('page 1 of ' + Math.ceil(thumbs.length / (options.cols*options.rows)))
				
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
								pos.text('page ' + newview.attr('id').substr(7) + ' of ' + Math.ceil(thumbs.length / (options.cols*options.rows)));
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
								pos.text('page ' + newview.attr('id').substr(7) + ' of ' + Math.ceil(thumbs.length / (options.cols*options.rows)));
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
							viewer.fadeOut(options.duration, function(){
								viewer.empty();
								viewer.append('<img src="'+ nextimg + '" />');
								viewer.find('img').imagesLoaded(function(){
									viewer.fadeIn(options.duration);
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
							viewer.fadeOut(options.duration, function(){
								viewer.empty();
								viewer.append('<img src="'+ nextimg + '" />');
								viewer.find('img').imagesLoaded(function(){
									viewer.fadeIn(options.duration);
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
					viewer.parent().fadeOut(options.duration);
					overlay.fadeOut(options.duration);
				
					return false;
				});
			}
			
		});
			
	};
		
})(jQuery);