# 🎨 MarketFlow AI - Assets Directory Structure & Catalog

تم تنظيم وتحديث مجلد الـ **Assets** للاحتفاظ فقط بالأصول المتجهة (Vector SVGs) الضرورية للنظام والتخلص من جميع الصور النقطية الثقيلة والملفات المكررة.

---

## 📁 هيكل المجلد المنظم (Clean Assets Catalog)

```text
frontend/src/assets/
├── index.js                     # نقطة التصدير المركزية (Central Barrel Export)
├── README.md                    # دليل الأصول والفهرس المحدث
│
├── branding/                    # شعارات وهوية MarketFlow AI المتجهة
│   ├── logo-mark.svg            # أيقونة الشعار الهندسية الرسمية مع التدرج اللوني
│   └── logo-wordmark.svg        # الشعار النصي الكامل "MarketFlow AI"
│
├── icons/                       # الأيقونات الخارجية الخاصة بالهوية
│   └── google-icon.svg          # أيقونة جوجل الرسمية لزر تسجيل الدخول السريع
│
└── illustrations/               # الرسوم التوضيحية المتجهة (Vector Badges & Monitors)
    ├── email-verify-monitor.svg # شاشة تأكيد البريد الإلكتروني بخطوة التحقق
    ├── success-badge-check.svg  # شارة التحقق والنجاح الخضراء
    └── rocketLaunch.svg         # رسم انطلاق المتجر
```

---

## 💡 ملاحظات التحسين والترميز

1. **مكونات البنر ثلاثي الأبعاد (Hero Mockups)**:
   - تم تحويل جميع كروت لوحة التحكم والمؤشرات والرسوم البيانية إلى كود برمجي تفاعلي مباشر (`HeroBanner.jsx`) باستخدام **React + Tailwind CSS + SVG Charts**، مما وفر أكثر من 1.6 ميغابايت من الصور النقطية.
2. **الأيقونات القياسية**:
   - يتم استخدام مكتبة `lucide-react` للأيقونات القياسية (Mail, Lock, Eye, Store, etc.) لضمان سرعة التحميل وتناسق التصميم.

---

## 🚀 طريقة الاستيراد والاستخدام

```javascript
import { 
  logoMark, 
  logoWordmark, 
  googleIcon, 
  emailVerifyIcon, 
  successCheckIcon 
} from '../../assets';
```
