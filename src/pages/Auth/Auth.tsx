import { useState } from 'react'
import { SignIn } from '../../components/SignIn'
import { SignUp } from '../../components/SignUp'
import { Quote } from '../../components/Quote'

export const Auth = () => {
  const [isSignin, setIsSignIn] = useState<boolean>(true)

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 min-h-screen">
      <div className="col-span-1 lg:col-span-2 flex items-center justify-center auth p-4">
        {isSignin ? <SignIn setIsSignIn={setIsSignIn} /> : <SignUp setIsSignIn={setIsSignIn} />}
      </div>
      <div className="hidden lg:block lg:col-span-1 quote p-6">
        <Quote />
      </div>
    </div>
  )
}
