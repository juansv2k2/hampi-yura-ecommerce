//Capturamos elementos
const form = document.querySelector("#userRegisterForm");
const fullName = document.getElementById("userName");
const birthdate = document.getElementById("birthdate");
const email = document.getElementById("email");
const password = document.getElementById("password");
const avatar = document.getElementById("avatar");
const btnSubmit = document.getElementById("btnSubmit");
const erName = document.querySelector(".erName");
const errorList = document.querySelector("#errores");
const inputs = document.querySelector("#userRegisterForm input");

fullName.focus();
inputs.addEventListener("focus", (event) => {
  event.target.style.borderColor = "gray";
});

const requiredInputs = [fullName, birthdate, email, password, avatar];

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

    //Validación de nombre
    if (fullName.value.trim() == "") {
        fullName.style.borderColor = "red";
        errores.push("Nos gustaría saber cómo te llamás");
    } else {
        if (fullName.value.trim().length < 3) {
            fullName.style.borderColor = "red";
            errores.push("Tu nombre tiene que ser más largo");
        } else {
            fullName.style.borderColor = "green";
        }
    }

    //Validación de birthdate
    if (birthdate.value == "") {
        birthdate.style.borderColor = "red";
        errores.push("Te faltó poner la fecha de tu cumple!");
    } else {
        birthdate.style.borderColor = "green";
    }

    //Validación de email
    if (email.value == "") {
        email.style.borderColor = "red";
        errores.push("Para registrarte es necesario un email");
    } else {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.value.match(mailformat)) {
            email.style.borderColor = "green";
        } else {
            email.style.borderColor = "red";
            errores.push("Debes ingresar un mail válido");
        }
    }

    //Validación de avatar REVISAR COMO DEJAR LA IMAGEN COMO OLD DATA
    if (avatar.value == "") {
        avatar.style.borderColor = "red";
        errores.push("Porfa subí una foto para completar el registro");
    } else {
        const allowedExtensions = /(.*?)\.(jpg|gif|jpeg|png)$/;

        if (avatar.value.match(allowedExtensions)) {
            avatar.style.borderColor = "green";
        } else {
            avatar.style.borderColor = "red";
            errores.push(
                "Solo aceptamos extensiones: .jpg, .jpeg, .gif y .png"
            );
        }
    }

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
        errores.push("Debes elegir una contraseña");
    } else {
        if (password.value.trim().length < 8) {
            password.style.borderColor = "red";
            errores.push("Tu contraseña debe tener 8 caracteres como mínimo.");
        } else {
            password.style.borderColor = "green";
        }
    }

    console.log(errores);

    return errores.filter((msg) => msg != null);
}
