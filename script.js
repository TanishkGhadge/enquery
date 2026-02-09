const form = document.getElementById('enquiryForm');
const successMessage = document.getElementById('successMessage');
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxNnVY_ue-D9y5tfE3cAWF6zhjt2UvDnhxnBJ8_Qus7tugfll7xMc1rCbDAFPDBk1L1/exec";

const companyPhones = {
    "Chit code": "7974544290",
    "Patch line": "7974544290",
    "Code Sikha": "7974544290",
    "Digital Dynamics": "7974544290",
    "Future Systems": "7974544290"
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const btn = form.querySelector('.submit-btn');
    btn.textContent = "Submitting...";
    btn.disabled = true;

    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        whatsapp: document.getElementById('whatsapp').value,
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

        sendWhatsAppMessage(data);

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

function sendWhatsAppMessage(data) {
    const companyMessages = {
        "Chit code": `🎯 New Chit Code Enquiry!\n\n👤 Name: ${data.name}\n📞 Phone: ${data.phone}\n💬 WhatsApp: ${data.whatsapp}\n📍 Address: ${data.address}\n📝 Requirements: ${data.description}`,
        
        "Patch line": `⚡ Patch Line - New Lead!\n\n👤 Client: ${data.name}\n📞 Contact: ${data.phone}\n💬 WhatsApp: ${data.whatsapp}\n📍 Location: ${data.address}\n📋 Details: ${data.description}`,
        
        "Code Sikha": `📚 Code Sikha - New Student Enquiry!\n\n👤 Student Name: ${data.name}\n📞 Phone: ${data.phone}\n💬 WhatsApp: ${data.whatsapp}\n📍 Address: ${data.address}\n📖 Course Interest: ${data.description}`,
        
        "Digital Dynamics": `🚀 Digital Dynamics - New Project Enquiry!\n\n👤 Name: ${data.name}\n📞 Phone: ${data.phone}\n💬 WhatsApp: ${data.whatsapp}\n📍 Address: ${data.address}\n💼 Project Details: ${data.description}`,
        
        "Future Systems": `🔮 Future Systems - New Inquiry!\n\n👤 Name: ${data.name}\n📞 Phone: ${data.phone}\n💬 WhatsApp: ${data.whatsapp}\n📍 Address: ${data.address}\n🔧 Service Required: ${data.description}`
    };
    
    const message = companyMessages[data.company];
    const whatsappURL = `https://wa.me/91${data.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

function validateForm() {
    let valid = true;
    clearErrors();

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const whatsapp = document.getElementById('whatsapp');
    const company = document.getElementById('company');
    const address = document.getElementById('address');
    const description = document.getElementById('description');

    if (!name.value.trim()) {
        showError(name, 'Name is required');
        valid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name.value.trim())) {
        showError(name, 'Name can only contain letters and spaces');
        valid = false;
    }

    const phoneDigits = phone.value.replace(/\D/g, '');
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        valid = false;
    } else if (phoneDigits.length !== 10) {
        showError(phone, 'Phone number must be exactly 10 digits');
        valid = false;
    }

    const whatsappDigits = whatsapp.value.replace(/\D/g, '');
    if (!whatsapp.value.trim()) {
        showError(whatsapp, 'WhatsApp number is required');
        valid = false;
    } else if (whatsappDigits.length !== 10) {
        showError(whatsapp, 'WhatsApp number must be exactly 10 digits');
        valid = false;
    }

    if (!company.value) {
        showError(company, 'Please select a company');
        valid = false;
    }

    if (!address.value.trim()) {
        showError(address, 'Address is required');
        valid = false;
    } else if (address.value.trim().length < 10) {
        showError(address, 'Address must be at least 10 characters');
        valid = false;
    }

    if (!description.value.trim()) {
        showError(description, 'Description is required');
        valid = false;
    } 

    return valid;
}

function showError(input, message) {
    input.classList.add('error');
    input.parentElement.querySelector('.error-message').textContent = message;
}

function clearErrors() {
    document.querySelectorAll('input, textarea, select').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

document.getElementById('name').addEventListener('input', function() {
    this.value = this.value.replace(/[0-9]/g, '');
    if (this.classList.contains('error')) {
        this.classList.remove('error');
        this.parentElement.querySelector('.error-message').textContent = '';
    }
});

document.getElementById('phone').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
    if (this.classList.contains('error')) {
        this.classList.remove('error');
        this.parentElement.querySelector('.error-message').textContent = '';
    }
});

document.getElementById('whatsapp').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
    if (this.classList.contains('error')) {
        this.classList.remove('error');
        this.parentElement.querySelector('.error-message').textContent = '';
    }
});

document.querySelectorAll('#company, #address, #description').forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            this.parentElement.querySelector('.error-message').textContent = '';
        }
    });
});
