let supId =  sessionStorage.getItem("id");
function addToCart(){
   let idSup =  sessionStorage.getItem("id");
   let meetAddress = $('#meetAddress').val();
   if (meetAddress == null){
       meetAddress = "Hà Nội"
   }
   let meetTime = $('#meetTime').val();
   if (meetTime == null){
       meetTime = "2022-05-22 00:00:00"
   }
   let serviceId = $('#service').val();
   if (serviceId == null){
       serviceId = "1";
   }
   let newCart = {
       "supplier":{
           "id": idSup
       },
       "meetAddress" : meetAddress,
       "meetTime" : meetTime,
       "service": {
            "id" :serviceId
       }
   }
   $.ajax({
       headers:{
           'Accept' : 'application/json',
           'Content-Type':'application/json'
       },
       type:'POST',
       url: "http://localhost:8080/cart",
       data:JSON.stringify(newCart),
       success: function (){
           alert("Thanks <3")
       }
   })
}
function deleteCart(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/cart/delete/${id}`,
        success: function (){
            showCartList();
            showServiceAndPriceBySupId()
        }
    })
}
function updateCart(){
    let cartId = $('#cartId').val();
    let supId = $('#supId').val();
    let meetTime = $('#meetTime').val();
    let meetAddress = $('#meetAddress').val();
    let serviceId = $('#service').val();
    let updateCart = {
        "id": cartId,
        "supplier":{
            "id": supId
        },
        "meetAddress" : meetAddress,
        "meetTime" : meetTime,
        "service": {
            "id" :serviceId
        }
    }
    alert("Book hẹn thành công, Thời gian:" + meetTime + ",Địa điểm:" + meetAddress);
    deleteCart(cartId);
    $.ajax({
        headers:{
            'Accept' : 'application/json',
            'Content-Type':'application/json'
        },
        type:'PUT',
        url: "http://localhost:8080/cart/updateCart",
        data:JSON.stringify(updateCart),
        success: function (){
            showCartList();
            showServiceAndPriceBySupId()
        }
    })
}

function changePrice(serviceId){
    $.ajax({
        type :"GET",
        url: `http://localhost:8080/cart/serviceDetail/${supId}/service/${serviceId}`,
        success: function (serviceAndPrice){
            let content =  `${serviceAndPrice.price} USD`

             $('#servicePrice').html(content);
        }
    })
}
function showServiceAndPriceBySupId(){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/koibito/findPriceBySupplierId/${supId}`,
        success: function (service) {

            let content = "";
            for (let i = 0; i < service.length; i++) {

                content += `
                    <option value="${service[i].id}" >${service[i].name}</option>
                   
                     `
                $("#service").html(content);
            }
        }
    })
}
function showCartList(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/cart",
        success:function (cart){

            let content = '';
            for (let i = 0; i < cart.length; i++) {
                content += `
    <tr>
    <td class="cart_product">
        <a href=""><img src="${'http://localhost:8080/image/' + cart[i].supplier.image}" width="150px" alt=""></a>
    </td>
    <input type="hidden" id="cartId" value="${cart[i].id}">
    <input type="hidden" id="supId" name="supId" value="${cart[i].supplier.id}">
    <td class="cart_description">
        <select  id="service" onchange="changePrice(this.value)">
    
        </select>
    </td>
     <td class="cart_price">
       <p id="servicePrice"></p>                
     </td> 
     <td class="cart_quantity">
    <div class="cart_quantity_button">
          
            <input  type="text" name="meetTime" id="meetTime" value="${cart[i].meetTime}">
            <label for="meetTime">*(YYYY-MM-DD HH:MM:SS)</label>
    </div>
</td>
     <td class="cart_total">
    <input type="text" id="meetAddress"  value ="">
    
</td>
    <td class="cart_delete">
    <input class="cart_quantity_delete" type="submit" value="Xác Nhận" onclick="updateCart()">
<a class="cart_quantity_delete" href="" onclick="deleteCart(${cart[i].id})"><i class="fa fa-times"></i></a>
</td></tr>
`
            }
            $('#cartList').html(content);
            showServiceAndPriceBySupId()
        }
    })
}
showCartList();


