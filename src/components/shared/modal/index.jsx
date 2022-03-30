import { Button } from "@mui/material";
import { useState } from "react";
import "./index.css";

export default function Modal({ modal }) {
  const [userHasClicked, setUserHasClicked] = useState(false);

  return modal?.show ? (
    <div id="modal">
      <div id="modal-items">
        <h2>{modal?.title}</h2>
        <p>{modal?.description}</p>
        <Button
          disabled={userHasClicked}
          variant="contained"
          color="primary"
          onClick={() => {
            setUserHasClicked(true);
            modal?.onOkClick();
          }}
        >
          Vote
        </Button>
        <Button
          disabled={userHasClicked}
          onClick={() => modal?.onCancelClick()}
        >
          Cancel
        </Button>
      </div>
    </div>
  ) : null;
}
