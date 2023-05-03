import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import styles from './main-navigation.module.css'
import BurgerIcon from 'components/icons/burger-icon'

const MainNavigation = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const logoutHandler = () => {
    signOut()
  }

  return (
    <header className="container">
      <div className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>Partage</div>
        </Link>

        <nav className={styles.nav}>
          <div className={styles.nav__icon}>
            <BurgerIcon />
          </div>

          <ul className={styles.nav__menu}>
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
      </div>
    </header>
  )
}

export default MainNavigation
