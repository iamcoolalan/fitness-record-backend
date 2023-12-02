# Fitness Record API
這是一個基於Node.js和Express框架打造的健身API。它為使用者提供了一個方便的接口，用於獲取用戶數據，包括基本個人信息、詳細的訓練歷程以及身體健康的各項指標紀錄等。這個API的目的是希望使用者的客戶們能藉由這些紀錄，更好的分析自己的訓練狀況，藉此來提升用戶的訓練品質。

## Deploy on AWS
[連結](https://www.fitness-record.com/)

## 目錄

- [Feature - 產品功能](#feature---產品功能)
- [Documentation - 文件](#documentation-文件)
- [RESTful - 路由設計](#restful-路由設計)
- [Installation- 安裝](#installation---安裝)
- [Package - 使用套件](#package---使用套件)
- [Creator - 創作者](#creator---創作者)

## Feature - 產品功能

- 登入系統
  - 使用者可以透過自己註冊的資訊登入
  - 使用者可以註冊
  - 使用者可以檢查token是否有效
- 使用者相關功能
  - 使用者可以查看/修改 基本資料
  - 使用者可以查看/修改 目標
- 訓練紀錄相關功能
  - 使用者可以查看/新增/修改/刪除 訓練紀錄
  - 使用者可以查看特定訓練紀錄
  - 使用者可以查看/新增/修改/刪除 訓練紀錄細項
  - 使用者可以查看訓練項目種類
- 身體數據記錄相關功能
  - 使用者可以查看/新增/修改/刪除 身體數據紀錄
  - 使用者可以查看特定身體數據紀錄


## Documentation 文件

[點擊此連結查看API文件](https://documenter.getpostman.com/view/29142842/2s9YeHbrPd)

## RESTful 路由設計

### 登入系統
| Action | HTTP method | Route |
| :--- | :--- | :--- |
| 登入 | POST | /login |
| 註冊 | POST | /signup |
| 檢查token | GET | /check-token |

### 使用者功能
| Action | HTTP method | Route |
| :--- | :--- | :--- |
| 查看基本資料 | GET | /user/info |
| 查看目標 | GET | /user/target |
| 修改基本資料 | PATCH | /user/info |
| 修改目標 | PATCH | /user/target |

### 訓練紀錄
| Action | HTTP method | Route |
| :--- | :--- | :--- |
| 查看指定範圍訓練紀錄 | GET | /workout-record |
| 查看特定訓練紀錄 | GET | /workout-record/:workoutRecordId |
| 查看訓練項目種類 | GET | /workout-record/category |
| 新增訓練紀錄 | POST | /workout-record |
| 新增訓練細項 | POST | /workout-record/:workoutRecordId/details |
| 修改訓練紀錄 | PATCH | /workout-record |
| 修改訓練細項 | PATCH | /workout-record/:workoutRecordId |
| 刪除訓練紀錄 | DELETE | /workout-record |
| 刪除訓練細項 | DELETE | /workout-record/:workoutRecordId |

### 身體數據紀錄
| Action | HTTP method | Route |
| :--- | :--- | :--- |
| 查看指定範圍身體數據紀錄 | GET | /bodydata-record |
| 查看特定身體數據紀錄 | GET | /bodydata-record/:bodydataRecordId |
| 新增身體數據紀錄 | POST | /bodydata-record |
| 修改特定身體數據紀錄 | PATCH | /bodydata-record/:bodydataRecordId |
| 刪除特定身體數據紀錄 | DELETE | /bodydata-record/:bodydataRecordId |

## Installation - 安裝

1. 請先確認已安裝 Node.js 、 NPM
 與 MySQL
2. 將專案 clone 至本地
3. 在本地開啟後，透過終端機進入資料夾，輸入 :

    ```bash
    npm install
    ```
4. 安裝完畢後，設定MySQL相關資訊

    #### 修改config資料夾中的config.json檔案
    ```json
    {
      "development": {
      "username": 你的帳號,
      "password": 你的密碼,
      "database": 你想使用的database名稱,
      "host": "127.0.0.1",
      "dialect": "mysql"
      }
    }
    ```
5. 設定各項環境變數，以下有詳細說明
    - 專案內有預設`.envExample`, 將檔名中`Example`刪除後，即可開始設定
    - 打開後請更改以下項目
      ```bash
      SESSION_SECRET= any words
      JWT_SECRET= any words
      PORT= 3001
      ```
6. 在終端機中輸入以下指令建立table並且產生種子資料

    - 建立table
      ```bash
      npx sequelize db:migrate
      ```
    - 產生種子資料
      ```bash
      npx sequelize db:seed:all
      ```

    ##### *預設有提供三組使用者可以做測試
    | 使用者名稱 | email | 密碼 |
    | :---: | :---: | :---: |
    | user1 | user1@example.com | 123456789 |
    | user2 | user2@example.com | 123456789 |
    | user3 | user3@example.com | 123456789 |

7. 在終端機中輸入以下指令啟動程式

     ```bash
    npm run start
    ```
8. 若在終端機中看見此行訊息則代表順利運行，打開瀏覽器進入下列網址

    ```bash
    App is running on http://localhost:3001
    ```

9. 若欲暫停使用

    ```bash
    ctrl + c
    ```

## Package - 使用套件

| Package | version |
| :--- | :--- |
| Node.js | v18.18.1 |
| express | v4.18.2 |
| express-session | v1.17.3 |
| passport | v0.6.0 |
| passport-local | v1.0.0 |
| passport-jwt | v4.0.1 |
| jsonwebtoken | v9.0.2 |
| mysql2 | v3.6.1 |
| sequelize | v6.33.0 |
| sequelize-cli | v6.6.1 |
| bcryptjs | v2.4.3 |
| cors | v2.8.5 |
| @faker-js/faker | v8.1.0 |

## Creator - 創作者

### iamcoolAlan