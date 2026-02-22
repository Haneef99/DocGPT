import { UserButton } from "@clerk/clerk-react";

import './Header.css';

const Header = () => {
    return (
      <div className="container">
        <h1>DocGPT</h1>
        <UserButton showName={true} />
      </div>
    );
}

export default Header;