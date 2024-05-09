import React, { useEffect, useState } from "react";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import GlobalValues from "../../../Utils/constVals";
import SideBar from "../SideBar";
import { GetImyPdf } from "../../../Redux/Actions/PfdActions";
import { Button, FormControl, Input, Link, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import useAuth from "../../../customHooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GetChapter4Statuses, GetFATCAChapter4Status, getAllCountries, postW81MY_EForm } from "../../../Redux/Actions";
import SaveAndExit from "../SaveAndExit/Index";
import "./index.scss";
import { Info } from "@mui/icons-material";
import Redirect from "../../../Router/RouterSkip";
import { DisregardedEntitySchema } from "../../../schemas/common";

interface DisregardedEntityProps {
    InitialValues: any,
    FormTypeId: number,
    BreadCrumbOrder: number,
    ContinueRoute: string,
    BackRoute: string,
    GetPdf: Function,
    ContinueFunction: Function,
    SaveAndExitFunction: Function
}

const DisregardedEntity = ({
    InitialValues,
    FormTypeId,
    BreadCrumbOrder,
    ContinueRoute,
    BackRoute,
    GetPdf,
    ContinueFunction,
    SaveAndExitFunction
}: DisregardedEntityProps) => {
    const { authDetails } = useAuth();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [initialValue, setInitialValue] = useState({
        ...InitialValues,
        giin: ""
    });
    const [toolInfo, setToolInfo] = useState("")
    const [fatcaChapter4Status, setFatcaChapter4status] = useState<any[]>([]);

    const getCountriesReducer = useSelector(
        (state: any) => state.getCountriesReducer
    );
    useEffect(() => {
        //console.log(InitialValues)
        setInitialValue({ ...initialValue, ...InitialValues })
    }, [InitialValues])

    useEffect(() => {
        dispatch(GetFATCAChapter4Status(
            (data: any[]) => {
                setFatcaChapter4status([...data]);
            },
            (err: any) => { }
        ));
        dispatch(getAllCountries());

    }, [])



    return (
        <>
            <section
                className="inner_content"
                style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >
                <SideBar
                    getPDF={(id: number) => {
                        GetPdf();
                    }}
                />
                <div className="overlay-div">
                    <div className="overlay-div-group">

                    </div>
                </div>
                <div className="row w-100 ">
                    <div className="col-4">
                        <div style={{ padding: "20px 0px", height: "100%" }}>
                            <BreadCrumbComponent
                                breadCrumbCode={BreadCrumbOrder}
                                formName={FormTypeId}
                            />
                        </div>
                    </div>
                    <div className="col-8 mt-3">
                        <div style={{ padding: "13px" }}>
                            <Paper style={{ padding: "10px" }}>
                                <Formik
                                    validateOnChange={true}
                                    validateOnBlur={true}
                                    initialValues={initialValue}
                                    enableReinitialize
                                    validateOnMount={true}
                                    validationSchema={DisregardedEntitySchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        const returnPromise = new Promise((resolve, reject) => {
                                            ContinueFunction(values,
                                                () => {
                                                    Redirect(ContinueRoute, authDetails?.agentId, history);
                                                    resolve("success");
                                                }, (err: any) => {
                                                    reject(err);
                                                })
                                        });
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
                                        setFieldValue,
                                        submitForm,
                                        isValid
                                    }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <>{console.log(values, errors, "errorsssss")}</>
                                            <div style={{ width: "100%" }}>
                                                <div>
                                                    <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                                                        Disregarded Entity or Branch Reciving Payments Chapter 4 Status (FATCA Status)
                                                        <span>
                                                            <Tooltip
                                                                style={{
                                                                    backgroundColor: "black",
                                                                    color: "white",
                                                                }}
                                                                title={
                                                                    <>
                                                                        <Typography color="inherit">
                                                                            TT-133 Q&A, Chapter 4 DRE
                                                                        </Typography>
                                                                        <a onClick={() => setToolInfo("Disregarded")}>
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
                                                                        fontSize: "16px",
                                                                        cursor: "pointer",
                                                                        verticalAlign: "super",
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </span>
                                                    </Typography>

                                                    {toolInfo === "Disregarded" ? (
                                                        <div>
                                                            <Paper
                                                                style={{
                                                                    backgroundColor: "#dedcb1",
                                                                    padding: "15px",
                                                                    marginBottom: "10px",
                                                                }}
                                                            >
                                                                <div> Chapter 4 DRE </div>
                                                                <p> A business entity that has a single owner and is not a corporation under Regulations section 301.7701-2(b) is disregarded as an entity separate from its owner.</p>
                                                                <div> A disregarded entity does not submit this form W-8BEN-E/ W-8IMY to a withholding agent or FFI. instead, the owner of such entity provides the appropriate documentation (for example, a Form W-8BEN-E if the owner is a foreign entity). See regulations section 1.1446-1 and section 1.1471-3(a)(3)(v), respectively. However, if a disregarded entity receiving a withholdable payment is an FFI outside the single owner's country of organization, the owner will be required to complete Part II of Form W-8BEN-E/ W-8IMY to document the chapter 4 status of the disregarded entity receiving the payment except as otherwise provided in these instructions. <div>&nbsp;</div> <div> A disregarded entity does not submit Form W-8ECI to a partnership for purposes of section 1446. Instead, the owner of such entity provides the appropriate documentation. See regulations section 1.446-1. </div> </div>
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
                                                </div>

                                                <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>

                                                    <div
                                                        className="col-12 col-md-12 mt-3"
                                                        style={{
                                                            marginTop: "20px",
                                                            marginBottom: "30px",
                                                            display: "inline",
                                                        }}
                                                    >
                                                        <Typography
                                                            align="left"
                                                            className="d-flex w-100 "
                                                            style={{ fontSize: "14px", fontWeight: "600" }}
                                                        >
                                                            Select Chapter 4 Status:
                                                            <span>
                                                                <Tooltip
                                                                    style={{
                                                                        backgroundColor: "black",
                                                                        color: "white",
                                                                    }}
                                                                    title={
                                                                        <>
                                                                            <Typography color="inherit">
                                                                                TT-078 Chapter 4 Type
                                                                            </Typography>
                                                                            <a onClick={() => setToolInfo("chapter4Type")}>
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
                                                                            fontSize: "16px",
                                                                            cursor: "pointer",
                                                                            verticalAlign: "super",
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            </span>

                                                        </Typography>
                                                        {toolInfo === "chapter4Type" ? (
                                                            <div>
                                                                <Paper
                                                                    style={{
                                                                        backgroundColor: "#dedcb1",
                                                                        padding: "15px",
                                                                        marginBottom: "10px",
                                                                    }}
                                                                >
                                                                    <div> Chapter 4 means Chapter 4 of the Internal Revenue Code (Taxes to Enforce Reporting on Certain Foreign Accounts). </div>
                                                                    <p>The term chapter 4 status means a person’s status as a U.S. person, specified U.S. person, foreign individual, participating FFI, deemed-compliant FFI, restricted distributor, exempt beneficial owner, nonparticipating FFI, territory financial institution, excepted NFFE, or passive NFFE. See Regulations section 1.1471-1(b) for the definitions of these terms.</p>
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
                                                                name="chapter4StatusId"
                                                                value={values.chapter4StatusId}
                                                                onChange={handleChange}
                                                                autoComplete="chapter4StatusId"
                                                                onBlur={handleBlur}
                                                                style={{
                                                                    padding: " 0 10px",
                                                                    color: "#121112",
                                                                    fontStyle: "italic",
                                                                    height: "40px",
                                                                    width: "300px"
                                                                }}
                                                            >
                                                                <option value={0}>----Plese select -----</option>
                                                                {fatcaChapter4Status?.map(
                                                                    (ele: any) => (
                                                                        <option key={ele?.id} value={ele?.id}>
                                                                            {ele?.name}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </FormControl>
                                                    </div>
                                                    {values?.chapter4StatusId > 1 ?
                                                        <div
                                                            className="col-12 col-md-12 mt-3"
                                                            style={{ marginTop: "20px", marginBottom: "30px", display: "inline" }}
                                                        >
                                                            <Typography
                                                                align="left"
                                                                className="d-flex w-100 "
                                                                style={{ fontSize: "14px", fontWeight: "600" }}
                                                            >
                                                                GIIN Number (if any):
                                                                <span>
                                                                    <Tooltip
                                                                        style={{
                                                                            backgroundColor: "black",
                                                                            color: "white",
                                                                        }}
                                                                        title={
                                                                            <>
                                                                                <Typography color="inherit">
                                                                                    TT-101 GIIN Number
                                                                                </Typography>
                                                                                <a onClick={() => setToolInfo("giin")}>
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
                                                                                fontSize: "16px",
                                                                                cursor: "pointer",
                                                                                verticalAlign: "super",
                                                                            }}
                                                                        />
                                                                    </Tooltip>
                                                                </span>

                                                            </Typography>
                                                            {toolInfo === "giin" ? (
                                                                <div>
                                                                    <Paper
                                                                        style={{
                                                                            backgroundColor: "#dedcb1",
                                                                            padding: "15px",
                                                                            marginBottom: "10px",
                                                                        }}
                                                                    >
                                                                        <p>GIIN Number</p>
                                                                        <div>The Format of the GIIN should be the following: XXXXXX.XXXXX.<span style={{ color: "red" }}>XX</span>.<span style={{ color: "#0000ff" }}>XXX</span>&nbsp;</div>
                                                                        <div>This should all be in UPPER CASE&nbsp;</div>
                                                                        <div> The Black XXXXXX.XXXXX are alpha numeric.</div>
                                                                        <div>The Red <span style={{ color: "#ff0000" }}>XX</span> must be letters (All in&nbsp;Upper Case)</div>
                                                                        <div>
                                                                            The Blue <span style={{ color: "blue" }}>XXX</span> must be Numeric&nbsp;</div>
                                                                        <div>&nbsp;</div><div>The Following letters may be used:</div>
                                                                        <div>1. LE - Lead</div><div>2. SL - Single</div>
                                                                        <div>3. ME - Member</div>
                                                                        <div>4. BR - Branch (the first thirteen characters of a branch's GIIN will match&nbsp;the first thirteen characters of the GIIN of the Financial Institution with which the branch is associated)</div>
                                                                        <div>5. SP - Sponsoring Entity</div>
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

                                                            <FormControl >
                                                                <TextField
                                                                    type="text"
                                                                    variant="outlined"
                                                                    name="giin"
                                                                    value={values.giin}
                                                                    onChange={handleChange}
                                                                    autoComplete="giin"
                                                                    onBlur={handleBlur}
                                                                    sx={{
                                                                        color: "#121112",
                                                                        fontStyle: "italic",
                                                                        height: "36px",
                                                                        width: "300px"
                                                                    }}
                                                                />

                                                                {errors?.giin ? <span className="error" style={{ marginTop: "15px" }}>Please enter a valid GIIN</span> : <></>}

                                                            </FormControl>
                                                        </div>
                                                        : <></>}
                                                </div>

                                                {values?.chapter4StatusId > 1 ? <>
                                                    <div style={{ marginTop: "20px" }}>
                                                        <Typography variant="h3" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                                            Address of the Disregarded Entity or Branch Receiving Payment
                                                            <span>
                                                                <Tooltip
                                                                    style={{
                                                                        backgroundColor: "black",
                                                                        color: "white",
                                                                    }}
                                                                    title={
                                                                        <>
                                                                            <Typography color="inherit">
                                                                                TT-079 DRE Address
                                                                            </Typography>
                                                                            <a onClick={() => setToolInfo("addressDisregarded")}>
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
                                                                            fontSize: "16px",
                                                                            cursor: "pointer",
                                                                            verticalAlign: "super",
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            </span>
                                                        </Typography>
                                                        {toolInfo === "addressDisregarded" ? (
                                                            <div>
                                                                <Paper
                                                                    style={{
                                                                        backgroundColor: "#dedcb1",
                                                                        padding: "15px",
                                                                        marginBottom: "10px",
                                                                    }}
                                                                >
                                                                    <p>This should be the Disregarded Entity Address
                                                                        <div> Disregarded entities (DRE) are not considered U.S. residents within the meaning of the residence article of U.S. income tax treaties. Treaty benefits will only be available to a DRE owner who is a U.S. resident. </div>
                                                                    </p>
                                                                    <p> A business entity that has a single owner and is not a corporation under Regulations section 301.7701-2(b) is disregarded as an entity separate from its owner. </p>

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

                                                        <Typography sx={{ marginTop: "5px" }}>
                                                            Enter the registered address of the disregarded entity or branch receiving payment. You must not enter a P.O Box or Care of Address (unless this is the registered address).
                                                        </Typography>
                                                    </div>

                                                    <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>

                                                        <div>
                                                            <Typography
                                                                align="left"
                                                                style={{ fontSize: "14px", fontWeight: "530" }}
                                                            >
                                                                Line 1
                                                            </Typography>

                                                            <FormControl >
                                                                <TextField
                                                                    type="text"
                                                                    variant="outlined"
                                                                    name="addressLine1"
                                                                    value={values.addressLine1}
                                                                    onChange={handleChange}
                                                                    autoComplete="addressLine1"
                                                                    onBlur={handleBlur}
                                                                    sx={{
                                                                        color: "#121112",
                                                                        fontStyle: "italic",
                                                                        height: "36px",
                                                                        width: "300px"
                                                                    }}
                                                                />

                                                            </FormControl>
                                                        </div>
                                                        <div>
                                                            <Typography
                                                                align="left"
                                                                style={{ fontSize: "14px", fontWeight: "530" }}
                                                            >
                                                                Line 2
                                                            </Typography>

                                                            <FormControl >
                                                                <TextField
                                                                    type="text"
                                                                    variant="outlined"
                                                                    name="addressLine2"
                                                                    value={values.addressLine2}
                                                                    onChange={handleChange}
                                                                    autoComplete="addressLine2"
                                                                    onBlur={handleBlur}
                                                                    sx={{
                                                                        color: "#121112",
                                                                        fontStyle: "italic",
                                                                        height: "36px",
                                                                        width: "300px"
                                                                    }}
                                                                />

                                                            </FormControl>
                                                        </div>
                                                        <div>
                                                            {/* empty block for layout */}
                                                        </div>
                                                        <div>
                                                            <Typography
                                                                align="left"
                                                                style={{ fontSize: "14px", fontWeight: "530" }}
                                                            >
                                                                City / Town
                                                            </Typography>

                                                            <FormControl >
                                                                <TextField
                                                                    type="text"
                                                                    variant="outlined"
                                                                    name="cityTown"
                                                                    value={values.cityTown}
                                                                    onChange={handleChange}
                                                                    autoComplete="cityTown"
                                                                    onBlur={handleBlur}
                                                                    sx={{
                                                                        color: "#121112",
                                                                        fontStyle: "italic",
                                                                        height: "36px",
                                                                        width: "300px"
                                                                    }}
                                                                />

                                                            </FormControl>
                                                        </div>
                                                        <div>
                                                            <Typography
                                                                align="left"
                                                                style={{ fontSize: "14px", fontWeight: "530" }}
                                                            >
                                                                State / Province / County
                                                            </Typography>

                                                            <FormControl >
                                                                <TextField
                                                                    type="text"
                                                                    variant="outlined"
                                                                    name="stateProvinceCountry"
                                                                    value={values.stateProvinceCountry}
                                                                    onChange={handleChange}
                                                                    autoComplete="stateProvinceCountry"
                                                                    onBlur={handleBlur}
                                                                    sx={{
                                                                        color: "#121112",
                                                                        fontStyle: "italic",
                                                                        height: "36px",
                                                                        width: "300px"
                                                                    }}
                                                                />

                                                            </FormControl>
                                                        </div>
                                                        <div>
                                                            <Typography
                                                                align="left"
                                                                style={{ fontSize: "14px", fontWeight: "530" }}
                                                            >
                                                                ZIP / Postal Code
                                                            </Typography>

                                                            <FormControl >
                                                                <TextField
                                                                    type="text"
                                                                    variant="outlined"
                                                                    name="zipPostalCode"
                                                                    value={values.zipPostalCode}
                                                                    onChange={handleChange}
                                                                    autoComplete="zipPostalCode"
                                                                    onBlur={handleBlur}
                                                                    sx={{
                                                                        color: "#121112",
                                                                        fontStyle: "italic",
                                                                        height: "36px",
                                                                        width: "300px"
                                                                    }}
                                                                />

                                                            </FormControl>
                                                        </div>

                                                        <div>
                                                            <Typography
                                                                align="left"
                                                                style={{ fontSize: "14px", fontWeight: "530" }}
                                                            >
                                                                Country
                                                            </Typography>

                                                            <FormControl className="w-50">
                                                                <select
                                                                    name="countryId"
                                                                    value={values.countryId}
                                                                    onChange={handleChange}
                                                                    autoComplete="countryId"
                                                                    onBlur={handleBlur}
                                                                    style={{
                                                                        padding: " 0 10px",
                                                                        color: "#121112",
                                                                        fontStyle: "italic",
                                                                        height: "40px",
                                                                        width: "300px"
                                                                    }}
                                                                >
                                                                    <option value={0}>-----select-----</option>
                                                                    <option value={257}>United Kingdom</option>
                                                                    <option value={258}>United States</option>
                                                                    <option value={-1}>----------------</option>

                                                                    {getCountriesReducer?.allCountriesData?.map(
                                                                        (ele: any) => (
                                                                            <option key={ele?.id} value={ele?.id}>
                                                                                {ele?.name}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </FormControl>
                                                        </div>

                                                    </div>
                                                </>
                                                    : <></>}
                                                <>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            marginTop: "80px",
                                                        }}
                                                    >
                                                        <SaveAndExit
                                                            Callback={() => {
                                                                submitForm().then(() => {
                                                                    SaveAndExitFunction(values, () => { }, () => { });
                                                                });
                                                            }}
                                                            formTypeId={FormTypeId}
                                                        ></SaveAndExit>
                                                        <Button
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                            variant="contained"
                                                            style={{ marginLeft: "15px" }}
                                                            //color="primary"
                                                            onClick={() => {
                                                                GetPdf();
                                                            }}
                                                        >
                                                            View Form
                                                        </Button>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            style={{ marginLeft: "15px" }}
                                                            disabled={!isValid}
                                                        >
                                                            Continue
                                                        </Button>
                                                    </div>
                                                </>
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
                                                        type="submit"
                                                        onClick={() => {
                                                            Redirect(BackRoute, authDetails?.agentId, history, true);
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
                        </div >
                    </div >
                </div >
            </section >
        </>
    );
};

export default DisregardedEntity;
