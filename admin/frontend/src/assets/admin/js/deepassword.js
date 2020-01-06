// deepassword.js
// @author Pedro Bauzá
// @date 24/08/2015
function deePassword(element) {
    // Password value
    var password = element.val();
    // Parent
    var cparent = element.parent();
    // Password init strength
    var passStrength = 0
    // No password informed
    if (password.length < 1) { 
        cparent.removeAttr('data-strength');
        cparent.find('.dp-result').removeClass('dp-show');
        cparent.find('.dp-bar').removeClass('dp-show');
        cparent.find('.dp-result').html("");
        return;
    }
    // Password too short
    cparent.removeAttr('data-strength');
    if (password.length < 6) { 
        cparent.find('.dp-result').addClass('dp-show');
        cparent.find('.dp-bar').addClass('dp-show');
        cparent.attr('data-strength', 'short');
        cparent.find('.dp-result').html("Too short");
        return;
    }
    // Length up to 7 characters
    if (password.length > 7) { 
        passStrength += 1;
    }
    // Password contains lower and uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        passStrength += 1;
    }
    // Password with numbers and characters
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
        passStrength += 1;
    } 
    // Password with special charecters
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) { 
        passStrength += 1;
    }
    // Password with at least two special characters
    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) {
        passStrength += 1;
    }
    if (passStrength < 2 ) {
        cparent.attr('data-strength', 'weak');
        cparent.find('.dp-result').html("Weak");
    } else if (passStrength == 2 ) {
        cparent.attr('data-strength', 'medium');
        cparent.find('.dp-result').html("Medium");
    } else {
        cparent.attr('data-strength', 'strong');
        cparent.find('.dp-result').html("Strong");
    }
}