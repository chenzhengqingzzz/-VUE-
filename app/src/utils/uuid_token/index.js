/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-15 20:32:45
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-15 21:32:16
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/utils/uuid_token/index.js
 * @Description:封装游客身份的模块uuid---->生成一个随机的字符串（生成一次了就不能再变）
 *
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved.
 */
import { v4 as uuidv4 } from "uuid";

/**
 * @description: 生成一个随机字符串 且每次执行不能发生变化，游客的身份需持久存储  我们称这个为单例
 * @return {String}
 */
export const getUUID = () => {
  // 先从本地存储获取uuid（看一下本地存储里面是否有）
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  // 如果没有 我们就生成临时身份并存储
  if (!uuid_token) {
    uuid_token = uuidv4();
    //本地存储存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  // 切记封装的函数需要有返回值 没有返回值则会返回undefined
  return uuid_token
};
