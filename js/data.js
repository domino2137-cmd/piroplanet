const STATUSES = [
    "Wyruszyło z hurtowni",
    "W drodze do sklepu",
    "W trakcie pakowania",
    "Gotowa do odbioru"
];

// Pobieranie danych z pliku JSON na GitHub Pages
async function getPackages() {
    try {
        // Wymuszenie braku pamięci podręcznej (cache-busting), aby pobierać zawsze najnowsze dane po edycji pliku
        const response = await fetch(`packages.json?t=${new Date().getTime()}`);
        if (!response.ok) {
            throw new Error("Błąd podczas pobierania pliku danych.");
        }
        return await response.json();
    } catch (error) {
        console.error("Błąd ładowania paczek:", error);
        return null;
    }
}
