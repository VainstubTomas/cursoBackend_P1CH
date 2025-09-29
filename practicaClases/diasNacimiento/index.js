import moment from "moment";

const calculateDays = (newBirthday) => {

    const now = moment(); //fecha actual
    const birthday = moment(newBirthday, "DD-MM-YYYY");

    const daysDif = now.diff(birthday, "days");

    return `Desde que naciste pasaron ${daysDif} dias.`
}

console.log(calculateDays("09/04/2004"));