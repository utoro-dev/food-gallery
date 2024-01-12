var lastTimestamp = "2000-01-01T00:00:00.000Z"; // A default past date for initial load

document.addEventListener('DOMContentLoaded', function() {
    fetchData();
    setInterval(fetchData, 30000); // Fetch new data every 30 seconds
});

function fetchData() {
    fetch('https://script.google.com/macros/s/AKfycbzKsxYYPrlv1xAlr0zSRXu9Cp48sEDR5EN1vmmifdCMuOEcO_ZFx45foF48Ap5cg5Vn/exec?timestamp=' + encodeURIComponent(lastTimestamp))
    .then(response => response.json())
    .then(data => {
        console.log("Received data:", data);
        if (data.length > 0) {
            // Update the lastTimestamp with the newest timestamp from data
            lastTimestamp = data[0].timestamp;
        }
        data.forEach(item => {
            createImageElement(item.id, item.photoUrl, item.comment);
        });
    })
    .catch(error => console.error('Error:', error));
}

function createImageElement(id, url, comment) {
    const gallery = document.getElementById('gallery');

    if (document.querySelector(`[data-id="${id}"]`)) {
        return; // Image already present, do nothing
    }

    const container = document.createElement('div');
    container.className = 'image-container flash'; // Add 'fadeIn' class here
    container.setAttribute('data-id', id);

    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Submitted Photo';
    container.appendChild(img);

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.textContent = comment;
    container.appendChild(commentDiv);

    gallery.insertBefore(container, gallery.firstChild);
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

