<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <div>
          <v-btn small text @click="drawer = !drawer">
            <v-icon>
              fas fa-bars
            </v-icon>
          </v-btn>

        </div>
        <div>
          Sputter PM
        </div>
      </div>

    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/PmManagerView">
          <v-list-item-title>
            스펙 관리
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/PmSummaryView">
          <v-list-item-title>
            PM Summary
          </v-list-item-title>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer : false
  }),
});
</script>
