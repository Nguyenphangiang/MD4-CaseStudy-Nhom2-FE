let data= localStorage.getItem("data");
if (data == null) {
    window.location.href = "../home/home.html"
}
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
            url: `http://localhost:8080/sign-up/${id}`,
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
            url: "http://localhost:8080/sign-up/list",
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
function logout(){
    window.localStorage.clear();
    location.href = '../home/home.html';
}