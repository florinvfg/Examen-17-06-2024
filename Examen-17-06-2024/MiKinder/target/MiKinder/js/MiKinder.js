document.addEventListener('DOMContentLoaded', function() {
    // Este evento se dispara cuando el DOM ha sido completamente cargado

    // Expresión regular para validar DNI/NIE español
    const dniRegex = /^[XYZ]?\d{7,8}[A-Z]$/i;

    // Expresión regular para validar teléfono en España (9 dígitos, opcionalmente precedido por 6, 7, 8 o 9)
    const teléfonoRegex = /^[6-9]\d{8}$/;


    // Calcula la fecha máxima permitida (hace 3 años a partir de hoy)
    const hoy = new Date();
    const fechaMaxima = new Date(hoy.getFullYear() , hoy.getMonth(), hoy.getDate());
    const fechaMaximaString = fechaMaxima.toISOString().split('T')[0];

    // Establece la fecha máxima permitida en el campo de fecha de nacimiento
    document.getElementById('childBirthDate').setAttribute('max', fechaMaximaString);

    // Maneja el clic en el botón para agregar autorización
    document.getElementById('addAuthorizationButton').addEventListener('click', function() {
        agregarAutorizacion();
    });

    // Maneja la presentación del formulario de registro
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita la presentación predeterminada del formulario

        // Recupera los valores del formulario
        const nombreNiño = document.getElementById('childFirstName').value; // Nombre del niño/a
        const apellidosNiño = document.getElementById('childLastName').value; // Apellidos del niño/a
        const fechaNacimientoNiño = document.getElementById('childBirthDate').value; // Fecha de nacimiento del niño/a
        const direcciónNiño = document.getElementById('childAddress').value; // Dirección del niño/a
        const poblaciónNiño = document.getElementById('childCity').value; // Población del niño/a
        const contraseñaNiño = document.getElementById('childPassword').value; // Contraseña del niño/a
        const confirmaciónContraseñaNiño = document.getElementById('childPasswordConfirm').value; // Confirmación de contraseña del niño/a

        // Validación de coincidencia de contraseñas
        if (contraseñaNiño !== confirmaciónContraseñaNiño) {
            alert('Las contraseñas no coinciden. Por favor, verifica.');
            return; // Evita continuar con el envío del formulario si las contraseñas no coinciden
        }

        const nombrePadre = document.getElementById('fatherName').value; // Nombre del padre/tutor
        const dniPadre = document.getElementById('fatherDNI').value; // DNI del padre/tutor

        // Validación del DNI/NIE
        if (!dniRegex.test(dniPadre)) {
            alert('Por favor, introduce un DNI o NIE válido.');
            return; // Evita continuar con el envío del formulario si el DNI/NIE no es válido
        }

        const profesiónPadre = document.getElementById('fatherProfession').value; // Profesión del padre/tutor
        const teléfonoPadre = document.getElementById('fatherPhone').value; // Teléfono de contacto del padre/tutor


        // Validación del teléfono
        if (!teléfonoRegex.test(teléfonoPadre)) {
            alert('Por favor, introduce un número de teléfono válido.');
            return; // Evita continuar con el envío del formulario si el teléfono no es válido
        }

        const emailPadre = document.getElementById('fatherEmail').value; // Email del padre/tutor

        const nombreMadre = document.getElementById('motherName').value; // Nombre de la madre/tutora

        const dniMadre = document.getElementById('motherDNI').value; // DNI de la madre/tutora
        // Validación del DNI/NIE
        if (!dniRegex.test(dniMadre)) {
            alert('Por favor, introduce un DNI o NIE válido.');
            return; // Evita continuar con el envío del formulario si el DNI/NIE no es válido
        }
        const profesiónMadre = document.getElementById('motherProfession').value; // Profesión de la madre/tutora
        const teléfonoMadre = document.getElementById('motherPhone').value; // Teléfono de contacto de la madre/tutora
        // Validación del teléfono
        if (!teléfonoRegex.test(teléfonoMadre)) {
            alert('Por favor, introduce un número de teléfono válido.');
            return; // Evita continuar con el envío del formulario si el teléfono no es válido
        }
        const emailMadre = document.getElementById('motherEmail').value; // Email de la madre/tutora

        const alergias = document.getElementById('allergies').value; // Alergias
        const alergiasAlimentarias = document.getElementById('foodAllergies').value; // Alergias alimentarias
        const intoleranciaMedicación = document.getElementById('medicationIntolerance').value; // Intolerancias a medicamentos
        const observaciones = document.getElementById('observations').value; // Observaciones

        // Recupera la información de autorización
        const autorizaciones = [];
        document.querySelectorAll('.authorization').forEach(function(auth) {
            const nombreAutorización = auth.querySelector('.authName').value; // Nombre y apellidos para autorización
            const dniAutorización = auth.querySelector('.authDNI').value; // DNI para autorización
            const teléfonoAutorización = auth.querySelector('.authPhone').value; // Teléfono para autorización
            const relaciónAutorización = auth.querySelector('.authRelation').value; // Relación o parentesco para autorización
            autorizaciones.push({ nombre: nombreAutorización, dni: dniAutorización, teléfono: teléfonoAutorización, relación: relaciónAutorización });
        });

        // Guarda el usuario en localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        usuarios.push({
            niño: { nombre: nombreNiño, apellidos: apellidosNiño, fechaNacimiento: fechaNacimientoNiño, dirección: direcciónNiño, población: poblaciónNiño }, // Datos del niño/a
            padre: { nombre: nombrePadre, dni: dniPadre, profesión: profesiónPadre, teléfono: teléfonoPadre, email: emailPadre }, // Datos del padre/tutor
            madre: { nombre: nombreMadre, dni: dniMadre, profesión: profesiónMadre, teléfono: teléfonoMadre, email: emailMadre }, // Datos de la madre/tutora
            alergias, // Alergias
            alergiasAlimentarias, // Alergias alimentarias
            intoleranciaMedicación, // Intolerancias a medicamentos
            observaciones, // Observaciones
            autorizaciones // Autorizaciones
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Muestra una alerta para confirmar el envío exitoso del formulario
        alert('Formulario enviado con éxito');

        // Reinicia el formulario
        document.getElementById('registrationForm').reset();

        // Limpia la sección de autorización
        document.getElementById('authorizationSection').innerHTML = '';
    });

    // Maneja la presentación del formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita la presentación predeterminada del formulario

        const correoOMóvil = document.getElementById('loginEmailOrPhone').value;
        const contraseña = document.getElementById('loginPassword').value;

        // Recupera los usuarios de localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuarios.find(u => (u.padre.email === correoOMóvil || u.madre.email === correoOMóvil) && u.niño.nombre === contraseña);

        if (usuario) {
            alert('Inicio de sesión exitoso');
            // Aquí se podría añadir lógica para redirigir al usuario o mostrar contenido específico para el usuario
        } else {
            alert('Correo electrónico/número de móvil o contraseña incorrectos');
        }
    });

    // Maneja la visibilidad de los formularios al hacer clic en "Iniciar sesión"
    document.getElementById('showLoginForm').addEventListener('click', function() {
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loginFormContainer').style.display = 'block';
    });

    // Maneja la visibilidad de los formularios al hacer clic en "Registrarte"
    document.getElementById('showRegistrationForm').addEventListener('click', function() {
        document.getElementById('registrationForm').style.display = 'block';
        document.getElementById('loginFormContainer').style.display = 'none';
    });
});

// Función para agregar una nueva autorización dinámicamente
function agregarAutorizacion() {
    const secciónAutorización = document.getElementById('authorizationSection');
    const divAutorización = document.createElement('div');
    divAutorización.classList.add('authorization');

    divAutorización.innerHTML = `
        <label for="authName">Nombre y Apellidos *</label>
        <input type="text" class="authName" required>
        
        <label for="authDNI">DNI *</label>
        <input type="text" class="authDNI" required>
        
        <label for="authPhone">Teléfono *</label>
        <input type="text" class="authPhone" required>
        
        <label for="authRelation">Relación o Parentesco *</label>
        <input type="text" class="authRelation" required>
        
        <button type="button" class="remove-auth">Eliminar</button>
    `;

    secciónAutorización.appendChild(divAutorización);

    // Maneja el clic en el botón para eliminar una autorización
    divAutorización.querySelector('.remove-auth').addEventListener('click', function() {
        secciónAutorización.removeChild(divAutorización);
    });
}
