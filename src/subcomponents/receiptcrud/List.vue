<script>

export default {
    props: {
        list: Array
    },
    methods: {
        deleteToll(id) {
            this.$emit('delete_toll_plaza', id)
        },

        editToll(id) {
            this.$emit('edit_toll_plaza', id)
        },

        editStatus(id) {
            this.$emit('edit_status', id)
        }

    },
}
</script>

<template>
    <li class="list" v-for="(items, index) in list" :key="index">


        <div class="receipt-hall_box">
            <div class="get_receipt"></div>
        </div>

        <div class="receipt">

            <div class="receipt-header">
                <div class="border"></div>
                <div class="border"></div>
                <h1 class="title"> #{{ items.r_id }} Receipt</h1>
                <div class="border"></div>
                <div class="border"></div>
            </div>

            <div class="receipt-body">

                <ul class="receipt_data-list">

                    <li>
                        <div class="data">user name</div>
                        <div class="data_ans">{{ items.r_user_job }}</div>
                    </li>
                    <li>
                        <div class="data">Toll</div>
                        <div class="data_ans">{{ items.r_toll_plaza }}</div>
                    </li>
                    <li>
                        <div class="data">Lane</div>
                        <div class="data_ans">{{ items.r_lane_select }}</div>
                    </li>
                    <li>
                        <div class="data">Shift</div>
                        <div class="data_ans">{{ items.r_shift_select }}</div>
                    </li>

                </ul>


                <div class="border"></div>
                <div class="border"></div>

                <ul class="receipt_data-list">

                    <li>
                        <div class="data">vehical</div>
                        <div class="data_ans">{{ items.r_vehical_type }}</div>
                    </li>
                    <li>
                        <div class="data">vehical No.</div>
                        <div class="data_ans">{{ items.r_vehical_number }}</div>
                    </li>
                    <li>
                        <div class="data">vehical weight</div>
                        <div class="data_ans">{{ items.r_vehical_weight }}</div>
                    </li>
                </ul>


                <div class="border"></div>
                <div class="border"></div>

                <ul class="receipt_data-list">

                    <li>
                        <div class="data">quantity</div>
                        <div class="data_ans">{{ items.r_qty }}</div>
                    </li>

                </ul>


                <div class="border"></div>
                <div class="border"></div>

                <ul class="receipt_data-list">
                    <li>
                        <div class="data"><b> Total </b></div>
                        <div class="data_ans"><b>₹{{ items.r_price }}</b></div>
                    </li>
                </ul>


            </div>


        </div>

        <div class="options">
            <button class="btn-regular display-flex align-center gap-8px bg-white" v-if="items.status === true">
                <div class="ellipse-dot bg-emerald"></div>
                <p class="text-sm_medium color-Grey_60">Enable</p>
            </button>
            <button class="btn-regular display-flex align-center gap-8px bg-white" v-if="items.status === false">
                <div class="ellipse-dot bg-rose"></div>
                <p class="text-sm_medium color-Grey_60">Disable</p>
            </button>
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../assets/img/icons/dots-icon.svg">
                <ul class="custom-dropdown-list leftside icon-dropdown">
                    <li class="dropdown-item" @click="editToll(items.r_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/edit.svg">
                            <p class="dropdown-link-title"> Edit Receipt </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="deleteToll(items.r_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete Receipt </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.r_id)" v-if="items.status === false">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Enable </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.r_id)" v-if="items.status === true">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Disable </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </li>
</template>

<style scoped>
.list {
    width: 100%;
    border: 1px solid #E5E7EB;
    padding: 16px 24px 32px;
    border-radius: 8px;
    gap: 12px;
    position: relative;
}



.w20 {
    width: 20px;
}


.list .options .icon-btn {
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.list:hover .options .icon-btn {
    border: 1px solid var(--Grey-20);
    background-color: white;
}

.list .options {
    position: absolute;
    right: 8px;
    top: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 9;
}

.list .options .custom-dropdown:hover .custom-dropdown-list {
    display: inline-flex;
}

.list .options .custom-dropdown-list {
    top: 104%;
}


.list .receipt {
    background-color: #f4f4f4;
    width: 100%;
    position: relative;
    padding: 32px 16px;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -3rem;
}

.list .receipt:before {
    content: "";
    background-image: url('../../assets/img/noise.png');
    bottom: 0;
    display: block;
    left: 0;
    position: absolute;
    opacity: 0.2;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 8;
    height: calc(100% - 24px);
}


.list .receipt:after {
    content: "";
    background-image: url('../../assets/img/divider.svg');
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 24px;
}

.list .receipt .border {
    border-width: 1px;
    border-style: dashed;
    border-color: var(--Grey-40);
    margin: 4px 0;
}

.list .receipt .receipt-header .title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 12px 0;
}

.list .receipt .receipt-body {
    padding: 6px 18px;
}

.list .receipt .receipt_data-list {
    padding: 8px 0;
    position: relative;
    z-index: 9;
}

.list .receipt .receipt_data-list>*+* {
    margin-top: 6px;
}

.list .receipt .receipt_data-list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}


.list .receipt .receipt_data-list li .data {
    text-align: left;
    width: 40%;
    color: var(--Grey-50);
    font-size: 14px;
    text-transform: capitalize;
    position: relative;
    padding-right: 6px;
}

.list .receipt .receipt_data-list li b {
    color: #000;
}

.list .receipt .receipt_data-list li .data:after {
    content: ":";
    color: var(--Grey-50);
    width: 6px;
    top: 0;
    position: absolute;
    right: 0;

}

.list .receipt .receipt_data-list li .data_ans {
    text-align: right;
    width: 60%;
    color: var(--Grey-90);
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
}

.list .receipt-hall_box {
    width: 100%;
    padding: 24px 12px;
    margin-top: 36px;
    border: 10px solid transparent;
    background-color: #abacae;
    overflow: hidden;
    border-image: linear-gradient(90deg, rgba(246, 246, 246, 1) 0%, rgba(239, 240, 242, 1) 38%, rgba(229, 230, 232, 1) 100%) 1 round;
}

.list .receipt-hall_box .get_receipt {
    background-color: #333;
    border-radius: 999px;
    border: 2px solid #c5c5c7;
    padding: 10px;
}

@media (max-width:440px) {
    .list {
        padding: 16px 12px 24px;
    }

    .list .receipt {
        max-width: 100%;
        margin-top: 42px;
    }

    .list .receipt-hall_box {
        display: none;
    }

}
</style>