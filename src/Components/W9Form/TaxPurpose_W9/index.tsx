



import React, { useState, useEffect } from "react";
import {
    FormControl,
    Typography,
    Button,
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
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import "./index.scss";
import Infoicon from "../../../assets/img/info.png";
// import { Info } from "@mui/icons-material";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {
    GetHelpVideoDetails,
    GetChapter3Status,
    getAllCountries,
    getAllCountriesCode,
    getAllCountriesIncomeCode,
    getAllStateByCountryId,
    postW9Form,
    getFederalTax,
} from "../../../Redux/Actions";
import { FederalTaxSchema } from "../../../schemas/w8ECI";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import useAuth from "../../../customHooks/useAuth";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import { GetEciPdf, GetW9Pdf } from "../../../Redux/Actions/PfdActions";
import Redirect from "../../../Router/RouterSkip";
import View_Insructions from "../../viewInstruction";
import PopupModa from "../../../Redux/Actions/poupModal";
export default function Fedral_tax(props: any) {
    const dispatch = useDispatch();
    const {
        handleTaxClassificationChange,
        // selectedTaxClassification,
        data,
        handleChange,
        setselectedContinue,
    } = props;

    const { authDetails } = useAuth();
    const W9 = useSelector((state: any) => state.W9);
    const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");
    const [IsIndividual, setIsIndividual] = useState(obValues?.businessTypeId == 1);
    const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
    const [selectedfile, setSelectedFile] = useState<any>(null);

    const initialValue = {
        BusinessName: W9?.entityName ?? obValues?.entityName,
        BusinessDisregardedEntityName: W9?.BusinessDisregardedEntityName ?? PrevStepData?.BusinessDisregardedEntityName,
        countryOfIncorporation: W9?.countryOfIncorporation ?? PrevStepData?.countryOfIncorporation,
        federalTaxClassificationId: parseInt(PrevStepData?.federalTaxClassificationId) ? parseInt(PrevStepData?.federalTaxClassificationId) : 0,
        LLCOwnerEntityType: W9?.LLCOwnerEntityType ?? PrevStepData?.LLCOwnerEntityType,
        USFederalTaxClassification: W9?.USFederalTaxClassification ?? PrevStepData?.USFederalTaxClassification,
        OtherType: W9?.OtherType ?? PrevStepData?.OtherType,
    };

    const [clickCount, setClickCount] = useState(0);
    const [popupState, setPopupState] = useState({
        data:"",
        status:false
    })
    const [toolInfo, setToolInfo] = useState("");
    const history = useNavigate();
    const [expanded, setExpanded] = React.useState<string | false>("");
    const [selectedTaxClassification, setSelectedTaxClassification] = useState(0);
    const handleChangestatus =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    }


    useEffect(() => {
        document.title = "Chapter III"
    }, [])

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllCountriesCode());
        dispatch(getAllCountriesIncomeCode());
        // dispatch(getAllStateByCountryId())
        dispatch(GetHelpVideoDetails());
        dispatch(getFederalTax())
        dispatch(GetChapter3Status(FormTypeId.W9));
    }, []);
    const viewPdf = () => {
        history("", { replace: true });
    }

    const getCountriesReducer = useSelector(
        (state: any) => state.getCountriesReducer
    );
    const getCountriesCodeReducer = useSelector(
        (state: any) => state.getCountriesCodeReducer
    );

    const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
    const GetAllIncomeCodesReducer = useSelector(
        (state: any) => state.GetAllIncomeCodesReducer
    );
    const GetStateByCountryIdReducer = useSelector(
        (state: any) => state.GetStateByCountryIdReducer
    );
    const FederalTaxData = useSelector(
        (state: any) => state?.GetAllFederalTaxReducer?.FederalData
    );
    const handleChangeAccodion =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const GetChapter3StatusReducer = useSelector(
        (state: any) => state.GetChapter3StatusReducer
    );
    const [expandedState, setExpandedState] = React.useState<string | false>(
        "panel1"
    );
    const GethelpData = useSelector(
        (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
    );
    const handleChangeAccodionState =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpandedState(newExpanded ? panel : false);
        };

    const confirmFunction = (value: any, setFieldValue: any) => {
        setExpandedState(""); setFieldValue("federalTaxClassificationId", value); setSelectedTaxClassification(value)
    }
    const W9Data = useSelector((state: any) => state.w9Data);
    return (
        <>
            <section
                className="inner_content"
                style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >
                <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
      {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}
              <div className="overlay-div">
                <div className="overlay-div-group">
                <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
                        <div className="viewform" style={{width:"100%",height:"100%"}} onClick={() => {
                            dispatch(GetW9Pdf(authDetails?.accountHolderId, (callbackData:any)=>{
                                setPopupState({
                                    status:true,
                                    data: callbackData?.pdf
                                })
                            }))
                        }}>View Form</div>
                        <div className="helpvideo">
                            {GethelpData && GethelpData[5].id === 7 ? (
                                <a
                                    href={GethelpData[5].fieldValue}
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent the default anchor behavior
                                        window.open(
                                            GethelpData[5].fieldValue,
                                            "popupWindow",
                                            `width=${GethelpData[5].width},height=${GethelpData[5].height},top=${GethelpData[5].top},left=${GethelpData[5].left}`
                                        )
                                    }
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
                            <BreadCrumbComponent breadCrumbCode={1200} formName={11} />
                        </div>
                    </div>
                    <div className="col-8 mt-3">
                        <div style={{ padding: "12px" }}>
                            <Paper style={{ padding: "10px" }}>
                                <Formik
                                    validateOnChange={true}
                                    validateOnBlur={true}
                                    initialValues={initialValue}
                                    enableReinitialize
                                    validateOnMount={true}
                                    validationSchema={FederalTaxSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        let temp = {
                                            ...PrevStepData,
                                            ...values,
                                            AccountHolderBasicDetailsId: authDetails?.accountHolderId ??
                                                obValues?.AccountHolderBasicDetailsId,
                                            FormTypeSelectionId: obValues.businessTypeId,
                                            sCorporation: values.USFederalTaxClassification == "SCorporation",
                                            cCorporation: values.USFederalTaxClassification == "CCorporation",
                                            agentId: authDetails?.agentId,
                                            accountHolderBasicDetailId: authDetails?.accountHolderId,
                                        };
                                        setSubmitting(true);
                                        const returnPromise = new Promise((resolve, reject) => {
                                            dispatch(
                                                postW9Form(
                                                    temp,
                                                    (data: any) => {
                                                        resolve(data);
                                                        localStorage.setItem(
                                                            "PrevStepData",
                                                            JSON.stringify(temp)
                                                        );
                                                    },
                                                    (err: any) => {
                                                        reject(err);
                                                    }
                                                )
                                            );
                                        }
                                        );
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
                                        isValid,
                                        submitForm,
                                        setFieldValue,
                                    }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div style={{ width: "100%" }}>
                                                <>{console.log("values", values)}</>
                                                <>{console.log("errors", errors)}</>
                                                <>{console.log("touched", touched)}</>
                                                <div>
                                                    <Typography align="left" style={{ margin: "10px" }}>
                                                        {

                                                            values?.countryOfIncorporation && values?.countryOfIncorporation?.toString() !== "0" &&
                                                                values?.countryOfIncorporation !== obValues?.permanentResidentialCountryId
                                                                ? (
                                                                    <div
                                                                        style={{
                                                                            backgroundColor: "#e8e1e1",
                                                                            padding: "10px",
                                                                        }}
                                                                    >
                                                                        <Typography>
                                                                            ICOR114
                                                                            <span>
                                                                                <img
                                                                                    src={Infoicon}
                                                                                    style={{
                                                                                        color: "#ffc107",
                                                                                        height: "22px",
                                                                                        width: "20px",
                                                                                        boxShadow: "inherit",

                                                                                        cursor: "pointer",
                                                                                        marginBottom: "3px",
                                                                                    }}
                                                                                />
                                                                                Country of incorporation is different from
                                                                                the PRA country.
                                                                            </span>
                                                                        </Typography>
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                        {values.USFederalTaxClassification == "Not" &&
                                                            clickCount === 1 ? (
                                                            <div
                                                                style={{
                                                                    backgroundColor: "#e8e1e1",
                                                                    padding: "10px",
                                                                }}
                                                            >
                                                                <Typography>
                                                                    HYB109
                                                                    <span className="mx-1">
                                                                        <img
                                                                            src={Infoicon}
                                                                            style={{
                                                                                color: "#ffc107",
                                                                                height: "22px",
                                                                                width: "20px",
                                                                                boxShadow: "inherit",
                                                                                cursor: "pointer",
                                                                                marginBottom: "3px",
                                                                            }}
                                                                        />
                                                                        You have selected the type of beneficial
                                                                        owner is a Partnership, but have not
                                                                        selected "Hybrid Status". The beneficial
                                                                        owner may qualify for a reduced rate of
                                                                        withholding under an income tax treaty when
                                                                        it has Hybrid entity status.
                                                                    </span>
                                                                </Typography>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
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
                                                                    Federal Tax Classification:
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
                                                                                        TT-061 - Classification selection.
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
                                                                                    fontSize: "17px",
                                                                                    cursor: "pointer",
                                                                                    verticalAlign: "super",
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
                                                                                EH008:  Please make a selection from the drop down list provided. The selection must represent the chapter 3 USFederalTaxClassification, under U.S. tax principles of the individual, business or organization the certificate will represent.
                                                                            </Typography>
                                                                            <Typography style={{ marginTop: "10px" }}>
                                                                                Complete this line or use the Chapter 3 Classification Guide to establish your entity status for purposes of chapter 3. Check the one appropriate box that applies.
                                                                            </Typography>
                                                                            <Typography style={{ marginTop: "10px" }}>
                                                                                A foreign central bank of issue (wholly owned by a foreign sovereign) should check the “Foreign government” box. If you are a foreign private foundation, you should check the “foreign private foundation” box rather than the “foreign tax-exempt organization” box.
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
                                                                        name="federalTaxClassificationId"
                                                                        value={values.federalTaxClassificationId}
                                                                        onChange={handleChange}
                                                                        autoComplete="federalTaxClassificationId"
                                                                        // onBlur={handleBlur}
                                                                        style={{
                                                                            padding: " 0 10px",
                                                                            color: "#121112",
                                                                            fontStyle: "italic",
                                                                            height: "39px",
                                                                        }}
                                                                    >
                                                                        <option value={0}> ---select---</option>


                                                                        {FederalTaxData?.filter((item: any) => item.formTypeSelectionId === 2).map((i: any, ind: any) => {
                                                                            return (
                                                                                <option key={ind} value={i.id}>{i.name}</option>
                                                                            );
                                                                        })}
                                                                    </select>
                                                                    <p className="error">
                                                                        {touched.federalTaxClassificationId ? errors.federalTaxClassificationId?.toString() : ""}
                                                                    </p>
                                                                </FormControl>
                                                            </div>
                                                        </div>



                                                        {
                                                            values.federalTaxClassificationId == 5 || values.federalTaxClassificationId == 6 || values.federalTaxClassificationId == 8 || values.federalTaxClassificationId == 9 || values.federalTaxClassificationId == 10 ? (
                                                                <>
                                                                    <>
                                                                        <div
                                                                            style={{
                                                                                marginTop: "20px",
                                                                                display: "flex",
                                                                            }}
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

                                                                                </Typography>


                                                                                <FormControl className="w-100">
                                                                                    <TextField
                                                                                        autoComplete="BusinessName"
                                                                                        type="text"
                                                                                        onChange={handleChange}
                                                                                        // onBlur={handleBlur}
                                                                                        // helperText={
                                                                                        //   touched.BusinessName && errors.BusinessName
                                                                                        // }
                                                                                        error={Boolean(
                                                                                            touched.BusinessName &&
                                                                                            errors.BusinessName
                                                                                        )}
                                                                                        name="BusinessName"
                                                                                        className="inputClassFull"
                                                                                        value={values.BusinessName}
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
                                                                                    Business Name or disregarded entity name
                                                                                    if different:
                                                                                </Typography>

                                                                                <FormControl className="w-100">
                                                                                    <TextField
                                                                                        autoComplete="BusinessDisregardedEntityName"
                                                                                        type="text"
                                                                                        onChange={handleChange}
                                                                                        // onBlur={handleBlur}
                                                                                        // helperText={
                                                                                        //   touched.BusinessDisregardedEntityName && errors.BusinessDisregardedEntityName
                                                                                        // }
                                                                                        error={Boolean(
                                                                                            touched.BusinessDisregardedEntityName &&
                                                                                            errors.BusinessDisregardedEntityName
                                                                                        )}
                                                                                        name="BusinessDisregardedEntityName"
                                                                                        value={values.BusinessDisregardedEntityName}
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
                                                                                        Country of incorporation /
                                                                                        organization:
                                                                                        <span style={{ color: "red" }}>
                                                                                            *
                                                                                        </span>
                                                                                    </Typography>

                                                                                    <FormControl className="w-50">
                                                                                        <select
                                                                                            name="countryOfIncorporation"
                                                                                            value={
                                                                                                values.countryOfIncorporation
                                                                                            }
                                                                                            onChange={handleChange}
                                                                                            autoComplete="countryOfIncorporation"
                                                                                            onBlur={handleBlur}
                                                                                            style={{
                                                                                                padding: " 0 10px",
                                                                                                color: "#121112",
                                                                                                fontStyle: "italic",
                                                                                                height: "39px",
                                                                                            }}
                                                                                        >
                                                                                            <option value="">---select---</option>
                                                                                            <option value={257}>
                                                                                                United Kingdom
                                                                                            </option>
                                                                                            <option value={258}>
                                                                                                United States
                                                                                            </option>
                                                                                            <option value="">---</option>
                                                                                            {getCountriesReducer.allCountriesData?.map(
                                                                                                (ele: any) => (
                                                                                                    <option
                                                                                                        key={ele?.id}
                                                                                                        value={ele?.id}
                                                                                                    >
                                                                                                        {ele?.name}
                                                                                                    </option>
                                                                                                )
                                                                                            )}
                                                                                        </select>
                                                                                    </FormControl>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    </>

                                                                    {values.federalTaxClassificationId == 5 || values.federalTaxClassificationId == 8 ? (<div style={{ marginLeft: "6px" }}>
                                                                        <Typography
                                                                            className="mt-3"
                                                                            style={{
                                                                                fontSize: "16px",
                                                                            }}
                                                                        >
                                                                            U.S. Federal Tax Classification:
                                                                        </Typography>
                                                                        <FormControl style={{ marginLeft: "2px" }}>
                                                                            <RadioGroup
                                                                                row

                                                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                                                name="USFederalTaxClassification"
                                                                                value={values.USFederalTaxClassification}
                                                                                onChange={handleChange}
                                                                                id="USFederalTaxClassification"
                                                                            >
                                                                                <FormControlLabel
                                                                                    control={<Radio />}
                                                                                    value="SCorporation"
                                                                                    name="USFederalTaxClassification"
                                                                                    label="S-Corporation"
                                                                                />
                                                                                <FormControlLabel
                                                                                    control={<Radio />}
                                                                                    value="CCorporation"
                                                                                    name="USFederalTaxClassification"
                                                                                    label="C-Corporation"
                                                                                />

                                                                            </RadioGroup>
                                                                            <p className="error">
                                                                                {errors.USFederalTaxClassification?.toString()}
                                                                            </p>
                                                                        </FormControl>
                                                                    </div>) : ""}


                                                                </>
                                                            ) : (
                                                                ""
                                                            )}


                                                        {values.federalTaxClassificationId == 7 ? (
                                                            <>
                                                                <div>
                                                                    <Typography >
                                                                        For a single-member (including foreign LLC with a domestic owner) that is disregarded as an entity separate from its owner:
                                                                    </Typography>
                                                                    <Typography style={{ fontWeight: "bold" }}>
                                                                        1. Enter the LLC owners "Owner Name" in the place provided below.

                                                                    </Typography>
                                                                    <Typography style={{ fontWeight: "bold" }}>
                                                                        2. ENTER THE LLC DISREGARDED ENTITY NAME ON THE "BUSINESS NAME" LINE

                                                                    </Typography>
                                                                    <Typography>
                                                                        Note: For an LLC classified as a partnership or a corporation enter the LLC's name on the Name Line and any business, trade, or "doing business as" name on the Business Name line.
                                                                    </Typography>
                                                                    <div
                                                                        className="col-6 mt-3"

                                                                    >
                                                                        <Typography
                                                                            align="left"
                                                                            className="d-flex w-60 "
                                                                            style={{ fontSize: "15px" }}
                                                                        >
                                                                            Business Name/Disregarded Entity:
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
                                                                                            fontSize: "17px",
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
                                                                                autoComplete="BusinessDisregardedEntityName"
                                                                                type="text"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}

                                                                                error={Boolean(
                                                                                    touched.BusinessDisregardedEntityName &&
                                                                                    errors.BusinessDisregardedEntityName
                                                                                )}
                                                                                name="BusinessDisregardedEntityName"
                                                                                value={values.BusinessDisregardedEntityName}
                                                                                className="inputClass"
                                                                            />
                                                                        </FormControl>
                                                                    </div>
                                                                    <div className="col-6 mt-2">
                                                                        <Typography
                                                                            align="left"
                                                                            className="d-flex w-60 "
                                                                            style={{ fontSize: "13px" }}
                                                                        >
                                                                            Owner Name:
                                                                            <span style={{ color: "red" }}>*</span>

                                                                        </Typography>


                                                                        <FormControl className="w-100">
                                                                            <TextField
                                                                                autoComplete="BusinessName"
                                                                                type="text"
                                                                                onChange={handleChange}
                                                                                // onBlur={handleBlur}
                                                                                // helperText={
                                                                                //   touched.BusinessName && errors.BusinessName
                                                                                // }
                                                                                error={Boolean(
                                                                                    touched.BusinessName &&
                                                                                    errors.BusinessName
                                                                                )}
                                                                                name="BusinessName"
                                                                                className="inputClassFull"
                                                                                value={values.BusinessName}
                                                                            />
                                                                        </FormControl>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 col-md-12 mt-3"
                                                                        style={{ marginTop: "20px" }}
                                                                    >
                                                                        <Typography
                                                                            align="left"
                                                                            className="d-flex w-100 "
                                                                            style={{ fontSize: "15px" }}
                                                                        >
                                                                            The information provided from this point forward should relate to the LLC's "OWNER".
                                                                            Entity type for U.S. tax purposes:
                                                                            <span style={{ color: "red" }}>*</span>

                                                                        </Typography>


                                                                        <FormControl className="w-50">
                                                                            <select
                                                                                name="LLCOwnerEntityType"
                                                                                value={values.LLCOwnerEntityType}
                                                                                onChange={handleChange}
                                                                                autoComplete="LLCOwnerEntityType"
                                                                                // onBlur={handleBlur}
                                                                                style={{
                                                                                    padding: " 0 10px",
                                                                                    color: "#121112",
                                                                                    fontStyle: "italic",
                                                                                    height: "39px",
                                                                                }}
                                                                            >
                                                                                <option value={0}> ---select---</option>


                                                                                {FederalTaxData?.filter((item: any) => item.formTypeSelectionId === 2).map((i: any, ind: any) => {
                                                                                    return (
                                                                                        <option key={ind} value={i.id}>{i.name}</option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                            <p className="error">
                                                                                {touched.LLCOwnerEntityType ? errors.LLCOwnerEntityType?.toString() : ""}
                                                                            </p>
                                                                        </FormControl>
                                                                    </div>

                                                                    <div className=" col-12">
                                                                        <Typography
                                                                            align="left"
                                                                            className="d-flex w-60 "
                                                                            style={{
                                                                                fontSize: "13px",
                                                                                marginTop: "5px",
                                                                            }}
                                                                        >
                                                                            Country of incorporation /
                                                                            organization:
                                                                            <span style={{ color: "red" }}>
                                                                                *
                                                                            </span>
                                                                        </Typography>

                                                                        <FormControl className="w-50">
                                                                            <select
                                                                                name="countryOfIncorporation"
                                                                                value={
                                                                                    values.countryOfIncorporation
                                                                                }
                                                                                onChange={handleChange}
                                                                                autoComplete="countryOfIncorporation"
                                                                                // onBlur={handleBlur}
                                                                                style={{
                                                                                    padding: " 0 10px",
                                                                                    color: "#121112",
                                                                                    fontStyle: "italic",
                                                                                    height: "39px",
                                                                                }}
                                                                            >
                                                                                <option value={0}>---select---</option>
                                                                                <option value={257}>
                                                                                    United Kingdom
                                                                                </option>
                                                                                <option value={258}>
                                                                                    United States
                                                                                </option>
                                                                                <option value={-1}>---</option>
                                                                                {getCountriesReducer.allCountriesData?.map(
                                                                                    (ele: any) => (
                                                                                        <option
                                                                                            key={ele?.id}
                                                                                            value={ele?.id}
                                                                                        >
                                                                                            {ele?.name}
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                            </select>
                                                                        </FormControl>
                                                                    </div>

                                                                </div>
                                                            </>
                                                        ) : ""}
                                                        {values.federalTaxClassificationId == 11 ? (<>
                                                            <div>

                                                                <Typography
                                                                    align="left"
                                                                    className="d-flex w-60 "
                                                                    style={{
                                                                        fontSize: "16px",
                                                                        marginTop: "5px",
                                                                    }}
                                                                >
                                                                    Other Type:
                                                                    <span style={{ color: "red" }}>
                                                                        *
                                                                    </span>

                                                                </Typography>
                                                                <FormControl className="w-50">
                                                                    <TextField
                                                                        multiline
                                                                        autoComplete="OtherType"
                                                                        type="text"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        // helperText={
                                                                        //   touched.OtherType && errors.OtherType
                                                                        // }
                                                                        error={Boolean(
                                                                            touched.OtherType &&
                                                                            errors.OtherType
                                                                        )}
                                                                        name="OtherType"
                                                                        className="othertext"
                                                                        value={values.OtherType}
                                                                    />
                                                                </FormControl>
                                                            </div>

                                                        </>) : ""}
                                                    </Typography>
                                                </div>

                                                <div style={{ padding: "10px" }}>
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
                                                                Federal Tax Classification Guide
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
                                                                        the USFederalTaxClassification of the entity the
                                                                        submission represents.
                                                                    </Typography>

                                                                    <Typography
                                                                        align="left"
                                                                        style={{
                                                                            marginTop: "10px",
                                                                            fontSize: "12px",
                                                                        }}
                                                                    >
                                                                        In the menu below you will see several different classification types. Please select each in turn reading the definition provided. When you are satisfied the description matches the entity type select “confirm”.
                                                                    </Typography>
                                                                    <Typography
                                                                        align="left"
                                                                        style={{
                                                                            marginTop: "10px",
                                                                            fontSize: "12px",
                                                                        }}
                                                                    >
                                                                       Depending on the type selected you may either be provided with further selections, more detailed guidance or the pop up will close and you will be taken to the next stage in the submission process.
                                                                    </Typography>
                                                                    <Typography
                                                                        align="left"
                                                                        style={{
                                                                            marginTop: "10px",
                                                                            fontSize: "12px",
                                                                        }}
                                                                    >
                                                                        Please note that although this guide is provided to assist your selection, it is not intended nor aims to provide tax advice.
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
                                                                        (S or C) Corporation
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Typography align="left">
                                                                    It is a legal entity that is separate and distinct from its owners formed under the laws of the country or state in which it is registered.
 
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
                                                                        <Button variant="contained" onClick={() => { confirmFunction(1, setFieldValue) }}>Confirm</Button>
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
                                                                        <Button variant="contained" onClick={() => { confirmFunction(3, setFieldValue) }}>Confirm</Button>
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
                                                                        Limited Liability Company (Disregarded Entity)
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Typography align="left">
                                                                    Chapter 3 Classification - Limited Liability Company (Disregarded Entity)


                                                                    </Typography>
                                                                    <Typography
                                                                        align="left"
                                                                        style={{ marginTop: "10px" }}
                                                                    >
                                                                       For U.S. federal tax purposes, an entity that is disregarded as an entity separate from its owner is treated as a “disregarded entity.” Enter the owner's name on the “Name” line. The name of the entity entered on the “Name” line should never be a disregarded entity. The name on the “Name” line must be the name shown on the income tax return on which the income should be reported. For example, if a foreign LLC that is treated as a disregarded entity for U.S. federal tax purposes has a single owner that is a U.S. person, the U.S. owner's name is required to be provided on the “Name” line. If the direct owner of the entity is also a disregarded entity, enter the first owner that is not disregarded for federal tax purposes. Enter the disregarded entity's name on the “Business name/disregarded entity name” line. If the owner of the disregarded entity is a foreign person, the owner must complete an appropriate Form W-8 instead of a Form W-9. This is the case even if the foreign person has a U.S. TIN.
                                                                    </Typography>
                                                                    

                                                                    <Typography
                                                                        align="center"
                                                                        style={{ marginTop: "30px" }}
                                                                    >
                                                                        <Button variant="contained" onClick={() => { confirmFunction(4, setFieldValue) }}>Confirm</Button>
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
                                                                       Limited Liability Company (S or C Corporation)
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Typography align="left">
                                                                    Chapter 3 Classification - Limited Liability Company (Corporation)
                                                                    </Typography>
                                                                    <Typography
                                                                        align="left"
                                                                        style={{ marginTop: "10px" }}
                                                                    >
                                                                      If the person identified on the “Name” line is an LLC, check the “Limited liability company” box only and enter the appropriate code for the U.S. federal tax classification in the space provided. If you are an LLC that is treated as a partnership for U.S. federal tax purposes, enter “P” for partnership. If you are an LLC that has filed a Form 8832 or a Form 2553 to be taxed as a corporation, enter “C” for C corporation or “S” for S corporation, as appropriate. If you are an LLC that is disregarded as an entity separate from its owner under Regulation section 301.7701-3 (except for employment and excise tax), do not check the LLC box unless the owner of the LLC (required to be identified on the “Name” line) is another LLC that is not disregarded for U.S. federal tax purposes. If the LLC is disregarded as an entity separate from its owner, enter the appropriate tax classification of the owner identified on the “Name” line.


                                                                    </Typography>

                                                                    <Typography
                                                                        align="center"
                                                                        style={{ marginTop: "30px" }}
                                                                    >
                                                                        <Button variant="contained" onClick={() => { confirmFunction(5, setFieldValue) }}>Confirm</Button>
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
                                                                        Limited Liability Company (Partnership)
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Typography align="left">
                                                                    Chapter 3 Classification - Limited Liability Company (Partnership)


                                                                    </Typography>

                                                                    <Typography
                                                                        align="left"
                                                                        style={{ marginTop: "10px" }}
                                                                    >
                                                                      A limited liability partnership (LLP) is formed under a State limited liability partnership law.  Limited liability partnerships file Form 1065, U.S. Partnership Return of Income. They were identified by their response to a question on Form 1065, Schedule B, Other Information. Organizationally, LLP’s are available in some states, only for professional partnerships, such as law firms or accounting firms. A partner in an LLP receives liability protection from the actions of other partners, but is liable for the partnership debts as well as for the consequences of his or her own actions.


                                                                    </Typography>

                                                                    <Typography
                                                                        align="center"
                                                                        style={{ marginTop: "30px" }}
                                                                    >
                                                                        <Button variant="contained" onClick={() => { confirmFunction(6, setFieldValue) }}>Confirm</Button>
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
                                                                        Trust/Estate{" "}
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Typography align="left">
                                                                    Chapter 3 Classification - Trust/Estate
                                                                    </Typography>
                                                                    <Typography
                                                                        align="left"
                                                                        style={{ marginTop: "10px" }}
                                                                    >
                                                                     An Estate or Trust is a type of tax entity. Estates are entities that report income after an individual person has died. If the person, for example, earns interest, dividends or capital gains after his or her death, then that income is consider income for his or her estate, and the income must be reported on Form 1041, U.S. Income Tax Return for estates and Trusts. The estate tax is a tax on assets, whereas the estate income tax is a tax on income.


                                                                    </Typography>
                                                                    <Typography
                                                                        align="left"
                                                                        style={{ marginTop: "10px" }}
                                                                    >
                                                                      A trust is created by an individual person to protect or to preserve the person's assets, and to distribute income to beneficiaries.

 


                                                                    </Typography>
                                                                    <Typography
                                                                        align="center"
                                                                        style={{ marginTop: "30px" }}
                                                                    >
                                                                        <Button variant="contained" onClick={() => { confirmFunction(7, setFieldValue) }}>Confirm</Button>
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
                                                                        postW9Form(
                                                                            {
                                                                                ...prevStepData,
                                                                                AccountHolderBasicDetailsId: authDetails?.accountHolderId,
                                                                                AgentId: authDetails?.agentId,
                                                                                FormTypeSelectionId: obValues?.businessTypeId,
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
                                                        formTypeId={FormTypeId.W9}
                                                    >
                                                    </SaveAndExit>
                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        variant="contained"
                                                        onClick={() => {
                                                            dispatch(GetW9Pdf(authDetails?.accountHolderId, (callbackData:any)=>{
                                                                setPopupState({
                                                                    status:true,
                                                                    data: callbackData?.pdf
                                                                })
                                                            }))
                                                        }}
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
                                                                // console.log(data)
                                                                // history("/US_Purposes/Back");
                                                                Redirect(
                                                                    "/US_Purposes/Back",
                                                                    authDetails?.agentId,
                                                                    history,
                                                                    true
                                                                );
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
                                                            history("");
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
            </section >
            <PopupModa data={popupState} setPopupState={setPopupState} />
        </>
    );
}



