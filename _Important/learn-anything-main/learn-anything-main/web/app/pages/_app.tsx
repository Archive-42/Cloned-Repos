import { CSSReset, ThemeProvider } from "@chakra-ui/core"
import LoginForm from "app/auth/components/LoginForm"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import "app/styles/index.css"
import { AppProps, ErrorComponent, Link, useRouter } from "blitz"
import React, { Suspense } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"

const NavItem = (props: { title: string; url: string }) => {
  return (
    <li className="mx-2">
      <a className="text-gray-800" href={props.url}>
        {props.title}
      </a>
    </li>
  )
}

const NavBar = () => {
  const router = useRouter()
  return (
    <nav className="flex">
      <ul className="flex">
        {/* TODO: add icon */}
        {router.pathname !== "/" && <NavItem title={"Home"} url={"/"} />}
      </ul>
      <ul>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </ul>
    </nav>
  )
}

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <li
          className="absolute right-0"
          onClick={async () => {
            await logout()
          }}
        >
          Logout
        </li>
      </>
    )
  } else {
    return (
      <li className="float-right">
        <Link href="/signup">
          <a className="mx-2">Sign Up</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
    )
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  console.log(Component, "comp")

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      {getLayout(
        <ThemeProvider>
          <CSSReset />
          <NavBar />
          {/* TODO: why suspense? */}
          {/* <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense> */}
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </ErrorBoundary>
  )
}

App.getInitialProps = async (ctx) => {
  return {
    route: ctx.router.route,
  }
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error?.name === "AuthenticationError") {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error?.name === "AuthorizationError") {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
