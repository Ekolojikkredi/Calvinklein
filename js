let totalWaste = 0; // Toplam atık kg
let students = {}; // Öğrenci verileri
let schoolPassword = "admin123"; // Okul şifresi

// Atık türleri için puanlama
const pointsSorted = {
    plastik: 2,
    cam: 3,
    pil: 6,
    elektronik: 5,
    metal: 4,
    kagit: 2,
    yag: 5,
    tekstil: 2
};

const pointsUnsorted = {
    plastik: 1,
    cam: 1,
    pil: 2,
    elektronik: 2,
    metal: 1,
    kagit: 1,
    yag: 2,
    tekstil: 1
};

// Öğrenci kaydı
function registerStudent(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentSurname = document.getElementById('studentSurname').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const studentClass = document.getElementById('studentClass').value;
    const studentEmail = document.getElementById('studentEmail').value;

    students[studentNumber] = {
        name: studentName,
        surname: studentSurname,
        studentNumber: studentNumber,
        studentClass: studentClass,
        email: studentEmail,
        totalPoints: 0,
        wasteEntries: []
    };

    alert("Öğrenci kaydı başarıyla tamamlandı!");
    document.getElementById('studentForm').reset();
}

// Veri girişi
function submitWasteData(event) {
    event.preventDefault();

    const studentNumberEntry = document.getElementById('studentNumberEntry').value;
    const wasteType = document.getElementById('wasteType').value;
    const wasteWeight = parseFloat(document.getElementById('wasteWeight').value);
    const sortingStatus = document.getElementById('sortingStatus').value;

    let points = 0;
    if (sortingStatus === "sorted") {
        points = wasteWeight * (pointsSorted[wasteType] || 0);
    } else if (sortingStatus === "unsorted") {
        points = wasteWeight * (pointsUnsorted[wasteType] || 0);
    }

    // Toplam atık sayaç güncelleme
    totalWaste += wasteWeight;
    document.getElementById("totalWasteCounter").innerText = `${totalWaste} kg`;

    if (!students[studentNumberEntry]) {
        alert("Öğrenci bulunamadı!");
        return;
    }

    students[studentNumberEntry].totalPoints += points;
    students[studentNumberEntry].wasteEntries.push({ wasteType, weight: wasteWeight, points, sortingStatus });

    alert(`Veri başarıyla kaydedildi. Kazanılan Puan: ${points}`);
    document.getElementById('wasteForm').reset();
}

// Öğrenci verisini görüntüleme
function viewStudentData(event) {
    event.preventDefault();

    const studentNumber = document.getElementById('viewStudentNumber').value;
    const studentEmail = document.getElementById('viewStudentEmail').value;

    if (students[studentNumber] && students[studentNumber].email === studentEmail) {
        const student = students[studentNumber];
        let studentInfo = `
            <h3>Öğrenci Numarası: ${student.studentNumber}</h3>
            <p><strong>Adı:</strong> ${student.name} ${student.surname}</p>
            <p><strong>Toplam Puan:</strong> ${student.totalPoints}</p>
            <p><strong>Atık Girişleri:</strong></p>
            <ul>
        `;

        student.wasteEntries.forEach(entry => {
            studentInfo += `
                <li>
                    Tür: ${entry.wasteType}, 
                    Miktar: ${entry.weight} kg, 
                    Durum: ${entry.sortingStatus === "sorted" ? "Ayrıştırıldı" : "Ayrıştırılmadı"},
                    Kazanılan Puan: ${entry.points}
                </li>
            `;
        });

        studentInfo += `</ul>`;
        document.getElementById('studentData').innerHTML = studentInfo;
    } else {
        alert('Öğrenci bilgileri bulunamadı!');
        document.getElementById('studentData').innerHTML = '<p>Öğrenci verisi bulunamadı.</p>';
    }
}

// Okul kaydı
function registerSchool(event) {
    event.preventDefault();

    const schoolName = document.getElementById('schoolName').value;
    const province = document.getElementById('province').value;
    const district = document.getElementById('district').value;
    const schoolPasswordInput = document.getElementById('schoolPassword').value;

    if (schoolPasswordInput === schoolPassword) {
        alert("Okul kaydı başarıyla tamamlandı!");
    } else {
        alert("Hatalı şifre!");
    }

    document.getElementById('schoolForm').reset();
}

// Menüler arası geçiş
function showInfo(sectionId) {
    const sections = document.querySelectorAll('.info-section');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Sayfa yüklendiğinde Ekolojik Kredi bölümünü göster
window.onload = function () {
    showInfo('ekolojikKredi');
}
