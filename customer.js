function showListCustomer(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/listCustomer",
        success: function (customer){
            let content = "";
            for (let i = 0; i < customer.length; i++) {
                content+=`<tr>
            <th scope="row">${customer[i].id}</th>
            <td>${customer[i].name}</td>
            <td>${customer[i].age}</td>
            <td>${customer[i].phone}</td>
            <td>${customer[i].email}</td>
            <td>${customer[i].gender.name}</td>
            <td><button class="deleteCustomer" onclick="deleteCustomer(${customer[i].id})">Delete<</button></td>
</tr>`
            }
            $("#list-customer").html(content)
        }
    })
}
showListCustomer();

function deleteCustomer(id){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/listCustomer/${id}`,
        success: showListCustomer
    });
    event.preventDefault();
}

function findCustomerByName() {
    //lay du lieu
    let name = $('#name').val();
    // goi ajax
    $.ajax({
        type: "GET",
        url:`http://localhost:8080/listCustomer/search?q=${name}`,
        success: function (customer){
            let content = "";
            for (let i = 0; i < customer.length; i++) {
                content+=`<tr>
            <th scope="row">${customer[i].id}</th>
            <td>${customer[i].name}</td>
            <td>${customer[i].age}</td>
            <td>${customer[i].phone}</td>
            <td>${customer[i].email}</td>
            <td>${customer[i].gender.name}</td>
            <td><button class="deleteCustomer" onclick="deleteCustomer(${customer[i].id})">Delete<</button></td>
</tr>`
            }
            $("#list-customer").html(content)
        }
    });
    event.preventDefault();

}

