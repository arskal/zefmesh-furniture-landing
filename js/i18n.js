/* ==========================================================================
   i18n.js — one translations object, DOM driven by data-i18n attributes.
   The DOM is never duplicated per language.

   Attributes honoured on any element:
     data-i18n        -> textContent
     data-i18n-html   -> innerHTML (only for strings with inline markup)
     data-i18n-alt    -> alt
     data-i18n-label  -> aria-label
     data-i18n-title  -> title
     data-i18n-content-> content   (meta tags)

   Amharic is the default. The choice persists in localStorage.zefmesh_lang
   and sets document.documentElement.lang, which is what drives every
   bilingual typography rule in tokens.css.
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "zefmesh_lang";
  var DEFAULT_LANG = "am";

  /* ---------------------------------------------------------------------- */

  var translations = {
    am: {
      /* ---- document head ---- */
      metaTitle: "ዘፍመሽ ፈርኒቸር — ጥራት ያለው የቤት እቃ በአዲስ አበባ",
      metaDesc:
        "ዘፍመሽ ፈርኒቸር — ሶፋ፣ አልጋ፣ የቢሮና የወጥ ቤት እቃዎች። ሀገር በቀልና ከውጭ የገባ። በጃክሮስ/ገርጂ እና በመገናኛ ሁለት ቅርንጫፎች።",

      /* ---- announcement ---- */
      announce: "ሁለት ቅርንጫፎች — ጃክሮስ/ገርጂ እና መገናኛ። ከሰኞ እስከ ቅዳሜ ክፍት ነን።",
      announceClose: "ማስታወቂያውን ዝጋ",

      /* ---- navigation ---- */
      navFurniture: "የቤት እቃዎች",
      navWhyUs: "ለምን እኛን",
      navFaq: "ጥያቄዎች",
      navContact: "ቅርንጫፎች",
      navRooms: "በክፍል ይምረጡ",
      navDelivery: "ማድረስ",
      navCall: "ይደውሉ",
      navMenuOpen: "ዝርዝሩን ክፈት",
      navMenuClose: "ዝርዝሩን ዝጋ",
      langLabel: "ቋንቋ",
      langAm: "አማ",
      langEn: "EN",
      skipLink: "ወደ ዋናው ክፍል ዝለል",

      /* ---- branch chooser ---- */
      chooserTitle: "የትኛውን ቅርንጫፍ ይደውሉ?",
      chooserBody: "ሁለቱም ቅርንጫፎች ከሰኞ እስከ ቅዳሜ ክፍት ናቸው።",
      chooserClose: "ዝጋ",

      /* ---- hero ---- */
      heroEyebrow: "ጃክሮስ / ገርጂ · መገናኛ",
      heroTitle: "ጥራት ያለው የቤት እቃ፣ <em>ሀገር በቀልና ከውጭ የገባ</em>",
      heroSub:
        "ሶፋ፣ አልጋ፣ የቢሮና የወጥ ቤት እቃዎች — በጃክሮስና በመገናኛ ሱቆቻችን ውስጥ ተመልክተው ይምረጡ።",
      heroBtn: "ሱቃችንን ይጎብኙ",
      heroBtn2: "የቤት እቃዎችን ይመልከቱ",
      heroAlt: "በመብራት የደመቀ ሳሎን — የቆዳ ሶፋ፣ የቡና ጠረጴዛና ወንበሮች",
      trust1: "ሁለት ቅርንጫፎች በአዲስ አበባ",
      trust2: "በሳምንት ስድስት ቀን ክፍት",
      trust3: "ሀገር በቀልና ከውጭ የገባ እቃ",

      /* ---- stats ---- */
      statsEyebrow: "በአጭሩ",
      statsTitle: "በአጭሩ ዘፍመሽ",
      stat1: "ሁለት ቅርንጫፎች በአዲስ አበባ",
      stat2: "የምናስውባቸው ክፍሎች",
      stat3: "ለአመታት ውድ ደምበኞቻችንን አገልግለናል",
      stat4Fig: "በመላው አዲስ አበባ",
      stat4: "በመላው አዲስ አበባ ተደራሽነት ያለን",

      /* ---- shop by room ---- */
      roomsEyebrow: "በክፍል",
      roomsTitle: "የትኛውን ክፍል ነው የሚያስውቡት?",
      roomsLede: "አራቱንም ክፍል በአንድ ሱቅ ውስጥ፣ በሁለቱም ቅርንጫፎች ያገኛሉ።",
      roomsSwipe: "ለማየት ወደ ጎን ያንሸራትቱ",
      catLiving: "ሳሎን",
      catBedroom: "መኝታ ቤት",
      catOffice: "ቢሮ",
      catKitchen: "ወጥ ቤት",
      roomLivingMeta: "ሶፋ፣ የቡና ጠረጴዛ፣ የቲቪ ማስቀመጫ",
      roomBedroomMeta: "አልጋ፣ ኮሞዲኖ፣ ቁም ሳጥን",
      roomOfficeMeta: "ጠረጴዛ፣ የቢሮ ወንበር፣ መደርደሪያ",
      roomKitchenMeta: "የመመገቢያ ጠረጴዛ፣ ወንበር፣ ቁም ሳጥን",

      /* ---- catalogue ---- */
      catEyebrow: "ካታሎግ",
      catTitle: "የቤት እቃዎቻችንን ይመልከቱ",
      catLede:
        "ዋጋ በስልክ ወይም በሱቅ ውስጥ በግልጽ ይነገርዎታል። ፎቶውን ነክተው ማስፋት ይችላሉ።",
      filterLabel: "ለእያንዳንዱ የቤትዎ ክፍል",
      tabAll: "ሁሉም",
      originLocal: "ሀገር በቀል",
      originImported: "ከውጭ የገባ",
      itemCta: "ስለ ዋጋ ለማወቅ ይደውሉ",
      itemZoom: "ፎቶውን አስፋ",
      catEmpty: "በዚህ ክፍል ውስጥ ገና ምንም እቃ አልገባም።",

      item1: "ባለ ሶስት ሰው ሶፋ",
      item2: "የቆዳ ሶፋና የቡና ጠረጴዛ",
      item3: "ባለ ሰፊ ራስጌ አልጋ",
      item4: "መሉ በሙሉ የተሟላ የመኝታ ቤት እቃ",
      item5: "አልጋ ከመቀመጫዉ ጋር",
      item6: "አልጋና የራስጌ ጠረጴዛ",
      item7: "የስራ አስኪያጅ ጠረጴዛ",
      item8: "ጥራት ካለው እንጨት የተሰራ የቢሮ እቃ",
      item9: "ለስብሰባ የሚሆን ጠረጴዛ",
      item10: "ክብ የመመገቢያ ጠረጴዛ",
      item11: "የመመገቢያ ጠረጴዛ ከወንበሮች ጋር",
      item12: "ባለ ስድስት ሰው የመመገቢያ ስብስብ",

      /* ---- local vs imported ---- */
      srcEyebrow: "ከየት እንደሚመጣ",
      srcTitle: "ሀገር በቀል እና ከውጭ የገባ",
      srcLede:
        "ሁለቱም በአንድ ሱቅ ውስጥ ጎን ለጎን ስለሚቀመጡ አነጻጽረው ማየት ይችላሉ።",
      srcMaterials: "እቃው",
      srcLead: "የሚፈጅበት ጊዜ",
      srcSuits: "ተመራጭነቱ",
      srcLocalTitle: "ሀገር በቀል",
      srcLocalBody:
        "እዚሁ አዲስ አበባ ውስጥ የተሰራ። መጠኑን፣ ጨርቁንና ቀለሙን እንደፍላጎትዎ ማስተካከል ስለሚቻል ቤትዎ ላይ አንዳሰቡት ይሆናል።",
      srcLocalMaterials: "የሀገር ውስጥ እንጨት፣ ስፖንጅና ጨርቅ",
      srcLocalLead: "በሱቅ ውስጥ ካለ ወዲያውኑ፤ በትዕዛዝ ከሆነ በተወሰነ ጊዜ  ገደብ ውስጥ ይደርሳል ",
      srcLocalSuits: "መጠን ወይም ጨርቅ ማስተካከል ለሚፈልጉ",
      srcLocalAlt: "በእንጨት የተሰራ የቢሮ ጠረጴዛና ወንበሮች",
      srcImpTitle: "ከውጭ የገባ",
      srcImpBody:
        "ተመርጦ ከውጭ የገባ። በሱቅ ውስጥ ያለውን አይተው ወዲያውኑ መውሰድ ይችላሉ።",
      srcImpMaterials: "በውጪ ሀገር የተሰራ እንጨት፣ ብረት፣ ቆዳና ቬልቬት",
      srcImpLead: "በሱቅ ውስጥ ካለው ውስጥ ወዲያውኑ",
      srcImpSuits: "በዚህ ሳምንት እቃ ለሚፈልጉ",
      srcImpAlt: "ከውጭ የገቡ የእንጨት ጠረጴዛና መሳቢያዎች በሱቅ ውስጥ ያገኛሉ ",

      /* ---- why us ---- */
      whyEyebrow: "ለምን ምርጫዎ እንደሚያደርጉን",
      whyChooseTitle: "ለምን ታማኝ ደምበኛ እንደሚሆኑ",
      whyLede: "አራት ምክንያቶች — ሁሉም በሱቅ ውስጥ የሚረጋገጡ።",
      value1Title: "ሰፊ ምርጫ",
      value1Body:
        "ሳሎን፣ መኝታ ቤት፣ ቢሮና ወጥ ቤት — አራቱም ክፍሎች በአንድ ጣራ ስር። ሀገር በቀልና ከውጭ የገቡ እቃዎች ጎን ለጎን ስለሚቀመጥ አማራጮቹን አነጻጽረው ማየት ይችላሉ።",
      value2Title: "ተመጣጣኝ ዋጋ",
      value2Body:
        "ሱቅ በመምጣት በግልጽ ይነገርዎታል። ከመወሰንዎ በፊት ዋጋውን አውቀው ሁለት ሶስት እቃ አነጻጽረው ማየት ይችላሉ።",
      value3Title: "በጥራቱ የታወቀ",
      value3Body:
        "እያንዳንዱን እቃ ከመግዛትዎ በፊት ተቀምጠውበት፣ እንዲሁም መዝነው ማየት ይችላሉ። ፎቶ የማያሳየውን በአካል ያረጋግጣሉ።",
      value4Title: "ሁለት ቅርንጫፍ",
      value4Body:
        "ጃክሮስ/ገርጂ እና መገናኛ። ወደ አንዱ ቅርብ ከሆኑ ሳይርቁ መድረስ ይችላሉ፤ የፈለጉት እቃ በየትኛው ቅርንጫፍ እንዳለ እናሳውቆታለን።",

      /* ---- how to buy ---- */
      howEyebrow: "እንዴት እንደሚገዙ",
      howTitle: "ከበሩ እስከ ሳሎንዎ",
      howLede: "አራት ደረጃ፣ ውስብስብ ነገር የለውም።",
      step1Title: "ሱቅ ይምጡ",
      step1Body:
        "ወደ ጃክሮስ/ገርጂ ወይም ወደ መገናኛ ይምጡ። አስቀድመው ቢደውሉ የፈለጉት እቃ መኖሩን አረጋግጠን እንነግርዎታለን።",
      step2Title: "ይምረጡ እና ያረጋግጡ",
      step2Body:
        "እቃውን ተቀምጠውበት፣ መጠኑን ለክተው ይምረጡ። ዋጋውን፣ ቀለሙንና ጨርቁን አረጋግጠን እናቀርብሎታለን።",
      step3Title: "አድራሻዎን ያዘጋጁ",
      step3Body:
        "አድራሻዎን፣ ፎቁንና የሚመችዎትን ቀን እንይዛለን። የማድረሻ ክፍያ ካለ አስቀድመን እንነግርዎታለን።",
      step4Title: "እራሳችን ገጥመን እናስረክቦታለን",
      step4Body:
        "እቃው ደርሶ ይገጣጠማል። ከመሄዳችን በፊት ሁሉም ነገር በትክክል መሆኑን አብረን እናረጋግጣለን።",

      /* ---- delivery ---- */
      delEyebrow: "ማድረስና መገጣጠም",
      delTitle: "እቃው ወደ ቤትዎ እንዴት እንደሚደርስ",
      delCoverage: "የአገልግሎት ክልል",
      delCoverageBody:
        "በአዲስ አበባ ውስጥ ወዳሉ አካባቢዎች በነፃ እናደርሳለን። ከከተማ ውጭ ስለማድረስ ሲደውሉ እንነጋገራለን።",
      delIncluded: "የሚካተት",
      delIncluded1: "ከሱቅ እስከ አድራሻዎ ማጓጓዝ",
      delIncluded2: "ወደ ቤት ማስገባትና ማስቀመጥ",
      delIncluded3: "መገጣጠም የሚያስፈልጋቸውን መገጣጠም",
      delIncluded4: "ማሸጊያውን ይዘን መመለስ",
      delExtra: "ተጨማሪ ክፍያ ያለው",
      delExtra1: "ከአዲስ አበባ ውጭ ማድረስ",
      delExtra2: "ሊፍት በሌለበት ወደ ላይኛው ፎቅ ማውጣት",
      delExtra3: "በመስኮት ወይም በክሬን ማስገባት",
      delNote:
        "የማድረሻ ዋጋና ጊዜ በአካባቢውና በእቃው መጠን ይለያያል። ትክክለኛውን ዋጋ ሲደውሉ እንነግርዎታለን።",

      /* ---- testimonials ---- */
      tstmEyebrow: "የደንበኞች አስተያየት",
      tstmTitle: "ደንበኞቻችን ምን ይላሉ",
      tstmNote:
        "ማሳሰቢያ ለባለቤቱ — ከዚህ በታች ያሉት ሶስቱም አስተያየቶች ናሙና ናቸው። ከመለቀቁ በፊት በእውነተኛ የደንበኛ አስተያየትና ስም ይተኩ።",
      tstmFlag: "ናሙና",
     tstmBy1: "Frezer Tesfaye",
      tstmBy2: "Yonas Andualem",
      tstmBy3: "Kibrom Hadush",
      tstmSrc: "ምንጭ ይገባል",
    
      tstm1: "ጥራት ያለው የፈርኒቸር እቃዎች ለመግዛት ዘፍመሽ ፈርኒቸርን ይጎብኙ።",
      tstm2: "ከድሮ ጀምሮ የነበረ፤ ሀቀኛ",
      tstm3: "ዘፍመሽ ፈርኒቸር በገርጂ  ጃክሮስ የሚገኝ ሲሆን፣ ከዘፍመሽ ሞል ጋር አያምታቱት፣ መደብሩ በጣም ትልቅ እና ጥሩ የሶፋ እና የአልጋ እንዲሁ ሌሎች ሀገር በቀልና የውጪ ሀገር እቃዎች በተመጣጣኝ ዋጋ። ቦታው ትንሽ ቢርቅም።",
      tstmDots: "የአስተያየት ማውጫ",

      /* ---- gallery ---- */
      galEyebrow: "ሱቃችን",
      galTitle: "ሱቃችን ውስጥ",
      galLede: "ፎቶውን ነክተው ማስፋት ይችላሉ።",

      /* ---- faq ---- */
      faqEyebrow: "ጥያቄዎች",
      faqTitle: "በተደጋጋሚ የሚጠየቁ",
      faqQ1: "ማድረስ አገልግሎት አላችሁ?",
      faqA1:
        "አዎ፣ በአዲስ አበባ ውስጥ እናደርሳለን። ዋጋውና ጊዜው በአካባቢውና በእቃው መጠን ይወሰናል — ሲደውሉ በግልጽ እንነግርዎታለን።",
      faqQ2: "ዋስትና አላችሁ?",
      faqA2:
        "ዋስትናው በእቃውና በአምራቹ ይለያያል። ከመግዛትዎ በፊት የመረጡት እቃ ምን ዓይነት ዋስትና እንዳለው በሱቅ ውስጥ እናብራራልዎታለን።",
      faqQ3: "በትዕዛዝ ማሰራት ይቻላል?",
      faqA3:
        "ሀገር በቀል እቃዎችን በመጠን፣ በጨርቅና በቀለም ማስተካከል ይቻላል። ከውጭ የገቡት ግን እንዳሉ ነው የሚሸጡት።",
      faqQ4: "የክፍያ አማራጮች ምንድን ናቸው?",
      faqA4:
        "ያሉትን የክፍያ አማራጮች ሲደውሉ ወይም ሱቅ ሲመጡ እናረጋግጥልዎታለን።",
      faqQ5: "የመኪና ማቆሚያ አለ?",
      faqA5:
        "በሁለቱም ቅርንጫፎች መኪና ማቆም ይችላሉ። መገናኛ ያለው ቅርንጫፍ በዘፍመሽ ግራንድ ሞል 6ኛ ፎቅ ላይ ስለሆነ የሞሉን ማቆሚያ ይጠቀማሉ።",
      faqQ6: "መቼ ክፍት ናችሁ?",
      faqA6:
        "ከሰኞ – ቅዳሜ ከጠዋቱ 2:00 – ከቀኑ 11:00። እሁድ ዝግ ነን።",
      faqQ7: "ሀገር በቀሉ የቱ ነው፣ ከውጭ የገባው የቱ?",
      
      faqQ8: "እቃ ማስያዝ ይቻላል?",
      faqA8:
        "ይደውሉልን — የፈለጉት እቃ መኖሩን አረጋግጠን እናሳውቆታለን።",

      /* ---- branches ---- */
      brEyebrow: "ቅርንጫፎቻችን",
      contactTitle: "ዛሬውኑ ይጎብኙን",
      brLede:
        "በአዲስ አበባ ሁለት ሱቆች አሉን። ከታች ያለው ንድፍ ቦታዎቹን በሚታወቁ ምልክቶች ያሳያል።",
      mapTitle: "የቅርንጫፎቹ የቦታ ንድፍ",
      mapDesc:
        "የምስራቅ አዲስ አበባ ቀላል ንድፍ። መገናኛ ላይ አንድ ቅርንጫፍ፣ ጃክሮስ/ገርጂ ላይ አንድ ቅርንጫፍ።",
      mapLegendBranch: "ቅርንጫፍ",
      mapLegendRoad: "ዋና መንገድ",
      mapRing: "ሪንግ ሮድ",
      mapNorth: "N ↑",
      mapMall: "ዘፍመሽ ግራንድ ሞል",
      mapFactory: "የቀድሞ አምባሳደር አልባሳት ፋብሪካ",
      mapAlt: "የሁለቱ ቅርንጫፎች ቦታ የሚያሳይ ካርታ",
      brAddress: "አድራሻ",
      brLandmark: "ምልክት",
      brPhone: "ስልክ",
      brHours: "የስራ ሰዓት",
      brFloor: "ፎቅ",
      brCall: "ይደውሉ",
      brMap: "በካርታ ይክፈቱ",
      gerjiTitle: "ጃክሮስ / ገርጂ",
      gerjiAddress: "ጃክሮስ መኖሪያ አቅራቢያ፣ አዲስ አበባ",
      gerjiLandmark: "የቀድሞ አምባሳደር አልባሳት ፋብሪካ ጎን",
      gerjiFloor: "ግራውንድ ላይ",
      megenagnaTitle: "መገናኛ",
      megenagnaAddress: "መገናኛ፣ ዘፍመሽ ግራንድ ሞል፣ አዲስ አበባ",
      megenagnaLandmark: "ዘፍመሽ ግራንድ ሞል",
      megenagnaFloor: "6ኛ ፎቅ",
      hoursValue: "ከሰኞ – ቅዳሜ ከጠዋቱ 2:00 – ከቀኑ 11:00",

      /* ---- final CTA ---- */
      finalTitle: "ፎቶ ሁሉንም አያሳይም። መጥተው ይቀመጡበት።",
      finalBody:
        "ሁለቱም ቅርንጫፎች ከሰኞ እስከ ቅዳሜ ክፍት ናቸው። ደውለው ይጠይቁ ወይም ብቅ ይበሉ።",
      finalCall1: "ጃክሮስ / ገርጂ ይደውሉ",
      finalCall2: "መገናኛ ይደውሉ",
      finalMap: "ሁለቱንም ቅርንጫፎች በካርታ ይመልከቱ",

      /* ---- footer ---- */
      footerTagline: "ጥራት ያለው የቤት እቃ ለሁሉም የአዲስ አበባ ቤት",
      footerBranches: "ቅርንጫፎቻችን",
      footerHours: "የስራ ሰዓት",
      footerQuickLinks: "ሊንኮች",
      footerSocial: "ማህበራዊ ገጾች",
      footerSocialNote: "ገጾቻችን በቅርቡ ይገባሉ",
      footerJacros: "ጃክሮስ / ገርጂ — 011 668 6979",
      footerMegenagna: "መገናኛ — 094 244 4555",
      footerCombined: "ጃክሮስ/ገርጂ · 011 668 6979 — መገናኛ · 094 244 4555",
      footerCopyright: "© 2026 ዘፍመሽ ፈርኒቸር · አዲስ አበባ, ኢትዮጵያ",

      /* ---- utilities ---- */
      toTop: "ወደ ላይ ተመለስ",
      dockCall: "ይደውሉ",
      dockDirections: "አቅጣጫ",
      fabCall: "ዘፍመሽ ፈርኒቸርን ይደውሉ",
      lbClose: "ዝጋ",
      lbPrev: "ቀዳሚ ፎቶ",
      lbNext: "ቀጣይ ፎቶ",
      lbLabel: "የፎቶ መመልከቻ"
    },

    en: {
      /* ---- document head ---- */
      metaTitle: "Zefmesh Furniture — quality furniture in Addis Ababa",
      metaDesc:
        "Zefmesh Furniture — sofas, beds, office and kitchen pieces, locally made and imported. Two showrooms in Addis Ababa: Jacros/Gerji and Megenagna.",

      /* ---- announcement ---- */
      announce: "Two showrooms — Jacros/Gerji and Megenagna. Open six days a week.",
      announceClose: "Dismiss announcement",

      /* ---- navigation ---- */
      navFurniture: "Furniture",
      navWhyUs: "Why us",
      navFaq: "Questions",
      navContact: "Branches",
      navRooms: "Shop by room",
      navDelivery: "Delivery",
      navCall: "Call",
      navMenuOpen: "Open menu",
      navMenuClose: "Close menu",
      langLabel: "Language",
      langAm: "አማ",
      langEn: "EN",
      skipLink: "Skip to main content",

      /* ---- branch chooser ---- */
      chooserTitle: "Which branch would you like?",
      chooserBody: "Both showrooms are open Monday to Saturday.",
      chooserClose: "Close",

      /* ---- hero ---- */
      heroEyebrow: "Jacros / Gerji · Megenagna",
      heroTitle: "Quality furniture, <em>made here and brought in</em>",
      heroSub:
        "Sofas, beds, office and kitchen pieces. Come and see them in person at Jacros or Megenagna.",
      heroBtn: "Visit a showroom",
      heroBtn2: "Browse the catalogue",
      heroAlt: "A lamp-lit living room with a leather sofa, armchairs and a low table",
      trust1: "Two showrooms in Addis Ababa",
      trust2: "Open six days a week",
      trust3: "Locally made and imported stock",

      /* ---- stats ---- */
      statsEyebrow: "At a glance",
      statsTitle: "Zefmesh in short",
      stat1: "Showrooms in Addis Ababa",
      stat2: "Rooms we furnish",
      stat3: "Years serving Addis",
      stat4Fig: "Citywide",
      stat4: "Delivery across Addis Ababa",

      /* ---- shop by room ---- */
      roomsEyebrow: "By room",
      roomsTitle: "Which room are you furnishing?",
      roomsLede: "All four, under one roof, at both branches.",
      roomsSwipe: "Swipe to see more",
      catLiving: "Living room",
      catBedroom: "Bedroom",
      catOffice: "Office",
      catKitchen: "Kitchen & dining",
      roomLivingMeta: "Sofas, coffee tables, TV units",
      roomBedroomMeta: "Beds, nightstands, wardrobes",
      roomOfficeMeta: "Desks, chairs, shelving",
      roomKitchenMeta: "Dining tables, chairs, cabinets",

      /* ---- catalogue ---- */
      catEyebrow: "Catalogue",
      catTitle: "Look through the floor",
      catLede:
        "Prices are given plainly by phone or in store. Tap any photo to enlarge it.",
      filterLabel: "Filter by room",
      tabAll: "All",
      originLocal: "Locally made",
      originImported: "Imported",
      itemCta: "Call for price",
      itemZoom: "Enlarge photo",
      catEmpty: "Nothing in this room yet.",

      item1: "Three-seat sofa",
      item2: "Leather sofa and low table",
      item3: "Bed with wide upholstered headboard",
      item4: "Full bedroom set",
      item5: "Bedroom suite with seating",
      item6: "Bed and bedside unit",
      item7: "Executive desk",
      item8: "Timber office set",
      item9: "Long work desk",
      item10: "Round dining table",
      item11: "Dining table with chairs",
      item12: "Six-seat dining set",

      /* ---- local vs imported ---- */
      srcEyebrow: "Where it comes from",
      srcTitle: "Made here, and brought in",
      srcLede:
        "Both streams sit side by side on the same floor, so you can compare them directly rather than take our word for it.",
      srcMaterials: "Materials",
      srcLead: "Typical lead time",
      srcSuits: "Suits",
      srcLocalTitle: "Locally made",
      srcLocalBody:
        "Built here in Addis. Size, fabric and colour can be adjusted, so the piece fits the room you actually have.",
      srcLocalMaterials: "Local timber, foam and upholstery fabric",
      srcLocalLead: "Immediate if it is on the floor; made to order takes longer",
      srcLocalSuits: "Anyone who needs a size or a fabric changed",
      srcLocalAlt: "A timber office desk and chairs against a panelled wall",
      srcImpTitle: "Imported",
      srcImpBody:
        "Selected and brought in. What you see on the floor is what you take home, while the stock lasts.",
      srcImpMaterials: "Engineered timber, steel, leather and velvet",
      srcImpLead: "Straight off the floor while stock lasts",
      srcImpSuits: "Anyone who needs it this week",
      srcImpAlt: "Imported wooden tables and cabinets on a showroom floor",

      /* ---- why us ---- */
      whyEyebrow: "Why us",
      whyChooseTitle: "Why people keep coming back",
      whyLede: "Four reasons — all four of them checkable on the floor.",
      value1Title: "Wide selection",
      value1Body:
        "Living room, bedroom, office and kitchen — all four under one roof. Local and imported sit next to each other, so you can weigh the options against each other instead of guessing.",
      value2Title: "Fair prices",
      value2Body:
        "Prices are given plainly, by phone or in store. You know the figure before you decide, and you can compare two or three pieces at that figure.",
      value3Title: "Known for quality",
      value3Body:
        "Sit on it, feel the fabric, lift the drawer. Every piece can be checked in person before you buy it — which is the part a photo cannot do for you.",
      value4Title: "Two branches",
      value4Body:
        "Jacros/Gerji and Megenagna. Whichever is nearer, it is a short trip — and if the piece you want is at the other one, we will tell you.",

      /* ---- how to buy ---- */
      howEyebrow: "How to buy",
      howTitle: "From the door to your living room",
      howLede: "Four steps. Nothing complicated in any of them.",
      step1Title: "Visit a showroom",
      step1Body:
        "Come to Jacros/Gerji or Megenagna. You do not need to call first — but if you do, we will check the piece is on the floor before you travel.",
      step2Title: "Choose and confirm",
      step2Body:
        "Sit on it, measure it, decide. We confirm the price, the colour and the fabric, and write the order down with you.",
      step33Title: "Arrange your address",
      step3Body:
        "We take your address, the floor you are on and a day that suits you. Any delivery charge is agreed before you leave.",
      step4Title: "Installation and handover",
      step4Body:
        "The piece arrives and is assembled. We check it over with you before we go, so nothing is left for you to sort out.",

      /* ---- delivery ---- */
      delEyebrow: "Delivery and installation",
      delTitle: "Getting it home",
      delCoverage: "Coverage",
      delCoverageBody:
        "We deliver to addresses within Addis Ababa. For anywhere outside the city, call and we will talk it through.",
      delIncluded: "Included",
      delIncluded1: "Transport from the showroom to your address",
      delIncluded2: "Carrying it in and placing it",
      delIncluded3: "Assembly of anything that needs assembling",
      delIncluded4: "Taking the packaging away with us",
      delExtra: "Costs extra",
      delExtra1: "Delivery outside Addis Ababa",
      delExtra2: "Upper floors where there is no lift",
      delExtra3: "Hoisting through a window or by crane",
      delNote:
        "Delivery cost and timing depend on the area and the size of the order. Call and we will give you the actual figure.",

      /* ---- testimonials ---- */
      tstmEyebrow: "What people say",
      tstmTitle: "In their words",
      tstmNote:
        "Note to the owner — all three quotes below are samples. Replace them with real customer reviews and real names before this page goes live.",
      tstmFlag: "SAMPLE",
      tstmBy1: "Frezer Tesfaye",
      tstmBy2: "Yonas Andualem",
      tstmBy3: "Kibrom Hadush",
      tstmSrc: "Source to be added",
      tstm1: "If you want to buy  good quality furniture, you have to visit Zefmesh furniture.",
      tstm2: "old n true",
      tstm3: "Zefmesh Furniture is located around Gerji Jakros Don't confuse it with Zefmesh Mall Which is located in Meganaga,the store is very big and has a very good collection of sofas, beds, and other home mede and imported furnitures at a relatively good price. Not that easy to get there though.",
      tstmDots: "Choose a testimonial",

      /* ---- gallery ---- */
      galEyebrow: "The showroom",
      galTitle: "Inside the showroom",
      galLede: "Tap a photo to enlarge it.",

      /* ---- faq ---- */
      faqEyebrow: "Questions",
      faqTitle: "Asked often",
      faqQ1: "Do you deliver?",
      faqA1:
        "Yes, anywhere within Addis Ababa. The cost and the timing depend on the area and the size of the order — we will tell you plainly when you call.",
      faqQ2: "Is there a warranty?",
      faqA2:
        "It varies by piece and by maker. Before you buy, we go through what the warranty covers on the specific item you have chosen.",
      faqQ3: "Can I have something made to size?",
      faqA3:
        "Locally made pieces can be adjusted in size, fabric and colour. Imported pieces are sold as they come.",
      faqQ4: "How can I pay?",
      faqA4:
        "Call or come in and we will confirm which payment methods are available.",
      faqQ5: "Is there parking?",
      faqA5:
        "You can park at both branches. The Megenagna branch is on the 6th floor of Zefmesh Grand Mall, so you use the mall car park.",
      faqQ6: "When are you open?",
      faqA6:
        "Monday to Saturday, ከሰኞ – ቅዳሜ ከጠዋቱ 2:00 – ከቀኑ 11:00 (8:00 AM – 5:00 PM). Closed Sunday.",
      faqQ7: "How do I tell local from imported?",
    
      faqQ8: "Can I reserve a piece?",
      faqA8:
        "Call us — we will check the piece is available and talk through holding it for you.",

      /* ---- branches ---- */
      brEyebrow: "Our branches",
      contactTitle: "Come and see us",
      brLede:
        "Two showrooms in Addis. The plan below places them by the landmarks you would actually navigate by.",
      mapTitle: "Plan of the two branches",
      mapDesc:
        "A simplified plan of eastern Addis Ababa. One branch at Megenagna, one at Jacros/Gerji.",
      mapLegendBranch: "Branch",
      mapLegendRoad: "Main road",
      mapRing: "Ring Road",
      mapNorth: "N ↑",
      mapMall: "Zefmesh Grand Mall",
      mapFactory: "Former Ambassador Garment factory",
      mapAlt: "Map showing the location of the two branches",
      brAddress: "Address",
      brLandmark: "Landmark",
      brPhone: "Phone",
      brHours: "Hours",
      brFloor: "Floor",
      brCall: "Call",
      brMap: "Open in Maps",
      gerjiTitle: "Jacros / Gerji",
      gerjiAddress: "Near Jakros Residential, Addis Ababa",
      gerjiLandmark: "Beside the former Ambassador Garment factory",
      gerjiFloor: "Ground floor",
      megenagnaTitle: "Megenagna",
      megenagnaAddress: "Megenagna, Zefmesh Grand Mall, Addis Ababa",
      megenagnaLandmark: "Zefmesh Grand Mall",
      megenagnaFloor: "6th floor",
      hoursValue: "Monday–Saturday, 8:00 AM – 5:00 PM",

      /* ---- final CTA ---- */
      finalTitle: "A photo only goes so far. Come and sit on it.",
      finalBody:
        "Both showrooms are open Monday to Saturday. Call ahead or simply walk in.",
      finalCall1: "Call Jacros / Gerji",
      finalCall2: "Call Megenagna",
      finalMap: "See both branches on the map",

      /* ---- footer ---- */
      footerTagline: "Quality furniture for every home in Addis Ababa",
      footerBranches: "Our branches",
      footerHours: "Hours",
      footerQuickLinks: "Quick links",
      footerSocial: "Social",
      footerSocialNote: "Profiles coming soon",
      footerJacros: "Jacros / Gerji — 011 668 6979",
      footerMegenagna: "Megenagna — 094 244 4555",
      footerCombined: "Jacros/Gerji · 011 668 6979 — Megenagna · 094 244 4555",
      footerCopyright: "© 2026 Zefmesh Furniture · Addis Ababa, Ethiopia",

      /* ---- utilities ---- */
      toTop: "Back to top",
      dockCall: "Call",
      dockDirections: "Directions",
      fabCall: "Call Zefmesh Furniture",
      lbClose: "Close",
      lbPrev: "Previous photo",
      lbNext: "Next photo",
      lbLabel: "Photo viewer"
    }
  };

  /* ---------------------------------------------------------------------- */

  var ATTR_MAP = [
    ["data-i18n-alt", "alt"],
    ["data-i18n-label", "aria-label"],
    ["data-i18n-title", "title"],
    ["data-i18n-content", "content"]
  ];

  function read() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return v === "am" || v === "en" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function write(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* private mode — the page still works, the choice just will not stick */
    }
  }

  function apply(lang, root) {
    var dict = translations[lang] || translations[DEFAULT_LANG];
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (typeof v === "string") el.textContent = v;
    });

    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n-html")];
      if (typeof v === "string") el.innerHTML = v;
    });

    ATTR_MAP.forEach(function (pair) {
      scope.querySelectorAll("[" + pair[0] + "]").forEach(function (el) {
        var v = dict[el.getAttribute(pair[0])];
        if (typeof v === "string") el.setAttribute(pair[1], v);
      });
    });

    if (!root) {
      document.documentElement.lang = lang;
      document.title = dict.metaTitle;

      var ogLocale = lang === "am" ? "am_ET" : "en_US";
      var setMeta = function (sel, value) {
        var m = document.querySelector(sel);
        if (m) m.setAttribute("content", value);
      };
      setMeta('meta[name="description"]', dict.metaDesc);
      setMeta('meta[property="og:title"]', dict.metaTitle);
      setMeta('meta[property="og:description"]', dict.metaDesc);
      setMeta('meta[property="og:locale"]', ogLocale);
      setMeta('meta[name="twitter:title"]', dict.metaTitle);
      setMeta('meta[name="twitter:description"]', dict.metaDesc);

      document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-btn") === lang));
      });
    }
  }

  var current = read() || DEFAULT_LANG;

  function setLang(lang) {
    if (lang !== "am" && lang !== "en") return;
    current = lang;
    write(lang);
    apply(lang);
    document.dispatchEvent(new CustomEvent("zefmesh:langchange", { detail: { lang: lang } }));
  }

  /* Public surface used by ui.js and gallery.js */
  window.ZefI18n = {
    get lang() {
      return current;
    },
    set: setLang,
    t: function (key) {
      var dict = translations[current] || translations[DEFAULT_LANG];
      return dict[key] != null ? dict[key] : key;
    },
    /* Translate a freshly-injected subtree (lightbox captions, etc.) */
    apply: function (root) {
      apply(current, root);
    }
  };

  function init() {
    apply(current);

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-btn"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
