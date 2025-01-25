import axios from "axios"

const BASE_URL="https://maps.googleapis.com/maps/api/place/photo?parameters"



const config={
    headers:{
        'Content-Type':'application/json',
        "X-Goog-Api-Key":process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask":[   
            'places.photos',
           "places.displayName",
        "places.id"
    ]
        ,
    }
}

export const GetPlaceDetails=(data:any)=>axios.post(BASE_URL,data,config)