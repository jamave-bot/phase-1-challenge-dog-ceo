console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

//grab the dropdown node
const dropdown = document.getElementById('breed-dropdown');

//fetches the image api
fetch (imgUrl)
    .then(response => response.json())
    .then((obj) =>{ //which happens to be an object 
        obj.message.forEach(element => { //obj.message is an array of strings which are urls to images
            let img = document.createElement('img')
            img.src = element; //can add the image by changing its src
            document.getElementById('dog-image-container').append(img) //append to the dog image container
        });
    });

//fetch the breed api
fetch (breedUrl)
.then(response => response.json())
.then((obj) =>{
    Object.keys(obj.message).forEach(element => { //I took the keys of obj.message because obj.message was an array of objects
        let li = document.createElement('li')
        li.textContent = `${element}: ${obj.message[element].join(", ")}`; //I payed for the data I'm gonna use all the data goddamnit
        document.getElementById('dog-breeds').append(li)
        li.addEventListener('click',()=>{ //this is added here to apply to the specific li we created
            li.style.color = 'firebrick';
            // console.log('test')
        })
    });
});



//adds an event listener 'change' to the dropdown menu which
//clears the ul in the body and displays breeds based on the 
//value in the dropdown
dropdown.addEventListener('change', ()=>{
    clearUl();
    displayOnlyThis(document.getElementById('breed-dropdown').value)
})

//just a method to clear anything in the ul
const clearUl = () =>{
    document.getElementById('dog-breeds').innerHTML = ""
}


//This is redundant and could be refactored but this is the same thing as the fetch except it adds a filter for checking 
//for the first letter in the breed name
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
