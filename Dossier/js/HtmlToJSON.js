function converter(data) {
    // console.log(data)
    let dataArray = [];

    //save de la date
    let date = {name : "date" , contenu : document.getElementById("dateLimite").value};
    dataArray.push(date)

    //save titre
    let titre = {name : "titreForm" , contenu : document.getElementById("titreForm").value};
    dataArray.push(titre)

    //save des cases
    data.forEach(elt => {
        // console.log(elt)
        if( "titre" == elt.getAttribute("data-type"))
        {
            console.log("Création objet titre");
            let array = [];
            for (let balise of elt.children)
            {
                if(balise.id == "questionnaire")
                {
                    array.push(balise.textContent)
                }

            }

            let objectCase = {name : "titre" , contenu : array};
            // console.log(objectCase)
            dataArray.push(objectCase);
        }

        if( "court" == elt.getAttribute("data-type"))
        {
            console.log("Création objet court");

            let array = [];
            for (let balise of elt.children)
            {
                if(balise.id == "questionnaire")
                {
                    array.push(balise.type)
                }

                if(balise.id == "obligatoire")
                {
                    if(balise.checked == true)
                        array.push(true);
                    else
                        array.push(false);
                }
            }

            let objectCase = {name : "court" , contenu : array};
            // console.log(objectCase)
            dataArray.push(objectCase);
        }

        if( "long" == elt.getAttribute("data-type"))
        {
            console.log("Création objet long");

            let array = [];

            for (let balise of elt.children)
            {
                if(balise.id == "obligatoire")
                {
                    if(balise.checked == true)
                        array.push(true);
                    else
                        array.push(false);
                }
            }

            let objectCase = {name : "long" , contenu : array};
            // console.log(objectCase)
            dataArray.push(objectCase);
        }

        if( "radio" == elt.getAttribute("data-type"))
        {
            console.log("Création objet radio");
            let array = [];
            for (let balise of elt.children)
            {
                if(balise.getAttribute("for") == "input")
                {
                    array.push(balise.textContent)
                }

                if(balise.id == "obligatoire")
                {
                    if(balise.checked == true)
                        array.push(true);
                    else
                        array.push(false);
                }
            }

            let objectCase = {name : "radio" , contenu : array};
            // console.log(objectCase)
            dataArray.push(objectCase);
        }

        if( "select" == elt.getAttribute("data-type"))
        {
            console.log("Création objet select");
            let array = [];
            for (let balise of elt.children)
            {
                if(balise.id == "questionnaire")
                {
                    for (let enfant of balise.children)
                    {
                        array.push(enfant.value)
                    }
                }

                if(balise.id == "obligatoire")
                {
                    if(balise.checked == true)
                        array.push(true);
                    else
                        array.push(false);
                }
            }

            let objectCase = {name : "select" , contenu : array};
            // console.log(objectCase)
            dataArray.push(objectCase);
        }
    })

    return dataArray;
 
}

function validerForm()
{
    // recuperer le json
    let json = JSON.stringify(converter(document.querySelectorAll('.case')));
    console.log(json);

    //envois vers addJSONdb.php
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            console.log("ajout JSON terminé");
            console.log(this.response);
            alert(this.response)
            window.location = "../views/menu.php";
        }
    };

    xhr.open("POST","../php/addJSONdb.php",true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("json=" + json + "&nom=" + document.getElementById("titreForm").value +"&mdp="+ document.getElementById("mdp").value);

    
}
