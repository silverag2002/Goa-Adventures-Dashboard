import React, { useState, useRef } from "react";
import { Box, useTheme, Grid, Button, Stack } from "@mui/material";
import Header from "components/Header";
import JoditEditor from "jodit-react";
import Loader from "react-loader";

const PrivacyPolicry = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  const editor = useRef();

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const privaacyPolicyHandler = (content) => {
    console.log(" handleEditorChang ", content);
    console.log("Testing acii code", content);
    setPrivacyPolicy(content);
  };

  function handleSubmit() {
    console.log("Inside handle sibmit", privacyPolicy);
  }

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

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={4}
        sx={{ marginTop: "1rem" }}
      >
        <Button
          size="large"
          variant="contained"
          type="submit"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          Add Privacy Policy
        </Button>
        <Button
          size="large"
          variant="contained"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.neutral[600],
            fontWeight: "bold",
          }}
          href="/products"
        >
          Cancel
        </Button>
      </Stack>
      <div className="spinner">
        <Loader
          loaded={loaded}
          lines={13}
          length={10}
          width={5}
          radius={30}
          corners={1}
          rotate={0}
          direction={1}
          color="#000"
          speed={1}
          trail={60}
          shadow={false}
          hwaccel={false}
          className="spinner"
          zIndex={2e9}
          top="50%"
          left="50%"
          scale={1.0}
          loadedClassName="loadedContent"
        />
      </div>
    </Box>
  );
};

export default PrivacyPolicry;
