document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('catalogue-container');
    const searchInput = document.getElementById('part-search');
    let allParts = []; // Global store for the search filter

    fetch('parts.json')
        .then(response => response.json())
        .then(data => {
            // Sort once on load
            allParts = data.sort((a, b) => a.title.localeCompare(b.title));
            renderParts(allParts);
        });

    // --- SEARCH FUNCTION ---
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allParts.filter(part => 
            part.title.toLowerCase().includes(term) || 
            part.description.toLowerCase().includes(term)
        );
        renderParts(filtered);
    });

    function renderParts(partsList) {
        container.innerHTML = '';
        if (partsList.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #586069; padding: 2rem;">No matching parts found.</p>';
            return;
        }

        partsList.forEach(part => {
            const partHtml = `
                <div class="catalogue-card">
                    <div class="card-image"><img src="${part.imagePath}" alt="${part.title}"></div>
                    <div class="card-content">
                        <h3>${part.title}</h3>
                        <p>${part.description}</p>
                        <a href="${part.downloadPath}" class="btn-download ${part.isExternal ? 'btn-external' : ''}" ${part.isExternal ? 'target="_blank"' : 'download'}>
                            <span>${part.isExternal ? 'View' : 'Download'}</span>
                        </a>
                    </div>
                </div>`;
            container.insertAdjacentHTML('beforeend', partHtml);
        });
    }
});
