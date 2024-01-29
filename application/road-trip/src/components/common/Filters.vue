<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: 'Filters',
  props: {
    result: Array,
    pageName: String,
    categoryValue: String,
    ratingValue: Number,
    priceMinValue: Number,
    priceMaxValue: Number,
  },
  setup(props, context) {
    let categoryVal = ref("");
    let nbrRating = ref(0);
    let nbrPriceMin = ref(0);
    let nbrPriceMax = ref(0);
    let checkboxTypes = ref([]);

    const submitRating = (nbRating: number) => {
      nbrRating.value = nbRating;
      context.emit('rating-filter', nbRating);
    };

    const submitCategory = (category: any) => {
      categoryVal.value = category.target.value;
      context.emit('category-filter', category.target.value);
    };

    const submitPrice = (nbMin: any, nmMax: any) => {
      nbrPriceMin.value = nbMin;
      nbrPriceMax.value = nmMax;
      context.emit('price-filter', nbMin, nmMax);
    };

    const emitCheckbox = () => {
      context.emit('emit-checkboxType', checkboxTypes)
    };

    return {
      nbrRating,
      nbrPriceMin,
      nbrPriceMax,
      checkboxTypes,
      categoryVal,
      emitCheckbox,
      submitRating,
      submitCategory,
      submitPrice,
    }
  }
});
</script>

