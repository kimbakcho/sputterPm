<template>
  <div>
    <apexchart height="350" :options="chartData.chartOptions" :series="chartData.series" >

    </apexchart>
  </div>
</template>

<style >
</style>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {MvOutGroupWsSummary} from "@/Bis/WsLotSummary/Dto/MvOutGroupWsSummary";
import VueApexCharts from "vue3-apexcharts";
import {ApexOptions} from "apexcharts";

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
      rowsData: [] as MvOutGroupWsSummary[],
      series: [] as any[],
      chartOptions: {
        chart: {
          type: 'bar',
        },
        markers: {
          size: 2
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            formatter(val: number, opts?: any): string {
              let cassetteId = ""
              if(opts.dataPointIndex) {
                chartData.rowsData[opts.dataPointIndex].cassetteId.forEach(x=>{
                  cassetteId += `${x},`
                })
                return cassetteId
              }else {
                return `${val}`
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'datetime'
        }
      } as ApexOptions,
      chartKey : 0,
      loadChart(){
        chartData.series = [
          {
            name: "ser1",
            data: [

            ]
          }
        ]
        chartData.rowsData.forEach(x=>{
          let jsDate =  x.moveOutDttm.toJSDate().getTime();
          chartData.series[0].data.push([jsDate,x.waferCount])
        })
      }
    })
    return {
      loadChartData,
      chartData
    }
  }
})

</script>
