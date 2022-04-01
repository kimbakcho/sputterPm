<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-input v-model="specsInsertReqDto.specName" label="스펙 이름"> </q-input>
      <q-input v-model="specsInsertReqDto.spec" label="스펙 값"> </q-input>
      <q-card-actions>
        <q-btn @click="addSpecs" label="추가">

        </q-btn>
        <q-btn @click="dialog = !dialog" label="닫기">

        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<style scoped>

</style>

<script lang="ts">
import {defineComponent} from "vue";
import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";
import {SpecsInsertReqDto} from "@/Bis/Specs/Dto/SpecsInsertReqDto";
import {SpecsInputPortUseCase, SpecsUseCase} from "@/Bis/Specs/Domain/UseCase/SpecsInputPortUseCase";

export default defineComponent({
  data(){
    return {
      dialog: false,
      openEqpPm: {} as EqpPmResDto,
      specsInsertReqDto: {} as SpecsInsertReqDto,
      specsInputPortUseCase: new SpecsUseCase() as SpecsInputPortUseCase
    }
  },
  methods:{
    open(item: EqpPmResDto) {
      this.openEqpPm = item;
      this.specsInsertReqDto = {} as SpecsInsertReqDto;
      this.specsInsertReqDto.eqpPmIdx = item.idx;
      this.dialog = true
    },
    async addSpecs(){
      await this.specsInputPortUseCase.save(this.specsInsertReqDto)
      this.$emit('addSpec')
      this.dialog = false;
    }
  }
})

</script>

