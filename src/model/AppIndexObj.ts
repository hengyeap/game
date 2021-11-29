import DistributorObj from './DistributorObj';
import 'reflect-metadata';
import Entrance from './Entrance';
import HeadLineObj from './HeadLineObj';
import SwipeImgObj from './SwipeImgObj';
import PromotionInfoObj from './PromotionInfoObj';
import AppIndexImg from './AppIndexImg';
import { JsonProperty } from '../json/JsonProperty';
export default class AppIndexObj {
	@JsonProperty('distributorInfo') distributorInfo?: DistributorObj = undefined;
	@JsonProperty({ clazz: Entrance })
	entrances?: Entrance[] = undefined;
	@JsonProperty({ clazz: HeadLineObj })
	headLine?: HeadLineObj[] = undefined;
	@JsonProperty('promotionInfo') promotionInfo?: PromotionInfoObj = undefined;
	@JsonProperty({ clazz: SwipeImgObj })
	slide?: SwipeImgObj[] = undefined;
	@JsonProperty({ name: "appSettings" }) appSettings?: AppIndexImg = undefined;
}
