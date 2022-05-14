
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
<form action="#">
<input type="text" placeholder="Name" id="c-name"/>
<input type="email" placeholder="Email Address" id="c-email"/>
<input type="password" placeholder="Password" id="c-password"/>
<input type="password" placeholder="confirm password" id="confirmPassword"/>
<button type="submit" class="btn btn-default" onclick="createUser()">Signup</button>
</form>
</div><!--/sign up form-->
</div>
</div>
</div>`
        $('#alreadyLogin').html(content);
    }
    let obj = JSON.parse(data)
    let role = obj.roles.pop().authority;
    let name = obj.name;

    if (role === "ROLE_USER" || role === "ROLE_ADMIN"){
        content = `<h3>You are  already login</h3>`
        $('#alreadyLogin').html(content);
        alert("Welcome to koibito " + name)
    }
}
showLoginForm();
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
        url:"http://localhost:8080/sign-up",
        data:newUser,
        success : function (){
            alert("Register Successful!")
            window.location.href="login.html"
        }
    })
}



