import React from "react";
import Calendar from "./Calendar";
import * as apiService from './apiService'
import Clock from 'react-live-clock';
import { AuthContext } from "../../Context/AuthContext";
import { useEffect } from "react";
import { useContext } from "react";
import './attendance.css'
import { useState } from "react";
import moment from "moment/moment";




const Attendance = () => {
    const { user } = useContext(AuthContext);
    const userDetails = user.userData.candidateDetails.basicDetails;
    const id = user.userDocId
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [firstLogin, setFirstLogin] = useState(true);
    // const [monthAttendance, setMonthAttendance] = useState([]);
    const [disableCheck, setDisableCheck] = useState(false);
    const [dataForCalendar, setDataForCalendar] = useState([]);
    const [showButton, setShowButton] = useState(true)
    const [detail, setDetail] = useState([])
    const [attendanceLog, setAttendanceLog] = useState({})

    const currYear = moment().get('year');
    const m = moment().get('month');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currMonth = months[m];

    const markAttendance = () => {
        if (firstLogin) {
            const attDetails = {
                name: userDetails.fullName,
                email: userDetails.email,
                checkin_times: [],
                checkout_times: []
            }
            const personalAttendance = {
                login_times: [],
                logout_times: [],
            }
            // apiService.addAttendance([id, attDetails]);
            apiService.addUserAttendance([id, personalAttendance]).then(res => {
                if (res) {
                    setIsCheckedIn(true)
                    setDisableCheck(true)
                    // dataForCalendar[date - 1] = 'P';
                }
                else {
                    alert('Something went wrong')
                }
            });
        }
        else {
            // apiService.addLogin(id);
            apiService.addUserLogin(id);
            setDisableCheck(true);
            setIsCheckedIn(true)
        }
    }

    const handleLogout = async () => {
        // apiService.addLogout(id)
        apiService.addUserLogout(id).then(res => {
            if (res) {
                setIsCheckedIn(false)
                setDisableCheck(true)
            }
            else {
                alert('Something went wrong')
            }
        })
    }


    const absentDays = (statuses) => {
        const currentDate = new Date().getDate() - 1
        const currentDay = new Date().getDay();
        const newArray = statuses.map((status, index) => {
            if (index <= currentDate && status === 'D') {
                return 'A';
            }
            else if (currentDate % 7 === currentDay) {
                return 'H';
            }
            return status;
        });
        setDataForCalendar(newArray)
    };



    const makeStatusArr = (arrData) => {
        const attendanceStatuses = [];
        console.log(arrData)

        for (let i = 0; i < 31; i++) {
            attendanceStatuses.push('D')
        }
        arrData.forEach(([date, data]) => {
            const dayOfMonth = parseInt(date);
            if (!isNaN(dayOfMonth) && data.login_times) {
                attendanceStatuses[dayOfMonth - 1] = 'P';
            }
        });
        absentDays(attendanceStatuses)
        setDetail(arrData)

    }



    const fetchAttData = (params) => {
        // console.log(params[0] + '===' + currYear)
        // console.log(params[1] + '===' + currMonth)

        // console.log(params[0] === currYear.toString() && params[1] === currMonth)
        if (params[0] === currYear.toString() && params[1] === currMonth) {
            setShowButton(true)
        }
        else {
            setShowButton(false)
        }
        apiService.getUserAttendance([id, params[0], params[1]]).then(res => {
            setFirstLogin(res[0])
            setIsCheckedIn(res[1])
            // setMonthAttendance(res[2]);
            setDisableCheck(false);
            makeStatusArr(res[2]);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        fetchAttData([null, null]);
        setShowButton(true)
    }, [])


    const CheckButtons = () => {
        return (
            <>
                {
                    isCheckedIn ?
                        <button disabled={disableCheck} onClick={handleLogout}>Checkout</button> :
                        <button disabled={disableCheck} onClick={markAttendance}>Checkin</button>
                }
            </>
        )
    }



    return (
        <div className="attendance" style={{ position: "relative" }}>
            <div className="attendanceLeft">
                <div className="clock">
                    <Clock format={'HH:mm:ss'} ticking={true} style={{ marginRight: "20px", fontSize: "30px" }} />
                    {
                        showButton &&
                        CheckButtons()
                    }
                </div>
                <div className="calendar">
                    <Calendar
                        dataForCalendar={dataForCalendar}
                        fetchAttData={fetchAttData}
                        detail={detail}

                    />
                </div>
            </div>

        </div>
    )
}

export default Attendance