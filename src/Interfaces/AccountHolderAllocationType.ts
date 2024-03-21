
export interface AccountHolderIncomeAllocationType{
    id:number;
    accountHolderBasicDetailId:number;
    agentId:number;
    formTypeId:number;
    formEntryId:number;
    incomeType:string;
    explaination:string;
    allocation:number;
    countryId:number|null;
}