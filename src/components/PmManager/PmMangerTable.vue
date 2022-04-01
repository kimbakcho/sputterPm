<template>
  <div>
    <q-table :columns="columns" :rows="items">
      <template v-slot:body-cell-addSpec="props">
        <q-td class="text-right">
          <q-btn icon="fas fa-plus" @click="openSpecDialog(props.row)">

          </q-btn>
        </q-td>

      </template>
      <template v-slot:body-cell-remove="props">
        <q-td class="text-right">
          <q-btn icon="fas fa-trash" @click="removeItem(props.row)">

          </q-btn>
        </q-td>

      </template>

    </q-table>
    <SpecsDialog ref="SpecsDialog">

    </SpecsDialog>
  </div>
</template>

<style scoped>

</style>


<script lang="ts">
import {defineComponent, ref} from "vue";
import SpecsDialog from "@/components/PmManager/SpecsDialog.vue";
import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";
import {EqpPmInputPortUseCase, EqpPmUseCase} from "@/Bis/EqpPm/Domain/UseCase/EqpPmInputPortUseCase";

export default defineComponent({
  components:{
    SpecsDialog
  },
  setup(){
    const SpecsDialog = ref(null) as any
    return {
      SpecsDialog
    }
  },
  data() {
    return {
      columns: [{
        name: "eqpModuleId",
        label: "모듈 ID",
        field: "eqpModuleId"
      }, {
        label: "변수 명",
        name:  "paramName",
        field: "paramName"
      }, {
        label: "설비 코드",
        name:  "eqpId",
        field: "eqpId"
      }, {
        label: "설비명",
        name:  "eqpName",
        field: "eqpName"
      }, {
        label: "추가",
        name:  "addSpec",
        field: "addSpec"
      }, {
        label: "삭제",
        name: "remove",
        field: "remove"
      }],
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
      this.SpecsDialog.open(eqpPmResDto);
    },
    removeItem(eqpPmResDto: EqpPmResDto) {
      console.log("removeItem")
    }
  }

})

</script>
