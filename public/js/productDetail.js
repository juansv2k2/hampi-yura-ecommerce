const eliminar = document.getElementById ("boton-eliminar");


eliminar.addEventListener ("click", function (e){
    e.preventDefault ()
    if (confirm("¿Estás segurx de que querés elimnar este producto?")) {
      eliminar.submit ();
    }
    
})