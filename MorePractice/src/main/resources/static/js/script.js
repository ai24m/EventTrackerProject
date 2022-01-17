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
// ALGORITHMS
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

  allAlgorithms.forEach(function (a){
    let p = document.createElement('p'); 
    let ul = document.createElement('ul');

    let title = document.createElement('li');
    title.textContent = a.title + ' ▶ Difficulty: ' + a.rating;
    ul.appendChild(title);

    let description = document.createElement('li');
    description.textContent = a.description;
    ul.appendChild(description);
    p.appendChild(ul);

    // codeformat.textContent = a.title + ' ▶ Difficulty: ' + a.rating;
    let codeFormat = document.createElement('pre');
    // codeFormat.textContent = "array = [5, -4, 8, 11, -1]\ntargetSum = 10\nSample Output = [-1, 11]";
    codeFormat.textContent = a.sample;
    p.appendChild(codeFormat);
    
    // let links = document.createElement('li');
    // ul.appendChild(links);

    let solutionBtn = document.createElement('input'); 
    solutionBtn.type = 'submit'; 
    solutionBtn.name = 'button';
    solutionBtn.value = 'solutions';
    p.appendChild(solutionBtn);
    solutionBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = "#solutions";
      getSolutionsForAlgorithm(a.id);
    });
    let trackerBtn = document.createElement('input'); 
    trackerBtn.type = 'submit'; 
    trackerBtn.name = 'button';
    trackerBtn.value = 'tracker';
    p.appendChild(trackerBtn);
    trackerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = "#trackers";
      getTrackers(a);
    });
    // p.appendChild(codeFormat);

    algorithmDiv.appendChild(p);
    // algorithmDiv.appendChild(codeFormat);

  }); 
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
function displayTracker(trackers, algorithm){
  let trackerDivMain = document.getElementById('trackers');
  trackerDivMain.textContent = '';

  let trackerAlgorithmDiv = document.createElement('div');
  trackerAlgorithmDiv.textContent = '';
  trackerAlgorithmDiv.style.cssText = "padding:0 5% 3% 3%; background-color: #C7B6DC;  -webkit-border-radius: 5px;border-radius: 5px; overflow: hidden";
  trackerDivMain.appendChild(trackerAlgorithmDiv);
  
  let title = document.createElement('h3');
  title.textContent = algorithm.title + ' ▶ Difficulty: ' + algorithm.rating;
  trackerAlgorithmDiv.appendChild(title);

  let description = document.createElement('h4');
  description.textContent = algorithm.description;
  trackerAlgorithmDiv.appendChild(description);

  let codeFormat = document.createElement('pre');
  codeFormat.textContent = algorithm.sample;
  trackerAlgorithmDiv.appendChild(codeFormat);

  let addTrackerBtn = document.createElement('input');
  addTrackerBtn.type = "submit";
  addTrackerBtn.id = "add";
  addTrackerBtn.value = "Add Tracker";
  addTrackerBtn.style.cssText = "float: right; border: 3px #C7B6DC";
  trackerAlgorithmDiv.appendChild(addTrackerBtn);

  addTrackerBtn.addEventListener('click', function(event) {
    event.preventDefault();
    displayAddTrackerForm(algorithm);
    trackerDiv.textContent = '';
  });
  let trackerDiv = document.createElement('div');
  trackerDiv.textContent = '';
  trackerDiv.style.cssText = 'margin-top: 5%; padding:0 5% 3% 3%; background-color: white; border-radius: 5px;';
  trackerDivMain.appendChild(trackerDiv);

  let ul = document.createElement('ul');
  ul.style.cssText = 'list-style-type: none;';
  trackerDiv.appendChild(ul);

  trackers.forEach(function (t){
    let stylingDiv = document.createElement('div');
    stylingDiv.style.cssText = "border: 3px solid #C7B6DC; margin: 5%; padding:0 5% 3% 3%; background-color: white; border-radius: 5px; overflow: hidden";
    ul.appendChild(stylingDiv);

    // note: format timestamp to make look more readable! 
    let createdAt = document.createElement('li');
    createdAt.textContent = 'Posted: ' + t.createdAt;
    createdAt.style.cssText = 'float: right';
    stylingDiv.appendChild(createdAt);

    let content = document.createElement('li');
    content.textContent = t.content;
    content.style.cssText = 'margin: 10%';
    stylingDiv.appendChild(content);
    
    let updateTrackerBtn = document.createElement('input');
    updateTrackerBtn.type = "submit";
    updateTrackerBtn.id = "update";
    updateTrackerBtn.value = "Update";
    updateTrackerBtn.style.cssText = "border: 3px solid #C7B6DC";
    stylingDiv.appendChild(updateTrackerBtn);

    updateTrackerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      displayUpdateTrackerForm(t, algorithm);
      trackerDiv.textContent = '';
     });

    let deleteTrackerBtn = document.createElement('input');
    deleteTrackerBtn.type = "submit";
    deleteTrackerBtn.name = "delete";
    deleteTrackerBtn.value = "Delete";
    deleteTrackerBtn.style.cssText = "border: 3px solid #C7B6DC";
    stylingDiv.appendChild(deleteTrackerBtn);

    deleteTrackerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      displayDeleteTrackerForm(t, algorithm); 
      trackerDiv.textContent = '';
    });
  });
}

