import React, { useState, useEffect, useCallback } from "react";
import { Formik, FieldArray, Field , Form} from "formik";
import {
    FormControl,
    Typography,
    Button,
    Input,
    Paper,
    FormControlLabel,
    Tooltip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Link,
    Checkbox,
    RadioGroup,
    Radio,
    TextField,
  } from "@mui/material";
  import { CREATE_8233, GetHelpVideoDetails, post8233_EForm, postW81MY_EForm } from "../../../Redux/Actions";
import { Info, DeleteOutline, Delete } from "@mui/icons-material";
import "./index.scss";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getAllCountriesCode, getAllCountriesIncomeCode, getAllStateByCountryId, getTinTypes } from "../../../Redux/Actions";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import CloseIcon from '@mui/icons-material/Close';
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import { US_TINSchema8IMY, statementSchema8IMY } from "../../../schemas/w81my";

interface FormValues {
    previouslySubmittedAllocationStatement: boolean;
    attachCopyofAllocationStatement: boolean;
  items: { 
    accountIdentifier: string ,
    firstName: string, 
    familyName: string ,
    entityName:string, 
    houseNumberName:string,
    roadName:string,
    city:string,
    state:string,
    zipcode:string,
    residentialCountry:string,
    otherCountry:string, 
    tin:string,
    tinType:string,
    allocation:string,
    email:string,
    formType:string,
    file:string,

    }[];
}



