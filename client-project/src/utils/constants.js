const CUSTOMER = "customer";
const EMPLOYEE = "employee";
const SUPPLIER = "supplier";
const MANAGER  = "manager" ;
export const positions = [CUSTOMER, EMPLOYEE, SUPPLIER, MANAGER];
export const positionsHeaders = {
    [CUSTOMER]: ["name", "surname", "email", "phone", "payment", "branch", "position"],
    [EMPLOYEE]: ["name", "surname", "email", "phone", "payment", "branch", "position"],
    [MANAGER] : ["name", "surname", "email", "phone", "payment", "branch", "position"],
    [SUPPLIER]: ["name", "surname", "email", "phone", "payment", "branch", "position", "flowers"]
};