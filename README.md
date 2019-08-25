# 餐廳論壇

本網站程式區分前台及後台使用者，後者目前可以對餐廳進行新增、修改、取得詳細資訊、刪除

## 開發作業系統

- macOS Sierra 10.14.5

## 使用軟體及套件

"bcrypt-nodejs": "0.0.3",
"body-parser": "^1.19.0",
"connect-flash": "^0.1.1",
"dotenv": "^8.1.0",
"express": "^4.17.1",
"express-handlebars": "^3.1.0",
"express-session": "^1.16.2",
"faker": "^4.1.0",
"imgur-node-api": "^0.1.0",
"method-override": "^3.0.0",
"multer": "^1.4.2",
"mysql2": "^1.6.5",
"passport": "^0.4.0",
"passport-local": "^1.0.0",
"pg": "^7.12.1",
"sequelize": "^5.16.0",
"sequelize-cli": "^5.5.0"

- [MySQL](https://dev.mysql.com/downloads/mysql/) 8.0.16

- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) 8.0.16

## 安裝

- 安裝 MySQL

打開安裝檔，同意並點擊完安裝後，選擇 "Use Legacy Password Encryption"，按繼續並設置一組密碼，記得要勾選安裝完畢後啟動 MySQL

- 安裝 MySQL Workbench

安裝好後請務必注意 MySQL server 是否開啟

開啟 MySQL Workbench，點擊左下角已經先建好的連線「Local instance 3306」，密碼即是安裝時設定的密碼
在工作區寫以下程式碼

```
drop database if exists forum;
create database forum;
use forum;
```

接著開啟新的終端機輸入

```
cd 資料夾名稱 // 移動到指定資料夾
```

或輸入

```
mkdir 資料夾名稱 // 創建新資料夾
```

並在此資料夾中依序輸入

```
git clone https://github.com/F-Kibatodos/restaurant-forum.git    // 將此專案下載到資料夾
cd restaurant-forum                                              // 移動到專案資料夾
npm install                                                    // 下載相關npm套件
```

接著到根目錄/config/config.js 更改以下

```
"password": Workbench密碼,
"database": "forum"
```

繼續在終端機輸入

```
npx sequelize db:migrate
```

## 環境變數設定

請於專案資料夾根目錄下，新增一`.env`檔案
並且寫入

```
IMGUR_ID='個人的 imgur api 開發專案id'
```

## 執行

終端機輸入`npm run dev`，接著就可以在網頁輸入http://localhost:3000見到頁面

## 功能說明

後台使用者還能更改其他使用者的後台權限

## DEMO

![](https://i.imgur.com/TNtE1OL.gif)

### 作者

[F-Kibatodos](https://github.com/F-Kibatodos)
