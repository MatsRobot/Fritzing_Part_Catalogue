document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('catalogue-container');
    const searchInput = document.getElementById('part-search');
    let allParts = []; // Global store for the search filter

    // 1. Fetch data from your parts.json database
    fetch('parts.json')
        .then(response => response.json())
        .then(data => {
            // Sort alphabetically by title immediately on load
            allParts = data.sort((a, b) => a.title.localeCompare(b.title));
            renderParts(allParts);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            container.innerHTML = `
                <div class="note" style="border-color: #d73a49; background-color: #ffeef0;">
                    Error loading catalogue data. Please ensure parts.json exists and is formatted correctly.
                </div>`;
        });

    // 2. Real-time Search Logic
    // Triggers every time a character is typed in the search box
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        const filteredParts = allParts.filter(part => {
            return part.title.toLowerCase().includes(searchTerm) || 
                   part.description.toLowerCase().includes(searchTerm);
        });

        renderParts(filteredParts);
    });

    // 3. Prevent "Enter" key from refreshing the page
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });

    // 4. Drawing function to render the 3-column grid
    function renderParts(partsList) {
        container.innerHTML = '';

        if (partsList.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #6a737d;">
                    <p>No components found matching that search.</p>
                </div>`;
            return;
        }

        partsList.forEach(part => {
            // Determine the source credit line based on whether it is an external part
            const sourceCredit = part.isExternal 
                ? `<p class="source-credit">Source: <a href="${part.sourceUrl}" target="_blank">${part.sourceName}</a></p>` 
                : `<p class="source-credit">Source: MatsRobot (Original)</p>`;

            const partHtml = `
                <div class="catalogue-card" id="${part.id}">
                    <div class="card-image">
                        <img src="${part.imagePath}" alt="${part.title}" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>${part.title}</h3>
                        ${sourceCredit}
                        <p>${part.description}</p>
                        <a href="${part.downloadPath}" 
                           class="btn-download ${part.isExternal ? 'btn-external' : ''}" 
                           ${part.isExternal ? 'target="_blank"' : 'download'}>
                            <span>${part.isExternal ? 'View on GitHub' : 'Download .fzpz'}</span>
                        </a>
                    </div>
                </div>`;
            
            container.insertAdjacentHTML('beforeend', partHtml);
        });
    }
});

