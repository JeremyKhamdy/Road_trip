import axios from "axios";
import qs from "qs";

const url = "http://localhost:9904/sleep"
export const getAll = async () => {
    return await axios
        .get(url)
        .catch((err) => {
            console.log(err);
        })
        ;
}

export const getSleepDetails = async (destinations: string, rating: number = 0, types: any = [], priceMin: number = 0, priceMax = 4) => {
    console.log(types);
    return await axios
        .get(url, {
            params: {
                city: destinations.toString(),
                rating: rating,
                types: types,
                priceMin: priceMin,
                priceMax: priceMax
            },
            paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'})
        })
        .catch((err) => {
            console.log(err);
        })
        ;
}

export const getDetail = async (place_id: string) => {
    return await axios
        .get(url, {params: {place_id: place_id.toString()}})
        .catch((err) => {
            console.log(err);
        });
}