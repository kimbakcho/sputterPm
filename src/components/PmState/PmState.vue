<template>
  <div>
    <q-table :rows="rows" :columns="columns" :hide-bottomt="true" dense flat hide-pagination style="width: 30vw">
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
        label: "Recycle(N2 Blow)",
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
                rows.value = await pmStateUseCase.updatePM({
                    idx: row.idx,
                    schedulePM: row.schedulePM,
                    recycleN2: row.recycleN2,
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
            message:"RecycleN2을 하시겠습니까?"
        }).onOk(async ()=>{
            if(value){
                row.recycleN2 = true
                row.schedulePM = false
                rows.value = await pmStateUseCase.updatePM({
                    idx: row.idx,
                    schedulePM: row.schedulePM,
                    recycleN2: row.recycleN2,
                })
            }else {
                row.recycleN2 = true
            }

        })
    }

}

</script>

<style >
</style>
