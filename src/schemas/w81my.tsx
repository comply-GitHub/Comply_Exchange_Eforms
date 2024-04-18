import * as Yup from "yup";

export const TaxPurposeSchemaW81Chapter3 = ()=>{
    return Yup.object().shape({
        chapter3StatusId: Yup.number().notOneOf([0], 'Please select a valid federal tax classification'),
        businessName:Yup.string().when("chapter3StatusId",{
            is : (val:any) => val!==0,
            then:()=> Yup.string().required("Business Name is required"),
            otherwise:()=>Yup.string().notRequired()
        }),
        countryOfIncorporationId:Yup.string().when("chapter3StatusId",{
            is : (val:any) => val!==0,
            then:()=> Yup.string().required("Please select Country"),
            otherwise:()=>Yup.string().notRequired()
        })
      });
}

export const TaxPurposeSchemaW81Chapter4 = ()=>{
    return Yup.object().shape({
        chapter4StatusId: Yup.number().notOneOf([0], 'Please select a valid federal tax classification'),
        
      });
}

export const US_TINSchema8IMY = () => {
    return Yup.object().shape({
      
  
      usTinTypeId: Yup.string().notOneOf(['0'], 'please select a valid value').when('$isRequired',{
        is:true,
        then: () => Yup.string().required('Selection is required when value is 0')
      }),
      
      notAvailable: Yup.boolean(),
      usTin:Yup.string().when("notAvailable" ,{
        is:true,
        then:() => Yup.string().notRequired(),
        otherwise:() => Yup.string().required(),
      }),
      ReasionForForegionTIN_NotAvailable:Yup.string().when("tinisFTINNotLegallyRequired",{
        is:(tinisFTINNotLegallyRequired: any) => tinisFTINNotLegallyRequired == "NO",
        then:() => Yup.string().required('required'),
        otherwise : () => Yup.string().notRequired()
      }),
      tinisFTINNotLegallyRequired: Yup.string(),
      isFTINNotLegallyRequired: Yup.boolean(),
     
      foreignTINCountry:Yup.string().when(['isFTINNotLegallyRequired','tinisFTINNotLegallyRequired'], {
        is:(isFTINNotLegallyRequired: boolean, tinisFTINNotLegallyRequired: any) => !isFTINNotLegallyRequired && tinisFTINNotLegallyRequired !== "NO",
        then: ()=> Yup.string().required("Foreign TIN is required"),
        otherwise: ()=>Yup.string().notRequired()
      }),
      
      foreignTIN:Yup.string().when(['isFTINNotLegallyRequired','foreignTINCountry','tinisFTINNotLegallyRequired'], {
        is:(isFTINNotLegallyRequired: boolean, foreignTINCountry: any, tinisFTINNotLegallyRequired:any) => !isFTINNotLegallyRequired && foreignTINCountry !== "0" && tinisFTINNotLegallyRequired !== "NO",
        then: ()=> Yup.string().required("Foreign TIN is required"),
        otherwise: ()=>Yup.string().notRequired()
      }),
      
      
      isNotLegallyFTIN: Yup.string().when("isFTINNotLegallyRequired", {
        is: true,
        then: () => Yup.string().required("required"),
        otherwise : () => Yup.string().notRequired(),
      }),
  
  
    });
  };


  const itemSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    familyName: Yup.string().required('Family Name is required'),
    
  });
  
  export const statementSchema8IMY = () => {
    return Yup.object().shape({
        previouslySubmittedAllocationStatement: Yup.string().required("required"),
        items: Yup.array().of(itemSchema),
      
    });
  };


  export const certificateSchema8IMY = () => {
    return Yup.object().shape({
        cerExaminedtheInfo:Yup.boolean().oneOf([true], "Please mark the checkbox"),
        cerDistributeorMakepayment: Yup.boolean().oneOf([true],"Please mark the checkbox"),
        cerSubitformwithin30Days:Yup.boolean().oneOf([true], "Please mark the checkbox"),
        cerConfirmReceivedElecForm: Yup.boolean().oneOf([true],"Please mark the checkbox"),
      
    });
  };

  export const partCertiSchema8IMY = () => {
    return Yup.object().shape({
  
      signedBy: Yup.string().required("Please enter name of the person signing the form"),
      confirmationCode: Yup.string()
        .required("Please enter code"),
      
      date: Yup.date(),
      isAgreeWithDeclaration: Yup.boolean().oneOf(
        [true],
        "Please mark the checkbox"
      ),
    });
  };