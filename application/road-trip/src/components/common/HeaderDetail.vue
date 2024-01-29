<script lang="ts">
import {defineComponent, reactive, ref, onMounted} from "vue";
import Header from "@/components/Header.vue";
import {useRoute, useRouter} from "vue-router";
import router from '@/router';
import Datepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'
import Rating from "@/components/common/Rating.vue";

export default defineComponent({
  name: "HeaderDetailCommon",
  components: {Rating},
  props: {
    result: Object,
    imageUrl: String,
  },
  setup(props, context) {
    const routes = useRoute();
    const test = "rrr";

    const goPreviousUrl = () => {
      router.go(-1);
      console.log('jjjj')
    };

    return {
      test,
      goPreviousUrl,
    }
  },
});
</script>

<template>
  <div class="detail-header">
    <div class="relative text-DesertSand shadow-main pb-20">
      <button v-on:click="goPreviousUrl">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
      </button>

    </div>
    <div class="w-full text-left p-4 flex flex-row items-center space-x-4 relative">
      <h1 class="text-Cultured">{{ result.name }}</h1>
      <Rating :rating="result.rating"></Rating>
    </div>
  </div>
</template>