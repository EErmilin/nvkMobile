import { IBloger } from "../../../models/User";

const TEST_POST = {
  "title": "Билии күнүгэр Саха сиригэр саамай улахан оскуола арылынна",
  "published": true,
  "id": 294,
  "images": [
    {
      "id": 2325,
      "url": "https://s3.001.gpucloud.ru/storage1/main/ae6641bb-02c0-4eff-a4ed-b8a8873038ab.jpeg",
      "url_1536": "https://s3.001.gpucloud.ru/storage1/main/ae6641bb-02c0-4eff-a4ed-b8a8873038ab_1536.jpeg",
    },
    {
      "id": 2326,
      "url": "https://s3.001.gpucloud.ru/storage1/main/a9a26aed-d258-432c-a64a-1241aef1f0e8.jpeg",
      "url_1536": "https://s3.001.gpucloud.ru/storage1/main/a9a26aed-d258-432c-a64a-1241aef1f0e8_1536.jpeg",

    },
    {
      "id": 2327,
      "url": "https://s3.001.gpucloud.ru/storage1/main/3c7157d5-5984-457f-a668-65b4c76d6cc4.jpeg",
      "url_1536": "https://s3.001.gpucloud.ru/storage1/main/3c7157d5-5984-457f-a668-65b4c76d6cc4_1536.jpeg",

    },
    {
      "id": 2329,
      "url": "https://s3.001.gpucloud.ru/storage1/main/66a48363-e072-4b54-91d5-c6967e5772f6.jpeg",
      "url_1536": "https://s3.001.gpucloud.ru/storage1/main/66a48363-e072-4b54-91d5-c6967e5772f6_1536.jpeg",

    },
    {
      "id": 2331,
      "url": "https://s3.001.gpucloud.ru/storage1/main/78f04c64-d5c7-4c73-a27f-dcd9aa9191cc.jpeg",
      "url_1536": "https://s3.001.gpucloud.ru/storage1/main/78f04c64-d5c7-4c73-a27f-dcd9aa9191cc_1536.jpeg",

    },
    {
      "id": 2324,
      "url": "https://s3.001.gpucloud.ru/storage1/main/1ed47e73-0d02-4f9d-83b7-259e496faac1.jpeg",
      "url_1536": "https://s3.001.gpucloud.ru/storage1/main/1ed47e73-0d02-4f9d-83b7-259e496faac1_1536.jpeg",

    }
  ],
  "views": 583,
  "preview": "Дьокуускай куорат 68 кыбартаалыгар К.Д. Уткин аатынан уулуссаҕа «Прометей» түөлбэҕэ өрөспүүбүлүкэ үрдүнэн саамай улахан - 15 тыһ. кв.м. иэннээх 39 №-дээх Николай Иванович Шарин аатынан оскуоланы үөрүүлээх быһыыга-майгыга арыйдылар. Бүгүн саҥа оскуола",
  "authorId": 105,
  "author": {
    "firstname": "НВК Саха",
    "lastname": "",
    "avatar": {
      "url_512": "https://s3.001.gpucloud.ru/storage1/main/b6e9c953-dc87-4781-8423-5bbacc933551_512.png",
      "url_256": "https://s3.001.gpucloud.ru/storage1/main/b6e9c953-dc87-4781-8423-5bbacc933551_256.png",
      "id": 687
    }
  },
  "createdAt": "2023-09-01T03:43:07.766Z"
}

export const TEST_BLOGER: IBloger = {
  nik: "tatia_12",
  about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur ligula eget urna ultricies, eu bibendum nulla tincidunt. Vivamus pellentesque libero eget tortor ullamcorper placerat.",
  content: {
    photo: [
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
      TEST_POST,
    ],
    video: [],
    audio: [],
  },
  sites: ["https://nvk-online.ru/new/istin/"],
  vk: "vk://nvk-online",
  telegram: "vk://nvk-online",
  youTube: "vk://nvk-online",
  odnoklassniki: "vk://nvk-online",
}



export const TEST_BLOGER_DATA =
{
  about: "About",
  nik: "Nik",
  odnoklassniki: "odn",
  sites: ["www.ai.ai", "ai.ai.ai"],
  telegram: "tg",
  vk: "vk",
  youTube: "you"
}



export const tmpData1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ]
export const tmpData2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
export const tmpData3 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ]
