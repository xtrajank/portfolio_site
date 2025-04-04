// validation.js - visitor form validation

const stateAbbreviations = ["AL", "AK", "AZ", "AR", "AS", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "TT", "UT", "VT", "VA", "VI", "WA", "WV", "WI", "WY"];

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const zipRegex = /^\d{5}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkRequired(id, msg) {
    const field = document.getElementById(id);
    const valid = field.value.trim() !== "";
    setElementValidity(id, valid, msg);
    return valid;
}

function checkFormat(id, msg, regex) {
    const field = document.getElementById(id);
    const valid = regex.test(field.value);
    setElementValidity(id, valid, msg);
    return valid;
}

function validateState(id, msg) {
    const val = document.getElementById(id).value.toUpperCase();
    const valid = stateAbbreviations.includes(val);
    setElementValidity(id, valid, msg);
    return valid;
}

function setElementValidity(id, valid, message) {
    const field = document.getElementById(id);
    const errorDiv = field.nextElementSibling;
    field.classList.add('was-validated');
    field.setCustomValidity(valid ? "" : message);
    errorDiv.textContent = valid ? "" : message;
}

function validateCheckboxGroup(name, msg) {
    const boxes = document.querySelectorAll(`input[name="${name}"]`);
    const checked = Array.from(boxes).some(box => box.checked);
    document.getElementById("checkboxError").textContent = checked ? "" : msg;
    return checked;
}

function validateForm() {
    let valid = true;
    valid &= checkRequired("firstName", "First name is required");
    valid &= checkRequired("lastName", "Last name is required");
    valid &= checkRequired("address", "Address is required");
    valid &= checkRequired("city", "City is required");
    valid &= validateState("state", "State is required");
    valid &= checkFormat("zip", "Zip must be 5 digits", zipRegex);
    valid &= checkFormat("phone", "OInvalid phone format", phoneRegex);
    valid &= checkFormat("email", "Invalid email format", emailRegex);
    valid &= validateCheckboxGroup("source", "Select at least one option");

    return Boolean(valid);
}

function initValidation(formSelector) {
    const form = document.querySelector(formSelector);
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (validateForm()) {
            form.style.display = "none";
            document.getElementById("thankYou").style.display = "block";
        }
    });

    ["firstName", "lastName", "address", "city", "state", "zip", "phone", "email"].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener("change", () => validateForm());
    });
}