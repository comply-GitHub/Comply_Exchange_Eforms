interface GlobalConstantType{
    agentId:number,
    formTypeSelectionId: number,
    AccountHolderBasicDetailsId:number;
    basePageRoute:string;
}

const GlobalValues:GlobalConstantType={
    agentId:3,
    formTypeSelectionId: 1,
    AccountHolderBasicDetailsId:17,
    basePageRoute:'/login',   
}


export const FormTypeId={
    W9:1,
    BEN:2,
    BENE:3,
    W8ECI:4,
    W8EXP:6,
    F8233:8
};

export const FormTypeSelection={
    Individual:1,
    Entity:2
};


export default GlobalValues;