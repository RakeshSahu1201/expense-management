import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL_PROD || import.meta.env.VITE_SERVER_URL_DEV;

export default function DashBoard() {
  const monthly_tiffin_init = {
    month: moment().format("MMMM"),
    year: moment().format("YYYY"),
    total_tiffin_count: 0,
    total_tiffin_price: 0,
    per_tiffin_price: 0,
  };

  const [monthly_tiffin, setMonthly_tiffin] = useState(monthly_tiffin_init);
  const [isActive, setIsActive] = useState(false);

  const handleApplyMonthlyTiffinClick = async () => {
    const response = await axios.post(`${SERVER_URL}/monthly-tiffin`, {
      monthly_tiffin,
    });

    console.trace(response);
    if (response.data.error) {
      console.trace(response.data.error);
      return;
    }
    setMonthly_tiffin(response.data.result);
    localStorage.setItem("monthly_id", response.data.result._id);
    setIsActive(true);
  };

  const getCurrentMonthlyTiffinDetails = async () => {
    const monthly_tiffin_id = localStorage.getItem("monthly_id");
    const response = await axios.get(
      `${SERVER_URL}/monthly-tiffin/${monthly_tiffin_id}`
    );
    if (response.data.error) {
      console.trace("error : ", response.data.error);
      return;
    }
    if (!response.data.result) return;
    setMonthly_tiffin(response.data.result);
    setIsActive(true);
  };

  useEffect(() => {
    getCurrentMonthlyTiffinDetails();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs="auto">
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div">
                    Tiffin Manage
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Month : <strong>{monthly_tiffin.month}</strong>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Total Count :{" "}
                    <strong>{monthly_tiffin.total_tiffin_count}</strong>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Total Price :{" "}
                    <strong>{monthly_tiffin.total_tiffin_price}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: <strong>{monthly_tiffin._id}</strong>
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleApplyMonthlyTiffinClick}
                    disabled={isActive}
                  >
                    {isActive ? "Activated" : "Activate"}
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  <TextField
                    label="Set-Price"
                    id="outlined-size-small"
                    size="small"
                    value={monthly_tiffin.per_tiffin_price}
                    onChange={(e) =>
                      setMonthly_tiffin({
                        ...monthly_tiffin,
                        per_tiffin_price: e.target.value,
                      })
                    }
                    type="number"
                    sx={{ width: 80, marginLeft: 5 }}
                    variant="standard"
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
