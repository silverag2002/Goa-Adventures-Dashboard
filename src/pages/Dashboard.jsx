import React, { useContext, useEffect } from "react";
import Helmet from "components/Helmet/Helmet";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import EarningCard from "components/Dashboard/EarningCard";
import { ClientContext } from "../base/contexts/UserContext";
import { useClient } from "../base/hooks/useClient";

import { useNavigate } from "react-router-dom";
import Wrapper from "components/UI/Wrapper";

const Dashboard = () => {
  const theme = useTheme();

  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (client?.client?.role == undefined) {
      console.log("(!client?.client?.role", !client?.client?.role);
      navigate("/");
    }
  }, []);
  console.log("Cleint login ", client);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Helmet title="Dashboard">
      <Wrapper>
        <Header
          title="Dashboard"
          subtitle="Welcome to your dashboard"
          buttonText="Download Report"
          icon={<DownloadOutlined sx={{ mr: "10px" }} />}
        />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </Helmet>
  );
};

export default Dashboard;
