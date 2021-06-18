<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>
                All Category
            </v-subheader>
            <v-layout row wrap>
                <v-flex v-for="category in categories" xs6 :key="category.id">
                    <v-card :to="'/category/'+ category.slug">
                        <v-img v-if="category.image" :src="getImage('/categories/'+category.image)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" v-text="category.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>favorite</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>bookmark</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>share</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <template>
            <div class="text-xs-center">
                <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="4"></v-pagination>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data(){
        return {
            categories: [],
            page: 0,
            lengthPage: 0
        }
    },
    methods: {
        go(){
            let url = '/categories'
            if(this.page>0) url = '/categories?page='+this.page
                this.axios.get(url)
                .then(res => {
                    let res_data = res.data
                    let categories = res_data.data
                    this.lengthPage = res_data.meta.last_page
                    this.categories = categories
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    },
    created(){
        this.go()
    }
}
</script>

<style scoped>
    .text-block{
        position: absolute;
        bottom: 5px;
        left: 5px;
        background-color: black;
        padding-left: 5px;
        padding-right: 5px;
        opacity: 0.7;
        width: 100%;
    }
</style>