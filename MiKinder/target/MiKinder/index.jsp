<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Inscripción</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
<div class="container">
    <h1>
        <img src="img/titulo.jpg" alt="Logo" class="header-image">
    </h1>
    <h2>Formulario de Inscripción</h2>
    <p>Los campos marcados con(<span class="letra-roja">*</span>) son obligatorios</p>
    <form id="registrationForm" class="col-12">
        <div class="section col-12">
            <h2>Datos del Niño/a</h2>
            <label for="childFirstName">Nombre *</label>
            <input type="text" id="childFirstName" name="childFirstName" required>
            <label for="childLastName">Apellidos *</label>
            <input type="text" id="childLastName" name="childLastName" required>
            <label for="childBirthDate">Fecha de Nacimiento *</label>
            <input type="date" id="childBirthDate" name="childBirthDate" required>
            <label for="childAddress">Dirección *</label>
            <input type="text" id="childAddress" name="childAddress" required>
            <label for="childCity">Población *</label>
            <input type="text" id="childCity" name="childCity" required>
        </div>

        <div class="section col-12 flex-container">
            <div class="col-6">
                <h3>Padre/Tutor</h3>
                <label for="fatherName">Nombre y Apellidos *</label>
                <input type="text" id="fatherName" name="fatherName" required>
                <label for="fatherDNI">DNI *</label>
                <input type="text" id="fatherDNI" name="fatherDNI" required>
                <label for="fatherProfession">Profesión</label>
                <input type="text" id="fatherProfession" name="fatherProfession">
                <label for="fatherPhone">Teléfono de Contacto *</label>
                <input type="text" id="fatherPhone" name="fatherPhone" required>
                <label for="fatherEmail">Email *</label>
                <input type="email" id="fatherEmail" name="fatherEmail" required>
            </div>

            <div class="col-6">
                <h3>Madre/Tutor</h3>
                <label for="motherName">Nombre y Apellidos *</label>
                <input type="text" id="motherName" name="motherName" required>
                <label for="motherDNI">DNI *</label>
                <input type="text" id="motherDNI" name="motherDNI" required>
                <label for="motherProfession">Profesión</label>
                <input type="text" id="motherProfession" name="motherProfession">
                <label for="motherPhone">Teléfono de Contacto *</label>
                <input type="text" id="motherPhone" name="motherPhone" required>
                <label for="motherEmail">Email *</label>
                <input type="email" id="motherEmail" name="motherEmail" required>
            </div>
        </div>

        <div class="section col-12 flex-container">
            <div class="col-6 otros-datos">
                <h2>Otros Datos de Interés</h2>
                <label for="allergies">Alergias</label>
                <textarea id="allergies" name="allergies"></textarea>
                <label for="foodAllergies">Alergias Alimentarias</label>
                <textarea id="foodAllergies" name="foodAllergies"></textarea>
            </div>
            <div class="col-6 otros-datos">
                <label for="medicationIntolerance">Intolerancias Medicación</label>
                <textarea id="medicationIntolerance" name="medicationIntolerance"></textarea>
                <label for="observations">Observaciones</label>
                <textarea id="observations" name="observations"></textarea>
            </div>
        </div>

        <div class="section col-12">
            <h2>Autorizaciones</h2>
            <div id="authorizationSection"></div>
            <button type="button" id="addAuthorizationButton">Agregar Autorización</button>
        </div>

        <button type="submit">Registrarte</button>
    </form>
    <p>¿Ya tienes una cuenta? <a href="#" id="showLoginForm">Iniciar sesión</a></p>

    <div id="loginFormContainer" style="display:none;">
        <h1>Iniciar Sesión</h1>
        <form id="loginForm">
            <label for="loginEmailOrPhone">Número de móvil o correo electrónico</label>
            <input type="text" id="loginEmailOrPhone" name="loginEmailOrPhone" required>
            <label for="loginPassword">Contraseña</label>
            <input type="password" id="loginPassword" name="loginPassword" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <p>¿No tienes una cuenta? <a href="#" id="showRegistrationForm">Registrarte</a></p>
    </div>
</div>
<script src="js/MiKinder.js"></script>
</body>
</html>

