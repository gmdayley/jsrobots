exports.rgbToHsl = function (r, g, b) {
  var hsl = rgbToHsl(r, g, b);
  var MOD = 65535;
  return { h: Math.floor(hsl.h * MOD), s: Math.floor(hsl.s * MOD), l: Math.floor(hsl.l * MOD) };
};

function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min) {
    h = s = 0; // achromatic
  }
  else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return { h: h, s: s, l: l };
}

function bound01(n, max) {
  if (isOnePointZero(n)) { n = "100%"; }

  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));

  // Automatically convert percentage into number
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }

  // Handle floating point rounding errors
  if ((Math.abs(n - max) < 0.000001)) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return (n % max) / parseFloat(max);
}

function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

function isPercentage(n) {
  return typeof n === "string" && n.indexOf('%') != -1;
}