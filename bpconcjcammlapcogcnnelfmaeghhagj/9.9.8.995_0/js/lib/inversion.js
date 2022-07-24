function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function padZero(str, len) {
    len = len || 2;
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function invertColor(hex, bw) {
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);

    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }

    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function inversion(input) {
    const [march, r,g,b] = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if(r && g && b) {
        const hex = rgbToHex(+r,+g,+b);
        return invertColor(hex.slice(1), true);
    }
}
