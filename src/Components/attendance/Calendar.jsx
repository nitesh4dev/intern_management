import React, { useEffect, useState } from "react";
import moment from "moment";
import './calendar.css';
import RModal from "./RModal";
import { Button } from "@material-ui/core";
import Details from "./Details";

const Calendar = (props) => {
  const { dataForCalendar, fetchAttData, detail } = props
  const [selectedDate, setSelectedDate] = useState(moment());
  const [disaPrev, setDisablePrev] = useState(false)
  const [dates, setDates] = useState(new Date().getDate())
  const [loginTime, setLoginTime] = useState(null)
  const [logoutTime, setLogoutTime] = useState(null)


  const handlePrevMonth = () => {
    const newSelectedDate = selectedDate.clone().subtract(1, 'month');
    const year = newSelectedDate.format('YYYY');
    const month = newSelectedDate.format('MMMM');
    fetchAttData([year, month]);
    setSelectedDate(newSelectedDate);
    if (newSelectedDate.isBefore("2023-06-06", "month")) {
      setDisablePrev(true)
      return;
    }
  };

  const handleNextMonth = () => {
    const newSelectedDate = selectedDate.clone().add(1, 'month');
    const year = newSelectedDate.format('YYYY');
    const month = newSelectedDate.format('MMMM');
    fetchAttData([year, month]);
    setSelectedDate(newSelectedDate);
  };

  const daysInMonth = selectedDate.daysInMonth();
  const firstDayOfMonth = moment(selectedDate).startOf("month").day();
  const lastDayOfMonth = moment(selectedDate).endOf("month").day();

  const startBlank = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    startBlank.push(<td key={i * 10}></td>);
  }

  const endBlank = [];
  for (let i = 0; i < 6 - lastDayOfMonth; i++) {
    endBlank.push(<td key={i * 100}></td>);
  }

  var dstring = dates.toString()
  function getLoginTime(detail, d) {
    console.log(dates)
    var foundEl = detail.find(element => element[0] === `0$(dstring)`)
    console.log(foundEl)
    if (foundEl) {
      return foundEl[1].login_times[0];
    }
    else {
      return null;
    }

  }

  function getLogoutTime(detail, d) {
    var foundEl = detail.find(element => element[0] === dstring)
    console.log(foundEl)
    if (foundEl) {
      return foundEl[1].logout_times[0];
    }
    else {
      return null;
    }

  }


  const handleDateClick = (dateAndLoginTimes, d) => {
    var login = getLoginTime(detail, d);
    var logout = getLogoutTime(detail, d);
    console.log(loginTime);
    setLoginTime(login)
    setLogoutTime(logout)
  };


  const days = [];
  const currentDate = new Date();
  for (let d = 1; d <= daysInMonth; d++) {

    const isDatePassed = d < currentDate.getDate(); 
    const cellStyle = isDatePassed ? { backgroundColor: "#ccc" } : {};
    const cellClassName = isDatePassed ? "passed" : "";

    days.push(

      // <td key={d} className={dataForCalendar[d - 1] === 'D' ? "" : dataForCalendar[d - 1] === "P" ? 'present fewData' : 'absent fewData'}>
      <td key={d} className={`calendar-cell ${cellClassName}`} style={{ position: "relative", ...cellStyle }}
      onClick={() => {
        console.log(d);
        setDates(d)
        handleDateClick(d)
      }}>
        <Button style={{ top: "-25px", left: "-25px", padding:"0px" }} >
          {/* Replace this with your API data */}
          <div style={{ position: 'absolute' }}>
            <strong>{d.toString().padStart(2, '0')}</strong>
            {dataForCalendar[d - 1] === 'D' ? "" : dataForCalendar[d - 1] === "P" ? '' : <RModal />}
          </div>

        </Button>
        <div className={dataForCalendar[d - 1] === 'D' ? "" : dataForCalendar[d - 1] === "P" ? 'present' : 'absent'}
          style={{
            position: "absolute",
            right: "20px",
            bottom: "20px",
            fontSize: "20px",
            padding:"0px"
          }}>
            <strong>
          {dataForCalendar[d - 1] === 'D' ? "" : dataForCalendar[d - 1] === "P" ? 'P' : 'A'}
          </strong>
        </div>
      </td>
    );
  }

  // console.log(detail)
  // console.log(days)
  // console.log(dates)
  // // console.log(selectedDate)

  //   function getDateAndLoginTime(detail, d) {
  //     var foundEl = detail.find(element => element[0] === '4')
  //     console.log(foundEl)
  //     if (foundEl) {
  //       const newLoginTime = foundEl[1].login_times[0];
  //       setLoginTime(newLoginTime); // Update the state with the new value
  //       return newLoginTime;
  //     }
  //     else {
  //       console.log('absent')
  //       return null;
  //     }

  //   }



  const totalSlots = [...startBlank, ...days, ...endBlank];
  const rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  //
  // const soemthing = () => {
  //   console.log(selectedDate)
  // }

  const renderCalendar = () => {
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const calendarDays = rows.map((day, index) => {
      return <tr key={index * 100} style={{}}>{day} </tr>


    });




    return (

      <div className="attTable">
        <table>
          <thead>
            <tr>
              <th colSpan="7">
                <div className="controls">
                  <button
                    onClick={handlePrevMonth}
                    disabled={disaPrev}
                  >
                    Prev
                  </button>
                  {selectedDate.format("MMMM YYYY")}

                  <button
                    onClick={handleNextMonth}
                    disabled={moment().isSame(selectedDate, "month")}
                  >
                    Next
                  </button>
                </div>
              </th>
            </tr>
            <tr>{weekdayNames.map((day) => <th key={day} >{day} </th>)}</tr>
          </thead>
          <tbody>{calendarDays}
          </tbody>

        </table>
      </div>
    );
  };

  return (
    <>
      <div>{renderCalendar()}</div>
      <div className="attendanceRight" style={{ position: "absolute", top: "93px", left: "600px", zIndex: "0" }}>
        <Details detail={detail} dates={dates} loginTime={loginTime} logoutTime={logoutTime} />
      </div>
    </>
  )
};

export default Calendar;