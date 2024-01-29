<script lang="ts">
import {defineComponent, reactive, ref, watch} from "vue";

export default defineComponent({
  name: "Tabs",
  props: {
    cities: Array,
    currentCity: String,
  },
  setup(props, context) {
    let selectedCity = ref(props.currentCity);

    watch(selectedCity, (currentValue, oldValue) => {

      context.emit('city-transport', currentValue);
      context.emit('city-hotel', currentValue);
    });

    return {
      selectedCity,
    }
  },
})
</script>

<template>
  <div class="list-tabs">
    <div v-for="city in cities">
      <div v-if="selectedCity === city" class="tab-content current"
           v-on:click.capture="selectedCity = city">{{ city }}
      </div>
      <div v-else class="tab-content"
           v-on:click.capture="selectedCity = city">{{ city }}
      </div>
    </div>

  </div>
</template>