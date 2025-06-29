document.addEventListener('DOMContentLoaded', () => {
    // Mendapatkan elemen-elemen DOM
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultSection = document.querySelector('.result-section');
    const matchPercentageDisplay = document.getElementById('matchPercentage');
    const matchMessageDisplay = document.getElementById('matchMessage');
    const resetBtn = document.getElementById('resetBtn');

    // Fungsi untuk menghitung "kecocokan"
    function calculateMatch() {
        const name1 = name1Input.value.trim();
        const name2 = name2Input.value.trim();

        if (name1 === '' || name2 === '') {
            alert('Mohon masukkan kedua nama!');
            return; // Berhenti jika ada input yang kosong
        }

        const combinedNames = (name1 + name2).toLowerCase();
        let score = 0;


        for (let i = 0; i < combinedNames.length; i++) {
            const charCode = combinedNames.charCodeAt(i);
            if (charCode >= 97 && charCode <= 122) { 
                score += (charCode - 96);
            }
        }

        let percentage = score % 101;

        if (name1.length > 5 && name2.length > 5) percentage = (percentage + 10) % 101;
        if (name1.includes('a') && name2.includes('e')) percentage = (percentage + 5) % 101;
        if (name1.slice(-1) === name2.slice(-1)) percentage = (percentage + 15) % 101;

    
        percentage = Math.max(0, Math.min(100, percentage));

        displayResult(percentage);
    }

    // Fungsi untuk menampilkan hasil
    function displayResult(percentage) {
        matchPercentageDisplay.textContent = `${percentage}%`;

        let message = '';
        if (percentage >= 90) {
            message = 'Luar Biasa! Ini adalah kecocokan yang sangat kuat!';
            matchPercentageDisplay.style.color = '#28a745';
        } else if (percentage >= 70) {
            message = 'Sangat Cocok! Ada potensi besar di sini.';
            matchPercentageDisplay.style.color = '#17a2b8';
        } else if (percentage >= 50) {
            message = 'Cukup Cocok. Mungkin perlu usaha lebih!';
            matchPercentageDisplay.style.color = '#ffc107'; 
        } else if (percentage >= 30) {
            message = 'Lumayan. Ada ruang untuk bertumbuh.';
            matchPercentageDisplay.style.color = '#fd7e14';
        } else {
            message = 'Hm, sepertinya butuh keajaiban. Tapi cinta bisa berubah!';
            matchPercentageDisplay.style.color = '#dc3545';
        }
        matchMessageDisplay.textContent = message;

        resultSection.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
        calculateBtn.disabled = true;
        name1Input.disabled = true;
        name2Input.disabled = true;
    }

    // Fungsi untuk mereset game
    function resetCalculator() {
        name1Input.value = '';
        name2Input.value = '';
        resultSection.classList.add('hidden'); 
        calculateBtn.disabled = false;
        name1Input.disabled = false;
        name2Input.disabled = false;
        name1Input.focus();
    }

    // Event listener untuk tombol "Hitung Kecocokan!"
    calculateBtn.addEventListener('click', calculateMatch);

    // Event listener untuk tombol "Ulangi"
    resetBtn.addEventListener('click', resetCalculator);

    // Event listener untuk input (memungkinkan hitung dengan menekan Enter di input kedua)
    name2Input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            calculateMatch();
        }
    });

    name1Input.focus();
});