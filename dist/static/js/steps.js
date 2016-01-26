// JavaScript Document
$(function()
{
	$("img").load(function()
	{
		$(".line").height($(".ul_content li:last").offset().top-100);
	});
	
	$(window).resize(function()
	{
		_viewHeight=$(window).height();
		
		$(".line").height($(".ul_content li:last").offset().top-100);
	});
})