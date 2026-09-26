/* SAHNE 3 — 20 CM'LİK İP (26–40 s)  The border becomes a 20 cm string. Other rectangles with the same string? */
(function (LI) {
  'use strict';
  const { seg, outBack } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const { w, h, L } = LI.drawMain(ctx, env, t, { labels: 'two', la: 1 - seg(t, 32.6, 33.2) });
      F().T(ctx, '20 cm ip', L.O[0] - 40, L.O[1] + 110, Object.assign({ size: 50, p: seg(t, 27.2, 28.0), halo: true }, F().AMB));
      const q = outBack(seg(t, 33.4, 33.9)) * (1 - seg(t, 39.4, 39.9));
      if (q > 0) A.text(ctx, '?', L.O[0] + w * L.u / 2, L.O[1] - h * L.u / 2, { size: 130 * q, color: A.amber });
    });
  }
  LI.registerScene({ id: 3, start: 26, end: 40, name: 'A 20 cm string', nameTr: '20 cm’lik ip', concept: 'Other rectangles?', conceptTr: 'Başka dikdörtgen var mı?', render });
})(window.LI = window.LI || {});
