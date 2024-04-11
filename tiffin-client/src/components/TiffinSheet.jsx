import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chip, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TiffinDetails from "./TiffinDetails";
import axios from "axios";
import DatePicker from "react-multi-date-picker";

const SERVER_URL = import.meta.env.VITE_SERVER_URL_PROD || import.meta.env.VITE_SERVER_URL_DEV;

export default function TiffinSheet(props) {
  const monthly_id = localStorage.getItem("monthly_id");
  const tiffin_init = {
    count: 0,
    comment: "",
    date: new Date(),
    price: 0,
    monthly_tiffin_id: monthly_id,
  };

  const [tiffinList, setTiffinList] = useState([]);
  const [tiffin, setTiffin] = useState(tiffin_init);

  const handleAddTiffin = async () => {
    const create_tiffin = {
      ...tiffin,
      date: moment(tiffin.date).format("MMMM D YYYY dddd"),
    };

    console.trace(create_tiffin);

    const response = await axios.post(`${SERVER_URL}/tiffin`, {
      tiffin,
    });

    setTiffinList([response.data.result, ...tiffinList]);
    setTiffin(tiffin_init);
  };

  const getTiffinListByMonthlyId = async (timming) => {
    console.trace(`${SERVER_URL}/tiffin/${timming}/${monthly_id}`);
    const response = await axios.get(
      `${SERVER_URL}/tiffin/${timming}/${monthly_id}`
    );

    setTiffinList(response.data.result);
    console.trace(response);
  };

  useEffect(() => {
    getTiffinListByMonthlyId(props.day_time);
    setTiffin({ ...tiffin, day_time: props.day_time?.toUpperCase() });
  }, [props.day_time]);

  return (
    <Box sx={{ flexGrow: 1, mt: 2, mr: 5 }}>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            id="outlined-multiline-flexible"
            label="Comment (Optional)"
            multiline
            maxRows={4}
            size="small"
            value={tiffin.comment}
            onChange={(e) => setTiffin({ ...tiffin, comment: e.target.value })}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-number"
            label="Tiffin-Counter"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            value={tiffin.count}
            onChange={(e) => setTiffin({ ...tiffin, count: e.target.value })}
          />
        </Grid>
        <Grid item>
          <DatePicker
            value={tiffin.date || new Date()}
            onChange={(selectedDate) => {
              setTiffin({ ...tiffin, date: selectedDate.toDate() });
            }}
            format={"MMMM DD YYYY dddd"}
            buttons={false}
            style={{
              borderRadius: " 5px",
              border: "1px #0c8af8 solid",
              padding: "4px 12px",
              backgroundColor: "white",
              height: "39px",
              boxShadow: "0 0 2px #0074d9",
            }}
            // className="rmdp-mobile"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleAddTiffin}>
            Add
          </Button>
        </Grid>
      </Grid>
      <TiffinDetails tiffins={tiffinList} />
      <Divider sx={{ my: 2 }}>
        <Chip label="History" size="small" />
      </Divider>

      <TableContainer component={Paper}>
        <Table
          sx={{ overflow: "scrollY" }}
          stickyHeader
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Comment</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tiffinList.map((tfn) => (
              <TableRow
                key={tfn._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment(tfn.date).format("MMMM D YYYY dddd")}
                </TableCell>
                <TableCell align="right">{tfn.count}</TableCell>
                <TableCell align="right">{tfn.comment}</TableCell>
                <TableCell align="right">{tfn.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
