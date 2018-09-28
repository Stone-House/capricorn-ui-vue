<template>
  <div>
    <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataFormat="dataFormat"
      :dataSource="dataSource"
      @dataplotRollover="dataplotRollover">
    </fusioncharts>
    <p>Display Value: {{displayValue}}</p>
  </div>
</template>
<script>
const myDataSource = {
  chart: {
    caption: 'Vue FusionCharts Sample',
    theme: 'fint',
  },
  data: [{ value: 1.9 }, { value: 2.3 }, { value: 2.1 }],
};

export default {
  name: 'vue-fusion-charts',
  data() {
    return {
      type: 'Pie2D',
      width: '500',
      height: '300',
      dataFormat: 'json',
      dataSource: myDataSource,
      displayValue: '',
    };
  },
  methods: {
    dataplotRollover: (e) => {
      this.displayValue = e.data.displayValue;
    },
  },
};
</script>
