let requete = new XMLHttpRequest();
let json;
requete.onload = function() { 
    requestResponse = this.response;
    console.log(requestResponse);

    //decouper la chaine en deux
    let numberSlice = requestResponse.indexOf('[');
    let reponse = requestResponse.slice(0,numberSlice) // les reponses du repondant
    let question = requestResponse.slice(numberSlice, requestResponse.lenght) // les questions

    let dataQuestion = JSON.parse(question);
    let dataReponse = JSON.parse(reponse);
    let compteur = 0;

    // console.log(dataQuestion);
    // console.log(dataReponse);

    dataQuestion.forEach(element => {

        if( "titreForm" == element.name)
        {
            console.log("Création balise titreForm");

                let titreForm = document.createElement("h1");
                titreForm.id = element.contenu;
                titreForm.textContent = element.contenu;
                document.getElementById("formulaire").insertAdjacentElement('beforeend',titreForm);

                //pour recupere le nom du form pour l'id 
                let input = document.createElement("input");
                input.type ="hidden"
                input.setAttribute("value", element.contenu);
                input.setAttribute("name","question" + compteur);
                document.getElementById("formulaire").insertAdjacentElement('beforeend',input);
            
        }

        if( "titre" == element.name)
        {
            //ajout du titre
            console.log("Création balise titre + reponse");
            compteur++;
            element.contenu.forEach(content => {
                let titre = document.createElement("p");
                titre.setAttribute("name","question" + compteur);
                titre.setAttribute("class","question");
                titre.textContent = "Question " + compteur + " : " + content;
                document.getElementById("formulaire").insertAdjacentElement('beforeend',titre);
            });

            //ajout de la reponse
            Object.keys(dataReponse).forEach(key => { //key = la cle     dataReponse[key] = le contenu
                
                if(key == "question"+compteur)
                {
                //  console.log(key)
                //  console.log(dataReponse[key])
                    let newP = document.createElement("p");
                    newP.innerHTML = dataReponse[key];
                    document.getElementById("formulaire").insertAdjacentElement('beforeend',newP);
                }
            });

        }
    });
};
requete.open("get", "../php/lireDB.php", true); //True pour que l'exécution du script continue pendant le chargement, false pour attendre.
requete.send();
