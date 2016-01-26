// JavaScript Document
$(function()
{
	var _viewHeight=$(window).height();
		
	$(".span_btn").on("click",function()
	{
		$(".func").fadeIn();
		$("body").css({"overflow":"hidden"});
	});

	$(".func").on("click",function()
	{
		$(this).fadeOut();
		$("body").css({"overflow":""});
	});
	
	$(".func_panel").on("click",function(ev)
	{
		return false;
	});
	
	$(window).resize(function()
	{
		_viewHeight=$(window).height();
		$(".func").height(_viewHeight);
		if($(window).width()>768)
		{
			$("body").css({"overflow":""});
			$(".func").hide();
		}
	});
})