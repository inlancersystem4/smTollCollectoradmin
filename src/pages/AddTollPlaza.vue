<script>

import Layout from '../components/Layout.vue';
import Label from '../subcomponents/Label.vue';
import Input from '../subcomponents/Input.vue';
import TextArea from '../subcomponents/TextArea.vue';
import Select from '../subcomponents/Select.vue';
import Button from '../subcomponents/Button.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import ErrorMessage from '../subcomponents/ErrorMessage.vue';


export default {
    components: {
        Layout,
        Label,
        Input,
        TextArea,
        Select,
        Button,
        OverLaye,
        ErrorMessage
    },
    data() {
        return {
            headerLinks: [
                {
                    name: 'Toll Plaza List',
                    route: '/toll-crud'
                },
            ],
            tollPlazaName: "",
            tollPlazaAddress: "",
            selectedOptionVal: "",
            fromSubmited: false,
        }
    },
    methods: {
        onOptionSelected(value) {
            this.selectedOptionVal = value;
        },
    },
}

</script>

<template>
    <Layout :Headlinks="headerLinks">

        <div class="w-full space-y-2 max-w-md">
            <h2 class="text-2xl font-semibold">Toll Plaza Crud</h2>
            <p class="text-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi natus distinctio beatae
                accusantium voluptate.
            </p>
        </div>

        <div class="my-6">

            <form class="w-full space-y-4">

                <div class="grid grid-cols-2 gap-x-4 gap-y-6">

                    <div class="space-y-1">

                        <Label label="label" />

                        <Input placeholder="enter here" :value="tollPlazaName" id="label"
                            @input="event => tollPlazaName = event.target.value" />

                        <ErrorMessage msg="This filed is reqired" v-if="tollPlazaName === '' && fromSubmited" />

                    </div>

                    <div class="space-y-1  col-span-2">

                        <Label label="label1" />

                        <TextArea placeholder="enter here" :value="tollPlazaAddress" id="label1"
                            @input="event => tollPlazaAddress = event.target.value" />

                        <ErrorMessage msg="This filed is reqired" v-if="tollPlazaAddress === '' && fromSubmited" />


                    </div>

                </div>

                <Button btn="Add Toll Plaza" />

            </form>

        </div>


        <OverLaye v-if="overalye" />
    </Layout>
</template>