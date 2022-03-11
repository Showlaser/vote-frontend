import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function PlaylistCard({ playlist, onVoteButtonClick }) {
  return (
    <Card style={{ minWidth: "100%" }}>
      <CardMedia
        component="img"
        image={playlist?.playlistImageUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography>{playlist?.playlistName}</Typography>
        <Accordion style={{ marginTop: "15px" }} className="shadow">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Songs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {playlist?.songsInPlaylist?.map((song) => (
                <ListItem key={song.uuid}>
                  <ListItemAvatar>
                    <Avatar alt="avatar" src={song?.songImageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={song?.songName}
                    secondary={song?.artistName}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ marginRight: "5px" }}>{playlist.votes.length}</span>
          <ThumbUpIcon />
        </div>
        <br />
        <Button onClick={() => onVoteButtonClick(playlist)} fullWidth>
          Vote
        </Button>
      </CardContent>
    </Card>
  );
}
