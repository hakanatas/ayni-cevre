/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   One rectangle with its bottom-left corner fixed at O. From scene 4 on
   its width w and height h always satisfy w + h = 10, so while it
   morphs from 9×1 to 5×5 its perimeter stays exactly 20 — like
   sliding a 20 cm string around four pins.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, track, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  /** width over time; height = 10 − width (so the perimeter is always 20) */
  const W = (t) => track([[0, 6], [41.4, 6], [43.0, 9], [45.2, 9], [46.4, 8], [48.6, 8], [49.8, 7], [52.0, 7], [53.2, 6], [55.4, 6], [56.6, 5], [92, 5]], t);
  const dims = (t) => { const w = W(t); return [w, 10 - w]; };
  /** how "settled" on whole numbers the rectangle is (1 = at rest) */
  const rest = (w) => clamp(1 - Math.abs(w - Math.round(w)) * 25);

  /** corners A (bottom-left), B, C, D for a w×h rectangle at O with unit u */
  function rect(O, u, w, h) { return [O, [O[0] + w * u, O[1]], [O[0] + w * u, O[1] - h * u], [O[0], O[1] - h * u]]; }
  /** point at distance s (in units) along the border A→B→C→D→A, and the outward normal there */
  function along(P, u, w, h, s) {
    const L = [w, h, w, h];
    for (let i = 0; i < 4; i++) {
      if (s <= L[i] + 1e-9 || i === 3) {
        const a = P[i], b = P[(i + 1) % 4], f = L[i] ? Math.min(1, s / L[i]) : 0;
        const n = [[0, 1], [1, 0], [0, -1], [-1, 0]][i];
        return { p: [lerp(a[0], b[0], f), lerp(a[1], b[1], f)], n };
      }
      s -= L[i];
    }
  }

  const outline = (ctx, P, o = {}) => Ink.path(ctx, P.concat([P[0]]), { w: o.w ?? 10, p: o.p ?? 1, seed: o.seed ?? 7, taper: [0.02, 0.02], wob: 0.1, dry: 0.3, bleed: 0.5, alpha: o.alpha ?? 1 });
  function fill(ctx, P, a) { if (a <= 0) return; ctx.fillStyle = `rgba(${LI.AMBER_RGB},${0.1 * a})`; ctx.beginPath(); P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); }
  /** equal-length tick on side i */
  function tick(ctx, P, i, o = {}) {
    const V = P[i], U = P[(i + 1) % P.length], M = [(V[0] + U[0]) / 2, (V[1] + U[1]) / 2];
    const horiz = Math.abs(V[1] - U[1]) < 1;
    const q = horiz ? [[M[0], M[1] - 16], [M[0], M[1] + 16]] : [[M[0] - 16, M[1]], [M[0] + 16, M[1]]];
    Ink.path(ctx, q, { w: 6, color: LI.AMBER_RGB, alpha: o.alpha ?? 1, p: o.p ?? 1, seed: 90 + i, taper: [0.1, 0.1] });
  }
  /** faint dot grid (1 unit = 1 cm) around the rectangle */
  function grid(ctx, env, a) {
    if (a <= 0) return;
    const L = KD.L(env), u = L.u;
    ctx.fillStyle = `rgba(${LI.INK_RGB},${0.28 * a})`;
    for (let i = -2; i <= 11; i++) for (let j = -2; j <= 7; j++) {
      const x = L.O[0] + i * u, y = L.O[1] - j * u;
      ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
    }
  }
  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    const [w, h] = dims(t);
    KD.look(p, [L.O[0] + w * L.u / 2, L.O[1] - h * L.u / 2]);
    if (t > 2.9 && t < 5.8) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(10.6, 17.0); pointing(41.4, 43.0); pointing(45.2, 56.6);
    const puz = seg(t, 33.2, 33.6) * (1 - seg(t, 39.4, 39.8));
    if (puz > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.6 * puz; p.mouth = -0.1; p.lookY -= 0.3; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(22.0, 23.6); joy(57.0, 58.4); joy(66.0, 67.6); joy(81.4, 83.0);
    if (t > 85.0) {
      const j = (t - 85.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 19.0, 19.15), hump(t, 30.0, 30.15), hump(t, 51.0, 51.15), hump(t, 62.0, 62.15), hump(t, 77.0, 77.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  /** the main rectangle fades out at the end of scene 5 */
  const Film_out = (t) => seg(t, 69.6, 70.2);

  LI.Film = { Film_out, W, dims, rest, rect, along, outline, fill, tick, grid, T, AMB, nokta, base };
})(window.LI = window.LI || {});
