'use strict'

const searchStringElement = document.querySelector('.searchString');
const btnSearchElement = document.querySelector('.btnSearch');

const selectOptionElement = document.querySelector('#selectOption');

const prikazElement = document.querySelector('.prikaz');

const manjeElement = document.querySelector('.manje');
const viseElement = document.querySelector('.vise');
const trenutnaStranicaElement = document.querySelector('.trenutna-stranica');

const paginationElement = document.querySelector('.pagination');

const odabraniElement = document.querySelector('.odabrani');


let korpa = [];

//setovanje filmova
//kako ne bismo svaki put radili fetch, podatke koje dobijemo smestamo u listu (onda dobijamo listu objekata)
let film = [];
const setFilm = (list) =>{
    film = [...list];
}

//setovanje odabranih filmova
let odabraniFilmovi = [];
const setOdabraniFilmovi = (list) =>{
    odabraniFilmovi = [... list];
}

//setovanje stranica
let strana = 1;
const setStr = (br)=>{
    strana = br;
}

//poziva fj-u koja registruje sta je selektovano na klik
btnSearchElement.addEventListener('click',()=>{
    genre();
});

//fja koja vraca sta je selektovano i poziva fj-u za fetch
const genre = () =>{
    let collection = selectOptionElement.selectedOptions[0].value;
    if (collection === 'all'){
        allGenres(); 
    }
    else if (collection === 'movies'){
        moviesCat();
    }
    else if (collection === 'series'){
        seriesCat();
    }
}

//fetch u zavisnoti od seleckije
const allGenres = () =>{
    trenutnaStranicaElement.value = strana;
    fetch(`http://www.omdbapi.com/?apikey=e35584e0&s=${searchStringElement.value}&page=${strana}`)
    .then(res => res.json())
    .then(resJson =>{
         setFilm(resJson.Search);
         render();
         paginationElement.hidden = false;
    })
    .catch(err => console.log(err))
}

const moviesCat = () =>{
    trenutnaStranicaElement.value = strana;
    fetch(`http://www.omdbapi.com/?apikey=e35584e0&s=${searchStringElement.value}&type=movie&page=${strana}`)
    .then(res => res.json())
    .then(resJson =>{
        setFilm(resJson.Search);
        render();
        paginationElement.hidden = false;
    })
    .catch(err => console.log(err));
}

const seriesCat = () =>{
    trenutnaStranicaElement.value = strana;
    fetch(`http://www.omdbapi.com/?apikey=e35584e0&s=${searchStringElement.value}&type=series&page=${strana}`)
    .then(res => res.json())
    .then(resJson =>{
        setFilm(resJson.Search);
        render();
        paginationElement.hidden = false;
    })
    .catch(err => console.log(err));
}

//render-ovanje svih artikala
const render = () =>{
    prikazElement.innerHTML = '';
    film.forEach((element,idx)=>{
        prikazElement.innerHTML += `
        <div class="col">
            <div class="card h-100">
                <img src="${element.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.Title}</h5>
                    <p class="card-text">Tip: ${element.Type} |  Godina: ${element.Year}</p>
                    <a class="btn btnChange btnChangeIdx-${idx}" onClick = "dodaj(${idx})">Buy now</a>
                </div>
            </div>
        </div>
        `;
    });
}


//dodavanja u korpu
const dodaj = (idx) => {
    localStorage.setItem('singleProduct', idx );
    setOdabraniFilmovi([...odabraniFilmovi,film[localStorage.getItem('singleProduct', idx)]]);
    console.log(odabraniFilmovi)

    let indChangeBtn = (document.querySelector(`.btnChangeIdx-${idx}`).className.split(" ")[2].split('-')[1]); //vraca indeks 
        
    if(Number(indChangeBtn) == Number(idx)){
            document.querySelector(`.btnChangeIdx-${idx}`).innerText= 'In cart'; 
    }

    if(!localStorage.getItem('korpa')){
        localStorage.setItem('korpa', '[]');
    };

    korpa = JSON.parse(localStorage.getItem('korpa'));
    korpa.push(film[idx]);
    console.log(korpa);
    localStorage.setItem('korpa', JSON.stringify(korpa));

    if(localStorage.getItem('korpa')){
        korpa = JSON.parse(localStorage.getItem('korpa'));
        document.querySelector('#brStavki').innerHTML = `(${korpa.length})`
    }  
}


//paginacija
manjeElement.addEventListener('click',()=>{
    strana <= 1 ? setStr(1) : setStr(strana -1);
    setFilm([]);
    genre();
    render();
})

viseElement.addEventListener('click',()=>{
    setStr(strana + 1);
    setFilm([]);
    genre();
    render();
})

