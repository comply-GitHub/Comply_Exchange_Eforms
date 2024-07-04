import React, { useEffect, useState } from 'react'
import {
  FormControl,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { useSelector } from 'react-redux';
import { specilaRateIncomeTypeSchema } from '../../../../../../schemas/w8BenE';

const IncomeType = ({ DeleteIncomeType, index, length, data, UpdateIncomeType, CountryArticle }: any) => {
  const [initialValue, setInitialValues] = useState<any>(
    {}
  );
  const showInDropdownArticle = CountryArticle?.filter((ele: any) => ele.showInDropDown === true);
  const [articleBeneficialOwner, setArticleBeneficialOwner] = useState<any>({});
  useEffect(() => {
    setInitialValues({ ...data });
  }, [length])

  useEffect(() => {
    setInitialValues(data);
    let temp: any[] = showInDropdownArticle?.filter((x: any) => x.id === Number.parseInt({ ...data }.articleBeneficalOwner))
    if (temp) {
      setArticleBeneficialOwner(temp[0])
    }
  }, [data])


  const GetAllIncomeCodesReducer = useSelector(
    (state: any) => state.GetAllIncomeCodesReducer
  );

  const handleUpdateOnFormChange = (e: any) => {
    let temp: any = { ...data };
    temp[e.target.name] = e.target.value;
    console.log("change", e)
    UpdateIncomeType({ ...temp }, index);
  }

  const getOptionsBasedOnMaxNumberOfParagraph = (maxNumber: number) => {
    let arr: any = [];
    for (let i = 1; i <= maxNumber; i++) {
      arr.push(i);
    }
    console.log(arr, "arr")
    return arr.map((ele: any) => {
      return <option value={ele}> {ele}</option>;
    });
  }

  return (
    <Formik
      validateOnChange={true}
      initialValues={initialValue}
      enableReinitialize={true}
      validationSchema={specilaRateIncomeTypeSchema("Yes")}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true)
      }} >
      {({
        errors,
        touched,
        handleBlur,
        values,
        handleSubmit,
        handleChange,
        setFieldValue,
      }) => (
        <Form>
          <>{console.log(errors, "income type errors")}</>
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
                {length > 1 ? (<DeleteIcon
                  onClick={() => { DeleteIncomeType(index); }}
                  style={{ color: "red", fontSize: "30px" }}
                />) : ""}
              </Typography>
              <div className="col-12 d-flex" style={{ justifyContent: "space-between" }}>
                <div className="col-5">
                  <Typography
                    align="left"
                    style={{
                      fontSize: "22px",
                      marginTop: "10px",
                    }}
                  >
                    Article the beneficial owner is claiming the
                    provisions of:{" "}
                    <span
                      style={{ color: "red", fontSize: "30px" }}
                    >
                      *
                    </span>
                    <span></span>
                  </Typography>
                  <FormControl className="w-100">
                    <select
                      style={{
                        padding: " 0 10px",
                        color: "#7e7e7e",
                        fontStyle: "italic",
                        height: "50px",
                        marginBottom: "20px",
                      }}
                      name="articleBeneficalOwner"
                      value={values.articleBeneficalOwner}
                      id="Income"
                      defaultValue={1}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        handleUpdateOnFormChange(e);
                      }}
                    >
                      <option value="0">---select---</option>
                      {showInDropdownArticle?.map((ele: any) => {
                        return <option value={ele.id}>{ele.number + " " + ele.description}</option>
                      })}
                    </select>

                  </FormControl>
                  <p className="error">{typeof (errors.articleBeneficalOwner) == "string" ? errors.articleBeneficalOwner : ""}</p>
                </div>
                <div className="col-5">
                  <Typography
                    align="left"
                    style={{
                      fontSize: "22px",
                      marginTop: "10px",
                    }}
                  >
                    Enter the Paragraph of the Article being
                    claimed:


                  </Typography>
                  <FormControl className="w-100">
                    <select
                      style={{
                        padding: " 0 10px",
                        color: "#7e7e7e",
                        fontStyle: "italic",
                        height: "50px",
                        marginBottom: "20px",
                      }}
                      name="paragraphArticleClaimed"
                      value={values.paragraphArticleClaimed}
                      id="Income"
                      defaultValue={1}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e); handleUpdateOnFormChange(e);
                      }}
                    >
                      <option value="">---select---</option>
                      {data.articleBeneficalOwner !== "" ?
                        getOptionsBasedOnMaxNumberOfParagraph(articleBeneficialOwner?.maxNoOfParagraph)
                        : ""}
                    </select>

                  </FormControl>
                  <p className="error">{typeof (errors.paragraphArticleClaimed) == "string" ? errors.paragraphArticleClaimed : ""}</p>
                </div>
              </div>

              {Number.parseInt(values.paragraphArticleClaimed) > 0 
              // && articleBeneficialOwner?.includeSubParagraph === true
               ?
                <div className="col-10">
                  <Typography
                    align="left"
                    style={{ fontSize: "22px", marginTop: "10px" }}
                  >
                    Enter the Subparagraph of the Article being
                    claimed:{" "}
                    <span style={{ color: "red", fontSize: "30px" }}>
                      *
                    </span>
                  </Typography>
                  <FormControl className="w-100">
                    <TextField
                      className="col-md-6 col-12"
                      style={{
                        backgroundColor: "#fff",
                        // color: "#7e7e7e",
                        fontStyle: "italic",
                      }}
                      name="subParagraphArticle"
                      value={values.subParagraphArticle}
                      onBlur={handleBlur}
                      onChange={(e) => { handleChange(e); handleUpdateOnFormChange(e); }}
                      error={Boolean(
                        touched.subParagraphArticle &&
                        errors.subParagraphArticle
                      )}
                    />
                    <p className="error">{typeof (errors.subParagraphArticle) == "string" ? errors.subParagraphArticle : ""}</p>
                  </FormControl>
                </div>
                : ""}


              <div className="col-12 d-flex" style={{ justifyContent: "space-between" }}>
                <div className="col-5">
                  <Typography
                    align="left"
                    style={{
                      fontSize: "22px",
                      marginTop: "10px",
                    }}
                  >
                    Withholding rate claimed:{" "}
                    <span
                      style={{ color: "red", fontSize: "30px" }}
                    >
                      *
                    </span>
                    <span></span>
                  </Typography>
                  <FormControl className="w-100">
                    <select
                      style={{
                        padding: " 0 10px",
                        color: "#7e7e7e",
                        fontStyle: "italic",
                        height: "50px",
                        marginBottom: "20px",
                      }}
                      name="withHoldingClaim"
                      value={values.withHoldingClaim}
                      id="Income"
                      defaultValue={1}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e); handleUpdateOnFormChange(e);
                      }}
                    >
                      <option value="">---select---</option>
                      {articleBeneficialOwner?.treatyRates?.split(",").map((ele: string) => {
                        return <option value={ele}>{ele}</option>
                      })}
                    </select>
                    <p className="error">{typeof (errors.withHoldingClaim) == "string" ? errors.withHoldingClaim : ""}</p>
                  </FormControl>
                </div>
                <div className="col-5">
                  <Typography
                    align="left"
                    style={{
                      fontSize: "22px",
                      marginTop: "10px",
                    }}
                  >
                    Type of income expected:{" "}
                    <span
                      style={{ color: "red", fontSize: "30px" }}
                    >
                      *
                    </span>
                    <span></span>
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
                      name="incomeExpectedId"
                      value={values.incomeExpectedId}
                      id="Income"
                      //defaultValue={1}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e); handleUpdateOnFormChange(e);
                      }}
                    >
                      <option value="0">---select---</option>
                      {

                        GetAllIncomeCodesReducer.allCountriesIncomeCodeData?.filter((ele: any) => articleBeneficialOwner?.articlesIncomeCodes?.split(",")).map(
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
                    <p className="error">{typeof (errors.incomeExpectedId) == "string" ? errors.incomeExpectedId : ""}</p>
                  </FormControl>
                </div>
              </div>
            </div>
          </Paper>

        </Form>
      )}
    </Formik>

  )
}

export default IncomeType