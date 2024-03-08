var createPostArea = document.querySelector('#create-post');
var sharedMomentsArea = document.querySelector('#shared-moments');
var workouts = []; //var global
// const myModal = new bootstrap.Modal(document.getElementById('myModal'));

// Currently not in use, allows to save assets in cache on demand otherwise

function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data, index) {
  sharedMomentsArea.innerHTML += `
  <div class="card col-3 p-2 m-4" style="position: relative;" onclick="openDetail(${index})">
    <div class="card-body">
      <img src="${data.image}" class="card-img-top">
      <div class="card-img-overlay">
        <h5 class="card-title" style="position: absolute; bottom: 20px;">${data.title}</h5>
        <small class="card-title" style="position: absolute; bottom: 2px;">${data.subtitle}</small></p>
      </div>
    </div>
  </div>
  `;
}

function openDetail(index){
  // alert(workouts[index].title)
  localStorage.judul = workouts[index].title
  localStorage.image = workouts[index].image
  localStorage.desc = workouts[index].desc  
  // localStorage.title = workouts[index].title

  // alert(localStorage.posts)

  window.location.href= '../detail.html'
  
  // myModal.show();


}

function updateUI(data) {
  clearCards();
  for (var i = 0; i < data.length; i++) {
    createCard(data[i], i);
  }
}

var url = 'https://audrey-cee2a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';
var networkDataReceived = false;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    networkDataReceived = true;
    console.log('From web', data);
    for (var key in data) {
      workouts.push(data[key]);   
    }
    for (var i = 0; i < workouts.length; i++) {
      writeData("posts", workouts[i]);
    }
    // workouts = data; //ambil dari firebase
    updateUI(workouts); 
  }).catch(function(){
    window.location.href = "offline.html";
  });
  

if ('indexedDB' in window) {
  readAllData('posts')
    .then(function (data) {
      if (!networkDataReceived) {
        // console.log(data);
        console.log('From cache', data);
        updateUI(data);
      }
    });
}
