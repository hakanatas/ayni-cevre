/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Bu dikdörtgenin çevresi ne kadar?', en: 'What is the perimeter of this rectangle?',
      note: 'Nokta noktalı kâğıda bir dikdörtgen çizdi. İki nokta arası 1 santimetre. Bu dikdörtgenin çevresi ne kadar?' },
    { scene: 2, start: 10.6, end: 17.0, tr: 'Kenarların üzerinden bir tur atalım, sayalım', en: 'Walk once around the edges and count',
      note: 'Çevre, şeklin kenarları boyunca bir tur attığımızda aldığımız yoldur. A noktasından başlayıp bir tur atalım ve santimetreleri sayalım.' },
    { scene: 2, start: 17.4, end: 21.0, tr: '6 + 4 + 6 + 4 = 20 cm', en: '6 + 4 + 6 + 4 = 20 cm',
      note: 'Kenarları toplayalım: 6 artı 4 artı 6 artı 4, toplam 20 santimetre.' },
    { scene: 2, start: 21.2, end: 25.6, tr: 'Çevre: kenar uzunluklarının toplamı', en: 'Perimeter: the sum of the side lengths',
      note: 'Bir dikdörtgenin çevre uzunluğu, bütün kenar uzunluklarının toplamıdır. Ç(ABCD) = 20 cm diye yazarız.' },
    { scene: 3, start: 26.8, end: 32.6, tr: 'Çevre, 20 cm’lik bir ip gibi', en: 'The perimeter is like a 20 cm string',
      note: 'Bu dikdörtgenin çevresini 20 santimetrelik bir ip gibi düşünelim.' },
    { scene: 3, start: 33.2, end: 39.6, tr: 'Aynı iple başka dikdörtgen yapabilir miyiz?', en: 'Can the same string make other rectangles?',
      note: 'Tahmin edelim: aynı ipi kullanarak başka dikdörtgenler de yapabilir miyiz? Kenar uzunlukları kaç olabilir?' },
    { scene: 4, start: 41.4, end: 45.0, tr: '9 cm ve 1 cm: yine 20 cm', en: '9 cm and 1 cm: still 20 cm',
      note: 'İpi kaydıralım: uzun kenar 9, kısa kenar 1 santimetre oldu. Çevresi yine 20 santimetre.' },
    { scene: 4, start: 45.4, end: 52.0, tr: '8 ve 2, 7 ve 3, 6 ve 4…', en: '8 and 2, 7 and 3, 6 and 4…',
      note: 'Kaydırmaya devam edelim: 8 ile 2, 7 ile 3, 6 ile 4. Her birinin çevresi 20 santimetre.' },
    { scene: 4, start: 52.4, end: 57.6, tr: 'Uzun + kısa hep 10: çevrenin yarısı', en: 'Long + short is always 10: half the perimeter',
      note: 'Dikkat edin: uzun kenar ile kısa kenarın toplamı hep 10. Çünkü 10, çevrenin yarısı.' },
    { scene: 5, start: 58.4, end: 63.6, tr: '5 ve 5: bütün kenarları eşit, bir kare', en: '5 and 5: all sides equal, a square',
      note: 'Son olarak iki kenar da 5 santimetre oldu. Dört kenarı da eşit: bu bir kare.' },
    { scene: 5, start: 64.0, end: 69.6, tr: 'Kare de özel bir dikdörtgendir', en: 'A square is a special rectangle',
      note: 'Kare, bütün kenarları eşit olan özel bir dikdörtgendir.' },
    { scene: 6, start: 70.6, end: 76.4, tr: 'Beş dikdörtgenin de çevresi 20 cm', en: 'All five rectangles have a 20 cm perimeter',
      note: 'Kenar uzunlukları doğal sayı olan, çevresi 20 santimetre olan beş dikdörtgen bulduk.' },
    { scene: 6, start: 76.8, end: 83.6, tr: 'Aynı çevre, farklı dikdörtgenler', en: 'Same perimeter, different rectangles',
      note: 'Çevreleri aynı ama şekilleri farklı. Demek ki aynı çevre uzunluğuna sahip farklı dikdörtgenler olabilir.' },
    { scene: 7, start: 84.6, end: 90.6, tr: 'Çevre aynı olsa da dikdörtgen değişebilir', en: 'The perimeter can stay the same while the rectangle changes',
      note: 'Unutma: çevre uzunluğu verilen bir dikdörtgenin kenarları farklı şekillerde seçilebilir. Uzun ve kısa kenarın toplamı çevrenin yarısıdır.' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
