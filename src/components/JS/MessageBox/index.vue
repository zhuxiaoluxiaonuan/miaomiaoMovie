<template>
    <div id="messageBox">
        <div class="master">
            <header>
                <span>{{ title }}</span>
                <i class="iconfont icon-quxiao cancelIcon" @touchstart='handleCancel'></i>
            </header>
            <main>
                当前城市：{{ content }}
            </main>
            <footer>
                <div class="cancel" @touchstart='handleCancel'>{{ cancel }}</div>
                <div class="sure" @touchstart='handleSure'>{{ sure }}</div>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MessageBox'
}
</script>
<style scoped>
#messageBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
}
#messageBox .master{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -75px 0 0 -100px;
    padding: 3% 3%;
    box-sizing: border-box;
    width: 200px;
    height: 150px;
    background-color: white;
    border-radius: 4%;
}
#messageBox .master header{
    margin-bottom: 8px;
    height: 30px;
    font-size: 18px;
}
#messageBox .master header .cancelIcon{
    float: right;
    font-size: 26px;
    cursor: pointer;
}
#messageBox .master header .cancelIcon:hover{
    color: #e54847;
}
#messageBox .master main{
    margin-bottom: 10px;
    line-height: 40px;
    font-size: 14px;
}
#messageBox .master footer{
    display: flex;
    height: 40px;
    justify-content: flex-end;
    align-items: center;

}
#messageBox .master footer div{
    margin-left: 10px;
    width: 50px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border-radius: 10%;
    border: 1px solid #e54847;
}
#messageBox .master footer div.cancel{
    background-color: white;
}
#messageBox .master footer div.sure{
    background-color: #e54847;
    color: white;
}
</style>