<template>
  <div>
      <div>
          <q-table title="life 수율" :rows="yieldInfos"
                   :columns="columnMeta"
                   v-model:pagination="pagination"
                   :loading="loading"
                   dense
                   @request="onRequest">
              <template v-slot:top-right>
                  <q-btn
                      color="primary"
                      icon-right="archive"
                      label="Export to csv"
                      no-caps
                      @click="exportTable"
                  />
              </template>
          </q-table>
      </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import YieldUseCase from "@/Bis/Yield/Domain/YieldUseCase";
import {YieldInfoResDto} from "@/Bis/Yield/Dto/YieldInfoResDto";
import {exportFile} from "quasar";

const yieldUseCase = new YieldUseCase();

const yieldInfos = ref<Array<YieldInfoResDto>>([])

const loading = ref(false)

const columnMeta = ref<Array<any>>([
    {
        name: "lotId",
        label: 'lotId',
        field: "lotId",
    },
    {
        name: "eqpName",
        label: '설비',
        field: (row: any) => row.batchInfo.eqpName,
    },
    {
        name: "life",
        label: "life",
        field: (row: any) => row.batchInfo.life,
    },
    {
        name: "saveTime",
        label: '저장 시간',
        field: 'saveTime',
        sortable: true,
    },
    {
        name: "yield1",
        label: 'yield1',
        field: "yield1",
    },
    {
        name: "yield2",
        label: 'yield2',
        field: "yield2",
    },
    {
        name: "yield3",
        label: 'yield3',
        field: "yield3",
    },
    {
        name: "yield4",
        label: 'yield4',
        field: "yield4",
    },
    {
        name: "yield5",
        label: 'yield5',
        field: "yield5",
    },
    {
        name: "yield6",
        label: 'yield6',
        field: "yield6",
    }
])

const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 50,
    rowsNumber: 0,
})


onMounted(async ()=>{
    const pageYieldInfos = await yieldUseCase.getYieldInfos({
        page: pagination.value.page -1,
        size: pagination.value.rowsPerPage,
        sort: "saveTime,desc"
    })
    yieldInfos.value = pageYieldInfos.content
    pagination.value.rowsNumber = pageYieldInfos.totalElements
})

async function onRequest(props: any){
    const { page, rowsPerPage, sortBy, descending } = props.pagination
    loading.value = true

    let sortQuery = sortBy
    if(!sortQuery){
        sortQuery = "saveTime,desc"
    }else {
        sortQuery += (descending? ",desc" : ",asc")
    }

    const pageYieldInfos = await yieldUseCase.getYieldInfos({
        page: page - 1,
        size: rowsPerPage,
        sort: sortQuery
    })
    yieldInfos.value = pageYieldInfos.content

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending
    pagination.value.rowsNumber = pageYieldInfos.totalElements

    loading.value = false
}
function wrapCsvValue (val: any, formatFn: any| undefined, row: any| undefined) {
    let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
}

function exportTable () {
    // naive encoding to csv format
    const content = [columnMeta.value.map(col => wrapCsvValue(col.label,null,null))].concat(
        yieldInfos.value.map(row => columnMeta.value.map(col => wrapCsvValue(
            typeof col.field === 'function'
                ? col.field(row)
                : row[ col.field === void 0 ? col.name : col.field ],
            col.format,
            row
        )).join(','))
    ).join('\r\n')
    console.log(content)
    const status = exportFile(
        'table-export.csv',
        new Blob(["\ufeff"+content],{type: 'text/csv;charset=utf-8;'}),
        {
            mimeType:'text/csv'
        }

    )

}
</script>

<style >
</style>
