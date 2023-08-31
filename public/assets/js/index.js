let guardarToken = '';
const btnLogin = document.querySelector("#btnLogin");
const btnCrearUsuario = document.querySelector("#btnCrearUsuario");

const validarEmail = (email) => {
    const emailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return emailValido.test(email);
}

const logueo = async () => {
    const urlLogin = 'http://localhost:8080/api/signin';
    const email = document.querySelector('#txtCorreo').value;
    const password = document.querySelector('#txtPassword').value;
    if (!validarEmail(email)) {
        alert("Error!  email inválido (ej: miemail@correo.com)");
        return;
    }
    const datos = {
        email,
        password
    }
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }
    const response = await fetch(urlLogin, opciones);
    const { token, msg } = await response.json();
    console.log(msg);
    if (!token) {
        alert(msg);
        console.log(msg);
    } else {
        guardarToken = token;
        document.querySelector("#IniciarSesion").style.display = "none";
        document.querySelector("#tablaPrincipal").style.display = "block";
        ListadoTodosLosUsuarios();

    }
}

const ListadoTodosLosUsuarios = async () => {
    const body = document.querySelector('#body');
    const url = 'http://localhost:8080/api/user';

    const opciones = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': guardarToken
        }
    }

    try {
        const response = await fetch(url, opciones);

        if (!response.ok) {
            throw new Error('La respuesta no fue exitosa');
        }

        const responseData = await response.json();

        body.innerHTML = '';

        if (Array.isArray(responseData.usuarios)) {
            responseData.usuarios.forEach(usuario => {
                const fila = document.createElement('tr');

                const idUser = document.createElement('td');
                idUser.innerHTML = usuario.id;
                fila.appendChild(idUser);

                const firstName = document.createElement('td');
                firstName.innerHTML = usuario.firstName;
                fila.appendChild(firstName);

                const lastName = document.createElement('td');
                lastName.innerHTML = usuario.lastName;
                fila.appendChild(lastName);

                const email = document.createElement('td');
                email.innerHTML = usuario.email;
                fila.appendChild(email);

                usuario.UserBootcamps.forEach(userBootcamp => {
                    const bootcamp = userBootcamp.Bootcamp;

                    const idBootcamp = document.createElement('td');
                    idBootcamp.innerHTML = bootcamp ? bootcamp.id : 'N/A';
                    fila.appendChild(idBootcamp);

                    const title = document.createElement('td');
                    title.innerHTML = bootcamp ? bootcamp.title : 'N/A';
                    fila.appendChild(title);
                });

                body.appendChild(fila);
            });
        } else {
            console.error('Los datos de respuesta no están en el formato esperado:', responseData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.querySelector("#tablaPrincipal").style.display = "none";
btnLogin.addEventListener('click', logueo);


//evento formulario Crear Usuario
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    if (currentPath === '/api/signup') {
        const signupForm = document.querySelector("#formCreateUser");

        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const createUserURL = '/api/signup';
                const formData = new FormData(signupForm);

                try {
                    const response = await fetch(createUserURL, {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {

                        alert('Usuario creado con éxito');
                    } else {

                        alert('Error al crear usuario');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error en la solicitud');
                }
            });
        }
    }
});
