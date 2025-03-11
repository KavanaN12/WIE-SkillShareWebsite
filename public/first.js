// Featured videos data
const featuredVideos = [
    {
        title: "Introduction to Web Development",
        instructor: "Sarah Johnson",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        duration: "15:30",
        youtubeUrl: "https://youtube.com/watch?v=example1"
    },
    {
        title: "Beginner's Guide to Knitting",
        instructor: "Emma Thompson",
        thumbnail: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        duration: "20:45",
        youtubeUrl: "https://youtube.com/watch?v=example2"
    },
    {
        title: "Mastering Italian Cuisine",
        instructor: "Maria Garcia",
        thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        duration: "25:15",
        youtubeUrl: "https://youtube.com/watch?v=example3"
    }
];

// Populate featured videos
function populateFeaturedVideos() {
    const videoGrid = document.getElementById('videoGrid');
    
    featuredVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-instructor">by ${video.instructor}</p>
                <a href="${video.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="watch-btn">
                    Watch on YouTube
                </a>
            </div>
        `;
        
        videoGrid.appendChild(videoCard);
    });
}

// Modal functionality
const modal = document.getElementById('signInModal');
const signInLink = document.querySelector('.sign-in-link');
const closeBtn = document.querySelector('.close-btn');
const signInForm = document.getElementById('signInForm');

signInLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically handle authentication
    console.log('Sign in attempt:', { email, password });
    
    // For demo purposes, just close the modal
    modal.style.display = 'none';
    signInForm.reset();
});

// Category card click handlers
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        // Here you would typically handle category navigation
        console.log('Category clicked:', category);
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateFeaturedVideos();
});