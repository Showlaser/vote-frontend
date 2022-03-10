import { Card, CardMedia, List, ListItem } from "@mui/material";

export default function PlaylistOverview({ voteablePlaylistCollection }) {
  console.log(voteablePlaylistCollection);
  return (
    <List>
      {voteablePlaylistCollection?.map((playlist) => (
        <ListItem>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={playlist?.playlistImageUrl}
              alt="green iguana"
            />
          </Card>
        </ListItem>
      ))}
    </List>
  );
}
