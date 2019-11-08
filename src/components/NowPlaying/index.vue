<template>
    <div class="movie_body">
        <Loading  v-if="isLoading"/>
        <Scroller v-else :handleToScroll = 'handleToScroll' :handleToTouchEnd = 'handleToTouchEnd'>
            <ul>
                <li v-if="isUpdate" class="update">{{ message }}</li>
                <li v-for="movie in movieList" :key="movie.id" @touchstart='handleDetail(movie.id)'>
                    <div class="pic_show"><img :src="movie.img | setImg('128.180')"></div>
                    <div class="info_list">
                        <h2>{{ movie.nm }} <img v-if="movie.version" src="@/assets/maxs.png"/></h2>
                        <p>观众评 <span class="grade">{{ movie.sc }}</span></p>
                        <p>主演: {{ movie.star}}</p>
                        <p>{{ movie.showInfo }}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>   
<script>
export default {
    name: 'NowPlaying',
    data(){
        return{
            movieList: [],
            isUpdate: false,
            message: '',
            isLoading: true,
            prevId: -1
        }
    },
    methods: {
        handleToScroll(pos){
            if(pos.y > 30){
                this.isUpdate = true;
                this.message = '喵喵~';
            }
        },
        handleToTouchEnd(pos){
            if(pos.y > 30){
                this.message = '汪汪~';
                this.axios.get('/api/movieOnInfoList?cityId=11').then( res => {
                setTimeout( () => {
                        this.movieList = res.data.data.movieList;
                        this.isUpdate = false;
                }, 1000);
                })
            }
        },
        handleDetail(movieId){
            this.$router.push('/movie/detail/1/' + movieId);
        }
    },
    activated(){
        let cityId = this.$store.state.city.id;
        if(this.prevId === cityId){
            return;
        }
        this.isLoading = true;
        this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then( res => {
            this.movieList = res.data.data.movieList;
            this.isLoading = false;
            this.prevId = cityId;
        })
    }
}
</script>
<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body ul li.update{ margin: 20px 0; justify-content: center; color: #f03d37; border: none;font-weight: 600;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
