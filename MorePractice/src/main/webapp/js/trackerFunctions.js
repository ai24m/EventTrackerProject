// window.addEventListener('load', function(e) {
//   console.log('document loaded');
//   init();
// });
//
// function init() {
//   document.lookup.addEventListener('click', function(event) {
//     event.preventDefault();
//     getTrackers();
//   });
// }
//
// function getTrackers() {
//   	let xhr = new XMLHttpRequest();
//
// 	xhr.open('GET', 'users/' + userId + '/trackers');
//
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				// convert responseText to JSON
// 				let trackers = JSON.parse(xhr.responseText);
//
// 				// print out object
// 				displayTrackers(trackers);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Trackers" + " not found");
// 		} else {
// 			displayError("Error retrieving trackers: " + xhr.status);
// 		}
// 	}; xhr.send();
// }
//
// function displayError(message) {
// 	let dataDiv = document.getElementById('algorithmData');
// 	dataDiv.textContent = message;
// }
//
// function displayTrackers() {
//   let dataDiv = document.getElementById('algorithmData');
//   dataDiv.textContent = '';
//
//   let title = document.createElement('h1');
//   title.textContent = algorithm.title;
//   dataDiv.appendChild(title);
//
//   let description = document.createElement('p');
//   description.textContent = algorithm.description;
//   dataDiv.appendChild(description);
//
//   let solutionBtn = document.createElement('input');
//   solutionBtn.type = "submit";
//   solutionBtn.name = "solutions";
//   solutionBtn.value = "solutions";
//   dataDiv.appendChild(solutionBtn);
//
// 	solutionBtn.addEventListener('click', function(event) {
//     event.preventDefault();
//
//     let solutions = getSolutions(algorithm.id);
//
//     let solutionDiv = document.getElementById('solutionsData');
//
// 	  let ul = document.createElement('ul');
// 	  solutionDiv.appendChild(ul);
//
// 	  let image = document.createElement('li');
// 	  image.textContent = solutions.imageUrl;
// 	  ul.appendChild(image);
//
// 	  let description = document.createElement('li');
// 	  description.textContent = solutions.description;
// 	  ul.appendChild(description);
//
// 	  let language = document.createElement('li');
// 	  language.textContent = solutions.language.title;
// 	  ul.appendChild(language);
//
// 	  let user = document.createElement('li');
// 	  user.textContent = solutions.user.username;
// 	  ul.appendChild(user);
//   	 });
//
// }
