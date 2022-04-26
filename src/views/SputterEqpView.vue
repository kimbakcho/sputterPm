<template>
  <div>
    <div class="q-ma-sm row justify-end">
      <q-btn icon="fas fa-plus" label="추가" @click="onInsertDialog">
      </q-btn>
    </div>
    <q-table :rows="sputterEqpData.rows" :columns="sputterEqpData.columns">
      <template v-slot:body-cell-remove="props">
        <q-td class="text-right">
          <q-btn flat icon="fas fa-trash" @click="sputterEqpData.remove(props.row)" >

          </q-btn>
        </q-td>

      </template>
    </q-table>
  </div>
</template>

<style >
</style>

<script lang="ts">
import {defineComponent, onMounted, reactive} from "vue";
import {useQuasar} from "quasar";
import SputterEqpInsertDialog from "@/components/SputterEqp/SputterEqpInsertDialog.vue";
import SputterEqpUseCase from "@/Bis/SputterEqp/Domain/SputterEqpUseCase";
import {SputterEqpResDto} from "@/Bis/SputterEqp/Dto/SputterEqpResDto";

export default defineComponent({
  name: '',
  setup(){
    const $q = useQuasar()

    function onInsertDialog () {
      $q.dialog({
        component: SputterEqpInsertDialog
      }).onOk(()=>{
        loadData()
      })
    }

    let sputterEqpUseCase = new SputterEqpUseCase();
    let sputterEqpData = reactive({
      rows: [] as SputterEqpResDto[],
      columns: [
        {
          name: "idx",
          label: "idx",
          field:  "idx"
        },
        {
          name: "eqpId",
          label: "설비ID",
          field: "eqpId"
        },
        {
          name: "eqpName",
          label: "설비 이름",
          field: "eqpName"
        },
        {
          name: "remove",
          label: "remove"
        }
      ],
      async remove(row: SputterEqpResDto){
        await sputterEqpUseCase.delete(row.idx);
        await loadData();
      }
    })
    async function loadData(){
      sputterEqpData.rows = await sputterEqpUseCase.getList();
    }
    onMounted(() => {
      loadData();
    })
    return {
      onInsertDialog,
      sputterEqpData,
    }
  }
})

</script>
