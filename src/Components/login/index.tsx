import React, { Fragment, Component, useState, useEffect } from "react";
// import Slider from "react-slick";
import bg1 from "../../Utils/originals/city.jpg";
import logo from "../../assets/img/logo.png";
import bg2 from "../../Utils/originals/citydark.jpg";
import bg3 from "../../Utils/originals/citynights.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllLanguage,
  LoadExistingFormData,
  SignInSaveAndExit,
  eFormSignIn1,
  loginAction,
} from "../../Redux/Actions";
import GoogleTranslate from "../Reusable/multilanguage";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, FormGroup, Input } from "@mui/material";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../Redux/store";
import ErrorComponet from "../Reusable/ErrorComponent";

// declare global {
//   interface Window {
//     google: any;
//     googleTranslateElementInit: any;
//   }
// }
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isError, setError] = useState({ email: false, password: false });
  const [isIncompleteClickHere, setIsIncompleteClickHere] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    initialSlide: 0,
    autoplay: true,
    adaptiveHeight: true,
  };

  useEffect(() => {
    document.title = "Login | Comply Exchange";
    localStorage.clear();
    dispatch(GetAllLanguage());
  }, []);

  const redirectFunc = () => {
    history("/IndividualUs");
  };
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any, isDefaultAgent: boolean = false) => {
    e.preventDefault();
    if (isIncompleteClickHere) {
      handleSaveAndExitLogin();
    } else {
      if ((data.email.trim() !== "" && data.password.trim() !== "") || isDefaultAgent) {
        dispatch(
          eFormSignIn1(
            { ...data, isDefaultAgent },
            (resp: any) => {
              localStorage.setItem("userType", resp.userType);
              localStorage.setItem("loginTime", JSON.stringify(15));
              // localStorage.setItem("loginTime", JSON.stringify(new Date()));

              // if (resp.userType === "GEN") {
              //   alert("Generic");
              // } else if (resp.userType === "SC") {
              //   alert("Self Cert");
              // } else if (resp.userType === "DC") {
              //   alert("Dual Cert");
              // }

              redirectFunc();
            },
            (err: any) => {
              console.log(err);
            }
          )
        );
      } else {
        if (data.email.trim() === "") {
          setError({ ...isError, email: true });
        } else {
          setError({ ...isError, password: true });
        }
      }
    }
  };

  const handleSaveAndExitLogin = () => {
    dispatch(
      SignInSaveAndExit(
        data,
        (res: any) => {
          dispatch(
            LoadExistingFormData(
              res?.formTypeId,
              res.accountHolderDetailsId,
              (resp: any) => { },
              (err: any) => {
                console.log(err);
              }
            )
          );
          localStorage.setItem("loginTime", JSON.stringify(new Date()));
          history(`/${res?.stepName}`);
        },
        (err: any) => {
          console.log(err);
        }
      )
    );
  };

  const handleClearData = () => {
    localStorage.clear();
  };

  return (
    <div className="login-wrap">
      <div className="language">
        <GoogleTranslate />
      </div>

      <div className="container">
        <div className="h-100 g-0 row justify-content-between align-items-center">
          <div className="d-none d-lg-block col-7">
            <div className="left-info">
              <h4>Tax Certification Process</h4>
              <p>
                Welcome to the Comply tax certification process. To submit your
                tax certification documentation, please log in to this secure
                certification website. Please enter the login ID and Access Code
                sent to you here.
              </p>
              <p>
                Upon logging in you will be guided through the tax form
                submission portal. FAQs and help icons are included throughout
                the process to further assist you.
              </p>
              <p>
                Please be aware we are not allowed to provide tax advice,
                however questions related to the website may be directed to{" "}
                <a href="mailto:support@complyechange.com">
                  support@complyexchange.com
                </a>
                .
              </p>
              <p>Thank you for your cooperation and assistance.</p>
            </div>
          </div>
          <div className=" col-md-4 col-lg-4 col form-main">
            <div className="right-form">
              <div className="form-top-info">
                <div className="logo">
                  <img src={logo} />
                  {!isIncompleteClickHere ? (
                    <h1>Onboarding</h1>
                  ) : (
                    <h1>Welcome Back</h1>
                  )}
                </div>
              </div>
              <form onSubmit={(e) => { handleSubmit(e) }}>
                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <label className="textClasslabel">
                        {!isIncompleteClickHere ? "Username" : "Email"}
                      </label>
                      <Input
                        required
                        autoComplete="off"
                        type={!isIncompleteClickHere ? "text" : "email"}
                        name="email"
                        id="exampleEmail"
                        value={data.email}
                        placeholder="Email here..."
                        onChange={handleChange}
                      />
                    </FormGroup>
                    {isError.email ? (
                      <small className="errorClass">Please Enter Email.</small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="column col col-md-12">
                    <FormGroup>
                      <label className="textClasslabel">Password</label>
                      <Input
                        required
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="examplePassword"
                        placeholder="Password here..."
                        value={data.password}
                        onChange={handleChange}
                      />
                      <div
                        className="position-absolute d-flex eyePosition top-0 mr-5 h-10"
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <Visibility
                            onClick={() => setShowPassword(false)}
                            aria-hidden="true"
                          />
                        ) : (
                          <VisibilityOff
                            onClick={() => setShowPassword(true)}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </FormGroup>
                    {isError.password ? (
                      <small className="errorClass">
                        Please Enter Password.
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="buttons-group">
                  <Button type="submit" variant="contained" className="full-w">
                    Sign In
                  </Button>
                  {!isIncompleteClickHere ? (
                    <>
                      {data?.email?.length > 0 ? (
                        ""
                      ) : (
                        <>
                          <div className="button-seperator">OR</div>
                          <Button
                            // type="submit"
                            onClick={(e) => { handleSubmit(e, true) }}
                            variant="contained"
                            className="full-w"
                          >
                            Click here to start submission
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <div style={{ display: "grid", justifyContent: "center" }}>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setIsIncompleteClickHere(false);
                        }}
                      >
                        Back
                      </a>
                    </div>
                  )}
                </div>
              </form>
              {!isIncompleteClickHere ? (
                <div className="loginbelowtext">
                  If you have previously saved an incomplete form,{" "}
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setIsIncompleteClickHere(true);
                    }}
                  >
                    Click here
                  </a>{" "}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
