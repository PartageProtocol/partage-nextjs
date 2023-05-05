import { useRef, useContext } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import NotificationContext from 'store/notification-context'
import styles from './newsletter.module.css'

const Newsletter = () => {
  const emailInputRef = useRef()
  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong.')
        })
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter.',
          status: 'success',
        })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong.',
          status: 'error',
        })
      })
  }

  return (
    <section className="container section-y">
      <div className={styles.newsletter}>
        <div className={styles.newsletter__image}>
          <Image
            src="/partage.png"
            alt="Partage Logo"
            width={510}
            height={510}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className={styles.newsletter__content}>
          <h2 className="h3">Join Our Weekly Digest</h2>
          <p className="subheading">
            Get exclusive promotions & updates straight to your inbox.
          </p>

          <form
            onSubmit={registrationHandler}
            className={styles.newsletter__form}
          >
            <div className={styles.control}>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                aria-label="Your email"
                ref={emailInputRef}
              />
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
