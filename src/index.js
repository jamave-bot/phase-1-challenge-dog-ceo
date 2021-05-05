console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

const dropdown = document.getElementById('breed-dropdown');

fetch (imgUrl)
    .then(response => response.json())
    .then((obj) =>{
        obj.message.forEach(element => {
            let img = document.createElement('img')
            img.src = element;
            document.getElementById('dog-image-container').append(img)
        });
    });


fetch (breedUrl)
.then(response => response.json())
.then((obj) =>{
    Object.keys(obj.message).forEach(element => {
        let li = document.createElement('li')
        li.textContent = `${element}: ${obj.message[element].join(", ")}`;
        document.getElementById('dog-breeds').append(li)
        li.addEventListener('click',()=>{
            li.style.color = 'firebrick';
            // console.log('test')
        })
    });
});


// console.log(typeof (document.getElementById('breed-dropdown')).value)

dropdown.addEventListener('change', ()=>{
    clearUl();
    displayOnlyThis(document.getElementById('breed-dropdown').value)
})

const clearUl = () =>{
    document.getElementById('dog-breeds').innerHTML = ""
}

const displayOnlyThis= (letter) =>{
    fetch (breedUrl)
        .then(response => response.json())
        .then((obj) =>{
            let correctLetterArr = Object.keys(obj.message).filter(element => element[0] === letter)
            correctLetterArr.forEach(element => {
                let li = document.createElement('li')
                li.textContent = `${element}: ${obj.message[element].join(", ")}`;
                document.getElementById('dog-breeds').append(li)
                li.addEventListener('click',()=>{
                    li.style.color = 'firebrick';
                })
            });
        });
}
