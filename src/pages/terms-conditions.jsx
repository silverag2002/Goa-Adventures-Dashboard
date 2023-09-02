import React, { useState, useRef, useEffect } from "react";
import { Box, useTheme, Grid, Button, Stack } from "@mui/material";
import { Link, Navigate, useLocation } from "react-router-dom";
import Header from "components/Header";
import JoditEditor from "jodit-react";
import Loader from "react-loader";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";

const TermsConditions = () => {
  const location = useLocation();
  const [termsConditions, setTermsConditions] = useState("");
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  const editor = useRef();
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    setLoaded(false);
    axiosInstance
      .get(URLConstants.terms())
      .then((response) => {
        setLoaded(true);
        console.log("Response form countries", response);
        setTermsConditions(response.terms_conditions);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }, [reloadPage]);

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const privaacyPolicyHandler = (content) => {
    console.log(" handleEditorChang ", content);
    console.log("Testing acii code", content);
    setTermsConditions(content);
  };

  function handleSubmit() {
    console.log("Inside handle sibmit", termsConditions);
    axiosInstance
      .put(URLConstants.terms(), { terms_conditions: termsConditions })
      .then((response) => {
        setLoaded(true);
        console.log("Response form privacy", response);
        // setPrivacyPolicy(response);
        setReloadPage(!reloadPage);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Terms & Conditions"
        subtitle="Add your website terms and conditions"
      />
      <Grid item xs={12} md={12} pt="1rem">
        <Box>
          <JoditEditor
            height={200}
            name="term-conditions"
            className="text-black"
            // config={{ theme: "dark" }}
            getSunEditorInstance={getSunEditorInstance}
            value={termsConditions}
            onChange={privaacyPolicyHandler}
            setContents={termsConditions}
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
          Add Terms & Conditions
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

export default TermsConditions;
