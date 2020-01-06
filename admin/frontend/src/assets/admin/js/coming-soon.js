(function($){
	var days = 86400, hours = 3600, minutes = 60;
	$.fn.countdown = function(prop){
		var options = $.extend({
			callback	: function(){},
			timestamp	: 0
		},prop);
		var left, d, h, m, s, positions;
		init(this, options);
		positions = this.find('.position');
		(function calc(){
			left = Math.floor((options.timestamp - (new Date())) / 1000);
			if(left < 0){
				left = 0;
			}
			d = Math.floor(left / days);
			update(0, 1, d);
			left -= d*days;
			h = Math.floor(left / hours);
			update(2, 3, h);
			left -= h*hours;
			m = Math.floor(left / minutes);
			update(4, 5, m);
			left -= m*minutes;
			s = left;
			update(6, 7, s);
			options.callback(d, h, m, s);
			setTimeout(calc, 1000);
		})();
		function update(minor,major,value){
			switchDigit(positions.eq(minor), Math.floor(value/10)%10);
			switchDigit(positions.eq(major), value%10);
		}
		return this;
	};
    
	function init(elem, options){
		elem.addClass('countdownWrapper');
		$.each(['Days','Hours','Minutes','Seconds'],function(i){
			$('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="countdownDigit static">0</span>\
				</span>\
				<span class="position">\
					<span class="countdownDigit static">0</span>\
				</span>\
                <span class="period">'+this+'</span>'
			).appendTo(elem);
			if(this!="Seconds"){
				elem.append('<span class="countdownSeparator"></span>');
			}
		});
	}
    
	function switchDigit(position,number){
		var digit = position.find('.countdownDigit')
		if(digit.is(':animated')){
			return false;
		}
		if(position.data('digit') == number){
			return false;
		}
		position.data('digit', number);
		var replacement = $('<span>',{
			'class':'countdownDigit',
			css:{
				top:'-2.1em',
				opacity:0
			},
			html:number
		});
		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:'2.5em',opacity:0},'fast',function(){
				digit.remove();
			})
		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}
})(jQuery);

$(function(){
	$('#countdown').countdown({
		timestamp	: (new Date()).getTime() + 864000000
	});
});