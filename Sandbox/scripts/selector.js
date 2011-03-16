var reset_functions = [];

var get_rendered_elements = function () {
  return $( $( "input[type=text]" ).attr( "value" ) , $("#rendered_page") );
};

var get_source_elements = function () {
  return $( $( "input[type=text]" ).attr( "value" ) , $("#source_code") );
};

var make_reset_function = function ( selected ) {
  return function () {
    var old_border = selected.css( "border" );
    selected.css( "border" , old_border );
  };
};

var apply_selected_style = function () {
  for( var i = 0; i < arguments.length; i++) {
    arguments[i].css( "border" , "2px solid red" );
  }
};

var make_reset_functions = function() {
  for(var i = 0; i < arguments.length; i++) {
    arguments[i].each( function(index , element) {
      reset_functions.push( make_reset_function( $(element) ) );
    });
  }
};

var load_clean_source = function () {
  $("#source_code").children().remove();
  $("#clean_source").children().clone().appendTo("#source_code");
};

var highlight_source = function () {
  $("#source_code pre").attr("class" , "sh_html");
  sh_highlightDocument();
};

var evaluate_expression = function ( event ) {
  load_clean_source();
  $.each( reset_functions , function ( index , lambda ) { lambda.call(); } );
  reset_functions = [];
  
  var rendered = get_rendered_elements();
  var source   = get_source_elements();
  
  make_reset_functions( rendered );
  apply_selected_style( rendered , source );
  highlight_source();
  return false;
};

var hide_rendering = function(event) {
  $(event.target).attr( "value" , "Rendered Page - Off" );
  $("#source_code").css( {"width" : "80%" , "float" : "none" , "display" : "block" , "margin" : "30px auto"} );
  $("#rendered_page").css("display" , "none");
};

var show_rendering = function(event) {
  $(event.target).attr( "value" , "Rendered Page - On" );
  $("#source_code").css( {"width" : 500 , "margin" : 30 , "float" : "left"} );
  $("#rendered_page").css("display" , "inline-block");
};

var initialize = function () {
  $("form").submit( evaluate_expression );
  $("input[type='button']").click(evaluate_expression);
  load_clean_source();
  highlight_source();
  $("#controls form input:nth-child(3)").toggle(hide_rendering , show_rendering);
};

$(initialize);