<%--
  Created by IntelliJ IDEA.
  User: zyc
  Date: 2019/1/10
  Time: 14:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en" class="no-js">

<head>

    <meta charset="utf-8">
    <title>TimeLine Register</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- CSS -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/supersized.css">
    <link rel="stylesheet" href="css/style.css">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

</head>

<body oncontextmenu="return false">

<div class="page-container">
    <h1>注册</h1>
    <form action="UserServlet?method=register" method="post" id="register">
        <div>
            <input type="text" name="reg_username" class="username" placeholder="Username" value=""/>
        </div>
        <div>
            <input type="password" name="reg_password1" class="password" placeholder="Password" value="" />
        </div>
        <div>
            <input type="password" name="reg_password2" class="password" placeholder="Confirm Password" value="" />
        </div>
        <input type="submit" value="注册">
    </form>
    <form action="Login.jsp" method="post">
        <input type="submit" value="前往登录">
    </form>

    <div class="connect">
        <p>If we can only encounter each other rather than stay with each other,then I wish we had never encountered.</p>
        <p style="margin-top:20px;">如果只是遇见，不能停留，不如不遇见。</p>
    </div>
</div>
<%

    String flag = "-1";
    flag = (String)request.getAttribute("flag");
    if(flag == "0"){
%>
<script>
    window.alert("用户名已存在！");
</script>
<%
}else if(flag == "1"){
%>
<script>
    window.alert("注册成功！");
</script>
<%
}else if(flag == "2"){
%>
<script>
    window.alert("两次密码不一致！");
</script>
<%
}else if(flag == "3"){
%><script>
    window.alert("任何一项不能为空！");
</script>
<%
    }
%>

<!-- Javascript -->
<script src="http://apps.bdimg.com/libs/jquery/1.6.4/jquery.min.js" type="text/javascript"></script>
<script src="js/supersized.3.2.7.min.js"></script>
<script src="js/supersized-init.js"></script>

</body>

</html>