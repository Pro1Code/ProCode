// Importar desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCeNGjWAl_QcmhqoAcvQeLBPLydAWXq6TM",
  authDomain: "academiaprogramacion-68d7c.firebaseapp.com",
  projectId: "academiaprogramacion-68d7c",
  storageBucket: "academiaprogramacion-68d7c.appspot.com", // CORREGIDO
  messagingSenderId: "966777972277",
  appId: "1:966777972277:web:b06f4fa0d8535265f6f37c",
  measurementId: "G-5D1KT78D89"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Mostrar mensaje informativo
function mostrarMensaje() {
  alert("Nuestros cursos inician cada mes. ¡Escríbenos para más información!");
}

// Enviar formulario
function enviarFormulario(event) {
  event.preventDefault();
  alert("Gracias por contactarnos. El tiempo aproximado de respuesta es de 24 horas.");
}

// Registro
function registrarUsuario(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Registro exitoso. ¡Bienvenido!");
      console.log("Usuario registrado:", user);
      window.location.href = "index.html"; 
    })
    .catch((error) => {
      console.error("Error en registro:", error.message);
      alert("Error: " + error.message);
    });
}

// Login
function iniciarSesion(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Inicio de sesión exitoso.");
      window.location.href = "index.html"; // redirige automáticamente

    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.message);
      alert("Error: " + error.message);
    });
}

// Logout
function cerrarSesion() {
  signOut(auth)
    .then(() => {
      alert("Sesión cerrada.");
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error.message);
      alert("Error: " + error.message);
    });
}

// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const registerSubmit = document.getElementById("register-submit");
  const loginSubmit = document.getElementById("login-submit");

  if (registerSubmit) {
    registerSubmit.addEventListener("click", () => {
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      registrarUsuario(email, password);
    });
  }

  if (loginSubmit) {
    loginSubmit.addEventListener("click", () => {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      iniciarSesion(email, password);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", cerrarSesion);
  }

  // Mostrar info del usuario conectado
onAuthStateChanged(auth, (user) => {
  const loggedInSection = document.getElementById('auth-logged-in');
  const loggedOutSection = document.getElementById('auth-logged-out');
  const userEmailSpan = document.getElementById('user-email');

  if (user) {
    if (userEmailSpan) userEmailSpan.textContent = user.email;
    if (loggedInSection) loggedInSection.style.display = 'inline-block';
    if (loggedOutSection) loggedOutSection.style.display = 'none';
    } else {
    if (userEmailSpan) userEmailSpan.textContent = '';
    if (loggedInSection) loggedInSection.style.display = 'none';
    if (loggedOutSection) loggedOutSection.style.display = 'inline-block';
  }
}); // onAuthStateChanged

}); // <-- CIERRE FINAL DEL DOMContentLoaded


