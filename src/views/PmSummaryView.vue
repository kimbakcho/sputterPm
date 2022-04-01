<template>
  <div>

    <div>
      <apexchart height="350" :options="chartOptions" :series="series">

      </apexchart>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {FDCInputPortUseCase, FDCUseCase} from "@/Bis/FDC/Domain/UseCase/FDCInputPortUseCase";
import VueApexCharts from 'vue-apexcharts'
import {ApexOptions} from "apexcharts";
import {FDCRealValueResDto} from "@/Bis/FDC/Dto/FDCRealValueResDto";

export default Vue.extend({
  components:{
    apexchart: VueApexCharts,
  },
  data(){
    return {
      fDCInputPortUseCase: new FDCUseCase() as FDCInputPortUseCase,
      series: [] as any[],
      chartOptions: {
        chart: {
          type: 'bar'
        },
      } as ApexOptions
    }
  },
  mounted() {
    this.loadAll();
    setInterval(()=>{
      this.loadAll();
    },60000)
  },
  methods:{
    async loadAll(){
      this.series = []
      let fdcRealValueResDtos = await this.fDCInputPortUseCase.getRealValueAll();
      this.series.push(this.makeSeries(fdcRealValueResDtos));
    },
    makeSeries(src: FDCRealValueResDto[]) {
      let seriesDataList: any[] = []
      src.forEach(x=>{
        let goals = x.specs.map(spec=>{
          return {
            name: spec.specName,
            value: spec.spec,
            strokeWidth: 5,
            strokeColor: '#775DD0'
          }
        });
        seriesDataList.push({
          x: x.eqpName,
          y: Number(x.value.toFixed(2)),
          goals: goals
        })
      });
       return {
         name: 'current',
         data: seriesDataList,
       }
    }
  }
})
</script>

<style scoped>

</style>