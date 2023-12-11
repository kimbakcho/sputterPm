<template>
  <div>
    <div class="searchBar row q-pa-md items-center">
      <q-input label="searchStartDate" readonly :model-value="searchData.searchDate.from">
        <q-popup-proxy>
          <q-date mask="YYYY-MM-DD" v-model="searchData.searchDate.from">
          </q-date>
        </q-popup-proxy>
      </q-input>
      <div>
        ~
      </div>
      <q-input label="searchEndDate" readonly :model-value="searchData.searchDate.to">
        <q-popup-proxy>
          <q-date mask="YYYY-MM-DD" v-model="searchData.searchDate.to">
          </q-date>
        </q-popup-proxy>
      </q-input>
      <q-select
          class="q-ml-md eqpSelector"
          label="설비 선택"
          v-model="searchData.eqpSelect"
          :options="searchData.eqpList"
          option-value="eqpId"
          multiple
          option-label="eqpName">

      </q-select>

      <q-btn flat icon="fas fa-search" @click="searchData.onSearch()" :loading="searchData.searchLoading" >

      </q-btn>

    </div>
    <BatchHistoryBarChart ref="batchHistoryBarChart">

    </BatchHistoryBarChart>

    <BatchHistoryPiChart ref="batchHistoryPiChart">

    </BatchHistoryPiChart>

    <BatchHistoryTable ref="batchHistoryTable">

    </BatchHistoryTable>
  </div>
</template>

<style>
</style>

<script lang="ts">

import {defineComponent, onMounted, reactive, ref} from "vue";
import {DateTime} from "luxon";
import {SputterEqpResDto} from "@/Bis/SputterEqp/Dto/SputterEqpResDto";
import SputterEqpUseCase from "@/Bis/SputterEqp/Domain/SputterEqpUseCase";
import WsLotSummaryUseCase from "@/Bis/WsLotSummary/Domain/WsLotSummaryUseCase";
import  {MvOutGroupWsSummary} from "@/Bis/WsLotSummary/Dto/MvOutGroupWsSummary";

import BatchHistoryBarChart from "@/components/SputterBatchHistroy/BatchHistoryBarChart.vue";
import BatchHistoryPiChart from "@/components/SputterBatchHistroy/BatchHistoryPiChart.vue";
import BatchHistoryTable from "@/components/SputterBatchHistroy/BatchHistoryTable.vue";



export default defineComponent({
  name: '',
  components:{
    BatchHistoryBarChart,BatchHistoryPiChart, BatchHistoryTable
  },
  setup() {

    let batchHistoryBarChart = ref<InstanceType<typeof BatchHistoryBarChart>|null>(null)
    let batchHistoryPiChart = ref<InstanceType<typeof BatchHistoryPiChart>|null>(null)
    let batchHistoryTable = ref<InstanceType<typeof BatchHistoryTable>|null>(null)
    onMounted(async () => {
      await searchData.loadEqpList()
      searchData.eqpSelect = [searchData.eqpList[0]]
    })
    let sputterEqpUseCase = new SputterEqpUseCase();
    let wsLotSummaryUseCase = new WsLotSummaryUseCase();
    let searchData = reactive({
      searchDate : {
        from: DateTime.now().minus({day: 30}).toFormat("yyyy-MM-dd"),
        to: DateTime.now().toFormat("yyyy-MM-dd")
      },
      searchLoading: false,
      eqpList: [] as SputterEqpResDto[],
      async loadEqpList() {
        searchData.eqpList = await sputterEqpUseCase.getList();
      },
      eqpSelect: [] as Array<SputterEqpResDto>,
      async onSearch() {
        searchData.searchLoading = true;
        const data = await wsLotSummaryUseCase.getWsLotSummary({
          eqpIds: searchData.eqpSelect.map(x=>x.eqpId),
          to: searchData.searchDate.to,
          from: searchData.searchDate.from
        })
        searchData.searchLoading = false;
        let tempMap = new Map<string,MvOutGroupWsSummary>()
        data.forEach(x=>{
          if(tempMap.get(x.moveOutDttm)){
            let mvOutGroupWsSummary = tempMap.get(x.moveOutDttm)!;
            mvOutGroupWsSummary.items.push(x)
            mvOutGroupWsSummary.waferCount++;
            let index = mvOutGroupWsSummary.cassetteId.findIndex((value: string) => {
              return value == x.cassetteId
            })
            if(index == -1){
              mvOutGroupWsSummary.cassetteId.push(x.cassetteId)
            }
          }else {
            tempMap.set(x.moveOutDttm,{
              moveOutDttm: DateTime.fromFormat(x.moveOutDttm,"yyyyMMddHHmmss"),
              items: [x],
              waferCount: 1,
              cassetteId: [x.cassetteId]
            })
          }
        })
        tableData.rows = Array.from(tempMap.values())
        batchHistoryBarChart.value!.loadChartData(tableData.rows)
        batchHistoryPiChart.value!.loadChartData(tableData.rows)
        batchHistoryTable.value!.loadTable(tableData.rows)

      }
    })

    let tableData = reactive({
      rows: [] as MvOutGroupWsSummary[]
    })


    return {
      searchData,
      tableData,
      batchHistoryBarChart,
      batchHistoryPiChart,
      batchHistoryTable
    }
  }
})

</script>
<style scoped>
.eqpSelector {
  min-width: 150px;
}
</style>
