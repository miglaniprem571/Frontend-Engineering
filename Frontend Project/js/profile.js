/* ==========================================================================
   CAMPUS SKILL HUB — PROFILE & BOOKMARKS MANAGEMENT SCRIPT (JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. STUDENT PROFILE PAGE LOADER (PUBLIC PROFILE)
    // ----------------------------------------------------------------------
    const publicProfileContainer = document.getElementById('publicProfileContainer');
    if (publicProfileContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const studentId = urlParams.get('id') || 'u2';

        const students = getStudents();
        const student = students.find(s => s.id === studentId) || students[0];

        publicProfileContainer.innerHTML = `
            <div class="card" style="margin-bottom: 24px;">
                <div class="flex-between" style="align-items: flex-start; flex-wrap: wrap; gap: 20px;">
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <div class="avatar avatar-lg" style="background: ${student.avatarBg};">${student.avatar}</div>
                        <div>
                            <h1 style="font-size: 1.75rem;">${student.name}</h1>
                            <p style="font-weight: 600; color: var(--primary); font-size: 1.05rem;">${student.role}</p>
                            <p style="font-size: 0.9rem;">🎓 ${student.course} • ${student.year}</p>
                            <div style="margin-top: 6px; color: #F59E0B; font-weight: 700; font-size: 0.95rem;">
                                ⭐ ${student.rating} <span style="color: var(--text-muted); font-weight: normal;">(${student.reviewsCount} student reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-outline" id="profileBookmarkBtn" onclick="toggleStudentBookmark('${student.id}')">
                            ${isBookmarked(student.id) ? '📌 Bookmarked' : '🔖 Bookmark'}
                        </button>
                        <a href="request-session.html?studentId=${student.id}" class="btn btn-primary">Request Session 🤝</a>
                    </div>
                </div>
            </div>

            <div class="grid grid-2">
                <!-- Bio & Teachable Skills -->
                <div class="card">
                    <h3 style="margin-bottom: 12px; color: var(--primary);">About</h3>
                    <p style="line-height: 1.7; margin-bottom: 24px;">${student.bio}</p>

                    <h3 style="margin-bottom: 12px; color: var(--primary);">Skills ${student.name.split(' ')[0]} Can Teach</h3>
                    <div class="tag-group" style="justify-content: flex-start; margin-bottom: 24px;">
                        ${student.skillsTeach.map(s => `<span class="tag" style="padding: 6px 14px; font-size: 0.9rem;">💻 ${s}</span>`).join('')}
                    </div>

                    <h3 style="margin-bottom: 12px; color: var(--secondary);">Wants to Learn</h3>
                    <div class="tag-group" style="justify-content: flex-start;">
                        ${student.skillsLearn.map(s => `<span class="tag badge-purple" style="padding: 6px 14px; font-size: 0.9rem;">🚀 ${s}</span>`).join('')}
                    </div>
                </div>

                <!-- Peer Reviews -->
                <div class="card">
                    <h3 style="margin-bottom: 16px;">Student Reviews (${student.reviews.length})</h3>
                    ${student.reviews.length === 0 ? `
                        <p style="color: var(--text-muted);">No written reviews yet for ${student.name}. Be the first to learn and share feedback!</p>
                    ` : student.reviews.map(r => `
                        <div style="padding: 14px; background: var(--bg-page); border-radius: var(--radius-md); margin-bottom: 12px; border: 1px solid var(--border-color);">
                            <div class="flex-between" style="margin-bottom: 6px;">
                                <strong>${r.student}</strong>
                                <span style="color: #F59E0B; font-weight: 600;">⭐ ${r.rating}</span>
                            </div>
                            <p style="font-size: 0.9rem; color: var(--text-main);">${r.comment}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ----------------------------------------------------------------------
    // 2. MY PROFILE PAGE LOADER
    // ----------------------------------------------------------------------
    const myProfileContainer = document.getElementById('myProfileContainer');
    if (myProfileContainer) {
        const user = getCurrentUser();

        myProfileContainer.innerHTML = `
            <div class="card" style="margin-bottom: 24px;">
                <div class="flex-between" style="align-items: flex-start; flex-wrap: wrap; gap: 20px;">
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <div class="avatar avatar-lg" style="background: ${user.avatarBg};">${user.avatar}</div>
                        <div>
                            <h1 style="font-size: 1.75rem;">${user.name}</h1>
                            <p style="font-weight: 600; color: var(--primary); font-size: 1.05rem;">🎓 ${user.course} • ${user.year}</p>
                            <p style="font-size: 0.9rem; margin-top: 4px;">📧 ${user.email}</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <a href="edit-profile.html" class="btn btn-outline">Edit Profile ✏️</a>
                    </div>
                </div>
            </div>

            <div class="grid grid-2">
                <!-- Bio & Skills -->
                <div class="card">
                    <h3 style="margin-bottom: 12px;">Bio</h3>
                    <p style="line-height: 1.7; margin-bottom: 24px;">${user.bio}</p>

                    <div class="flex-between" style="margin-bottom: 12px;">
                        <h3>Skills I Can Teach</h3>
                    </div>
                    <div class="tag-group" style="justify-content: flex-start; margin-bottom: 24px;">
                        ${user.skillsTeach.map(s => `
                            <span class="tag" style="padding: 6px 14px; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 8px;">
                                💻 ${s.name} (${s.level})
                                <button onclick="removeTeachSkill('${s.id}')" style="border:none; background:none; cursor:pointer; color:var(--error); font-weight:bold;">×</button>
                            </span>
                        `).join('')}
                    </div>

                    <div class="flex-between" style="margin-bottom: 12px;">
                        <h3>Skills I Want to Learn</h3>
                    </div>
                    <div class="tag-group" style="justify-content: flex-start;">
                        ${user.skillsLearn.map(s => `
                            <span class="tag badge-purple" style="padding: 6px 14px; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 8px;">
                                🚀 ${s.name} (${s.level})
                                <button onclick="removeLearnSkill('${s.id}')" style="border:none; background:none; cursor:pointer; color:var(--error); font-weight:bold;">×</button>
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Add Skill Form Card -->
                <div class="card">
                    <h3 style="margin-bottom: 16px;">Manage Skills</h3>
                    
                    <form id="addSkillForm">
                        <div class="form-group">
                            <label class="form-label">Skill Type</label>
                            <select id="skillType" class="form-select">
                                <option value="teach">Skill I Can Teach</option>
                                <option value="learn">Skill I Want to Learn</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Skill Name</label>
                            <input type="text" id="newSkillName" class="form-input" placeholder="e.g. React Development, Figma, Python" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Proficiency Level</label>
                            <select id="newSkillLevel" class="form-select">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Add Skill ➕</button>
                    </form>
                </div>
            </div>
        `;

        // Handle Add Skill Submission
        const addSkillForm = document.getElementById('addSkillForm');
        if (addSkillForm) {
            addSkillForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const type = document.getElementById('skillType').value;
                const name = document.getElementById('newSkillName').value.trim();
                const level = document.getElementById('newSkillLevel').value;

                if (!name) return;

                const user = getCurrentUser();
                const newSkillItem = { id: 's_' + Date.now(), name, level, category: 'Development' };

                if (type === 'teach') {
                    user.skillsTeach.push(newSkillItem);
                } else {
                    user.skillsLearn.push(newSkillItem);
                }

                setCurrentUser(user);
                showToast(`Added ${name} to your profile!`, 'success');
                setTimeout(() => window.location.reload(), 800);
            });
        }
    }

    // ----------------------------------------------------------------------
    // 3. EDIT PROFILE FORM POPULATOR & SUBMITTER
    // ----------------------------------------------------------------------
    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        const user = getCurrentUser();

        document.getElementById('editName').value = user.name || '';
        document.getElementById('editBio').value = user.bio || '';
        document.getElementById('editCourse').value = user.course || 'B.Tech CSE';
        document.getElementById('editYear').value = user.year || '3rd Year';

        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();

            user.name = document.getElementById('editName').value.trim();
            user.bio = document.getElementById('editBio').value.trim();
            user.course = document.getElementById('editCourse').value;
            user.year = document.getElementById('editYear').value;

            setCurrentUser(user);
            showToast('Profile updated successfully! ✨', 'success');

            setTimeout(() => {
                window.location.href = 'my-profile.html';
            }, 1000);
        });
    }

    // ----------------------------------------------------------------------
    // 4. BOOKMARKS PAGE RENDERER
    // ----------------------------------------------------------------------
    const bookmarksGrid = document.getElementById('bookmarksGrid');
    if (bookmarksGrid) {
        renderBookmarks();
    }
});

// Remove skill helpers
function removeTeachSkill(skillId) {
    const user = getCurrentUser();
    user.skillsTeach = user.skillsTeach.filter(s => s.id !== skillId);
    setCurrentUser(user);
    showToast('Skill removed', 'info');
    setTimeout(() => window.location.reload(), 600);
}

function removeLearnSkill(skillId) {
    const user = getCurrentUser();
    user.skillsLearn = user.skillsLearn.filter(s => s.id !== skillId);
    setCurrentUser(user);
    showToast('Skill removed', 'info');
    setTimeout(() => window.location.reload(), 600);
}

// Bookmark toggle helper for profile page
function toggleStudentBookmark(studentId) {
    const isNowBookmarked = toggleBookmark(studentId);
    const btn = document.getElementById('profileBookmarkBtn');
    if (btn) {
        btn.innerHTML = isNowBookmarked ? '📌 Bookmarked' : '🔖 Bookmark';
    }
}

// Render bookmarks page
function renderBookmarks() {
    const bookmarksGrid = document.getElementById('bookmarksGrid');
    if (!bookmarksGrid) return;

    const bookmarkedIds = getBookmarks();
    const allStudents = getStudents();
    const bookmarkedStudents = allStudents.filter(s => bookmarkedIds.includes(s.id));

    if (bookmarkedStudents.length === 0) {
        bookmarksGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <span class="empty-icon">📌</span>
                <h3 class="empty-title">No bookmarks yet</h3>
                <p class="empty-desc">Find students you want to connect with and save them here for quick access.</p>
                <a href="explore.html" class="btn btn-primary" style="margin-top: 12px;">Explore Students & Skills</a>
            </div>
        `;
    } else {
        bookmarksGrid.innerHTML = bookmarkedStudents.map(student => `
            <article class="card student-card">
                <div class="avatar" style="background: ${student.avatarBg};">${student.avatar}</div>
                <h3 class="student-name">${student.name}</h3>
                <p class="student-role">${student.role} • ${student.course}</p>
                <div style="margin: 8px 0; color: #F59E0B; font-weight: 600;">⭐ ${student.rating}</div>
                <div class="tag-group">
                    ${student.skillsTeach.map(s => `<span class="tag">${s}</span>`).join('')}
                </div>
                <div class="flex-between" style="width: 100%; margin-top: 16px; gap: 8px;">
                    <a href="student-profile.html?id=${student.id}" class="btn btn-outline btn-sm" style="flex: 1;">View Profile</a>
                    <button class="btn btn-danger btn-sm" onclick="removeBookmarkItem('${student.id}')" title="Remove Bookmark">Remove 🗑️</button>
                </div>
            </article>
        `).join('');
    }
}

function removeBookmarkItem(studentId) {
    toggleBookmark(studentId);
    renderBookmarks();
}
