import axios from "axios";
import qs from "qs";

const url = "http://localhost:9903/enjoy"

export const getAll = async () => {
    return await axios
        .get(url)
        .catch((err) => {
            console.log(err);
        })
        ;
}

export const getEnjoyDetails = async (destinations: string, rating: number = 0, types: any = [], priceMin: number = 0, priceMax = 4, category: string = "") => {
    console.log(category);
    return await axios
        .get(url, {
            params: {
                category: category.toString(),
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