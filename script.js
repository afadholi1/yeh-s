document.addEventListener('DOMContentLoaded', () => {
    // Data contoh untuk daftar anggota dan hutang
    // Anda bisa MENGUBAH DATA INI SECARA MANUAL untuk menguji perubahan hutang
    let membersData = [
        {
            id: 1,
            name: 'Andi Nugroho',
            debts: [
                { date: '2024-01-15', amount: 300000, description: 'Pinjaman Renovasi Rumah', status: 'Belum Lunas' },
                { date: '2024-03-20', amount: 250000, description: 'Pembelian Material', status: 'Belum Lunas' },
                { date: '2024-05-10', amount: 200000, description: 'Dana Darurat', status: 'Belum Lunas' }
            ]
        },
        {
            id: 2,
            name: 'Budi Santoso',
            debts: [
                { date: '2023-11-01', amount: 500000, description: 'Pinjaman Modal Usaha', status: 'Lunas' },
                // Contoh menambahkan hutang baru yang belum lunas
                { date: '2024-07-25', amount: 150000, description: 'Kebutuhan Mendesak', status: 'Belum Lunas' }
            ]
        },
        {
            id: 3,
            name: 'Citra Dewi',
            debts: [
                { date: '2024-02-05', amount: 700000, description: 'Biaya Pendidikan', status: 'Belum Lunas' },
                { date: '2024-04-22', amount: 500000, description: 'Perbaikan Kendaraan', status: 'Belum Lunas' }
            ]
        },
        {
            id: 4,
            name: 'Dewi Lestari',
            debts: [
                { date: '2024-06-01', amount: 300000, description: 'Kebutuhan Mendesak', status: 'Belum Lunas' }
            ]
        },
        {
            id: 5,
            name: 'Eko Prasetyo',
            debts: [] // Anggota ini tidak memiliki hutang
        }
    ];

    const memberListDiv = document.getElementById('memberList');
    const debtDetailModal = document.getElementById('debtDetailModal');
    const closeModalButton = document.querySelector('.close-button');
    const modalMemberName = document.getElementById('modalMemberName');
    const debtDetailsDiv = document.getElementById('debtDetails');

    // Fungsi untuk memformat mata uang Rupiah
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Fungsi untuk menghitung total hutang BELUM LUNAS dari seorang anggota
    const calculateTotalUnpaidDebt = (member) => {
        let total = 0;
        member.debts.forEach(debt => {
            if (debt.status === 'Belum Lunas') {
                total += debt.amount;
            }
        });
        return total;
    };

    // Fungsi untuk menampilkan daftar anggota
    const displayMembers = () => {
        memberListDiv.innerHTML = ''; // Bersihkan daftar sebelum diisi ulang

        // Filter anggota yang memiliki hutang belum lunas
        const membersWithUnpaidDebt = membersData.filter(member => calculateTotalUnpaidDebt(member) > 0);

        if (membersWithUnpaidDebt.length === 0) {
            memberListDiv.innerHTML = '<p style="text-align: center; color: #555;">Tidak ada anggota dengan hutang saat ini.</p>';
            return;
        }

        membersWithUnpaidDebt.forEach(member => {
            const totalUnpaidDebt = calculateTotalUnpaidDebt(member);

            const memberItem = document.createElement('div');
            memberItem.classList.add('member-item');
            memberItem.dataset.memberId = member.id; // Simpan ID anggota

            memberItem.innerHTML = `
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>Total Hutang Belum Lunas:</p>
                </div>
                <div class="debt-amount">${formatRupiah(totalUnpaidDebt)}</div>
            `;
            memberListDiv.appendChild(memberItem);

            memberItem.addEventListener('click', () => {
                showDebtDetails(member);
            });
        });
    };

    // Fungsi untuk menampilkan detail hutang anggota
    const showDebtDetails = (member) => {
        modalMemberName.textContent = `Detail Hutang ${member.name}`;
        debtDetailsDiv.innerHTML = ''; // Kosongkan konten sebelumnya

        if (member.debts.length === 0) {
            debtDetailsDiv.innerHTML = '<p style="text-align: center; color: #555;">Tidak ada detail hutang untuk anggota ini.</p>';
        } else {
            // Urutkan hutang berdasarkan tanggal terbaru
            const sortedDebts = [...member.debts].sort((a, b) => new Date(b.date) - new Date(a.date));

            sortedDebts.forEach(debt => {
                const debtItem = document.createElement('div');
                debtItem.classList.add('debt-item');
                const statusClass = debt.status === 'Lunas' ? 'status-paid' : 'status-unpaid';

                debtItem.innerHTML = `
                    <p><strong>Tanggal Pinjam:</strong> ${debt.date}</p>
                    <p><strong>Jumlah Pinjaman:</strong> ${formatRupiah(debt.amount)}</p>
                    <p><strong>Deskripsi:</strong> ${debt.description}</p>
                    <p><strong>Status:</strong> <span class="${statusClass}">${debt.status}</span></p>
                `;
                debtDetailsDiv.appendChild(debtItem);
            });
        }
        debtDetailModal.style.display = 'flex'; // Tampilkan modal
    };

    // Tutup modal ketika tombol close diklik
    closeModalButton.addEventListener('click', () => {
        debtDetailModal.style.display = 'none';
    });

    // Tutup modal ketika mengklik di luar area modal
    window.addEventListener('click', (event) => {
        if (event.target == debtDetailModal) {
            debtDetailModal.style.display = 'none';
        }
    });

    // Panggil fungsi untuk menampilkan daftar anggota saat halaman dimuat
    displayMembers();


    // --- Contoh cara mengubah data hutang secara manual dan memperbarui tampilan ---
    // Coba tambahkan atau ubah data di 'membersData' di bagian atas file ini,
    // lalu panggil 'displayMembers()' lagi untuk melihat perubahannya.

    // Contoh 1: Menambahkan hutang baru untuk Andi Nugroho
    // Ini hanya contoh, Anda bisa uncomment dan jalankan di konsol browser
    /*
    setTimeout(() => {
        const andi = membersData.find(m => m.id === 1);
        if (andi) {
            andi.debts.push({ date: '2024-07-27', amount: 100000, description: 'Pembelian Buku', status: 'Belum Lunas' });
            console.log("Hutang Andi bertambah:", andi.debts);
            displayMembers(); // Panggil ulang untuk memperbarui daftar di UI
        }
    }, 3000); // Tunda 3 detik untuk simulasi perubahan
    */

    // Contoh 2: Mengubah status hutang Budi Santoso menjadi Lunas
    /*
    setTimeout(() => {
        const budi = membersData.find(m => m.id === 2);
        if (budi) {
            const lastDebt = budi.debts.find(d => d.description === 'Kebutuhan Mendesak');
            if (lastDebt) {
                lastDebt.status = 'Lunas';
                console.log("Hutang Budi diubah menjadi lunas:", budi.debts);
                displayMembers(); // Panggil ulang untuk memperbarui daftar di UI
            }
        }
    }, 6000); // Tunda 6 detik
    */

    // Anda dapat memodifikasi array `membersData` di awal `script.js`
    // lalu menyimpan file tersebut. Saat Anda me-refresh halaman,
    // perubahan akan tercermin.
});
