import { JsonProperty } from "../json/JsonProperty";
import 'reflect-metadata';
export default class ItemObj {
  @JsonProperty("productId") productId?: number = undefined; //商品id
  @JsonProperty("skuId") skuId?: number = undefined; // 货品id
  @JsonProperty("name") name?: string = undefined; // 商品名
  @JsonProperty("img") img?: string = undefined; // 图片
  @JsonProperty("platform") platform?: string = undefined; // 平台号
  @JsonProperty("platformName") platformName?: string = undefined; // 平台名
  @JsonProperty("price") price?: number = undefined; // 价格
  @JsonProperty("referPrice") referPrice?: number = undefined; // 划线价
  @JsonProperty("currency") currency?: string = undefined; // 币种
  @JsonProperty("symbol") symbol?: string = undefined; // 货币符号

  @JsonProperty("promotionId") promotionId?: number = undefined; // 活动id
  @JsonProperty("inPromotion") inPromotion?: boolean = undefined; // 是否在活动中
}
