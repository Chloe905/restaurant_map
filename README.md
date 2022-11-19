# CC美食地圖
***
此專案為使用node.js與Express開發的美食地圖，使用者可以在餐廳列表內依名稱、類別搜尋想要的餐廳，並可以新增餐廳、更改餐廳資訊、刪除餐廳及點入每間餐廳中，查看更詳細資訊。

### 專案畫面如下
***
#### 首頁
![image](https://user-images.githubusercontent.com/100898369/202116995-fca925e1-015e-4edd-ba71-4cee53980e55.png)

#### 詳細資訊
![image](https://user-images.githubusercontent.com/100898369/202117074-87c762d0-7594-4a84-8db0-a30806c45c64.png)

#### 新增頁面
![image](https://user-images.githubusercontent.com/100898369/202117229-c5e9db4d-9cf1-4ea0-9ef6-b43940687fd3.png)


### 功能列表
***
- 可於主畫面瀏覽所有餐廳，包含餐廳名、類別以及星等
- 搜尋欄可依名稱、類別進行搜尋，並可依字母、地區或類別排序
- 點擊+按鈕，可以新增喜愛餐廳
- 點擊任一家餐廳圖片或是下方 i 按鈕，即可查閱詳細資訊，如:餐廳類別、地址(及google-map連結)、電話和餐廳簡介
- 點擊每間餐廳下方鉛筆按鈕，可以進入修改餐廳資訊
- 點擊下方垃圾桶可以刪除此餐廳所有資訊


### Getting start
***
#### Prerequisites - 環境建置
1. [Node.js](https://nodejs.org/en/)
2. [npm](https://www.npmjs.com/)
2. [Nodemon](https://www.npmjs.com/package/nodemon)
3. [Express](https://www.npmjs.com/package/express)
4. [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)

#### Installing - 安裝流程
1. 打開你的 terminal，Clone 此專案至本機電腦
          
           $ git clone https://github.com/Chloe905/restaurant_map.git
    
2. 開啟終端機(Terminal)，進入存放此專案的資料夾

            $ cd restaurant_map 
    
3. 打開 VS code

            在 Terminal 輸入 $ code .
    
 即可開始編輯
 
4. 連線 mongoose

          MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
 
5. 啟動伺服器，執行 app.js 檔案

          在 Terminal 輸入 $ npm run seed
                          $ npm run dev
    
6. 當 terminal 出現以下字樣，表示本機伺服器已啟動並成功連結

           Express is running on http://localhost:3000

7. 若要暫停

          按下ctrl+c
          
現在，你可開啟任一瀏覽器瀏覽器輸入 http://localhost:3000 開始使用CC美食網 ~

#### Built With - 使用工具
***
* [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
* [Node.js](https://nodejs.org/en/) v18.12.0
* [Express](https://www.npmjs.com/package/express) 4.16.4- 應用程式架構
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) 3.0.0 - 模板引擎
* [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/) v5.1.3
* [fontawesome](https://fontawesome.com/v5/search?q=delete&o=r&m=free) v5.15.4
* [mongoDB](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_apac-tw_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624371&adgroup=115749712503&gclid=CjwKCAiAjs2bBhACEiwALTBWZcUKpTcWMYz-H2ujR3AWXk8bd7bfPB458D5WrtfmwolB5WWeWjP3zRoC7BwQAvD_BwE)
* [mongoose](https://mongoosejs.com/) 5.9.7
* [dotenv](https://www.npmjs.com/package/dotenv) 16.0.3
* [method override](https://www.npmjs.com/package/method-override) 3.0.0
#### Contributor - 專案開發人員
---
[Chloe905](https://github.com/Chloe905)
