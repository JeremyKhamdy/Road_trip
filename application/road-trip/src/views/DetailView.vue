<script lang="ts">
import {defineComponent, onMounted, onBeforeMount, onServerPrefetch, ref, toRefs} from "vue";
import {useRoute} from "vue-router";
import HeaderDetailCommon from "@/components/common/HeaderDetail.vue";
import {getDetail} from "@/services/CommonServices";
import SectionDetail from "@/components/common/SectionDetail.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "Detail",
  components: {SectionDetail, HeaderDetailCommon, Header},
  computed: {
    cssProps() {
      return {
        // '--img-url': !!this.props.photo ? photo.value = this.results[0].photos[0].photos : 'url(/src/assets/images/transports_valises.jpg)'
        '--img-url': 'url(' + this.$route.params.photo + ')'
      }
    }
  },
  setup(props, context) {
    let isShowMenu = ref(false);

    const routes = useRoute();
    const prevRoute = ref(null);
    const data = ref(null);
    const error = ref(null);
    const isLoading = ref(true);

    onMounted(async() => {
      data.value = await getDetail(routes.params.place_id);
      isLoading.value = false;
    })

    const showMenu = () => {
      isShowMenu.value = true;
    }

    const hideMenu = () => {
      isShowMenu.value = false;
    }

    return {
      isShowMenu,
      data,
      isLoading,
      error,
      prevRoute,
      showMenu,
      hideMenu
    }
  }
})
</script>

<template>
  <main :style="cssProps">
    <Header v-on:show-menu="showMenu" v-on:hide-menu="hideMenu" :is-show-menu="isShowMenu"></Header>
    <HeaderDetailCommon v-if="!isLoading" :result="data?.data"></HeaderDetailCommon>
    <SectionDetail v-if="!isLoading" :result="data?.data"></SectionDetail>
  </main>
</template>