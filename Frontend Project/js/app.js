/* ==========================================================================
   CAMPUS SKILL HUB — GLOBAL STATE & CORE UTILITIES (JAVASCRIPT)
   ========================================================================== */

// Default Mock Data for initial demo state
const INITIAL_DATA = {
    currentUser: {
        id: 'u1',
        name: 'Prem Miglani',
        email: 'prem.miglani@college.edu',
        course: 'B.Tech CSE',
        year: '3rd Year',
        bio: 'Passionate about web engineering, UI design, and algorithms. Always excited to share web development knowledge and learn new tech stacks!',
        avatar: 'PM',
        avatarBg: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
        skillsTeach: [
            { id: 's1', name: 'HTML5 & CSS3', category: 'Development', level: 'Advanced' },
            { id: 's2', name: 'JavaScript ES6+', category: 'Development', level: 'Intermediate' }
        ],
        skillsLearn: [
            { id: 's3', name: 'React Development', category: 'Development', level: 'Beginner' },
            { id: 's4', name: 'UI/UX Design', category: 'Design', level: 'Beginner' }
        ],
        interests: ['Web Engineering', 'UI Design', 'Open Source', 'Algorithms']
    },
    students: [
        {
            id: 'u2',
            name: 'Arjun Sharma',
            course: 'B.Tech CSE',
            year: '2nd Year',
            role: 'Frontend Developer',
            bio: 'I enjoy building responsive web applications with React and helping other students master modern JavaScript.',
            avatar: 'AS',
            avatarBg: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            rating: 4.9,
            reviewsCount: 12,
            skillsTeach: ['React', 'JavaScript', 'HTML/CSS'],
            skillsLearn: ['UI/UX', 'Figma'],
            reviews: [
                { student: 'Priya Raj', rating: 5, comment: 'Arjun explained React state management and props very clearly!' },
                { student: 'Rohan Kumar', rating: 4.8, comment: 'Great mentor. Super patient with debugging code.' }
            ]
        },
        {
            id: 'u3',
            name: 'Priya Raj',
            course: 'B.Des',
            year: '3rd Year',
            role: 'UI/UX Designer',
            bio: 'Passionate about user research, wireframing, color systems, and building interactive prototypes in Figma.',
            avatar: 'PR',
            avatarBg: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            rating: 4.8,
            reviewsCount: 9,
            skillsTeach: ['Figma', 'UI/UX', 'Wireframing'],
            skillsLearn: ['React', 'Web Development'],
            reviews: [
                { student: 'Prem Miglani', rating: 5, comment: 'Priya gave awesome feedback on my web layout design principles!' }
            ]
        },
        {
            id: 'u4',
            name: 'Rohan Kumar',
            course: 'B.Tech AI & DS',
            year: '3rd Year',
            role: 'Python & ML Developer',
            bio: 'Love working with Python data science libraries, machine learning models, and automation scripts.',
            avatar: 'RK',
            avatarBg: 'linear-gradient(135deg, #2563EB, #3B82F6)',
            rating: 4.9,
            reviewsCount: 15,
            skillsTeach: ['Python', 'Machine Learning', 'Data Science'],
            skillsLearn: ['Web Dev', 'Public Speaking'],
            reviews: [
                { student: 'Prem Miglani', rating: 5, comment: 'Explained Python object-oriented programming with super simple examples.' }
            ]
        },
        {
            id: 'u5',
            name: 'Ananya Singh',
            course: 'B.A. Journalism',
            year: '2nd Year',
            role: 'Video Editor & Motion Designer',
            bio: 'Creating short films, reels, and YouTube video edits using Adobe Premiere Pro and DaVinci Resolve.',
            avatar: 'AN',
            avatarBg: 'linear-gradient(135deg, #EC4899, #F43F5E)',
            rating: 4.7,
            reviewsCount: 8,
            skillsTeach: ['Video Editing', 'Premiere Pro', 'Motion Graphics'],
            skillsLearn: ['Digital Marketing', 'Photography'],
            reviews: []
        },
        {
            id: 'u6',
            name: 'Vikram Malhotra',
            course: 'BBA',
            year: '3rd Year',
            role: 'Marketing Strategist',
            bio: 'Interested in digital marketing campaigns, personal branding, SEO basics, and startup pitch decks.',
            avatar: 'VM',
            avatarBg: 'linear-gradient(135deg, #F59E0B, #D97706)',
            rating: 4.8,
            reviewsCount: 11,
            skillsTeach: ['Marketing', 'Public Speaking', 'SEO'],
            skillsLearn: ['Python', 'Data Analytics'],
            reviews: []
        },
        {
            id: 'u7',
            name: 'Sneha Gupta',
            course: 'B.A. English',
            year: '3rd Year',
            role: 'Communication Coach',
            bio: 'Helping campus peers boost confidence in public speaking, interview prep, and presentation skills.',
            avatar: 'SG',
            avatarBg: 'linear-gradient(135deg, #10B981, #059669)',
            rating: 5.0,
            reviewsCount: 14,
            skillsTeach: ['Public Speaking', 'Communication', 'Interview Prep'],
            skillsLearn: ['Video Editing', 'UI Design'],
            reviews: []
        }
    ],
    skills: [
        { id: 1, name: 'Web Development', category: 'Development', studentsCount: 24, description: 'Learn Frontend & Web technologies like HTML, CSS, JS, and React.' },
        { id: 2, name: 'Programming', category: 'Development', studentsCount: 32, description: 'Master C++, Java, Python, and Data Structures for coding interviews.' },
        { id: 3, name: 'UI/UX Design', category: 'Design', studentsCount: 18, description: 'Learn Figma, wireframing, color theory, and user experience design.' },
        { id: 4, name: 'Video Editing', category: 'Media', studentsCount: 14, description: 'Edit engaging videos and reels using Premiere Pro and DaVinci Resolve.' },
        { id: 5, name: 'Photography', category: 'Media', studentsCount: 10, description: 'Master manual camera controls, portrait lighting, and Lightroom editing.' },
        { id: 6, name: 'Public Speaking', category: 'Communication', studentsCount: 16, description: 'Build confidence, master body language, and deliver winning presentations.' },
        { id: 7, name: 'Music', category: 'Music', studentsCount: 12, description: 'Learn guitar chords, keyboard music theory, or digital audio production.' },
        { id: 8, name: 'Marketing', category: 'Business', studentsCount: 15, description: 'Understand social media strategies, SEO, branding, and growth marketing.' }
    ],
    requests: [
        {
            id: 'req1',
            studentName: 'Arjun Sharma',
            studentId: 'u2',
            avatar: 'AS',
            avatarBg: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            skill: 'React Development',
            date: '2026-10-15',
            time: '17:00',
            mode: 'Online (Google Meet)',
            message: 'Hey Arjun! I want to learn React functional components and hooks from you.',
            status: 'accepted',
            createdAt: '2026-10-06'
        },
        {
            id: 'req2',
            studentName: 'Priya Raj',
            studentId: 'u3',
            avatar: 'PR',
            avatarBg: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            skill: 'Figma UI Design',
            date: '2026-10-18',
            time: '16:00',
            mode: 'Offline (Library Room 3)',
            message: 'Hi Priya, can we connect to review UI wireframing and design systems?',
            status: 'pending',
            createdAt: '2026-10-07'
        },
        {
            id: 'req3',
            studentName: 'Rohan Kumar',
            studentId: 'u4',
            avatar: 'RK',
            avatarBg: 'linear-gradient(135deg, #2563EB, #3B82F6)',
            skill: 'Python Basics',
            date: '2026-10-04',
            time: '14:00',
            mode: 'Online',
            message: 'Looking forward to learning Python object-oriented programming.',
            status: 'completed',
            rating: 5,
            review: 'Rohan explained Python concepts super clearly. High recommended peer mentor!',
            createdAt: '2026-10-02'
        }
    ],
    bookmarks: ['u2', 'u3'],
    notifications: [
        { id: 1, text: 'Arjun Sharma accepted your React Development session request.', time: '2 hours ago', read: false, icon: '✅' },
        { id: 2, text: 'Reminder: Upcoming React session with Arjun on Oct 15 at 5:00 PM.', time: '1 day ago', read: false, icon: '📅' },
        { id: 3, text: 'Your Python session with Rohan Kumar was marked completed.', time: '3 days ago', read: true, icon: '🎉' }
    ],
    settings: {
        darkMode: false,
        emailNotifs: true,
        sessionReminders: true
    }
};

