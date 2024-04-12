import { Alert, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ErrorModel } from "../../../Redux/Actions/errormodel";

const ErrorComponet = () => {
  const error: ErrorModel = useSelector((state: any) => state.Error);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    setIsErrorVisible(true);
  }, [error]);

  return (
    <>
      {error.message !== "" && error.message !== null && isErrorVisible ? (
        <div>
          <Alert
            severity="error"
            sx={{
              height: "5vh",
              display: "grid",
              gridTemplateColumns: "2% 95%",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "95% 5%" }}>
              <Typography>{error.message} </Typography>
              <Typography
                sx={{ color: "black", justifySelf: "end" }}
                onClick={() => setIsErrorVisible(false)}
              >
                X
              </Typography>
            </div>
          </Alert>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ErrorComponet;
