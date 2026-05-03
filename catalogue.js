document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('catalogue-container');

    fetch('parts.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';

            // --- NEW: Alphabetical Sorting ---
            data.sort((a, b) => a.title.localeCompare(b.title));

            data.forEach(part => {
                const partHtml = `
                    <div class="catalogue-card" id="${part.id}">
                        <div class="card-image">
                            <img src="${part.imagePath}" alt="${part.title}">
                        </div>
                        <div class="card-content">
                            <h3>${part.title}</h3>
                            <p>${part.description}</p>
                            <a href="${part.downloadPath}" 
                               class="btn-download ${part.isExternal ? 'btn-external' : ''}" 
                               ${part.isExternal ? 'target="_blank"' : 'download'}>
                                <span>${part.isExternal ? 'View' : 'Download'}</span>
                            </a>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', partHtml);
            });
        })
        .catch(error => {
            container.innerHTML = `<div class="note" style="border-color: #d73a49; background-color: #ffeef0;">Error loading data.</div>`;
        });
});
