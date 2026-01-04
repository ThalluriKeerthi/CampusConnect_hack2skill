/* CampusConnect Authentication Logic */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // === SIGNUP PAGE LOGIC ===


    if (signupForm) {
        //const getmailid=document.getElementById('email'); 
        const passwordInput = document.getElementById('password');
        const confirmResult = document.getElementById('confirmPassword');
        const submitBtn = signupForm.querySelector('button[type="submit"]');

        const rules = {
            length: { regex: /.{8,}/, element: document.getElementById('rule-length') },
            upper: { regex: /[A-Z]/, element: document.getElementById('rule-upper') },
            lower: { regex: /[a-z]/, element: document.getElementById('rule-lower') },
            digit: { regex: /[0-9]/, element: document.getElementById('rule-digit') },
            special: { regex: /[!@#$%^&*]/, element: document.getElementById('rule-special') }
        };

        document.querySelector("button").addEventListener("click", function (e) {
            const email = document.getElementById("email").value;
            const regex = /^[a-zA-Z0-9._%+-]+@svecw\.edu\.in$/;

            if (!regex.test(email)) {
                alert("Only @svecw.edu.in email allowed");
                e.preventDefault();
            } else {
                alert("Valid email ✔");
            }
        });

        // Real-time Password Validation
        passwordInput.addEventListener('input', (e) => {
            const val = e.target.value;
            let allValid = true;

            for (const key in rules) {
                const rule = rules[key];
                if (rule.regex.test(val)) {
                    rule.element.classList.add('valid');
                    rule.element.querySelector('span').textContent = '✓';
                } else {
                    rule.element.classList.remove('valid');
                    rule.element.querySelector('span').textContent = '○';
                    allValid = false;
                }
            }
        });

        // Form Submission
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const confirm = confirmResult.value;

            // Final Validation Check
            if (password !== confirm) {
                alert("Passwords do not match!");
                return;
            }

            // Mock Success
            alert(`Account created for ${email}! Redirecting to login...`);
            window.location.href = 'index.html';
        });
    }

    // === LOGIN PAGE LOGIC ===
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            document.querySelector("button").addEventListener("click", function (e) {
                const email = document.getElementById("email").value;
                const regex = /^[a-zA-Z0-9._%+-]+@svecw\.edu\.in$/;

                if (!regex.test(email)) {
                    alert("Only @svecw.edu.in email allowed");
                    e.preventDefault();
                } else {
                    alert("Valid email ✔");
                }
            });

            if (email && password) {
                // Mock Login Success
                // Store a mock token or user state
                localStorage.setItem('campusUser', JSON.stringify({ email: email, name: email.split('@')[0] }));
                window.location.href = 'dashboard.html';
            } else {
                alert("Please enter valid credentials.");
            }
        });
    }
});
