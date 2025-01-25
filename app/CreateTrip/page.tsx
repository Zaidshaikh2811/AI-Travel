
import React, { useEffect } from 'react'

import NewTrip from './NEWTRIP'
import { Metadata } from 'next'



export const metadata: Metadata = {
    title: 'Create New Trip | AI Trip Planner',
    description: 'Plan your perfect trip with AI assistance. Customize your itinerary, budget, and preferences.',
};

const page = () => {


    return (

        <NewTrip />

    )
}

export default page