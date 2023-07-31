<template>
  <div>

    <div>
      <VueApexCharts height="350" :options="chartOptions" :series="series">

      </VueApexCharts>
    </div>
      <div style="display: flex">
          <PmState>

          </PmState>
          <PmStateHistorySummary style="margin-left: 32px">

          </PmStateHistorySummary>
      </div>

  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {FDCInputPortUseCase, FDCUseCase} from "@/Bis/FDC/Domain/UseCase/FDCInputPortUseCase";
import {FDCRealValueResDto} from "@/Bis/FDC/Dto/FDCRealValueResDto";
import VueApexCharts from "vue3-apexcharts";
import {ApexOptions} from "apexcharts";
import PmState from "@/components/PmState/PmState.vue";
import PmStateHistorySummary from "@/components/PmState/PmStateHistorySummary.vue";

const fDCInputPortUseCase = new FDCUseCase() as FDCInputPortUseCase

const series = ref<Array<any>>([])

const chartOptions = ref<ApexOptions>( {
        chart: {
            type: 'bar'
        },
    })

onMounted(()=>{
    loadAll();
    setInterval(()=>{
        loadAll();
    },60000)
})

async function loadAll(){
    series.value = []
    let fdcRealValueResDtos = await fDCInputPortUseCase.getRealValueAll();
    series.value.push(makeSeries(fdcRealValueResDtos));
}
function makeSeries(src: FDCRealValueResDto[]){
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
</script>

