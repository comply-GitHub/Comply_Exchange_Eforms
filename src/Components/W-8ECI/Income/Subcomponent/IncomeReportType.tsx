import { Button, FormControl, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IncomeReportTypeSchema } from '../../../../schemas/w8ECI';
import useAuth from '../../../../customHooks/useAuth';
import { GetIncomeReportDescription } from '../../../../Redux/Actions';

const IncomeReportType = ({ returnIncomeTypeAndValid }: any) => {
    const dispatch = useDispatch()
    const { authDetails } = useAuth()
    const [incomeTypes, setIncomeTypes] = useState([
        {
            itemIncomeType: 0,
            incomeDescription: ""
        }
    ]);


    const [incomeTypesValid, setIncomeTypeValid] = useState(false)

    const GetIncomeTypesData = useSelector(
        (state: any) => state.GetIncomeTypesReducer.GetIncomeTypesData
    )

    useEffect(() => {
        dispatch(GetIncomeReportDescription(authDetails?.accountHolderId, (data: any[]) => {
            if (data?.length > 0) {
                console.log(data)
                setIncomeTypes(data.map(ele => ({
                    itemIncomeType: ele?.itemIncomeType ?? "0",
                    incomeDescription: ele?.incomeDescription ?? ""
                })))
            }
        }))
    }, [authDetails])
    const deleteIncomeType = (index: number) => {
        let data: any[] = [...incomeTypes]
        data.splice(index, 1)
        setIncomeTypes([...data])
    }

    const AddIncomeType = () => {
        setIncomeTypes((prev) => {
            return [...prev, {
                itemIncomeType: 0,
                incomeDescription: ""
            }]
        })
    }

    const CustomHandleChange = (e: any, index: number) => {
        let temp: any[] = [...incomeTypes];
        let obj: any = incomeTypes[index];
        obj[e.target.name] = e.target.value;
        // temp.splice(index, 1);
        temp[index] = { ...obj };
        console.log("CustomHandleChange", temp)
        setIncomeTypes([...temp]);
    }

    useEffect(() => {
        returnIncomeTypeAndValid(incomeTypes, incomeTypesValid)
        console.log(incomeTypes, "incomeTypes")
        Promise.all(incomeTypes.map(x => IncomeReportTypeSchema().validate(x))).then(() => {
            setIncomeTypeValid(true);
        }).catch(() => {
            setIncomeTypeValid(false);
        })
    }, [incomeTypes])

    useEffect(() => {
        console.log(incomeTypesValid, "incomeTypesValid")
        returnIncomeTypeAndValid(incomeTypes, incomeTypesValid)
    }, [incomeTypesValid])

    return (
        <>
            {incomeTypes.map((_, index) => (
                <Paper
                    className="paper"
                    elevation={3}
                    style={{
                        backgroundColor: "#e8e1e1",
                        marginTop: "15px",
                    }}
                >
                    <Formik
                        initialValues={_}
                        validateOnChange={true}
                        enableReinitialize
                        validationSchema={IncomeReportTypeSchema}
                        onSubmit={() => {

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
                        }) =>
                        (
                            <Form>
                                <>{console.log(values, "values")}</>
                                <>{console.log(errors, "errors")}</>
                                <div style={{ padding: "20px" }}>
                                    {incomeTypes.length > 1 && (
                                        <Typography align="right">
                                            <DeleteIcon
                                                onClick={() => { deleteIncomeType(index) }}
                                                style={{ color: "red", fontSize: "30px" }}
                                            />
                                        </Typography>
                                    )}
                                    <div className="col-12 d-flex">
                                        <div className="col-6">
                                            <Typography
                                                align="left"
                                                style={{
                                                    fontSize: "22px",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                Select Item of Income:
                                                <span
                                                    style={{ color: "red", fontSize: "22px" }}
                                                >
                                                    *
                                                </span>
                                            </Typography>
                                            <FormControl className="w-100">
                                                <select
                                                    name="itemIncomeType"
                                                    id="Income"
                                                    defaultValue={1}
                                                    onBlur={handleBlur}
                                                    value={values.itemIncomeType}
                                                    onChange={(e) => {
                                                        CustomHandleChange(e, index);
                                                        handleChange(e);
                                                        //setTimeout(() => { CustomHandleChange(e, index); }, 10);
                                                    }}
                                                    style={{
                                                        padding: " 0 10px",
                                                        color: "#121112",
                                                        fontStyle: "italic",
                                                        height: "50px",
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    <option value={0}>--Please Select the income types--</option>
                                                    {GetIncomeTypesData?.map(
                                                        (ele: any) => (
                                                            <option key={ele?.id} value={ele?.id}>
                                                                {ele?.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <p className="error">
                                                    {errors.itemIncomeType}
                                                </p>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <Typography
                                        align="left"
                                        style={{ fontSize: "22px", marginTop: "10px" }}
                                    >
                                        Description of Income:
                                        {/* <span style={{ color: "red", fontSize: "22px" }}>
                                            *
                                        </span> */}
                                    </Typography>
                                    <FormControl className="w-100">
                                        <textarea
                                            name="incomeDescription"
                                            value={values.incomeDescription}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                CustomHandleChange(e, index);
                                                handleChange(e);
                                                //setTimeout(() => { CustomHandleChange(e, index); }, 10);
                                            }}
                                            className="col-md-12 col-12"
                                            rows={5}
                                            cols={50}
                                            style={{
                                                padding: "8px 10px 0px 15px",
                                                color: "#7e7e7e",
                                                fontStyle: "italic",
                                                marginBottom: "20px",
                                            }}>
                                        </textarea>
                                        <p className="error">
                                            {errors.incomeDescription}
                                        </p>
                                    </FormControl>
                                </div>

                            </Form>
                        )

                        }

                    </Formik>

                </Paper>
            ))}
            <div style={{ marginTop: "20px" }}>
                <Button
                    onClick={AddIncomeType}
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: "black", color: "white" }}
                >
                    Add Income Type
                </Button>
            </div>
        </>
    );
}

export default IncomeReportType