import './App.css';
import socketIO from "socket.io-client";
import { useEffect, useState } from 'react';
const socket = socketIO.connect("http://localhost:4000");

function App() {
  const [user, setUser] = useState('test')
  const [hour, setHour] = useState(0)
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
      //listens for the event list from the backend
      socket.on("sendSchedules", (schedules) => {
          setSchedules(schedules);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    // EventEmit: which sends events to - receive events from 
    socket.emit('createSchedules', {user, hour})
    setUser('test')
    setHour(hour+1)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" style={{marginRight: '16px'}} value={user} onChange={(e) => setUser(e.target.value)}/>
        <input type="number" style={{marginRight: '16px'}} value={hour} onChange={(e) => setHour(e.target.value)}/>
        <button type='submit'>Gửi</button>
      </form>
      <p>Danh sách lịch hẹn</p>
      {schedules.map((s, index) => <div key={index}>
        Tên: {s.user} - Giờ hẹn: {s.hour} giờ
      </div>)}
    </div>
  );
}

export default App;
