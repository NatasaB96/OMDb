window.addEventListener('load', ()=>{
    cartChange();
    document.querySelector('.odabrani').addEventListener('click',()=>{
        cartChange();
    })
})

const cartChange = () =>{
    if(localStorage.getItem('korpa')){
        korpa = JSON.parse(localStorage.getItem('korpa'));
        if (korpa.length !== 0){
            document.querySelector('#brStavki').innerHTML = `(${korpa.length})`;
        }
        else{
            document.querySelector('#brStavki').innerHTML = ``;
            document.querySelector('.cartPage').innerHTML = `
            <div class="d-flex flex-column justify-content-center h-100 bg-dark animate__animated animate__bounce"  style="--bs-bg-opacity: .8;">
                <h2 class="text-center text-light display-2 font-weight-bold">The cart is empty!</h2>
                <a class="text-center text-light cursor-pointer" onClick = "goShopping()">Go back to shopping</a>
            </div>
            `
            brisanjeKorpeElement.hidden = true;
       }
    } 
}


const goShopping = () =>{
    window.location = "search.html";
}
