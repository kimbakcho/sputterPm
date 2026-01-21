<template>
  <div>
    <q-table :rows="rows" :columns="columns" :hide-bottomt="true" :pagination="{rowsPerPage: -1}" dense flat hide-pagination style="width: 30vw">
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="eqpName" :props="props">
                    <div>
                        <div>
                            {{ props.row.eqp.eqpName }}
                        </div>
                        <div>
                            {{ props.row.updateTime }}
                        </div>
                    </div>

                </q-td>
                <q-td key="schedulePM" :props="props" >
                    <q-checkbox :model-value="props.row.schedulePM" dense @update:modelValue="onSchedulePM(props.row,$event)" />
                </q-td>
                <q-td key="recycleN2" :props="props">
                    <q-checkbox :model-value="props.row.recycleN2"  dense @update:modelValue="onRecycleN2(props.row,$event)"/>
                </q-td>
                <q-td key="vacuumClean2" :props="props">
                    <q-checkbox :model-value="props.row.vacuumClean2"  dense @update:modelValue="onVacuumClean2(props.row,$event)"/>
                </q-td>
            </q-tr>
        </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {PmStateResDto} from "@/Bis/PmsState/Dto/PmStateResDto";
import PmStateUseCase from "@/Bis/PmsState/Domain/PmStateUseCase";
import {useQuasar} from "quasar";

const $q = useQuasar()

const columns = ref<Array<any>>([
    {
        name: "eqpName",
        label: "설비 이름",
        required: true,
    },
    {
        name: "schedulePM",
        label: "정기 PM(세정품)",
        required: true,
    },
    {
        name: "recycleN2",
        label: "Vacuum clean 1",
        required: true,
    },
    {
        name: "vacuumClean2",
        label: "Vacuum clean 2",
        required: true,
    }
])

const rows = ref<Array<PmStateResDto>>([])

const pmStateUseCase = new PmStateUseCase()

onMounted(async ()=>{
    rows.value = await pmStateUseCase.getCurrent()
})

function onSchedulePM(row: PmStateResDto,value: boolean){
    console.log(value)
    if (value){
        $q.dialog({
            message:"정기 PM을 하시겠습니까?"
        }).onOk(async ()=>{
            if(value){
                row.schedulePM = true
                row.recycleN2 = false
                row.vacuumClean2 = false
                rows.value = await pmStateUseCase.updatePM({
                    idx: row.idx,
                    schedulePM: row.schedulePM,
                    recycleN2: row.recycleN2,
                    vacuumClean2: row.vacuumClean2,
                })
            }else {
                row.schedulePM = true
            }

        })
    }
}

function onRecycleN2(row: PmStateResDto, value: boolean){
    console.log(value)
    if (value){
        $q.dialog({
            message:"Vacuum clean 1을 하시겠습니까?"
        }).onOk(async ()=>{
            if(value){
                row.recycleN2 = true
                row.schedulePM = false
                row.vacuumClean2 = false
                rows.value = await pmStateUseCase.updatePM({
                    idx: row.idx,
                    schedulePM: row.schedulePM,
                    recycleN2: row.recycleN2,
                    vacuumClean2: row.vacuumClean2,
                })
            }else {
                row.recycleN2 = true
            }

        })
    }
}

function onVacuumClean2(row: PmStateResDto, value: boolean){
    console.log(value)
    if (value){
        $q.dialog({
            message:"Vacuum clean 2를 하시겠습니까?"
        }).onOk(async ()=>{
            if(value){
                row.vacuumClean2 = true
                row.schedulePM = false
                row.recycleN2 = false
                rows.value = await pmStateUseCase.updatePM({
                    idx: row.idx,
                    schedulePM: row.schedulePM,
                    recycleN2: row.recycleN2,
                    vacuumClean2: row.vacuumClean2,
                })
            }else {
                row.vacuumClean2 = true
            }

        })
    }
}

</script>

<style >
</style>
