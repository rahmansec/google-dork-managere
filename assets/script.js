document.addEventListener('DOMContentLoaded', function () {
    let categorySelect = document.getElementById('categorySelect');
    let searchInput = document.getElementById('searchInput');
    let dorkList = document.getElementById('dorkList');

    categorySelect.addEventListener('change', loadDorks);
    searchInput.addEventListener('input', filterDorks);

    function loadDorks() {
        let category = categorySelect.value;

        fetch('php/get_dorks.php?category=' + encodeURIComponent(category))
            .then(response => response.json())
            .then(data => {
                dorkList.innerHTML = '';
                data.forEach(dork => {
                    let li = document.createElement('li');
                    li.className = 'list-group-item';
                    li.textContent = `[${dork.category}] ${dork.dork}`;
                    li.onclick = () => searchDork(dork.dork);
                    li.style.cursor = 'pointer';
                    
                    // Add hover effect
                    li.onmouseover = () => {
                        li.style.transform = 'scale(1.02)';
                        li.style.backgroundColor = '#e4f791';
                    };
                    li.onmouseout = () => {
                        li.style.transform = 'scale(1)';
                        li.style.backgroundColor = '';
                    };

                    dorkList.appendChild(li);
                });
            });
    }

    function filterDorks() {
        let searchTerm = searchInput.value.toLowerCase();
        let items = dorkList.getElementsByTagName('li');

        for (let item of items) {
            let text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        }
    }

    function searchDork(dork) {
        let domain = document.getElementById('domainInput').value.trim();
        if (domain) {
            let query = `site:${domain} ${dork}`;
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        } else {
            alert("Enter Domain");
        }
    }

    document.getElementById('addDorkForm').addEventListener('submit', function (e) {
        e.preventDefault();
        let formData = new FormData(this);

        fetch('php/add_dork.php', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) location.reload();
            });
    });
});
