export default ({ app, router, Vue }) => {
    Vue.filter('bmi', function (value) {
        if (isNaN(value)) {
            alert('huh')
            return value
        }
        if (!value) { return '' }
        value = parseFloat(value)
        if (value < 17) {
            return `<p :style="font color ="red" "> ${value} Anorexia</p>`
        }
        if (value < 20.7) {
            return `<font color ="orange">${value} UnderWeight</font>`
        }
        if (value < 25.8) {
            return `<font color ="green">${value} Normal Weight</font>`
        }
        if (value < 32.3) {
            return `<font color ="orange">${value} OverWeight</font>`
        }
        if (value < 40) {
            return `<font color ="yellow">${value} Severe OverWeight</font>`
        }
        if (value > 40) {
            return `<td :style="font color ="red" ">${value} Severe OverWeight</td>`
        }
        return value

    })
}