// ==========================================================================
// LOCAL STORAGE INITIALIZATION & ACCESSORS
// ==========================================================================
function initAppStorage() {
    if (!localStorage.getItem('csh_initialized')) {
        localStorage.setItem('csh_currentUser', JSON.stringify(INITIAL_DATA.currentUser));
        localStorage.setItem('csh_students', JSON.stringify(INITIAL_DATA.students));
        localStorage.setItem('csh_skills', JSON.stringify(INITIAL_DATA.skills));
        localStorage.setItem('csh_requests', JSON.stringify(INITIAL_DATA.requests));
        localStorage.setItem('csh_bookmarks', JSON.stringify(INITIAL_DATA.bookmarks));
        localStorage.setItem('csh_notifications', JSON.stringify(INITIAL_DATA.notifications));
        localStorage.setItem('csh_settings', JSON.stringify(INITIAL_DATA.settings));
        localStorage.setItem('csh_initialized', 'true');
    }
}

// Global Getter Helpers
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('csh_currentUser')) || INITIAL_DATA.currentUser;
}

function setCurrentUser(user) {
    localStorage.setItem('csh_currentUser', JSON.stringify(user));
}

function getStudents() {
    return JSON.parse(localStorage.getItem('csh_students')) || INITIAL_DATA.students;
}

