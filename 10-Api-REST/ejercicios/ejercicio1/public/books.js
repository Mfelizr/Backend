const showBooks = document.querySelector(".container")
fetch('https://gutendex.com/books').then((res) => res.json()).then((data) => {
    console.log(data.results)
    data.results.forEach(({title, authors, formats}) => {
        showBooks.innerHTML += 
          `<div class="bookCard">        
            <img id="image" src="${formats["image/jpeg"]}" alt="Book">
            <div class="details">
                <h4 id="title">${title}</h4>
                <p id="author">${authors[0].name}</p>
            </div>
        </div>`  
    });
})

