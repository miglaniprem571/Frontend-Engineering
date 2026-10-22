/* ==========================================================================
   CAMPUS SKILL HUB — REQUESTS & SESSION MANAGEMENT SCRIPT (JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. MY REQUESTS TAB FILTERING & RENDERER
    // ----------------------------------------------------------------------
    const requestsContainer = document.getElementById('requestsListContainer');
    const tabBtns = document.querySelectorAll('.request-tabs .pill');

    if (requestsContainer) {
        let activeTab = 'all';

        function renderRequestsList() {
            const requests = getRequests();
            const filteredRequests = requests.filter(r => {
                if (activeTab === 'all') return true;
                return r.status === activeTab;
            });

            if (filteredRequests.length === 0) {
                requestsContainer.innerHTML = `
                    <div class="empty-state">
                        <span class="empty-icon">📂</span>
                        <h3 class="empty-title">You're all caught up!</h3>
                        <p class="empty-desc">No ${activeTab === 'all' ? '' : activeTab} requests found in your account.</p>
                        <a href="explore.html" class="btn btn-primary" style="margin-top: 12px;">Find Skills to Learn</a>
                    </div>
                `;
                return;
            }

            requestsContainer.innerHTML = filteredRequests.map(req => `
                <div class="card" style="margin-bottom: 16px; padding: 20px;">
                    <div class="flex-between" style="flex-wrap: wrap; gap: 16px;">
                        <div style="display: flex; gap: 16px; align-items: center;">
                            <div class="avatar" style="background: ${req.avatarBg || 'var(--primary)'}">${req.avatar}</div>
                            <div>
                                <h3 style="font-size: 1.1rem;">${req.studentName}</h3>
                                <p style="font-weight: 600; color: var(--primary); font-size: 0.925rem;">Skill: ${req.skill}</p>
                                <p style="font-size: 0.85rem; color: var(--text-muted);">📅 ${req.date} at ${req.time} • ${req.mode}</p>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span class="badge ${getStatusBadgeClass(req.status)}">${req.status.toUpperCase()}</span>
                            <a href="session-detail.html?id=${req.id}" class="btn btn-outline btn-sm">View Details</a>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeTab = btn.getAttribute('data-tab') || 'all';
                renderRequestsList();
            });
        });

        renderRequestsList();
    }

    // ----------------------------------------------------------------------
    // 2. SESSION DETAIL PAGE LOADER
    // ----------------------------------------------------------------------
    const sessionDetailContainer = document.getElementById('sessionDetailContainer');
    if (sessionDetailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const reqId = urlParams.get('id') || 'req1';

        const requests = getRequests();
        const req = requests.find(r => r.id === reqId) || requests[0];

        sessionDetailContainer.innerHTML = `
            <div class="card" style="max-width: 720px; margin: 0 auto;">
                <div class="flex-between" style="border-bottom: 1px solid var(--border-color); padding-bottom: 16px; margin-bottom: 20px;">
                    <h2>Session Details</h2>
                    <span class="badge ${getStatusBadgeClass(req.status)}">${req.status.toUpperCase()}</span>
                </div>

                <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 24px;">
                    <div class="avatar avatar-lg" style="background: ${req.avatarBg};">${req.avatar}</div>
                    <div>
                        <h3 style="font-size: 1.35rem;">Session with ${req.studentName}</h3>
                        <p style="font-weight: 600; color: var(--primary); font-size: 1.05rem;">Skill: ${req.skill}</p>
                    </div>
                </div>

                <div class="grid grid-2" style="background: var(--bg-page); padding: 20px; border-radius: var(--radius-md); margin-bottom: 24px;">
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-muted);">Scheduled Date</span>
                        <p style="font-weight: 600; font-size: 1rem;">📅 ${req.date}</p>
                    </div>
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-muted);">Scheduled Time</span>
                        <p style="font-weight: 600; font-size: 1rem;">⏰ ${req.time}</p>
                    </div>
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-muted);">Learning Mode</span>
                        <p style="font-weight: 600; font-size: 1rem;">📍 ${req.mode}</p>
                    </div>
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-muted);">Request ID</span>
                        <p style="font-weight: 600; font-size: 1rem;">#${req.id}</p>
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <h4 style="margin-bottom: 8px;">Request Note</h4>
                    <p style="background: var(--bg-page); padding: 14px; border-radius: var(--radius-sm); font-size: 0.95rem;">
                        "${req.message || 'No additional note provided.'}"
                    </p>
                </div>

                ${req.status === 'accepted' ? `
                    <div class="flex-between" style="gap: 16px;">
                        <button class="btn btn-outline" onclick="window.history.back()">Back</button>
                        <button class="btn btn-primary" onclick="markSessionCompleted('${req.id}')">Mark as Completed ✅</button>
                    </div>
                ` : req.status === 'completed' ? `
                    <div style="background: var(--success-light); color: #15803D; padding: 16px; border-radius: var(--radius-md); text-align: center; font-weight: 600;">
                        🎉 Session Completed! Feedback has been recorded.
                    </div>
                ` : `
                    <div class="flex-between">
                        <button class="btn btn-outline" onclick="window.history.back()">Back</button>
                    </div>
                `}
            </div>
        `;
    }

    // ----------------------------------------------------------------------
    // 3. FEEDBACK FORM SUBMITTER HANDLER
    // ----------------------------------------------------------------------
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        let selectedRating = 5;
        const starBtns = document.querySelectorAll('.star-rating button');

        starBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                selectedRating = parseInt(btn.getAttribute('data-star'));
                starBtns.forEach(b => {
                    const bVal = parseInt(b.getAttribute('data-star'));
                    b.style.color = bVal <= selectedRating ? '#F59E0B' : 'var(--border-color)';
                });
            });
        });

        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reviewText = document.getElementById('reviewComment').value.trim();
            const reqId = document.getElementById('feedbackReqId').value;

            // Update request status
            const requests = getRequests();
            const req = requests.find(r => r.id === reqId);
            if (req) {
                req.status = 'completed';
                req.rating = selectedRating;
                req.review = reviewText;
                saveRequests(requests);
            }

            showToast('Thank you for your feedback! Rating saved. ⭐', 'success');
            const modal = document.getElementById('feedbackModal');
            if (modal) modal.classList.remove('active');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    }
});

function getStatusBadgeClass(status) {
    if (status === 'accepted') return 'badge-success';
    if (status === 'pending') return 'badge-warning';
    if (status === 'completed') return 'badge-purple';
    if (status === 'rejected') return 'badge-danger';
    return 'badge-info';
}

function markSessionCompleted(reqId) {
    const modal = document.getElementById('feedbackModal');
    const input = document.getElementById('feedbackReqId');
    if (modal && input) {
        input.value = reqId;
        modal.classList.add('active');
    } else {
        const requests = getRequests();
        const req = requests.find(r => r.id === reqId);
        if (req) {
            req.status = 'completed';
            saveRequests(requests);
            showToast('Session marked as completed! 🎉', 'success');
            setTimeout(() => window.location.reload(), 800);
        }
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) modal.classList.remove('active');
}
