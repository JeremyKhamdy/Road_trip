<script lang="ts">

import {defineComponent, onMounted, reactive, ref} from "vue";
import HeaderCommon from "@/components/common/Header.vue";
import Datepicker from "@vuepic/vue-datepicker";
import {useRoute, useRouter} from "vue-router";
import {getEnjoyDetails} from "@/services/EnjoyServices";
import {getEatDetails} from "@/services/EatServices";
import {getSleepDetails} from "@/services/SleepServices";
import {getDrinksDetails} from "@/services/DrinkServices";

export default defineComponent({
  name: "Gmaps",
  components: {HeaderCommon, Datepicker},
  setup(props, context) {
    let isShowMenu = ref(false);
    let router = useRouter();
    let routes = useRoute();
    let isLoading = ref(true);
    let categoryValue = ref("");
    let nbrRating = ref(0);
    let nbrPriceMin = ref(0);
    let nbrPriceMax = ref(0);
    let checkboxTypes = ref([]);
    let results: [] = [];
    let latlng: [] = [];
    let type = ref(routes.query.type);
    let whichDetails: Promise<any> | null = null;
    const form = reactive({
      depart: routes.query.depart,
      destination: routes.query.destination,
      date_start: routes.query.date_start,
      keywords: routes.query.keywords,
    });


    onMounted(async () => {
      const optionsDestinations = {
        componentRestrictions: {country: "fr"},
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        types: ["geocode"],
      };

      new google.maps.places.Autocomplete(
          document.getElementById("destination"),
          optionsDestinations
      );

      switch (routes.query.type) {
        case('Activités'):
          whichDetails = getEnjoyDetails(form.destination, 0, undefined);
          break;
        case('Bars'):
          whichDetails = getDrinksDetails(form.destination, 0, undefined);
          break;
        case('Restaurants'):
          whichDetails = getEatDetails(form.destination, 0, undefined);
          break;
        case('Hotels'):
          whichDetails = getSleepDetails(form.destination, 0, undefined);
          break;
      }

      whichDetails?.then((res) => {
        let data = res?.data;
        data.map(item => {
          results.push(item);
          latlng.push({
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
            place_id: item.place_id,
            photo: item.photos
          })
        });
        isLoading.value = false;

        let geocoder = new google.maps.Geocoder();
        let map = new google.maps.Map(document.getElementById('gmap-container'), {
          center: {lat: 0, lng: 0},
          scrollwheel: true,
          zoom: 14
        })

        geocoder.geocode({'address': routes.query.destination}, function (results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

        latlng.forEach((item, index) => {

          let marker = new google.maps.Marker({
            position: {lat: item.lat, lng: item.lng},
            map,
          })

          google.maps.event.addListener(marker, 'click', function () {
            // window.location.href = marker.url;
            switch (routes.query.type) {
              case('Activités'):
                router.push({
                  name: "activity_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Bars'):
                router.push({
                  name: "bars_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Restaurants'):
                router.push({
                  name: "restaurants_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Hotels'):
                router.push({
                  name: "hotels_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
            }
          });

        })
      });
    })

    const submitForm = (type: String) => {
      switch (type) {
        case('Activités'):
          router.push({name: 'activity_maps', query: {destination: form.destination, type: routes.query.type}})
          break;
        case('Bars'):
          router.push({name: 'bars_maps', query: {destination: form.destination, type: routes.query.type}})
          break;
        case('Restaurants'):
          router.push({name: 'restaurants_maps', query: {destination: form.destination, type: routes.query.type}})
          break;
        case('Hotels'):
          router.push({name: 'hotels_maps', query: {destination: form.destination, type: routes.query.type}})
          break;
      }
    }

    const ratingFilters = (rating: number) => {
      switch (type.value) {
        case('Activités'):
          whichDetails = getEnjoyDetails(form.destination, rating, checkboxTypes.value.value, nbrPriceMin.value, nbrPriceMax.value, categoryValue.value);
          break;

        case('Bars'):
          whichDetails = getDrinksDetails(form.destination, rating, checkboxTypes.value.value, nbrPriceMin.value, nbrPriceMax.value);
          break;

        case('Hotels'):
          whichDetails = getSleepDetails(form.destination, rating, checkboxTypes.value.value, nbrPriceMin.value, nbrPriceMax.value);
          break;

        case('Restaurants'):
          whichDetails = getEatDetails(form.destination, rating, checkboxTypes.value.value, nbrPriceMin.value, nbrPriceMax.value);

          break;

      }
      whichDetails?.then((res) => {
        let data = res?.data;
        results.splice(0, results.length);
        latlng.splice(0, latlng.length);
        data.map(item => {
          results.push(item);
          latlng.push({
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
            place_id: item.place_id,
            photo: item.photos
          })
        });
        nbrRating.value = rating;
        isLoading.value = false;

        let geocoder = new google.maps.Geocoder();
        let map = new google.maps.Map(document.getElementById('gmap-container'), {
          center: {lat: 0, lng: 0},
          scrollwheel: true,
          zoom: 14
        })

        geocoder.geocode({'address': routes.query.destination}, function (results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

        latlng.forEach((item, index) => {

          let marker = new google.maps.Marker({
            position: {lat: item.lat, lng: item.lng},
            map,
          })

          google.maps.event.addListener(marker, 'click', function () {
            // window.location.href = marker.url;
            switch (routes.query.type) {
              case('Activités'):
                router.push({
                  name: "activity_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Bars'):
                router.push({
                  name: "bars_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Restaurants'):
                router.push({
                  name: "restaurants_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Hotels'):
                router.push({
                  name: "hotels_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
            }
          });

        })
      });

    }

    const categoryFilters = (category: string) => {
      switch (type.value) {
        case('Activités'):
          whichDetails =  getEnjoyDetails(form.destinations, nbrRating.value, checkboxTypes.value.value, nbrPriceMin.value, nbrPriceMax.value, category);
          break;
      }
      whichDetails?.then((res) => {
        let data = res?.data;
        results.splice(0, results.length);
        latlng.splice(0, latlng.length);
        data.map(item => {
          results.push(item);
          latlng.push({
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
            place_id: item.place_id,
            photo: item.photos
          })
        });
        categoryValue.value = category;
        isLoading.value = false;

        let geocoder = new google.maps.Geocoder();
        let map = new google.maps.Map(document.getElementById('gmap-container'), {
          center: {lat: 0, lng: 0},
          scrollwheel: true,
          zoom: 14
        })

        geocoder.geocode({'address': routes.query.destination}, function (results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

        latlng.forEach((item, index) => {

          let marker = new google.maps.Marker({
            position: {lat: item.lat, lng: item.lng},
            map,
          })

          google.maps.event.addListener(marker, 'click', function () {
            // window.location.href = marker.url;
            switch (routes.query.type) {
              case('Activités'):
                router.push({
                  name: "activity_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Bars'):
                router.push({
                  name: "bars_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Restaurants'):
                router.push({
                  name: "restaurants_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Hotels'):
                router.push({
                  name: "hotels_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
            }
          });

        })
      });

    }

    const priceFilters = (min: number, max: number) => {
      switch (type.value) {
        case('Bars'):
          whichDetails = getDrinksDetails(form.destination, nbrRating.value, checkboxTypes.value.value, min,max);
          break;
        case('Restaurants'):
          whichDetails = getEatDetails(form.destination, nbrRating.value, checkboxTypes.value.value, min,max);
          break;

      }
      whichDetails?.then((res) => {
        let data = res?.data;
        results.splice(0, results.length);
        latlng.splice(0, latlng.length);
        data.map(item => {
          results.push(item);
          latlng.push({
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
            place_id: item.place_id,
            photo: item.photos
          })
        });
        nbrPriceMin.value = min;
        nbrPriceMax.value = max;
        isLoading.value = false;

        let geocoder = new google.maps.Geocoder();
        let map = new google.maps.Map(document.getElementById('gmap-container'), {
          center: {lat: 0, lng: 0},
          scrollwheel: true,
          zoom: 14
        })

        geocoder.geocode({'address': routes.query.destination}, function (results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

        latlng.forEach((item, index) => {

          let marker = new google.maps.Marker({
            position: {lat: item.lat, lng: item.lng},
            map,
          })

          google.maps.event.addListener(marker, 'click', function () {
            // window.location.href = marker.url;
            switch (routes.query.type) {
              case('Activités'):
                router.push({
                  name: "activity_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Bars'):
                router.push({
                  name: "bars_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Restaurants'):
                router.push({
                  name: "restaurants_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Hotels'):
                router.push({
                  name: "hotels_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
            }
          });

        })
      });

    }

    const typeFilters = () => {
console.log(checkboxTypes.value)
      // checkboxTypes.value = checkbox;
      switch (type.value) {
        case('Activités'):
          whichDetails = getEnjoyDetails(form.destination, nbrRating.value, checkboxTypes.value, nbrPriceMin.value, nbrPriceMax.value, categoryValue.value);
          break;

        case('Bars'):
          whichDetails = getDrinksDetails(form.destination, nbrRating.value, checkboxTypes.value, nbrPriceMin.value, nbrPriceMax.value);
          break;

        case('Hotels'):
          whichDetails = getSleepDetails(form.destination, nbrRating.value, checkboxTypes.value, nbrPriceMin.value, nbrPriceMax.value);
          break;

        case('Restaurants'):
          whichDetails = getEatDetails(form.destination, nbrRating.value, checkboxTypes.value, nbrPriceMin.value, nbrPriceMax.value);
          break;

      }

      whichDetails?.then((res) => {
        let data = res?.data;
        results.splice(0, results.length);
        latlng.splice(0, latlng.length);
        data.map(item => {
          results.push(item);
          latlng.push({
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
            place_id: item.place_id,
            photo: item.photos
          })
        });
        isLoading.value = false;

        let geocoder = new google.maps.Geocoder();
        let map = new google.maps.Map(document.getElementById('gmap-container'), {
          center: {lat: 0, lng: 0},
          scrollwheel: true,
          zoom: 14
        })

        geocoder.geocode({'address': routes.query.destination}, function (results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

        latlng.forEach((item, index) => {

          let marker = new google.maps.Marker({
            position: {lat: item.lat, lng: item.lng},
            map,
          })

          google.maps.event.addListener(marker, 'click', function () {
            // window.location.href = marker.url;
            switch (routes.query.type) {
              case('Activités'):
                router.push({
                  name: "activity_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Bars'):
                router.push({
                  name: "bars_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Restaurants'):
                router.push({
                  name: "restaurants_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
              case('Hotels'):
                router.push({
                  name: "hotels_detail",
                  params: {place_id: item.place_id, photo: item.photo}
                })
                break;
            }
          });

        })
      });

    }

    const showMenu = () => {
      isShowMenu.value = true;
    }

    const hideMenu = () => {
      isShowMenu.value = false;
    }

    return {
      isShowMenu,
      form,
      isLoading,
      results,
      type,
      nbrRating,
      nbrPriceMin,
      nbrPriceMax,
      checkboxTypes,
      categoryValue,
      submitForm,
      typeFilters,
      priceFilters,
      categoryFilters,
      ratingFilters,
      showMenu,
      hideMenu
    }
  },
})

</script>

<template>
  <main class="gmap">
    <header class="map-header">
      <div class="w-2/12 flex items-center justify-center text-Cultured">
        <router-link :to="{name: 'home'}" class="">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 shadow-main" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </router-link>
      </div>
      <form class="search-container">
        <div class="flex flex-col px-4 col-span-2">
          <label class="text-DesertSand" for="ville">Destination</label>
          <input class="text-GrayWeb font-bold" type="text" placeholder="Ville" id="destination" ref="destination"
                 name="destination" v-model="form.destination">
        </div>
        <div class="flex flex-col px-4 col-span-1">
          <label class="text-DesertSand" for="date-start">Ouvert le</label>
          <Datepicker class="text-GrayWeb" type="text" placeholder="date" id="date-start" name="DateStart"
                      v-model="form.date_start"></Datepicker>
        </div>
        <div class="flex flex-col px-4 col-span-2">
          <label class="text-DesertSand" for="keyword">Mot-clé</label>
          <input class="text-GrayWeb font-bold" type="text" placeholder="Mot-clé" id="keyword" name="keywords"
                 v-model="form.keywords">
        </div>
        <input type="hidden" name="type" v-model="type">
        <!--        <div class="bg-DesertSand rounded-md col-span-1">-->
        <div class=" flex flex-col items-end justify-center col-span-1">
          <!--          <button type="submit" v-on:click="submitForm(type)"-->
          <button type="submit"
                  class="flex bg-DesertSand btn-sm btn-submit text-white items-center justify-center">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-Rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-Rule="evenodd"/>
            </svg>
          </button>
        </div>
      </form>
    </header>

    <section class="map-section relative">
      <div class="filters-container">
        <!--        FILTERS NOMBRE D'ÉTOILES-->
        <div class="flex flex-col w-full space-y-2">
          <span class="font-bold ">Nombre d'étoiles</span>
          <div class="flex flex-row space-x-2">
            <button v-on:click="ratingFilters(0)" v-if="nbrRating === 2"
                    class="w-1/4 flex flex-row bg-GrayWeb btn px-1 py-2 text-Cultured space-x-2 shadow-main text-sm">
              <span> 2 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(2)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
              <span> 2 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(0)" v-if="nbrRating === 3"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
              <span> 3 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(3)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
              <span> 3 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(0)" v-if="nbrRating === 4"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
              <span> 4 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(4)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
              <span> 4 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(0)" v-if="nbrRating === 5"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
              <span> 5 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(5)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
              <span> 5 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>

          </div>
        </div>

        <!--  PRIX MIN/MAX -->
        <div v-if="type ==='Restaurants'" class="flex flex-col w-full space-y-4">
          <span class="font-bold ">Prix Minimum</span>
          <div class="flex flex-row space-x-2">
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 0"
                    class="w-1/4 flex flex-row bg-GrayWeb btn px-1 py-2 text-Cultured space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 0 </span>
            </button>
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 0 </span>
            </button>
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 1"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 1 </span>
            </button>
            <button v-on:click="priceFilters(1, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 1 </span>
            </button>
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 2"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 2 </span>
            </button>
            <button v-on:click="priceFilters(2, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 2 </span>
            </button>
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 3"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 3 </span>
            </button>
            <button v-on:click="priceFilters(3, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 3 </span>
            </button>

            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 4"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 4 </span>
            </button>
            <button v-on:click="priceFilters(4, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand shadow-main text-normal text-center justify-center">
              <span class="font-bold text-lg"> 4 </span>
            </button>
          </div>
        </div>

        <!--  TYPE D'ACTIVITÉS -->
        <div v-if="type === 'Activités'" class="flex flex-col w-full space-y-4">
          <span class="font-bold ">Category</span>
          <div class="flex flex-col space-y-2 pl-5">
            <select v-on:change="categoryFilters" v-model="categoryValue">
              <option selected value="">
                Selectionner...
              </option>
              <option value="Attractions">
                Attractions
              </option>
              <option value="drinking establishment">
                Bars
              </option>
              <option value="Eating">
                Restaurants
              </option>
              <option value="Stores">
                Magasin/Shopping
              </option>
              <option value="Education">
                Écoles
              </option>
              <option value="Place of worship">
                Lieu de culte
              </option>
              <option value="Lodging establishment">
                Hotels
              </option>
              <option value="Public services">
                Publique
              </option>
              <option value="Transportation">
                Transports
              </option>
            </select>
          </div>
        </div>

        <!--  TYPE D'ETABLISSEMENT -->
        <div class="flex flex-col w-full space-y-4">
          <span class="font-bold ">Types</span>
          <div class="flex flex-col space-y-2 pl-5">
            <div class="flex flex-row space-x-2">
              <input v-on:change="typeFilters" id="checkbox-lodging" type="checkbox" value="lodging"
                     v-model="checkboxTypes">
              <label for="checkbox-lodging">Logement</label>
            </div>
            <div class="flex flex-row space-x-2">
              <input v-on:change="typeFilters" id="checkbox-poi" type="checkbox" value="point_of_interest"
                     v-model="checkboxTypes">
              <label for="checkbox-poi">Centre d'intérêt</label>
            </div>
            <div class="flex flex-row space-x-2">
              <input v-on:change="typeFilters" id="checkbox-establishment" type="checkbox" value="establishment"
                     v-model="checkboxTypes">
              <label for="checkbox-establishment">Établissement</label>
            </div>
            <div class="flex flex-row space-x-2">
              <input v-on:change="typeFilters" id="checkbox-restaurants" type="checkbox" value="restaurant"
                     v-model="checkboxTypes">
              <label for="checkbox-restaurants">Restaurants</label>
            </div>
          </div>
        </div>

      </div>
      <div v-if="isShowMenu" class="menu-filters-container">
        <div class="w-1/12" >
          <button v-on:click="hideMenu" class=" bg-DesertSand space-y-2 h-auto burger-icon py-4 px-2 rounded-md text-Cultured">
            <span class="block w-5 h-0.5 bg-gray-600"></span>
            <span class="block w-8 h-0.5 bg-gray-600"></span>
            <span class="block w-8 h-0.5 bg-gray-600"></span>
          </button>
        </div>
        <!--        FILTERS NOMBRE D'ÉTOILES-->
        <div class="flex flex-col w-full space-y-2">
          <span class="font-bold ">Nombre d'étoiles</span>
          <div class="flex flex-row space-x-2">
            <button v-on:click="ratingFilters(0)" v-if="nbrRating === 2"
                    class="w-1/4 flex flex-row bg-GrayWeb btn px-1 py-2 text-Cultured space-x-2 shadow-main text-sm">
              <span> 2 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(2)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
              <span> 2 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(0)" v-if="nbrRating === 3"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
              <span> 3 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(3)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
              <span> 3 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(0)" v-if="nbrRating === 4"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
              <span> 4 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(4)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
              <span> 4 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(0)" v-if="nbrRating === 5"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
              <span> 5 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>
            <button v-on:click="ratingFilters(5)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
              <span> 5 </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </button>

          </div>
        </div>

        <!--  PRIX MIN/MAX -->
        <div v-if="type ==='Restaurants'" class="flex flex-col w-full space-y-4">
          <span class="font-bold ">Prix Minimum</span>
          <div class="flex flex-row space-x-2">
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 0"
                    class="w-1/4 flex flex-row bg-GrayWeb btn px-1 py-2 text-Cultured space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 0 </span>
            </button>
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 0 </span>
            </button>
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 1"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 1 </span>
            </button>
            <button v-on:click="priceFilters(1, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 1 </span>
            </button>
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 2"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 2 </span>
            </button>
            <button v-on:click="priceFilters(2, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 2 </span>
            </button>
            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 3"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 3 </span>
            </button>
            <button v-on:click="priceFilters(3, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 3 </span>
            </button>

            <button v-on:click="priceFilters(0, nbrPriceMax)" v-if="nbrPriceMin === 4"
                    class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured shadow-main text-sm justify-center">
              <span class="font-bold text-lg"> 4 </span>
            </button>
            <button v-on:click="priceFilters(4, nbrPriceMax)" v-else
                    class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand shadow-main text-normal text-center justify-center">
              <span class="font-bold text-lg"> 4 </span>
            </button>
          </div>
        </div>

        <!--  TYPE D'ACTIVITÉS -->
        <div v-if="type === 'Activités'" class="flex flex-col w-full space-y-4">
          <span class="font-bold ">Category</span>
          <div class="flex flex-col space-y-2 pl-5">
            <select v-on:change="categoryFilters" v-model="categoryValue">
              <option selected value="">
                Selectionner...
              </option>
              <option value="Attractions">
                Attractions
              </option>
              <option value="drinking establishment">
                Bars
              </option>
              <option value="Eating">
                Restaurants
              </option>
              <option value="Stores">
                Magasin/Shopping
              </option>
              <option value="Education">
                Écoles
              </option>
              <option value="Place of worship">
                Lieu de culte
              </option>
              <option value="Lodging establishment">
                Hotels
              </option>
              <option value="Public services">
                Publique
              </option>
              <option value="Transportation">
                Transports
              </option>
            </select>
          </div>
        </div>

        <!--  TYPE D'ETABLISSEMENT -->
        <div class="flex flex-col w-full space-y-4">
          <span class="font-bold ">Types</span>
          <div class="flex flex-col space-y-2 pl-5">
            <div class="flex flex-row space-x-2">
              <input v-on:change="typeFilters" id="checkbox-lodging" type="checkbox" value="lodging"
                     v-model="checkboxTypes">
              <label for="checkbox-lodging">Logement</label>
            </div>
            <div class="flex flex-row space-x-2">
              <input v-on:change="typeFilters" id="checkbox-poi" type="checkbox" value="point_of_interest"
                     v-model="checkboxTypes">
              <label for="checkbox-poi">Centre d'intérêt</label>
            </div>
            <div class="flex flex-row space-x-2">
              <input v-on:change="typeFilters" id="checkbox-establishment" type="checkbox" value="establishment"
                     v-model="checkboxTypes">
              <label for="checkbox-establishment">Établissement</label>
            </div>
            <div class="flex flex-row space-x-2">
              <input v-on:change="typeFilters" id="checkbox-restaurants" type="checkbox" value="restaurant"
                     v-model="checkboxTypes">
              <label for="checkbox-restaurants">Restaurants</label>
            </div>
          </div>
        </div>

      </div>
      <div class="w-1/12 absolute z-10"  v-if="!isShowMenu">
        <button v-on:click="showMenu" class=" bg-DesertSand space-y-2 h-auto burger-icon py-4 px-2 rounded-md text-Cultured">
          <span class="block w-5 h-0.5 bg-gray-600"></span>
          <span class="block w-8 h-0.5 bg-gray-600"></span>
          <span class="block w-8 h-0.5 bg-gray-600"></span>
        </button>
      </div>
      <div class="map-container" id="gmap-container">
      </div>
    </section>
  </main>
</template>