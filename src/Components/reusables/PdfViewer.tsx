import React, { useState } from "react";
// import PDFReader from 'react-typescript-pdf-reader'
// import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router";
import { Viewer,Worker } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
const ExamplePDFViewer = (props: any) => {
  const navigate = useNavigate();
  const { pdfLink } = props;
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${3.4.120☻}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: any) {
    setPageNumber(1);
  }
  return (
    <>
      {" "}
      {/* <Document file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}> */}
        {/* <Page pageNumber={pageNumber} />
      </Document> */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
      <Viewer fileUrl="https://www.africau.edu/images/default/sample.pdf" />
      </Worker>
      <button onClick={()=>navigate(-1)}>Exit</button>
    </>
  );
};

export default ExamplePDFViewer;
