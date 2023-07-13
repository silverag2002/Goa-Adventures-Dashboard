import React from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  useTheme,
  Stack,
  DatePicker,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const CreateBooking = () => {
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  return (
    <Box sx={{ flexGrow: 1, margin: "1.5rem 2.5rem" }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="customer_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="customer_name"
                    label="Select Customer"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    {...field}
                  >
                    <MenuItem key="" value="Ajit Sharma">
                      Ajit Sharma
                    </MenuItem>
                    <MenuItem key="" value="">
                      Ankit Gupta
                    </MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="destination_location"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="location"
                    label="Destination"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    {...field}
                  >
                    <MenuItem key="" value="">
                      Goa
                    </MenuItem>
                    <MenuItem key="" value="">
                      Mumbai
                    </MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="category"
                    label="Category"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    {...field}
                  >
                    <MenuItem key="" value="">
                      Tour
                    </MenuItem>
                    <MenuItem key="" value="">
                      Activity
                    </MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="sub-category"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="sub-category"
                    label="Sub Category"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  >
                    <MenuItem key="" value="">
                      Scuba Diving
                    </MenuItem>
                    <MenuItem key="" value="">
                      Honeymoon Tour
                    </MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    id="productName"
                    label="Product Name"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  >
                    <MenuItem key="" value="">
                      Scuba Diving
                    </MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="total_seat"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="total_seat"
                    label="Total Seat"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="total_amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="total_amount"
                    label="Total Amount"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="deposit_amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="deposit_amount"
                    label="Deposit Amount"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="pending_amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="pending_amount"
                    label="Pending Amount"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="start_date"
                    label="Start Date"
                    type="date"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="end_date"
                    label="End Date"
                    type="date"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="reporting_time"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="reporting_time"
                    label="Reporting Time"
                    variant="filled"
                    type="time"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Controller
                name="meeting_point"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="meeting_point"
                    label="Meeting Point"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
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
          >
            Book
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
      </form>
    </Box>
  );
};

export default CreateBooking;
