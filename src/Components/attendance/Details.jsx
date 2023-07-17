import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/Firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


const Details = ({ detail, dates, loginTime, logoutTime }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  
  const shiftDetails = [
    { session: "Session 1", sessionTiming: '09:30 - 13:30', FirstIn: '-', LastOut: '-' },
    { session: "Session 2", sessionTiming: '01:31 - 00:00', FirstIn: '-', LastOut: '-' },
  ];

  //   const formatTime = (time) => {
  //   const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  //   return new Date(`2000-01-01T${time}:00`).toLocaleString('en-US', options);
  // };

  // console.log(formatTime(loginTime))

  //  const isSession1 = loginTime && logoutTime && (
  //   (loginTime >= '09:30:00 am' && loginTime <= '01:30:00 pm') &&
  //   (logoutTime >= '09:30:00 am' && logoutTime <= '01:30:00 pm')
  // );

  // const isSession2 = loginTime && logoutTime && (
  //   (loginTime >= '01:31:00 pm' && loginTime <= '11:59:00 pm') &&
  //   (logoutTime >= '01:31:00 pm' && logoutTime <= '11:59:00 pm')
  // );

  return (
    <>
      <div>
        <div style={{
          display: "flex", alignItems:"center", height: "50px", width: "600px", border: "2px solid green", margin: "10px"
        }}>
          <div>
            <p style={{fontSize:"20px", padding:"25px",  flexBasis: '30%'}}>{dates}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexGrow: 1, padding: '10px', }}>
            <p style={{ flexBasis: '50%',textAlign: 'center'}}>General Shift(GEN)</p>
            <p style={{ flexBasis: '50%',textAlign: 'center'}}>General Scheme</p>
          </div>
        </div>


        <table>
          <thead>
            <tr>
              <th>Session</th>
              <th style={{ padding: "15px", width: "90px" }}>Session Timing</th>
              <th>First In</th>
              <th>Last Out</th>
            </tr>
          </thead>
          <tbody>
            {shiftDetails.map((shift) => (
              <tr style={{ height: "0px" }} key={shift.sessionTiming}>
                <td>{shift.session}</td>
                <td style={{width:"125px"}}>{shift.sessionTiming}</td>
                <td style={{width:"190px"}}>{loginTime}</td>
                <td style={{width:"190px"}}>{logoutTime}</td>
                {/* <td>{isSession1 ? shift.FirstIn: '-'}</td>
                <td>{isSession1 ? shift.LastOut : '-'}</td>
                {isSession2 && (
                  <>
                    <td>{shift.FirstIn}</td>
                    <td>{shift.LastOut}</td>
                  </>
                )} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>


  )
}

export default Details;



