import { LoginForm } from "app/auth/components/LoginForm"
import Layout from "app/layouts/Layout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm onSuccess={() => router.push("/")} />
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
