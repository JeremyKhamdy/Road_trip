import axios from "axios";
import qs from "qs";

const url_details = "http://localhost:9901/drink"

export const getAll = async () => {
    return await axios
        .get(url_details)
        .catch((err) => {
            console.log(err);
        });
}

export const getDrinksDetails = async (destinations: string, rating: number = 0, types: any = [], priceMin: number = 0, priceMax = 4) => {
    return await axios
        .get(url_details, {
            params: {
                city: destinations.toString(), rating: rating, types: types, priceMin: priceMin,
                priceMax: priceMax
            },
            paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'})
        })
        .catch((err) => {
            console.log(err);
        });
}
