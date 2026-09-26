/* SAHNE 6 — HEPSİ 20 CM (70–84 s)  The five rectangles side by side, each with a 20 cm perimeter. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  const SET = [[9, 1], [8, 2], [7, 3], [6, 4], [5, 5]];
  LI.Row = function (ctx, env, t, t0) {
    const u = env.V ? 26 : 34;
    let x = -520;
    SET.forEach(([w, h], i) => {
      const k = seg(t, t0 + i * 0.5, t0 + i * 0.5 + 0.6);
      if (k <= 0) { x += w * u + 50; return; }
      const O = env.V ? [-230, -600 + i * 170] : [x, 110];
      const P = F().rect(O, u, w, h);
      F().fill(ctx, P, k);
      F().outline(ctx, P, { p: k, w: 7, seed: 70 + i });
      LI.Ink.path(ctx, P.concat([P[0]]), { w: 3.5, p: k, color: LI.AMBER_RGB, alpha: 0.9, seed: 75 + i, taper: [0, 0] });
      if (w === h) [0, 1, 2, 3].forEach((j) => F().tick(ctx, P, j, { alpha: seg(t, t0 + 3, t0 + 3.4) }));
      const la = seg(t, t0 + i * 0.5 + 0.4, t0 + i * 0.5 + 0.9);
      if (env.V) {
        F().T(ctx, `${w} × ${h}`, O[0] + w * u + 30, O[1] - h * u / 2 - 16, { size: 40, alpha: la, align: 'left' });
        F().T(ctx, 'Ç = 20 cm', O[0] + w * u + 30, O[1] - h * u / 2 + 26, Object.assign({ size: 34, alpha: la, align: 'left' }, F().AMB));
      } else {
        F().T(ctx, `${w} × ${h}`, O[0] + w * u / 2, O[1] + 42, { size: 46, alpha: la });
        F().T(ctx, 'Ç = 20 cm', O[0] + w * u / 2, O[1] + 96, Object.assign({ size: 38, alpha: la }, F().AMB));
      }
      x += w * u + 50;
    });
  };
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.Row(ctx, env, t, 70.4)); }
  LI.registerScene({ id: 6, start: 70, end: 84, name: 'All 20 cm', nameTr: 'Hepsi 20 cm', concept: 'Same perimeter, different rectangles', conceptTr: 'Aynı çevre, farklı dikdörtgen', render });
})(window.LI = window.LI || {});
