function getFormLire(balise) {

    let parent = balise.parentNode
    let name = parent.id
    //envois vers getForm.php
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200)
      {
        console.log(this.response);
        window.location = " ../views/lire.php";
       
      }
    };
  
    xhr.open("POST","../php/getForm.php",true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("name=" + name );

}

function getFormSupprimer(balise) {

    let parent = balise.parentNode
    let name = parent.id
    //envois vers getForm.php
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
        console.log(this.response);
        window.location = " ../views/menu.php";
        
        }
    };

    xhr.open("POST","../php/deleteForm.php",true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("name=" + name );

}

// function getFormAddDroit(balise) {

//   let parent = balise.parentNode
//   let name = parent.id
//   //envois vers getForm.php
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function(){
//       if(this.readyState == 4 && this.status == 200)
//       {
//       console.log(this.response);
//       window.location = " ../views/menu.php";
      
//       }
//   };

//   xhr.open("POST","../php/giveDroit.php",true);
//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhr.send("name=" + name + "&mail" + document.getElementById("giveDroit"));

// }