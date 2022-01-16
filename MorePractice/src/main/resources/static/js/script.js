window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
});

function init() {
  getAllAlgorithms();
}

function displayError(message) {
  let body = document.body;
  body.textContent = message;
}

function getAllAlgorithms() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/algorithms/');
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let allAlgorithms = JSON.parse(xhr.responseText);
				displayAllAlgorithms(allAlgorithms);
			}
		} else if (xhr.readyState === 4 && xhr.status >= 400) {
			displayError("Algorithms not found");
		}
	}; xhr.send();
}

function displayAllAlgorithms(allAlgorithms) {
  let algorithmDiv = document.getElementById('algorithm');
  let ul = document.createElement('ul');

  allAlgorithms.forEach(function (a){
    let title = document.createElement('li');
    title.textContent = a.title + ' ▶ Difficulty: ' + a.rating;
    ul.appendChild(title);

    let description = document.createElement('li');
    description.textContent = a.description;
    ul.appendChild(description);

    let links = document.createElement('li');
    ul.appendChild(links);

    let solutionBtn = document.createElement('input'); 
    solutionBtn.type = 'submit'; 
    solutionBtn.name = 'button';
    solutionBtn.value = 'solutions';
    links.appendChild(solutionBtn);
    solutionBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = "#solutions";
      getSolutionsForAlgorithm(a.id);
    });
    let trackerBtn = document.createElement('input'); 
    trackerBtn.type = 'submit'; 
    trackerBtn.name = 'button';
    trackerBtn.value = 'tracker';
    links.appendChild(trackerBtn);
    trackerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = "#trackers";
      getTrackers(a);
    });
  }); 
  algorithmDiv.appendChild(ul);
}
// SOLUTIONS
function getSolutionsForAlgorithm(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/algorithms/{id}/solutions');
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let solutions = JSON.parse(xhr.responseText);
				displaySolutions(solutions);
			}
		} else if (xhr.readyState === 4 && xhr.status >= 400) {
			displayError("Algorithms not found");
		}
	}; xhr.send();
}

function displaySolutions(solutions){
	let dataDiv = document.getElementById('algorithmData');
  	dataDiv.textContent = '';

	let title = document.createElement('h3');
	let rating = document.createElement('h5');
    rating.textContent = ' ▶ Difficulty: ' + a.rating;
    title.textContent = a.title + rating.textContent;
    dataDiv.appendChild(title);

	let description = document.createElement('p');
	description.textContent = a.description;
	dataDiv.appendChild(description);

	let solutionDiv = document.getElementById('solutionsData');

	let ul = document.createElement('ul');
	solutionDiv.appendChild(ul);

	 for (let s of solutions) {
		let image = document.createElement('li');
		ul.appendChild(image);
		let img = document.createElement('img');
		img.src = s.imageUrl;
		image.appendChild(img);

		let description = document.createElement('li');
	    description.textContent = s.description;
	    ul.appendChild(description);

	    let language = document.createElement('li');
	    language.textContent = s.language.title;
	    ul.appendChild(language);

	    let user = document.createElement('li');
	    user.textContent = s.user.username;
	    ul.appendChild(user);
    };
}




//  TRACKERS 
function getTrackers(algorithm){
  console.log(algorithm);
  let id = algorithm.id;
  console.log(id);
  let xhr = new XMLHttpRequest();
	xhr.open('GET', `/api/find/algorithms/${id}/trackers/`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201)  {
				let trackers = JSON.parse(xhr.responseText);
        console.log(trackers);
        displayTracker(trackers, algorithm);
			} else {
				console.error('Trackers for Algorithm cannot be reached ' + xhr.status);
			}
		}
	}; xhr.send();
}

