

$(function(){

	$(".calculator.auto").accrue({
		mode: "compare",
		response_output_div: ".result.auto",
		response_compare: "<h3>Congratulations!<br> You can save up to <strong>$%savings%</strong> in interest!</h3>",
		error_text: "<p>Enter loan information to calculate savings.</p>"
	});
	
	$(".calculator.home").accrue({
		mode: "compare",
		response_output_div: ".result.home",
		response_compare: "<h3>Congratulations!<br> You can save up to <strong>$%savings%</strong> in interest!</h3>",
		error_text: "<p>Enter loan information to calculate savings.</p>"
	});

	$('a').creep();

});

