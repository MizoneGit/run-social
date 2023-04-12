export default function generateGuid() {
    let result = '';
    for (let i = 0; i < 32; i++) {
        const randomChar = Math.floor(Math.random() * 16).toString(16);
        result += randomChar;
        if (i === 7 || i === 11 || i === 15 || i === 19) {
            result += '-';
        }
    }
    return result;
}