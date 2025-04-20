import { Attributes, StringMap, validate } from "xvalidators"

interface Resources {
  [key: string]: StringMap
}

const enResource: StringMap = {
  error_undefined: "{0} is not allowed to exist.",
  error_exp: "{0} does not match the regular expression.",
  error_type: "Invalid datatype. Type of {0} cannot be {1}.",

  error_boolean: "{0} cannot be boolean.",
  error_strings: "{0} must be an string array.",
  error_numbers: "{0} must be an number array.",
  error_integers: "{0} must be an number array.",
  error_datetimes: "{0} must be an date time array.",
  error_dates: "{0} must be an date array.",

  error_required: "{0} is required.",
  error_minlength: "{0} cannot be less than {1} characters.",
  error_maxlength: "{0} cannot be greater than {1} characters.",
  error_array_min: "Length of {0} cannot be less than {1}.",
  error_array_max: "Length of {0} cannot be greater than {1}.",

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
  error_gt: "{0} must be greater than {1}.",
  error_lt: "{0} must be less than {1}.",
  error_date: "{0} is not a valid date.",
  error_enum: "{0} must be one of {1}.",

  date_of_birth: "Date Of Birth",
  telephone: "Telephone",
  email: "Email",
  website: "Website",
  status: "User Status",
  state: "State",
  zip: "Zip Code",
  zip_code: "Zip code is not valid.",
  quality: "Quality",
  level: "Level",
}

const viResource = {
  error_undefined: "{0} không được phép tồn tại.",
  error_exp: "{0} không khớp với biểu thức chính quy.",
  error_type: "Kiểu dữ liệu không hợp lệ. Kiểu của {0} không thể là {1}.",

  error_boolean: "{0} không thể là kiểu boolean.",
  error_strings: "{0} phải là một mảng chuỗi.",
  error_numbers: "{0} phải là một mảng số.",
  error_integers: "{0} phải là một mảng số nguyên.",
  error_datetimes: "{0} phải là một mảng ngày giờ.",
  error_dates: "{0} phải là một mảng ngày.",

  error_required: "{0} là bắt buộc.",
  error_minlength: "{0} không được ít hơn {1} ký tự.",
  error_maxlength: "{0} không được nhiều hơn {1} ký tự.",
  error_array_min: "Độ dài của {0} không được nhỏ hơn {1}.",
  error_array_max: "Độ dài của {0} không được lớn hơn {1}.",

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
  error_gt: "{0} phải lớn hơn {1}.",
  error_lt: "{0} phải nhỏ hơn {1}.",
  error_date: "{0} không phải là ngày hợp lệ.",
  error_enum: "{0} phải là một trong các giá trị sau: {1}.",

  date_of_birth: "Ngày sinh",
  telephone: "Điện thoại",
  email: "Địa chỉ email",
  website: "Trang web",
  status: "Trạng thái người dùng",
  state: "Tiểu bang",
  zip: "Mã bưu điện",
  zip_code: "Mã bưu điện không hợp lệ.",
  quality: "Chất lượng",
  level: "Cấp độ",
}

const resources: Resources = {
  en: enResource,
  vi: viResource,
}

function getResource(lang: string): StringMap {
  return resources[lang] || resources["en"]
}
const resource = getResource("en")

interface Skill {
  skill: string
  level: number
}
interface Achievement {
  subject: string
  description: string
  quality: string
  skills?: Skill[]
}
interface Address {
  street: string
  city: string
  state: string
  zip: string
}
interface User {
  id: string
  username: string
  email?: string
  phone?: string
  dateOfBirth?: Date
  website?: string
  creditLimit?: number
  status?: string[]
  address?: Address
  achievements?: Achievement[]
}

const skillSchema: Attributes = {
  skill: {
    required: true,
    length: 15,
  },
  level: {
    required: true,
    type: "integer",
    enum: [1, 2, 3, 4, 5],
    resource: "level",
  },
}
const achievementSchema: Attributes = {
  subject: {
    required: true,
    length: 255,
  },
  description: {
    required: true,
    length: 255,
  },
  quality: {
    required: true,
    length: 255,
    enum: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
    resource: "quality",
  },
  skills: {
    type: "array",
    typeof: skillSchema,
  },
}

const addressSchema: Attributes = {
  street: {
    required: true,
    length: 255,
  },
  city: {
    required: true,
    length: 255,
  },
  state: {
    length: 2,
    exp: /^[A-Z]{2}$/,
    // resource: "State is not valid.",
  },
  zip: {
    exp: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
    resource: "zip_code",
  },
}
const userSchema: Attributes = {
  id: {
    length: 40,
  },
  username: {
    required: true,
    length: 255,
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
  website: {
    length: 255,
    format: "url",
    resource: "website",
  },
  dateOfBirth: {
    type: "datetime",
  },
  creditLimit: {
    type: "number",
    precision: 10,
    scale: 2,
    min: 1,
  },
  status: {
    type: "strings",
    enum: ["active", "inactive", "online", "offline", "away"],
    resource: "status",
  },
  address: {
    type: "object",
    typeof: addressSchema,
  },
  achievements: {
    type: "array",
    typeof: achievementSchema,
  },
}

let errors = validate(
  {
    username: "james.howlett",
    email: "james.howlett@gmail", // invalid email
    phone: "", // required => invalid
    website: "https://james.howlett.com",
    dateOfBirth: "1974-03-25", // valid date => the library will convert to date
    age: 50, // does not exist in schema => invalid
  },
  userSchema,
  resource,
)
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
  address: {
    street: "123 Stark Tower",
    city: "New York",
    state: "NY",
    zip: "07008",
  },
  achievements: [
    {
      subject: "Avengers",
      description: "Leader of the Avengers team",
      quality: "Excellent",
      skills: [
        {
          skill: "Leadership",
          level: 5,
        },
        {
          skill: "Technology",
          level: 4,
        },
        {
          skill: "Martial Arts",
          level: 3,
        },
      ],
    },
    {
      subject: "Iron Suite",
      description: "Iron Armor Suit",
      quality: "Excellent",
    },
  ],
}
errors = validate(user, userSchema, resource, true)
console.log("Validate Tony Stark (no error): ", errors) // should be empty

const invalidUser: User = {
  id: "12345678901234567890123456789012345678901", // 41 characters => maximum 40 => invalid
  username: "peter.parker",
  email: "test", // invalid email
  phone: "abcd1234", // invalid phone number
  website: "wrong url", // invalid URL
  dateOfBirth: new Date("1962-08-25"),
  creditLimit: 10000000.255, // invalid precision and scale => precision must be less than or equal to 10 digits
  status: ["active", "busy"],
  address: {
    street: "123 Stark Tower",
    city: "New York",
    state: "New York",
    zip: "999999", // invalid zip code, does not match regex
  },
  achievements: [
    {
      subject: "Avengers",
      description: "Member of the Avengers team",
      quality: "Normal", // invalid quality, must be one of ["Excellent", "Good", "Average", "Poor", "Very Poor"]
      skills: [
        {
          skill: "Technology",
          level: 5,
        },
        {
          skill: "Martial Arts",
          level: 6, // invalid level, must be be one of [1, 2, 3, 4, 5]
        },
      ],
    },
  ],
}

errors = validate(invalidUser, userSchema, resource, true)
console.log("Validate Peter Parker: ", errors)
