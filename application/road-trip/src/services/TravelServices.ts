import axios from "axios";

const url = "http://localhost:9905/travel"

export const getAll = async () => {
    return await axios
        .get(url)
        .catch((err) => {
            console.log(err);
        })
        ;
}

export const getTravelDetails = async (origin: string, destination: string) => {
    return await axios
        .get(url, { params: { origin: origin.toString(), destination: destination.toString() } })
        .catch((err) => {
            console.log(err);
        })
        ;
}