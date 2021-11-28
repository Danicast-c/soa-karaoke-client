let required = (propertyType) => { 
  return v => v && v.length > 0 || `You must input a ${propertyType}`
}
let minLength = (propertyType, minLength) => {
  return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
}
let maxLength = (propertyType, maxLength) => {
  return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
}

let emailFormat = () => {

  // RFC 5322 email address regex
  // https://emailregex.com/
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return v => v && emailRegex.test(v) || "Must be a valid email."
}

export default {
  required,
  minLength,
  maxLength,
  emailFormat
} 