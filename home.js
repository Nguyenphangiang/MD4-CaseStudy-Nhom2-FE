function showIconLogout(){
    let data= localStorage.getItem("data");
    let content = '';
    if (data == null){
        content = `<a href="login.html"><i class="fa fa-lock"></i> Login</a>`
        $('#iconLogin').html(content);
    }
    else {
        content = `<a href="index.html" onclick="logout()"><i class="fa fa-lock"></i> Logout</a>`
        $('#iconLogin').html(content);
    }
}
showIconLogout()
function showLoginForm(){
    let content = '';
    let data= localStorage.getItem("data");
    if (data == null){
        content = `<div class="row">
<div class="col-sm-4 col-sm-offset-1">
    <div class="login-form"><!--login form-->
        <h2>Login to your account</h2>
        <form action="#">
            <input type="text" placeholder="Name" id="name"/>
            <input type="password" id="password" />
            <button type="submit" class="btn btn-default" onclick="login()">Login</button>
         </form>
    </div><!--/login form-->
</div>
<div class="col-sm-1">
    <h2 class="or">OR</h2>
</div>
<div class="col-sm-4">
    <div class="signup-form"><!--sign up form-->
        <h2>New User Signup!</h2>
        <form action="#" name="signUpForm">
            <input type="text" placeholder="Name" id="c-name" name="name"/>          
            <input type="email" placeholder="Email Address" id="c-email" name="email"/>
            <input type="password" placeholder="Password" id="c-password" name="password"/>
            <input type="password" placeholder="confirm password" id="confirmPassword" name="confirmPassword"/>
            <button type="submit" class="btn btn-default" onclick="createUser()" >Sign-up</button>
        </form>
    </div><!--/sign up form-->
</div>

</div>
</div>
<div id="resultContainer" style="display: none;">
 <hr/>
 <h4 style="color: green;">JSON Response From Server</h4>
  <pre style="color: green;">
    <code></code>
   </pre>
</div>`
        $('#alreadyLogin').html(content);
       ;
    }
    let obj = JSON.parse(data)
    let role = obj.roles.pop().authority;

    if (role === "ROLE_USER" || role === "ROLE_ADMIN"){
        content = `<h3>You are  already login</h3>`
        $('#alreadyLogin').html(content);
    }
}
showLoginForm()
function showAccountDetail(){
    let data = localStorage.getItem("data");
    let obj = JSON.parse(data);
    let content = '';
    if (data == null){
        window.location.href="index.html";
    } else {
        let role = obj.roles.pop().authority;
        if (role === "ROLE_ADMIN"){
            content = `<a href="userList.html"><i class="fa fa-user"></i> Account</a>`
            $('#accountDetail').html(content);
        } else{
            content = `<a href="" onclick=""><i class="fa fa-user"></i> Account</a>`
            $('#accountDetail').html(content);
        }
    }
}
showAccountDetail();
function createUser(){
    event.preventDefault();
    let name = $('#c-name').val();
    let password = $('#c-password').val();
    let confirmPassword = $('#confirmPassword').val();
    // let passwordForm = {
    //     "password" : password,
    //     "confirmPassword" : confirmPassword
    // }
    // let passwordFormDetail = JSON.stringify(passwordForm)
    let email = $('#c-email').val();
    let newUser = new FormData();
    let roleSet = "2";
    newUser.append('name',name);
    newUser.append('password',password);
    newUser.append('confirmPassword',confirmPassword);
    // newUser.append("passwordForm",passwordFormDetail);
    newUser.append('email',email)
    newUser.append('roleSet',roleSet);
    $.ajax({
        type:"POST",
        enctype: 'multipart/from-data',
        processData: false,
        contentType: false,
        url:"http://localhost:8080/sign-in",
        data:newUser,
        success : function (){
            alert("Register Successful!")
            window.location.href="login.html"
        }
    })
}




