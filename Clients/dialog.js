$('.card-footer').dialog({
    'title': 'My Dialog Header',
    'buttons': {
        'My Button': function(event) {
            // here is the modification of the button
            // opacity set to 25%, all events unbound
            $(event.target).css({opacity: 0.25}).unbind();
        }
    }
});