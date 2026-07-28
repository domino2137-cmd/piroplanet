document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('admin-table-body');
    const modal = document.getElementById('add-modal');
    const btnOpenModal = document.getElementById('btn-open-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const addForm = document.getElementById('add-package-form');

    // Renderowanie tabeli
    function renderTable() {
        const packages = getPackages();
        tableBody.innerHTML = packages.map(pkg => `
            <tr class="hover:bg-slate-700/50 transition">
                <td class="p-4 font-bold text-orange-400">${pkg.id}</td>
                <td class="p-4 font-semibold text-white">${pkg.name}</td>
                <td class="p-4 text-xs max-w-xs truncate text-slate-300">${pkg.items.join(', ')}</td>
                <td class="p-4">
                    ${pkg.paid 
                        ? '<span class="text-green-400 font-semibold"><i class="fa-solid fa-circle-check mr-1"></i>Tak</span>' 
                        : '<span class="text-amber-400 font-semibold"><i class="fa-solid fa-clock mr-1"></i>Pobranie</span>'}
                </td>
                <td class="p-4">
                    <select data-id="${pkg.id}" class="status-select bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 focus:border-orange-500 text-white font-semibold">
                        ${STATUSES.map((st, idx) => `
                            <option value="${idx}" ${pkg.statusStep === idx ? 'selected' : ''}>${st}</option>
                        `).join('')}
                    </select>
                </td>
                <td class="p-4 text-right">
                    <button data-id="${pkg.id}" class="btn-delete p-2 text-red-400 hover:text-red-300 transition">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Listener pod zmianę statusu
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const newStep = parseInt(e.target.value);
                updatePackageStatus(id, newStep);
            });
        });

        // Listener pod usuwanie
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                deletePackage(id);
            });
        });
    }

    // Zmiana statusu
    function updatePackageStatus(id, newStep) {
        let packages = getPackages();
        const pkg = packages.find(p => p.id === id);
        if (pkg) {
            pkg.statusStep = newStep;
            savePackages(packages);
        }
    }

    // Usunięcie paczki
    function deletePackage(id) {
        if (confirm(`Czy na pewno chcesz usunąć przesyłkę ${id}?`)) {
            let packages = getPackages();
            packages = packages.filter(p => p.id !== id);
            savePackages(packages);
            renderTable();
        }
    }

    // Modal
    btnOpenModal.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });

    btnCloseModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    // Zapis nowej przesyłki
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const packages = getPackages();

        const newPkg = {
            id: document.getElementById('input-id').value.trim().toUpperCase(),
            name: document.getElementById('input-name').value.trim(),
            address: document.getElementById('input-address').value.trim(),
            items: document.getElementById('input-items').value.split(',').map(i => i.trim()),
            paid: document.getElementById('input-paid').value === 'true',
            statusStep: parseInt(document.getElementById('input-status').value)
        };

        if (packages.some(p => p.id === newPkg.id)) {
            alert("Przesyłka o takim numerze już istnieje!");
            return;
        }

        packages.push(newPkg);
        savePackages(packages);
        
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        addForm.reset();
        renderTable();
    });

    // Pierwsze wywołanie renderu
    renderTable();
});