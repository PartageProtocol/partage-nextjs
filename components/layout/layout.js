import { Fragment, useContext } from 'react'

import MainNavigation from './main-navigation'
import Notification from '../ui/notification'
import NotificationContext from '../../store/notification-context'
import Footer from './footer'

function Layout(props) {
  const notificationCtx = useContext(NotificationContext)

  const activeNotification = notificationCtx.notification

  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <Footer />
    </Fragment>
  )
}

export default Layout
