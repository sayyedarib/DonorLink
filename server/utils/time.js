

module.exports = function time (){
    const currentDate = new Date();

    // Get the time in 12-hour format
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    const formattedTime = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${amOrPm}`;
  
    // Get the date in desired format
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month < 10 ? "0" + month : month}/${year}`;
  
    // Combine the time and date
    const time = `${formattedTime} ${formattedDate}`;
    return time;
}