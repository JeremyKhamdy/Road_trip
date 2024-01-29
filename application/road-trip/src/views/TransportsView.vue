<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from "vue";
import HeaderCommon from "@/components/common/Header.vue";
import {useRoute} from "vue-router";
import Search from "@/components/search/Search.vue";
import Card from "@/components/Card.vue";
import {getAll, getTravelDetails} from "@/services/TravelServices";
import SearchTransport from "@/components/search/SearchTransport.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "Transports",
  components: {SearchTransport, Card, Search, HeaderCommon, Header},
  computed: {
    cssProps() {
      return {
        '--img-url' : 'url(/src/assets/images/transports_valises.jpg)'
      }
    }
  },
  setup() {
    let isShowMenu = ref(false);

    let isLoading = ref(true);
    const pageName = ref("Transports");
    const routes = useRoute();
    const form = reactive({
      depart: "",
      destinations: "",
      regions: "",
      date_start: "",
      date_end: "",
      keywords: "",
    });

    let results : any[] = [];
    let isInitForm = ref(0);
    let countResult = ref(0);

    onMounted(async () => {

      isInitForm.value = Object.keys(routes.query).length;
      for(let i = 0; Object.keys(routes.query).length >= i; i++) {
        if (Object(routes.query).depart !== undefined) {
          form.depart = Object(routes.query).depart;
        }
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
        getTravelDetails(form.depart, form.destinations).then((res) => {
          let data = res.data;
          console.log(data);
          results.push(data);
          countResult.value += 1;
          isLoading.value = false;
        });
      } else {
        getAll().then((res) => {
          let data = res.data;

          data.map(item => {
            results.push(item);
            countResult.value += 1;
          });
        });
      }
    });

    const showMenu = () => {
      isShowMenu.value = true;
    }

    const hideMenu = () => {
      isShowMenu.value = true;
    }

    return {
      isShowMenu,
      pageName,
      results,
      isInitForm,
      form,
      countResult,
      isLoading,
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

        <SearchTransport v-if="!isLoading" :page-name="pageName" :type="pageName" :depart="form.depart" :destinations="form.destinations" :countResult="countResult" :results="results">

        </SearchTransport>
<!--        <Search v-else :type="pageName" :page-name="pageName" :destinations="form.destinations" :countResult="countResult" :results="results">-->

<!--        </Search>-->
      </div>
    </section>
    <footer class="footer">

    </footer>
  </main>
</template>