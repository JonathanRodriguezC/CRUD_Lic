function AddData(){
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
    showData();
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
                                </div></div></div></div></div></div>`;
                ;
            }
        }
        document.getElementById("crud-table").innerHTML=html;
    
}
showData();