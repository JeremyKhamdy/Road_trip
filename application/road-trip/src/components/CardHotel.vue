<script lang="ts">
import {defineComponent, ref, watch} from "vue";

export default defineComponent({
  name: "Card-Hotel",
  props: {
    currentCity: String,
    cities: [],
    hotel: []
  },
  setup(props, context) {
    let selectedCity = ref(props.currentCity);

    watch(selectedCity, (currentValue, oldValue) => {

      context.emit('city-hotel', currentValue);
    });

    return {
      selectedCity,
    }
  }
})
</script>

<template>
  <div class="card hotel shadow-main">
    <div class="card-content">
      <div class="card-container-img">
        <RouterLink :to="{ name: 'hotels_detail', params: { place_id: hotel.place_id, photo: hotel.photos }}">
          <img class="card-img" :src="hotel.photos">
        </RouterLink>
      </div>
      <div class="card-container-text">
        <div class="card-title truncate">
          <RouterLink :to="{ name: 'hotels_detail', params: { place_id: hotel.place_id, photo: hotel.photos }}">
           {{ hotel.name }}
          </RouterLink>
        </div>
        <div class="card-note">
          <span class="bubble-note">{{ hotel.rating }}/5</span>
          <span class="">{{ hotel.user_ratings_total }} avis</span>
        </div>
        <!--        <div class="card-price">-->
        <!--          Dès <span class="text-Jet font-bold text-lg">101€</span>-->
        <!--        </div>-->

      </div>
    </div>
  </div>
</template>