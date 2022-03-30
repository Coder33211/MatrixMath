function transpose(a) {
  let m = [];

  for (let ic = 0; ic < a[0].length; ic++) {
    m[ic] = [];
    for (let ir = 0; ir < a.length; ir++) {
      m[ic][ir] = a[ir][ic];
    }
  }

  return m;
}

function sum(a) {
  let v = 0;

  for (let i = 0; i < a.length; i++) {
    v += a[i];
  }

  return v;
}

function mean(a) {
  let v = [];

  for (let ir = 0; ir < a.length; ir++) {
    for (let ic = 0; ic < a[0].length; ic++) {
      v.push(a[ir][ic]);
    }
  }

  return sum(v) / v.length;
}

function dot(a, b) {
  let m = [];

  let t = transpose(b);

  for (let ar = 0; ar < a.length; ar++) {
    let sr = [];
    for (let br = 0; br < t.length; br++) {
      let s = [];
      for (let ic = 0; ic < a[0].length; ic++) {
        s.push(a[ar][ic] * t[br][ic]);
      }
      sr.push(sum(s));
    }
    m.push(sr);
  }

  return m;
}

function op(a, b, c) {
  if (c == "a") {
    return a + b;
  } else if (c == "s") {
    return a - b;
  } else if (c == "m") {
    return a * b;
  } else if (c == "d") {
    return a / b;
  } else if (c == "p") {
    return a ** b;
  } else if (c == "max") {
    return Math.max(a, b);
  } else if (c == "min") {
    return Math.min(a, b);
  }
}

function math(a, b, c) {
  let m = [];

  if (typeof a == "object" && typeof b == "object") {
    if (a.length == b.length && a[0].length == b[0].length) {
      for (let ir = 0; ir < a.length; ir++) {
        m[ir] = [];
        for (let ic = 0; ic < a[0].length; ic++) {
          m[ir][ic] = op(a[ir][ic], b[ir][ic], c);
        }
      }
    } else if (b.length == 1 && a[0].length == b[0].length) {
      for (let ir = 0; ir < a.length; ir++) {
        m[ir] = [];
        for (let ic = 0; ic < a[0].length; ic++) {
          m[ir][ic] = op(a[ir][ic], b[0][ic], c);
        }
      }
    } else if (a.length == b.length && b[0].length == 1) {
      for (let ir = 0; ir < a.length; ir++) {
        m[ir] = [];
        for (let ic = 0; ic < a[0].length; ic++) {
          m[ir][ic] = op(a[ir][ic], b[ir][0], c);
        }
      }
    } else if (b.length == 1 && b[0].length == 1) {
      for (let ir = 0; ir < a.length; ir++) {
        m[ir] = [];
        for (let ic = 0; ic < a[0].length; ic++) {
          m[ir][ic] = op(a[ir][ic], b[0][0], c);
        }
      }
    }
  } else if (typeof a != "object" && typeof b == "object") {
    for (let ir = 0; ir < b.length; ir++) {
      m[ir] = [];
      for (let ic = 0; ic < b[0].length; ic++) {
        m[ir][ic] = op(a, b[ir][ic], c);
      }
    }
  } else if (typeof a == "object" && typeof b != "object") {
    for (let ir = 0; ir < a.length; ir++) {
      m[ir] = [];
      for (let ic = 0; ic < a[0].length; ic++) {
        m[ir][ic] = op(a[ir][ic], b, c);
      }
    }
  }

  return m;
}
