import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

const GoogleTranslate = () => {
  const [translate, setTranslate] = useState(false);
  function getIsoCodes(array: any): string {
    return array?.map((obj: { isoCode: any }) => obj.isoCode).join(",");
  }
  const allLangData = useSelector(
    (state: any) => state.GetAllLanguageReducer?.GetAllLanguageData
  );
  var languageList = getIsoCodes(allLangData);
  const googleTranslateElementInit = () => {
    console.log(allLangData, "allLangData");
    languageList = getIsoCodes(allLangData);
    const isoCode = allLangData && allLangData[0] && allLangData[0].isoCode;
    return new window.google.translate.TranslateElement(
      {
        pageLanguage: isoCode,
        includedLanguages: languageList,
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    if (allLangData?.length) {
      languageList = getIsoCodes(allLangData);
    }
    let temp = document.getElementById("googleApiScript");
    if (temp == null) {
      let addScript: any = document.createElement("script");
      addScript?.setAttribute("id", "googleApiScript");
      addScript?.setAttribute(
        "src",
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      console.log(document.getElementById("googleApiScript"), "script tag");
      document.body.appendChild(addScript);
    }
  }, []);

  useEffect(() => {
    if (allLangData?.length) {
      languageList = getIsoCodes(allLangData);
    }
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, [allLangData]);

  return (
    <>
      {/* <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" id="google_translate_element"></script>  */}
      <div id="google_translate_element"></div>
    </>
  );
};

export default GoogleTranslate;
