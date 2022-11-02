currentCase = "";
const box = document.querySelectorAll('.case');
const base = document.querySelectorAll('.base');
for (const vide of base) {
    vide.addEventListener('dragstart', dragStart);
    vide.addEventListener('dragend', dragEnd);
}

addEventCase();

function addEventCase() {
    //ajouter des evenements à chaque case 
    const box = document.querySelectorAll('.case');
    for (const vide of box) {
        vide.addEventListener('dragover', dragOver);
        vide.addEventListener('dragenter', dragEnter);
        vide.addEventListener('dragleave', dragLeave);
        vide.addEventListener('drop', dragDrop);
    }
}

function dragStart() {
    currentCase = this;
    this.className += ' tenu';
    setTimeout(() => (this.className = 'invisible'), 0);
    console.log("start")
}

function dragEnd() {
    this.className = 'base';
    console.log("End");
}

function dragOver(e) {
    e.preventDefault();
    console.log("DragOver");
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
    console.log("Enter");
}

function dragLeave() {
    this.className = 'case';
    console.log("Leave");
}

function dragDrop() {
        // console.log(this)
    if(currentCase.id == "titre")
    {
        if(this.getAttribute("data-use") == -1)
            addTitre(this);//this == au li donc je le passe à la fonction pour la modifier 
    }  
    if(currentCase.id == "court")
    {
        if(this.getAttribute("data-use") == -1)
            addCourt(this);
    }  
    if(currentCase.id == "long")
    {
        if(this.getAttribute("data-use") == -1)
            addLong(this);
    }  
    if(currentCase.id == "radio")
    {
        if(this.getAttribute("data-use") == -1)
            addRadio(this);
    }  
    if(currentCase.id == "select")
    {
        if(this.getAttribute("data-use") == -1)
            addSelect(this);
    }  
    currentCase ="";
    this.className = 'case';
    console.log("Dropped");
    addCase();
}

function addCase () {
    // crée un nouvel élément Case
    let newCase = document.createElement("li");
    newCase.className = "case";
    newCase.setAttribute("data-use","-1");
    newCase.setAttribute("data-type","");

    // ajoute le nœud texte au nouveau div créé
    valider.insertAdjacentElement('beforebegin',newCase);

    let button = document.createElement("button");
    button.id = "del";
    button.addEventListener("click", delCase);
    newCase.insertAdjacentElement('beforeend',button);

    let img = document.createElement("img");
    img.src = "/img/croix.png";
    img.width = 15
    img.height = 15
    button.insertAdjacentElement('beforeend',img);
    addEventCase();

    function delCase(){

        let parent = this.parentNode
        removeAllChildNodes(this.parentNode);
        parent.remove();
    
    }
  }

function addTitre (div) {

    div.setAttribute("data-use","1");
    div.setAttribute("data-type","titre");

    let visuel = document.createElement("p");
    visuel.textContent = "Visuel :";
    div.insertAdjacentElement('beforeend',visuel);

    let newTitre = document.createElement("label");
    newTitre.textContent = "Titre";
    newTitre.id = "questionnaire"
    div.insertAdjacentElement('beforeend',newTitre);

    //ajout ligne
    let ligne = document.createElement("hr");
    div.insertAdjacentElement('beforeend',ligne);

    let param = document.createElement("p");
    param.textContent = "Parametres :";
    div.insertAdjacentElement('beforeend',param);

    let newP = document.createElement("p");
    newP.textContent = "Saisissez le titre :";
    div.insertAdjacentElement('beforeend',newP);

    let newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "titre";
    div.insertAdjacentElement('beforeend',newInput);

    let newButton = document.createElement("button");
    newButton.id = "buttonTitre"
    newButton.textContent = "Valider Titre"
    div.insertAdjacentElement('beforeend',newButton);


    let button = document.querySelectorAll('[id=buttonTitre]');
    for ( elem of button) {
        elem.addEventListener("click", validerTitre);
    }

    function validerTitre() {
        if(newInput.value != "")
            newTitre.textContent = newInput.value;
    }
}

