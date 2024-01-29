<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from "vue";
import HeaderCommon from "@/components/common/Header.vue";
import {useRoute} from "vue-router";
import Card from "@/components/Card.vue";
import Search from "@/components/search/Search.vue";
import {getAll, getEnjoyDetails} from "@/services/EnjoyServices";
import Header from "@/components/Header.vue";
import {getDrinksDetails} from "@/services/DrinkServices";
import {getSleepDetails} from "@/services/SleepServices";

export default defineComponent({
  name: "Activity",
  components: {Search, Card, HeaderCommon, Header},
  computed: {
    cssProps() {
      return {
        '--img-url': 'url(/src/assets/images/activite.jpg)'
      }
    }
  },
  setup() {
    let isShowMenu = ref(false);
    const routes = useRoute();
    const pageName = ref("Activités");
    const form = reactive({
      depart: "",
      destinations: "",
      regions: "",
      date_start: "",
      date_end: "",
      keywords: "",
    });

    let categoryValue = ref("");
    let ratingValue = ref(0);
    let priceMinValue = ref(0);
    let priceMaxValue = ref(0);
    let typesValue = ref([]);
    let results: any[] = [];
    let isInitForm = ref(0);
    let countResult = ref(0);

    onMounted(async () => {

      isInitForm.value = Object.keys(routes.query).length;
      for (let i = 0; Object.keys(routes.query).length >= i; i++) {
        if (Object(routes.query).destinations !== undefined) {
          form.destinations = Object(routes.query).destinations;
        }
        if (Object(routes.query).regions !== undefined) {
          form.regions = Object(routes.query).regions;
        }
        if (Object(routes.query).DateStart !== undefined) {
          form.date_start = Object(routes.query).DateStart;
        }
        if (Object(routes.query).DateEnd !== undefined) {
          form.date_end = Object(routes.query).DateEnd;
        }
        if (Object(routes.query).keyword !== undefined) {
          form.keywords = Object(routes.query).keyword;
        }
      }

      if (typeof isInitForm !== "undefined" && isInitForm.value !== 0) {
        getEnjoyDetails(form.destinations, 0, typesValue.value, priceMinValue.value, priceMaxValue.value, categoryValue.value).then((res) => {
          let data = res?.data;

          data.map(item => {
            results.push(item);
            countResult.value += 1;
          });

        });
      } else {
        getAll().then((res) => {
          let data = res?.data;

          data.map(item => {
            results.push(item);
            countResult.value += 1;
          });
        });
      }
    });

    const ratingFilters = (rating: number) => {
      getEnjoyDetails(form.destinations, rating, typesValue.value.value, priceMinValue.value, priceMaxValue.value, categoryValue.value).then((res) => {
        let data = res.data;
        results.splice(0, results.length);
        countResult.value = 0;

        data.map(item => {
          results.push(item);
          countResult.value += 1;
        });

        ratingValue.value = rating;

      });
    }

    const categoryFilters = (category: string) => {
      getEnjoyDetails(form.destinations, ratingValue.value, typesValue.value.value, priceMinValue.value, priceMaxValue.value, category).then((res) => {
        let data = res.data;
        results.splice(0, results.length);
        countResult.value = 0;

        data.map(item => {
          results.push(item);
          countResult.value += 1;
        });

        categoryValue.value = category;

      });
    }

    const priceFilters = (min: number, max: number) => {
      getEnjoyDetails(form.destinations, ratingValue.value, typesValue.value.value, min, max, categoryValue.value).then((res) => {
        let data = res.data;
        results.splice(0, results.length);
        countResult.value = 0;

        data.map(item => {
          results.push(item);
          countResult.value += 1;
        });

        priceMinValue.value = min;
        priceMaxValue.value = max;

      });
    }

    const typeFilters = (checkbox: []) => {
      typesValue.value = checkbox;
      getEnjoyDetails(form.destinations, ratingValue.value, checkbox.value, priceMinValue.value, priceMaxValue.value, categoryValue.value).then((res) => {
        let data = res.data;
        results.splice(0, results.length);
        countResult.value = 0;

        data.map(item => {
          results.push(item);
          countResult.value += 1;
        });

      });
    }

    const showMenu = () => {
      isShowMenu.value = true;
    }

    const hideMenu = () => {
      isShowMenu.value = false;
    }

    return {
      isShowMenu,
      pageName,
      results,
      isInitForm,
      form,
      countResult,
      categoryValue,
      ratingValue,
      priceMinValue,
      priceMaxValue,
      typesValue,
      ratingFilters,
      categoryFilters,
      priceFilters,
      typeFilters,
      showMenu,
      hideMenu
    }
  }
});
</script>

<template>
  <main :style="cssProps">
    <Header v-on:show-menu="showMenu" v-on:hide-menu="hideMenu" :is-show-menu="isShowMenu"></Header>
    <HeaderCommon :page-name="pageName"></HeaderCommon>
    <section class="search-section">
      <div class="last-search" v-if="isInitForm === 0">
        <div class="title-container shadow-main">
          <h2>Les dernières recherches</h2>
        </div>
        <div class="grid-cards">
          <Card v-for="n in 8" :key="n"></Card>
        </div>
      </div>
      <div class="search-container" v-else>
        <Search v-on:type-Filters="typeFilters" v-on:rating-Filters="ratingFilters" v-on:price-Filters="priceFilters"
                v-on:category-Filters="categoryFilters"
                :pageName="pageName"
                :type="pageName" :destinations="form.destinations" :countResult="countResult" :results="results"
                :ratingValue="ratingValue" :priceMinValue="priceMinValue" :priceMaxValue="priceMaxValue"
                :categoryValue="categoryValue">

        </Search>
      </div>
    </section>
    <footer class="footer">

    </footer>
  </main>
</template>