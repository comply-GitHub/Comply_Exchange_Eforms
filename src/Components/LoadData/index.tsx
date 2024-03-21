import React from 'react'
import GlobalValues from '../../Utils/constVals';

const LoadData = () => {

    // when page refreshes helps in reloading data
    const AccountHolderID: number = (() => { return Number.parseInt(JSON.parse(localStorage.getItem("accountHolderDetails") || "{}")?.id ?? 17) })()
    console.log(AccountHolderID, "Account holder id");
    GlobalValues.AccountHolderBasicDetailsId = AccountHolderID
    return (
        <></>
    )
}

export default LoadData