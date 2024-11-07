import playw from "playwright"
import fs from "fs"
import { log } from "console";
const { chromium } = playw
import { spawn } from 'child_process';
import Koa from 'koa';
import Router from '@koa/router';
import axios from 'axios';
import URL from 'url'
import { console } from "inspector";

const app = new Koa();
const router = new Router();

let browser = null;
let page = null;

// const {chromium} =  playwright;

const getHtmlByUrl = async (url) => {
    if(!browser){
        // 启动浏览器
        browser = await chromium.launch({
            // headless: false,
        });
        page = await browser.newPage();
        // setPageSize
        await page.setViewportSize({ width: 1440, height: 5120 });
    
        // await page.setViewportSize({ width: 1440, height: 5120 });
        // await page.goto('https://tophub.today/')
    }

    // 加载给定的URL
    await page.goto(url); // 将 'https://example.com' 替换为您的URL
   
    let content = null

    if(url.includes('tophub.today')){
        await page.waitForFunction(() => {

            console.log("wait---");

            const [,,,...rest] = [...document.querySelectorAll(".cc-cd")]; 

            console.log(rest.length, "length");
            return rest.length>=9
        }, { timeout: 8000 });

        content = await page.evaluate(() => {

            const MAX_GROUP = 12;
            const MAX_ITEM_IN_GROUP = 27;

            let [,,,...rest] = [...document.querySelectorAll(".cc-cd")];
            
            rest.length = Math.min(rest.length, MAX_GROUP);
            
            // 读取连接
            rest = rest.map(el=>Array.from(el.querySelectorAll("a")))
            
            // 每组最多取10条
            rest = rest.map(el=>el.slice(0, MAX_ITEM_IN_GROUP))

            // 数组扁平化
            rest = rest.flat()

            // 获取文本
            rest = rest.map(el=>el.innerText)

            rest = rest.map(el=>el.split(/\s/).join(" "))

            // 拼合
            return rest.join("\n")
        });
    }else{
        // await page.waitForFunction(() => {
        //     const element = document.querySelector('.n-card__content .loading');
        //     return !element
        // }, { timeout: 8000 });

        /**
         * 这是最常用的方法，它允许你等待页面达到特定的加载状态。 你可以指定以下状态：
         *  'domcontentloaded': DOM 树已解析完成，但这不意味着所有资源（如图片、样式表和脚本）都已加载完成。 对于简单的页面，这通常足够了。
         * 'load': 页面完全加载，包括所有资源。 这是最完整的加载状态，但可能需要更长时间。, 
         * 'networkidle': 网络连接空闲一段时间（默认为 500ms）。 这意味着页面可能仍在加载一些资源，但主要内容已经加载完成。 对于包含大量动态内容的页面，这通常是一个不错的选择。, 
         */
        await page.waitForLoadState('networkidle');

        // 提取所有文本内容
        content = await page.evaluate(() => document.body.innerText);
    }
    // 关闭浏览器
    // await browser.close();
    return content;
}

const getContentByUrl = async (ctx) => {
    const parsedUrl = URL.parse(ctx.request.url, true);
    console.log(parsedUrl, "请求信息");
    const url = parsedUrl.query.url??'https://tophub.today/';
    const timePoint = Date.now();
    const content = await getHtmlByUrl(url);
    // 耗时 格式为 m:s
    const timeHost=  (Date.now() - timePoint)/1000;

    const simple = parsedUrl.query.simple??'false';
    if(simple){
        ctx.body = content;
    }else{
        ctx.body = {
            content,
            timeHost,
            url,
        };
    }
};

router.get('/content', getContentByUrl);

app
.use(router.routes())
.use(router.allowedMethods())
;



const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});