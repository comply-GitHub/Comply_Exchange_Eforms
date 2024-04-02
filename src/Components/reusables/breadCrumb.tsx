
import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getBreadCrums } from "../../Redux/Actions";
import checksolid from "../../assets/img/check-solid.png";
import { Divider, Paper, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/store";


export default function BreadCrumbComponent(props: any): any {
  const { breadCrumbCode, formName } = props;
  const dispatch = useDispatch<AppDispatch>();

  const stepNumbers = ["I", "II", "III", "IV", "V"];

  const [userType, setUserType] = useState("GEN");

  const [expanded, setExpanded] = React.useState<string | false>("");

  const [breadCrumb, setBreadCrumb] = useState([]);
  const [breadCrumbDisplay, setBreadCrumbDisplay] = useState([]);
  const getBreadCrumsData = useSelector(
    (state: any) => state.getBreadCrumsReducer.getBreadCrumsData
  );

  useEffect(() => {
    dispatch(getBreadCrums(formName, (data: any) => setBreadCrumb(data)));
  }, []);
  useEffect(() => {
    groupDataByBreadcrumbPart(breadCrumb);
  }, [breadCrumb]);

  function groupDataByBreadcrumbPart(data: any) {
    const groupedData: any = {};
    if (userType === "GEN") {
      data = data.filter((x: any) => !x?.title?.toLowerCase()?.includes("self-cert") && !x?.title?.toLowerCase()?.includes("documentation"))
    }
    data.forEach((item: any) => {
      const breadcrumbpart = item.breadcrumbpart.trim();

      if (!groupedData[breadcrumbpart]) {
        groupedData[breadcrumbpart] = [];
      }

      groupedData[breadcrumbpart].push(item);
    });


    setBreadCrumbDisplay(groupedData);
  }

  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (<div
    style={{ padding: "8px 0px", height: "100%" }}
  >
    <Paper
      style={{ padding: "0px 0px 0px 18px", height: "100%" }}
      className="bg-none"
    >
      <div style={{ background: "#ffffff33", height: "100%" }}>
        <div className="stepper">
          {Object.entries(breadCrumbDisplay)?.map((item: any, index: number) => {
            return (
              <Accordion
                key={index}
                expanded={expanded === item[0]}
                onChange={handleChangestatus(item[0])}
              >

                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className="accordian-header"
                >
                  <Typography
                    className="text-uppercase d-flex active"
                    sx={{
                      width: "100%",
                      flexShrink: 0,
                      fontSize: "20px",
                    }}
                  >
                    {/* {item[0]} */}
                    {
                      "Step " + stepNumbers[index]
                    }
                    {item[1][item[1].length - 1].order < breadCrumbCode ? (<img
                      className="steper-check-icon-solid my-auto mx-2"
                      src={checksolid}
                    />) : ""}
                  </Typography>
                  { }
                </AccordionSummary>

                <AccordionDetails>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "20px",
                      backgroundColor: "#f0f0f0",
                      overflow: "auto",
                    }}
                  >
                    <ul>
                      {item[1].map((items: any, i: any) => {
                        return (<li key={i} className={items.order < breadCrumbCode ? "active" : ""}>
                          {" "}
                          <label className="my-auto">
                            {items?.title}{" "}
                          </label>
                        </li>)
                      })}
                    </ul>
                  </Paper>
                </AccordionDetails>
              </Accordion>

            );
          })}
        </div>
      </div>
    </Paper>
  </div>)

}