"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        router.push('/');
      }
    }, [router]);

    return <Component {...props} />;
  };
}
