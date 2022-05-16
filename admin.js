// let data= localStorage.getItem("data");
// if (data == null) {
//     window.location.href = "../index.html"
// }
// } else {
//     let obj = JSON.parse(data);
//     let token = obj.accessToken;
//     let role = obj.roles.pop().authority;
//     if (role === "ROLE_ADMIN"){
//         window.location.href = "../admin/userList.html"
//     } else
//         window.location.href = "../home/home.html"
//     console.log(role);
//     console.log(token);
//
// }
    function deleteUser(id) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/sign-in/${id}`,
            success: function () {
                showListUser()
            }
        })
    }

    function showListUser() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "GET",
            url: "http://localhost:8080/sign-in/list",
            success: function (data) {
                let content = ''
                for (let i = 0; i < data.length; i++) {
                    let arr = Array.from(data[i].roleSet);
                    content += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${data[i].name}</td>
        <td>${arr.pop().name}</td>
        <td><button onclick="deleteUser(${data[i].id})">Delete</button></td>
    </tr>`
                }
                $('#showUserList').html(content);
            }
        })
    }
showListUser();
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
        url: "http://localhost:8080/auth/login",
        data:JSON.stringify(user),
        success:function (data){
            localStorage.setItem("data",JSON.stringify(data));
            let data1= localStorage.getItem("data");
            let obj = JSON.parse(data1)
            let name = obj.name;
            // let token = obj.accessToken;
            let role = obj.roles.pop().authority;
            if(role === "ROLE_ADMIN"){
                window.location.href = "index.html"
                alert("Welcome to koibito " + name)
            } else {
                // window.location.href = "../home/home.html"
                window.location.href = "index.html"
                alert("Welcome to koibito " + name)
            }
        }
    })
}

function logout(){
    alert("Cảm ơn vì đã sử dụng dịch vụ");
    window.localStorage.clear();
    location.href = '../index.html';
}