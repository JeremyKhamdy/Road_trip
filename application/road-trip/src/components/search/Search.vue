<script lang="ts">
import {defineComponent, onMounted, ref, computed, watch, reactive} from "vue";
import CardResult from "@/components/common/CardResult.vue";
import Filters from "@/components/common/Filters.vue";
import {getEnjoyDetails} from "@/services/EnjoyServices";
import {getDrinksDetails} from "@/services/DrinkServices";
import {getEatDetails} from "@/services/EatServices";
import {getSleepDetails} from "@/services/SleepServices";
// import gmapsInit from '@/utils/gmaps.js';

export default defineComponent({
  name: 'Search',
  components: {Filters, CardResult},
  props: {
    destinations: String,
    type: String,
    categoryValue: String,
    ratingValue: Number,
    priceMinValue: Number,
    priceMaxValue: Number,
    results: Array,
    countResult: Number,
    pageName: String,
  },
  // computed: {
  //   results() {
  //     return this.results;
  //   },
  // },
  setup(props, context) {

    let sortNameValue = ref("ASC");
    let sortNotesValue = ref("ASC");
    let dataResult = props.results;
    // let resultsData = reactive(props.results);

    // watch(sortValue, async (before, after) => {
    //   console.log(after);
    //   resultsData = [];
    // }, {deep:true});

    let number = ref('');
    const sortName = (sort: string) => {
      props.results?.sort(function (a, b) {
        if (sort === "ASC") {
          sortNameValue.value = "DESC";
          if (a.name > b.name) {
            return -1;
          } else {
            return 1;
          }
        } else {
          sortNameValue.value = "ASC";
          if (a.name < b.name) {
            return -1;
          } else {
            return 1;
          }
        }
      })
    };

    const sortNotes = (sort: string) => {
      props.results?.sort(function (a, b) {
        if (sort === "ASC") {
          sortNotesValue.value = "DESC";
          return a.rating - b.rating;
        } else {
          sortNotesValue.value = "ASC";
          return b.rating - a.rating;
        }
      })
    };

    const ratingFilters = (rating: number) => {
      console.log(rating)
      context.emit('rating-Filters', rating);
    };

    const categoryFilters = (category: string) => {
      console.log(category)
      context.emit('category-Filters', category);
    };

    const priceFilters = (min: number, max: number) => {
      context.emit('price-Filters', min, max);
    };

    const typeFilters = (checkbox: []) => {
      console.log(checkbox)
      context.emit('type-Filters', checkbox);
    };

    return {
      sortName,
      sortNotes,
      sortNameValue,
      sortNotesValue,
      number,
      categoryFilters,
      ratingFilters,
      priceFilters,
      typeFilters,
      // resultsData,
    }
  }
});

</script>

<template>
  <div class="gmaps shadow-main" id="little_gmaps">
    <button class="gmaps-link">
      <router-link v-if="type === 'Activités'"
                   :to="{ name: 'activity_maps', query: { destination: destinations, type: type } }">
        <b>Voir sur la carte</b>
      </router-link>
      <router-link v-else-if="type === 'Bars'"
                   :to="{ name: 'bars_maps', query: { destination: destinations, type: type } }">
        <b>Voir sur la carte</b>
      </router-link>
      <router-link v-else-if="type === 'Restaurants'"
                   :to="{ name: 'restaurants_maps', query: { destination: destinations, type: type } }">
        <b>Voir sur la carte</b>
      </router-link>
      <router-link v-else-if="type === 'Hotels'"
                   :to="{ name: 'hotels_maps', query: { destination: destinations, type: type } }">
        <b>Voir sur la carte</b>
      </router-link>
    </button>
  </div>
  <div class="search-filters">
    <div class="content">
      <div class="title">
        <span class="uppercase">{{ destinations }}</span> : {{ countResult }} {{ type }} trouvés
      </div>
      <div class="filters">
        <button v-on:click="sortName(sortNameValue)" class="filter shadow-main">
          <span>Ordre croissant / décroissant</span>
          <svg v-if="sortNameValue === 'ASC'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
          </svg>
        </button>
        <!--        <button class="filter shadow-main">-->
        <!--        </button>-->
        <!--        <button class="filter shadow-main">-->
        <!--        </button>-->
        <button v-on:click="sortNotes(sortNotesValue)" class="filter shadow-main">
          <span>Notes</span>
          <svg v-if="sortNotesValue === 'ASC'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="search-content">
    <div class="filters shadow-main">
      <Filters v-on:emit-checkboxType="typeFilters" v-on:price-filter="priceFilters" v-on:rating-filter="ratingFilters"
               v-on:category-filter="categoryFilters" :pageName="pageName"
               :ratingValue="ratingValue" :price-min-value="priceMinValue" :price-max-value="priceMaxValue" :categoryValue="categoryValue"></Filters>
    </div>
    <div class="results">
      <CardResult v-for="(result, key) in results.slice(0,8)" :key="key" :result="result"
                  :page-name="type"></CardResult>
    </div>
  </div>
</template>