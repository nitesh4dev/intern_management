import moment from "moment/moment";
import { db } from "../../firebase/Firebase";
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

let d = moment().get('date');
const date = d <= 9 ? `0${d}` : d;
const year = moment().get('year');
const m = moment().get('month');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const addAttendance = async (data) => {
    console.log(data)
    data[1].checkin_times.push(moment().format("hh:mm:ss a"))
    try {
        const userDocRef = doc(db, `attendance/${year}/${months[m]}`, date.toString());
        await setDoc(userDocRef, { [data[0]]: data[1] }, { merge: true });
    }
    catch (err) {
        console.log(err);
    }
}

export const addLogout = async (id) => {
    try {
        const time = (moment().format("hh:mm:ss a"));
        // await updateDoc(doc(db, 'attendance', '17-03-2023'), { '1677390103.logout_times': arrayUnion('45') })
        await updateDoc(doc(db, `attendance/${year}/${months[m]}`, date.toString()), { [`${id}.logout_times`]: arrayUnion(time) })
    }
    catch (err) {
        console.log("Error", err)
    }
}

export const addLogin = async (id) => {
    try {
        const time = (moment().format("hh:mm:ss a"));
        // await updateDoc(doc(db, 'attendance', '17-03-2023'), { '1677390103.logout_times': arrayUnion('45') })
        await updateDoc(doc(db, `attendance/${year}/${months[m]}`, date.toString()), { [`${id}.login_times`]: arrayUnion(time) })
        return true
    }
    catch (err) {
        console.log("Error", err)
    }
}

export const addUserAttendance = async (data) => {
    data[1].login_times.push(moment().format("hh:mm:ss a"));
    data[1].date = `${date}/${m + 1}/${year}`;
    try {
        const userDocRef = doc(db, `userAttendance/${data[0]}/${year}`, months[m]);
        await setDoc(userDocRef, { [date]: data[1] }, { merge: true });
        return [data[0], data[1]]
    }
    catch (err) {
        console.log(err);
    }
}

export const addUserLogout = async (id) => {
    try {
        const time = (moment().format("hh:mm:ss a"));
        await updateDoc(doc(db, `userAttendance/${id}/${year}`, months[m]), { [`${date.toString()}.logout_times`]: arrayUnion(time) })
        return true
    }
    catch (err) {
        console.log("Error", err)
        return false
    }
}

export const addUserLogin = async (id) => {
    try {
        const time = (moment().format("hh:mm:ss a"));
        await updateDoc(doc(db, `userAttendance/${id}/${year}`, months[m]), { [`${date.toString()}.login_times`]: arrayUnion(time) })
        return true
    }
    catch (err) {
        console.log("Error", err)
    }
}

export const getUserAttendance = async (data) => {
    try {
        let inputYear = data[1]? data[1]: year;
        let inputMonth = data[2] ? data[2] : months[m];
        let attData = []
        let querySnapshot = await getDoc(doc(db, `userAttendance/${data[0]}/${inputYear}`, inputMonth));
        if (querySnapshot.data()) {
            attData = Object.entries(querySnapshot.data());

            let D = new Date().getDate();
            let date = D <= 9 ? `0${D}` : D;
            const findToday = attData.find(([key, val]) => {
                return key === date.toString();
            })

            if (findToday) {
                    let isCheckedIn = !(findToday[1].login_times.length === findToday[1].logout_times.length)
                    return [false, isCheckedIn, attData]
            }
            else {
                return [true, false, attData]
            }
        }
        else return [true, false, []]
    }
    catch (err) {
        console.log("Error: ", err)
        return false;
    }
}