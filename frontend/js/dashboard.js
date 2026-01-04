/* CampusConnect Dashboard Logic */

// Mock Data
const MOCK_QUESTIONS = [
    {
        id: 1,
        title: "How to implement recursion in C++?",
        desc: "I'm struggling to understand the base case in recursive functions...",
        tags: ["C++", "Algorithms"],
        time: "2 hours ago",
        answers: 5,
        votes: 12
    },
    {
        id: 2,
        title: "Best resources for Machine Learning?",
        desc: "Looking for beginner friendly tutorials for Python based ML...",
        tags: ["Python", "ML"],
        time: "5 hours ago",
        answers: 8,
        votes: 34
    }
];

const MOCK_PROJECTS = [
    {
        id: 101,
        title: "Smart Attendance System",
        desc: "Automated attendance using face recognition.",
        difficulty: "Intermediate",
        tech: ["Python", "OpenCV"],
        branch: "CSE",
        year: "3"
    },
    {
        id: 102,
        title: "E-Commerce Website",
        desc: "Full stack MERN application for college store.",
        difficulty: "Advanced",
        tech: ["React", "Node.js"],
        branch: "CSE",
        year: "4"
    }
];

const USER_PROFILE = {
    name: "Sai Kumar",
    branch: "Computer Science",
    year: "3rd Year",
    rank: "Expert",
    points: 1250,
    questions: 15,
    answers: 42
};

document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Login ---
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
    });

    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('pageTitle');

    function switchSection(sectionId) {
        // Update Title
        const activeNav = document.querySelector(`.nav-item[data-target="${sectionId}"]`);
        if (activeNav) {
            pageTitle.textContent = activeNav.querySelector('.nav-text').textContent;

            // Update Active State
            navItems.forEach(n => n.classList.remove('active'));
            activeNav.classList.add('active');
        }

        // Show Section
        sections.forEach(s => s.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            switchSection(target);

            // Specific Loaders
            if (target === 'home') loadQuestions();
            if (target === 'projects') loadProjects();
            if (target === 'profile') loadProfile();
        });
    });

    // --- Initial Load ---
    switchSection('home');
    loadQuestions();

    // --- Feature Implementations ---

    function loadQuestions() {
        const container = document.getElementById('questionsList');
        container.innerHTML = '';

        MOCK_QUESTIONS.forEach(q => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-header">
                    <div class="item-title">${q.title}</div>
                    <small>${q.time}</small>
                </div>
                <p>${q.desc}</p>
                <div class="item-meta" style="margin-top: 10px;">
                    ${q.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="item-actions">
                    <button class="action-btn" onclick="handleUpvote(this)">
                        <span>▲</span> ${q.votes}
                    </button>
                    <button class="action-btn">
                        <span>💬</span> ${q.answers} Answers
                    </button>
                    <button class="action-btn" onclick="handleSave(${q.id}, 'question', this)">
                        <span>🔖</span> Save
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function loadProjects() {
        const container = document.getElementById('projectsList');
        container.innerHTML = ''; // Clear current

        // Simple filter logic could go here based on dropdowns

        MOCK_PROJECTS.forEach(p => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-header">
                    <div class="item-title">${p.title}</div>
                    <span class="tag" style="background:#e8f5e9; color:#2e7d32;">${p.difficulty}</span>
                </div>
                <p>${p.desc}</p>
                 <div class="item-meta" style="margin-top: 10px;">
                    ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="item-actions">
                     <button class="action-btn" onclick="handleSave(${p.id}, 'project', this)">
                        <span>🔖</span> Save Project
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function loadProfile() {
        document.getElementById('profileName').textContent = USER_PROFILE.name;
        document.getElementById('profileDetails').textContent = `${USER_PROFILE.branch} | ${USER_PROFILE.year}`;
        document.getElementById('statPoints').textContent = USER_PROFILE.points;
        document.getElementById('statRank').textContent = USER_PROFILE.rank;
        document.getElementById('statQuestions').textContent = USER_PROFILE.questions;
    }

    // --- Feedback Form Logic ---
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = document.getElementById('fbSubject').value.trim();
            const message = document.getElementById('fbMessage').value.trim();

            if (subject.length < 5) {
                alert('Subject must be at least 5 characters.');
                return;
            }
            if (message.length < 10) {
                alert('Message must be at least 10 characters.');
                return;
            }

            // Mock submission
            alert('Feedback submitted successfully!');
            feedbackForm.reset();
        });
    }
});

// Global Handlers (for onclick attributes)
window.handleUpvote = (btn) => {
    // Parse current count, increment, update UI
    const textNode = btn.childNodes[2]; // after span
    let count = parseInt(textNode.textContent.trim());
    count++;
    textNode.textContent = ` ${count}`;
    btn.classList.add('active'); // Visual feedback
    // In real app, send API request here
};

window.handleSave = (id, type, btn) => {
    const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
    const item = { id, type, date: new Date().toISOString() };

    // Check if already saved
    if (!savedItems.some(i => i.id === id && i.type === type)) {
        savedItems.push(item);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        btn.textContent = 'Saved!';
        btn.classList.add('active');
    } else {
        alert('Already saved!');
    }
};
