const pool = require('../config/db');

// Seed professional game data
exports.seedGames = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Professional game data (category removed)
    const games = [
      {
        name: "Professional Boxing Arena",
        description: "الساحة الاحترافية للملاكمة - تجربة ملاكمة حقيقية مع كمات ثقيلة وتدريب متخصص. تتميز بنظام قياس القوة الرقمي وتصنيف عالمي للاعبين.",
        price: 150,
        capacity: 1,
        spaceRequired: "2m × 2m",
        powerRequired: "2KW",
        availability: "Available"
      },
      {
        name: "Air Hockey Championship",
        description: "بطولة هوكي الهواء - طاولة احترافية عالية السرعة مع تقنية التوازن الديناميكي. مثالية للعائلات والمسابقات. مزودة بنظام حفظ النتائج الإلكتروني.",
        price: 120,
        capacity: 2,
        spaceRequired: "2.5m × 1.5m",
        powerRequired: "1.5KW",
        availability: "Available"
      },
      {
        name: "Interactive Basketball Pro",
        description: "كرة سلة تفاعلية احترافية - نظام ذكي يتتبع دقة التسديد وسرعة الكرة وزاوية الإطلاق. شاشة عرض ضخمة تعرض الإحصائيات الحية والترتيبات العالمية.",
        price: 180,
        capacity: 1,
        spaceRequired: "3m × 2m",
        powerRequired: "2.5KW",
        availability: "Available"
      },
      {
        name: "Virtual Soccer Stadium",
        description: "ملعب كرة القدم الافتراضي - تجربة كرة قدم غامرة مع تقنية الواقع المعزز. لاعبون حقيقيون يتنافسون على الملعب الافتراضي مع تتبع المتغيرات البيولوجية.",
        price: 200,
        capacity: 2,
        spaceRequired: "4m × 3m",
        powerRequired: "3KW",
        availability: "Available"
      },
      {
        name: "High-Speed Racing Simulator",
        description: "محاكي السباق عالي السرعة - منصة سباق حقيقية مع عجلة قيادة 1080° وحركة كاملة. تدعم آلاف المسارات العالمية والسيارات الحقيقية من أشهر الماركات.",
        price: 220,
        capacity: 1,
        spaceRequired: "2.5m × 2m",
        powerRequired: "3.5KW",
        availability: "Available"
      },
      {
        name: "Dance Revolution Stage",
        description: "مسرح الرقص الثوري - منصة رقص احترافية بـ 2000+ أغنية من جميع الأنواع والعصور. نظام تتبع الحركة بتقنية AI يقيّم الدقة والإيقاع والسرعة.",
        price: 140,
        capacity: 2,
        spaceRequired: "3m × 2m",
        powerRequired: "2KW",
        availability: "Available"
      },
      {
        name: "Prize Wheel Fortune",
        description: "عجلة الحظ الذهبية - لعبة الحظ التفاعلية الفاخرة مع جوائز حقيقية وشاشة عرض ضخمة. تتميز بتأثيرات ضوئية وصوتية احترافية.",
        price: 100,
        capacity: 10,
        spaceRequired: "3m × 3m",
        powerRequired: "2KW",
        availability: "Available"
      },
      {
        name: "Mini Golf Extreme",
        description: "الجولف المصغر الشديد - 18 حفرة بتصاميم معقدة مع عوائق ديناميكية وحسابات فيزيائية دقيقة. مزود بنظام النقاط الرقمي وتتبع الحركات.",
        price: 130,
        capacity: 4,
        spaceRequired: "5m × 4m",
        powerRequired: "1.5KW",
        availability: "Available"
      },
      {
        name: "VR Immersion Experience",
        description: "تجربة الواقع الافتراضي المغمورة - نظام VR متقدم يدعم +500 لعبة وتجربة افتراضية. دقة 8K مع تتبع حركة شامل وملابس تفاعلية.",
        price: 250,
        capacity: 1,
        spaceRequired: "3m × 3m",
        powerRequired: "4KW",
        availability: "Available"
      },
      {
        name: "Foosball Championship Table",
        description: "طاولة كرة الطاولة الاحترافية - تصميم هولندي فاخر مع عدادات إلكترونية وكواليس احترافية. مزودة بنظام الإضاءة المحيطة والصوت المحيطي.",
        price: 110,
        capacity: 2,
        spaceRequired: "2m × 1m",
        powerRequired: "1KW",
        availability: "Available"
      },
      {
        name: "Arcade Classic Bundle",
        description: "مجموعة الألعاب الكلاسيكية الشهيرة - 1000+ لعبة كلاسيكية من الثمانينات والتسعينات. آلة أركيد أصلية بحجم كامل مع جودة صوت وصورة عالية.",
        price: 160,
        capacity: 2,
        spaceRequired: "2m × 1m",
        powerRequired: "2KW",
        availability: "Available"
      },
      {
        name: "Strength Tester Pro",
        description: "جهاز اختبار القوة المحترف - منصة قياس القوة الشاملة تتضمن حبل السحب والضغط والركل. نتائج قياسية عالمية مع تقارير تفصيلية للأداء البدني.",
        price: 90,
        capacity: 1,
        spaceRequired: "2m × 1.5m",
        powerRequired: "1.5KW",
        availability: "Available"
      }
    ];

    let insertedCount = 0;
    for (const game of games) {
      const [result] = await connection.execute(
        'INSERT INTO games (name, description, price, capacity, spaceRequired, powerRequired, availability) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [game.name, game.description, game.price, game.capacity, game.spaceRequired, game.powerRequired, game.availability]
      );
      if (result.affectedRows > 0) insertedCount++;
    }

    connection.release();
    res.json({ message: `${insertedCount} games seeded successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seed professional testimonials
exports.seedTestimonials = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const testimonials = [
      {
        text: "أفضل مركز ألعاب زرته على الإطلاق! الألعاب حديثة والموظفون محترفون والأسعار معقولة جداً. أنصح الجميع بزيارة Next Level Games!",
        author: "محمد أحمد",
        role: "مدير المدرسة",
        rating: 5
      },
      {
        text: "نظمنا حفل عيد ميلاد ابننا هنا وكان كل شيء رائع من البداية إلى النهاية. الموظفون متعاونون والأطفال استمتعوا كثيراً.",
        author: "فاطمة محمود",
        role: "ربة منزل",
        rating: 5
      },
      {
        text: "كرهت أنني تركت هذا المكان! ألعاب فريدة من نوعها وتقنيات عالية جداً. المكان مثالي للحفلات والفعاليات.",
        author: "علي سالم",
        role: "منظم أحداث",
        rating: 5
      },
      {
        text: "جودة ممتازة وخدمة عالية جداً. زرت مراكز ألعاب أخرى لكن هذا الأفضل بكل المقاييس. شكراً على التجربة الرائعة!",
        author: "ليلى حسن",
        role: "محامية",
        rating: 5
      },
      {
        text: "مكان رائع لقضاء الوقت مع العائلة. الألعاب متنوعة وآمنة جداً. أتطلع لزيارتي القادمة!",
        author: "خالد عبدالله",
        role: "رجل أعمال",
        rating: 5
      },
      {
        text: "أنصح بشدة بزيارة Next Level Games. كل شيء احترافي وعالي الجودة. من أفضل الأماكن في المدينة!",
        author: "نور خليل",
        role: "مهندسة",
        rating: 5
      }
    ];

    let insertedCount = 0;
    for (const testimonial of testimonials) {
      const [result] = await connection.execute(
        'INSERT INTO testimonials (text, author, role, rating) VALUES (?, ?, ?, ?)',
        [testimonial.text, testimonial.author, testimonial.role, testimonial.rating]
      );
      if (result.affectedRows > 0) insertedCount++;
    }

    connection.release();
    res.json({ message: `${insertedCount} testimonials seeded successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear all data (for testing)
exports.clearAllData = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Delete in order of foreign key dependencies
    await connection.execute('DELETE FROM bookings');
    await connection.execute('DELETE FROM contacts');
    await connection.execute('DELETE FROM testimonials');
    await connection.execute('DELETE FROM games');

    connection.release();
    res.json({ message: 'All data cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
