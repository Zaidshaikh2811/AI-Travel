

import AllTripsServer from './AllTripsServer';
import { Suspense } from 'react';
import { LoadingSpinner } from './Loader';





const AllTrips = () => {


  return (
    <div className="container mx-auto px-4 py-8">


      <Suspense fallback={<LoadingSpinner />}>
        <AllTripsServer />
      </Suspense>


    </div>
  );
};

export default AllTrips;