function addCourt (div) {

    div.setAttribute("data-use","1");
    div.setAttribute("data-type","court");

    let visuel = document.createElement("p");
    visuel.textContent = "Visuel :";
    div.insertAdjacentElement('beforeend',visuel);

    //champ du questionnaire
    let input = document.createElement("input");
    input.type = "text";
    input.id = "questionnaire";
    input.disabled = "disabled"
    div.insertAdjacentElement('beforeend',input);

    //ajout ligne
    let ligne = document.createElement("hr");
    div.insertAdjacentElement('beforeend',ligne);

    let param = document.createElement("p");
    param.textContent = "Parametres :";
    div.insertAdjacentElement('beforeend',param);
    // p 
    let newP = document.createElement("p");
    newP.textContent = "Saisissez le type de reponse souhaité :";
    div.insertAdjacentElement('beforeend',newP);

    // radio button
    //texte
    let newInputCaractere = document.createElement("input");
    newInputCaractere.type = "radio";
    newInputCaractere.id = "text";
    newInputCaractere.value = "text";
    newInputCaractere.name = "Court";
    newInputCaractere.checked = true;
    newInputCaractere.addEventListener("click", valider);
    div.insertAdjacentElement('beforeend',newInputCaractere);
    let newLabelTexte = document.createElement("label");
    newLabelTexte.for = "text"
    newLabelTexte.textContent = "Texte"
    div.insertAdjacentElement('beforeend',newLabelTexte);

    //date
    let newInputDate = document.createElement("input");
    newInputDate.type = "radio";
    newInputDate.id = "date";
    newInputDate.value = "date";
    newInputDate.name = "Court";
    newInputDate.addEventListener("click", valider);
    div.insertAdjacentElement('beforeend',newInputDate);
    let newLabelDate = document.createElement("label");
    newLabelDate.for = "date"
    newLabelDate.textContent = "Date"
    div.insertAdjacentElement('beforeend',newLabelDate);

    //nombre
    let newInputChiffre = document.createElement("input");
    newInputChiffre.type = "radio";
    newInputChiffre.id = "number";
    newInputChiffre.value = "number";
    newInputChiffre.name = "Court";
    newInputChiffre.addEventListener("click", valider);
    div.insertAdjacentElement('beforeend',newInputChiffre); 
    let newLabelNombre = document.createElement("label");
    newLabelNombre.for = "number"
    newLabelNombre.textContent = "Nombre"
    div.insertAdjacentElement('beforeend',newLabelNombre);
    
    //obligatoire
    let newInputObligatoire = document.createElement("input");
    newInputObligatoire.type = "checkbox";
    newInputObligatoire.id = "obligatoire";
    newInputObligatoire.value = "obligatoire";
    newInputObligatoire.name = "obligatoire";
    div.insertAdjacentElement('beforeend',newInputObligatoire);
    let newLabelObligatoire = document.createElement("label");
    newLabelObligatoire.for = "obligatoire"
    newLabelObligatoire.textContent = "obligatoire"
    div.insertAdjacentElement('beforeend',newLabelObligatoire);

    function valider() {
        if (newInputCaractere.checked) {
            input.type = newInputCaractere.value;
           }
        if (newInputDate.checked) {
            input.type = newInputDate.value;
           }
        if (newInputChiffre.checked) {
            input.type = newInputChiffre.value;
           }
    }
}

function addLong (div) {
    div.setAttribute("data-use","1");
    div.setAttribute("data-type","long");

    let visuel = document.createElement("p");
    visuel.textContent = "Visuel :";
    visuel.setAttribute("for","textearea");
    div.insertAdjacentElement('beforeend',visuel);

    let textearea = document.createElement("textearea");
    textearea.id = "questionnaire";
    textearea.setAttribute("name","textearea"); 
    textearea.setAttribute("rows",5); 
    textearea.setAttribute("cols",33); 
    textearea.setAttribute("class","textearea"); 
    div.insertAdjacentElement('beforeend',textearea);    
    
    tinymce.init({
        selector: '.textearea',
        height: 120,
        menubar: false,
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
    });

    //obligatoire
    let newInputObligatoire = document.createElement("input");
    newInputObligatoire.type = "checkbox";
    newInputObligatoire.id = "obligatoire";
    newInputObligatoire.value = "obligatoire";
    newInputObligatoire.name = "obligatoire";
    div.insertAdjacentElement('beforeend',newInputObligatoire);
    let newLabelObligatoire = document.createElement("label");
    newLabelObligatoire.for = "obligatoire"
    newLabelObligatoire.textContent = "obligatoire"
    div.insertAdjacentElement('beforeend',newLabelObligatoire);
}

