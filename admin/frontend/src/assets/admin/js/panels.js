$( document ).ready(function() {
    // Panel collapse
    $('button[data-panel=collapse]').click(function() {
        var panel = $(this).closest('div.panel');
        panel.find('.panel-body').slideToggle(200);
        $(this).find('i').toggleClass('fa-minus').toggleClass('fa-plus');
    });

    // Panel close
    $('button[data-panel=close]').click(function() {
        $(this).closest('div.panel').remove();
    });

    // Panel refresh
    $('button[data-panel=refresh]').click(function() {
        var panelBody = $(this).closest('.panel').find('.panel-body');
        if (!$(panelBody).hasClass('panel-loading')) {
            $(panelBody).addClass('panel-loading');
            $(panelBody).prepend('<div class="panel-refreshing"><div class="spinner"><div class="se round"></div></div></div>');
            setTimeout(function () {
                $(panelBody).removeClass('panel-loading');
                $(panelBody).find('.panel-refreshing').remove()
            }, 2000);
        }
    });
    
    // Panel tabs
     jQuery(document).ready(function ($) {
        $('#panel-tabs').tab();
    });
});