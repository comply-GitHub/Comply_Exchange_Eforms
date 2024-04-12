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
    useEffect(() => {
      setCountdown(authDetails?.configurations?.sessionTimeinMin-authDetails?.configurations?.sessionTimeReminderBeforeinMin)
    }, [useAuth]);
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
      sessionConfig();
      // console.log(authDetails?.configurations,"authDetails from session")
    }, [authDetails]);

    useEffect(() => {
      sessionConfig();
      if (countdown <= 0) return;
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      // if (countdown <= 0) return;
      // const timer = setInterval(() => {
      //   setCountdown((prevCountdown) => prevCountdown - 1);
      // }, 1000);
      // return () => clearInterval(timer);
    }, [countdown]);
    const sessionConfig = () => {
      const setTimeouts = () => {
        let currentTime;
        if (
          (authDetails && authDetails?.configurations !== null) ||
          (pathArray[1] !== "login" && pathArray[1] !== "")
        ) {
          currentTime = JSON.parse(storedLoginTime);
          warnTimeoutRef.current = setTimeout(warn, 1000 * 60 * 1);
          logoutTimeoutRef.current = setTimeout(
            logout,
            1000 * 60 * authDetails?.configurations?.sessionTimeinMin
          );
        }
      };
      // configurations,sessionTimeinMin,sessionTimeReminderBeforeinMin

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
        // console.log(formatTime(authDetails?.configurations?.sessionTimeinMin-authDetails?.configurations?.sessionTimeReminderBeforeinMin))
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
          console.log(
            formatTime(
              authDetails?.configurations?.sessionTimeinMin -
                authDetails?.configurations?.sessionTimeReminderBeforeinMin
            )
          );
          window.removeEventListener(events[i], resetTimeout);
        }
      };
    };
    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      console.log(minutes, seconds);
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
                  ><>{console.log(countdown,"COUNTDOWN")}</>
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
