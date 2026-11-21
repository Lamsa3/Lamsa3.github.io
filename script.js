// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '12px 6%';
  } else {
    navbar.style.padding = '18px 6%';
  }
});

// ===== HAMBURGER MENU =====
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#FF6500';
    }
  });
});

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .review-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== CONTACT FORM (DIRECT WHATSAPP INTEGRATION) =====
function submitForm(e) {
  e.preventDefault();
  
  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const service = document.getElementById('clientService').value;
  const details = document.getElementById('clientDetails').value.trim();
  
  const whatsappNumber = "201554687020";
  
  // Format the message nicely for WhatsApp
  let text = `مرحباً Lamsa! 🎯\n\n`;
  text += `📌 طلب مشروع جديد من الموقع:\n`;
  text += `👤 اسم العميل: ${name}\n`;
  text += `📞 رقم التواصل: ${phone}\n`;
  text += `🎨 الخدمة المطلوبة: ${service}\n`;
  if (details) {
    text += `📝 تفاصيل المشروع: ${details}\n`;
  }
  
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
  
  // Visual feedback
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '⏳ جاري تحويلك للواتساب...';
  btn.style.background = '#25D366';
  btn.disabled = true;
  
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    btn.textContent = '✅ تم التحويل للواتساب!';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  }, 700);
}
