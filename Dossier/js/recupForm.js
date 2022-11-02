let requete = new XMLHttpRequest();
let json;
requete.onload = function() { 
    json = this.response;
    console.log(json);
        let data = JSON.parse(json);
        let compteur = 0;
        data.forEach(elt => {
    
            if( "date" == elt.name)
            {
                let dateDuJour = new Date();
                let dateLimite = new Date(elt.contenu);
                console.log("Verification balise date");
    
                if(dateDuJour > dateLimite)
                {
                    console.log("Date dépassée");
                    alert("Il n'est plus possible de completer le formulaire")
                    window.location = "../index.php";
                }else
                {
                    console.log(" Date ok")
                }
    
            }
    
            if( "titreForm" == elt.name)
            {
                console.log("Création balise titreForm");
    
                    let titreForm = document.createElement("h1");
                    titreForm.id = elt.contenu;
                    titreForm.textContent = elt.contenu;
                    document.getElementById("formulaire").insertAdjacentElement('beforeend',titreForm);
    
                    //pour recupere le nom du form pour l'id 
                    let input = document.createElement("input");
                    input.type ="hidden"
                    input.setAttribute("value", elt.contenu);
                    input.setAttribute("name","question" + compteur);
                    document.getElementById("formulaire").insertAdjacentElement('beforeend',input);
                
            }
            
            if( "titre" == elt.name)
            {
                console.log("Création balise titre");
                compteur++;
                elt.contenu.forEach(content => {
                    let titre = document.createElement("p");
                    titre.setAttribute("name","question" + compteur);
                    titre.textContent = "Question " + compteur + " : " + content;
                    document.getElementById("formulaire").insertAdjacentElement('beforeend',titre);
                });
                
            }
    
            if( "court" == elt.name)
            {
                let question = "question" + compteur;

                console.log("Création balise court");
                let input = document.createElement("input");
                input.setAttribute("name","question" + compteur);
                elt.contenu.forEach(content => {
    
                    if (typeof content == 'string') {
                        
                        input.type = content;
                    } else {
                        if(content == true)
                            input.required = "required";
                    }
                });
                document.getElementById("formulaire").insertAdjacentElement('beforeend',input);

                //gestion storage
                input.addEventListener("change", function(){
                    if (typeof(Storage) !== "undefined") {
                        localStorage.question = "init"
                        localStorage.setItem(question, input.value);
                    } else {
                        alert("Sorry, your browser does not support web storage...");
                    }
                });
                
                if (typeof(Storage) !== "undefined") {
                    if (localStorage.question) {
                        input.value = localStorage.getItem(question);
                    } else {
                        localStorage.setItem(question, "");
                    }
                } else {
                    alert("Sorry, your browser does not support web storage...");
                }
                  
            }
    
            if( "long" == elt.name)
            {
                console.log("Création balise long");
                let question = "question" + compteur;

                let textearea = document.createElement("textearea");
                textearea.id = "question" + compteur
                textearea.setAttribute("name","question" + compteur); 
                textearea.setAttribute("rows",5); 
                textearea.setAttribute("cols",33); 
               
                
                // //gestion storage
                if (typeof(Storage) !== "undefined") {
                    if (localStorage.question) {
                        let string = localStorage.getItem(question);
                        textearea.innerHTML = string
                    } else {
                        localStorage.setItem(question, "test rien");
                    }
                } else {
                    alert("Sorry, your browser does not support web storage...");
                }
                
                document.getElementById("formulaire").insertAdjacentElement('beforeend',textearea);   
                
                tinymce.init({
                    selector: "#question" + compteur,
                    width: 700,
                    height: 200,
                    menubar: false,
                    plugins: [
                        'save','advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'save' + 'undo redo | blocks | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                    
                }); 
                
                elt.contenu.forEach(content => {
                    if(content == true)
                    {
                        textearea.setAttribute("required","");
                    }
                });

                let button = document.createElement("button");
                button.type = "button";
                button.textContent = "Save"
                document.getElementById("formulaire").insertAdjacentElement('beforeend',button);
                button.setAttribute("onclick","save(" + textearea.id +")")
                
            }
    
            if( "radio" == elt.name)
            {
                console.log("Création balise radio");
                let question = "question" + compteur;

                let newRadio = document.createElement("input");
                newRadio.type = "checkbox";
                newRadio.id = "input";
                newRadio.setAttribute("name","question" + compteur);
                document.getElementById("formulaire").insertAdjacentElement('beforeend',newRadio);
                elt.contenu.forEach(content => {
                    if (typeof content == 'string') {
                        let newLabelRadio = document.createElement("label");
                        newLabelRadio.setAttribute("for","input");  
                        newLabelRadio.textContent = content;
                        newLabelRadio.setAttribute("name","question" + compteur);
                        document.getElementById("formulaire").insertAdjacentElement('beforeend',newLabelRadio);
                        newRadio.value = content;
                    } else {
                        if(content == true)
                            newRadio.required = "required";
                    }
                    
                })
                
                //gestion storage 
                newRadio.addEventListener("change",function(){
                    // console.log(newRadio.checked)
                    if (typeof(Storage) !== "undefined") {
                        localStorage.question = "init"
                        localStorage.setItem(question, newRadio.checked);
                    } else {
                        alert("Sorry, your browser does not support web storage...");
                    }
                })
                
                if (typeof(Storage) !== "undefined") {
                    if (localStorage.question) {
                        if(localStorage.getItem(question) == "true")
                        {
                            newRadio.checked = true;
                        }
                    } 
                } else {
                    alert("Sorry, your browser does not support web storage...");
                }
            }
    
            if( "select" == elt.name)
            {
                console.log("Création balise select");
                let question = "question" + compteur;
                let newSelectOption

                let select = document.createElement("select");
                select.type = "select";
                select.setAttribute("name","question" + compteur);
                document.getElementById("formulaire").insertAdjacentElement('beforeend',select);
    
                elt.contenu.forEach(content => {
    
                    if (typeof content == 'string') {
                        newSelectOption = document.createElement("option");
                        newSelectOption.setAttribute("valeur",content);
                        newSelectOption.textContent = content;
                        newSelectOption.setAttribute("name","question" + compteur);
                        select.insertAdjacentElement('beforeend',newSelectOption);
                    } else {
                        if(content == true)
                            select.required = "required";
                    }
                });
                document.getElementById("formulaire").insertAdjacentElement('beforeend',select);

                //gestion storage
                select.addEventListener("change", function(){
                    if (typeof(Storage) !== "undefined") {
                        console.log("test")
                        localStorage.question = "init"
                        localStorage.setItem(question, select.value);
                    } else {
                        alert("Sorry, your browser does not support web storage...");
                    }
                });
                
                if (typeof(Storage) !== "undefined") {
                    if (localStorage.question) {
                        select.value = localStorage.getItem(question);
                    } else {
                        localStorage.setItem(question, "");
                    }
                } else {
                    alert("Sorry, your browser does not support web storage...");
                }
            }
        })
    
        let br = document.createElement("br");
        document.getElementById("formulaire").insertAdjacentElement('beforeend',br);
        // ajout du bouton submit 
        let input_submit = document.createElement("input");
        input_submit.type = "submit"
        input_submit.value= "Envoyer le formulaire";
        document.getElementById("formulaire").insertAdjacentElement('beforeend',input_submit);

};
requete.open("get", "../php/recupJSON.php", true); //True pour que l'exécution du script continue pendant le chargement, false pour attendre.
requete.send();

function save(div){
    console.log(div.name )

    function decodeEntity(inputStr) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = inputStr;
        return textarea.value;
    }
    console.log(decodeEntity(tinymce.get(div.name).getContent()));
    //localstorage
        if (typeof(Storage) !== "undefined") {
            localStorage.question = "init"
            localStorage.setItem(div.name, tinymce.get(div.name).getContent());
        } else {
            alert("Sorry, your browser does not support web storage...");
        }

        
}
