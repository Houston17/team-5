$(document).ready(function() {
   $(".btn btn-primary").button().click(function () {
       $('#dialog_frame').dialog({
           height:500,
           width:500,
           modal:true
       });
    });
});
