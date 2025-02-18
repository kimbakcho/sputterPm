<template>
    <div>
        <div>
            <q-table title="life 수율" :rows="yieldInfos"
                     :columns="columnMeta"
                     v-model:pagination="pagination"
                     :loading="loading"
                     :filter="filter"
                     dense
                     @request="onRequest">
                <template v-slot:body="props" >
                    <q-tr :props="props" :class="{isLowYield: isLowYield(props.row)}">
                        <q-td key="lotId" :props="props">
                            <div :class="{error: isError(props.row)}">
                                {{ props.row.lotId }}
                            </div>
                        </q-td>
                        <q-td key="eqpName" :props="props">
                            <div>
                                {{ props.row.batchInfo ? props.row.batchInfo.eqpName : "" }}
                            </div>
                        </q-td>
                        <q-td key="life" :props="props">
                            <div>
                                {{ props.row.batchInfo ? props.row.batchInfo.life : "" }}
                            </div>
                        </q-td>
                        <q-td key="saveTime" :props="props">
                            <div>
                                {{ props.row.saveTime }}
                            </div>
                        </q-td>
                        <q-td key="yield1" :props="props">
                            <div>
                                {{ props.row.yield1 }}
                            </div>
                        </q-td>
                        <q-td key="yield2" :props="props">
                            <div>
                                {{ props.row.yield2 }}
                            </div>
                        </q-td>
                        <q-td key="yield3" :props="props">
                            <div>
                                {{ props.row.yield3 }}
                            </div>
                        </q-td>
                        <q-td key="yield4" :props="props">
                            <div>
                                {{ props.row.yield4 }}
                            </div>
                        </q-td>
                        <q-td key="yield5" :props="props">
                            <div>
                                {{ props.row.yield5 }}
                            </div>
                        </q-td>
                        <q-td key="yield6" :props="props">
                            <div>
                                {{ props.row.yield6 }}
                            </div>
                        </q-td>
                        <q-td key="batchLots" :props="props">
                            <div>
                                {{ props.row.batchInfo ? props.row.batchInfo.lotId : "" }}
                            </div>
                        </q-td>
                    </q-tr>

                </template>
<!--                <template v-slot:body-cell-lotId="props">-->
<!--                    <q-td :props="props">-->
<!--                        <div :class="{error: isError(props.row)}">-->
<!--                            {{ props.row.lotId }}-->
<!--                        </div>-->
<!--                    </q-td>-->
<!--                </template>-->
                <template v-slot:top-right>
                    <q-btn
                        color="primary"
                        icon-right="archive"
                        label="Export to csv"
                        no-caps
                        @click="exportTable"
                    />

                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Search"
                             style="margin-left: 16px">
                        <template v-slot:append>
                            <q-icon name="search"/>
                        </template>
                    </q-input>
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

function isError(row: YieldInfoResDto){
    console.log("isError")
    if (row.batchInfo.lotId.indexOf(row.lotId) < 0) {
        return true;
    } else {
        return false
    }

}

function isLowYield(row: YieldInfoResDto){
    if((row.yield1 > 0 && row.yield1 < 0.93)
        || (row.yield2 > 0 && row.yield2 < 0.93)
        || (row.yield3 > 0 && row.yield3 < 0.93)
        || (row.yield4 > 0 && row.yield4 < 0.93)
        || (row.yield5 > 0 && row.yield5 < 0.93)
        || (row.yield6 > 0 && row.yield6 < 0.93)
    ){
        return true
    }
    return false

}

const columnMeta = ref<Array<any>>([
    {
        name: "lotId",
        label: 'lotId',
        field: "lotId",
    },
    {
        name: "eqpName",
        label: '설비',
        field: (row: any) => row.batchInfo ? row.batchInfo.eqpName : "",
    },
    {
        name: "life",
        label: "life",
        field: (row: any) => row.batchInfo ? row.batchInfo.life : "",
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
    },
    {
        name: "batchLots",
        label: "배치 Lot 정보",
        field: (row: any) => row.batchInfo ? row.batchInfo.lotId : "",
    }
])
const filter = ref('')
const pagination = ref({
    sortBy: 'saveTime',
    descending: true,
    page: 1,
    rowsPerPage: 50,
    rowsNumber: 0,
})


