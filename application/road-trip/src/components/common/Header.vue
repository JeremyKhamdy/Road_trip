<script lang="ts">
import {defineComponent, reactive, ref, onMounted} from "vue";
import Header from "@/components/Header.vue";
import {useRoute, useRouter} from "vue-router";
import Datepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  name: "HeaderCommon",
  props: {
    pageName: String,
    imageUrl: String,
  },
  components: {Header, Datepicker},
  mounted() {

    const optionsDestinations = {
      componentRestrictions: {country: "fr"},
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["geocode"],
      // types: ["(cities)"],
    };

    const optionsRegions = {
      componentRestrictions: {country: "fr"},
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      // types: ["administrative_area_level_1"],
      types: ["establishment"],
    };

    new google.maps.places.Autocomplete(
        document.getElementById("depart"),
        optionsDestinations
    );

    new google.maps.places.Autocomplete(
        document.getElementById("destinations"),
        optionsDestinations
    );

    new google.maps.places.Autocomplete(
        document.getElementById("regions"),
        optionsRegions
    );

  },
  setup(props, context) {
    const routes = useRoute();

    const form = reactive({
      depart: routes.query.depart,
      destinations: routes.query.destinations,
      regions: routes.query.regions,
      date_start: routes.query.date_start,
      date_end: routes.query.date_end,
      keywords: routes.query.keywords,
    });

    const submitForm = () => {
      console.log(form);
    };


    return {
      submitForm,
      form,
    }
  },
});
</script>

