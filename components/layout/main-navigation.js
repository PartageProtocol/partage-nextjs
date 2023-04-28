import Link from "next/link";

import classes from "./main-navigation.module.css";

import Button from "../ui/button";
import UserIcon from "../icons/user-icon";

function MainNavigation() {
  const signupLink = `/create-account`;

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Partage</div>
      </Link>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/nfts">Marketplace</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/connect-wallet">Connect Wallet</Link>
          </li>
          <div className={classes.actions}>
            <Button link={signupLink}>
              <span className={classes.icon}>
                <UserIcon />
              </span>
              <span>Sign Up</span>
            </Button>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