function displayAddTrackerForm(algorithm){
  let trackerDivMain = document.getElementById('trackers');

  let trackerDiv = document.createElement('div');
  trackerDiv.textContent = '';
  trackerDivMain.appendChild(trackerDiv);

  let title = document.createElement('h3');
  title.textContent = 'For Algorithm: ' + algorithm.title;
  trackerDiv.appendChild(title);

  let p = document.createElement('p');
  trackerDiv.appendChild(p);

  let form = document.createElement("form");
  form.setAttribute("name", "addTrackerForm");
  p.appendChild(form);

  let addTracker = document.createElement('input');
  addTracker.type = "text";
  addTracker.name = "content";
  addTracker.placeholder = "Status your progress...";
  form.appendChild(addTracker);

  let confirm = document.createElement('input');
  confirm.type = "submit";
  confirm.name = "add";
  confirm.value = "Confirm";
  form.appendChild(confirm);

  confirm.addEventListener('click', function(event) {
    event.preventDefault();
        let newTracker = {
          content : addTracker.value,
          algorithm : algorithm
        };
    createTrackerForAlgorithm(newTracker, algorithm);
    algorithmDiv.textContent = '';
  });
}

function displayUpdateTrackerForm(tracker, algorithm){
  let trackerDivMain = document.getElementById('trackers');

  let trackerDiv = document.createElement('div');
  trackerDiv.textContent = '';
  trackerDivMain.appendChild(trackerDiv);

  let title = document.createElement('h3');
  title.textContent = 'For Algorithm: ' + algorithm.title;
  trackerDiv.appendChild(title);

  let p = document.createElement('p');
  p.textContent = 'Update Tracker Content';
  trackerDiv.appendChild(p);

  let form = document.createElement("form");
  form.setAttribute("name", "updateTrackerForm");
  p.appendChild(form);

  let updateTracker = document.createElement('input');
  updateTracker.type = "textarea";
  updateTracker.name = "content";
  // updateTracker.style.cssText = 'height: 100px; width: 300px';
  updateTracker.placeholder = tracker.content;
  form.appendChild(updateTracker);

  let confirm = document.createElement('input');
  confirm.type = "submit";
  confirm.name = "Update";
  confirm.value = "Confirm";
  form.appendChild(confirm);
  confirm.addEventListener('click', function(event) {
    event.preventDefault();
      let newTracker = {
        id : tracker.id,
        content : updateTracker.value,
        algorithm : tracker.algorithm
      };
    updateTrackerForAlgorithm(newTracker, algorithm);
    trackerDiv.textContent = '';
  });
  // let c = 0;
  // let button = document.createElement('input');
  // button.addEventListener('click', track);

  // let count = document.createElement('p');
  // count.id = 'count';
  
  // function track() {
  //   c++;
  //   count.innerHTML = c; 
  // }
}

function displayDeleteTrackerForm(tracker, algorithm){
  let trackerDivMain = document.getElementById('trackers');

  let trackerDiv = document.createElement('div');
  trackerDiv.textContent = '';
  trackerDivMain.appendChild(trackerDiv);

  let title = document.createElement('h3');
  title.textContent = 'For Algorithm: ' + algorithm.title;
  trackerDiv.appendChild(title);

  let p = document.createElement('p');
  trackerDiv.appendChild(p);

  let message = document.createElement('h3');
  message.style.color = 'red';
  message.textContent = 'Are you sure?';
  p.appendChild(message);

  let confirm = document.createElement('input');
  confirm.type = "submit";
  confirm.name = "confirm";
  confirm.value = "Confirm";
  p.appendChild(confirm);

  confirm.addEventListener('click', function(event) {
    event.preventDefault();
    deleteTracker(tracker, algorithm);
    trackerDiv.textContent = '';
  });
}

// // CRUD METHODS for TRACKERS
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

function createTrackerForAlgorithm(newTracker, algorithm) {
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
				getTrackers(algorithm);
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
				getTrackers(algorithm);
			} else {
				console.error('Tracker update failed' + xhr.status);
			}
		}
	}; xhr.setRequestHeader('Content-type', 'application/json'); //media types
	xhr.send(JSON.stringify(newTracker));
}

function deleteTracker(tracker, algorithm) {
  let userId = 1;
  let tId = tracker.id;
  let id = tracker.algorithm.id;
  console.log(tracker);
  console.log(algorithm);
  let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/users/${userId}/algorithms/${id}/trackers/${tId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204)  {
        getTrackers(algorithm);
			} else {
				console.error('Tracker for Algorithm cannot be reached ' + xhr.status);
        console.log(tracker);
			}
		}
	}; xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(tracker));
}

