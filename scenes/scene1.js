/* SAHNE 1 — BİR DİKDÖRTGEN (0–10 s)  Nokta is born and draws a 6 × 4 rectangle on dotted paper. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink;
  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  /** the main rectangle (scenes 1–5). o.labels: 'all' | 'two' | 0 ; o.la label alpha */
  LI.drawMain = function (ctx, env, t, o = {}) {
    const L = KD.L(env), u = L.u, [w, h] = F().dims(t);
    const a = 1 - F().Film_out(t);
    F().grid(ctx, env, Math.min(seg(t, 3.0, 3.6), a));
    const P = F().rect(L.O, u, w, h);
    F().fill(ctx, P, seg(t, 5.6, 6.2) * a);
    F().outline(ctx, P, { p: seg(t, 3.3, 5.6), alpha: a });
    // the 20 cm string, from scene 3 on
    const r = seg(t, 26.4, 27.4) * a;
    if (r > 0) {
      Ink.path(ctx, P.concat([P[0]]), { w: 5, p: r, color: LI.AMBER_RGB, alpha: 0.9 * a, seed: 8, taper: [0, 0], wob: 0.1 });
      Ink.ring(ctx, L.O[0], L.O[1], 11, { w: 4, alpha: r, seed: 9, color: LI.AMBER_RGB });
    }
    // corner names
    const ln = seg(t, 6.0, 6.8) * a;
    [['A', -30, 36], ['B', 30, 36], ['C', 30, -30], ['D', -30, -30]].forEach(([s, dx, dy], i) => F().T(ctx, s, P[i][0] + dx, P[i][1] + dy, { size: 44, alpha: ln, font: 'italic 44px "LI Brush", cursive' }));
    // side lengths
    const la = (o.la ?? 0) * F().rest(w) * a;
    if (la > 0) {
      const W = Math.round(w), H = Math.round(h);
      F().T(ctx, `${W} cm`, L.O[0] + w * u / 2, L.O[1] + 52, { alpha: la });
      F().T(ctx, `${H} cm`, L.O[0] + w * u + 80, L.O[1] - h * u / 2, { alpha: la });
      if (o.labels === 'all') {
        F().T(ctx, `${W} cm`, L.O[0] + w * u / 2, L.O[1] - h * u - 52, { alpha: la });
        F().T(ctx, `${H} cm`, L.O[0] - 84, L.O[1] - h * u / 2, { alpha: la });
      }
    }
    return { P, w, h, L, a };
  };
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.drawMain(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A rectangle', nameTr: 'Bir dikdörtgen', concept: 'What is its perimeter?', conceptTr: 'Çevresi ne kadar?', render });
})(window.LI = window.LI || {});
