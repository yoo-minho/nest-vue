<script setup lang="ts">
const options = {
  chart: {
    id: 'vuechart-example',
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'top',
    fontSize: '14px',
    fontWeight: 400,
    labels: {
      colors: ['white'],
    },
    itemMargin: {
      horizontal: 5,
      vertical: 5,
    },
    onItemClick: {
      toggleDataSeries: false,
    },
    onItemHover: {
      highlightDataSeries: false,
    },
  },
  labels: ['Apple', 'Mango', 'Ora22222222221222nge', 'Watermelon222222222222222'],
  plotOptions: {
    pie: {
      dataLabels: {
        minAngleToShowLabel: 1000,
      },
      customScale: 1.4,
      offsetY: 70,
    },
  },
  stroke: {
    show: false,
  },
  colors: ['#39d353', '#26a641', '#006d32', '#0e4429'],
};

const series = [60, 30, 20, 11];
</script>
<template>
  <q-card class="bg-dark q-py-md">
    <apexchart type="donut" :options="options" :series="series"></apexchart>
  </q-card>
</template>
<style></style>
