/* ==========================================================================
   CAMPUS SKILL HUB — SKILLS DISCOVERY & SEARCH SCRIPT (JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. EXPLORE PAGE CATEGORY & SEARCH FILTERING
    // ----------------------------------------------------------------------
    const searchInput = document.getElementById('skillSearch');
    const categoryPills = document.querySelectorAll('.category-pills .pill');
    const skillsGrid = document.getElementById('exploreSkillsGrid');
    const studentsGrid = document.getElementById('exploreStudentsGrid');

    if (skillsGrid || studentsGrid) {
        let currentCategory = 'all';
        let currentSearchQuery = '';

        function renderExploreContent() {
            const skills = getSkills();
            const students = getStudents();

            // Filter Skills
            const filteredSkills = skills.filter(skill => {
                const matchesCategory = currentCategory === 'all' || skill.category.toLowerCase() === currentCategory.toLowerCase();
                const matchesSearch = skill.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) || skill.description.toLowerCase().includes(currentSearchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            // Filter Students
            const filteredStudents = students.filter(student => {
                const studentSkills = student.skillsTeach.join(' ').toLowerCase();
                const matchesCategory = currentCategory === 'all' || studentSkills.includes(currentCategory.toLowerCase());
                const matchesSearch = student.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) || studentSkills.includes(currentSearchQuery.toLowerCase()) || student.role.toLowerCase().includes(currentSearchQuery.toLowerCase());
                return matchesSearch;
            });

            // Render Skills Grid
            if (skillsGrid) {
                if (filteredSkills.length === 0) {
                    skillsGrid.innerHTML = `
                        <div class="empty-state" style="grid-column: 1 / -1;">
                            <span class="empty-icon">🔍</span>
                            <h3 class="empty-title">No skills match your search</h3>
                            <p class="empty-desc">Try selecting a different category or search for another keyword.</p>
                        </div>
                    `;
                } else {
                    skillsGrid.innerHTML = filteredSkills.map(skill => `
                        <article class="card skill-card">
                            <div class="skill-icon-wrapper">
                                <span class="skill-icon">${getSkillEmoji(skill.category)}</span>
                            </div>
                            <h3 class="skill-title">${skill.name}</h3>
                            <p class="skill-description">${skill.description}</p>
                            <div class="flex-between" style="margin-top: 16px; width: 100%;">
                                <span class="badge badge-purple">${skill.studentsCount} Students Teaching</span>
                                <a href="skill-detail.html?name=${encodeURIComponent(skill.name)}" class="btn btn-outline btn-sm">Explore</a>
                            </div>
                        </article>
                    `).join('');
                }
            }

            // Render Students Grid
            if (studentsGrid) {
                if (filteredStudents.length === 0) {
                    studentsGrid.innerHTML = `
                        <div class="empty-state" style="grid-column: 1 / -1;">
                            <span class="empty-icon">🎓</span>
                            <h3 class="empty-title">No students found</h3>
                            <p class="empty-desc">No campus peers match the search filters right now.</p>
                        </div>
                    `;
                } else {
                    studentsGrid.innerHTML = filteredStudents.map(student => `
                        <article class="card student-card">
                            <div class="avatar" style="background: ${student.avatarBg};">${student.avatar}</div>
                            <h3 class="student-name">${student.name}</h3>
                            <p class="student-role">${student.role} • ${student.course}</p>
                            <div style="margin: 8px 0; color: #F59E0B; font-weight: 600; font-size: 0.9rem;">
                                ⭐ ${student.rating} <span style="color: var(--text-muted); font-weight: normal;">(${student.reviewsCount} reviews)</span>
                            </div>
                            <div class="tag-group">
                                ${student.skillsTeach.map(s => `<span class="tag">${s}</span>`).join('')}
                            </div>
                            <div class="flex-between" style="width: 100%; margin-top: 16px; gap: 8px;">
                                <a href="student-profile.html?id=${student.id}" class="btn btn-outline btn-sm" style="flex: 1;">View Profile</a>
                                <button class="btn btn-ghost btn-sm bookmark-btn" onclick="handleBookmarkClick(event, '${student.id}')">
                                    ${isBookmarked(student.id) ? '📌' : '🔖'}
                                </button>
                            </div>
                        </article>
                    `).join('');
                }
            }
        }

        // Attach listeners
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearchQuery = e.target.value;
                renderExploreContent();
            });
        }

        categoryPills.forEach(pill => {
            pill.addEventListener('click', () => {
                categoryPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentCategory = pill.getAttribute('data-category') || 'all';
                renderExploreContent();
            });
        });

        // Initial Render
        renderExploreContent();
    }

    // ----------------------------------------------------------------------
    // 2. SKILL DETAILS PAGE LOADER
    // ----------------------------------------------------------------------
    const skillTitleEl = document.getElementById('skillDetailTitle');
    if (skillTitleEl) {
        const urlParams = new URLSearchParams(window.location.search);
        const skillName = urlParams.get('name') || 'React Development';

        skillTitleEl.textContent = skillName;

        const students = getStudents();
        const matchingStudents = students.filter(s => s.skillsTeach.some(st => st.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(st.toLowerCase())));

        const container = document.getElementById('skillStudentsList');
        if (container) {
            if (matchingStudents.length === 0) {
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <span class="empty-icon">🎓</span>
                        <h3 class="empty-title">No direct matches for ${skillName} yet</h3>
                        <p class="empty-desc">Check out our featured developers and designers offering related skills.</p>
                    </div>
                `;
            } else {
                container.innerHTML = matchingStudents.map(student => `
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
                            <a href="request-session.html?studentId=${student.id}&skill=${encodeURIComponent(skillName)}" class="btn btn-primary btn-sm" style="flex: 1;">Request Session</a>
                        </div>
                    </article>
                `).join('');
            }
        }
    }

    // ----------------------------------------------------------------------
    // 3. REQUEST SESSION FORM HANDLER
    // ----------------------------------------------------------------------
    const requestForm = document.getElementById('requestSessionForm');
    if (requestForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const studentId = urlParams.get('studentId') || 'u2';
        const defaultSkill = urlParams.get('skill') || 'React Development';

        const students = getStudents();
        const targetStudent = students.find(s => s.id === studentId) || students[0];

        // Populate Form Metadata
        document.getElementById('targetStudentName').textContent = targetStudent.name;
        document.getElementById('targetStudentRole').textContent = `${targetStudent.role} • ${targetStudent.course}`;
        document.getElementById('targetAvatar').textContent = targetStudent.avatar;
        document.getElementById('targetAvatar').style.background = targetStudent.avatarBg;
        
        const skillSelect = document.getElementById('requestSkill');
        if (skillSelect) {
            skillSelect.innerHTML = targetStudent.skillsTeach.map(s => `<option value="${s}" ${s.toLowerCase() === defaultSkill.toLowerCase() ? 'selected' : ''}>${s}</option>`).join('');
        }

        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const selectedSkill = document.getElementById('requestSkill').value;
            const date = document.getElementById('requestDate').value;
            const time = document.getElementById('requestTime').value;
            const mode = document.getElementById('requestMode').value;
            const message = document.getElementById('requestMessage').value.trim();

            if (!date || !time) {
                showToast('Please select both a date and time for the learning session.', 'warning');
                return;
            }

            const newRequest = {
                id: 'req_' + Date.now(),
                studentName: targetStudent.name,
                studentId: targetStudent.id,
                avatar: targetStudent.avatar,
                avatarBg: targetStudent.avatarBg,
                skill: selectedSkill,
                date: date,
                time: time,
                mode: mode,
                message: message || `Hi ${targetStudent.name}, I would love to connect and learn ${selectedSkill} from you!`,
                status: 'pending',
                createdAt: new Date().toISOString().split('T')[0]
            };

            const requests = getRequests();
            requests.unshift(newRequest);
            saveRequests(requests);

            // Add notification
            const notifs = getNotifications();
            notifs.unshift({
                id: Date.now(),
                text: `You sent a ${selectedSkill} learning request to ${targetStudent.name}.`,
                time: 'Just now',
                read: false,
                icon: '🚀'
            });
            saveNotifications(notifs);

            showToast('Your learning request has been sent successfully! 🎉', 'success');

            setTimeout(() => {
                window.location.href = 'requests.html';
            }, 1200);
        });
    }
});

// Helper Emoji Provider for categories
function getSkillEmoji(category) {
    const emojis = {
        'Development': '💻',
        'Design': '🎨',
        'Media': '🎬',
        'Business': '📊',
        'Music': '🎵',
        'Communication': '💬',
        'Sports': '⚽',
        'Other': '✨'
    };
    return emojis[category] || '🎓';
}

// Global Bookmark Handler
function handleBookmarkClick(event, studentId) {
    event.preventDefault();
    const isBookmarkedNow = toggleBookmark(studentId);
    const btn = event.currentTarget;
    if (btn) {
        btn.innerHTML = isBookmarkedNow ? '📌' : '🔖';
    }
}
