import 'reflect-metadata';
import { JsonProperty } from "../json/JsonProperty";
import WeekDayPromotionObj from "./WeekDayPromotionObj";

export default class PromotionInfoObj {
    @JsonProperty({clazz:WeekDayPromotionObj}) weekDayPromotions?: WeekDayPromotionObj[] = undefined;

}