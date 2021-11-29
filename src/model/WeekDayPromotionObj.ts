import 'reflect-metadata';
import { JsonProperty } from "../json/JsonProperty";
import ItemObj from "./ItemObj";

export default class WeekDayPromotionObj {
    @JsonProperty("date") date?: string = undefined; // 日期
    @JsonProperty({clazz:ItemObj}) skuReturnList?: ItemObj[] = undefined; // 商品列表
}