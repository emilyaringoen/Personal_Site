$(document).ready(() => {

const mainHeader = $('.cd-auto-hide-header'),
belowNavHeroContent = $('.sub-nav-hero')

let scrolling = false,
  previousTop = 0,
  currentTop = 0,
  scrollDelta = 10,
  scrollOffset = 150;

$(window).on('scroll', function(){
	if( !scrolling ) {
		scrolling = true;
		(!window.requestAnimationFrame)
			? setTimeout(autoHideHeader, 250)
			: requestAnimationFrame(autoHideHeader)
	}
})


const autoHideHeader = () => {
  let currentTop = $(window).scrollTop();

  ( belowNavHeroContent.length > 0 )
    ? checkStickyNavigation(currentTop) // secondary navigation below intro
    : checkSimpleNavigation(currentTop);

    previousTop = currentTop;
  scrolling = false;
}

const checkStickyNavigation = (currentTop) => {
  //secondary nav below intro section - sticky secondary nav
  let secondaryNavOffsetTop = belowNavHeroContent.offset().top  - mainHeader.height();

  if (previousTop >= currentTop ) {
      //if scrolling up...
      if( currentTop < secondaryNavOffsetTop ) {
        //secondary nav is not fixed
        mainHeader.removeClass('is-hidden');
        belowNavHeroContent.removeClass('secondary-nav-fixed');
      } else if( previousTop - currentTop > scrollDelta ) {
        //secondary nav is fixed
        mainHeader.removeClass('is-hidden');
        belowNavHeroContent.addClass('secondary-nav-fixed');
      }

    } else {
      //if scrolling down...
      if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
        //hide primary nav
        mainHeader.addClass('is-hidden');
        belowNavHeroContent.addClass('secondary-nav-fixed');
      } else if( currentTop > secondaryNavOffsetTop ) {
        //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
        mainHeader.removeClass('is-hidden');
        belowNavHeroContent.addClass('secondary-nav-fixed');
      }

    }
}
})
