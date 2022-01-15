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
  let body = document.body;
  body.textContent = message;
}

// function displaySuccess() {
//   let trackerDiv = document.getElementById('trackerData');
//   trackerDiv.textContent = '';
//   let body = document.body('body');
//   body.textContent = 'Delete successful';
// }

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
  // let algorithmDiv = document.getElementsByClassName('algorithmData');
  
  // algorithmDiv.textContent = '';
  
  // let ul = document.createElement('ul');
  // document.body.appendChild(ul); 

  for (let a of allAlgorithms) {  
    let algorithmDiv = document.createElement('div');
    algorithmDiv.name = 'algorithmDiv';
    algorithmDiv.textContent = '';
    document.body.appendChild(algorithmDiv);

    let title = document.createElement('h3');
    title.id = "title"; 
	  // let title = document.getElementById('title'); 
    // let title = document.createElement('li'); 
	  title.textContent = a.title + ' ▶ Difficulty: ' + a.rating; 
    algorithmDiv.appendChild(title);

    
	  
	  // let description = document.getElementById('description'); 
    let description = document.createElement('p');
    description.id = 'description';
	  description.textContent = a.description; 
    algorithmDiv.appendChild(description);
	  
	  
  
    let addTrackerBtn = document.createElement('input'); 
    addTrackerBtn.type = "submit";
    addTrackerBtn.name = "add"; 
    addTrackerBtn.value = "Add Tracker";
    algorithmDiv.appendChild(addTrackerBtn);  
    addTrackerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.target.textContent = '';
      let form = document.createElement("form");
      form.setAttribute("name", "addTrackerForm");
      event.target.parentElement.appendChild(form); 
  
      let addTracker = document.createElement('input'); 
      addTracker.type = "text";
      addTracker.name = "content"; 
      addTracker.placeholder = "Progress notes";
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
              algorithm : a
            };
          createTrackerForAlgorithm(newTracker);
          algorithmDiv.textContent = '';

      });











    });

    let solutionBtn = document.createElement('input'); 
    solutionBtn.type = "submit";
    solutionBtn.name = "solutions"; 
    solutionBtn.value = "View Solutions";
    algorithmDiv.appendChild(solutionBtn); 
    solutionBtn.addEventListener('click', function(event) {
      event.preventDefault();
      // dataDiv.textContent = '';
      getSolutionsForAlgorithm(a.id, a);
      document.body.algorithmDiv.remove();
    }); 

    let trackerBtn = document.createElement('input'); 
    trackerBtn.type = "submit";
    trackerBtn.name = "trackers"; 
    trackerBtn.value = "View Trackers";
    algorithmDiv.appendChild(trackerBtn); 
    trackerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      getTrackers(a);
      event.target.parentElement.textContent = ' ';
      // createTrackerForAlgorithm(newTracker, a.id);
    });
  }
}

