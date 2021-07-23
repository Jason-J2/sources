let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


//  助力抽奖通用
async function jhy(id) {
    prize = `\n[活动id${id}]`
    let logindata = await get("zhuli", `login&comm_id=${id}`)
    if (logindata.loginStatus == 100 && logindata.key == "ok") {
        uid = logindata.config.uid
        for (i = 0; i < 3; i++) {
            await get("zhuli", `zhuli&uid=${uid}&comm_id=${id}`)
            let res = await get("zhuli", `choujiang&isdown=1&comm_id=${id}`)
            if (res.prize) {
                prize += res.prize + "-"
            } else {
                prize += "未中奖-"
            }
            await sleep(1000)
        }
    }
    return prize
}


//原神集卡活动 7.21-8.21
async function summer() {
    console.log("\n--------原神集卡活动开始--------\n")
    aid = "2021summer/m"
    let coderes = await axios.get("http://1oner.cn:1919/hykb/all")
    if(coderes) codeList = coderes.data.message
    else codeList = ["4cae9d15aa53c"]
    let needhelp = true
    while (needhelp) {
       if(codeList)  code = codeList[Math.round(Math.random() * (codeList.length))].yscode
       else code = codeList[0]
        console.log(`为${code}助力...`)
        let helpres = await get(aid, `giftcode&shareCode=${code}`)
        if (helpres.key == "ok" || helpres.key == "3007") needhelp = false
    }
    await get(aid, "playgame")
    await get(aid, "lingqushiwan")
    await get(aid, "lingquinvite")
    await get(aid, "xuyuan&resure=1")
    await get(aid, "share")
    await get(aid, "lingqushare")
    await get(aid, "qiandao")
    // await get(aid,"GetFuliMa&ma=no_miling")
    for (a = 1; a < 3; a++) {
        await get(aid, "jumprw&rwid=" + a)
        let cdata = await get(aid, "lingqujumprw&rwid=" + a, true)
        if (cdata.is_huizhang == 1) {
            console.log(`恭喜您获得卡牌 ${cdata.hz_name}`)
        } else if (cdata.is_huizhang == 0) {
            console.log(`恭喜您获得绯樱碎片 ${cdata.wzsp_num} 共${cdata.all_wzsp}`)
        } else {
            console.log(cdata.msg)
        }
    }
    let loginres = await get(aid, "login", true)
    if (loginres) {
        config = loginres.config
        mycode = config.invite_code
        console.log(`${loginres.name}的助力码 ${mycode}\n开始提交助力码`)
        let res1 = await axios.get(`http://1oner.cn:1919/hykb/info?uid=${loginres.uid}`)
        if (res1.data.err_code == 0) {
            let resi = await axios.post("http://1oner.cn:1919/hykb/update", `uid=${loginres.uid}&yscode=${mycode}&nickname=${encodeURI(loginres.name)}`)
            console.log(resi.data)
        } else {
            let resi = await axios.post("http://1oner.cn:1919/hykb/add", `uid=${loginres.uid}&yscode=${mycode}&nickname=${encodeURI(loginres.name)}`)
            console.log(resi.data)
        }
        info = `\n【原神集卡】 绯樱碎片${config.wzsp_nums} 神${config.cid1}泡${config.cid2}鸣${config.cid3}动${config.cid4}不${config.cid5}灭${config.cid6}影${config.cid7}断${config.cid8}\n`
        result += info
        console.log(info)
    }
    console.log("\n--------原神集卡活动运行结束--------\n")
}

//获取任务id
async function lottery(a, c, b) {
    let res = await axios.get(
        `https://huodong3.3839.com/n/hykb/${a}/m/?comm_id=${b}`
    );
    str = res.data.match(/daily_btn_(\d+)/g);
    //  console.log(res.data)
    await lottery2(a, c, b, str)
}
//快爆粉丝福利80080
async function lottery2(a, c, b, str) {
    for (i of str) {
        i = i.split("_")[2]
        await get(`${a}/m`, `DailyAppJump&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `DailyAppLing&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `chouqu&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `BaoXiangLing&comm_id=${b}&isyuyue=0&id=${i}`)
    }
    if (c != 0) {
        let info = await get(`${a}/m`, `login&comm_id=${b}&isyuyue=0`)
        let msg = `\n${c}：${info.config.daoju} 抽奖次数：${info.config.played}`
        result += msg
    }
}

//游戏单第7期 7.9-8.1
async function glist(id) {
    for (typeid of ["qq", "wx", "weibo"]) {
        await get("glist", `share&typeid=${typeid}&comm_id=${id}`)
        await sleep(1000)
    }
    await get("glist", `receiveBmh&comm_id=${id}`)
}

async function ddd(id) {
    await get("yuyue2020/m", `yuyuedown&comm_id=${id}&isyuyue=0&testkey=4399NoneDeviceId`)
    await get("yuyue2020/m", `yuyue&comm_id=${id}&isyuyue=0&testkey=4399NoneDeviceId`)
    await get("yuyue2020/m", `invite&comm_id=${id}&isyuyue=0&isfx=1&isdown=1&isdownonly=1&testkey=4399NoneDeviceId`)
    await get("yuyue2020/m", `playgame&comm_id=${id}&isyuyue=0&isfx=1&isdown=1&isdownonly=1&testkey=4399NoneDeviceId`)
    await get("yuyue2020/m", `choujiang&comm_id=${id}&isyuyue=0&isdown=1&isdownonly=1&testkey=4399NoneDeviceId`)
    await get("yuyue2020/m", `mycode&comm_id=${id}&isyuyue=0&testkey=4399NoneDeviceId`)
}

//史莱姆 2021-07-16 ~ 2021-07-31
async function slm() {
    console.log("\n--------夏日福利史莱姆养成计划开始(搜索2021666)--------\n")
    aid = "2021slm/m"
    slmdata = await get(aid, "login", true)
    await Promise.all([
        get(aid, "gofuli&resure=1"),
        get(aid, "share"),
        get(aid, "xinshou&resure=1"),
        get(aid, "gozhongcao&resure=1")
    ]);
    if (slmdata.config.day_guang != 2) {
        await get(aid, "guangczzl")
        await get(aid, "guang&resure=1")
    }
    let res = await axios.get(
        "https://huodong3.3839.com/n/hykb/2021slm/m/index.php"
    );
    str = res.data.match(/prize1_lingqu_(\d+)/g);
    for (id of str) {
        await get(aid, "playgame&gameid=" + id.split("_")[2])
    }
    for (id of str) {
        await get(aid, "lingqushiwan&gameid=" + id.split("_")[2])
    }
    let info = await get(aid, "login")
    if (info.key == "ok") {
        msg = `\n【史莱姆】：魔法值[${info.config.tizhong}]  露珠[${info.config.maoqiu}]\n`
        result += msg
        console.log(msg)
    }
    console.log("\n--------夏日福利 史莱姆养成计划结束--------\n")
}

async function task1() {
    console.log(`临时任务列表：
1：粉丝福利80080,25525,630630,79979都可以去首页搜索对应数字绑定qq`)
    await lottery("lottery", "[630630]王牌勋章", 5)
    await lottery("lottery", "[25525]补给箱", 4)
    await lottery("lottery", "[79979]宝石", 3)
    await lottery("lottery2", "0", 2)
    /*
    var ids = await axios.get("https://cdn.jsdelivr.net/gh/Wenmoux/sources/other/id.json");
    for (id of ids.data) {
        result += await jhy(id)
    }
*/
    await ddd(120)
    await ddd(115)
    await ddd(120)
    await ddd(115)
    await summer()
    await slm()
    await glist(2)

}