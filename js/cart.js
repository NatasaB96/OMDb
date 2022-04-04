const odabraniELement = document.querySelector('.odabrani');

window.addEventListener('load',()=>{
    if(localStorage.getItem('korpa')){
        korpa = JSON.parse(localStorage.getItem('korpa'));
        prikazOdabranih();
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



