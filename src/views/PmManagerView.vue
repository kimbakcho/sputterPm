<template>
  <div>
    <div class="headerAction">
      <v-btn @click="openAddDialog">
        <v-icon>
          fas fa-plus
        </v-icon>
        <div>
          추가
        </div>
      </v-btn>
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
import Vue, {VueConstructor} from "vue"
import PmInsertDialog, {PmInsertDialogType} from "@/components/PmManager/PmInsertDialog.vue";
import PmMangerTable, {PmMangerTableType} from "@/components/PmManager/PmMangerTable.vue";

export default (Vue as VueConstructor< Vue & {
  $refs:{
    PmInsertDialog: PmInsertDialogType,
    PmMangerTable: PmMangerTableType
  }
} >).extend({
  components:{
    PmInsertDialog,PmMangerTable
  },
  methods:{
    openAddDialog(){
      this.$refs.PmInsertDialog.open();
    },
    onAdd(){
      this.$refs.PmMangerTable.loadItems();
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