$(document).ready(function () {

    var $window = $(window);

    /*********************Stat Counter**********************/

    // const $counter = $('.counter-container span:nth-child(1)');
    // const counter_text = $counter.text();
    // const value = counter_text.substring(0, counter_text.length - 2);
    // var initialValue = 0;
    // const increment = Math.ceil(value / 1000);

    // $('.counter-container span:nth-child(3)').css('transform', 'scaleX(1)');

    // const clear = setInterval(() => {
    //     initialValue += increment;
    //     if (initialValue > value) {
    //         $counter.text(`${value}k+`);
    //         clearInterval(clear);
    //         return;
    //     }
    //     $counter.text(`${initialValue}k+`);
    // }, 10);

    /*********************Review Slider**********************/
    var $reviewButtons = $('.review-btn');
    var $reviewContainer = $('.review-card-container');
    var $reviews = $('.review-card');

    var $el_first = $reviews.eq(0).clone();
    var $el_last = $reviews.eq($reviews.length - 1).clone();
    $reviews.eq(0).before($el_last);
    $reviews.eq($reviews.length - 1).after($el_first);

    var showMultipleRw, slidingOffset;

    function slidingReviews(){
        showMultipleRw = !($window.width() <= 750);

        var gapBwReviews = ($window.width() - ( (1 + showMultipleRw) * $reviews.innerWidth())) / 2;
        var reviewContainerWidth = $reviews.innerWidth() * ($reviews.length + 2) + gapBwReviews * ($reviews.length + 1);
        
        $reviewContainer.css('width', reviewContainerWidth);
    
        slidingOffset = $reviews.innerWidth() + gapBwReviews;

        $('.btn-active').click();
    }

    slidingReviews();
    
    var doit;
    $window.on('resize' , function(){       //making the callback function run only after the current resizing task
    clearTimeout(doit);                     //is terminated and not every time the resize event gets fired
    doit = setTimeout(()=>{
        slidingReviews();
        setTimeout(slidingReviews, 1000);
    }, 200);
    });
    
    
    $reviewButtons.each(function (index) {
        $(this).on('click', function () {
            $reviewButtons.removeClass('btn-active');
            $(this).addClass('btn-active');
    
            $reviewContainer.css('left', (-$reviews.innerWidth() / (1 + showMultipleRw)) - (index * slidingOffset) + 'px');

            $reviews.removeClass('active');
            $reviews.eq(index).addClass('active');
        });
    });

    $reviewButtons.eq(1).click();

    /*********************Sticky Navbar**********************/
    
    var $header = $('header');
    $window.on('scroll', function () {
        if ($window.scrollTop() >= 400) {
            $header.addClass('fixed-nav');
        }
        else {
            $header.removeClass('fixed-nav');
        }

    });


    /*********************Meal Section Animations**********************/



    $window.on('scroll', function () {
        var scrollTo = $window.scrollTop() + $window.height();
        var $tabOne = $('#tab-1');
        var tabOneMidPoint = $tabOne.offset().top + $tabOne.height() / 2;

        if (scrollTo >= tabOneMidPoint) {
            addTransition('#tab-1');
            // $window.off('scroll');
        }
    });

    function addTransition(id) {
        var $img = $(id + ' img');
        var $h3 = $(id + ' h3');


        $img.attr('class', 'in-window meal-attributes');
        $h3.attr('class', 'in-window meal-attributes');
    }

    /*********************Meal Section Tab Functionality**********************/

    $('.tab-list').each(function () {
        var $tabList = $('.tab-list');
        var $activeListItem = $tabList.find('li.active');
        var $activeTab = $activeListItem.find('a');
        var $activePanel = $($activeTab.attr('href'));

        var $anchors = $('.tab-list a');

        $anchors.on('click', function (e) {  //this will put the event listeners on all tabs bcoz $anchors contains set of all anchor tags
            e.preventDefault();
            var $target = $(e.target);
            var id = e.target.hash;


            $activeListItem.removeClass('active');
            $activePanel.removeClass('active');

            $activeListItem = $target.parent().addClass('active');
            $activePanel = $(id).addClass('active');
            setTimeout(function () { addTransition(id); }, 200);
        });

    });

/*********************Smooth Scrolling**********************/

    var $navLinks = $('.navLinks').add('*[data-href]');
    const $navToggle = $('.nav-toggle');
    const $navbarList = $('#navbar ul');
    const navbarListHeight = 202.61;
    var headerHeight;

    $navLinks.each(function () {
        var $this = $(this);
        $this.on('click', function (e) {
            e.preventDefault();
            
            if($navbarList.has($this).length) $navToggle.click();

            headerHeight = $header.innerHeight();
            
            if(!$header.hasClass('fixed-nav')) headerHeight += headerHeight;
            if($window.width() <= 736 && $navbarList.css('height') !== '0px')  headerHeight -= navbarListHeight;  
            //when the navigation panel is open on small devices, 'headerHeight' will be representing 
            //a large value that'll include the navbarListHeight also  
             
            var targetElAttr = $this.attr('data-href') || $this.attr('href');

            $window.scrollTop($(targetElAttr).offset().top - headerHeight);
        });
    });


    $navToggle.on('click', ()=>{
        if($navbarList.css('height') !== '0px'){
            $navbarList.css('height', '0');
            $navToggle.css('color', 'initial');
        }
        else{
            $navbarList.css('height', navbarListHeight);
            $navToggle.css('color', '#71b85f');
        }
    });

    $(document.forms.ctaForm).on('submit', e => e.preventDefault());


/*********************Typewriter Effect**********************/

    var $element = $('.typewrite');
    var fullTxt = $element.attr('data-type');
    var txt, len = 0;
    var tick = function(){
        
        txt = fullTxt.substring(0, ++len);
        
        $element.text(txt);
        
        if (txt === fullTxt){ 
            clearTimeout(clr);
            // $element.css('border-right', 'none');
            return;
        }
        var clr = setTimeout(tick, 50);
    }
    tick();
});





