<template>
  <div>
    <div>
      배치 진행 비율
    </div>
    <apexchart height="350" width="350" :options="chartData.chartOptions" :series="chartData.series" :key="chartData.chartKey">

    </apexchart>
  </div>
</template>

<style >
</style>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {MvOutGroupWsSummary} from "@/Bis/WsLotSummary/Dto/MvOutGroupWsSummary";
import {BatchHistoryPiChartDto} from "@/components/SputterBatchHistroy/BatchHistoryPiChartDto";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: '',
  components:{
    apexchart: VueApexCharts,
  },
  setup(){
    function loadChartData(rows: MvOutGroupWsSummary[]){
      chartData.rowsData = rows;
      chartData.loadChart()
    }
    let chartData = reactive({
      chartKey: 0,
      rowsData: [] as MvOutGroupWsSummary[],
      series: [] as any[],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [] as string[],

      },
      loadChart(){
        let pieMap = new Map<string,BatchHistoryPiChartDto>()
        chartData.rowsData.forEach(x=>{
          let key = `${x.waferCount}매`
          if(pieMap.get(key)){
            let batchHistoryPiChartDto = pieMap.get(key);
            batchHistoryPiChartDto!.batchCount++;
          }else {
            pieMap.set(key,{
              batchCount: 1,
              batchCountName: `${x.waferCount}`,
              rate: 0
            })
          }
        })
        let totalBatchCount = 0;
        pieMap.forEach(x=>{
          totalBatchCount += x.batchCount;
        })
        pieMap.forEach(x=>{
          x.rate = Math.round((x.batchCount/totalBatchCount)*10000)/100;
        })

        let keys = Array.from(pieMap.keys());
        let labels  = keys.map(x=>{
          return `${x} (${pieMap.get(x)!.rate} %)`
        })
        let values = Array.from(pieMap.values());
        chartData.series = []
        chartData.chartOptions.labels = labels
        values.forEach(x=>{
          chartData.series.push(x.batchCount)
        })
        chartData.chartKey++
      }
    })

    return {
      loadChartData,
      chartData
    }
  }
})

</script>
