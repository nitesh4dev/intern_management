import React, { useEffect, useState } from "react";
import moment from "moment";
import './calendar.css'

const Calendar = (props) => {
  const { dataForCalendar, fetchAttData } = props
  const [selectedDate, setSelectedDate] = useState(moment());
  const [disaPrev, setDisablePrev] = useState(false)

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

  const days = [];
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(
      <td key={d} className={dataForCalendar[d - 1] === 'D' ? "" : dataForCalendar[d - 1] === "P" ? 'present fewData' : 'absent fewData'}>
        {/* Replace this with your API data */}
        <strong>
          {d}
        </strong>
      </td>
    );
  }

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


  const renderCalendar = () => {
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const calendarDays = rows.map((day, index) => {
      return <tr key={index * 100}>{day}</tr>;
    });

    return (

      <div className="attTable">
        <table>
          <thead>
            <tr>
              <th colSpan="7">
                <div className="controles">
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
            <tr>{weekdayNames.map((day) => <th key={day}>{day}</th>)}</tr>
          </thead>
          <tbody>{calendarDays}</tbody>
        </table>
      </div>
    );
  };

  return <div>{renderCalendar()}</div>;
};

export default Calendar;
