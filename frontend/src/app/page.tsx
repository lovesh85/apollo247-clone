'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the specific doctor listing page
    router.replace('/specialties/general-physician-internal-medicine');
  }, [router]);

  // Render nothing or a loading indicator while redirecting
  return (
     <div className="flex justify-center items-center min-h-screen">
       <p>Loading...</p>
     </div>
   );
}
