// Stałe definicje statusów
const STATUSES = [
    "Wyruszyło z hurtowni",
    "W drodze do sklepu",
    "W trakcie pakowania",
    "Gotowa do odbioru"
];

// Startowa baza danych (gdy localStorage jest pusty)
const defaultPackages = [
    {
        id: "PP-1001",
        name: "Jan Kowalski",
        address: "ul. Ogrodowa 5/2, 00-001 Warszawa\nTel: +48 600 100 200",
        items: ["Wyrzutnia CWC 19sh", "Rakiety Babel 6szt", "Zapalniczka Jet"],
        paid: true,
        statusStep: 1
    },
    {
        id: "PP-1002",
        name: "Michał Nowak",
        address: "ul. Długa 12, 31-000 Kraków\nTel: +48 500 300 400",
        items: ["Stroboskop BIAŁY 90s (5szt)", "Petardy DumBum"],
        paid: false,
        statusStep: 3
    }
];

// Pobieranie przesyłek z localStorage
function getPackages() {
    const data = localStorage.getItem('piroplanet_packages');
    return data ? JSON.parse(data) : defaultPackages;
}

// Zapisywanie przesyłek do localStorage
function savePackages(packages) {
    localStorage.setItem('piroplanet_packages', JSON.stringify(packages));
}

// Inicjalizacja domyślnych danych przy pierwszym uruchomieniu
if (!localStorage.getItem('piroplanet_packages')) {
    savePackages(defaultPackages);
}
