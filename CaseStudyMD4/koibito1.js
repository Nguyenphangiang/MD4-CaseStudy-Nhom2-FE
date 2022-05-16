let ids = sessionStorage.getItem("id");

function showInformationById(id){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/koibito/findOneSupplier/${id}`,
        success:function (supplier1){

            // $('#name1').innerHTML(supplier1.name)
            $('#name1').html(supplier1.name)
            $('#name2').html(supplier1.name)
            $('#name3').html(supplier1.name)
            // document.getElementById("name1").innerHTML=supplier1.name
            $('#email1').html(supplier1.email)
            $('#email2').html(supplier1.email)
            $('#gender1').html(supplier1.gender)
            $('#hobby1').html(supplier1.hobby)
            $('#hobby2').html(supplier1.hobby)
            $('#personal1').html(supplier1.personal)
            $('#personal2').html(supplier1.personal)
            $('#note1').html(supplier1.note)
            $('#note2').html(supplier1.note)
            $('#height1').html(supplier1.height)
            $('#height2').html(supplier1.height)
            $('#weight1').html(supplier1.weight)
            $('#weight2').html(supplier1.weight)
            $('#phone1').html(supplier1.phone)
            $('#phone2').html(supplier1.phone)
            $('#age1').html(supplier1.age)
            $('#age2').html(supplier1.age)
            $('#address1').html(supplier1.address)
            $('#address2').html(supplier1.address)

            $('#status1').html(supplier1.status)
            let img = `<img class="img-fluid w-100 rounded-circle shadow-sm" src="http://localhost:8080/image/${supplier1.image}" alt="">`
            $(`#showImg`).html(img)
            let img1 = `<img class="img-fluid rounded w-100" src="http://localhost:8080/image/${supplier1.image}" alt="">`
            $(`#showImg1`).html(img1)

        }
    })
}

function showServiceById1(id){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/koibito/findPriceBySupplierId/${id}`,
        success: function (service) {

            let content = "";
            for (let i = 0; i < service.length; i++) {
                content += `<tr>
                    <td align="center"> <h3>${service[i].name}</h3></td>
                    <td align="center"><h3>${service[i].price} USD</h3></td>
                     </tr>`
                $("#list-service").html(content);
            }

        }
    })
}

showInformationById(ids)
showServiceById1(ids)
showAllService()
showAddress()
showAllGender()
showAllStatus()