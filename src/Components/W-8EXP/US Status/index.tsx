import React, { useState, useEffect } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { ExpandMore, Info, Padding } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form } from "formik";
import "./index.scss";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {
  getAllCountries,
  getAllCountriesCode,
  getAllCountriesIncomeCode,
  getAllStateByCountryId,
  GetHelpVideoDetails,
  GetChapter3Status,
  postW8EXPForm,
} from "../../../Redux/Actions";
import { TaxPurposeSchema } from "../../../schemas/w8Exp";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId, FormTypeSelection } from "../../../Utils/constVals";
import { GetExpPdf } from "../../../Redux/Actions/PfdActions";
export default function Fedral_tax(props: any) {
  const dispatch = useDispatch();
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || '{}');
  const { authDetails } = useAuth();
  const W8EXP = useSelector((state: any) => state.W8EXP);

  const [initialValue, setInitialValue] = useState({
    businessName: W8EXP?.businessName ?? obValues.entityName ?? "",
    businessNameOrDisgradedEntityName: W8EXP?.businessNameOrDisgradedEntityName ?? "",
    countryOfIncorporationId: W8EXP?.countryOfIncorporationId ?? 0,
    chapter3StatusId: W8EXP?.chapter3StatusId ?? 0,
    formTypeSelectionId: FormTypeSelection.Entity,
    federal: W8EXP?.federal ?? "",
    isSection892: W8EXP?.isSection892 ?? false,
    isPart1Integral: W8EXP?.isPart1Integral ?? false,
    countryIntegralId: W8EXP?.countryIntegralId ?? 0,
    isPart1Controlled: W8EXP?.isPart1Controlled ?? false,
    countryControlledId: W8EXP?.countryControlledId ?? 0,
    isCertify10d: W8EXP?.isCertify10d ?? false,
    isCertify10e: W8EXP?.isCertify10e ?? false,
    isSection7701and892: W8EXP?.isSection7701and892 ?? false,
    isSection895: W8EXP?.isSection895 ?? false,
    isSection115: W8EXP?.isSection115 ?? false,
    isSection512IRSDated: W8EXP?.isSection512IRSDated ?? false,
    iRSDated: W8EXP?.iRSDated ?? new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }),
    isSetion501: W8EXP?.isSetion501 ?? false,
    isSection501and509A: W8EXP?.isSection501and509A ?? false,
    isSection501and509B: W8EXP?.isSection501and509B ?? false,
    isSection897and1145: W8EXP?.isSection897and1145 ?? false,
    isSection897and1145Partnership: W8EXP?.isSection897and1145Partnership ?? false,
  });
  const [toolInfo, setToolInfo] = useState("");
  const history = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    document.title = "Chapter III"
  }, [])
  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCountriesCode());
    dispatch(getAllCountriesIncomeCode());
    dispatch(GetHelpVideoDetails());
    // dispatch(getAllStateByCountryId());
    dispatch(GetChapter3Status(FormTypeId.W8EXP));
  }, []);
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const getCountriesCodeReducer = useSelector(
    (state: any) => state.getCountriesCodeReducer
  );
  const GetAllIncomeCodesReducer = useSelector(
    (state: any) => state.GetAllIncomeCodesReducer
  );
  const GetStateByCountryIdReducer = useSelector(
    (state: any) => state.GetStateByCountryIdReducer
  );
  const GetChapter3StatusReducer = useSelector(
    (state: any) => state.GetChapter3StatusReducer
  );

  const handleChangeAccodion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [expandedState, setExpandedState] = React.useState<string | false>(
    "panel1"
  );

  const handleChangeAccodionState =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedState(newExpanded ? panel : false);
    };
  const W9Data = useSelector((state: any) => state.w9Data);
  return (
    <>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <div className="overlay-div">
          <div className="overlay-div-group">
            <div className="viewInstructions">View Instructions</div>
            <div className="viewform"
              onClick={() => {
                dispatch(GetExpPdf(authDetails?.accountHolderId));
              }}>View Form</div>
            <div className="helpvideo">
              {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
              {GethelpData && GethelpData[6].id === 8 ? (
                <a
                  href={GethelpData[6].fieldValue}
                  target="popup"
                  onClick={() =>
                    window.open(
                      GethelpData[6].fieldValue,
                      'name',
                      `width=${GethelpData[6].width},height=${GethelpData[6].height},top=${GethelpData[6].top},left=${GethelpData[6].left}`
                    )
                  }
                >
                  Help Video
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-4">
            <div style={{ padding: "20px 0px", height: "100%" }}>
              <BreadCrumbComponent breadCrumbCode={1203} formName={FormTypeId.W8EXP} />
            </div>
          </div>
          <div className="col-8 mt-3">
            <div style={{ padding: "15px" }}>
              <Paper style={{ padding: "10px" }}>
                <Formik
                  validateOnChange={true}
                  validateOnBlur={true}
                  validateOnMount={true}
                  enableReinitialize
                  initialValues={initialValue}
                  validationSchema={TaxPurposeSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    //history("/Exp/Tax_Purpose_Exp/Chapter4_Exp");
                    let temp =
                    {
                      ...values,
                      agentId: authDetails?.agentId,
                      accountHolderBasicDetailId: authDetails?.accountHolderId,
                    };
                    setSubmitting(true);

                    const returnPromise = new Promise((resolve, reject) => {
                      dispatch(postW8EXPForm(
                        temp,
                        (data: any) => {
                          resolve(data);
                          localStorage.setItem("PrevStepData", JSON.stringify(temp));
                        },
                        (err: any) => {
                          reject(err);
                        }
                      ));
                    });

                    return returnPromise;
                  }}
                >
                  {({
                    errors,
                    touched,
                    handleBlur,
                    values,
                    handleSubmit,
                    handleChange,
                    isSubmitting,
                    submitForm,
                    isValid,
                    setFieldValue
                  }) => (
                    <Form>
                      <>{console.log(values, "values")}</>
                      <>{console.log(errors, "errors")}</>
                      <div style={{ width: "100%" }}>
                        <div>
                          <Typography align="left" style={{ margin: "10px" }}>
                            <div
                              className="row"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                className="col-md-12 col-12"
                                align="left"
                                style={{
                                  color: "black",
                                  fontSize: "27px",
                                  fontWeight: "550",
                                }}
                              >
                                Select your status for U.S. tax purposes
                              </Typography>
                            </div>
                            <div className="row">
                              <div
                                className="col-12 col-md-12 mt-3"
                                style={{ marginTop: "20px" }}
                              >
                                <Typography
                                  align="left"
                                  className="d-flex w-100 "
                                  style={{ fontSize: "13px" }}
                                >
                                  Select Chapter 3 Status
                                  <span style={{ color: "red" }}>*</span>
                                  <span>
                                    <Tooltip
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",

                                      }}
                                      title={
                                        <>
                                          <Typography color="inherit">
                                            Classification details
                                          </Typography>
                                          <a
                                            onClick={() => setToolInfo("basic")}
                                          >
                                            <Typography
                                              style={{
                                                cursor: "pointer",
                                                textDecorationLine: "underline",
                                              }}
                                              align="center"
                                            >
                                              {" "}
                                              View More...
                                            </Typography>
                                          </a>
                                        </>
                                      }
                                    >
                                      <Info
                                        style={{
                                          color: "#ffc107",
                                          fontSize: "12px",
                                          verticalAlign: "super",
                                          cursor: "pointer",

                                        }}
                                      />
                                    </Tooltip>
                                  </span>
                                </Typography>

                                {toolInfo === "basic" ? (
                                  <div>
                                    <Paper
                                      style={{
                                        backgroundColor: "#dedcb1",
                                        padding: "15px",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <Typography>
                                        Please make a selection from the
                                        dropdown provided. The selection must
                                        represent the Chapter 3 classification,
                                        under U.S. tax principles, of the
                                        individual, business, or organization
                                        that the certificate will represent.
                                      </Typography>
                                      <Typography style={{ marginTop: "10px" }}>
                                        For more information, please review the
                                        Chapter 3 Classification Guide to
                                        establish your entity status for
                                        purposes of Chapter 3.
                                      </Typography>
                                      <Typography
                                        style={{
                                          marginTop: "10px",
                                          fontWeight: "550",
                                        }}
                                      >
                                        IRS Guidance:
                                      </Typography>
                                      <Typography style={{ marginTop: "10px" }}>
                                        Please selection the option that
                                        applies. By making this selection, you
                                        are representing that you qualify for
                                        this classification. You must select the
                                        option that represents your
                                        classification (for example,
                                        corporation, partnership, trust, estate,
                                        etc.) under U.S. tax principles. Do not
                                        select the option that describes your
                                        status under the law of the treaty
                                        country. If you are a partnership or a
                                        disregarded entity receiving a payment
                                        for which treaty benefits are being
                                        claimed, you must select the
                                        'Partnership' or 'Disregarded entity'
                                        option. If you are a sole proprietor
                                        select the 'Individual' option, not
                                        'Disregarded entity'.
                                      </Typography>

                                      <Link
                                        href="#"
                                        underline="none"
                                        style={{
                                          marginTop: "10px",
                                          fontSize: "16px", color: "#0000C7"
                                        }}
                                        onClick={() => {
                                          setToolInfo("");
                                        }}
                                      >
                                        --Show Less--
                                      </Link>
                                    </Paper>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <FormControl className="w-50">
                                  <select
                                    name="chapter3StatusId"
                                    value={values.chapter3StatusId}
                                    onChange={handleChange}
                                    autoComplete="businessName"
                                    // placeholder="Business Name"
                                    onBlur={handleBlur}
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "39px",
                                    }}
                                  >
                                    <option> -----select---</option>

                                    {GetChapter3StatusReducer.GetChapter3StatusData?.map(
                                      (ele: any) => (
                                        <option key={ele?.id} value={ele?.id}>
                                          {ele?.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <p className="error">
                                    {touched.chapter3StatusId ? errors.chapter3StatusId?.toString() : <></>}
                                  </p>
                                </FormControl>
                              </div>
                            </div>
                            {values.chapter3StatusId == 1 || values.chapter3StatusId == 6 || values.chapter3StatusId == 7 || values.chapter3StatusId == 8 || values.chapter3StatusId == 9 || values.chapter3StatusId == 10 || values.chapter3StatusId == 11 || values.chapter3StatusId == 12 || values.chapter3StatusId == 13 || values.chapter3StatusId == 14 || values.chapter3StatusId == 15 || values.chapter3StatusId == 16 || values.chapter3StatusId == 18 || values.chapter3StatusId == 19 || values.chapter3StatusId == 17 ? (
                              <>

                                <div
                                  style={{ marginTop: "20px", display: "flex" }}
                                  className="col-12"
                                >
                                  <div className="col-6">
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name:

                                      <span style={{ color: "red" }}>*</span>
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",
                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                Name details
                                              </Typography>
                                              <a
                                                onClick={() => setToolInfo("name")}
                                              >
                                                <Typography
                                                  style={{
                                                    cursor: "pointer",
                                                    textDecorationLine: "underline",
                                                  }}
                                                  align="center"
                                                >
                                                  {" "}
                                                  View More...
                                                </Typography>
                                              </a>
                                            </>
                                          }
                                        >
                                          <Info
                                            style={{
                                              color: "#ffc107",
                                              fontSize: "10px",
                                              cursor: "pointer",
                                              verticalAlign: "super",
                                            }}
                                          />
                                        </Tooltip>
                                      </span>
                                    </Typography>
                                    {toolInfo === "name" ? (
                                      <div>
                                        <Paper
                                          style={{
                                            backgroundColor: "#dedcb1",
                                            padding: "15px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <Typography>
                                            Please enter the first and last name of
                                            the person who is required or has been
                                            requested to submit an information
                                            return.
                                          </Typography>
                                          <Typography
                                            style={{
                                              marginTop: "10px",
                                              fontWeight: "550",
                                            }}
                                          >
                                            Specific instructions for U.S.
                                            individuals and sole proprietors: U.S.
                                            individuals:
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            If you are an{" "}
                                            <span style={{ fontWeight: "550" }}>
                                              individual
                                            </span>
                                            , you must enter the name shown on your
                                            income tax return. However, if you have
                                            changed your last name, for instance,
                                            due to marriage without informing the
                                            Social Security Administration of the
                                            name change, enter your first name, the
                                            last name shown on your social security
                                            card, and your new last name. In certain
                                            situations we may need to contact you
                                            for further verification.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            <span style={{ fontWeight: "550" }}>
                                              Joint names:
                                            </span>
                                            If the account is in joint names, both
                                            parties will need to submit separate
                                            submissions.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            <span style={{ fontWeight: "550" }}>
                                              {" "}
                                              Sole proprietor:
                                            </span>
                                            Enter your individual name as shown on
                                            your income tax return on the 'Name'
                                            line. You may enter your business,
                                            trade, or 'doing business as (DBA)' name
                                            on the 'Business name' line.
                                          </Typography>

                                          <Link
                                            href="#"
                                            underline="none"
                                            style={{
                                              marginTop: "10px",
                                              fontSize: "16px", color: "#0000C7"
                                            }}
                                            onClick={() => {
                                              setToolInfo("");
                                            }}
                                          >
                                            --Show Less--
                                          </Link>
                                        </Paper>
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="businessName"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        // helperText={
                                        //   touched.businessName && errors.businessName
                                        // }
                                        error={Boolean(
                                          touched.businessName && errors.businessName
                                        )}
                                        name="businessName"
                                        className="inputClassFull"
                                        value={values.businessName}
                                      />
                                    </FormControl>
                                  </div>
                                  <div
                                    className="col-6"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name or disregarded entity name if
                                      different:
                                    </Typography>

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="businessNameOrDisgradedEntityName"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={
                                          touched.businessNameOrDisgradedEntityName && errors.businessNameOrDisgradedEntityName?.toString()
                                        }
                                        error={Boolean(
                                          touched.businessNameOrDisgradedEntityName && errors.businessNameOrDisgradedEntityName?.toString()
                                        )}
                                        name="businessNameOrDisgradedEntityName"
                                        value={values.businessNameOrDisgradedEntityName}
                                        className="inputClass"
                                      />
                                    </FormControl>
                                  </div>
                                </div>

                                <>
                                  <div className="row">
                                    <div className=" col-12">
                                      <Typography
                                        align="left"
                                        className="d-flex w-60 "
                                        style={{
                                          fontSize: "13px",
                                          marginTop: "15px",
                                        }}
                                      >
                                        Country of incorporation / organization:
                                        <span style={{ color: "red" }}>*</span>
                                      </Typography>

                                      <FormControl className="w-50">
                                        <select
                                          name="countryOfIncorporationId"
                                          value={values.countryOfIncorporationId}
                                          onChange={handleChange}
                                          autoComplete="countryOfIncorporationId"
                                          // placeholder="County of Incorporation"
                                          onBlur={handleBlur}
                                          style={{
                                            padding: " 0 10px",
                                            color: "#121112",
                                            fontStyle: "italic",
                                            height: "36px",
                                          }}
                                        >
                                          <option value="">-Select-</option>
                                          <option value={257}>
                                            United Kingdom
                                          </option>
                                          <option value={258}>United States</option>
                                          <option value="">---</option>
                                          {getCountriesReducer.allCountriesData?.map(
                                            (ele: any) => (
                                              <option key={ele?.id} value={ele?.id}>
                                                {ele?.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {/* <p className="error">
                                      {errors.businessName}
                                    </p> */}
                                      </FormControl>
                                    </div>
                                  </div>
                                </>
                              </>) : ""}

                            {values.chapter3StatusId == 2 || values.chapter3StatusId == 3 || values.chapter3StatusId == 4 || values.chapter3StatusId == 5 ? (<>
                              <>

                                <div
                                  style={{ marginTop: "20px", display: "flex" }}
                                  className="col-12"
                                >
                                  <div className="col-6">
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name:
                                      <span style={{ color: "red" }}>*</span>
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",
                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                Name details
                                              </Typography>
                                              <a
                                                onClick={() => setToolInfo("name")}
                                              >
                                                <Typography
                                                  style={{
                                                    cursor: "pointer",
                                                    textDecorationLine: "underline",
                                                  }}
                                                  align="center"
                                                >
                                                  {" "}
                                                  View More...
                                                </Typography>
                                              </a>
                                            </>
                                          }
                                        >
                                          <Info
                                            style={{
                                              color: "#ffc107",
                                              fontSize: "10px",
                                              cursor: "pointer",
                                              verticalAlign: "super",
                                            }}
                                          />
                                        </Tooltip>
                                      </span>
                                    </Typography>
                                    {toolInfo === "name" ? (
                                      <div>
                                        <Paper
                                          style={{
                                            backgroundColor: "#dedcb1",
                                            padding: "15px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <Typography>
                                            Please enter the first and last name of
                                            the person who is required or has been
                                            requested to submit an information
                                            return.
                                          </Typography>
                                          <Typography
                                            style={{
                                              marginTop: "10px",
                                              fontWeight: "550",
                                            }}
                                          >
                                            Specific instructions for U.S.
                                            individuals and sole proprietors: U.S.
                                            individuals:
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            If you are an{" "}
                                            <span style={{ fontWeight: "550" }}>
                                              individual
                                            </span>
                                            , you must enter the name shown on your
                                            income tax return. However, if you have
                                            changed your last name, for instance,
                                            due to marriage without informing the
                                            Social Security Administration of the
                                            name change, enter your first name, the
                                            last name shown on your social security
                                            card, and your new last name. In certain
                                            situations we may need to contact you
                                            for further verification.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            <span style={{ fontWeight: "550" }}>
                                              Joint names:
                                            </span>
                                            If the account is in joint names, both
                                            parties will need to submit separate
                                            submissions.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            <span style={{ fontWeight: "550" }}>
                                              {" "}
                                              Sole proprietor:
                                            </span>
                                            Enter your individual name as shown on
                                            your income tax return on the 'Name'
                                            line. You may enter your business,
                                            trade, or 'doing business as (DBA)' name
                                            on the 'Business name' line.
                                          </Typography>

                                          <Link
                                            href="#"
                                            underline="none"
                                            style={{
                                              marginTop: "10px",
                                              fontSize: "16px", color: "#0000C7"
                                            }}
                                            onClick={() => {
                                              setToolInfo("");
                                            }}
                                          >
                                            --Show Less--
                                          </Link>
                                        </Paper>
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="businessName"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        // helperText={
                                        //   touched.businessName && errors.businessName
                                        // }
                                        error={Boolean(
                                          touched.businessName && errors.businessName
                                        )}
                                        name="businessName"
                                        className="inputClassFull"
                                        value={values.businessName}
                                      />
                                    </FormControl>
                                  </div>
                                  <div
                                    className="col-6  "
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name or disregarded entity name if
                                      different:
                                    </Typography>

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="businessNameOrDisgradedEntityName"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={
                                          touched.businessNameOrDisgradedEntityName && errors.businessNameOrDisgradedEntityName?.toString()
                                        }
                                        error={Boolean(
                                          touched.businessNameOrDisgradedEntityName && errors.businessNameOrDisgradedEntityName?.toString()
                                        )}
                                        name="businessNameOrDisgradedEntityName"
                                        value={values.businessNameOrDisgradedEntityName}
                                        className="inputClass"
                                      />
                                    </FormControl>
                                  </div>
                                </div>

                                <>
                                  <div className="row">
                                    <div className=" col-12">
                                      <Typography
                                        align="left"
                                        className="d-flex w-60 "
                                        style={{
                                          fontSize: "13px",
                                          marginTop: "15px",
                                        }}
                                      >
                                        Country of incorporation / organization:
                                        <span style={{ color: "red" }}>*</span>
                                      </Typography>

                                      <FormControl className="w-50">
                                        <select
                                          name="countryOfIncorporationId"
                                          value={values.countryOfIncorporationId}
                                          onChange={handleChange}
                                          autoComplete="countryOfIncorporationId"
                                          //placeholder="Business Name"
                                          onBlur={handleBlur}
                                          style={{
                                            padding: " 0 10px",
                                            color: "#121112",
                                            fontStyle: "italic",
                                            height: "39px",
                                          }}
                                        >
                                          <option value="">-Select-</option>
                                          <option value={257}>
                                            United Kingdom
                                          </option>
                                          <option value={258}>United States</option>
                                          <option value="">---</option>
                                          {getCountriesReducer.allCountriesData?.map(
                                            (ele: any) => (
                                              <option key={ele?.id} value={ele?.id}>
                                                {ele?.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {/* <p className="error">
                                      {errors.businessName}
                                    </p> */}
                                      </FormControl>
                                    </div>
                                  </div>
                                </>
                              </>

                              <div>
                                <Typography
                                  className="mt-3"
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  Hybrid status:
                                </Typography>
                                <FormControl>
                                  <RadioGroup
                                    row
                                    defaultValue="Not"
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    //   value={values.isHeldUSCitizenship}
                                    onChange={handleChange}
                                    id="isHeldUSCitizenship"
                                  >
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="Yes"
                                      name="isHeldUSCitizenship"
                                      label="Hybrid"
                                    />
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="No"
                                      name="isHeldUSCitizenship"
                                      label="Reverse Hybrid"
                                    />
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="Not"
                                      name="isHeldUSCitizenship"
                                      label="Not Applicable"
                                    />
                                  </RadioGroup>
                                  <p className="error">
                                    {/* {errors.isHeldUSCitizenship} */}
                                  </p>
                                </FormControl>
                              </div>

                              <div className="mt-2">
                                <Typography
                                  style={{
                                    fontSize: "15px",
                                  }}
                                >
                                  Please provide a description of your hybrid
                                  status and if applicable attach additional
                                  information to substantiate your statement for
                                  United States tax purposes.
                                </Typography>
                                <FormControl className="w-100 textfield1">
                                  <TextField className="textfield1" />
                                </FormControl>
                                <div className="d-flex mt-3 ">
                                  <Typography
                                    className="mx-2"
                                    style={{
                                      fontSize: "15px",
                                    }}
                                  >
                                    Attach supporting documentation:
                                  </Typography>
                                  <input
                                    type="file"
                                    style={{ fontSize: "12px" }}
                                  />
                                </div>
                                <div className="mt-2">
                                  <Typography
                                    style={{
                                      fontSize: "15px",
                                    }}
                                  >
                                    Is this submission being made on behalf of a
                                    disregarded entity that has a Single U.S.
                                    Owner?
                                  </Typography>
                                  <FormControl>
                                    <RadioGroup
                                      row
                                      defaultValue="No"
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                      value={values.federal}
                                      onChange={handleChange}

                                    >
                                      <FormControlLabel
                                        control={<Radio />}
                                        value="Yes"
                                        name="federal"
                                        label="Yes"
                                      />
                                      <FormControlLabel
                                        control={<Radio />}
                                        value="No"
                                        name="federal"
                                        label="No"
                                      />
                                    </RadioGroup>
                                    <p className="error">
                                      {/* {errors.isHeldUSCitizenship} */}
                                    </p>
                                  </FormControl>
                                </div>
                                {values.federal == "Yes" ? (
                                  <div>
                                    <Typography
                                      style={{
                                        fontSize: "15px",
                                      }}
                                    >
                                      Are you considered disregarded for purposes of
                                      Section 1446?
                                    </Typography>
                                    <FormControl>
                                      <RadioGroup
                                        row
                                        defaultValue="No"
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        //   value={values.isHeldUSCitizenship}
                                        onChange={handleChange}
                                        id="isHeldUSCitizenship"
                                      >
                                        <FormControlLabel
                                          control={<Radio />}
                                          value="Yes"
                                          name="isHeldUSCitizenship"
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          control={<Radio />}
                                          value="No"
                                          name="isHeldUSCitizenship"
                                          label="No"
                                        />
                                      </RadioGroup>
                                      <p className="error">
                                        {/* {errors.isHeldUSCitizenship} */}
                                      </p>
                                    </FormControl>
                                  </div>) : values.federal == "No" ? (
                                    ""
                                  ) : ""}
                              </div>
                            </>) : ""}



                          </Typography>
                        </div>

                        <div style={{ padding: "10px", width: "100%" }}>
                          <Accordion
                            expanded={expanded === "groupPanel"}
                            onChange={handleChangeAccodion("groupPanel")}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls="panel-content"
                              id="panel-header"
                            >
                              <Typography
                                style={{ fontSize: "14px", color: "blue" }}
                              >
                                Chapter 3 Status Guide Test
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Accordion
                                expanded={expandedState === "panel1"}
                                onChange={handleChangeAccodionState("panel1")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel1d-content"
                                  id="panel1d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Introduction
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Classification Guide - Introduction
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "20px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    This guide is provided to help you determine
                                    the classification of the entity the
                                    submission represents.
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    In the left hand menu you will see several
                                    different classification types. Please
                                    select each in turn reading the definition
                                    provided. When you are satisfied the
                                    description matches the entity type select
                                    “confirm”.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Depending on the type selected you may
                                    either be provided with further selections,
                                    more detailed guidance or the pop up will
                                    close and you will be taken to the next
                                    stage in the submission process.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Please note that although this guide is
                                    provided to assist your selection, it is not
                                    intended nor aims to provide tax advice.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "30px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Should you need specific help or guidance
                                    you should consult your tax advisers.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                              <Accordion
                                expanded={expandedState === "panel2"}
                                onChange={handleChangeAccodionState("panel2")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Corporation{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    It is a legal entity that is separate and
                                    distinct from its owners formed under the
                                    laws of the country or state in which it is
                                    registered.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    A corporation is created “incorporated” by
                                    one or more of shareholders who have
                                    ownership of the corporation, represented by
                                    their holding of common stock. In general, a
                                    corporation is formed under state law by the
                                    filing of articles of incorporation with the
                                    state. The state must generally date-stamp
                                    the articles before they are effective. You
                                    may wish to consult the law of the state in
                                    which the organization is incorporated. In
                                    the normal course of business the
                                    corporation itself and not the shareholders
                                    that own it, is held legally liable for the
                                    actions and debts the business incurs.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel3"}
                                onChange={handleChangeAccodionState("panel3")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Disregarded Entity{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A business entity that is not a corporation
                                    and that has a single owner may be
                                    disregarded as an entity separate from its
                                    owner (a disregarded entity) for federal tax
                                    purposes.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    The payee of a payment made to a disregarded
                                    entity is the owner of the entity.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel4"}
                                onChange={handleChangeAccodionState("panel4")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Partnership{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A partnership is a relationship between two
                                    or more entities or persons who join to
                                    carry on a trade or business, with each
                                    partner contributing money, property,
                                    labour, or skill, and each expecting to
                                    share in the profits and losses. Every
                                    partnership that engages in a trade or
                                    business or has income from sources in the
                                    United States must file an annual
                                    information return, Form 1065, U.S.
                                    Partnership Return of Income, or Form
                                    1065-B, U.S. Return of Income for Electing
                                    Large Partnerships, with the Internal
                                    Revenue Service, showing the partnership's
                                    taxable income or loss for the year. A
                                    partnership must file this return even if
                                    its principal place of business is outside
                                    the United States and even if all of its
                                    members are non-resident aliens.
                                  </Typography>
                                  <Typography
                                    align="center"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Foreign Partnerships
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Partnerships not created or organized in the
                                    United States, or under the law of the
                                    United States or of any state, are foreign
                                    partnerships. In general, if a foreign
                                    partnership has gross income from trade or
                                    business within the United States or has
                                    gross income derived from sources within the
                                    United States, it must file a partnership
                                    return.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel5"}
                                onChange={handleChangeAccodionState("panel5")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Simple Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    Generally, a foreign simple trust is a
                                    foreign trust that is required to distribute
                                    all of its income annually.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Simple trusts are defined by three main
                                    conditions.
                                  </Typography>
                                  <Typography align="left">
                                    <li>
                                      Income from a simple trust may not be
                                      distributed to charitable beneficiaries.
                                    </li>

                                    <li>
                                      Distributions may not be made from the
                                      corpus (capital or principle amount) of a
                                      simple trust.
                                    </li>
                                    <li>
                                      For an entity to be classified as a simple
                                      trust, the trust instrument must require
                                      the trustee to distribute all of the
                                      trust’s fiduciary accounting income to the
                                      beneficiaries.
                                    </li>
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    These conditions are evaluated on a yearly
                                    basis. If a trust fails to meet any one of
                                    the three conditions, it is considered a
                                    complex trust for that tax year.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel6"}
                                onChange={handleChangeAccodionState("panel6")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Grantor Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A grantor trust is a foreign (non-U.S.)
                                    trust to the extent that all or a portion of
                                    the income of the trust is treated as owned
                                    by the grantor or another person under
                                    sections 670 through 671 of the U.S. tax
                                    code. Please click on the link below to open
                                    the pdf in another window.
                                  </Typography>
                                  <Link
                                    align="left"
                                    style={{ marginTop: "10px", color: "blue" }}
                                  >
                                    Click here to open the U.S. Internal Revenue
                                    Code
                                  </Link>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                              <Accordion
                                expanded={expandedState === "panel7"}
                                onChange={handleChangeAccodionState("panel7")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Complex Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A complex trust is defined as any trust that
                                    does not meet the definition of a simple
                                    trust. Therefore, a complex trust must
                                    distribute to charitable beneficiaries,
                                    distribute amounts from the corpus (capital
                                    or principle amount) , and/or retain some
                                    current income by directive of the trust
                                    instrument
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel8"}
                                onChange={handleChangeAccodionState("panel8")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Estate{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    An Estate is defined as the whole of one's
                                    possessions, especially all the property and
                                    debts left by one at death
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel9"}
                                onChange={handleChangeAccodionState("panel9")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Foreign Government – Integral Part
                                    (Temporary regulations definition){" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    Foreign government defined (temporary
                                    regulations).
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    The term “foreign government” means only the
                                    integral parts or controlled entities of a
                                    foreign sovereign.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (i) It is wholly owned and controlled by a
                                    foreign sovereign directly or indirectly
                                    through one or more controlled entities;
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      Integral part.
                                    </span>{" "}
                                    An “integral part” of a foreign sovereign is
                                    any person, body of persons, organization,
                                    agency, bureau, fund, instrumentality, or
                                    other body, however designated, that
                                    constitutes a governing authority of a
                                    foreign country. The net earnings of the
                                    governing authority must be credited to its
                                    own account or to other accounts of the
                                    foreign sovereign, with no portion inuring
                                    to the benefit of any private person. An
                                    integral part does not include any
                                    individual who is a sovereign, official, or
                                    administrator acting in a private or
                                    personal capacity. Consideration of all the
                                    facts and circumstances will determine
                                    whether an individual is acting in a private
                                    or personal capacity.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel10"}
                                onChange={handleChangeAccodionState("panel10")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Foreign Government – Controlled Entity
                                    (Temporary regulations definition){" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    The term “foreign government” means only the
                                    integral parts or controlled entities of a
                                    foreign sovereign.
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      {" "}
                                      Controlled entity.
                                    </span>{" "}
                                    The term “controlled entity” means an entity
                                    that is separate in form from a foreign
                                    sovereign or otherwise constitute a separate
                                    juridical entity if it satisfies the
                                    following requirements:
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (i) It is wholly owned and controlled by a
                                    foreign sovereign directly or indirectly
                                    through one or more controlled entities;
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (ii) It is organized under the laws of the
                                    foreign sovereign by which owned;
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (iii) Its net earnings are credited to its
                                    own account or to other accounts of the
                                    foreign sovereign, with no portion of its
                                    income inuring to the benefit of any private
                                    person; and
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (iv) Its assets vest in the foreign
                                    sovereign upon dissolution.
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    A controlled entity does not include
                                    partnerships or any other entity owned and
                                    controlled by more than one foreign
                                    sovereign. Thus, a foreign financial
                                    organization organized and wholly owned and
                                    controlled by several foreign sovereigns to
                                    foster economic, financial, and technical
                                    cooperation between various foreign nations
                                    is not a controlled entity for purposes of
                                    this section.
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel11"}
                                onChange={handleChangeAccodionState("panel11")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    International Organization{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    An Estate is defined as the whole of one's
                                    possessions, especially all the property and
                                    debts left by one at death
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel12"}
                                onChange={handleChangeAccodionState("panel12")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Central Bank of Issue{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A bank that is constituted by a government
                                    or international organization to issue and
                                    regulate currency, regulate banks under its
                                    jurisdiction, act as a lender of last
                                    resort, and generally ensure a sustainable
                                    monetary policy.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel13"}
                                onChange={handleChangeAccodionState("panel13")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Tax-Exempt Organization{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A Foreign Tax-Exempt Organization is an
                                    organization that is exempt under Section
                                    501( C ) of the Internal Revenue Code
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    As a general rule this can include amongst
                                    other types:
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    1. Corporations, and any community chest,
                                    fund, or foundation, organized and operated
                                    exclusively for religious, charitable,
                                    scientific, testing for public safety
                                    literary, or educational purposes
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    2. To foster national or international
                                    amateur sports competition (but only if no
                                    part of its activities involve the provision
                                    of athletic facilities or equipment)
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    3. For the prevention of cruelty to children
                                    or animals, no part of the net earnings of
                                    which inures to the benefit of any private
                                    shareholder or individual, no substantial
                                    part of the activities of which is carrying
                                    on propaganda, or otherwise attempting, to
                                    influence legislation (except as otherwise
                                    provided in subsection (h)), and which does
                                    not participate in, or intervene in
                                    (including the publishing or distributing of
                                    statements), any political campaign on
                                    behalf of (or in opposition to) any
                                    candidate for public office.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel14"}
                                onChange={handleChangeAccodionState("panel14")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Private Foundation{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    Typically have a single major source of
                                    funding (usually gifts from one family or
                                    corporation rather than funding from many
                                    sources) and most have as their primary
                                    activity the making of grants to other
                                    charitable organizations and to individuals,
                                    rather than the direct operation of
                                    charitable programs.
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    In order to demonstrate that it is a private
                                    operating foundation, an organization must
                                    meet an assets test, a support test, or an
                                    endowment test and demonstrate that it
                                    distributes substantially all (85% or more)
                                    of the lesser of its adjusted net income or
                                    minimum investment return directly for the
                                    active conduct of activities that further
                                    its exempt purposes.
                                  </Typography>
                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained">Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel15"}
                                onChange={handleChangeAccodionState("panel15")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel3d-content"
                                  id="panel3d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Don't Know?
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Don't Know?
                                  </Typography>
                                  <Typography style={{ marginTop: "10px" }}>
                                    Please pick a category from the left hand
                                    menu. We cannot offer tax advice so if you
                                    need assistance, please Exit the process and
                                    consult your tax adviser.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </AccordionDetails>
                          </Accordion>
                        </div>

                        <>
                          <div className="statusHeader">
                            <div className="statusPart">Part II</div>
                            <div className="statusTitle">Qualifiaction statement for chapter 3 status</div>
                          </div>
                        </>

                        {
                          values.chapter3StatusId == 10 ?
                            <>
                              <div style={{ paddingLeft: "20px" }}>
                                <Typography sx={{ fontWeight: "bolder" }}>
                                  11 	For an international organization:
                                  <span>
                                    <Tooltip
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",

                                      }}
                                      title={
                                        <>
                                          <Typography color="inherit">
                                            TT-292 - W8EXP-Q11
                                          </Typography>
                                          <a
                                            onClick={() => setToolInfo("interOrg")}
                                          >
                                            <Typography
                                              style={{
                                                cursor: "pointer",
                                                textDecorationLine: "underline",
                                              }}
                                              align="center"
                                            >
                                              {" "}
                                              View More...
                                            </Typography>
                                          </a>
                                        </>
                                      }
                                    >
                                      <Info
                                        style={{
                                          color: "#ffc107",
                                          fontSize: "12px",
                                          verticalAlign: "super",
                                          cursor: "pointer",

                                        }}
                                      />
                                    </Tooltip>
                                  </span>
                                  {toolInfo === "interOrg" ? (
                                    <div>
                                      <Paper
                                        style={{
                                          backgroundColor: "#dedcb1",
                                          padding: "15px",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <Typography>
                                          <b>Line 11 Help</b> . If you are an international organization check the box that applies. By checking this box, you are certifying to all the statements made in line 11.
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          If you wish to attach a statement or additional information, you will be able  to do so at the next stage.
                                        </Typography>
                                        <Typography >
                                          <span style={{ fontWeight: "bolder" }}>IRS Instructions Line 11.</span> By checking this box, you are certifying to all the statements made in line 11.
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          You are certifying the following:
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          1 The entity identified in Part I is an international organization within the meaning od section 7701(a)(18)  <b>and</b>
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          2 The payments are within the scope of the exemption granted by section 892
                                        </Typography>

                                        <Link
                                          href="#"
                                          underline="none"
                                          style={{
                                            marginTop: "10px",
                                            fontSize: "16px", color: "#0000C7"
                                          }}
                                          onClick={() => {
                                            setToolInfo("");
                                          }}
                                        >
                                          --Show Less--
                                        </Link>
                                      </Paper>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Typography>
                                <div style={{ paddingLeft: "20px" }}>
                                  <Checkbox
                                    name="isSection7701and892"
                                    value={values?.isSection7701and892}
                                    checked={values?.isSection7701and892}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <Typography sx={{ display: "inline" }}>
                                    I certify that</Typography>
                                  <ul>
                                    <li><Typography>The entity identified in Part I is an international organization within the meaning of <span style={{ color: "#007bff" }}>section 7701(a)(18)</span> and</Typography></li>
                                    <li><Typography>The payments are within the scope of the exemption granted by <span style={{ color: "#007bff" }}>section 892</span>.</Typography></li>
                                  </ul>
                                </div>
                              </div>
                            </> : <></>
                        }

                        {
                          values.chapter3StatusId == 14 ?
                            <>
                              <div style={{ paddingLeft: "20px" }}>
                                <Typography sx={{ fontWeight: "bolder" }}>
                                  10
                                  <Typography sx={{ display: "inline", fontWeight: "500" }}>{" "}
                                    For a foreign government:
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",

                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-292 - W8EXP-Q10
                                            </Typography>
                                            <a
                                              onClick={() => setToolInfo("foreignGov")}
                                            >
                                              <Typography
                                                style={{
                                                  cursor: "pointer",
                                                  textDecorationLine: "underline",
                                                }}
                                                align="center"
                                              >
                                                {" "}
                                                View More...
                                              </Typography>
                                            </a>
                                          </>
                                        }
                                      >
                                        <Info
                                          style={{
                                            color: "#ffc107",
                                            fontSize: "12px",
                                            verticalAlign: "super",
                                            cursor: "pointer",

                                          }}
                                        />
                                      </Tooltip>
                                    </span>
                                    {toolInfo === "foreignGov" ? (
                                      <div>
                                        <Paper
                                          style={{
                                            backgroundColor: "#dedcb1",
                                            padding: "15px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <Typography>
                                            If you are a foreign government check the boxes that apply and enter the government name.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            Check box 10a and box 10b or box 10c, whichever applies.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            Select the name of the foreign sovereign’s country on line 10b (if the entity is an integral part of a foreign government)
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            or on line 10c (if the entity is a controlled entity). A central bank of issue (wholly owned by a foreign sovereign) should check box 10c.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            If you wish to attach statement or additional information, you will be able to do so at the next stage.
                                          </Typography>

                                          <Link
                                            href="#"
                                            underline="none"
                                            style={{
                                              marginTop: "10px",
                                              fontSize: "16px", color: "#0000C7"
                                            }}
                                            onClick={() => {
                                              setToolInfo("");
                                            }}
                                          >
                                            --Show Less--
                                          </Link>
                                        </Paper>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </Typography>

                                  <Typography style={{ paddingLeft: "20px" }}>
                                    a {" "}
                                    <Checkbox
                                      name="isSection892"
                                      value={values?.isSection892}
                                      checked={values.isSection892}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />{" "}
                                    I certify that the entity identified in Part I is a foreign government within the meaning of section 892 and the payments are within the scope of the exemption granted by <span style={{ color: "#007bff" }}>section 892</span> . </Typography>
                                </Typography>
                                <div style={{ paddingLeft: "20px" }}>
                                  <Typography >
                                    b {" "}
                                    <Checkbox
                                      name="isPart1Integral"
                                      value={values?.isPart1Integral}
                                      checked={values.isPart1Integral}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setTimeout(() => {
                                          setFieldValue("isPart1Controlled", false);
                                          setFieldValue("countryControlledId", 0);
                                        }, 50);
                                      }}
                                      onBlur={handleBlur}
                                    />{" "}
                                    The entity identified in Part I is an integral part of the government of:
                                    <FormControl className="w-50" sx={{ display: "grid" }}>
                                      <select
                                        name="countryIntegralId"
                                        disabled={!values.isPart1Integral}
                                        value={values?.countryIntegralId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{
                                          padding: " 0 10px",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "39px",
                                        }}
                                      >
                                        <option value={0}> ---Please select country---</option>
                                        <option value={258}>United States</option>
                                        <option value={257}> United Kingdom</option>
                                        <option value={-1}> -------------------------</option>
                                        {getCountriesReducer?.allCountriesData?.map(
                                          (ele: any) => (
                                            <option key={ele?.id} value={ele?.id}>
                                              {ele?.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      {/* <p className="error">
                                        {touched.chapter3StatusId ? errors.chapter3StatusId?.toString() : <></>}
                                      </p> */}
                                    </FormControl>
                                  </Typography>
                                  <Typography >
                                    c {" "}
                                    <Checkbox
                                      name="isPart1Controlled"
                                      value={values?.isPart1Controlled}
                                      checked={values.isPart1Controlled}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setTimeout(() => {
                                          setFieldValue("isPart1Integral", false);
                                          setFieldValue("countryIntegralId", 0);
                                        }, 50);
                                      }}
                                      onBlur={handleBlur}
                                    />{" "}
                                    The entity identified in Part I is a controlled entity of the government of:
                                    <FormControl className="w-50" sx={{ display: "grid" }}>
                                      <select
                                        disabled={!values.isPart1Controlled}
                                        name="countryControlledId"
                                        value={values?.countryControlledId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{
                                          padding: " 0 10px",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "39px",
                                        }}
                                      >
                                        <option value={0}> ---Please select country---</option>
                                        <option value={258}>United States</option>
                                        <option value={257}> United Kingdom</option>
                                        <option value={-1}> -------------------------</option>
                                        {getCountriesReducer?.allCountriesData?.map(
                                          (ele: any) => (
                                            <option key={ele?.id} value={ele?.id}>
                                              {ele?.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      {/* <p className="error">
                                        {touched.chapter3StatusId ? errors.chapter3StatusId?.toString() : <></>}
                                      </p> */}
                                    </FormControl>
                                  </Typography>
                                  <Typography sx={{ display: "inline", fontWeight: "bolder" }}>
                                    If box 10c is checked, check box 10d or box 10e, whichever applies.
                                  </Typography>
                                  <Typography >
                                    d {" "}
                                    <Checkbox
                                      disabled={!values.isPart1Controlled}
                                      name="isCertify10d"
                                      value={values.isCertify10d}
                                      checked={values.isCertify10d}
                                      onChange={(e) => { handleChange(e); setFieldValue("isCertify10e", false) }}
                                      onBlur={handleBlur}
                                    />{" "}
                                    I certify that for a beneficial owner that is a controlled entity of a foreign sovereign (other than a foreign central bank of issue wholly owned by a foreign sovereign), the beneficial owner is not engaged in commercial activities within or outside the United States.

                                  </Typography>
                                  <Typography >
                                    e {" "}
                                    <Checkbox
                                      disabled={!values.isPart1Controlled}
                                      name="isCertify10e"
                                      value={values.isCertify10e}
                                      checked={values.isCertify10e}
                                      onChange={(e) => { handleChange(e); setFieldValue("isCertify10d", false) }}
                                      onBlur={handleBlur}
                                    />{" "}
                                    I certify that for a beneficial owner that is a foreign central bank of issue and a controlled entity of a foreign sovereign, the beneficial owner is not engaged in commercial activities within the United States.

                                  </Typography>
                                </div>
                              </div>
                            </> : <></>
                        }
                        {
                          values.chapter3StatusId == 15 ?
                            <>
                              <div style={{ paddingLeft: "20px" }}>
                                <Typography sx={{ fontWeight: "bolder" }}>
                                  12. For a foreign central bank of issue (not wholly owned by the foreign sovereign):
                                  <span>
                                    <Tooltip
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",

                                      }}
                                      title={
                                        <>
                                          <Typography color="inherit">
                                            TT-292 - W8EXP-Q12
                                          </Typography>
                                          <a
                                            onClick={() => setToolInfo("12")}
                                          >
                                            <Typography
                                              style={{
                                                cursor: "pointer",
                                                textDecorationLine: "underline",
                                              }}
                                              align="center"
                                            >
                                              {" "}
                                              View More...
                                            </Typography>
                                          </a>
                                        </>
                                      }
                                    >
                                      <Info
                                        style={{
                                          color: "#ffc107",
                                          fontSize: "12px",
                                          verticalAlign: "super",
                                          cursor: "pointer",

                                        }}
                                      />
                                    </Tooltip>
                                  </span>
                                  {toolInfo === "12" ? (
                                    <div>
                                      <Paper
                                        style={{
                                          backgroundColor: "#dedcb1",
                                          padding: "15px",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <Typography>
                                          <b>Line 12 Help.</b>  Check this box if you are a foreign central bank of issue not wholly owned by a foreign sovereign. By checking this box, you are certifying to all the statements made in line 12
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          <b>IRS Instructions Line 12</b>. By checking this box, you are certifying to all the statements made in line 12.
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          You are certifying that:
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          1 The entity identified in Part I is a foreign central bank of issue
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          2 The entity identified in Part I does not hold obligations or bank deposits to which this form relates for use in connection with conduct of a commercial banking function or other commercial activity,<b>and</b>
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          3 The payments are within the scope of exemption granted by section 895
                                        </Typography>

                                        <Link
                                          href="#"
                                          underline="none"
                                          style={{
                                            marginTop: "10px",
                                            fontSize: "16px", color: "#0000C7"
                                          }}
                                          onClick={() => {
                                            setToolInfo("");
                                          }}
                                        >
                                          --Show Less--
                                        </Link>
                                      </Paper>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Typography>
                                <div style={{ paddingLeft: "20px" }}>
                                  <Checkbox
                                    name="isSection895"
                                    value={values?.isSection895}
                                    checked={values?.isSection895}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <Typography sx={{ display: "inline" }}>
                                    I certify that</Typography>
                                  <ul>
                                    <li><Typography>The entity identified in Part I is a foreign central bank of issue;</Typography></li>
                                    <li><Typography>The entity identified in Part I does not hold obligations or bank deposits to which this form relates for use in connection with the conduct of a commercial banking function or other commercial activity, and</Typography></li>
                                    <li><Typography>The payments are within the scope of the exemption granted by  <span style={{ color: "#007bff" }}>section 895</span>.</Typography></li>
                                  </ul>
                                </div>



                              </div>
                            </> : <></>
                        }

                        {
                          values.chapter3StatusId == 16 ?
                            <>
                              <div style={{ paddingLeft: "20px" }}>
                                <Typography sx={{ fontWeight: "bolder" }}>
                                  14 For a government of a U.S. territory
                                  <span>
                                    <Tooltip
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",

                                      }}
                                      title={
                                        <>
                                          <Typography color="inherit">
                                            TT-292 - W8EXP-Q12
                                          </Typography>
                                          <a
                                            onClick={() => setToolInfo("14")}
                                          >
                                            <Typography
                                              style={{
                                                cursor: "pointer",
                                                textDecorationLine: "underline",
                                              }}
                                              align="center"
                                            >
                                              {" "}
                                              View More...
                                            </Typography>
                                          </a>
                                        </>
                                      }
                                    >
                                      <Info
                                        style={{
                                          color: "#ffc107",
                                          fontSize: "12px",
                                          verticalAlign: "super",
                                          cursor: "pointer",

                                        }}
                                      />
                                    </Tooltip>
                                  </span>
                                  {toolInfo === "14" ? (
                                    <div>
                                      <Paper
                                        style={{
                                          backgroundColor: "#dedcb1",
                                          padding: "15px",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <Typography>
                                          Check this box if you are a government of a territory of the United States, or is a political subdivision thereof, and is claiming exemption granted by section 115(2). By checking this box you are certifying to the statements made in line 14.
                                        </Typography>

                                        <Link
                                          href="#"
                                          underline="none"
                                          style={{
                                            marginTop: "10px",
                                            fontSize: "16px", color: "#0000C7"
                                          }}
                                          onClick={() => {
                                            setToolInfo("");
                                          }}
                                        >
                                          --Show Less--
                                        </Link>
                                      </Paper>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Typography>
                                <div style={{ paddingLeft: "20px" }}>
                                  <Checkbox
                                    name="isSection115"
                                    value={values?.isSection115}
                                    checked={values?.isSection115}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <Typography sx={{ display: "inline", paddingLeft: "10px" }}>
                                    I certify that the entity identified in Part I is a government of a territory of the United States, or is a political subdivision thereof, and is claiming the exemption granted by section 115(2).
                                  </Typography>
                                </div>
                              </div>
                            </> : <></>
                        }

                        {
                          values.chapter3StatusId == 18 ?
                            <>
                              <div style={{ paddingLeft: "20px" }}>
                                <Typography style={{ "display": "inline" }}>15</Typography>
                                <Typography sx={{ fontWeight: "bolder", display: "inline", paddingLeft: "10px" }}>
                                  For a withholding qualified holder
                                </Typography>
                                <Typography sx={{ fontWeight: "bolder" }}>
                                  Check either box 15a or 15b
                                  <span>
                                    <Tooltip
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",

                                      }}
                                      title={
                                        <>
                                          <Typography color="inherit">
                                            W8EXP-Q15
                                          </Typography>
                                          <a
                                            onClick={() => setToolInfo("15")}
                                          >
                                            <Typography
                                              style={{
                                                cursor: "pointer",
                                                textDecorationLine: "underline",
                                              }}
                                              align="center"
                                            >
                                              {" "}
                                              View More...
                                            </Typography>
                                          </a>
                                        </>
                                      }
                                    >
                                      <Info
                                        style={{
                                          color: "#ffc107",
                                          fontSize: "12px",
                                          verticalAlign: "super",
                                          cursor: "pointer",

                                        }}
                                      />
                                    </Tooltip>
                                  </span>
                                  {toolInfo === "15" ? (
                                    <div>
                                      <Paper
                                        style={{
                                          backgroundColor: "#dedcb1",
                                          padding: "15px",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <Typography>
                                          For a withholding qualified holder under section 1445, check either 15a or 15b.
                                        </Typography>
                                        <Link
                                          href="#"
                                          underline="none"
                                          style={{
                                            marginTop: "10px",
                                            fontSize: "16px", color: "#0000C7"
                                          }}
                                          onClick={() => {
                                            setToolInfo("");
                                          }}
                                        >
                                          --Show Less--
                                        </Link>
                                      </Paper>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Typography>
                                <div style={{ paddingLeft: "20px" }}>
                                  <Checkbox
                                    name="isSection897and1145"
                                    value={values?.isSection897and1145}
                                    checked={values?.isSection897and1145}
                                    onChange={(e) => {
                                      handleChange(e);
                                      setTimeout(() => {
                                        setFieldValue("isSection897and1145Partnership", false)
                                      }, 50);
                                    }}
                                    onBlur={handleBlur}
                                  />
                                  <Typography sx={{ display: "inline", paddingLeft: "10px" }}>
                                    I certify that the entity identified in Part I is treated as a non-foreign person for purposes of sections 897 and 1445 because it is a qualified holder under Regulations section 1.897(I)-1(d)
                                  </Typography>
                                </div>
                                <div style={{ paddingLeft: "20px" }}>
                                  <Checkbox
                                    name="isSection897and1145Partnership"
                                    value={values?.isSection897and1145Partnership}
                                    checked={values?.isSection897and1145Partnership}
                                    onChange={(e) => {
                                      handleChange(e);
                                      setTimeout(() => {
                                        setFieldValue("isSection897and1145", false)
                                      }, 50);
                                    }}
                                    onBlur={handleBlur}
                                  />
                                  <Typography sx={{ display: "inline", paddingLeft: "10px" }}>
                                    I certify that the entity identified in Part I is treated as a non-foreign person for purposes of sections 897 and 1445 because it is a foreign partnership all of the interests of which are held by qualified holders (under Regulations section 1.897(I)-1(d)), including through one or more partnerships
                                  </Typography>
                                </div>
                              </div>
                            </> : <></>
                        }

                        {
                          values.chapter3StatusId == 19 || values.chapter3StatusId == 17 ?
                            <>
                              <div style={{ paddingLeft: "20px" }}>
                                <Typography style={{ "display": "inline" }}>13</Typography>
                                <Typography sx={{ fontWeight: "bolder", display: "inline", paddingLeft: "10px" }}>
                                  For a foreign tax-exempt organization, including foreign private foundations:
                                  <span>
                                    <Tooltip
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",

                                      }}
                                      title={
                                        <>
                                          <Typography color="inherit">
                                            TT-295 - W8EXP-Q13
                                          </Typography>
                                          <a
                                            onClick={() => setToolInfo("13t")}
                                          >
                                            <Typography
                                              style={{
                                                cursor: "pointer",
                                                textDecorationLine: "underline",
                                              }}
                                              align="center"
                                            >
                                              {" "}
                                              View More...
                                            </Typography>
                                          </a>
                                        </>
                                      }
                                    >
                                      <Info
                                        style={{
                                          color: "#ffc107",
                                          fontSize: "12px",
                                          verticalAlign: "super",
                                          cursor: "pointer",

                                        }}
                                      />
                                    </Tooltip>
                                  </span>
                                  {toolInfo === "13t" ? (
                                    <div>
                                      <Paper
                                        style={{
                                          backgroundColor: "#dedcb1",
                                          padding: "15px",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <Typography>
                                          <b>Line 13 Help</b>. Check the appropriate box if you are a foreign tax-exempt organization.
                                        </Typography>
                                        <Typography style={{ marginTop: "10px" }}>
                                          <b>IRS Instructions Line 13</b>. If you are a foreign tax-exempt organization, you must attach a statement setting forth any income that is includible under section 512 in computing your unrelated business taxable income.
                                        </Typography>
                                        <Link
                                          href="#"
                                          underline="none"
                                          style={{
                                            marginTop: "10px",
                                            fontSize: "16px", color: "#0000C7"
                                          }}
                                          onClick={() => {
                                            setToolInfo("");
                                          }}
                                        >
                                          --Show Less--
                                        </Link>
                                      </Paper>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Typography>
                                <Typography sx={{ fontWeight: "400px", paddingLeft: "20px" }}>
                                  If any of the income to which this certification relates constitutes income includible under <span style={{ color: "#007bff" }}>section 512 </span>  in computing the entity's unrelated business taxable income, attach a statement identifying the amounts.
                                </Typography>
                                <Typography sx={{ fontWeight: "500px" }}>
                                  Check either box 13a or box 13b:
                                </Typography>
                                <div style={{ paddingLeft: "20px" }}>
                                  <Typography >a {" "}
                                    <Checkbox
                                      name="isSection512IRSDated"
                                      value={values?.isSection512IRSDated}
                                      checked={values?.isSection512IRSDated}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setTimeout(() => {
                                          setFieldValue("isSetion501", false);
                                        }, 50);
                                      }}
                                      onBlur={handleBlur}
                                      sx={{ display: "inline" }}
                                    />
                                    <Typography sx={{ display: "inline", paddingLeft: "10px" }}>
                                      I certify that the entity identified in Part I has been issued a determination letter by the IRS dated:
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",

                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                TT-296 - W8EXP-Q13a
                                              </Typography>
                                              <a
                                                onClick={() => setToolInfo("13a")}
                                              >
                                                <Typography
                                                  style={{
                                                    cursor: "pointer",
                                                    textDecorationLine: "underline",
                                                  }}
                                                  align="center"
                                                >
                                                  {" "}
                                                  View More...
                                                </Typography>
                                              </a>
                                            </>
                                          }
                                        >
                                          <Info
                                            style={{
                                              color: "#ffc107",
                                              fontSize: "12px",
                                              verticalAlign: "super",
                                              cursor: "pointer",

                                            }}
                                          />
                                        </Tooltip>
                                      </span>
                                      {toolInfo === "13a" ? (
                                        <div>
                                          <Paper
                                            style={{
                                              backgroundColor: "#dedcb1",
                                              padding: "15px",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <Typography>
                                              <b>Line 13a Help</b>. Box 13a. Check this box if you have been issued a determination letter by the IRS.
                                            </Typography>
                                            <Typography style={{ marginTop: "10px" }}>
                                              Enter the date of the IRS determination letter.
                                            </Typography>
                                            <Typography >
                                              <b>IRS Instructions Line 13a</b>
                                              . Check this box if you have been issued a determination letter by the IRS.
                                            </Typography>
                                            <Typography style={{ marginTop: "10px" }}>
                                              Select this option if you certify that the identified in Part I has been issued a determination letter by the IRS also dated and is currently in effect and that concludes that it is an exempt organization described in section 501(c).
                                            </Typography>
                                            <Link
                                              href="#"
                                              underline="none"
                                              style={{
                                                marginTop: "10px",
                                                fontSize: "16px", color: "#0000C7"
                                              }}
                                              onClick={() => {
                                                setToolInfo("");
                                              }}
                                            >
                                              --Show Less--
                                            </Link>
                                          </Paper>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <Input
                                        name="iRSDated"
                                        value={values.iRSDated}
                                        disabled={!values?.isSection512IRSDated}
                                        type="date"
                                        onChange={(e) => { handleChange(e); }}
                                        onBlur={handleBlur}
                                      ></Input>
                                      that is currently in effect and that concludes that it is an exempt organization described in section 501(c).
                                    </Typography>
                                  </Typography>
                                  <Typography >b {" "}
                                    <Checkbox
                                      name="isSetion501"
                                      value={values?.isSetion501}
                                      checked={values?.isSetion501}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setTimeout(() => {
                                          setFieldValue("isSection512IRSDated", false);
                                        }, 50);
                                      }}
                                      onBlur={handleBlur}
                                      sx={{ display: "inline" }}
                                    />
                                    <Typography sx={{ display: "inline", paddingLeft: "10px" }}>
                                      I have attached to this form an opinion from U.S. counsel concluding that the entity identified in Part I is described in <span style={{ color: "#007bff" }}>  section 501(c).</span>
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",

                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                TT-297 - W8EXP-Q13b
                                              </Typography>
                                              <a
                                                onClick={() => setToolInfo("13b")}
                                              >
                                                <Typography
                                                  style={{
                                                    cursor: "pointer",
                                                    textDecorationLine: "underline",
                                                  }}
                                                  align="center"
                                                >
                                                  {" "}
                                                  View More...
                                                </Typography>
                                              </a>
                                            </>
                                          }
                                        >
                                          <Info
                                            style={{
                                              color: "#ffc107",
                                              fontSize: "12px",
                                              verticalAlign: "super",
                                              cursor: "pointer",

                                            }}
                                          />
                                        </Tooltip>
                                      </span>
                                      {toolInfo === "13b" ? (
                                        <div>
                                          <Paper
                                            style={{
                                              backgroundColor: "#dedcb1",
                                              padding: "15px",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <Typography>
                                              <b>Line 13a Help</b>. Box 13a. Check this box if you have been issued a determination letter by the IRS.
                                            </Typography>
                                            <Typography style={{ marginTop: "10px" }}>
                                              Enter the date of the IRS determination letter.
                                            </Typography>
                                            <Typography >
                                              <b>IRS Instructions Line 13a</b>
                                              . Check this box if you have been issued a determination letter by the IRS.
                                            </Typography>
                                            <Typography style={{ marginTop: "10px" }}>
                                              Select this option if you certify that the identified in Part I has been issued a determination letter by the IRS also dated and is currently in effect and that concludes that it is an exempt organization described in section 501(c).
                                            </Typography>
                                            <Link
                                              href="#"
                                              underline="none"
                                              style={{
                                                marginTop: "10px",
                                                fontSize: "16px", color: "#0000C7"
                                              }}
                                              onClick={() => {
                                                setToolInfo("");
                                              }}
                                            >
                                              --Show Less--
                                            </Link>
                                          </Paper>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </Typography>
                                  </Typography>
                                </div>

                                <div style={{ paddingLeft: "20px" }}>
                                  <Typography style={{ fontWeight: "bolder", paddingLeft: "20px" }}>
                                    For section 501(c)(3) organizations only, check either box 13c or box 13d:
                                  </Typography>
                                  <Typography >c {" "}
                                    <Checkbox
                                      name="isSection501and509A"
                                      value={values?.isSection501and509A}
                                      checked={values?.isSection501and509A}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setTimeout(() => {
                                          setFieldValue("isSection501and509B", false);
                                        }, 50);
                                      }}
                                      onBlur={handleBlur}
                                      sx={{ display: "inline" }}
                                    />
                                    <Typography sx={{ display: "inline", paddingLeft: "10px" }}>
                                      If the determination letter or opinion of counsel concludes that the entity identified in Part I is described in  <span style={{ color: "#007bff" }}>section 501(c)(3)</span>, I certify that the organization is not a private foundation described in <span style={{ color: "#007bff" }}>section 509</span>. I have attached an affidavit of the organization setting forth sufficient facts for the IRS to determine that the organization is not a private foundation because it meets one of the exceptions described in <span style={{ color: "#007bff" }}>section 509(a)(1), (2), (3), or (4)</span>
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",

                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                TT-298 - W8EXP-Q13c
                                              </Typography>
                                              <a
                                                onClick={() => setToolInfo("13c")}
                                              >
                                                <Typography
                                                  style={{
                                                    cursor: "pointer",
                                                    textDecorationLine: "underline",
                                                  }}
                                                  align="center"
                                                >
                                                  {" "}
                                                  View More...
                                                </Typography>
                                              </a>
                                            </>
                                          }
                                        >
                                          <Info
                                            style={{
                                              color: "#ffc107",
                                              fontSize: "12px",
                                              verticalAlign: "super",
                                              cursor: "pointer",

                                            }}
                                          />
                                        </Tooltip>
                                      </span>
                                      {toolInfo === "13c" ? (
                                        <div>
                                          <Paper
                                            style={{
                                              backgroundColor: "#dedcb1",
                                              padding: "15px",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <Typography>
                                              <b>Line 13c Help</b>. Box 13c. If you are a section 501 (c)(3) organization, check this box if you are not a private foundation.
                                            </Typography>
                                            <Typography style={{ marginTop: "10px" }}>
                                              Enter the date of the IRS determination letter.
                                            </Typography>

                                            <Typography style={{ marginTop: "10px" }}>
                                              <b>IRS Instructions 13c Help</b>. You must attach to the withholding certificate an affidavit setting forth sufficient facts concerning your operations and support to enable the IRS to determine that you would be likely to qualify as an organization described in section 509(a)(1), (2), (3), or (4). See Rev. Proc. 92-94, 1992-2 C. B. 507, section 4, for information on affidavit preparation of foreign equivalents of domestic public charities.
                                            </Typography>
                                            <Link
                                              href="#"
                                              underline="none"
                                              style={{
                                                marginTop: "10px",
                                                fontSize: "16px", color: "#0000C7"
                                              }}
                                              onClick={() => {
                                                setToolInfo("");
                                              }}
                                            >
                                              --Show Less--
                                            </Link>
                                          </Paper>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </Typography>
                                  </Typography>
                                  <Typography >d {" "}
                                    <Checkbox
                                      name="isSection501and509B"
                                      value={values?.isSection501and509B}
                                      checked={values?.isSection501and509B}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setTimeout(() => {
                                          setFieldValue("isSection501and509A", false);
                                        }, 50);
                                      }}
                                      onBlur={handleBlur}
                                      sx={{ display: "inline" }}
                                    />
                                    <Typography sx={{ display: "inline", paddingLeft: "10px" }}>
                                      If the determination letter or opinion of counsel concludes that the entity identified in Part I is described in section 501(c)(3), I certify that the organization is a private foundation described in
                                      <span style={{ color: "#007bff" }}>section 509.
                                      </span>
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",
                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                TT-299 - W8EXP-Q13d
                                              </Typography>
                                              <a
                                                onClick={() => setToolInfo("13d")}
                                              >
                                                <Typography
                                                  style={{
                                                    cursor: "pointer",
                                                    textDecorationLine: "underline",
                                                  }}
                                                  align="center"
                                                >
                                                  {" "}
                                                  View More...
                                                </Typography>
                                              </a>
                                            </>
                                          }
                                        >
                                          <Info
                                            style={{
                                              color: "#ffc107",
                                              fontSize: "12px",
                                              verticalAlign: "super",
                                              cursor: "pointer",

                                            }}
                                          />
                                        </Tooltip>
                                      </span>
                                      {toolInfo === "13d" ? (
                                        <div>
                                          <Paper
                                            style={{
                                              backgroundColor: "#dedcb1",
                                              padding: "15px",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <Typography>
                                              <b>Line 13d Help</b>. Box 13d. Check this box if you are a section 501 (c)(3) organization and you are a private foundation described in section 509
                                              <b>IRS Instructions Line 13d</b>. Check this box if the determination letter or opinion of counsel concludes that the entity identified in Part I is described in section 501(c)(3). Also only select this option if you certify that the organization is a private foundation described in section 509.
                                            </Typography>
                                            <Link
                                              href="#"
                                              underline="none"
                                              style={{
                                                marginTop: "10px",
                                                fontSize: "16px", color: "#0000C7"
                                              }}
                                              onClick={() => {
                                                setToolInfo("");
                                              }}
                                            >
                                              --Show Less--
                                            </Link>
                                          </Paper>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </Typography>
                                  </Typography>

                                </div>
                              </div>
                            </> : <></>
                        }

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "80px",
                          }}
                        >
                          <SaveAndExit
                            Callback={
                              () => {
                                submitForm().then((data) => {
                                  const prevStepData = JSON.parse(
                                    localStorage.getItem("PrevStepData") || "{}"
                                  );
                                  const urlValue =
                                    window.location.pathname.substring(1);
                                  dispatch(
                                    postW8EXPForm(
                                      {
                                        ...prevStepData,
                                        ...values,
                                        stepName: `/${urlValue}`,
                                      },
                                      () => {
                                        history(GlobalValues.basePageRoute);
                                      }
                                    )
                                  );
                                }).catch((error) => {
                                  console.log(error);
                                })
                              }
                            }
                            formTypeId={FormTypeId.W8EXP}
                          >
                          </SaveAndExit>
                          <Button
                            // type="submit"
                            onClick={() => {
                              dispatch(GetExpPdf(authDetails?.accountHolderId));
                            }}
                            disabled={isSubmitting}
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                          >
                            View Form
                          </Button>
                          <Button
                            //type="submit"
                            disabled={!isValid}
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                            onClick={() => {
                              submitForm().then((data) => {
                                history("/Exp/Tax_Purpose_Exp/Chapter4_Exp");
                              }).catch((error) => {
                                console.log(error);
                              })
                            }}
                          >
                            Continue
                          </Button>
                        </div>
                        <Typography
                          align="center"
                          style={{
                            color: "#505E50",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                          }}
                        >
                          Do you want to go back?
                        </Typography>
                        <Typography align="center">
                          <Button
                            onClick={() => {
                              history("/Certificates");
                            }}
                            variant="contained"
                            style={{
                              color: "white",
                              backgroundColor: "black",
                              marginTop: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            Back
                          </Button>
                        </Typography>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
