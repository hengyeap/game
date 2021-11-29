module.exports.getLang = function (defaultValue) {
  let lang = sessionStorage.getItem('countryCode')
  let language = sessionStorage.getItem('language')
  // let lang = navigator.language || navigator.userLanguage
  let result = defaultValue
  if (lang=='TW') {
    result = 'zh-TW'
  } else if (lang == 'MS'||lang == 'SG') {
    if(language == 'zh-Hans'){
      result = 'zh-CN'
    }else if(language == 'zh-Hant'){
      result = 'zh-TW'
    }else{
      result = 'en'
    }
  } else{
    result = 'zh-CN'
  }

  console.log(result)

  return result
}
