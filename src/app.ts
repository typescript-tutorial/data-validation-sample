import { Attributes, StringMap, validate } from "xvalidators"

interface Resources {
  [key: string]: StringMap
}

const enResource: StringMap = {
  error_undefined: "{0} is not allowed to exist.",
  error_exp: "{0} does not match the regular expression.",
  error_type: "Invalid datatype. Type of {0} cannot be {1}.",

  error_required: "{0} is required.",
  error_minlength: "{0} cannot be less than {1} characters.",
  error_maxlength: "{0} cannot be greater than {1} characters.",

  error_email: "{0} is not a valid email address.",
  error_integer: "{0} is not a valid integer.",
  error_number: "{0} is not a valid number.",
  error_precision: "{0} has a valid precision. Precision must be less than or equal to {1}",
  error_scale: "{0} has a valid scale. Scale must be less than or equal to {1}",
  error_phone: "{0} is not a valid phone number.",
  error_fax: "{0} is not a valid fax number.",
  error_url: "{0} is not a valid URL.",
  error_ipv4: "{0} is not a valid ipv4.",
  error_ipv6: "{0} is not a valid ipv6.",

  error_min: "{0} must be greater than or equal to {1}.",
  error_max: "{0} must be less than or equal to {1}.",
  error_date: "{0} is not a valid date.",
  error_enum: "{0} must be one of {1}.",

  error_min_date: "{0} cannot be before {1}.",
  error_max_date: "{0} cannot be after {1}.",
  error_from_now: "{0} must be after now.",
  error_from_today: "{0} must be from today.",
  error_from_tomorrow: "{0} must be from tomorrow.",
  error_from_yesterday: "{0} must be from yesterday.",
  error_from: "{0} must be after {1}.",
  error_after_now: "{0} cannot be after now.",
  error_after_today: "{0} cannot be after today.",
  error_after_tomorrow: "{0} cannot be after tomorrow.",
  error_after_yesterday: "{0} must be after yesterday.",

  username: "Username",
  date_of_birth: "Date Of Birth",
  telephone: "Telephone",
  email: "Email",
  website: "Website",
  status: "User Status",
  credit_limit: "Credit Limit",
}

const viResource = {
  error_undefined: "{0} không được phép tồn tại.",
  error_exp: "{0} không khớp với biểu thức chính quy.",
  error_type: "Kiểu dữ liệu không hợp lệ. Kiểu của {0} không thể là {1}.",

  error_required: "{0} là bắt buộc.",
  error_minlength: "{0} không được ít hơn {1} ký tự.",
  error_maxlength: "{0} không được nhiều hơn {1} ký tự.",

  error_email: "{0} không phải là địa chỉ email hợp lệ.",
  error_integer: "{0} không phải là số nguyên hợp lệ.",
  error_number: "{0} không phải là số hợp lệ.",
  error_precision: "{0} có độ chính xác không hợp lệ. Độ chính xác phải nhỏ hơn hoặc bằng {1}.",
  error_scale: "{0} có thang đo không hợp lệ. Thang đo phải nhỏ hơn hoặc bằng {1}.",
  error_phone: "{0} không phải là số điện thoại hợp lệ.",
  error_fax: "{0} không phải là số fax hợp lệ.",
  error_url: "{0} không phải là URL hợp lệ.",
  error_ipv4: "{0} không phải là địa chỉ IPv4 hợp lệ.",
  error_ipv6: "{0} không phải là địa chỉ IPv6 hợp lệ.",

  error_min: "{0} phải lớn hơn hoặc bằng {1}.",
  error_max: "{0} phải nhỏ hơn hoặc bằng {1}.",
  error_date: "{0} không phải là ngày hợp lệ.",
  error_enum: "{0} phải là một trong các giá trị sau: {1}.",

  username: "Tên người dùng",
  date_of_birth: "Ngày sinh",
  telephone: "Điện thoại",
  email: "Địa chỉ email",
  website: "Trang web",
  status: "Trạng thái người dùng",
  credit_limit: "Hạn mức tín dụng",
}

const resources: Resources = {
  en: enResource,
  vi: viResource,
}

function getResource(lang: string): StringMap {
  return resources[lang] || resources["en"]
}
const resource = getResource("en") // or "vi" for Vietnamese

interface User {
  id: string
  username: string
  email?: string
  phone?: string
  ip?: string
  dateOfBirth?: Date
  website?: string
  creditLimit?: number
  status?: string[]
}

const userSchema: Attributes = {
  id: {
    length: 40,
  },
  username: {
    required: true,
    length: 255,
    resource: "username",
  },
  email: {
    format: "email",
    required: true,
    length: 120,
    resource: "email",
  },
  phone: {
    format: "phone",
    required: true,
    length: 14,
    resource: "telephone",
  },
  ip: {
    format: "ipv4",
    length: 15,
  },
  website: {
    length: 255,
    format: "url",
    resource: "website",
  },
  dateOfBirth: {
    type: "datetime",
    min: "1964-03-25",
    resource: "date_of_birth",
  },
  creditLimit: {
    type: "number",
    scale: 2,
    min: 1,
    max: 200000,
    resource: "credit_limit",
  },
  status: {
    type: "strings",
    enum: ["active", "inactive", "online", "offline", "away"],
    resource: "status",
  },
}

const invalidUser = {
  id: "12345678901234567890123456789012345678901", // 41 characters => maximum 40 => invalid
  // username: "james.howlett", // required => invalid
  email: "james.howlett@gmail", // invalid email
  phone: "abcd1234", // required => invalid
  ip: "abcd1234", // invalid => not required
  website: "invalid website",
  dateOfBirth: "1974-03-25", // valid date => the library will convert to date
  creditLimit: 10000000.255, // invalid precision and scale => precision must be less than or equal to 10 digits
  status: ["active", "busy"],
  age: 50, // does not exist in schema => invalid
}
let errors = validate(invalidUser, userSchema, resource)
console.log("Validate James Howlett: ", errors)

const user: User = {
  id: "1234567890123456789012345678901234567890",
  username: "tony.stark",
  email: "tony.stark@gmail.com",
  phone: "+1234567890",
  website: "https://github.com/core-ts",
  dateOfBirth: new Date("1963-03-25"),
  creditLimit: 100000.25,
  status: ["active", "online"],
}
errors = validate(user, userSchema, resource, true)
console.log("Validate Tony Stark (no error): ", errors) // should be empty
