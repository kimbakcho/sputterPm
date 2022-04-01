<template>
  <v-dialog v-model="dialog" max-width="30vw">
    <v-card>
      <v-card-title>
        스펙 입력
      </v-card-title>
      <v-card-text>
        <v-text-field label="모듈이름" v-model="eqpPmInsertReqDto.eqpModuleId">

        </v-text-field>
        <v-text-field label="변수명" v-model="eqpPmInsertReqDto.paramName">

        </v-text-field>
        <v-text-field label="설비 ID" v-model="eqpPmInsertReqDto.eqpId">

        </v-text-field>
        <v-text-field label="설비이름" v-model="eqpPmInsertReqDto.eqpName">

        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="add" :loading="loading">
          추가
        </v-btn>
        <v-btn @click="close">
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import {EqpPmInsertReqDto} from "@/Bis/EqpPm/Dto/EqpPmInsertReqDto";
import {EqpPmInputPortUseCase, EqpPmUseCase} from "@/Bis/EqpPm/Domain/UseCase/EqpPmInputPortUseCase";

const PmInsertDialog =  Vue.extend({
  data() {
    return {
      dialog: false,
      eqpPmInsertReqDto: {} as EqpPmInsertReqDto,
      eqpPmInputPortUseCase: new EqpPmUseCase(),
      loading: false
    }
  },
  methods: {
    async add() {
      this.loading = true
      this.$forceUpdate();
      await this.eqpPmInputPortUseCase.save(this.eqpPmInsertReqDto);
      this.$emit("add")
      this.loading = false;
      this.dialog = false;
    },
    open(){
      this.eqpPmInsertReqDto = {} as EqpPmInsertReqDto;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    }
  }
})
export type PmInsertDialogType = InstanceType<typeof PmInsertDialog>;
export default  PmInsertDialog;

</script>

<style scoped>

</style>