import React, { useEffect, useRef, useState } from "react";
import useAuth from "./customHooks/useAuth";
import { Paper, Typography, Alert } from "@mui/material";

const WithAutoLogout = <P extends object>(
  ComposedComponent: React.ComponentType<P>
) => {
  const AutoLogout: React.FC<P> = (props) => {
    const { authDetails } = useAuth();
    const [countdown, setCountdown] = useState<number>(
      authDetails?.configurations?.sessionTimeinMin * 60
    );
    const [counter, ShowCounter] = useState(false);
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    var base_url = window.location.origin;
    var pathArray = window.location.pathname.split("/");
    const storedLoginTime: any = localStorage.getItem("loginTime");
    const warnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
     setCountdown(
       ( authDetails?.configurations?.sessionTimeinMin -authDetails?.configurations?.sessionTimeReminderBeforeinMin)*60
      );
      sessionConfig();
    }, [authDetails]);

    useEffect(() => {
    }, [countdown]);
    const sessionConfig = () => {
      const setTimeouts = () => {
        let currentTime;
        if (
          (authDetails && authDetails?.configurations !== null) ||
          (pathArray[1] !== "login" && pathArray[1] !== "")
        ) {
          currentTime = JSON.parse(storedLoginTime);
          warnTimeoutRef.current = setTimeout(warn, 60000*authDetails?.configurations?.sessionTimeReminderBeforeinMin  );
          // logoutTimeoutRef.current = setTimeout(
          //   logout,
          //   120000 
          // );
        }
      };
      // configurations,sessionTimeinMin,sessionTimeReminderBeforeinMin
      // *authDetails?.configurations?.sessionTimeReminderBeforeinMin

      const clearTimeouts = () => {
        if (warnTimeoutRef.current) clearTimeout(warnTimeoutRef.current);
        if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
      };

      const resetTimeout = () => {
        clearTimeouts();
        setTimeouts();
      };

      const warn = () => {
        ShowCounter(true);
        const timer = setInterval(() => {
          setCountdown((prevCountdown) =>{
            if(
              prevCountdown > 0
            ) return prevCountdown - 1
            else{
              clearInterval(timer)
              logout();
              return 0
            }
           });
        }, 1000);
      };

      const logout = () => {
        destroy();
      };

      const destroy = () => {
        window.location.replace(base_url + "/login");
        localStorage.clear();
      };

      for (let i = 0; i < events.length; i++) {
        window.addEventListener(events[i], resetTimeout);
      }
      setTimeouts();

      return () => {
        clearTimeouts();
        for (let i = 0; i < events.length; i++) {
          // console.log(
          //   formatTime(
          //     (authDetails?.configurations?.sessionTimeinMin -
          //       authDetails?.configurations?.sessionTimeReminderBeforeinMin)*1000
          //   )
          // );
          window.removeEventListener(events[i], resetTimeout);
        }
      };
    };
    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${Math.max(0, minutes).toString().padStart(2, "0")}:${Math.max(
        0,
        seconds
      )
        .toString()
        .padStart(2, "0")}`;
    };

    return (
      <>
        <ComposedComponent {...props} />
        {counter &&
        authDetails &&
        authDetails?.configurations !== null &&
        pathArray[1] !== "login" &&
        pathArray[1] !== "" ? (
          <div className="sessionAlertClass">
            <div className={counter ? "sessionAlertTextClass" : ""}>
              {/* You will be logout in {formatTime(countdown)} minutes. */}
              <div>
                <Alert
                  severity="error"
                  sx={{
                    height: "5vh",
                    display: "grid",
                    gridTemplateColumns: "2% 95%",
                  }}
                >
                  <div
                    style={{ display: "grid", gridTemplateColumns: "95% 5%" }}
                  >
                    <Typography>{formatTime(countdown)} </Typography>
                    <Typography
                      sx={{ color: "black", justifySelf: "end" }}
                      onClick={() => ShowCounter(false)}
                    >
                      X
                    </Typography>
                  </div>
                </Alert>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  return AutoLogout;
};

export default WithAutoLogout;
