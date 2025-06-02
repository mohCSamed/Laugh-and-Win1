<script>
// Sample jokes data
let jokes = [
    {
        id: 1,
        text: "ليه الكومبيوتر راح للدكتور؟ عشان عنده فيروس! 😂",
        author: "أحمد الكوميدي",
        time: "منذ ساعتين",
        likes: 45,
        dislikes: 2,
        comments: 12
    },
    {
        id: 2,
        text: "إيه الفرق بين البحر والنهر؟ البحر مالح والنهر عذب... والاتنين مش بيشربوا شاي! ☕",
        author: "سارة المضحكة",
        time: "منذ 4 ساعات",
        likes: 38,
        dislikes: 1,
        comments: 8
    },
    {
        id: 3,
        text: "واحد قال لصاحبه: أنا بشتغل في البنك. قاله: إيه شغلك؟ قاله: بعد الفلوس! 💰",
        author: "محمد الضاحك",
        time: "منذ 6 ساعات",
        likes: 52,
        dislikes: 0,
        comments: 15
    }
];

let currentUser = {
    name: "محمد أحمد",
    points: 850,
    jokesCount: 25,
    rank: 3
};

let isDarkMode = false;
let dailyJokeAdded = false;

// Initialize app
function initApp() {
    loadJokes();
    checkDarkMode();
}

// Load jokes into feed
function loadJokes() {
    const jokesFeed = document.getElementById('jokesFeed');
    jokesFeed.innerHTML = '';

    jokes.forEach(joke => {
        const jokeCard = createJokeCard(joke);
        jokesFeed.appendChild(jokeCard);
    });
}

// Create joke card element
function createJokeCard(joke) {
    const card = document.createElement('div');
    card.className = 'joke-card fade-in';
    card.innerHTML = `
        <div class="joke-header">
            <div class="user-info">
                <div class="user-avatar">${joke.author.charAt(0)}</div>
                <div>
                    <div class="user-name">${joke.author}</div>
                    <div class="joke-time">${joke.time}</div>
                </div>
            </div>
            <button class="action-btn" onclick="reportJoke(${joke.id})">🚩</button>
        </div>
        <div class="joke-text">${joke.text}</div>
        <div class="joke-actions">
            <div class="action-buttons">
                <button class="action-btn like" onclick="likeJoke(${joke.id})">
                    👍 <span>${joke.likes}</span>
                </button>
                <button class="action-btn dislike" onclick="dislikeJoke(${joke.id})">
                    👎 <span>${joke.dislikes}</span>
                </button>
                <button class="action-btn comment" onclick="commentJoke(${joke.id})">
                    💬 <span>${joke.comments}</span>
                </button>
            </div>
            <div class="stats">
                <span>النقاط: ${(joke.likes * 50) - joke.dislikes}</span>
            </div>
        </div>
    `;
    return card;
}

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.main-content');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionName).classList.add('active');

    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');

    // Close sidebar if open
    document.getElementById('sidebar').classList.remove('active');
}

// Sidebar functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Dark mode functions
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        toggle.classList.toggle('active');
    }
    
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        showNotification('تم تفعيل الوضع الليلي 🌙');
    } else {
        showNotification('تم إلغاء الوضع الليلي ☀️');
    }
}

function checkDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.classList.add('active');
        }
    }
}

// Joke interaction functions
function likeJoke(jokeId) {
    const joke = jokes.find(j => j.id === jokeId);
    if (joke) {
        joke.likes++;
        loadJokes();
        showNotification('تم الإعجاب! +50 نقطة لصاحب النكتة 👍');
    }
}

function dislikeJoke(jokeId) {
    const joke = jokes.find(j => j.id === jokeId);
    if (joke) {
        joke.dislikes++;
        loadJokes();
        showNotification('تم عدم الإعجاب 👎');
    }
}

function commentJoke(jokeId) {
    const comment = prompt('اكتب تعليقك:');
    if (comment && comment.trim()) {
        const joke = jokes.find(j => j.id === jokeId);
        if (joke) {
            joke.comments++;
            loadJokes();
            showNotification('تم إضافة التعليق! +5 نقاط لك 💬');
        }
    }
}

function reportJoke(jokeId) {
    if (confirm('هل تريد الإبلاغ عن هذه النكتة؟')) {
        showNotification('تم الإبلاغ. سيتم مراجعة المحتوى 🚩');
    }
}

// Add joke functions
function updateCharCounter() {
    const input = document.getElementById('jokeInput');
    const counter = document.getElementById('charCounter');
    const length = input.value.length;
    counter.textContent = `${length}/200`;
    
    if (length > 180) {
        counter.style.color = '#e74c3c';
    } else if (length > 150) {
        counter.style.color = '#f39c12';
    } else {
        counter.style.color = 'rgba(255, 255, 255, 0.7)';
    }
}

function updateNewJokeCounter() {
    const input = document.getElementById('newJokeInput');
    const counter = document.getElementById('newJokeCounter');
    const length = input.value.length;
    counter.textContent = `${length}/200`;
    
    if (length > 180) {
        counter.style.color = '#e74c3c';
    } else if (length > 150) {
        counter.style.color = '#f39c12';
    } else {
        counter.style.color = 'rgba(255, 255, 255, 0.7)';
    }
}

