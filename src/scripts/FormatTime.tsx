export default (time: number) => {
    let hours = Math.floor(time/60);
    const minutes = Math.floor(time - (hours*60));

    hours += 1;

    const formatted = `${(hours.toString().length == 1 || hours > 12 && (hours-12).toString().length == 1) ? "0" : ""}${(hours > 12) ? hours-12 : hours}:${minutes.toString().length == 1 ? "0" : ""}${minutes} ${(hours > 12 || hours == 12 && minutes > 0) ? "PM" : "AM"}`;
    return formatted; 
}