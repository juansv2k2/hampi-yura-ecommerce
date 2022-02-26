//Capturamos elementos
const createForm = document.getElementById("createForm");
const productName = document.getElementById("productName");
const price = document.getElementById("price");
const description = document.getElementById("description");
const image = document.getElementById("image");
const stock = document.getElementById("stock");
const category = document.getElementById("category");
const destacado = document.getElementById("destacado");
const errorList = document.querySelector("#errores");

productName.focus();

const requiredInputs = [
    productName,
    price,
    description,
    image,
    stock,
    category,
    destacado,
];

createForm.addEventListener("submit", (event) => {
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
    if (productName.value.trim() == "") {
        productName.style.borderColor = "red";
        errores.push("Ingrese el nombre del producto");
    } else {
        if (productName.value.trim().length < 5) {
            productName.style.borderColor = "red";
            errores.push("El nombre debe tener al menos cinco letras");
        } else {
            productName.style.borderColor = "green";
        }
    }

    //Validación de precio
    if (price.value.trim() == "") {
        price.style.borderColor = "red";
        errores.push("Ingrese el precio del producto");
    } else {
        if (!price.value > 0) {
            price.style.borderColor = "red";
            errores.push("Ingrese un precio válido");
        } else {
            price.style.borderColor = "green";
        }
    }

    //Validación de descripción
    if (description.value.trim() == "") {
        description.style.borderColor = "red";
        errores.push("Ingrese una descripción del producto");
    } else {
        if (description.value.trim().length < 20) {
            description.style.borderColor = "red";
            errores.push("La descripción debe tener al menos veinte caracteres");
        } else {
            description.style.borderColor = "green";
        }
    }

    //Validación de image REVISAR COMO DEJAR LA IMAGEN COMO OLD DATA
    if (image.value == "") {
        image.style.borderColor = "red";
        errores.push("Porfa subí una foto para crear el producto");
    } else {
        const allowedExtensions = /(.*?)\.(jpg|gif|jpeg|png)$/;

        if (image.value.match(allowedExtensions)) {
            image.style.borderColor = "green";
        } else {
            image.style.borderColor = "red";
            errores.push(
                "Solo aceptamos extensiones: .jpg, .jpeg, .gif y .png"
            );
        }
    }

    if (!stock.value) {
        stock.style.borderColor = "red";
        errores.push("Debes indicar el stock");
    } else {
        stock.style.borderColor = "green";
    }

    if (!category.value) {
        category.style.borderColor = "red";
        errores.push("Debes indicar la categoría");
    } else {
        category.style.borderColor = "green";
    }

    if (!destacado.value) {
        destacado.style.borderColor = "red";
        errores.push("Debes indicar si el producto es destacado o no");
    } else {
        destacado.style.borderColor = "green";
    }

    console.log(errores);

    return errores.filter((msg) => msg != null);
}
