<template>
  <div>
    <q-layout view="hHh lpR lFf">

      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-toolbar-title>
            Sputter PM
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <q-list>
          <q-item to="/">
            <q-item-section>Home</q-item-section>
          </q-item>
          <q-item to="/PmManagerView">
            <q-item-section>스펙 관리</q-item-section>
          </q-item>
          <q-item to="/PmSummaryView">
            <q-item-section>PM Summary</q-item-section>
          </q-item>
          <q-item to="/SputterEqpView">
            <q-item-section>SputterEqpList</q-item-section>
          </q-item>
          <q-item to="/SputterBatchHistoryView">
            <q-item-section>Sputter 배치 히스토리</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: '',
  data(){
    return {
      drawer: false,
      leftDrawerOpen: true
    }
  },
  methods:{
    toggleLeftDrawer(){
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  }
})

</script>

