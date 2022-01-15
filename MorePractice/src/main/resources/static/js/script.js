window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
});

function init() {
	getAllAlgorithms(); 
  // document.trackerForm.addTracker.addEventListener('click', function(event) {
  //   event.preventDefault();
  //   var filmId = document.filmForm.filmId.value;
  //   if (!isNaN(filmId) && filmId > 0) {
  //     getFilm(filmId);
  //   }
  // });
}

function displayError(message) {
  let body = document.body('body');
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

// function getAlgorithmById(id) {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', `api/algorithms/find/${id}/`);
//   xhr.onreadystatechange = function(){
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         let algorithm = JSON.parse(xhr.responseText); 
//       } 
//     } else if (xhr.readyState === 4 && xhr.status >= 400) {
//       displayError("Algorithm with " + id + " not found"); 
//     } 
//   }; xhr.send();
// }

function displayAllAlgorithms(allAlgorithms) {
  let dataDiv = document.getElementById('algorithmData');
  dataDiv.textContent = '';

  for (let a of allAlgorithms) {  
	  let title = document.createElement('h3'); 
	  let rating = document.createElement('h5');
	  rating.textContent = ' ▶ Difficulty: ' + a.rating;
	  title.textContent = a.title + rating.textContent; 
	  dataDiv.appendChild(title);
	  
	  let description = document.createElement('p'); 
	  description.textContent = a.description; 
	  dataDiv.appendChild(description);
	  
	  let solutionBtn = document.createElement('input'); 
    solutionBtn.type = "submit";
    solutionBtn.name = "solutions"; 
    solutionBtn.value = "View Solutions";
    dataDiv.appendChild(solutionBtn); 
  
    solutionBtn.addEventListener('click', function(event) {
      event.preventDefault();
      // dataDiv.textContent = '';
      getSolutionsForAlgorithm(a.id, a);
      // event.target.remove();
    }); 

    let trackerBtn = document.createElement('input'); 
    trackerBtn.type = "submit";
    trackerBtn.name = "trackers"; 
    trackerBtn.value = "View Trackers";
    dataDiv.appendChild(trackerBtn); 

    trackerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      getTrackers(a);
      // createTrackerForAlgorithm(newTracker, a.id);
    });
  }
}

function displayTracker(tracker, algorithm){
    var trackerDiv = document.getElementById('trackerData');
    trackerDiv.textContent = '';
    console.log(tracker);
    console.log(algorithm);

    for (let t of tracker) {
      console.log(t.algorithm.id);
      if (t.algorithm.id === algorithm.id) {
        let tDiv = document.createElement('div'); 
        trackerDiv.appendChild(tDiv); 

        let content = document.createElement('h1'); 
        content.textContent = t.content; 
        tDiv.appendChild(content);
        
        let createdAt = document.createElement('p');
        createdAt.textContent = t.createdAt;
        tDiv.appendChild(createdAt);  

        let updatedAt = document.createElement('p');
        updatedAt.textContent = t.updatedAt;
        tDiv.appendChild(updatedAt); 
        
        algorithm = document.createElement('p');
        algorithm.textContent = algorithm.title; 
        tDiv.appendChild(algorithm); 

        let updateTrackerBtn = document.createElement('input'); 
        updateTrackerBtn.type = "submit";
        updateTrackerBtn.name = "Update"; 
        updateTrackerBtn.value = "Update";
        tDiv.appendChild(updateTrackerBtn); 

        updateTrackerBtn.addEventListener('click', function(event) {
          event.preventDefault();
          
          let form = document.createElement("form");
          form.setAttribute("name", "updateTrackerForm");
          tDiv.appendChild(form); 
      
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
            
            // document.body.trackerDiv.form.remove();

            let newTracker = {
              id : t.id,
              content : updateTracker.value,
              algorithm : t.algorithm 
            }; 
            updateTrackerForAlgorithm(newTracker, t.algorithm);
          });
          // event.target.textContent = '';
          // event.target.parentElement.textContent = '';
        });
      }
    }
}

// CRUD METHODS for TRACKERS 
function createTrackerForAlgorithm(newTracker, id) {
  let userId = 1; 
	let xhr = new XMLHttpRequest();
	xhr.open('POST', `api/users/${userId}/algorithms/${id}/trackers`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201)  {
				let tracker = JSON.parse(xhr.responseText);
        let algorithm = getAlgorithmById(id);
				displayTracker(tracker, algorithm);
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

function getTrackers(algorithm){
  let xhr = new XMLHttpRequest();
	xhr.open('GET', `/api/find/trackers/`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201)  {
				let trackers = JSON.parse(xhr.responseText);
        displayTracker(trackers, algorithm);
			} else {
				console.error('Trackers for Algorithm cannot be reached ' + xhr.status);
			}
		}
	}; xhr.send();
}