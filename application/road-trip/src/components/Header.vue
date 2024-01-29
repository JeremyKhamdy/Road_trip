<template>
  <header class="header">
    <nav v-if="isShowMenu" class="nav burger-menu">
      <button v-on:click="hideMenu" class="space-y-2 burger-icon">
        <span class="block w-5 h-0.5 bg-gray-600"></span>
        <span class="block w-8 h-0.5 bg-gray-600"></span>
        <span class="block w-8 h-0.5 bg-gray-600"></span>
      </button>
      <ul class="nav-ul">
        <li class="nav-li">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/activity">Activités</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/bars">Bars</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/hotels">Hôtels</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/restaurants">Restaurants</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/transports">Transports</RouterLink>
        </li>
      </ul>
    </nav>
    <button v-if="!isShowMenu" v-on:click="showMenu" class="space-y-2 h-0 burger-icon py-4">
      <span class="block w-5 h-0.5 bg-gray-600"></span>
      <span class="block w-8 h-0.5 bg-gray-600"></span>
      <span class="block w-8 h-0.5 bg-gray-600"></span>
    </button>
    <nav class="nav navbar-menu">
      <ul class="nav-ul">
        <li class="nav-li">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/activity">Activités</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/bars">Bars</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/hotels">Hôtels</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/restaurants">Restaurants</RouterLink>
        </li>
        <li class="nav-li">
          <RouterLink to="/transports">Transports</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'Header',
  props: {
    isShowMenu: Boolean
  },
  mounted() {
  },
  setup(props, context) {
    // let isShowMenu = ref(false);
    const showMenu = () => {
      context.emit('show-menu', true)
    }

    const hideMenu = () => {
      context.emit('hide-menu', false)
    }

    return {
      // isShowMenu,
      showMenu,
      hideMenu,
    }
  }

})
</script>