function displayTracker(tracker, algorithm){
    // window.location.href = 'viewtracker.html';
    let data = document.getElementsByClassName('data');
    data.textContent = '';

    let algorithmDiv = document.createElement('div');
    algorithmDiv.name = 'algorithmData';
    data[0].appendChild(algorithmDiv);

    let title = document.createElement('h3');
    title.id = "title"; 
	  // let title = document.getElementById('title'); 
	  title.textContent = algorithm.title + ' ▶ Difficulty: ' + algorithm.rating; 
    algorithmDiv.appendChild(title);
	  
	  // let description = document.getElementById('description'); 
    let description = document.createElement('p');
    description.id = 'description';
	  description.textContent = algorithm.description; 
    algorithmDiv.appendChild(description);

    // let trackerDiv = document.getElementById('trackerData'); 
    // trackerDiv.textContent = '';

    let count = Object.getOwnPropertyNames(tracker).length;
    if (count > 1) {
      for (let t of tracker) {
        console.log(t.algorithm.id);
        if (t.algorithm.id === algorithm.id) {
          console.log(t);
           
          let list = document.createElement('ul');
          algorithmDiv.appendChild(list);

          let content = document.createElement('li'); 
          content.textContent = t.content;
          list.appendChild(content);

          let timeStamp = document.createElement('li'); 
          timeStamp.textContent = t.createdAt + " " + t.updatedAt;
          list.appendChild(timeStamp);

          // let content = document.createElement('h1'); 
          // let content = document.createElement('li')[0];
          // content.textContent = t.content; 
          // list.appendChild(content);
          
          // let timeStamp = document.createElement('p');
          // timeStamp.textContent = t.createdAt + " " + t.updatedAt;
          // trackerDiv.appendChild(timeStamp);  
          
          // algorithm = document.createElement('p');
          // algorithm.textContent = algorithm.title; 
          // trackerDiv.appendChild(algorithm); 

          let updateTrackerBtn = document.createElement('input'); 
          updateTrackerBtn.type = "submit";
          updateTrackerBtn.name = "Update"; 
          updateTrackerBtn.value = "Update";
          algorithmDiv.appendChild(updateTrackerBtn); 

          updateTrackerBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            let form = document.createElement("form");
            form.setAttribute("name", "updateTrackerForm");
            event.target.parentElement.appendChild(form); 
            // MAYBE ADD BUTTON TO LIST SINCE ITS POPPING UP ON THE BOTTOM 
        
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

          let deleteTrackerBtn = document.createElement('input'); 
          deleteTrackerBtn.type = "submit";
          deleteTrackerBtn.name = "delete"; 
          deleteTrackerBtn.value = "Delete";
          algorithmDiv.appendChild(deleteTrackerBtn); 

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
            // event.target.textContent = '';
            // event.target.parentElement.textContent = '';
          });
        }
      };
      // let addTrackerBtn = document.createElement('input'); 
      // addTrackerBtn.type = "submit";
      // addTrackerBtn.name = "add"; 
      // addTrackerBtn.value = "Add";
      // algorithmDiv.appendChild(addTrackerBtn);  

      // addTrackerBtn.addEventListener('click', function(event) {
      //   event.preventDefault();
            
      //   let form = document.createElement("form");
      //   form.setAttribute("name", "addTrackerForm");
      //   event.target.appendChild(form); 
    
      //   let addTracker = document.createElement('input'); 
      //   addTracker.type = "text";
      //   addTracker.name = "content"; 
      //   form.appendChild(addTracker);
      
      //   let confirm = document.createElement('input'); 
      //   confirm.type = "submit";
      //   confirm.name = "Update"; 
      //   confirm.value = "Confirm";
      //   form.appendChild(confirm); 

      //   confirm.addEventListener('click', function(event) {
      //     event.preventDefault();
      //         let newTracker = {
      //           content : addTracker.value,
      //           algorithm : t.algorithm 
      //         };
      //       createTrackerForAlgorithm(newTracker);
      //   });
      // });
    } else {
      let trackerDiv = document.createElement('div'); 
      trackerDiv.id = 'tDiv';
      data[0].appendChild(trackerDiv); 

      if (tracker.algorithm.id === algorithm.id) {
        let content = document.createElement('h1'); 
        content.textContent = tracker.content; 
        trackerDiv.appendChild(content);
        
        let timeStamp = document.createElement('p');
        timeStamp.textContent = tracker.createdAt + " " + tracker.updatedAt;
        trackerDiv.appendChild(timeStamp);  
        
        algorithm = document.createElement('p');
        algorithm.textContent = algorithm.title; 
        trackerDiv.appendChild(algorithm); 

        let updateTrackerBtn = document.createElement('input'); 
        updateTrackerBtn.type = "submit";
        updateTrackerBtn.name = "Update"; 
        updateTrackerBtn.value = "Update";
        trackerDiv.appendChild(updateTrackerBtn); 

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
              id : tracker.id,
              content : updateTracker.value,
              algorithm : tracker.algorithm 
            }; 
            updateTrackerForAlgorithm(newTracker, tracker.algorithm);
          });
          // event.target.textContent = '';
          // event.target.parentElement.textContent = '';
        });

        let deleteTrackerBtn = document.createElement('input'); 
        deleteTrackerBtn.type = "submit";
        deleteTrackerBtn.name = "delete"; 
        deleteTrackerBtn.value = "Delete";
        trackerDiv.appendChild(deleteTrackerBtn); 

        deleteTrackerBtn.addEventListener('click', function(event) {
          event.preventDefault();

          let message = document.createElement('h3'); 
          message.style.color = 'red'; 
          message.textContent = 'Are you sure?'; 
          tDiv.appendChild(message);

          let confirm = document.createElement('input'); 
          confirm.type = "submit";
          confirm.name = "confirm"; 
          confirm.value = "Confirm";
          tDiv.appendChild(confirm); 

          confirm.addEventListener('click', function(event) {
            event.preventDefault();
            deleteTracker(tracker);
          });
          // event.target.textContent = '';
          // event.target.parentElement.textContent = '';
        });
    }
  }
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

function getTrackers(algorithm){
  let xhr = new XMLHttpRequest();
	xhr.open('GET', `/api/find/trackers/`);
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
