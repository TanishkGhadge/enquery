const form = document.getElementById('enquiryForm');
const successMessage = document.getElementById('successMessage');
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxNnVY_ue-D9y5tfE3cAWF6zhjt2UvDnhxnBJ8_Qus7tugfll7xMc1rCbDAFPDBk1L1/exec";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
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
        form.style.display = "none";
        successMessage.classList.add("show");
    }
});
