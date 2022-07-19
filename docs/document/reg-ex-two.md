# 实战
## 封装
- validators/index.js
```js
export const ruleForms = {
  isName: function(val, errorMsg='请输入6-30的数字英文组合账号'){
    if(!/^[a-zA-Z0-9]{6,30}$/.test(val)) {
      return errorMsg
    }
  },
  isPwd: function(val, errorMsg='请输入8-30的数字英文组合密码'){
    if(!/^[a-zA-Z0-9]{8,30}$/.test(val)){
      return errorMsg
    }
  },
  isEmail: function(val, errorMsg='请输入合法邮箱'){
    if(!/^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+.){1,63}[A-Za-z0-9]+$/.test(val)){
      return errorMsg
    }
  },
  isPhone: function(val, errorMsg='请输入合法手机号'){
    if(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(val)){
      return errorMsg
    }
  }
}
```
- 在需要验证的组件引入
```js
import {ruleForms} from '../../utils/validators'

//密码注册 - 代码片段
const { username, pwd, pwd2, captcha } = this;
if(!username){
  //用户名
  this.showAlert('用户名不能为空');
  return;
} else if(!pwd || !pwd2){
  //密码必须指定
  this.showAlert('密码不能为空');
  return;
}else if(pwd !== pwd2){
  //密码两次要一致
  this.showAlert('密码与确认密码不一致');
  return;
}
if(/@/g.test(username)){
  var testUser = ruleForms.isEmail(username) // 如果验证不通过拿到的是错误信息
}else{
  var testUser = ruleForms.isName(username) // 如果验证不通过拿到的是错误信息
}
let testPwd = ruleForms.isPwd(pwd) // 如果验证不通过拿到的是错误信息
let errMsg = testUser || testPwd // 拿到错误信息
```
