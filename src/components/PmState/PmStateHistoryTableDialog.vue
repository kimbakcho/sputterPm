<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin" style="width: 1200px;min-width: 85vw">
            <q-card-section>
                <q-table :columns="columns"
                         ref="tableRef"
                         @request="onRequest"
                         v-model:pagination="pagination"
                         :rows="rows"
                         :title="props.eqpName"
                         :loading="loading"
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="PMType" :props="props">
                                <div>
                                    {{ getPmTypeString(props.row) }}
                                </div>

                            </q-td>
                            <q-td key="chamber1" :props="props">
                                <div>
                                    {{ props.row.chamber1 }}
                                </div>
                            </q-td>
                            <q-td key="chamber2" :props="props">
                                <div>
                                    {{ props.row.chamber2 }}
                                </div>
                            </q-td>

                            <q-td key="updateTime" :props="props">
                                {{ props.row.updateTime }}
                            </q-td>
                            <q-td key="comment" :props="props">
                                <div style="display: flex">
                                    <q-input v-model="props.row.comment" label="comment" style="flex-grow: 1">

                                    </q-input>
                                    <q-btn icon="save" dense padding="0" flat @click=onUpdateComment(props.row)>

                                    </q-btn>
                                </div>

                            </q-td>
                            <q-td key="delete" :props="props">
                                <q-btn label="삭제" dense color="primary" @click="onDelete(props.row)">

                                </q-btn>
                            </q-td>
                        </q-tr>

                    </template>


                </q-table>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import {useDialogPluginComponent, useQuasar} from "quasar";
import {defineEmits, defineProps, onMounted, ref} from "vue"
import {PmStateHistoryReqDto} from "@/Bis/PmsState/Dto/PmStateHistoryReqDto";
import PmStateUseCase from "@/Bis/PmsState/Domain/PmStateUseCase";
import {PmStateHistoryResDto} from "@/Bis/PmsState/Dto/PmStateHistoryResDto";

const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

defineEmits({...useDialogPluginComponent.emitsObject})

const props = defineProps<{ eqpName: string, reqDto: PmStateHistoryReqDto }>()

const tableRef = ref<any>(null)

const pmStateUseCase = new PmStateUseCase()

const $q = useQuasar()

const columns = ref<Array<any>>([{
    name: "PMType",
    label: "PM종류",
    style: "width: 100px"
}, {
    name: "chamber1",
    label: "chamber1",
    style: "width: 100px"
}, {
    name: "chamber2",
    label: "chamber2",
    style: "width: 100px"
}, {
    name: "updateTime",
    label: "시간",
    style: "width: 100px"
},{
    name: "comment",
    label: "comment"
} ,{
    name: "delete",
    label: "삭제",
    style: "width: 100px"
}])

const loading = ref(false)

const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10
})

const rows = ref<Array<PmStateHistoryResDto>>([])

onMounted(() => {
    setTimeout(() => {
        tableRef.value.requestServerInteraction()
    }, 100)

})

async function onRequest(props: any) {
    try {
        loading.value = true
        const {page, rowsPerPage, sortBy, descending} = props.pagination

        const fetchCount = rowsPerPage === 0 ? 999999 : rowsPerPage
        let pmStateResDtoPage = await loadPage(page - 1, fetchCount);
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
        rows.value = pmStateResDtoPage.content
        pagination.value.rowsNumber = pmStateResDtoPage.totalElements
    } finally {
        loading.value = false
    }

}

async function loadPage(page: number, size: number) {
    return await pmStateUseCase.getHistory({
        page: page,
        sort: "",
        size: size
    }, props.reqDto)
}

function getPmTypeString(item: PmStateHistoryResDto) {
    if (item.schedulePM) {
        return "정기 PM(세정품)"
    }
    if (item.recycleN2) {
        return "Vacuum clean"
    }

}

async function onDelete(item: PmStateHistoryResDto) {
    $q.dialog({
        message: "정말로 삭제 하시겠습니까?",
        ok: "삭제",
        cancel: "취소"
    }).onOk(async () => {
        await pmStateUseCase.deleteHistory(item.idx)
        tableRef.value.requestServerInteraction()
    })
}

async function onUpdateComment(row: PmStateHistoryResDto) {
    try{
        await pmStateUseCase.updatePMstateComment({
            id: row.idx,
            comment: row.comment
        })
        $q.dialog({
            message: "등록 되었습니다"
        })
    }catch (e) {
        $q.dialog({
            message:"에러가 발생 했습니다."
        })
        console.log(e)
    }

}
</script>


<style scoped>

</style>
