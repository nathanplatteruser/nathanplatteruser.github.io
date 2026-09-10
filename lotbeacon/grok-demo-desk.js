/* LotBeacon desk demo overlay. Synthetic shopper only. Not a live Facebook inbox.
   Languages: English, Spanish, Vietnamese, Arabic (Nebraska DHHS Language and LEP Report Card 2021, ACS).
   Non-English lines are demo copy, not a certified translation. */
(function (global) {
  const THREAD_ID = 90;
  const NEXT = {
    yes: "yes, come in",
    no: "won't come in",
    later: "not yet",
  };

  const LANGS = [
    { id: "en", label: "English" },
    { id: "es", label: "Spanish" },
    { id: "vi", label: "Vietnamese" },
    { id: "ar", label: "Arabic" },
  ];

  const DEALER = {
    name: "Zoellner Ford",
    address: "4115 N. 6th Street, Beatrice, NE 68310",
    parkingSample: "Park in the visitor spots by the showroom doors, north lot off N. 6th.",
    rep: "Alex Reyes",
    tz: "America/Chicago",
  };

  const PATHS = [
    {
      id: "quick",
      label: "Quick",
      blurb: "Too-quick yes. Wants to drive for kicks. Not qualified. Gather who they are, which vehicle, buying vs fun, and a real time window.",
    },
    {
      id: "medium",
      label: "Medium",
      blurb: "Average path. A normal number of DMs before a clear yes or no.",
    },
    {
      id: "guided",
      label: "Guided",
      blurb: "Bounces across vehicles. Pulse moves up and down. Course-correct on dips, then grow momentum.",
    },
  ];

  const TAHOE = {
    id: 1,
    stock_number: "T2401",
    vin: "1GNSKSKD5RR123456",
    year: 2024,
    make: "Chevrolet",
    model: "Tahoe",
    trim: "Premier",
    color: "Black",
    body: "SUV",
    drivetrain: "4WD",
    mileage: 8412,
    price: 68950,
    status: "available",
    source: "pilot-feed-sim",
    retrieved_at: "2026-09-09T03:25:31.054855",
    fresh: true,
    age_seconds: 120,
    age: "2m",
  };

  const YUKON = {
    id: 3,
    stock_number: "S2301",
    vin: "1GKS2CKJ7PR112233",
    year: 2023,
    make: "GMC",
    model: "Yukon",
    trim: "SLT",
    color: "Onyx Black",
    body: "SUV",
    drivetrain: "4WD",
    mileage: 21500,
    price: 63200,
    status: "available",
    source: "pilot-feed-sim",
    retrieved_at: "2026-09-09T03:25:31.054855",
    fresh: true,
    age_seconds: 120,
    age: "2m",
  };

  function L(en, es, vi, ar) {
    return { en: en, es: es, vi: vi, ar: ar };
  }

  function E(en) {
    return { en: en };
  }

  const VEHICLE_LABEL = "2024 Chevrolet Tahoe Premier (stock T2401)";

  const QUICK_MISSING = ["who they are", "which vehicle", "buying vs driving for fun", "real time window"];

  const SCENARIOS = {
    quick: {
      hint: "Easy yes · drive for kicks · not qualified",
      summary: "offered an instant yes · not qualified",
      buddy: "Layup on the table · gather basics before any visit",
      next_action_hold: "Gather name, vehicle, buy vs fun, and a real time window. Do not book yet.",
      next_action_yes: "Basics are in. A person still taps Book.",
      funnel: { current: 1, furthest: 1, state: "NEEDS", substate: "Qualify before booking" },
      momentum: { series: [28, 36], trend: "up", delta: 8, label: "Show-odds climbing only after qualify", score: 36, blocks: 2 },
      signals: [
        { key: "price_fit", label: "Price fit", series: [50, 50], score: 50, delta: 0, trend: "flat", why: "No price talk yet. They are not a qualified buyer." },
        { key: "vehicle_fit", label: "Vehicle fit", series: [40, 48], score: 48, delta: 8, trend: "up", why: "They named the Tahoe, then said whatever you have." },
        { key: "show_odds", label: "Show-up odds", series: [22, 30], score: 30, delta: 8, trend: "up", why: "They offered tomorrow at 10 for kicks. The window is not confirmed." },
      ],
      headline: { text: "TOO QUICK. NOT QUALIFIED.", confidence: 94, why: "They asked to be booked on the spot to drive for kicks. The desk will not take the layup." },
      admin_hold: {
        asked: "Book me tomorrow at 10. I will come drive it for kicks.",
        acknowledged: "Yes. The draft names the easy yes and does not treat it as booked.",
        holding: NEXT.later,
        note: "Not qualified. Gather who they are, which vehicle, buying vs just driving for fun, and a real time window. Do not book the instant yes.",
      },
      admin_yes: {
        asked: "Riley Cole. Black Tahoe. Just the drive, not buying. Saturday 10 AM is a real window.",
        acknowledged: "Yes. The draft restates name, vehicle, drive-for-fun, and Saturday 10 AM.",
        holding: NEXT.yes,
        note: "Basics are in. Suggested wording still waits for a person to tap Book. Nothing sends to Facebook.",
      },
      facts_hold: [
        { key: "shopper_name", value: "not given", certainty: "tentative" },
        { key: "preferred_vehicle", value: "black Tahoe, or whatever is on the lot", certainty: "tentative" },
        { key: "visit_purpose", value: "drive for kicks (unconfirmed)", certainty: "tentative" },
        { key: "timing", value: "tomorrow at 10 (unconfirmed)", certainty: "tentative" },
      ],
      facts_yes: [
        { key: "shopper_name", value: "Riley Cole", certainty: "confirmed" },
        { key: "preferred_vehicle", value: "2024 Chevrolet Tahoe (Black)", certainty: "confirmed" },
        { key: "visit_purpose", value: "test drive only, not buying today", certainty: "confirmed" },
        { key: "timing", value: "Saturday 10:00 AM", certainty: "confirmed" },
      ],
      messages: [
        { dir: "in", ago: "14m", t: L(
          "Hey, is that black Tahoe still on the lot?",
          "Hola, ¿sigue en el lote la Tahoe negra?",
          "Chào, chiếc Tahoe đen còn trên bãi không?",
          "مرحبا، هل التاهو السوداء ما زالت عندكم؟"
        ) },
        { dir: "out", ago: "12m", t: L(
          "Yes. The 2024 Tahoe Premier in Black is here. Want to come see it this week?",
          "Sí. La Tahoe Premier 2024 en negro está aquí. ¿Quieres venir a verla esta semana?",
          "Có. Tahoe Premier 2024 màu đen vẫn ở đây. Bạn muốn qua xem tuần này không?",
          "نعم. تاهو بريميير 2024 السوداء موجودة. تحب تجي تشوفها هذا الأسبوع؟"
        ) },
        { dir: "in", ago: "1m", t: L(
          "Yes. Book me for tomorrow at 10. I'll come drive it for kicks. Whatever you have.",
          "Sí. Apúntame mañana a las 10. Voy a manejarla por diversión. Lo que tengan.",
          "Được. Đặt cho mình ngày mai lúc 10. Mình qua lái cho vui. Xe nào cũng được.",
          "نعم. احجز لي غداً الساعة 10. بجي أقود للمتعة. أي سيارة عندكم."
        ) },
      ],
      draft: L(
        "I hear you want to come drive for kicks tomorrow at 10. I am not booking that yet. This visit is not qualified. Reply with four things first: your name, which vehicle you want on the pad (black 2024 Tahoe Premier, stock T2401), whether you are buying or just driving for fun, and a real time window you can keep. A person here taps Book after that. Nothing sends to Facebook.",
        "Te oí: quieres venir a manejar por diversión mañana a las 10. Todavía no te agendo. Esta visita no está calificada. Primero responde cuatro cosas: tu nombre, qué vehículo quieres en el pad (Tahoe Premier 2024 negra, stock T2401), si vas a comprar o solo manejar por diversión, y una ventana de hora real que puedas cumplir. Una persona aquí pulsa Reservar después. Nada se envía a Facebook.",
        "Mình nghe bạn muốn qua lái cho vui ngày mai lúc 10. Mình chưa đặt lịch. Chưa đủ điều kiện. Trả lời bốn việc trước: tên bạn, xe nào lên pad (Tahoe Premier 2024 đen, mã T2401), bạn mua hay chỉ lái cho vui, và khung giờ thật bạn giữ được. Một người ở đây mới bấm Book. Không gửi Facebook.",
        "سمعت إنك تريد تجي تقود للمتعة غداً الساعة 10. ما أحجز الآن. الزيارة غير مؤهلة. رد بأربع نقاط أولاً: اسمك، أي سيارة على المعرض (تاهو بريميير 2024 السوداء، رقم T2401)، هل تشتري أم تقود للمتعة فقط، ووقت حقيقي تقدر تلتزم فيه. شخص هنا يضغط Book بعد ذلك. لا شيء يُرسل إلى فيسبوك."
      ),
      after: {
        shopper: L(
          "Riley Cole. The black Tahoe. Just driving for fun, not buying. Saturday 10 AM is a real window.",
          "Riley Cole. La Tahoe negra. Solo manejar por diversión, no comprar. El sábado a las 10 AM es una ventana real.",
          "Riley Cole. Tahoe đen. Chỉ lái cho vui, không mua. 10 giờ sáng Thứ Bảy là khung thật.",
          "رايلي كول. التاهو السوداء. قيادة للمتعة فقط، مو شراء. السبت 10 صباحاً وقت حقيقي."
        ),
      },
    },
    medium: {
      hint: "Average path · Saturday window · trade named",
      summary: "Tahoe + Saturday + trade",
      buddy: "Normal climb · two verified Saturday times",
      next_action_hold: "Offer Saturday 10:30 AM or 1:45 PM. Wait for a pick.",
      next_action_yes: "They picked 10:30 AM Saturday. A person still taps Book.",
      funnel: { current: 2, furthest: 2, state: "APPOINTMENT_INTENT", substate: "Visit interest" },
      momentum: { series: [32, 48, 64], trend: "up", delta: 32, label: "Show-odds climbing", score: 64, blocks: 3 },
      signals: [
        { key: "price_fit", label: "Price fit", series: [55, 58, 60], score: 60, delta: 5, trend: "up", why: "No price pushback. Fit is steady." },
        { key: "vehicle_fit", label: "Vehicle fit", series: [40, 62, 78], score: 78, delta: 38, trend: "up", why: "They named the black Tahoe and a 2018 Accord trade." },
        { key: "show_odds", label: "Show-up odds", series: [18, 40, 62], score: 62, delta: 44, trend: "up", why: "Saturday is on the table. Exact time is missing." },
      ],
      headline: { text: "HIGH INTENT", confidence: 80, why: "They named Saturday as a visit window." },
      admin_hold: {
        asked: "Is the black Tahoe available? 2018 Accord trade. Saturday might work.",
        acknowledged: "Yes. Draft restates the Tahoe, the trade, and two Saturday times.",
        holding: NEXT.later,
        note: "Average path. Waiting for a clear yes or no to coming in.",
      },
      admin_yes: {
        asked: "10:30 Saturday works. I will come in.",
        acknowledged: "Yes. Draft restates Saturday 10:30 AM plus where to go.",
        holding: NEXT.yes,
        note: "Clear yes, come in. A person still taps Book. Nothing sends to Facebook.",
      },
      facts_hold: [
        { key: "need", value: "3-row seating", certainty: "preferred" },
        { key: "preferred_vehicle", value: "2024 Chevrolet Tahoe (Black)", certainty: "stated" },
        { key: "trade_vehicle", value: "2018 Accord", certainty: "stated" },
        { key: "timing", value: "Saturday", certainty: "tentative" },
      ],
      facts_yes: [
        { key: "need", value: "3-row seating", certainty: "preferred" },
        { key: "preferred_vehicle", value: "2024 Chevrolet Tahoe (Black)", certainty: "stated" },
        { key: "trade_vehicle", value: "2018 Accord", certainty: "stated" },
        { key: "timing", value: "Saturday 10:30 AM", certainty: "confirmed" },
      ],
      messages: [
        { dir: "in", ago: "38m", t: L(
          "Hi, do you have any 3-row SUVs?",
          "Hola, ¿tienen SUVs de tres filas?",
          "Chào, bên mình có SUV ba hàng ghế không?",
          "مرحبا، عندكم دفع رباعي بثلاث صفوف؟"
        ) },
        { dir: "out", ago: "36m", t: L(
          "Yes we do. What matters most: space, towing, or mileage?",
          "Sí. ¿Qué importa más: espacio, arrastre o millaje?",
          "Có. Bạn cần nhất cái gì: chỗ ngồi, kéo xe, hay số dặm?",
          "نعم. وش الأهم: المساحة، السحب، ولا العداد؟"
        ) },
        { dir: "in", ago: "2m", t: L(
          "Space. The black Tahoe looks right. Still available? I have a 2018 Accord to trade. Saturday might work.",
          "El espacio. La Tahoe negra se ve bien. ¿Sigue disponible? Tengo un Accord 2018 de cambio. El sábado tal vez pueda.",
          "Chỗ ngồi. Tahoe đen hợp. Còn xe không? Mình có Accord 2018 đổi. Thứ Bảy có thể qua.",
          "المساحة. التاهو السوداء مناسبة. لسا موجودة؟ عندي أكورد 2018 للبدل. السبت يمكن أقدر أجي."
        ) },
      ],
      draft: L(
        "Yes, the black 2024 Tahoe Premier is here (stock T2401). We can look at your 2018 Accord when you visit. Saturday 10:30 AM or 1:45 PM. Which one works?",
        "Sí, la Tahoe Premier 2024 negra está aquí (stock T2401). Podemos ver tu Accord 2018 cuando vengas. Sábado 10:30 AM o 1:45 PM. ¿Cuál te sirve?",
        "Có, Tahoe Premier 2024 đen vẫn ở đây (mã T2401). Khi bạn qua mình xem luôn Accord 2018. Thứ Bảy 10:30 sáng hoặc 1:45 chiều. Khung nào tiện?",
        "نعم، تاهو بريميير 2024 السوداء موجودة (رقم T2401). نقدر نقيم أكورد 2018 يوم تجي. السبت 10:30 صباحاً أو 1:45 عصراً. أي وقت يناسبك؟"
      ),
      after: {
        shopper: L(
          "10:30 Saturday works. I'll come in.",
          "Me sirve el sábado a las 10:30. Voy.",
          "10:30 sáng Thứ Bảy được. Mình sẽ qua.",
          "السبت 10:30 مناسب. بجي."
        ),
      },
    },
    guided: {
      hint: "Bounces Tahoe, Yukon, F-150 · pulse moves",
      summary: "bounced across three vehicles",
      buddy: "Curveball · pulse dips then climbs · one next step",
      next_action_hold: "Acknowledge the bounce. Steer to one vehicle and one Saturday window.",
      next_action_yes: "They chose the Tahoe Saturday 10:30 AM. A person still taps Book.",
      funnel: { current: 1, furthest: 2, state: "VEHICLE_INTEREST", substate: "Second vehicle in play" },
      turns: buildGuidedTurns(),
    },
  };

  function buildGuidedTurns() {
    const m = [
      { dir: "in", ago: "52m", t: E("Is the black Tahoe Premier still on the lot?") },
      { dir: "out", ago: "50m", t: E("Yes. The 2024 Tahoe Premier in Black is here, stock T2401. Want to come drive it Saturday?") },
      { dir: "in", ago: "46m", t: E("What's the listed price? If it's high I might just come kick tires.") },
      { dir: "out", ago: "44m", t: E("Listed price is $68,950. I will not invent a different number in chat. Saturday morning or Saturday afternoon?") },
      { dir: "in", ago: "38m", t: E("Wait, what about the Yukon? How does it compare on towing and MPG?") },
      { dir: "out", ago: "36m", t: E("The Yukon SLT is here too, stock S2301. I will not guess towing or MPG in this chat. Those need the window sticker on the lot. Which one do you want on the pad Saturday?") },
      { dir: "in", ago: "30m", t: E("My cousin said F-150s hold value better. Can you send those numbers? Also do you have an Explorer?") },
      { dir: "out", ago: "28m", t: E("I heard Yukon, F-150 resale, and Explorer. I will not invent resale, towing, or MPG here. I can put one unit on the pad Saturday. Tahoe, Yukon, or a different look. Which one?") },
      { dir: "in", ago: "18m", t: E("The Tahoe price still feels high. Maybe the Yukon if it is less. I am bouncing.") },
      { dir: "out", ago: "16m", t: E("Listed only: Tahoe $68,950, Yukon $63,200. A manager talks any number change. You named two SUVs. Pick one to stand next to Saturday morning so the visit is real.") },
      { dir: "in", ago: "8m", t: E("Ok the Tahoe if you have it ready. Saturday morning. I might peek at the Yukon after.") },
      { dir: "out", ago: "6m", t: E("Tahoe first Saturday morning. Yukon stays on the lot if you want a look after. What exact morning time can you keep?") },
      { dir: "in", ago: "90s", t: E("10:30 Saturday. I'll show.") },
    ];

    function sliceAgo(list) {
      return list;
    }

    const pulses = [
      {
        price: { series: [64], score: 64, delta: 0, trend: "flat", why: "No price talk yet. Vehicle interest is opening." },
        vehicle: { series: [72], score: 72, delta: 0, trend: "flat", why: "They asked for the black Tahoe Premier." },
        show: { series: [42], score: 42, delta: 0, trend: "flat", why: "Saturday was offered. They have not accepted." },
        draftKind: "momentum",
        headline: "OPENING · TAHOE",
        asked: "Is the black Tahoe Premier still on the lot?",
        acknowledged: "Yes. Draft confirms the Tahoe and offers Saturday.",
        note: "First turn. Pulse is mid. Invite one Saturday window. Do not book yet.",
        holding: NEXT.later,
        draft: "Yes, the black 2024 Tahoe Premier is here (stock T2401). I can have it on the pad Saturday. Morning or afternoon?",
        facts: [
          { key: "preferred_vehicle", value: "2024 Chevrolet Tahoe (Black)", certainty: "stated" },
          { key: "timing", value: "Saturday (offered)", certainty: "tentative" },
        ],
        booking: "hold",
        count: 2,
      },
      {
        price: { series: [64, 46], score: 46, delta: -18, trend: "down", why: "They asked listed price and hinted they might only kick tires." },
        vehicle: { series: [72, 70], score: 70, delta: -2, trend: "down", why: "Still the Tahoe, but the visit is getting casual." },
        show: { series: [42, 38], score: 38, delta: -4, trend: "down", why: "Kick-tires language weakens show-up odds." },
        draftKind: "course_correct",
        headline: "PRICE DIP",
        asked: "What's the listed price? Might just kick tires.",
        acknowledged: "Yes. Draft states the listed price and refuses an invented number.",
        note: "Price fit dipped. Course-correct toward flat: listed price only, then one Saturday choice. No discount.",
        holding: NEXT.later,
        draft: "Listed price on the black Tahoe Premier is $68,950. I will not invent a lower number in chat. That keeps price fit honest. Saturday morning or Saturday afternoon, if you are actually coming?",
        facts: [
          { key: "preferred_vehicle", value: "2024 Chevrolet Tahoe (Black)", certainty: "stated" },
          { key: "asked_about", value: "listed price", certainty: "asked_about" },
          { key: "timing", value: "Saturday (offered, not accepted)", certainty: "tentative" },
        ],
        booking: "hold",
        count: 4,
      },
      {
        price: { series: [64, 46, 48], score: 48, delta: 2, trend: "up", why: "Price talk paused while they jumped vehicles." },
        vehicle: { series: [72, 70, 38], score: 38, delta: -32, trend: "down", why: "They left the Tahoe and asked how the Yukon compares." },
        show: { series: [42, 38, 26], score: 26, delta: -12, trend: "down", why: "The Saturday ask got dropped for a stats chase." },
        draftKind: "course_correct",
        headline: "VEHICLE DIP · YUKON",
        asked: "How does the Yukon compare on towing and MPG?",
        acknowledged: "Yes. Draft names the Yukon compare and refuses guessed stats.",
        note: "Vehicle fit and show-up dipped. Course-correct toward flat: acknowledge Yukon, no invented towing or MPG, one unit on the pad.",
        holding: NEXT.later,
        draft: "You jumped to the Yukon. I heard you. The Yukon SLT is on the lot (stock S2301). I will not guess towing or MPG in chat. Those need the window sticker. Which one do you want on the pad Saturday, Tahoe or Yukon?",
        facts: [
          { key: "preferred_vehicle", value: "2024 Chevrolet Tahoe (Black)", certainty: "stated" },
          { key: "asked_about", value: "Yukon towing and MPG", certainty: "asked_about" },
          { key: "timing", value: "Saturday (offered, not accepted)", certainty: "tentative" },
        ],
        booking: "hold",
        count: 6,
      },
      {
        price: { series: [64, 46, 48, 44], score: 44, delta: -4, trend: "down", why: "Resale talk pulled them off a real number." },
        vehicle: { series: [72, 70, 38, 28], score: 28, delta: -10, trend: "down", why: "Now Tahoe, Yukon, F-150 resale, and Explorer are all in play." },
        show: { series: [42, 38, 26, 20], score: 20, delta: -6, trend: "down", why: "Four directions, no visit commitment." },
        draftKind: "course_correct",
        headline: "BOUNCE · F-150 AND EXPLORER",
        asked: "F-150 resale numbers, and do you have an Explorer?",
        acknowledged: "Yes. Draft names F-150 resale and Explorer, then holds one next step.",
        note: "Another dip. Course-correct toward flat: list what they asked, refuse invented resale, force one vehicle.",
        holding: NEXT.later,
        draft: "You asked about F-150 resale and an Explorer, after the Yukon compare. I heard all three. I will not invent resale, towing, or MPG in this chat. I can put one unit on the pad Saturday. Tahoe, Yukon, or a different look. Which one?",
        facts: [
          { key: "preferred_vehicle", value: "unset · bouncing", certainty: "tentative" },
          { key: "asked_about", value: "Yukon towing/MPG; F-150 resale; Explorer", certainty: "asked_about" },
          { key: "timing", value: "Saturday (offered, not accepted)", certainty: "tentative" },
        ],
        booking: "hold",
        count: 8,
      },
      {
        price: { series: [64, 46, 48, 44, 36], score: 36, delta: -8, trend: "down", why: "They said the Tahoe price still feels high." },
        vehicle: { series: [72, 70, 38, 28, 46], score: 46, delta: 18, trend: "up", why: "Bounce narrowed to Tahoe vs Yukon, both on the lot." },
        show: { series: [42, 38, 26, 20, 32], score: 32, delta: 12, trend: "up", why: "They are still talking about a Saturday stand-next-to." },
        draftKind: "course_correct",
        headline: "PRICE DIP · TWO SUVS",
        asked: "Tahoe price feels high. Maybe the Yukon if it is less.",
        acknowledged: "Yes. Draft quotes listed prices only and asks for one Saturday vehicle.",
        note: "Price fit dipped again. Course-correct toward flat with listed prices, then one vehicle so show-up can rise.",
        holding: NEXT.later,
        draft: "Listed prices only: Tahoe Premier $68,950, Yukon SLT $63,200. I will not invent a discount. A manager talks any change. You are down to two SUVs. Which one do you want to stand next to Saturday morning?",
        facts: [
          { key: "preferred_vehicle", value: "Tahoe or Yukon", certainty: "tentative" },
          { key: "asked_about", value: "Tahoe vs Yukon listed price", certainty: "asked_about" },
          { key: "timing", value: "Saturday morning (offered)", certainty: "tentative" },
        ],
        booking: "hold",
        count: 10,
      },
      {
        price: { series: [64, 46, 48, 44, 36, 68], score: 68, delta: 32, trend: "up", why: "They accepted the listed Tahoe and stopped asking for a chat discount." },
        vehicle: { series: [72, 70, 38, 28, 46, 80], score: 80, delta: 34, trend: "up", why: "They chose Tahoe first, Yukon only as a later peek." },
        show: { series: [42, 38, 26, 20, 32, 74], score: 74, delta: 42, trend: "up", why: "Saturday morning is accepted. Exact time is the last gap." },
        draftKind: "momentum",
        headline: "RISING · TAHOE SATURDAY",
        asked: "Ok the Tahoe if you have it ready. Saturday morning. Might peek at the Yukon after.",
        acknowledged: "Yes. Draft locks Tahoe first and asks for an exact morning time.",
        note: "Rising turn. Grow momentum: restating Tahoe + Saturday morning, ask for a keepable time until all three are high.",
        holding: NEXT.later,
        draft: "Tahoe first Saturday morning. That is the unit on the pad. Yukon stays here if you want a look after. What exact Saturday morning time can you keep: 9:30 AM or 10:30 AM?",
        facts: [
          { key: "preferred_vehicle", value: "2024 Chevrolet Tahoe (Black)", certainty: "confirmed" },
          { key: "asked_about", value: "Yukon peek after Tahoe", certainty: "asked_about" },
          { key: "timing", value: "Saturday morning", certainty: "stated" },
        ],
        booking: "hold",
        count: 12,
      },
      {
        price: { series: [64, 46, 48, 44, 36, 68, 86], score: 86, delta: 18, trend: "up", why: "They stopped price shopping in chat and named a show time." },
        vehicle: { series: [72, 70, 38, 28, 46, 80, 92], score: 92, delta: 12, trend: "up", why: "Tahoe is first on the pad. Yukon is a maybe after." },
        show: { series: [42, 38, 26, 20, 32, 74, 90], score: 90, delta: 16, trend: "up", why: "They named Saturday 10:30 AM and said they will show." },
        draftKind: "momentum",
        headline: "ALL HIGH · TIME NAMED",
        asked: "10:30 Saturday. I'll show.",
        acknowledged: "Yes. Draft restates Saturday 10:30 AM, Tahoe, rep, address, and parking.",
        note: "Price fit, vehicle fit, and show-up are all high. A person still taps Book. Nothing sends to Facebook.",
        holding: NEXT.yes,
        draft: null,
        facts: [
          { key: "preferred_vehicle", value: "2024 Chevrolet Tahoe (Black)", certainty: "confirmed" },
          { key: "asked_about", value: "Yukon peek after Tahoe", certainty: "asked_about" },
          { key: "timing", value: "Saturday 10:30 AM", certainty: "confirmed" },
        ],
        booking: "selected",
        count: 13,
      },
    ];

    return pulses.map(function (p) {
      return {
        messages: sliceAgo(m.slice(0, p.count)),
        pulse: p,
        draftKind: p.draftKind,
        headline: { text: p.headline, confidence: 88, why: p.note },
        admin: {
          asked: p.asked,
          acknowledged: p.acknowledged,
          holding: p.holding,
          note: p.note,
        },
        draft: p.draft,
        facts: p.facts,
        booking: p.booking,
        next_action: p.booking === "selected"
          ? "They chose the Tahoe Saturday 10:30 AM. A person still taps Book."
          : (p.draftKind === "course_correct"
            ? "Course-correct the dip toward flat, then one next step."
            : "Grow momentum. Keep one vehicle and one Saturday window."),
      };
    });
  }

  const state = {
    lang: "en",
    path: "medium",
    step: 0,
    booked: false,
    draftOverride: null,
    parkingOverride: null,
  };

  function pick(pack) {
    if (!pack) return "";
    if (typeof pack === "string") return pack;
    return pack[state.lang] || pack.en;
  }

  function line(entry, lang) {
    const text = entry.t[lang] || entry.t.en;
    const gloss = lang === "en" || !entry.t[lang] || entry.t[lang] === entry.t.en ? null : entry.t.en;
    return { text: text, gloss: gloss, lang: lang, dir: entry.dir, ago: entry.ago };
  }

  function scenario() {
    return SCENARIOS[state.path];
  }

  function maxStep() {
    if (state.path === "guided") return scenario().turns.length - 1;
    return 1;
  }

  function guidedTurn() {
    const turns = scenario().turns;
    const i = Math.max(0, Math.min(turns.length - 1, state.step));
    return turns[i];
  }

  function parkingText() {
    return state.parkingOverride || DEALER.parkingSample;
  }

  function selectedSlot() {
    if (state.path === "quick") {
      return { label: "10:00 AM", day_label: "Saturday, September 12", iso: "2026-09-12T10:00:00-05:00", source: "customer_named" };
    }
    return { label: "10:30 AM", day_label: "Saturday, September 12", iso: "2026-09-12T10:30:00-05:00", source: "customer_named" };
  }

  function whenLabel() {
    const slot = selectedSlot();
    return slot.day_label + " at " + slot.label;
  }

  function confirmDraftText() {
    const park = parkingText();
    const head = whenLabel() + " for the " + VEHICLE_LABEL + ". Ask for " + DEALER.rep + " at " + DEALER.name + ", " + DEALER.address + ". Parking (sample, edit): " + park + ".";
    if (state.booked) return head;
    return head + " A person here still has to tap Book. Nothing sends to Facebook.";
  }

  function timeIsPicked() {
    if (state.booked) return true;
    if (state.path === "guided") return guidedTurn().booking === "selected";
    return state.step > 0;
  }

  function canBook() {
    return timeIsPicked() && !state.booked;
  }

  function nextStep() {
    if (state.booked || timeIsPicked()) return NEXT.yes;
    return NEXT.later;
  }

  function pulseSignals() {
    if (state.path === "guided") {
      const p = guidedTurn().pulse;
      const mk = function (key, label, block) {
        return { key: key, label: label, series: block.series, score: block.score, delta: block.delta, trend: block.trend, why: block.why };
      };
      return [
        mk("price_fit", "Price fit", p.price),
        mk("vehicle_fit", "Vehicle fit", p.vehicle),
        mk("show_odds", "Show-up odds", p.show),
      ];
    }
    const s = scenario();
    if (timeIsPicked() && s.signals) {
      return s.signals.map(function (sig) {
        if (sig.key === "show_odds" || sig.key === "visit_progression") {
          return Object.assign({}, sig, { series: sig.series.concat([88]), score: 88, delta: 18, trend: "up", why: "They named a keepable time." });
        }
        if (sig.key === "vehicle_fit") {
          return Object.assign({}, sig, { series: sig.series.concat([90]), score: 90, delta: 12, trend: "up", why: "Vehicle is confirmed for the visit." });
        }
        if (sig.key === "price_fit") {
          return Object.assign({}, sig, { series: sig.series.concat([Math.max(sig.score, 70)]), score: Math.max(sig.score, 70), trend: sig.trend, why: sig.why });
        }
        return sig;
      });
    }
    return s.signals;
  }

  function adminNote() {
    if (state.path === "guided") {
      const t = guidedTurn();
      const pulse = t.pulse;
      return {
        path: state.path,
        language: state.lang,
        asked: t.admin.asked,
        acknowledged: t.admin.acknowledged,
        holding: state.booked ? "booked in the demo (human tap)" : t.admin.holding,
        note: state.booked ? "Human tapped Book. Confirmation is a draft. Nothing sent to Facebook." : t.admin.note,
        draft_kind: t.draftKind,
        pulse: {
          price_fit: pulse.price.score,
          vehicle_fit: pulse.vehicle.score,
          show_odds: pulse.show.score,
          price_trend: pulse.price.trend,
          vehicle_trend: pulse.vehicle.trend,
          show_trend: pulse.show.trend,
        },
        step: state.step,
        steps: maxStep() + 1,
        demo_copy: state.lang !== "en",
      };
    }
    const s = scenario();
    const block = state.step === 0 ? s.admin_hold : s.admin_yes;
    const sigs = pulseSignals();
    const find = function (k) { return (sigs || []).find(function (x) { return x.key === k; }); };
    return {
      path: state.path,
      language: state.lang,
      asked: block.asked,
      acknowledged: block.acknowledged,
      holding: state.booked ? "booked in the demo (human tap)" : block.holding,
      note: state.booked ? "Human tapped Book. Confirmation is a draft. Nothing sent to Facebook." : block.note,
      pulse: {
        price_fit: (find("price_fit") || {}).score,
        vehicle_fit: (find("vehicle_fit") || {}).score,
        show_odds: (find("show_odds") || {}).score,
        price_trend: (find("price_fit") || {}).trend,
        vehicle_trend: (find("vehicle_fit") || {}).trend,
        show_trend: (find("show_odds") || {}).trend,
      },
      step: state.step,
      steps: maxStep() + 1,
      demo_copy: state.lang !== "en",
    };
  }

  function factList(rows) {
    return rows.map(function (f, i) {
      return {
        id: 9000 + i,
        key: f.key,
        value: f.value,
        certainty: f.certainty,
        confidence: 0.9,
        evidence: { message_id: 9003, text: "synthetic path fact" },
      };
    });
  }

  function bookingHold() {
    if (state.path === "quick") {
      return {
        stage: "visit_interest_tentative",
        date: "2026-09-12",
        date_label: "Saturday, September 12",
        timing_text: "tomorrow at 10 (unconfirmed)",
        timing_certainty: "tentative",
        selected: null,
        slots: [],
        missing: QUICK_MISSING.slice(),
        vehicle: TAHOE,
      };
    }
    if (state.path === "guided") {
      const t = guidedTurn();
      return {
        stage: "visit_interest_tentative",
        date: "2026-09-12",
        date_label: "Saturday, September 12",
        timing_text: "Saturday (offered)",
        timing_certainty: "tentative",
        selected: null,
        slots: [],
        missing: t.booking === "selected" ? [] : ["one vehicle", "keepable Saturday time"],
        vehicle: TAHOE,
      };
    }
    return {
      stage: "time_proposed",
      date: "2026-09-12",
      date_label: "Saturday, September 12",
      timing_text: "Saturday",
      timing_certainty: "tentative",
      selected: null,
      slots: [
        { label: "10:30 AM", day_label: "Saturday, September 12", iso: "2026-09-12T10:30:00-05:00" },
        { label: "1:45 PM", day_label: "Saturday, September 12", iso: "2026-09-12T13:45:00-05:00" },
      ],
      missing: ["exact time"],
      vehicle: TAHOE,
    };
  }

  function bookingSelected() {
    const slot = selectedSlot();
    return {
      stage: state.booked ? "booked" : "time_selected",
      date: "2026-09-12",
      date_label: "Saturday, September 12",
      time_label: slot.label,
      timing_text: "Saturday " + slot.label,
      timing_certainty: "confirmed",
      selected: slot,
      slots: [],
      missing: [],
      vehicle: TAHOE,
      address: DEALER.address,
      parking: parkingText(),
      rep_name: DEALER.rep,
    };
  }

  function booking() {
    return timeIsPicked() ? bookingSelected() : bookingHold();
  }

  function msgObj(i, built) {
    return {
      id: 9001 + i,
      direction: built.dir,
      author: built.dir === "in" ? "customer" : "rep",
      sender: built.dir === "in" ? "customer" : DEALER.rep,
      text: built.text,
      gloss: built.gloss,
      lang: built.lang,
      demo_copy: built.lang !== "en",
      sent_at: "2026-09-09T03:24:14.054855",
      ago: built.ago,
    };
  }

  function draftObj(text, gloss, book) {
    return {
      id: 9001,
      text: state.draftOverride != null ? state.draftOverride : text,
      gloss: gloss,
      status: "pending",
      risk_level: "green",
      approval_required: true,
      provider: "mock",
      created_at: "2026-09-09T03:26:00.000000",
      structured: {
        intent: "availability",
        recommended_action: timeIsPicked() ? "confirm_visit" : "invite_test_drive",
        missing_information: book.missing || [],
        booking: book,
        clarify: clarifyText(),
      },
      validation: { claims: [] },
    };
  }

  function clarifyText() {
    if (state.path === "quick" && state.step === 0) {
      return "Do not take the layup. Gather who they are, which vehicle, buying vs driving for fun, and a real time window.";
    }
    if (state.path === "guided" && !timeIsPicked()) {
      const kind = guidedTurn().draftKind;
      return kind === "course_correct"
        ? "Dip in the pulse. Course-correct toward flat, then one next step. No invented stats or discounts."
        : "Rising turn. Grow momentum until price fit, vehicle fit, and show-up are all high.";
    }
    if (timeIsPicked() && !state.booked) {
      return "Time is picked. Suggested reply has date, time, vehicle, rep, address, and parking. A person still taps Book.";
    }
    return null;
  }

  function customerName() {
    if (state.path === "quick" && state.step === 0 && !state.booked) return "Unknown shopper";
    return "Riley Cole";
  }

  function messageList() {
    const lang = state.lang;
    if (state.path === "guided") {
      return guidedTurn().messages.map(function (m, i) { return msgObj(i, line(m, lang)); });
    }
    const s = scenario();
    const messages = s.messages.map(function (m, i) { return msgObj(i, line(m, lang)); });
    if (state.step > 0) {
      const sent = line({ dir: "out", ago: "20s", t: s.draft }, lang);
      messages.push(msgObj(messages.length, sent));
      const shop = line({ dir: "in", ago: "8s", t: s.after.shopper }, lang);
      messages.push(msgObj(messages.length, shop));
    }
    return messages;
  }

  function draftPack() {
    if (timeIsPicked()) {
      const text = confirmDraftText();
      return { text: text, pack: E(text) };
    }
    if (state.path === "guided") {
      const text = guidedTurn().draft;
      return { text: text, pack: E(text) };
    }
    const s = scenario();
    return { text: pick(s.draft), pack: s.draft };
  }

  function factRows() {
    if (state.path === "guided") return guidedTurn().facts;
    const s = scenario();
    return state.step > 0 ? s.facts_yes : s.facts_hold;
  }

  function momentumNow() {
    if (state.path === "guided") {
      const show = guidedTurn().pulse.show;
      return {
        kind: "show_likelihood",
        series: show.series,
        trend: show.trend,
        delta: show.delta,
        label: show.trend === "down" ? "Show-odds slipping" : show.trend === "up" ? "Show-odds climbing" : "Show-odds holding",
        score: show.score,
        blocks: show.series.length,
      };
    }
    const s = scenario();
    if (timeIsPicked()) {
      return Object.assign({}, s.momentum, { series: s.momentum.series.concat([88]), score: 88, trend: "up", delta: 14, label: "Show-odds climbing", blocks: s.momentum.blocks + 1 });
    }
    return Object.assign({ kind: "show_likelihood" }, s.momentum);
  }

  function detail() {
    const s = scenario();
    const lang = state.lang;
    const messages = messageList();
    const book = booking();
    const facts = factList(factRows());
    const admin = adminNote();
    const nxt = nextStep();
    const dpack = draftPack();
    const sigs = pulseSignals();
    const headline = state.path === "guided"
      ? (timeIsPicked() ? null : guidedTurn().headline)
      : (timeIsPicked() ? null : s.headline);
    const confirmed = timeIsPicked();
    return {
      id: THREAD_ID,
      customer: { id: THREAD_ID, name: customerName(), psid: "psid_desk_demo", opted_out: false },
      lead_state: confirmed ? "APPOINTMENT_INTENT" : (state.path === "guided" ? guidedTurn().pulse && s.funnel.state : s.funnel.state),
      priority: 90,
      priority_reason: "desk demo",
      ai_paused: false,
      voice: "dealer",
      voice_locked: false,
      voice_reason: "auto · dealership default",
      hint: s.hint,
      demo_remaining: confirmed ? 0 : 1,
      demo_path: state.path,
      demo_lang: lang,
      demo_copy: lang !== "en",
      next_step: nxt,
      admin_note: admin,
      funnel: {
        stages: [
          { key: "ENGAGE", label: "Engage" },
          { key: "QUALIFY", label: "Qualify" },
          { key: "BOOK", label: "Book" },
          { key: "VISIT", label: "Visit outcome" },
        ],
        current: state.booked ? 2 : (confirmed ? 2 : (state.path === "guided" ? 1 : s.funnel.current)),
        furthest: 2,
        paused: null,
        state: state.booked ? "APPOINTMENT_SET" : (confirmed ? "APPOINTMENT_INTENT" : s.funnel.state),
        substate: state.booked ? "Booked in demo" : (confirmed ? "Time selected" : (state.path === "guided" ? guidedTurn().headline.text : s.funnel.substate)),
      },
      your_move: {
        kind: state.booked ? "booked" : (confirmed ? "book" : "approve"),
        text: state.booked
          ? "Booked in this recording. Suggested wording is still a draft. Nothing sent to Facebook."
          : (confirmed
            ? "They named a time. Suggested wording is a draft. A person sends, then taps Book."
            : "Suggested wording is a draft. A person still taps Send."),
      },
      momentum: momentumNow(),
      signals: {
        events: messages.filter(function (m) { return m.direction === "in"; }).length,
        headline: headline,
        signals: sigs,
      },
      facts: facts,
      deal_file: {
        notes: [
          { key: "show_likelihood", label: "Show-up odds", value: momentumNow().score + "% · " + momentumNow().label, quote: null, derived: true },
          { key: "price_fit", label: "Price fit", value: String((admin.pulse && admin.pulse.price_fit) || "") , quote: null, derived: true },
          { key: "vehicle_fit", label: "Vehicle fit", value: String((admin.pulse && admin.pulse.vehicle_fit) || ""), quote: null, derived: true },
          { key: "admin_ack", label: "Admin note", value: admin.asked, quote: admin.acknowledged, derived: true },
          { key: "next_step", label: "Next step held", value: admin.holding, quote: admin.note, derived: true },
          { key: "address", label: "Dealership address", value: DEALER.address, quote: DEALER.name, derived: true },
        ],
        forward_text: "Asked: " + admin.asked + "\nAcknowledged: " + admin.acknowledged + "\nHolding: " + admin.holding + "\nAddress: " + DEALER.address,
      },
      transitions: [
        { from: "NEW", to: "VEHICLE_MATCH", reason: "synthetic desk path", actor: "demo", at: "2026-09-09T03:26:00.000000", evidence_message_id: 9001 },
      ],
      messages: messages,
      draft: draftObj(dpack.text, lang === "en" ? null : (dpack.pack && dpack.pack.en) || dpack.text, book),
      booking: book,
      clarify: clarifyText(),
      vehicle: TAHOE,
      ghost: null,
      window: { channel: "Facebook Messenger", open: true, reason: "inbound_within_window", remaining: "23h 50m", hours_left: 23.8, closing_soon: false },
      ownership: { rep_id: 1, rep_name: DEALER.rep, ai_drafting: true, line: "AI drafting · " + DEALER.rep + " sends · no autonomous sends" },
    };
  }

  function row() {
    const s = scenario();
    const confirmed = timeIsPicked();
    const m = momentumNow();
    return {
      id: THREAD_ID,
      customer: customerName(),
      channel: "Facebook Messenger",
      bucket: state.booked ? "appointment_changes" : "reply_now",
      waiting: confirmed ? null : "1m 12s",
      waiting_seconds: confirmed ? 0 : 72,
      summary: s.summary,
      hint: s.buddy,
      next_action: state.booked
        ? "Booked in the demo. Nothing sent to Facebook."
        : (state.path === "guided" ? guidedTurn().next_action : (confirmed ? s.next_action_yes : s.next_action_hold)),
      vehicle: "2024 Tahoe",
      window_left: "23h 50m",
      window_hours_left: 23.8,
      unread: !confirmed,
      owner: 1,
      blocked: false,
      needs_person: false,
      last_customer_message_at: "2026-09-09T03:25:00.054855",
      momentum: m,
      state: state.booked ? "APPOINTMENT_SET" : (confirmed ? "APPOINTMENT_INTENT" : s.funnel.state),
      priority: 90,
    };
  }

  function explain() {
    const s = scenario();
    const admin = adminNote();
    return [
      { step: "Read", label: "Synthetic shopper on the " + s.hint + " path", detail: "Not a live Facebook inbox. Demo copy only." },
      { step: "Remember", label: admin.asked, detail: "Facts stay on this path. Unknown stays unknown." },
      { step: "Verify", label: "Tahoe T2401 available in the seed feed", detail: "Price and miles may be quoted. Towing, MPG, and resale may not." },
      { step: "Stage", label: timeIsPicked() ? "Time selected" : s.funnel.substate, detail: "Final next step is one of: yes, come in / won't come in / not yet." },
      { step: "Decide", label: admin.holding, detail: admin.note },
      { step: "Check", label: "No financing, APR, payment, trade value, or booked claim from chat", detail: "Suggested wording is a draft." },
      { step: "Gate", label: "Human Send, then human Book", detail: "A person still sends. A person still taps Book. No autonomous sends. Nothing sends to Facebook." },
    ];
  }

  function impact() {
    return {
      reached: "synthetic desk path",
      headline: [
        "Synthetic conversation. Not a live Facebook inbox.",
        "Suggested wording is a draft. A person still sends.",
      ],
      usage: { customer_messages: messageList().filter(function (m) { return m.direction === "in"; }).length, replies_sent: messageList().filter(function (m) { return m.direction === "out"; }).length, drafts_accepted_as_is: 0, drafts_edited: 0, typed_manually: 0 },
      speed: { first_response: "2m", median_response: "2m" },
      safety: { claims_routed_for_verification: state.path === "guided" ? 1 : 0, blocked_sends: 0, handed_to_a_person: 1, rep_corrections: 0 },
      return: { rep_minutes_saved: 5 },
      assumptions: {},
      explain: ["Numbers on this card are from the synthetic path, not a live store."],
    };
  }

  function parseIsoLocal(iso) {
    const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}):(\d{2})$/);
    if (!m) return null;
    return {
      y: m[1], mo: m[2], d: m[3], h: m[4], mi: m[5], s: m[6],
      offsetH: parseInt(m[7], 10),
      compact: m[1] + m[2] + m[3] + "T" + m[4] + m[5] + m[6],
    };
  }

  function addHour(compact) {
    const h = parseInt(compact.slice(9, 11), 10) + 1;
    return compact.slice(0, 9) + String(h).padStart(2, "0") + compact.slice(11);
  }

  function toUtcCompact(parts) {
    const start = Date.UTC(+parts.y, +parts.mo - 1, +parts.d, +parts.h - parts.offsetH, +parts.mi, +parts.s);
    const end = start + 60 * 60 * 1000;
    function fmt(ms) {
      const dt = new Date(ms);
      const p = function (n) { return String(n).padStart(2, "0"); };
      return dt.getUTCFullYear() + p(dt.getUTCMonth() + 1) + p(dt.getUTCDate()) + "T" + p(dt.getUTCHours()) + p(dt.getUTCMinutes()) + p(dt.getUTCSeconds()) + "Z";
    }
    return { start: fmt(start), end: fmt(end) };
  }

  function icsEscape(s) {
    return String(s).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  }

  function calendarPack() {
    if (!timeIsPicked()) return null;
    const slot = selectedSlot();
    const parts = parseIsoLocal(slot.iso);
    if (!parts) return null;
    const utc = toUtcCompact(parts);
    const park = parkingText();
    const title = DEALER.name + " visit · " + TAHOE.year + " " + TAHOE.make + " " + TAHOE.model + " " + TAHOE.trim;
    const details = [
      "Ask for " + DEALER.rep + ".",
      VEHICLE_LABEL + ".",
      "Parking (sample, edit): " + park,
      "Demo only. Nothing sent to Facebook.",
    ].join(" ");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//LotBeacon//Desk Demo//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:lotbeacon-demo-" + parts.compact + "@zoellner",
      "DTSTAMP:20260909T130000Z",
      "DTSTART;TZID=" + DEALER.tz + ":" + parts.compact,
      "DTEND;TZID=" + DEALER.tz + ":" + addHour(parts.compact),
      "SUMMARY:" + icsEscape(title),
      "DESCRIPTION:" + icsEscape(details),
      "LOCATION:" + icsEscape(DEALER.address),
      "END:VEVENT",
      "END:VCALENDAR",
      "",
    ].join("\r\n");
    const google = "https://calendar.google.com/calendar/render?action=TEMPLATE"
      + "&text=" + encodeURIComponent(title)
      + "&dates=" + utc.start + "/" + utc.end
      + "&details=" + encodeURIComponent(details)
      + "&location=" + encodeURIComponent(DEALER.address);
    return {
      title: title,
      when: whenLabel(),
      vehicle: VEHICLE_LABEL,
      rep: DEALER.rep,
      address: DEALER.address,
      parking: park,
      icsText: ics,
      icsHref: "data:text/calendar;charset=utf-8," + encodeURIComponent(ics),
      icsName: "zoellner-visit-2026-09-12.ics",
      googleUrl: google,
    };
  }

  function setLang(id) {
    if (!LANGS.some(function (l) { return l.id === id; })) return;
    state.lang = id;
    state.draftOverride = null;
  }

  function setPath(id) {
    if (!SCENARIOS[id]) return;
    state.path = id;
    state.step = 0;
    state.booked = false;
    state.draftOverride = null;
    state.parkingOverride = null;
  }

  function resetStep() {
    state.step = 0;
    state.booked = false;
    state.draftOverride = null;
  }

  function stepThread(delta) {
    const next = Math.max(0, Math.min(maxStep(), state.step + (delta || 0)));
    state.step = next;
    state.draftOverride = null;
    if (!timeIsPicked()) state.booked = false;
    return { step: state.step, max: maxStep() };
  }

  function send() {
    if (state.step < maxStep()) {
      state.step += 1;
      state.draftOverride = null;
      return { demo: { replied: true }, next_thread_id: THREAD_ID };
    }
    return { demo: { replied: false }, next_thread_id: THREAD_ID };
  }

  function book() {
    if (!timeIsPicked()) {
      return {
        blocked: true,
        label: null,
        note: state.path === "quick"
          ? "Not qualified. Gather who they are, which vehicle, buying vs fun, and a real time window first."
          : "A date and time is not picked yet. Do not book.",
      };
    }
    state.booked = true;
    state.draftOverride = null;
    return { blocked: false, label: selectedSlot().label, date_label: "Saturday, September 12" };
  }

  function editDraft(text) {
    state.draftOverride = text;
    return detail().draft;
  }

  function editParking(text) {
    state.parkingOverride = String(text || "");
    if (timeIsPicked() && state.draftOverride == null) {
      /* confirm draft rebuilds from parkingText() */
    } else if (timeIsPicked()) {
      state.draftOverride = confirmDraftText();
    }
    return calendarPack();
  }

  function handles(id) {
    return String(id) === String(THREAD_ID);
  }

  function fromQuery() {
    try {
      const q = new URLSearchParams(location.search);
      if (q.get("lang")) setLang(q.get("lang"));
      if (q.get("path")) setPath(q.get("path"));
      if (q.get("step")) {
        const n = parseInt(q.get("step"), 10);
        if (!isNaN(n)) {
          state.step = 0;
          stepThread(n);
        }
      }
    } catch (e) { /* ignore */ }
  }

  global.LB_DESK = {
    THREAD_ID: THREAD_ID,
    LANGS: LANGS,
    PATHS: PATHS,
    NEXT: NEXT,
    SCENARIOS: SCENARIOS,
    DEALER: DEALER,
    TAHOE: TAHOE,
    YUKON: YUKON,
    QUICK_MISSING: QUICK_MISSING,
    state: state,
    setLang: setLang,
    setPath: setPath,
    resetStep: resetStep,
    stepThread: stepThread,
    maxStep: maxStep,
    send: send,
    book: book,
    canBook: canBook,
    timeIsPicked: timeIsPicked,
    editDraft: editDraft,
    editParking: editParking,
    calendarPack: calendarPack,
    confirmDraftText: confirmDraftText,
    detail: detail,
    row: row,
    explain: explain,
    impact: impact,
    adminNote: adminNote,
    nextStep: nextStep,
    pulseSignals: pulseSignals,
    handles: handles,
    fromQuery: fromQuery,
  };
})(typeof window !== "undefined" ? window : globalThis);
