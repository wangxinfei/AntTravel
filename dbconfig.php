<?php
	$host='127.0.0.1';//数据库地址
	$user='root';//用户名
	$pwd='root';//密码
	$dbname='anttravel';//使用的数据库名

	//通过函数传入参数，与数据库建立连接
	$db=new mysqli($host, $user, $pwd, $dbname);
	if($db -> connect_error <> 0){
		echo "连接失败,";
		echo $db-> connect_error;
		exit;
	}
	//使不出现乱码
	$db->query("SET NAMES UTF8");
?>