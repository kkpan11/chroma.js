import { describe, it, expect } from 'vitest';
import chroma from 'chroma-js';

const css2rgb = chroma.input.format.css;

describe('Testing CSS2RGB color conversions', () => {
    const testCases = {
        // modern css colors
        'rgb(0 0 0)': [0, 0, 0, 1],
        'rgb(0% 0% 0%)': [0, 0, 0, 1],
        'rgb(0% 100% 100%)': [0, 255, 255, 1],
        'rgb(0% 100% 100% / 0.5)': [0, 255, 255, 0.5],
        'rgb(0% 100% 100%/0.5)': [0, 255, 255, 0.5],
        'rgba(0% 100% 100%/0.5)': [0, 255, 255, 0.5],

        // legacy css colors
        'rgb(0,0,0)': [0, 0, 0, 1],
        'rgb(100%,100%,100%)': [255, 255, 255, 1],
        'foobarrgb(100%,100%,100%)': undefined,
        'rgba(255,0,0,0.5)': [255, 0, 0, 0.5],
        'RGBA(255, 0, 0  , 0.5)': [255, 0, 0, 0.5],
        'RGBA (255, 0, 0  , 0.5)': undefined,
        'rgba(0%,100%,0%,.5)': [0, 255, 0, 0.5],
        'hsl(240,100%,50%) ': [0, 0, 255, 1],
        'hsl(60,100%,50%)': [255, 255, 0, 1],
        'hsla(180,100%,50%,1)': [0, 255, 255, 1],
        'hsla(300,100%,50%,.25)': [255, 0, 255, 0.25],
        'rgba(32, 48, 96, 0.5)': [32, 48, 96, 0.5],
        blanchedalmond: [255, 235, 205, 1],
        blue: [0, 0, 255, 1],
        BlueViolet: [138, 43, 226, 1],
        BROWN: [165, 42, 42, 1],
        unknownColor: undefined,
        'lab(47.99% -30.39 -8.98)': [0, 128, 128, 1],
        'lab(47.99% -30.39 -8.98 / 0.25)': [0, 128, 128, 0.25],
        'lab(47.99% -24.312% -7.18%)': [0, 128, 128, 1],
        'lch(93.12 58.8 115.62)': [212, 248, 128, 1], // #d4f880
        'lch(93.12% 58.8 115.62deg)': [212, 248, 128, 1], // #d4f880
        'lch(93.12% 39.2% 115.62deg)': [212, 248, 128, 1], // #d4f880
        'lch(93.12% none none)': [235, 235, 235, 1],
        'oklch(92.83% 0.15 123.12deg)': [212, 248, 130, 1],
        'oklch(92.83% none none)': [231, 231, 231, 1]
    };

    Object.keys(testCases).forEach((name) => {
        it(`should correctly parse ${name}`, () => {
            expect(css2rgb(name)).toEqual(testCases[name]);
        });
    });
});
