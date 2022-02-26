//Capturamos elementos
const form = document.getElementById("userLoginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorList = document.querySelector("#errores");
const inputs = document.querySelector("#userLoginForm input");

email.focus();
inputs.addEventListener ("focus", (event)=>{
    event.target.style.borderColor = "grey";
})

const requiredInputs = [email, password];

form.addEventListener("submit", (event) => {
    const errores = formIsInvalid();
    if (errores.length > 0) {
        console.log("Formulario es invalido!");
        event.preventDefault();

        errorList.classList.remove("hidden");

        errorList.innerHTML = "";
        for (const error of errores) {
            errorList.innerHTML += `<li>${error}</li>`;
        }
    } else {
        errorList.classList.add("hidden");
        errorList.innerHTML = "";
    }
});

function formIsInvalid() {
    let errores = [];

    //Validación de email
    if (email.value == "") {
        email.style.borderColor = "red";
        errores.push("Para loguearte es necesario un email");
    } else {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.value.match(mailformat)) {
            email.style.borderColor = "green";
        } else {
            email.style.borderColor = "red";
            errores.push("Debes ingresar un mail válido");
        }
    } /*faltaría validación de si el mal está en la base de datos*/

    //Validación de password

    /*ver cómo hacer que cuando hacemos click en el imput password aparezca el mensaje small

  password.addEventListener ("click", function (){
    const msgContraseña = document.getElementById("msgContraseña");
    msgContraseña.classList.remove ("hidden");
  })

  VER COMO HACER LO DEL OJO DE LA PASSWORD
  */

    if (password.value.trim() == "") {
        password.style.borderColor = "red";
        errores.push("Debes ingresar una contraseña");
    } else {
        /*Faltaría un if donde reconozca si la contraseña coincide con la que está guardada en base de datos*/
        password.style.borderColor = "green";
    }

    console.log(errores);

    return errores.filter((msg) => msg != null);
}
