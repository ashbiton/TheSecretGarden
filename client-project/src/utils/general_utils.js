export function pluralize(word) {
    let result = "";
    switch (word) {
        case "customer":
            result = "customers";
            break;
        case "employee":
            result = "employees";
            break;
        case "supplier":
            result = "suppliers";
            break;
        case "manager":
            result = "managers";
            break;
        case "branch":
            result = "branches";
            break;
        case "flower":
            result = "flowers";
            break;
        default:
            break;
    }
    return result;
}

export function capitilize(word) {
}