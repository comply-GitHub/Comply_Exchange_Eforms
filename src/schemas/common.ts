import * as Yup from "yup";

function isAlphaNumeric(str:string) {
    let code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  };

export const DisregardedEntitySchema = Yup.object().shape({
    chapter4StatusId:Yup.number().notOneOf([0,-1],"Please select valid chapter 4 option"),
    // giin: Yup.string().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
    //     if (chapter4StatusId >1) {
    //       return schema.length(19,"Please enter a valid GIIN").required("Please enter a valid GIIN");
    //     } else {
    //       return schema;
    //     }
    //   }),
      giin:Yup.string().nullable()
      .test({
        name:"length",
        message:"GIIN lenth should be 16 character",
        test:(value,context)=>{
            let { chapter4StatusId}=context.parent;
            if(chapter4StatusId>1){              
              return value?.length==16
            }
            else
            return true
        }
      })
      .test({
        name:"format",
        message:"GIIN format should be valid",
        test:(value,context)=>{
            let { chapter4StatusId}=context.parent;
            if(chapter4StatusId>1 ){
                if(!value){
                    return false;
                }
                let case1=isAlphaNumeric(value?.slice(0,6));
                if(!case1){
                    console.log("case1")
                    return false;
                }
                let case2=isAlphaNumeric(value?.slice(6,11));
                if(!case2){
                    console.log("case2")
                    return false;
                }
                let case3Data=["LE","SL","ME","BR"];
                let case3=case3Data.includes(value?.slice(11,13));
                if(!case3){
                    console.log("case3")
                    return false;
                }

                let case4=Number.parseInt(value?.slice(13,16));
                if(Number.isNaN(case4)){
                    console.log("case4")
                    return false;
                }

                return true

            }
            else
            return true
        }
      })
  });