import { reduce } from 'highcharts'

const IconMappers = {
  icons: {
    id: 'fas fa-fingerprint',
    owner: 'fas fa-fingerprint',
    sex: 'fas fa-venus-mars',
    identification: 'fas fa-id-card',
    dob: 'fas fa-birthday-cake',
    first_name: 'fas fa-signature',
    last_name: 'fas fa-signature',
    created_at: 'fas fa-calendar-plus',
    address: 'fas fa-map-marked-alt',
    email: 'fas fa-envelope'
  },
  fields: {
    id: 'id',
    owner: 'Parent User',
    sex: 'Gender',
    identification: 'Resident ID',
    dob: 'Date of Birth',
    first_name: 'First Name',
    last_name: 'Last Name',
    address: 'Address',
    email: 'Email',
    created_at: 'created_at',
    nutritionist: 'nutritionist',
    is_staff: '-1'
  },
  fields_m2m: {
    clients: 'Clients',
    menus: 'Menus'
  },
  tooltip: {
    color: 'red',
    // 'background-color': 'bg-blue-3',
    anchor: 'center left'
  }
}
export default IconMappers
