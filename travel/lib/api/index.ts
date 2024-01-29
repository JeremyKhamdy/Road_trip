import fetch from 'node-fetch';
const API_KEY = 'AIzaSyCH6rkbjmVeUi9kR51c4eRVlqHv4ysCm3g';
const api = {
  autocompleteSearch: async (input,language): Promise<[]> => {
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
  directionDetails: async (origin,destination) => {
    const direction = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&transit_mode=rail&language=fr&mode=transit&key=${API_KEY}`,
    );
    const search_data = await direction.json();
    console.log(origin, destination);
    console.log(search_data.routes[0].legs);
    const steps = search_data.routes[0].legs[0].steps
      .map((v) => ({
        ...(v.transit_details && {
          line: {
            name: v.transit_details.line.name,
            short_name: v.transit_details.line.short_name,
          },
          direction: v.transit_details.headsign,
          stops: v.transit_details.num_stops,
          depart: {
            name: v.transit_details.departure_stop.name,
            location: {
              lat: v.transit_details.departure_stop.location.lat,
              lng: v.transit_details.departure_stop.location.lng,
            },
            time: v.transit_details.departure_time.text,
          },
          arrival: {
            name: v.transit_details.arrival_stop.name,
            location: {
              lat: v.transit_details.arrival_stop.location.lat,
              lng: v.transit_details.arrival_stop.location.lng,
            },
            time: v.transit_details.arrival_time.text,
          },
        }),
      }))
      .filter((value) => Object.keys(value).length !== 0);
    return {
        origin: {
          address: search_data.routes[0].legs[0].start_address,
          time: search_data.routes[0].legs[0].departure_time.text,
          location: {
            lat: search_data.routes[0].legs[0].start_location.lat,
            lng: search_data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          address: search_data.routes[0].legs[0].end_address,
          time: search_data.routes[0].legs[0].arrival_time.text,
          location: {
            lat: search_data.routes[0].legs[0].end_location.lat,
            lng: search_data.routes[0].legs[0].end_location.lng,
          },
        },
        info: {
          distance: search_data.routes[0].legs[0].distance.text,
          duration: search_data.routes[0].legs[0].duration.text,
        },
        steps,
    };
  },
};
export default api;