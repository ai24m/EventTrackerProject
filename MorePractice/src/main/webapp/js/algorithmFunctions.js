// window.addEventListener('load', function(e) {
//   console.log('document loaded');
//   getAllAlgorithms()
//   init();
// });
//
// function init() {
//   document.algorithmForm.lookup.addEventListener('click', function(event) {
//     event.preventDefault();
//     let keyword = document.algorithmForm.keyword.value;
//     if (keyword !== null) {
//       getAlgorithmsByKeyword(keyword);
//     }
//   });
// }
//
// function getAlgorithmsByKeyword(keyword) {
//   	let xhr = new XMLHttpRequest();
//
// 	xhr.open('GET', 'api/algorithms/search/' + keyword);
//
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				// convert responseText to JSON
// 				let algorithms = JSON.parse(xhr.responseText);
//
// 				console.log(algorithms);
// 				// print out object
// 				displayAlgorithmsByKeyword(algorithms);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Algorithm by " + keyword + " not found");
// 		} else {
// 			displayError("Error retrieving algorithm: " + xhr.status);
// 		}
// 	}; xhr.send();
// }
//
// function displayError(message) {
//   let dataDiv = document.getElementById('algorithmData');
//   dataDiv.textContent = message;
// }
//
// function displayAlgorithmsByKeyword(algorithms) {
//   let dataDiv = document.getElementById('algorithmData');
//   dataDiv.textContent = '';
//
//   let ul = document.createElement('ul');
//   dataDiv.appendChild(ul);
//
//   for (let a of algorithms) {
//   let title = document.createElement('li');
//   title.textContent = a.title;
//   ul.appendChild(title);
//
//   let description = document.createElement('li');
//   description.textContent = a.description;
//   ul.appendChild(description);
//
//   let solutionBtn = document.createElement('input');
//   solutionBtn.type = "submit";
//   solutionBtn.name = "solutions";
//   solutionBtn.value = "solutions";
//   ul.appendChild(solutionBtn);
//
//   solutionBtn.addEventListener('click', function(event) {
//     event.preventDefault();
//     dataDiv.textContent = '';
//     getSolutions(a.id);
//
//     event.target.remove();
//   });
// }
//
// function getSolutions(id) {
//   	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', 'api/algorithms/' + id + '/solutions');
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				let solutions = JSON.parse(xhr.responseText);
// 				displaySolutions(solutions);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Solution" + id + " not found");
// 		}
// 	}; xhr.send();
// }
//
// function displaySolutions(solutions, algorithm) {
// 	let dataDiv = document.getElementById('algorithmData');
//   	dataDiv.textContent = '';
//
// 	let title = document.createElement('h3');
// 	let rating = document.createElement('h5');
//     rating.textContent = ' ▶ Difficulty: ' + a.rating;
//     title.textContent = a.title + rating.textContent;
//     dataDiv.appendChild(title);
//
// 	let description = document.createElement('p');
// 	description.textContent = a.description;
// 	dataDiv.appendChild(description);
//
// 	let solutionDiv = document.getElementById('solutionsData');
//
// 	let ul = document.createElement('ul');
// 	solutionDiv.appendChild(ul);
//
// 	 for (let s of solutions) {
// 		let image = document.createElement('li');
// 		ul.appendChild(image);
// 		let img = document.createElement('img');
// 		img.src = s.imageUrl;
// 		image.appendChild(img);
//
// 		let description = document.createElement('li');
// 	    description.textContent = s.description;
// 	    ul.appendChild(description);
//
// 	    let language = document.createElement('li');
// 	    language.textContent = s.language.title;
// 	    ul.appendChild(language);
//
// 	    let user = document.createElement('li');
// 	    user.textContent = s.user.username;
// 	    ul.appendChild(user);
//     };
// }}
//
// function getAllAlgorithms() {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', 'api/algorithms/');
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				let allAlgorithms = JSON.parse(xhr.responseText);
// 				displayAllAlgorithms(allAlgorithms);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Solution" + id + " not found");
// 		}
// 	}; xhr.send();
// }
//
// function displayAllAlgorithms(allAlgorithms) {
//   let dataDiv = document.getElementById('algorithmData');
//   dataDiv.textContent = '';
//
//   let h2 = document.createElement('h2');
//   dataDiv.appendChild(h2);
//
//   for (let a of allAlgorithms) {
// 	  let title = document.createElement('h3');
// 	  let rating = document.createElement('h5');
// 	  rating.textContent = ' ▶ Difficulty: ' + a.rating;
// 	  title.textContent = a.title + rating.textContent;
// 	  dataDiv.appendChild(title);
//
// 	  let description = document.createElement('p');
// 	  description.textContent = a.description;
// 	  dataDiv.appendChild(description);
//
// 	  let solutionBtn = document.createElement('input');
//       solutionBtn.type = "submit";
//       solutionBtn.name = "solutions";
//       solutionBtn.value = "solutions";
//       dataDiv.appendChild(solutionBtn);
//
//       solutionBtn.addEventListener('click', function(event) {
// 	      event.preventDefault();
// 	      dataDiv.textContent = '';
// 	      getSolutionsForAlgorithm(a.id, a);
// 	      event.target.remove();
//       }); 
//   }
// }
//
// function getSolutionsForAlgorithm(id, algorithm) {
//   	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', `api/algorithms/${id}/solutions`);
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				let solutions = JSON.parse(xhr.responseText);
// 				displaySolutions(solutions, algorithm);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Solution" + id + " not found");
// 		}
// 	}; xhr.send();
// }
