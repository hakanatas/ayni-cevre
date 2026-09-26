/* SAHNE 5 — KARE (58–70 s)  5 × 5: all sides equal. A square is a special rectangle. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const { P, w, h, L, a } = LI.drawMain(ctx, env, t, { labels: 'all', la: 1 });
      [0, 1, 2, 3].forEach((i) => F().tick(ctx, P, i, { p: seg(t, 58.6 + i * 0.25, 58.9 + i * 0.25), alpha: a }));
      F().T(ctx, 'kare', L.O[0] + w * L.u / 2, L.O[1] - h * L.u / 2, { size: 72, p: seg(t, 59.4, 60.2), alpha: a });
      LI.table(ctx, env, t);
    });
  }
  LI.registerScene({ id: 5, start: 58, end: 70, name: 'The square', nameTr: 'Kare', concept: 'Equal sides: a special rectangle', conceptTr: 'Kenarları eşit: özel bir dikdörtgen', render });
})(window.LI = window.LI || {});
