$(window).load(function(){
    
    // ieCheck
    var ie = false;
    var aniButtonDuration = 350;
	 var defMh = 0, h = 0;
	 defMh = parseInt($('body').css('minHeight'));
    
    if($.browser.msie && $.browser.version<9)
    {
        aniButtonDuration = 0;
        ie = true;
    }
    
   
    $('.gall_spinner').hide();
    $('#bgStretch')
		.bgStretch({
			align:'rightTop',
			navigs:$('#bgNav').navigs({autoPlay:7000,prevBtn:$('#prev_arr'), nextBtn:$('#next_arr')})
		}).sImg({
			spinner:$('.gall_spinner')
		}) 
        


    /*FANCYBOX*/  
    $("a[rel=Appendix]").fancybox({
        'transitionIn'      : 'elastic',
        'transitionOut'     : 'elastic',
        'titlePosition'     : 'over',
        'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
        return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
        }
    });

    //images rollover
    $(".rollover-image").hover(function(){
        $(this).find("img").stop().animate({opacity:0.9}, "normal")
    }, function(){
        $(this).find("img").stop().animate({opacity:1}, "normal")
    });


    /////////////////////////////////////////////////////////////////////////// 
    //                           content switch                              //
    ///////////////////////////////////////////////////////////////////////////
    
    var content=$('#content'),
        nav=$('.menu'),
        header=$('header'),
        splash = $('#splash');
    
    $('ul#menu').superfish({
      delay:       700,
      animation:   {height:'show'},
      speed:       300,
      autoArrows:  false,
      dropShadows: false
    });

   
    
    nav.navs({
		useHash:true,
        defHash:'#!/',
		hoverIn:function(li){
		   	  $('>a ',li).css({color:'#F9B233'});
		   	  $('> a > span ',li).css({display:'block'}).stop().animate({opacity:1, top:"-30px"}, aniButtonDuration, 'easeOutCubic');
		},
		hoverOut:function(li){
		  if (!li.hasClass('with_ul') || !li.hasClass('sfHover')) {
              $('>a ',li).css({color:'#6D291B'});
		   	  $('> a > span ',li).stop().animate({opacity:0, top:"-10px"}, aniButtonDuration, 'easeOutCubic', function(){
		   	      $(this).css({display:'none'});
		   	  });
          }
		}				
    })
    
	 
	 $(window).resize(function (){
		 if (h < defMh) {h = defMh}
		 $('body').stop().animate({'minHeight':h})
		});
		
		
     content.tabs({
		preFu:function(_)
        {
            _.li.css({display:'none', top:'0px'});
            _.li.each(function(){
                if($(this).height() < 495){
                    $(this).height(495);
                } else {
                    $(this).height($(this).height()+30)
                }
            })
		}
		,actFu:function(_)
        {

            if(_.pren == undefined){
                aniDelay = 250;
            } else {
                if(_.n == -1 && _.pren == -1){
                    aniDelay = 250;
                } else {
                    aniDelay = 450;
                }
            }
            
            if(_.n == -1){
                 if(ie) {
                    header.stop().delay(0).css({marginTop:'300px'}, 550,'easeOutCubic');
                } else {
                    header.stop().delay(400).animate({marginTop:'300px'}, 550,'easeOutCubic');
                }
                content.stop().delay(600).animate({height:'300px'}, 350,'easeOutCubic');
                
                    h = 300;
					 $(window).trigger('resize');
            } else {
                if(ie) {
                    header.stop().delay(0).css({marginTop:'0px'}, 550,'easeOutCubic');
                } else {
                    header.stop().delay(0).animate({marginTop:'0px'}, 550,'easeOutCubic');
                }

                content.stop().delay(0).css({height:_.curr.height()+30}, 650,'easeOutCubic');
            }
            
     


            if(_.curr){
                h = parseInt( _.curr.outerHeight(true)+350);
                $(window).trigger('resize');
                _.curr.css('display','block')
                .find('>div').each(function (ind){
                    $(this)
                        .css({'left':'-2000px','display':'none'})
                        .stop(true,true).delay(ind*200+400).show().animate({'left':'0px'},{duration:1200,easing:'easeOutExpo'});
                });
            }
            if(_.prev){
                var len = _.prev.find('>div').length;
                var cnt = 0;
                _.prev.find('>div').each(function (ind){
                    $(this)
                        .show()
                        .stop(true,true).delay((ind)*100).animate({'left':'-2000px'},{duration:800,easing:'easeInOutExpo',complete:function(){
                            if (_.prev){
                                cnt ++; 
                                if (cnt == len) { _.prev.css({'display':'none'});}
                                _.prev.find('>div').css({'display':'none'});
                            }
                        }
                      });
                });
            }  
           
        }
		
	})
       
    nav.navs(function(n, _)
    {
		content.tabs(n);
	})
    
 
})