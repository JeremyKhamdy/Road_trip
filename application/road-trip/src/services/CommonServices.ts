import axios from "axios";

const url_detail = "http://localhost:9901/oneDrink"

export const getDetail = async (place_id: string) => {
    return await axios
        .get(url_detail, {params: {placeId: place_id.toString()}})
        .catch((err) => {
            console.log(err);
        });
}