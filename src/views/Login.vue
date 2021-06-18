<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="close">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Login and Start Shopping</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="email" :rules="emailRules" label="E-Mail" required append-icon="email"></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" label="Password" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :type="showPassword ? 'text' : 'password'" hint="At least 6 characters" counter @click:append="showPassword = !showPassword"></v-text-field>
                <div class="text-xs-center">
                    <v-btn color="accent lighten-1" :disabled="!valid" @click="submit">
                        Login
                        <v-icon right dark>lock_open</v-icon>
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'login',
    data(){
        return {
            valid: true,
            email: 'ihsan@example.org',
            emailRules: [
                v => !!v || 'Email is Required',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'Email must be valid'
            ],
            showPassword: false,
            password: '',
            passwordRules : [
                v => !!v || 'Password required',
                v => (v && v.length >= 6 ) || 'Min 6 Characters'
            ]
        }
    },
    computed: {
        ...mapGetters({
            user : 'auth/user'
        })
    },
    methods:{
        ...mapActions({
            setAlert : 'alert/set',
            setStatusDialog : 'dialog/setStatus',
            setAuth: 'auth/set'
        }),
        close(){
            this.setStatusDialog(false)
        },
        submit(){
            if(this.$refs.form.validate()){
                let formData = {
                    'email' : this.email,
                    'password': this.password
                }
                this.axios.post('/login', formData)
                .then(res => {
                    let data_user = res.data.data
                    this.setAuth(data_user)
                    if(this.user.id>0){
                        this.setAlert({
                            status : true,
                            text : 'Login Success',
                            type : 'success'
                        })
                        this.setStatusDialog(false)
                    } else {
                        this.setAlert({
                            status : true,
                            text : 'Login error',
                            type: 'error'
                        })
                    }
                })
                .catch(err => {
                    let responses = err.response 
                    this.setAlert({
                        status: true,
                        text: responses.data.message,
                        type: 'error'
                    })
                })
            }
        }
    }
}
</script>