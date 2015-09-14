/**
 * Created by jdelatorre312 on 9/13/15.
 */

$(function(){

    //selecting the li for the main images.
    var $imageselection = $('#rm_container').find('li');

    //for initial setup of images, getting the rotation degree from the data attribute
    $.each($imageselection, function(i, val){

        var rotation = $(val).data('rotation');
        $(val).animate({
            transform:'rotate('+ rotation + 'deg)'
        });

    });

    //binding the rotating image initialization to the left and right arrows.
    $('#rm_next').on('click', function(){
        rotateImage(-1);
    });

    $('#rm_prev').on('click', function(){
        rotateImage(1);
    });

    //rotating image function
    function rotateImage(direction){
        $.each($imageselection, function(i, val){

            var $item = $(this);

            //settimeout so that there is a delay after clicking
            setTimeout(function(){

                var $otherImages = $('#' + $item.data('images')).children('img'),
                    totalOtherImages = $otherImages.length;

                    $img = $item.children('img:last'),
                    current = $item.data('current');

                //if current counter is more than count of images, reset
                if( current > totalOtherImages - 1){
                    current = 0;
                }else if( current < 0){
                    current = totalOtherImages - 1;
                }else{}

                var $other = $otherImages.eq(current).clone();

                //depending on direction, next or previous, set degree
                var rotatedirection = (direction === 1) ? '30deg' : '-30deg';

                //setting the transform origin and the rotation
                $other.css('transform', 'rotate(' + rotatedirection + ')');
                $other.css('transform-origin', '155px 930px 0px');
                $img.css('transform-origin', '155px 930px 0px');

                (direction ===1) ? ++current : --current;

                $item.data('current', current).prepend($other);

                var rotateTo = (direction === 1) ? '-80deg' : '80deg';

                //animation that gives the effect of the rotation.
                $img.animate({
                    transform:'rotate('+ rotateTo +')'
                }, 1200, function(){
                    $(this).remove();
                });

                $other.animate({
                    transform:'rotate(0deg)'
                }, 600);

            }, 300);

        });
    };

});