<template>
    <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="city in hotList" :key="city.id">{{ city.nm }}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="(value, key) in cityList" :key="key">
                    <h2>{{ key }}</h2>
                    <ul v-for="item in value" :key="item.id">
                        <li>{{ item.nm }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(value, key, index) in cityList" :key="key" @touchstart="handleToIndex(index)">{{ key }}</li>
            </ul>
        </div>
    </div>
</template>   
<script>
export default {
    name: 'City',
    data(){
       return {
            cityList: {},
            hotList: []
       }
    },
    created(){
        this.axios.get('/api/cityList').then( res => {
            let cities = res.data.data.cities;
            return cities;
        }).then( res => {
            this.formateData(res);
        });
    },
    methods: {
        formateData(cities){
            let cityMap = {};
            for(let i = 0; i < cities.length; i ++){
                let cityLetter = cities[i]['py'].substring(0, 1).toUpperCase();
                if(cityMap.hasOwnProperty(cityLetter)){ //已经存在同类的城市
                    cityMap[cityLetter].push({
                        nm: cities[i].nm,
                        id: cities[i].id
                    });
                }else{
                    cityMap[cityLetter] = [{
                        nm: cities[i].nm,
                        id: cities[i].id
                    }];
                }
                if(cities[i]['isHot']){
                    this.hotList.push({
                        nm: cities[i]['nm'],
                        id: cities[i]['id']
                    });
                }
            }
            let tempStr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
             for(let i = 0; i < tempStr.length; i ++){
                 if(cityMap.hasOwnProperty(tempStr[i])){
                    this.cityList[tempStr[i]] = cityMap[tempStr[i]];
                 }
            }
            cityMap = null;
        },
        handleToIndex(index){
            let h2 = this.$refs.city_sort.getElementsByTagName('h2');
            this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
        }
    }
}
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>
