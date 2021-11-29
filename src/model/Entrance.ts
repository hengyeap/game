import { JsonProperty } from "../json/JsonProperty";
import 'reflect-metadata';
export default class Entrance {
  @JsonProperty("is_display") isDisplay?: boolean = undefined; //是否显示
  @JsonProperty("jump_path") jumpPath?: string = undefined; //跳转链接
  @JsonProperty("jump_type") jumpType?: string = undefined; //跳转类型 http_link
  pic?: string = undefined; //图片链接
  rank?: number = undefined; //顺序
}
