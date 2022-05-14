function login(){
    event.preventDefault();
    let name = $('#name').val();
    let password = $('#password').val();
    let user = {
        "name": name,
        "password":password
    }
    $.ajax({
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        type:"POST",
        url: "http://localhost:8080/koibito/login",
        data:JSON.stringify(user),
        success:function (data){
            localStorage.setItem("data",JSON.stringify(data));
            let data1= localStorage.getItem("data");
            let obj = JSON.parse(data1)
            // let token = obj.accessToken;
            let role = obj.roles.pop().authority;
            if(role === "ROLE_ADMIN"){
                window.location.href = "userList.html"
            } else {
                // window.location.href = "../home/home.html"
                 window.location.href = "index.html"
            }
        }
    })
}


function getRole(token){
    $.ajax({
        headers:{
            'Authorization' : 'Bearer ' + token,
            'Access-control-allow-origin': '*'
        },
        type:"GET",
        url: "http://localhost:8080/koibito/admin",
        success:function (data){
            console.log(data)
        }
    })
}
function logout(){
    window.localStorage.clear();
    location.href = '../home/home.html';
}