<template>
  <div>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.addSpec="{ item }">
        <v-btn @click="openSpecDialog(item)">
          <v-icon>
            fas fa-plus
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.remove="{ item }">
        <v-btn @click="removeItem(item)">
          <v-icon>
            fas fa-trash
          </v-icon>
        </v-btn>
      </template>

    </v-data-table>
    <SpecsDialog ref="SpecsDialog">

    </SpecsDialog>
  </div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from "vue"
import {DataTableHeader} from "vuetify";
import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";
import {EqpPmInputPortUseCase, EqpPmUseCase} from "@/Bis/EqpPm/Domain/UseCase/EqpPmInputPortUseCase";
import SpecsDialog, {SpecsDialogType} from "@/components/PmManager/SpecsDialog.vue";

const PmMangerTable = (Vue as VueConstructor<Vue & {
  $refs:{
    SpecsDialog: SpecsDialogType
  }
}>).extend({
  components:{
    SpecsDialog
  },
  data() {
    return {
      headers: [{
        text: "모듈 ID",
        value: "eqpModuleId"
      }, {
        text: "변수 명",
        value: "paramName"
      }, {
        text: "설비 코드",
        value: "eqpId"
      }, {
        text: "설비명",
        value: "eqpName"
      }, {
        text: "스펙 추가",
        value: "addSpec"
      }, {
        text: "삭제",
        value: "remove"
      }] as DataTableHeader[],
      items: [] as EqpPmResDto[],
      eqpPmInputPortUseCase: new EqpPmUseCase() as EqpPmInputPortUseCase
    }
  },
  mounted() {
    this.loadItems()
  },
  methods:{
    async loadItems() {
      this.items = await this.eqpPmInputPortUseCase.getListAll();
    },
    openSpecDialog(eqpPmResDto: EqpPmResDto) {
      this.$refs.SpecsDialog.open(eqpPmResDto);
    },
    removeItem(eqpPmResDto: EqpPmResDto) {
      console.log("removeItem")
    }
  }

})
export default PmMangerTable;
export type PmMangerTableType = InstanceType<typeof PmMangerTable>;
</script>

<style scoped>

</style>
