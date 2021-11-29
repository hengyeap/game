import "reflect-metadata";
import IndexImg from "./IndexImg";
import IndexImgSlide from "./IndexImgSlide";
import { JsonProperty } from "../json/JsonProperty";
export default class AppIndexImg {
  indexImgProdListSelected?: string = undefined;
  indexImgProdListNormal?: string = undefined;
  indexImgProdListName?: string = undefined;
  topBackgroundType?: string = undefined;
  topBackground?: string = undefined;
  @JsonProperty({ name: "indexImgGold" })
  indexImgGold?: IndexImg = undefined;
  @JsonProperty({ name: "indexImgLife" })
  indexImgLife?: IndexImg = undefined;
  @JsonProperty({ name: "indexImgTsg" })
  indexImgTsg?: IndexImg = undefined;
  @JsonProperty({ name: "indexImgO2o" })
  indexImgO2o?: IndexImg = undefined;
  @JsonProperty({ name: "indexImgTmm" })
  indexImgTmm?: IndexImg = undefined;
  @JsonProperty({ name: "indexImg7" })
  indexImg7?: IndexImg = undefined;
  @JsonProperty({ name: "indexImg6" })
  indexImg6?: IndexImg = undefined;
  @JsonProperty({ name: "indexImg5" })
  indexImg5?: IndexImg = undefined;
  @JsonProperty({ name: "indexImg4" })
  indexImg4?: IndexImgSlide = undefined;
  @JsonProperty({ name: "indexImg3" })
  indexImg3?: IndexImg = undefined;
  @JsonProperty({ name: "indexImg2" })
  indexImg2?: IndexImg = undefined;
  @JsonProperty({ name: "indexImg1" })
  indexImg1?: IndexImg = undefined;
  @JsonProperty({ name: "indexImgJrbkBackground" })
  indexImgJrbkBackground?: IndexImg = undefined;
  @JsonProperty({ name: "indexImgTopBackground" })
  indexImgTopBackground?:  IndexImg = undefined; 
  @JsonProperty({ name: "indexImgStarAreaBackground" })
  indexImgStarAreaBackground?:  IndexImg = undefined;
}
