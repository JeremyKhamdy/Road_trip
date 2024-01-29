import fetch from 'node-fetch';

const API_KEY = 'AIzaSyCH6rkbjmVeUi9kR51c4eRVlqHv4ysCm3g';

const api = {
    autocompleteSearch: async (input, language): Promise<[]> => {
        const search = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&language=${language}&components=country:${language}&key=${API_KEY}`,
        );
        const search_data = await search.json();
        const data = search_data.predictions.map(async (v) => {
            const geocode = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?place_id=${v.place_id}&key=${API_KEY}`,
            );
            const geocode_data = await geocode.json();
            return {
                id: v.place_id,
                name: v.description,
                reference: v.reference,
                geometry: [geocode_data.results[0].geometry.location],
            };
        });
        return data;
    },
    sleepDetails: async (city, rating, types, priceMin, priceMax): Promise<any> => {
        let queryPrice = "";
        // if (priceMin >= priceMax) {
        //     queryPrice = `&minprice=${priceMin}`;
        // } else {
        //     queryPrice = `&minprice=${priceMin}&maxprice=${priceMax}`;
        // }

        const eat = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=category=lodging+${city}${queryPrice}&type=establishment&key=${API_KEY}`
        );
        const search_data = await eat.json();

        let steps = search_data.results
            .map((v) => ({
                business_status: v.business_status,
                formatted_address: v.formatted_address,
                geometry: v.geometry,
                icon: v.icon,
                icon_background_color: v.icon_background_color,
                icon_mask_base_uri: v.icon_mask_base_uri,
                name: v.name,
                opening_hours: v.opening_hours,
                photos: !!v.photos ? `https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&maxwidth=400&photo_reference=${v.photos[0].photo_reference}` : "",
                place_id: v.place_id,
                plus_code: v.plus_code,
                price_level: v.price_level,
                rating: v.rating,
                reference: v.reference,
                types: v.types,
                user_ratings_total: v.user_ratings_total
            }))
            .filter((value) => Object.keys(value).length !== 0);

        if (rating !== 0) {
            steps = steps.filter((value) => value.rating >= parseInt(rating))
        }

        if (types !== undefined && types.length > 0) {
            steps = steps.filter((value) => {
                if (Array.isArray(types)) {
                    return value.types.filter((element) => types.includes(element))
                } else {
                    return value.types.includes(types);
                }
            })
        }

        return steps;
    },
    sleepDetail: async (placeID): Promise<any> => {
        const eat = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${API_KEY}`
        );
        const search_data = await eat.json();
        console.log(search_data)

        const steps = search_data.result;
        for (let res of steps.photos) {
            res.photos = `https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&maxwidth=400&photo_reference=${res.photo_reference}`
        }
        return steps

    },
};

export default api;