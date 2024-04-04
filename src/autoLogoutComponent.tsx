// import React, { useState, useEffect } from 'react';

// const ReminderFunction: React.FC = () => {
//   const [reminder, setReminder] = useState<string | null>(null);
//   var currentTime:any;
// var reminderTime:any;
//   const setReminderAfterMinutes = (t: number) => {
//     // Calculate the current time
//     const storedLoginTime = localStorage.getItem("loginTime");
//     if (storedLoginTime && storedLoginTime !== null) {
//       currentTime = JSON.parse(storedLoginTime);
    
//      reminderTime = new Date(currentTime.getTime() + t * 60000); // Convert minutes to milliseconds
//   }

//     const timerId = setTimeout(() => {
//       console.log("Reminder: " + t + " minutes have passed.");
//       setReminder(`Reminder: ${t} minutes have passed.`);
//     }, t * 60000); // Set timeout for t minutes

//     return () => clearTimeout(timerId);
//   };

//   useEffect(() => {
//     setReminderAfterMinutes(1); 
//   }, []);

//   return (
//     <div>
//       {/* <h1>Set Reminder</h1> */}
//       <p>{reminder}</p>
//     </div>
//   );
// };

// export default ReminderFunction;

import React, { useEffect, useRef } from "react";
// import { browserHistory } from "react-router-dom";

const WithAutoLogout = <P extends object>(ComposedComponent: React.ComponentType<P>) => {
  const AutoLogout: React.FC<P> = (props) => {
    const events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"];
    const warnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const setTimeouts = () => {
        warnTimeoutRef.current = setTimeout(warn, 1000 * 60 * 0.5); // 0.5 minutes
        logoutTimeoutRef.current = setTimeout(logout, 1000 * 60 * 1); // 1 minutes
      };

      const clearTimeouts = () => {
        if (warnTimeoutRef.current) clearTimeout(warnTimeoutRef.current);
        if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
      };

      const resetTimeout = () => {
        clearTimeouts();
        setTimeouts();
      };

      const warn = () => {
        window.alert("You will be logged out automatically in 1 minute");
        console.log("You will be logged out automatically in 1 minute.");
      };

      const logout = () => {
        console.log("Sending a logout request to the API...");
        destroy();
      };

      const destroy = () => {
        // Clear the session
        // browserHistory.push("/");
        window.location.assign("/");
        window.location.reload(); 
      };

      for (let i = 0; i < events.length; i++) {
        window.addEventListener(events[i], resetTimeout);
      }
      setTimeouts();

      return () => {
        clearTimeouts();
        for (let i = 0; i < events.length; i++) {
          window.removeEventListener(events[i], resetTimeout);
        }
      };
    }, []);

    return <ComposedComponent {...props} />;
  };

  return AutoLogout;
};

export default WithAutoLogout;


