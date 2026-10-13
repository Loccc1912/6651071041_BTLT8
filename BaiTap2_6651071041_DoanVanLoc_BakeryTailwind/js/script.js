// ===== 1. Toggle menu mobile =====
// Tailwind không có sẵn hành vi JS như Bootstrap, nên ta tự bật/tắt class hidden/flex.
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden'); // bỏ "hidden" -> hiện menu
  mobileMenu.classList.toggle('flex');   // thêm "flex" -> xếp các mục theo cột
  const isOpen = !mobileMenu.classList.contains('hidden');
  menuBtn.textContent = isOpen ? '✕' : '☰'; // đổi icon mở/đóng
  menuBtn.setAttribute('aria-expanded', isOpen);
});

// Bấm vào một mục trong menu mobile thì tự đóng menu
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    menuBtn.textContent = '☰';
    menuBtn.setAttribute('aria-expanded', false);
  });
});

// ===== 2. Hiệu ứng nhỏ: thông báo khi gửi form đặt bánh =====
const orderForm = document.getElementById('order-form');
const formMsg = document.getElementById('form-msg');

orderForm.addEventListener('submit', (e) => {
  e.preventDefault(); // không tải lại trang
  const ten = document.getElementById('ten').value.trim();
  formMsg.textContent = `Cảm ơn ${ten}! Bếp Bánh sẽ liên hệ bạn sớm nhất.`;
  formMsg.classList.remove('hidden');
  orderForm.reset();
});
