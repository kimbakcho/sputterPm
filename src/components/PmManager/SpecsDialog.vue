<template>

  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div>
          <q-btn @click="addSpecs" label="추가" style="margin: 8px">

          </q-btn>
        </div>
        <q-table :columns="headers" :rows="items">
          <template v-slot:body-cell-remove="props">
            <q-btn @click="removeItem(props.row)" icon="fas fa-trash">

            </q-btn>

          </template>
        </q-table>
      </q-card-section>

    </q-card>
    <SpecInsertDialog ref="SpecInsertDialog" @addSpec="onAddSpec">

    </SpecInsertDialog>
  </q-dialog>

</template>



<script lang="ts">
import {defineComponent, ref} from "vue";
import SpecInsertDialog from "@/components/PmManager/SpecInsertDialog.vue";
import {SpecsResDto} from "@/Bis/Specs/Dto/SpecsResDto";
import {SpecsInputPortUseCase, SpecsUseCase} from "@/Bis/Specs/Domain/UseCase/SpecsInputPortUseCase";
import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";


export default defineComponent({
  components:{
    SpecInsertDialog
  },
  setup(){
    const SpecInsertDialog = ref(null) as any
    return {
      SpecInsertDialog
    }
  },
  data(){
    return {
      dialog: false,
      headers: [
        {
          name: "idx",
          label: "idx",
          field: "idx"
        },
        {
          name: "spec",
          label: "spec",
          field: "spec"
        },
        {
          name: "specName",
          label: "specName",
          field: "specName"
        },
        {
          name: "remove",
          label: "remove",
          field: "remove"
        }
      ],
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
      this.SpecInsertDialog.open(this.openItem)
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

</script>
