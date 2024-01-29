<script lang="ts">
import {defineComponent, ref, watch} from "vue";

export default defineComponent({
  name: "Card-Activity",
  props: {
    currentCity: String,
    cities: [],
    activity: [],
    isLoading: Boolean
  },
  setup(props, context) {
    let selectedCity = ref(props.currentCity);

    watch(selectedCity, (currentValue, oldValue) => {

      context.emit('city-activity', currentValue);
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
        <RouterLink :to="{ name: 'activity_detail', params: { place_id: activity.place_id, photo: activity.photos }}">
          <img class="card-img" :src="activity.photos">
        </RouterLink>
      </div>
      <div class="card-container-text">
        <div class="card-title truncate">
          {{ activity.name }}
        </div>
        <div class="card-note">
          <span class="bubble-note">{{ activity.rating }}/5</span>
          <span class="">{{ activity.user_ratings_total }} avis</span>
        </div>
<!--        <div class="card-price">-->
<!--          Dès <span class="text-Jet font-bold text-lg">101€</span>-->
<!--        </div>-->

      </div>
    </div>
  </div>
</template>