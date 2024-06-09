'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component: React.ComponentType) {
    return function WithAuth(props: any) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/signIn');
            } else {
                setIsAuthenticated(true);
            }
        }, [router]);

        if (!isAuthenticated) {
            return 'loading';
        }

        return <Component {...props} />;
    }
}