function addJoke() {
    const input = document.getElementById('jokeInput');
    const text = input.value.trim();
    
    if (!text) {
        showNotification('يرجى كتابة نكتة أولاً! 📝', 'error');
        return;
    }
    
    if (dailyJokeAdded) {
        showNotification('لقد أضفت نكتتك اليومية بالفعل! عد غداً 📅', 'error');
        return;
    }
    
    const newJoke = {
        id: jokes.length + 1,
        text: text,
        author: currentUser.name,
        time: 'الآن',
        likes: 0,
        dislikes: 0,
        comments: 0
    };
    
    jokes.unshift(newJoke);
    loadJokes();
    input.value = '';
    updateCharCounter();
    dailyJokeAdded = true;
    
    showNotification('تم نشر نكتتك بنجاح! 🎉', 'success');
}

function addNewJoke() {
    const input = document.getElementById('newJokeInput');
    const text = input.value.trim();
    
    if (!text) {
        showNotification('يرجى كتابة نكتة أولاً! 📝', 'error');
        return;
    }
    
    if (dailyJokeAdded) {
        showNotification('لقد أضفت نكتتك اليومية بالفعل! عد غداً 📅', 'error');
        return;
    }
    
    const newJoke = {
        id: jokes.length + 1,
        text: text,
        author: currentUser.name,
        time: 'الآن',
        likes: 0,
        dislikes: 0,
        comments: 0
    };
    
    jokes.unshift(newJoke);
    input.value = '';
    updateNewJokeCounter();
    dailyJokeAdded = true;
    
    showNotification('تم نشر نكتتك بنجاح! 🎉', 'success');
    showSection('home');
}

// Settings functions
function toggleNotifications() {
    event.target.classList.toggle('active');
    const isActive = event.target.classList.contains('active');
    showNotification(isActive ? 'تم تفعيل الإشعارات 🔔' : 'تم إلغاء الإشعارات 🔕');
}

function changePassword() {
    const newPassword = prompt('أدخل كلمة المرور الجديدة:');
    if (newPassword && newPassword.length >= 6) {
        showNotification('تم تغيير كلمة المرور بنجاح! 🔐', 'success');
    } else if (newPassword) {
        showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل! ❌', 'error');
    }
}

function editWallet() {
    const walletNumber = prompt('أدخل رقم المحفظة الجديد:');
    if (walletNumber && walletNumber.length >= 10) {
        showNotification('تم تحديث رقم المحفظة بنجاح! 💳', 'success');
    } else if (walletNumber) {
        showNotification('رقم المحفظة غير صحيح! ❌', 'error');
    }
}

// Sidebar functions
function rateApp() {
    if (confirm('هل تريد تقييم التطبيق على متجر التطبيقات؟')) {
        showNotification('شكراً لك! سيتم توجيهك لمتجر التطبيقات ⭐');
    }
    toggleSidebar();
}

function logout() {
    if (confirm('هل تريد تسجيل الخروج؟')) {
        showNotification('تم تسجيل الخروج بنجاح! 👋');
        // Here you would redirect to login page
    }
    toggleSidebar();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;

    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Auto dark mode based on time
function autoCheckDarkMode() {
    const hour = new Date().getHours();
    const shouldBeDark = hour >= 20 || hour <= 6;
    
    if (shouldBeDark && !isDarkMode) {
        toggleDarkMode();
    } else if (!shouldBeDark && isDarkMode && localStorage.getItem('manualDarkMode') !== 'true') {
        toggleDarkMode();
    }
}

// Joke filtering and sorting
function sortJokes(method) {
    switch(method) {
        case 'newest':
            jokes.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
            jokes.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
            break;
        case 'most-commented':
            jokes.sort((a, b) => b.comments - a.comments);
            break;
    }
    loadJokes();
}

// Daily reset function
function checkDailyReset() {
    const lastReset = localStorage.getItem('lastReset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
        dailyJokeAdded = false;
        localStorage.setItem('lastReset', today);
        showNotification('يوم جديد! يمكنك إضافة نكتة جديدة اليوم 🌅');
    }
}

// Achievement system
function checkAchievements() {
    const userJokes = jokes.filter(joke => joke.author === currentUser.name);
    const totalLikes = userJokes.reduce((sum, joke) => sum + joke.likes, 0);
    
    if (userJokes.length === 10) {
        showNotification('🏆 تهانينا! حصلت على إنجاز "كاتب النكت"!');
    }
    
    if (totalLikes >= 100) {
        showNotification('🌟 تهانينا! حصلت على إنجاز "محبوب الجمهور"!');
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    checkDailyReset();
    
    // Auto check dark mode every hour
    setInterval(autoCheckDarkMode, 3600000);
    
    // Check achievements periodically
    setInterval(checkAchievements, 10000);
});

// Add CSS for fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Handle navigation clicks properly
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const sectionName = this.onclick.toString().match(/showSection\('(.+?)'\)/)[1];
        showSection(sectionName);
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Close sidebar when clicking outside
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Prevent sidebar from closing when clicking inside it
document.getElementById('sidebar').addEventListener('click', function(e) {
    e.stopPropagation();
});
</script>