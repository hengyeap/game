import "reflect-metadata";
import { getClazz, getJsonProperty } from "./JsonProperty";
export default class MapUtils {
  static isPrimitive(obj) {
    switch (typeof obj) {
      case "string":
      case "number":
      case "boolean":
        return true;
    }
    return !!(
      obj instanceof String ||
      obj === String ||
      obj instanceof Number ||
      obj === Number ||
      obj instanceof Boolean ||
      obj === Boolean
    );
  }

  static isArray(object) {
    if (object === Array) {
      return true;
    } else if (typeof Array.isArray === "function") {
      return Array.isArray(object);
    } else {
      return !!(object instanceof Array);
    }
  }

  static deserialize<T>(clazz: { new (): T }, jsonObject) {
    if (clazz === undefined || jsonObject === undefined) return undefined;
    let obj = new clazz();
    Object.keys(obj).forEach(key => {
      let propertyMetadataFn: (IJsonMetaData) => any = propertyMetadata => {
        let propertyName = propertyMetadata.name || key;
        let innerJson = jsonObject ? jsonObject[propertyName] : undefined;
        let clazz = getClazz(obj, key);
        // 若为数组，需要读取额外配置
        if (MapUtils.isArray(clazz)) {
          let metadata = getJsonProperty(obj, key);
          if (metadata.clazz || MapUtils.isPrimitive(clazz)) {
            if (innerJson && MapUtils.isArray(innerJson)) {
              return innerJson.map(item => MapUtils.deserialize(<any>metadata.clazz, item));
            } else {
              return undefined;
            }
          } else {
            return innerJson;
          }
        } else if (!MapUtils.isPrimitive(clazz)) {
          return MapUtils.deserialize(clazz, innerJson);
        } else {
          return jsonObject ? jsonObject[propertyName] : undefined;
        }
      };

      let propertyMetadata = getJsonProperty(obj, key);
      if (propertyMetadata) {
        obj[key] = propertyMetadataFn(propertyMetadata);
      } else {
        if (jsonObject && jsonObject[key] !== undefined) {
          obj[key] = jsonObject[key];
        }
      }
    });
    return obj;
  }
}
