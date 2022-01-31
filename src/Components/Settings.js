import React, { useState, useContext } from "react";

import {
  Grid,
  Typography,
  withStyles,
  Tabs,
  Tab,
  Box,
  Container,
} from "@material-ui/core";
import Threshold from "./subsettings/Threshold";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    "&$selected": {
      color: "#F72A1F",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#F72A1F",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function Settings() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container>
        <Typography variant="h1" className="mB20">
          Settings
        </Typography>
        {/* <Grid item lg={12}>
          <AntTabs value={value} onChange={handleChange}>
            <AntTab label="Expected Value Threshold" />
            <AntTab label="IP Address" />
          </AntTabs>
          <div style={{ marginTop: "3%" }}>
            <TabPanel value={value} index={0}>
              <Threshold />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <IpAddressRegistration clientId={clientId} />
            </TabPanel>
          </div>
        </Grid> */}
      </Grid>
    </Container>
  );
}
