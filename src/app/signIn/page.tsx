'use client';

import { useState } from 'react';
import { Typography, Input, Button } from '@material-tailwind/react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  


  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await signIn('credentials', {
      redirect: false,
      name: department,
      password: password,
    });

    if (res?.ok) {      
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <section className="absolute top-0 right-0 left-0 bottom-0 grid text-center items-center p-8">
      <aside className="absolute right-0 -top-14 rounded-md border p-2 text-left text-xs md:text-sm">
        <h2 className="text-center">Test</h2>
        <p>Department: Zaspa</p>
        <p>Password: password</p>
      </aside>

      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left" id="form-sign">
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
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: 'hidden',
              }} crossOrigin={undefined}            />
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
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? 'text' : 'password'}
              icon={<i className="absolute right-0 top-2.5 cursor-pointer" onClick={togglePasswordVisiblity}>
                {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
              </i>} crossOrigin={undefined}            />
          </div>
          <Button color="gray" size="lg" className="p-4" fullWidth type="submit">
            Sign In
          </Button>
        </form>
        {error && <p className="p-2 font-bold text-red-600">{error}</p>}
      </div>
    </section>
  );
};

export default SignIn;
