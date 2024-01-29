
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({

  name: "Card",
  props: {
    currentCity: String,
    pageName: String,
  },
  setup() {

  },
})
</script>

<template>
  <div v-if="pageName === 'Restaurants'" class="card transport shadow-main">
    <div class="card-content">
      <div class="card-city">
        <span class="">{{currentCity}} => ?</span>
      </div>
      <div class="card-date">
        <span>Jeu. 1 sept. - Mar 6 sept.</span>
      </div>
      <div class="card-price">
        Dès <span class="text-DesertSand font-bold text-lg">101€</span>
      </div>
    </div>
  </div>
  <div v-else-if="pageName === 'Activity'">

  </div>
  <div v-else-if="pageName === 'Bars'">

  </div>
  <div v-else-if="pageName === 'Hotels'">

  </div>
  <div v-else-if="pageName === 'Transports'">

  </div>
</template>