<template>
  <div class="pages-header">
    <div class="w-full text-left p-4 title">
      <h1 class="text-Cultured">{{ pageName }}</h1>
    </div>
    <form class="w-full flex flex-row justify-center sm:pt-20 md:pt-20" @submit="submitForm">
      <div v-if="pageName === 'Activités'"
           class="w-full relative -bottom-10 sm:mx-10 md:mx-10 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 bg-white rounded-md shadow-main">
        <div class="flex flex-col px-4 py-4 space-y-1 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <label class="text-sm text-DesertSand" for="destinations">Destinations</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Ville" id="destinations" ref="destinations"
                 name="destinations" v-model="form.destinations">
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <label class="text-sm text-DesertSand" for="date-start">Après le</label>
          <Datepicker class="text-GrayWeb" type="text" placeholder="date" id="date-start" name="DateStart"
                      v-model="form.date_start"></Datepicker>
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <label class="text-sm text-DesertSand" for="keyword">Mot-clé</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Mot-clé" id="keyword" name="keywords"
                 v-model="form.keywords">
        </div>
        <div class="px-4 py-4 bg-DesertSand rounded-md sm:col-span-4 md-col-span-6 lg-col-span- xl:col-span-1">
          <button type="submit" class="flex btn btn-submit text-white items-center justify-center">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-Rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-Rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="pageName === 'Bars'"
           class="w-full relative -bottom-10 sm:mx-10 md:mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 bg-white rounded-md shadow-main">
        <div class="flex flex-col px-4 py-4 space-y-1">
          <label class="text-sm text-DesertSand" for="destinations">Destinations</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Ville" id="destinations" ref="destinations"
                 name="destinations" v-model="form.destinations">
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 col-span-2">
          <label class="text-sm text-DesertSand" for="date-start">Après le</label>
          <Datepicker class="text-GrayWeb" type="text" placeholder="date" id="date-start" name="DateStart"
                      v-model="form.date_start"></Datepicker>
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1">
          <label class="text-sm text-DesertSand" for="keyword">Mot-clé</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Mot-clé" id="keyword" name="keywords"
                 v-model="form.keywords">
        </div>
        <div class="px-4 py-4 bg-DesertSand rounded-md md:col-span-2 lg:col-span-1">
          <button type="submit" class="flex btn btn-submit text-white items-center justify-center">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-Rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-Rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="pageName === 'Hotels'"
           class="w-full relative -bottom-10 lg:mx-10 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 bg-white rounded-md shadow-main">
        <div class="flex flex-col px-4 py-4 space-y-1 sm:col-span-6 md:col-span-1 lg:col-span-1">
          <label class="text-sm text-DesertSand" for="destinations">Destinations</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Ville" id="destinations" ref="destinations"
                 name="destinations" v-model="form.destinations">
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 sm:col-span-2 md:col-span-2 lg:col-span-2">
          <label class="text-sm text-DesertSand" for="date-start">Après le</label>
          <Datepicker class="text-GrayWeb" type="text" placeholder="date" id="date-start" name="DateStart"
                      v-model="form.date_start"></Datepicker>
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 sm:col-span-2 md:col-span-2 lg:col-span-2">
          <label class="text-sm text-DesertSand" for="date-end">Départ le</label>
          <Datepicker class="text-GrayWeb" type="text" placeholder="date" id="date-end" name="DateEnd"
                      v-model="form.date_end"></Datepicker>
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 sm:col-span-6 md:col-span-1 lg:col-span-1">
          <label class="text-sm text-DesertSand" for="keyword">Mot-clé</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Mot-clé" id="keyword" name="keywords"
                 v-model="form.keywords">
        </div>
        <div class="px-4 py-4 bg-DesertSand rounded-md sm:col-span-6 md:col-span-6 lg:col-span-1">
          <button type="submit" class="flex btn btn-submit text-white items-center justify-center">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-Rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-Rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="pageName === 'Restaurants'"
           class="w-full relative -bottom-10 sm:mx-10 md:mx-10 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 bg-white rounded-md shadow-main">
        <div class="flex flex-col px-4 py-4 space-y-1 col-span-2">
          <label class="text-sm text-DesertSand" for="destinations">Destinations</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Ville" id="destinations" ref="destinations"
                 name="destinations" v-model="form.destinations">
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 col-span-2">
          <label class="text-sm text-DesertSand" for="date-start">Après le</label>
          <Datepicker class="text-GrayWeb" type="text" placeholder="date" id="date-start" name="DateStart"
                      v-model="form.date_start"></Datepicker>
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 col-span-2">
          <label class="text-sm text-DesertSand" for="keyword">Mot-clé</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Mot-clé" id="keyword" name="keywords"
                 v-model="form.keywords">
        </div>
        <div class="px-4 py-4 bg-DesertSand rounded-md">
          <button type="submit" class="flex btn btn-submit text-white items-center justify-center">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-Rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-Rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="pageName === 'Transports'"
           class="w-full relative -bottom-10 sm:mx-10 md:mx-10 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 bg-white rounded-md shadow-main">
        <div class="flex flex-col px-4 py-4 space-y-1 col-span-2">
          <label class="text-sm text-DesertSand" for="depart">Depart</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Ville" id="depart" ref="depart" name="depart" v-model="form.depart">
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 col-span-2">
          <label class="text-sm text-DesertSand" for="destinations">Destinations</label>
          <input class="text-GrayWeb py-2" type="text" placeholder="Ville" id="destinations" ref="destinations" name="destinations" v-model="form.destinations">
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 col-span-2">
          <label class="text-sm text-DesertSand" for="date-start">Départ le</label>
          <Datepicker class="text-GrayWeb" type="text" placeholder="date" id="date-start" name="DateStart" v-model="form.date_start"></Datepicker>
        </div>
        <div class="flex flex-col px-4 py-4 space-y-1 col-span-2">
          <label class="text-sm text-DesertSand" for="date-end">Arrivé le</label>
          <Datepicker class="text-GrayWeb" type="text" placeholder="date" id="date-end" name="DateEnd"
                      v-model="form.date_end"></Datepicker>
        </div>
        <div class="px-4 py-4 bg-DesertSand rounded-md">
          <button type="submit" class="flex btn btn-submit text-white items-center justify-center">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-Rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-Rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>