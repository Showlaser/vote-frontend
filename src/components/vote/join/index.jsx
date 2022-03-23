import { Button, FormGroup, Grid, TextField } from "@mui/material";

export default function Join({ onJoin }) {
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
          defaultValue="noh3a3"
          placeholder="Join code"
        />
        <br />
        <TextField
          id="access-code"
          defaultValue="m39l"
          placeholder="Access code"
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
