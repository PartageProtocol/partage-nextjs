import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { Button } from 'components/form'
import styles from './auth.module.css'

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }

  return data
}

/*
function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        router.replace('/profile');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}
*/

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)

  const handleSwitchAuthMode = () => {
    setIsLogin((prevState) => !prevState)
  }

  const onSubmit = async (data) => {
    if (isLogin) {
      // log user in
      const result = await signIn('credentials', {
        redirect: false,
        ...data,
      })

      if (!result.error) {
        router.replace('/profile')
      }
    } else {
      try {
        // send request to create account
        const result = await createUser(data.email, data.password)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section className={styles.auth}>
      <div className={styles.auth__image}>
        <Image
          src="/partage.png"
          alt="Partage Logo"
          width={510}
          height={510}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className={styles.auth__panel}>
        <h1 className="h2">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <p className="subheading">
          Welcome! enter your details and start creating, collecting and selling
          NFTs.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
          <div className={styles.auth__form__group}>
            <input
              type="email"
              placeholder="Email Address"
              aria-label="Your email"
              {...register('email', {
                required: 'This is required',
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email is not correct',
                },
              })}
            />

            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'This is required',
              })}
            />
          </div>

          <Button
            label={isLogin ? 'Login' : 'Create Account'}
            className={styles.auth__form__button}
          />

          <Button
            variant="outline"
            type="button"
            onClick={handleSwitchAuthMode}
            label={
              isLogin ? 'Create new account' : 'Login with existing account'
            }
            className={styles.auth__form__button}
          />
        </form>
      </div>
    </section>
  )
}

export default Login
