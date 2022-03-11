import { Button } from "@mui/material";
import "./index.css";

export default function Modal({ modal }) {
  return modal?.show ? (
    <div id="modal">
      <div id="modal-items">
        <h2>{modal?.title}</h2>
        <p>{modal?.description}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => modal?.onOkClick()}
        >
          Vote
        </Button>
        <Button onClick={() => modal?.onCancelClick()}>Cancel</Button>
      </div>
    </div>
  ) : null;
}
