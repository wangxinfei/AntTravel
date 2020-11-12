<?php
include("dbconfig.php");//引用数据库配置文件
	$sql="select * from user";
	$result=$db->query($sql);
	if($result==false){
		echo "sql错误";
		exit;
	}
	$users;
	while($row=$result->fetch_array(MYSQL_ASSOC)){//用数组循环存储学生信息
		$users[]=$row;
	}
?>


<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>注册界面</title>
	</head>
	<body>
		
		
		
		
		
		
		<table width="480px"height="700px" border="0" cellspacing="0" align="center" background="images/login.jpg">
			<tr>
				<td>
					<form action="add_user.php" method="POST">
						<table width="600px" height="750px" border="0" cellspacing="6px"align="center">
							<tr valign="middle">
								<td class="login_td1" colSpan=2>
									<font face="黑体" size="4px" color=white style="font-size: 30px;">说走就走-新用户注册</font>
								</td>
							</tr>
							<tr><td style="color: white;">用户名：<input type="text" name="Uid" placeholder="请输入2~6位中文字符"maxlength="6"/></td></tr>
							<tr><td style="color: white;">密码：<input type="text" name="Upwd" placeholder="请输入6~8位数字"maxlength="8"/></td></tr>
							<tr><td style="color: white;">手机号：<input type="text" name="Uphone" placeholder="请输入7~11位数字"maxlength="8"/></td></tr>
							<tr><td style="color: white;">性别：<input type="radio" name="Usex" value="nan"/>男
							<input type="radio" name="Usex" value="nv"/>女
							<input type="radio" name="Usex" value="sex"checked=""/>保密</td></tr>
							<tr><td style="color: white;">生日：<input type="date" name="Ubirth"/></td></tr>
							<tr><td style="color: white;">邮件：<input type="email" name="Umail" placeholder="请输入常用邮箱"/></td></tr>
							<tr><td style="color: white;">标签：<input type="text" name="Utag"textarea rows="4" cols="50" placeholder="介绍一下自己吧....."></textarea></td></tr>
							<!-- <tr><td align="center"><input type="submit"  /> -->
							<tr>
								<td height="20" colspan="2" align="center"><input type="reset" value="重置" class="login_button" />  
								<a href="reg.asp"></a>
											 <input type="button" value="注册" onclick="location.href='denglu.html'">
								
							</tr>
						</table>
					</form>
				</td>
			</tr>
		</table>
	</body>
</html>