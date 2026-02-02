const form = document.getElementById("pass-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = true;
    const spinner = submitBtn.querySelector(".spinner");
    const btnText = submitBtn.querySelector(".btn-text");
    btnText.textContent = "Generating OTP";
    spinner.classList.remove("hide");
    
    const response = await fetch(`/auth/recovery/recover_password?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (response.ok && result === true) {
        document.body.innerHTML = `
    <form id="otp-form">
        <div class="shadow-box">
            <h1>Recover Password</h1>
            <section class="fields">
                <div class="otp-field">
                    <p id="msg">OTP sent to ${email}</p>
                    <div class="otp-container">
                        <input type="text" maxlength="1" class="otp-input" inputmode="numeric" required>
                        <input type="text" maxlength="1" class="otp-input" inputmode="numeric" required>
                        <input type="text" maxlength="1" class="otp-input" inputmode="numeric" required>
                        <input type="text" maxlength="1" class="otp-input" inputmode="numeric" required>
                        <input type="text" maxlength="1" class="otp-input" inputmode="numeric" required>
                        <input type="text" maxlength="1" class="otp-input" inputmode="numeric" required>
                    </div>
                </div>
            </section>
            <button type="submit" class="primary-btn">Verify & Delete</button>
        </div>
    </form>
    `;

        const otpForm = document.getElementById("otp-form");
        const inputs = document.querySelectorAll('.otp-input');

        inputs.forEach((input, index) => {
            // Handle input
            input.addEventListener('input', (e) => {
                // Check if input is a number
                if (!/^[0-9]$/.test(e.data) && e.inputType !== 'deleteContentBackward') {
                    input.value = ''; // clear invalid input
                    return;
                }

                if (e.data && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Handle backspace/navigation
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    if (input.value === '' && index > 0) {
                        inputs[index - 1].focus();
                    }
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    inputs[index - 1].focus();
                } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Handle paste
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, ''); // only numbers

                if (pasteData) {
                    const chars = pasteData.split('');
                    let currentIndex = index;

                    chars.forEach(char => {
                        if (currentIndex < inputs.length) {
                            inputs[currentIndex].value = char;
                            currentIndex++;
                        }
                    });

                    // Focus the next empty input or the last one
                    if (currentIndex < inputs.length) {
                        inputs[currentIndex].focus();
                    } else {
                        inputs[inputs.length - 1].focus();
                    }
                }
            });
        });
        otpForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const otpInputs = document.querySelectorAll('.otp-input');
            let otp = "";

            otpInputs.forEach(input => otp += input.value);

            if (otp.length !== 6) {
                alert("Enter full 6-digit OTP");
                return;
            }

            const response = await fetch('/auth/recovery/verify_otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, otp: otp }),
            });

            const result = await response.json();

            if (response.ok && result['recovery_token']) {
                document.body.innerHTML = `
    <form id="new-pass-form">
        <div class="shadow-box">
            <h1>Recover Password</h1>
            <section class="fields">
                <div class="field">
                    <label for="password">New Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your new password">
                </div>
            </section>
            <button id="submit-btn" type="submit" class="primary-btn">Change Password</button>
        </div>
    </form>
    `;
                const newPassForm = document.getElementById("new-pass-form");
                newPassForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const newPassword = document.getElementById("password").value;
                    const recoveryToken = result['recovery_token'];
                    const response = await fetch('/auth/recovery/change_password', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ recoveryToken: recoveryToken, newPassword: newPassword }),
                    });
                    if (response.ok) {
                        const button = document.getElementById("submit-btn");
                        button.remove()
                        const fields = document.querySelector(".fields");
                        fields.innerHTML = `<p id="msg">Successfully changed password for <span style="color: #19B240 !important">${email}</span> account.</p>`;
                    }
                });
            } else {
                alert("OTP verification failed!");
            }
        });
    }
})