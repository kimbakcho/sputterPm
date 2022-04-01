<template>
  <q-dialog v-model="dialog">
    <q-card>
      <div>
        스펙 입력
      </div>
      <q-card-section>
        <q-input label="모듈이름" v-model="eqpPmInsertReqDto.eqpModuleId">

        </q-input>
        <q-input label="변수명" v-model="eqpPmInsertReqDto.paramName">

        </q-input>
        <q-input label="설비 ID" v-model="eqpPmInsertReqDto.eqpId">

        </q-input>
        <q-input label="설비이름" v-model="eqpPmInsertReqDto.eqpName">

        </q-input>

      </q-card-section>


      <q-card-actions>
        <q-btn @click="add" :loading="loading">
          추가
        </q-btn>
        <q-btn @click="close">
          닫기
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>

<script lang="ts">
import {defineComponent} from "vue";
import {EqpPmInsertReqDto} from "@/Bis/EqpPm/Dto/EqpPmInsertReqDto";
import {EqpPmUseCase} from "@/Bis/EqpPm/Domain/UseCase/EqpPmInputPortUseCase";

export default defineComponent({
  name: '',
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

</script>
