import { Button, FormGroup, Grid, TextField } from "@mui/material";
import { stringIsEmpty } from "services/shared/general";

export default function Join({ onJoin }) {
  const params = new URLSearchParams(window.location.search);
  let joinCodeFromUrl = null;
  let accessCodeFromUrl = null;

  params.forEach((value, key) => {
    if (key === "join-code") {
      joinCodeFromUrl = value;
    }
    if (key === "access-code") {
      accessCodeFromUrl = value;
    }
  });

  if (!stringIsEmpty(joinCodeFromUrl) && !stringIsEmpty(accessCodeFromUrl)) {
    onJoin(joinCodeFromUrl, accessCodeFromUrl);
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "70vh" }}
    >
      <h2>Enter join code</h2>
      <FormGroup>
        <TextField
          id="join-code"
          placeholder="Join code"
          defaultValue={joinCodeFromUrl}
        />
        <br />
        <TextField
          id="access-code"
          placeholder="Access code"
          defaultValue={accessCodeFromUrl}
        />
        <br />
        <Button
          onClick={() =>
            onJoin(
              document.getElementById("join-code").value,
              document.getElementById("access-code").value
            )
          }
        >
          Enter
        </Button>
      </FormGroup>
    </Grid>
  );
}
