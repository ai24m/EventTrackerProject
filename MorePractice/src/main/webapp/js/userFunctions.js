// window.addEventListener('load', function(e) {
//   console.log('document loaded');
//   init();
// });
//
// function init() {
//   document.loginForm.login.addEventListener('click', function(event) {
//     event.preventDefault();
//     let username = event.target.parentElement.username.value;
//     let password = event.target.parentElement.password.value;
//
// 	checkUsernamePassword(username, password);
// 	event.target.parentNode.remove();
//   });
// }
//
// function checkUsernamePassword(username, password) {
// let xhr = new XMLHttpRequest();
//
// 	xhr.open('GET', 'api/login/' + username + "/" + password);
//
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				// convert responseText to JSON
// 				let user = JSON.parse(xhr.responseText);
//
// 				// print out object
// 				getUser(user.id);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Algorithm" + id + " not found");
// 		}
// 	}; xhr.send();
// }
//
// function getUser(userId) {
//   	let xhr = new XMLHttpRequest();
//
// 	xhr.open('GET', '/api/profile/' + userId);
//
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				// convert responseText to JSON
// 				let user = JSON.parse(xhr.responseText);
//
// 				// print out object
// 				displayProfile(user);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Trackers" + " not found");
// 		}
// 	}; xhr.send();
// }
//
// function displayProfile(user) {
//   let h1 = document.getElementById('profileh1');
//   h1.textContent = 'Dashboard';
//
//   getTrackers(user.id);
//   getAlgorithms(user.id);
//   getSolutions(user.id);
// }
//
// function getTrackers(userId) {
//   	let xhr = new XMLHttpRequest();
//
// 	xhr.open('GET', 'api/user/' + userId + '/trackers');
//
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				// convert responseText to JSON
// 				let trackers = JSON.parse(xhr.responseText);
//
// 				console.log(trackers);
//
// 				// print out object
// 				displayTrackers(trackers);
// 			}
// 		} else if (xhr.status >= 400) {
// 			displayError("Trackers not found");
// 		}
// 	}; xhr.send();
// }
//
// function displayTrackers(trackers) {
// 	let trackerDiv = document.getElementById('trackers');
//
// 	let ul = document.createElement('ul');
// 	trackerDiv.appendChild(ul);
//
// 	 for (let t of trackers) {
// 		let algorithm = document.createElement('li');
// 		let algorithmsrc = document.createElement('a');
// 		algorithmsrc.textContent = "Algorithm";
//
// 		//console.log(trackers.algorithm);
// 		//algorithmsrc.setAttribute('href', `api/algorithms/find/${trackers.algorithm.id}`);
//
// 		//algorithm.appendChild(algorithmsrc);
// 		//ul.appendChild(algorithm);
//
// 		let content = document.createElement('li');
// 	    content.textContent = t.content;
// 	    ul.appendChild(content);
//
// 	    let created = document.createElement('li');
// 	    created.textContent = t.createdAt;
// 	    ul.appendChild(created);
//     };
// }
//
// function getAlgorithms(userId) {
//   	let xhr = new XMLHttpRequest();
//
// 	xhr.open('GET', 'api/user/' + userId + '/algorithms');
//
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				// convert responseText to JSON
// 				let algorithms = JSON.parse(xhr.responseText);
//
// 				console.log(algorithms);
//
// 				// print out object
// 				displayAlgorithms(algorithms);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Algorithms not found");
// 		}
// 	}; xhr.send();
// }
//
// function displayAlgorithms(algorithms) {
// 	let algorithmDiv = document.getElementById('algorithms');
//
// 	let ul = document.createElement('ul');
// 	algorithmDiv.appendChild(ul);
//
// 	 for (let a of algorithms) {
// 		let title = document.createElement('li');
// 	    title.textContent = a.title;
// 	    ul.appendChild(title);
//
// 	    let description = document.createElement('li');
// 	    description.textContent = a.description;
// 	    ul.appendChild(description);
//
// 	    let rating = document.createElement('li');
// 	    rating.textContent = a.rating;
// 	    ul.appendChild(rating);
//     };
// }
//
// function getSolutions(userId) {
//   	let xhr = new XMLHttpRequest();
//
// 	xhr.open('GET', 'api/user/' + userId + '/solutions');
//
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				// convert responseText to JSON
// 				let solutions = JSON.parse(xhr.responseText);
//
// 				console.log(solutions);
//
// 				// print out object
// 				displaySolutions(solutions);
// 			}
// 		} else if (xhr.readyState === 4 && xhr.status >= 400) {
// 			displayError("Algorithms not found");
// 		}
// 	}; xhr.send();
// }
//
// function displaySolutions(solutions) {
// 	let solutionDiv = document.getElementById('solutions');
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
// 	    let description = document.createElement('li');
// 	    description.textContent = s.description;
// 	    ul.appendChild(description);
//
// 	    let language = document.createElement('li');
// 	    language.textContent = s.language.name;
// 	    ul.appendChild(language);
//     };
// }
