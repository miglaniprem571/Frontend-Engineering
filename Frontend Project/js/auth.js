/* ==========================================================================
   CAMPUS SKILL HUB — AUTHENTICATION SCRIPT (JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. LOGIN FORM HANDLER
    // ----------------------------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                showToast('Please fill in both email and password fields.', 'error');
                return;
            }

            if (!email.includes('@')) {
                showToast('Please enter a valid college email address.', 'error');
                return;
            }

            // Simulate Successful Login
            showToast('Logging in... Welcome back! 👋', 'success');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }

    // ----------------------------------------------------------------------
    // 2. SIGNUP FORM HANDLER
    // ----------------------------------------------------------------------
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const course = document.getElementById('course').value;
            const year = document.getElementById('year').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            if (!fullName || !email || !password || !confirmPassword) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            if (!email.includes('@')) {
                showToast('Please provide a valid college email ending in .edu / .ac.in', 'error');
                return;
            }

            if (password.length < 6) {
                showToast('Password must be at least 6 characters long.', 'warning');
                return;
            }

            if (password !== confirmPassword) {
                showToast('Passwords do not match. Please re-enter.', 'error');
                return;
            }

            if (!agreeTerms) {
                showToast('You must agree to the campus community guidelines.', 'warning');
                return;
            }

            // Create new student profile & update local storage
            const nameParts = fullName.split(' ');
            const initials = nameParts.length > 1 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() : fullName.substring(0, 2).toUpperCase();

            const newUser = {
                id: 'u_' + Date.now(),
                name: fullName,
                email: email,
                course: course || 'B.Tech CSE',
                year: year || '1st Year',
                bio: 'Excited student eager to learn and share skills across campus!',
                avatar: initials,
                avatarBg: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                skillsTeach: [],
                skillsLearn: [],
                interests: []
            };

            setCurrentUser(newUser);

            showToast('Account created successfully! Redirecting to Dashboard...', 'success');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1200);
        });
    }
});
