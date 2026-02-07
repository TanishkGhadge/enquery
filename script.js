const form = document.getElementById('enquiryForm');
const successMessage = document.getElementById('successMessage');
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxNnVY_ue-D9y5tfE3cAWF6zhjt2UvDnhxnBJ8_Qus7tugfll7xMc1rCbDAFPDBk1L1/exec";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const btn = form.querySelector('.submit-btn');
    btn.textContent = "Submitting...";
    btn.disabled = true;

    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        address: document.getElementById('address').value,
        description: document.getElementById('description').value
    };

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        form.style.display = "none";
        successMessage.classList.add("show");

        setTimeout(() => {
            form.reset();
            form.style.display = "block";
            successMessage.classList.remove("show");
            btn.textContent = "Submit Enquiry";
            btn.disabled = false;
        }, 3000);

    } catch (error) {
        alert("Error submitting form. Please try again.");
        btn.textContent = "Submit Enquiry";
        btn.disabled = false;
    }
});

function validateForm() {
    let valid = true;
    clearErrors();

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const company = document.getElementById('company');
    const address = document.getElementById('address');
    const description = document.getElementById('description');

    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        valid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        valid = false;
    } else if (name.value.trim().length > 50) {
        showError(name, 'Name must not exceed 50 characters');
        valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name.value.trim())) {
        showError(name, 'Name can only contain letters and spaces');
        valid = false;
    }

    // Phone validation
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        valid = false;
    } else if (!/^[\d\s\-\+\(\)]+$/.test(phone.value.trim())) {
        showError(phone, 'Phone can only contain numbers and symbols');
        valid = false;
    } else if (phone.value.replace(/\D/g, '').length < 10) {
        showError(phone, 'Phone must have at least 10 digits');
        valid = false;
    } else if (phone.value.replace(/\D/g, '').length > 15) {
        showError(phone, 'Phone must not exceed 15 digits');
        valid = false;
    }

    // Company validation
    if (!company.value.trim()) {
        showError(company, 'Company name is required');
        valid = false;
    } else if (company.value.trim().length < 2) {
        showError(company, 'Company name must be at least 2 characters');
        valid = false;
    } else if (company.value.trim().length > 100) {
        showError(company, 'Company name must not exceed 100 characters');
        valid = false;
    }

    // Address validation
    if (!address.value.trim()) {
        showError(address, 'Address is required');
        valid = false;
    } else if (address.value.trim().length < 10) {
        showError(address, 'Address must be at least 10 characters');
        valid = false;
    } else if (address.value.trim().length > 200) {
        showError(address, 'Address must not exceed 200 characters');
        valid = false;
    }

    // Description validation
    if (!description.value.trim()) {
        showError(description, 'Description is required');
        valid = false;
    } else if (description.value.trim().length < 10) {
        showError(description, 'Description must be at least 10 characters');
        valid = false;
    } else if (description.value.trim().length > 500) {
        showError(description, 'Description must not exceed 500 characters');
        valid = false;
    }

    return valid;
}

function showError(input, message) {
    input.classList.add('error');
    input.parentElement.querySelector('.error-message').textContent = message;
}

function clearErrors() {
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

// Name field - only letters and spaces
document.getElementById('name').addEventListener('input', function() {
    this.value = this.value.replace(/[0-9]/g, '');
    if (this.classList.contains('error')) {
        this.classList.remove('error');
        this.parentElement.querySelector('.error-message').textContent = '';
    }
});

// Phone field - only numbers and symbols
document.getElementById('phone').addEventListener('input', function() {
    this.value = this.value.replace(/[a-zA-Z]/g, '');
    if (this.classList.contains('error')) {
        this.classList.remove('error');
        this.parentElement.querySelector('.error-message').textContent = '';
    }
});

// Clear errors on input for other fields
document.querySelectorAll('#company, #address, #description').forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            this.parentElement.querySelector('.error-message').textContent = '';
        }
    });
});
