/* SAHNE 2 — ÇEVRE (10–26 s)  Walk around the border and count: 6 + 4 + 6 + 4 = 20 cm. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const { P, w, h, L } = LI.drawMain(ctx, env, t, { labels: 'all', la: seg(t, 17.4, 18.0) * (1 - seg(t, 25.4, 26.0)) });
      const s = seg(t, 10.6, 17.0) * 20, out = 1 - seg(t, 17.2, 17.8);
      if (s > 0 && s < 20 && t < 17.4) {
        const q = F().along(P, L.u, w, h, s);
        Ink.path(ctx, [P[0]].concat(pathTo(P, L.u, w, h, s)), { w: 9, color: LI.AMBER_RGB, alpha: 0.85, seed: 30, taper: [0, 0] });
        Ink.dot(ctx, q.p[0], q.p[1], 11, { seed: 31, color: LI.AMBER_RGB, bleed: 0 });
      }
      for (let k = 1; k <= 20; k++) {
        const a = seg(s, k - 0.5, k - 0.2) * out; if (a <= 0) continue;
        const q = F().along(P, L.u, w, h, k - 0.5);
        F().T(ctx, String(k), q.p[0] + q.n[0] * 28, q.p[1] + q.n[1] * 28, Object.assign({ size: 30, alpha: a }, F().AMB));
      }
      const top = L.O[1] - h * L.u, cx = L.O[0] + w * L.u / 2;
      const f = 1 - seg(t, 25.4, 26.0);
      F().T(ctx, '6 + 4 + 6 + 4 = 20 cm', cx, top - 170, Object.assign({ size: 56, p: seg(t, 18.4, 19.6), alpha: f, halo: true }, F().AMB));
      F().T(ctx, 'Ç(ABCD) = 20 cm', cx, top - 108, { size: 50, p: seg(t, 21.2, 22.2), alpha: f, halo: true });
    });
  }
  function pathTo(P, u, w, h, s) {
    const out = [], L = [w, h, w, h];
    for (let i = 0; i < 4 && s > 0; i++) { const d = Math.min(s, L[i]); out.push(F().along(P, u, w, h, [0, w, w + h, w + h + w][i] + d).p); s -= d; }
    return out;
  }
  LI.registerScene({ id: 2, start: 10, end: 26, name: 'Perimeter', nameTr: 'Çevre', concept: 'All the way round: 20 cm', conceptTr: 'Bir tur: 20 cm', render });
})(window.LI = window.LI || {});
