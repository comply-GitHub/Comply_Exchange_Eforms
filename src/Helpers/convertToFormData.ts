
export const convertToFormData=(payload:any)=>{
    const form_data = new FormData();
    let keys=Object.keys(payload);
    keys.forEach(element => {
        if(payload[element]!=null&&payload[element]!=undefined)
        form_data.append(element,payload[element])
    });
    return form_data;
}

export const convertToFormData_ArrayOfObject=(payload:any[])=>{    
    let form_data = new FormData();
    for (let index = 0; index < payload.length; index++) {
        const element = payload[index];
        let keys=Object.keys(element);     
        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            if(element[key]!=null && element[key]!=undefined){
                form_data.append(`[${index}].${key}`,element[key])
            }
        }
    }  
    return form_data;
}


export function isAlphaNumeric(str:string) {
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