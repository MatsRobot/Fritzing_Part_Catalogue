---
---
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('catalogue-container');
    const searchInput = document.getElementById('part-search');

    // 1. Inject YAML data directly via Jekyll Liquid tags
    // This turns your YAML file into a native JavaScript array during the build process.
    let allParts = [
        {% for part in site.data.parts %}
        {
            id: "{{ part.id }}",
            title: "{{ part.title }}",
            description: "{{ part.description | replace: '"', '\"' }}",
            imagePath: "{{ part.imagePath }}",
            downloadPath: "{{ part.downloadPath }}",
            isExternal: {{ part.isExternal | default: false }},
            sourceName: "{{ part.sourceName }}",
            sourceUrl: "{{ part.sourceUrl }}"
        }{% unless forloop.last %},{% endunless %}
        {% endfor %}
    ];

    // Initial sort alphabetically by title
    allParts.sort((a, b) => a.title.localeCompare(b.title));
    renderParts(allParts);

    // 2. Real-time Search Logic
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

    // 4. Drawing function to render the grid
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
            const sourceCredit = part.isExternal 
                ? `<p class="source-credit">Source: <a href="${part.sourceUrl}" target="_blank">${part.sourceName}</a></p>` 
                : `<p class="source-credit">Source: MatsRobot</p>`;

			const partHtml = `
				<div class="catalogue-card" id="${part.id}">
					<div class="card-image">
						<img src="${part.imagePath}" alt="${part.title}" loading="lazy">
						<a href="${part.downloadPath}" 
						   class="btn-download ${part.isExternal ? 'btn-external' : ''}" 
						   download>
						   Download
						</a>
					</div>
					<div class="card-content">
						<div>
							<h3>${part.title}</h3>
							${sourceCredit}
						</div>
						<p>${part.description}</p>
					</div>
				</div>`;
            
            container.insertAdjacentHTML('beforeend', partHtml);
        });
    }
});