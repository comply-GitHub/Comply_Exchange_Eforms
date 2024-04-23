// import { FormControl, FormControlLabel, Input, Radio, RadioGroup, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { GetHelpVideoDetails } from "../../../../Redux/Actions";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import BreadCrumbComponent from "../../../reusables/breadCrumb";
// export default function abc(){
//   useEffect(() => {
    
//     dispatch(GetHelpVideoDetails());
  
//   }, []);
//   const dispatch = useDispatch();
//   const GethelpData = useSelector(
//     (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
//   );
//     return(<>
//      <section
//       className="inner_content backGround_Image"
//       style={{ paddingTop: "25px" }}
//     >
//         <div className="overlay-div">
//             <div className="overlay-div-group">
//                 <div className="viewInstructions">View Instructions</div>
//                 <div className="viewform">View Form</div>
//                 <div className="helpvideo"> 
//                 {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
//                 {GethelpData && GethelpData[7].id === 9 ? (
//   <a
//     href={GethelpData[7].fieldValue}
//     target="popup"
//     onClick={() =>
//       window.open(
//         GethelpData[7].fieldValue,
//         'name',
//         `width=${GethelpData[7].width},height=${GethelpData[7].height},top=${GethelpData[7].top},left=${GethelpData[7].left}`
//       )
//     }
//   >
//     Help Video
//   </a>
// ) : (
//   ""
// )}
//                 </div>
//             </div>
//         </div>
//         <div className="row w-100 ">
//         <div className="col-4">
//           <div style={{ padding: "20px 0px",height:"100%" }}>
//             {/* <BreadCrumbComponent breadCrumbCode={1500} formName={FormTypeId.FW81MY}/> */}
//       </div>
//       </div>
//       <div className="col-8 mt-3">
  

  
//   <div style={{ padding: "13px" }}>
//      <FormControl className="w-100">
//                         <div className="row">
//                           <div>
//                             <Typography
//                               align="left"
//                               style={{ marginTop: "20px" }}
//                             >
//                               Are you a U.S. Individual?
//                               <span style={{ color: "red" }}>*</span>
//                             </Typography>

//                             <div className="d-flex">
//                               <FormControl 
                              
//                               // error={Boolean(errors.isUSIndividual)}>
//                              >
//                                 <RadioGroup
//                                   id="isUSIndividual"
//                                   row
//                                   aria-labelledby="demo-row-radio-buttons-group-label"
//                                   // value={values.isUSIndividual}
//                                   // onChange={(e) => {
//                                   //   handleChange(e);
//                                   //   // onChangeUsInit(values);
//                                   // }}
//                                 >
//                                   <FormControlLabel
//                                     control={<Radio />}
//                                     value="yes"
//                                     name="isUSIndividual"
//                                     label="Yes"
//                                   />
//                                   <FormControlLabel
//                                     control={<Radio />}
//                                     value="no"
//                                     name="isUSIndividual"
//                                     label="No"
//                                   />
//                                 </RadioGroup>
//                                 {/* {errors.isUSIndividual ? (
//                                   <div>
//                                     <Typography color="error">
//                                       {errors.isUSIndividual}
//                                     </Typography>
//                                   </div>
//                                 ) : (
//                                   ""
//                                 )} */}
//                               </FormControl>
//                               {/* <Typography className="my-auto">Yes</Typography>
//                             <Radio
//                               checked={values.isUSEntity}
//                               onChange={handleChange}
//                               // setPayload({ ...payload, isUSEntity: true })
//                               value={true}
//                               name="isUSEntity"
//                               inputProps={{ "aria-label": "Yes" }}
//                             />
//                             <Typography className="my-auto">No</Typography>
//                             <Radio
//                               checked={!values.isUSEntity}
//                               onChange={handleChange}
//                               value={false}
//                               name="isUSEntity"
//                               inputProps={{ "aria-label": "No" }}
//                             /> */}
//                             </div>
//                           </div>

//                           <div className="col-lg-3 col-12 col-md-6">
//                             <Typography className="d-flex w-100">
//                               Unique Identifier
//                               <span style={{ color: "red" }}>*</span>
                             
//                             </Typography>
//                             <Input
//                               style={{
//                                 border: " 1px solid #d9d9d9 ",
//                                 height: " 36px",
//                                 lineHeight: "36px ",
//                                 background: "#fff ",
//                                 fontSize: "13px",
//                                 color: " #000 ",
//                                 fontStyle: "normal",
//                                 borderRadius: "1px",
//                                 padding: " 0 10px ",
//                               }}
//                               className="w-100 input"
//                               name="uniqueIdentifier"
//                               id="outlined"
//                               placeholder="Enter Instructor Identifier"
//                               // onChange={handleChange}
//                               // onKeyUp={(e: any) => onNumberChange(e, values)}
//                               // onBlur={(e: any) => onUidBlur(e, values)}

//                               // error={Boolean(errors.uniqueIdentifier && touched.uniqueIdentifier)}
//                               // value={values.uniqueIdentifier}
//                             // inputProps={{maxLength :agentDetail.showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat.length}}
//                             />
//                             {/* {errors.uniqueIdentifier && touched.uniqueIdentifier ? <p className="error">{errors.uniqueIdentifier}</p> : <></>} */}
//                           </div>
//                         </div>
//                       </FormControl>
//                       </div>
   
//    </div>
//    </div>
//  </section>
//     </>)
// }






import React, { useState, useEffect } from "react";

export default function abc(){
    return(<>
    hiiii there  Passive_DC
    </>)
}