import { type BaseResponse } from '@/models/base.ts'
// 应用预览与调试接口响应
export type DebugAppResponse = BaseResponse<{
  content: string
}>
