angular.module('lkApp')
.directive('rentfieldscheduletabs', function(){
   return {
       templateUrl: '/templates/rentFieldSchedule_tabs.html',
       controller: 'rentFieldTabsCtrl',
       replace: true,
       link: function($scope, $elem, $attr) {
           $('.wrapper__gradient').on('click', function(e) {
               var $this = $(this);
               var offset = "+=155";
               var tab = $('.rentfieldschedule .date');
               var gradient_left = $('.date_wrapper__gradient__left');
               var gradient_right = $('.date_wrapper__gradient__right');

               if ($this.hasClass('date_wrapper__gradient__left')) {
                    offset = "-=155";
               }

               if ($this.hasClass('date_wrapper__gradient__right') && parseInt(tab.css('right')) >= 155 ) {
                   gradient_right.addClass('hidden');
               }

               tab.animate({
                   'right' : offset
               }, 500, function(){

                   if (parseInt(tab.css('right')) > 0) {
                       gradient_left.removeClass('hidden');
                       gradient_right.removeClass('hidden');
                   }
                   else {
                       gradient_left.addClass('hidden');
                   }

                   if (parseInt(tab.css('right')) >= 310) {
                       gradient_right.addClass('hidden');
                   }
               });
           });
       }
   }
});