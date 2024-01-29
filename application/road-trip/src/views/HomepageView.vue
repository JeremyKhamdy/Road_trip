<script lang="ts">
import {defineComponent, onMounted, reactive, ref, watch} from "vue";
import Card from "@/components/Card.vue";
import Tabs from "@/components/Tabs.vue";
import CardHotel from "@/components/CardHotel.vue";
import Header from "@/components/Header.vue";
import {useRouter} from "vue-router";
import CardActivity from "@/components/CardActivity.vue";
import {getEnjoyDetails} from "@/services/EnjoyServices";
import {getSleepDetails} from "@/services/SleepServices";

export default defineComponent({
  name: "Homepage",
  components: {CardActivity, CardHotel, Tabs, Card, Header},
  setup() {
    let isShowMenu = ref(false);
    const router = useRouter();
    const form = reactive({
      type: '',
      destination: '',
      // destination: '',
      keywords: [],

    });

    let isLoadingActivities = ref(true);
    let isLoadingHotels = ref(true);
    const cities = ['Paris', 'Lyon', 'Monaco', 'Nice', 'Marseille', 'Lille'];
    let currentCityTransport = ref(cities[0]);
    let currentCityHotel = ref(cities[0]);

    let activities: any = [];
    let hotels: any = [];

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

      getSleepDetails(currentCityHotel.value, 0, []).then((res) => {
        let data = res?.data;

        data.map(item => {
          hotels.push(item);
        });
        isLoadingHotels.value = false;
      });

      getEnjoyDetails(currentCityTransport.value, 0, []).then((res) => {
        let data = res?.data;

        data.map(item => {
          activities.push(item);
        });
        isLoadingActivities.value = false;
      });
    })

    watch(currentCityTransport, (prev, next) => {
      isLoadingActivities.value = true;

      getEnjoyDetails(currentCityTransport.value, 0, []).then((res) => {
        let data = res?.data;
        activities.splice(0, activities.length);
        data.map(item => {
          activities.push(item);
        });
        isLoadingActivities.value = false;
      });
    });

    watch(currentCityHotel, (prev, next) => {
      isLoadingHotels.value = true;

      getSleepDetails(currentCityHotel.value, 0, []).then((res) => {
        let data = res?.data;
        hotels.splice(0, hotels.length);
        data.map(item => {
          hotels.push(item);
        });
        isLoadingHotels.value = false;
      });
    });

    const submitForm = () => {
      switch (form.type) {
        case('Activités'):
          router.push({name: 'activity', query: {destinations: form.destination, keywords: form.keywords}})
          break;
        case('Bars'):
          router.push({name: 'bars', query: {destinations: form.destination, keywords: form.keywords}})
          break;
        case('Hotels'):
          router.push({name: 'hotels', query: {destinations: form.destination, keywords: form.keywords}})
          break;
        case('Restaurants'):
          router.push({name: 'restaurants', query: {destinations: form.destination, keywords: form.keywords}})
          break;
      }
    };

    const showMenu = () => {
      isShowMenu.value = true;
    }

    const hideMenu = () => {
      isShowMenu.value = false;
    }

    return {
      isShowMenu,
      cities,
      currentCityTransport,
      currentCityHotel,
      form,
      activities,
      hotels,
      isLoadingActivities,
      isLoadingHotels,
      submitForm,
      showMenu,
      hideMenu,
    };
  },
})

</script>

<template>
  <main>
    <Header v-on:show-menu="showMenu" v-on:hide-menu="hideMenu" :is-show-menu="isShowMenu"></Header>

<!--    HEADER FORMS-->

    <div class="homepage-header">
      <div class="w-full text-center p-4 font-bold">
        <h1>Trouvez vos besoins en un seul clique et facilement</h1>
      </div>
      <div class="w-full flex flex-row justify-center pt-20">
        <form v-on:submit="submitForm"
              class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white rounded-md shadow-main">
          <div class="flex flex-col px-4 py-4">
            <label class="text-sm text-DesertSand" for="type">Type</label>
            <select class="text-GrayWeb" id="type" name="type" v-model="form.type">
              <option selected value="">Choisir une activité</option>
              <option value="Activités">Activités</option>
              <option value="Bars">Bars</option>
              <option value="Hotels">Hotels</option>
              <option value="Restaurants">Restaurants</option>
            </select>
          </div>
          <div class="flex flex-col px-4 py-4">
            <label class="text-sm text-DesertSand" for="destination">Destinations</label>
            <input class="text-GrayWeb" type="text" placeholder="Ville" id="destination" name="destination"
                   v-model="form.destination">
          </div>
          <div class="flex flex-col px-4 py-4">
            <label class="text-sm text-DesertSand" for="keyword">Mot-clé</label>
            <input class="text-GrayWeb" type="text" placeholder="Mot-clé" id="keyword" name="keyword"
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
        </form>
      </div>
    </div>

