<template>
  <v-dialog v-model="dialog" max-width="30vw">
    <v-card>
      <v-card-text>
        <v-text-field label="스펙 이름" v-model="specsInsertReqDto.specName">

        </v-text-field>
        <v-text-field label="스펙 값" v-model="specsInsertReqDto.spec">

        </v-text-field>
        <v-card-actions>
          <v-btn @click="addSpecs">
            추가
          </v-btn>
          <v-btn @click="dialog = !dialog">
            닫기
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";
import {SpecsInsertReqDto} from "@/Bis/Specs/Dto/SpecsInsertReqDto";
import {SpecsInputPortUseCase, SpecsUseCase} from "@/Bis/Specs/Domain/UseCase/SpecsInputPortUseCase";
const SpecInsertDialog =  Vue.extend({
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
export default SpecInsertDialog;
export type SpecInsertDialogType = InstanceType<typeof SpecInsertDialog>;
</script>

<style scoped>

</style>
