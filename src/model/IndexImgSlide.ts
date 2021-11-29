import Pic from './Pic';
import 'reflect-metadata';
import { JsonProperty } from '../json/JsonProperty';

export default class IndexImgSlide {
	rank?: string = undefined;
	@JsonProperty({ clazz: Pic })
	pic?: Pic[] = undefined;
	is_display?: boolean = undefined;
}
