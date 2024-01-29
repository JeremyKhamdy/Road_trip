<script lang="ts">
import {defineComponent, watch} from "vue";

export default defineComponent({
  name: 'CardResult',
  props: {
    result: Object,
    pageName: String,
  },
  setup(props, context) {

    // watch(props.result.name, (before, after) => {
    //   console.log(after);
    // });

    return {
      props
    }
  }
})

</script>

<template>
  <div class="card results shadow-main">
    <div class="card-content">
      <div class="card-container-img">
        <RouterLink v-if="pageName === 'Activités'" :to="{ name: 'activity_detail', params: { place_id: result.place_id, photo: result.photos }}"><img class="card-img" :src="result.photos"></RouterLink>
        <RouterLink v-else-if="pageName === 'Bars'" :to="{ name: 'bars_detail', params: { place_id: result.place_id, photo: result.photos }}"><img class="card-img" :src="result.photos"></RouterLink>
        <RouterLink v-else-if="pageName === 'Restaurants'" :to="{ name: 'restaurants_detail', params: { place_id: result.place_id, photo: result.photos }}"><img class="card-img" :src="result.photos"></RouterLink>
        <RouterLink v-else-if="pageName === 'Hotels'" :to="{ name: 'hotels_detail', params: { place_id: result.place_id, photo: result.photos }}"><img class="card-img" :src="result.photos"></RouterLink>
      </div>
      <div class="card-container-text">
        <div class="card-info">
          <div class="card-header">
            <span class="card-title">
              <RouterLink v-if="pageName === 'Activités'" :to="{ name: 'activity_detail', params: { place_id: result.place_id, photo: result.photos }}">{{ result.name }}</RouterLink>
              <RouterLink v-else-if="pageName === 'Bars'" :to="{ name: 'bars_detail', params: { place_id: result.place_id, photo: result.photos }}">{{ result.name }}</RouterLink>
              <RouterLink v-else-if="pageName === 'Restaurants'" :to="{ name: 'restaurants_detail', params: { place_id: result.place_id, photo: result.photos }}">{{ result.name }}</RouterLink>
              <RouterLink v-else-if="pageName === 'Hotels'" :to="{ name: 'hotels_detail', params: { place_id: result.place_id, photo: result.photos }}">{{ result.name }}</RouterLink>
            </span>
            <div v-if="result.opening_hours" class="card-open">
              <span>Ouvert</span>
            </div>
            <div v-else class="card-closed">
              <span>Fermé</span>
            </div>
          </div>
          <p class="card-address">
            {{ result.formatted_address }}
          </p>
          <img class="card-icon" alt="" :src="result.icon">
        </div>
        <div class="card-note">
          <span class="">{{ result.user_ratings_total }} évaluations</span>
          <span class="bubble-note">{{ result.rating }}/5</span>
        </div>
      </div>

    </div>
  </div>
</template>