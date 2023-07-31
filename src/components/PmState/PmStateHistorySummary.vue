<template>
  <div>
      <div style="display: flex;align-items: center">
          <div>
              날짜 입력
          </div>
          <q-input type="date" v-model="dueReqDto.startDate" dense>

          </q-input>
          <div>
              ~
          </div>
          <q-input type="date" v-model="dueReqDto.endDate" dense>

          </q-input>
          <q-btn label="조회" @click="onSearchSummary" dense style="margin-left: 32px" color="primary">

          </q-btn>
      </div>
    <q-table :rows="rows" :columns="columns" :hide-bottomt="true" dense flat hide-pagination style="width: 30vw">
        <template v-slot:body="props" >
            <q-tr :props="props" @click="onSummaryHistory(props.row)">
                <q-td key="eqpName" :props="props">
                    <div>
                        <div>
                            {{ props.row.eqpName }}
                        </div>
                        <div>
                            {{ props.row.updateTime }}
                        </div>
                    </div>

                </q-td>
                <q-td key="schedulePM_Count" :props="props" >
                    {{props.row.schedulePMCount}}
                </q-td>
                <q-td key="recycleN2_Count" :props="props">
                    {{props.row.recycleN2Count}}
                </q-td>
            </q-tr>
        </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import PmStateUseCase from "@/Bis/PmsState/Domain/PmStateUseCase";
import {useQuasar} from "quasar";
import {PmStateHistorySummaryReqDto} from "@/Bis/PmsState/Dto/PmStateHistorySummaryReqDto";
import {DateTime} from "luxon";
import {PmStateHistorySummaryResDto} from "@/Bis/PmsState/Dto/PmStateHistorySummaryResDto";
import PmStateHistoryTableDialog from "@/components/PmState/PmStateHistoryTableDialog.vue";
import {PmStateHistoryReqDto} from "@/Bis/PmsState/Dto/PmStateHistoryReqDto";

const $q = useQuasar()

const columns = ref<Array<any>>([
    {
        name: "eqpName",
        label: "설비 이름",
        required: true,
    },
    {
        name: "schedulePM_Count",
        label: "정기 PM(세정품)",
        required: true,
    },
    {
        name: "recycleN2_Count",
        label: "Recycle(N2 Blow)",
        required: true,
    }
])

const rows = ref<Array<PmStateHistorySummaryResDto>>([])

const pmStateUseCase = new PmStateUseCase()

const dueReqDto = ref<PmStateHistorySummaryReqDto>({
    startDate: DateTime.now().minus({month:3}).toFormat("yyyy-MM-dd"),
    endDate: DateTime.now().toFormat("yyyy-MM-dd")
})

onMounted(async ()=>{
    await onSearchSummary()
})

async function onSummaryHistory(item: PmStateHistorySummaryResDto){
    $q.dialog({
        component: PmStateHistoryTableDialog,
        componentProps: {
            eqpName: item.eqpName,
            reqDto: {
                eqp: item.eqp,
                statTime: `${dueReqDto.value.startDate}T00:00:00`,
                endTime: `${dueReqDto.value.endDate}T23:59:59`
            } as PmStateHistoryReqDto
        }
    }).onDismiss(async ()=>{
        await onSearchSummary()
    })
}

async function onSearchSummary(){
    rows.value = await pmStateUseCase.getSummary({
        startDate:`${dueReqDto.value.startDate}T00:00:00`,
        endDate: `${dueReqDto.value.endDate}T23:59:59`
    })
}



</script>

<style >
</style>
