(function( $ ){
  $.fn.creditCard = function( options ) {  
    var cardTypes = [{ name: "Visa", lengths: [13,16], pattern: /^4/},
                    { name: "MasterCard", lengths: [16], pattern: /^5[1-5]/},
                    { name: "DinersClub", lengths: [14,16], pattern: /^3[0,6,8]/},
                    { name: "AmEx", lengths: [15], pattern: /^3[4,7]/},
                    { name: "Discover", lengths: [16], pattern: /^6011/},
                    { name: "JCB", lengths: [16], pattern: /^35/}]
    
    var classNames = cardTypes.map(function(cardType, idx) {
      return cardType.name.toLowerCase();
    }).join(' ');
        
    var methods = {
      getCardType: function(cardNumber) {
        cardNumber = cardNumber.replace(/\D/g, ""); 
        for(var i = 0;i < cardTypes.length;i++) {
          if (cardTypes[i].pattern.test(cardNumber)) {
            return cardTypes[i].name;
          }
        }
      }
    }
    
    var settings = {};

    return this.each(function() {        
      if ( options ) { 
        $.extend( settings, options );
      }
      
      $(this).bind('input keyup', function(e) {
				var cardType;
        if (cardType = methods.getCardType($(this).val())) {
					
          $(this).removeClass(classNames).addClass(cardType.toLowerCase());
					if(settings.fn)
						settings.fn(cardType.toLowerCase());
        } else {
          $(this).removeClass(classNames);
					if(settings.fn)
						settings.fn(null);
        }
      });
    });

  }
})( jQuery );