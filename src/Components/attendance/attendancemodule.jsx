import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../../firebase/Firebase';



const AttendanceModule = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const attendanceQuery = collection(db, 'attendance');
        const attendanceSnapshot = await getDocs(attendanceQuery);
        const attendanceList = attendanceSnapshot.docs.map((doc) => doc.data());
        setAttendanceData(attendanceList);
      } catch (error) {
        console.error('Error occurred while fetching attendance data: ', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString();
    const selectedDayData = attendanceData.find((data) => data.date === formattedDate);
    if (selectedDayData) {
      setCheckInTime(selectedDayData.checkInTime || '');
      setCheckOutTime(selectedDayData.checkOutTime || '');
    } else {
      setCheckInTime('');
      setCheckOutTime('');
    }
  };

  const handleCheckIn = async () => {
    try {
      const currentDate = selectedDate.toLocaleDateString();
      const docRef = await addDoc(collection(db, 'attendance'), {
        date: currentDate,
        checkInTime: new Date().toLocaleString(),
        checkOutTime: '',
      });
      console.log('Check-in stored with ID: ', docRef.id);
      setCheckInTime(new Date().toLocaleString());
    } catch (error) {
      console.error('Error occurred while storing check-in time: ', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentDate = selectedDate.toLocaleDateString();
      const attendanceQuery = query(collection(db, 'attendance'), where('date', '==', currentDate));
      const attendanceSnapshot = await getDocs(attendanceQuery);
      const attendanceDoc = attendanceSnapshot.docs[0];

      if (attendanceDoc) {
        await attendanceDoc.ref.update({
          checkOutTime: new Date().toLocaleString(),
        });
        console.log('Check-out time updated successfully.');
        setCheckOutTime(new Date().toLocaleString());
      } else {
        console.error('No attendance entry found for the selected date.');
      }
    } catch (error) {
      console.error('Error occurred while updating check-out time: ', error);
    }
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toLocaleDateString();
    const attendanceEntry = attendanceData.find((data) => data.date === formattedDate);
    if (attendanceEntry) {
      if (attendanceEntry.checkOutTime) {
        return <p className="present">P</p>;
      } else {
        return <p className="absent">A</p>;
      }
    }
    return null;
  };

  return (
    <div>
      <h2>Attendance Module</h2>
      <div className="calendar-container">
        <Calendar onChange={handleDateSelect} value={selectedDate} tileContent={tileContent} />
        <div className="details-panel">
          {selectedDate && (
            <div className="details">
              <h3>Date: {selectedDate.toLocaleDateString()}</h3>
              {checkInTime ? (
                <p>Check-in Time: {checkInTime}</p>
              ) : (
                <button onClick={handleCheckIn}>Check In</button>
              )}
              {checkOutTime ? (
                <p>Check-out Time: {checkOutTime}</p>
              ) : (
                <button onClick={handleCheckOut}>Check Out</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceModule;
