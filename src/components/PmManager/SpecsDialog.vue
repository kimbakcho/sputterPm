<template>
  <v-dialog v-model="dialog" max-width="35vw">
    <v-card>
      <v-card-text>
        <div class="pa-4">
          <v-btn @click="addSpecs">
            추가
          </v-btn>
        </div>
        <v-data-table :headers="headers" :items="items" >
          <template v-slot:item.remove="{ item }">
            <v-btn @click="removeItem(item)">
              <v-icon>
                fas fa-trash
              </v-icon>
            </v-btn>

          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <SpecInsertDialog ref="SpecInsertDialog" @addSpec="onAddSpec">

    </SpecInsertDialog>
  </v-dialog>
</template>

<script lang="ts">
import Vue, {VueConstructor} from "vue"
import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";
import {DataTableHeader} from "vuetify";
import {SpecsResDto} from "@/Bis/Specs/Dto/SpecsResDto";
import {SpecsInputPortUseCase, SpecsUseCase} from "@/Bis/Specs/Domain/UseCase/SpecsInputPortUseCase";
import SpecInsertDialog, {SpecInsertDialogType} from "@/components/PmManager/SpecInsertDialog.vue";
const SpecsDialog = (Vue as VueConstructor<Vue & {
  $refs:{
    SpecInsertDialog: SpecInsertDialogType
  }
}>).extend({
  components:{
    SpecInsertDialog
  },
  data(){
    return {
      dialog: false,
      headers: [
        {
          text: "idx",
          value: "idx"
        },
        {
          text: "spec",
          value: "spec"
        },
        {
          text: "specName",
          value: "specName"
        },
        {
          text: "remove",
          value: "remove"
        }
      ] as DataTableHeader[],
      items: [] as SpecsResDto[],
      specsInputPortUseCase: new SpecsUseCase() as SpecsInputPortUseCase,
      openItem: {} as EqpPmResDto
    }
  },

  methods:{
    open(item: EqpPmResDto) {
      this.openItem = item
      this.loadSpecs();
      this.dialog = true
    },
    addSpecs(){
      this.$refs.SpecInsertDialog.open(this.openItem)
    },
    onAddSpec(){
      this.loadSpecs();
    },
    async loadSpecs() {
      this.items = await this.specsInputPortUseCase.getSpecsForEqp(this.openItem.idx)
    },
    async removeItem(item: EqpPmResDto) {
        await this.specsInputPortUseCase.delete(item.idx)
        await this.loadSpecs();
    }

  },
})
export default SpecsDialog;
export type SpecsDialogType = InstanceType<typeof SpecsDialog>;
</script>

<style scoped>

</style>