<?php
//添加学生信息操作文件
include("dbconfig.php");
	$Uid=$_POST['Uid'];//使用post获取表单信息,$_POST['']内填写表单的name值
	$Upwd=$_POST['Upwd'];
	$Uphone=$_POST['Uphone'];
	$Usex=$_POST['Usex'];
	$Ubirth=$_POST['Ubirth'];
	$Umail=$_POST['Umail'];
	$Utag=$_POST['Utag'];

	$sql="insert into user (Uid, Upwd, Uphone, Usex, Ubirth, Umail, Utag) values ('$Uid', '$Upwd', '$Uphone', $Usex, $Ubirth, '$Umail', '$Utag')";//sql插入语句
	$res = mysqli_query($db, $sql);
	$result=$db->query($sql);//进行相应的操作，插入
		if($result)
			echo "<script>alert('添加成功！返回');location.href='index.php'</script>";//js脚本文件：提示弹窗及页面重定向
		else
			echo "<script>alert('添加失败！返回');location.href='index.php'</script>";
	}else{
		echo "<script>alert('添加失败！返回');location.href='index.php'</script>";
	}
	
?>