import { AuthClient } from "@dfinity/auth-client"
import React, { useEffect, useState } from "react"
import dfinityLogo from "./assets/dfinity.svg"

// Note: This is just a basic example to get you started
function Auth() {
  const [signedIn, setSignedIn] = useState<boolean>(false)
  const [principal, setPrincipal] = useState<string>("")
  const [client, setClient] = useState<any>()

  const initAuth = async () => {
    const client = await AuthClient.create()
    const isAuthenticated = await client.isAuthenticated()

    setClient(client)

    if (isAuthenticated) {
      const identity = client.getIdentity()
      const principal = identity.getPrincipal().toString()
      setSignedIn(true)
      window.localStorage.setItem("isLogin", "1")
      setPrincipal(principal)
    }
  }

  const signIn = async () => {
    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
          const identity = client.getIdentity()
          const principal = identity.getPrincipal().toString()
          resolve({ identity, principal })
        },
        onError: reject,
      })
    })
    setSignedIn(true)
    window.localStorage.setItem("isLogin", "1")
    setPrincipal(principal)
  }

  const signOut = async () => {
    await client.logout()
    setSignedIn(false)
    window.localStorage.setItem("isLogin", "0")
    setPrincipal("")
  }

  useEffect(() => {
    initAuth()
  }, [])

  return (
    <div className="auth-section">
      {!signedIn && client ? (
        <button onClick={signIn} className="auth-button">
          Sign in
          <img
            style={{ width: "33px", marginRight: "-1em", marginLeft: "0.7em" }}
            src={dfinityLogo}
          />
        </button>
      ) : null}

      {signedIn ? (
        <>
          <p className="w-44 pl-5 truncate">Signed in as: {principal}</p>
          <button onClick={signOut} className="auth-button">
            Sign out
          </button>
        </>
      ) : null}
    </div>
  )
}

export { Auth }
