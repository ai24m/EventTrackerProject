window.addEventListener('load', function(e) {
  console.log('document loaded');
  init();
});

function init() {
  document.filmForm.lookup.addEventListener('click', function(event) {
    event.preventDefault();
    var filmId = document.filmForm.filmId.value;
    if (!isNaN(filmId) && filmId > 0) {
      getFilm(filmId);
    }
  })
}

function getFilm(filmId) {
  // TODO:
  // * Use XMLHttpRequest to perform a GET request to "api/films/"
  //   with the filmId appended.
  // * On success, if a response was received parse the film data
  //   and pass the film object to displayFilm().
  // * On failure, or if no response text was received, put "Film not found" 
  //   in the filmData div.
  
  	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/films/' + filmId);
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// convert responseText to JSON
				let film = JSON.parse(xhr.responseText);
		
				// print out JSON data
				console.log(film);
	
				// print out object
				displayFilm(film);
			} 
		} else if (xhr.readyState === 4 && xhr.status >= 400) {
			displayError("Film" + filmId + " not found"); 
		} else {
			displayError("Error retrieving film: " + xhr.status);
		}
	}; xhr.send();
}

function displayError(message) {
	let dataDiv = document.getElementById('filmData');
	dataDiv.textContent = message; 
}

function displayFilm(film) {
  var dataDiv = document.getElementById('filmData');
  dataDiv.textContent = '';
  // TODO:
  // * Create and append elements to the data div to display:
  // * Film title (h1) and description (blockquote).
  // * Rating, release year, and length as an unordered list.
  
  let title = document.createElement('h1'); 
  title.textContent = film.title; 
  dataDiv.appendChild(title);
  
  let description = document.createElement('p');
  description.textContent = film.description;
  dataDiv.appendChild(description); 
  
  let list = document.createElement('ul');
  dataDiv.appendChild(list);
  
  let rating = document.createElement('li'); 
  rating.textContent = film.rating; 
  dataDiv.appendChild(rating); 

  
  let releaseYear = document.createElement('li');
  releaseYear.textContent = film.releaseYear; 
  dataDiv.appendChild(releaseYear); 
  
  let length = document.createElement('li');
  length.textContent = film.length; 
  dataDiv.appendChild(length);  
  
  
  
}