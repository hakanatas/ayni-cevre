/* SAHNE 4 — AYNI İP, FARKLI DİKDÖRTGEN (40–58 s)
   Slide the string: 9×1, 8×2, 7×3, 6×4, 5×5. A table fills in; long + short is always 10. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  const ROWS = [[9, 1, 43.2], [8, 2, 46.6], [7, 3, 50.0], [6, 4, 53.4], [5, 5, 56.8]];
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  /** the table of rectangles (scenes 4–5) */
  LI.table = function (ctx, env, t) {
    const L = KD.L(env), T = L.T, a = seg(t, 41.6, 42.2) * (1 - seg(t, 69.6, 70.2));
    if (a <= 0) return;
    ['uzun', 'kısa', 'çevre'].forEach((s, i) => F().T(ctx, s, T.x[i], T.y, { size: 42, alpha: a }));
    LI.Ink.path(ctx, [[T.x[0] - 60, T.y + 28], [T.x[2] + 70, T.y + 28]], { w: 4, alpha: 0.8 * a, seed: 60, taper: [0.05, 0.05] });
    ROWS.forEach(([lw, sh, t0], i) => {
      const k = seg(t, t0, t0 + 0.5) * a, y = T.y + T.dy * (i + 1);
      if (k <= 0) return;
      F().T(ctx, String(lw), T.x[0], y, { size: 46, alpha: k });
      F().T(ctx, String(sh), T.x[1], y, { size: 46, alpha: k });
      F().T(ctx, '20 cm', T.x[2], y, Object.assign({ size: 42, alpha: k }, F().AMB));
    });
    F().T(ctx, 'uzun + kısa = 10', (T.x[0] + T.x[2]) / 2, T.y - 72, Object.assign({ size: 48, p: seg(t, 52.4, 53.4), alpha: a, halo: true }, F().AMB));
  };
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      LI.drawMain(ctx, env, t, { labels: 'two', la: 1 });
      LI.table(ctx, env, t);
    });
  }
  LI.registerScene({ id: 4, start: 40, end: 58, name: 'Same string, new rectangles', nameTr: 'Aynı ip, farklı dikdörtgen', concept: '9×1, 8×2, 7×3, 6×4, 5×5', conceptTr: '9×1, 8×2, 7×3, 6×4, 5×5', render });
})(window.LI = window.LI || {});
