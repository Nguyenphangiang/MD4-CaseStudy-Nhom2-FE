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

// $(function (){
//     $('button[type=submit]').click(function (e){
//         e.preventDefault();
//
//         $('input').next().remove();
//
//         $.ajax({
//             headers: {
//                 'Access-control-allow-origin': '*'
//             },
//             type: "POST",
//             url : "http://localhost:8080/sign-in",
//             data: $('form[name=signUpForm]').serialize(),
//             success: function (res){
//                 if (res.validated){
//                     $('#resultContainer pre code').text(JSON.stringify(res.userForm));
//                     $('#resultContainer').show();
//                 } else {
//                     $.each(res.errorMessages,function(key,value){
//                         $('input[name='+key+']').after('<span class="error">'+value+'</span>');
//                     });
//                 }
//             }
//         })
//     })
// })




