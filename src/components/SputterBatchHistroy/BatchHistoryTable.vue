<template>
  <div>
    <hot-table :settings="tableData.hotSettings" ref="hotTableComponent">

    </hot-table>
  </div>
</template>

<style >
</style>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';
import {MvOutGroupWsSummary} from "@/Bis/WsLotSummary/Dto/MvOutGroupWsSummary";
import Core from "handsontable/core";
import {CellProperties} from "handsontable/settings";
import "handsontable/languages/ko-KR";
import {DateTime} from "luxon";
registerAllModules();

export default defineComponent({
  name: '',
  components: {
    HotTable,
  },
  setup(){
    let hotTableComponent = ref<any>(null);
    function loadTable(rows: MvOutGroupWsSummary[]){
      tableData.rows = rows
      let hotInstance = hotTableComponent.value.hotInstance as Core;
      hotInstance.loadData(tableData.rows)
    }
    let tableData = reactive({
      rows: [] as MvOutGroupWsSummary[],
      hotSettings: {
        colHeaders: ["cassetteId","시간","배치 매수"],
        height: 300,
        columns:[{
          data: "cassetteId",
          renderer: (instance: Core, td: HTMLTableCellElement, row: number, col: number, prop: string | number, value: any, cellProperties: CellProperties)=>{
            if(value){
              let innerText = ""
              value.forEach( (x: any)=>{
                innerText += `${x},`
              })
              td.innerText = innerText
              return td;
            }
            return td;
          },
        },{
          data: "moveOutDttm",
          type: 'text',
          renderer: (instance: Core, td: HTMLTableCellElement, row: number, col: number, prop: string | number, value: any, cellProperties: CellProperties)=>{
            if(value){
              let innerText = ""
              let value2 = value as DateTime
              td.innerText = value2.toFormat("yyyy-MM-dd HH:mm:ss")
              return td;
            }
            return td;
          },
        },
          {
            data: "waferCount",
            type: 'numeric',
          }
        ],
        language: 'ko-KR',
        licenseKey: 'non-commercial-and-evaluation'
      },

    })
    return {
      loadTable,
      tableData,
      hotTableComponent
    }
  }
})

</script>
<style src="handsontable/dist/handsontable.full.css"></style>