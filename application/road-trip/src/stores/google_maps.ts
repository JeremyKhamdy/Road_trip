import {defineStore} from "pinia";

export const googleMapsStore = defineStore({
    id:'googleMaps',
    state: () => ({
        apiKey: 'AIzaSyCVN3J4BD-GDK4YEcmBv7-Sjs1KZayNPe0'
    }),
    getters: {
        getApiKey: (state) => state.apiKey,
    }
})