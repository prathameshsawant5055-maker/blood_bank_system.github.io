let donors = JSON.parse(localStorage.getItem("donors")) || [];

/* =====================
   ADMIN LOGIN LOGIC
===================== */

const ADMIN_USER = "pathu63";
const ADMIN_PASS = "pathu63";

const loginForm = document.getElementById("adminLoginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const user = document.getElementById("adminUser").value;
        const pass = document.getElementById("adminPass").value;

        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            localStorage.setItem("adminLoggedIn", "true");
            window.location.href = "admin.html";
        } else {
            document.getElementById("error").innerText = "Invalid Username or Password";
        }
    });
}

// Protect admin page
if (window.location.pathname.includes("admin.html")) {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "admin-login.html";
    }
}

// Logout
function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html";
}

/* =====================
   DONOR LOGIC
===================== */

const form = document.getElementById("donorForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const donor = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
            blood: document.getElementById("blood").value,
            phone: document.getElementById("phone").value,
            city: document.getElementById("city").value
        };

        donors.push(donor);
        localStorage.setItem("donors", JSON.stringify(donors));

        alert("Donor Registered Successfully!");
        form.reset();
    });
}

// Display donors (user)
function displayDonors() {
    const list = document.getElementById("donorList");
    if (!list) return;

    list.innerHTML = "";
    donors.forEach(d => {
        list.innerHTML += `
            <tr>
                <td>${d.name || "N/A"}</td>
                <td>${d.blood}</td>
                <td>${d.phone}</td>
                <td>${d.city}</td>
            </tr>
        `;
    });
}

// Filter donors
function filterDonors() {
    const bg = document.getElementById("filterBlood").value;
    const list = document.getElementById("donorList");

    list.innerHTML = "";
    donors.filter(d => bg === "" || d.blood === bg)
        .forEach(d => {
            list.innerHTML += `
                <tr>
                    <td>${d.name || "N/A"}</td>
                    <td>${d.blood}</td>
                    <td>${d.phone}</td>
                    <td>${d.city}</td>
                </tr>
            `;
        });
}

// Admin view + delete
function loadAdmin() {
    const list = document.getElementById("adminDonorList");
    if (!list) return;

    list.innerHTML = "";
    donors.forEach((d, i) => {
        list.innerHTML += `
            <tr>
                <td>${d.name || "N/A"}</td>
                <td>${d.blood}</td>
                <td>${d.phone}</td>
                <td>${d.city}</td>
                <td>
                    <button class="delete" onclick="deleteDonor(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function deleteDonor(index) {
    if (confirm("Delete this donor record?")) {
        donors.splice(index, 1);
        localStorage.setItem("donors", JSON.stringify(donors));
        loadAdmin();
    }
}

// Auto load
document.addEventListener("DOMContentLoaded", () => {
    displayDonors();
    loadAdmin();
});
