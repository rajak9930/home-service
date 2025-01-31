export default {
  // todo: Onboarding Screen
  onboarding: {
    skip: 'تخطي',
    getStarted: 'ابدأ الآن',
    screens: {
      beautySalon: {
        title: 'صالون تجميل في منزلك',
        description: 'احصل على خدمات وعلاجات تجميل احترافية في راحة منزلك',
      },
      plumber: {
        title: 'سباك وخبير بالقرب منك',
        description:
          'تواصل مع السباكين والخبراء المهرة في منطقتك للإصلاحات والحلول السريعة',
      },
      cleaning: {
        title: 'تنظيف منزلي احترافي',
        description:
          'استمتع بخدمات تنظيف منزلية شاملة من قبل متخصصين مدربين ومعتمدين',
      },
    },
  },
  // todo: Auth Screen
  signIn: {
    welcomeBack: 'مرحباً بعودتك! سعيد برؤيتك مرة أخرى',
    continueWithGoogle: 'المتابعة باستخدام جوجل',
    signingIn: 'جاري تسجيل الدخول...',
  },
  // todo: TopBar
  topBar: {
    currentLocation: 'الموقع الحالي',
    points: 'نقاط',
    bronze: 'برونزي',
    street: '15A، شارع جيمس',
    title: 'ما الذي تبحث عنه اليوم',
    hello: 'مرحباً',
  },
  // todo: Drawer
  drawer: {
    calendar: 'التقويم',
    payments: 'طرق الدفع',
    address: 'العنوان',
    notification: 'الإشعارات',
    offers: 'العروض',
    referFriend: 'دعوة صديق',
    support: 'الدعم',
    colorScheme: 'نظام الألوان',
    languagePreference: 'تفضيل اللغة',
    light: 'فاتح',
    dark: 'داكن',
    english: 'English',
    arabic: 'العربية',
  },
  // todo: SearchBar
  search: 'ابحث عن ما تحتاجه...',
  // todo: Slider
  slider: {
    title: {
      acService: 'خدمة تكييف الهواء',
      cleaningService: 'خدمة التنظيف',
      paintingService: 'خدمة الدهان',
    },
    discount: {
      get: 'خصم',
      off: 'خصم',
    },
    action: {
      grabOffer: 'احصل على العرض',
    },
  },
  // todo: Categories
  categories: {
    title: {
      acRepair: 'إصلاح المكيف',
      beauty: 'تجميل',
      appliance: 'أجهزة',
      seeAll: 'عرض الكل',
    },
  },
  // todo: Cleaning Services
  cleaningServices: {
    title: 'خدمات التنظيف',
    seeAll: 'عرض الكل',
    services: {
      homeCleaning: 'تنظيف المنزل',
      carpetCleaning: 'تنظيف السجاد',
      officeCleaning: 'تنظيف المكاتب',
    },
    discount: 'خصم',
  },
  // todo: Appliance Repair
  applianceRepair: {
    title: 'إصلاح الأجهزة',
    dryCleaningOffer: {
      title: 'عرض التنظيف الجاف',
      discount: 'احصل على 25%',
      action: 'احصل على العرض',
    },
  },
  // todo: Bookings
  upcoming: {
    empty: {
      title: 'لا توجد طلبات قادمة',
      description1: 'ليس لديك أي طلبات قادمة حالياً.',
      description2: 'قم بتقديم وتتبع طلباتك من هنا.',
      buttonText: 'عرض جميع الخدمات',
    },
    booking: {
      referenceCode: 'رقم المرجع: D-{{code}}',
      status: {
        label: 'الحالة',
        confirmed: 'مؤكد',
      },
      schedule: {
        label: 'الجدول',
        time: '{{time}}، {{date}}',
      },
      serviceProvider: {
        label: 'مزود الخدمة',
        name: 'وستنجهاوس',
      },
      callButton: 'اتصال',
    },
  },
};
