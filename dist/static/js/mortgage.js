// JavaScript Document
$(function()
{
	
	//立即申请跳转
	$("#now_apply").click(function()
	{
		$("html,body").animate({"scrollTop":$(".apply").offset().top-60},1000);
	});
	
	//贷款计算
	$(".btn_calc").on("click",function()
	{
		var result=[];
		var temp;
		temp=checkNum($("#txt_sj"),"售价不能为空","请输入合法售价");
		result.push(temp);
		temp=checkNum($("#txt_sf"),"首付不能为空","请输入合法金额");
		result.push(temp);
		temp=checkNum($("#txt_ll"),"利率不能为空","请输入合法利率");
		result.push(temp);
		temp=checkNx();
		result.push(temp);
		if(result.indexOf(false)==-1)
		{
			////////////// 利率请自行完成 //////////////
			var totalMoney=$("#txt_sj").val()*$("#txt_sf").val()*$("#txt_ll").val()*$("#sel_nx").val()/100;
			$("#calc_result").text(totalMoney);
		}
	});
	
	//申请贷款
	$("#a_apply").on("click",function()
	{
		var result=[];
		var temp;
		temp=checkNull($("#txt_name"),"售价不能为空");
		result.push(temp);
		temp=checkNum($("#txt_phone"),"联系号码不能为空","请输入合法电话号码");
		result.push(temp);
		temp=checkNull($("#txt_weixin"),"请输入微信号");
		result.push(temp);
		temp=checkEmail($("#txt_email"),"Email不能为空","请输入合法Email");
		result.push(temp);
		
		if(result.indexOf(false)==-1)
		{
			///////////////////// 提交请自行完成 //////////////////////
		}
	});
});

//检查年限
function checkNx()
{
	if($("#sel_nx").val()=="年限(%)")
	{
		$("#sel_nx").addClass("error");
		$("#sel_nx").next("i").text("请选择年限");
		return false;
	}
	else
	{
		$("#sel_nx").next("i").text("");
		$("#sel_nx").removeClass("error");
		return true;
	}
}

//空值判断
function checkNull($this,nullMsg)
{
	if($.trim($this.val()).length==0)
	{
		$this.addClass("error");
		$this.next("i").text(nullMsg);
		return false;
	}
	else
	{
		$this.next("i").text("");
		$this.removeClass("error");
		return true;
	}
}

//检查是否是数字
function checkNum($this,nullMsg,errMsg){
	var reg=/^\d+(\.\d+)?$/;
	checkReg($this,reg,nullMsg,errMsg);
}

//检查Email
function checkEmail($this,nullMsg,errMsg)
{
	var reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	checkReg($this,reg,nullMsg,errMsg);
}

  

function checkReg($this,reg,nullMsg,errMsg)
{
	if($.trim($this.val()).length==0)
	{
		$this.addClass("error");
		$this.next("i").text(nullMsg);
		return false;
	}
	else
	{
		$this.next("i").text("");
		$this.removeClass("error");
		
		var exp=reg;
		var result=exp.test($this.val());
		if(result)
		{
			$this.next("i").text("");
			$this.removeClass("error");
			return true;
		}
		else
		{
			$this.addClass("error");
			$this.next("i").text(errMsg);
			return false;
		}
	}
}