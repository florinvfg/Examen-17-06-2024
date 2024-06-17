document.addEventListener('DOMContentLoaded', function() {
    // Este evento se dispara cuando el DOM ha sido completamente cargado

    // Calcula la fecha máxima permitida (hace 3 años a partir de hoy)
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
    const maxDateString = maxDate.toISOString().split('T')[0];

    // Establece la fecha máxima permitida en el campo de fecha de nacimiento
    document.getElementById('childBirthDate').setAttribute('max', maxDateString);

    // Maneja el clic en el botón para agregar autorización
    document.getElementById('addAuthorizationButton').addEventListener('click', function() {
        addAuthorization();
    });

    // Maneja la presentación del formulario de registro
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita la presentación predeterminada del formulario

        // Recupera los valores del formulario
        const childFirstName = document.getElementById('childFirstName').value; // Nombre del niño/a
        const childLastName = document.getElementById('childLastName').value; // Apellidos del niño/a
        const childBirthDate = document.getElementById('childBirthDate').value; // Fecha de nacimiento del niño/a
        const childAddress = document.getElementById('childAddress').value; // Dirección del niño/a
        const childCity = document.getElementById('childCity').value; // Población del niño/a

        const fatherName = document.getElementById('fatherName').value; // Nombre del padre/tutor
        const fatherDNI = document.getElementById('fatherDNI').value; // DNI del padre/tutor
        const fatherProfession = document.getElementById('fatherProfession').value; // Profesión del padre/tutor
        const fatherPhone = document.getElementById('fatherPhone').value; // Teléfono de contacto del padre/tutor
        const fatherEmail = document.getElementById('fatherEmail').value; // Email del padre/tutor

        const motherName = document.getElementById('motherName').value; // Nombre de la madre/tutora
        const motherDNI = document.getElementById('motherDNI').value; // DNI de la madre/tutora
        const motherProfession = document.getElementById('motherProfession').value; // Profesión de la madre/tutora
        const motherPhone = document.getElementById('motherPhone').value; // Teléfono de contacto de la madre/tutora
        const motherEmail = document.getElementById('motherEmail').value; // Email de la madre/tutora

        const allergies = document.getElementById('allergies').value; // Alergias
        const foodAllergies = document.getElementById('foodAllergies').value; // Alergias alimentarias
        const medicationIntolerance = document.getElementById('medicationIntolerance').value; // Intolerancias a medicamentos
        const observations = document.getElementById('observations').value; // Observaciones

        // Recupera la información de autorización
        const authorizations = [];
        document.querySelectorAll('.authorization').forEach(function(auth) {
            const authName = auth.querySelector('.authName').value; // Nombre y apellidos para autorización
            const authDNI = auth.querySelector('.authDNI').value; // DNI para autorización
            const authPhone = auth.querySelector('.authPhone').value; // Teléfono para autorización
            const authRelation = auth.querySelector('.authRelation').value; // Relación o parentesco para autorización
            authorizations.push({ name: authName, dni: authDNI, phone: authPhone, relation: authRelation });
        });

        // Guarda el usuario en localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({
            child: { firstName: childFirstName, lastName: childLastName, birthDate: childBirthDate, address: childAddress, city: childCity }, // Datos del niño/a
            father: { name: fatherName, dni: fatherDNI, profession: fatherProfession, phone: fatherPhone, email: fatherEmail }, // Datos del padre/tutor
            mother: { name: motherName, dni: motherDNI, profession: motherProfession, phone: motherPhone, email: motherEmail }, // Datos de la madre/tutora
            allergies, // Alergias
            foodAllergies, // Alergias alimentarias
            medicationIntolerance, // Intolerancias a medicamentos
            observations, // Observaciones
            authorizations // Autorizaciones
        });
        localStorage.setItem('users', JSON.stringify(users));

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

        const emailOrPhone = document.getElementById('loginEmailOrPhone').value;
        const password = document.getElementById('loginPassword').value;

        // Recupera los usuarios de localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => (u.father.email === emailOrPhone || u.mother.email === emailOrPhone) && u.child.firstName === password);

        if (user) {
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
function addAuthorization() {
    const authorizationSection = document.getElementById('authorizationSection');
    const authDiv = document.createElement('div');
    authDiv.classList.add('authorization');

    authDiv.innerHTML = `
        <label for="authName">Nombre y Apellidos *</label>
        <input type="text" class="authName" required>
        
        <label for="authDNI">DNI *</label>
        <input type="text" class="authDNI" required>
        
        <label for="authPhone">Telefono *</label>
        <input type="text" class="authPhone" required>
        
        <label for="authRelation">Relacion o Parentesco *</label>
        <input type="text" class="authRelation" required>
        
        <button type="button" class="remove-auth">Eliminar</button>
    `;

    authorizationSection.appendChild(authDiv);

    // Maneja el clic en el botón para eliminar una autorización
    authDiv.querySelector('.remove-auth').addEventListener('click', function() {
        authorizationSection.removeChild(authDiv);
    });
}
