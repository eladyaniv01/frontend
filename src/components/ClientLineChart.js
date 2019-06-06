import { Line } from 'vue-chartjs'
import Models from 'src/store/ORM/models.js'
var moment = require('moment')
export default {
    extends: Line,
    mounted() {
        this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
        this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

        this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
        this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
        this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
        this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
        this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');


        function thisWeekClientCount(day) {
            // int time interval (days) for a week it will be 7
            let now = moment(new Date())

            let count = 0

            let total = Models.Client.query().get()
            for (let i in total) {
                let ca = moment(Date.parse(total[i].created_at))
                if (now.diff(ca, 'days') <= 7) {

                    if (ca.day() == day) {
                        count += 1
                    }
                }
            }
            return count
        }
        function lastWeekClientCount(day) {
            // int time interval (days) for a week it will be 7
            let now = moment(new Date()).day(-7)

            let count = 0

            let total = Models.Client.query().get()
            for (let i in total) {
                let ca = moment(Date.parse(total[i].created_at))
                if (now.diff(ca, 'days') <= 7) {

                    if (ca.day() == day) {
                        count += 1
                    }
                }
            }
            return count
        }
        this.renderChart({
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [
                {
                    label: 'Clients This Week',
                    borderColor: '#FC2525',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: this.gradient2,
                    data: [thisWeekClientCount(0), thisWeekClientCount(1), thisWeekClientCount(2), thisWeekClientCount(3), thisWeekClientCount(4), thisWeekClientCount(5), thisWeekClientCount(6)]
                }, {
                    label: 'Clients Last week',
                    borderColor: '#05CBE1',
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'white',
                    borderWidth: 1,
                    backgroundColor: this.gradient,
                    data: [lastWeekClientCount(0), lastWeekClientCount(1), lastWeekClientCount(2), lastWeekClientCount(3), lastWeekClientCount(4), lastWeekClientCount(5), lastWeekClientCount(6)]
                }
            ]
        }, { responsive: true, maintainAspectRatio: false })

    }
}