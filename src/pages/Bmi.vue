<template>
  <div>
    <q-markup-table class="q-ma-sm">
      <thead>
        <tr class="tableizer-firstrow">
          <th>English</th>
          <th>עברית</th>
          <th>Man</th>
          <th>Woman</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Anorexia</td>
          <td>אנורקסיה</td>
          <td>Less then 17.5</td>
          <td>Less then 17.5</td>
        </tr>
        <tr>
          <td>Underweight</td>
          <td>תת משקל</td>
          <td>less then 20.7</td>
          <td>less then 19.1</td>
        </tr>
        <tr>
          <td>Normal weight</td>
          <td>משקל תקין</td>
          <td>20.7-26.4</td>
          <td>19.1-25.8</td>
        </tr>
        <tr>
          <td>A little overweight</td>
          <td>עודף משקל קטן</td>
          <td>26.4-27.8</td>
          <td>25.8-27.3</td>
        </tr>
        <tr>
          <td>over-weight</td>
          <td>עודף משקל</td>
          <td>27.8-31.1</td>
          <td>27.3-32.3</td>
        </tr>
        <tr>
          <td>Excess weight</td>
          <td>עודף משקל גדול</td>
          <td>More then 31.1</td>
          <td>More then 32.3</td>
        </tr>
        <tr>
          <td>Excessive weight</td>
          <td>עודף משקל חמור</td>
          <td>35-40</td>
          <td>35-40</td>
        </tr>
        <tr>
          <td>Overweight and morbid</td>
          <td>עודף משקל חולני</td>
          <td>40-50</td>
          <td>40-50</td>
        </tr>
        <tr>
          <td>Super overweight</td>
          <td>סופר עודף משקל</td>
          <td>50-60 kg/m2</td>
          <td>50-60 kg/m2</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: 'BMI',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
table.tableizer-table {
  font-size: 12px;
  border: 1px solid #ccc;
  font-family: Arial, Helvetica, sans-serif;
}
.tableizer-table td {
  padding: 4px;
  margin: 3px;
  border: 1px solid #ccc;
}
.tableizer-table th {
  background-color: #104e8b;
  color: #fff;
  font-weight: bold;
}
</style>