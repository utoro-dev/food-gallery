document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    fetch('https://script.google.com/macros/s/AKfycby9lEogNAVpNMi_J6v6QdNtLi69e4pm478tDnqtn18-ICA58c_OY6cRU3EoMdk07qcc/exec')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            createImageElement(item.photoUrl, item.comment);
        });
    })
    .catch(error => console.error('Error:', error));
}

function createImageElement(url, comment) {
    const gallery = document.getElementById('gallery');
    const container = document.createElement('div');
    container.className = 'image-container';

    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Submitted Photo';
    container.appendChild(img);

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.textContent = comment;
    container.appendChild(commentDiv);

    gallery.appendChild(container);
}

// This JavaScript function should now work correctly with the updated CSS
function setupHoverEffect() {
    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.querySelector('.comment').style.display = 'flex';
        });
        container.addEventListener('mouseleave', function() {
            this.querySelector('.comment').style.display = 'none';
        });
    });
}

setupHoverEffect();