<template>
  <!--  NOMBRE D'ETOILES -->
  <div class="flex flex-col w-full space-y-4">
    <span class="font-bold ">Nombre d'étoiles</span>
    <div class="flex flex-row space-x-2">
      <button v-on:click="submitRating(0)" v-if="ratingValue === 2"
              class="w-1/4 flex flex-row bg-GrayWeb btn px-1 py-2 text-Cultured space-x-2 shadow-main text-sm">
        <span> 2 </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>
      <button v-on:click="submitRating(2)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
        <span> 2 </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>
      <button v-on:click="submitRating(0)" v-if="ratingValue === 3"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
        <span> 3 </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>
      <button v-on:click="submitRating(3)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
        <span> 3 </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>
      <button v-on:click="submitRating(0)" v-if="ratingValue === 4"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
        <span> 4 </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>
      <button v-on:click="submitRating(4)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
        <span> 4 </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>
      <button v-on:click="submitRating(0)" v-if="ratingValue === 5"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm">
        <span> 5 </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>
      <button v-on:click="submitRating(5)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm">
        <span> 5 </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>

    </div>
  </div>

  <!--  PRIX MIN/MAX -->
  <div v-if="pageName ==='Restaurants'" class="flex flex-col w-full space-y-4">
    <span class="font-bold ">Prix Minimum</span>
    <div class="flex flex-row space-x-2">
      <button v-on:click="submitPrice(0, nbrPriceMax)" v-if="priceMinValue === 0"
              class="w-1/4 flex flex-row bg-GrayWeb btn px-1 py-2 text-Cultured space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 0 </span>
      </button>
      <button v-on:click="submitPrice(0, nbrPriceMax)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 0 </span>
      </button>
      <button v-on:click="submitPrice(0, nbrPriceMax)" v-if="priceMinValue === 1"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 1 </span>
      </button>
      <button v-on:click="submitPrice(1, nbrPriceMax)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 1 </span>
      </button>
      <button v-on:click="submitPrice(0, nbrPriceMax)" v-if="priceMinValue === 2"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 2 </span>
      </button>
      <button v-on:click="submitPrice(2, nbrPriceMax)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 2 </span>
      </button>
      <button v-on:click="submitPrice(0, nbrPriceMax)" v-if="priceMinValue === 3"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 3 </span>
      </button>
      <button v-on:click="submitPrice(3, nbrPriceMax)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 3 </span>
      </button>

      <button v-on:click="submitPrice(0, nbrPriceMax)" v-if="priceMinValue === 4"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 4 </span>
      </button>
      <button v-on:click="submitPrice(4, nbrPriceMax)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand shadow-main text-normal text-center justify-center">
        <span class="font-bold text-lg"> 4 </span>
      </button>
    </div>
  </div>

  <!--  PRIX MIN/MAX -->
  <div v-if="pageName ==='Restaurants'" class="flex flex-col w-full space-y-4">
    <span class="font-bold ">Prix Maximum</span>
    <div class="flex flex-row space-x-2">
      <button v-on:click="submitPrice(nbrPriceMin, 0)" v-if="priceMaxValue === 0"
              class="w-1/4 flex flex-row bg-GrayWeb btn px-1 py-2 text-Cultured space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 0 </span>
      </button>
      <button v-on:click="submitPrice(nbrPriceMin, 0)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 0 </span>
      </button>
      <button v-on:click="submitPrice(nbrPriceMin, 0)" v-if="priceMaxValue === 1"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 1 </span>
      </button>
      <button v-on:click="submitPrice(nbrPriceMin, 1)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 1 </span>
      </button>
      <button v-on:click="submitPrice(nbrPriceMin, 0)" v-if="priceMaxValue === 2"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 2 </span>
      </button>
      <button v-on:click="submitPrice(nbrPriceMin, 2)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 2 </span>
      </button>
      <button v-on:click="submitPrice(nbrPriceMin, 0)" v-if="priceMaxValue === 3"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 3 </span>
      </button>
      <button v-on:click="submitPrice(nbrPriceMin, 3)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand space-x-2 shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 3 </span>
      </button>

      <button v-on:click="submitPrice(nbrPriceMin, 0)" v-if="priceMaxValue === 4"
              class="w-1/4 flex flex-row bg-GrayWeb px-1 py-2 btn text-Cultured shadow-main text-sm justify-center">
        <span class="font-bold text-lg"> 4 </span>
      </button>
      <button v-on:click="submitPrice(nbrPriceMin, 4)" v-else
              class="w-1/4 flex flex-row bg-Cultured px-1 py-2 btn text-DesertSand shadow-main text-normal text-center justify-center">
        <span class="font-bold text-lg"> 4 </span>
      </button>
    </div>
  </div>

  <!--  TYPE D'ACTIVITÉS -->
  <div v-if="pageName === 'Activités'" class="flex flex-col w-full space-y-4">
    <span class="font-bold ">Category</span>
    <div class="flex flex-col space-y-2 pl-5">
      <select v-on:change="submitCategory" v-model="categoryVal">
        <option selected value="">
          Selectionner...
        </option>
        <option value="Attractions">
          Attractions
        </option>
        <option value="drinking establishment">
          Bars
        </option>
        <option value="Eating">
          Restaurants
        </option>
        <option value="Stores">
          Magasin/Shopping
        </option>
        <option value="Education">
          Écoles
        </option>
         <option value="Place of worship">
          Lieu de culte
        </option>
        <option value="Lodging establishment">
          Hotels
        </option>
        <option value="Public services">
          Publique
        </option>
        <option value="Transportation">
          Transports
        </option>
      </select>
    </div>
  </div>

  <!--  TYPE D'ETABLISSEMENT -->
  <div class="flex flex-col w-full space-y-4">
    <span class="font-bold ">Types</span>
    <div class="flex flex-col space-y-2 pl-5">
      <div class="flex flex-row space-x-2">
        <input v-on:change="emitCheckbox" id="checkbox-lodging" type="checkbox" value="lodging" v-model="checkboxTypes">
        <label for="checkbox-lodging">Logement</label>
      </div>
      <div class="flex flex-row space-x-2">
        <input v-on:change="emitCheckbox" id="checkbox-poi" type="checkbox" value="point_of_interest"
               v-model="checkboxTypes">
        <label for="checkbox-poi">Centre d'intérêt</label>
      </div>
      <div class="flex flex-row space-x-2">
        <input v-on:change="emitCheckbox" id="checkbox-establishment" type="checkbox" value="establishment"
               v-model="checkboxTypes">
        <label for="checkbox-establishment">Établissement</label>
      </div>
      <div class="flex flex-row space-x-2">
        <input v-on:change="emitCheckbox" id="checkbox-restaurants" type="checkbox" value="restaurant"
               v-model="checkboxTypes">
        <label for="checkbox-restaurants">Restaurants</label>
      </div>
    </div>
  </div>

</template>