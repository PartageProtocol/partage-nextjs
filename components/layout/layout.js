import { Fragment, useContext } from "react";

import MainNavigation from "./main-navigation";
import MainFooter from "./footer";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainNavigation />
      <>{props.children}</>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <MainFooter />
    </Fragment>
  );
}

export default Layout;
