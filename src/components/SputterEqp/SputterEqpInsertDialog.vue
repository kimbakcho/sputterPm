<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" >
      <q-card class="q-pa-md">
        <q-input v-model="eqpId" label="설비ID">

        </q-input>
        <q-input v-model="eqpName" label="설비 이름">

        </q-input>
        <q-card-actions>
          <q-btn color="primary" label="추가" @click="addEqp">

          </q-btn>
          <q-btn  label="취소" @click="onCancelClick">

          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<style >
</style>

<script lang="ts">
import {defineComponent, ref} from "vue";
import { useDialogPluginComponent } from 'quasar'
import SputterEqpUseCase from "@/Bis/SputterEqp/Domain/SputterEqpUseCase";

export default defineComponent({
  name: '',
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    let eqpId = ref("")
    let eqpName = ref("")
    let sputterEqpUseCase = new SputterEqpUseCase()
    async function addEqp(){
      await sputterEqpUseCase.save({
        eqpId : eqpId.value,
        eqpName : eqpName.value
      })
      onDialogOK();
    }

    return {
      dialogRef,
      onDialogHide,
      eqpId,
      eqpName,
      addEqp,
      onCancelClick() {
        onDialogCancel();
      }
    }
  }
})

</script>