function displayTracker(trackers, algorithm){
  let trackerDiv = document.getElementById('trackers');
  let ul = document.createElement('ul');
  trackerDiv.appendChild(ul);

  trackers.forEach(function (t){
    let title = document.createElement('li');
    title.textContent = algorithm.title + 'trackers';
    ul.appendChild(title);

    let content = document.createElement('li');
    content.textContent = t.content;
    ul.appendChild(content);

    // note: format timestamp to make look more readable! 
    let createdAt = document.createElement('li');
    createdAt.textContent = t.createdAt;
    ul.appendChild(createdAt);

    let updateTrackerBtn = document.createElement('input');
    updateTrackerBtn.type = "submit";
    updateTrackerBtn.name = "Update";
    updateTrackerBtn.value = "Update";
    ul.appendChild(updateTrackerBtn);

    updateTrackerBtn.addEventListener('click', function(event) {
      event.preventDefault();

      let form = document.createElement("form");
      form.setAttribute("name", "updateTrackerForm");
      event.target.appendChild(form);

      let updateTracker = document.createElement('input');
      updateTracker.type = "text";
      updateTracker.name = "content";
      form.appendChild(updateTracker);

      let confirm = document.createElement('input');
      confirm.type = "submit";
      confirm.name = "Update";
      confirm.value = "Confirm";
      form.appendChild(confirm);

      confirm.addEventListener('click', function(event) {
        event.preventDefault();
              let newTracker = {
                id : t.id,
                content : updateTracker.value,
                algorithm : t.algorithm
              };
              updateTrackerForAlgorithm(newTracker, t.algorithm);
      });
     });
      let deleteTrackerBtn = document.createElement('input');
      deleteTrackerBtn.type = "submit";
      deleteTrackerBtn.name = "delete";
      deleteTrackerBtn.value = "Delete";
      ul.appendChild(deleteTrackerBtn);

      deleteTrackerBtn.addEventListener('click', function(event) {
        event.preventDefault();

        let message = document.createElement('h3');
        message.style.color = 'red';
        message.textContent = 'Are you sure?';
        algorithmDiv.appendChild(message);

        let confirm = document.createElement('input');
        confirm.type = "submit";
        confirm.name = "confirm";
        confirm.value = "Confirm";
        algorithmDiv.appendChild(confirm);

        confirm.addEventListener('click', function(event) {
          event.preventDefault();
          deleteTracker(t);
        });
      });
  });
}

// // CRUD METHODS for TRACKERS
function createTrackerForAlgorithm(newTracker) {
  let userId = 1;
  let id = newTracker.algorithm.id;
	let xhr = new XMLHttpRequest();
	xhr.open('POST', `api/users/${userId}/algorithms/${id}/trackers`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201)  {
        window.location.reload();
				let tracker = JSON.parse(xhr.responseText);
        console.log(tracker);
				displayTracker(tracker, newTracker.algorithm);
			} else {
				console.error('Tracker create failed' + xhr.status);
			}
		}
	}; xhr.setRequestHeader('Content-type', 'application/json'); //media types
	xhr.send(JSON.stringify(newTracker));
}

function updateTrackerForAlgorithm(newTracker, algorithm) {
  let userId = 1;
  let tId = newTracker.id;
  let id = newTracker.algorithm.id;
  console.log(id);
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', `api/users/${userId}/algorithms/${id}/trackers/${tId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201)  {
				let tracker = JSON.parse(xhr.responseText);
				displayTracker(tracker, newTracker.algorithm);
			} else {
				console.error('Tracker update failed' + xhr.status);
			}
		}
	}; xhr.setRequestHeader('Content-type', 'application/json'); //media types
	xhr.send(JSON.stringify(newTracker));
}

function deleteTracker(tracker) {
  let userId = 1;
  let tId = tracker.id;
  let id = tracker.algorithm.id;
  let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/users/${userId}/algorithms/${id}/trackers/${tId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201)  {
        getAllAlgorithms();

        window.location.reload();
			} else {
				console.error('Tracker for Algorithm cannot be reached ' + xhr.status);
        console.log(tracker);
			}
		}
	}; xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(tracker));
}