function getSkills() {
    return JSON.parse(localStorage.getItem('csh_skills')) || INITIAL_DATA.skills;
}

function getRequests() {
    return JSON.parse(localStorage.getItem('csh_requests')) || INITIAL_DATA.requests;
}

function saveRequests(requests) {
    localStorage.setItem('csh_requests', JSON.stringify(requests));
}

function getBookmarks() {
    return JSON.parse(localStorage.getItem('csh_bookmarks')) || INITIAL_DATA.bookmarks;
}

function saveBookmarks(bookmarks) {
    localStorage.setItem('csh_bookmarks', JSON.stringify(bookmarks));
}

function getNotifications() {
    return JSON.parse(localStorage.getItem('csh_notifications')) || INITIAL_DATA.notifications;
}

function saveNotifications(notifs) {
    localStorage.setItem('csh_notifications', JSON.stringify(notifs));
}

function getSettings() {
    return JSON.parse(localStorage.getItem('csh_settings')) || INITIAL_DATA.settings;
}

function saveSettings(settings) {
    localStorage.setItem('csh_settings', JSON.stringify(settings));
}

// ==========================================================================
// TOAST NOTIFICATIONS HELPER
// ==========================================================================
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';
    if (type === 'warning') icon = '🔔';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==========================================================================
// BOOKMARK TOGGLE HELPER
// ==========================================================================
function toggleBookmark(studentId) {
    let bookmarks = getBookmarks();
    let isBookmarked = false;

    if (bookmarks.includes(studentId)) {
        bookmarks = bookmarks.filter(id => id !== studentId);
        showToast('Removed from your bookmarks', 'info');
    } else {
        bookmarks.push(studentId);
        isBookmarked = true;
        showToast('Saved to your bookmarks! 📌', 'success');
    }

    saveBookmarks(bookmarks);
    return isBookmarked;
}

function isBookmarked(studentId) {
    const bookmarks = getBookmarks();
    return bookmarks.includes(studentId);
}

// ==========================================================================
// DARK MODE & THEME CONTROLLER
// ==========================================================================
function applyTheme() {
    const settings = getSettings();
    if (settings.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function toggleDarkMode() {
    const settings = getSettings();
    settings.darkMode = !settings.darkMode;
    saveSettings(settings);
    applyTheme();
    showToast(settings.darkMode ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️', 'info');
}

// ==========================================================================
// HEADER & NAV SYNC
// ==========================================================================
function renderHeaderNav() {
    const currentUser = getCurrentUser();
    const notifs = getNotifications();
    const unreadCount = notifs.filter(n => !n.read).length;
    const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html');
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/Frontend%20Project/');

    const navActions = document.querySelector('.nav-actions');
    if (navActions && !isLoginPage) {
        if (currentUser) {
            navActions.innerHTML = `
                <a href="${isHomePage ? 'pages/' : ''}bookmarks.html" class="btn-ghost btn-sm" title="Bookmarks">📌</a>
                <a href="${isHomePage ? 'pages/' : ''}requests.html" class="nav-notif-btn" title="Notifications & Requests">
                    🔔 ${unreadCount > 0 ? `<span class="notif-badge">${unreadCount}</span>` : ''}
                </a>
                <a href="${isHomePage ? 'pages/' : ''}my-profile.html" class="user-menu-btn">
                    <div class="avatar avatar-sm">${currentUser.avatar || 'PM'}</div>
                    <span class="user-menu-name">${currentUser.name.split(' ')[0]}</span>
                </a>
            `;
        } else {
            navActions.innerHTML = `
                <a href="${isHomePage ? 'pages/' : ''}login.html" class="btn btn-outline btn-sm">Log In</a>
                <a href="${isHomePage ? 'pages/' : ''}signup.html" class="btn btn-primary btn-sm">Sign Up</a>
            `;
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initAppStorage();
    applyTheme();
    renderHeaderNav();

    // Mobile Hamburger Menu Handler
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
