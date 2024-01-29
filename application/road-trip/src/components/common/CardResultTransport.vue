<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'CardResultTransport',
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
  <div class="card transport shadow-main">
    <div class="card-content">
      <div class="card-container-text">
        <div class="card-info">
          <div class="card-header">
            <span class="card-title bg-purple-500 text-Cultured px-4 py-1 rounded-md">
              {{ result.line.short_name }} - {{ result.line.name }}
            </span>
            <span class="card-title bg-DesertSand text-Cultured px-4 py-1 rounded-md">
              Direction : {{ result.direction }}
            </span>
          </div>
          <div class="card-section">
            <div class="flex flex-row space-x-2">
              {{ result.depart.name }} -> {{ result.arrival.name }}
            </div>
            <div class="">
              Départ à {{ result.depart.time }} - Arrivée à {{ result.arrival.time }}
            </div>
          </div>
          <div class="card-time">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>

            <span>{{ result.line.short_name }}</span>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>