import CRC32 from "crc-32";

export const arrayCRC32Le = (byteArray: Array<Uint8Array>) => {

    let copy: Array<object> = JSON.parse(JSON.stringify(byteArray));

    let bufferArray = new Uint8Array(170);

    for (let i = 0; i < copy.length; i++) {
        if (i === copy.length - 1) {
            bufferArray.set(Object.values(copy[i]).slice(2, 56), i * 58);
        } else {
            bufferArray.set(Object.values(copy[i]).slice(2, 60), i * 58);
        }
    }

    // @ts-ignore
    return (CRC32.buf(bufferArray) >>> 0).toString(16).match(/.{1,2}/g).reverse().map(hex => parseInt(hex, 16));
}