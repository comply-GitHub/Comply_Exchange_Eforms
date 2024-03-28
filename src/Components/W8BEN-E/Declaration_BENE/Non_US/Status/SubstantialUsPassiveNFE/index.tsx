import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import GlobalValues from "../../../../../../Utils/constVals";
import {
  UpdateSubstantialUsPassiveNFE,
  UpsertAccountHolderIncomeAllocation,
} from "../../../../../../Redux/Actions";

const SubstantialUsPassiveNFE = ({ formTypeId, submitPassiveNFEData }: any) => {
  const [numPapers, setNumPapers] = useState(1);
  const dispatch = useDispatch();
  const storeData = useSelector((state: any) => state.SubstantialUsPassiveNFE);

  const addIncomeTypePaper = () => {
    setNumPapers(numPapers + 1);
    setSubmitValues((prev) => {
      let data = [
        ...prev,
        {
          agentId: GlobalValues.agentId,
          accountHolderDetailsId: GlobalValues.AccountHolderBasicDetailsId,
          formTypeId,
          formEntryId: 0,
          name: "",
          tIN: "",
          houseNumberOrName: "",
          roadName: "",
          cityOrTown: "",
          stateOrProvince: "",
          zipOrPostCode: "",
          residentialCountryId: 0,
          other: "",
        },
      ];
      return data.map((ele: any, index: number) => {
        return { ...ele, formEntryId: index + 1 };
      });
    });
  };

  const deleteIncomeTypePaper = (index: number) => {
    setInitialValues(submitValues.splice(index, 1));
    setNumPapers(numPapers - 1);
  };

  const [initialValues, setInitialValues] = useState(
    (
      storeData?.length > 0
        ? storeData
        : [
          {
            agentId: GlobalValues.agentId,
            accountHolderDetailsId: GlobalValues.AccountHolderBasicDetailsId,
            formTypeId,
            formEntryId: 0,
            name: "",
            tIN: "",
            houseNumberOrName: "",
            roadName: "",
            cityOrTown: "",
            stateOrProvince: "",
            zipOrPostCode: "",
            residentialCountryId: 0,
            other: "",
          },
        ])
  );

  useEffect(() => {
    if (submitPassiveNFEData?.length > 0) {
      setInitialValues(submitPassiveNFEData.map((ele: any) => {
        return {
          ...ele,
          tIN: ele.tin,
        }

      }))
    }
  }, [submitPassiveNFEData]);

  const [submitValues, setSubmitValues] = useState<any[]>(submitPassiveNFEData?.length > 0 ? [...submitPassiveNFEData] : [...initialValues]);

  const handleChangeUpdates = (e: any, values: any, index: number) => {
    let temp = [...submitValues];
    temp[index] = { ...temp[index], ...values, formEntryId: index };
    temp[index][e.target.name] = e.target.value;
    setSubmitValues(temp);
  };

  useEffect(() => {
    dispatch(UpdateSubstantialUsPassiveNFE(submitValues));
    // update in redux state
  }, [submitValues]);

  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );

  const errors: any = {};

  return (
    <>
      <div className="mt-3">
        <Typography
          style={{
            border: "2px solid black",
            color: "white",
            backgroundColor: "black",
          }}
        >
          Part XXIX{" "}
          <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
            Substantial U.S. Owners of Passive NFFE{" "}
          </span>
        </Typography>
      </div>
      <Typography className="mt-2" style={{ fontSize: "13px" }}>
        As required by Part XXVI, provide the name, address and TIN of each
        substantial U.S. owner of the NFFE. Please see instructions for
        definition of substantial U.S. owner.
      </Typography>

      {Array.from({ length: numPapers }).map((_, index) => (
        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues[0]}
          onSubmit={(values, { setSubmitting }) => { }}
        //validationSchema={}
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
          }) => (
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
                e.preventDefault();
              }}
            >
              <Paper
                className="paper"
                elevation={3}
                style={{
                  backgroundColor: "#e8e1e1",
                  marginTop: "10px",
                }}
              >
                <div style={{ padding: "20px" }}>
                  <Typography align="right">
                    {numPapers > 1 ? (
                      <DeleteIcon
                        onClick={(e) => {
                          deleteIncomeTypePaper(index);
                        }}
                        style={{ color: "red", fontSize: "30px" }}
                      />
                    ) : (
                      ""
                    )}
                  </Typography>
                  <div
                    className="col-12 d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="col-5">
                      <Typography
                        align="left"
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        Name:{" "}
                      </Typography>
                      <FormControl className="w-100">
                        <TextField
                          name="name"
                          value={values.name}
                          style={{
                            fontStyle: "italic",
                            height: "50px",
                            marginBottom: "20px",
                            backgroundColor: "#fff",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeUpdates(e, values, index);
                          }}
                        />
                      </FormControl>
                    </div>
                    <div className="col-5">
                      <Typography
                        align="left"
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        TIN:
                      </Typography>
                      <FormControl className="w-100">
                        <TextField
                          name="tIN"
                          value={values.tIN}
                          style={{
                            fontStyle: "italic",
                            height: "50px",
                            marginBottom: "20px",
                            backgroundColor: "#fff",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeUpdates(e, values, index);
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <Typography style={{ fontWeight: "bold" }}>
                    Address:
                  </Typography>
                  <div
                    className="col-12 d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="col-5">
                      <Typography
                        align="left"
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        House Number or Name:{" "}
                      </Typography>
                      <FormControl className="w-100">
                        <TextField
                          name="houseNumberOrName"
                          style={{
                            fontStyle: "italic",
                            height: "50px",
                            marginBottom: "20px",
                            backgroundColor: "#fff",
                          }}
                          value={values.houseNumberOrName}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeUpdates(e, values, index);
                          }}
                        />
                      </FormControl>
                    </div>
                    <div className="col-5">
                      <Typography
                        align="left"
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        Road Name:
                      </Typography>
                      <FormControl className="w-100">
                        <TextField
                          name="roadName"
                          value={values.roadName}
                          style={{
                            fontStyle: "italic",
                            height: "50px",
                            marginBottom: "20px",
                            backgroundColor: "#fff",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeUpdates(e, values, index);
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div
                    className="col-12 d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="col-5">
                      <Typography
                        align="left"
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        City or Town:{" "}
                      </Typography>
                      <FormControl className="w-100">
                        <TextField
                          name="cityOrTown"
                          value={values.cityOrTown}
                          style={{
                            fontStyle: "italic",
                            height: "50px",
                            marginBottom: "20px",
                            backgroundColor: "#fff",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeUpdates(e, values, index);
                          }}
                        />
                      </FormControl>
                    </div>
                    <div className="col-5">
                      <Typography
                        align="left"
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        State or Province:
                      </Typography>
                      <FormControl className="w-100">
                        <TextField
                          name="stateOrProvince"
                          value={values.stateOrProvince}
                          style={{
                            fontStyle: "italic",
                            height: "50px",
                            marginBottom: "20px",
                            backgroundColor: "#fff",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeUpdates(e, values, index);
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div
                    className="col-12 d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="col-5">
                      <Typography
                        align="left"
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        Zip or Postal Code:
                      </Typography>
                      <FormControl className="w-100">
                        <TextField
                          name="zipOrPostCode"
                          value={values.zipOrPostCode}
                          style={{
                            fontStyle: "italic",
                            height: "50px",
                            marginBottom: "20px",
                            backgroundColor: "#fff",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeUpdates(e, values, index);
                          }}
                        />
                      </FormControl>
                    </div>
                    <div className="col-5">
                      <Typography
                        align="left"
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        Residential Country:
                      </Typography>
                      <FormControl className="w-100">
                        <select
                          style={{
                            padding: " 0 10px",
                            color: "#121112",
                            fontStyle: "italic",
                            height: "50px",
                            marginBottom: "20px",
                          }}
                          name="residentialCountryId"
                          id="residentialCountryId"
                          defaultValue={1}
                          value={values.residentialCountryId}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeUpdates(e, values, index);
                          }}
                        >
                          <option value="">---select---</option>
                          <option value={257}>United Kingdom</option>
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
                        {/* <p className="error">{errors.foreginTIN_CountryId}</p> */}
                      </FormControl>
                    </div>
                  </div>

                  <div className="col-10">
                    <Typography
                      align="left"
                      style={{ fontSize: "17px", marginTop: "10px" }}
                    >
                      Other (not available in the drop down):
                    </Typography>
                    <FormControl className="w-100">
                      <TextField
                        className="col-md-6 col-12"
                        style={{
                          backgroundColor: "#fff",
                          fontStyle: "italic",
                        }}
                        name="other"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          handleChangeUpdates(e, values, index);
                        }}
                        value={values.other}
                      />
                      {/* <p className="error">
                                            {errors.subParagraphArticle}
                                            </p> */}
                    </FormControl>
                  </div>
                </div>
              </Paper>
            </Form>
          )}
        </Formik>
      ))}
      <div style={{ marginTop: "20px" }}>
        <Button
          onClick={addIncomeTypePaper}
          variant="contained"
          size="large"
          style={{ backgroundColor: "black", color: "white" }}
        >
          Add Substantial U.S. Owner
        </Button>
      </div>
    </>
  );
};

export default SubstantialUsPassiveNFE;
