import { Grid, List, ListItemText } from "@mui/material";
import LinearWithValueLabel from "components/shared/progress-with-label";
import { normalise } from "services/logic/math";

export default function VoteOverView({ voteState }) {
  const totalVotes = voteState?.voteablePlaylistCollection
    ?.map((p) => p?.votes?.length)
    .reduce((partialSum, a) => partialSum + a, 0);

  return (
    <Grid
      className="fade-up"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ marginTop: "25px" }}
    >
      <List style={{ width: "90%", maxWidth: "70vh" }}>
        {voteState?.voteablePlaylistCollection?.map((playlist) => {
          const value = normalise(playlist?.votes?.length, 0, totalVotes);
          return (
            <span key={playlist?.uuid}>
              <ListItemText primary={playlist?.playlistName} />
              <LinearWithValueLabel value={isNaN(value) ? 0 : value} />
            </span>
          );
        })}
      </List>
    </Grid>
  );
}
