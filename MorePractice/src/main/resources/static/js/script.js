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
    solutionBtn.value = 'Solutions';
    p.appendChild(solutionBtn);
    solutionBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = "#solutions";
      getSolutionsForAlgorithm(a);
    });
    let trackerBtn = document.createElement('input'); 
    trackerBtn.type = 'submit'; 
    trackerBtn.name = 'button';
    trackerBtn.value = 'Trackers';
    p.appendChild(trackerBtn);
 
    trackerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = "#trackers";
      getTrackers(a);
        
    });
    algorithmDiv.appendChild(p);
  }); 
}
// SOLUTIONS
function getSolutionsForAlgorithm(algorithm) {
  let id = algorithm.id;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/algorithms/${id}/solutions`);
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let solutions = JSON.parse(xhr.responseText);
        console.log(solutions);
				displaySolutions(solutions, algorithm);
			}
		} else if (xhr.readyState === 4 && xhr.status >= 400) {
			displayError("Algorithms not found");
		}
	}; xhr.send();
}

function displaySolutions(solutions, algorithm){
  let solutionsDiv = document.getElementById('solutions');
  solutionsDiv.textContent = '';
  let slidesDiv = document.createElement('div');
  document.getElementById('solutions').appendChild(slidesDiv);
  for (let s of solutions) {
    if (s.algorithm.id === algorithm.id) {
      let title = document.createElement('p');
      title.style.cssText = 'font-size: 120%; margin-top: 5%; border: 3px solid #C7B6DC; padding: 2%; color: #C7B6DC';
      title.textContent = s.algorithm.title + " sample solution in " + s.language.name;
      slidesDiv.appendChild(title);

      let image = document.createElement('img');
      image.src = s.imageUrl;
      image.style.width = '100%';
      console.log(image);
      slidesDiv.appendChild(image);

      // var slideIndex = 1;
      // showSlides(slideIndex);
      
      // // Next/previous controls
      // function plusSlides(n) {
      //   showSlides(slideIndex += n);
      // }
      
      // // Thumbnail image controls
      // function currentSlide(n) {
      //   showSlides(slideIndex = n);
      // }
      
      // function showSlides(n) {
      //   var i;
      //   var slides = document.getElementsByClassName("slides");
      //   if (n > slides.length) {slideIndex = 1}
      //   if (n < 1) {slideIndex = slides.length}
      //   for (i = 0; i < slides.length; i++) {
      //     slides[i].style.display = "none";
      //   } slides[slideIndex-1].style.display = "block";
      // }
    }
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
  addTrackerBtn.style.cssText = "float: right; border: 3px #C7B6DC;";
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
    createdAt.style.cssText = 'float: right; font-size: 120%';
    stylingDiv.appendChild(createdAt);

    let content = document.createElement('li');
    content.textContent = t.content;
    content.style.cssText = 'margin: 10%; font-size: 120%';
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

  let p = document.createElement('p');
  trackerDiv.appendChild(p);

  let form = document.createElement("form");
  form.setAttribute("name", "addTrackerForm");
  p.appendChild(form);

  let addTracker = document.createElement('textarea');
  addTracker.name = "content";
  addTracker.style.cssText = "width: 60%; box-sizing: border-box; border-radius: 5px; border: 3px solid #C7B6DC; height: 150px; padding: 12px 20px;  font-size: 16px; resize: none;";
  addTracker.placeholder = "Status your progress...";
  form.appendChild(addTracker);

  let confirmDiv = document.createElement('div');
  let confirm = document.createElement('input');
  confirm.type = "submit";
  confirm.name = "add";
  confirm.value = "Confirm";
  confirmDiv.appendChild(confirm);
  form.appendChild(confirmDiv);

  confirm.addEventListener('click', function(event) {
    event.preventDefault();
        let newTracker = {
          content : addTracker.value,
          algorithm : algorithm
        };
    createTrackerForAlgorithm(newTracker, algorithm);
    algorithmDiv.textContent = '';
  });

  let back = document.createElement('input');
  back.type = "submit";
  back.name = "back";
  back.value = "Back";
  confirmDiv.appendChild(back);
  form.appendChild(confirmDiv);

  back.addEventListener('click', function(event) {
    getTrackers(algorithm);
  });
}

function displayUpdateTrackerForm(tracker, algorithm){
  let trackerDivMain = document.getElementById('trackers');

  let trackerDiv = document.createElement('div');
  trackerDiv.textContent = '';
  trackerDivMain.appendChild(trackerDiv);

  let p = document.createElement('p');
  p.textContent = 'Update Tracker Content';
  trackerDiv.appendChild(p);

  let form = document.createElement("form");
  form.setAttribute("name", "updateTrackerForm");
  p.appendChild(form);

  let updateTracker = document.createElement('textarea');
  updateTracker.name = "content";
  updateTracker.style.cssText = "width: 60%; box-sizing: border-box; border: 3px solid #C7B6DC; height: 150px; padding: 12px 20px;  font-size: 16px; resize: none;";
  updateTracker.placeholder = tracker.content;
  form.appendChild(updateTracker);

  let confirmDiv = document.createElement('div');
  let confirm = document.createElement('input');
  confirm.type = "submit";
  confirm.name = "Update";
  confirm.value = "Confirm";
  confirmDiv.appendChild(confirm);
  form.appendChild(confirmDiv);
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

  let back = document.createElement('input');
  back.type = "submit";
  back.name = "back";
  back.value = "Back";
  confirmDiv.appendChild(back);
  form.appendChild(confirmDiv);

  back.addEventListener('click', function(event) {
    getTrackers(algorithm);
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
				let tracker = JSON.parse(xhr.responseText);
        console.log(tracker);
				getTrackers(newTracker.algorithm);
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

