<template>
    <div>
        <v-subheader>History Belanja</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td><br>
                                Invoice: {{ item.invoice_number }}
                                <div class="primary--text-title">
                                    Rp. {{ item.total_price.toLocaleString('id-ID') }}
                                </div>
                                <small>date: {{ item.updated_at }}. Courier: {{ item.courier_service }}</small><br><br>
                            </td>
                            <td>
                                {{ item.status }}
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-container>
        </v-card>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            items: []
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set'
        })
    },
    mounted() {
        let config = {
            headers: {
                'Authorization': 'Bearer ' +this.user.api_token
            }
        }
        this.axios.get('/my-order', config)
        .then((response) => {
            let { data } = response.data
            this.items = data
        })
        .catch((error) => {
            let { data } = error.response
            this.setAlert({
                status: true,
                text: data.message,
                color: 'error'
            })
        })
    }
}
</script>