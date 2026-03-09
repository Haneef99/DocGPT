import { UserButton } from "@clerk/clerk-react";

import './Header.css';
import { Button } from "@mui/joy";
import { useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ReleaseNotesModal from "./ReleaseNotesModal";

const Header = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className="container">
        <div className="left-container">
          <h1>DocGPT</h1>
          <Button
            variant="plain"
            color="neutral"
            startDecorator={<AutoAwesomeIcon sx={{ color: "#8b5cf6" }} />}
            onClick={() => setIsModalOpen(true)}
            sx={{ fontWeight: "md" }}
          >
            Release notes
          </Button>
        </div>

        <UserButton showName={true} />
        <ReleaseNotesModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
}

export default Header;