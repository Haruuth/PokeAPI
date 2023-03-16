const busqueda$$ = document.querySelector(".busqueda");
const myList$$ = document.querySelector(".myList");
const button$$ = document.querySelector(".btn-add");


//Creamos una funcion para la tarea
const addTasks = () => {
    const lista = busqueda$$.value;    
    if(lista) {
        const newLi = document.createElement("li");
        const content = document.createTextNode(lista);
        newLi.className = "li";
        newLi.appendChild(content);
        const buttonDelete$$ = document.createElement("button");
        buttonDelete$$.className = "delete";
        buttonDelete$$.innerHTML = " ❌ POR HACER ";
        // buttonDelete$$.classList.add("delete");
        newLi.appendChild(buttonDelete$$);
        myList$$.appendChild(newLi);
        busqueda$$.value="";
        buttonDelete$$.addEventListener("click", deleteTasks);
    }
};

//añadimos evento a nuestro input

busqueda$$.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        addTasks();
    }
});

const listaDescarte = document.querySelector(".descarte");
function deleteTasks () {
    const elemento = this.parentNode;
    myList$$.removeChild(elemento);
    listaDescarte.appendChild(elemento);
    buttonDelete$$.innerHTML = " ✅ HECHO ";
};

button$$.addEventListener("click", addTasks);


