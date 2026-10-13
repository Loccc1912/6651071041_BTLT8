// =====================================================================
// app.js - Ứng dụng Vue 3 (CDN): giỏ hàng mini + tìm kiếm sản phẩm
// Vue.createApp({ data, computed, methods }).mount('#app')
// =====================================================================

const app = Vue.createApp({

  // ---- data(): dữ liệu "gốc" của ứng dụng. Khi dữ liệu đổi, Vue tự cập nhật giao diện (reactivity) ----
  data() {
    return {
      tuKhoa: '',   // từ khoá tìm kiếm, liên kết 2 chiều với ô input bằng v-model
      cart: [],     // mảng giỏ hàng, rỗng lúc đầu
      products: [   // danh sách sản phẩm (8 sản phẩm)
        { id: 1, ten: 'Ốp lưng xanh Electric',  anh: '../images/opxanh.png',      gia: 250000, moTa: 'Ốp silicon mềm, chống sốc, màu xanh nổi bật.' },
        { id: 2, ten: 'Ốp lưng trong suốt',     anh: '../images/op-lung-trong.svg',     gia: 150000, moTa: 'Trong suốt, không ố vàng, ôm sát máy.' },
        { id: 3, ten: 'Đế sạc không dây',       anh: '../images/sac-khong-day.svg',     gia: 350000, moTa: 'Sạc không dây 15W, đèn báo LED.' },
        { id: 4, ten: 'Tai nghe TWS Active',    anh: '../images/tai-nghe-tws.svg',      gia: 590000, moTa: 'Bluetooth 5.3, pin 24 giờ, chống nước.' },
        { id: 5, ten: 'Cáp sạc USB-C 1m',       anh: '../images/cap-sac-c.svg',         gia: 99000,  moTa: 'Dây dù bền chắc, hỗ trợ sạc nhanh.' },
        { id: 6, ten: 'Củ sạc nhanh 20W',       anh: '../images/sac-nhanh-20w.svg',     gia: 220000, moTa: 'Nhỏ gọn, an toàn, tương thích nhiều dòng máy.' },
        { id: 7, ten: 'Giá đỡ điện thoại',      anh: '../images/gia-do-dien-thoai.svg', gia: 120000, moTa: 'Gấp gọn, xoay nhiều góc, để bàn làm việc.' },
        { id: 8, ten: 'Pin dự phòng 10000mAh',  anh: '../images/pin-du-phong.svg',      gia: 450000, moTa: 'Hai cổng sạc, hiển thị phần trăm pin.' }
      ]
    };
  },

  // ---- computed: giá trị TỰ TÍNH LẠI từ data, có cache. Data đổi thì computed đổi theo ----
  computed: {
    // Số lượng sản phẩm trong giỏ, hiển thị ở header: Giỏ hàng ({{ cartCount }})
    cartCount() {
      return this.cart.length;
    },

    // Tổng tiền: cộng giá từng sản phẩm trong giỏ
    tongTien() {
      return this.cart.reduce((tong, sp) => tong + sp.gia, 0);
    },

    // Danh sách đã lọc theo tuKhoa (không phân biệt hoa thường).
    // Thể hiện "UI = function của data": gõ tuKhoa -> danhSachLoc đổi -> giao diện tự đổi
    danhSachLoc() {
      const kw = this.tuKhoa.trim().toLowerCase();
      if (kw === '') return this.products; // chưa gõ gì thì hiện tất cả
      return this.products.filter(sp =>
        sp.ten.toLowerCase().includes(kw) || sp.moTa.toLowerCase().includes(kw)
      );
    }
  },

  // ---- methods: các hàm xử lý sự kiện ----
  methods: {
    // Thêm sản phẩm vào giỏ (gọi bằng @click="themVaoGio(sp)").
    // So sánh: nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự querySelector + cập nhật
    // DOM thủ công. Vue tự động làm điều này nhờ reactivity: chỉ cần push vào mảng cart,
    // số lượng ở header, danh sách và tổng tiền ở aside tự cập nhật.
    themVaoGio(sanPham) {
      this.cart.push(sanPham);
    },

    // Xoá sản phẩm khỏi giỏ theo vị trí index (gọi bằng @click="xoaKhoiGio(index)").
    // splice(index, 1) xoá 1 phần tử tại vị trí index; Vue tự vẽ lại giao diện.
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },

    // Định dạng số thành tiền Việt, ví dụ 250000 -> "250.000đ"
    formatGia(so) {
      return so.toLocaleString('vi-VN') + 'đ';
    },

    // Giả lập thanh toán: báo tổng tiền rồi làm trống giỏ
    thanhToan() {
      alert('Cảm ơn bạn! Tổng thanh toán: ' + this.formatGia(this.tongTien));
      this.cart = [];
    }
  }
});

// Gắn ứng dụng vào thẻ <div id="app"> trong index.html
app.mount('#app');
