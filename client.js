document.addEventListener('DOMContentLoaded', () => {
    const trackingForm = document.getElementById('tracking-form');
    const trackingInput = document.getElementById('tracking-input');
    const resultDiv = document.getElementById('tracking-result');
    const errorDiv = document.getElementById('tracking-error');

    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = trackingInput.value.trim().toUpperCase();
        const packages = getPackages();
        const pkg = packages.find(p => p.id.toUpperCase() === query);

        if (pkg) {
            errorDiv.classList.add('hidden');
            resultDiv.classList.remove('hidden');

            // Przypisywanie podstawowych danych
            document.getElementById('res-id').innerText = pkg.id;
            document.getElementById('res-recipient-name').innerText = pkg.name;
            
            const lines = pkg.address.split('\n');
            document.getElementById('res-recipient-address').innerText = lines[0] || '';
            document.getElementById('res-recipient-phone').innerText = lines[1] || '';

            // Lista przedmiotów
            const itemsList = document.getElementById('res-items');
            itemsList.innerHTML = pkg.items.map(item => `<li>${item}</li>`).join('');

            // Status opłacenia
            const paymentBadge = document.getElementById('res-payment');
            if (pkg.paid) {
                paymentBadge.innerText = "OPŁACONE";
                paymentBadge.className = "inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30";
            } else {
                paymentBadge.innerText = "NIEOPŁACONE (Pobranie)";
                paymentBadge.className = "inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30";
            }

            // Pasek postępu
            const progressPercentage = (pkg.statusStep / (STATUSES.length - 1)) * 100;
            document.getElementById('progress-bar').style.width = `${progressPercentage}%`;

            const nodes = document.querySelectorAll('.step-node');
            nodes.forEach((node, idx) => {
                const circle = node.querySelector('div');
                const label = node.querySelector('span');

                if (idx <= pkg.statusStep) {
                    circle.className = "w-10 h-10 rounded-full flex items-center justify-center font-bold bg-orange-600 text-white border-4 border-slate-800 shadow-lg shadow-orange-600/50 transition-all";
                    label.className = "text-xs md:text-sm font-bold mt-2 text-orange-400";
                } else {
                    circle.className = "w-10 h-10 rounded-full flex items-center justify-center font-bold bg-slate-700 text-slate-400 border-4 border-slate-800 transition-all";
                    label.className = "text-xs md:text-sm font-semibold mt-2 text-slate-500";
                }
            });

        } else {
            resultDiv.classList.add('hidden');
            errorDiv.classList.remove('hidden');
        }
    });
});