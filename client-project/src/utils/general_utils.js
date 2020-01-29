export function capitilize(string) {
    string.trim();
    let newString = "";
    let words = string.split(" ");
    words.forEach(word => {
        newString += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return newString.trim();
}