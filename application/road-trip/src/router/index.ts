import {createRouter, createWebHistory} from "vue-router";
import HomepageView from "@/views/HomepageView.vue";
import ActivityView from "@/views/ActivityView.vue";
import BarsView from "@/views/BarsView.vue";
import HotelsView from "@/views/HotelsView.vue";
import RestaurantsView from "@/views/RestaurantsView.vue";
import TransportsView from "@/views/TransportsView.vue";
import GmapsView from "@/views/GmapsView.vue";
import DetailView from "@/views/DetailView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomepageView,
        },
        {
            path: "/maps",
            name: "maps",
            component: GmapsView
        },
        {
            path: "/activity",
            name: "activity",
            component: ActivityView
        },
        {
            path: "/activity/:place_id",
            name: "activity_detail",
            component: DetailView
        },
        {
            path: "/activity/maps",
            name: "activity_maps",
            component: GmapsView
        },
        {
            path: "/bars",
            name: "bars",
            component: BarsView
        },
        {
            path: "/bars/maps",
            name: "bars_maps",
            component: GmapsView
        },
        {
            path: "/bars/:place_id",
            name: "bars_detail",
            component: DetailView,
        },
        {
            path: "/hotels",
            name: "hotels",
            component: HotelsView
        },
        {
            path: "/hotels/maps",
            name: "hotels_maps",
            component: GmapsView
        },
        {
            path: "/hotels/:place_id",
            name: "hotels_detail",
            component: DetailView
        },
        {
            path: "/restaurants",
            name: "restaurants",
            component: RestaurantsView
        },
        {
            path: "/restaurants/maps",
            name: "restaurants_maps",
            component: GmapsView
        },
        {
            path: "/restaurants/:place_id",
            name: "restaurants_detail",
            component: DetailView
        },
        {
            path: "/transports",
            name: "transports",
            component: TransportsView
        },
        {
            path: "/transports/:place_id",
            name: "transports_detail",
            component: DetailView
        },
    ],
});

export default router;
