<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "SectionDetail",
  props: {
    result: Object
  },
  setup(props, context) {
    return {
      props
    }
  }
})

</script>

<template>
  <section class="detail-section">
    <div class="img-container">
      <img v-for="photo in result.photos" :src="photo.photos">
    </div>
    <div class="detail-container">
      <div class="info-container">
        <h2>Informations</h2>
        <div class="w-full text-left px-4 flex flex-row items-center space-x-4 relative text-SmokyBlack">
          <span class="text-DesertSand">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </span>
          <span class="font-normal">{{ result.formatted_address }}</span>
        </div>
        <div class="w-full text-left px-4 flex flex-row items-center space-x-4 relative text-SmokyBlack">
          <span class="text-DesertSand">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
          </span>
          <span class="font-normal">{{ result.formatted_phone_number }}, {{ result.international_phone_number }}</span>
        </div>
      </div>
      <div v-if="result.opening_hours" class="schedule-container">
        <h2>Horaires</h2>
        <div class="schedules">
          <span v-for="schedule in result.opening_hours.weekday_text" class="schedule">
            {{ schedule }}
          </span>
        </div>
      </div>
      <div class="review-container">
        <h2>Commentaires</h2>
        <div class="reviews">
          <div v-for="review in result.reviews" class="shadow-main review">
            <div class="photo-container">
              <img alt="" :src="review.profile_photo_url">
            </div>
            <div class="info-container">
              <div class="review-title">
                  {{ review.author_name }}
              </div>
              <div class="review-description">
                {{ review.text }}
              </div>
              <div class="review-date">
                {{ review.relative_time_description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>