onMounted(async () => {
    const pageYieldInfos = await yieldUseCase.getYieldInfos(filter.value,
        {
            page: pagination.value.page - 1,
            size: pagination.value.rowsPerPage,
            sort: "saveTime,desc"
        })
    yieldInfos.value = pageYieldInfos.content
    pagination.value.rowsNumber = pageYieldInfos.totalElements
})

async function onRequest(props: any) {
    const {page, rowsPerPage, sortBy, descending} = props.pagination
    loading.value = true
    let sortQuery = sortBy

    if (!sortQuery) {
        sortQuery = "saveTime,desc"
    } else {
        sortQuery += (descending ? ",desc" : ",asc")
    }

    const pageYieldInfos = await yieldUseCase.getYieldInfos(
        filter.value,
        {
            page: page - 1,
            size: rowsPerPage ? rowsPerPage : 9999999,
            sort: sortQuery
        }
    )
    yieldInfos.value = pageYieldInfos.content

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending
    pagination.value.rowsNumber = pageYieldInfos.totalElements

    loading.value = false
}

function wrapCsvValue(val: any, formatFn: any | undefined, row: any | undefined) {
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


function jsonToCSV(json_data: any) {

    // 1-1. json 데이터 취득
    const json_array = json_data;
    // 1-2. json데이터를 문자열(string)로 넣은 경우, JSON 배열 객체로 만들기 위해 아래 코드 사용
    // const json_array = JSON.parse(json_data);


    // 2. CSV 문자열 변수 선언: json을 csv로 변환한 문자열이 담길 변수
    let csv_string = '';


    // 3. 제목 추출: json_array의 첫번째 요소(객체)에서 제목(머릿글)으로 사용할 키값을 추출
    const titles = Object.keys(json_array[0]);


    // 4. CSV문자열에 제목 삽입: 각 제목은 컴마로 구분, 마지막 제목은 줄바꿈 추가
    titles.forEach((title, index)=>{
        csv_string += (index !== titles.length-1 ? `${title},` : `${title}\r\n`);
    });


    // 5. 내용 추출: json_array의 모든 요소를 순회하며 '내용' 추출
    json_array.forEach((content: any, index: any)=>{

        let row = ''; // 각 인덱스에 해당하는 '내용'을 담을 행

        for(let title in content){ // for in 문은 객체의 키값만 추출하여 순회함.
            // 행에 '내용' 할당: 각 내용 앞에 컴마를 삽입하여 구분, 첫번째 내용은 앞에 컴마X
            row += (row === '' ? `${content[title]}` : `,${content[title]}`);
        }

        // CSV 문자열에 '내용' 행 삽입: 뒤에 줄바꿈(\r\n) 추가, 마지막 행은 줄바꿈X
        csv_string += (index !== json_array.length-1 ? `${row}\r\n`: `${row}`);
    })

    // 6. CSV 문자열 반환: 최종 결과물(string)
    return csv_string;
}

function exportTable() {
    // naive encoding to csv format
    let tempCsv =  yieldInfos.value.map(x=>{
        return {
            lotId: x.lotId,
            eqpName: x.batchInfo.eqpName,
            life: x.batchInfo.life,
            saveTime: x.saveTime,
            yield1: x.yield1,
            yield2: x.yield2,
            yield3: x.yield3,
            yield4: x.yield4,
            yield5: x.yield5,
            yield6: x.yield6,
            batchLots: x.batchInfo.lotId.replaceAll(",","/")
        }
    })
    const status = exportFile(
        'table-export.csv',
        new Blob(["\ufeff" + jsonToCSV(tempCsv)], {type: 'text/csv;charset=utf-8;'}),
        {
            mimeType: 'text/csv'
        }
    )

}
</script>

<style>
.error{
    color: red;
}
.isLowYield{
    color: red;
}
</style>

