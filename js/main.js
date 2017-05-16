!function(a,b,c,d){a.extend(a.fn,{accrue:function(b){return b=a.extend({calculationMethod:f},a.fn.accrue.options,b),this.each(function(){var c=a(this);c.find(".form").length||c.append('<div class="form"></div>');e(c,b,"amount"),e(c,b,"rate"),e(c,b,"term");if("compare"==b.mode){e(c,b,"rate_compare")}var d;".results"===b.response_output_div?(0===c.find(".results").length&&c.append('<div class="results"></div>'),d=c.find(".results")):d=a(b.response_output_div);var i;switch(b.mode){case"basic":i=f;break;case"compare":i=g;break;case"amortization":i=h}i(c,b,d),"button"==b.operation?(0===c.find("button").length&&0===c.find("input[type=submit]").length&&0===c.find("input[type=image]").length&&c.find(".form").append('<button class="accrue-calculate">'+b.button_label+"</button>"),c.find("button, input[type=submit], input[type=image]").each(function(){a(this).click(function(a){a.preventDefault(),i(c,b,d)})})):c.find("input, select").each(function(){a(this).bind("keyup change",function(){i(c,b,d)})}),c.find("form").each(function(){a(this).submit(function(a){a.preventDefault(),i(c,b,d)})})})}}),a.fn.accrue.options={mode:"basic",operation:"keyup",default_values:{amount:"$7,500",rate:"7%",rate_compare:"1.49%",term:"36m"},field_titles:{amount:"Loan Amount",rate:"Rate (APR)",rate_compare:"Comparison Rate",term:"Term"},button_label:"Calculate",field_comments:{amount:"",rate:"",rate_compare:"",term:"Format: 12m, 36m, 3y, 7y"},response_output_div:".results",response_basic:"<p><strong>Monthly Payment:</strong><br />$%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />$%total_payments%</p><p><strong>Total Interest:</strong><br />$%total_interest%</p>",response_compare:'<p class="total-savings">Save $%savings% in interest!</p>',error_text:'<p class="error">Please fill in all fields.</p>',callback:function(a,b){}};var e=function(a,b,c){var d;return a.find(".accrue-"+c).length?d=a.find(".accrue-"+c):a.find("."+c).length?d=a.find("."+c):a.find("input[name~="+c+"]").length?a.find("input[name~="+c+"]"):d="","string"!=typeof d?d.val():"term_compare"==c?!1:(a.find(".form").append('<div class="accrue-field-'+c+'"><p><label>'+b.field_titles[c]+':</label><input type="text" class="'+c+'" value="'+b.default_values[c]+'" />'+(b.field_comments[c].length>0?"<small>"+b.field_comments[c]+"</small>":"")+"</p></div>"),a.find("."+c).val())},f=function(b,c,d){var f=a.loanInfo({amount:e(b,c,"amount"),rate:e(b,c,"rate"),term:e(b,c,"term")});if(0!==f){var g=c.response_basic.replace("%payment_amount%",f.payment_amount_formatted).replace("%num_payments%",f.num_payments).replace("%total_payments%",f.total_payments_formatted).replace("%total_interest%",f.total_interest_formatted);d.html(g)}else d.html(c.error_text);c.callback(b,f)},g=function(b,c,d){var f=e(b,c,"term_compare");"boolean"==typeof f&&(f=e(b,c,"term"));var g=a.loanInfo({amount:e(b,c,"amount"),rate:e(b,c,"rate"),term:e(b,c,"term")}),h=a.loanInfo({amount:e(b,c,"amount"),rate:e(b,c,"rate_compare"),term:f}),i={loan_1:g,loan_2:h};if(0!==g&&0!==h){g.total_interest-h.total_interest>0?i.savings=g.total_interest-h.total_interest:i.savings=0;var j=c.response_compare.replace("%savings%",i.savings.toFixed(2)).replace("%loan_1_payment_amount%",h.payment_amount_formatted).replace("%loan_1_num_payments%",h.num_payments).replace("%loan_1_total_payments%",h.total_payments_formatted).replace("%loan_1_total_interest%",h.total_interest_formatted).replace("%loan_2_payment_amount%",g.payment_amount_formatted).replace("%loan_2_num_payments%",g.num_payments).replace("%loan_2_total_payments%",g.total_payments_formatted).replace("%loan_2_total_interest%",g.total_interest_formatted);d.html(j)}else d.html(c.error_text);c.callback(b,i)},h=function(b,c,d){var f=a.loanInfo({amount:e(b,c,"amount"),rate:e(b,c,"rate"),term:e(b,c,"term")});if(0!==f){for(var g='<table class="accrue-amortization"><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Payment Amt.</th><th class="accrue-total-interest">Total Interest</th><th class="accrue-total-payments">Total Payments</th><th class="accrue-balance">Balance</th></tr>',h=f.payment_amount-f.original_amount/f.num_payments,i=f.payment_amount-h,j=0,k=0,l=parseInt(f.original_amount),m=0;m<f.num_payments;m++){j+=h,k+=f.payment_amount,l-=i;var n="td";m==f.num_payments-1&&(n="th"),g=g+"<tr><"+n+' class="accrue-payment-number">'+(m+1)+"</"+n+"><"+n+' class="accrue-payment-amount">$'+f.payment_amount_formatted+"</"+n+"><"+n+' class="accrue-total-interest">$'+j.toFixed(2)+"</"+n+"><"+n+' class="accrue-total-payments">$'+k.toFixed(2)+"</"+n+"><"+n+' class="accrue-balance">$'+l.toFixed(2)+"</"+n+"></tr>"}g+="</table>",d.html(g)}else d.html(c.error_text);c.callback(b,f)};a.loanInfo=function(a){var b=("undefined"!=typeof a.amount?a.amount:0).replace(/[^\d.]/gi,""),c=("undefined"!=typeof a.rate?a.rate:0).replace(/[^\d.]/gi,""),d="undefined"!=typeof a.term?a.term:0;d=d.match("y")?12*parseInt(d.replace(/[^\d.]/gi,"")):parseInt(d.replace(/[^\d.]/gi,""));var e=c/100/12,f=Math.pow(1+e,d),g=b*f*e/(f-1);return b*c*d>0?{original_amount:b,payment_amount:g,payment_amount_formatted:g.toFixed(2),num_payments:d,total_payments:g*d,total_payments_formatted:(g*d).toFixed(2),total_interest:g*d-b,total_interest_formatted:(g*d-b).toFixed(2)}:0}}(jQuery,window,document),function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-38315794-21","auto"),ga("send","pageview"),$(function(){$(".calculator.auto").accrue({mode:"compare",response_output_div:".result.auto",response_compare:"<h3>Congratulations!<br> You can save up to <strong>$%savings%</strong> in interest!</h3>",error_text:"<p>Enter loan information to calculate savings.</p>"}),$(".calculator.home").accrue({mode:"compare",response_output_div:".result.home",response_compare:"<h3>Congratulations!<br> You can save up to <strong>$%savings%</strong> in interest!</h3>",error_text:"<p>Enter loan information to calculate savings.</p>"}),$("a").creep()});var valid_email=function(a){var b=/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;return-1!=String(a).search(b)},contact_submit=function(a){$(a).find("submit").attr("disabled","disabled");var b={name:$(a).find("input[name=name]").val(),email:$(a).find("input[name=email]").val(),phone:$(a).find("input[name=phone]").val(),best_time:$(a).find("input[name=best-time]").val(),message:$(a).find("textarea").val()},c=$.param(b),d=[],e=$(a).find(".error");return e.html(""),b.name.length<2&&d.push("Please provide a name."),valid_email(b.email)||d.push("Please provide a valid email address."),0==d.length?$.post("/send.php",c,function(a){"success"===a?location.href="/thanks.html":e.html("There was a problem submitting the form. Please call us for further assistance.").slideDown(400)}):(e.html(""),$.each(d,function(a,b){0===a?e.append(b):e.append("<br>"+b)}),e.is(":hidden")&&e.slideDown(400)),!1};$(document).ready(function(){$("form#contact").submit(function(a){a.preventDefault(),contact_submit(this)})}),!function(a){a.extend(a.fn,{creep:function(c){return c=a.extend({},a.fn.creep.options,c),this.each(function(){var d=a(this);d.click(function(a){var e=d.attr("href"),f=e.replace("#","");return e.match("#")&&"#"!==e&&!e.match("http")?(a.preventDefault(),b(f,c),!1):void 0})})},creepTo:function(c){return c=a.extend({},a.fn.creep.options,c),this.each(function(){var d=a(this);d.click(function(a){var e=d.attr("href"),f=e.replace("#","");return e.match("#")&&"#"!==e&&!e.match("http")?(a.preventDefault(),b(f,c),!1):void 0})})}});var b=function(b,c){var d=a("a[name='"+b+"']");"undefined"==typeof d.offset()&&(d=a("#"+b)),"undefined"!=typeof d.offset()&&(a("html, body").animate({scrollTop:d.offset().top+c.offset},c.speed),history.pushState&&history.pushState(null,null,"#"+b))};a.fn.creep.options={offset:0,speed:1e3}}(jQuery,window,document);