<!--    SECTION DES ACTIVITÉS-->

    <section class="homepage-section">
      <div class="transport-container">
        <div class="title-container shadow-main">
          <h2>Activitées les plus recherchées</h2>
        </div>
        <Tabs :cities="cities" :current-city="currentCityTransport"
              v-on:city-transport="currentCityTransport = $event"></Tabs>
        <div v-if="!isLoadingActivities" class="grid-cards">
          <CardActivity :is-loading="isLoadingActivities" :activity="activity" :current-city="currentCityTransport"
                        v-for="activity in activities.slice(0,4)"></CardActivity>
        </div>
        <div v-else class="grid-cards-loading">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </div>
        <div class="more-container">
          <RouterLink class="shadow-main" :to="{name: 'activity', query: {destinations: currentCityTransport, DateStart: '', keywords: ''}}">Voir plus</RouterLink>
        </div>
      </div>

      <div class="hotel-container">
        <div class="title-container shadow-main">
          <h2>Hôtels recommandés</h2>
        </div>
        <Tabs :cities="cities" :current-city="currentCityHotel"
              v-on:city-hotel="currentCityHotel = $event"></Tabs>
        <div v-if="!isLoadingHotels" class="grid-cards">
          <CardHotel :hotel="hotel" :current-city="currentCityHotel" v-for="hotel in hotels.slice(0,4)"></CardHotel>
        </div>
        <div v-else class="grid-cards-loading">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </div>
        <div class="more-container">
          <RouterLink class="shadow-main" :to="{name: 'hotels', query: {destinations: currentCityTransport, DateStart: '', keywords: ''}}">Voir plus</RouterLink>
        </div>
      </div>

      <!-- PAGE REDIRECTION -->

      <div class="pages-container">
        <div class="page-container relative">
          <div class="absolute z-0 w-full h-full items-center text-center">
            <img class="page-img" src="/src/assets/images/transports_valises.jpg">
          </div>
          <router-link class="relative text-center z-10" to="/transports" :to="{name:'activity'}">
            <button class="btn-img relative w-full h-full">
              <span class="uppercase font-bold text-white">Transport</span>
            </button>
          </router-link>
        </div>
        <div class="page-container relative">
          <div class="absolute z-0 w-full h-full items-center text-center">
            <img class="page-img" src="/src/assets/images/activite.jpg">
          </div>
          <router-link class="relative text-center z-10" to="/activity">
            <button class="btn-img relative w-full h-full">
              <span class="uppercase font-bold text-white">Activity</span>
            </button>
          </router-link>
        </div>
        <div class="page-container relative">
          <div class="absolute z-0 w-full h-full items-center text-center">
            <img class="page-img" src="/src/assets/images/bars.jpg">
          </div>
          <router-link class="relative text-center z-10" to="/bars">
            <button class="btn-img relative w-full h-full">
              <span class="uppercase font-bold text-white">Bars</span>
            </button>
          </router-link>
        </div>
        <div class="page-container relative">
          <div class="absolute z-0 w-full h-full items-center text-center">
            <img class="page-img" src="/src/assets/images/hotels_piscine.jpg">
          </div>
          <router-link class="relative text-center z-10" to="/hotels">
            <button class="btn-img relative w-full h-full">
              <span class="uppercase font-bold text-white">Hotels</span>
            </button>
          </router-link>
        </div>
        <div class="page-container relative">
          <div class="absolute z-0 w-full h-full items-center text-center">
            <img class="h-full w-full page-img" src="/src/assets/images/restaurants.jpg">
          </div>
          <router-link class="relative text-center z-10" to="/restaurants">
            <button class="btn-img relative w-full h-full">
              <span class="uppercase font-bold text-white">Restaurants</span>
            </button>
          </router-link>

        </div>
      </div>
    </section>
    <footer class="footer">

    </footer>
  </main>
</template>