export default function AddMoreForm(props: any) {
    const { authDetails } = useAuth();

    const onBoardingFormValues = JSON.parse(localStorage.getItem("agentDetails") ?? "null");

    const onBoardingFormValuesPrevStepData = JSON.parse(localStorage.getItem("PrevStepData") ?? "null");
    const initialValues: FormValues = {
        previouslySubmittedAllocationStatement: onBoardingFormValuesPrevStepData?.previouslySubmittedAllocationStatement ?  onBoardingFormValuesPrevStepData?.previouslySubmittedAllocationStatement : false,
        attachCopyofAllocationStatement: onBoardingFormValuesPrevStepData?.attachCopyofAllocationStatement ?  onBoardingFormValuesPrevStepData?.attachCopyofAllocationStatement : false,
        items: [{ 
            accountIdentifier: "" ,
            firstName: "", 
            familyName: "" ,
            entityName:"", 
            houseNumberName:"",
            roadName:"",
            city:"",
            state:"",
            zipcode:"",
            residentialCountry:"",
            otherCountry:"", 
            tin:"",
            tinType:"",
            allocation:"",
            email:"",
            formType:"",
            file:"", 
         }],
      };
      const [ustinArray, setUStinArray] = useState([]);
    const [ustinValue, setUStinvalue] = useState([]);
    const [notUsIndividual, setNonUsIndividual] = useState([]);

    useEffect(() => {
        document.title = "Tax-Payer"
    }, [])

  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountries())
    dispatch(getAllCountriesCode())
    dispatch(getAllCountriesIncomeCode())
    // dispatch(getAllStateByCountryId())  
    dispatch(
      getTinTypes(3, (data: any) => {
        setUStinArray(data)
        let datas = data.filter((ele: any) => { return ele.usIndividual === true })
        setUStinvalue(datas)
      })
    ); 
    dispatch(
      getTinTypes(3, (data: any) => {
        setUStinArray(data);
        let datas = data.filter((ele: any) => {
          return ele.usIndividual === true;
        });
        setUStinvalue(datas);
        let nonData = data.filter((ele: any) => {
          return ele.nonUSIndividual === false;
        });
        setNonUsIndividual(nonData)
      })
    );
  }, []);
  const [expanded, setExpanded] = React.useState<string | false>("");
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const getCountriesReducer = useSelector((state: any) => state.getCountriesReducer);
  const getCountriesCodeReducer = useSelector((state: any) => state.getCountriesCodeReducer);
  const GetAllIncomeCodesReducer = useSelector((state: any) => state.GetAllIncomeCodesReducer);
  const GetStateByCountryIdReducer = useSelector((state: any) => state.GetStateByCountryIdReducer);
  const history = useNavigate();
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const dispatch = useDispatch();
  const [toolInfo, setToolInfo] = useState("");

  const handleUploadExisting = (event: any, index: number) => {
    const files = event.target.files;

    console.log(files);
    console.log(index);
    //initialValues.items.index.file = files[0];
    // if (files && files.length > 0) {
    //   const documentTypeId = GetAgentDocumentationMandatoryForEformReducer.GetAgentDocumentationMandatoryForEformData.filter((item:any) => item.name?.trim==docNam?.trim)
    //   const updatedDocs = [...existingDoc];
    //   updatedDocs[index].file = files[0];
    //   setExistingDocNew(updatedDocs);
    //   setDocname("");
    // }
  };

  return (
    <Formik<FormValues>
    validateOnChange={false}
    validateOnBlur={false}
    validateOnMount={false}
     initialValues={initialValues}
     enableReinitialize
     validationSchema={statementSchema8IMY}
     onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);

        const formData = new FormData()
        let obj ={}
        //const mergedArray = [...additionalDocs, ...existingDoc];

        values.items?.forEach((me:any,i)=>{
          Object.keys(me).forEach((key:any) => {
            const value = me[key];
            const objectKey = `Data[${i}].${key}`
            obj ={...obj , [objectKey]:value}
            
            
          });
          
        })

        console.log(obj);

        const temp = {
          agentId: authDetails.agentId,
          accountHolderBasicDetailId: authDetails.accountHolderId,
          ...onBoardingFormValuesPrevStepData,
          ...values,
          stepName: null
        };
        console.log("temp",temp)
        // const returnPromise = new Promise((resolve, reject) => {
        //   dispatch(
        //     postW81MY_EForm(temp,
        //       (responseData: any) => {
        //         localStorage.setItem("PrevStepData", JSON.stringify(temp));
        //         resolve(responseData);
        //         history("/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY")
        //       },
        //       (err: any) => {
        //         reject(err);
        //       }
        //     )
        //   );
        // })
        // return returnPromise
        // dispatch(
        //   CREATE_8233(values, () => {
        //     history("/Form8233/TaxPayer_Identification/Owner");
        //   })
        // );
        // history("/Form8233/TaxPayer_Identification/Owner");
      }}
    >
      {({ errors,
          touched,
          handleBlur,
          values,
          handleSubmit,
          handleChange,
          isSubmitting,
          setFieldValue,
          submitForm,
          isValid}) => (
            <Form onSubmit={handleSubmit}>

            <>{console.log(errors.items, values, "errorsssss")}</>
            <section
              className="inner_content"
              style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >
              <div className="overlay-div">
            <div className="overlay-div-group">
                <div className="viewInstructions">View Instructions</div>
                <div className="viewform">View Form</div>
                <div className="helpvideo"> 
                
                {GethelpData && GethelpData[9].id === 12 ? (
  <a
    href={GethelpData[9].fieldValue}
    target="popup"
    onClick={() =>
      window.open(
        GethelpData[9].fieldValue,
        'name',
        `width=${GethelpData[9].width},height=${GethelpData[9].height},top=${GethelpData[9].top},left=${GethelpData[9].left}`
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
          <div style={{ padding: "20px 0px",height:"100%" }}>
          <BreadCrumbComponent breadCrumbCode={1358} formName={FormTypeId.FW81MY}/>
      </div>
      </div>
      <div className="col-8 mt-3">
              <div style={{ padding: "13px" }}>
                
                <Paper style={{ padding: "10px" }}>
                <Typography
                        align="left"
                        style={{
                          margin: "10px",
                          fontSize: "23px",
                          fontWeight: "550",
                        }}
                      >
                        W8IMY
                      </Typography>
                        
                      <Typography style={{ margin: "10px",
                          fontSize: "23px",
                          fontWeight: "550",border: "2px solid black", color: "white", backgroundColor: "black" }}>
                      Withholding Statement 
        </Typography>
                      <Typography>
                      You now have two options available through this process; please select the facility you wish to undertake. If you have already created an allocation statement outside of this process you can attach a copy to this submission. We have added a template here which you can use. The format provided will help us to manage the submission and additional documentation that may arrive.
                      </Typography>
                      <Typography style={{ margin: "10px",
                          fontSize: "23px",
                          fontWeight: "550",border: "2px solid black", color: "white", backgroundColor: "grey" }}>
                        Alternatively you can use the facility here to provide account details and attach additional information, which will be submitted along with the certification. Please provided as much information as possible. Note: If you have previously submitted a Withholding / Allocation Statement to us it may no longer be current or valid. To help expedite the validation process after the W-8IMY has been submitted we would prefer you to download and attach the completed "Withholding / Allocation Statement" Excel template provided 
                    </Typography>
                      <div>

                        
                        <Radio
                        name="previouslySubmittedAllocationStatement"
                        checked={values.previouslySubmittedAllocationStatement}
                        onChange={(e) => {
                          setFieldValue("previouslySubmittedAllocationStatement",true)
                          setFieldValue("attachCopyofAllocationStatement",false)
                        }}
                        value={values.previouslySubmittedAllocationStatement}
                        
                      />
                      <label>I have previously submitted a Withholding / Allocation Statement, which remains valid </label>

                      <Radio
                        name="attachCopyofAllocationStatement"
                        checked={values.attachCopyofAllocationStatement}
                        onChange={(e) => {
                          setFieldValue("attachCopyofAllocationStatement",true)
                          setFieldValue("previouslySubmittedAllocationStatement",false)
                        }}
                        value={values.attachCopyofAllocationStatement}
                        
                      />
                      <label>Attach a copy of a Withholding / Allocation Statement already created or using the template provided (You will be able to attach later in the process) </label>
              

                        

                      {/* <RadioGroup
                              row
                              
                              name="previouslySubmittedAllocationStatement"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              value={values.previouslySubmittedAllocationStatement}
                              onChange={handleChange}
                            >
                                <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="I have previously submitted a Withholding / Allocation Statement, which remains valid"
                                name="previouslySubmittedAllocationStatement"
                              />
                              <FormControlLabel
                                className="label"
                                value="No"
                                control={<Radio />}
                                label="Attach a copy of a Withholding / Allocation Statement already created or using the template provided (You will be able to attach later in the process)"
                                name="previouslySubmittedAllocationStatement"
                              />
                        </RadioGroup>
                        {touched.previouslySubmittedAllocationStatement && errors.previouslySubmittedAllocationStatement && typeof errors?.previouslySubmittedAllocationStatement === 'string' && (
                            <p className="error">{errors?.previouslySubmittedAllocationStatement}</p>
                        )} */}

                    
                        
                        </div>
                        {/* {values.attachCopyofAllocationStatement && (<>
                            <Button
                            variant="contained" 
                            >
                                Click to create a Withholding Statement
                            </Button>
                        </>)} */}

                        {values.attachCopyofAllocationStatement && (<>
                            <Typography 
                            style={{
                                 margin: "10px",
                                fontSize: "23px",
                                border: "2px solid black", 
                                color: "white", 
                                backgroundColor: "black" }}>
                                    Withholding Statement Creation
                            </Typography>

                            <FieldArray name="items">
                                            {({ push, remove }) => (
                                                
                                                
                                            <div>
                                                {values.items.map((item:any, index:any) => (
                                                <div key={index}>
                                                    <Paper className="my-2" style={{ backgroundColor: "#EAE5E4", padding: "10px" }}>
                                                    <Typography>
                                                        Please Enter the name, TIN and contact details here:
                                                        <DeleteOutline type="button" onClick={() => remove(index)}/>

                                                    </Typography>

                                                    
                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        Account Identifier
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.accountIdentifier`}
                                                    onChange={handleChange}
                                                    value={values.items[index].accountIdentifier}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>
                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        First Name
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.firstName`}
                                                    onChange={handleChange}
                                                    value={values.items[index].firstName}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                      
                                                    />
                                                    {/* {typeof errors?.items[index] !== 'string' && errors?.items[index]?.firstName && (
                                                      <p className="error">{errors.items[index].firstName}</p>
                                                    )} */}

                                                    {/* {errors.items && errors.items[index] && errors.items[index] && touched.items && touched.items[index] && (
                                                      <div className="error">{errors.items[index].firstName}</div>
                                                    )} */}
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        Family Name
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.familyName`}
                                                    onChange={handleChange}
                                                    value={values.items[index].familyName}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                       Or Entity Name
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.entityName`}
                                                    onChange={handleChange}
                                                    value={values.items[index].entityName}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>
                                                    <Typography style={{ fontSize: "10px" }}>
                                                    Please enter account holder address details here (Optional):

                                                    </Typography>
                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        House Number or Name
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.houseNumberName`}
                                                    onChange={handleChange}
                                                    value={values.items[index].houseNumberName}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        Road Name
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.roadName`}
                                                    onChange={handleChange}
                                                    value={values.items[index].roadName}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        City or Town
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.city`}
                                                    onChange={handleChange}
                                                    value={values.items[index].city}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        State or Province
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.state`}
                                                    onChange={handleChange}
                                                    value={values.items[index].state}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        Zip or Postal Code
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.zipcode`}
                                                    onChange={handleChange}
                                                    value={values.items[index].zipcode}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        Residential Country
                                                    </Typography>
                                                    <select name={`items.${index}.residentialCountry`}
                                                    onChange={handleChange}
                                                    value={values.items[index].residentialCountry}
                                                    >
                                                      <option value={0}>--select--</option>
                                                      {getCountriesReducer.allCountriesData?.map((ele:any) => (
                    
                                                            <option key={ele?.id} value={ele?.id}>{ele?.name}</option>
                                                        ))}
                                                    </select>
                                                    {/* <Input
                                                    name={`items.${index}.city`}
                                                    //value={`items.${index}.firstName`}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    /> */}
                                                    </div>
                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        Other (not available in the drop down)
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.otherCountry`}
                                                    onChange={handleChange}
                                                    value={values.items[index].otherCountry}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        TIN
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.tin`}
                                                    onChange={handleChange}
                                                    value={values.items[index].tin}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                        TIN Type
                                                    </Typography>
                                                    <select
                          
                                                        style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#121112",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                        }}
                                                        name={`items.${index}.tinType`}
                                                        onChange={handleChange}
                                                        value={values.items[index].tinType}
                                                        id="Income"
                                                        
                                                    >
                                                        <option value={0}>---select---</option>
                                                        {notUsIndividual?.map((ele: any) => (
                                                    
                                                            <option

                                                                key={ele?.taxpayerIdTypeID}
                                                                value={ele?.taxpayerIdTypeID}
                                                            >
                                                                {ele?.taxpayerIdTypeName}
                                                            </option>
                                                            
                                                            ))}
                                                    </select>
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                    Allocation
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.allocation`}
                                                    onChange={handleChange}
                                                    value={values.items[index].allocation}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                    Email Address:
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.email`}
                                                    onChange={handleChange}
                                                    value={values.items[index].email}
                                                    //value={`items.${index}.firstName`}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    <Typography style={{ fontSize: "14px" }}>
                                                    Select the form type and attach the account holders form here
                                                    </Typography>
                                                    <Input
                                                    name={`items.${index}.formType`}
                                                    onChange={handleChange}
                                                    value={values.items[index].formType}
                                                    style={{
                                                        border: " 1px solid #d9d9d9 ",
                                                        padding: " 0 10px",
                                                        color: "#7e7e7e",
                                                        fontStyle: "italic",
                                                        height: "40px",
                                                        width: "100%",
                                                      }}
                                                    />
                                                    </div>

                                                    <div className="col-lg-6 col-6">
                                                    
                                                    <Input
                                                    type="file"
                                                    onChange={(e) => handleUploadExisting(e,index)}
                                                    style={{
                                                      border: " 1px solid #d9d9d9 ",
                                                      padding: " 0 10px",
                                                      color: "#7e7e7e",
                                                      fontStyle: "italic",
                                                      height: "40px",
                                                      width: "100%",
                                                    }}
                                                    />
                                                    </div>

                                                    </Paper>

                                                </div>
                                                ))}
                                                <Button
                                                type="button"
                                                variant="contained"
                                                
                                                onClick={() =>
                                                    // Push a new item into the items array
                                                    handleChange({
                                                    target: {
                                                        name: "items",
                                                        value: [...values.items, { firstName: "" }],
                                                    },
                                                    })
                                                }
                                                >
                                                 Add Additional Account Information
                                                </Button>
                                            </div>
                                            
                                            )}
                                        </FieldArray>    
                            
                                </>)}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "5rem",
                    }}
                  >
                    <SaveAndExit Callback={() => {
                        submitForm().then(() => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          const temp = {
                            agentId: authDetails.agentId,
                            accountHolderBasicDetailId: authDetails.accountHolderId,
                            ...prevStepData,
                            ...values,
                            stepName: `/${urlValue}`
                          };
                          dispatch(postW81MY_EForm(
                            temp
                            , () => { }))
                          history(
                            GlobalValues.basePageRoute
                          );
                        })
                      }} formTypeId={FormTypeId.FW81MY} ></SaveAndExit>
                    <Button
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" }}
                    >
                      View Form
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      //disabled={!isValid}
                      style={{ color: "white", marginLeft: "15px" }}
                    >
                      Continue
                    </Button>
                  </div>
                  <Typography
                    align="center"
                    style={{
                      color: "#adadac",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    Do you want to go back?
                  </Typography>
                  <Typography align="center">
                    <Button
                    onClick={()=>{
                      history("/IMY/Tax_Purpose_Exp/Chapter4_IMY");
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
                </Paper>
              </div>
              </div>
              </div>
            </section>
          </Form>
      )}
    </Formik>
  );
};