function addRadio (div) {
    div.setAttribute("data-use","1");
    div.setAttribute("data-type","radio");

    let visuel = document.createElement("p");
    visuel.textContent = "Visuel :";
    div.insertAdjacentElement('beforeend',visuel);

    let newRadio = document.createElement("input");
    newRadio.type = "checkbox";
    newRadio.id = "input";
    newRadio.disabled = "disabled"
    div.insertAdjacentElement('beforeend',newRadio);
    let newLabelRadio = document.createElement("label");
    newLabelRadio.setAttribute("for","input");  
    newLabelRadio.textContent = "Case à cocher"
    div.insertAdjacentElement('beforeend',newLabelRadio);

    //ajout ligne
    let ligne = document.createElement("hr");
    div.insertAdjacentElement('beforeend',ligne);

    let param = document.createElement("p");
    param.textContent = "Parametres :";
    div.insertAdjacentElement('beforeend',param);

    let newP = document.createElement("p");
    newP.textContent = "Saisissez le titre de la case à cocher:";
    div.insertAdjacentElement('beforeend',newP);

    let newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "radio";
    div.insertAdjacentElement('beforeend',newInput);

    let newButton = document.createElement("button");
    newButton.id = "buttonRadio"
    newButton.textContent = "Valider le titre"
    div.insertAdjacentElement('beforeend',newButton);

    // let ajout = document.createElement("button");
    // ajout.id = "buttonAjout"
    // ajout.textContent = "Ajouter un element"
    // ajout.addEventListener("click", ajoutRadio);
    // div.insertAdjacentElement('beforeend',ajout);

    //obligatoire
    let newInputObligatoire = document.createElement("input");
    newInputObligatoire.type = "checkbox";
    newInputObligatoire.id = "obligatoire";
    newInputObligatoire.value = "obligatoire";
    newInputObligatoire.name = "obligatoire";
    div.insertAdjacentElement('beforeend',newInputObligatoire);
    let newLabelObligatoire = document.createElement("label");
    newLabelObligatoire.for = "obligatoire"
    newLabelObligatoire.textContent = "obligatoire"
    div.insertAdjacentElement('beforeend',newLabelObligatoire);

    let button = document.querySelectorAll('[id=buttonRadio]');
    for ( elem of button) {
        elem.addEventListener("click", validerRadio);
    }

    function validerRadio() {
        if(newInput.value != "")
            newLabelRadio.textContent = newInput.value;
    }

    // function ajoutRadio(){
    //     let radio = document.createElement("label");
    //     radio.setAttribute("for","input");  
    //     radio.id = "questionnaire";
    //     radio.textContent = "Case à cocher"
    //     newLabelRadio.insertAdjacentElement('afterend',radio);

    //     let inputAdd = document.createElement("input");
    //     inputAdd.type = "text";
    //     inputAdd.name = "radio";
    //     div.insertAdjacentElement('beforeend',inputAdd);
    
    //     let buttonVal = document.createElement("button");
    //     buttonVal.id = "buttonRadio"
    //     buttonVal.textContent = "Valider le titre"
    //     buttonVal.addEventListener("click", validerRadio);
    //     div.insertAdjacentElement('beforeend',buttonVal);
    // }
}

function addSelect (div) {
    div.setAttribute("data-use","1");
    div.setAttribute("data-type","select");

    let visuel = document.createElement("p");
    visuel.textContent = "Visuel :";
    div.insertAdjacentElement('beforeend',visuel);

    //ajout select
    let newSelect = document.createElement("select");
    newSelect.type = "select";
    newSelect.id = "questionnaire";
    div.insertAdjacentElement('beforeend',newSelect);

    //ajout ligne
    let ligne = document.createElement("hr");
    div.insertAdjacentElement('beforeend',ligne);

    let param = document.createElement("p");
    param.textContent = "Parametres :";
    div.insertAdjacentElement('beforeend',param);

    let newDiv = document.createElement("div");
    div.insertAdjacentElement('beforeend',newDiv);

    let newPChoix = document.createElement("p");
    newPChoix.textContent = "Ajouter le titre des choix : ";
    newDiv.insertAdjacentElement('beforeend',newPChoix);

    //input pour les nouveaux select
    let newInputSelect = document.createElement("input");
    newInputSelect.type = "text";
    newInputSelect.name = "titre";
    newDiv.insertAdjacentElement('beforeend',newInputSelect);
    
    let newButton = document.createElement("button");
    newButton.id = "buttonNom";
    newButton.textContent = "Valider le titre ";
    newButton.addEventListener("click", validerSelect);
    newDiv.insertAdjacentElement('beforeend',newButton);

    //obligatoire
    let newInputObligatoire = document.createElement("input");
    newInputObligatoire.type = "checkbox";
    newInputObligatoire.id = "obligatoire";
    newInputObligatoire.value = "obligatoire";
    newInputObligatoire.name = "obligatoire";
    div.insertAdjacentElement('beforeend',newInputObligatoire);
    let newLabelObligatoire = document.createElement("label");
    newLabelObligatoire.for = "obligatoire"
    newLabelObligatoire.textContent = "obligatoire"
    div.insertAdjacentElement('beforeend',newLabelObligatoire);
    
    function validerSelect() {

        if(newInputSelect.value != "")
        {
            let newSelectOption = document.createElement("option");
            newSelectOption.setAttribute("valeur",newInputSelect.value);
            newSelectOption.textContent = newInputSelect.value;
            newSelect.insertAdjacentElement('beforeend',newSelectOption);
            newInputSelect.value = "";
        }
    }
    //effacer le select
    let newButtonDel = document.createElement("button");
    newButtonDel.id = "buttonNom";
    newButtonDel.textContent = "Supprimer les choix";
    newButtonDel.addEventListener("click", validerDel);
    newDiv.insertAdjacentElement('beforeend',newButtonDel);

    function validerDel() {

        removeAllChildNodes(newSelect)
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
}

function delContenuCase(el){

    let parent = el.parentNode
    removeAllChildNodes(el.parentNode);

    parent.setAttribute("data-use","-1");
    parent.setAttribute("data-type","");

    let button = document.createElement("button");
    button.id = "del";
    button.setAttribute("onclick", "delContenuCase(this)");
    parent.insertAdjacentElement('beforeend',button);

    let img = document.createElement("img");
    img.src = "/img/croix.png";
    img.width = 15
    img.height = 15
    button.insertAdjacentElement('beforeend',img);
    addEventCase();

}