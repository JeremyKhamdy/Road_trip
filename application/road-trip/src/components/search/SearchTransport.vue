<script lang="ts">
import {defineComponent, onMounted} from "vue";
import CardResult from "@/components/common/CardResult.vue";
import Filters from "@/components/common/Filters.vue";
import CardResultTransport from "@/components/common/CardResultTransport.vue";
// import gmapsInit from '@/utils/gmaps.js';

export default defineComponent({
  name: 'SearchTransport',
  components: {CardResultTransport, Filters, CardResult},
  props: {
    pageName: String,
    depart: String,
    destinations: String,
    type: String,
    results: Array,
    countResult: Number
  },
  setup(props, context) {

    // onMounted(async () => {
    //   try {
    //     const google = await gmapsInit();
    //     const geocoder = new google.maps.Geocoder();
    //     const map = new google.maps.Map(document.getElementById('little_gmaps'));
    //
    //     geocoder.geocode({ address: 'Austria' }, (results:any , status:any ) => {
    //       if (status !== 'OK' || !results[0]) {
    //         throw new Error(status);
    //       }
    //
    //       map.setCenter(results[0].geometry.location);
    //       map.fitBounds(results[0].geometry.viewport);
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })

  }
});
</script>

<template>
  <div class="search-filters">
    <div class="content">
      <div class="title">
        <span class="uppercase">{{ depart }} vers {{ destinations }}</span> : {{ results[0].info.distance }} pour une
        durée de {{ results[0].info.duration }}
      </div>
      <div class="subtitle text-DesertSand">
        Départ à {{ results[0].origin.time }} pour arriver à {{ results[0].destination.time }}
      </div>
      <!--      <div class="filters">-->
      <!--        <div class="filter shadow-main">-->
      <!--        </div>-->
      <!--        <div class="filter shadow-main">-->
      <!--        </div>-->
      <!--        <div class="filter shadow-main">-->
      <!--        </div>-->
      <!--        <div class="filter shadow-main">-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
  <div class="search-content">
    <!--    <div class="filters shadow-main">-->
    <!--      <Filters></Filters>-->
    <!--    </div>-->
    <div class="results">
      <CardResultTransport v-if="pageName === 'Transports'" v-for="(step, key) in results[0].steps"
                           :result="step"></CardResultTransport>
    </div>
  </div>
</template>