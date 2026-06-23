const fs = require('fs');
const path = require('path');

const dict = {
  'ر.س': 'SAR',
  'العودة للتسوق': 'Back to Shopping',
  'سلة المشتريات': 'Shopping Cart',
  'المجموع الفرعي': 'Subtotal',
  'الشحن': 'Shipping',
  'مجاني': 'Free',
  'الإجمالي': 'Total',
  'إتمام الشراء': 'Checkout',
  'الدفع عند الاستلام': 'Cash on Delivery',
  'تأكيد طلبك': 'Confirm Order',
  'الكمية': 'Quantity',
  'إضافة للسلة': 'Add to Cart',
  'الرئيسية': 'Home',
  'بطاقات الهدايا': 'Gift Cards',
  'أدوات التحضير': 'Brew Gear',
  'حجز طاولة': 'Booking',
  'قصتنا': 'Our Story',
  'تواصل معنا': 'Contact Us',
  'روابط سريعة': 'Quick Links',
  'تابعنا': 'Follow Us',
  'المنتجات المميزة': 'Featured Products',
  'عرض الكل': 'View All',
  'أضف للسلة': 'Add to Cart',
  'تم إضافة المنتج للسلة بنجاح!': 'Item added to cart successfully!',
  'تصفح المحاصيل الآن': 'Browse Beans Now',
  'قائمة المحاصيل': 'Beans Menu',
  'ابحث عن محصولك المفضل...': 'Search for your favorite beans...',
  'جميع الدرجات': 'All Roasts',
  'تحميص': 'Roast',
  'استكشف أفضل أنواع القهوة المختصة المختارة بعناية من حول العالم.': 'Explore the finest specialty coffee carefully selected from around the world.',
  'رضاك هو أولويتنا': 'Your satisfaction is our priority'
};

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      walk(file);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(file, 'utf8');
      let changed = false;
      
      // Fix direction
      if (content.includes('dir="rtl"')) {
        content = content.replace(/dir="rtl"/g, 'dir="ltr"');
        changed = true;
      }

      for (const [ar, en] of Object.entries(dict)) {
        if (content.includes(ar)) {
          content = content.split(ar).join(en);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Translated: ' + file);
      }
    }
  });
}

walk('./src');
