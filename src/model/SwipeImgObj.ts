import 'reflect-metadata';
import { JsonProperty } from "../json/JsonProperty";
export default class SwipeImgObj {
    @JsonProperty("id") id?: number = undefined; // 配置的幻灯片id
    @JsonProperty("img") img?: string = undefined; // 引用的图片路径
    @JsonProperty("redirectUrl") redirectUrl?: string = undefined; // 重定向跳转的url 为null则不需要跳转
}