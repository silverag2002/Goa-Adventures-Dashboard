import React, { useState, useRef } from "react";
import { Box, useTheme, Grid } from "@mui/material";
import Header from "components/Header";
import JoditEditor from "jodit-react";

const PrivacyPolicry = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const editor = useRef();

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const privaacyPolicyHandler = (content) => {
    console.log(" handleEditorChang ", content);
    console.log("Testing acii code", content);
    setPrivacyPolicy(content);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Privacy Policy" subtitle="" />
      <Grid item xs={12} md={12}>
        <Box>
          <JoditEditor
            height={200}
            name="privacy-policy"
            className="text-black"
            // config={{ theme: "dark" }}
            getSunEditorInstance={getSunEditorInstance}
            value={privacyPolicy}
            onChange={privaacyPolicyHandler}
            setContents={privacyPolicy}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default PrivacyPolicry;
