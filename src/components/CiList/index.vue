<template>
    <div class="cinema_body">
        <ul>
            <li v-for="cinema in cinemas" :key="cinema.id">
                <div>
                    <span>{{ cinema.nm }}</span>
                    <span class="q"><span class="price">{{ cinema.sellPrice }}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{ cinema.addr }}</span>
                    <span>{{ cinema.distance }}</span>
                </div>
                <div class="card">
                    <div v-for="(value, key) in cinema.tag" v-if="value==1"  :key="key" :class="key | classCard" >{{ key | formateCard }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'CiList',
    data(){
        return {
            cinemas: []
        }
    },
    created(){
        this.axios.get('/api/cinemaList?cityId=10').then( res => {
            let cinemas = res.data.data.cinemas;
            this.cinemas = cinemas;
        });
    },
    filters: {
        formateCard(key){
            let cardMap = {
                'allowRefund': '退款',
                'endorse': '退订',
                'snack': '小吃',
                'sell': '折扣卡'
            }
            return cardMap[key] ? cardMap[key] : '';
        },
        classCard(key){
            let cardMap = {
                'allowRefund': 'bl',
                'endorse': 'bl',
                'snack': 'or',
                'sell': 'or'
            }
            return cardMap[key] ? cardMap[key] : '';
        }
    }
}
</script>
<style scoped>
 #content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
