export function addZeroDate(number: number){
    if (number <= 9) 
        return "0" + number;
    else
        return number; 
}