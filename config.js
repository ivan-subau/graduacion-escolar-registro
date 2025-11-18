// ============================================
// CONFIGURACIÓN SUPABASE - config.js
// ============================================

const SUPABASE_CONFIG = {
    URL: 'https://ghxrznaulvlizoxisuza.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoeHJ6bmF1bHZsaXpveGlzdXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMDMxNzgsImV4cCI6MjA3ODU3OTE3OH0.VSY9UiZUl9q35UDDIrN-TcG4TPA0Zp09ABlcvUqYuD0'
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
