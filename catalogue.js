document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('catalogue-container');

    // 1. Fetch the data from your JSON database
    fetch('parts.json')
        .then(response => response.json())
        .then(data => {
            // 2. Clear any loading message
            container.innerHTML = '';

            // 3. Loop through each part in the database
            data.forEach(part => {
                // Create the HTML template dynamically
                const partHtml = `
                    <div class="catalogue-entry" id="${part.id}">
                        <div class="catalogue-text">
                            <h3>${part.title}</h3>
                            <p>${part.description}</p>
                            
                            <!-- Check if internal download or external link -->
                            <a href="${part.downloadPath}" 
                               class="btn-download ${part.isExternal ? 'btn-external' : ''}" 
                               ${part.isExternal ? 'target="_blank"' : 'download'}>
                               
                                <!-- Use a different icon for external vs direct download -->
                                ${part.isExternal ? 
                                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h4v2H5v12h12v-4h2v6H3V5h2z"/></svg>' : 
                                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>'
                                }
                                <span>${part.isExternal ? 'View on GitHub' : 'Download .fzpz Part'}</span>
                            </a>
                        </div>

                        <div class="image-sidebar">
                            <img src="${part.imagePath}" alt="${part.title} Fritzing Preview">
                            <span class="caption">Fritzing Breadboard View</span>
                        </div>
                    </div>
                `;
                
                // Append the new entry to the main container
                container.insertAdjacentHTML('beforeend', partHtml);
            });
        })
        .catch(error => {
            container.innerHTML = `<div class="note" style="border-color: #d73a49; background-color: #ffeef0;">Error loading catalogue data. Please try again later.</div>`;
            console.error('Error fetching JSON:', error);
        });
});