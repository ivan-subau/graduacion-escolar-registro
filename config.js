// ============================================
// CONFIGURACIÓN SUPABASE - config.js
// ============================================

const SUPABASE_CONFIG = {
    URL: 'https://ghxrznaulvlizoxisuza.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoeHJ6bmF1bHZsaXpveDFzdXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzODAxNTcsImV4cCI6MTgzNzU0MDE1N30.WrU7SYW4DtDXoF9E0a9UpXY7QvB2LmN3oK8pR5gH9sQ'
};

// Inicializar cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);

// Funciones Auxiliares
function showAlert(message, type = 'success') {
    const alert = document.getElementById('alert');
    if (alert) {
        alert.textContent = message;
        alert.className = `alert ${type} active`;
        setTimeout(() => alert.classList.remove('active'), 5000);
    }
}

function generateCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES');
}

function exportToCSV(data, filename = 'export.csv') {
    const csv = [Object.keys(data[0]).join(',')];
    data.forEach(row => {
        csv.push(Object.values(row).map(v => `"${v}"`).join(','));
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

function exportToExcel(data, filename = 'export.xlsx') {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, filename);
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
