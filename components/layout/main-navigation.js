import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }

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
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">User Dashboard</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/connect-wallet">Connect Wallet</Link>
            </li>
          )}
          {session && (
            <li>
              <button onCLick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

