document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('categorySelect');
    const searchInput = document.getElementById('searchInput');
    const dorkList = document.getElementById('dorkList');

    function loadDorks() {
        const category = categorySelect.value;

        fetch('php/get_dorks.php?category=' + encodeURIComponent(category))
            .then(response => response.json())
            .then(data => {
                dorkList.innerHTML = '';
                data.forEach(dork => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item d-flex justify-content-between align-items-center';

                    const idSpan = document.createElement('span');
                    idSpan.textContent = `ID: ${dork.id}`;
                    idSpan.style.flex = '0 0 50px';
                    idSpan.style.marginRight = '10px';

                    const textSpan = document.createElement('span');
                    textSpan.textContent = `[${dork.category}] ${dork.dork}`;
                    textSpan.style.flex = '1';
                    textSpan.style.overflow = 'hidden';
                    textSpan.style.textOverflow = 'ellipsis';
                    textSpan.style.whiteSpace = 'nowrap';

                    li.appendChild(idSpan);
                    li.appendChild(textSpan);
                    li.style.cursor = 'pointer';
                    li.dataset.id = dork.id;

                    li.onmouseover = () => {
                        li.style.transform = 'scale(1.02)';
                        li.style.backgroundColor = '#e4f791';
                    };
                    li.onmouseout = () => {
                        li.style.transform = 'scale(1)';
                        li.style.backgroundColor = '';
                    };

                    li.onclick = () => searchDork(dork.dork);

                    const buttonContainer = document.createElement('div');

                    const copyButton = document.createElement('button');
                    copyButton.textContent = 'Copy';
                    copyButton.className = 'btn btn-secondary btn-sm';
                    copyButton.style.marginLeft = '10px';
                    copyButton.onclick = (e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(dork.dork).then(() => {
                            showAlertModal('Dork copied to clipboard');
                        function showAlertModal(message) {
                            const modalHTML = `
                                <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="alertModalLabel">Alert</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                ${message}
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                            document.body.insertAdjacentHTML('beforeend', modalHTML);
                            const modal = new bootstrap.Modal(document.getElementById('alertModal'));
                            modal.show();
                        }
                        });
                    };

                    const descriptionButton = document.createElement('button');
                    descriptionButton.textContent = 'Description';
                    descriptionButton.className = 'btn btn-info btn-sm';
                    descriptionButton.style.marginLeft = '10px';
                    descriptionButton.onclick = (e) => {
                        e.stopPropagation();
                        showDescriptionModal(dork.description, dork.id);
                    };

                    // const editButton = document.createElement('button');
                    // editButton.textContent = 'Edit';
                    // editButton.className = 'btn btn-warning btn-sm';
                    // editButton.style.marginLeft = '10px';
                    // editButton.onclick = (e) => {
                    //     e.stopPropagation();
                    //     showEditModal(dork);
                    // };

                    // const deleteButton = document.createElement('button');
                    // deleteButton.textContent = 'Delete';
                    // deleteButton.className = 'btn btn-danger btn-sm';
                    // deleteButton.style.marginLeft = '10px';
                    // deleteButton.onclick = (e) => {
                    //     e.stopPropagation();
                    //     if (confirm('Are you sure you want to delete this dork?')) {
                    //         fetch('php/manage_dork.php', {
                    //             method: 'DELETE',
                    //             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    //             body: `id=${dork.id}`
                    //         })
                    //             .then(response => response.json())
                    //             .then(data => {
                    //                 showAlertModal(data.message);
                    //                 function showAlertModal(message) {
                    //                     const modalHTML = `
                    //                         <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
                    //                             <div class="modal-dialog">
                    //                                 <div class="modal-content">
                    //                                     <div class="modal-header">
                    //                                         <h5 class="modal-title" id="alertModalLabel">Alert</h5>
                    //                                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    //                                     </div>
                    //                                     <div class="modal-body">
                    //                                         ${message}
                    //                                     </div>
                    //                                     <div class="modal-footer">
                    //                                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    //                                     </div>
                    //                                 </div>
                    //                             </div>
                    //                         </div>
                    //                     `;
                    //                     document.body.insertAdjacentHTML('beforeend', modalHTML);
                    //                     const modal = new bootstrap.Modal(document.getElementById('alertModal'));
                    //                     modal.show();
                    //                 }
                    //                 if (data.success) li.remove();
                    //             });
                    //     }
                    // };

                    buttonContainer.appendChild(copyButton);
                    buttonContainer.appendChild(descriptionButton);
                    // buttonContainer.appendChild(editButton);
                    // buttonContainer.appendChild(deleteButton);
                    li.appendChild(buttonContainer);
                    dorkList.appendChild(li);
                });
            });
    }

    function showDescriptionModal(description, id) {
        const modal = document.getElementById('descriptionModal');
        const modalBody = modal.querySelector('.modal-body');
        const isRTL = /[\u0600-\u06FF]/.test(description); // Check if the description contains Arabic/Persian characters
        modalBody.innerHTML = `<strong>ID:</strong> ${id}<br><br>${description}`;
        modalBody.style.textAlign = isRTL ? 'right' : 'left';
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }

    function showEditModal(dork) {
        const modal = document.getElementById('editDorkModal');
        const categoryInput = modal.querySelector('input[name="category"]');
        const dorkInput = modal.querySelector('input[name="dork"]');
        const descriptionInput = modal.querySelector('textarea[name="description"]');
        const saveButton = modal.querySelector('.btn-save');

        categoryInput.value = dork.category;
        dorkInput.value = dork.dork;
        descriptionInput.value = dork.description;

        saveButton.onclick = () => {
            const newCategory = categoryInput.value;
            const newDork = dorkInput.value;
            const newDescription = descriptionInput.value;
            if (newDork && newCategory && newDescription) {
                fetch('php/manage_dork.php', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `id=${dork.id}&category=${encodeURIComponent(newCategory)}&dork=${encodeURIComponent(newDork)}&description=${encodeURIComponent(newDescription)}`
                })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                        if (data.success) {
                            loadDorks();
                            const modalInstance = bootstrap.Modal.getInstance(modal);
                            modalInstance.hide();
                        }
                    });
            }
        };

        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }

    // Create edit dork modal
    const editModalHTML = `
        <div class="modal fade" id="editDorkModal" tabindex="-1" aria-labelledby="editDorkModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editDorkModalLabel">Edit Dork</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="category" class="form-label">Category</label>
                                <input type="text" class="form-control" name="category">
                            </div>
                            <div class="mb-3">
                                <label for="dork" class="form-label">Dork</label>
                                <input type="text" class="form-control" name="dork">
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <textarea class="form-control" name="description"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary btn-save">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', editModalHTML);

    // Create description modal
    const modalHTML = `
        <div class="modal fade" id="descriptionModal" tabindex="-1" aria-labelledby="descriptionModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="descriptionModalLabel">Description</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Description will be inserted here -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    categorySelect.addEventListener('change', loadDorks);
    searchInput.addEventListener('input', filterDorks);

    function filterDorks() {
        const searchTerm = searchInput.value.toLowerCase();
        const items = dorkList.getElementsByTagName('li');

        for (const item of items) {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        }
    }

    function searchDork(dork) {
        const domain = document.getElementById('domainInput').value.trim();
        if (domain) {
            const query = `site:${domain} ${dork}`;
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        } else {
            alert("Enter Domain");
        }
    }

    document.getElementById('addDorkForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch('php/manage_dork.php', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) location.reload();
            });
    });

    loadDorks();
});
