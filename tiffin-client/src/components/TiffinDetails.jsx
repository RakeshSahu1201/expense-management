import { Chip, Divider } from "@mui/material";

const TiffinDetails = ({ tiffins }) => {
  const { totalTiffinCount, totalTiffinPrice } = tiffins.reduce(
    (acc, tiffin) => {
      // Accumulate tiffin_count
      acc.totalTiffinCount += tiffin.count;
      // Accumulate tiffin_price
      acc.totalTiffinPrice += tiffin.price;
      return acc;
    },
    { totalTiffinCount: 0, totalTiffinPrice: 0 }
  );

  return (
    <>
      <Divider sx={{ my: 2 }}>
        <Chip label="Tiffin-Detail" size="large" />
      </Divider>
      <h3>Tiffin Count : {totalTiffinCount}</h3>
      <h3>Total Tiffin Price : {totalTiffinPrice} </h3>
    </>
  );
};

export default TiffinDetails;
