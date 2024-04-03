<script>
import { fetchWrapper } from '../helpers/fetch-wrapper'
import Layout from '../components/Layout.vue';
const baseUrl = `${import.meta.env.VITE_API_URL}`;


export default {

  components: {
    Layout
  },
  data() {
    return {
      dashboradDataList: [],
      vehicleCounts: "",
      totalAmount: "",
    }
  },
  created() {
    this.dashboradData();
  },
  methods: {
    async dashboradData() {
      try {
        const response = await fetchWrapper.post(`${baseUrl}/admin/dashboard-statistics`);
        if (response && response.data) {
          this.dashboradDataList = response.data;
          this.vehicleCounts = this.dashboradDataList.reduce((total, item) => {
            return total + item.vehicle_counts;
          }, 0);
          this.totalAmount = this.dashboradDataList.reduce((total, item) => {
            return total + item.total_price;
          }, 0);
        } else {
          console.error('Invalid response format');
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
}

</script>

<template>
  <Layout>
    <div class="table-content !py-0">
      <div class="w-full py-2.5 px-2 bg-Grey_10 border-b border-solid border-Grey_20">
        <p class="text-large_semibold color-Grey_90 text-center"> Today's Statistics </p>
      </div>

      <div>
        <div class="display-flex items-center py-2.5 w-full border-b border-solid border-Grey_20">
          <div class="w-[48%] px-2 font-bold">vehicle Type</div>
          <div class="w-[26%] px-2 font-bold">vehicle Counts</div>
          <div class="w-[26%] px-2 font-bold">Amount</div>
        </div>

        <div v-for="item in dashboradDataList" :key="item" class="display-flex py-2 items-center w-full border-b border-solid border-Grey_20">
          <div class=" w-[48%] px-2">{{ item.vehicle_type }}</div>
          <div class=" w-[26%] px-2">{{ item.vehicle_counts }}</div>
          <div class=" w-[26%] px-2">{{ item.total_price }}</div>
        </div>
        <div class="display-flex items-center py-2.5 w-full border-b border-solid border-Grey_20">
          <div class="w-[48%] px-2 font-bold">Total</div>
          <div class="w-[26%] px-2 font-bold">{{vehicleCounts}}</div>
          <div class="w-[26%] px-2 font-bold">Rs. {{totalAmount}}</div>
        </div>
      </div>

    </div>

  </Layout>
</template>
