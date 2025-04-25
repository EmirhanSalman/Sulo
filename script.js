function addCard() {
    const container = document.getElementById('card-container');
  
    const col = document.createElement('div');
    col.className = 'col motor-card';  // motor-card sınıfı ekledik
  
    const card = document.createElement('div');
    card.className = 'card h-100';
  
    const img = document.createElement('img');
    img.src = 'assets/tempv2.png';  // Varsayılan resim
    img.className = 'card-img-top';
    img.alt = 'Resim';
    img.style.cursor = 'pointer';  // Başlangıçta tıklanabilir
  
    // Görsel seçimi için input (gizli)
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';  // Başlangıçta gizli
  
    // Görsel tıklanınca input'u tetikle
    img.onclick = () => fileInput.click();
  
    // Seçilen görseli göster
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
  
    const body = document.createElement('div');
    body.className = 'card-body';
  
    // Motor ismi (başlık kısmı)
    const motorName = document.createElement('p');
    motorName.className = 'motor-name';
    motorName.textContent = 'Yeni Motor';  // Başlangıçta motor adı
    motorName.contentEditable = true;  // Düzenlenebilir

    // Motor açıklaması
    const text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = 'Yeni motor açıklaması';
    text.contentEditable = true;
  
    // Onay butonu
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-success mt-3';
    confirmBtn.textContent = 'Onayla';
  
    confirmBtn.onclick = () => {
      text.contentEditable = false;
      motorName.contentEditable = false;  // Motor adı da kilitlenir
      fileInput.style.display = 'none';  // Fotoğraf yükleme input'unu tamamen gizliyoruz
      img.style.cursor = 'default';  // Fotoğrafın tıklanabilirliğini kaldırıyoruz
      img.onclick = null;  // Fotoğrafa tıklanamaz hale getirilir
      confirmBtn.remove();  // Onay butonunu kaldırıyoruz
    };
  
    body.appendChild(motorName);  // Motor adı
    body.appendChild(text);  // Açıklama
    body.appendChild(fileInput);  // Gizli input
    body.appendChild(confirmBtn);  // Onayla butonu
  
    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);
}
  
document.getElementById('search-bar').addEventListener('input', function(event) {
    const searchQuery = event.target.value.toLowerCase();
    const motorCards = document.querySelectorAll('.motor-card');
  
    motorCards.forEach(card => {
        const motorName = card.querySelector('.motor-name').textContent.toLowerCase();  // Motor adını alıyoruz
        if (motorName.includes(searchQuery)) {
            card.style.display = 'block'; // Görünür yap
        } else {
            card.style.display = 'none'; // Gizle
        }
    });
});
