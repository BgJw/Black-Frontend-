'use client'

import { useState } from 'react'
import { Typography, Input, Button, Spinner } from '@material-tailwind/react'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const SignIn = () => {
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)
    setLoading(true)

    const res = await signIn('credentials', {
      redirect: false,
      name: department,
      password: password,
      callbackUrl: '/'
    })

    if (res?.ok) {
      setLoading(false)
      router.push('/')
    } else {
      setLoading(false)
      setError('Invalid credentials')
    }
  }

  return (
    <div className="relative h-screen">
      <aside className="absolute top-4 left-4 rounded-md border p-2 text-xs md:text-sm bg-slate-100 shadow">
        <h2 className="text-center font-bold mb-1">Test login</h2>
        <p>Department: <strong>Zaspa</strong></p>
        <p>Password: <strong>password</strong></p>
      </aside>

      <div className="flex items-center justify-center h-full w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white shadow-md rounded-lg p-6"
        >
          <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
            Sign In
          </Typography>

          <div className="mb-6">
            <label htmlFor="department">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Department
              </Typography>
            </label>
            <Input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              id="department"
              color="gray"
              size="lg"
              type="text"
              name="department"
              placeholder="Department"
              labelProps={{ className: 'hidden' }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              crossOrigin={undefined}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Password
              </Typography>
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              placeholder="********"
              labelProps={{ className: 'hidden' }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? 'text' : 'password'}
              icon={
                <i className="absolute right-0 top-2.5 cursor-pointer" onClick={togglePasswordVisiblity}>
                  {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                </i>
              }
              crossOrigin={undefined}
            />
          </div>

          <Button
            color="gray"
            size="lg"
            className="p-4 flex items-center justify-center h-12"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Sign In'}
          </Button>

          {error && <p className="mt-4 font-bold text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default SignIn
