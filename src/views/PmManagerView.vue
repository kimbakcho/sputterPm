<template>
  <div>
    <div class="headerAction">
      <q-btn @click="openAddDialog">
        <q-icon name="fas fa-plus">

        </q-icon>
        <div>
          추가
        </div>
      </q-btn>
    </div>
    <div>
      <PmMangerTable ref="PmMangerTable">

      </PmMangerTable>
    </div>
    <PmInsertDialog ref="PmInsertDialog" @add="onAdd">

    </PmInsertDialog>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PmMangerTable from "@/components/PmManager/PmMangerTable.vue";
import PmInsertDialog from "@/components/PmManager/PmInsertDialog.vue";
import { ref, onMounted } from 'vue'

export default defineComponent({
  name: '',
  components:{
    PmInsertDialog,PmMangerTable
  },
  setup(){

    const PmMangerTable = ref(null) as any
    const PmInsertDialog = ref(null) as any

    onMounted(()=>[

    ])

    function openAddDialog(){
      PmInsertDialog.value.open()
    }
    function onAdd(){
      PmMangerTable.value.open()
    }

    return {
      PmMangerTable,
      PmInsertDialog,
      openAddDialog,
      onAdd

    }
  }

})

</script>

<style scoped lang="sass">
.headerAction
  display: flex
  justify-content: flex-end
  padding: 16px
</style>

