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
        <h5 class="card-title"><b>${data.title}</b><br>${data.subtitle}</h5>
      </div>
    </div>
  </div>
  `;
}

async function openDetail(index) {
  // alert(workouts[index].title)
  // localStorage.judul = workouts[index].title
  // localStorage.image = workouts[index].image
  // localStorage.desc = workouts[index].desc
  // localStorage.title = workouts[index].title

  // alert(localStorage.posts)
  const online = await
    checkOnlineStatus();

  //kalo online cek sek ke local data e ada ato ga
  if (online) {
    //kalo gada : ditmbhi ke local
    if (!localStorage.getItem(index)) {
      var id = index;
      var title = workouts[index].title;
      var image = workouts[index].image;
      var desc = workouts[index].desc;

      //set localstorage key index --> isi data
      var tempDataArr = [id, title, image, desc];
      localStorage.setItem("i", index);
      localStorage.setItem(index, JSON.stringify(tempDataArr));
      window.location.href = "detail.html";
    }
    //kalo ada : ambil dari local href ke detail
    else {
      localStorage.setItem("i", index);
      window.location.href = "detail.html";
    }
  }
  //kalo offline cek sek ke local data e ada ato ga
  else {
    // kalo ada : ambil dari local href ke detail
    if (localStorage.getItem(index)) {
      localStorage.setItem("i", index);
      window.location.href = "detail.html";
    }
    // kalo gada : masuk ke offline.html
    else {
      window.location.href = "offline.html";
    }
  }
}


  // window.location.href = '../detail.html'

  // myModal.show();
//}

function checkOnlineStatus() {
  return fetch("https://www.google.com/", { mode: "no-cors" })
    .then(() => true)
    .catch(() => false);
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
    // for (var i = 0; i < workouts.length; i++) {
    //   writeData("posts", workouts[i]);
    // }
    // workouts = data; //ambil dari firebase
    updateUI(workouts);
  });
// .catch(function () {
//   window.location.href = "offline.html";
// });


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


// const url = 'https://audrey-cee2a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

// async function fetchPosts() {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     console.log('From web:', data);
//     console.log('Response:', response);

//     updateUI(data);
//     await writeData('posts', data); // Store fetched data in cache

//     return data;
//   } catch (error) {
//     console.error('Network error:', error);

//     if ('indexedDB' in window) {
//       try {
//         const cachedData = await readAllData('posts');
//         if (cachedData) {
//           console.log('From cache:', cachedData);
//           updateUI(cachedData);
//         } else {
//           // Serve offline page if no cached data
//           window.location.href = "offline.html";
//         }
//       } catch (cacheError) {
//         console.error('Cache error:', cacheError);
//         // Handle cache errors (e.g., display an error message)
//       }
//     } else {
//       // Handle offline scenario without IndexedDB support
//       console.warn('Offline without cached data, displaying offline message');
//       // Implement offline UI handling (e.g., display 'Offline' message)
//     }
//   }
// }

// fetchPosts(); // Call the function to start fetching posts
