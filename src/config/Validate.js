import Vue from 'vue'
import VeeValidate, {
  Validator
} from 'vee-validate';
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'ja',
})

const dictionary = {
  ja: {
    messages: {
      email: (field,args) => "有効な" + args[0] + "を入力してください。" , 
      required: (field,args) => args[0] +"を入力してください。",
      alpha_num: (field,args) => args[0] + "は半角英数字で入力してください。" ,
      numeric: (field,args) => args[0] + "は数字で入力してください。" ,
      date_format: (field,args) => args[1] + "は正しい日付を入力してください。" ,
    }
  }
}
const config = {
  delay: 0,
  events: '',//'input|blur',
  i18n,
  i18nRootKey: 'validation',
  dictionary
};
Vue.use(VeeValidate, config);

Validator.localize(dictionary);

Validator.extend('lengthBetween', {
  getMessage: (field,args) => args[0]+ 'は'+args[1]+'-'+args[2]+'桁で入力してください。',
  validate: (value,args) => {    
    return value.length >= args[1] && value.length <= args[2];
  }
});

Validator.extend('isHalfAlphaNumric', {
  getMessage: (field,arg) => arg[0] + 'は半角英数字で入力してください。',
  validate: value => {
    return /^[a-zA-Z0-9]+$/.test(value)
  }
});

Validator.extend('isLength', {
  getMessage: (field,args) => args[0] +　"は" + args[1] + "桁で入力してください。" ,
  validate: value => {
    return value.length == 8
  }
});
