export default class Regulator {
  constructor(settings, boundaries) {
    this.setSettings(settings);
    this.setLimits(boundaries);
    this.h = [0, 0]; // położenie drona (wysokość) [m]
    this.u = [0];
    this.vr = [0]; // prędkość obrotowa [rpm]
    this.Fc = [0]; // siła ciągu (całego drona) [N]
    this.errors_sums = [this.hzad];
    this.errors = [this.hzad];
    this.h_max = 0;
    this.performanceIndices = {};
  }

  setSettings({ hzad, Kp, Ti, Td, Tp, rho, R, m, g, iterations }) {
    this.hzad = hzad; // wartość zadana
    this.hzad_arr = Array.from({ length: iterations }, () => hzad);
    this.Kp = Kp; // wzmocnienie
    this.Ti = Ti; // czas zdwojenia
    this.Td = Td; // czas wyprzedzenia
    this.Tp = Tp; // Czas probkowania [s]
    this.rho = rho ?? 1.2; // gęstość powietrza - 1.2 [kg/m3]
    this.R = R; // promień wirnika [m]
    this.m = m; // masa drona [kg]
    this.g = g ?? 9.8; // przyspieszenie ziemskie - 9.8 [m/s2]
    this.iterations = iterations; // liczba iteracji
  }

  setLimits({ h, u, vr }) {
    this.limits = {
      h,
      u,
      vr,
    };
  }

  contain(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  integrator(n) {
    return (this.Tp / this.Ti) * this.errors_sums[n - 1];
  }

  derivator(n) {
    const deltaE = this.errors[n] - this.errors[n - 1];
    return (this.Td / this.Tp) * deltaE;
  }

  evaluateError(n) {
    const error = this.hzad - this.h[n];
    this.errors.push(error);
    this.errors_sums.push(this.errors_sums[n - 1] + error);
    // console.log({ error });
  }

  evaluateSignal(n) {
    const u = this.contain(
      this.Kp * this.errors[n] + this.integrator(n) + this.derivator(n),
      this.limits.u[0],
      this.limits.u[1]
    );
    // console.log({ u });
    this.u.push(u);
  }

  evaluateThrust(n) {
    const vr =
      ((this.u[n] - this.limits.u[0]) *
        (this.limits.vr[1] - this.limits.vr[0])) /
        (this.limits.u[1] - this.limits.u[0]) +
      this.limits.vr[0];
    // console.log({ vr });
    this.vr.push(vr);

    const Fc =
      4 *
      this.rho *
      this.R ** 2 *
      Math.PI *
      (((2 * Math.PI) / 60) * vr * this.R) ** 2;
    this.Fc.push(Fc);
  }

  evaluateAltitude(n) {
    const h =
      this.Tp ** 2 * (this.Fc[n] / this.m - this.g) +
      2 * this.h[n] -
      this.h[n - 1];
    const validated = this.contain(h, this.limits.h[0], this.limits.h[1]);
    this.h.push(validated);
    if (validated > this.h_max) this.h_max = validated;
  }

  calcPerformanceIndices() {
    // uchyb ustalony
    let fixedError = this.errors[this.errors.length - 1];
    // przeregulowanie (%)
    let overshoot;
    const fixedAltitude = this.h[this.h.length - 1];
    if (this.h_max <= this.hzad) overshoot = 0;
    else overshoot = (100 * (this.h_max - fixedAltitude)) / fixedAltitude;

    // czas rekacji
    const dh = 0.05 * fixedAltitude;
    let n = 0,
      i;
    for (i = this.h.length - 1; i >= 0; i--) {
      if (fixedAltitude - dh <= this.h[i] && this.h[i] <= fixedAltitude + dh)
        n = i;
      else break;
    }
    const adjustmentTime = n * this.Tp;
    // calkowe wskazniki
    let accuracyAbs = 0,
      accuracySquared = 0,
      costAbs = 0,
      costSquared = 0;
    for (let i = 0; i < this.errors.length; i++) {
      // dokladnosc regulacji (abs | squared)
      accuracyAbs += Math.abs(this.errors[i]);
      accuracySquared += Math.pow(this.errors[i], 2);
      // kosztow regulacji (abs | squared)
      costAbs += Math.abs(this.u[i]);
      costSquared += Math.pow(this.u[i], 2);
    }
    accuracyAbs *= this.Tp;
    accuracySquared *= this.Tp;
    costAbs *= this.Tp;
    costSquared *= this.Tp;

    this.performanceIndices = {
      fixedError,
      overshoot,
      adjustmentTime,
      integral: {
        accuracyAbs,
        accuracySquared,
        costAbs,
        costSquared,
      },
    };
  }

  async run() {
    const { iterations } = this;
    for (let n = 1; n < iterations; n++) {
      this.evaluateError(n);

      this.evaluateSignal(n);

      this.evaluateThrust(n);

      this.evaluateAltitude(n);
    }
    this.calcPerformanceIndices();
  }
}
