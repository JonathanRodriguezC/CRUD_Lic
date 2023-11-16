function validateData(){
    let name=document.getElementById("name").value.trim();
    let price=document.getElementById("price").value.trim();
    let description=document.getElementById("description").value.trim();
    let image=document.getElementById("inputGroupFile01");
    if(name==""){
        document.getElementById("name-error-msg").innerHTML="You must enter the name"
        return false;
    }
    else{
        document.getElementById("name-error-msg").innerHTML="";
        
    }
    if(price==""){
        document.getElementById("price-error-msg").innerHTML="You must enter the price";
        return false
    }
    else if(parseFloat(price)<=0|| isNaN(parseFloat(price))){
        document.getElementById("price-error-msg").innerHTML="You Must enter a valid price";
        return false
    }
    else{
        document.getElementById("price-error-msg").innerHTML="";
    }
     if(description==""){
        document.getElementById("disc-error-msg").innerHTML="You must enter the descripcion";
        return false
    }
    else if(description.length>100){
        document.getElementById("disc-error-msg").innerHTML="descripcion max legth is 100 caracters";
        return false

    }
    else{
        document.getElementById("disc-error-msg").innerHTML="";
    }

    if(image.files.length==0){
        document.getElementById("image-error-msg").innerHTML="You must select a image";
        return false
    }
    else{
         document.getElementById("image-error-msg").innerHTML="";
        
    }
    let allowedFormats=/(\.jpg|\.jpep|\.png|\.web)$/i;
    
    if(!allowedFormats.exec(image.files[0].name)){
        document.getElementById("image-error-msg").innerHTML="you must select a value image";
        image.value="";
        return false;
    }
    
    else{
        document.getElementById("image-error-msg").innerHTML="";
    }
    let filesSize=image.files[0].size/1024;
    if(filesSize>700){
        document.getElementById("image-error-msg").innerHTML="you max file size is 700";
        image.value="";
        return false;
    }
    else{
        document.getElementById("image-error-msg").innerHTML="";
    }
    


        return true;
}


function AddData(){
    
    if(validateData()){
        let name=document.getElementById("name").value;
    let price=document.getElementById("price").value;
    let description=document.getElementById("description").value;
    let image=document.getElementById("inputGroupFile01");
    let reader=new FileReader();
    let id=1;
    console.log(name,price,description)
    let productList;
    if(localStorage.getItem("productList")==null){
        productList=[];

    }else
    {
        //recuperando la variable productList desde el localStorage
        productList=JSON.parse(localStorage.getItem("productList"));
        //obteniendo los ids de los productos registrados
        let ids=productList.map((product)=>product.id);
        console.log(ids);
        id=Math.max(...ids)+1;
        
    }
    reader.readAsDataURL(image.files[0]);
    reader.addEventListener("load",()=>{
        productList.push({id,name,price,description,image:reader.result})
        console.log(productList);
        localStorage.setItem("productList",JSON.stringify(productList));


    })
    document.getElementById("name").value="";
    document.getElementById("price").value="";
    document.getElementById("description").value="";
    document.getElementById("inputGroupFile01").value="";
    document.getElementById("btn-close").click();
    alert("product added sucefully");
    location.reload();
    showData();
    }
}



function showData(){
    let productList;
    if(localStorage.getItem("productList")==null){
        productList=[];}
    else{
        productList=JSON.parse(localStorage.getItem("productList"))
    }
        let html="";
        if(productList.length==0){
            html=`<div class="card-body">
            <div class="row gx-2">
            <div class="col">
            <div class="p-3">
                <img src="img/no-data-found.png" class="img-fluid d-block">
                </div></div></div></div>`;
                
        }else{
            for(const product of productList){
                html+=`<div>
                        <div class="row gx-2">
                            <div class="col">
                                <div class="p-3">
                                <div class="card d-flex card-all">
                                <div class="card-body" style=height:11 rem; width:16rem">
                                <h5 class="card-title text-center"> Item # ${product.id}</h5>
                                <img src="${product.image}" class="card-img-top">
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item"><strong>Name:</strong>${product.name}</li>
                                    <li class="list-group-item"><strong>Price:</strong>${product.price}</li>
                                    <li class="list-group-item"><strong>Decription:</strong>${product.description}</li>
                                </ul>
                                <div class="card-body text-center">
                                <button class="btn btn-success">Edit</button>
                                <button onclick='deleteProduct(${product.id})'  class="btn btn-danger">Delete</button>

                                </div>
                                </div></div></div></div></div>`;
                ;
            }
        }
        document.getElementById("crud-table").innerHTML=html;
    
}
function deleteProduct(id){
    alert(id);
    let index=0;
    let indexDelete;
    let productList=JSON.parse(localStorage.getItem("productList"))
    /*for(const element of productList){
        if(id==element.id){
            console.log("found")
            indexDelete=index;
            break;
        }
        index++;

    }*/

    productList=productList.filter(product=>product.id!=id);
    localStorage.setItem("productList",JSON.stringify(productList));
    
    location.reload();

}
showData();