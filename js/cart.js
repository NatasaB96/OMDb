const odabraniELement = document.querySelector('.odabrani');
const brisanjeKorpeElement = document.querySelector('.clearCart');


window.addEventListener('load',()=>{
    if(localStorage.getItem('korpa')){
        korpa = JSON.parse(localStorage.getItem('korpa'));
        prikazOdabranih();
    }
    if(korpa.length !==0){
        brisanjeKorpeElement.hidden = false;
    }
})

const prikazOdabranih = () =>{
    odabraniELement.innerHTML = '';
    korpa.forEach((element,idx)=>{
        odabraniELement.innerHTML += `
        <div class="col">
            <div class="card h-100">
                <img src="${element.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.Title}</h5>
                    <p class="card-text">Tip: ${element.Type} |  Godina: ${element.Year}</p>
                    <a class="btn btnChange btnChangeIdx-${idx}" onClick = "obrisi(${idx})">Delete</a>
                </div>
            </div>
        </div>
        `;
    });
}

const obrisi = (idx) =>{
    if(localStorage.getItem('korpa')){
        korpa = JSON.parse(localStorage.getItem('korpa'));
        korpa.splice(idx,1)
        localStorage.setItem('korpa', JSON.stringify(korpa));

        prikazOdabranih();
    }
}

brisanjeKorpeElement.addEventListener('click',()=>{
    let korpa = [];
    localStorage.setItem('korpa', JSON.stringify(korpa));
    odabraniELement.innerHTML = '';
    korpa.forEach((element,idx)=>{
        odabraniELement.innerHTML = `
        <div class="col">
            <div class="card h-100">
                <img src="${element.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.Title}</h5>
                    <p class="card-text">Tip: ${element.Type} |  Godina: ${element.Year}</p>
                    <a class="btn btnChange btnChangeIdx-${idx}" onClick = "obrisi(${idx})">Delete</a>
                </div>
            </div>
        </div>
        `;
    });

    if(localStorage.getItem('korpa')){
        korpa = JSON.parse(localStorage.getItem('korpa'));
        console.log(korpa.length)
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

    brisanjeKorpeElement.hidden = true;
})

