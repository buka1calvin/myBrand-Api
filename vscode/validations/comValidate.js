import joi from "joi";
const comSchema=joi.object({
   email:joi.string().min(3).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
.required(),
response:joi.string().min(3).max(1000),
})
export default comSchema