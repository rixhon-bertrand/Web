function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
  console.log(error);
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

function onSignIn(googleUser) {

  var profile = googleUser.getBasicProfile(); //mes datas

  let id = profile.getId();
  let name = profile.getName();
  let email= profile.getEmail();

  //envois vers login.php
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200)
    {
      console.log(this.response);
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut();
      window.location = "../views/menu.php";
    }
  };

  xhr.open("POST","./php/login.php",true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("id=" + id + "&name=" + name +"&email="+ email);

  $("#id").text(profile.getId()); 
  $("#name").text(profile.getName());
  $("#email").text(profile.getEmail());
}

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//       alert("You have been signed out successfully");
//   });
// }